# RHS Computing J277 practice question drafts

This is a **separate, public, RHS-authored practice-question drafting table**, not an OCR paper and not the canonical OCR reference catalogue.

- **Draft table:** `j277-rhs-practice-drafts.csv`
- **Canonical source catalogue:** `j277-questions.csv` (unchanged)
- **Coverage:** 225 records, one for each J277 source question part.
- **Written RHS drafts:** 225 question parts across June 2022, 2023, 2024 and 2025 (both J277 papers).
- **This update:** 214 additional scenario drafts alongside the existing 11.
- **RHS answer-audit pass:** 225/225 records have RHS-authored answer points and specific mark allocation reviewed against the corresponding official June 2022–2025 OCR papers and mark schemes (8 schemes). New columns record the scheme URL and review status.
- **Question wording corrected during the answer audit:** 43 records. These corrected texts are still awaiting final independent originality and classroom-layout checks.
- **Visual and layout dependencies:** 65 records are flagged for source-figure/table/layout review; 1 record requires an original RHS SVG; the other 159 have no recorded source-figure flag.
- **All 225** RHS question texts are **drafts**, not final classroom-ready questions.
- **Live lesson deployment:** not enabled by this table. Changing this CSV alone does not replace existing classroom content or enable the exam-classroom pilot.

## Publishing and review rules

1. Keep the **OCR paper reference, year, question number, marks and specification point** with each RHS record. The reference is for assessment traceability, not a claim that the RHS wording is official OCR wording.
2. Write a genuinely independent question. A change in setting alone, even with a new SVG, does **not** automatically make the question original.
3. Keep the command word, intended assessment demand, marks, correct concepts and required numerical values. **Do not invent omitted numbers**: the reference catalogue often records only a question summary, not the original figures, code, datasets or values.
4. Verify the complete OCR source **privately** for source-dependent numerical values, programming snippets, options, tables, diagrams and extended-response level descriptors. Do not publish copies of the complete OCR papers, schemes or examiner reports.
5. Author any diagrams, charts, tables or SVGs independently. Mark `visual_status` as ready only when the new artwork has been checked against the required assessment and mark allocation.
6. Keep RHS marking guidance separate from RHS question wording. The `rhs_marking_guidance` and `rhs_examiner_insight` columns are teacher-written summaries from the original catalogue where available, **not** official verbatim OCR text.
7. Only promote `draft_status` to `approved_for_classroom` after independent originality, source-context, numerical and mark-scheme checks. **None of the 225 drafts is approved for automatic classroom display yet.**

## Statuses

- `awaiting_original_question`: historical status; no records currently remain in this state.
- `marking_verified_final_approval_pending`: question wording and RHS answer guidance have been checked against the intended OCR mark allocation; 183 records; still NOT approved for public student lesson display.
- `marking_verified_visual_or_final_approval_pending`: question wording was corrected to recover the original mark demand, but presentation/visual and final classroom checks are still pending; 42 records.
- `rhs_answer_verification_status`: records whether the RHS answer points and allocation were reviewed against the official OCR source, or the RHS question also required a revision. All 225 rows now contain this status.
- `rhs_verified_answer_points` and `rhs_verified_marking_rule`: teacher-authored answer/marking paraphrases, **not OCR's verbatim mark schemes**.
- `rhs_answer_source` and `rhs_answer_review_date`: exact official scheme URL and date of independent RHS review.
- `numerical_and_context_review=check_against_full_source`: do not assume every source value or source-dependent detail was available in the catalogue.
- `visual_status=svg_required`: a new RHS diagram must be created and checked (currently used for the star-network task).
- `visual_status=requires_source_figure_review`: a table, figure, code visual, logic diagram or source-dependent structure needs a new RHS asset or layout review before student display.
- Draft wording that refers to a **supplied/accompanying** table, flowchart, trace table or code sample is **not self-contained** until that independently authored companion material is supplied. Do not deploy such a draft with the context missing.
- `mark_scheme_review_status`: **legacy snapshot** inherited unchanged from the original OCR index; it still shows 11 previously reviewed and 214 not reviewed. **Do not use this field to infer the newer RHS audit status.** Use `rhs_answer_verification_status` instead.

## First classroom draft examples

- Router tasks: café — `J277-2022-JUN-01-Q3D`
- Star-topology diagram: café with **five laptops, two printers and one switch** — `J277-2024-JUN-01-Q2CI` (new SVG required)
- Switch: office — `J277-2024-JUN-01-Q2CIII`
- Star vs mesh: school — `J277-2024-JUN-01-Q2CII`
- LAN: airport terminal — `J277-2025-JUN-01-Q4A`

These are **writing drafts**, not automatically certified as legally independent or marked as final exam questions. Review and then enable them through shared lesson components rather than inserting per-page CSS/JS.

OCR assessment reference links remain in the canonical source catalogue. This table deliberately avoids embedding copied OCR question wording or source diagrams.

## Drafting audit (21 November 2026)

| Year | Recorded question parts | RHS question drafts |
| --- | ---: | ---: |
| June 2022 | 55 | 55 |
| June 2023 | 60 | 60 |
| June 2024 | 54 | 54 |
| June 2025 | 56 | 56 |
| **Total** | **225** | **225** |

The 214 new question texts preserve original OCR IDs, source-year/paper/question references, specification points and marks. **All 225 RHS answer breakdowns now have a source-linked independent verification pass**; the canonical OCR catalogue still holds its original review snapshot. Specific question contexts, diagrams, tables and original code remain subject to **separate student-presentation and originality checks**. Some require new independent SVG/HTML assets. Do not automatically self-mark subjective or levels-of-response tasks.

**Next gate before any site display:** independently author the outstanding context visuals, code-layout assets and clean examination tables; validate numerical examples and projector/mobile readability; check originality; then approve and load through the shared J277 lesson renderer. The 225 answer grids have been independently compared with OCR schemes, but this does **not** make the 225 rewritten practice questions officially OCR-approved or ready for automated marking; no per-lesson JavaScript/CSS clones.

For the complete paper-by-paper answer audit, scheme links and unresolved presentation gates, see [`RHS-J277-ANSWER-VERIFICATION.md`](RHS-J277-ANSWER-VERIFICATION.md).
