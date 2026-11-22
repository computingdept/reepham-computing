# J277 — Universal shared You Do preview adapter

**22 November 2026.** Shared JS and CSS, one visual implementation; lessons only supply source data. Nothing in this change constitutes teacher content approval.

## Reuse

- Shared renderer: `assets/rhs-youdo/youdo-presentation.js`
- Shared styles: `assets/rhs-youdo/youdo-presentation.css` (unchanged)
- Existing lesson data adapter: `lessons/j277/autumn2-rebuilt.js` (modifies only the preview renderer selection)
- Preview query parameter: `?youdo-trial=1#you-do`. Without this parameter the **original live You Do** is unchanged.

For ordinary lessons with **four existing question/answer pairs**, show four. For ordinary lessons with **three existing questions and an existing `priorExam` question with answer**, show previous learning + three questions, making four. Lesson 031 retains its earlier explicit, unapproved fourth question in the preview so the teacher can compare its existing pilot. If four source pairs are **not available**, keep the original You Do; **do not invent, duplicate, auto-approve or silently substitute** questions.

The shared renderer handles the seven screens identically across lessons: Code First → original prompt/code and answer → 2×2 four-question screen → four individual questions with worked marking answers. The same CSS controls all visuals.

## Safeguards and exceptions

- No preview on the 14 protected J277 lesson IDs: `018,035,036,050,078,079,094,095,120,121,143,144,156,157`. Existing `isAssessment` and exam-pilot modes are also excluded.
- All preview question/answer text comes from existing lesson source, apart from the previously identified Lesson 031 editorial draft; no bank map or student publication flags changed.
- Every preview explicitly says **UNAPPROVED LESSON PREVIEW**; answer pages say **PREVIEW · SELF-MARK**.
- `#you-do` only. Do Now, Objectives, New Learning, I Do, We Do, Vocabulary, Exit Ticket, H446, other navigation and Cloudflare are unchanged.
- A preview link is **not** a teacher-only access control: anyone with the link could see it. Do not present it as an approved student lesson.
- Still required: browser/projector/mobile QA, mark-scheme checks and independent validation of questions. **Do not switch the preview on by default until the teacher approves the content and deployment.**

## Sample preview lesson URLs after merge and site deployment

- [Lesson 031 — Network Attacks](https://rhsccs.org/lessons/j277/lesson-031/index.html?youdo-trial=1#you-do)
- [Lesson 040 — Software utilities](https://rhsccs.org/lessons/j277/lesson-040/index.html?youdo-trial=1#you-do)
- [Lesson 062 — Programming challenge](https://rhsccs.org/lessons/j277/lesson-062/index.html?youdo-trial=1#you-do)

These are test entry points, not claims that an external deployed browser has been inspected.
