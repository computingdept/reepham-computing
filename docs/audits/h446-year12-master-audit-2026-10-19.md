# H446 Year 12 — whole-course master audit

> **Status update — 19 October 2026:** The operational status policy has changed: all existing H446 lessons (Year 12 001–160; Year 13 181–320) are labelled **Ready** for teacher-led delivery, with teacher review before each taught lesson. Year 12 NEA 161–180 remains protected time rather than standalone lesson pages. The dated audit findings below are historical QA evidence, **not** a current Draft inventory. Ready does not mean the full technical, visual and specification audits are signed off.


**Baseline date:** 19 October 2026  
**Scope:** Year 12 H446 lessons 001–160, hub navigation, and protected NEA periods 161–180.  
**Stage:** All 160 Year 12 pages have received a first-pass teaching-section source review; selected high-risk lessons have been deep-read. Full specification-clause crosswalk, code execution, assessment independence and rendered visual QA are NOT YET COMPLETE. Do not conflate 'file exists', 'linked', 'no Draft marker', 'publicly deployed' or 'approved for teaching'.

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


## Consolidated Year 12 teaching-quality findings — 19 October 2026

### Evidence and boundaries

- **All 160 Year 12 HTML lessons (001–160) were individually fetched and screened**, using lesson titles and New Learning / I Do / We Do content. Representative lessons were examined deeply: 004–007, 025, 044–045, 058, 061, 083–084, 088, 098, 121, 155 and 157–160.
- **Compared with Year 13** using the curriculum map and actual Year 13 teaching sections from 218–221 (Dijkstra/A*) and 232, 296–297 (file handling and ethics).
- **Assessment spot checks:** the displayed mark allocations and internal point breakdowns of original 45-mark assessments 058, 088 and 098 each sum to 45 (three 15-mark questions). This is not independent mark-scheme moderation.
- Sampled binary floating-point methods (004–007), PageRank arithmetic (155) and Year 13 graph-path examples are coherent on the examples inspected. Do not interpret this as a complete compiler, algorithm, marking or diagram sign-off.
- The prior 20-page progress snapshot is superseded by this fuller evidence. Word lengths and SVG presence counts were not used as proxy judgements.

### Strengths worth preserving

1. **001–012**: data representation, floating-point working and foundational C# teach transformations and use different guided examples. The mathematical floating-point examples checked were internally consistent.
2. **025**: binary search has a clear index/-1 contract, sorted data precondition, worked C# function and substantial guided bounds tracing; a useful modelling benchmark.
3. **026–031**: varied Boolean logic, K-map, adder and flip-flop representations deserve rendered accuracy testing rather than automatic rewriting.
4. **089–110**: connected journey through CPU concepts, fetch-decode-execute, LMC, multicore, memory and operating-system scheduling.
5. **134–145**: progression from database relationships and SQL to networking and encapsulation; **157–160** explicitly distinguish OCR's historical legislation references from modern UK context.
6. **Year 13 lessons 218–221** go deeper into Dijkstra tentative distances, A* frontier selection, predecessors and heuristic failure: good differentiation to retain.

### Prioritised findings

| Priority | Lesson(s) | Evidence / educational judgement | Specific next step |
| --- | --- | --- | --- |
| **P0 confirmed assessment issue** | **098** | The closed-book LMC question Q2(b) says COUNT starts 2 in the loop of lesson 97, but does not reproduce the LMC program. A learner needs external lesson context to infer its behaviour. | Include the complete relevant loop in the actual question and revalidate the marking points; retain 45 marks. |
| **P1 first-teaching weakness** | **044–046** | 044 I Do repeats a short class/instance example with a generic explanation prompt; We Do only identifies class and reference. 045 repeats an Account constructor and checks definitions of private field/constructor. 046 proceeds to collections of objects. | Model two independent objects and evolving state, genuine constructor input and validation, then a different scaffolded C# task; maintain the progression into collections. |
| **P1 whole-method modelling** | **083–084** | Dijkstra/A* New Learning names the method correctly, but I Do/We Do largely compare two route costs or one f=g+h decision. They do not fully show tentative-distance, unsettled/open choices and predecessor updates in those teaching phases. | Provide one small complete changing-state trace for each method; leave Year 13 218–221 as the deeper extension. |
| **P1 modelling/guided alignment** | **061** | I Do deals with inputs and preconditions; We Do immediately switches to caching. Both are relevant, but guided practice never repeats a validation/precondition task. | Add a different guided precondition case; keep caching as a subsequent linked application. |
| **P1 cross-year placement question** | **Course-wide** | No *dedicated Year 12 title* on OCR file handling identified; Year 13 232 introduces openRead, readLine, endOfFile. Year 13 296–297 also teaches explicit AI, social, environment, censorship and accessibility issues more extensively than Year 12's primarily legal 157–160. This is not proof of an overall specification omission. | Check the exact specification subclauses and the full existing tasks, then decide how much introductory Year 12 coverage is warranted. |
| **Not automatically defective** | **038–043** | Very concise, but revisit techniques initially taught in 009–012. | Only expand if transfer/application is genuinely weak, not to satisfy a word quota. |
| **Review** | **070, 100** | Reasoning in heuristics and GPU suitability is concise; visual/model use may or may not adequately explain the decision. | Judge lesson purpose and likely misconceptions rather than length. |
| **Unverified technical/visual** | **Selected code and diagram-heavy lessons** | No real C# course-wide compilation, end-user assessment interactions, mobile/TV render checks or complete SQL/LMC runtime suite. | Test these families directly before claiming full QA. |

### Assessment allocation spot checks

- **058:** three 15-mark questions: collections and queues, linked lists/BST/graphs, hashing and OOP. Subpart points total 45.
- **088:** three 15-mark questions: searches, sorting, algorithm design and testing. Subpart points total 45.
- **098:** three 15-mark questions: CPU registers, LMC, buses and architecture. Subpart points total 45, but **Q2(b) must be self-contained**.
- A correct total does not prove question clarity, model answer correctness, marking reliability or effective answer hiding.

### Single improvement strategy

1. Fix confirmed assessment-context weakness in **098**, independently rechecking the paper.
2. Repair **044–046** first-teaching quality; make **083–084** demonstrate actual changing algorithm state. Preserve strong Year 13 lessons.
3. Crosswalk every OCR subclause against Year 12 *first teaching* and Year 13 *revisit/deepen*. Confirm file handling and 1.5.2 coverage placement before inserting any content.
4. Verify C#, OCR ERL, graph algorithms, floating-point examples, SQL, LMC and mathematical assessment tasks **by topic family**, not in page order.
5. Render the educationally essential diagrams and controls at TV, desktop and mobile widths; repair real teaching/legibility defects only.
6. Leave lessons **Ready**, preserve 161–180 as protected NEA, and retain teacher review before each delivery.

**Status:** the first whole-course teaching-section source pass is complete. The deeper specification-subclause, runnable code, full question moderation and visual testing are **not yet signed off**. No lessons, hub navigation or Ready labels have been modified in this audit pass.



## OCR H446 version 3.0 (April 2026) — cross-year curriculum crosswalk

**Reference:** Cambridge OCR's [current accredited H446 specification](https://www.ocr.org.uk/Images/170844-specification-accredited-a-level-gce-computer-science-h446.pdf), particularly the precise clauses in sections 2b–2c, Appendix 5d and the April 2026 addition of section 4e on AI and NEA. This matrix represents *plausible primary teaching/revisiting locations in the actual lesson files and Year 13 hub mapping*. It does **not** certify that every lettered requirement is demonstrated and assessed. Evidence levels: **Mapped** = relevant actual source lesson and Year 13 revisit identifiable; **Inspect** = exact clause demonstration needs proving; **Priority gap risk** = selected relevant lessons lack explicit demonstration of a named OCR requirement.

| OCR content heading | Year 12 likely first teaching | Year 13 revisit/deepen | Status and precise check |
| --- | --- | --- | --- |
| **1.1.1 (a–e)** CPU, FDE, performance, pipeline, architectures | 089–098 | 251–254 | Mapped; independently check exact register states and pipeline conditions |
| **1.1.2 (a–c)** RISC/CISC, GPUs, multicore | 099–102 | 255–256 | Mapped; GPU 100 explanation and limits deserve focused inspection |
| **1.1.3 (a–d)** IO, secondary storage, RAM/ROM, virtual storage | 103–105 | 257, 259–260 | Mapped; distinguish virtual *storage* from virtual *memory* |
| **1.2.1 (a–h)** OS memory, interrupts, scheduling, categories, firmware and VMs | 106–111 | 264–270 | Mapped; test all five scheduling algorithms and intermediate states |
| **1.2.2 (a–f)** applications, utilities, licensing, translators, linkers | 112–116 | 271, 273–274 | Mapped; test compilation stages and distinctions |
| **1.2.3 (a–c)** software methods, algorithm writing/following | 117–122 | 233–237, 240, 245 | Mapped; verify transfer into applied algorithm construction |
| **1.2.4 (a–e)** paradigms, LMC, addressing, full OOP | 044–046, 096–097, 123–126 | 225, 227–230, 261–263 | **Priority gap risk:** (e) explicitly requires **inheritance and polymorphism**, not just classes/objects/encapsulation. The actual likely OOP source lessons sampled (Y12 044–046 and Y13 223, 225, 227–230) do not explicitly name or teach these mechanisms. Search every other lesson before declaring a full-course omission; add a clear worked C# inheritance/overriding/polymorphic-dispatch sequence if not demonstrated elsewhere |
| **1.3.1 (a–d)** compression, encoding, encryption, hashing | 127–133 | 286–289 | Mapped; distinguish hashing uses, including passwords vs table hashing |
| **1.3.2 (a–f)** relational databases, capture, normalisation, SQL, integrity, ACID | 134–141 | 272, 275–281 | Mapped; verify secondary keys, all SQL forms and record locking, not only 3NF |
| **1.3.3 (a–e)** networking, TCP/IP, security and structures | 142–149 | 282–285 | Mapped; independently verify layer/protocol/hardware diagrams |
| **1.3.4 (a–d)** web, indexing, PageRank, server/client | 150–156 | 291–294 | Mapped; numerical PageRank example in 155 spot-checked as internally coherent |
| **1.4.1 (a–j)** types, signed binary, hex, floats, masks and characters | 001–008 | 193–195, 312 | Mapped; sampled 004–007 float representations internally consistent; full arithmetic/bit masks still require QA |
| **1.4.2 (a–c)** up-to-3D arrays, records/tuples, and operations on named structures | 017–025, 044–058 | 196–204, 223–228 | **Inspect:** do not infer (c) from merely naming each structure. Check create, traverse, add and remove for linked lists, graphs, stack/queue, trees, BSTs and hashes |
| **1.4.3 (a–e)** Boolean algebra, K-map, gates, D flip-flop, adders | 026–031 | mixed Paper 1 and synoptic lessons | Mapped; require actual truth-table/diagram correctness tests |
| **1.5.1 (a–d)** four named pieces of computing legislation | 157–160 | 295 | Mapped; distinguish OCR historic named laws from current law without changing required exam references |
| **1.5.2** nine specified moral/social/cultural/ethical themes | Y12 157–160 primarily law; other incidental contexts | 296–297 | **Priority gap risk:** workforce, automated decisions, AI, environment, censorship, monitoring, personal-data analysis, piracy/offensive communications and layout/colour/characters should be explicitly represented in Year 12 if it is intended as initial coverage of all examined content. 296–297 have substantially clearer deliberate coverage |
| **2.1.1 (a–d)** abstraction | 059–060 | 238 | Mapped |
| **2.1.2 (a–d)** thinking ahead, preconditions, caching, reuse | 061 | 239 | Mapped; align I Do and guided We Do validation |
| **2.1.3 (a–d)** procedural thinking | 062 | 241 | Mapped |
| **2.1.4 (a–c)** logical thinking | 063 | 242 | Mapped |
| **2.1.5 (a–b)** concurrent thinking | 064 | 244 | Mapped |
| **2.2.1 (a–f)** constructs, recursion, scope, modularity/byRef, IDE, OOP | 009–016, 032–046, 120–124 | 181–183, 191–192, 225–232, 303 | **Inspect:** Year 13 181–183 is a substantial introduction to **recursion**; verify any Year 12 independent first-teaching before claiming that Year 13 merely revisits it. Full OOP techniques overlap the separate 1.2.4(e) priority |
| **2.2.2 (a–f)** solvability, abstraction, decomposition, computational methods | 059–071 | 246, 298–300 | Mapped; assess genuine applied choices and failure cases |
| **2.3.1 (a–f)** analysis, complexity, data structure algorithms, eight specified standard algorithms | 072–088 | 184–190, 216–222, 249, 301–302 | Mapped; 083–084 need more explicit Dijkstra/A* frontier/relaxation/predecessor tracing in *first teaching* |
| **Appendix 5d** exam notation: files, arrays, pseudocode, OOP and SQL forms | 009–025, 046–058, 120–125, 138–139 | 232, 278–279, 303 | **Inspect:** file-handling with openRead/readLine/endOfFile/openWrite/writeLine is directly in OCR's notation appendix; Year 13 232 explicitly teaches reading, but Year 12 introductory file tasks remain unverified |
| **NEA 03/04, section 4e (2026)** AI/independent-work authentication | **161–180 protected NEA periods**, not lesson-page omissions | Year 13 NEA teacher check-ins | **Policy safeguard:** OCR 2026 explicitly requires supervision/authentication and proper handling/acknowledgment of AI-assisted materials. The Learning Hub must not supply student-specific assessed-project solutions. This is a guidance and delivery check, not a request to generate filler lessons |

### What the official subclauses change in our priorities

1. **OOP inheritance/polymorphism:** investigate urgently before expanding cosmetic elements. OCR **1.2.4(e)** explicitly names both. Clear source evidence was *not found in the sampled lessons most obviously responsible for it*; absence elsewhere remains unproved.
2. **Year 12 versus Year 13 initial teaching:** Year 13 is not automatically a revisit: recursion (181–183), file I/O (232) and the nine 1.5.2 ethical themes (296–297) require placement decisions and a fuller cross-course search. If deliberately introduced in Year 13, label that accurately rather than calling Year 12 exhaustive.
3. **Prioritise confirmed assessment error 098** before any optional enrichment. The closed-book question referencing "loop of lesson 97" is not self-contained.
4. **Check algorithms as methods:** Year 12 083–084 have mathematically sensible answers but their worked phases need full frontier/relaxation/path reconstruction. Year 13 218–221 already shows that deeper method.
5. **2026 NEA AI rules:** preserve 161–180 protected time; add appropriate guidance only where actually needed after checking the student-facing materials and JCQ policy.

**Scope limit:** this is an evidence-based clause-location matrix, not full yes/no lesson-level certification. All existing H446 lessons remain Ready, and no teaching pages were edited during this OCR crosswalk.
