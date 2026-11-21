# RHS Computing J277 practice question drafts

This is a **separate, public, RHS-authored practice-question drafting table**, not an OCR paper and not the canonical OCR reference catalogue.

- **Draft table:** `j277-rhs-practice-drafts.csv`
- **Canonical source catalogue:** `j277-questions.csv` (unchanged)
- **Coverage:** 225 records, one for each J277 source question part.
- **Written RHS drafts:** 11 short practice questions from the network-topologies topic and surrounding network content.
- **Unwritten questions:** 214 explicitly labelled `awaiting_original_question`.
- **Live lesson deployment:** not enabled by this table. Changing this CSV alone does not replace existing classroom content or enable the exam-classroom pilot.

## Publishing and review rules

1. Keep the **OCR paper reference, year, question number, marks and specification point** with each RHS record. The reference is for assessment traceability, not a claim that the RHS wording is official OCR wording.
2. Write a genuinely independent question. A change in setting alone, even with a new SVG, does **not** automatically make the question original.
3. Keep the command word, intended assessment demand, marks, correct concepts and required numerical values. **Do not invent omitted numbers**: the reference catalogue often records only a question summary, not the original figures, code, datasets or values.
4. Verify the complete OCR source **privately** for source-dependent numerical values, programming snippets, options, tables, diagrams and extended-response level descriptors. Do not publish copies of the complete OCR papers, schemes or examiner reports.
5. Author any diagrams, charts, tables or SVGs independently. Mark `visual_status` as ready only when the new artwork has been checked against the required assessment and mark allocation.
6. Keep RHS marking guidance separate from RHS question wording. The `rhs_marking_guidance` and `rhs_examiner_insight` columns are teacher-written summaries from the original catalogue where available, **not** official verbatim OCR text.
7. Only promote `draft_status` to `approved_for_classroom` after independent originality, mark scheme and context checks. **None of the current 11 drafts is approved for automatic display yet.**

## Statuses

- `awaiting_original_question`: the OCR question is indexed, but an RHS practice question has not yet been written.
- `draft_requires_final_review`: an RHS practice question exists, but the complete source demands and originality review are outstanding.
- `numerical_and_context_review=check_against_full_source`: do not assume every source value or source-dependent detail was available in the catalogue.
- `visual_status=svg_required`: a new RHS diagram must be created and checked (currently used for the star-network task).
- `visual_status=requires_source_figure_review`: a table, figure, code visual, logic diagram or source-dependent structure needs scrutiny before drafting.
- `mark_scheme_review_status`: inherited from the canonical catalogue; `teacher_paraphrase_verified_against_OCR` means marking points were previously reviewed, **not** that the RHS question itself has been fully validated.

## First classroom draft examples

- Router tasks: café — `J277-2022-JUN-01-Q3D`
- Star-topology diagram: café with **five laptops, two printers and one switch** — `J277-2024-JUN-01-Q2CI` (new SVG required)
- Switch: office — `J277-2024-JUN-01-Q2CIII`
- Star vs mesh: school — `J277-2024-JUN-01-Q2CII`
- LAN: airport terminal — `J277-2025-JUN-01-Q4A`

These are usable **writing drafts**, not automatically certified as legally independent or marked as final exam questions. Review and then enable them through shared lesson components rather than inserting per-page CSS/JS.

OCR assessment reference links remain in the canonical source catalogue. This table deliberately avoids embedding copied OCR question wording or source diagrams.
