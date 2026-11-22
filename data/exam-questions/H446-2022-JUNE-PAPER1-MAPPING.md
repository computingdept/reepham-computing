# H446 June 2022 Paper 1 — draft mapping and teacher review

**Status: complete bank mapping; not yet classroom-approved or student-visible.**

This batch intentionally **freezes November 2021** and uses a separate draft branch. It takes the pre-existing RHS independently drafted question bank for `OCR H446/01 · June 2022` and creates a single teacher-review mapping without rewriting questions, drawing new SVGs or changing any student-facing lesson.

## Coverage audit

- **48 question parts**, **140 total marks**, **48 existing RHS answer-point sets** and **48 existing marking rules**.
- **36 text-only parts** need no separate illustration.
- **12 visual/layout-flagged parts** in six source-specific sets; these can reuse the existing question-left/answer-full-width design, but no generic diagram is to be substituted for changed question data.
- All 48 are marked **`disabled_not_approved`** in the new mapping, matching the existing classroom QA register.

| Question | Parts | Marks | Visual/layout flagged |
| --- | ---: | ---: | ---: |
| Q1 | 11 | 36 | 2 |
| Q2 | 15 | 38 | 7 |
| Q3 | 5 | 13 | 1 |
| Q4 | 1 | 9 | 0 |
| Q5 | 11 | 30 | 2 |
| Q6 | 5 | 14 | 0 |
| **Total** | **48** | **140** | **12** |

## Six reusable visual/layout sets — defer drawing until review

| Source-specific resource | Question parts | Parts | Presentation |
| --- | --- | ---: | --- |
| monospaced lmc panel | 1(c)(i), 1(c)(ii) | 2 | native monospaced code |
| schema table | 2(a)(i), 2(a)(ii), 2(a)(iii), 2(a)(iv), 2(b) | 5 | native html table |
| code panel | 2(g)(i), 2(g)(ii), 5(e)(i) | 3 | native monospaced code |
| floating point classification grid | 3(c) | 1 | native html grid |
| compiler table | 5(c) | 1 | native html table |

No new artwork is authorised or required at this mapping stage. Shared question context must stay consistent across multi-part items.

## Teacher review file

[`h446-2022-jun-paper1-review-map.csv`](h446-2022-jun-paper1-review-map.csv) is the **complete 48-row mapping**. Each row contains the exact existing RHS question wording, OCR reference, spec point, marks, drafted answer points, drafted marking rule and guidance, source URL/status, the explicit layout requirement, and approval gates. The source question, RHS answer wording, marks and rules are copied from the existing bank without adjustment.

The `rhs_answer_points_draft` and `rhs_marking_rule_draft` column names deliberately **do not claim OCR or teacher approval**. OCR shared stems, original source tables/code, mark-scheme alternatives and originality require source review before use.

## Agreed production order

1. **Use this finished table** to select questions and review them as they are taught; question wording and marking feedback remain revisable in the draft.
2. When a visual question is required, create a matching table/code panel using the established answer-only reveal—not a new UI or repeated SVG-polishing pass.
3. Keep all 48 parts blocked until source/data, marking, legibility/accessibility and teacher approval are individually recorded.
4. Next paper for the same fast mapping-only treatment: **June 2022 H446/02**, separately.

**Non-negotiable:** Do not modify `main`, live H446/J277 lessons or lesson phases, JS/CSS in the student website, Cloudflare D1, assignments, published revision, or existing November 2021 QA assets.

