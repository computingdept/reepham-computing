# J277 published-source reconciliation — first pass (23 October 2026)

**Read-only; source-level audit, not a browser test.** No teaching, stylesheet, Javascript, or H446 edits.

## Sources

- `assets/j277/youdo-grouped.js`
- `assets/h446-lesson/lesson.js`
- `lessons/j277/autumn2-rebuilt.js`, `lessons/j277/autumn1-rebuilt.js`
- `lessons/j277/youdo-five-reviewed-20261022.json`
- `lessons/j277/code-first-master-20261021.json`
- Selected source lessons `autumn2-051,052,053,054,055,056,057,058,059,060,068,096,109,141.json` and 001–003 wrappers / adapter

## Confirmed source-level findings

### P1: separate answer route does not use reviewed questions
`youdo-grouped.js` loads reviewed questions from `youdo-five-reviewed-20261022.json` in normal You Do when an override is present. However, `autumn2-rebuilt.js` `renderAnswers()` generates `answers.html` from `lesson.e`, not the reviewed override. `assets/h446-lesson/lesson.js` adds a direct **“Self-mark You Do answers →”** link to `answers.html` in the Exit phase (and may itself use `answers.html` when preparing missing answers). This is a **confirmed source-path divergence** for the 14 override lessons. Whether the live site currently exposes an inconsistent screen still requires browser verification.

**Affected override keys:** 051–060, 068, 096, 109, 141. Note 141 contains an 8-mark extended response in Q4, which needs separate marking criteria.

### P1: I Do / We Do do not model the code-writing demanded in Q4
The reviewed You Do Q4 in **10 lessons** (051–058, 060, 068) asks learners to **write OCR ERL**, with a `model_code` answer. Inspection of `m.q`, `m.st` and `w` / `wSteps` in representative source entries (051, 055, 057, 058, 068) shows their I Do and We Do mainly model **explaining the terms** rather than **building/tracing the ERL code** required later. The short Code First task is useful, but does not alone establish equivalent, gradual preparation for Q4. Confirm lesson content and diagrams before design changes.

### P2: fallback can re-expose legacy questions
`youdo-grouped.js` catches failures loading lesson data/master and retains the existing lesson layout. This is responsible resilience, but can result in superseded 051–060 generic questions being shown rather than reviewed questions if data loading fails. Confirm offline/network failure behaviour and implement a clear status indicator during the correction phase if warranted.

## Positive or neutral checks
- Reviewed bank has **14 lessons**, most with Q2/Q3/Q4 discrete marks adding to allocations. Lesson 141 Q4 correctly uses a different levels-of-response format.
- Code First master has **154 entries**: 164 lessons minus 10 excluded special/assessment positions. The key list and exclusion set match.
- Quick text-token scan of all Code First model strings found **no obvious C# project/code markers**. This is **not** a grammar or semantics check against OCR ERL.
- The standard grouped layout source constructs one Code First card and one Q2–Q4 group (separate Q4 extended-response screen when applicable); CSS-driven mobile card visibility still needs browser testing.
- Lesson 113 has dedicated custom synoptic HTML, so original `autumn2-113.json` does **not** describe the full published lesson.
- Lesson 003 has a `lesson-003.html` source backing its adapter; lack of large HTML in its wrapper does not indicate absence.

## Verification and teaching-change gates
1. Browser-check 051, 068, 096, 109, 141: grouped You Do self-mark versus Exit-phase answer link, code Q4 models, TV/mobile progression.
2. Audit I Do→We Do→You Do cognitive progression in 051–058, 060 and 068, with OCR ERL modelled programming where needed.
3. Audit content accuracy and award-point distinctness in effective overrides and current Code First models.
4. Audit special lessons 018,035,050,078,094,113,120,143,156,157 separately.
5. Only when the full diagnostic is consolidated, batch fixes and validate; avoid H446/shared CSS changes.

No claim has been made that live desktop/mobile rendering or student navigation was successfully exercised.
