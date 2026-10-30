# H446 Paper 1 — Appendix 5d/5f technical QA, v4.1

**Date:** 30 October 2026  
**Status:** Teacher-review only. **Do not change the live website, revision-guide links or quiz page mapping.**

## New corrected 392-page review PDF

- **File:** `H446_Paper1_Appendix_Review_v4_1_392_pages.pdf`
- **Size:** 1,455,562 bytes
- **SHA-256:** `e351cc1c7b0a6b49ca0cbaf82eb06624b08dd36d685bbfb2c5f789f54575986d`
- **Status:** File is available as a ChatGPT conversation attachment, **not yet uploaded to GitHub**. The earlier GitHub review folder currently retains the 337-page v1 PDF.
- **Comparison:** v4.1 differs in extracted text from v4 on exactly PDF pages **352, 370, 388**. The rest of the 392-page content is preserved.

## Three corrections

1. **Page 352 / 1.3.2(d), LIKE and SQL marking.** Adds a complete valid SQL query following the four individual marks: `SELECT Title FROM Book WHERE Title LIKE 'B%' AND InStock = TRUE;`. Tested on a sample SQLite database, alongside the nested-SELECT and compound-WHERE examples.
2. **Page 370 / 1.3.4(a), JavaScript form.** The previous code only defined `checkMark()`; there was no HTML event invoking it. The example now uses a real form with `onsubmit="checkMark(); return false;"`, a text input, a submit input and `if/else` that changes `textContent`. The script returns **Keep practising** for 69 and **Distinction** for 70 or 75. Tested in Node.js with simulated DOM fields. `onsubmit` is an explained helper; exact event syntax is **not** a memorisation target in OCR Appendix 5d.
3. **Page 388 / 1.2.4, LMC answer.** For outputs of 9 below threshold 10, instruction 03 changes to `LDA NINE` and mailbox 10 becomes `NINE DAT 9`. This avoids retaining a misleading `ZERO DAT 9` name. Branch/output traces verified for 7, 10, 12.

## Automated checks

| Check | Result |
|---|---|
| A4 pages | **392**, unchanged |
| PDF bookmarks | **120**, unchanged |
| Internal navigation links | **164**, all within 1–392 |
| 12 appendix learning cycles | Understand, Model, Try, Check in sequence |
| 36 appendix questions | Each has a numbered answer on the separate Check page |
| Changed pages rendered | Pages 352, 370, 388 inspected |
| SQL worked examples | SQLite sample schemas/queries passed |
| JS example | Node.js execution for 69, 70, 75 passed |
| LMC branch model | Conditional and edited outputs verified |
| Text changes outside three pages | **None** |

## Remaining release blockers

- **Current published 264-page PDF parity:** not performed. The older archived 249-page PDF is not enough; obtain the current binary or text for an exhaustive comparison.
- **264 live stable page keys:** current mapping in `revision/h446/guides/paper-1-page-map.json` must be checked key by key. Previously recorded classifications were 98 unverified strong candidates, 82 other candidates, 61 low-confidence, 7 recall, 15 newer-source-only and 1 contents key. **No replacement destination is approved yet.**
- **Teacher accuracy review:** especially 1.4 calculations, SQL, appendix 5f diagram notation, marking points and accessibility.
- **Final student edition:** remove teacher-review notices and complete phone, classroom-display and print checks before touching `main`.

**Release gate remains HOLD.**
