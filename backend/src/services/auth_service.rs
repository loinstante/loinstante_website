use crate::models::{LoginRequest, LoginResponse};
use crate::repositories::{UserRepository, SessionRepository};
use chrono::{Utc, Duration};
use thiserror::Error;
use uuid::Uuid;
use crate::utils::fingerprint::compute_fingerprint;

#[derive(Debug, Error)]
pub enum AuthError {
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("Repository error: {0}")]
    RepoError(#[from] sqlx::Error),
    #[error("Token creation error: {0}")]
    TokenError(#[from] jsonwebtoken::errors::Error),
}

pub struct AuthService;

impl AuthService {
    pub async fn login<R: UserRepository, S: SessionRepository>(repo: &R, session_repo: &S, req: &LoginRequest, jwt_secret: &str, cookie_secret: &str, user_agent: &str, remote_ip: &str, session_ttl_seconds: i64) -> Result<LoginResponse, AuthError> {
        let maybe_user = repo.find_by_pseudo(&req.pseudo).await.map_err(AuthError::RepoError)?;

        let user = match maybe_user {
            Some(u) => u,
            None => return Err(AuthError::InvalidCredentials),
        };

        // Plain-text compare as requested (TODO: hash in prod)
        if user.password != req.password {
            return Err(AuthError::InvalidCredentials);
        }

        let now = Utc::now();
        let exp = now + Duration::seconds(session_ttl_seconds);

        // keep jwt_secret param for API compatibility (silence unused warning)
        let _ = jwt_secret;

        // create session id
        let session_id = Uuid::new_v4();

        let fingerprint = compute_fingerprint(user_agent, remote_ip, cookie_secret);

        // persist session
        session_repo.create_session(session_id, user.id, exp, &fingerprint).await.map_err(AuthError::RepoError)?;

        Ok(LoginResponse { session_id: session_id.to_string(), expires_in: (exp.timestamp() - now.timestamp()) })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::{User, UpdateProfileRequest};
    use async_trait::async_trait;

    struct MockRepo {
        user: Option<User>,
    }

    #[async_trait]
    impl UserRepository for MockRepo {
        async fn find_by_pseudo(&self, _pseudo: &str) -> Result<Option<User>, sqlx::Error> {
            Ok(self.user.clone())
        }

        async fn find_by_id(&self, _id: i32) -> Result<Option<User>, sqlx::Error> {
            Ok(self.user.clone())
        }

        async fn update_profile(&self, _id: i32, _payload: &UpdateProfileRequest) -> Result<Option<User>, sqlx::Error> {
            Ok(self.user.clone())
        }

        async fn update_profile_picture(&self, _id: i32, _profile_picture: Option<String>) -> Result<Option<User>, sqlx::Error> {
            Ok(self.user.clone())
        }
    }

    // Simple mock session repo that does nothing
    struct MockSessionRepo;
    #[async_trait]
    impl crate::repositories::SessionRepository for MockSessionRepo {
        async fn create_session(&self, _id: Uuid, _user_id: i32, _expires_at: chrono::DateTime<Utc>, _fingerprint: &str) -> Result<(), sqlx::Error> { Ok(()) }
        async fn find_by_id(&self, _id: Uuid) -> Result<Option<crate::repositories::session_repository::Session>, sqlx::Error> { Ok(None) }
        async fn revoke_by_id(&self, _id: Uuid) -> Result<(), sqlx::Error> { Ok(()) }
        async fn delete_expired(&self) -> Result<u64, sqlx::Error> { Ok(0) }
        async fn update_last_seen(&self, _id: Uuid, _last_ip: &str, _last_user_agent: &str) -> Result<(), sqlx::Error> { Ok(()) }
    }

    #[tokio::test]
    async fn login_success() {
        let user = User {
            id: 1,
            name: "Test".into(),
            pseudo: Some("tester".into()),
            email: "t@example.com".into(),
            password: "secret".into(),
            profile_picture: None,
            created_at: chrono::Utc::now(),
        };

        let repo = MockRepo { user: Some(user) };
        let session_repo = MockSessionRepo;
        let req = LoginRequest { pseudo: "tester".into(), password: "secret".into() };
        let jwt_secret = "mytestsecret";
        let cookie_secret = "cookiesecret";

        let res = AuthService::login(&repo, &session_repo, &req, jwt_secret, cookie_secret, "ua", "127.0.0.1", 3600).await.expect("login should succeed");
        assert!(!res.session_id.is_empty());
    }

    #[tokio::test]
    async fn login_wrong_password() {
        let user = User {
            id: 1,
            name: "Test".into(),
            pseudo: Some("tester".into()),
            email: "t@example.com".into(),
            password: "secret".into(),
            profile_picture: None,
            created_at: chrono::Utc::now(),
        };

        let repo = MockRepo { user: Some(user) };
        let session_repo = MockSessionRepo;
        let req = LoginRequest { pseudo: "tester".into(), password: "wrong".into() };
        let jwt_secret = "mytestsecret";
        let cookie_secret = "cookiesecret";

        let res = AuthService::login(&repo, &session_repo, &req, jwt_secret, cookie_secret, "ua", "127.0.0.1", 3600).await;
        assert!(matches!(res.unwrap_err(), AuthError::InvalidCredentials));
    }

    #[tokio::test]
    async fn login_no_user() {
        let repo = MockRepo { user: None };
        let session_repo = MockSessionRepo;
        let req = LoginRequest { pseudo: "nonexist".into(), password: "whatever".into() };
        let jwt_secret = "mytestsecret";
        let cookie_secret = "cookiesecret";

        let res = AuthService::login(&repo, &session_repo, &req, jwt_secret, cookie_secret, "ua", "127.0.0.1", 3600).await;
        assert!(matches!(res.unwrap_err(), AuthError::InvalidCredentials));
    }
}
