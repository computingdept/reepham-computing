# H446 Do Now Q2 – central authoring draft

This branch prepares a central, reviewable Q2 bank. It does **not** publish
different classroom questions. Q1 (previous-lesson True/False) and Q3–Q4
are unchanged.

## Agreed Q2 rule

- One 2×2 multiple-choice question with four distinct options.
- Prefer a **one-word answer choice** wherever this does not distort a
  technical term.
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

The seven example MCQs demonstrate the short 2×2 style. The remaining entries
are authoring slots, not published MCQs. The legacy source labels are missing
for many lessons and are left clearly marked for curriculum mapping rather
than invented.

For each entry before publication:

1. Confirm the source was taught before the current lesson, and is not the
   immediately previous lesson.
2. Write a short stem and four plausible choices, one unambiguous answer.
3. Explain the correct answer and check any distractor misconceptions.
4. Confirm the source reference against the teaching sequence.
5. Mark the row as teacher-approved before a separate classroom rollout.

The JSON bank is in `data/do-now/q2-drafts/h446.json`. Regenerate it from
the preserved lesson source with:

```sh
node scripts/do-now/build-h446-q2-drafts.cjs
```

This generator seeds only seven worked examples. Once further items are
reviewed, they should be retained in an independently edited bank rather than
regenerated over teacher-approved content.
