-- RHS Computing: ONE-DAY PILOT 2026-11-19 (UK time).
-- Staging only: the work set is INACTIVE until the separate activation query.
-- Existing pupil records, attempts and assignment keys are never deleted or reset.
-- Review the database and run only in the intended production D1 database.
-- The backdated expiry anchor is a workaround for the current seven-day Worker limit.
-- This approach is intentionally for the 19 November 2026 pilot ONLY.

-- Pilot-only attempts: excludes results recorded BEFORE the pilot day.
-- Codes are anonymous. Match to the school's existing private roster if needed.
SELECT p.cohort AS year_group, COALESCE(l.username_key, a.code) AS anonymous_username,
  COUNT(DISTINCT a.assignment_key) AS activities_with_scores,
  COUNT(*) AS recorded_attempts,
  ROUND(AVG(a.score), 1) AS mean_recorded_score
FROM attempts a JOIN practice_codes p ON p.code = a.code
LEFT JOIN login_profiles l ON l.code = a.code
JOIN work_set_items si ON si.assignment_key = a.assignment_key
JOIN work_sets s ON s.id = si.work_set_id
WHERE s.id IN ('pilot-20261119-Y11','pilot-20261119-Y12','pilot-20261119-Y13')
  AND a.created_at >= '2026-11-19 00:00:00'
  AND a.created_at < '2026-11-20 00:00:00'
GROUP BY p.cohort, a.code, l.username_key ORDER BY p.cohort, activities_with_scores DESC;

-- Most-attempted activities, useful for evaluating the one-day trial.
SELECT s.cohort AS year_group, ass.item_id,
  COUNT(DISTINCT a.code) AS pupils_with_scores,
  COUNT(a.attempt_id) AS attempts,
  ROUND(AVG(a.score), 1) AS mean_score
FROM work_sets s JOIN work_set_items si ON si.work_set_id = s.id
JOIN assignments ass ON ass.assignment_key = si.assignment_key
LEFT JOIN attempts a ON a.assignment_key = ass.assignment_key
  AND a.created_at >= '2026-11-19 00:00:00'
  AND a.created_at < '2026-11-20 00:00:00'
WHERE s.id IN ('pilot-20261119-Y11','pilot-20261119-Y12','pilot-20261119-Y13')
GROUP BY s.cohort, ass.item_id ORDER BY s.cohort, pupils_with_scores DESC, ass.item_id;
