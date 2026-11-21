# J277 You Do — source-of-truth and publishing workflow

**Status: mapping foundation only. Not a live lesson release.** Updated 21 November 2026.

## Read these files before changing J277 You Do

1. [Lesson-to-question-and-visual map](../data/exam-questions/j277-youdo-lesson-map.json) — **primary mapping reference**.
2. [RHS practice-question bank](../data/exam-questions/j277-rhs-practice-drafts.csv) — independent question text, OCR attribution/reference, marking points, marking rule, draft/review flags.
3. [Original OCR question catalogue](../data/exam-questions/j277-questions.csv) — source-paper cross-reference; do not copy protected question pages.
4. [Existing visual lesson crosswalk](../data/exam-questions/j277-svg-lesson-map.csv) and the actual SVGs in existing J277 lessons.
5. [Code First master](../lessons/j277/code-first-master-20261021.json).
6. [Question and marking verification](../data/exam-questions/RHS-J277-ANSWER-VERIFICATION.md).

The JSON mapping has **one record for each of 164 lessons**, with each record containing selected `rhs_question_id` references, candidate visual decisions, review status and an explicit publication flag. The map intentionally stores **IDs instead of duplicating question text or answers**, which must always come from the referenced bank at use time.

### Approved presentation contract

For each ordinary J277 lesson, the **You Do phase only** follows seven screens:

1. Code First task.
2. Code First answer immediately after pressing Next — **repeat the original question and starter code at the top, with the answer immediately below**. For a Predict task show the output (e.g. `11`); for a Write task show the required code instruction (e.g. `print(value)`). Do **not** display additional worked-example panels, repeated Predict/Change/Build steps or unrelated SVGs here. Preserve the full authored explanation in source answer data.
3. Exactly four independent exam questions **on one screen**.
4. The corresponding worked/marking answer to Q1 **on its own full screen** (with its original appropriate answer SVG, if available).
5. The corresponding worked/marking answer to Q2 on its own full screen.
6. The corresponding worked/marking answer to Q3 on its own full screen.
7. The corresponding worked/marking answer to Q4 on its own full screen.

Projector fit, readable text, a 2×2 grid for the four questions, a separate projector-sized answer page for each question, mobile stacking and accessible question/answer SVG pairs are part of the acceptance test. On every exam-answer screen, the answer SVG and explanation must START AT THE TOP directly beneath the header, not be vertically centred in the remaining page space. Do not return to four answers on one screen. The current common presentation files are `assets/j277/youdo-unified.js` and `assets/j277/youdo-unified.css`. Other live handlers still exist; inspect their actual precedence before any rollout.

### Matching content to an illustration

The **RHS-authored question and verified answer points** supply the proposed replacement question and marking guidance; the existing lesson's authored diagram is a **candidate visual source**, not automatically correct for a new scenario.

- **Reuse** only when numbers, labels, conditions and student/answer separation genuinely match.
- **Adapt** and redraw values where the visual structure is useful but the question differs.
- **New visual/table** when no original fits; do not create an answer-bearing student prompt.
- **None** when the question needs no figure.

Every visual needs source comparison, projector/mobile review and teacher approval. Never silently pair an old SVG that contains a different number or gives away an answer.

### Approval and publishing gates

- **Mapping is not publication.** As of 21 November, 001–003 have **candidate question selections only**; 004–164 are **unmapped**. Every lesson has `published_bank_override_enabled: false` and `teacher_approved: false`. Do not flip these simply because the code works.
- The bank has **225 RHS-authored question parts with reviewed marking points**, but its own documentation says that **all question texts still require final originality/classroom checks**. Answer verification does not equal final publication approval.
- Before enabling a bank override, verify exactly four question IDs, source eligibility, specification/lesson fit, accurate marks and accepted answers, visual correspondence, spacing and teacher sign-off.
- **Never delete** the legacy embedded question, answer, or SVG when switching the presentation. Keep fallbacks until the replacement is inspected.
- Existing assessment/timed-practice exceptions must remain protected and explicitly reviewed before modification.
- Change **only `#you-do`** (and J277-specific adapters/loaders where unavoidable). No modifications to Do Now, Objectives, New Learning, I Do, We Do, Vocabulary, Exit Ticket, H446, the shared navigation engine or Cloudflare login/scoring.
- Compare all seven other phase fragments before and after each change and test navigation in the deployed browser. A passing source/DOM simulation alone is **not** visual QA or permission to publish.
- Four exam questions (and four separate answer screens) for each of 164 lessons would mean **656 lesson slots**, more than 225 unique bank parts. Do not assume a unique approved question for every slot, duplicate questions thoughtlessly, or invent extra RHS bank entries to fill the map. Reuse/rotation and any new authored items require deliberate editorial decisions.

### For the next implementation turn

**Before doing anything:** open `data/exam-questions/j277-youdo-lesson-map.json`, inspect the relevant lesson row and its linked bank records, then state which questions and visuals are approved and which are still pending. Update this map and its review state **before** changing a lesson's live exam-bank overrides. No new ad-hoc question selection in `youdo-unified.js`.

This document and `AGENTS.md` preserve the rules in the repository instead of relying on chat memory.
