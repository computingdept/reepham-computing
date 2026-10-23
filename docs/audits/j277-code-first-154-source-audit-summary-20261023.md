# J277 Code First — complete 154-model static ERL check

**Date:** 23 October 2026  
**Scope:** `lessons/j277/code-first-master-20261021.json` and selected reviewed Q4 `model_code` from `youdo-five-reviewed-20261022.json`. Read-only source check; no teaching, H446, CSS or runtime files changed.

## Reference standard
Official [Cambridge OCR J277 specification, version 3.1 (May 2026)](https://www.ocr.org.uk/images/558027-specification-gcse-computer-science-j277.pdf), sections 2.2.1–2.2.3 and 3b–3c (printed pages 17–18 and 24–31). OCR's exams accept OCR ERL **or another familiar high-level programming language** where formal answers are required; the **J277 site has deliberately selected OCR ERL** for classroom examples and exam models. The 2.2 programming content also requires practical experience in a high-level language; the Code First reference-language audit alone does not establish that practical requirement has been met.

## Inventory and first-pass results
- Exact **154/154 Code First entries** for standard lessons 001–164, excluding intentionally separate 018, 035, 050, 078, 094, 113, 120, 143, 156 and 157. No missing or unexpected lesson keys.
- **151 `language: "OCR ERL"`** entries and **3 SQL** lessons 073, 118 and 130. SQL is legitimate separate J277 2.2.3 assessed content, not a forbidden C# substitution.
- All 154 entries have non-empty `task`, `model`, and `expected` fields.
- All 154 model examples passed a lightweight **block-pair matching scan** for `IF/ENDIF`, `FOR/NEXT`, `WHILE/ENDWHILE`, `function/endfunction`, and `procedure/endprocedure`. No obvious C# tokens were found. **These tests do not amount to full parsing, execution, OCR certification or validation of expected output.**
- Spot-checked selected arithmetic and control-flow examples by inspection: 053, 060, 063, 066, 068, 069, 071, 084, 089, 114, 116, 129, 162. No evident output mismatch in these examples; they were not executed in an official OCR ERL interpreter.
- Reviewed Q4 ERL models at 051–058, 060 and 068 use recognisable OCR ERL syntax. The known I Do/We Do scaffolding shortfall for those lessons remains outstanding and is **not** cured by the presence of correct Q4 code.

## Stage-by-stage Code First construct distribution (presence in models, not specification mastery)

| Lesson interval | Standard lessons | Entries with IF | FOR | WHILE | Array references | Functions | Procedures | File I/O | SQL |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 001–018 | 17 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 019–050 | 30 | 16 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 051–080 | 29 | 9 | 6 | 1 | 5 | 2 | 1 | 1 | 1 |
| 081–113 | 31 | 15 | 7 | 0 | 13 | 1 | 0 | 0 | 0 |
| 114–144 | 29 | 10 | 1 | 1 | 4 | 2 | 0 | 1 | 2 |
| 145–164 | 18 | 9 | 1 | 0 | 3 | 0 | 0 | 0 | 0 |

This is a **reasonable increasing complexity pattern**, with basic sequence/assignment early, IF, FOR/WHILE, then arrays/subprograms/file handling/SQL. Deliberate Paper 1 retrieval examples remain simpler.

## Targeted checks still needed
1. **Expected-output correctness for all 154** — parse/execute or reliably trace each model, including interactive input and supplied file/table assumptions.
2. **Task–model match** — verify that the model answers exactly what students are instructed to complete and does not reveal extra scaffolding or demand unseen technique.
3. **Records** — inspect lesson 068 and 115 lesson/revision guidance against J277 2.2.3. Code First demonstrates table records using 2D arrays but **does not separately illustrate a record structure**; this is a coverage *question*, not proof the course omits records. J277 explicitly requires 2D arrays to model tabular data *and* understanding of records.
4. **Condition-controlled loops** — WHILE is represented; DO UNTIL is absent from this Code First model bank, but the ERL reference language's availability does **not** alone mean an independent DO UNTIL example is mandatory. Assess against full I Do/We Do and curriculum coverage before making a gap claim.
5. **I Do / We Do / Q4 progression** — 10 reviewed programming lessons 051–058, 060, 068 need modelling-to-independent task alignment (already J277-039).
6. **Browser regression** — no verification yet at 1920×1080 / ~390×844. Source matches do not establish rendered correctness.

## Release status
**Code First source inventory and first-pass static syntax: complete.**  
**Complete semantic proof, teaching-phase OCR ERL validation, live publishing, visual QA: not yet complete.**

Per-model detail: [j277-code-first-154-model-syntax-screen-20261023.csv](j277-code-first-154-model-syntax-screen-20261023.csv). No lesson files edited.
