-- Fictional-pupil pilot only. No real names, emails, UPNs or other identity fields.
CREATE TABLE IF NOT EXISTS practice_codes (
  code TEXT PRIMARY KEY,
  cohort TEXT NOT NULL CHECK (cohort IN ('Y10', 'Y11', 'Y12', 'Y13')),
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS assignments (
  assignment_key TEXT PRIMARY KEY,
  cohort TEXT NOT NULL CHECK (cohort IN ('Y10', 'Y11', 'Y12', 'Y13')),
  item_id TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS assignments_by_cohort ON assignments (cohort, active);

CREATE TABLE IF NOT EXISTS attempts (
  attempt_id TEXT PRIMARY KEY,
  code TEXT NOT NULL REFERENCES practice_codes(code),
  assignment_key TEXT NOT NULL REFERENCES assignments(assignment_key),
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  level TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL CHECK (source IN ('skill', 'practice')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS attempts_by_code_assignment ON attempts (code, assignment_key);
CREATE INDEX IF NOT EXISTS attempts_recent ON attempts (code, created_at);
