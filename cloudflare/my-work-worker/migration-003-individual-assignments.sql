-- Additive migration for individually assigned My Work activities.
-- Apply to the existing D1 database before deploying the updated Worker.
-- Does not change practice codes, logins, password hashes, or existing attempts.
CREATE TABLE IF NOT EXISTS student_assignments (
  code TEXT NOT NULL REFERENCES practice_codes(code),
  assignment_key TEXT NOT NULL REFERENCES assignments(assignment_key),
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (code, assignment_key)
);

CREATE INDEX IF NOT EXISTS student_assignments_by_code
  ON student_assignments (code, active);
