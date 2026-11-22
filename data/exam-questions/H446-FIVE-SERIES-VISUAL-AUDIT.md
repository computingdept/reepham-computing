# H446 visual-assets audit — five exam series, November 2021 to June 2025

**22 November 2026. Draft-only audit — NO student release.**

This audit covers all **410** RHS draft question parts across ten 140-mark H446 papers (total **1,400 marks**). It distinguishes a question **needing a visual layout** from a question **requiring a newly drawn SVG**. The source of truth is the original RHS question/QA CSVs on `main`, the isolated November 2021 QA branch, and the eight separate Paper 1/Paper 2 review-map draft branches for 2022–2025.

## Result

| Classification | Question parts | What to do |
| --- | ---: | --- |
| Text-only | 263 | No image or special layout needed |
| Native HTML/code | 94 | Reuse tables, code panels, traces, bit grids — **not SVGs** |
| November 2021 isolated QA artwork | 31 | Reuse draft SVGs in PR #114, subject to teacher source/legibility approval |
| Source-specific diagram parts (2022–2025) | 22 | Check candidate SVGs against exact prompt data; draw only genuine gaps |
| **Total** | **410** | **147** visual/layout flagged |

**IMPORTANT: “22 SVG parts” does not mean 22 different new images.** Several parts share one tree, graph, logic or database diagram. Of the 22 diagram-linked parts, **19 have an existing candidate question SVG path in the main QA/mapping data**, while **3 have no recorded main candidate**. A file path is NOT proof that a diagram is source-matched or suitable as a student question.

| Series | Layout-flagged parts | Native table/code | Source-specific diagram parts | Separate 2021 QA SVGs |
| --- | ---: | ---: | ---: | ---: |
| November 2021 | 31 | – | – | 31 |
| June 2022 | 29 | 23 | 6 | – |
| June 2023 | 28 | 24 | 4 | – |
| June 2024 | 26 | 20 | 6 | – |
| June 2025 | 33 | 27 | 6 | – |
| **Total** | **147** | **94** | **22** | **31** |

## Explicit source/answer leakage findings in 2025

These were checked against the actual **RHS question wording** and the content of the existing main-branch SVGs:

- **2025 Paper 1 Q5(c) — full adder:** existing `full-adder-question.svg` shows both completed half adders, OR gate and output connections. The RHS question asks pupils to *complete* this circuit. **Do not use that image unrevealed.** Prepare a partial original source-matching question diagram and a complete answer image.
- **2025 Paper 1 Q8(b) — ERD:** existing `erd-question.svg` depicts `Student/Course/Enrolment`, but the RHS prompt uses `TblLearner/TblTopic/TblTest/TblAttempt`. **Not source-matched.** Prepare question and answer ERD for those four RHS tables.
- **2025 Paper 2 Q7(a) and Q7(c) — BST:** existing `bst-question.svg` accurately shows the *initial* tree rooted at 50 with 25,75,10,35,60,90; `bst-traversal-question.svg` still shows only that original tree. The five new insertion values 30,72,5,80,95 belong in the *answer* diagram for Q7(a) and in the post-insertion context for Q7(c).
- **2025 Paper 2 Q5(a)/Q5(b) — Dijkstra:** both `weighted-graph-question.svg` and `dijkstra-question.svg` contain six nodes S,A,B,C,D,T with the eight specified RHS costs (4,2,1,5,10,8,3,2); **candidate graph reuse is preferable to drawing again**. Still validate edge direction and accessibility with the complete screenshot before teaching.

## Single batch priority instead of SVG-by-SVG polishing

1. **First focused artwork batch**: 2025 full-adder *partial question + full answer*, 2025 four-table quiz ERD *question + answer*, and 2025 post-insertion BST *full answer* (five assets across three content families). Reuse matching initial BST and Dijkstra source images.
2. Complete the **existing-candidate source/data checks** for the 2022–2024 diagram parts before commissioning more images. Do not assume a generic tree or graph is a match merely because it loads.
3. For **94 native parts**, implement reusable HTML tables, grids and monospaced code only when questions are integrated into real lessons; no SVGs are needed.
4. Continue lesson integration and teacher review; avoid cosmetic SVG editing unless a genuine classroom legibility or data issue is found.

## Review register

The companion [147-row CSV audit](h446-five-series-visual-assets-audit.csv) includes question IDs, original visual requirement, RHS topic, intended presentation mode, candidate assets from main, isolated November 2021 assets, proposed next action, known mismatch alerts and teacher/student approval gates. Every one of the 147 rows is **`disabled_not_approved`**.

**Safety/integrity:** Do not merge or publish these mapping/audit files to the live site without teacher sign-off. This audit performs no mutation of H446/J277 lessons, website CSS/JS, assignments, Cloudflare D1, student scores or existing artwork.

