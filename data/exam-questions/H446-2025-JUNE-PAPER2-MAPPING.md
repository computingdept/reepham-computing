# H446 June 2025 Paper 2 — complete draft question mapping

**Status: full mapping completed, no student publication or classroom approval.**

This review reuses the existing independently authored RHS question bank for June 2025 OCR H446/02. Existing questions, draft answer points, marking rules, exam references, source links and marks are unchanged. Layout categories have been selected from the **actual RHS prompt content**, not the earlier broad “may need SVG/table/code” flags.

## Paper coverage

- **37 question parts**, **140 marks**.
- **16 text-only parts** and **21 visual/layout parts**.
- Every part has an existing RHS answer and marking-rule draft, but all 37 remain `disabled_not_approved`.
- Paper figures/code still require source/context and teacher review before student presentation.

| Question | Parts | Marks | Visual/layout parts |
| --- | ---: | ---: | ---: |
| Q1 | 8 | 22 | 4 |
| Q2 | 3 | 14 | 1 |
| Q3 | 4 | 17 | 4 |
| Q4 | 1 | 9 | 1 |
| Q5 | 3 | 11 | 2 |
| Q6 | 6 | 18 | 2 |
| Q7 | 3 | 9 | 2 |
| Q8 | 9 | 40 | 5 |
| Q? | 1 | 0 | 1 |
| **Total** | **37** | **140** | **21** |

## Reusable visual/layout families

| Resource family | Question parts | Parts | Format |
| --- | --- | ---: | --- |
| Insertion sort, complexity, pipeline, debugging | 1(b), 2(a), 4*, 6(a) | 4 | Native HTML trace/table |
| Quicksort/stack/debugging/linked-list code | 1(c)(i–ii,iv), 3(b–d), 6(d), 8(b)(i–ii), 8(c)(i–ii), 8(d) | 12 | Native monospaced code |
| Stack array view | 3(a) | 1 | Native HTML stack array |
| Dijkstra diagram and trace | 5(a), 5(b) | 2 | One source-specific graph, separate answer trace |
| BST insert and traversal | 7(a), 7(c) | 2 | One source-specific BST, separate full-size answer |
| **Total** | | **21** | |

These counts represent question *parts*, not new images. Existing matching SVGs must be visually verified against each RHS scenario. Never apply a generic graph/tree with different data.

## Review-ready question bank

[`h446-2025-jun-paper2-review-map.csv`](h446-2025-jun-paper2-review-map.csv) contains the full existing question text, answer points, marking rules, source reference, visual presentation mode and independent approval gates for each part.

**Use the established question screen → large dedicated answer screen format** for future teacher preview creation. Most of this paper's visual questions need HTML tables, code or trace components rather than images. No SVG assets or live lesson UI changes are authorised by this mapping PR.

**Release gate:** pending original OCR source/context alignment, correct model outputs and mark-scheme alternatives, classroom legibility/accessibility, originality review and teacher sign-off. All entries remain unapproved.

**Scope:** two new files in `data/exam-questions/`, isolated draft branch. Do not change the live H446/J277 site, assignments, Cloudflare scoring, old November 2021 QA or published revision.
