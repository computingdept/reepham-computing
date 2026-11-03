# H446 eight-page Print — first pedagogical audit (Lessons 001–005)

Date: 2026-11-03. Status: **initial source-alignment audit, not PDF visual approval**.

## Scope and method
Compared the live lesson HTML (`lessons/h446/lesson-001` through `lesson-005/index.html`) with the eight-page QA question-selection mapping in `offline/booklets/h446/H446_EIGHT_PAGE_COURSE_QA_2026-11-03.json`. Exam question numbers below refer to the online **You Do** sequence. This audit does not inspect the rendered eight-page PDFs; do not label typography, diagrams, writable space or individual PDF content as visually verified.

## Findings and recommended corrections

| Lesson | Printed online-question numbers | Source You Do coverage | Initial finding | Action before teacher review |
|---|---|---|---|---|
| 001 · Data types & unsigned binary | Q1, Q4 (2 of 4) | Q1 data types; Q2 denary → binary; Q3 binary → denary; Q4 unsigned range | **Coverage risk:** both directions of binary conversion absent from selected examination questions, despite being explicit lesson objectives. | Ensure one conversion task is represented in the eight-page pupil booklet, ideally both directions in one compact question. Keep datatype/range checks as needed. |
| 002 · Signed integers & binary arithmetic | Q1, Q5 (2 of 5) | Q1 negative representation; Q2 interpretation; Q3 addition; Q4 subtraction; Q5 signed overflow | **Coverage risk:** no selected arithmetic calculation (addition/subtraction), despite major guided practice. | Include a compact worked-space subtraction or addition task; retain representation and overflow reasoning if feasible. |
| 003 · Hexadecimal, shifts & masks | Q1, Q6 (2 of 6) | Q1 hex→binary; Q2 denary→hex; Q3 conversions; Q4 shifts; Q5 masks; Q6 operation/mask design | **Coverage risk:** shifts and worked mask calculation are not directly assessed by selected question numbers. | Add a concise shift calculation and/or mask-result calculation alongside hex conversion and mask selection. |
| 004 · Denary → floating point | Q1, Q5 (2 of 5) | Q1 positive representations; Q2 negatives; Q3 normalisation; Q4 error diagnosis; Q5 boundary −0.5 | **Coverage risk:** selected questions omit the main negative conversion and explicit normalisation/error-correction tasks. | Include a negative conversion or normalisation task to sample the full lesson skill. |
| 005 · Floating point → denary | Q1, Q5 (2 of 5) | Q1 short field conversion; Q2 second conversion; Q3 identifying normalised forms; Q4 eight-/four-bit conversions; Q5 precision/range reasoning | **Coverage risk:** no selected question tests normalisation; Q1 uses 4-bit fields whereas We Do predominantly uses 8-bit mantissa + 4-bit exponent. | Align a selected question to the practised representation and include a normalisation check. |

## Cross-cutting audit improvements
1. Add a **lesson objective → printed practice evidence** check to the generator/audit, rather than only checking that 2–3 source questions were selected.
2. Check that every printed `We Do` asks pupils to try a concrete, scaffolded step *before* discussion/model improvement; presence of the strings `DISCUSS` and `IMPROVE` alone is not sufficient.
3. Preserve the **eight-page A4 cap**; replace or combine questions rather than adding pages.
4. Review actual A4 renders for diagrams, legibility, writable space, and answer exposure; the existing automated structural pass does not establish this.
5. Protect model answer confidentiality if required: existing review keys are in a **public** repository and are not staff-secured.

## Decision
**Lessons 001–005: hold for question-selection revision and PDF visual inspection.** No teacher approval granted; no student Print links changed.
