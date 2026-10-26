# Shared revision interface — OCR J277 and H446

The GCSE J277 and A Level H446 revision systems use the same **presentation layer** while preserving separate qualification content, lesson links, guide-page maps, saved data and exam requirements.

## Single-source UI files

- `revision-ui.css` — shared green palette, compact Paper 1 / Paper 2 topic tiles, mobile/desktop layouts, OCR sub-point groups, mastery display, and question–explanation–Next sequence.
- `revision-ui.js` — small, non-scoring enhancement for grouping existing skill cards, displaying `best` mastery separately from `latest` scores, and placing the existing Next button *after* feedback. It does not alter question banks, score thresholds, responses or browser storage.
- Both `h446-hub.html` and `j277-hub.html` use the same `rhsc-practice-*` classes from the shared stylesheet.
- All 11 J277 and nine main H446 quiz-section HTML files load these two shared files. Each quiz page passes its own existing localStorage key with `data-progress-key`.

## Legacy compatibility

The older `revision/h446/section-*/style.css` files and `revision/j277/shared/style.css` remain in place for the moment because several H446 sub-sections have specialised activity layouts and CSS rules. The shared stylesheet loads *after* those files and centrally owns all **new** UI behaviour and styling. Do not copy new shared rules back into individual section stylesheets. Consolidating older, course-specific CSS is a separate task after visual parity has been verified.

## Safe change process

1. Make common presentation changes in `revision/shared/revision-ui.css`.
2. Make common interface-only enhancements in `revision/shared/revision-ui.js`.
3. Keep OCR question content, H446/J277 marking, masteries, storage keys, lesson mappings and revision-guide pointers in their existing course-specific files.
4. Run `qa/master-audit-2026/j277-revision-mcq-regression.cjs` through the **Shared J277 and H446 Revision Hub regression** workflow. It covers both qualification hubs, all active standard quiz sections, phone and classroom-TV layouts, answer checking, feedback order and saved GCSE scores.

This staged approach deliberately avoids rewriting H446's specialised answer types or its revision-guide mappings.
