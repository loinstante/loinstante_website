use async_trait::async_trait;
use crate::models::User;
use sqlx::PgPool;

#[async_trait]
pub trait UserRepository: Send + Sync + 'static {
    async fn find_by_pseudo(&self, pseudo: &str) -> Result<Option<User>, sqlx::Error>;
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
}
