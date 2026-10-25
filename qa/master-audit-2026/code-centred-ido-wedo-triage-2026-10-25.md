# Code-centred I Do / We Do — selective triage

**Date:** 25 October 2026  
**Scope:** OCR J277 GCSE and OCR H446 A Level.  
**Status:** first-pass *source* sampling and synthesis of the existing October 23 programming-progression audit. **Not live TV/mobile verification.**

## Approved teaching rule

Where students must **trace, debug, construct or change code**, keep the actual task and sufficiently short source/starter code visible as a persistent reference while the teacher reveals a closely related model or guided activity. On Classroom TV use the left-hand reference and the right-hand progressively revealed work where it improves legibility. On narrow screens stack the two panels. A progressive trace diagram/table belongs with the modelling steps, not squeezed below a lengthy code block. Do not put a final output/answer in the initial reference diagram.

This is a **selective layout mode**, not an unconditional instruction to add code to all lessons. Diagrams, conceptual comparisons and prose explanations continue using their existing approved structure. Longer programs should be divided into meaningful teaching steps rather than shrunk below legible size or trapped in a nested scroll pane.

## First priority: confirmed J277 teaching-sequence mismatch

The existing evidence at `docs/audits/j277-programming-ido-wedo-q4-audit-20261023.md` identifies **10 programming lessons: 051–058, 060, 068**. Their reviewed independent writing questions require OCR Exam Reference Language, but the published I Do and We Do are mainly explanation-of-terminology tasks. This is **pedagogical progression**, not solely CSS.

**Recommended content review:** preserve the authorised You Do Code First tasks and Q2–Q4 examination questions. For each of the ten, show one concise worked ERL example in I Do, guide a close transfer example in We Do, then retain independent work as published. Use an appropriate trace table for loop/state examples, not automatically for every program. **No content rewrite has been made during this triage.**

## H446 source sample: 20 concrete lesson pages

Each sampled `lessons/h446/lesson-NNN/index.html` was re-read from GitHub. The words 'code' and 'visual' below refer to markup presence within the I Do/We Do reference *before* worked steps; tag counts are **not** proof of adequate pedagogy or visual quality.

| Lessons | Structural evidence | Triage decision |
|---|---|---|
| 001, 008 | Standard `ido-reference` / `wedo-reference`; step decks | Preserve existing standard; desktop/mobile QA only |
| 013, 024 | Reference contains code-tagged content in I Do, less/no code-tagged reference in We Do | Check whether relevant starter/code remains available for guided task; no automatic duplication |
| 068, 082, 279, 320 | `h13-grid` with pre/code + diagram content | Specialist year-13-style grid; review actual fit and delayed answers before any CSS changes |
| 093, 104, 131, 146 | Diagram-heavy `h13-grid` | Keep diagram-centred layout unless question requires working with visible code |
| 181 | Confirmed nested-grid and code+diagram vertical crowding | Lesson-specific repair applied; I Do now has persistent Factorial C# on left and synchronized progressive diagram on right; inspect live |
| 182, 183 | Confirmed nested-grid family, corrected and teacher accepted | **Do not change:** preserve accepted half-screen presentation |
| 184, 187 | `algorithm-grid` diagram without a `pre` or `code` tag in I Do reference | Content review: is code actually needed for current algorithm activity? Don't infer from lesson number |
| 205 | `h446-grid` combines code and several SVGs | Check code/diagram balance and answer leakage on TV |
| 220 | `route-grid`, code + four or more SVGs in each phase | High visual-density check; no blanket 50/50 override |
| 240 | `h13-grid` code and diagrams | Check fitting and whether outputs are concealed until reveal |

**Caution:** a nested child grid is a *risk signal*, not automatically a defect. H446 181–183 required a special override, while other specialist layouts may deliberately span the outer grid; do not globally rewrite `.ido-example` or `.wedo-example`.

## Proposed sequence of work

1. **First inspect the H446 Lesson 181 pilot** at 1920×1080 and 390×844: full question+function on left; complete progressive trace and explanations on right; no internal scroll; hidden returns before final step; navigation backwards/re-entry resets correctly.
2. **J277 051–058, 060, 068:** pedagogical review against actual independent coding demands. Draft and verify teacher model/guided-code progression one topic at a time; do not mutate live lessons merely to tick a visual audit box.
3. **H446 selected candidates 013, 024, 184, 187, 205, 220, 240:** confirm which require persistent code and which teach primarily with diagrams; test layout and answer concealment before change.
4. Broaden the same source triage to the remaining lesson records and generated-lesson data; batch fixes only for a verified recurring defect.
5. Log every changed lesson and its browser result in `issues.csv`; only mark **Verified** after classroom/mobile checks.

## Verification boundaries

- Confirmed: existing J277 10-lesson mismatch reported in published audit; 20 named H446 source pages inspected for code-tag, diagram, step and structural patterns; L181 pilot source checks passed previously.
- Not confirmed: pixel fitting, browser execution, full specification coverage, mark-scheme correctness, whether every H446 class/diagram is pedagogically appropriate, or all unsampled lessons.
- No new H446/J277 lesson changes made by this triage. It is an evidence-and-priority record.

## Important source-of-truth reconciliation — J277 Lesson 051

The original `lessons/j277/autumn2-051.json` still contains **explanatory** Q2–Q4 wording; that alone is not the effective student view. The runtime `assets/j277/youdo-grouped.js` also loads `lessons/j277/youdo-five-reviewed-20261022.json` and selects reviewed entries for the applicable lessons. Lesson **051** is present in that bank with: Q2 knowledge 2 marks; Q3 applied input/processing/output 3 marks; **Q4 writing ERL 4 marks** with model code `ticketPrice = 6`, integer input, multiplication and output.

The Lesson 051 I Do (`m.q`, `m.st`) and We Do (`w`) in the original JSON still ask students mainly to explain concepts. The mismatch thus matters **when the reviewed bank is applied**. Before applying live teaching-content changes, check the effective question-selection path and mobile/TV rendering to ensure the revised model aligns with the actual displayed Q4 and marking scheme. No new question text or mark scheme should be invented.

## Implemented opt-in pilot: J277 051 (Sequence, Input and Output)

**Implementation:** Lesson `051` now has a `codeModelling` object in `lessons/j277/autumn2-051.json`. The existing `autumn2-rebuilt.js` renderer checks for the opt-in and creates a persistent left-hand ERL scaffold/question with teacher-revealed, cumulative code on the right. No other lesson receives this branch unless an explicit `codeModelling` object is authored. Its independent assessment questions, approved reviewed Q2–Q4 question bank and Code First activity were not edited.

- **I Do:** £4 school-kiosk wraps model, four revealed stages: assign price → read integer quantity → calculate total → output. The left scaffold uses clearly labelled blanks, not an advance display of the full solution.
- **We Do:** two mini-whiteboard guided programs, £3 exercise books then £2 sports-day programmes. Stage counts are 3 + 3. The second task has less scaffolding. All worked code starts concealed.
- **Existing Q4 remains:** reviewed £6 school-concert ticket coding question (4 marks) with its original scheme. The authored older questions in the original lesson JSON remain separately present; the J277-only reviewed bank is selected by the existing grouped You Do adapter.
- **Responsive layout:** I Do and We Do use half-width panels on desktop, stack on narrower screens, preserve 15–20px code, and avoid introducing internal vertical scroll for a four-line program.
- **QA:** syntactic compilation of the updated generator succeeded, both opt-in render functions were executed against 051 data, and their output produced 4 hidden I Do stages, 2 We Do examples and 6 hidden We Do stages. Generator/body/wrapper cache references were inspected at source level.
- **Status:** source checks passed. GitHub Pages build and *live* 1920×1080 and 390×844 browser checks must be confirmed before marking this lesson **Verified**. Do not bulk-migrate the remaining nine lessons until the pilot's behaviour is judged acceptable on Classroom TV.

## Process correction — lesson-by-lesson approval is NOT the audit workflow

Teacher identified a genuine J277 Lesson 051 We Do regression on 25 October: both guided examples displayed simultaneously.

**Root cause:** new opt-in code-model CSS set `display:grid!important` for `#we-do.j277-code-model-phase .wedo-example`. Its greater CSS specificity overrode the shared `.wedo-example[hidden]{display:none!important}`, even though the generated HTML and shared `showOnly()` logic correctly hid the second example. The initial source check had verified the presence of `hidden` but had **not checked computed CSS visibility**. This was an avoidable test gap.

**Repair applied:** drop the `!important` from the grid `display` declaration, add specific opt-in `[hidden]` guards for both example and step containers, and refresh Lesson 051's generator URL. Retain its approved coding progression, question bank and mark schemes.

**Regression check:** extend `qa/master-audit-2026/classroom-tv-smoke-test.html` with CSS-computed visibility assertions for *both* courses: exactly one example rendered on phase entry, every `[hidden]` example absent from layout, and the next example alone rendered when advanced. J277 051 is an explicit test case. Separately, equivalent CSS rules were exercised in Chromium at 1920×1080 and 390×844; initial and switched example visibility both passed. This is **not** a claim that the live site was visually tested end-to-end.

**Whole-course audit protocol going forward:**
1. Inventory all J277 and H446 lesson pages/versions and label lesson type/exception. Existing `lesson-inventory.csv` and source audits remain authoritative starting points.
2. Group issues by **shared root cause** or **pedagogical pattern** rather than soliciting teacher approval on every numbered lesson. Apply the reusable renderer/CSS fix once for all affected templates; use opt-in modes for content where a blanket change would be wrong.
3. Run **automated source tests plus browser navigation and visibility regressions** across representative and exception sets at both standard viewports before claiming a fix. If full browser coverage is not available, label untested rather than ask the teacher to validate each lesson.
4. Preserve existing teacher-approved content, OCR exam question banks, solutions, You Do and Code First flows unless a **documented content problem** requires change.
5. Publish **batch summaries** with affected lesson counts, passed/failed/not-tested statuses, and a short exception queue. Raise only substantive teaching/content decisions for teacher judgment; **no lesson-by-lesson manual approval loop**.
6. Do not stamp `Verified` solely because source compiled, GitHub Pages built, or the page URL opens.

**Current status:** Lesson 051 navigation repair committed and regression checks authored. Remaining nine programming lessons still require **one coherent batch treatment**, not isolated teacher reviews. H446 specialist grids remain a separate shared-layout risk group.

## Completed source batch — J277 ten programming lessons (25 October)

**Affected lesson IDs:** 051, 052, 053, 054, 055, 056, 057, 058, 060 and 068. The original Lesson 051 proof was extended as a **single pedagogical cohort**, not ten manual teacher review requests.

| Lesson(s) | Coding progression |
|---|---|
| 051 | input → integer casting → processing → output |
| 052 | store string/integer variables → update assignment → output |
| 053 | numeric input → arithmetic with one fixed fee → output |
| 054 | AND/OR grouping → IF/ELSE responses |
| 055 | IF condition → two price branches → output |
| 056 | IF/ELSEIF/ELSE boundary cases → output |
| 057 | initialise accumulator → counted FOR → add each pass → output |
| 058 | read input → WHILE invalid → update within loop → output |
| 060 | initialise counter → FOR input → nested IF condition → output |
| 068 | use 2D array rows as entries and columns as fields; zero-indexed table to represent record-like information |

**Implementation:** Nine new `codeModelling` objects in their individual `autumn2-NNN.json` files, in addition to the existing 051 opt-in. Every page wrapper was cache-busted to load the updated shared generator. The same renderer handles all ten. Each lesson shows one cumulative I Do model, then two We Do examples with less scaffolding in the second.

**Content source-of-truth:** the reviewed `youdo-five-reviewed-20261022.json` bank contains a **Programming Q4** for all ten lessons. It and all Code First task sources were untouched. The new model programmes use different numbers and scenarios from the final reviewed independent question; no C# is introduced into J277.

**OCR-specific caveat:** 068's independent Q4 concerns a two-dimensional array, while its existing title/content discuss records. The lesson now explains that a 2D array can *represent* rows and columns of record-like data and is not the same as a named-field record type. OCR J277 2.2.3 explicitly includes records and use of 2D arrays to emulate tables and records. This prevents presenting them as identical constructs.

**Static QA performed:** 10/10 reviewed Q4s exist and are classified programming; 10/10 generated I Do fragments contain 3–4 initially hidden steps; 10/10 generated We Do fragments have **exactly two example containers**, with example 2 hidden on entry and six hidden worked stages; 10/10 progressive models are cumulative and do not duplicate the independent Q4 model. Generator JavaScript syntax check passed. Cache-version references of all ten wrappers were reconciled.

**Runtime QA:** a repository GitHub Actions Playwright test was added at `.github/workflows/j277-code-model-regression.yml`, using `j277-code-model-regression.cjs`. It loads **all ten lessons at 1920×1080 and 390×844** through a local web server, checks I Do and We Do initial hiding/advancement/Previous/next-example reset, full-width layout and uncaught errors. A source pass **is not a browser pass**; record CI results separately and correct failures. Status remains not fully verified until that run completes.

**Workflow:** all ten updated and source-checked as a batch; no lesson-by-lesson sign-off required from the teacher. Remaining J277, H446 and standalone exceptions are separate audit scope, not implicitly covered by these ten.
