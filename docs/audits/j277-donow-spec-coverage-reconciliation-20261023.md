# OCR J277 specification and Do Now coverage reconciliation — 23 October 2026

**Audit outcome: actionable coverage shortfall; no teaching files changed.**  
**Reference:** [Cambridge OCR J277 specification v3.1 (May 2026)](https://www.ocr.org.uk/Images/558027-specification-gcse-computer-science-j277.pdf).

## Scope and evidence

Read current `lessons/j277/donow-bank-20261020.json` (the 164-lesson, 656-question bank) and `docs/audits/j277-donow-coverage-20261020.json` (221 local planning checks, divided from **89 original content bullets**, not an official count of 221 OCR specification requirements). Each bank record has `check_ids` and `allocated_check_ids`; only the latter are counted as approved coverage allocations. Validated count per lesson, slots and multi-check rules.

The old narrative `docs/audits/j277-donow-20261020.md` says all 221 checks have three appearances. **That claim is outdated** after simplification of Q2. The *current JSON* explicitly records that Q2 changes removed allocations and coverage is not guaranteed. This report supersedes the outdated numerical claim.

## Verified allocation results

| Distinct allocated appearances in current bank | Planning checks |
|---|---:|
| 3 | **196** |
| 2 | **12** |
| 1 | **8** |
| 0 | **5** |
| **Total** | **221** |

**Total additional recorded exposures needed for the local three-appearance goal: 43** = (12 × 1) + (8 × 2) + (5 × 3). This does **not** mean OCR demands 43 new questions; it means the current planning allocation leaves 43 encounters missing. One classroom activity can address a legitimate check, but only when the task actually and explicitly tests it, and spaced retrieval must follow teaching.

**Five checks with zero recorded appearances:**
1. `B001.03` — 1.1.1 **Decode stage**
2. `B066.02` — 2.2.2 **Real type**
3. `B083.03` — 2.4.1 **OR truth table**
4. `B086.02` — 2.5.1 **Low-level language characteristics and suitability**
5. `B089.04` — 2.5.2 **IDE translator purpose**

**Other 20 sub-threshold checks:** CPU cores, magnetic media, storage reliability, logical right shift, sound bit-depth, peer-to-peer roles, network switch, HTTPS, IMAP, operating-system user management, legal issues, file write/close, SQL SELECT, globals/constants, final testing, boundary and erroneous data, OR gate symbol, and interpreter trade-offs. Exact lesson/slot evidence appears in the [25-row exception CSV](j277-donow-25-undercovered-checks-20261023.csv).

## Question structure safety

- **164 lessons × four Do Now questions = 656 records** (Q1–Q4 each occurs 164 times).
- **Q2:** 164 single-focus four-option MCQs; **no Q2 has more than one coverage check**. Separate automated screening did not flag overly long Q2 options in the applied thresholds.
- **Q4:** 31 questions currently reference two checks in the planner. These need human content review to ensure pupils answer one clear challenging task and the question is not a prohibited two-part demand. They are **not automatically wrong**.
- **67 records have no `allocated_check_ids`** (52 in Q1, 4 in Q2, 5 in Q3 and 6 in Q4). Some still have provisional `check_ids`. They must **not** be counted without verifying teaching prerequisites, timing, relevance and evidence. Only two provisional references overlap the 25 shortfall checks (L020-Q1 for core count, L148-Q1 for interpreter); they cannot simply be credited by changing a label.
- Q1 should retain its immediate-previous-lesson recall purpose; Q2 must remain one short MCQ, as previously agreed. Q3 earlier learning and Q4 application provide better opportunities for genuinely independent re-exposure; a revision bank is another option if the lesson timetable is saturated.

## Separate interpretation of the 110 OCR subrequirement text probes

The [110-row crosswalk](j277-ocr-v31-subrequirement-source-probe-20261023.csv) searches I Do, We Do, effective You Do Q4, Code First and reviewed overrides. It **cannot** establish complete taught coverage. Some terms wrongly looked absent in the narrow fields but were verified in New Learning or special lessons: **logical shifts in Lesson 002**, flowchart symbols in **013**, and logic gates in **145/146** and **113**. These are **not curriculum omissions on present evidence**.

Appendix 5a concerns grade descriptors; there is no J277 Appendix 5d. See [OCR source audit and adjudication](j277-ocr-v31-subrequirements-first-pass-20261023.md).

## Other significant curriculum-quality issue

Lesson **078 Practical Programming Project** announces design, implementation and testing, but its source I Do/We Do/You Do screens only ask pupils to explain those ideas. OCR section **2d** expects genuine opportunities to design, write, test and refine a program using a high-level text-based language. This lesson does not itself demonstrate that practical cycle, although other school activities might. School-level compliance cannot be inferred from this single website lesson. The final practical programming submission must be checked by school staff.

## Corrective workflow (not applied)

1. Preserve the simple Q2 bank. Use the **25 deficit checks** as a dedicated remediation tracker; place **43 independent, post-teaching exposures** through selected Q3/Q4 questions or clearly assessable separate retrieval work, without reducing existing valid allocations.
2. Reconfirm timing intervals and three **different** appearances per check. Avoid counting a single question twice for the same check.
3. Manually inspect the 31 two-check Q4 questions for overloading and avoid forced paired questions.
4. Then run an automated recount against the *actual revised* bank and verify rendered Classroom TV/mobile Do Now and answer reveal.
5. In parallel, address practical teaching quality in Lesson 078 and I Do→We Do programming scaffolds, plus effective You Do/answers.html divergence, through the master exception register.
6. **Do not claim 'all checks covered 3x' until validated.** H446 remains out of scope.

This is an **audit document only**; no live J277 lessons, Do Now questions, CSS, JS, H446 or student-facing resources were changed.
