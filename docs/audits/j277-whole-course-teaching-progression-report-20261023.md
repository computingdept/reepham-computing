# J277 whole-course teaching progression — source audit, 23 October 2026

**Status:** 164/164 lesson positions inventoried for I Do → We Do → independent You Do, with original and reviewed bank precedence differentiated. **NOT** a classroom/browser quality certification. **No lesson files changed.**

## Scope and method

- Lessons **001–002:** inspected standalone authored HTML, including eight-phase layout and modelled/guided/independent tasks.
- Lesson **003:** inspected adapter loader and source `lesson-003.html`; generated I Do/We Do and grouped marking still need browser verification.
- Lessons **004–018:** inspected `autumn1-*.json`, including I Do question, We Do items and You Do Q4.
- Lessons **019–164:** inspected each `autumn2-NNN.json` authored I Do, We Do, original You Do Q4; for the 14 lessons with approved reviewed question banks, the independent-Q4 comparison uses the **reviewed** `youdo-five-reviewed-20261022.json` question rather than the obsolete Q4.
- Ten special/assessment lessons **018, 035, 050, 078, 094, 113, 120, 143, 156, 157** were recorded **as exceptions**; they should not be judged by the standard independent three-question screen rubric. Lesson 113 is independently authored in custom HTML.

### Tracker classifications

| Source-level classification | Lesson positions | Meaning |
|---|---:|---|
| **P1** — confirmed modelling/practice mismatch | **10** | Independent reviewed Q4 asks for multiline ERL; I Do/We Do chiefly model verbal explanation |
| **P2** — explanation-led / evaluation scaffold concern | **19** | 18 lessons from original 061–080 programming/testing block, plus lesson 040 |
| **No new issue** in sampled progression | **18** | Skills appear appropriately sequenced in authored model and guided examples; not a claim of perfect lessons |
| **Check** | **61** | Further task-by-task visual / pedagogical assessment warranted |
| **Review** | **46** | Raw I Do/We Do/You Do pairs collated; detailed judgement not yet made |
| **Exception** | **10** | Assessment/project/bespoke format judged separately |
| **Total** | **164** | All positions recorded, including 001–003 |

This classification is deliberately conservative: a registered source prompt does **not** guarantee observed classroom implementation, mark scheme accuracy, screen readability, full OCR specification coverage or working navigation.

## Priority teaching issue 1 — coding transition, ten lessons

**051–058, 060, 068.** Their reviewed independent Q4 has pupils writing OCR Exam Reference Language (input/casting, assignments, IF/ELSE, FOR/WHILE, 2D arrays etc). Each author's I Do and We Do question prompts concentrate on explaining terms such as sequence, selection, iteration, array index and data type. Code First exists and is useful, but is an independent short retrieval task, not a replacement for scaffolding full coding.

**Design correction after diagnosis:** In I Do, explicitly model and narrate a short complete OCR ERL solution. In We Do, collaboratively construct a similar but changed solution, include reveal/check, gradually remove prompts. Keep Q4 original approved scenario and its exact marks; include simple Code First.

See [detailed 10-lesson audit](j277-programming-ido-wedo-q4-audit-20261023.md).

## Priority teaching issue 2 — explanation-heavy practical lessons, 18 lessons

**061–067, 069–077, 079–080** (all of 061–080 except **068**, already P1, and **078**, project exception). I Do, We Do and original You Do largely ask to *explain* terminology, even for debugging, string operations, arrays, functions, procedures, file handling, SQL, input validation and trace tables. Concept questions are not inherently wrong; the weakness is that source I Do and We Do contain limited **worked practical construction**, especially given programming tasks required elsewhere in the course.

Recommend differentiated improvements by specification topic instead of replacing every task with the same three-question template:
- Arrays / strings / functions / files: one worked short example, guided modification and independent ERL writing/tracing.
- SQL: model and guide actual SELECT/FROM/WHERE queries using a **supplied table**.
- Validation/testing: write explicit conditions, examples of normal/boundary/invalid data, expected vs actual output; debug a faulty algorithm.
- Project/review: use an authentic artefact and genuine test evidence; don't force the generic You Do format onto project lesson 078.

These are **source-level curriculum-quality recommendations**, not 18 proven exam-mark errors.

## Priority teaching issue 3 — Lesson 040: evaluative judgement

- **040** I Do and We Do chiefly ask pupils to explain social, environmental and privacy impacts. Original independent Q4 demands **evaluate** a digital-only public-service decision (6 marks). The earlier phases do not clearly insist on a balanced conclusion / supported judgement.
- **044** offers a stronger exemplar: teacher models evaluation and supported judgement; We Do repeats an evaluative scenario.
- **141** has appropriately aligned I Do Evaluate and We Do Discuss prompts, and a **reviewed eight-mark extended Q4** requiring its separate levels-of-response model.

**Proposed remedy:** integrate an explicit “point → consequence → counterpoint → supported judgement” example into I Do and guided evaluation in 040, consistent with the 1.6 design approach.

## Well-structured patterns to preserve

- **001–002** contain a detailed worked example, then guided binary conversion/addition, then independently similar examination questions. Test the HTML question screens, but avoid rebuilding these unnecessarily.
- **004–018**, including 015's bubble-sort worked example followed by *two insertion-sort guided tasks*, have topic-related model/guided exercises; don't wrongly flag 015 as unscaffolded.
- **082–112** searching, sorting, binary/logic and truth-table lessons frequently show a trace, calculation or worked Boolean example before a guided version and independent tasks. Maintain the approach while separately auditing algorithm accuracy and mark schemes.
- **150** source teacher prompt writes an algorithm, and We Do asks pupils to design a related program. It therefore avoids the explanation-to-code mismatch, although its independent model answer style is separately flagged for full OCR ERL and marking clarity.

## Other unresolved gates

1. **Answer route:** 14 reviewed lessons have **42 revised Q2–Q4** but separate `answers.html` still generates original answers. This is previously confirmed, high priority; it affects valid self-marking.
2. **Mark schemes:** the full source answer audit flagged multi-mark answers without independent mark points, and a factual error in original 090 Q4; verify the effective published route before changing.
3. **Code First:** 154-model check found correct or conditional expected output in the reviewed subset; Code First lessons 117/118 lack required data context and 161 has an unspecified target bit depth. Source-level task-to-model assessment already documented.
4. **Specification:** this tracker uses each author's `s` specification reference only. It does **not** independently certify that all OCR J277 subrequirements have at least three suitable appearances or that command words/appendices are comprehensively covered.
5. **Visual QA:** no real 1920×1080 or 390×844 browser execution was run; assess actual modelling reveal sequence, code legibility, You Do answer separation and special lessons.

## Recommended change order (not applied)

1. Fix the **one-source-of-truth** Q2–Q4/answer-route mismatch so student self-marking is correct.
2. Upgrade **051–058, 060, 068** from explanatory scaffolds to code modelling and guided ERL construction.
3. Improve **061–080** selectively with authentic practical applications, keeping concept explanations.
4. Improve **040** evaluation scaffold using 044 as teaching exemplar.
5. Apply targeted factual, marking and Code First context corrections after effective-source verification.
6. Carry out OCR J277 subpoint/appendix audit and visual regression across both desktop and mobile, separating custom assessments.
7. H446 and shared H446 lesson libraries remain **out of scope for changes**.

**Files:** [164-lesson consolidated source tracker](j277-164-lesson-teaching-progression-master-20261023.csv) and [master exception register](j277-master-exception-register-20261023.csv).

**H446 unchanged. No teaching content, CSS or JS modified in this audit.**
