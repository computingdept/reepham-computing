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

**Reference:** OCR H446 Specification, including the updated April 2026 version 3.0, Appendix 5d.

## Batch 2 — OCR ERL, C#, normalisation, assessment validity (19 October 2026)

**Committed to `main` and re-fetched from GitHub:**

| Lesson | Finding and applied fix |
| --- | --- |
| 236 — Writing algorithms | `Largest({3,7,2,5})` was not valid C# method-call syntax. Replaced it with a typed `int[]` argument. |
| 250 — Autumn 2 synoptic assessment | The correction for `age>12 || age<18` was vague. Mark scheme now explicitly explains that this expression is always true for numeric ages, and gives the inclusive AND condition. |
| 277 — 3NF and indexing | Decomposition omitted the `OrderLine` key. Added the modelling assumption (one row per item per order), original composite key and resulting composite `OrderLine` primary key. |
| 280 — Spring 1 timed assessment | FCFS with all processes arriving at t=0 gave no tie-breaking order, so equally defensible alternative schedules were possible. Explicitly specified A, B, C order and clarified waiting-time working. |
| 303 — OCR Appendix 5d notation | Student question compressed multiple array statements into semicolon-separated prose; filename used single quotes unlike OCR's double-quoted examples. Added properly formatted OCR array code and file-reading mark-scheme code. |
| 306 — Paper 1 timed assessment | FCFS processes all at t=0 lacked tie-breaking rule. Specified A, B, C and clarified mean calculation. |
| 308 — Paper 2 timed assessment | Factorial trace did not define whether the recursive base case was 0 or 1. Specified factorial(1)=1 and the recursive recurrence, and clarified the return-value marks. |

**Verification:** Each of these seven HTML files was re-fetched after editing: all retain the eight expected section IDs, four Do Now questions, inline SVGs and the `Draft` title marker. The intended corrected text is present in each file.

**Assessment timing review:** Lesson 214, 243, 247, 280, 305, 306 and 308 allocate a 45-minute `You Do` for 45-mark diagnostics. Lesson 250 deliberately allocates 35 minutes for its separate 30-mark assessment. Do not conflate lesson-phase teaching times with the independent assessment duration.

**Reference-language grounding:** Checked the basic array, byVal/byRef and file I/O conventions against Cambridge OCR's H446 specification, including the April 2026 version 3.0 text. Exact executable validation across all 140 lessons, visual SVG checks and the clause-by-clause curriculum sign-off remain outstanding.

**Current corrected lesson count across batches 1 and 2:** 12 distinct lesson pages (218, 219, 220, 221, 236, 247, 250, 277, 280, 303, 306, 308).

## Batch 3 — LMC, SQL and C# correctness (19 October 2026)

**Seven additional distinct lesson pages updated** (225, 227, 262, 263, 272, 278, 279). All changes were committed to `main` and individually re-fetched.

| Lesson | Confirmed issue / correction |
| --- | --- |
| 225 — OOP testing and debugging | A runnable C# top-level example placed executable statements after a class declaration, which is invalid for top-level C#. Reordered statements and added an explicit displayed output. |
| 227 — OOP debugging with IDEs | Same C# top-level declaration-order problem. Reordered statements before class. |
| 262 — LMC instructions and data | Subtract-two-inputs prompt stated only non-negative inputs, allowing an unrepresentable negative result. Made first≥second and 0–999 input range explicit. |
| 263 — LMC branching | Stored a negative accumulator value before checking `BRP`, potentially losing negative-flag semantics in some simulators. Changed loop to `SUB ONE; BRP SAVE; HLT; SAVE STA COUNT; BRA LOOP` so `BRP` tests the arithmetic result immediately. Updated dependent explanation and both relevant SVG labels. |
| 272 — SQL retrieval | Used `//` rather than standard SQL `--` comment syntax in example. Also labelled sample relation rows as SQL comments rather than executable statements and qualified selected columns. |
| 278 — SQL SELECT and JOIN | Qualified Student.Name to make the JOIN origin clear; labelled example source data as SQL comments. |
| 279 — SQL manipulation | The demonstration mixed runnable SQL and `DROP TABLE` without sufficiently separating a destructive operation. Explicitly labelled the examples as independent and identified `DROP TABLE` as only safe for disposable practice data. |

### Independent checks during Batch 3
- **LMC countdown:** A small instruction-level simulation of revised lesson 263 (signed-accumulator/BRP semantics) returned:
  - input 0 → output `0`
  - input 1 → output `1,0`
  - input 2 → output `2,1,0`
  - input 3 → output `3,2,1,0`
  - input 4 → output `4,3,2,1,0`
  - In all five cases, COUNT never stored a negative value.
- **SQL JOINs and nested queries:** Six queries from lesson 278 executed using an in-memory SQLite database and returned the expected Ada/Ben results. SQL syntax comments `--` follow standard SQL.
- **GitHub source validation:** all seven edited pages re-fetched with expected corrected text; 8 sections, 4 Do Now questions, inline SVGs and Draft labels retained.
- **Limitations:** This simulation is not a real LMC browser simulator. `dotnet`, `csc` and `mcs` are not installed here, so C# source was corrected against known top-level statement syntax rules but not compiler-tested. Browser layout/visual testing remains.

**Cumulative distinct Year 13 lesson pages corrected: 19/140** (218, 219, 220, 221, 225, 227, 236, 247, 250, 262, 263, 272, 277, 278, 279, 280, 303, 306, 308).

### Further high-priority work
1. Full C# compilation/execution checks using a supported runtime, including classes, linked lists, trees, code traces and boundary cases.
2. Audit LMC/SQL SVG content and worked examples at lesson display size.
3. Remaining 45-mark assessment mark schemes and original question-bank integrity.
4. Clause-by-clause spec mapping and final visual QA.

**Source guidance:** Cambridge OCR H446 specification version 3.0 (2026), Appendix 5d. It illustrates OCR pseudocode conventions but learners are not required to memorise the exact notation in assessed answers; reward logically clear equivalent pseudocode as the specification permits.

## Batch 4 — Programming structures, backtracking and visual correctness (19 October 2026)

**Six additional distinct Year 13 lessons corrected:** 198, 199, 201, 226, 298, 310.

| Lesson | Risk / fix |
| --- | --- |
| 198 — Index-based linked lists | The I Do and We Do used `new.next = ...` and `node4.next = new`. `new` is a reserved C# keyword, not a valid node variable. Replaced with explicitly labelled pointer pseudocode using `node7` and `node6`, preserving the successor pointer before rewiring the previous node. |
| 199 — BST insertion | The inserted node 25 lay at y=301 with r=23 on a 700×275 SVG viewBox, clipping the whole node. Expanded this SVG to 700×340, adjusted its background to height 334 and rewrote all seven BST diagram aria-labels to describe the tree structure without placeholder commas. |
| 201 — Hash tables | C# `key % 7` yields a negative remainder for negative keys, potentially causing a negative bucket index. Normalised to `(key % 7 + 7) % 7`, preserving positive-key examples and mapping -1 to index 6. |
| 226 — BFS and post-order | The C# BFS example assumed a non-null root and could enqueue a null root; in an empty tree this is inappropriate for the declared `Queue<Node>`. Recast as a method accepting `Node? root` with an empty-tree guard and aligned the relevant You Do mark scheme. |
| 298 — Backtracking | The I Do and We Do implied undoing value 3 directly after adding value 4, skipping the necessary unwind/exclusion of 4. Expanded code trace and shortened matching SVG step descriptions to explicitly undo 4 before skipping 3 and taking the alternative branch. |
| 310 — Recursion | Challenge asked for iterative sum of *all* integers while comparing against the lesson's odd-number recursive `SumOdds`. Changed it to an iterative odd-sum matching `SumOdds(n)` with a congruent 6-mark answer including O(n) time and O(1) auxiliary storage. |

### Batch 4 verification and boundaries

- Re-fetched all six HTML pages after commits. Every one still has eight expected lesson phases, four Do Now questions, SVGs and a Draft title.
- An independent small Python algorithm test confirmed the expected outputs for linked-list insertion (10→15→20→30), BST in-order traversals, BFS including empty roots, hash indices for -1/0/9/16/23, subset-sum target cases and SumOdds at inputs 0/1/4/5/6.
- Reviewed SVG `viewBox` geometry in 15 algorithm-heavy lessons; no remaining out-of-bounds circle or text anchors found in that sample after correcting Lesson 199. **This is not an overlap, browser-rendering, screen-reader or mobile readability sign-off.**
- Public rhsccs.org pages could not be retrieved during this pass; GitHub source commits were verified but the site deployment was **not** confirmed.
- C# examples were checked for evident syntactic/algorithmic errors but a real dotnet/C# compile-run of all lessons remains outstanding.

**Cumulative distinct Year 13 lesson pages corrected: 25/140** (previous 19 plus 198, 199, 201, 226, 298, 310).

### Next high-risk block

1. Complete the C# tree/linked-list code checks and empty/null/duplicate-key cases, using a C# runtime where available.
2. Audit the remaining 45-mark papers for precisely allocated marks and independent timed assessment isolation.
3. Continue authentic SVG render and classroom-display inspection across 140 pages.
4. Complete OCR H446 specification clause coverage and teacher sign-off.
