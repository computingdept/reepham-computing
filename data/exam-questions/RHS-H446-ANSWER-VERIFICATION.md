# RHS H446 answer-verification progress

**Status date: 21 November 2026**  
**Scope:** 410 parts from 10 OCR H446 A Level Computer Science question papers; 1,400 marks total.

The new **H446 RHS-authored practice table** is [h446-rhs-practice-drafts.csv](h446-rhs-practice-drafts.csv). It is designed to mirror J277's separate practice drafting and verified-answer workflow.

## Progress as saved

| OCR series | Question parts | RHS question drafts written | RHS answer/marking text reviewed |
| --- | ---: | ---: | ---: |
| November 2021 | 75 | 0 | 0 |
| June 2022 | 92 | 0 | 0 |
| June 2023 | 84 | 0 | 0 |
| June 2024 | 81 | 0 | 0 |
| June 2025 | 78 | 41 | 41 |
| **Total** | **410** | **41** | **41** |

All **41** currently drafted items are **H446/01 June 2025 Q1(a)–Q8(d)**, including 20 newly authored question parts from Q4–Q8. Their original RHS wording and marking guidance were compared with the textual contents of the [official 2025 /01 question paper](https://www.ocr.org.uk/Images/752247-question-paper-computer-systems.pdf) and [official 2025 /01 mark scheme](https://www.ocr.org.uk/Images/752415-mark-scheme-computer-systems.pdf).

These are **source-text-linked working drafts**, not completed visual-page checks or an exhaustive OCR mark-scheme transcription. PDF page screenshots were attempted but unavailable; visual figure/context comparisons remain pending. Diagram, table and code questions require separate full-source visual/context verification. Levels-of-response items must be independently moderated and reviewed by a teacher.

### Noteworthy marking constraints already preserved

- Q1(b)(i), four marks: appropriate input device, its contextual use, output device and its contextual use.
- Q1(b)(ii), two marks: storage type plus justified reason. Optical storage is not credited in the source marking scheme.
- Q1(c)(i), two marks: GPU is appropriate for broad simple parallel workloads, CPU for smaller complex workloads.
- Q2(a), four-mark comparisons: each full pair must compare **the same feature** across both architectures; two marks per paired comparison.
- Q2(b), nine marks: **levels-of-response**, including virtualisation concepts, practical client trade-offs and a justified evaluation; not nine independent checklist marks.
- Q3(a): 189 → 10111101 (binary) and BD (hex); E4 → 228 in denary.
- Q3(c): result mantissa 010001, exponent 0011; the OCR scheme distinguishes valid binary working from entirely denary calculations.
- Q3(d)(i): 1010 0011 AND 1010 1110 → 1010 0010, with one mark per nibble.

## What is still not complete

1. **369** original RHS question drafts and **369** question-specific source-linked answer checks.
2. Additional source-paper figure and mark-scheme-page review for all 41 where images/layout are relevant (10 of the second batch have original visual/table/code layout dependencies).
3. Original tables, program listings, trace layouts and SVG assessment contexts as needed (not every source visual should become an SVG).
4. Question-by-question OCR examiner-report inspection and independent examiner insight for unreviewed entries.
5. Final originality, marks, accessibility, mobile, projector, teacher approval and classroom integration checks.

**None** of these 410 records is marked `approved_for_classroom`, and no live lesson is changed by this work. The canonical H446 catalogue and J277 materials are unchanged.

## Added review: June 2025 H446/01 Q4–Q8

- Q4(a): the five LMC mnemonics match a non-linear allocation (**five correct for three marks**, rather than one mark per row). Q4(b) includes a separate valid LMC program to select the greater of two different inputs.
- Q4(c), Q7(a): **12-mark and nine-mark levels-of-response** respectively, kept for teacher marking; the RHS prose outlines themes rather than copying the official level descriptors.
- Q5(a)–(d): half/full-adder logic and an independently transposed four-input Karnaugh grid. The map function was programmatically checked as `(A AND NOT D) OR (B AND NOT C)`; the **seven 1-cells** and the two implicant groups require visual-render checking before classroom use.
- Q6(c): independent `TblSoftware` dataset with RHS product IDs, preserving the SQL complexity and numerical price values. Both INSERT and nested-SELECT answer examples were tested with SQLite; the threshold selection returned the two lower-priced existing products before the example INSERT.
- Q7(b): four independently transcribed run-length rows were checked to decode to **nine cells each**; a fresh 9×4 response grid is still required.
- Q8(b), Q8(d): original four-table ERD case and original JavaScript code blanks; diagram notation and monospaced code rendering still require final review.

All 20 rows carry a review status distinguishing source **text** checks from source **page-image** and independent presentation checks. All remain unapproved.
