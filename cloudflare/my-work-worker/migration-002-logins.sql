-- Run this once on the existing D1 database before deploying login-enabled Worker.
-- Anonymous site usernames are stored as SHA-256 keys, never in plain text.
-- The school-only spreadsheet remains the source of code-to-pupil mappings.

CREATE TABLE IF NOT EXISTS login_profiles (
  username_key TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE REFERENCES practice_codes(code),
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS login_profiles_by_code ON login_profiles (code);

CREATE TABLE IF NOT EXISTS login_sessions (
  token_hash TEXT PRIMARY KEY,
  code TEXT NOT NULL REFERENCES practice_codes(code),
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS login_sessions_by_code ON login_sessions (code);
CREATE INDEX IF NOT EXISTS login_sessions_expiry ON login_sessions (expires_at);
