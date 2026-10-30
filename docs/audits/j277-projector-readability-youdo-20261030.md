# J277 classroom readability and You Do reveal audit — 30 October 2026

## Scope
J277 actual classroom lessons only. Teacher-led phase navigation and lesson materials were preserved. No revision guides, Catch Up files or PDFs changed.

## Pre-edit findings
- Existing shared classroom styles reduced some reference explanations to 16–18px on shorter desktop/projector viewports; grouped You Do questions had a 17px minimum.
- The J277 source-rendered You Do contained direct links labelled "related marking guidance" and "related answers" on unrevealed question screens (Autumn 1 and 2 renderers).
- Shared phase reset set `data-answer-mode=false` but did not explicitly re-hide visible `.youdo-solution` panels when J277 You Do was re-entered.
- The last J277 question's navigation control could be labelled "Continue → Key Vocabulary" even though the next action began self-marking.
- The normal grouped question template stores marking schemes inside an initially hidden `youdo-solution` panel; Lesson 002 uses separate initially hidden review screens.

## Narrow corrections
- J277-only `assets/j277/classroom-polish.css`: increase key teaching fonts on shorter projector viewports, improve grouped question/model font floors, reclaim space by reducing panel padding and gaps; no phase or question grouping changes.
- Shared `assets/h446-lesson/lesson.js`: J277-path-guarded answer re-hide on entering You Do; no change for H446. Label final J277 question action "Begin self-marking".
- `lessons/j277/autumn1-rebuilt.js` and `autumn2-rebuilt.js`: remove premature direct external marking-guidance hyperlinks; original classroom question text and model answer data unchanged.
- Version query refreshed for J277-only CSS and shared lesson controller on the six classroom template entry points.

## Automated checks completed
- Updated JS syntax: shared controller, Autumn 1 renderer, Autumn 2 renderer and J277 adapter all pass parsing.
- CSS braces balanced; J277 stylesheet links updated across six template entry points.
- Source scans confirm both premature marking-guide labels absent from J277 classroom renderers.
- Isolated function test: resetting J277 You Do changes a previously visible answer panel to `hidden=true`, while the same H446 test remains untouched.
- Confirmed grouped J277 answers are initially wrapped in `hidden` containers; Lesson 002 review stages use `hidden` siblings.
- No live browser run at rhsccs.org and no projector-distance visual test were possible in the audit environment.

## Manual classroom checks recommended
1. At 1280×720 and 1920×1080, confirm left/right content is readable and no text is clipped, especially diagrams and dense lessons.
2. Open J277 Lesson 019 and 100: visit You Do, advance through Code First and exam questions, ensure marking appears only after the explicit "Begin self-marking" action.
3. Navigate away after revealing answers, then return to You Do via the phase button: no answer should remain visible.
4. Check Lesson 002's distinct review screens and one mobile lesson, confirming swipe and back navigation remain intact.
