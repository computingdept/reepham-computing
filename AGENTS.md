# Repository guidance for automated changes

## J277 You Do — mandatory preflight

**Before modifying any J277 You Do UI, question content, answer text, diagram, loader, CSS, or JavaScript:**

1. Read `docs/j277-youdo-mapping-workflow.md`.
2. Read the applicable records in `data/exam-questions/j277-youdo-lesson-map.json`.
3. Fetch the referenced `rhs_question_id` rows from `data/exam-questions/j277-rhs-practice-drafts.csv` and inspect any matching existing SVGs.
4. Respect the mapping's status and `published_bank_override_enabled` flag. Do **not** publish proposed questions as approved.
5. Preserve the classroom contract: Code First → its answer → **four exam questions together on one screen** → **answer 1, answer 2, answer 3 and answer 4 on separate full screens**.
6. Change only You Do. Protect all other seven phases, H446 and Cloudflare. Verify real browser rendering before claiming success.

No unrecorded question choices or implicit SVG reuse. If the mapping is incomplete, update the mapping as a proposal and leave the live lesson content untouched until the relevant approvals.
