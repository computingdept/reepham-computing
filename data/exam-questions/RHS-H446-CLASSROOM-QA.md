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
