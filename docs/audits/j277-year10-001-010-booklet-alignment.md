# J277 Year 10 | Lessons 001–010 ↔ revision booklet alignment
_Audited 18 October 2026 against uploaded GCSE Computer Science Booklet – Paper 1(3).docx and Paper 2(3).docx._

## Rule for future J277 lesson audits
Use the OCR J277 specification as the accuracy check and the **revision booklets as the shared teaching-language reference**. Reuse their established analogies, acronyms, worked methods, vocabulary, layout conventions and exam command words *when accurate*. If a booklet is wrong or ambiguous, **record the correction rather than teaching the error**. It is fine to use a booklet example in later retrieval or independent practice; the I Do, We Do and You Do must use different questions, with the method and marking expectations aligned. Explain alternative methods only after the consistent core method.

## Lesson-by-lesson comparison
| Lesson | Booklet anchor / recurring model | Decision / implemented change |
| --- | --- | --- |
| **001 · Binary & denary** | Paper 1 §1.2.4, the eight-column **128–64–32–16–8–4–2–1** number line; switches/on–off and add columns containing 1 | **Pass:** Existing New Learning and examples already use the matching eight-bit method. |
| **002 · Binary addition** | Carry from right to left, fixed eight-bit width and overflow; earlier place-value knowledge | **Pass:** The lesson uses correct addition and carry examples. **Booklet coverage gap:** A dedicated worked binary-addition/carry/overflow example was not found in Paper 1's main §1.2.4 explanation; consider adding one when updating the booklet. |
| **003 · Hexadecimal** | Paper 1 pp. 27–30: denary → eight-bit binary → two nibbles → **8–4–2–1** for each → A=10 … F=15 | **Changed:** New Learning, I Do and We Do follow this route. Division by 16 is only noted as an alternative. Corrected the misleading ExamBuilder source claim. |
| **004 · Binary shifts** | Paper 1 p. 30: left ×2ⁿ/right ÷2ⁿ, bits move off the end and are lost | **Changed:** Clarifies overflow/truncation; arithmetic shortcut applies without lost leading bits. |
| **005 · Characters / ASCII / Unicode** | Paper 1 pp. 22, 31, 33: ASCII code C = 01000011, work out D/E/F; characters assigned codes | **Changed:** Uses sequential ASCII as a model and adopts the D/E/F booklet question for independent practice. Accuracy note: standard ASCII uses 7-bit codes often shown/stored in 8-bit bytes; Unicode storage is encoding-dependent. |
| **006 · Pixels and colour depth** | Paper 1 pp. 23–24: coloured pixel grids, bit depth and metadata | **Changed:** Emphasises 2ⁿ possible pixel colours and the difference between pixels and metadata. Model diagram uses the actual 4×3, 2-bit example; guided diagram matches 6×4. |
| **007 · Image file sizes** | Paper 1 p. 23: **width × height × colour depth**, then bits → bytes → KB → MB | **Changed:** Keeps the same staged method. Includes booklet's 1000×800, 8-bit, **0.8 MB** calculation and 8×8, 2-bit example; diagrams now match the displayed model and guided values. |
| **008 · Sound sampling** | Paper 1 pp. 24–25: analogue waveform, regular **snapshots**/samples, sample rate vs bit depth | **Changed:** Explicitly uses the booklet snapshot analogy and the distinction between number of samples and bits per sample. |
| **009 · Sound/text file size** | Paper 1 pp. 22, 24–26: rate × duration × depth; characters × specified bits per character | **Changed:** Adds the booklet's **20×100×8** sound scenario with **correct working** (16,000 bits / 2,000 bytes), and the 200-character × 8-bit text scenario. Model and guided numbers remain different. |
| **010 · Compression** | Paper 1 pp. 33–35: **lossless = exact restoration**, **lossy = some information lost**; code/text versus photos/video | **Changed:** Reinforces the same text–lossless and web-media–lossy scenarios and consequence-led exam answers. |

## Revision-booklet errata (booklets NOT edited)
1. Paper 1 p. 27 prints **128–64–32–16–8–8–2–1** in prose. This should be **128–64–32–16–8–4–2–1**. Tables show the correct place values.
2. Paper 1 p. 28/29 presents `1111110₂` with a worked answer of 254; seven-bit `1111110₂` is **126**. **254** is `11111110₂`.
3. Paper 1 p. 24/25 says **20 × 100 × 8 = 10,600 bits**. Correct: **16,000 bits = 2,000 bytes**.
4. Paper 1 p. 22 presents ASCII as uniformly eight bits and Unicode as “32–64” bits. For accuracy: **standard ASCII uses seven-bit codes** (often stored in eight-bit bytes), and **Unicode encoding lengths vary**. State a bit count explicitly in file-size calculations.
5. Paper 2 §2.1 vocabulary table accidentally repeats the *decomposition* definition under **algorithmic thinking**. The worked computational-thinking explanation later correctly means **planning logical steps in sequence**.
6. Both uploaded guides display **2026 examination dates** on the covers. Before issuing them to the Year 10 2026–28 cohort, replace cover dates with verified exam dates or say “date to be confirmed”.

## Presentation QA
- Year 10 pages **004–010** use phase-matched SVGs for character coding, pixel grids, image-size and audio-size calculations (reference / I Do / first We Do).
- Removed unnecessary on-screen teacher-layout instructions (“Same example throughout” and “Question stays on the left”) from this renderer.
- All seven lessons and their answer pages passed HTML-generation checks; live GitHub Pages deployment should still be checked independently.
- Lessons **001–002** already align with the booklet's relevant method; no content rewrite was necessary.
- The **Paper 2** analogy/acronym audit (e.g. A–D–A, sorting and programming) should be applied when auditing lessons covering those topics. Do not add those acronyms to unrelated Paper 1 lessons.

**Files revised:** `lessons/j277/lesson-003.html`, `lessons/j277/autumn1-004-008.json`, `lessons/j277/autumn1-009-013.json`, `lessons/j277/autumn1-rebuilt.js`, `lessons/j277/h446-adapter.js`, and relevant lesson entry/answer pages for version refresh.
