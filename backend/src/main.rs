use std::net::SocketAddr;

use axum::{
    routing::{post, get},
    Router, Extension,
    middleware::{self, Next},
    response::Response,
};
use axum::http::{Method, HeaderValue, StatusCode, Request};
use axum::body::Body;
use sqlx::postgres::PgPoolOptions;
use dotenvy::dotenv;
use std::env;
use std::sync::Arc;

mod models;
mod repositories;
mod services;
mod handlers;
mod errors;
mod utils;

use handlers::auth_handler::{login_handler, me_handler, logout_handler};
use handlers::profile_handler::{get_profile_handler, update_profile_handler, upload_profile_picture_handler};
use handlers::register_handler::{register_handler, check_pseudo_handler};
use handlers::support_handler::{support_handler, new_rate_limit_state};

#[derive(Clone)]
pub struct AppState {
    pub pool: sqlx::PgPool,
    pub jwt_secret: String,
    pub cookie_secret: String,
    pub session_ttl_seconds: i64,
    pub is_prod: bool,
}

// axum::middleware::Next is not generic; middleware takes Request
async fn cors_middleware(req: Request<Body>, next: Next) -> Response {
    // If this is a preflight request, respond immediately
    if req.method() == Method::OPTIONS {
        let mut res = Response::new(Body::empty());
        let headers = res.headers_mut();
        headers.insert("access-control-allow-origin", HeaderValue::from_static("http://localhost:3000"));
        headers.insert("access-control-allow-methods", HeaderValue::from_static("GET, POST, PUT, OPTIONS"));
        headers.insert("access-control-allow-headers", HeaderValue::from_static("Content-Type"));
        headers.insert("access-control-allow-credentials", HeaderValue::from_static("true"));
        *res.status_mut() = StatusCode::NO_CONTENT;
        return res;
    }

    let mut res = next.run(req).await;
    let headers = res.headers_mut();
    headers.insert("access-control-allow-origin", HeaderValue::from_static("http://localhost:3000"));
    headers.insert("access-control-allow-credentials", HeaderValue::from_static("true"));
    headers.insert("access-control-expose-headers", HeaderValue::from_static("Content-Type"));
    res
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load .env
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set in .env");
    let jwt_secret = env::var("JWT_SECRET").unwrap_or_else(|_| "default_jwt_secret".into());
    let cookie_secret = env::var("COOKIE_SECRET").unwrap_or_else(|_| "default_cookie_secret".into());
    let session_ttl_seconds = env::var("SESSION_TTL_SECONDS").ok().and_then(|s| s.parse::<i64>().ok()).unwrap_or(3600);
    let is_prod = env::var("RUST_ENV").unwrap_or_else(|_| "dev".into()) == "prod";

    // Create Postgres pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to create pool");

    sqlx::query(
        "ALTER TABLE public.users ALTER COLUMN profile_picture TYPE TEXT"
    )
    .execute(&pool)
    .await
    .expect("Failed to ensure users.profile_picture uses TEXT");

    let shared_state = AppState { pool: pool.clone(), jwt_secret: jwt_secret.clone(), cookie_secret: cookie_secret.clone(), session_ttl_seconds, is_prod };

    let rate_limit_state = new_rate_limit_state();

    // Build router
    let app = Router::new()
        .route("/api/login", post(login_handler))
        .route("/api/register", post(register_handler))
        .route("/api/check-pseudo", get(check_pseudo_handler))
        .route("/api/me", get(me_handler))
        .route("/api/logout", post(logout_handler))
        .route("/api/profile", get(get_profile_handler).put(update_profile_handler))
        .route("/api/profile/picture", post(upload_profile_picture_handler))
        .route("/api/support", post(support_handler))
        .layer(Extension(rate_limit_state))
        .layer(Extension(Arc::new(shared_state)))
        .route_layer(middleware::from_fn(cors_middleware));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));

    // Use tokio TcpListener with axum::serve (Axum 0.7 pattern)
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    println!("Listening on {}", addr);
    axum::serve(listener, app.into_make_service()).await?;

    Ok(())
}
