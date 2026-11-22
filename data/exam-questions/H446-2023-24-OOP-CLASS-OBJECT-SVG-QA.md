# H446 — 2023 and 2024 object-oriented class and object visuals

**QA-ONLY DRAFT. No live lesson or student publication.**

This batch contributes **eight original SVG diagrams, four unrevealed question views and four separate answer views**, aligned to four distinct RHS H446 Paper 2 question families. Visuals illustrate objects and references; exact method or class **code must still be provided as native HTML text** in later teacher previews, not as an image.

| RHS exam parts | Question diagram | Answer diagram |
| --- | --- | --- |
| 2023 H446/02 Q9(b)(i) (5 marks), supporting Q9(b)(iii) encapsulation (2 marks) | Artifact blueprint with given private `value: integer` and `category: string`, constructor's parameters/assignments withheld | Public constructor accepts `valueIn`, `categoryIn` and assigns the matching private fields; encapsulation means external code reads data through public getters |
| 2023 H446/02 Q9(c) (5 marks) | Full **10×20** Board `grid` (200 entries) with no solved loop bounds or empty-object creation | Nested FOR row 0–9, column 0–19; a **new** `Artifact(-1, "")` instance at each grid position, not the same reference copied into all cells |
| 2024 H446/02 Q9(b)(ii) (3 marks) | `Cache` class and `allPrizes` reference-array preview, index 3 unsolved; given name "Crate", type "money", value 25 | `allPrizes[3]` references an independently instantiated `Cache` with those source-provided arguments |
| 2024 H446/02 Q9(c)(i) (5 marks) | `Explorer` blueprint with private name, money, experience, roadPosition and a one-parameter constructor; assignments blank | name set from `playerName`, money 5, experience 0, roadPosition 0 |

## Important integrity rules

- These are **original RHS-derived diagrams**, not copies of any OCR illustrations.
- The Board grid accurately shows all **200** cells rather than representing the 10×20 array with a misleading smaller example.
- The Cache reference-array illustration only expands slots 0–6; the entire original `allPrizes` array length is **unspecified**. Other slots remain unknown.
- The Explorer diagram shows constructor behaviour and instance state, not an answer to the separate Q9(c)(ii) `updateValues` procedure.
- Class declarations, constructor code, complete nested loops and method pseudocode belong in **native, large-font code panels**, so the visuals do not replace assessable code.
- Question illustrations may repeat *information already present in the RHS question*, such as an object's field names or constructor starting values, but do not show the missing algorithm/code solution.
- Real half-screen projector checks, correctness of allowable syntax variants, marking alternatives and teacher approval remain outstanding.

## Review and technical evidence

[Asset-role register](h446-2023-24-oop-class-object-svg-map.csv) has ten question/answer usage rows, all `disabled_not_approved`. The isolated GitHub Actions workflow parses SVG XML, checks title/description and rasterises at 1240×740 with eight PNGs and a contact sheet.

**Scope protection:** eight new SVG source files in `assets/exam-questions/h446/question-view/`, this documentation/CSV and an isolated GitHub Actions workflow. No live H446/J277 lessons, CSS, JS, Cloudflare scoring, assignments or published revision changes.
