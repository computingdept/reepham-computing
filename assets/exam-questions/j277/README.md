# J277 original teaching visuals

This folder contains original diagrams illustrating technical concepts associated with J277 past-paper questions. These are **not copies of OCR diagrams** and must not be presented as the original exam figure. Teachers use the linked official OCR papers when they need the authentic question.

## Asset convention

- One diagram design has **desktop** (`1600 × 900` viewBox) and **mobile** (portrait viewBox) SVGs. Both contain vector paths, accessible `<title>` and `<desc>` elements, and no linked raster images or external fonts.
- Every asset is linked to at least one question ID through `data/exam-questions/j277-visual-assets.csv`. That register is the source for original paper references, delivery status, and QA.
- Standard visual grammar: pale background, white panels, high-contrast charcoal text, labelled symbols, medium blue wiring, and restrained school-brand accents. The technical meaning must not rely only on colour.
- A diagram showing the worked structure or answer belongs in **teaching / modelling**, not automatically on an unrevealed past-paper question screen.

## Theme palette

The initial visual theme uses a provisional Reepham-style green. The exact approved school hex values are not yet confirmed from a brand manual.

| Semantic token | Initial hex | Purpose |
| --- | --- | --- |
| school accent | `#195B42` | headings, diagram strokes, header line |
| school dark | `#124632` | emphasis on pale panels |
| school tint | `#E8F4ED` | unobtrusive highlighted panels |
| ink | `#162B35` | body text, independent of school branding |
| cable | `#387A8A` or `#367A8B` | neutral links; not a school colour |

For another school, create a variant from the **same master artwork**, replacing only the three school palette values (accent, dark, tint), then rerender and check contrast. Do not recolour semantic signals merely to match a school's badge. Keep original geometry, wording, accessible descriptions, and question links consistent across the trust.

External `<img src="...svg">` references cannot reliably inherit a parent page's CSS variables. Therefore the committed SVGs use self-contained colours and school variants should be generated at asset build time. The production site is **not** modified during the question-bank audit.

## Validation before use

1. Confirm that the illustration teaches the intended concept without accidentally recreating OCR artwork or wording.
2. Check all wires, nodes, gate symbols, names, and annotations against the intended technical relationship.
3. Render and inspect desktop at full projector size and mobile as a portrait asset; review every label, connection, and contrast boundary.
4. Confirm the source question's original paper and mark scheme references separately.
5. Only after QA and teacher approval, consider the lesson placement in a **separate implementation task**.

The visual register deliberately separates `status`, `projector_qa`, `mobile_qa`, and `source_visual_verified` so a correctly rendered teaching illustration is not mistaken for a verified copy of an examination figure.

## Monochrome school-glow review variant (not yet approved)

Four review SVGs live in `reviews/`, linked separately from the existing desktop/mobile paths in the visual asset register. They preserve white backgrounds, dark text, black/charcoal technical linework and exact gate/network geometry. Only soft halos around whole teaching panels and individual devices/gates use a school-colour token (`#195B42` for the current provisional Reepham example). No technical fact, connection, answer or symbol is communicated by glow colour; a black-and-white print remains understandable.

The school theme is selected at the asset-build layer by replacing the halo colour in the same master SVG with each school's approved accessible brand colour. The green hex is illustrative until a Reepham brand specification is confirmed. Glow is decorative and should be visually checked on projectors and mobiles; a deployment may reduce or omit it for print and reduced-effects preferences. The original SVGs remain available until teachers approve the review design.
