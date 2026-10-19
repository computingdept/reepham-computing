# H446 Year 13 — High-risk correction log

> **Historical correction evidence.** The single consolidated course-wide audit is [H446 Year 13 master audit](h446-year13-master-audit-2026-10-19.md). This log records previously committed individual fixes; do not treat it as a separate ongoing audit.
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

## Batch 5 — C# safety, boundary cases and assessment marking (19 October 2026)

**Five distinct Year 13 lesson pages corrected:** 182, 197, 224, 308 and 317.

| Lesson | Verified issue and fix |
| --- | --- |
| 182 — Recursion call stack | `SumTo(n)` stopped only for n==1, so zero/negative inputs recursed away from the base case. Added an explicit `ArgumentOutOfRangeException` guard and stated the valid positive-input precondition. Existing positive worked traces/diagrams remain valid. |
| 197 — Stacks and queues | I Do and We Do were displayed as C# but called `Push`, `Pop`, `Enqueue` and `Dequeue` without a collection instance. Replaced both with standalone C# examples declaring a `Stack<int>` and `Queue<char>` and using their instance methods. |
| 224 — BST C# implementation | Equal keys were silently ignored by the `Insert` function but the explanation omitted that fact. Added an explicit code comment and corresponding teaching explanation. |
| 308 — 45-mark Paper 2 diagnostic | Bubble-sort trace carried eight marks although the prompt asked only for two resulting passes and the mark scheme did not identify eight independent creditworthy points. Revised the prompt and detailed the comparison, intermediate-state and explanation points for all eight marks; retained [15] Q2 total with [7] complexity comparison. |
| 317 — Independent algorithm question | Asked learners to *write pseudocode* to count distinct values in a sorted array but gave only a terse list of marking criteria. Added a complete OCR-style function with empty input, adjacent comparison and 8 precisely allocated marking points; explicit equivalent pseudocode acceptance. |

### Checks completed

- All five revised GitHub files re-fetched: eight lesson phases, four Do Now questions, SVGs and Draft title remain on each.
- Positive `SumTo` traces remain unchanged. Zero and negative inputs are now expressly rejected.
- Stack/queue code now uses explicit instance declarations and returns 5 from the stack example and 'A' from the queue example.
- The bubble-sort trace on [5,2,4,1] yields [2,4,1,5] after pass 1, then [2,1,4,5] after pass 2; that state remains unsorted as 2>1.
- Algorithm in lesson 317 returns 0 for [], 1 for [3,3], and 3 for [2,2,5,5,6] when sorted.
- **Limitations:** Static reasoning/source checks and algorithm examples are not equivalent to a real C# compilation suite. Web deployment and SVG browser rendering remain unconfirmed.

**Cumulative distinct Year 13 lesson pages corrected: 30/140** (prior 25 plus 182, 197, 224, 308, 317).

### Subsequent checks

- Remaining independently timed assessment papers: validate every subpart and mark point against prompt and assessment time.
- Real C# compile-and-run coverage in a supported compiler environment, especially type declarations, nullability and unusual inputs.
- Browser-rendered diagram readability/overlap at classroom and mobile sizes.
- Final OCR H446 specification clause-by-clause coverage matrix.

## Batch 6 — Assessment validity, mark-scheme precision and evaluative responses (19 October 2026)

**Nine lesson pages changed, seven not previously corrected:** 214, 305, 308, 311, 313, 316, 317, 318, 320. The cumulative count of distinct corrected Year 13 lessons is **37/140**.

| Lesson | Confirmed concern and correction |
| --- | --- |
| 214 — Autumn 1 diagnostic | Four BST marks were awarded for four facts but the question only asked for two. Stack and queue questions rewarded intermediate operations they had not requested. Bubble-sort marking rewarded additional states not required by prompt. Reworded the task prompts to request the creditworthy evidence and expanded six-mark bubble trace with exact comparisons and swap states. |
| 305 — End-of-content diagnostic | A three-stage pipeline cycle calculation lacked necessary assumptions of equal one-cycle stages and no stalls/hazards. Stated those assumptions and strengthened method marks. SQL INNER JOIN table schemas/join keys now defined. The algorithm boundary test allows any valid justified boundary, rather than one prescribed example. |
| 308 — Paper 2 timed diagnostic | Queue question under-specified expected output; CountPositive(int[] a) question did not define positive-count behaviour or empty-array expectations. Added these requirements and a complete, properly formatted five-mark C# worked answer that accepts equivalent correct loops. |
| 311 — Unfamiliar programming challenges | Eight-mark C# method-writing task had only terse bullet criteria rather than a complete solution. Added runnable-looking model `CountRuns`, including empty input and one point for each explicit criterion. Source text not compiler-tested. |
| 313 — Processors/scheduling | FCFS for three equal-arrival-time processes had no tie-break, so the stated mean waiting time was not uniquely determined. Specified FCFS A/B/C order and non-preemptive SJF. |
| 316 — Paper 1 extended evaluation | Two nine-mark responses were represented as rigid one-mark/two-mark bullet checklists. Replaced each with an authored best-fit 1–3 / 4–6 / 7–9 *practice* rubric, indicative factors and a fully developed, balanced model argument. Clearly labelled the rubric as not an official OCR scheme. |
| 317 — Paper 2 algorithm evaluation | Nine-mark decision about sorted counting versus an unsorted-data hash set used a rigid point allocation without holistic judgement. Added an authored best-fit rubric, indicative factors and a developed evidence-based comparison. |
| 318 — Targeted Paper 1 | Fetch trace could not specify actual MDR/CIR contents because no memory instruction was provided. Specified memory[70] = LOAD 25 and the no-branch assumption, updating model values. INNER JOIN question now defines table schemas and joined ID columns. |
| 320 — Final mixed-paper | Fetch trace from PC12 did not specify contents of memory[12]. Supplied ADD 7, no-branch assumption and explicit MDR/CIR answers. Replaced nine-mark cloud-versus-USB bullet marks with authored best-fit criteria and a reasoned, inclusive school-revision evaluation. |

### Independent sample checks
- Bubble passes: [6,2,5,1] -> [2,5,1,6] -> [2,1,5,6]; [5,2,4,1] -> [2,4,1,5] -> [2,1,4,5].
- Serial 4 instructions × 3 stages = 12 cycles; ideal pipeline 3 + 4 - 1 = 6 cycles.
- FCFS waiting mean (0+4+6)/3 = 3.33, SJF waiting mean (0+1+3)/3 = 1.33.
- CountRuns test outputs: empty [] -> 0, [3,3] -> 1, [2,2,5,5,6] -> 3, [1,2,1] -> 3.
- Sample FDE traced MAR/MDR/CIR and PC increments from both explicitly stated memory instructions.
- Nine pages re-fetched from GitHub; each has eight phases, four Do Now questions, three hidden answer blocks and remains Draft.

### OCR marking alignment

The OCR H446/01 **sample** mark scheme treats extended levels-of-response answers using best-fit bands, awarding credit for relevant unexpected approaches and distinguishing supported contextual judgements from isolated facts. Link: https://www.ocr.org.uk/images/170852-unit-h446-1-computer-systems-sample-assessment-materials.pdf (see mark-scheme pages 7–10). This guided the authored practice rubrics; the invented 9-mark 1–3/4–6/7–9 bands are **not official OCR bands** and should not be presented as such.

### Outstanding
- Real C# compiler and browser-based diagram/readability tests.
- Detailed mark validity and OCR-style holistic response review for other Year 13 assessment/extension lessons.
- Full OCR H446 specification crosswalk and student-facing skill/depth checks across 181–320.
- Confirm GitHub Pages public deployment and interactions.

## Batch 7 — Remaining exam-style marking precision (19 October 2026)

**Seven lesson pages edited, six distinct pages newly corrected**: 240, 268, 278, 283, 284, 285, 290. Lesson 278 was corrected in an earlier batch. **Cumulative distinct corrected Year 13 lesson pages: 43/140.**

| Lesson | Source-level issue and committed correction |
| --- | --- |
| 240 — Validating boundary values | The four-mark answer listed two independent comparisons and gave no assembled C# predicate, even though the student was asked to correct an AND expression. Added the full `x >= 5 && x <= 15` condition, retaining explicit credit for both endpoints. |
| 268 — Scheduling | FCFS and RR worked examples / six-mark questions used one order for processes all arriving at t=0, without stating the tie-break. Clarified listed A/B/C (or P1/P2/P3) order for equal arrivals and non-preemptive SJF rule; applies to New Learning, We Do, and both relevant You Do questions. |
| 278 — SQL sorting | The four-mark ORDER BY scheme separately awarded a mark for the explicit `ASC` keyword, potentially rejecting valid SQL that omits it because ascending is the default. Reallocated to `ORDER BY Name` for two marks with or without `ASC`. |
| 283 — DNS/TCP/IP | Three independent questions lacked mark totals or discrete credit criteria. Added [2], [6], [4] and specific layer/function credit. Accurate separation of DNS name resolution, TLS and Wi-Fi/link-layer roles retained. |
| 284 — Packet/circuit switching | Added [2], [4], [4] and explicit marking criteria. TCP answer now spells out using byte sequence information, buffering and in-order application delivery; notes the segment numbering simplification. |
| 285 — Firewall/proxy | Added [2], [4], [6], making the questions ask for the relevant evidence, including explanation of two proxy functions and two risks plus extra safeguards for permitted traffic. |
| 290 — Misconception diagnostics | Six-mark answer for choosing three misconceptions from Q1 mistakenly offered examples from *other* lessons (HTTPS phishing and compression without repeats). Replaced with four relevant illustrative counterexamples, each with one mark for the example and one for its technical explanation; students choose any three. |

### Verification and limits
- Re-fetched all seven GitHub HTML files following successful commits.
- Each still contains eight section phases, four Do Now questions, three hidden You Do solution areas, SVGs and Draft status.
- Independently checked the validator accepts exactly integer inputs 5–15 inclusive.
- Scheduling result checked: A=5,B=3,C=1 all t0, stated FCFS order waits 0,5,8 (mean 13/3) and non-preemptive SJF waits 0,1,4 (mean 5/3).
- SQL `ORDER BY Name` ascending without explicit `ASC` is standard SQL behaviour. Full browser runtime and visual verification not performed in this batch.
- This batch audited practice questions in lessons 240–303 and previously reviewed diagnostics; it is **not** an exhaustive semantic sign-off for all Year 13 lessons.

### Next priorities
1. Deep-check remaining 45-mark assessments and extended responses for accurate time-per-mark, mark schemes and answer isolation; validate any review/synoptic duplicates.
2. Check curricular depth, topic progression, misconceptions and SVG teaching relevance rather than SVG presence alone.
3. Systematic whole-course specification crosswalk and actual browser/mobile/TV readability QA.
