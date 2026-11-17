# Lesson phase safeguards — Trust rollout

The classroom sequence is **Do Now → Objectives → New Learning → I Do → We Do →
You Do → Key Vocabulary → Exit Ticket**. A request to edit one phase must not
silently rewrite another. Changes to shared rendering code need explicit review.

## What the CI gate enforces

1. `scripts/quality/check-lesson-phase-changes.cjs` compares each changed H446
   and J277 lesson page against the Git base. It extracts complete phase sections,
   including nested markup, and reports `shell` for changed navigation/metadata
   outside the sections. Generated J277 lesson wrappers have no inline phases,
   so their HTML edits are treated conservatively as `shell` changes.
2. PR authors must declare permitted changes in the PR description, for example:

   `Phase-Scope: h446/219=i-do,we-do; shared/h446=engine`

   Multiple changed lessons can appear on the same line, separated by semicolons.
   In direct push commit messages use the same `Phase-Scope:` line. The CI check
   fails when the observed changes exceed the declared scope. New lessons and
   deletions must be explicitly declared as `new-lesson` or `delete-lesson`.
3. Edits to the shared H446 classroom renderer and H446 mind-map renderer need
   `shared/h446=engine`. The central J277 Autumn 2 renderer needs
   `shared/j277=engine`. Shared H446/J277 classroom CSS changes need
   `shared/h446=style` or `shared/j277=style`. Shared styling still requires
   visual QA; this source-level check cannot prove the absence of visual regressions.
4. Do Now tests verify the previous-lesson Q1, earlier-learning Q2 and reviewed
   Q3/Q4 origins. A dedicated spacing test blocks **new** Q3-only-previous or
   Q3-and-Q4-both-previous source patterns. Pre-existing exceptions are listed
   in `data/do-now/h446-spacing-exceptions.json` for staged teacher review;
   adding to this registry must be a deliberate, reviewed decision.

The gate **does not** automatically change lesson questions, answers, other
phases, catch-up pages or print materials.

## How to activate enforcement

The workflow runs on PRs and main pushes. **To prevent publication** of failing
changes, a repository administrator must set branch protection/rulesets on
`main` to require the `lesson-safety` check and disallow bypass/direct pushes.
Without that rule a failed push check reports a problem **after** the code has
already reached main. This is especially important for a Trust-wide deployment.

## Local verification

```bash
node --test tests/lesson-phase-guard.test.cjs tests/h446-do-now-spacing-guard.test.cjs
node scripts/quality/check-lesson-phase-changes.cjs --base BASE_SHA --head HEAD_SHA
```

To compare a known historical Lesson 219 edit, the guard should report I Do,
We Do, You Do, Exit Ticket and any shell changes. A scope declaring only I Do
and We Do must fail.
