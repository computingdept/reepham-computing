# Computing Visual Standard · v1.0

**Applies to J277 and H446, across every school in the trust.** Adopted for new original teaching SVG assets. This is a visual standard, not permission to reproduce examination figures.

## Fixed visual grammar

- The **technical diagram is monochrome**: white background; black/charcoal text, symbols, lines, arrows and data; greys for secondary information only.
- The **school identity is a soft blurred halo**, tracing the **actual shape** of *each component* (switch, device, gate, process box, etc.), with a lighter halo around the enclosing panel. It is not a coloured border, fill or glow on wiring or labels.
- Keep gate geometry standard: XOR shows the extra curved input line; AND has a flat input and curved output; NOT includes the inversion circle. Flowcharts use conventional decision diamonds and direction arrows.
- Wires meet the intended input/output terminals precisely. A line crossing must not imply a junction unless marked. Clear labels never overlap connections.
- No information may rely on glow hue: print and colour-blind use must remain understandable. The halo is decorative, not an answer cue.
- Prefer sparse, Apple-inspired hierarchy, generous whitespace and precise vector edges, not gradients, fake three-dimensional effects or excessive cards.
- **Projector**: landscape viewBox and clear viewing-distance labels; **mobile**: intentionally rearranged portrait viewBox, not a squashed landscape copy. Use vector paths and self-contained fonts with fallbacks.
- All SVG files must include accessible `<title>`, `<desc>`, `role="img"`, and the two `aria-labelledby` targets.
- Use a clean student *prompt* version without worked answers and a separate *model/reveal* version when an illustration otherwise discloses the solution.

## The theme token

Canonical master SVGs use `#195B42` as the **provisional Reepham-school glow token**. Only shapes with `filter="url(#schoolGlow)"` may use that token. Set `<feGaussianBlur stdDeviation="8"/>` as a starting effect at the current viewBox scale; adjust locally for legibility, never for semantic meaning. The approved hex for each school lives in `data/exam-questions/school-svg-themes.json`; do not invent brand colours.

Run `node scripts/build-school-svg.mjs --school reepham` to create separately rendered assets under `dist/school-svg/reepham/`. For another school, enter its **approved** glow colour into the theme file and run the same command. Do not create distinct source artwork for different schools. The script checks that school colour is used only for filtered glow elements; it does not edit lessons or originals.

External HTML `<img src="...svg">` does not reliably inherit parent page custom properties, so school-specific SVGs are built as self-contained files rather than expecting CSS to flow through an image element.

## Source, copyright, review and inclusion

- **Master paper catalogue:** `data/exam-questions/j277-questions.csv` or `h446-questions.csv`.
- **Visual register:** `j277-visual-assets.csv` / `h446-visual-assets.csv`; link to question IDs, original OCR source and original marks. Authentic OCR figures remain in the official PDF.
- Original teaching diagrams are independently created **concept illustrations**, not OCR question artwork; label them clearly and do not substitute them for an authentic original examination question.
- **Teacher-led exam questions:** display the question and original mark value as allowed by the school's rights/permissions; students answer on mini whiteboards or in books. No auto-marking is involved in the visual standard.
- Before status can become `approved`: inspect the official paper and mark scheme; independently verify any logic, trace, data and wiring; check desktop/mobile actual renders (and black-and-white print); review font sizes and glow on a classroom projector; accessibility/screen-reader test; record teacher approval.
- Keep **lessons frozen** during the catalogue and assets audit. Asset creation and links in CSVs are not lesson publishing.

## Rollout

J277's first four desktop/mobile SVGs are master artwork in `assets/exam-questions/j277/`; older versions are retained in `archive/` and design-review drafts in `reviews/`. Use the same standard for H446. Do not automatically interpret a `diagram_format` field as an OCR-verified graphic: original source pages must still be reviewed individually.
