# J277 ↔ H446 classroom UI integration

Updated: 24 October 2026

## Decision
H446 is the approved visual and interaction standard. Both qualifications use the same lesson base/classroom styles and main lesson JavaScript. J277 retains distinct GCSE content, OCR ERL, Code First and examination self-marking.

## Confirmed source architecture
- 164 J277 lesson index pages are present on the `main` branch.
- H446 core: `assets/h446-lesson/lesson-base.css`, `lesson-classroom.css`, `lesson-print.css`, `lesson.js`.
- J277 content is produced through `lessons/j277/autumn1-rebuilt.js`, `autumn2-rebuilt.js` and `h446-adapter.js`, alongside two older standalone pages. Their lesson view loads the shared core assets.
- J277 exam practice/self-marking has an additional module: `assets/j277/youdo-grouped.js` and `youdo-grouped.css`.
- Lesson 113 is a standalone synoptic revision experience with separate layout.
- The J277 grouped You Do module intentionally excludes: 018, 035, 050, 078, 094, 113, 120, 143, 156 and 157. These are not counted as failures; audit their individual purpose separately.

## Implemented in source (24 October)
1. J277 grouped exam practice automatically places long (>155 characters after cleaning), diagram-dependent, higher-mark (7+) and multi-line questions on their own outer You Do screen; concise questions are grouped (target max 3, max 270 characters per group).
2. Mobile (<721px) now shows **one question at a time within each group**, with Previous/Next and count. Existing mobile one-answer-at-a-time marking is preserved.
3. Classroom TV retains groups of three concise questions, but can now split dense questions without shrinking text.
4. Code First stays the first independent task. OCR ERL answers and command-word highlighting remain unchanged.
5. All three J277 lesson generator/adapter entry points and standalone lessons 001/002 now reference the updated J277 module (cache version `20261024-adaptive1`).
6. **No H446 CSS or JavaScript was edited.** This is an incremental J277-specific extension on the existing shared engine.

## Checks completed
- GitHub files re-read after edits.
- JavaScript syntax parsed successfully for all four modified JavaScript files.
- Five entry points updated to reference `20261024-adaptive1`.
- Source inventory and exceptions listed above.

## NOT verified
- No end-to-end browser / deployment test yet.
- No complete question-by-question OCR audit yet.
- No assertion of zero overflow across all 164 J277 lessons.
- No claim of H446 regressions; common assets weren't modified, but a cross-qualification smoke test remains useful.
- Site may serve an older cached entry-point script briefly. Hard refresh/revalidation may be required.

## Test instructions
Use [Classroom TV smoke test](classroom-tv-smoke-test.html) after GitHub Pages updates. Confirm 1920×1080 and 390×844 for representative J277 lesson pages (001, 004, 068, 109, 141, 164) and H446 lesson 068. Manually inspect Code First, marking screens and long diagrams. Where the test reports a limitation, capture the lesson/phase in [issues.csv](issues.csv).

## Next source work
1. Confirm and repair the 10 intentionally excluded J277 special cases where their teaching purpose requires it.
2. Resolve code presentation and diagram clipping that survive adaptive grouping.
3. Build actual OCR specification coverage evidence rather than relying on historical counts.
4. Review specification-wide J277 I Do and We Do interactions using the now-standard shared presentation.
