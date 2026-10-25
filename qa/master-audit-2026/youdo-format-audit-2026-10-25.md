# J277 and H446 — You Do presentation audit

**Date:** 25 October 2026  
**Scope:** formatting, presentation and answer visibility only. Do not rewrite exam questions, model answers, marking schemes or Code First activities.

## Source and browser audit scope
- Automated browser workflow: [You Do presentation audit](../../.github/workflows/youdo-presentation-audit.yml), using [youdo-presentation-regression.cjs](youdo-presentation-regression.cjs).
- Inventory: 463 standard lesson pages (163 J277 and 300 H446) at 1920 × 1080, 1300 × 635, and 390 × 844. Standalone J277 lesson 113 requires a different test instrument.
- Tests include independently visible question cards, lack of premature answers, page and diagram width, labelled SVG collisions and dense graphics, screen fit, and mobile card count. The revised runner also inspects diagrams in *later* exam questions, rather than only the first visible one.
- **Most recent browser run after all changes:** [GitHub Actions 40231962266](https://github.com/computingdept/reepham-computing/actions/runs/40231962266). At writing: two of four shards passed; remaining two had not completed. **Do not claim 463-lesson sign-off on partial evidence.**

## Confirmed defect: J277 Lesson 001 binary-conversion question

**User report:** “Convert the denary number 154 to 8-bit binary.12806403201608040201”.

**Root cause confirmed in source:** The old J277 independent-question adapter `assets/j277/youdo-grouped.js` rebuilt the question from `.textContent.trim()` on the original `.question-text`. This incorporates numeric text embedded in its SVG (the 128,0,64,0 … binary place-value cells) as an uninterrupted string immediately after the question. It is a **real adapter bug**, not merely a text-extraction artefact or a bad SVG.

**Repair committed:** apply the already used Lesson 002 extraction policy to all legacy J277 001–003 questions: clone the question, omit nested SVG/img/picture/canvas from its spoken text, normalise paragraph breaks; independently preserve the original SVG in `visual` for rendering. Refresh the shared adapter reference in Lessons 001 and 002. The fix does not alter which binary value is assessed.

**Responsive place-value presentation:** The eight original place values and bits are read from the preserved SVG and displayed via an HTML four-column × two-row grid when its question card width is narrow; wide cards retain the SVG. `lesson.js` provides `prepareResponsivePlaceValues()`, invoked again after the asynchronous J277 adapter rebuilds questions; `lesson-classroom.css` includes the opt-in container query. The container rule uses `display:none!important` for the original SVG to defeat the later, more specific grouped-adapter SVG display rule and avoid duplicate diagrams. Lesson 001 stylesheet and JavaScript URLs are refreshed.

**Dedicated automated assertion:** specifically checks Q3's cleaned question sentence, all eight place-value labels, unmodified zero-valued starter bits, and exactly one of the responsive/original visual formats at all three viewport sizes.

## Shared formatting rule: one question per phone screen

**Initial scan:** 284 H446 mobile cases showed multiple independent question cards stacked together. The shared `youDoWindowSize()` helper now returns 1 at max-width 700px, while preserving authored 2- and 3-question windows at Classroom TV sizes and special assessment/review behaviour. Both `setYouDoWindow` and next-step navigation use the same helper. No content edits.

## Long exam-question cards

Initial browser flags identified compact-TV clipping in H446 008 and 026:
- H446 008 Q1: long OCR ERL example, clipped inside a three-column view. Author `data-window-size="1"` on the *You Do phase only* to give the question full width.
- H446 026: multistep burglar-alarm logic question and a reference guide in a two-question view. Author `data-window-size="1"` to allow full-width teaching diagrams and text.

Both changes retain original exam questions and mark schemes. Any small residual height warning is kept as an unresolved presentation exception.

## Remaining triage / not signed off

- **Dense J277 question diagrams on phones:** multiple lessons including 100–115 and 118/130 need a separate labelled-graphic legibility check; no global image enlargement is justified without viewing their structure.
- **J277 115 Q2:** browser geometry detected one potential collision among 23 labelled SVG elements at TV and mobile sizes. Needs element-by-element interpretation, not automatic diagram rewrite.
- **H446 296 and 303:** long You Do sections can exceed the compact phase height but may remain scrollable. Confirm whether this is real clipping, not merely vertically extending content.
- **Nonstandard exam pages:** J277 035, 050, 094, 120 and 143 and H446 036 do not use the standard `.youdo-question` interface. These must have a dedicated assessment-format audit; they must not be marked defective simply because the standard selector finds zero cards.
- **J277 Lesson 001 content concern, not formatting:** the independent number 154 is also modelled in New Learning and the original scaffold pre-populates all bits as zero. Do not change during this format-only workstream; log for a later content-quality review.
- Earlier browser runs contained a **generated Lesson 003 race** during initialisation. The audit now waits for its adapter to initialise; treat intermittent failures as a test issue until reproduced against a settled page.
- OCR question and marking correctness, full You Do self-marking answer layout, source coverage, and lesson 113 revision mode are not signed off by these initial checks.

## Verification policy

Source patches and GitHub Pages deployment are not equivalent to visual verification. Only count source assertions, browser assertions, diagram measurements and full rollout sign-offs at their verified scope. Keep user approval at **batch/root-cause** level; do not require lesson-by-lesson review.
