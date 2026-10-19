# H446 Year 13 — High-risk correction log
**Date:** 19 October 2026  
**Scope:** lessons 181–320 (140 pages). All lessons remain **DRAFT** pending QA.  
**Status:** First targeted correction batch applied on `main`; this is not full QA sign-off.

## Confirmed corrections implemented
| Lesson | Risk | Correction |
| --- | --- | --- |
| 218 — Dijkstra I | Incomplete pseudocode allowed ambiguity over whether settled nodes could be updated; omitted unreachable/stopping conditions. | Explicitly restrict relaxation to unsettled neighbours, store predecessor, terminate when goal is settled, and distinguish unreachable vertices. |
| 219 — Dijkstra II | Path reconstruction could produce a single-node "route" for an unreachable goal. | Guard on infinity before reconstructing the predecessor chain, with a clear no-route result. |
| 220 — A* I | Worked I Do used an admissible but **inconsistent** heuristic without teaching the reopening distinction; all four SVG trace states depended on it. | Changed h(R) from 1 to 2 for consistency, recalculated f values, corrected all four diagram trace tables and captions, and expanded frontier algorithm including reopening. |
| 221 — A* reliability | Distinction between admissibility and consistency was insufficiently explicit for no-reopening implementations. | Added the edge consistency condition and implications for optimality. |
| 247 — Paper 2 45-mark diagnostic | Bubble-sort question and mark scheme did not specify exactly how a third no-swap pass should be handled; a two-mark binary-search precondition prompt supported only one stated fact. | Specify all three bubble passes and clarify the no-swap mark scheme; split binary-search precondition into two assessable points. |

## Checked samples without a correction in this batch
- Lesson 216–217: Quicksort partition and recursive examples reviewed at text level, but full code execution / visual checks remain.
- Lessons 243, 305, 306, 308: Assessment prompts and marking allocations sampled. No edits in this batch.
- Lessons 278 and 303: SQL and OCR ERL examples sampled. Further syntax and visual verification required.

## Remaining high-risk work before sign-off
1. Run algorithm examples and C# exercises against expected outputs, and check each worked trace diagram against its text.
2. Check all assessment questions for one-mark-per-credit alignment, answer correctness, time budgets and clear student/teacher answer separation.
3. Validate Appendix 5d OCR pseudocode syntax and file handling across H446 lessons, including bounds, byRef and return semantics.
4. Inspect SVGs at desktop and Classroom TV/mobile sizes for clipping, misleading sequence or text that is too small.
5. Complete clause-by-clause OCR H446 specification matrix and resolve any missing or underdeveloped topics.

## Verification
- After commit: lessons 218, 220 and 247 re-fetched from GitHub; eight phases and four Do Now questions still present.
- Lesson 220: four SVG h and f rows changed consistently and old heuristic labels removed from the I Do section.
- Public-site deployment was **not** independently confirmed via the website check; GitHub source commits were successful.

**Reference:** OCR H446 Specification, Version 2.7 (OCR 2024), including Appendix 5d.
