# OCR J277 v3.1 — specification subrequirement audit: source pass and adjudication

**Date:** 23 October 2026  
**Reference:** [Official Cambridge OCR J277 Specification v3.1, May 2026](https://www.ocr.org.uk/Images/558027-specification-gcse-computer-science-j277.pdf)  
**Scope:** all 164 course lesson positions (I Do, We Do, effective You Do Q4), 154 Code First models, 14 approved You Do overrides; sampled full New Learning, special lessons and diagrams. **Read-only, no teaching edits.**

## What has actually been checked

Created an evidence register with **110 independently named checks** across the current J277 specification's detailed teaching subtopics, practical programming section 2d, command words 3d, and the grade-descriptor appendix 5a. The register counts **distinct lesson texts containing matching terminology**, not officially approved curriculum coverage. Terms found in I Do, We Do, effective You Do Q4, Code First and approved You Do are candidate evidence only; it does not include every New Learning screen, all Do Now questions, all lesson SVGs, revision books or live activity. No claim of three successful *retrieval* appearances is made.

Of 110 probes: **5 had zero text hits, 32 had 1–2**, and 73 had 3+ **in this limited set of fields**. It would be **incorrect** to label the 37 low-hit items as missing specification coverage.

### Why low-hit probes are NOT missing-coverage decisions

| Probe falsely thin or absent | Full-source cross-check | Status |
|---|---|---|
| 1.2.4 logical shifts (zero in narrow text fields) | Lesson **002 standalone HTML** explicitly teaches logical shifts in New Learning and independent questions; custom Lesson **113** also includes a visual and retrieval example | **Taught in source; repetition and UI quality still need testing** |
| 2.1.2 flowcharts (lexical count in narrow fields is not a full resource inventory) | Lesson **013** New Learning describes correct OCR flowchart symbols and guided practice asks students to design a flowchart; **113** also contains a flowchart SVG | **Evidence exists; do not incorrectly remove flowchart work** |
| 2.4.1 logic gates and diagrams (zero in narrow fields) | **145** New Learning names AND, OR and NOT gates and contains authored visuals; **146** provides eight-row combined-logic truth tables; **113** includes a logic-gate SVG | **Evidence exists; inspect diagrams and whether students construct/interpret them** |
| 2.3.2 test plans (limited hits) | **124** I Do: create a test table for a 0–100 mark with normal, boundary, invalid and erroneous; **151** I Do: design categories for a 1–20 test plan | **Teaching evidence exists; check table completion, expected/actual values and assessment criteria** |
| 2.2.3 records vs 2D arrays | **115** New Learning explicitly contrasts a string-based 2D table with a record of differently typed named fields; **068** uses a 2D pupil-table representation | **Concept distinction in source; practical record creation and use need independent verification** |
| 5a grade descriptors | Appendix 5a describes what achievement at grades 8, 5 and 2 looks like | **Assessment standard, not a separate syllabus topic requiring three Do Nows** |

### Confirmed high-priority practical-programming concern

**Lesson 078 — Practical Programming Project (P1 for programme evidence, not a finding of centre non-compliance).** Its stated objective is for pupils to design, implement and test a working program, but the *authored* I Do / We Do / You Do screens are explanation questions about the words “design”, “implementation”, “testing” and “refinement”. There is no actual design brief, executable code-building task, test dataset, required evidence of runtime results, or refine-and-retest step in the inspected source lesson. Its deliberately excluded Code First bank entry cannot substitute for a real project.

OCR **section 2d** requires opportunities to **design, write, test and refine** programs in a high-level text-based language; 4d requires the centre to submit the Practical Programming Statement. **It does not follow** from this lesson source alone that other school practical programming opportunities are absent. However, the lesson titled *Practical Programming Project* presently does not itself demonstrate the whole practical cycle as written.

**Proposed corrective model, only after approval:** provide one scoped problem (for example, ticket sales), success criteria, OCR ERL planning/pseudocode, actual runnable implementation in a chosen high-level language where appropriate, test cases with actual/expected, a deliberately exposed bug/edge case, a refine-and-retest task and pupil evidence. Keep exam-model pseudocode/ERL separate from evidence of practical high-level work. Do not change existing lessons during diagnosis.

### Potential gaps requiring direct evidence checks

- **2.1.2 structure diagrams:** OCR specifically includes simple diagrams showing problem subdivisions and how parts link. The narrow I Do / We Do / Q4 probe found no “structure diagram” phrase. This is **unverified, not absent**, until all New Learning, revision, diagrams and project resources are searched.
- **2.2.3 arrays passed *to* and returned *from* subprograms:** Code First **071** demonstrates passing an array to a function and **129** returning an array. Inspect lesson source to ensure students are explicitly taught both directions; do not infer “missing” from a one-time example.
- **2.3.1 and 2.5.2 practical skills:** conceptual mention of authentication/validation and IDE features is not itself proof of real hands-on use.
- **1.2.4 shifts/overflow and 2.4.1 combined gate diagrams:** presence established as above, but student retrieval frequency, exam-style use and mobile/TV legibility need proof.
- **Practical programming submission:** the centre's annual Practical Programming Statement is an administrative check for school staff; no website scrape can confirm submission.
- **Subrequirement repetition:** the existing 3x exposure target is an **internal QA standard**, not an OCR-mandated count. A future Do Now QA must count actual independent Do Now questions separately from lesson explanations, code models and revision guides.

## Appendix interpretation

Version 3.1's **Appendix 5a = grade descriptors, 5b = overlap with other qualifications, 5c = accessibility**. There is **no Appendix 5d in J277**. Do not transplant H446 appendix structure into GCSE curriculum audit. The examinable topic guidance is primarily in **sections 2b–2c**, practical work **2d**, ERL reference **3c** and command words **3d**.

## Provisional programme-wide judgement

There is visible source evidence for all broad topic families and several previously suspicious subrequirements. The main high-value concerns remain:
1. Align the 14 reviewed You Do question sets and their legacy `answers.html` routes;
2. Model ERL explicitly in I Do / We Do for ten revised Q4 programming tasks (051–058, 060, 068);
3. Reduce formulaic explanation-led teaching and increase practical creation in 061–080;
4. **Verify and strengthen actual practical-programming evidence**, particularly Lesson 078;
5. Check 2.1.2 **structure diagrams**, records / array passing, test plans and gate visuals in the *full lesson content*, not a keyword-only audit;
6. Complete precise Do Now subrequirement repetition counts using Do Now source fields, as a separate step.

**Audit confidence**: OCR requirements verified from official v3.1 PDF; source evidence limited to explicitly listed fields and targeted expanded source samples. Visual browser QA and pupil delivery unverified. **H446 untouched; no lessons, shared JS/CSS or teaching materials modified.**

[Open full 110-row probe and evidence table](j277-ocr-v31-subrequirement-source-probe-20261023.csv).
