# I Do and We Do — teacher-controlled first-step reveal

**Teacher decision:** approved 25 October 2026, extending the H446 phase-presentation baseline to J277.

## Teaching behaviour

1. On opening I Do or We Do, keep the problem, starting diagram or code reference visible in the reference panel.
2. Keep **all** `.ido-step` / `.wedo-step` worked or guided stages hidden initially, including Step 1.
3. Continue is labelled **Reveal Step 1 →** until the teacher elects to show Step 1.
4. Continue advances one stage at a time. Each subsequent example opens with all of its steps concealed.
5. Previous moves back one revealed step and, when Step 1 is showing, hides it again before leaving the phase.
6. On re-entering the phase, reset to the initial problem-only state.
7. Do not hide You Do questions or change assessment/self-marking navigation.

## Source implementation

- `assets/h446-lesson/lesson.js`: shared first-step visibility, Continue labels and Previous state for standard `.ido-example > .ido-step` and `.wedo-example > .wedo-step`-style step decks (nested descendants supported).
- Updated versioned script references in J277 Lessons 001/002, H446 Lessons 001/181, and J277 generator/adapter files.
- H446 Lesson 181: separate diagram-sync fix hides SVG solution rows while no worked step is visible; previously the first row could reveal an answer immediately.
- `qa/master-audit-2026/classroom-tv-smoke-test.html`: automated on-site check tests hidden Step 1, first reveal, Previous hiding, Step 2, and next-example reset.

## Known limits

- The shared update affects pages that load the current `lesson.js` source; unrefreshed HTML pages may still use cached copies while their older `?v=` URL is cached.
- Alternative lesson layouts based on `.model-stage` or bespoke markup are not changed automatically because their first stage may contain the problem itself.
- Some `.ido-reference` / `.wedo-reference` diagrams may contain results or stepwise answers *inside the reference*. They require a separate content-level answer-leak audit; hiding `.ido-step` alone cannot conceal answers embedded in independent SVG or code.
- No automatic real-browser verification has been run here. Inspect 1920×1080 Classroom TV and 390×844 mobile and run on-site regression checks before assigning 'Verified'.

## Review samples

- [J277 Lesson 002 · I Do](https://rhsccs.org/lessons/j277/lesson-002/index.html#i-do)
- [J277 Lesson 002 · We Do](https://rhsccs.org/lessons/j277/lesson-002/index.html#we-do)
- [H446 Lesson 001 · I Do](https://rhsccs.org/lessons/h446/lesson-001/index.html#i-do)
- [H446 Lesson 001 · We Do](https://rhsccs.org/lessons/h446/lesson-001/index.html#we-do)
- [H446 Lesson 181 · I Do](https://rhsccs.org/lessons/h446/lesson-181/index.html#i-do)
- [QA smoke test](https://rhsccs.org/qa/master-audit-2026/classroom-tv-smoke-test.html)

## Follow-up source audit — 25 October
- Independently re-read current shared lesson JS: entering I Do calls resetModelSteps on each .ido-example's .ido-step descendants; We Do likewise resets .wedo-step descendants. The Continue label is explicitly "Reveal Step 1" when no step is visible.
- Representative source inventories: J277 Lesson 002 has 6 .ido-step and 16 .wedo-step class appearances; H446 Lesson 001 has 6 and 20; H446 Lesson 181 has 6 and 6. This is a count of markup references, not a total number of distinct worked stages.
- The H446/J277 shared engine URL on J277 002 and H446 001/181 may have differing query-version tokens; this is a cache-validation concern rather than evidence of broken logic.
- No automatic content changes applied: must not erase diagrams or cover results until an actual premature-answer element has been identified.
- **Still outstanding**: browser check of Step 1 initially concealed, reference graphics not showing answers, 1920x1080 and 390x844 presentation and Previous behaviour in samples.
