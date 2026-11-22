# June 2025 H446 — first source-specific SVG batch

**DRAFT ONLY. No live lessons or student-release flags are changed.**

This batch fixes the three deliberate image gaps identified in [the consolidated visual audit](H446-FIVE-SERIES-VISUAL-AUDIT.md) (the audit itself is a separate draft PR #159). It does not start a fresh design cycle.

## Six new SVGs / three original diagram families

1. **Paper 1 Q5(c) full adder:** a question-only SVG shows just the existing XOR/AND gates with A,B inputs and Cin available. A separate answer SVG adds the XOR2, AND2 and OR stages and shows S/Cout.
2. **Paper 1 Q8(b) quiz ERD:** question-only four-card schema shows TblTopic, TblTest, TblLearner and TblAttempt without relationships; answer adds the three correct one-to-many links and their cardinalities.
3. **Paper 2 Q7(a)/Q7(c) wildlife BST:** reuse the original question tree (root 50; 25/75; 10/35/60/90). A new post-insertion question tree supports *traversal* Q7(c) without displaying traversal results. A new answer tree highlights correct insertion positions (5, 30, 72, 80, 95). The teacher reveal for Q7(c) **must also show the two complete traversal sequences**, not only the tree.

The other June 2025 source-specific diagram, the S→T Dijkstra graph for Q5(a/b), already has correct node names and weights in candidate main-branch SVGs; those are **reused**, not redrawn.

All artwork is independently drafted from RHS data, black-and-white technical content with restrained component glow, explicit SVG `title` and `desc` accessibility descriptions. The source filenames and exact question-part references are recorded in [the batch asset map](h446-2025-priority-svg-map.csv).

**Technical checking:** separate GitHub Actions QA workflow parses each SVG as XML, rasterises all six images and uploads six PNGs plus a contact sheet. A passing render is not teacher or OCR/source approval. Verify marking, legibility and output logic before any classroom release.

**Scope:** six SVG files in `assets/exam-questions/h446/question-view/`, two QA tracking files in `data/exam-questions/`, and one isolated QA workflow. No lesson phase/UI, Cloudflare D1, assignment, scoring or live student site changes. Entire batch remains `disabled_not_approved`.
