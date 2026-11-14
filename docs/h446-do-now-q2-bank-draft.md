# H446 Do Now Q2 – central authoring draft

This branch prepares a central, reviewable Q2 bank. It does **not** publish
different classroom questions. Q1 (previous-lesson True/False) and Q3–Q4
are unchanged.

## Agreed Q2 rule

- One 2×2 multiple-choice question with four distinct options.
- Use **four distinct, one-word answer choices**, suitable for the 2×2 grid.
- Retrieve a lesson taught earlier than Q1's immediately previous lesson.
- Keep the lesson source, correct choice and short explanation with the question.
- Course/year-entry diagnostics are explicitly identified.

## What is preserved

Every one of the 300 H446 lesson records retains:

- The original source lesson file.
- The original authored Q2 and model answer, including the effective text for
  questions amended by the shared H446 script.
- A previously displayed "taught in Lxxx" label wherever one actually exists.

The old lesson reference is **not asserted as verified** merely because it was
displayed. In particular, some existing Q2 references point to the immediately
preceding lesson. Those entries must be replaced with an earlier-learning
source before publication.

## Review and completion

Every one of the **300 lessons** now has a complete, short MCQ draft. They are
**not teacher-approved or published**. The new source links are curriculum-
mapped **proposals**, not verified claims; the legacy source labels are kept
separately with the original questions, and are not treated as proof of when a
concept was first taught. L001 and L002 are explicit GCSE-entry diagnostics.

Questions are drawn from 202 source-linked prompts and rotated across the
course so that the exact question does not repeat within eight lessons.
The bank is a reviewable *authored set*, not a live random-question generator.

For each entry before publication:

1. Confirm the source was taught before the current lesson, and is not the
   immediately previous lesson.
2. Write a short stem and four plausible choices, one unambiguous answer.
3. Explain the correct answer and check any distractor misconceptions.
4. Confirm the source reference against the teaching sequence.
5. Mark the row as teacher-approved before a separate classroom rollout.

The JSON bank is in `data/do-now/q2-drafts/h446.json`. To create the draft
bank afresh from the preserved lesson source, then author the two batches:

```sh
node scripts/do-now/build-h446-q2-drafts.cjs
node scripts/do-now/author-h446-q2-batch1.cjs
node scripts/do-now/author-h446-q2-remaining.cjs
```

These authoring scripts reset/rewrite unapproved entries and should **not** be
run over later teacher-approved edits. Review decisions stay in GitHub, not
on public lesson pages. A separate, controlled classroom rollout is required
after approval and visual regression checks against J277 and H446 Q1–Q4.
