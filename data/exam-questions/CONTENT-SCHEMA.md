# J277 and H446 examination-question content tables

The canonical catalogues are `j277-questions.csv` (225 question parts) and
`h446-questions.csv` (410 question parts). Both now have the same 33 columns.
All original IDs, specifications, marks, topics, sources, usage and audit fields
are retained unchanged.

## Field meanings

- `question_summary`: the original RHS topic/question summary. **Not** the original OCR question.
- `question_text`: reserved for complete, approved, verified question wording. It
  is intentionally blank in the public repository. Do not pass an empty field
  through to the classroom exam renderer as if it were full source content.
- `question_text_status`: provenance and readiness of the question text.
- `teacher_answer_points`: **RHS-authored paraphrase** of eligible marking
  points, *not* a verbatim OCR scheme or an exhaustive list of permitted answers.
- `mark_allocation_summary`: a teacher-facing breakdown of how to award marks.
- `mark_scheme_review_status`: `teacher_paraphrase_verified_against_OCR` for
  entries checked against the cited official scheme; `not_reviewed` otherwise.
- `examiner_comment_summary`: RHS-authored summary of the report comments for
  the **specific question**. Blank does not mean the report said nothing.
- `examiner_comment_status`: whether that summary was reviewed against the
  actual examiner report or not.
- `examiner_report_source`: OCR report PDF when identified, otherwise the OCR
  public assessment listing.
- `examiner_report_status`: report identified vs listing fallback. An identified
  PDF **does not** mean every question in it has been reviewed.
- `source_context_review`: diagrams, tables, case-study stems and question
  subparts must be examined before a student-facing question can be approved.

## Display contract

The lesson should use one shared renderer for J277 and H446 with lesson data
referencing a `question_id`. It must refuse to label `question_summary`
or `teacher_answer_points` as *verbatim* OCR text or official scheme.
Question, marking points, examiner commentary and teacher explanation are
separate reveal stages. If a figure is required, the figure and associated text
must be validated together. For longer context/level-of-response questions,
teacher review must check the original AO and level descriptors.

## Source and licensing

OCR's conditions: https://www.ocr.org.uk/about/our-policies/copyright/

- This GitHub repository is publicly accessible. Do **not** commit transcribed
  OCR questions, copied mark schemes, report passages or private school data here.
- Store any centre-authorised unaltered OCR materials only in a school-restricted
  platform with appropriate access controls, or use authorised printouts.
- For testing on a Mac, use a private local overlay in
  `data/exam-questions/private/`; this folder is gitignored. OCR material
  should only be included there when the school has the necessary rights.
- The public catalogue may retain OCR question identifiers and source URLs.
- For OCR source content, the source must be checked for complete stems,
  shared scenarios, tables, images, and mark-scheme alternatives before approval.
  Do not substitute plausible answers for absent marking guidance.

## Current status

The first verified teacher-facing batches cover 11 J277 and 3 H446 question
parts. This is a **partial content-enrichment pass**, not a completed bank of
635 transcriptions and examiner notes. Missing fields remain blank to prevent
incorrect marking claims. Further population should be based on the full
original paper, scheme and the relevant section of the examiner's report,
per question.

## Quality gates before broad lesson rollout

1. Every ID remains unique and linked to a qualification, paper and series.
2. Existing marking totals and specification references remain unchanged.
3. Each student-facing question has complete verified text and any necessary
   diagrams/contexts, in an access-controlled store.
4. Its marking breakdown must be checked against OCR; alternative correct
   answers and level-of-response questions require separate review.
5. Examiner comments are either supported by a specific report section or
   explicitly marked as a **teacher teaching point**.
6. Begin with Lesson 134; check a projector and phone, plus neighbouring
   lessons, before expanding opt-in to any other lesson.

## Separate RHS J277 practice bank (21 November 2026)

The **canonical** `j277-questions.csv` and `h446-questions.csv` remain unchanged; their original reviewed-answer counts (11 J277, 3 H446) describe the **original** historical enrichment stage only.

A separate, independent `j277-rhs-practice-drafts.csv` stores **225 new RHS-written question drafts and 225 source-linked answer/marking verifications**. Its current fields are `rhs_verified_answer_points`, `rhs_verified_marking_rule`, `rhs_answer_verification_status`, `rhs_answer_source` and `rhs_answer_review_date`. Do **not** mistake the inherited `mark_scheme_review_status` in this separate table for the new RHS progress status.

The teacher's independent marking review does **not** approve the RHS questions for student display or automated scoring. Outstanding work includes original SVGs, accessible diagrams/tables and any source-dependent code/trace layouts, copyright/originality review and projector/mobile QA. Details: [RHS J277 answer verification](RHS-J277-ANSWER-VERIFICATION.md).

## Separate RHS H446 practice bank (21 November 2026)

The new [H446 RHS practice-draft table](h446-rhs-practice-drafts.csv) uses the **same 24 fields as the J277 RHS practice table**, covering **410** H446/01 and H446/02 question parts, **1,400 original marks** across November 2021 and June 2022–2025.

- First source-text-linked drafting pass: **243** RHS-authored question drafts and teacher-written marking rules for June 2023 (46 Paper 1 + 38 Paper 2), June 2024 (41 Paper 1 + 40 Paper 2) and June 2025 (41 Paper 1 + 37 Paper 2).
- Remaining **167** parts are registered but **not drafted or answer-verified** in the new RHS table. Blank RHS prompt/answer cells must remain blank until the official source context and mark scheme have been checked.
- Historical `mark_scheme_review_status` continues to describe the earlier **canonical catalogue** only (3 H446 entries); it is not the new RHS practice-bank progress field.
- Student display, originality review, image/figure checks, level-of-response moderation and teacher sign-off remain outstanding. No classroom renderer is activated by the CSV.

See [H446 draft workflow](RHS-H446-DRAFTS.md) and [H446 answer-check progress](RHS-H446-ANSWER-VERIFICATION.md). Never substitute the original OCR illustration with a visually similar but numerically different RHS concept model without reviewing the task's assessed meaning.

**H446/02 source-access caution (21 November 2026):** the 37 Paper 2 original RHS question drafts were reviewed against the published OCR **mark scheme text**, but the 2025 OCR **question-paper PDF was not accessible**. Do not interpret a filled `rhs_answer_review_date` as a complete paper-image, exact numeric/context or classroom verification. New RHS teaching graphs and algorithms may have different data from the OCR source and therefore have an independently adapted marking rule. See [H446 answer review details](RHS-H446-ANSWER-VERIFICATION.md).

**June 2024 H446 addition (21 November 2026):** OCR's [2024 Paper 1](https://www.ocr.org.uk/Images/726571-question-paper-computer-systems.pdf), [Paper 2](https://www.ocr.org.uk/Images/726572-question-paper-algorithms-and-programming.pdf) and both official mark schemes were available for source-text checks; source PDF screenshots were inspected for representative figures. All 81 parts have independently authored RHS questions/answers and require final originality/diagram/table/code, accessibility, examiner comments and teacher approval before display. A `rhs_answer_review_date` is **not** a classroom approval flag. The [2024 sections of the answer audit](RHS-H446-ANSWER-VERIFICATION.md) describe the remaining gates.

**June 2023 H446 addition (21 November 2026):** Both [OCR H446/01](https://www.ocr.org.uk/Images/703780-question-paper-computer-systems.pdf) and [H446/02](https://www.ocr.org.uk/Images/703781-question-paper-algorithms-and-programming.pdf) question papers and marking schemes were consulted for the new RHS wording and independently written marking rules. The 84 June 2023 questions, bringing the total to **243/410**, remain unapproved drafts. 28 parts are flagged for student-facing original table/code/trace/SVG layouts. Original numbers were retained where required, but newly invented source data have **new independently checked answers**. No question is marked `approved_for_classroom` and no live scoring or lesson files have been changed.
