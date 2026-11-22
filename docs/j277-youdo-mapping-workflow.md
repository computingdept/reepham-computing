# J277 You Do — source-of-truth and publishing workflow

**Status: all 164 lessons processed; gap completion underway in draft review, with no live bank overrides enabled.** Updated 22 November 2026.

## Read these files before changing J277 You Do

1. [Lesson-to-question-and-visual map](../data/exam-questions/j277-youdo-lesson-map.json) — **primary mapping reference**.
2. [RHS practice-question bank](../data/exam-questions/j277-rhs-practice-drafts.csv) — independent question text, OCR attribution/reference, marking points, marking rule, draft/review flags.
3. [Original OCR question catalogue](../data/exam-questions/j277-questions.csv) — source-paper cross-reference; do not copy protected question pages.
4. [Existing visual lesson crosswalk](../data/exam-questions/j277-svg-lesson-map.csv) and the actual SVGs in existing J277 lessons.
5. [Code First master](../lessons/j277/code-first-master-20261021.json).
6. [Question and marking verification](../data/exam-questions/RHS-J277-ANSWER-VERIFICATION.md).

The JSON mapping has **one record for each of 164 lessons**, with each record containing selected `rhs_question_id` references, candidate visual decisions, review status and an explicit publication flag.

[Read the complete 001–020 candidate question and mark-scheme review](j277-youdo-content-review-001-020.md) before approving any first-batch content. If the RHS bank lacks enough appropriate questions for a lesson, use a named original lesson-question fallback (with its original source index) and flag the coverage gap instead of inventing or silently repeating questions. The map intentionally stores **IDs instead of duplicating question text or answers**, which must always come from the referenced bank at use time.

### Approved presentation contract

For each ordinary J277 lesson, the **You Do phase only** follows seven screens:

1. Code First task.
2. Code First answer immediately after pressing Next — **repeat the original question and starter code at the top, with the answer immediately below**. For a Predict task show the output (e.g. `11`); for a Write task show the required code instruction (e.g. `print(value)`). Do **not** display additional worked-example panels, repeated Predict/Change/Build steps or unrelated SVGs here. Preserve the full authored explanation in source answer data.
3. Exactly four independent exam questions **on one screen**.
4. The corresponding worked/marking answer to Q1 **on its own full screen** (with its original appropriate answer SVG, if available).
5. The corresponding worked/marking answer to Q2 on its own full screen.
6. The corresponding worked/marking answer to Q3 on its own full screen.
7. The corresponding worked/marking answer to Q4 on its own full screen.

Projector fit, readable text, a 2×2 grid for the four questions, a separate projector-sized answer page for each question, mobile stacking and accessible question/answer SVG pairs are part of the acceptance test. **Question SVGs must fill enough of their 2×2 cards to make embedded values and labels readable from a classroom projector**; avoid tiny height caps and do not shrink figures merely to leave blank space. On every exam-answer screen, the answer SVG and explanation must START AT THE TOP directly beneath the header, not be vertically centred in the remaining page space. Do not return to four answers on one screen. The current common presentation files are `assets/j277/youdo-unified.js` and `assets/j277/youdo-unified.css`. Other live handlers still exist; inspect their actual precedence before any rollout.

### Matching content to an illustration

The **RHS-authored question and verified answer points** supply the proposed replacement question and marking guidance; the existing lesson's authored diagram is a **candidate visual source**, not automatically correct for a new scenario.

- **Reuse** only when numbers, labels, conditions and student/answer separation genuinely match.
- **Never include hidden worked-answer SVGs on the student question screen.** The shared lesson controller can append a `.youdo-solution` to an original question card before the You Do renderer runs. Select question artwork outside `.youdo-solution`, `.solution-card` and `.answer-card`; source answer SVGs remain for their separate answer pages.
- **Adapt** and redraw values where the visual structure is useful but the question differs.
- **New visual/table** when no original fits; do not create an answer-bearing student prompt.
- **None** when the question needs no figure.

Every visual needs source comparison, projector/mobile review and teacher approval. Never silently pair an old SVG that contains a different number or gives away an answer.

[Read the 021–040 question and marking review](j277-youdo-content-review-021-040.md). This second pass deliberately records bank shortfalls rather than assigning mismatched or duplicate questions. Lessons 035 and 036 are held as assessment/reteaching exceptions; neither has a four-question override proposal.

[Read the 021–040 original lesson fallback audit](j277-youdo-original-fallback-review-021-040.md) and [041–060 question review](j277-youdo-content-review-041-060.md). The latest draft has 27 source-linked original fallback entries for 021–040, leaving three gaps; 041–060 has 29 further unique RHS bank candidate IDs, with remaining slots awaiting original-source audit. Lesson 050 is an assessment exception. These are review candidates only.

[Original source fallback audit for Lessons 041–050](j277-youdo-original-fallback-review-041-050.md), [original fallback audit for 051–060](j277-youdo-original-fallback-review-051-060.md), and [RHS candidate review for 061–080](j277-youdo-content-review-061-080.md) are the next review records. 041–060 has 41 original fallbacks recorded and 3 unanswered ordinary slots. 061–080 maps 30 additional unique RHS bank candidates, leaving 42 ordinary slots awaiting fallback inspection; 078 and 079 remain protected project/feedback exceptions. These are *not approvals*.

[Original question fallback review 061–070](j277-youdo-original-fallback-review-061-070.md), [fallback review 071–080](j277-youdo-original-fallback-review-071-080.md), and [RHS question review 081–100](j277-youdo-content-review-081-100.md) are the latest unpublished review records. 061–080 adds 36 source-linked fallbacks, with six slots still needing suitable content. 081–100 maps 34 additional unique RHS bank parts and leaves 38 ordinary slots awaiting fallback inspection. Lessons 094 and 095 are protected assessment/bridge exceptions. All question wording, answers, original visual suitability and originality checks remain subject to teacher approval.

[Original question fallback audit 081–100](j277-youdo-original-fallback-review-081-100.md) and [bank candidate review 101–120](j277-youdo-content-review-101-120.md) are the latest unpublished review records. The 081–100 audit added 34 source-linked original exam question/answer pairs and leaves 4 ordinary slots without source-backed content. Lessons 101–120 have seven additional unique RHS bank candidates, leaving 69 ordinary question slots for original fallback inspection; Lesson 120 AP1 stays protected. Only eight unused bank records remain, so do not fill gaps by repeating source questions silently. All teacher approval and student display flags remain false.

[Original fallbacks 101–110](j277-youdo-original-fallback-review-101-110.md), [original fallbacks 111–120](j277-youdo-original-fallback-review-111-120.md), and [RHS candidate review 121–140](j277-youdo-content-review-121-140.md) are the latest teacher-review records. The 101–120 fallback audit added 53 original question/answer pairs, with 16 unfilled ordinary slots remaining. The 121–140 review adds four unique RHS candidates, leaving 72 ordinary slots awaiting source-backed fallback inspection; Lesson 121 assessment feedback stays protected. Only four unused bank records remain. None of this content has been approved for student display.

[Original fallbacks 121–130](j277-youdo-original-fallback-review-121-130.md), [original fallbacks 131–140](j277-youdo-original-fallback-review-131-140.md), [141–152 review](j277-youdo-content-review-141-152.md), and [153–164 review](j277-youdo-content-review-153-164.md) complete the source-first inventory. The 121–140 audit adds 56 original question/answer pairs with 16 slots still unfilled. The final 141–164 review adds 58 original pairs plus four RHS bank items; 18 slots remain unfilled. Assessment/feedback/timed lessons 143, 144, 156 and 157 are protected.

**Full map audit (22 November 2026):** 164 lesson records; 14 protected assessment/project/feedback/timed exceptions; 84 ordinary lessons have four proposal slots, and 70 ordinary question positions remain unfilled across the inventory. All 225 distinct RHS bank IDs are mapped once, with no duplicates; this count does **not** imply 225 teacher-approved questions or an approved four-question experience. Every one of the 164 `teacher_approved` and `published_bank_override_enabled` flags is false. Next stage: editorial QA of wording, marks, fallbacks, specifications and visuals, then explicit teacher sign-off. No automatic publishing from this review.

[Gap-completion QA tracker](j277-youdo-gap-completion-qa-tracker.md) and [new original question drafts 031–045](j277-youdo-proposed-original-questions-qa-031-045.md) document the next editorial stage. **Correction:** the previous 70 missing *bank* positions included four pre-existing lesson fallbacks (011 × 3; 016 × 1); actual empty question slots were 66. Six new teacher-review drafts are now recorded, leaving 60 genuinely empty question positions. Source verification, originality, visuals, projector QA and teacher sign-off remain required; no approval or publication flags have changed.

### Approval and publishing gates

- **Mapping is not publication.** As of 22 November, Lessons 001–020 have the previously recorded first review, while Lessons 021–040 now have second-batch bank proposals or explicit coverage gaps/exceptions. All 164 lessons have now been processed for review. Unfilled proposal slots are intentional pending authoring, not evidence of publication readiness.. Every lesson retains `published_bank_override_enabled: false` and `teacher_approved: false`. Do not flip these simply because code works.
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
