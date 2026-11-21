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
