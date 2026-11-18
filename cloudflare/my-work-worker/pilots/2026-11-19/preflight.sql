-- RHS Computing: ONE-DAY PILOT 2026-11-19 (UK time).
-- Staging only: the work set is INACTIVE until the separate activation query.
-- Existing pupil records, attempts and assignment keys are never deleted or reset.
-- Review the database and run only in the intended production D1 database.
-- The backdated expiry anchor is a workaround for the current seven-day Worker limit.
-- This approach is intentionally for the 19 November 2026 pilot ONLY.

-- READ ONLY. Confirm this is the production student database, not another D1.
-- The first four tables must already exist. The last two can be added by staging.
SELECT name AS existing_table FROM sqlite_master
WHERE type = 'table' AND name IN
  ('practice_codes','assignments','attempts','login_profiles','work_sets','work_set_items')
ORDER BY name;

-- If work_sets already exists, this optional query shows currently active sets.
-- Run the next line separately only when work_sets appeared above:
-- SELECT cohort, title, kind, active, created_at FROM work_sets WHERE active = 1 ORDER BY cohort;
