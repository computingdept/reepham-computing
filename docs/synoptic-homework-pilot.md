# Synoptic Homework pilot — agreed design and release contract

**Status:** Design baseline v0.1 · 19 November 2026 · **NOT a live synoptic assignment feature**

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
| Question selection | Automatically select from existing original RHSC practice banks, with breadth across specification topics. |
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
- [ ] **C. Year 13 student proof of concept**:
  one assignment, simple navigation, checked-answer persistence and feedback.
- [ ] **D. Year 11 on the same engine**:
  no separate duplicated code path; GCSE content and support links.
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

**Future changes:** Add a dated decision here and update the audit/acceptance
checks before modifying the shared engine. Do not quietly expand scope to
Year 10/12, new assessments or Trust-wide subjects.
