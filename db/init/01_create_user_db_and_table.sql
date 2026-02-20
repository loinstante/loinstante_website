-- 01_create_user_db_and_table.sql
-- PostgreSQL initialization script (idempotent)
-- Create the "users" table and unique indexes if they don't already exist.

-- Note: The official Postgres Docker image executes .sql files in /docker-entrypoint-initdb.d
-- against the database specified by the environment variable POSTGRES_DB. Therefore this
-- script should not attempt to CREATE DATABASE or use psql's `\connect` meta-command.

CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  pseudo VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(512),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create unique indexes if they do not exist (safer than ALTER TABLE ... ADD CONSTRAINT in init scripts)
CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON public.users (email);
CREATE UNIQUE INDEX IF NOT EXISTS users_pseudo_unique ON public.users (pseudo);

-- Insert a test user (idempotent)
INSERT INTO public.users (name, pseudo, email, password)
VALUES ('Test User', 'tester', 'tester@example.com', 'secret')
ON CONFLICT (email) DO NOTHING;

-- Helpful notes (commented):
-- - Store passwords hashed (bcrypt/argon2). Do NOT store plaintext passwords in production.
-- - To apply this script manually against a running DB, you can run:
--     docker compose exec db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/01_create_user_db_and_table.sql
--   or copy the SQL and run it with psql from your host:
--     psql "postgres://postgres:postgres@localhost:5432/Users" -f 01_create_user_db_and_table.sql
