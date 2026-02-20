use async_trait::async_trait;
use crate::models::{User, UpdateProfileRequest};
use sqlx::PgPool;

#[async_trait]
pub trait UserRepository: Send + Sync + 'static {
    async fn find_by_pseudo(&self, pseudo: &str) -> Result<Option<User>, sqlx::Error>;
    async fn find_by_id(&self, id: i32) -> Result<Option<User>, sqlx::Error>;
    async fn update_profile(&self, id: i32, payload: &UpdateProfileRequest) -> Result<Option<User>, sqlx::Error>;
    async fn update_profile_picture(&self, id: i32, profile_picture: Option<String>) -> Result<Option<User>, sqlx::Error>;
}

pub struct SqlxUserRepository {
    pub pool: PgPool,
}

impl SqlxUserRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl UserRepository for SqlxUserRepository {
    async fn find_by_pseudo(&self, pseudo: &str) -> Result<Option<User>, sqlx::Error> {
        let rec = sqlx::query_as::<_, User>(
            "SELECT id, name, pseudo, email, password, profile_picture, created_at FROM public.users WHERE pseudo = $1",
        )
        .bind(pseudo)
        .fetch_optional(&self.pool)
        .await?;

        Ok(rec)
    }

    async fn find_by_id(&self, id: i32) -> Result<Option<User>, sqlx::Error> {
        let rec = sqlx::query_as::<_, User>(
            "SELECT id, name, pseudo, email, password, profile_picture, created_at FROM public.users WHERE id = $1",
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;

        Ok(rec)
    }

    async fn update_profile(&self, id: i32, payload: &UpdateProfileRequest) -> Result<Option<User>, sqlx::Error> {
        let pseudo = payload
            .pseudo
            .as_ref()
            .map(|value| value.trim())
            .filter(|value| !value.is_empty())
            .map(|value| value.to_string());

        let profile_picture = payload
            .profile_picture
            .as_ref()
            .map(|value| value.trim())
            .filter(|value| !value.is_empty())
            .map(|value| value.to_string());

        let rec = sqlx::query_as::<_, User>(
            "UPDATE public.users
             SET name = $1, pseudo = $2, email = $3, profile_picture = $4
             WHERE id = $5
             RETURNING id, name, pseudo, email, password, profile_picture, created_at",
        )
        .bind(payload.name.trim())
        .bind(pseudo)
        .bind(payload.email.trim())
        .bind(profile_picture)
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;

        Ok(rec)
    }

    async fn update_profile_picture(&self, id: i32, profile_picture: Option<String>) -> Result<Option<User>, sqlx::Error> {
        let rec = sqlx::query_as::<_, User>(
            "UPDATE public.users
             SET profile_picture = $1
             WHERE id = $2
             RETURNING id, name, pseudo, email, password, profile_picture, created_at",
        )
        .bind(profile_picture)
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;

        Ok(rec)
    }
}
