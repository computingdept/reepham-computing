# H446 Year 13 — whole-course master audit

> **Status update — 19 October 2026:** The operational status policy has changed: all existing H446 lessons (Year 12 001–160; Year 13 181–320) are labelled **Ready** for teacher-led delivery, with teacher review before each taught lesson. Year 12 NEA 161–180 remains protected time rather than standalone lesson pages. The dated audit findings below are historical QA evidence, **not** a current Draft inventory. Ready does not mean the full technical, visual and specification audits are signed off.


**Date:** 19 October 2026  
**Scope:** all 140 draft lesson pages, `lessons/h446/lesson-181/index.html` through `lesson-320/index.html`, and their Year 13 entries in `h446-hub.html`.  
**Status:** source-level whole-course inventory completed; content and visual quality *not yet signed off*. The established high-risk corrections log remains the record of confirmed and committed lesson fixes.

## Executive decision

**Preserve the existing course and corrections. Do not rebuild all 140 lessons.** Previous audit batches have already corrected **43 distinct lesson pages**. This master review scanned **every page once to the same criteria** and identifies a small number of recurring problems to address consistently. A scanned page is not necessarily a corrected or classroom-ready page.

The immediate whole-course issue identified and fixed: **30 Year 13 hub lessons (181–210) displayed identical generic objectives** despite the HTML lesson pages containing distinct teaching objectives. All 30 hub entries have now been synchronised to their lesson pages in two commits (`80fa3e3d`, `02f6968e`). Re-fetched `h446-hub.html`: 140 lesson entries remain, no generic objective sets remain, and all existing spec tags remain.

## What the 140-page scan actually verified

- All **140** expected numbered lesson HTML source pages were fetched and inspected in one consecutive 181–320 pass.
- All **140** pages contain four Do Now question elements and three You Do question/hidden-answer pairs under the current HTML conventions.
- All **140** pages contain inline SVGs: the lowest count in the inventory was three per lesson. **Presence does not establish pedagogical usefulness, correct data, visibility or legibility.**
- New Learning, I Do and We Do prose and sample code were sampled for depth and question/model-answer completeness, with the section lengths recorded for each page during the source scan.
- Year 13 hub now maps all 140 entries to a single primary spec tag or `mixed`, with 140 total and no generic objectives.
- No actual C# compiler-suite pass, interactive browser navigation, desktop/mobile screen-render test or full OCR point-by-point content sign-off was performed in this whole-course scan.

## High-level specification coverage as indexed by the Year 13 hub

This counts **primary hub labels**, not all cross-curricular occurrences or confirmed subclause teaching. Official Cambridge OCR H446 outlines Computer systems (01), Algorithms and programming (02) and the separate programming project (03). Year 13 hub notes specify that NEA is covered via check-ins rather than a separate Year 13 unit.

| OCR area | Primary tag counts and example lesson ranges |
| --- | --- |
| 1.1 — processors, peripherals, storage | 1.1.1 = 4 (251–254), 1.1.2 = 2 (255–256), 1.1.3 = 3 (257,259,260) |
| 1.2 — software, methodologies, languages | 1.2.1 = 6, 1.2.2 = 3, 1.2.3 = 7, 1.2.4 = 4 |
| 1.3 — compression, databases, networks, web | 1.3.1 = 5, 1.3.2 = 7, 1.3.3 = 4, 1.3.4 = 4 |
| 1.4 — data and data structures | 1.4.1 = 4, 1.4.2 = 9, 1.4.3 = 3 |
| 1.5 — legal, moral, ethical | 1.5.1 = 1, 1.5.2 = 2 |
| 2.1 — computational thinking | 2.1.1–2.1.5 = one primary-tagged lesson each |
| 2.2 — programming and computational methods | 2.2.1 = 14, 2.2.2 = 4 |
| 2.3 — algorithms | 2.3.1 = 17 |
| Mixed/synoptic | 32 |

**All 24 numbered main H446 content headings represented in the current hub tag list.** That is a *headline mapping check only*. Important individual clauses such as floating-point arithmetic, character sets, 3D arrays, OOP inheritance/polymorphism, file handling and particular algorithm/graph methods still require a clause-by-clause check of the teaching content. A single primary label can undercount genuine cross-topic coverage or conceal thin treatment of a subclause.

## Priority findings, grouped rather than one-lesson-at-a-time

### P0 — release-blocking technical accuracy (previous fixes preserved; final proof outstanding)

1. Run all C# demonstrations requiring compilation through a real compiler/runtime, including negative and empty input, null roots, duplicate BST values, and integer/array bounds. Earlier fixes were committed, but no course-wide compilation suite exists.
2. Execute representative LMC and SQL traces, especially branch/underflow, table schemas, joins and transaction operations, with a documented reference environment. Do not assume textual pseudocode is executable C# or SQL unless clearly labelled.
3. Independently verify 45-mark assessment question totals, hidden solutions and mark points, especially the synoptic assessments 214, 243, 247, 280, 305, 306 and 308. Earlier audit batches corrected actual ambiguous/under-specified mark schemes; other examination tasks still need independent marking review.

### P1 — teaching and learning quality (next grouped corrective pass)

4. **New Learning → I Do → We Do should teach, not only present the result.** Review the early search/sort sequence (184–190), the operating-systems/scheduling block (264–269), database modelling/SQL (275–279), and later algorithm retrieval (310–311). The source scan shows relatively brief I Do/We Do explanations in several of these; this is a **review flag, not a claim every short lesson is deficient**. In a practice assessment or recap the shorter section may be appropriate.
5. Audit the task distinction between worked modelling and guided practice; avoid repeating the identical worked question as independent practice. Lesson 263 uses the same branch routine with a different input in I Do/We Do, which merits professional judgement as to whether the transfer challenge is sufficient.
6. Ensure Year 13 higher-attaining students encounter genuine why/how/evaluate questions rather than only recalling final outputs; revisit complexity, unusual cases, trace justification and higher demand mark schemes. Do not add artificial levels of difficulty to every introductory retrieval prompt.
7. Distinguish teacher-led formative activities from exam-marked questions. For example Lessons 181 and 191 provide concise worked answers but do not assign explicit mark totals; this is fine for retrieval, but should not be described as strictly mark-scheme graded without a marking rule. Earlier corrected diagnostics and extended answers should be preserved.

### P1 — visual and curriculum integrity

8. Counted SVGs are **not** visual sign-off. Sample 199 previously contained a clipped BST node which was corrected. Prior geometry checks found some issues but do not detect wrapped labels, overlapping captions, insufficient working-space, inappropriate diagram metaphors, or mobile layout. Render and inspect **New Learning, I Do, We Do** for high-risk visual lessons before marking ready.
9. Conduct a **subclause crosswalk**, not only tag count: explicitly check the 1.4.1 representation subsections; 1.2.4 paradigms/assembly; 1.3.2 relational modelling, SQL and ACID; 2.3.1 sorting/search/graph routes; and Paper 1–2 synoptic retrieval in all half-terms. Track a clause as 'taught with worked example and assessed', 'retrieval only' or 'not demonstrated'. Validate against the Year 12 sequence too; Year 13 alone need not reintroduce every concept from scratch, but the user intends re-teaching/recall of all examined content.

### P2 — interface / release polish

10. Check classroom TV, desktop and mobile viewports: left-hand phase navigation, never right-hand teacher nav; no clipped New Learning, visible question and diagram, scroll where necessary, correct hide/reveal controls and no display of developer instructions.
11. Verify file links and public deployment match committed main-branch files. Do not remove `DRAFT` or claim the public website was updated until the actual deployed pages are checked.

## Suggested one-pass QA sequence (instead of small recurring audits)

1. **Specification matrix first:** numbered clause → Year 12 source → Year 13 initial/revisit lesson(s) → examined tasks → status/evidence. Record real gaps.
2. **Content/code verification:** validate algorithm and exam-question correctness by topic blocks, applying one agreed fix to all occurrences of a recurring pattern.
3. **Pedagogy by phase:** evaluate modelled versus guided examples and independent questions; edit only lessons with a substantive weakness. Preserve the eight-phase lesson format and four-question retrieval approach.
4. **Visual batch:** render representative high-risk SVG pages, fix whole families of SVG layout failures, then repeat at mobile and classroom dimensions.
5. **Publish gate:** human-reviewed coverage and samples of each structural family, passing code/answer links/interaction tests, then remove Draft only from approved lessons.

## Pass/fail gates

| Gate | Current result | What is needed to pass |
| --- | --- | --- |
| 140 source pages exist | **Pass** | None |
| Four Do Now questions and three independent You Do answer panels | **Pass by existing selectors** | Spot-check student/teacher reveal logic |
| 30 generic hub objectives | **Corrected and verified** | Visually confirm rendered hub objective text |
| All 24 major numbered spec headings in hub | **Pass as an index check** | Clause-level map across both years |
| Code and exam accuracy | **Partial** | Runtime tests + independent assessment mark review |
| Teaching depth and challenge | **Review flags identified** | Subject specialist modelled/guided teaching check |
| SVGs and layout | **Not signed off** | Real rendered multi-viewport inspection |
| GitHub Pages deployment | **Not confirmed** | Compare deployed pages to approved source |
| Classroom-ready / Draft removed | **Not approved** | All relevant gates completed |

**Background correction record:** [Earlier high-risk fixes](h446-year13-high-risk-corrections-2026-10-19.md).

**External reference:** [Cambridge OCR H446 specification at a glance](https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/specification-at-a-glance/). Formal clause-level sign-off must use the currently published full accredited specification, not simply the teaching-hub labels.
