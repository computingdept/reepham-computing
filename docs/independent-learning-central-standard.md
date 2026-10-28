# Independent lesson: central code and print contract

**Status:** J277 Lessons 001–004 use the central independent booklet architecture as of 28 October 2026.
**Purpose:** Preserve one source of shared interaction and presentation when scaling to J277, H446, KS3 and other Trust subjects.

## Lesson file responsibilities

Each `lessons/<course>/lesson-NNN/independent.html` owns lesson-specific prompts, diagrams, vocabulary, worked examples, answer spaces and self-marking content. Do not copy CSS, JavaScript or event handlers into the lesson HTML.

The current four-page pattern is **Start → Learn → Practise → Check & improve**. Give each page a `class="page"` and `data-page="1"` to `"4"`, inside `#viewer`. The `#spreads` container stays empty in the HTML; shared JavaScript assembles the print spreads.

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

## Separate short Catch-up / Learn mode · 80% mastery pilot

**Lesson 004** now has three distinct student destinations:
- **Teach**: existing `lessons/j277/lesson-004/index.html`, unchanged.
- **Learn**: new `lessons/j277/lesson-004/learn.html`, about 12 minutes, five short stages (Remember, Learn, Practise, Apply, Check).
- **Print**: existing `lessons/j277/lesson-004/independent.html`, unchanged A3 booklet.

The hub uses shared `assets/hub-navigation.js` with an optional `printHref` only for the tri-modal pilot. Other lessons continue using their current routes until fully adapted. The catch-up version uses centrally maintained `assets/catchup-lesson.js`, `assets/catchup-lesson.css`, and lesson data `data/catchup/j277-004.json`. Do not duplicate layouts or assessment logic in each lesson.

**Mastery contract:**
- 80% is required to show mastery. Count every objectively marked question equally; round the minimum number correct **up**. Lesson 004 has 15 questions, so at least 12 must be correct.
- Students must attempt and check every objective question to be marked as mastered; **unlimited retries**. Changing an answer invalidates its earlier checked result. Never block opening another lesson.
- Auto-check number entry, MCQs, true/false, matching and reordering. Ordering works by drag and drop on mouse and by explicit up/down buttons for touch, keyboard and accessibility.
- One extended written question is self-reviewed using a model answer and checklist; do not pretend a free-text matcher reliably grades nuanced exam responses.
- A small browser-local saved state lets the student resume on that device. No names, accounts, student records or submission to a server are required.
- The short path must retain all **essential taught concepts**, not every classroom explanation, question or repetition. Printed and classroom resources must remain independently usable.
- Visual and touch testing at mobile and desktop widths, and a complete user walkthrough of correct/wrong/retry cases, are required before promoting this pilot across the curriculum.

## Ongoing rule

Fix shared functionality in shared assets, not by copying styles and scripts into individual lesson files. Content changes remain lesson-scoped. Scope new behaviour to a cohort or explicit feature flag until visually checked on both TV/desktop and phone and in print.
