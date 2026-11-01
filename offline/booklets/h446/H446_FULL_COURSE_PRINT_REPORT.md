# OCR H446 A-Level — Complete Print Booklet Production Report

**Date:** 1 November 2026  
**Repository:** `computingdept/reepham-computing`  
**Scope:** Year 12 Lessons 001–160 and Year 13 Lessons 181–320

## Executive production summary

| Measure | Year 12 | Year 13 | Total |
|---|---:|---:|---:|
| Curriculum slots inspected | 160 | 140 | **300** |
| New printed drafts from this production run | 140 | 133 | **273** |
| Previously generated eight-page drafts retained | 15 | 0 | **15** |
| **Print booklets available in the catalogue** | **155** | **133** | **288** |
| Assessment/feedback lessons excluded | 5 | 7 | **12** |
| Five-lesson batches processed in the new runs | 29 | 28 | **57** |

**Publication status:** PDFs generated, A4/A3 PDF checks passed, catalogue Print links committed to the main GitHub branch. All resources remain **drafts pending teacher content and visual approval** (`teacher_approved=false`).

## Page-length rules

The standard A4 booklet is **eight pages**. Exception pages were permitted to preserve complete source material and writing space:

| Year 12 lesson | Pages | Reason |
|---|---:|---|
| 017 | 9 | Multi-part arrays/code tasks |
| 019 | 10 | Linked-list modelling and coding |
| 025 | 9 | Binary-search coding practice |
| 031 | 9 | Flip-flop modelling/tracing |

All newly generated Year 13 booklets used eight A4 pages.

Each new booklet has an A4 black-and-white edition, an A4 colour edition and both A3 booklet variants. Number of A3 imposed PDF pages is checked, including padding where needed.

## Explicit exclusions — deliberately not student print booklets

**Year 12:** 036, 037, 058, 088, 098.

**Year 13:** 214, 215, 250, 280, 305, 306, 308.

These are assessment or feedback lesson sources. The generator deliberately avoided publishing unreviewed assessment materials and/or potential answers to pupil-facing Print links.

## Automated checks completed

- Source-based four-question Do Now, lesson objectives, vocabulary and new learning carried into the printed sequence.
- Worked examples, guided practice, independent questions and exit prompts drawn from classroom lesson sources; You Do source answer reveals are not put into the independent questions.
- A4 and A3 page counts validated; text presence checked on each A4 page.
- Verified that every **new catalogue Print target** resolves to a committed PDF on the repository.
- Existing printed links retained where publication was intentionally deferred.
- Original classroom lessons, revision guides, shared CSS/JS and navigation left unchanged.
- Exceptions logged without fabrication of missing model answers.

## Essential teacher approval checks before delivery

**Important visual limitation:** Of the 273 booklets generated in the new bulk runs, **268 were flagged as containing source diagrams/images that the text-first generator did not embed**. Some may be decorative, but many computing topics rely on diagrams, graphs, circuits, flowcharts, trace tables and data structures. **These PDF drafts are not yet visually or pedagogically approved**. Reconstruct or verify the necessary visuals before classroom use.

Also verify the C# examples, OCR H446 language/specification, answer completeness and readability from the printed page. Where the classroom source did not include a machine-readable model answer, the booklet remains flagged rather than inventing one.

The production checks are **not** equivalent to independent verification against the latest OCR specification or to a teacher's classroom approval.

## Year-by-year batch reports

- [Year 12 report](Y12_FINAL_PRODUCTION_REPORT.md)
- [Year 12 detailed machine audit](Y12_EIGHT_PAGE_BATCHES.json)
- [Year 13 report](Y13_PRINT_PRODUCTION_REPORT.md)
- [Year 13 detailed machine audit](Y13_EIGHT_PAGE_BATCHES.json)

## Student access

- [H446 Year 12 Learning Hub](https://rhsccs.org/h446-hub.html?year=12)
- [H446 Year 13 Learning Hub](https://rhsccs.org/h446-hub.html?year=13)

The central **Print** action uses the existing `print-viewer.html` and booklet catalogue; no additional navigation layers were introduced.

---

**Status:** Bulk generation and publication completed for 288 available H446 print booklets. Manual content/diagram review remains the release gate before teaching.
