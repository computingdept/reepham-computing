# J277 — I Do → We Do → independent programming Q4 audit

**23 October 2026. Read-only source audit; no teaching edits.** Comparison of published-approved reviewed Q4 bank with the I Do/We Do authored source data for **10 programming lessons**.

## Evidence-based conclusion
For **all ten lessons 051–058, 060 and 068**, the authored **I Do** question asks students to *explain* programming terms within a scenario. The authored **We Do** questions also ask students to *explain* terms. However, their reviewed independent **You Do Q4** requires writing **OCR Exam Reference Language**. The source scripts do include a separate short Code First exercise, but that alone does not establish a gradual teacher-model → guided coding → independent coding progression.

**Important limitation:** This is comparison of authored text and worked stages. It is not a 1920×1080 or mobile browser inspection of diagrams, teacher exposition, or runtime interactions. A teacher may model code verbally despite the prompt, but the published lesson does not consistently *require* it.

| Lesson | Independent coding expectation | Current authored teacher/guided focus |
|---|---|---|
| 051 | Input, cast, multiply, output ticket total | Explain sequence and input |
| 052 | Input name/count, increment, output | Explain variables and assignment |
| 053 | Input integer, calculate cost with fixed fee | Explain arithmetic and comparisons |
| 054 | Combined Boolean IF/ELSE with grouping | Explain Boolean and AND |
| 055 | Input age, selection and price output | Explain selection / IF |
| 056 | Price bands with IF/ELSEIF/ELSE | Explain ELSE and ELSEIF |
| 057 | Initialise, FOR loop and accumulate | Explain FOR / counter |
| 058 | Input validation with WHILE and re-prompt | Explain WHILE and condition |
| 060 | Count marks using FOR and nested IF | Explain sequence and selection |
| 068 | Declare and update 2D array, output field | Explain records and fields; clarify record vs 2D table distinction |

## Educational remedy to plan (not implemented)
- Keep one tightly explained term/example in **New Learning**, then **I Do** explicitly show a *full short ERL solution* with line-by-line teacher narration and model trace.
- **We Do** should reuse the same pattern with a changed scenario, scaffold program construction and then check the result; remove scaffolds as appropriate.
- **You Do** retains Code First (short warmup), then reviewed Q2–Q4 with independently written ERL where specified, using the exact allocated mark schemes.
- Check the 2D table / actual record distinction in 068; do not conflate data representation.
- Check screen length, reveal pacing, coding readability and answer separation in a proper browser before publication.

## Priorities
P1: this 10-lesson scaffold mismatch should be corrected as one coherent teaching-design issue after the source audits are consolidated, but each replacement scenario should be original and lesson-specific. Preserve J277-only CSS/JS scope and do not touch H446.

Related: [all 10 prompt/model comparisons](j277-programming-ido-wedo-q4-alignment-20261023.csv), [master exception register](j277-master-exception-register-20261023.csv).
