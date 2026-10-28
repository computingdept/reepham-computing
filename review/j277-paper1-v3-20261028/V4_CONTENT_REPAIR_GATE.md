# Paper 1 V4 — content repair instructions and release gate

**Status: work in progress; not published.** Base: V3 review PDFs, 291 pages each. This note turns the 28 October audit into precise editing work. It does **not** claim the PDFs themselves are corrected.

## Mandatory diagram corrections — retain the analogy, correct the visual label

| Physical PDF page | Correction required | Verification |
|---|---|---|
| 33 | Keep the fridge/freezer teaching analogy, but remove the unrelated *wash-cycle* caption from inside the illustration and replace it with a factually accurate appliance-related instruction; check the surrounding explanation agrees. | Student can describe the concept without seeing conflicting terminology. |
| 71–72 | Keep the LEGO analogy and visual blocks, but ensure the unit sequence and labels use **KB, MB, GB, TB, PB** consistently and in ascending order; no second “Gigabyte” where “Petabyte” belongs. Review 1000 versus 1024 conventions in context. | All embedded labels match the adjacent corrected units table. |
| 166 | Keep the cybersecurity illustration but make each attack type distinct. Label **SQL injection** only where malicious database query input is being demonstrated; distinguish it from other attacks without repeating the term. | Diagrams and descriptions correctly distinguish malware, phishing, brute force, denial of service, and SQL injection where depicted. |

These are suggested directions, **not approvals of exact replacement copy**: inspect original page art and surrounding explanation before applying.

## Student-facing wording corrections

| Page | Replace author-facing language with a student-focused instruction |
|---|---|
| 3 | Remove *unpublished review candidate* and references to the old *Exam Paper 2* source heading; use the actual synoptic-study heading. |
| 59 | Replace *Same artwork as the published J277 guide* with a short explanation of what the illustration helps the learner understand. |
| 90 | Replace the *original number-line picture* sentence with an instruction to use the visible number line to convert between denary and binary. |
| 92 | Remove discussion of mistakes in the *original hex examples*; present only corrected hexadecimal examples and the learner's checking method. |
| 93 | Replace *missing from the original* with a clearly labelled, complete worked binary-addition method including carry steps. |
| 94 | Remove *Preserving the source left/right shift illustration*; explain how left and right shifts affect the binary number, and check any overflow claim against the bit width shown. |
| 127 | Replace *these original pictures* with an explanation of what the network/Internet diagram represents. |
| 129 | Rename *Star and mesh · original diagrams* to **Star and mesh network topologies**. |

Run the automated editorial vocabulary gate across **all 291 pages**, not just these examples. Never globally replace text without inspecting surrounding sentences. Maintain coloured and print versions with identical text, page order, bookmarks, and PDF internal links.

## Release criteria (all required)

- [ ] Diagram corrections visibly checked at 100% and print size; illustrations/analogies preserved.
- [ ] Student-facing editorial language absent from both PDFs and fresh page-by-page review.
- [ ] All practice questions/model answers/marks independently checked against OCR J277 v3.1; no unstated assumptions or answer leakage.
- [ ] Both PDFs maintain consistent pagination; all 33 Paper 1 MCQ links checked on finished candidate.
- [ ] Check PDF file size/download on an actual phone; ensure the online lesson remains mobile-accessible.
- [ ] Print actual nine-page monochrome sample (9, 33, 59, 72, 94, 129, 166, 234, 254).
- [ ] After approval, update both published PDFs and all 33 Paper 1 PDF skill mappings **together**; regenerate guide-links.js and test the full J277/H446 learner flows.

**No live index or guide files should be touched in this correction phase.**
