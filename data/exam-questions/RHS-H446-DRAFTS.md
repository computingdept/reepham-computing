# RHS Computing — H446 practice-question drafting bank

**Started 21 November 2026.** This H446 bank deliberately mirrors the J277 RHS practice-question workflow without copying or changing the official OCR catalogue.

## Scope and current drafting progress

- [RHS practice-draft CSV](h446-rhs-practice-drafts.csv): **410 records**, one per OCR H446 question part from **10 papers**, November 2021 and June 2022–2025, both H446/01 and H446/02.
- Original source IDs, paper, series, official numbered specification topic, maximum marks and mark-scheme links are preserved.
- **243/410** independently written RHS practice questions with teacher-written answers and marking guidance: **all of June 2023, 2024 and 2025 H446/01 and H446/02**.
- **167/410** are **awaiting original drafting and official source/answer checks**. Their RHS question and verified-answer fields are deliberately blank — **not** auto-generated from topic summaries.
- All 10 papers retain their **140-mark totals** (1,400 marks overall). Year totals: 2021 75 parts, 2022 92, 2023 84, 2024 81, 2025 78.
- The existing [canonical H446 question catalogue](h446-questions.csv), [SVG visual register](h446-visual-assets.csv) and [half-screen visual map](h446-question-view-map.csv) remain separate. The original source PDF is authoritative.
- **Nothing is released to students or deployed into lessons by this CSV.** Each record remains a draft until all checks are complete.

## Matching the J277 workflow

1. Catalogue original paper, question part, topic, marks and official OCR question/mark-scheme source.
2. Write **genuinely independent RHS scenario/questions** rather than copy OCR wording. Retain the specific assessed skills, command word demand and mark allocation; keep necessary numbers unchanged only when a source-dependent worked result requires them.
3. Inspect the **complete original OCR paper and mark scheme** for every part, including diagrams, datasets, shared stems, code, alternative answers and level descriptors. Do **not** infer an answer from an abbreviated question summary.
4. Enter **RHS-authored eligible answer points**, a precise marking rule and independently authored examiner insight where an identified examiner-report passage has actually been reviewed.
5. Make needed original SVG/HTML table/code/trace assets and link source-paper context. Question View is not an OCR diagram reproduction. An unrelated concept image cannot silently replace the original assessment figure.
6. Independently check question originality, technical accuracy, exact numerics, mark allocation, projector/mobile presentation, accessible diagrams and answer concealment.
7. Only then promote to classroom approval and enable use in the shared J277/H446 renderer, with teacher-controlled marking and answer reveal. Level-of-response questions require teacher review, not naive automatic marking.

## Field details

The H446 CSV intentionally uses the **same 24 headers** as `j277-rhs-practice-drafts.csv`, including `rhs_question_text`, `rhs_verified_answer_points`, `rhs_verified_marking_rule`, `rhs_examiner_insight`, `rhs_answer_verification_status`, `rhs_answer_source` and `rhs_answer_review_date`.

`mark_scheme_review_status` is **legacy metadata from the canonical catalogue**, not the current RHS progress indicator. Use `rhs_answer_verification_status` and `rhs_answer_review_date` for the new work. For the **41 Paper 1 records**, OCR PDF question and scheme text were compared; separate page-image/render review remains outstanding. For the **37 Paper 2 records**, the published OCR mark-scheme text was consulted but the official question-paper PDF could not be retrieved, so exact source-question-context verification is **not complete**. The authored Paper 2 answers are independent drafts aligned to the checked marking demands, **not verified replacements for OCR's original figures or values**.

## Protection and release gates

- These RHS questions and teacher answer notes are **not** official OCR text, diagrams, schemes or approved material. The public GitHub repository must not include OCR's protected paper artwork or verbatim scheme passages.
- A changed scenario alone does **not** guarantee independent authorship; retain final originality review.
- Do not treat a source-linked answer as a classroom-ready question. Missing source figures and tables remain blockers.
- Do not deploy H446 questions by mutating J277 lessons, shared site CSS/JS or Cloudflare. No lesson edits are part of this drafting stage.

See [the H446 answer-progress audit](RHS-H446-ANSWER-VERIFICATION.md) for paper-by-paper counts and remaining requirements.

## June 2025 H446/01 Q4–Q8: second authored batch

The next **20 question parts** have now been drafted, bringing June 2025 Paper 1 to **41/41** RHS question drafts and source-text-linked teacher marking guidance. These include new LMC, K-map, SQL, AI training, RLE, ERD and JavaScript scenarios. The original assessment demands and mark allocations were retained; the new SQL labels and dataset are intentionally RHS-authored rather than reproducing the OCR company's records.

**Source-layout gates:** 10 of these 20 new questions have original table, code, grid or SVG presentation dependencies; the source-paper PDF page screenshots were unavailable, so none can be marked as visual/context approved. Program accuracy, originality, classroom readability and teacher approval remain separate requirements. The original HTML/diagram/marking assets are not silently replaced by visually similar unrelated concept diagrams.

## June 2025 H446/02 — full Paper 2 authored batch

**37/37** original RHS practice question parts were drafted for June 2025 Paper 2, covering sorting and searching, data mining, stacks, processor pipelining, pathfinding, debugging, scope, BSTs, linked lists and OOP. Each entry has an independently written prompt, indicative answer and marking criteria linked to the [official H446/02 June 2025 mark scheme](https://www.ocr.org.uk/Images/752416-mark-scheme-algorithms-and-programming.pdf).

**Accuracy and originality safeguards:** The actual OCR [2025 question paper](https://www.ocr.org.uk/Images/752248-question-paper-algorithms-and-programming.pdf) could not be fetched in this session, including attempted screenshot access. Therefore these 37 are **scheme-text reviewed, original-question-context unverified, and not approved**. New source-dependent illustrations, code/data and adapted marking criteria require final independent visual review. The own-data Dijkstra exercise intentionally uses a new six-node graph and shortest cost **11**, not the OCR eight-node diagram or its answer cost **31**. The BST five-insertion scoring rule (2 correct→1 mark; 4→2; 5→3) is explicitly preserved. The linked-list draft uses public accessors/mutators rather than treating private references as directly accessible.

**Completion as a 2025 writing milestone:** **78/78** June 2025 RHS question parts across Papers 1 and 2 were drafted. Following the 2024 work, **251** parts from 2021–2023 remain to be authored and source-checked. **0/410** questions have student-facing classroom approval. All drafting and QA occur in the separate RHS CSV; no live lessons or site code changed.

## June 2024 completed drafting batch — 41 Paper 1 + 40 Paper 2

**Both June 2024 H446 papers are now represented by original RHS question drafts and teacher-authored marking notes (81/81 question parts).** The [OCR Paper 1 question paper](https://www.ocr.org.uk/Images/726571-question-paper-computer-systems.pdf), [Paper 1 scheme](https://www.ocr.org.uk/Images/726741-mark-scheme-computer-systems.pdf), [Paper 2 question paper](https://www.ocr.org.uk/Images/726572-question-paper-algorithms-and-programming.pdf) and [Paper 2 scheme](https://www.ocr.org.uk/Images/726742-mark-scheme-algorithms-and-programming.pdf) were accessible for source-text comparison. Representative PDF pages, including question and mark-scheme figures, were viewed as images. **Not every source figure and code layout has passed an independent pixel/teacher review.**

2024 source questions with numbers keep those original numerical values where the mark calculation demands them: e.g. negative 124, denary 298, signed floating point `10011101 0110`, normalisation `00001011 0111`, binary addition `00110111 + 10011001`, a fifty-place game road and a one-hundred-slot stack. Newly authored dependent examples (A* graph, array tree, word list, OOP game) have their **own correct answers and their own teaching marking rules**, never presented as original OCR data or official solutions.

- Paper 1: original RHS examples for CPU, LMC, embedded devices, OS scheduling, culturally-aware UI, compression, binary/float calculations, gates, search ranking, network systems, databases, BSTs, OOP and legislation.
- Paper 2: original RHS examples for loops, data mining, A*, queues, stacks, insertion sort, complexity, ordered trees, abstraction/decomposition and the larger object-oriented game task.
- **26 June 2024 question parts** are flagged for original diagram/table/code rendering or a source-dependent presentation review. These flags do not imply 26 missing SVG illustrations; some are HTML/monospaced code or trace-table tasks.
- Student-facing approval remains **0/410**. All original OCR question references, paper/part IDs and 1,400 combined marks across ten papers are preserved.

**Status after June 2023 draft completion:** 243/410 written; 167/410 awaiting; current examiner-report-specific notes only where independently verified. Do not describe these new drafts as OCR-approved or released to lessons.

## June 2023 completed original RHS drafting batch — 46 Paper 1 + 38 Paper 2

All **84/84 June 2023 parts** now have an independently written RHS question, indicative answer and teacher-authored marking rule. The source [H446/01 question paper](https://www.ocr.org.uk/Images/703780-question-paper-computer-systems.pdf), [H446/01 mark scheme](https://www.ocr.org.uk/Images/703953-mark-scheme-computer-systems.pdf), [H446/02 question paper](https://www.ocr.org.uk/Images/703781-question-paper-algorithms-and-programming.pdf) and [H446/02 mark scheme](https://www.ocr.org.uk/Images/703954-mark-scheme-algorithms-and-programming.pdf) were available for text checks and representative PDF page-image inspection. **This is not complete figure-by-figure teacher/source equivalence approval.**

- **Paper 1 (46 parts):** original scenarios for application software, operating systems, LAN/protocol layering, reverse-polish stack arithmetic, number representation, multicore/security, HTML/CSS, SQL, file writing, Boolean truth tables and K-maps, and a twelve-mark rights/surveillance discussion. The RHS digit-check example returns 9 for 3178. The eight-entry truth-table output was checked as `10010101` and the independent K-map has two four-cell implicants.
- **Paper 2 (38 parts):** original BST examples, a new seven-node directed Dijkstra graph, an indexed linked-list/free-list example, an original identifier-validation function, a recursion trace, base-eight conversion, complexity and concurrency questions, merge sort, IDE debugging, login decomposition and a consistent 10 × 20 OOP museum Board/Artifact scenario.
- **Technical checks:** RHS Dijkstra shortest route `P → S → V` has cost **14** with `V`'s tentative **19** improved to **14**; original recursion `recursiveScore(10)` returns **23**; tested octal examples include 120→170 and 255→377; original array-linked list follows cyan→lilac→red→green→amber.
- **28 June 2023 parts** have a non-`not_required` presentation status and need question-specific table/code/SVG/trace layout checks; this does not mean 28 separate SVG illustrations are necessary. All students' answer views must remain concealed until reveal.

**Overall status after this batch: 243/410 drafted and source-text-linked marking guidance; 167/410 (2021–2022) still undrafted; 0 classroom-approved.** Legal-context tasks require up-to-date UK-law review. No live lesson, J277, Cloudflare, or scoring changes were made.
