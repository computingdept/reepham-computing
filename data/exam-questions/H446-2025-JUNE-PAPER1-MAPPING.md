# H446 June 2025 Paper 1 — complete draft question mapping

**Status: full mapping completed, no student publication or classroom approval.**

This review reuses the existing independently authored RHS question bank for June 2025 OCR H446/01. Existing questions, draft answer points, marking rules, exam references, source links and marks are unchanged. Layout categories have been selected from the **actual RHS prompt content**, not the earlier broad “may need SVG/table/code” flags.

## Paper coverage

- **41 question parts**, **140 marks**.
- **29 text-only parts** and **12 visual/layout parts**.
- Every part has an existing RHS answer and marking-rule draft, but all 41 remain `disabled_not_approved`.
- Paper figures/code still require source/context and teacher review before student presentation.

| Question | Parts | Marks | Visual/layout parts |
| --- | ---: | ---: | ---: |
| Q1 | 9 | 23 | 1 |
| Q2 | 5 | 21 | 0 |
| Q3 | 7 | 14 | 1 |
| Q4 | 3 | 19 | 1 |
| Q5 | 4 | 14 | 3 |
| Q6 | 6 | 20 | 3 |
| Q7 | 2 | 13 | 1 |
| Q8 | 5 | 16 | 2 |
| Q? | 1 | 0 | 1 |
| **Total** | **41** | **140** | **12** |

## Reusable visual/layout families

| Resource family | Question parts | Parts | Format |
| --- | --- | ---: | --- |
| CPU/GPU and bitwise comparison | 1(c)(i), 3(d)(i) | 2 | Native HTML |
| LMC/compiler classifications | 4(a), 6(b)(i) | 2 | Native table |
| Adder truth table, circuit, K-map | 5(a), 5(c), 5(d) | 3 | One source-specific circuit, two native grids |
| SQL data and query | 6(c)(i), 6(c)(ii) | 2 | Native schema table and SQL code |
| Pixel decoding | 7(b) | 1 | Native HTML pixel grid |
| Quiz entity relationships | 8(b) | 1 | Source-specific ERD |
| JavaScript | 8(d) | 1 | Native monospaced code |
| **Total** | | **12** | |

These counts represent question *parts*, not new images. Existing matching SVGs must be visually verified against each RHS scenario. Never apply a generic graph/tree with different data.

## Review-ready question bank

[`h446-2025-jun-paper1-review-map.csv`](h446-2025-jun-paper1-review-map.csv) contains the full existing question text, answer points, marking rules, source reference, visual presentation mode and independent approval gates for each part.

**Use the established question screen → large dedicated answer screen format** for future teacher preview creation. Most of this paper's visual questions need HTML tables, code or trace components rather than images. No SVG assets or live lesson UI changes are authorised by this mapping PR.

**Release gate:** pending original OCR source/context alignment, correct model outputs and mark-scheme alternatives, classroom legibility/accessibility, originality review and teacher sign-off. All entries remain unapproved.

**Scope:** two new files in `data/exam-questions/`, isolated draft branch. Do not change the live H446/J277 site, assignments, Cloudflare scoring, old November 2021 QA or published revision.
