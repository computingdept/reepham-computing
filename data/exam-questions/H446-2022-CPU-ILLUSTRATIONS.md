# H446 June 2022 Paper 1 — CPU architecture and pipelining image batch

**Draft-only supporting original RHS illustrations. No live lesson changes or student approval.**

The [five-series audit](https://github.com/computingdept/reepham-computing/pull/159) identified **22 required source-specific diagram parts across 2022–2025**, which are already served by the earlier SVG draft batches. This batch does **not** reinterpret those flags as missing images; it supplies **eight optional supporting teaching diagrams** for four high-value CPU/architecture questions, for future reuse when approved.

| RHS paper/part | Question illustration | Separate answer diagram |
| --- | --- | --- |
| June 2022 H446/01 Q1(a)(i) | CPU + main memory, shared program/data access not disclosed | Von Neumann: code and data in shared main memory, shared access buses |
| June 2022 H446/01 Q1(a)(ii) | Harvard comparison space left unanswered | Harvard: separate instruction/data memories and buses, alongside Von Neumann |
| June 2022 H446/01 Q1(c)(iii–iv) | Blank four-instruction/six-cycle Fetch/Decode/Execute grid | Four overlapped pipelines and higher repeated-ticket-program throughput |
| June 2022 H446/01 Q1(d)(i–ii) | ACC and PC roles withheld | ACC holds ALU operands/results; PC stores next instruction address and increments or branches |

All eight assets use a consistent 1240×740 black-and-white technical style, restrained green answer highlighting, SVG `title`/`desc` accessibility labels, and **separate question and answer views**.

**Pedagogical integrity:** the pipeline diagram is an *idealised three-stage* model (Fetch, Decode, Execute, one cycle each, no stalls). This is an illustration for questions that ask about overlap, not an assertion that real CPUs always execute one instruction in three clock cycles or that each instruction's latency decreases. For Q1(c)(iv), the throughput answer should be applied to repeated theatre ticket-accumulation operations.

No other exam-question wording, RHS original answer/marking rules or existing 2021–2025 mapping is altered. The [asset-role register](h446-2022-cpu-illustrations-map.csv) records 12 question/answer associations, all `disabled_not_approved` until teacher source, marking, legibility/accessibility and classroom approval.

**QA:** isolated GitHub Actions parses and rasterises each SVG at 1240×740 and generates an eight-image contact sheet. Such technical rendering is not teacher/projector sign-off.

**Scope:** eight new SVGs in `assets/exam-questions/h446/question-view/`, this MD/CSV, and one isolated QA workflow. No changes to H446/J277 lesson phases or content, shared CSS/JS, Cloudflare, assignments, marks or published revision.

## Final technical image QA (22 November 2026)

[GitHub Actions run 45030500362](https://github.com/computingdept/reepham-computing/actions/runs/45030500362) completed successfully: all **eight original SVGs passed XML validation and raster rendering at 1240×740**. The [image-evidence artifact](https://github.com/computingdept/reepham-computing/actions/runs/45030500362/artifacts/14757462740) contains the eight PNG previews, eight-image contact sheet, and accessibility-title/description report.

The first contact-sheet inspection caught a misleading ACC→PC arrow and an "ALU / MEMORY" label inside the CPU. Both register question/answer SVGs were revised to show **ALU / CONTROL**, remove the false arrows, and shorten crowded card headings. The entire batch was rerendered. A final manual contact-sheet inspection found the question/answer separations intact and the four teaching models readable.

**Limitations:** This is an image rendering/layout check, not an independently moderated OCR marking review, actual half-screen projector trial, or teacher sign-off. The pipeline uses an intentionally simplified ideal three-stage example. All 12 question-view/answer-view role records remain `disabled_not_approved`. No live H446/J277 lessons or scoring were altered.
