# J277 independently drawn teaching visuals

This folder contains original GCSE Computer Science diagrams linked to the **J277 visual-assets register**, not copies of original OCR examination illustrations. For the authentic source question and mark allocation, use the OCR paper linked from the question bank.

## Design now in use

**[Computing Visual Standard v1.0](../VISUAL-STANDARD.md)** is the shared visual rule for **J277 and H446** across the trust:

- Pure white background; black/grey **technical** symbols, wires, labels, values and headings.
- One school-specific colour, restricted to **soft blurred halos around each individual component** and a weaker outer diagram halo.
- Exact diagram geometry, technical facts and accessibility text stay the same for every school.
- Reepham's current `#195B42` halo token is **provisional**, not a verified brand-manual colour.
- Dedicated landscape/projector and mobile/portrait layouts. Neither is a compressed version of the other.
- A black-and-white print must remain fully understandable; glow is decorative only.

The canonical files in this directory have adopted that monochrome-glow style. The previous coloured versions were preserved in `archive/pre-glow-*.svg`; the design-review versions remain in `reviews/`. Nothing in the live lessons has changed.

## Initial approved visual direction

| Teaching concept | Main desktop SVG | Portrait SVG | Review |
| --- | --- | --- | --- |
| Star and full mesh networks | `network-topologies-desktop.svg` | `network-topologies-mobile.svg` | Design adopted, topic/teacher approval still needed |
| Logic gates controlling ventilation | `boolean-ventilation-desktop.svg` | `boolean-ventilation-mobile.svg` | Design adopted, topic/teacher approval still needed |
| Selection flowchart (independent worked model) | `selection-flowchart-model-desktop.svg` | `selection-flowchart-model-mobile.svg` | Source paper Q2 2024 inspected; diagram content/render approval still needed |

These explain **related concepts** and are not replacements for OCR's examination questions. The logic example contains worked outputs and should be used only in modelling or answer reveal, not in an unrevealed exam prompt.

## Per-school builds

Add the approved school colour to `data/exam-questions/school-svg-themes.json` and run:

```bash
node scripts/build-school-svg.mjs --school reepham --qualification j277
```

This writes school-specific SVGs under `dist/school-svg/reepham/j277/`. The builder changes only the filtered halo stroke, not the wires or content. Other schools reuse the same SVG masters rather than maintaining separate drawings.

## Quality and release gate

The `data/exam-questions/j277-visual-assets.csv` file records the exact question IDs, original paper reference, desktop/mobile paths, visual QA and outstanding checks. Do not label an asset **approved for lesson use** until:

1. Original paper/mark scheme has been compared for *topic fit*, with no claim that the independently drawn illustration matches OCR's original figure exactly.
2. The logic or diagram behaviour has been technically checked.
3. Desktop, mobile, black-and-white print and classroom projection have been inspected.
4. The SVG has meaningful accessible text, with screen-reader checks.
5. Teacher has approved the content and chosen whether it is suitable for student prompt, I Do, We Do or answer reveal.

**No changes to lessons, Skills Hub, CSS, JavaScript or Cloudflare during this asset audit.**


## Full J277 SVG candidate set (November 2026)

The J277 visual register contains **66 source visual references**, of which **10 were classified for SVG treatment**. All 10 now have an independently drawn or deliberately reusable **desktop/master** and **mobile** teaching SVG. The other 56 references remain under table/HTML review and must not be converted to decorative SVGs by default.

| Lesson focus | Primary lesson | Asset pair |
| --- | --- | --- |
| AND, OR and NOT combination | 088, 090 | `boolean-ventilation-*.svg` (reused in two different past-paper concept mappings) |
| Selection + price calculation flowchart | 048 | `ticket-discount-flowchart-model-*.svg` |
| Merge sort stages | 086 | `merge-sort-model-*.svg` |
| Image binary pixel decoding | 005 | `pixel-binary-grid-prompt-*.svg` and separate `pixel-binary-grid-reveal-*.svg` |
| Three-gate logic: access system | 090 | `lab-door-access-logic-model-*.svg` |
| Network topology | 134 | `network-topologies-*.svg` |
| Selection flowchart | 048 | `selection-flowchart-model-*.svg` |
| Combined logic: machine requests | 090 | `machine-enable-logic-model-*.svg` |
| Iteration flowchart with trace | 059 | `countdown-loop-flowchart-model-*.svg` |

**Exact lesson assignments and recommended lesson phases** are in [`data/exam-questions/j277-svg-lesson-map.csv`](../../../data/exam-questions/j277-svg-lesson-map.csv); mappings use lesson numbers and titles verified against `j277-hub.html` and do not alter lesson content.

**Critical qualification boundary:** J277 1.2.4 covers data representation, **not half or full adders**. The only gates used in the J277 SVG set are AND, OR and NOT (official 2.4.1). Any future H446 adder content must stay in the H446 library.

**QA status:** source SVG metadata and school-colour placement were inspected for the newly created files and the register's file paths were checked. **Rendered visual alignment, classroom projection, print contrast, accessibility with assistive technology, and teacher approval are still pending**. Do not claim the diagrams have been installed into lessons or are approved to replace OCR examination illustrations.
