# H446 half-screen Question View SVGs

These are **independently designed RHS teaching concept diagrams**, not OCR question-paper artwork. They are not approved substitutes for authentic OCR figures. The original questions and mark schemes remain authoritative and are linked from the H446 question bank.

## Classroom display

The new `*-question.svg` files are **900 × 900** and omit large titles, extended explanations and worked outputs so they can appear in the **left half of a 16:9 classroom slide**, with the question on the right. The 1600 × 900 desktop and 900 × 1540 portrait assets in the parent folder remain the larger **Teaching View** versions for explanation and modelling.

The diagrams share the J277 / H446 monochrome standard: black/white text and geometry, plus soft school-colour glows around individual components. The existing Reepham halo value `#195B42` remains provisional. The existing `scripts/build-school-svg.mjs` handles school builds; it does not modify lessons.

## Question-to-visual mapping

See [h446-question-view-map.csv](../../../../data/exam-questions/h446-question-view-map.csv). It links **49 H446 SVG-candidate question parts** to the 19 original question-view concept models, plus their corresponding desktop/mobile Teaching View files. Related questions can reuse a concept model. Other HTML-table and original-image references are **not** part of this SVG group.

## H446 content rules

- Use the OCR H446 spec and official paper as the basis of what students are expected to understand; the SVG is an independent teaching example, **not** the source figure.
- In OCR pseudocode, show access visibility with the words `public` and `private`, and inheritance with `inherits`. **Do not introduce `protected` as an OCR H446 assessment keyword**. In UML, `#` denotes protected, **not private**; the H446 diagrams use explicit words to prevent that confusion.
- Keep prompt-mode SVGs free of completed answers. Where a model contains a worked result, show it only in an appropriately labelled teacher/reveal view.
- Label every diagram as RHS original / not the OCR examination figure.

## Release gate

Status: **draft, technical/visual QA and teacher approval outstanding**.

The 19 SVG files and 49 mapping rows have been created and read back from GitHub. Structural/source checks for SVG roots, accessible `<title>` and `<desc>`, and filtered-glow tokens have run. Still required: independent image rendering checks, labels and connector clearance, half-screen projector checks, monochrome-print checks, source-paper topic fit and teacher sign-off.

**No J277 files, lessons, Skills Hub, live site, CSS or Cloudflare changes were made as part of the question-view artwork.**
