# J277 You Do shared-layout rollout — 22 November 2026

## Scope and source policy

This rollout changes only the **You Do presentation** for compatible J277 classroom lessons. The existing lesson pages, their other seven phases, Code First source material, original questions, original marking answers and original visual data are preserved. There is **no automatic replacement** with unapproved RHS practice-bank questions.

- **146** standard-format entry pages now load the updated shared renderer: Lessons **004–017** and applicable Lessons **019–164**, excluding the protected and special-format lessons listed below.
- Lessons **001–002** already use their own working seven-screen presentation and are not rewritten in this change.
- **Lesson 003** remains an older standalone slide deck, and **Lesson 113** remains a dedicated synoptic revision page. Converting either would require a separate design decision; neither is silently overwritten here.
- The **14 protected assessment/project/feedback/timed lessons** — 018, 035, 036, 050, 078, 079, 094, 095, 120, 121, 143, 144, 156, 157 — are left in their existing presentation.
- Existing ordinary lesson exam-question data has three question/answer pairs. Where a separate previous-learning exam question already exists, use that as the fourth. Otherwise, use a **distinct question and answer from an earlier ordinary lesson**, at most five lessons earlier, without altering the originating lesson. Lesson 019 uses the existing Lesson 017 source as a bridge. If no appropriate existing source is found, keep the original lesson presentation rather than inventing a fourth question.
- Code First and the original question are repeated on the check screen; then four exam questions appear together; then four separate answer screens. The shared compact Code First answer avoids duplicating a full second editor.
- The source renderer accepts both `[4 marks]` and `[4]` mark formats and does not invent a zero-mark label.

## Code and checks

Changed shared implementation files:
- `assets/rhs-youdo/youdo-presentation-20261122-compact.js` (generic J277 activation, mark labels)
- `lessons/j277/autumn1-rebuilt.js` (Autumn 1 source adapter)
- `lessons/j277/autumn2-rebuilt.js` (Autumn 2/Year 11 source adapter)
- `lessons/j277/h446-adapter.js` (Autumn 1 loader cache version only)

Shared layout CSS remains `assets/rhs-youdo/youdo-presentation-20261122-compact.css`; no styling changes were made during this rollout.

Static QA: all four modified JavaScript files passed syntax compilation; a source sample covering cross-term transitions, Year 11, the special Lesson 113 boundary and assessment exclusions returned existing, non-identical question/answer pairs. The diff contains source-only changes, not canonical question-bank edits.

**Not verified:** in-browser deployment for every lesson, projector fit for long questions, full per-question graphic inspection, and independently checked marking across every lesson. Rendering confirmation of Lesson 062 was provided by the teacher before rollout. Any question mentioning an image that lacks a visible prompt-side diagram should be flagged for the subsequent visual QA; do not automatically expose answer SVGs as question images.

## Publication and later CSS work

Question-bank mapping approval and teacher approval remain separate. The 225 mapped RHS practice questions and 66 new gap-filling original drafts are **not enabled** by this change.

Once the classroom layout is visually confirmed in representative lessons, CSS refinements can be performed in the shared stylesheet for these 146 standard-format pages. Existing static Lessons 001–002 and the two special-format lessons do not yet use that same shared stylesheet and should be reviewed separately before claiming a single CSS edit affects absolutely every J277 page.
