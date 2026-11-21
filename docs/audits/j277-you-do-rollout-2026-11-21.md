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
