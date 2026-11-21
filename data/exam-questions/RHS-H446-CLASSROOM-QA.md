# RHS H446 · classroom question and answer QA

**21 November 2026 · First post-drafting QA pass · no student release**

## Why this exists

Writing the question bank is **not the same as approving a question for classroom use**. All **410** independently authored RHS question parts have question text, indicative marking points and marking rules. **0/410** are approved. The source paper, assessment demand, any displayed question image/table/code, its answer and its marking guidance must agree for each part.

**Per-question source of truth:** [h446-rhs-classroom-qa.csv](h446-rhs-classroom-qa.csv), which covers all 410 RHS questions, and [h446-rhs-practice-drafts.csv](h446-rhs-practice-drafts.csv), which contains question/answer working drafts. This register is intentionally separate from the canonical OCR question catalogue, source figure register and student-facing lesson renderer.

## Baseline QA findings

- **410** independent RHS question drafts with answer/marking text; **0** student-approved.
- **147** records are marked for a diagram, table, code panel or trace/student-view layout check. These are **not** 147 distinct SVG requirements.
- **Seven 2021 question-to-image mappings** have a **confirmed example-data mismatch** (two A* questions; two stack questions; two BST questions; one breadth-first-tree question). Many other mappings are **unverified** and may contain additional mismatches; seven is not a claim of exhaustive coverage.
- **Five** mismatched 2021 question-view mappings (stack, BST, traversal) have been **cleared/blocked** in [h446-question-view-map.csv](h446-question-view-map.csv). Their generic teaching concept SVGs remain available as separate master artwork but must not substitute for the RHS question's own data.
- **Two** 2021 A* question-view mappings now use the newly authored [2021-specific A* question SVG](../../assets/exam-questions/h446/question-view/2021-nov-02-astar-rhs-question.svg), with directed nodes `L,M,N,P,Q,Z` and their exact nine costs and six h-values. The former generic diagram with nodes `S,A,B,C,D,G` is not a match.
- The new A* diagram is **source-data matched as authored, but has not passed independent render, projector, mobile, accessibility or teacher approval**. Neither the generic teaching SVG nor any unreviewed solution illustration is linked as an A* reveal.
- A* answer auditing corrected an actual technical wording error in `H446-2021-NOV-02-Q1CII`: **P does not improve from g=7 to g=6**, because M is not expanded. P is first discovered from N at **g=6**. Expansions are `L,N,P,Q,Z`; Q improves **9→8**, Z improves **12→10**, route `L→N→P→Q→Z`, cost **10**.

## QA priorities

| Priority | Meaning | What happens |
| --- | --- | --- |
| P0 | Confirmed question-to-image example-data mismatch | Disable the mismatched question or answer image, create a matching RHS-specific figure if needed, verify graph/table/tree data and only then consider release |
| P1 | Original SVG/table/code/trace is required | Check authoritative source context, independently design/render and review the exact RHS data, with separate unrevealed/revealed views |
| P2 | No distinct diagram is required | Still review question wording, answer alternatives, marking, source fit, accessibility and human sign-off |

**A P0 question may retain the priority P0 after the question-only SVG is drafted**. It clears only when the question image, solution view, rendering and source/teacher gates are independently signed off.

## Minimum approval gates (per question part)

1. **Source and demand** — compare the entire OCR question-paper stem (including shared scenario), official marks, code/data, original relevant figure and full marking guidance; record legitimate alternative answers and levels-of-response.
2. **Originality and rights** — confirm own RHS wording, independently authored scenarios, and correct licensing; retain OCR paper reference but do not reproduce proprietary figures in the public GitHub repository.
3. **Question/data match** — every displayed node label, graph edge and direction, cost, heuristic, array length, index convention, program line, value and table heading must match the specific RHS prompt.
4. **Technical check** — independently recompute traces, outputs, correctness of code, arithmetic, tree traversal, logic, routes and mark-by-mark answer points. Do not reuse an OCR solution on changed RHS input data.
5. **Question view vs answer reveal** — students should see one clearly readable question with any needed illustration and **no disclosed answer**. The teacher reveal should keep the question visible and show an obvious, consolidated full marking answer wherever practicable, not force multiple colour-heavy screens.
6. **Projection/mobile/print** — test at the actual split-screen arrangement (diagram left, question right), mobile layout and monochrome print; choose large labels/edge weights, sparse Apple-like hierarchy and soft component-level green glow, not coloured technical content.
7. **Accessibility** — meaningful SVG title/description; usable text and tables for screen readers; sensible reading order and sufficient contrast; no reliance on hue to communicate the answer.
8. **Teacher sign-off** — check examiner-report insight against a named source if used, validate extended-response rubrics by teacher moderation, and record explicit approval before any student-facing release.

## Invariants

- Keep **410 canonical question IDs**, **ten 140-mark paper totals** and **1,400 marks overall** unchanged.
- Do **not** modify or activate live lessons, J277, student assignments, Cloudflare D1, answer checking or first-attempt scoring as part of question/artwork QA.
- Never infer approval from a populated `rhs_answer_review_date`, a linked generic teaching image, or a passing automated arithmetic check.
- The approval flag is a **human-reviewed release decision**, not an automatic consequence of filling draft fields.

## Next working batch

Audit **November 2021 Paper 1's 14 visual/layout-flagged parts** one by one, starting with the six-slot LIFO stack and volunteer-name BST. Author their independent question-only illustrations and separate answers using the exact draft data; finish the source-context and projection checks before making any approvals. Then tackle November 2021 Paper 2's other flagged parts and proceed chronologically through 2022–2025.

This document records an initial QA pass and the explicit block, **not a claim that all figures and all answers have been independently checked**.

## November 2021 Q7 stack and volunteer BST · asset drafting checkpoint

**Scope:** H446-2021-NOV-01-Q7AI, Q7AII, Q7BI and Q7BII only. Seven original QA-only SVGs now exist on branch `qa/2021-nov-stack-bst-views` (shared initial stack question, stack identification reveal, bounded PUSH reveal, initial volunteer BST, four-insertion reveal, post-insertion BST lookup question and Xena lookup reveal). The [isolated teacher QA preview](qa-2021-nov-q7-preview.html) presents **one question at a time** and one consolidated reveal, with image left and prompt right. No student pages use this preview.

**Data-logic check from the RHS drafts (not teacher approval):** `names[0..5]` is empty at `top = -1`, full at `top = 5`; PUSH checks `top < 5`, increments then stores the new name. Tree insertions: Ava ← Cara; Nina ← Ruth; Zoe → Tara; Omar → Nina. Xena search: Morgan → Ruth → Tara → Zoe → missing left child (absent). `Q7BII` deliberately displays the post-insertion tree, because it is a separate follow-on question, while `Q7BI` does not disclose the inserted positions.

**Remaining blocked gates:** independent comparison to the complete OCR stem/mark scheme; SVG XML validation and actual raster rendering; half-screen projector viewing (900-unit SVG scaled to approx. 450 CSS px); narrow mobile viewing; print/contrast/alt-text review; independent originality and marking-alternative checks; explicit teacher sign-off. The SVGs were authored and linked in GitHub, but **no actual visual render was verified in this session**. These four mappings remain draft-only in the QA register, with `classroom_release=disabled_not_approved`. No student-facing approval or release is implied.

## November 2021 Q1(d) customer database · independent QA assets

**Scope:** `H446-2021-NOV-01-Q1DI`, `Q1DII`, `Q1DIII` and `Q1DIV`. A new original four-row Customer table uses exactly the RHS draft rows (101 Miss Ross UV-21; 102 Mrs Chen PV-17; 103 Mr Adeyemi CV-42; 104 Dr Khan RV-63). Individual answer panels cover primary-key identification, a two-field SQL query filtered by title, the single-row-per-customer limitation, and a relational TblCustomer/TblVehicle redesign with one-to-many cardinality.

The [isolated one-question/one-reveal preview](qa-2021-nov-q1d-preview.html) lives on branch `qa/2021-nov-stack-bst-views` only. **These four resources are not merged and are not student approved**. The illustration mappings and QA register identify the draft assets while retaining `classroom_release=disabled_not_approved`.

**Draft data check:** `CustomerID` uniquely identifies each Customer row; `Title='Miss' OR Title='Mrs'` selects IDs 101 and 102; customer and vehicle records should be separated with Vehicle.CustomerID as foreign key referencing Customer.CustomerID. SQL punctuation/quotation alternatives and full OCR marking guidance still require teacher checking. The relational answer represents one-to-many, not a one-to-one association.

**Still pending:** verify complete authoritative OCR context and mark alternatives, independently render all SVGs and check 50% width projector/mobile/print layout, accessible equivalents and correct reading order, then obtain teacher sign-off. No live H446 lesson, J277 or Cloudflare files changed.

## November 2021 Paper 1 · Q3(c) and Q5(c)(i–iii) QA drafting

**Four RHS question parts:** JavaScript booking-fee completion, half-adder Boolean expressions, half-adder truth table, and four-bit full-adder explanation. Seven independent SVGs have been added to the QA branch: one original JavaScript question and answer pair, one original XOR/AND circuit question and answer pair, one truth-table question and answer pair, and a four-bit carry-chain answer diagram. A shared question-only half-adder is intentionally reused for Q5(c)(iii), where the student must explain the extension; the completed four-stage circuit is answer-only.

The [isolated QA preview](qa-2021-nov-q3c-q5c-preview.html) shows one question and one consolidated answer reveal at a time. QA register and question-view map point to the correct RHS-specific assets; all four questions retain `classroom_release=disabled_not_approved`. Existing generic figures must not override these question-specific versions.

**Technical draft self-check:** JavaScript blanks: `2.99`, `nonUKprice`, `numtickets`, `return`. Half adder: `S = A XOR B` and `C = A AND B`; truth-table rows 00, 01, 10, 11 give (S,C) = (0,0), (1,0), (1,0), (0,1). Four-bit extension: connect carry-out to the following bit's carry-in. The circuit input connections were redrawn to avoid ambiguous crossing wires in the new half-adder illustration.

**Release still blocked:** original OCR stem/mark-scheme matching and alternatives, actual raster rendering and 50%-width projector visual check, phone/print/accessibility review, and explicit teacher sign-off. No live lesson, J277 resource, assignment or Cloudflare scoring file has been modified.

## November 2021 Paper 1 · Q6(b) / Q6(c) LMC resource drafts

Four original SVG assets added on the QA branch: the complete 22-line repeated-subtraction LMC routine, a question-only output grid, the completed output grid, and an equivalent pseudocode solution panel. [Isolated teacher preview](qa-2021-nov-q6-preview.html) provides two questions with distinct single consolidated answer reveals. Q6(b) draft answer pairs for fresh runs: 6/2→3 remainder 0; 9/1→9 remainder 0; 4/7→0 remainder 4; 3/1→3 remainder 0. Q6(c) initializes quotient=0, remainder=dividend, subtracts positive divisor while remainder≥divisor, then outputs quotient followed by remainder.

Q6(b)/Q6(c) map to their RHS-specific question diagrams, not generic LMC artwork. Both records remain `disabled_not_approved`: complete OCR question/source comparison, actual render/half-screen/mobile/print accessibility testing, source marking alternatives and teacher sign-off are pending. This batch only adds question-bank resources and QA metadata—no lessons or Cloudflare scoring changes.

### Q6(b) layout defect detected during visual-structure QA

The initial isolated Q6(b) preview showed only its blank output table, not the 22-line LMC program the learner must trace. This is a **blocking missing-input defect**, regardless of the correctness of the answer grid. The QA preview now displays the **complete LMC program on the left**, with the question and **blank output table on the right**; reveal hides the blank table and displays the completed grid while keeping the program visible. The canonical question-image mapping is deliberately marked `blocked_composite_question_requires_LMC_program_and_blank_output_table` rather than representing the single program SVG as a complete question. Q6(c) still uses the original LMC program with pseudocode revealed separately.

A genuine screenshot at half-screen resolution and mobile width is **still required**: GitHub source structure checks do not demonstrate readable classroom projection. Do not approve or distribute Q6(b) until this combined view is rendered, inspected and teacher signed off.

### Q6(b) projection-size check: conditional 65:35 exception

A local 1200×680 visual reconstruction of the 22-line LMC program beside the four-row response table was inspected at **50:50** and **approximately 65:35** widths. The 50:50 code labels are too small for reliable back-row reading; the 65:35 arrangement substantially increases line legibility while keeping all response cells visible. The isolated Q6(b) HTML preview now applies a **1.9fr / 1fr** code/table split on wide screens, with one-column stacking on mobile. **This is an exception for dense code, not a global change to the agreed half-screen illustration standard.**

The reconstructed local screenshots are *not screenshots of the deployed QA branch*. Their content and geometry are derived from the authored LMC question but independent direct rendering of GitHub assets and real classroom-projector validation are still required. Q6(b) remains `disabled_not_approved`; inspect the preview at the real projected size before teacher approval.

### Q1(d) and Q5(c) source-level artwork review

Checked all ten SVG source files for Q1(d)(i–iv) and Q5(c)(i–iii): each includes accessible SVG title/description and a 900×900 viewBox. The Customer table preserves four records exactly: 101/Miss/Ross/UV-21; 102/Mrs/Chen/PV-17; 103/Mr/Adeyemi/CV-42; 104/Dr/Khan/RV-63. The SQL answer uses the title selection, while the relational answer separates TblCustomer(CustomerID PK) from TblVehicle(VehicleID PK, CustomerID FK) with 1:N cardinality. The half-adder logic and truth-table values match their draft answers.

**Layout changes during this pass:** the cramped `many` label in the relational diagram was replaced with `N`, retaining a larger explanatory `One customer → many vehicles` caption; the three carry-chain arrows in the four-bit answer were enlarged from 22 to 26 SVG units. These are readability adjustments and do not change answers.

**Important limitation:** this was an SVG **source/geometry review**, not a verified browser screenshot or projector test. A 900-unit SVG drawn at 450 CSS px yields half-size labels, so long code, fine cardinality marks, and small annotations must still be tested physically. These questions remain blocked until rendered, reviewed for screen-reader and print accessibility, compared with OCR source/marking alternatives, and teacher signed off. No lesson implementation.

## November 2021 Paper 2 · first new QA batch (Q1d, Q2ai, Q2b)

Three separate RHS question/answer SVG pairs have been drafted and linked on the isolated QA branch, plus a [three-question teacher preview](qa-2021-nov-paper2-q1d-q2-preview.html). **No live lessons or student assets were enabled.**

- **Q1(d), breadth-first traversal** — original letter-labelled tree: K→(C,R); C→(A,F); R→(N,U); F→(E,H); U→(S,W). Expected visit order is **K,C,R,A,F,N,U,E,H,S,W**. The unrelated generic numeric BST illustration is not substituted.
- **Q2(a)(i), iterative binary search** — six blanks correspond, in order, to `wanted`, `-1`, `2`, `middle + 1`, `middle - 1`, `middle`. Inclusive search bounds are explicitly retained.
- **Q2(b), complexities** — the question explicitly covers *iterative* implementations with only scalar auxiliary state. Worst/best auxiliary space is `O(1)` for both searches, average running time `O(log n)` for binary and `O(n)` for linear.

All three register rows remain `disabled_not_approved`. **Source/geometry checks are not actual projector renders**. Missing approval gates: complete original OCR question/marking comparison, direct SVG raster and half-screen/mobile/print review, accessibility reading-order check, and teacher approval. Q1(c) A* was already drafted in the preceding batch and remains separately blocked for its corresponding trace/answer view.

## November 2021 Paper 2 · Campus OOP resource QA draft

Five question-specific RHS parts have independent question and answer assets on this draft branch: `Q5A` constructor purpose, `Q5C` five Venue code blanks, `Q5D` Gallery inheritance with four-argument constructor, `Q5E` bounded CampusMap.addVenue and `Q5F` main-program object instantiation. Eight SVGs are used across these five parts. The [five-part isolated QA preview](qa-2021-nov-paper2-q5-oop-preview.html) presents the class diagram/code on the left, task on the right and one answer reveal.

The generic OOP illustration previously mapped to Q5A/C/D is no longer used for these QA records. **The class diagram preserves Venue → Gallery and Venue → Workshop inheritance**, Venue private `label`/`floors`, and Gallery private `entranceFee`/`opensAt`. CampusMap stores Venue references in `venues[0..19]` and starts `nextFree=0`. Venue code completion answers are Venue, newLabel, newFloors, getLabel, floors. Gallery model answer calls `super.new(labelIn,floorsIn)`. addVenue checks `nextFree >= 20`, stores then increments the pointer. The main-program answer uses Science Hall, 2, 5.00 and 09:00. A long Gallery constructor line was reduced locally in font size to avoid horizontal clipping; actual half-screen classroom readability remains unverified.

**Q5B** does not require its own SVG under the current QA register and has not been changed. **All five edited rows remain `disabled_not_approved`.** Source comparison with the complete original OCR context, syntax/pseudocode alternatives, SVG render, split-screen/mobile/print/accessibility tests, and teacher sign-off are still required. This remains resource-only work, with no changes to lessons, J277, assignments or Cloudflare.
