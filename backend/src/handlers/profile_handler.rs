use axum::{extract::{Extension, Multipart}, Json, response::IntoResponse, http::{StatusCode, HeaderMap}};
use std::sync::Arc;
use serde_json::json;
use base64::{engine::general_purpose::STANDARD, Engine as _};

use crate::repositories::{UserRepository, user_repository::SqlxUserRepository};
use crate::models::UpdateProfileRequest;
use crate::AppState;

use super::auth_handler::resolve_authenticated_user_id;

#[axum::debug_handler]
pub async fn get_profile_handler(
    Extension(state): Extension<Arc<AppState>>,
    headers: HeaderMap,
) -> impl IntoResponse {
    let session_repo = crate::repositories::SqlxSessionRepository::new(state.pool.clone());
    let user_repo = SqlxUserRepository::new(state.pool.clone());

    let user_id = match resolve_authenticated_user_id(&state, &headers, &session_repo).await {
        Ok(id) => id,
        Err(response) => return response,
    };

    match user_repo.find_by_id(user_id).await {
        Ok(Some(user)) => (StatusCode::OK, Json(json!({ "profile": crate::models::PublicUser::from(user) }))).into_response(),
        Ok(None) => (StatusCode::NOT_FOUND, Json(json!({ "error": "User not found" }))).into_response(),
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "Internal server error" }))).into_response(),
    }
}

#[axum::debug_handler]
pub async fn update_profile_handler(
    Extension(state): Extension<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<UpdateProfileRequest>,
) -> impl IntoResponse {
    let session_repo = crate::repositories::SqlxSessionRepository::new(state.pool.clone());
    let user_repo = SqlxUserRepository::new(state.pool.clone());

    if payload.name.trim().is_empty() || payload.email.trim().is_empty() {
        return (StatusCode::BAD_REQUEST, Json(json!({ "error": "Le nom et l'email sont requis" }))).into_response();
    }

    let user_id = match resolve_authenticated_user_id(&state, &headers, &session_repo).await {
        Ok(id) => id,
        Err(response) => return response,
    };

    match user_repo.update_profile(user_id, &payload).await {
        Ok(Some(user)) => (StatusCode::OK, Json(json!({ "profile": crate::models::PublicUser::from(user) }))).into_response(),
        Ok(None) => (StatusCode::NOT_FOUND, Json(json!({ "error": "User not found" }))).into_response(),
        Err(sqlx::Error::Database(db_err)) => {
            if db_err.code().as_deref() == Some("23505") {
                (StatusCode::CONFLICT, Json(json!({ "error": "Pseudo ou email déjà utilisé" }))).into_response()
            } else {
                (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "Internal server error" }))).into_response()
            }
        }
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "Internal server error" }))).into_response(),
    }
}

#[axum::debug_handler]
pub async fn upload_profile_picture_handler(
    Extension(state): Extension<Arc<AppState>>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> impl IntoResponse {
    let session_repo = crate::repositories::SqlxSessionRepository::new(state.pool.clone());
    let user_repo = SqlxUserRepository::new(state.pool.clone());

    let user_id = match resolve_authenticated_user_id(&state, &headers, &session_repo).await {
        Ok(id) => id,
        Err(response) => return response,
    };

    let mut uploaded_picture: Option<String> = None;

    while let Ok(Some(field)) = multipart.next_field().await {
        let content_type = field
            .content_type()
            .map(|value| value.to_string())
            .unwrap_or_else(|| "application/octet-stream".to_string());

        if !matches!(content_type.as_str(), "image/png" | "image/jpeg" | "image/webp") {
            continue;
        }

        let bytes = match field.bytes().await {
            Ok(value) => value,
            Err(_) => {
                return (StatusCode::BAD_REQUEST, Json(json!({ "error": "Fichier invalide" }))).into_response();
            }
        };

        if bytes.is_empty() {
            return (StatusCode::BAD_REQUEST, Json(json!({ "error": "Image vide" }))).into_response();
        }

        if bytes.len() > 5 * 1024 * 1024 {
            return (StatusCode::PAYLOAD_TOO_LARGE, Json(json!({ "error": "Image trop volumineuse (max 5MB)" }))).into_response();
        }

        let encoded = STANDARD.encode(bytes);
        uploaded_picture = Some(format!("data:{};base64,{}", content_type, encoded));
        break;
    }

    if uploaded_picture.is_none() {
        return (StatusCode::BAD_REQUEST, Json(json!({ "error": "Aucune image PNG/JPEG/WEBP reçue" }))).into_response();
    }

    match user_repo.update_profile_picture(user_id, uploaded_picture).await {
        Ok(Some(user)) => (StatusCode::OK, Json(json!({ "profile": crate::models::PublicUser::from(user) }))).into_response(),
        Ok(None) => (StatusCode::NOT_FOUND, Json(json!({ "error": "User not found" }))).into_response(),
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "Internal server error" }))).into_response(),
    }
}