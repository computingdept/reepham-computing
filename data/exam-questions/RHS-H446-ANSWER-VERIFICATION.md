# RHS H446 answer-verification progress

**Status date: 21 November 2026**  
**Scope:** 410 parts from 10 OCR H446 A Level Computer Science question papers; 1,400 marks total.

The new **H446 RHS-authored practice table** is [h446-rhs-practice-drafts.csv](h446-rhs-practice-drafts.csv). It is designed to mirror J277's separate practice drafting and verified-answer workflow.

## Progress as saved

| OCR series | Question parts | RHS question drafts written | RHS answer/marking text reviewed |
| --- | ---: | ---: | ---: |
| November 2021 | 75 | 0 | 0 |
| June 2022 | 92 | 92 | 92* |
| June 2023 | 84 | 84 | 84* |
| June 2024 | 81 | 81 | 81* |
| June 2025 | 78 | 78 | 78* |
| **Total** | **410** | **335** | **335*** |

All **78** June 2025 question parts have independent RHS drafts and source-linked marking notes: **41 from H446/01** and **37 from H446/02**. The **Paper 1** question and marking text were compared with the [official 2025 /01 question paper](https://www.ocr.org.uk/Images/752247-question-paper-computer-systems.pdf) and [official 2025 /01 mark scheme](https://www.ocr.org.uk/Images/752415-mark-scheme-computer-systems.pdf). For **Paper 2**, the [official 2025 /02 mark scheme](https://www.ocr.org.uk/Images/752416-mark-scheme-algorithms-and-programming.pdf) was checked but the question-paper PDF could not be fetched. **Thus Paper 2 source-question-context verification remains outstanding.**

These are **working drafts**, not approved OCR-context-verified questions or an exhaustive OCR mark-scheme transcription. PDF page screenshots were attempted but unavailable; visual figure/context comparisons remain pending.

*The asterisk in the progress table means **mark-scheme text consulted and draft RHS marking guidance authored**, not complete source-question or classroom approval. The H446/02 source question PDF could not be viewed.* Diagram, table and code questions require separate full-source visual/context verification. Levels-of-response items must be independently moderated and reviewed by a teacher.

### Noteworthy marking constraints already preserved

- Q1(b)(i), four marks: appropriate input device, its contextual use, output device and its contextual use.
- Q1(b)(ii), two marks: storage type plus justified reason. Optical storage is not credited in the source marking scheme.
- Q1(c)(i), two marks: GPU is appropriate for broad simple parallel workloads, CPU for smaller complex workloads.
- Q2(a), four-mark comparisons: each full pair must compare **the same feature** across both architectures; two marks per paired comparison.
- Q2(b), nine marks: **levels-of-response**, including virtualisation concepts, practical client trade-offs and a justified evaluation; not nine independent checklist marks.
- Q3(a): 189 → 10111101 (binary) and BD (hex); E4 → 228 in denary.
- Q3(c): result mantissa 010001, exponent 0011; the OCR scheme distinguishes valid binary working from entirely denary calculations.
- Q3(d)(i): 1010 0011 AND 1010 1110 → 1010 0010, with one mark per nibble.

## What is still not complete

1. **75** original RHS question drafts and **75** question-specific source-linked answer checks (November 2021).
2. Independent full source-paper figure and mark-scheme-page checks for all 78 as relevant, **particularly all 37 H446/02 questions whose OCR source question PDF could not be retrieved**. Ten of Paper 1 Q4–Q8 also have original visual/table/code layout dependencies.
3. Original tables, program listings, trace layouts and SVG assessment contexts as needed (not every source visual should become an SVG).
4. Question-by-question OCR examiner-report inspection and independent examiner insight for unreviewed entries.
5. Final originality, marks, accessibility, mobile, projector, teacher approval and classroom integration checks.

**None** of these 410 records is marked `approved_for_classroom`, and no live lesson is changed by this work. The canonical H446 catalogue and J277 materials are unchanged.

## Added review: June 2025 H446/01 Q4–Q8

- Q4(a): the five LMC mnemonics match a non-linear allocation (**five correct for three marks**, rather than one mark per row). Q4(b) includes a separate valid LMC program to select the greater of two different inputs.
- Q4(c), Q7(a): **12-mark and nine-mark levels-of-response** respectively, kept for teacher marking; the RHS prose outlines themes rather than copying the official level descriptors.
- Q5(a)–(d): half/full-adder logic and an independently transposed four-input Karnaugh grid. The map function was programmatically checked as `(A AND NOT D) OR (B AND NOT C)`; the **seven 1-cells** and the two implicant groups require visual-render checking before classroom use.
- Q6(c): independent `TblSoftware` dataset with RHS product IDs, preserving the SQL complexity and numerical price values. Both INSERT and nested-SELECT answer examples were tested with SQLite; the threshold selection returned the two lower-priced existing products before the example INSERT.
- Q7(b): four independently transcribed run-length rows were checked to decode to **nine cells each**; a fresh 9×4 response grid is still required.
- Q8(b), Q8(d): original four-table ERD case and original JavaScript code blanks; diagram notation and monospaced code rendering still require final review.

All 20 rows carry a review status distinguishing source **text** checks from source **page-image** and independent presentation checks. All remain unapproved.

## Added review: June 2025 H446/02 (all 37 parts)

Original RHS questions have been drafted for all H446/02 topics. Notable checks and safeguards:

- **Q1:** original Quicksort pseudocode is provided with its own explicit line numbers. The two recursive call locations and changed descending comparison are internally consistent. Insertion-sort examples retain the source values **20, 8, 15, 36**; source numeric mark demand is not silently changed.
- **Q2 and Q4:** nine-mark search and pipelining questions preserve teacher-assessed levels of response, including an independently constructed four-instruction three-stage pipeline example.
- **Q3:** stack pseudocode uses **20 positions** and an empty-stack pointer of **-1**, with both push and pop paths set out. Code-layout QA is still required.
- **Q5:** a **new six-node RHS graph** has been checked programmatically, shortest path `S → B → A → C → T`, total cost **11**. Its seven-mark rubric is an **independent adaptation** because OCR's source graph has different nodes, path and distance (**31**); it must never be presented as the OCR answer grid.
- **Q6:** debugger, scope and by-value topics use the source's marks. The original RHS four-error frequency-counting task was run on its example dataset and yields distinct `[4,2,7]`, counts `[3,2,1]` after the intended repairs.
- **Q7:** insertion of five new BST values retains the original **nonlinear 3-mark rule**. Independently computed post-order and breadth-first traversal sequences were validated with a tree implementation.
- **Q8:** linked-list class and method tasks use explicit **private/public** visibility, avoiding non-specification `protected`. List deletion uses a public `setNextNode` mutator to preserve encapsulation. The final 12-mark comparison remains teacher-marked.

**Status: 78 drafted, 78 source-linked marking drafts, 0 approved; 332 remaining to author.** Independent paper-image, originality, SVG/table/code and classroom review gates remain open. The underlying OCR mark allocations and all 1,400 marks are unchanged.

## Added review: June 2024 H446/01 and H446/02 — both papers drafted

- **Paper 1: 41/41**, **Paper 2: 40/40** independently authored RHS questions and teacher marking notes, with OCR question/mark scheme text consulted and representative image pages inspected.
- **No question is classroom approved.** In particular, source figures, exact code windows, accessibility, copyright/originality and projector formats require separate checks. 26 of the 2024 parts are flagged as requiring original visual/table/code presentation or layout review.
- **Paper 1 numerics checked:** `-124 → 10000100` (8-bit two's complement); `298 → 12A`; `10011101 0110 → -49.5`; normalising `00001011 0111 → 01011000 0100`; `00110111 + 10011001 = 11010000`.
- **Paper 1 LMC:** independently arranged faulty program prints `0,1,2,4,8`; four replacement instructions produce the intended five Fibonacci numbers `0,1,1,2,3`. New eight-row BST array and additions have their own answer keys.
- **Paper 2 original A*:** separate six-node RHS graph, admissible heuristics, cumulative `g`-values and shortest path `S → B → C → G`, cost **10**. This is **not** OCR's seven-room A* figure or its cost 90.
- **Paper 2 queue:** explicit convention tail pointer = next free; `enqueue(20),dequeue(),dequeue()` leaves `3,2,20` and pointers head 2/tail 5. Original 100-slot stack convention, sorting and BST duplicate-to-right rules retained with new inputs.
- **Source distinctions:** the 2024 nine-mark cultural UI question tests differences in cultural significance, writing direction and character sets; generic colour-blindness does not substitute for that content. Levels-of-response and OOP code need human marking.
- **Law:** 2024 regulatory reference prompts are historical assessment contexts; current UK surveillance and data-protection law must be checked before any student-facing publication.

**Current H446 RHS status: 243 drafted/marking notes filled; 167 remaining; 0 approved.** Historical mark-scheme review fields from the separate canonical catalogue must not be mistaken for this newer RHS drafting status.

## Added review: June 2023 H446/01 and H446/02 — both papers drafted

- **H446/01 46/46** and **H446/02 38/38**, all with original RHS scenario/prompt, answer guidance and marking breakdown. OCR paper and mark-scheme text consulted and representative PDF images inspected; full source figure/context, originality and classroom review not yet signed off.
- **Paper 1, Q2:** original reverse-polish stack expressions were checked: printed outputs **12, 7, 15**, and the deliberately invalid input sequence causes stack underflow. Three intermediate stack-state marks remain separate from output marks.
- **Paper 1, Q3:** original OCR numerical source values retained for hex/signed/floating-point questions; `189→BD`, `1010101111→2AF`, `−107→11101011` sign/magnitude and `10010101` two's complement; `−15.75→10000010 0100`, and `0100 1110→0.125`.
- **Paper 1, Q5–Q6:** RHS digit-check `3178→9`; RHS alarm expression `NOT(A OR B) XOR C`, truth-table output `10010101`, and independently generated four-input K-map `(NOT A AND NOT C) OR (A AND NOT D)`.
- **Paper 2, Q1:** original BST examples and traversal, with a seven-node independently designed Dijkstra graph. RHS shortest route `P→S→V`, cost **14** (not OCR's source graph), with tentative cost 19 overwritten by 14.
- **Paper 2, Q3–Q6:** distinct indexed linked-list/free-list example, original reusable validation code, independent recursion `recursiveScore(10)→23` and correct zero-aware decimal-to-octal algorithm.
- **Paper 2, Q7–Q9:** explicit Big O time/space comparisons and levels-of-response, concurrency, merge sort, login subroutines and Board/Artifact OOP. All OO fields use explicit `private` and access through `public` methods, never UML `#` as private.
- **28 2023 records** are flagged for source-specific visual, original table, code or trace rendering; final teacher review and visual/marking mark-by-mark signoff are outstanding. Several nine- and twelve-mark questions require human moderation, not automated marking.

**2023 historical milestone: 243 drafted, 167 then pending; 0 classroom-approved.** All 10 paper totals remain 140 marks each and all 410 canonical IDs/marks are unchanged.

## Added review: June 2022 H446/01 and H446/02 — both papers drafted

- Both papers: **48 Paper 1 + 44 Paper 2 = 92/92** independent RHS question drafts with answer/marking text. OCR sources were consulted. Representative PDF page screenshots were checked for Paper 2; some Paper 1 screenshot requests failed, so **figure-by-figure image verification has not been completed**.
- **Q1 Paper 1:** theatre ticket LMC reworks the cumulative bonus code: for three inputs `10,50,120` it displays `10,60,200`. Reset/HLT marking is retained, as is the source's exclusion of “individual instructions execute faster” as the general pipelining benefit.
- **Q2 Paper 1:** independent `TblMember`/`TblPlan` schema. The five-mark SQL prompt demands correct selected fields, qualified joined keys and an advertisement-consent filter. Separate ACID transaction and streaming (not downloading) nuances are retained; LectureClip uses explicit private fields and public methods.
- **Q3 Paper 1:** original numerical source values retained and checked: `B7E→101101111110`, sign-magnitude `110010101→-149`, `01101101−00110100=00111001`, floating `1010 1110→-0.1875`. Four normalisation classifications each have an independent mark.
- **Q5–Q6 Paper 1:** original distinct trace algorithm yields `40,70,300` on original source inputs. Screenshot confirms the 2022 scheme puts symbol-table construction in lexical analysis for this question. FCFS, RR, HTTPS/application and MAC/link-layer descriptions remain distinct.
- **Q1–Q4 Paper 2:** original WHILE rewriting, source numeric BST years with independently described hierarchy, 50-element bubble sort, eight-number merge sort trace, Big O evaluations and flight-simulator abstraction/caching.
- **Q5 Paper 2:** independent eight-node graph with own edges but computed shortest path `A→B→E→F→G→H`, cost **19**, final distance/predecessor table. It must be rendered as a new diagram; it is **not OCR's original graph** even where numerical results coincide.
- **Q7–Q8 Paper 2:** independently coded recursion trace `sumTrail(5)=15` and call `sumTrail(10)=55`; original 100-slot `IntStack` with top-as-next-free convention and -1 empty sentinel. Pop/push, input loop and accumulation remain separate assessed tasks. OOP vs procedural nine-mark evaluation remains teacher-marked.
- **29 2022 records** need original visual/code/table/trace presentation; source-context, originality, accessibility, projector/mobile and teacher sign-off are pending.

**Current H446 RHS totals: 335 written/answer guidance populated, 75 not yet written (2021), 0 classroom-approved.** All 410 IDs, ten 140-mark paper totals and 1,400 combined marks remain unchanged.
