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

## Complete successful browser run — 25 October, post SVG/CSS correction

[GitHub Actions **40231881184**](https://github.com/computingdept/reepham-computing/actions/runs/40231881184) completed successfully in all four shards: **463 standard lessons**, three viewports, **13,615 passed assertions**, **0 hard failures**, **34 review flags**.

J277 Lesson **001**, Q3 place-value diagram was explicitly tested at Classroom TV, compact TV and phone widths. Each test found eight place-value cells, the source sequence `128,64,32,16,8,4,2,1`, unchanged `00000000` starter bits, **responsive version visible and original SVG hidden** in the narrow question card. Later commits added a targeted assertion that the question sentence excludes concatenated SVG text; that enhanced assertion awaits a complete fresh four-shard run. The earlier four-shard success remains valid evidence for the rendered diagram and the repaired shared phone layout.

**34 warnings**, not automatically confirmed defects:
- **10** narrow dense-diagram warnings (10 J277 lessons: 100, 101, 102, 108, 109, 110, 111, 115, 118, 130).
- **3** same potential label collision in **J277 115** (one at each viewport; requires interpretation of the source graphic).
- **18** custom assessment-structure review flags, from six special pages (J277 035, 050, 094, 120, 143; H446 036). These are not `.youdo-question` templates.
- **2** vertically extended, apparently scrollable H446 296/303 compact-TV phases, not yet established as clipped.
- **1** H446 008 compact-TV code-question warning, substantially reduced after setting one question per screen; inspect residual fit before changing text sizes.

**Do not read '0 hard failures' as '0 presentation concerns.'** The mobile/question reveal checks have passed the baseline; the above items require separate visual or special-layout QA. OCR pedagogical and marking-accuracy checks remain outside this formatting audit.

## Supplemental independent You Do width audit and targeted corrections

An additional cross-course browser audit at `qa/master-audit-2026/youdo-format-regression.cjs` checks individual question-card scroll widths, SVG containment, responsive question windows and premature answer visibility, independently of the presentation audit above. The first tested shards found **confirmed compact-TV horizontal overflow** in H446 004 (two question cards, 373px content in 347px card) and H446 007 (one question, 370px in 347px). The source shows long exam-source `.phase-tag` labels combined with a `width:max-content` rule.

**Shared formatting correction committed:** `assets/h446-lesson/lesson-classroom.css` now allows exam-source labels within `.youdo-rolling .exam-card` to wrap within 100% card width, without reducing text size. H446 004/007 stylesheet references were refreshed. **A complete post-correction browser rerun remains to be confirmed; do not call these fixed merely from source inspection.**

The supplemental scan also detected potential short-TV vertical clipping in H446 296 (76px) and H446 303 (147px). Their long narrative/ERL questions use the standard 3-question grouping. An explicitly opt-in `data-compact-window-size="1"` mode was added for **only H446 296 and 303**, and `youDoWindowSize` now uses that mode for 901px+ viewports at maximum height 700px. The usual three-question 1080p layout and one-question mobile mode remain unchanged. This change affects presentation only; no questions, code or mark schemes were edited. The responsive and stepping behaviours still require post-commit browser verification.

**Test scope caveat:** The extra audit does not fully verify all rich/grouped marking screens and does not replace standalone assessment-interface checks. Keep outstanding cases in the separate review register rather than declaring an all-course finish.

## Latest automated You Do presentation recheck — 26 October 2026

[Four-shard run 40304293162](https://github.com/computingdept/reepham-computing/actions/runs/40304293162) completed with all jobs successful at Classroom TV, compact TV and phone sizes: **463 standard lesson pages, 13,646 passed checks, 0 hard failures and 0 warning flags**. This supersedes the warning totals recorded from previous runs **for the automated test's coverage only**. The scan reported 1,389 lesson/viewport loads; some bespoke assessments lacked the conventional You Do card structure, so dedicated assessment checks and pedagogical review remain separate. J277 Lesson 113 is excluded and has its own [47-slide successful browser test](https://github.com/computingdept/reepham-computing/actions/runs/40304460070).

**Do not infer that all source questions, marking explanations or special assessment interfaces have been personally inspected:** automated checks establish geometry and navigation at defined browser sizes, not examiner accuracy or a subjective visual-quality sign-off.
