# J277 You Do rollout — audit tracker

Date opened: 2026-11-21
Scope: 164 planned J277 lessons, 001–164. Inventory count is a planning target, not yet a verified completeness claim.

## Strict change boundary
- **Permitted:** You Do question content, Code First content, answer/reveal guidance, lesson-specific visuals, You Do-only styling and navigation.
- **Excluded:** Do Now, Objectives, New Learning, I Do, We Do, Vocabulary, Exit Ticket, Cloudflare, scoring, assignments, student authentication.
- Artwork polish deferred to a separate review. No live publication without teacher approval.
- Work on audit branch; compare all changed paths and phase fragments before merge.

## Status workflow
Not reviewed → Ready → Tested → Teacher approved → Published.
Record blockers independently as content corrections, visual issues, navigation faults or assessment exceptions.
No existing lesson is marked teacher approved or published by this audit.

## Initial read-only sample (main branch, 2026-11-21)
| Lesson | Source checked | Initial finding | Status |
| --- | --- | --- | --- |
| 001 | `lessons/j277/lesson-001/index.html` | Full HTML lesson with embedded You Do; not merely a renderer wrapper | Not reviewed |
| 021 | `lessons/j277/lesson-021/index.html` | Loads shared `autumn2-rebuilt.js` | Not reviewed |
| 050 | `lessons/j277/lesson-050/index.html` | Loads shared renderer; title identifies assessment, assessment behavior needs classification | Not reviewed |
| 100 | `lessons/j277/lesson-100/index.html` | Loads shared renderer plus Year 11 diagrams | Not reviewed |
| 134 | `lessons/j277/lesson-134/index.html` | Loads shared renderer and Year 11 diagrams; existing classroom test reported functional, not independently QA-approved | Not reviewed |
| 164 | `lessons/j277/lesson-164/index.html` | Loads shared renderer; consolidation lesson | Not reviewed |

## Shared renderer observations
`lessons/j277/autumn2-rebuilt.js` contains:
- `youDo(lesson, number)`, with distinct assessment-mode early return.
- A Code First card using `assets/j277/code-first.svg`.
- Optional previous-learning retrieval card.
- Exam cards generated from `lesson.e`.
- Optional Year 11 stretch and mastery cards.
- Questions after the first initially hidden, requiring navigation verification.
- Existing CSS for You Do diagrams and question presentation.

## Audit fields per lesson
Lesson | Year | Topic/spec | Normal or assessment | Source type | Code First appropriate | Exam questions present | Answers/mark scheme verified | Visual required/present | Question navigation tested | Projector checked | Content issues | Status | Teacher approval

## First checks
1. Inventory actual lesson paths and classify self-contained vs shared-renderer lessons.
2. Inspect navigation controls and question reveals for representative Year 10, Year 11 and assessment lessons.
3. Confirm exam questions, mark schemes and any diagrams correspond to each lesson's taught content.
4. Pilot changes only in a dedicated branch, with diff verification that non-You Do phases remain identical.
5. Teacher reviews tested lessons before any live merge.

## Follow-up architecture audit (2026-11-21)

### Confirmed runtime routes
| Lesson range / sample | Runtime route | Implication |
| --- | --- | --- |
| 001–002 | Standalone, full HTML `index.html` | Audit You Do markup and bespoke interaction independently |
| 003 | `h446-adapter.js` legacy route | Adapter constructs You Do from source and answer map |
| 004–018 | `h446-adapter.js` → `autumn1-rebuilt.js` | Changes in autumn2 renderer will **not** cover these lessons |
| 019 onward (sampled: 019, 020, 021, 030, 035–037, 050, 080, 099–101, 120, 130, 134, 150, 160, 164) | `autumn2-rebuilt.js` | Verify remaining paths before treating this as an exhaustive range |

### Critical You Do dependencies
- `assets/h446-lesson/lesson.js` contains the shared You Do navigation engine, including `setYouDoWindow`, code-first-only initial view and question windows. **Do not modify this shared engine without a separate cross-course regression review**.
- `assets/j277/youdo-grouped.js` alters question cards and adds J277-only answer review flow. It explicitly excludes lessons 018, 035, 050, 078, 094, 113, 120, 143, 156 and 157. These are **exceptions to investigate**, not automatically failed lessons.
- Lesson 002 has a distinct opt-in Apple-style Code First / separate review sequence (confirmed in standalone HTML and grouping JS).
- `autumn1-rebuilt.js` generates Code First and exam cards but uses a separate You Do function.
- `autumn2-rebuilt.js` handles assessments separately; ordinary lesson output includes Code First, optional prior retrieval, exam questions, and optional Year 11 challenges.
- `lesson.js` tries to fetch `answers.html` for absent inline model answers and requires question/answer card counts to agree. A static source inspection alone **does not establish** that self-marking works at runtime.
- `autumn2-rebuilt.js` currently renders all exam cards after Code First as hidden initially; shared navigation must be tested to ensure they become reachable.

### Sample tally (not an exhaustive 164-lesson inventory)
- 001, 002: standalone full HTML (2)
- 003: legacy adapter (1)
- 004–018: autumn1 renderer via adapter (15)
- 019, 020, 021, 030, 035, 036, 037, 050, 080, 099, 100, 101, 120, 130, 134, 150, 160, 164: autumn2 renderer (18 sampled)
- **36 distinct lesson files have been directly inspected**. Remaining lesson paths and generated card data still need checking; none are marked Tested or Teacher approved.

### Next QA gates
1. Confirm exhaustive 001–164 file inventory and renderer routing.
2. Test Code First → every exam question → every answer → completion; confirm no jump to Vocabulary.
3. Check grouped JS exclusion list, bespoke lesson 002, assessment pages and lesson 134 opt-in separately.
4. Verify questions and answer count, scenario correctness, diagram relevance, projector readability and mobile progression.
5. Save per-lesson evidence; only after teacher approval should a scoped You Do change be proposed for merge.

## Data-level inventory — first 42 JSON records (2026-11-21)

**Verified directly from repository JSON:** 004–018 (`autumn1-004-008.json`, `autumn1-009-013.json`, `autumn1-014-018.json`) and 019–045 (the individual `autumn2-NNN.json` files). This is **42 unique lesson data records**, distinct from the 36 entry HTML files previously inspected.

| Records | Count | Question/answer structural findings | Attention |
| --- | ---: | --- | --- |
| 004–017 | 14 | Each has 3 exam entries and a string in answer position 2 | Needs question and marking accuracy review |
| 018 | 1 | 3 exam entries / string answers; **isAssessment=false** | Despite an assessment/review title, this renders through normal lesson behavior. Excluded from grouped.js: classify deliberately |
| 019–020 | 2 | Each has 3 exam entries / string answers | Programming/trace/debug question flow |
| 021–034 | 14 | Each has 3 exam entries / string answers; prior retrieval data and 3 visual descriptors | Check diagram/question fit and extra retrieval stage |
| 035 | 1 | 8 assessment questions / string answers; **isAssessment=true** | Assessment-mode You Do; exempt from normal sequence |
| 036–045 | 10 | Each has 3 exam entries / string answers; prior retrieval and 3 visual descriptors | Confirm accuracy and question-to-visual mapping |
| **Total** | **42** | **All 42 have a question list and string-valued answer entries** | **Structural source check only; no browser QA or teacher approval** |

### Specific risks and exceptions
- The shared renderer checks data arrays and minimum question counts, but source validity does **not** guarantee all questions are navigable or answer stages match at runtime.
- `lesson-018` assessment/review title conflicts with its `isAssessment=false` value; preserve its current behavior pending teacher decision, do not automatically flip it.
- `lesson-035` uses `isAssessment=true`, with eight assessment entries, and is excluded by `youdo-grouped.js`; this is an intentional-looking separate path, not evidence of a bug.
- 021–034 and 036–045 include visual descriptor data. Their presence is not proof the SVG renders, is legible or is pedagogically correct.
- Question answers were checked for **type and presence only**, not examiner correctness, marks or clarity.
- For JSON records 046–164, no data-level claim has yet been made.

### Progress terminology
- **36 entry-page paths directly examined** (earlier sample).
- **42 data records structurally examined** (this pass).
- **0 lessons runtime tested**, **0 teacher approved**, **0 live files edited**.
- These numbers are different dimensions and should not be added together.

### Next data review
- Continue JSON record checks beginning with 046, highlighting assessments, empty answers, missing question data, visual exceptions and prior-retrieval behavior.
- Run representative browser QA where possible before elevating any record to Tested.

## Extended JSON audit — 046–065 (2026-11-21)

- Checked all twenty individual `autumn2-046.json` through `autumn2-065.json` files.
- **019 of 020** are ordinary lessons with exactly three exam-question records; all 57 answer entries are non-empty strings.
- **Lesson 050** is `isAssessment=true`, with nine questions and nine non-empty string answers. Treat it as assessment-mode, not normal Code First → exam-card flow.
- Normal lessons 046–049 and 051–065 include `priorExam` and three visual descriptors; validate the actual rendered illustration and relevance later.
- Lesson 057's shared renderer also has an explicit optional FOR-loop trace table inside Code First; preserve that lesson-specific behavior.
- **Cumulative verified structured data records: 62 / 164 planned** (004–065). All 62 contain answer entries; correctness, progression, images and rendering remain untested.
- **No changes to live lessons or other phases.**

## Source data inventory completed — 2026-11-21

### Current status
- **164 planned lessons** = 001–164.
- **161 / 161 renderer-based lesson JSON records inspected**: 004–018 in the three `autumn1-*.json` groups, and 019–164 in individual `autumn2-NNN.json` files.
- **001–002**: bespoke HTML You Do reviewed for layout structure, not exhaustively tested for interaction.
- **003**: legacy adapter You Do reviewed for route structure, not exhaustively tested for interaction.
- **All 161 JSON records** have an exam question array, a Code First prompt, and string-valued answer entries for their question arrays.
- **0 runtime-tested**, **0 teacher-approved**, **0 changed in live lessons**, **0 published as part of this rollout**.

### Results by source batch
| Lesson range | JSON records inspected | Findings |
| --- | ---: | --- |
| 004–018 | 15 | 3 exam question entries per record; 018 assessment/review is not isAssessment mode |
| 019–045 | 27 | Normal lessons 3 entries; 035 isAssessment with 8 questions |
| 046–065 | 20 | Normal lessons 3 entries; 050 isAssessment with 9 questions |
| 066–095 | 30 | Normal lessons 3 entries; 094 isAssessment with 1 entry |
| 096–125 | 30 | Normal lessons 3 entries; 120 isAssessment with 3 entries |
| 126–164 | 39 | Normal lessons 3 entries; 143 isAssessment with 3 entries |
| **Total** | **161** | **All examined for question/answer field presence and type, not pedagogical accuracy** |

### Explicit assessment mode exceptions (`isAssessment=true`)
035 (8 exam entries), 050 (9), 094 (1), 120 (3), 143 (3).

### Other special-flow exceptions
018 (assessment/review title but `isAssessment=false`), 078 (practical project), 113 (algorithm consolidation), 156 (timed Paper 1 practice), 157 (timed Paper 2 practice). These numbers are also present in the J277 grouped-handler exclusion list. Their custom behavior needs separate review rather than converting them automatically.

### Critical separation of progress
- **Source audit complete for JSON records** does not imply that navigation, answer-screen alignment, question quality, projector layout, accessible controls, or visual accuracy has passed.
- **No user-visible change at rhsccs.org** is expected at this point because only branch audit documentation has been committed.
- **Next tangible milestone**: create and exercise an isolated You Do pilot on a staging branch, verify code first → questions → answers with unchanged other phases, share a user-viewable preview, obtain teacher sign-off, then deploy a small approved batch.
- Do not report the pilot as tested until actual interaction testing has been completed and evidenced.

## Isolated interactive pilot — 2026-11-21

A **self-contained preview** was created outside the live site for teacher evaluation. It is currently distributed as a downloadable `j277-you-do-pilot.html` conversation artifact, **not** hosted at rhsccs.org or committed as an operational lesson. It reproduces selected question-and-answer content from the source lessons, but does not execute the existing production lesson renderer.

| Lesson | Pilot scope | Steps in standalone preview | Result |
| --- | --- | ---: | --- |
| 002 | Code First, five exam tasks, six review cards | 12 | Navigation/reset passed |
| 021 | Code First, previous-learning task, three exam questions, five review cards | 10 | Navigation/reset passed |
| 134 | Code First, three exam questions, four review cards | 8 | Navigation/reset passed |
| 035 | Unassessed warm-up, assessment-only instruction | 2 | No answers exposed |

**Automated preview-only QA:** Chromium browser testing at desktop **1440×900** and mobile **390×844** across all four lesson selections. Each sequence advanced to the final step, reset to the first, and changed lesson without a script error; no horizontal viewport overflow detected. The assessment did not reveal worked answers.

**The preview test does not count as production lesson QA.** The production JavaScript renderer, shared phase navigation, visual fidelity to original SVGs, answers-page integration, keyboard/screen-reader audit, and regression comparison for non-You Do phases remain untested. No lesson is promoted to the workflow status `Tested` or `Teacher approved` on the strength of this prototype.

**Release gate:** Teacher review of the preview; then implement a tightly scoped production You Do pilot on a separate development branch, run actual browser regression against production rendering, verify all other phase nodes remain unchanged, and publish only with teacher approval.
