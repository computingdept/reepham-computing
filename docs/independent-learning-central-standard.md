# Independent lesson: central code and print contract

**Status:** J277 Lessons 001, 003 and 004 migrated 28 October 2026.
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

For **Lessons 001, 003 and 004**, check both B&W and colour, four on-screen pages, step navigation, completed answer areas and three true/false Exit Ticket questions (where authored), working print/save, paper imposition, and no overflow or overlapping content on A3 preview. Confirm the classroom lesson retains its existing phase navigation and mobile gestures.

Static migration test on 28 October 2026: three lessons' original HTML content matched the pre-refactor versions after replacing central resource links with their extracted original code and restoring the former inline print button attribute. The shared base CSS, print CSS and original print JavaScript were moved without changing their rules or algorithms. **Live browser and paper visual rendering must still be verified separately.**

## Ongoing rule

Fix shared functionality in shared assets, not by copying styles and scripts into individual lesson files. Content changes remain lesson-scoped. Scope new behaviour to a cohort or explicit feature flag until visually checked on both TV/desktop and phone and in print.
