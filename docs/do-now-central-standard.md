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

### Q1 True/False central publication

Q1 drafts remain in `data/do-now/q1-drafts/` for teacher review. The live
classroom Q1 banks are `data/do-now/q1-published/j277.json` and
`data/do-now/q1-published/h446.json`. The H446 bank covers all 300 current
lesson pages (001–160 and 181–320): 151 True and 149 False statements.
Every non-entry H446 Q1 cites the immediately preceding taught lesson number.
Lessons 001 and 181 are explicitly identified as course/year-entry diagnostics.
Teacher checks against the actual taught order remain important. Q1-only draft
banks remain separate from `data/do-now/banks/` (which accepts reviewed full
four-question lessons). Q2–Q4 and authored lesson HTML remain unchanged.

Run `node scripts/do-now/validate-q1-drafts.cjs` to check the Q1 statements,
Boolean keys, corrections, source references and True/False distribution against
the preserved question/answer snapshots. This validates structure and provenance,
not educational accuracy or readiness for pupil delivery. Teacher QA of precise wording, actual teaching order and answers continues.
J277 and H446 published Q1 entries now feed classroom Do Now via the shared
renderer. Catch Up and Print have not yet been migrated; keep them unchanged
pending a coordinated follow-up. KS3 sequence mappings remain provisional.

1. `node scripts/do-now/collect-legacy.cjs` creates reproducible **unpublished**
   source snapshots in `data/do-now/migration/`, preserving the old prompts,
   answers and source identifiers for review. The script never writes lesson
   HTML or changes the published J277 bank.
2. J277 has 164 centrally published Q1 statements. Keep Q2–Q4 unchanged;
   align the existing Catch Up bank during a later coordinated update.
3. H446 has 300 lesson index files. Lessons 036 and 037 use a redirected
   mind-map presentation; their original Do Now questions have been captured
   from `assets/h446-mindmap/presentation.js`. The 300-entry Q1 bank is centrally
   published for classroom Do Now only. Catch Up and Print remain on their
   existing material until their separate consistency checks are complete.
4. KS3 has three canonical Year 7 pilots at this point. Follow the approved
   KS3 authoring rulebook, including a first-lesson diagnostic exception, when
   creating further Year 7–9 material. Do not promote old preview pages.
5. The shared classroom engine reads published Q1 centrally while retaining
   four question cards, teacher answer reveals and phone swipes. Do not migrate
   other phases, Catch Up or Print without their own regression checks.

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
