-- RHS Computing: ONE-DAY PILOT 2026-11-19 (UK time).
-- Staging only: the work set is INACTIVE until the separate activation query.
-- Existing pupil records, attempts and assignment keys are never deleted or reset.
-- Review the database and run only in the intended production D1 database.
-- The backdated expiry anchor is a workaround for the current seven-day Worker limit.
-- This approach is intentionally for the 19 November 2026 pilot ONLY.

-- Optional EARLY CLOSE. Normally no action is needed: the seven-day Worker
-- expiry anchor automatically closes the pilot at 23:59:59 UK on 19 Nov.
-- Use only if the pilot needs to stop ahead of schedule.
UPDATE work_sets SET active = 0
WHERE id IN ('pilot-20261119-Y11','pilot-20261119-Y12','pilot-20261119-Y13');

SELECT id, title, active FROM work_sets WHERE id LIKE 'pilot-20261119-%';
