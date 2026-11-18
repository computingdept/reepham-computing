// One-off pilot fallback for an existing Cloudflare D1 database.
// Generates reviewable SQL only; it never connects to or mutates a live database.
// Intended for a teacher to review and execute in the D1 console in two stages.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'cloudflare/my-work-worker/pilots/2026-11-19');
const items = JSON.parse(readFileSync(join(root, 'assets/j277-assignment-catalog.json'), 'utf8')).items;
const PILOT_DATE = '2026-11-19';
// The existing Worker expires Classwork seven days after its created_at value.
// Intentionally use a seven-day-old date and stage inactive so activation on
// the pilot morning results in an automatic expiry at 23:59:59 UK time.
// Do NOT confuse this technical expiry field with the actual launch date.
const EXPIRY_ANCHOR = '2026-11-12 23:59:59';
const years = [{year:11,course:'j277',count:95},{year:12,course:'h446',count:173},{year:13,course:'h446',count:173}];
const quote = value => "'" + String(value).replaceAll("'", "''") + "'";
const header = `-- RHS Computing: ONE-DAY PILOT ${PILOT_DATE} (UK time).
-- Staging only: the work set is INACTIVE until the separate activation query.
-- Existing pupil records, attempts and assignment keys are never deleted or reset.
-- Review the database and run only in the intended production D1 database.
-- The backdated expiry anchor is a workaround for the current seven-day Worker limit.
-- This approach is intentionally for the 19 November 2026 pilot ONLY.
`;

mkdirSync(output, {recursive:true});
writeFileSync(join(output,'preflight.sql'), `${header}
-- READ ONLY. Confirm this is the production student database, not another D1.
-- The first four tables must already exist. The last two can be added by staging.
SELECT name AS existing_table FROM sqlite_master
WHERE type = 'table' AND name IN
  ('practice_codes','assignments','attempts','login_profiles','work_sets','work_set_items')
ORDER BY name;

-- If work_sets already exists, this optional query shows currently active sets.
-- Run the next line separately only when work_sets appeared above:
-- SELECT cohort, title, kind, active, created_at FROM work_sets WHERE active = 1 ORDER BY cohort;
`);
for (const {year,course,count} of years) {
  const cohort = 'Y' + year;
  const id = `pilot-20261119-${cohort}`;
  const title = `Pilot Year ${year}`;
  const selected = items.filter(item => item.id.startsWith(course + '-'));
  if (selected.length !== count || new Set(selected.map(item=>item.id)).size !== count) {
    throw new Error(`Unexpected ${course} activity count: ${selected.length} (expected ${count})`);
  }
  const rows = selected.map((item,index) => {
    if (!/^(j277|h446)-(?:skill|practice)-[a-z0-9-]+$/.test(item.id)) throw Error('Invalid item: ' + item.id);
    const level = item.type === 'skill' ? 'both' : '';
    const key = `${year}|${item.id}|${level}`;
    return {key,itemId:item.id,level,index};
  });
  const assignmentValues = rows.map(r=>`(${[r.key,cohort,r.itemId,r.level].map(quote).join(', ')}, 0)`).join(',\n  ');
  const membershipValues = rows.map(r=>`(${quote(id)}, ${quote(r.key)}, ${r.index})`).join(',\n  ');
  const sql = `${header}
-- Add the existing combined-assignment tables if this database has not used them.
CREATE TABLE IF NOT EXISTS work_sets (
  id TEXT PRIMARY KEY, cohort TEXT NOT NULL CHECK (cohort IN ('Y10','Y11','Y12','Y13')),
  title TEXT NOT NULL, kind TEXT NOT NULL CHECK (kind IN ('classwork','homework')),
  scope TEXT NOT NULL CHECK (scope IN ('cohort','individual')),
  target_code TEXT REFERENCES practice_codes(code), due_date TEXT,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS work_set_items (
  work_set_id TEXT NOT NULL REFERENCES work_sets(id),
  assignment_key TEXT NOT NULL REFERENCES assignments(assignment_key),
  position INTEGER NOT NULL, PRIMARY KEY (work_set_id, assignment_key)
);
CREATE INDEX IF NOT EXISTS work_sets_by_year ON work_sets(cohort, active, target_code);

-- 1. Preserve any existing assignment row; add only missing activity keys.
INSERT OR IGNORE INTO assignments (assignment_key, cohort, item_id, level, active) VALUES
  ${assignmentValues};

-- 2. One named assignment for the entire year. INACTIVE until the pilot day.
INSERT OR IGNORE INTO work_sets
  (id, cohort, title, kind, scope, target_code, due_date, active, created_at)
VALUES (${[id,cohort,title,'classwork','cohort'].map(quote).join(', ')}, NULL, ${quote(PILOT_DATE)}, 0, ${quote(EXPIRY_ANCHOR)});

-- 3. Attach every published activity to this ONE assignment.
INSERT OR IGNORE INTO work_set_items (work_set_id, assignment_key, position) VALUES
  ${membershipValues};

-- 4. Verify exactly ${count} items and an inactive pilot. Read-only.
SELECT s.title, s.cohort, s.active, s.created_at, s.due_date,
  COUNT(si.assignment_key) AS attached_activities
FROM work_sets s LEFT JOIN work_set_items si ON si.work_set_id = s.id
WHERE s.id = ${quote(id)} GROUP BY s.id;
`;
  writeFileSync(join(output, `stage-${cohort.toLowerCase()}.sql`), sql);
}

writeFileSync(join(output,'activate.sql'), `${header}
-- Run ONLY on Thu 19 November 2026 after verifying the three staged sets.
-- Refuses to activate before or after that UK calendar date (GMT in November).
UPDATE work_sets SET active = 1
WHERE id IN ('pilot-20261119-Y11','pilot-20261119-Y12','pilot-20261119-Y13')
  AND date('now') = '${PILOT_DATE}' AND active = 0;

SELECT s.title, s.cohort, s.active, s.created_at, s.due_date,
  COUNT(si.assignment_key) AS activities
FROM work_sets s LEFT JOIN work_set_items si ON si.work_set_id = s.id
WHERE s.id LIKE 'pilot-20261119-%'
GROUP BY s.id ORDER BY s.cohort;
`);

writeFileSync(join(output,'close-early.sql'), `${header}
-- Optional EARLY CLOSE. Normally no action is needed: the seven-day Worker
-- expiry anchor automatically closes the pilot at 23:59:59 UK on 19 Nov.
-- Use only if the pilot needs to stop ahead of schedule.
UPDATE work_sets SET active = 0
WHERE id IN ('pilot-20261119-Y11','pilot-20261119-Y12','pilot-20261119-Y13');

SELECT id, title, active FROM work_sets WHERE id LIKE 'pilot-20261119-%';
`);

writeFileSync(join(output,'results.sql'), `${header}
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
`);

console.log('Prepared INACTIVE one-day pilot SQL for Y11 (95), Y12 (173) and Y13 (173), plus activation, closure and reporting queries.');
