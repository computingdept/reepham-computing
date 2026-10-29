# J277 print booklets 016–025 — source and generator audit (29 October 2026)

**Scope:** Existing four-page `Gold_Standard_4_Page.pdf` print routes and their generating source code. **This is a structural/source-code audit, not a teacher visual sign-off or a proof of 100%-scale print quality.** No original Teach lesson, revision guide, or student navigation changed by this report.

## Findings

| Lessons | Source alignment / layout | Priority |
| --- | --- | --- |
| 016 | Uses all three original `e` questions. **Corrected 29 October:** exam numbering now Q2–Q4 after Code First, and Review & Improve now declares **2 copy + 4 rewrite** lines in the renderer. The Code First task still differs from the source classroom task (confirmed by PDF/source check), so this needs correction and visual inspection. | P1 |
| 017–018 | Three exam questions are read from the original lesson `e` source. Do Now and Code First are overridden by the central banks (as in classroom rendering); the booklet uses hand-maintained short mark summaries rather than the complete `e` model text. **Corrected 29 October:** Review & Improve is now set to **2+4** ruled lines; the existing hand-maintained shortened mark summaries still need comparison with full lesson answers. Lesson 018 is labelled AP1 Assessment and Review: verify that this is a review companion rather than a replacement for the assessment paper. | P1 |
| 019–020 | Three source `e` questions are present and the printed I Do / We Do examples are specially adapted to the lesson; source-specific checks exist for these models. Two exam tasks are long, including a six-marker, and the limited page-three response area needs a physical print check. Page-four answer summaries are manually rewritten; **Corrected 29 October:** Review & Improve is now set to **2+4** lines, but answer summaries and 6-mark writing space still need the print review. | P1 |
| 021–025 | The shared generator pulls the three original `e` exam questions, final Do Now retrieval bank, final Code First bank and source `w` answers. **All five lessons include a six-mark You Do question but allocate only two ruled answer lines to each exam question** (`third()` slots). **The final page has one ruled line for copying the question and one for rewriting the answer**, against the agreed **2+4** minimum (`fourth()`). | P0 for pupil release |

## Actions completed on 29 October

- Updated the shared `build_j277_gold_batch_016_020.py` renderer for consistent Code First Q1 / exam Q2–Q4 numbering and a **2+4** green-pen correction section.
- GitHub Actions successfully rebuilt and recommitted all five updated PDFs (016–020). The automated source/PDF audit confirms all ten PDFs contain 4 retrieval questions and 3 source exam questions; it flags Code First mismatches at **016** and **018** and inadequate **1+1** correction space at **021–025**. This does not constitute a visual print pass.
- Added `tools/revision/audit_j277_print_focus_016_025.py` and its GitHub Actions workflow for repeatable pre-release checks.

## Why automated checks missed this

The two production workflows confirm existence, four-page count, text source matching, and selected geometry. They do **not** enforce response-space minima, full worked-answer equivalence, complete lesson-specific diagram fidelity, or the original revision-guide cross-check. The full-course report's `automated-checks-passed` means these **automated conditions** passed, not that the booklet is approved for pupils. In particular, the 021–164 generator records six-mark response-space concerns as `pedagogical-review` but still permits publication under its current exception rules.

## Fixed quality gate for the next correction pass

1. Preserve the current four-page master **only if the full original source questions, worked guidance, truthful explanations and sufficient response space fit**. Do not solve overflow by making body text unreasonably small, truncating answers, or removing prompts.
2. On page 3, include Code First (the final classroom bank) then **the exact three lesson You Do exam questions**, with mark-dependent answer space. Where a 6-mark answer will not fit, explicitly provide a dedicated lined response insert / additional sheet rather than pretending two lines are enough.
3. On page 4, preserve original question-to-answer mapping and the exact sequential green-pen instructions. Minimum: **two lines to copy the full question and four to write the new answer**.
4. Validate the final Do Now bank, classroom Code First bank, three lesson `e` questions and `e` model answers; review `w` and the exit facts. Distinguish assessment/review companions from test papers.
5. Render and inspect all four pages at actual A4 printing scale, verify readable font sizes and diagrams, then audit B&W. The reviewer must explicitly sign off; neither filename nor automated-check status is approval.
6. Use lessons 016–025 as the acceptance batch **before** regenerating 026–164. Do not modify online Teach lessons or revision guides.

## Source paths checked

- `tools/revision/build_j277_gold_batch_016_020.py`: `topic()`, `p3()`, `p4()`, `validate()`.
- `tools/revision/build_j277_remaining_gold.py`: `source()`, `third()`, `fourth()`, `validate()`.
- `lessons/j277/autumn1-014-018.json` (016–018) and `lessons/j277/autumn2-019.json` … `autumn2-025.json`.
- `lessons/j277/donow-bank-20261020.json`, `lessons/j277/code-first-master-20261021.json`.
- `docs/independent-learning-central-standard.md`, `docs/independent-booklet-master-template.html`.
- `offline/booklets/j277/full-course-audit.md`, the committed PDF inventory, and J277 hub print mapping.

**Disposition:** Batch 016–025 is *needs correction/teacher audit*. Keep files for review; do **not** assume classroom readiness. Correcting the master requires a safe reflow or an accessible separate writing sheet; a forced four-page squeeze that loses learning content is not acceptable.
