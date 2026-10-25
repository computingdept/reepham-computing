# J277 Code First — optional trace table pilot (Lesson 057)

**25 October 2026.** Stage-based Code First metadata mapping is already complete for 154 activities; this pilot does not reopen that audit.

## Agreed rule

- **Predict**: work out likely output.
- **Write**: enter/complete OCR ERL.
- **Test**: choose input, dry-run using a trace table, or run the program.
- **Iterate**: debug/refine code based on a check.

Trace tables should be **selective**, used when they aid variable-state tracking (selection, iteration, arrays, searches, sorts, debugging). They are not added mechanically to all 154 lessons.

## Pilot

- **Lesson 057 — FOR loops**: after the approved, untouched Code First task (“Fill the loop end value so ‘Back up’ prints three times”), offer a collapsed **TEST · Optional blank trace table**. Columns: loop pass, `attempt`, printed message. Four entirely blank rows allow pupils to decide how many iterations execute; the fourth is intentionally spare.
- The teacher's model remains in the existing answer flow, **not** in the table or underneath the question.
- The stage indicator SVG's Test caption is now “**Trace or run**”; the task's primary `focus_stage` is unchanged (**write**).
- Assets: `assets/j277/code-first-trace.css` (scoped), `assets/j277/code-first-cycle.svg` (caption only), `lessons/j277/autumn2-rebuilt.js` (only the Lesson 057 trace panel), `lessons/j277/lesson-057/index.html` (version refresh).
- No changes to other lesson Code First tasks, exam questions, or answers.
- QA smoke tests check the table is optional, initially collapsed, and unsolved.

## Pending

Visual check at **1920×1080** and **390×844**; confirm the Code First question remains first and legible, the table can expand without clipping, and students do not see marking prematurely. Extend to other genuinely traceable lessons only after teacher review.
