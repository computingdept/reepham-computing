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
