# H446 eight-page student Print — pedagogical audit 006–010

**Date:** 2026-11-03
**Status:** Source-objective and You Do-selection review; **not** visual PDF sign-off and **not** teacher approval.
**Publication:** Keep current website Print links unchanged.

## Evidence and scope

Checked live HTML for Lessons 006–010 at `lessons/h446/lesson-XXX/index.html`; checked selected exam-question mapping in `offline/booklets/h446/H446_EIGHT_PAGE_COURSE_QA_2026-11-03.json` (whole-course structural QA, 288 drafts, no structural exceptions). The draft-generator mapping says that these five print selections are respectively [1,4], [1,4], [1,5], [1,4], [1,4]. **These are selected online You Do question numbers, not a claim that no other workbook task is present.** Source HTML We Do examples were checked to understand the skill progression. No actual printed PDF pages were rendered or visually checked here.

| Lesson | What is taught and modelled in live lesson | You Do selection in eight-page draft | Source-alignment concern | Recommended minimum edit within eight pages |
|---|---|---|---|---|
| **006 · Floating-point addition** | Align exponents, sign-preserving right shift, guard bits, add signed mantissas, renormalise, precision loss. We Do includes a negative operand (-5 + 3) and two negative operands. | **Q1 + Q4** (2/4): OCR floating-point addition and explanatory questions. | The printed *selected independent questions* do not include the mixed-sign calculation in Q3. A theory question does not establish ability to work with a negative aligned mantissa. | Keep Q1; incorporate a compact worked-space mixed-sign addition from Q3 (or a justified shorter adaptation) while retaining a short explanation of sign extension and precision. |
| **007 · Floating-point subtraction** | Align, negate only the second mantissa, subtract positive and negative operands, cancellation/zero, renormalise. We Do covers 5−(−1.5) and equal operands. | **Q1 + Q4** (2/4): basic subtraction and explanations. | Q3, the independent task involving a negative *second* operand, is not among the printed independent exam questions. | Keep a normal subtraction; add a small signed-negative-second-operand calculation and allow working steps for align → negate → add → normalise. Shorten explanatory prompts if required. |
| **008 · Character sets: ASCII & Unicode** | ASCII coding, code point versus encoding, Unicode/UTF-8 choice, character-code calculations, byte totals. | **Q1 + Q5** (2/5): ASCII uppercase-loop fill-in programming + UTF-8 variable-byte storage calculation. | Direct comparison of ASCII and Unicode (Q2) and code-value conversion (Q3) are both absent from the selected independent questions even though they map closely to objectives. | Prefer a concise ASCII/Unicode comparison or conversion task, plus the UTF-8 byte calculation. The programming question can remain an optional extension, not displace conceptual coverage. |
| **009 · Sequence & branching in C#** | Sequence; C# if/else if/else; threshold ordering; AND and boundary tests; .NET Fiddle use. | **Q1 + Q4** (2/4): positive/negative/zero classification and login challenge. | The selected tasks jump from simple branching to a combined login condition. Q2's age-boundary testing and Q3's compound delivery condition do not receive explicit independent practice. | Retain core classification and add concise age-band branching (11/12/17/18 tests); offer login as challenge if space. Ensure sufficient code/tracing space. |
| **010 · Iteration in C#** | Count-controlled `for`, pre-condition `while`, post-condition `do...while`; validating input, tracing loops. | **Q1 + Q4** (2/4): `for` countdown and `do...while` password-attempt counter. | Independent `while` loop validation in Q3 omitted from selected practice despite being one of the three main loop structures in the objectives. | Keep short `for`; include `while` validation; retain shorter `do...while` challenge. This provides all three loop forms without adding pages. |

## Whole-batch editorial observations

- **Repeated first/last selection is a curriculum coverage risk.** These five drafts sample high-level end questions but do not consistently sample each of the lesson's taught operations, particularly signed arithmetic, code-value conversions, branch-boundary cases, and loop types.
- **We Do is not equivalent to You Do.** Being guided through a case does not substitute for an independent attempt of a distinct case. Inspect page 5 for genuine learner work first, then checking/discussion and an improvement prompt. The existing automated rule checks for strings, not pedagogy.
- **Keep strict maximum of 8 A4 student pages.** Reallocate assessment space; do not reinstate the longer source PDFs.
- **Rendering remains unverified.** Student writing space, diagram fidelity and legibility, page 5/6/7 actual wording and code typography need page-by-page visual review before replacing any live link.
- **No teacher sign-off or staff security implied.** Existing model-review keys are stored in the public repository and should not be labelled confidential.

## Batch decision and action

**006–010: hold new eight-page PDF versions for revision of independent-question selection, followed by PDF visual inspection and teacher approval.** No live links replaced. Combine with issues in 001–005 to define a generator QA gate: **map every objective to evidence in student-facing practice**, not merely a first/last question-count check.
