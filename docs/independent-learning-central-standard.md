# Independent lesson: central code and print contract

**Status:** J277 Lessons 001–004 use the central independent booklet architecture as of 28 October 2026.
**Purpose:** Preserve one source of shared interaction and presentation when scaling to J277, H446, KS3 and other Trust subjects.

## Lesson file responsibilities

Each `lessons/<course>/lesson-NNN/independent.html` owns lesson-specific prompts, diagrams, vocabulary, worked examples, answer spaces and self-marking content. Do not copy CSS, JavaScript or event handlers into the lesson HTML.

The current four-page pattern is **Start → Learn → Practise → Check & improve**. Give each page a `class="page"` and `data-page="1"` to `"4"`, inside `#viewer`. The `#spreads` container stays empty in the HTML; shared JavaScript assembles the print spreads.

## Classroom signage reinforces classroom readiness (mandatory)

The print booklet prepares students to recognise familiar **classroom signals**. On paper, deliberately use **only two tiles** beside the relevant task: a blue **learning-phase** sign and a green **working-routine** sign. No orange/pink response tile, no icon glyphs or obsolete PNG logos. **Do not change the three-tile signage in the original interactive teacher-led lesson.**

- **Blue phase labels:** Do Now, Objectives, New Learning, I Do, We Do, You Do, Questioning, Exit Questioning as appropriate.
- **Green routine labels:** Silent Working, Listening, Quiet Working, Silence as appropriate.
- Use the exact *current desktop lesson's* blue/green tile colours, centred bold text and borders from `assets/h446-lesson/lesson-base.css`; use the relevant stage and routine labels from `signalMap` in `assets/h446-lesson/lesson.js`. Do not copy its response tile onto the printed booklet.
- **Code First** remains first inside J277 **You Do**, using Predict → Write → Test → Improve where relevant. Present independent booklet activities as writing on paper, not requiring a whiteboard, partner or internet.
- Keep the signage concise and repeat it beside each relevant activity. In B&W, the phase and routine wording must remain readable without colours.
- **Quality assurance:** visually compare the print tiles with the blue/green tiles shown in the current live lesson, check every page for overflow, and do not call a PDF published until its final exported version has been checked.

## Shared files and order

1. `assets/independent-lesson-base.css` — typography, layout, writing areas and small-screen responsive styles.
2. `assets/independent-print.css` — A3 landscape, double-sided folded-booklet print rules.
3. `assets/independent-navigation.css` — interactive independent steps and print toolbar presentation.
4. Optional shared, explicitly opted-in activity CSS (e.g. `assets/independent-learning-exemplar.css`).

At the end of the HTML, in this order:

1. `assets/independent-print.js` — black-and-white/colour choices, page imposition and print behaviour.
2. `assets/independent-navigation.js` — accessible four-step controls, screen navigation and print/save control.
3. Optional shared interactive activity module (e.g. `assets/independent-learning-exemplar.js`, presently used by J277 Lesson 003).

**Keep this order:** the existing layout and print selectors depend on it. A lesson may opt in to additional interactive activities without changing the core shared files.

## Printing and student navigation

- Print is two **A3 landscape** spreads, page pairing **4–1, then 2–3**. The result folds to four A4 sides. Print double-sided, short-edge flip, at 100%.
- Offer **black and white** by default, plus **colour**, and **Print / save**. Use browser Save as PDF when needed.
- Keep the interactive classroom lesson as the hub's primary lesson destination. The lesson-specific **Print lesson** link appears only when a corresponding independent booklet is actually published.
- Central link routing for classroom pages currently lives in `assets/h446-lesson/lesson-resources.js`, with its visual treatment in `lesson-resources.css`. Do not add dead menu actions.
- Retain established classroom phases, reveal behaviour, Code First, routine signs, mobile swipes and accessible focus handling: editing the print experience must not rewrite these.

## Regression checks before release

For **Lessons 001, 002, 003 and 004**, check both B&W and colour, four on-screen pages, step navigation, completed answer areas and three true/false Exit Ticket questions (where authored), working print/save, paper imposition, and no overflow or overlapping content on A3 preview. Confirm the classroom lesson retains its existing phase navigation and mobile gestures.

Static migration test on 28 October 2026: Lessons 001, 003 and 004 retained their original HTML content matched the pre-refactor versions after replacing central resource links with their extracted original code and restoring the former inline print button attribute. The shared base CSS, print CSS and original print JavaScript were moved without changing their rules or algorithms. Lesson 002 was newly authored from its current interactive content and retrieval bank, then checked for shared asset references, source-aligned content and arithmetic. **Live browser and paper visual rendering must still be verified separately.**

## Pilot: objective auto-marking in Lesson 004

The independent on-screen version may opt into `assets/independent-auto-mark.js` and `assets/independent-auto-mark.css` after the shared navigation modules. The lesson's `body[data-auto-mark-config]` references a separate, reviewable marking key such as `data/independent-marking/j277-004.json`. Questions use stable `data-mark-key` attributes, and longer written work uses `data-reflect-label`.

- The centrally shared engine handles number, hexadecimal, eight-bit binary, simple two-line code-pattern, multiple-choice and true/false answers. Lesson-specific answers and explanation text live in JSON, not the JS.
- **Only deterministic fields count towards the automatic score.** Written justifications, reasoning and valid alternative code solutions still require comparison with model answers; never call these objectively auto-marked.
- On-screen check buttons show feedback on each section and a cumulative progress summary. An edited answer invalidates the previous result until rechecked. Responses are kept in the page; they are not submitted to a server.
- The auto-mark enhancement operates only on `#viewer` and runs **after** `independent-print.js` has copied the original four pages into the booklet spreads. The print version retains its original answer spaces, explanations and layout.
- **Do not add this module to the original teacher-led lesson.** Keep that lesson's content, classroom cues, phase progression and reveals unchanged.
- Test correct/incorrect answers, keyboard use, mobile, the written-reasoning fallback and printed page pairs before scaling the pilot.

## Separate short Catch-up / Learn mode · 80% mastery model

**J277 Lessons 001–030** now have separate Teach and Learn experiences. Print is opt-in only where published:
- **Teach**: original `lessons/j277/lesson-NNN/index.html`, never rewritten as part of catch-up work.
- **Learn**: `lessons/j277/lesson-NNN/learn.html`, about 12–15 minutes, five stages (Remember, Learn, Practise, Apply, Check), sharing the same engine and CSS.
- **Print**: existing `lessons/j277/lesson-NNN/independent.html` A3 booklet for 001–004. **Lessons 005–030 have no print booklets yet: never show dead Print links.**

The hub uses `assets/hub-navigation.js` with a per-tile optional `printHref`; `j277-hub.html` owns the published route registry. The catch-up version uses central `assets/catchup-lesson.js`, `assets/catchup-lesson.css` and separate, course-specific JSON content in `data/catchup/j277-NNN.json`. No duplicated per-lesson assessment code. Shared visual models for nibbles, bitmap pixels, and accessible process/comparison diagrams live in the central engine and stylesheet.

**Mastery contract:**
- 80% is required to show mastery. Count every objectively marked question equally; round the minimum number correct **up**. Each published Learn lesson 001–030 has 15 questions, so at least 12 must be correct.
- Students must attempt and check every objective question to be marked as mastered; **unlimited retries**. Changing an answer invalidates its earlier checked result. Never block opening another lesson.
- Auto-check number entry, MCQs, true/false, matching and reordering. Ordering works by drag and drop on mouse and by explicit up/down buttons for touch, keyboard and accessibility.
- One extended written question is self-reviewed using a model answer and checklist; do not pretend a free-text matcher reliably grades nuanced exam responses.
- A small browser-local saved state lets the student resume on that device. No names, accounts, student records or submission to a server are required.
- The short path must retain all **essential taught concepts**, not every classroom explanation, question or repetition. Printed and classroom resources must remain independently usable.
- Visual and touch testing at mobile and desktop widths, and a complete user walkthrough of correct/wrong/retry cases, are required before promoting this pilot across the curriculum.

## Lessons 006–015 rollout check (28 October 2026)

New, curriculum-aligned `learn.html` pages and `data/catchup/j277-NNN.json` question content are published for Lessons 006–015. These reuse the same central `catchup-lesson.js` and `catchup-lesson.css`. The existing teacher-led `index.html` files and current print booklets were not edited.

Each new page has 15 objective questions (number, choice, true/false, matching and ordering), five stages and a written answer for model-led self-review. All 150 correct-answer inputs and 150 deliberately incorrect inputs were tested against the actual central marker; 300/300 test cases behaved as expected. Static audits also checked the 12/15 pass threshold, matching keys, order permutations, hub routes, required assets, no inline CSS/JS, and no unavailable Print links.

**Verification limit:** passing static tests does not substitute for checking published pages visually on desktop and mobile, nor completing actual browser sessions through all five stages. New pages should be spot-tested before pupil release.

## Lessons 016–030 rollout check (28 October 2026)

New `learn.html` pages and their curriculum-specific `data/catchup/j277-NNN.json` answer sets have been committed for Lessons 016–030. The existing teacher-led `index.html` pages and published independent print booklets were not modified. The central J277 hub and `data/lesson-resources.json` now register Learn for Lessons 001–030, and Print only for Lessons 001–004.

All fifteen new configurations contain 5 stages, 15 objective questions each, and one longer answer with model-guided self-review. They reuse central `assets/catchup-lesson.js` and `assets/catchup-lesson.css`, preserving 80% mastery (12/15), unlimited retries and non-blocking navigation.

**Automated validation:** all 225 correct-answer inputs and 225 deliberately incorrect responses (number, single-select choice, true/false, matching, and reorder) were run through the actual central answer-checking functions. **450/450 behaved as expected.** Additional static checks found 15 questions and a written self-review activity in each lesson, valid option sets and keys, no duplicated question IDs and a passing-score threshold of 12.

**Still to do before pupil release:** visually inspect live page rendering and navigation on mobile and desktop; run real user-interaction tests for matching, drag-and-drop/tap reorder, input changes, answer checking, local progress saving and final results. Source-level testing alone does not certify these behaviours in a browser.

## Ongoing rule

Fix shared functionality in shared assets, not by copying styles and scripts into individual lesson files. Content changes remain lesson-scoped. Scope new behaviour to a cohort or explicit feature flag until visually checked on both TV/desktop and phone and in print.
