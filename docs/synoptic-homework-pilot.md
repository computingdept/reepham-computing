# Synoptic Homework pilot — agreed design and release contract

**Status:** Design baseline v0.4 · 19 November 2026 · **Student homework page and first-check API built for Year 13 and Year 11; no synoptic assignment released to pupils. Classroom QA is pending.**

**Purpose:** One predictable, independently completed homework assignment that
combines selected Skills, synoptic Paper 1 and Paper 2 retrieval, and useful
feedback. The teacher controls the assignment; the learner follows it without
having to browse the whole revision catalogue.

This document is the **decision record** for this pilot. Review and update it
before changing the implementation or expanding to other year groups. The
existing Trust question-bank architecture remains in
[trust-question-bank-architecture.md](trust-question-bank-architecture.md).

## Approved pilot scope

| Decision | Pilot rule |
| --- | --- |
| Priority cohorts | **Year 13 / H446 first; Year 11 / J277 second** |
| Curriculum scope | Any question from the relevant Paper 1 or Paper 2 bank. These cohorts have been taught the course; no taught-topic gate is needed for the initial pilot. |
| Assignment formula | 1–2 teacher-selected Skills + **10 Paper 1 MCQs** + **10 Paper 2 MCQs** + feedback/review |
| Target working time | Approximately **30–40 minutes**. Estimate the Skills separately; do not promise 40 minutes for every possible Skill combination. |
| Question selection | Automatically select **previously unused questions** from existing original RHSC practice banks, balanced across specification groups and Skills. |
| No-repeat rule | Each published homework retires its 20 question IDs **for that year group**. Never reuse one in a later homework unless a separate, explicit teacher-approved reset policy is introduced. Previewing does **not** consume questions. |
| Fixed questions | Generate **one fixed set of 20 questions per assignment** at creation, reviewable by the teacher and the same for every learner assigned that homework. Refresh/resume never redraws questions. |
| Marking | Save the first checked answer per question. Completion is separate from accuracy; a completed quiz requires all ten answers to be checked. |
| Feedback | Show Paper 1 and Paper 2 first-attempt scores separately, explain incorrect answers, and link to relevant lesson/revision support. Feedback must appear even at a high overall score. |
| Student navigation | Assignment → Skill(s) → Paper 1 → Paper 2 → feedback, with visible **Back to assignment** and **Next activity** routes and resume. |
| Teacher navigation | Choose Year 13 or 11, select 1–2 Skills, generate/review 10+10 questions, set due date, publish. |
| Student visibility | Only assigned activities in My Work. Full topic/Skill selection and the question-bank catalogue belong in the teacher assignment builder. |
| Existing website | **Do not rewrite** current topic revision quizzes, Skills, lessons, teacher results or the Learning Hub during the pilot-engine build. |

### Student-facing sequence

1. Open one homework card from My Work.
2. See a compact list of assigned stages and recorded progress.
3. Open the selected Skill(s); return via **Back to assignment**.
4. Complete Paper 1's 10 synoptic questions, one at a time.
5. Complete Paper 2's 10 synoptic questions, one at a time.
6. See the two scores, missed questions and links to further learning. Return
   to the homework overview or revisit an activity.

No requirement to browse 700–1,570 bank questions, complete a giant pilot
package or navigate through the original revision-topic directory.

### Teacher-facing assignment builder

1. Select cohort (**Y13** or **Y11**) and due date.
2. Pick one or two existing Skills.
3. Generate 10 Paper 1 and 10 Paper 2 items from the matching course bank.
4. Check the question list; replace any inappropriate question before publishing.
5. Publish an **immutable version** of the question selection for that
   assignment. A later edit must create a new version rather than silently
   change the questions under a pupil's saved answers.

The first pilot uses the **same items for the whole class** for comparable
feedback. Later versions could introduce variants deliberately, but that is
not part of this baseline.

### Selection algorithm and failure rules

1. Load the published GitHub banks for the chosen course: H446 for Y13 or J277
   for Y11. Parse only the JSON `SKILLS` array; do not run the source scripts.
2. Retrieve **used question IDs from D1 for this cohort**, including past
   completed/expired synoptic homework. Exclude them before drawing anything.
3. Draw ten questions per paper. First distribute one question across each
   available specification group, then a second, etc. Rotate among distinct
   Skills within each group where possible. Ties are random.
4. Grouping means H446 Paper 1 **1.1–1.5**, H446 Paper 2 **2.1–2.3**
   (combining 2.2.1 and 2.2.2), J277 Paper 1 **1.1–1.6**, and J277 Paper 2
   **2.1–2.5**. A fully stocked paper yields approximately 2 per H446 P1
   group, 3/3/4 for H446 P2, 1–2 per J277 P1 group and 2 per J277 P2 group.
5. Teacher checks the questions and may regenerate the **unpublished** preview.
   Once published, the set and answers are frozen; refresh never rerolls them.
6. If fewer than ten unused valid questions remain in either paper, **stop and
   explain the shortage**. Never silently reuse a question. If one group is
   exhausted but the whole paper still has enough, use available groups.

The no-repeat guarantee is scoped to the **year group** (Y11 or Y13) across its
published homework, not the pupil's browser. It is enforced twice: the
selection engine excludes prior IDs, and a D1 unique constraint rejects a
second publication of the same ID for the same year group—even if two
publishing previews were prepared at the same time.

## Data and marking contract

- Stable assignment ID, version, cohort, due date and selected Skill IDs.
- Exactly 10 stable question IDs from the right course's Paper 1 bank and 10
  from its Paper 2 bank; no duplicate question ID within an assignment.
- Question order, selected options and completion state survive refresh and
  return. The learner must not receive an easier replacement on reload.
- Store **first checked response**, correctness and check time; protect against
  double submission or accidental overwriting of the first attempt.
- A quiz is **completed** after all ten are checked, irrespective of score;
  percent correct is a separate measure.
- Skills without reliable automatic completion tracking must be marked
  **untracked** rather than silently counted as finished. A verified approach
  is required before promising 100% completion of the whole assignment.
- Historical pilot scores need not drive the new pilot experience, but are
  **not deleted** or altered by this work without separate approval.
- Enforce existing learner authentication, homework access windows and due
  rules unless a separate policy change is explicitly agreed.

### Hosting, cost and source-of-truth decision

| Data | Location and rule |
| --- | --- |
| 2,270 MCQs, options, explanations, spec/Skill tags | **GitHub** original `revision/{course}/section-*/bank.js` files. These remain the authoritative question-bank sources. |
| Assignment title, due date, selected Skills and bank commit SHA | **Cloudflare D1**, new `synoptic_homework` table. |
| Each assignment's 20 selected question IDs and frozen marking/feedback snapshots | **Cloudflare D1**, new `synoptic_questions` table. A cohort/question ID pair is unique. |
| Explicit pupil release status | **Cloudflare D1**, additive `synoptic_releases` table. A teacher-only reservation is not visible to learners until a separate confirmed release. |
| Each learner's first-checked answers, progress and scores | **Cloudflare D1**, additive `synoptic_responses` table keyed by homework, anonymous practice code and question ID. No old pilot score is overwritten. |

There is **no Cloudflare copy of the full question bank**. Saving the 20
published question snapshots avoids breaking old homework when GitHub content
is corrected later. The assignment ledger doubles as the used-question history:
no extra history table or GitHub commit on every learner answer is needed.

Cloudflare's published Workers Free limits on 19 November 2026 include 5m D1
rows read/day, 100k rows written/day and 5 GB D1 storage; Worker requests have
a 100k/day allowance. A 63-learner pilot is expected to stay well below these
limits, but the teacher must check the real usage metrics. Free-tier overages
cause temporary query failures rather than silent question reuse. References:
[D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/),
[Workers limits](https://developers.cloudflare.com/workers/platform/limits/).

The backend exposes **teacher-token-protected** endpoints:

- `GET /v1/teacher/synoptic/used?cohort=Y13|Y11` (read-only used IDs).
- `GET /v1/teacher/synoptic/assignments?cohort=Y13|Y11` (teacher audit ledger).
- `POST /v1/teacher/synoptic/publish` (explicit `confirm:true`, validated
  10+10 snapshots, atomic 20-ID reservation). Existing tables remain untouched.
- `POST /v1/teacher/synoptic/release` (separate explicit `confirm:true`, validates
  exactly 10+10 frozen questions and future due date, opens that reservation to
  its intended year group). **Do not call before sign-off.** No release button
  is enabled on the teacher builder during this stage.

The signed-in learner API exposes:

- `POST /v1/learner/synoptic/assignments` — only separately released homework
  for the authenticated year group; counts checked and first-time correct.
- `POST /v1/learner/synoptic/homework` — same immutable Paper 1/Paper 2 items,
  but no correct answers or explanations until that learner checks an answer.
- `POST /v1/learner/synoptic/check` — server marks using the frozen snapshot,
  inserts the first answer once, returns the originally saved response on repeat
  submissions and respects homework hours and deadlines.

The teacher review page is `/synoptic-homework-builder.html`, linked from the
existing teacher assignment screen. It uses the existing activity catalogue
for 1–2 Skills, draws from the original bank files, shows 10+10 questions with
spec-group counts, correct answers and explanations, and permits replacements
**within the same specification group**. It requires an explicit acknowledgement
before saving the 20 immutable question snapshots. The teacher token remains
in this page's memory, not in browser storage. Saving is labelled as a
**teacher-only reservation, not a live pupil assignment**.

The learner page `/synoptic-homework.html` provides Paper 1 and Paper 2 with
**ten progress marks**, immediate check-and-save, separate paper results,
missed-question explanations and links from the existing revision-guide/lesson
mapping scripts. Assigned Skills open in a separate tab so the pupil can
return to the same homework without losing their place. My Work includes
synoptic cards and checked-question progress **only for released assignments**;
the 173-activity pilot stays excluded. A fictional, unsaved visual preview can
be viewed at `/synoptic-homework.html?demo=1`.

**Still needed before a pupil release:** authenticated end-to-end browser QA,
particularly guide-link coverage, mobile usability, paper results and Skills
return navigation; teacher reporting for these new results; and checking
whether Skill completion can be recorded. Skills currently link to practice
but are **not** silently counted as completed. The backend accepts frozen
teacher-authenticated question snapshots and a GitHub commit identifier;
stronger source-verification should be evaluated before wider rollout.

## Question-bank source and audit

The inventory dated 19 November 2026 is
[synoptic-question-banks-20261119.md](audits/synoptic-question-banks-20261119.md).

| Course | Paper 1 | Paper 2 | Total reusable candidates |
| --- | ---: | ---: | ---: |
| H446 / Year 13 | 1,120 | 450 | **1,570** |
| J277 / Year 11 | 360 | 340 | **700** |
| **Total** | **1,480** | **790** | **2,270** |

Structural audit passed: unique question IDs, exactly four options, answer
present among the options, explanation present, optional code/table fields
well-formed. **Structural validity does not establish factual correctness or
question quality.** Teacher content QA remains a release gate.

## Build sequence — one shared engine

- [x] **A. Read-only source inventory and initial schema validation**:
  20 source bank files; 2,270 candidate questions; no structural exceptions.
- [ ] **B. Reusable synoptic selection engine**:
  course/paper separation, broad topic coverage, fixed 10+10 question IDs,
  teacher review and versioned assignment snapshots.
  **Progress:** pure selector, no-repeat D1 ledger, atomic teacher-only publish,
  separate review/replace UI and regression tests are implemented. Real-browser
  teacher acceptance QA and a safe authenticated publishing check are pending.
- [ ] **C. Year 13 student proof of concept**:
  Page, resume, per-question marking and feedback implemented and unit tested;
  authenticated browser QA with a real reserved sample is still pending.
- [ ] **D. Year 11 on the same engine**:
  Shared path and GCSE source/guide integration implemented; verify live links
  and classroom behaviour with a released test assignment before checking off.
- [ ] **E. Teacher builder and reporting**:
  assign, due date, recorded per-question answers, completion and reflection.
- [ ] **F. End-to-end classroom QA and controlled learner pilot**:
  mobile, resume, access windows, marking, links and teacher visibility.

The build stays isolated from the current production topic-practice pages
until stage F passes. Do not treat the existence of a preview as deployment.

## Non-negotiable acceptance checks

- [ ] Y13 Paper 1 and Paper 2 each contain exactly ten valid H446 questions.
- [ ] Y11 Paper 1 and Paper 2 each contain exactly ten valid J277 questions.
- [ ] Breadth across topics is checked; no duplicate question ID in a set.
- [x] Selector distributes ten questions across specification groups and
      distinct Skills where possible; fails clearly if unused supply is short.
- [x] D1 publication rejects reused IDs for the same cohort atomically and
      retains a question snapshot; an unpublished preview does not consume IDs.
- [x] Separately released assignments are the only ones exposed to pupils;
      reservations never leak in learner listings or detail routes.
- [x] First checked response is saved once on the server, cannot be changed
      on refresh/recheck, and unchecked mark schemes are not returned.
- [ ] The teacher can review and replace selected items before assignment.
- [ ] All pupils on one assignment see the same frozen 20 question IDs.
- [ ] Reload, back navigation and a second device never silently redraw or
      reset a checked question.
- [ ] Checking each answer saves once; the final Paper 1 and Paper 2 scores
      are independently correct.
- [ ] Incorrect answers have meaningful feedback and working lesson/guide
      links. Check at 50%, 80%, 90% and 100% scores.
- [ ] Skills and quizzes both offer a consistent **Back to assignment** route.
- [ ] A student sees only assigned work in My Work; the teacher can inspect
      the full catalogue and individual progress.
- [ ] Homework time restrictions, cohort boundaries and login protections
      remain enforced.
- [ ] Student experience is readable, uncluttered and usable on a phone.
- [ ] Existing lessons, quizzes and historic pilot teacher reports pass
      regression tests before publication.

## Decision log / change control

| Date | Decision |
| --- | --- |
| 2026-11-19 | Treat the 173-activity database/login pilot as a **test**, not the everyday student assignment model. |
| 2026-11-19 | Make Homework primary in My Work; Classwork is a small progress gauge linking to its history. |
| 2026-11-19 | Use Year 13 and Year 11 first; both may draw from their full specification question pools. |
| 2026-11-19 | Standard homework: 1–2 Skills, Paper 1 × 10 MCQs, Paper 2 × 10 MCQs and feedback. |
| 2026-11-19 | Use the same fixed question selection for all pupils in a given assignment. |
| 2026-11-19 | Audit and document existing banks before building; do not modify original quizzes to create the synoptic version. |
| 2026-11-19 | Keep the complete question bank in GitHub, and only assignment records, frozen 20-question snapshots and learner answers in existing Cloudflare D1. |
| 2026-11-19 | Never repeat a question across published homeworks for the same year group; distribute ten per paper across specification groups and Skills wherever unused supply permits. |
| 2026-11-19 | Use database uniqueness and atomic publication as safeguards against two teachers assigning the same question; no learner-visible rollout until the full assignment and marking flow passes QA. |
| 2026-11-19 | Add a separate teacher-only preview page; do not alter the existing teacher assign/review flows beyond one optional link. The 20-question save is clearly a reservation until student QA is complete. |
| 2026-11-19 | Add a separate confirmed D1 release record before any reserved homework is learner-visible; do not expose a teacher release button until QA. |
| 2026-11-19 | Build one responsive learner page for Year 13 and Year 11, integrate only released cards into My Work, and record the first checked MCQ answer without counting link-only Skills as completed. |

**Future changes:** Add a dated decision here and update the audit/acceptance
checks before modifying the shared engine. Do not quietly expand scope to
Year 10/12, new assessments or Trust-wide subjects.
