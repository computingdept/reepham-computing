# H446 eight-page Print — independent-question selection triage

**Date:** 2026-11-03
**Method:** Reanalysed the 288 per-lesson records in `H446_EIGHT_PAGE_COURSE_QA_2026-11-03.json`; objective-by-objective source review is currently recorded for Lessons 001–010.

| Metric | Result |
|---|---:|
| Existing eight-page draft sets | 288 |
| Independent-question sets retaining all online You Do questions | **254** |
| Sets with fewer online You Do questions printed | **34** |
| Of reduced sets, selecting exactly Q1 and the final online question | **34** |
| Teacher-approved eight-page sets | **0** |

## Flagged for objective-coverage review

**001–024 and 026–035** (34 lessons). Lesson 025 already retains its three online You Do questions.

The first/final selection rule is consistent across **all 34 reduced-question sets**. This pattern alone is **not** a content error, since a booklet has other phases and a shortened assessment may be desirable. But it is a risky selection heuristic when intervening questions independently assess different objectives.

## Audits completed

- `H446_EIGHT_PAGE_PEDAGOGICAL_AUDIT_001-005_2026-11-03.md`: significant independent-question gaps in binary conversion, signed arithmetic, masks/shifts and floating-point representation.
- `H446_EIGHT_PAGE_PEDAGOGICAL_AUDIT_006-010_2026-11-03.md`: significant independent-question gaps in signed floating-point arithmetic, ASCII/Unicode comparison, branch boundary tests and `while` loops.
- **Next priority: 011–024 and 026–035.** Check selected questions against *each objective* before deciding what to remove, combine or retain.

## Distinct QA pathways

1. **Technical:** Eight-page/A4/A3 variants, PDFs parse and print edges, answer separation and correct links. Original structural report: 288 pass, 0 exceptions.
2. **Curriculum:** Do Now retrieval, objectives, I Do → We Do → You Do progression, challenge, OCR H446 accuracy and level, answer/key accuracy. **Not automatically passed.**
3. **Visual:** Render all eight pages, inspect legibility, code, diagrams, notation, pupil handwriting space and B&W version. **Not yet signed off.**
4. **Teacher:** Individual approval before switching any website Print link. **0 approvals.**

The structural audit script `tools/independent_booklets/audit_h446_eight_page_course.py` now records the reduced-question count **separately** from structural exceptions when next executed. The historical structural QA artefacts are snapshots and have not been mislabelled as new pedagogical tests.

**No existing Print links should be switched as a result of this triage.** Public review-answer files are not confidential staff-only materials.
