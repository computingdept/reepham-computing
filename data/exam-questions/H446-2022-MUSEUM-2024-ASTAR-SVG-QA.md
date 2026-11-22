# H446 2022 Museum BST and Countryside Graph + 2024 Museum A* — SVG QA batch

**Draft-only original RHS visuals. No public or student release.**

This batch creates **eight source-specific SVGs** across three independent exam-practice diagram families. It follows the complete [five-series visual audit](https://github.com/computingdept/reepham-computing/pull/159), avoiding the unsafe substitution of generic teaching diagrams with different node names, costs and tree positions.

| Part(s) | Unrevealed question asset | Answer asset | Source match |
| --- | --- | --- | --- |
| June 2022 H446/02 Q2(a,b,c) | Original nine-node BST rooted 2005 | Updated 13-node BST for Q2(c) | New nodes: 1420 left of 1500, 2050 left of 2100, 2780 right of 2560, 2600 left of 2780 |
| June 2022 H446/02 Q2(d) | Complete post-insertion tree without traversal order | Separate full breadth-first and post-order lists | BFS: 2005,1920,2350,1500,1985,2100,2560,1420,1952,2000,2050,2780,2600; post-order: 1420,1500,1952,2000,1985,1920,2050,2100,2600,2780,2560,2350,2005 |
| June 2022 H446/02 Q5(b,c)(i) | Eight A–H nodes, ten undirected edges with RHS costs | Highlight shortest A→B→E→F→G→H, cost 19; eight distances/predecessors | Independent Dijkstra recomputation confirms final values |
| June 2024 H446/02 Q3(a) | Six nodes S,A,B,C,D,G, seven two-way passages and correct six heuristic estimates | Route S→B→C→G, cost 10; six g/h/f/predecessor entries | Independent shortest-path check confirms path/cost; A* expansion S,B,C,G |

**Question privacy rule:** A question SVG must not reveal a solved route, output sequence, filled-in BST placements or algorithm workings. A following dedicated answer view may show that content. For Q2(d), the complete inserted tree is legitimate *question context*, not a disclosed traversal answer.

The existing main-branch diagrams for BST, Dijkstra and A* contain different example values and should **not** be linked into these RHS question parts.

## Source integrity and release gates

- The SVG node, edge, cost, parent-child and heuristic data derive from the **current independently drafted RHS question bank** in `data/exam-questions/h446-rhs-practice-drafts.csv`, not copied OCR figures.
- Post-order and breadth-first sequences and both weighted shortest paths were independently recalculated against the RHS examples before artwork creation.
- The full 9-mark Q2(d) response also needs the teacher to mark *comparison and evaluation*; the sequence picture alone is not the complete answer.
- These SVGs use black-and-white technical drawings, larger labels, subtle green component edge treatments, explicit SVG `title`/`desc`, and no JS/CSS changes to the site.
- [Asset-role map](h446-2022-museum-2024-astar-svg-map.csv) records all 11 question-role pairings; all remain `disabled_not_approved`.
- Isolated GitHub Actions XML/raster QA archives eight individual 1240×740 screenshots and a contact sheet. This is technical verification, **not** a real projector-distance review, OCR source/marking approval or student release.

## Scope and next steps

This batch changes only new original SVGs inside `assets/exam-questions/h446/question-view/`, its own CSV/Markdown QA notes, and an isolated GitHub Actions workflow. It does not change existing H446/J277 lessons, CSS/JS, assignments, D1, scoring, published revision or the prior draft artwork batches.

After teacher visual review, further image batches should focus only on source-mismatched 2024 BST and 2023 logic work, not on text-only questions or HTML-native tables.
