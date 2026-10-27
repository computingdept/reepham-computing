# J277/H446 revision journey regression audit — 27 October 2026

## Result

**PASS: 894 checks, 0 failures** across classroom TV (1920×1080) and phone (390×844).

- GitHub Actions: [completed passing regression](https://github.com/computingdept/reepham-computing/actions/runs/40536876051)
- Published J277 PDFs: 94-page Paper 1 and 97-page Paper 2, linked to the existing 61-skill index.
- H446 page destinations: stable published PDF maps preserved for both papers.
- Student workflow: paper selection → skill practice → answer feedback → score → follow-up resources → retry → saved progress.

## Checked behaviour

- 11 J277 section pages, 9 H446 section pages; both viewport sizes.
- Responsive course hub tiles, Paper 1/Paper 2 filters, keyboard tab switching, topic routes and no viewport overflow.
- J277 original question banks, 5-question sessions, explanations, 100% mastery, different retry sets, persistence after reload.
- J277 0% attempt: exact centralized lesson and worked-example destinations, live PDF link to the mapped paper and page for representative skill in every J277 section.
- H446 Paper 1 and Paper 2 representative 0% attempts: original lesson, worked-example anchors, exact mapped PDF-page URL, live PDF response, and saved result.
- Common score-feedback layout remains intact; on phones explanation appears before the Next button.
- Optional Synergy theme continuity through hub-to-quiz-to-hub navigation and Year 12/13 navigation.

## Earlier false failures resolved

The historical test asserted outdated behaviours:
1. A previous H446 1.4 expandable subtopic tile. The approved design now uses a direct 1.4 tile opening the existing 1.4.1/1.4.2/1.4.3 section selector; all three destinations were checked.
2. An older J277/H446 palette. The Synergy theme is default; the classic theme remains available by explicit `theme=classic`.
3. An old grouped skill directory. The approved directory is continuous with visible specification boundaries.
4. J277 revision guides were formerly unpublished. They are now published and must be *present*, not absent, in below-80% support.
5. PDF URL queries can include a theme parameter before the page fragment.

Only regression test expectations and journey checks were updated in this audit. **No MCQ questions, marking rules, saved-data formats, lesson content, or live revision behaviour was modified.**

## Regression entry point

`qa/master-audit-2026/j277-revision-mcq-regression.cjs`

CI workflow: `.github/workflows/j277-revision-mcq.yml`.
