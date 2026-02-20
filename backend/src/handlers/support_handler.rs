use axum::{
    extract::{Extension, Multipart},
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use serde_json::json;
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Instant;
use tokio::sync::Mutex;

const MAX_FILE_SIZE: usize = 8 * 1024 * 1024; // 8MB
const RATE_LIMIT_WINDOW_SECS: u64 = 60;
const RATE_LIMIT_MAX: usize = 1;

const ALLOWED_TYPES: &[&str] = &[
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/quicktime",
    "application/pdf",
    "text/plain",
    "application/zip",
    "application/x-zip-compressed",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/// Shared rate-limit state: IP → list of request timestamps
pub type RateLimitState = Arc<Mutex<HashMap<String, Vec<Instant>>>>;

pub fn new_rate_limit_state() -> RateLimitState {
    Arc::new(Mutex::new(HashMap::new()))
}

#[axum::debug_handler]
pub async fn support_handler(
    Extension(rate_limit): Extension<RateLimitState>,
    headers: HeaderMap,
    mut multipart: Multipart,
) -> impl IntoResponse {
    // Extract IP for rate limiting
    let ip = headers
        .get("x-forwarded-for")
        .and_then(|v| v.to_str().ok())
        .and_then(|s| s.split(',').next())
        .map(|s| s.trim().to_string())
        .unwrap_or_else(|| "unknown".to_string());

    // Rate limit check
    {
        let mut map = rate_limit.lock().await;
        let now = Instant::now();
        let times = map.entry(ip.clone()).or_insert_with(Vec::new);
        times.retain(|t| now.duration_since(*t).as_secs() < RATE_LIMIT_WINDOW_SECS);
        if times.len() >= RATE_LIMIT_MAX {
            return (
                StatusCode::TOO_MANY_REQUESTS,
                Json(json!({ "error": "Trop de requêtes, réessaie dans 1 minute." })),
            )
                .into_response();
        }
        times.push(now);
    }

    let mut name = String::new();
    let mut email = String::new();
    let mut message = String::new();
    let mut honeypot = String::new();
    let mut file_data: Option<Vec<u8>> = None;
    let mut file_name = String::new();
    let mut file_type = String::new();

    // Parse multipart form
    while let Ok(Some(field)) = multipart.next_field().await {
        let field_name = field.name().unwrap_or("").to_string();
        match field_name.as_str() {
            "name" => {
                name = field.text().await.unwrap_or_default().trim().to_string();
            }
            "email" => {
                email = field.text().await.unwrap_or_default().trim().to_string();
            }
            "message" => {
                message = field.text().await.unwrap_or_default().trim().to_string();
            }
            "_gotcha" => {
                honeypot = field.text().await.unwrap_or_default();
            }
            "file" => {
                file_type = field
                    .content_type()
                    .unwrap_or("")
                    .to_string();
                file_name = field
                    .file_name()
                    .unwrap_or("")
                    .to_string();
                match field.bytes().await {
                    Ok(bytes) if !bytes.is_empty() => {
                        file_data = Some(bytes.to_vec());
                    }
                    _ => {}
                }
            }
            _ => {}
        }
    }

    // Honeypot check
    if !honeypot.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "error": "Spam détecté." })),
        )
            .into_response();
    }

    // Validate required fields
    if name.is_empty() || email.is_empty() || message.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "error": "Champs requis manquants." })),
        )
            .into_response();
    }

    // Simple email validation
    if !email.contains('@') || !email.contains('.') {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "error": "Email invalide." })),
        )
            .into_response();
    }

    // Validate file if present
    if let Some(ref data) = file_data {
        if !ALLOWED_TYPES.contains(&file_type.as_str()) {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({ "error": "Type de fichier non supporté." })),
            )
                .into_response();
        }
        if data.len() > MAX_FILE_SIZE {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({ "error": "Fichier trop volumineux (max 8 Mo)." })),
            )
                .into_response();
        }
    }

    // Discord webhook
    let webhook_url = match std::env::var("DISCORD_SUPPORT_WEBHOOK") {
        Ok(url) => url,
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": "Webhook Discord non configuré." })),
            )
                .into_response();
        }
    };

    let content = format!(
        "**Support**\nNom: {}\nEmail: {}\nMessage: {}",
        name, email, message
    );

    let client = reqwest::Client::new();

    let result = if let Some(data) = file_data {
        // Multipart with file attachment
        let file_part = reqwest::multipart::Part::bytes(data)
            .file_name(file_name)
            .mime_str(&file_type)
            .unwrap_or_else(|_| reqwest::multipart::Part::bytes(vec![]));

        let payload = serde_json::json!({ "content": content }).to_string();
        let payload_part = reqwest::multipart::Part::text(payload);

        let form = reqwest::multipart::Form::new()
            .part("file", file_part)
            .part("payload_json", payload_part);

        client.post(&webhook_url).multipart(form).send().await
    } else {
        // JSON only
        client
            .post(&webhook_url)
            .header("Content-Type", "application/json")
            .json(&json!({ "content": content }))
            .send()
            .await
    };

    match result {
        Ok(resp) if resp.status().is_success() || resp.status().as_u16() == 204 => {
            (StatusCode::OK, Json(json!({ "ok": true }))).into_response()
        }
        Ok(resp) => {
            let status = resp.status().as_u16();
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": format!("Erreur Discord: {}", status) })),
            )
                .into_response()
        }
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": "Erreur réseau Discord." })),
        )
            .into_response(),
    }
}
