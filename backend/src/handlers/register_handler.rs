use axum::{extract::Extension, Json, response::IntoResponse, http::StatusCode};
use std::sync::Arc;
use serde_json::json;
use serde::Deserialize;

use crate::repositories::{UserRepository, user_repository::SqlxUserRepository};
use crate::models::RegisterRequest;
use crate::AppState;

/// Validate email format (basic but solid check)
fn is_valid_email(email: &str) -> bool {
    let email = email.trim();
    if email.len() < 5 || email.len() > 254 {
        return false;
    }
    let parts: Vec<&str> = email.splitn(2, '@').collect();
    if parts.len() != 2 {
        return false;
    }
    let (local, domain) = (parts[0], parts[1]);
    if local.is_empty() || domain.is_empty() {
        return false;
    }
    if !domain.contains('.') {
        return false;
    }
    let domain_parts: Vec<&str> = domain.split('.').collect();
    if domain_parts.last().map_or(true, |tld| tld.len() < 2) {
        return false;
    }
    true
}

/// Validate pseudo: 3-30 chars, alphanumeric + underscores only
fn is_valid_pseudo(pseudo: &str) -> bool {
    let pseudo = pseudo.trim();
    pseudo.len() >= 3
        && pseudo.len() <= 30
        && pseudo
            .chars()
            .all(|c| c.is_ascii_alphanumeric() || c == '_')
}

/// Compute password strength score (0-4)
fn password_strength(password: &str) -> u8 {
    let mut score: u8 = 0;
    if password.len() >= 8 {
        score += 1;
    }
    if password.chars().any(|c| c.is_ascii_uppercase()) {
        score += 1;
    }
    if password.chars().any(|c| c.is_ascii_lowercase()) {
        score += 1;
    }
    if password.chars().any(|c| c.is_ascii_digit()) {
        score += 1;
    }
    score
}

#[derive(Debug, Deserialize)]
pub struct CheckPseudoQuery {
    pub pseudo: String,
}

/// POST /api/register
#[axum::debug_handler]
pub async fn register_handler(
    Extension(state): Extension<Arc<AppState>>,
    Json(payload): Json<RegisterRequest>,
) -> impl IntoResponse {
    let user_repo = SqlxUserRepository::new(state.pool.clone());

    // --- Validation ---
    let mut errors: Vec<serde_json::Value> = Vec::new();

    let name = payload.name.trim().to_string();
    if name.is_empty() || name.len() < 2 {
        errors.push(json!({ "field": "name", "message": "Le nom doit contenir au moins 2 caractères" }));
    }
    if name.len() > 100 {
        errors.push(json!({ "field": "name", "message": "Le nom ne doit pas dépasser 100 caractères" }));
    }

    let pseudo = payload.pseudo.trim().to_string();
    if !is_valid_pseudo(&pseudo) {
        errors.push(json!({ "field": "pseudo", "message": "Le pseudo doit contenir entre 3 et 30 caractères (lettres, chiffres, _)" }));
    }

    let email = payload.email.trim().to_string();
    if !is_valid_email(&email) {
        errors.push(json!({ "field": "email", "message": "Format d'email invalide" }));
    }

    let password = &payload.password;
    if password.len() < 8 {
        errors.push(json!({ "field": "password", "message": "Le mot de passe doit contenir au moins 8 caractères" }));
    }
    if password_strength(password) < 3 {
        errors.push(json!({ "field": "password", "message": "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre" }));
    }

    if payload.password != payload.confirm_password {
        errors.push(json!({ "field": "confirm_password", "message": "Les mots de passe ne correspondent pas" }));
    }

    if !errors.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "errors": errors })),
        )
            .into_response();
    }

    // --- Check uniqueness ---
    match user_repo.find_by_pseudo(&pseudo).await {
        Ok(Some(_)) => {
            return (
                StatusCode::CONFLICT,
                Json(json!({ "errors": [{ "field": "pseudo", "message": "Ce pseudo est déjà pris" }] })),
            )
                .into_response();
        }
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Erreur serveur" })),
            )
                .into_response();
        }
        _ => {}
    }

    match user_repo.find_by_email(&email).await {
        Ok(Some(_)) => {
            return (
                StatusCode::CONFLICT,
                Json(json!({ "errors": [{ "field": "email", "message": "Cet email est déjà utilisé" }] })),
            )
                .into_response();
        }
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Erreur serveur" })),
            )
                .into_response();
        }
        _ => {}
    }

    // --- Create user ---
    match user_repo.create_user(&name, &pseudo, &email, password, payload.profile_picture).await {
        Ok(user) => {
            let public = crate::models::PublicUser::from(user);
            (
                StatusCode::CREATED,
                Json(json!({ "user": public })),
            )
                .into_response()
        }
        Err(sqlx::Error::Database(db_err)) => {
            if db_err.code().as_deref() == Some("23505") {
                (
                    StatusCode::CONFLICT,
                    Json(json!({ "errors": [{ "field": "pseudo", "message": "Ce pseudo ou cet email est déjà pris" }] })),
                )
                    .into_response()
            } else {
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    Json(json!({ "error": "Erreur serveur" })),
                )
                    .into_response()
            }
        }
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": "Erreur serveur" })),
        )
            .into_response(),
    }
}

/// GET /api/check-pseudo?pseudo=xxx
#[axum::debug_handler]
pub async fn check_pseudo_handler(
    Extension(state): Extension<Arc<AppState>>,
    axum::extract::Query(query): axum::extract::Query<CheckPseudoQuery>,
) -> impl IntoResponse {
    let user_repo = SqlxUserRepository::new(state.pool.clone());
    let pseudo = query.pseudo.trim().to_string();

    if !is_valid_pseudo(&pseudo) {
        return (
            StatusCode::OK,
            Json(json!({ "available": false, "reason": "Format invalide" })),
        )
            .into_response();
    }

    match user_repo.find_by_pseudo(&pseudo).await {
        Ok(Some(_)) => (
            StatusCode::OK,
            Json(json!({ "available": false, "reason": "Ce pseudo est déjà pris" })),
        )
            .into_response(),
        Ok(None) => (
            StatusCode::OK,
            Json(json!({ "available": true })),
        )
            .into_response(),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": "Erreur serveur" })),
        )
            .into_response(),
    }
}
