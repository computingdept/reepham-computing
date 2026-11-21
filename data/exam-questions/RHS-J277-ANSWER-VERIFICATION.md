# RHS Computing — J277 answer verification audit

**Audit date:** 21 November 2026  
**Scope:** 225 RHS-authored question parts spanning eight OCR J277 examination papers, June 2022–2025.

**Result:** All 225 records now have independently paraphrased, source-linked RHS answer points and a specific marking rule checked against the relevant OCR question paper and official mark scheme. **43 RHS question drafts required wording changes** to preserve the intended marking criteria, supply missing source-dependent data/code, or avoid answer giveaways. This is an **answer-and-marking review**, not OCR endorsement or permission to reproduce OCR papers.

## Where the answers are

The complete per-question record is in [`j277-rhs-practice-drafts.csv`](j277-rhs-practice-drafts.csv).

- `rhs_question_text`: the RHS practice question students may eventually see, subject to approval.
- `rhs_verified_answer_points`: RHS-authored eligible answers/teaching points; **not verbatim OCR wording or an exhaustive OCR scheme**.
- `rhs_verified_marking_rule`: which points earn which marks, including exceptions.
- `rhs_answer_verification_status`: identifies independently scheme-checked answer points and whether the RHS question also needed correction.
- `rhs_answer_review_notes`: circumstances and unfinished quality gates.
- `rhs_answer_source`: relevant official OCR mark scheme URL.
- `rhs_answer_review_date`: date of RHS review.
- `ocr_reference`, `ocr_question_id`, `marks`: unchanged traceability.

The historical `mark_scheme_review_status` field was inherited unchanged from the original **canonical** OCR catalogue. That historical snapshot shows 11 prior reviews. The new 225-record RHS audit uses the `rhs_answer_*` fields above instead, so **do not treat the historical field as current progress**.

## Paper-by-paper completion

| Year | Paper | RHS question parts checked | Official OCR mark scheme |
| --- | --- | ---: | --- |
| June 2022 | J277/01 Computer Systems | 29 | [OCR source](https://www.ocr.org.uk/Images/677961-mark-scheme-computer-systems.pdf) |
| June 2022 | J277/02 Computational Thinking, Algorithms and Programming | 26 | [OCR source](https://www.ocr.org.uk/Images/677962-mark-scheme-computational-thinking-algorithms-and-programming.pdf) |
| June 2023 | J277/01 Computer Systems | 30 | [OCR source](https://www.ocr.org.uk/Images/704882-mark-scheme-computer-systems.pdf) |
| June 2023 | J277/02 Computational Thinking, Algorithms and Programming | 30 | [OCR source](https://www.ocr.org.uk/Images/704883-mark-scheme-computational-thinking-algorithms-and-programming.pdf) |
| June 2024 | J277/01 Computer Systems | 28 | [OCR source](https://www.ocr.org.uk/Images/727652-mark-scheme-computer-systems.pdf) |
| June 2024 | J277/02 Computational Thinking, Algorithms and Programming | 26 | [OCR source](https://www.ocr.org.uk/Images/727653-mark-scheme-computational-thinking-algorithms-and-programming.pdf) |
| June 2025 | J277/01 Computer Systems | 27 | [OCR source](https://www.ocr.org.uk/Images/753394-mark-scheme-computer-systems.pdf) |
| June 2025 | J277/02 Computational Thinking, Algorithms and Programming | 29 | [OCR source](https://www.ocr.org.uk/Images/753395-mark-scheme-computational-thinking-algorithms-and-programming.pdf) |
| **Total** | | **225** | **8 official sources** |

## Substantive checks and corrections

- **Marks remain exact:** the RHS draft retains the OCR source ID, year, question part and maximum marks.
- **Star-network answer (J277/01 June 2024 Q2(c)(i)):** five **laptops** are acceptable as computers; the RHS mark grid checks devices/quantities, valid switch-centred links, and no additional non-star links.
- **Star vs mesh comparison (Q2(c)(ii)):** use **Give**, not **Explain**, because OCR awards one independent advantage and one drawback, rather than an extended 2+2 explanation.
- **Software security (J277/01 June 2022 Q5(b)):** the six marks relate to **two named methods, each developed**, not a vague list of many measures.
- **Storage justifications:** June 2025 /01 Q1(c) and June 2024 /01 Q5(b)(i) award **no mark for the storage type alone**; marks come from matching reasons. A different 2022 /01 storage task does credit the identified type.
- **Binary arithmetic:** binary working/carries are separately creditworthy where specified. Eight-bit results must discard overflow when requested.
- **Programming and trace questions:** several RHS drafts were given new code listings, line numbers, word banks, SQL skeletons and table values so answers could be derived without opening the original OCR PDF. Check their final presentation as a separate gate.
- **SQL:** each mark criterion is attached to the correct clauses, field names and conditions, rather than simply checking whether the answer resembles a SQL query.
- **Levels-of-response:** the 8-mark questions retain banded assessment guidance. They are **not** suitable for automatic fixed-point marking without an appropriate teacher or validated human review.

## Remaining gates — not yet complete

| Gate | Position |
| --- | --- |
| OCR source-linked answer-point review | **225/225 completed** |
| RHS question revisions following answer review | **43 corrected** |
| Original RHS diagrams, table designs and source-dependent visual/context presentation | **65 records flagged** |
| New RHS star-network SVG | **1 flagged; not yet committed** |
| All other records with no source-figure flag | **159** |
| Final independent originality, accessibility, mobile/projector and pupil-interpretation review | **Outstanding** |
| Student-facing deployment in lessons | **Not enabled** |

The visual counts are `visual_status` classifications in the table, **not** counts of confirmed missing SVGs: some 65 items can be represented with a properly formatted question table, trace grid or code panel rather than an illustration.

## Safeguards

1. Do not promote a record to `approved_for_classroom` solely because `rhs_answer_verification_status` is populated.
2. The published content is RHS-authored practice, **aligned to** the linked OCR part; do not call it an official OCR question.
3. Do not put entire OCR question papers, source OCR diagrams, verbatim mark schemes or examiner report passages into this public repository.
4. Retain source-year, paper and question number beside any deployed RHS question, discreetly displayed for teaching reference.
5. Keep answers hidden until the lesson's teacher-controlled answer reveal. A worked diagram must not be visible alongside a pupil's unanswered prompt.
6. Integrate approved content through **shared J277/H446 components**, not unique CSS/JavaScript per lesson.

The next independent task is **asset/layout and originality approval**, prioritising diagrams, word banks, trace tables and source-dependent algorithm presentations. Nothing in this audit activates the classroom renderer.
