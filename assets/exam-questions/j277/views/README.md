# J277 classroom SVG views — version 1

These are **independently created GCSE lesson visuals**. They are **not OCR past-paper figures**, nor a replacement for viewing the original question. They support the matching J277 lessons in `data/exam-questions/j277-svg-lesson-map.csv`.

## Why there are two different views

| Purpose | Files | SVG canvas | Intended placement |
| --- | --- | --- | --- |
| **Question View** | `*-question.svg` | **800 × 800**, near-square | Left half of a question slide; question remains on the right |
| **Teaching View** | `*-teaching.svg` | **1200 × 900**, 4:3 | A larger, simpler model for New Learning, I Do and We Do |
| Existing mobile | existing `*-mobile.svg` | Portrait | Preserve for mobile access; do not replace with a shrunk landscape image |

Question View images **do not show a completed technical solution**. They contain context, input data, or blank parts, leaving the task to the question on the right. They do *not* reproduce the actual OCR prompt or mark scheme. Teaching View includes completed examples where useful, so it must not be shown before a student has attempted an equivalent question.

## Qualification and lesson map

| Concept family | Official J277 topic | Lesson(s) from hub | Question View | Teaching View |
| --- | --- | --- | --- | --- |
| Fan controller — Boolean gates | **2.4.1** | 088, 090 | `boolean-ventilation-question.svg` | `boolean-ventilation-teaching.svg` |
| Ticket discount selection | **2.1.2** | 048 | `ticket-discount-question.svg` | `ticket-discount-teaching.svg` |
| Merge sort | **2.1.3** | 086 | `merge-sort-question.svg` | `merge-sort-teaching.svg` |
| Binary image/pixel data | **1.2.4** | 005 | `pixel-binary-grid-question.svg` | `pixel-binary-grid-teaching.svg` |
| Door access — Boolean gates | **2.4.1** | 090 | `lab-door-access-logic-question.svg` | `lab-door-access-logic-teaching.svg` |
| Star network and mesh comparison | **1.3.1** | 134 | `network-topologies-question.svg` | `network-topologies-teaching.svg` |
| Score selection | **2.1.2** | 048 | `selection-flowchart-question.svg` | `selection-flowchart-teaching.svg` |
| Machine controller — Boolean gates | **2.4.1** | 090 | `machine-enable-logic-question.svg` | `machine-enable-logic-teaching.svg` |
| Countdown loop / iteration | **2.1.2** | 059 | `countdown-loop-question.svg` | `countdown-loop-teaching.svg` |

Ten question-bank SVG candidates link to these nine unique teaching concepts. A question bank link can reuse one diagram family when the concept is appropriate. **Do not infer that these are exact copies of the named exam figure.**

## Style and repeatability

- White canvas, black technical linework, large text, and a **subtle school-colour glow following the individual components** (plus a lighter panel halo).
- The provisional Reepham `#195B42` is used **only** on filtered halo shapes. School-specific builds can change the token using `node scripts/build-school-svg.mjs --school SCHOOL-SLUG --qualification j277` after adding an approved colour to the theme registry.
- Student-facing graphics must never rely on colour for meaning. Pixel greyscale in the image-representation example is *actual data*, not school branding.
- No H446-only topics: **J277 does not include half/full adders**.
- Large labels, spacious layouts and only necessary annotations. The related question wording and any answer fields belong outside the Question View illustration.

## QA and release boundary

The new view pairs have been source-checked for **J277 qualification**, self-contained viewBoxes, SVG title and description metadata, and brand-colour use confined to filter-backed halo shapes. Source validation does **not** prove a diagram is projector-ready.

Before publishing a lesson, **render and inspect** both SVGs in browsers and on an actual classroom projector at half-screen and full-screen sizes; review black-and-white printing, small-screen contrast, line connections and question/answer separation; then collect teacher sign-off. If a label is not readable at the intended display size, increase its size or simplify the diagram; do not enlarge a block of explanatory text.

**No live J277 lesson, H446 file, CSS, Skills Hub or Cloudflare page was modified by this view-split task.**
