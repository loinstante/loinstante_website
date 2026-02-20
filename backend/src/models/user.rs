use serde::{Deserialize, Serialize};
use chrono::{Utc, DateTime};

#[derive(Debug, Clone, sqlx::FromRow, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub pseudo: Option<String>,
    pub email: String,
    pub password: String,
    pub profile_picture: Option<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize)]
pub struct PublicUser {
    pub id: i32,
    pub name: String,
    pub pseudo: Option<String>,
    pub email: String,
    pub profile_picture: Option<String>,
    pub created_at: DateTime<Utc>,
}

impl From<User> for PublicUser {
    fn from(user: User) -> Self {
        Self {
            id: user.id,
            name: user.name,
            pseudo: user.pseudo,
            email: user.email,
            profile_picture: user.profile_picture,
            created_at: user.created_at,
        }
    }
}

#[derive(Debug, Clone, Deserialize)]
pub struct UpdateProfileRequest {
    pub name: String,
    pub pseudo: Option<String>,
    pub email: String,
    pub profile_picture: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct LoginRequest {
    pub pseudo: String,
    pub password: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RegisterRequest {
    pub name: String,
    pub pseudo: String,
    pub email: String,
    pub password: String,
    pub confirm_password: String,
    pub profile_picture: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct LoginResponse {
    pub session_id: String,
    pub expires_in: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: i64,
    pub iat: i64,
    pub sid: Option<String>,
}
