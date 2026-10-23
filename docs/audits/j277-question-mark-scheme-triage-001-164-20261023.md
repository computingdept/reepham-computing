# J277 Question and Mark-Scheme Audit — whole-course source triage (23 October 2026)

**Purpose:** extend the previous original-question sweeps by checking authored answer guidance. **Scope:** this is a source-level triage, NOT approval of OCR marking, rendering, ERL compliance or examination quality. No teaching content modified.

## Actual coverage
- Exam-question and answer-guidance pairs in `autumn1-004-008.json`, `autumn1-009-013.json`, `autumn1-014-018.json` (lessons 004–018), and `autumn2-019.json` through `autumn2-164.json` (lessons 019–164) were fetched and screened for question/answer alignment. This covers **161 original authored lesson records**, including special assessments and feedback lessons.
- Lessons **001–002** are custom standalone HTML and **003** uses an adapter; they are **not** counted as fully screened question-and-answer pairs here.
- Existing reviewed/published You Do overrides in `youdo-five-reviewed-20261022.json` take precedence for their lessons. The original data is evidence of a legacy drafting problem, not proof that it is currently shown to students.
- Several answers contain multi-mark annotations like `[2]` or `[1 each]`; numeric arrays also contain `[1]` and `[2]`. A naive regex count of bracketed numbers is **not a reliable mark-scheme checker**. Manual semantic checking is necessary, particularly for programming and arrays.

## Confirmed original-source faults or inadequate guidance
| Lesson / question | Evidence | Finding | Priority |
|---|---|---|---|
| 090 Q4 | Worked scheme: 'so 1 OR C=0 gives Q=1' | **Factual mathematical error**; for input 110, C=0 and 1 OR 0 = 1 | P1 |
| 110 Q2 | 'Give the array after one complete ... bubble-sort pass [4]'; scheme credits three intermediate swaps and final array | **Task/mark mismatch**: students are not instructed to show interim swaps, but scheme credits them | P1 |
| 015 Q3 | 'Show one bubble-sort pass ... giving array after each swap [3]'; scheme credits two arrays plus 'largest item reaches end' | **Third mark not expressly requested**; examine teaching intent and revise prompt/scheme | P2 |
| 122 Q3 | One boundary value requested [2], scheme wants an additional adjacent invalid input | **Question-answer mismatch** | P1 |
| 150 Q2 | Programming answer is 'Input a,b; if a>b print(a), else print(b)' | **Not an executable full OCR ERL worked example**; revise model code to documented ERL, with four discrete marks | P1 |
| 114 Q4; 119 Q2; 124 Q3; 126 Q2; 129 Q3; 146 Q2–Q3; 147 Q3; 152 Q2; 156 Q3; 164 Q2 | Several 2–4-mark prompts supplied with unallocated one-line answers | **Insufficient marking transparency**, sometimes under-specified tasks; individually verify whether extra marks can actually be earned | P1/P2 |
| 052 Q3 and 059 Q3 | Reviewed/published overrides contain non-discriminating or overlapping marks | **Published bank marking quality errors** documented in prior audit | P1 |

## Existing flagged cases that are *not necessarily incorrect*
- 006 Q2 sample rate, 030/031 two-mark attack definitions, 033 encryption, 024 DNS, 082 linear search, 085 insertion-sort key, 103 Unicode: schemes generally offer two separable ideas; improve the question stem if necessary but do not call factual faults on this evidence alone.
- 100–112 calculations/traces mostly include explicit point allocations; check array delimiters and mathematical results by hand, not bracket-count regex. In 112 Q3, the summary is nonstandard (`[3; 1 for first three...]`), worth reformatting for student self-marking, but not proof the numeric merge result is wrong.
- Assessments 018,035,050,094,120,143,156,157 and custom synoptic 113 have distinct purposes; audit their actual published versions rather than forcing the routine Q2–Q4 template.

## System-wide diagnosis
Earlier source lessons 019–050 and 081–113 frequently use explicit `[1]` and `[2]` marking points. The original 051–080 block is heavily formulaic (note reviewed question overrides 051–060, 068, etc.). Several later source lessons 114–164 supply one-line answers without explicit points, making accurate student self-marking difficult.

## Approval gates still outstanding
1. Reconcile which exact question bank each live page loads and identify superseded questions.
2. Validate all published answers and source arithmetic/ERL code, not just the triage excerpts.
3. Review I Do/We Do/Code First and revision materials against OCR ERL and the J277 specification's specific subrequirements.
4. Browser QA for grouped Q2–Q4, standalone 001–002, early adapter lessons and custom/assessment exceptions.
5. Only after full diagnosis, correct confirmed faults individually or by common problem class. H446 is out of scope and unchanged.
