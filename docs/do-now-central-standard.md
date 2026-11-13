# Synergy Do Now — central authoring standard (v1)

**Status: foundation / migration preparation, not a pupil-facing release.**

This is the retrieval-bank part of the wider
[Trust curriculum-mapped question-bank architecture](trust-question-bank-architecture.md),
which will also support separate You Do independent-practice banks.

The approved Computing default is one predictable retrieval routine for KS3,
OCR J277 and OCR H446. The same central format can later be offered to other
Synergy subjects as a teacher-reviewed default. It does **not** replace their
curriculum, prescribe identical difficulty, or change other lesson phases.

| Position | Response type | Retrieval source |
| --- | --- | --- |
| Q1 | True / False, correct if false | Previous taught lesson |
| Q2 | Four-option MCQ, one best answer | Earlier taught learning |
| Q3 | Short written response | Earlier taught learning, deeper recall |
| Q4 | Reasoned challenge | Apply earlier taught knowledge |

The machine-readable contract is `data/do-now/standard-v1.json`.

## One bank, several outputs

Each subject/course owns its **content** bank; the platform owns the response
types, accessibility, answer reveals, navigation and print/catch-up mapping.
A reviewed question should be stored only once in that course's canonical bank
and reused by the classroom, independent Catch Up and printable outputs. Do not
copy answers into separate lesson HTML when a lesson has migrated to this model.

The normalised v1 format uses `data/do-now/examples/*.json` as tested examples.
Reviewed, intentionally migrated course banks will live under
`data/do-now/banks/*.json`, where the same CI check will automatically validate
new lessons. The validator is `node scripts/do-now/validate-standard.cjs`; its
core rules are dependency-free so other Synergy projects can reuse them.

- Every lesson has four ordered, typed questions with stable IDs, provenance,
  a curriculum or taught-sequence reference and hidden answer material.
- Q1 has a **statement**, `correct` Boolean and explanatory correction. Statements
  may contain calculations/code: keep the thinking rather than reducing them to
  obvious facts. Balance true/false over a course, not within one lesson.
- Q2 has a **stem**, four distinct, plausible options, a zero-based answer index
  and an explanation. Short choices are preferred, but not at the expense of
  genuine A Level distinctions.
- Q3/Q4 retain model answers and explanations or working. No question may assess
  new content for the first time.
- For the first lesson in a course or year-group entry, an explicit **diagnostic** is permitted in
  place of the previous-lesson source. Other exceptions need a recorded reason.
- Pupils should see the same four questions in classroom and Catch Up; print
  presents the same content with sensible answer space and a separate key.
- The teacher reviews content and sequencing before publication; generated or
  extracted draft material is **not** automatically approved.

## Migration: do not change the live rendering yet

### Q1 True/False drafting underway

The Q1-only drafts are in `data/do-now/q1-drafts/`: 25 J277
lessons (001–025), all 300 current H446 lesson pages (001–160 and 181–320),
and the three canonical KS3 Year 7 pilot lessons. The H446 draft has 151 true
and 149 false statements; each entry records the immediately preceding
numbered lesson as the retrieval source. Lessons 001 and 181 are explicitly
labelled course/year-entry diagnostics. These mappings still require teacher
confirmation against the actual taught order. These are **unapproved Q1-only drafts**, intentionally
kept apart from `data/do-now/banks/` (which accepts complete, reviewed four-question
lessons). Q2–Q4 and live lesson pages remain unchanged.

Run `node scripts/do-now/validate-q1-drafts.cjs` to check the Q1 statements,
Boolean keys, corrections, source references and True/False distribution against
the preserved question/answer snapshots. This validates structure and provenance,
not educational accuracy or readiness for pupil delivery. A teacher needs to
review the precise statement, historical teaching order and correct answer before
its lesson can be migrated. The Q1 rewrites are *not* part of the live page or
existing Catch Up bank yet. H446 and KS3 lesson-to-source mappings are explicitly
flagged as provisional: the legacy snapshots have no verified taught-sequence
references, so a numbered predecessor must not be assumed to prove prior teaching.

1. `node scripts/do-now/collect-legacy.cjs` creates reproducible **unpublished**
   source snapshots in `data/do-now/migration/`, preserving the old prompts,
   answers and source identifiers for review. The script never writes lesson
   HTML or changes the published J277 bank.
2. J277 already has 164 central Do Nows. Rewrite Q1 in a staged, reviewed bank;
   keep its short Q2 MCQs and original Q3/Q4. Sync the existing Catch Up bank.
3. H446 has 300 lesson index files. Lessons 036 and 037 use a redirected
   mind-map presentation; their original Do Now questions have been captured
   from `assets/h446-mindmap/presentation.js`. The 300-entry Q1 draft is now
   centralised for teacher QA. Do not publish to classroom/Catch Up/Print until
   its preceding-lesson references and content have been reviewed.
4. KS3 has three canonical Year 7 pilots at this point. Follow the approved
   KS3 authoring rulebook, including a first-lesson diagnostic exception, when
   creating further Year 7–9 material. Do not promote old preview pages.
5. Only **after** the reviewed banks pass validation, adapt the existing shared
   classroom engine once; retain the coloured four-card display, teacher answer
   reveals, phone swipes, and print/catch-up routes. Deploy bank and renderer in
   one coordinated change.

## Publication checks

- Technical: four questions; correct types and correct answers; no duplicate
  MCQ options; stable IDs; provenance and exceptions; no answer leakage.
- Curriculum: previous-lesson links and historical teaching order confirmed;
  true/false statements unambiguous; challenge appropriate; age-appropriate
  reading demands; OCR symbols/programming syntax preserved.
- Delivery: standard projector and 80%-height layouts, mobile, keyboard,
  answer reveals, Catch Up consistency, printer output and site navigation.

For a Trust pilot, teachers can approve a documented subject-specific exception
without forking the common display. The standard is a default that preserves
teacher agency, not a substitute for subject expertise.
