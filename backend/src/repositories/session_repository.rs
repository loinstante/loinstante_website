use async_trait::async_trait;
use sqlx::{PgPool, Row};
use uuid::Uuid;
use chrono::{Utc, DateTime};

#[derive(Debug, Clone)]
pub struct Session {
    pub id: Uuid,
    pub user_id: i32,
    pub expires_at: DateTime<Utc>,
    pub fingerprint: String,
    pub revoked: bool,
    pub created_at: DateTime<Utc>,
}

#[async_trait]
pub trait SessionRepository: Send + Sync + 'static {
    async fn create_session(&self, id: Uuid, user_id: i32, expires_at: DateTime<Utc>, fingerprint: &str) -> Result<(), sqlx::Error>;
    async fn find_by_id(&self, id: Uuid) -> Result<Option<Session>, sqlx::Error>;
    async fn revoke_by_id(&self, id: Uuid) -> Result<(), sqlx::Error>;
    async fn delete_expired(&self) -> Result<u64, sqlx::Error>;
    async fn update_last_seen(&self, id: Uuid, last_ip: &str, last_user_agent: &str) -> Result<(), sqlx::Error>;
} 

pub struct SqlxSessionRepository {
    pub pool: PgPool,
}

impl SqlxSessionRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl SessionRepository for SqlxSessionRepository {
    async fn create_session(&self, id: Uuid, user_id: i32, expires_at: DateTime<Utc>, fingerprint: &str) -> Result<(), sqlx::Error> {
        sqlx::query(
            "INSERT INTO public.sessions (id, user_id, expires_at, fingerprint, revoked) VALUES ($1, $2, $3, $4, false)"
        )
        .bind(id)
        .bind(user_id)
        .bind(expires_at)
        .bind(fingerprint)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn find_by_id(&self, id: Uuid) -> Result<Option<Session>, sqlx::Error> {
        let rec = sqlx::query(
            "SELECT id, user_id, expires_at, fingerprint, revoked, created_at FROM public.sessions WHERE id = $1"
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await?;

        if let Some(r) = rec {
            let session = Session {
                id: r.try_get::<Uuid, _>("id")?,
                user_id: r.try_get::<i32, _>("user_id")?,
                expires_at: r.try_get::<DateTime<Utc>, _>("expires_at")?,
                fingerprint: r.try_get::<String, _>("fingerprint")?,
                revoked: r.try_get::<bool, _>("revoked")?,
                created_at: r.try_get::<DateTime<Utc>, _>("created_at")?,
            };
            Ok(Some(session))
        } else {
            Ok(None)
        }
    }

    async fn revoke_by_id(&self, id: Uuid) -> Result<(), sqlx::Error> {
        sqlx::query(
            "UPDATE public.sessions SET revoked = true WHERE id = $1"
        )
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete_expired(&self) -> Result<u64, sqlx::Error> {
        let res = sqlx::query(
            "DELETE FROM public.sessions WHERE expires_at < now()"
        )
        .execute(&self.pool)
        .await?;

        Ok(res.rows_affected())
    }

    async fn update_last_seen(&self, id: Uuid, last_ip: &str, last_user_agent: &str) -> Result<(), sqlx::Error> {
        sqlx::query(
            "UPDATE public.sessions SET last_seen = now(), last_ip = $1, last_user_agent = $2 WHERE id = $3"
        )
        .bind(last_ip)
        .bind(last_user_agent)
        .bind(id)
        .execute(&self.pool)
        .await?;

        Ok(())
    }
}

