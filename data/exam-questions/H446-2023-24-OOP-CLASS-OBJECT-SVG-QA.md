# H446 — 2023 and 2024 object-oriented class and object visuals

**QA-ONLY DRAFT. No live lesson or student publication.**

This batch contributes **nine original SVG diagrams, four unrevealed question views and five dedicated answer views**, aligned to four distinct RHS H446 Paper 2 question families. Visuals illustrate objects and references; exact method or class **code must still be provided as native HTML text** in later teacher previews, not as an image.

| RHS exam parts | Question diagram | Answer diagram |
| --- | --- | --- |
| 2023 H446/02 Q9(b)(i) (5 marks), supporting Q9(b)(iii) encapsulation (2 marks) | Artifact blueprint with given private `value: integer` and `category: string`, constructor's parameters/assignments withheld | The constructor answer assigns the two private fields. **A separate encapsulation answer** reveals that `getCategory()` provides controlled access to private data, only after Q9(b)(iii) |
| 2023 H446/02 Q9(c) (5 marks) | Full **10×20** Board `grid` (200 entries) with no solved loop bounds or empty-object creation | Nested FOR row 0–9, column 0–19; a **new** `Artifact(-1, "")` instance at each grid position, not the same reference copied into all cells |
| 2024 H446/02 Q9(b)(ii) (3 marks) | `Cache` class and `allPrizes` reference-array preview, index 3 unsolved; given name "Crate", type "money", value 25 | `allPrizes[3]` references an independently instantiated `Cache` with those source-provided arguments |
| 2024 H446/02 Q9(c)(i) (5 marks) | `Explorer` blueprint with private name, money, experience, roadPosition and a one-parameter constructor; assignments blank | name set from `playerName`, money 5, experience 0, roadPosition 0 |

## Important integrity rules

- These are **original RHS-derived diagrams**, not copies of any OCR illustrations.
- The Board grid accurately shows all **200** cells rather than representing the 10×20 array with a misleading smaller example; row and column labels were enlarged after the first screenshot review.
- The Cache reference-array illustration only expands slots 0–6; the entire original `allPrizes` array length is **unspecified**. Other slots remain unknown.
- The Explorer diagram shows constructor behaviour and instance state, not an answer to the separate Q9(c)(ii) `updateValues` procedure. It labels `playerName` as a constructor parameter without presenting an instance-creation expression as the constructor definition.
- Class declarations, constructor code, complete nested loops and method pseudocode belong in **native, large-font code panels**, so the visuals do not replace assessable code.
- Question illustrations may repeat *information already present in the RHS question*, such as an object's field names or constructor starting values, but do not show the missing algorithm/code solution.
- Real half-screen projector checks, correctness of allowable syntax variants, marking alternatives and teacher approval remain outstanding.

## Review and technical evidence

[Asset-role register](h446-2023-24-oop-class-object-svg-map.csv) has ten question/answer usage rows, all `disabled_not_approved`. The isolated GitHub Actions workflow parses SVG XML, checks title/description and rasterises at 1240×740 with **nine PNGs and a 3×3 contact sheet**.

**Scope protection:** nine new SVG source files in `assets/exam-questions/h446/question-view/`, this documentation/CSV and an isolated GitHub Actions workflow. No live H446/J277 lessons, CSS, JS, Cloudflare scoring, assignments or published revision changes.

The Artifact constructor and encapsulation screens are deliberately separated so the answer to Q9(b)(iii) is not revealed when Q9(b)(i) is marked. The full class declarations and methods remain native-code tasks.

## Final actual rendering review — 22 November 2026

[GitHub Actions run 45045102826](https://github.com/computingdept/reepham-computing/actions/runs/45045102826) passed: **nine SVG files**, each XML-validated, accessible-title/description checked and rasterised as 1240×740 PNG. [Artwork evidence artifact 14763455751](https://github.com/computingdept/reepham-computing/actions/runs/45045102826/artifacts/14763455751) contains all nine rendered previews, a 3×3 contact sheet and the JSON validation report.

**Manual screenshot inspection:** original and answer states are distinct, the enlarged Board has all 200 visible cells and comprehensible row/column labels, Cache reference index 3 points at the correct source-defined object only in the answer, and Explorer constructor values are disclosed only after reveal. The dedicated Artifact **encapsulation** answer is separate from the earlier constructor answer, avoiding a premature giveaway of Q9(b)(iii).

**Approval boundary:** passing XML/raster checks is **not a projected half-screen classroom trial, independent official OCR source or mark-scheme check, or teacher approval**. Every one of the ten usage records remains `disabled_not_approved`. Original exam practice questions and source marking texts remain unmodified; J277, live lessons, scoring and Cloudflare are untouched.
