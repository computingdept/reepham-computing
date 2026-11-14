# RHS Computing — My Work score API (Cloudflare Free pilot)

This is the **separate backend only** for `rhsccs.org`, which stays on GitHub Pages.
It has not been deployed or connected to the website yet. The existing fictional
browser-local My Work demonstration is deliberately untouched.

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
