# J277 Code First — whole-course draft, 20 October 2026

This is a planning spreadsheet for audit and improvement. No You Do content has been changed.

## Files
- CodeFirst_J277_All_164_Lessons_DRAFT_2026-10-20.csv: one row per lesson, with a short task, scaffold, model answer, expected result, coding references, Paper 1 link and review notes.
- CodeFirst_J277_Coding_Coverage_DRAFT_2026-10-20.csv: 71 internal audit checks for programming practice, with counts and lesson references. These are planning checks, not an official OCR count.
- codefirst-plan-20261020.json: structured copy for later editing/import.

## Scope
164 lesson positions: 155 proposed small tasks and 9 reserved positions.
Reserved: 018, 035, 050, 094, 120, 143 (assessment/assessment-and-review); 156 and 157 (timed paper practice); 078 (sustained practical project). A reserved row remains in the spreadsheet without an extra drill. Feedback lessons have short proposals that may be adapted to actual errors.

The coding audit covers practical items in 2.2.1–2.2.3 and related algorithm, robust-programming, Boolean and IDE practice. It is not a claim that Code First teaches all theory in both papers or replaces full lessons, programming projects or assessments. Flowcharts, structure diagrams and broader language theory still need their main teaching activities. Search/sort tasks practise small code segments; pupils are not being asked to memorise complete implementations.

Paper 1 lessons use their current topic. Paper 2 tasks use an earlier Paper 1 topic as knowledge or context. Context alone must not be counted as secure retrieval of every specification bullet.

## Proposed progression
001–017: tiny variable, sequence and input/output tasks, with basic arithmetic.
019–036: simple selection.
037–044: count-controlled loops.
045–062: condition-controlled loops and consolidation.
063–064: strings.
065–068: 1D arrays and easy recap.
069: procedure; 070: function and parameters.
071: nested selection; 072: nested loops.
073–074: read/write files; 075–076: validation.
077 onward: 2D arrays, arrays in subprograms and spaced practice.
Year 11 revisits the same skills rather than making every task longer.

The main course already introduces some techniques in a different order. These differences are flagged. Before using an independent task, check that its coding has been taught. “First Code First practice” means first practice in this draft, not proof the class has already learned it. A supplied scaffold is not a substitute for prior modelling.

## Use
Filter by Year, Lesson, Coding focus, Coding audit IDs or Status. CSV cells contain real line breaks so starter code and model answers stay intact; turn on Wrap Text in Excel or Google Sheets. Student instructions are at most 20 words; longer teacher notes are separate. The starter removes one important line, or contains a named error to fix. Full model code belongs on the separate answer screen.

Keep one small task. Do not add a fixed number of follow-up prompts. Proposed time is normally 2–5 minutes with the scaffold, not an additional full You Do activity.

Most model code uses OCR Exam Reference Language. SQL rows are labelled SQL. Two named-field record examples (115 and 137) use Python 3 dictionaries because the ERL table does not define record-declaration syntax. Agree the classroom-language equivalent before delivery. OCR ERL reference answers are not claimed to run directly in every IDE.

File tasks state required fixture files and append behaviour. SQL tasks state the complete tiny table. Use invented login details only. Toy network rules and performance calculations have stated limits.

## Sources and audit status
Official OCR J277 specification: version 3.1, May 2026, sections 2.1–2.5 and 3c.
https://www.ocr.org.uk/images/558027-specification-gcse-computer-science-j277.pdf

Lesson sequence and titles were read from the current repository at commit 768f386ad41ac11f21cad230b28d0499af2ce5be. For 001–003, hub metadata and static page titles were checked. The live exception lesson 113 uses its current hub title rather than the stale autumn2 JSON title. Other phases and live lessons remain unchanged.

Checks completed:
- all 164 lesson positions represented exactly once;
- all 71 internal coding checks mapped to at least one proposed task;
- no future Paper 1 source cited;
- 152 reference-model simulations passed and three SQL outputs checked against their supplied rows;
- file handles closed and random example values within bounds;
- CSV re-parsed: 164 data rows, 30 columns, multiline code preserved.

The simulations translate the small reference-language subset into JavaScript in memory. They are not a native ERL, Python or SQL-engine run, or a browser test. They check the supplied example case, not every possible input. Additional test cases are planning suggestions unless explicitly tested.

Next audit priorities: confirm classroom language and teaching prerequisites; strengthen any thin Paper 1 links; improve spacing for lightly represented skills; review suggested timing and scaffolding with actual pupils. No fixed three-visit coverage target has been forced into the tasks.
