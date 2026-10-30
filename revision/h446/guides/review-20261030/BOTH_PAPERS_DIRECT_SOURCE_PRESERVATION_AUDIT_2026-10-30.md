# OCR H446: direct comparison with both current published PDFs

**Audit date: 30 October 2026 | Release decision: HOLD**

## Source availability blocker RESOLVED

The user supplied the actual current PDFs in ChatGPT. Their Git blob SHA-1 hashes **exactly match the files on GitHub `main`**:

| Paper | Current GitHub PDF | Blob SHA | Expanded comparison guide |
|---|---|---|---|
| 1 | `H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf`, **264 pages** | `d416773a397378837b92390b1d633e98a93dea88` | V4.2, **396 pages** |
| 2 | `H446_Paper_2_REVIEW_READY_2026-10-21.pdf`, **179 pages** | `42490bdac53f37d3734e1c768722daa9b240c164` | `H446_Paper2_Final_Algorithm_Audit_TEACHER_REVIEW.pdf`, **248 pages** |

The source files have now been opened and compared directly against the expanded PDFs using extracted text, topic-by-topic similarity and representative rendered-page checks. **This is not yet a page-by-page teacher approval of every illustration and mark scheme.**

## Substantive finding: the expanded editions are not lossless replacements

The new PDFs are extensively **rewritten**. They contain useful new visual teaching and OCR appendix exercises, but original assessment prompts and examples were not always carried across. Low text similarity only flags a potential gap; it does not automatically mean the topic is absent.

### Paper 1: specific examples needing preservation

- The original **CPU Highway** diagram on p2 is restored as an adapted illustration at expanded p338; the additional architecture visual bridges are on pp339–342.
- Original p**252** contains a **nine-mark ethics evaluation** about automated recommendations for pupil support, along with writing scaffolds. The original question is **not reproduced verbatim** in V4.2, although the related ethical principles are covered.
- Original p**133** contains an instrument-return data-capture problem and barcode/manual-entry comparison; original p**192** asks students to justify a structure for frequent node insertion/deletion. Topics are covered, but the original question forms are absent.
- The original SQL `StudentName` example/schema at pp**143, 148–150** is not present by that name in V4.2. Verify equivalent depth in relational reasoning and original marking points.
- The mixed memory-bank appendix (published pp258–264) has strong text matches in the expanded guide.

**Priority:** original 1.5 ethics long responses, database exam practice, then other low-similarity original pages.

### Paper 2: specific examples needing preservation

- Original **C# `CountPasses`** worked/practice method at pp**32 and 34** is absent by name from the 248-page review guide.
- Original **`ValidTimes` / `Overlaps`** booking method problems at pp**98, 101–102** are absent by name.
- Original **`CountDistinctSorted`** algorithm at pp**117 and 120** is absent by name.
- The published four-page mixed memory banks at pp**176–179** do not appear as an equivalent end-of-guide recall appendix; expanded p248 finishes with Dijkstra/A* answer practice.
- Paper 2's expanded guide uses OCR pseudocode while the old guide gives many explicit C# examples. Both can be useful; the absence of the original named methods warrants a targeted teaching/assessment review.

**Priority:** restore original C# programming and tracing practice, followed by four pages of recall.

## Automated topical triage, NOT content certification

Each original physical PDF page was compared with all pages of its candidate using word and two-word TF-IDF. Median best-page similarities by original chapter (0–1 scale):

| Chapter | Median topical text similarity |
|---|---:|
| P1 1.1 | 0.300 |
| P1 1.2 | 0.242 |
| P1 1.3 | 0.238 |
| P1 1.4 | 0.241 |
| **P1 1.5** | **0.138** |
| P1 recall | 1.000 |
| P2 2.1 | 0.176 |
| **P2 2.2** | **0.166** |
| P2 2.3 | 0.205 |
| **P2 recall** | **0.132** |

These are **lexical similarity values**, not coverage percentages, quality judgements or automatic mapping approvals. They show where to inspect first, especially rewritten exam questions.

## Release work remaining

1. Restore or explicitly link the identified original practice/questions and corresponding answers, without altering their marks.
2. Complete manual teacher review of original diagrams, exam questions and model solutions across remaining flagged pages.
3. Check every live guide page key against approved, **not merely similar**, new content: **264 stable keys** in Paper 1 and **179 in Paper 2**. The separate 108-skill Paper 1 migration is a provisional structural proposal only.
4. Remove review-only labels, correct global and unit footer page numbers, audit PDF internal/external links and examine screen/phone/BW print output.
5. Publish the two student PDFs, per-unit extracts, generated guide-link script and approved maps together, keeping prior PDFs available during transition.

**No changes were made to `main`, rhsccs.org, the current guides, quiz banks or saved student progress.** This report replaces the previous statement that the current PDFs could not be obtained. Their actual binary sources are now available.
