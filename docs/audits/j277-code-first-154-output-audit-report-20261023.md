# J277 Code First — 154-model expected-output audit

**23 October 2026. Read-only source examination.** Original data: `lessons/j277/code-first-master-20261021.json`; reference: [Cambridge OCR J277 specification version 3.1 (May 2026), section 3c](https://www.ocr.org.uk/Images/558027-specification-gcse-computer-science-j277.pdf).

## Results

| Category | Count | Finding |
|---|---:|---|
| Deterministic examples matched by lightweight ERL subset evaluator | **142** | Stated outputs match this limited evaluator |
| Additional procedure example, 070, manually traced | **1** | `greet("Mia")` prints `Hello Mia`; evaluator's first attempt failed to capture output *inside* a procedure, an audit-harness limitation rather than a source error |
| External dependency / variable outcome cases checked conditionally | **11** | Outputs depend on input, file, SQL data or random number; no invented fixed result |
| **Total** | **154** | **No confirmed arithmetic/logic output error found in this pass** |

The subset evaluator covers numeric expressions, comparisons, Booleans, assignments, arrays, loops, function results, string operations and prints. It is **not** an official OCR compiler or interpreter. There was no direct program execution in an OCR-supplied runtime. Outputs can still be wrong for untested input conditions, files, SQL semantics or subtler syntax.

## Eleven conditional cases

| Lesson | Source-dependent situation | Assessment |
|---|---|---|
| 051 | User input `Ava` | Conditionally valid |
| 058 | User inputs `Y`, then `N` | Conditionally valid and terminates |
| 064 | User input `abc123` | Conditionally valid |
| 072 | Append `Backup complete` to existing `status.txt` | OCR ERL `writeLine()` appends at end according to section 3c; existing file is assumed |
| 073 | SQL Name / Pupils WHERE Mark > 60 | Syntax appropriate; illustrative data in expected field not in Code First task |
| 074 | `random(1,6)` | Returns range 1–6 by OCR definition; no fixed value |
| 117 | `readLine` through `sizes.txt` | Expected 4, 6, 10 conditional on unspecified file contents; see issue below |
| 118 | `SELECT Name FROM Pupils WHERE Class = 11` | **Context mismatch**: shared lesson 118 table explicitly has columns ID, Name, Mark; no Class field supplied |
| 119 | Random die with bonus only for six | Both branches correct by inspection |
| 130 | `SELECT Title FROM Books WHERE Available = 1` | Structurally plausible SQL; Books rows not supplied, so can't certify returned titles |
| 150 | Input `120` and integer cast | `Large` conditional result correct |

## New exceptions requiring follow-up

- **Lesson 118 (P2)** — The Code First SQL task asks pupils to filter on `Class` in `Pupils`; the I Do uses `Pupils(ID, Name, Mark)` and the authored lesson does not introduce a `Class` field. Supply the table/field or change the Code First task to use the existing dataset. Do not presume the SQL itself is syntactically wrong.
- **Lesson 117 (P2)** — The Code First expected output assumes `sizes.txt` contains the three lines 4, 6, 10, but the Code First task and starter only refer to a “supplied file” without showing content. State these values in the task or provide a real linked practice file before assessing an exact outcome.
- **Lessons 073, 130 (P3, check)** — SQL queries use illustrative data but no corresponding result table is attached to Code First; since the student task is to **write the query**, this may be acceptable. Confirm rendered context before changing.

## OCR reference verification
The current J277 reference specifies `open`, `readLine`, `writeLine`, `endOfFile`, `close`, `array`, `.upper`, `.substring`, `ASC`, `CHR`, `random`, `function`, and `procedure`. The reviewed examples use the OCR spelling; no contradictory spelling found in sampled models. This is not a proof of every model's syntax.

## Follow-on scope
Review task-to-starter-to-model congruence for all 154 examples, then assess I Do / We Do teaching scaffolds for lessons with programming Q4. Reconcile published source and answer-book routes first; leave H446 untouched.

**Evidence:** [full 154-row status CSV](j277-code-first-154-output-check-20261023.csv). **No teaching files modified.**
