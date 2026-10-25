# J277 Code First visual rollout — 25 October 2026

## Source implementation
- Introduced `assets/j277/code-first-rollout.js` and scoped `code-first-rollout.css`.
- Shared lesson engine conditionally loads the module on J277 lesson paths only. H446 is untouched by the module.
- Refreshed shared-engine URL in both generated J277 lesson implementations and direct Lessons 001/002.
- Master bank: 154 entries, each with one authored focus_stage (37 Predict, 95 Write, 2 Test, 20 Iterate); no changes to the bank's student tasks, starter code, model answers or outputs.
- SVG shows all four connected stages, highlighting the current authored focus_stage; concise stage-specific learning reason beneath. J277 Code First is still the first You Do activity.
- Assessment/special lesson exceptions remain unchanged: 018, 035, 050, 078, 094, 113, 120, 143, 156, 157.

## Trace tables
- Existing Lesson 057 pilot remains unchanged.
- Added conservative selective expansion for lesson 059 and 080 only (single loop plus demonstrable self-updating variable). Generated tables are optional/collapsed and completely blank, with a state variable column and five blank observation rows. This is not a model answer.
- No trace is forced on nontrivial nesting or tasks lacking genuine changing program state.
- Trace selection is code-pattern based, not pedagogical certification. Check 059/080 in live lesson before wider selective use.

## Verification
- GitHub create/update operations returned commit SHAs for both new modules, shared engine, and 4 refreshed J277 entry points.
- 154 master entries and stage metadata counted directly from current GitHub source.
- **Not verified:** live DOM execution, actual GitHub Pages release, browser visuals at 1920×1080 and 390×844, lesson-by-lesson rendered cycle and trace expansion. A local attempt to retrieve public source for Node syntax checking failed due to environment DNS, so do not claim automated JavaScript syntax verification.
- Check sample lessons 001, 002, 057, 059, 080, 096, 124, 164; verify that no cycle or trace appears on reserved exceptions, and that examination answers remain separate.

## Follow-up QA, 25 October
- Inspected the current master tasks: 059 and 080 both have a single FOR loop updating an accumulator and are sensible optional trace-table examples. Lesson 057 retains its existing special blank table.
- Confirmed the 154 original stage classifications are unchanged; the cycle shows one focus at a time.
- Inspected current SVG after label repair: shared label font is now 29px; PREDICT and ITERATE text positions were adjusted, and versioned SVG requests refreshed.
- Refreshed cached generator references in lessons 059, 080, 096, 124 and 164, representing Predict, Iterate, Test, and Write. These are QA examples; the remaining wrappers may still serve cached old generator scripts until revalidation.
- Attempted live page and asset checks through web retrieval, but rhsccs.org was inaccessible from this environment. Real browser testing remains outstanding.
- Verified static source references only. Do not report full 154 live lessons visually verified.
