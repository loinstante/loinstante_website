-- Add metadata to sessions for theft-detection and auditing
ALTER TABLE public.sessions
  ADD COLUMN IF NOT EXISTS last_seen TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS last_ip TEXT,
  ADD COLUMN IF NOT EXISTS last_user_agent TEXT;

CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON public.sessions(last_seen);
CREATE INDEX IF NOT EXISTS idx_sessions_last_ip ON public.sessions(last_ip);
