# J277 You Do — source-of-truth and publishing workflow

**Status: first 20 lessons mapped for content review only; no live exam-bank overrides enabled.** Updated 22 November 2026.

## Read these files before changing J277 You Do

1. [Lesson-to-question-and-visual map](../data/exam-questions/j277-youdo-lesson-map.json) — **primary mapping reference**.
2. [RHS practice-question bank](../data/exam-questions/j277-rhs-practice-drafts.csv) — independent question text, OCR attribution/reference, marking points, marking rule, draft/review flags.
3. [Original OCR question catalogue](../data/exam-questions/j277-questions.csv) — source-paper cross-reference; do not copy protected question pages.
4. [Existing visual lesson crosswalk](../data/exam-questions/j277-svg-lesson-map.csv) and the actual SVGs in existing J277 lessons.
5. [Code First master](../lessons/j277/code-first-master-20261021.json).
6. [Question and marking verification](../data/exam-questions/RHS-J277-ANSWER-VERIFICATION.md).

The JSON mapping has **one record for each of 164 lessons**, with each record containing selected `rhs_question_id` references, candidate visual decisions, review status and an explicit publication flag.

[Read the complete 001–020 candidate question and mark-scheme review](j277-youdo-content-review-001-020.md) before approving any first-batch content. If the RHS bank lacks enough appropriate questions for a lesson, use a named original lesson-question fallback (with its original source index) and flag the coverage gap instead of inventing or silently repeating questions. The map intentionally stores **IDs instead of duplicating question text or answers**, which must always come from the referenced bank at use time.

### Approved presentation contract: Code First + fit-to-screen questions

The shared **You Do phase only** keeps its original navigation tab and starts with:

1. **Code First** task, completely unchanged.
2. **Code First answer**, with the original question and starter code repeated at the top and its answer immediately below.
3. **Exam question screens**, displaying every mapped bank question and its marks. Use **up to four questions** only if they remain fully readable from a projector with no scrolling. **Two per screen** is preferred for longer text, code or calculations. **One per screen** is required for a large question diagram, table or any question that otherwise needs internal scrolling.
4. **Individual self-mark screens**, exactly one complete question and its marking answer per screen.

**Do not invent or repeat questions to fill a grid.** Preserve the mapping order and existing mark allocations. A question and its marks always stay together; never split one question between two screens. Large figures need sufficient projection space and must not be reduced to unreadable thumbnails. Source SVGs must match the question and must not reveal the answer.

**Lesson 114 is the first fit-to-screen rollout.** It initially groups four bank questions into **two pages of two**. If either page overflows at the current projector size, the layout can split that pair into one-question screens. On phones it uses one question per screen. Earlier preview batches retain their layout until individually checked, to avoid untested site-wide changes.

**No question-stage scroll bars on the classroom projector.** Adjust the number of questions, not the font size, to solve overcrowding. For a single exceptionally long question, test the original content at compact-projector resolution and resolve its layout without reducing the underlying question's meaning or marks. The answer page must still show the question and answer from the top of the screen, not a vertically centred answer that requires scrolling to find its first line.

The implementation for these Year 11 preview pages is `assets/j277/year11-bank-preview.js` and `assets/j277/year11-bank-preview.css`, with progression handled by the existing `assets/h446-lesson/lesson.js` You Do branch. **Do not create another phase, alter other phase content, expose teacher-review warnings, or switch on the unpublished bank for ordinary student URLs.**

### Matching content to an illustration

The **RHS-authored question and verified answer points** supply the proposed replacement question and marking guidance; the existing lesson's authored diagram is a **candidate visual source**, not automatically correct for a new scenario.

- **Reuse** only when numbers, labels, conditions and student/answer separation genuinely match.
- **Never include hidden worked-answer SVGs on the student question screen.** The shared lesson controller can append a `.youdo-solution` to an original question card before the You Do renderer runs. Select question artwork outside `.youdo-solution`, `.solution-card` and `.answer-card`; source answer SVGs remain for their separate answer pages.
- **Adapt** and redraw values where the visual structure is useful but the question differs.
- **New visual/table** when no original fits; do not create an answer-bearing student prompt.
- **None** when the question needs no figure.

Every visual needs source comparison, projector/mobile review and teacher approval. Never silently pair an old SVG that contains a different number or gives away an answer.

### Approval and publishing gates

- **Mapping is not publication.** As of 22 November, Lessons 001–017 and 019–020 have a four-slot candidate layout; Lesson 018 remains an assessment exception. Across the first 20 lessons, **72 unique RHS bank candidates plus four existing-lesson fallback questions** are mapped. Lesson 011 needs three further RHS bank questions and Lesson 016 needs one. Lessons 021–164 remain unmapped. Every lesson retains `published_bank_override_enabled: false` and `teacher_approved: false`. Do not flip these simply because code works.
- The bank has **225 RHS-authored question parts with reviewed marking points**, but its own documentation says that **all question texts still require final originality/classroom checks**. Answer verification does not equal final publication approval.
- Before enabling a bank override, verify the mapped question count (two to four for the archive-backed Year 11 preview), source eligibility, specification/lesson fit, accurate marks and accepted answers, visual correspondence, projector fit, spacing and teacher sign-off.
- **Never delete** the legacy embedded question, answer, or SVG when switching the presentation. Keep fallbacks until the replacement is inspected.
- Existing assessment/timed-practice exceptions must remain protected and explicitly reviewed before modification.
- Change **only `#you-do`** (and J277-specific adapters/loaders where unavoidable). No modifications to Do Now, Objectives, New Learning, I Do, We Do, Vocabulary, Exit Ticket, H446, the shared navigation engine or Cloudflare login/scoring.
- Compare all seven other phase fragments before and after each change and test navigation in the deployed browser. A passing source/DOM simulation alone is **not** visual QA or permission to publish.
- Four exam questions (and four separate answer screens) for each of 164 lessons would mean **656 lesson slots**, more than 225 unique bank parts. Do not assume a unique approved question for every slot, duplicate questions thoughtlessly, or invent extra RHS bank entries to fill the map. Reuse/rotation and any new authored items require deliberate editorial decisions.

### For the next implementation turn

**Before doing anything:** open `data/exam-questions/j277-youdo-lesson-map.json`, inspect the relevant lesson row and its linked bank records, then state which questions and visuals are approved and which are still pending. Update this map and its review state **before** changing a lesson's live exam-bank overrides. No new ad-hoc question selection in `youdo-unified.js`.

This document and `AGENTS.md` preserve the rules in the repository instead of relying on chat memory.
