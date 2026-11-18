# RHS Computing — My Work score API (Cloudflare Free pilot)

This is the **separate backend** for `rhsccs.org`, which stays on GitHub Pages.
The My Work Worker is deployed on Cloudflare. Teacher operations must use the
existing teacher secret, never a token embedded in public website files.

## Scope and safeguards

- No pupil names, email addresses or school account identifiers are accepted.
- A privately held school list can associate random practice codes with pupils.
  Because that link exists, codes and results should be treated as pseudonymised
  personal information by the school, despite the absence of names here.
- The pupil uses a random practice code only: **not** a school account login.
  Someone who knows another pupil's code can impersonate them, so these marks
  are evidence of practice, not secure formal assessments.
- Staff endpoints require a strong `TEACHER_TOKEN` stored as a Cloudflare secret,
  not embedded in `rhsccs.org` JavaScript or GitHub.
- The browser is permitted to connect only from `https://rhsccs.org` (CORS).
  CORS is not authentication; staff endpoints also enforce the secret.
- The same storage supports four separate cohorts: Year 10 / Year 11 (J277)
  and **Year 12 / Year 13 (H446)**. The initial A Level allocation is 10
  practice codes for Year 12 and 10 for Year 13. Codes are generated only
  when the backend is deployed, not committed to GitHub.
- Practice entry and submission honour UK-time lunchtime (12:30–13:20) and
  after-school (15:30–midnight) windows. Staff with the teacher token can
  override them for classroom demonstrations.
- Rate limit: up to 8 completed attempts per code per minute. Replays of the
  same `attemptId` do not duplicate a score.
- Scores reported by a public webpage are not independently tamper-proof.
  Keep them formative and review anomalous attempts.

## API (version 1)

| Method and path | Access | Purpose |
| --- | --- | --- |
| `GET /v1/health` | Public | Health check |
| `POST /v1/work` | Practice code | Assigned tasks and best scores |
| `POST /v1/attempts` | Practice code | Save one complete attempt |
| `POST /v1/teacher/codes` | Teacher secret | Issue random class practice codes |
| `POST /v1/teacher/assignments` | Teacher secret | Assign an existing J277 activity to a cohort |
| `GET /v1/teacher/progress?cohort=Y10` | Teacher secret | Pseudonymous progress table (Y10–Y13) |
| `POST /v1/teacher/logins` | Teacher secret | Provision anonymous username / PIN logins with a mandatory expected year |
| `POST /v1/teacher/audit-cohorts` | Teacher secret | Preview all active logins against the complete private roster; separately confirm approved corrections |
| `POST /v1/teacher/work-sets` | Teacher secret | Create one combined Classwork or Homework assignment with 1–25 Skills/Revision Practice activities |
| `GET /v1/teacher/work-sets?cohort=Y12` | Teacher secret | Review combined assignments for a year without changing database records |
| `GET /v1/teacher/assignment-inventory?cohort=Y12` | Teacher secret | Count active legacy and combined allocations before publishing; read-only |

### Combined assignments (Classwork and Homework)

The Set Work screen now provides a clickable activity checklist for Year 10–13.
Each published work set has one title, recipient scope (one anonymous login or
the whole year), and multiple task links. Student My Work groups those activities
under the single work-set title. There is no automatic assignment on login;
the teacher must explicitly review and publish a work set.

- **Classwork** is accessible at any hour while assigned, for seven days after
  publication. Expired work disappears but submitted attempts are preserved.
- **Homework** uses the existing independent-work windows: Mon–Fri 12:30–13:20
  and 15:30–midnight; all day weekends (Europe/London timezone). The teacher
  must choose a due date; it remains available through that UK date.
- School holidays and INSET days are **not yet represented** in the Worker's
  schedule; they currently follow the normal weekday windows. Do not promise
  all-day weekday-holiday access until a school calendar is configured.
- Existing assignments and scores are never cleared or converted automatically.
  Activity-level attempts are still keyed by the original activity; if the same
  activity is assigned again in another work set, previous attempts are shared.
  Only the current connected Conversion Grid and H446 1.4.1(a) MCQ activities
  send first-checked-question scores. Other catalogue activities open through
  their links but their automatic reporting is not yet integrated.

`work_sets` and `work_set_items` are additive tables. A teacher's first successful
combined-assignment submission creates them if absent (the authenticated endpoint
uses `CREATE TABLE IF NOT EXISTS`); a fresh database can also use `schema.sql`.
No migration deletes logins, historical allocations, or attempts. For a live
rollout, check and back up the D1 assignment/attempt counts first.

### Auditing the original year-group roster

In [the teacher page](https://rhsccs.org/my-work-teacher-assign-pilot.html), open
**Review Work → Audit all logins against the original year groups**. Paste only
the anonymous username and year from the complete original roster (e.g.
`imaginarybird<TAB>Y13`), with no PINs, pupil names or practice codes. You can
also use the locally saved class lists if they contain every account.

The preview compares **every active login** against the supplied list, including
accounts with correct years and accounts whose years were incorrectly set. It
blocks changes if any active login is omitted, any roster username is missing,
or duplicate/invalid usernames are supplied. An explicit checkbox is required
for the listed corrections. The confirmation includes a roster-and-database
fingerprint so a changed registration requires a fresh preview; one guarded
SQLite update makes the corrections together. Only `practice_codes.cohort`
changes: usernames, PIN hashes, practice codes, sessions, individual assignments,
and historical attempts are untouched.

New batches sent to `/v1/teacher/logins` **must** include `expectedCohort` on
every item, e.g. `{ "username": "imaginarybird", "code": "P-...", "password": "1234", "expectedCohort": "Y13" }`.
The endpoint checks the code's **actual cohort** for every row before importing
the batch, including retries, and rejects any mismatch. Do not try to fix a
wrong-year roster by importing the login again; use the protected audit.

Example result submission (all fictional):

```json
{
  "code": "P-Q7K3W6M9TH",
  "assignmentKey": "10|j277-practice-11-components|",
  "attemptId": "7b92e5a9-6e5c-476d-8320-331ca8a4a6b1",
  "score": 80,
  "level": "",
  "source": "practice"
}
```

The `assignmentKey` shape follows the current J277 pilot:
`10|j277-skill-p1-convert|both` or `10|j277-practice-11-components|`.
Both Easy and Medium skill attempts are recorded with their own `level`.
The H446 activity catalogue still needs to be mapped before assigning live
A Level work. Its reserved keys follow the same contract, e.g.
`12|h446-practice-141-data-types|`; no H446 tasks or scores are fabricated.

## After Jerome creates his Cloudflare Free account

1. Copy `wrangler.toml.example` to `wrangler.toml` (local-only).
2. Create a D1 database named `rhsc-my-work-pilot` and add its ID in `wrangler.toml`.
3. Apply `schema.sql` to the new database with Wrangler.
4. Set a long random teacher secret using `wrangler secret put TEACHER_TOKEN`.
5. Deploy the Worker using Wrangler and check `/v1/health` and sample fictional records.
6. Connect the existing J277 My Work page and quiz completion handlers using
   the deployed `workers.dev` URL, while preserving a fallback for the current
   fictional demonstration. Do not turn on real-pupil mode prematurely.
7. Issue 10 code-only profiles for Year 12 and 10 for Year 13 through the
   teacher endpoint, then enter the code-to-name mapping in the school's
   private list. Keep the generated codes out of repository files.

Never put the teacher token, pupil-code/name mapping, an exported results CSV,
or production practice codes into GitHub. Export and retain mapping and backups
under school controls.

## Test

`node --test test/index.test.mjs` (Node 22+; no dependencies).
