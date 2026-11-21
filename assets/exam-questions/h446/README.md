# H446 original teaching SVG collection

This directory follows the [shared Computing Visual Standard](../VISUAL-STANDARD.md) already used for J277. These are independently designed RHS teaching models, **not OCR exam-paper diagrams or substitutes for the original questions**.

## Catalogue coverage (20 November 2026)

- **19 unique H446 teaching concepts** with separate desktop and mobile SVG masters: **38 SVG files**.
- All **49 SVG candidate question references** across the 2021–2025 H446 paper catalogue are linked to a relevant desktop/mobile master in [h446-visual-assets.csv](../../../data/exam-questions/h446-visual-assets.csv).
- Multiple question parts deliberately reuse one conceptual diagram where that is pedagogically appropriate. These do **not** reproduce or purport to match the original OCR figure's nodes, data, values, layout or marks.
- The visual register contains **124 total references**: **49 SVG candidates**, **73 HTML-table candidates**, and **2 original-image references**. The latter 75 are **not** counted as SVG deliverables.

## Existing and newly drafted concept masters

| Group | Master filename prefix |
| --- | --- |
| Half adder | `half-adder-model` |
| Full adder built from two half adders | `full-adder-two-half-adders-model` |
| Directed weighted graph | `weighted-graph` |
| Dijkstra on a separate weighted network | `dijkstra-trace` |
| A* with admissible heuristic estimates | `astar-heuristic` |
| BST structure and insertion | `bst-insertion` |
| BFS and post-order traversal | `bst-traversal` |
| Balanced and skewed BSTs | `balanced-trees` |
| BST held in a pointer array | `bst-array` |
| LIFO stack | `stack-array` |
| Circular queue | `circular-queue` |
| ERD with a link table | `erd-relations` |
| Directed and undirected graph comparison | `directed-undirected` |
| Graph and tree comparison | `graph-tree-comparison` |
| AND/OR Boolean circuit | `logic-gates` |
| BST versus linked list | `bst-linked-list` |
| BST versus hash-table lookup | `bst-hash-table` |
| Classes, inheritance and encapsulation | `oop-class-hierarchy` |
| Functional decomposition | `decomposition-tree` |

Each prefix has a `-desktop.svg` and a `-mobile.svg` file. The portrait artwork is arranged independently rather than scaling the desktop composition.

## Appearance and build

Technical geometry, connecting wires, values and labels are black/white. The only school-colour token is a **soft, shape-following filtered halo** around individual components and a weaker halo around the outer panel. The existing `#195B42` Reepham colour remains **provisional** until approved by the school; it is not a verified brand specification.

For the existing trust theme builder:

```bash
node scripts/build-school-svg.mjs --school reepham --qualification h446
```

## Release status and safeguards

**Draft assets, not approved lesson assets.** The files have been saved and read back from GitHub; automatic source checks confirm the SVG roots, accessibility metadata, school-glow token placement and expected file pairings. These checks do **not** replace visual rendering, classroom projection, monochrome-print and screen-reader checks, original-paper topic-fit review or teacher approval.

- Original OCR examination papers and mark schemes remain linked from the question catalogue.
- Any worked model belongs in an **I Do / We Do / answer reveal**, not an unrevealed OCR question prompt.
- Do not overwrite the original question artwork or assert that a model matches OCR's figure or solution.
- No H446 lesson, J277 lesson, live website, CSS, Skills Hub or Cloudflare changes are made by this SVG catalogue.

## Half-screen classroom Question View (21 November 2026)

The [Question View collection](question-view/README.md) adds **19 near-square 900 × 900 SVGs** for a diagram-left, question-right display. It is distinct from the existing full-width desktop and portrait/mobile Teaching View masters. The [question-to-visual map](../../../data/exam-questions/h446-question-view-map.csv) links all 49 H446 SVG-candidate parts to these original examples.

**H446 OOP correction:** OCR's assessment pseudocode uses explicit `public` and `private` visibility (not `protected`). The H446 inheritance teaching diagrams were corrected to use these words, avoiding the UML `#` symbol, which actually means protected.

All new Question View models remain **drafts requiring render/projector checks, source fit review and teacher approval**. The original OCR paper is authoritative; diagrams are independent concept examples, not exam-question replacements.
