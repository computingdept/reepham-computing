# H446 Print — 33 long-booklet layout review and decision log

**Date:** 2 November 2026. **Nature:** source-PDF page-layout investigation and recommended production sequence. No existing Print PDF, classroom lesson, revision guide or catalogue link has been changed by this review.

## Findings

- **33** of the **288** published teacher-review print resources exceed **16 A4 pages**.
- Those 33 total **595 A4 pages**. The PDF inspection identifies **265 pages devoted to original lesson diagrams** (about 45% of their combined page count).
- **23** are 18 pages, **7** are 17 pages, and **three** are longer still: Lesson 031 (19), Lesson 028 (20), Lesson 029 (23).
- In the common 18-page format, the original eight-page booklet is supplemented with new-learning/I Do/We Do figures and two We Do discussion and CHECK pages. The **latter two pages are pedagogically useful and must not be discarded merely to meet a page target**.
- Individual visual pages often contain **one image occupying approximately 19–20% of the page area**, with a short caption and considerable space below. Lesson 016 is a striking example: eight source win-pattern images occupy separate pages, each with roughly 14% image area.
- The important distinction: some stage diagrams are progressive reveal states (Lessons 106/107 and similar), while algorithms, Karnaugh maps and D-type timing diagrams rely on seeing intermediate states clearly. Collapsing them without a readable comparison would make the resource worse.

## Recommendation

**Do not impose an eight-page cap on these illustrated A-Level lessons.** Retain all source questions, distinct diagrams, worked solutions, answer separation, and writing space. Aim first to bring the **common 17–18-page group closer to 14–16**, only where a two-figure arrangement is genuinely readable.

1. **Pilot 106 — Operating system functions.** It contains three progressive diagram states per phase. Test two labelled diagram panels per page and check whether the smaller panels remain readable at A4.
2. **Pilot 218 — Dijkstra's algorithm.** A multi-step trace is important. Keep every step and put the stages in sequence, using two diagrams per page only where graph labels remain clear.
3. **Pilot 029 — Karnaugh maps.** The longest at 23 pages. Preserve every required cell value, grouping, 3/4-variable example and model circuit, and check **monochrome readability**. Avoid aggressive shrinking; a justified booklet over 16 pages is preferable to an unreadable 12-page version.

Only after visually comparing original and compact PDF variants should the same print-safe grouping be used on further lessons. Never use a global scale-down of an already rendered A4 PDF (it shrinks handwriting lines, font sizes, and diagrams together).

## Immutable acceptance conditions for any compacted version

- Every source visual in the current printed PDF remains present with identical meaning and intact technical labels.
- Every original question, source model explanation and student writing area is retained.
- **Try → Discuss → Improve** remains, with answer-bearing We Do diagrams and CHECK stages after the Exit Ticket.
- Working diagrams, graph weights, K-map cells and flip-flop timing edges remain readable at 100% A4 printing in colour and black-and-white.
- Four PDF variants resolve: A4 black-and-white, A4 colour, A3 imposed black-and-white, A3 imposed colour; page number and imposition are correct.
- Teacher approval stays **false**. Only a checked replacement becomes the Print link; earlier verified PDFs remain available for comparison.

## All 33 resources for layout review

| Lesson | Current A4 pages | Standalone source diagram pages | Recommended treatment |
|---|---:|---:|---|
| 016 | 18 | 9 | Sensitive diagrams |
| 028 | 20 | 10 | Sensitive diagrams |
| 029 | 23 | 12 | Pilot |
| 031 | 19 | 9 | Sensitive diagrams |
| 106 | 18 | 8 | Pilot |
| 107 | 18 | 8 | Pack adjacent phase diagrams |
| 108 | 17 | 7 | Pack adjacent phase diagrams |
| 109 | 18 | 8 | Pack adjacent phase diagrams |
| 111 | 18 | 8 | Pack adjacent phase diagrams |
| 112 | 18 | 8 | Pack adjacent phase diagrams |
| 113 | 18 | 8 | Pack adjacent phase diagrams |
| 114 | 18 | 8 | Pack adjacent phase diagrams |
| 115 | 18 | 8 | Pack adjacent phase diagrams |
| 116 | 18 | 8 | Pack adjacent phase diagrams |
| 117 | 18 | 8 | Pack adjacent phase diagrams |
| 118 | 18 | 8 | Pack adjacent phase diagrams |
| 119 | 18 | 8 | Pack adjacent phase diagrams |
| 120 | 18 | 8 | Pack adjacent phase diagrams |
| 121 | 18 | 8 | Pack adjacent phase diagrams |
| 122 | 18 | 8 | Pack adjacent phase diagrams |
| 123 | 18 | 8 | Pack adjacent phase diagrams |
| 124 | 18 | 8 | Pack adjacent phase diagrams |
| 136 | 17 | 7 | Pack adjacent phase diagrams |
| 137 | 17 | 7 | Pack adjacent phase diagrams |
| 204 | 17 | 7 | Sensitive diagrams |
| 208 | 17 | 7 | Pack adjacent phase diagrams |
| 216 | 17 | 7 | Pack adjacent phase diagrams |
| 218 | 18 | 8 | Pilot |
| 219 | 18 | 8 | Sensitive diagrams |
| 220 | 18 | 8 | Sensitive diagrams |
| 221 | 18 | 8 | Sensitive diagrams |
| 222 | 17 | 7 | Pack adjacent phase diagrams |
| 227 | 18 | 8 | Sensitive diagrams |

## Evidence

- [Machine-readable inspection of all 33 PDF files](H446_PRINT_LONG_PAGES_DIAGNOSTIC.json)
- [Page-by-page PDF inspection](H446_PRINT_LONG_PAGES_DIAGNOSTIC.md)
- [Overall H446 guided-practice structural QA](H446_WEDO_FINAL_QA.md)

This review tests **layout structure and source-figure count**, not whether a diagram is pedagogically correct. The next meaningful decision requires actual visual side-by-side PDF checks.
