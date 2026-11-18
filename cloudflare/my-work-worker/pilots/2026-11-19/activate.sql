-- RHS Computing: ONE-DAY PILOT 2026-11-19 (UK time).
-- Staging only: the work set is INACTIVE until the separate activation query.
-- Existing pupil records, attempts and assignment keys are never deleted or reset.
-- Review the database and run only in the intended production D1 database.
-- The backdated expiry anchor is a workaround for the current seven-day Worker limit.
-- This approach is intentionally for the 19 November 2026 pilot ONLY.

-- Run ONLY on Thu 19 November 2026 after verifying the three staged sets.
-- Refuses to activate before or after that UK calendar date (GMT in November).
UPDATE work_sets SET active = 1
WHERE id IN ('pilot-20261119-Y11','pilot-20261119-Y12','pilot-20261119-Y13')
  AND date('now') = '2026-11-19' AND active = 0;

SELECT s.title, s.cohort, s.active, s.created_at, s.due_date,
  COUNT(si.assignment_key) AS activities
FROM work_sets s LEFT JOIN work_set_items si ON si.work_set_id = s.id
WHERE s.id LIKE 'pilot-20261119-%'
GROUP BY s.id ORDER BY s.cohort;
