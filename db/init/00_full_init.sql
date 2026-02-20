-- 00_full_init.sql
-- One-shot, idempotent PostgreSQL setup for Loinstante.
-- Covers users, sessions, metadata, and profile picture support.

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  pseudo VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_picture TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON public.users (email);
CREATE UNIQUE INDEX IF NOT EXISTS users_pseudo_unique ON public.users (pseudo);

-- Ensure profile_picture can store uploaded base64 images even on existing DBs
ALTER TABLE public.users
  ALTER COLUMN profile_picture TYPE TEXT;

-- Seed test user (idempotent)
INSERT INTO public.users (name, pseudo, email, password, profile_picture)
VALUES (
  'Test User',
  'tester',
  'tester@example.com',
  'secret',
  'https://api.dicebear.com/9.x/pixel-art/png?seed=tester'
)
ON CONFLICT (email) DO UPDATE
SET profile_picture = EXCLUDED.profile_picture;

-- Sessions table
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  fingerprint TEXT NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ DEFAULT now(),
  last_ip TEXT,
  last_user_agent TEXT
);

-- Backward-compatible safety for existing DBs created with older schema
ALTER TABLE public.sessions
  ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS last_ip TEXT,
  ADD COLUMN IF NOT EXISTS last_user_agent TEXT;

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON public.sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON public.sessions(last_seen);
CREATE INDEX IF NOT EXISTS idx_sessions_last_ip ON public.sessions(last_ip);
