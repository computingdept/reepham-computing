# J277 You Do and answers.html route verification — source-level (23 October 2026)

**Read-only QA.** This report distinguishes a confirmed source-path error from actual browser execution, which could not be verified in the current environment.

## Evidence and conclusion

**Confirmed source-level inconsistency:** all 14 entries of `lessons/j277/youdo-five-reviewed-20261022.json` replace all three original questions (Q2, Q3, Q4) in their respective `autumn2-NNN.json` sources. There are **42 differing question pairs out of 42**. The reviewed prompt, marks and mark scheme are used in the normal J277 grouped You Do route, but the standalone `answers.html` generator still uses original lesson questions and answers. The shared lesson JS also creates an exit-page link to `answers.html` for J277.

The exact comparison is in [j277-reviewed-vs-original-42-question-comparison-20261023.csv](j277-reviewed-vs-original-42-question-comparison-20261023.csv).

### Evidence chain
1. `assets/j277/youdo-grouped.js` loads `youdo-five-reviewed-20261022.json` and uses `(p && p.questions) || lesson.e` to construct grouped question cards and marking screens.
2. `lessons/j277/autumn2-rebuilt.js` renders `answers.html` with `lesson.e.map(a=>a[0])` and `lesson.e.map(a=>a[1])`, with **no reviewed override lookup** in `renderAnswers`.
3. At least the sampled `lesson-051/answers.html`, `lesson-068/answers.html`, `lesson-096/answers.html`, `lesson-109/answers.html`, and `lesson-141/answers.html` wrappers explicitly call `J277Autumn2.render("NNN","answers")`.
4. `assets/h446-lesson/lesson.js` adds **“Self-mark You Do answers →”** pointing to `answers.html` during initialization. The exception that skips this link applies to H446 grouped marking only, not J277.
5. Lesson 141's reviewed Q4 is an eight-mark extended response; its original lesson.e Q4 is a four-mark impacts prompt, particularly serious if pupils follow the separate answer link.

### Affected lessons
051, 052, 053, 054, 055, 056, 057, 058, 059, 060, 068, 096, 109, 141.

### Practical impact if these sources run as authored
- In-lesson revised practice and grouped on-screen marking can be internally consistent.
- The **separate answer booklet/exit-page self-mark link is inconsistent** for all 14 overrides; the original question model is not the answer to the revised question.
- Browser testing is needed for actual runtime, navigation, CSS and caching. The public website could not be loaded through available web access; no browser-visible result is claimed.

## Recommended eventual fix (not applied)
Treat the reviewed question bank as a **single authoritative source** for both grouped self-marking and the generated `answers.html` page. Maintain fallback behavior that clearly flags missing override data rather than silently switching to obsolete exam content. Do not patch every outdated original model first. Verify the special 8-mark Lesson 141 answer separately and keep Code First's model in OCR ERL.

## Test cases after a future correction
- Check revised Q2–Q4 text and corresponding marking in lesson 051 (including OCR ERL Q4) and 068 (2D array model).
- Check 096 RAM/ROM, 109 search tracing, 141 Q4 eight-mark levels-of-response.
- Check 1920×1080 Classroom TV and ~390×844 mobile, next/reveal/self-mark/vocabulary navigation, and exit-page answers link in a real browser.
- Check a non-override control (e.g. 097) to confirm its questions still match old source data.

**No teaching or runtime files changed, and H446 remains untouched.**
