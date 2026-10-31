# H446 eight-page pupil workbook pilot — 31 October 2026

**Scope:** Student-facing printed workbook prototype for H446 Lesson 001 (data types and unsigned binary), 029 (Karnaugh maps) and 181 (recursion). This is a **staff-review pilot**, not a production print-resource replacement. **No live lessons, hub links, revision guides, existing independent booklet files or shared JavaScript/CSS changed.**

## Purpose and rules

The booklet accompanies **the classroom teaching lesson**, not a detached mini revision guide. Each pupil booklet contains **exactly eight A4 pages**, allowing double-sided A3 booklet printing using two A3 sheets.

1. **Do Now:** four original source lesson retrieval tasks and answer space; separate answer reveal remains on the live lesson.
2. **New Learning:** reference vocabulary, key facts and a small response prompt.
3. **New Learning:** a readable representation (binary place values, 3-variable K-map with Gray code, or recursion stack), with annotations.
4. **I Do:** same worked teacher example as the live lesson but student annotation/working fields, **not a printed model answer**.
5. **We Do:** the lesson's guided problem contexts, with working or drawing space.
6. **You Do:** independent foundation questions.
7. **You Do / exam practice:** challenge and full-solution space.
8. **Exit Ticket + Correct and Explain:** original True/False claim, confidence response, copy full question, rewritten answer in green pen and an explanation of what changed.

**Answer discipline:** BLACK PEN before the teacher's classroom reveal; GREEN PEN to correct. The pupil PDF does **not** include You Do worked solutions or a printed answer bank. An optional separate **teacher-only** answer sheet can be produced and quality-checked later; it must not be added to the pupil PDF.

## Three deliberately different pilots

| Lesson | Key QA obligation |
|---|---|
| 001 | Five data types, unsigned 8-bit place values, explanation and conversions, correct four-question Do Now and independent mark totals |
| 029 | Actual K-map grids and labels, Gray-code columns 00, 01, 11, 10; two- and three-variable maps, wraparound and four-variable extension; room to circle and sketch gates |
| 181 | Valid C# factorial function, indentation, non-negative input assumption, correctly labelled call stack / return columns, guided and independent traces, negative-input guard task |

## Quality gates

- Exactly eight pages and page counters 1/8–8/8.
- All pupil questions taken from or accurately adapted to the corresponding live teaching lesson; no new examinable topic or invented past-paper attribution.
- Printed stimulus **must be visible**: binary headings, K-map cells, C# code and call-stack rows.
- No source solutions leaked onto the pupil question pages.
- Text readable in black-and-white; diagrams remain legible at 100% A4 and two-to-one A3 booklet print.
- Structured marks for examination tasks where the source supplies marks; teacher response and full mark scheme remain separate.
- Vocabulary and exam questions checked against the *maintained* H446 Paper 1/2 revision guides.
- Print check: no clipped text, essential answer space and clear teacher-led reveal references.

## Implementation state

Three 8-page PDFs and a **working source generator script** were created in the conversation workspace and verified with the PDF renderer. The PDFs are **not yet committed** to this GitHub repository, nor connected to the live H446 hub Print action. This audit note records the pilot specification and review gate; it does not claim deployment or comprehensive approval.

Existing GitHub bulk drafts in `offline/booklets/h446/` remain unapproved, and the previous generator's missing-SVG/answer-source issues still require systematic repair before the style can be expanded.

**Suggested teacher review:** inspect 001 page 6 for writing space, 029 pages 5–7 for group/circuit drawing room and 181 pages 3–7 for call-stack and C# legibility. After approval, generalise the source generator against all actual H446 lesson data, validate it in representative lessons and only then replace the current bulk print link targets. Do not modify original classroom lessons or revision guides.
