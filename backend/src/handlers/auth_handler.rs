use axum::{extract::Extension, Json, response::IntoResponse, http::{StatusCode, HeaderMap, header::SET_COOKIE}};
use std::sync::Arc;
use serde_json::json;
use axum::http::HeaderValue;
use jsonwebtoken::{EncodingKey, DecodingKey, Header, Validation};
use chrono::Utc;

use crate::models::LoginRequest;
use crate::services::AuthService;
use crate::repositories::{SqlxSessionRepository, SessionRepository};
use crate::AppState;

use uuid::Uuid;

#[axum::debug_handler]
pub async fn login_handler(
    Extension(state): Extension<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<LoginRequest>,
) -> impl IntoResponse {
    // Build repositories
    let user_repo = crate::repositories::user_repository::SqlxUserRepository::new(state.pool.clone());
    let session_repo = SqlxSessionRepository::new(state.pool.clone());

    // extract user-agent and ip (x-forwarded-for or remote)
    let user_agent = headers.get("user-agent").and_then(|v| v.to_str().ok()).unwrap_or("");
    let remote_ip = headers.get("x-forwarded-for").and_then(|v| v.to_str().ok()).unwrap_or("127.0.0.1");

    match AuthService::login(&user_repo, &session_repo, &payload, &state.jwt_secret, &state.cookie_secret, user_agent, remote_ip, state.session_ttl_seconds).await {
        Ok(res) => {
            // create signed JWT containing session id (sid) and set in HttpOnly cookie
            let now = Utc::now();
            let exp = now + chrono::Duration::seconds(state.session_ttl_seconds);
            let token_claims = crate::models::Claims {
                sub: payload.pseudo.clone(),
                iat: now.timestamp(),
                exp: exp.timestamp(),
                sid: Some(res.session_id.clone()),
            };
            let token = match jsonwebtoken::encode(&Header::default(), &token_claims, &EncodingKey::from_secret(state.jwt_secret.as_ref())) {
                Ok(t) => t,
                Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "Internal server error" }))).into_response(),
            };

            let cookie = format!("session={}; HttpOnly; Path=/; Max-Age={}; SameSite=Lax{}",
                token,
                res.expires_in,
                if state.is_prod { "; Secure" } else { "" }
            );
            let mut headers = HeaderMap::new();
            headers.insert(SET_COOKIE, HeaderValue::from_str(&cookie).unwrap());
            let body = Json(json!({ "expires_in": res.expires_in }));
            (StatusCode::OK, headers, body).into_response()
        }
        Err(e) => match e {
            crate::services::auth_service::AuthError::InvalidCredentials => {
                let body = Json(json!({ "error": "Identifiants incorrects" }));
                (StatusCode::UNAUTHORIZED, body).into_response()
            }
            _ => {
                let body = Json(json!({ "error": "Internal server error" }));
                (StatusCode::INTERNAL_SERVER_ERROR, body).into_response()
            }
        },
    }
}

#[axum::debug_handler]
pub async fn me_handler(
    Extension(state): Extension<Arc<AppState>>,
    headers: HeaderMap,
) -> impl IntoResponse {
    let session_repo = SqlxSessionRepository::new(state.pool.clone());

    // read cookie header and decode JWT
    let cookie_header = headers.get("cookie").and_then(|v| v.to_str().ok()).unwrap_or("");
    let token_opt = cookie_header.split(';').map(|s| s.trim()).find_map(|kv| {
        let mut parts = kv.splitn(2, '=');
        match (parts.next(), parts.next()) {
            (Some(k), Some(v)) if k == "session" => Some(v.to_string()),
            _ => None,
        }
    });

    if token_opt.is_none() {
        return (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Not authenticated" }))).into_response();
    }

    let token = token_opt.unwrap();
    let token_data = match jsonwebtoken::decode::<crate::models::Claims>(&token, &DecodingKey::from_secret(state.jwt_secret.as_ref()), &Validation::default()) {
        Ok(d) => d,
        Err(_) => return (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Invalid session" }))).into_response(),
    };

    let sid = match token_data.claims.sid {
        Some(s) => s,
        None => return (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Invalid session" }))).into_response(),
    };

    let session_id = match Uuid::parse_str(&sid) {
        Ok(u) => u,
        Err(_) => return (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Invalid session" }))).into_response(),
    }; 

    match session_repo.find_by_id(session_id).await {
        Ok(Some(s)) => {
            if s.revoked || s.expires_at < chrono::Utc::now() {
                return (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Session invalid" }))).into_response();
            }
            // verify fingerprint
            let user_agent = headers.get("user-agent").and_then(|v| v.to_str().ok()).unwrap_or("");
            let remote_ip = headers.get("x-forwarded-for").and_then(|v| v.to_str().ok()).unwrap_or("127.0.0.1");
            let expected = crate::utils::fingerprint::compute_fingerprint(user_agent, remote_ip, &state.cookie_secret);
            if expected != s.fingerprint {
                // revoke session on mismatch
                let _ = session_repo.revoke_by_id(session_id).await;
                return (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Fingerprint mismatch" }))).into_response();
            }

            // update last_seen metadata (best-effort)
            let _ = session_repo.update_last_seen(session_id, remote_ip, user_agent).await; 

            // For simplicity, return session info without reloading user
            let body = Json(json!({ "authenticated": true, "user_id": s.user_id }));
            (StatusCode::OK, body).into_response()
        }
        Ok(None) => (StatusCode::UNAUTHORIZED, Json(json!({ "error": "Session not found" }))).into_response(),
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "Internal server error" }))).into_response(),
    }
}

#[axum::debug_handler]
pub async fn logout_handler(
    Extension(state): Extension<Arc<AppState>>,
    headers: HeaderMap,
) -> impl IntoResponse {
    let session_repo = SqlxSessionRepository::new(state.pool.clone());

    let cookie_header = headers.get("cookie").and_then(|v| v.to_str().ok()).unwrap_or("");
    let token_opt = cookie_header.split(';').map(|s| s.trim()).find_map(|kv| {
        let mut parts = kv.splitn(2, '=');
        match (parts.next(), parts.next()) {
            (Some(k), Some(v)) if k == "session" => Some(v.to_string()),
            _ => None,
        }
    });

    if let Some(token) = token_opt {
        if let Ok(token_data) = jsonwebtoken::decode::<crate::models::Claims>(&token, &DecodingKey::from_secret(state.jwt_secret.as_ref()), &Validation::default()) {
            if let Some(sid) = token_data.claims.sid {
                if let Ok(u) = Uuid::parse_str(&sid) {
                    let _ = session_repo.revoke_by_id(u).await;
                }
            }
        }
    }

    // set cookie expired
    let cookie = format!("session=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Lax{}",
        if state.is_prod { "; Secure" } else { "" }
    );
    let mut headers = HeaderMap::new();
    headers.insert(SET_COOKIE, HeaderValue::from_str(&cookie).unwrap());
    (StatusCode::OK, headers, Json(json!({ "ok": true }))).into_response()
}
