# H446 Year 12 — whole-course master audit

> **Status update — 19 October 2026:** The operational status policy has changed: all existing H446 lessons (Year 12 001–160; Year 13 181–320) are labelled **Ready** for teacher-led delivery, with teacher review before each taught lesson. Year 12 NEA 161–180 remains protected time rather than standalone lesson pages. The dated audit findings below are historical QA evidence, **not** a current Draft inventory. Ready does not mean the full technical, visual and specification audits are signed off.


**Baseline date:** 19 October 2026  
**Scope:** Year 12 H446 lessons 001–160, hub navigation, and protected NEA periods 161–180.  
**Stage:** Repository and linked-file baseline COMPLETE; full content/pedagogy/specification/visual QA NOT YET COMPLETED. Do not conflate 'file exists', 'linked', 'no Draft marker', 'publicly deployed' or 'approved for teaching'.

## Verified repository inventory

Examined-content lessons 001–160:
- **160/160** lesson directories exist in `lessons/h446/` on the `main` branch.
- **160/160** actual `lesson-NNN/index.html` files exist in the same Git tree (recursive non-truncated tree checked).
- **160/160** paths appear in the `h446-hub.html` `liveMap`, with the expected exact numbered path. Every number has a link.
- Year 12 terms: Autumn 1 (001–035, 35), Autumn 2 (036–070, 35), Spring 1 (071–100, 30), Spring 2 (101–125, 25), Summer 1 (126–160, 35).
- **161–180:** Summer 2 consists of 20 protected NEA periods. There are no corresponding stand-alone H446 HTML lessons or hub `liveMap` links by design. Do NOT count these as 20 missing examined-content lessons or generate filler content without changing the curriculum plan.
- The public `https://rhsccs.org/` host was not retrievable using the verification service in this check. **Public-site deployment and end-user navigation remain unconfirmed**, even though the default-branch files and linked paths are verified.

## Status scan: every Year 12 HTML page fetched

| Classification by page <title> marker | Count | Numbering |
| --- | ---: | --- |
| Contains explicit `DRAFT` | **111** | 046–047, 051–053, 055–060, **061–160** |
| Does NOT contain `DRAFT` in title | **49** | 001–045, 048–050, 054 |
| Total examined-content HTML pages | **160** | 001–160 |

A page without `DRAFT` is **not** proof of quality-assurance sign-off. A page containing `DRAFT` still exists and is navigable from the GitHub hub. The status inconsistency predates this audit and should be fixed *consistently* only after agreeing the meaning of `Ready` versus `Published`.

**Hub inconsistency:** the `getLessonInfo` detail function in `h446-hub.html` currently describes H446 Year 12 pages 106–160 as `Draft for teacher review` but pages 001–105 as `Published lesson`. That logic fails to match explicit page-title `DRAFT` markers at 046–047, 051–053, 055–105. Distinguish metadata correctness from whether the source is publicly deployed. The hub's Year 12 `liveMap` correctly points at all 160 pages.

## Structural scan (not pedagogical QA)

- All 160 pages contained the **eight named phase IDs**: Do Now, Overview/Objectives, New Learning, I Do, We Do, You Do, Vocabulary, Exit.
- **158/160** pages have four elements using `class="donow-question"`. The exceptions (036 assessment set-up and 037 assessment feedback) intentionally show special test instructions in the Do Now section, not missing lesson files.
- **Six pages** have no inline `<svg>` element in the source sample counts: 018, 024, 025, 035, 036 and 037. The last two are assessment sessions; visual absence in the others is a **review flag**, not proof the lesson is visually deficient. An SVG count alone does not assess explanatory quality, usability or other illustrations.
- Early lessons use different HTML class names for answer reveals, so a zero count from the later `youdo-solution` selector is not valid evidence that answers are missing. Do not apply the Year 13 template selector mechanically to the whole of Year 12.

## Lesson learnt from Year 13 — conduct the audit in a single pass BEFORE editing

The Year 13 audit repeatedly revisited lessons, created many small commits, and conflated repeated structural checks with teaching effectiveness. For Year 12:

1. **One complete curriculum crosswalk first:** map every precise OCR H446 specification subclause against the actual Year 12 first-teaching pages AND Year 13 recall/reteaching pages; flag genuine omissions and gaps. Respect 161–180 for NEA.
2. **Read all Year 12 teaching content against one shared rubric:** correctness and sufficiency of New Learning, detailed I Do modelling, different guided We Do question, independent You Do for appropriate stretch, retrieval Q4 with challenge, agreed classroom routines and teacher LHS navigation.
3. **Code/assessment verification:** OCR Exam Reference Language syntax, executable C# (where intended), SQL/LMC, fully worked algorithms, exact mark allocations, no ambiguity, sensible boundary cases and correctly hidden model answers.
4. **Visual instruction quality:** render high-risk I Do/We Do SVGs, checking text size, diagram mathematics/flow, label clipping, teacher-TV size, mobile and desktop rather than using presence-count as a quality proxy.
5. **Only after this entire evidence pass, define the correction strategy:** priority P0 factual/marking errors, P1 instructional gaps and missing specification clauses, P2 visual/status/navigation polish; fix recurring patterns in logical batches. Do not rewrite already good lessons.
6. **Release checks:** separate 'HTML source exists' from 'public site deployed', 'Ready for classroom use', and 'full audit signed off'. Verify the hub and representative end-user page opens before status changes.

**No Year 12 lesson files have been edited in this baseline task.** The previously amended Year 13 lessons remain preserved. The audit is designed to avoid duplicating or contradicting the Year 13 corrective work.

Related: [Year 13 master audit](h446-year13-master-audit-2026-10-19.md).


## Quality audit progress — 19 October 2026 (evidence snapshot)

The new quality pass has **not** yet examined all 160 lesson contents. Twenty actual lesson HTML pages were individually fetched and reviewed at source level: **001–010, 018, 024–025, 035–037, 070, 100, 125, 160**. Treat findings below as provisional and do not claim full-course sign-off.

- 001–010: sizeable New Learning and guided We Do sections; generally substantial first-teaching models. Specific algorithm correctness, diagrams and code still need proof.
- 018, 024, 025, 035–037: no inline SVG; 035–037 are revision/test/feedback and do not require visuals merely to meet a quota. Lessons 018/024/025 deserve assessment of whether C#/data structure conceptual diagrams would actually improve explanation.
- 070 (Heuristics and Performance Modelling): 247 characters of extracted I Do text and 296 of We Do. Inspect whether path-cost reasoning, heuristic choice and correctness conditions are explicitly taught rather than asserted.
- 100 (GPU): 223 characters in I Do and 274 in We Do. Inspect whether the CPU/GPU comparison models independence, throughput and limitations adequately.
- 125 (Assembly and LMC) has substantially more modelled trace content and diagrams; check accumulator, mailbox and output trace carefully rather than imposing a word-count threshold.
- 160 (Investigatory Powers/RIPA): instructional text is present; currency, legal distinctions and historical applicability require source verification.
- Early assessment exception: 036 and 037 intentionally diverge from four-question introductory Do Now pattern.

**Next audit requirement:** examine remaining lesson contents, crosswalk precise H446 subclauses against lessons 001–160 and Year 13 181–320, then rank confirmed technical and instructional issues before editing lesson pages. All Ready statuses remain unchanged.
