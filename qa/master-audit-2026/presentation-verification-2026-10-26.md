# J277 and H446 — presentation verification register
**Verified evidence at 26 October 2026 · formatting/navigation only**

The shared lesson design is approved. Do not rewrite OCR questions, mark schemes, retrieval content or Code First activities simply to clear a formatting audit. "Passed" refers to the specific automated assertions, not human inspection of every drawing or educational correctness.

| Interface | Scope | Completed evidence | Result |
|---|---|---|---|
| Shared I Do / We Do | 463 standard lessons × TV, compact TV, phone | [Full-course run 40228209877](https://github.com/computingdept/reepham-computing/actions/runs/40228209877) | 26,547 passing checks, 0 hard failures, 0 clipping flags |
| Shared You Do | 463 standard lessons × TV, compact TV, phone | [Latest four-shard run 40304293162](https://github.com/computingdept/reepham-computing/actions/runs/40304293162) | 13,646 passing checks, 0 failures, 0 warnings |
| Keyword highlighting | 463 standard lessons × TV, phone | [Four-shard run 40322377801](https://github.com/computingdept/reepham-computing/actions/runs/40322377801) | 926 browser visits, 0 failures, 0 width warnings; pen-stroke backgrounds verified |
| J277 standalone Lesson 113 | 47 slides × TV, compact TV, phone | [Standalone run 40304460070](https://github.com/computingdept/reepham-computing/actions/runs/40304460070) | 664 passing checks, 0 failures, 0 warnings |
| Special assessment pages | 22 pages × TV, compact TV, phone | [Baseline run 40323952386](https://github.com/computingdept/reepham-computing/actions/runs/40323952386) | 66 page/viewport surveys passed, 0 failures, 0 warnings |
| Special staged marking navigation | J277 035/050 and H446 036 × TV, compact TV, phone | [Additional regression run 40327263131](https://github.com/computingdept/reepham-computing/actions/runs/40327263131) | **Pending at initial register creation; update only after completion** |

## Confirmed specialised repairs

- J277 Lesson 094 teacher mark scheme was missing its mobile viewport meta and used desktop-sized margins. [Commit b8dc07e4](https://github.com/computingdept/reepham-computing/commit/b8dc07e426adca7363c86fabca445f8fd97527b5) adds viewport scaling and compact phone styles, preserving the original answers and marks.
- J277 Lesson 094 `answers.html` intentionally redirects to `assessment-mark-scheme.html`. The browser survey waits for that navigation; a reload during this redirect was a test race, not a broken answer.
- Assessment mark totals in independent Year 11 JSON papers and teacher schemes match: Lesson 120 = 45 marks/45 minutes; Lesson 143 = 80 marks/90 minutes.

## Scope boundaries and follow-up

- The automated assessment test checks question-paper presence, isolation of teacher marking from Year 11 pupil paper data, browser errors, mobile scaling, page and SVG width. It is not a question-by-question accuracy audit or an invigilation-security test.
- The standard lesson test excludes the standalone J277 113 revision presentation; that page has its own separate successful audit.
- Live device spot-checks of dense SVG labels, print quality and student/teacher subjective readability are useful but **not proved by automated geometry assertions**.
- The previously noted independent Lesson 001 number `154` duplicates a taught example. This is a separate content-quality decision and must not be silently changed in the formatting pass.
- Specification coverage, H446 exit-ticket answer verification outside the initial set, revision-guide educational correctness and assessment marking accuracy are **separate, open workstreams**.

This file is the evidence-led presentation sign-off, replacing earlier unqualified descriptions of "all lessons fixed." Preserve the linked run IDs for reproducible verification.
