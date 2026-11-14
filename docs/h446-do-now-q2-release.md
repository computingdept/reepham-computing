# H446 Do Now Q2 — publication record

This file records the teacher-approved delivery rule in GitHub. It is not a student-facing page.

## Scope

- Central data: `data/do-now/q2-published/h446.json` — one question for every H446 lesson (300).
- Question 2 retrieves an **earlier taught lesson**, excluding the immediately preceding lesson.
- Four distinct, one-token choices (A–D), displayed in a two-by-two grid.
- Each entry records the original taught-in lesson and a separate answer explanation.
- L001 and L002 use prior-GCSE diagnostic knowledge because no earlier H446 lessons exist.
- Standard lesson renderer covers 298 lessons; L036 and L037 use the separate mind-map renderer but load the same bank.

## Boundaries and fallback

- Q1 remains True/False from the immediately previous lesson. Q3 and Q4 remain unchanged.
- J277, KS3, navigation, lesson order, print, and skills pages are unchanged by this release.
- Only Q2 and its answer panel are replaced. A failed/missing bank leaves the authored Q2 usable.
- A teacher may append `?h446-q2-original=1` to temporarily inspect the authored Q2.
- Updates belong in the central bank; avoid lesson-specific Q2 patches.

## Verification

- `node --test tests/h446-q2-published.test.cjs`: 300 entries, one-word choices, earlier taught-in sources, both renderer variants.
- `node --check` on the two affected JavaScript renderers.
- Projector and narrow-layout visual QA of the standard renderer before promotion.
- Release must be checked on actual rhsccs.org pages after GitHub Pages deploys.

The draft source-evidence audit lives in `docs/h446-do-now-q2-source-audit.md` on the teacher-review branch. Source keyword matches are not a substitute for teacher QA of each question.
