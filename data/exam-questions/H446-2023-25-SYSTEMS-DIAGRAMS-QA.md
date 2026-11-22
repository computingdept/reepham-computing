# H446 2023–2025 — Systems and network teaching diagrams

**Draft-only supporting illustrations. No live lesson/student publication.**

The complete [five-series source-specific image audit](https://github.com/computingdept/reepham-computing/pull/159) and earlier artwork batches cover the 22 diagram-flagged questions; this branch adds **eight optional reusable teaching illustrations** linked to **four existing RHS questions**. No tables or code panels are being turned unnecessarily into images.

| RHS question | Unrevealed question image | Consolidated diagram answer |
| --- | --- | --- |
| June 2023 H446/01 Q1(g)* (9 marks) | Shared community-library RAM, three applications, memory unassigned | Example OS allocation/protection and paging; explain thrashing and evaluate in written answer |
| June 2023 H446/01 Q1(f) (3 marks) | Interrupt received while library server program runs, blank stage slots | Detect/accept, save relevant state, execute ISR, restore and resume |
| June 2024 H446/01 Q6(d) (6 marks) | Art-centre network with unidentified hardware A/B/C | Router (network routing), switch (LAN frames), access point (Wi-Fi clients) |
| June 2025 H446/01 Q2(b)* (9 marks) | Thin/thick client schematic showing charity setup without evaluation | VM/central storage versus local processing with advantages, vulnerabilities and connectivity tradeoffs |

SVG size is **1240×740** with muted, black-and-white Apple-like technical layout, subtle green answer emphasis and explicit accessible `title` and `desc`.

## Teaching boundaries

- Question views must not disclose the key explanation or hardware identities. Full answers are separate.
- The memory-management illustration is a deliberately simplified RAM snapshot; operating systems do **not** always allocate one page per process, and paging can use many frames. Swapping/thrashing are conditional, not mandatory behaviours.
- The interrupt flow includes four useful conceptual stages, even though the existing exam question awards marks for **three accurate stages**.
- The virtualisation and memory-management diagrams support nine-mark discussion questions. **They do not replace balanced examples, evaluation or teacher level-of-response judgement.** No definite thin/thick recommendation is imposed without considering field-office connectivity.
- The network diagram shows **three** valid examples from a larger acceptable set (NIC, bridge, firewall etc. may also earn marks if appropriately explained).
- Original RHS question stems and marking guidance remain unchanged. Every new asset role is `disabled_not_approved`, pending review.

## Source files and technical QA

The [8-row asset register](h446-2023-25-systems-diagrams-map.csv) records exact question IDs, question-vs-answer role, original file paths, and review gates. A branch-local GitHub Actions workflow validates SVG XML and rasterises every illustration at 1240×740, storing PNG evidence and an eight-image contact sheet. Technical rendering does not establish actual projector-distance legibility, OCR mark-scheme approval or teacher sign-off.

**File-scope protection:** only eight original files inside `assets/exam-questions/h446/question-view/`, this CSV/Markdown and an isolated QA workflow. No H446/J277 live lesson/phase or site CSS/JS changes, Cloudflare D1, assignments or scoring.

## Final rendered technical QA — 22 November 2026

Final [GitHub Actions run 45031463908](https://github.com/computingdept/reepham-computing/actions/runs/45031463908) **passed** XML and full 1240×740 PNG rendering for all eight SVGs. [Artifact 14757623855](https://github.com/computingdept/reepham-computing/actions/runs/45031463908/artifacts/14757623855) contains the final eight individual PNGs, an eight-image contact sheet and JSON report with SVG titles/descriptions.

**Manual screenshot review:** source-matched concepts and labels are visible on all four question/answer pairs. The initial RAM illustration's final memory block crossed its outer boundary; both memory SVGs were corrected and rerendered. The network question leaves A/B/C unidentified, the interrupt question does not show the ISR stages, and thin/thick question panels do not reveal pros/cons. Answer views contain the intended conceptual support, but the two nine-mark examples still require a complete independently moderated written response.

**Remaining approvals:** no physical projector check, OCR mark-scheme alternative review or teacher sign-off. Keep all eight assets and mappings `disabled_not_approved`. No live H446/J277 lessons, shared CSS/JS, assignments, Cloudflare or scoring have changed.
