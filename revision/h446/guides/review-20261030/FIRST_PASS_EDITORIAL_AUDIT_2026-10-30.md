# H446 Paper 1 — first-pass editorial audit (30 October 2026)

**Decision: HOLD.** This is a teacher-review branch. Do not replace the PDF, revision quizzes or student hub on `main`.

## Compared sources

- **Candidate:** `H446_Paper1_Review_337_pages.pdf` — 337 pages, SHA-256 `0761c29ddb6f307df9197e0e76bac8c3c7b156768b9108a1742ae897966a2955`.
- **Current published guide:** `H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf`; the maintained map reports 264 pages (edition `2026-10-27-complete-vocabulary`). Its *current binary* was not available to the audit environment.
- **Content comparison source:** archived **249-page** earlier H446 guide. Findings from it are useful but do **not** establish parity with the published 264-page edition.
- [OCR H446 specification v2.7](https://www.ocr.org.uk/Images/170844-specification-accredited-a-level-gce-computer-science-h446.pdf) is the syllabus reference.

## Structural checks

| Check | Result |
|---|---|
| 337 A4 pages, five numbered chapters and recall appendix | PASS |
| 79 four-page Understand / Model / Try / Check cycles | PASS |
| Numbered practice questions paired with the same numbers on each Check page (79 cycles) | PASS — checks numbering, not marking accuracy |
| 100 PDF bookmarks and 89 links, with no invalid PDF target pages | PASS |
| No extracted text blocks outside page bounds | PASS — not a complete visual audit |
| Review-only markings | 330 pages contain teacher-review wording: **must remove for the student release** |

## Specific content differences requiring correction

1. **1.2.1 Memory management:** The earlier source on pages 50–53 explicitly contrasts *internal fragmentation* (paging) and *external fragmentation* (segmentation). **“Fragmentation” does not appear anywhere in the 337-page candidate**. Restore the concept and a worked memory-management example.
2. **1.3.2(b) Data capture:** The earlier source on pages 95–96 contrasts **OCR** and **OMR**. The new candidate includes capturing data but **does not mention OMR**. Restore the distinction, with a concrete example where appropriate.

These are observed differences, not an exhaustive list of content omissions. Current edition parity is still pending.

## Blocking release checks

- The live `paper-1-page-map.json` holds **264 stable keys**, and `revision/h446/guide-links.js` continues to route quizzes to the old 264-page file. Create and verify a **key-by-key new destination map** before any replacement.
- Compare the entire current 264-page guide against the candidate to ensure valuable visual diagrams, worked examples, questions and original analogies remain.
- Reconcile the appended seven memory-bank pages, sourced from the older 249-page edition.
- Validate technical worked examples, K-maps, floating point, code, SQL, exam-answer accuracy and legal references. Verify with OCR and current online lessons.
- Remove all review-only wording from a separate student-release PDF; check print, mobile and classroom screen usability, then obtain teacher sign-off.

**Release status: NOT APPROVED. No live student resources were modified.**
