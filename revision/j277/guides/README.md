# OCR J277 revision guides — current published editions

**Status (29 October 2026):** Paper 1 V4 and Paper 2 V3 are on `main`, with student-facing Read/Download and printer-friendly links in `j277-hub.html`. These are versioned guides, not sources to be silently rebuilt or replaced.

| Paper | Colour / Read / Download | Printer-friendly | Pages |
| --- | --- | --- | --- |
| Paper 1 V4 | `J277_Paper_1_Revision_Guide_AP1_Aligned.pdf` (V4 content; historic filename retained) | `J277_Paper_1_Revision_Guide_Print_V4.pdf` | 291 |
| Paper 2 V3 | `J277_Paper_2_Revision_Guide_V3.pdf` | `J277_Paper_2_Revision_Guide_Print_V3.pdf` | 193 |

The former 97-page `J277_Paper_2_Revision_Guide_AP1_Aligned.pdf` remains in the repository as an **archived previous edition**; student hub links now target V3. Do not infer the live edition from the existence of older filenames.

## Release validation and responsibilities

- Paper 2 V3 publication was validated in PR #2 by `.github/workflows/j277-paper2-v3-release-check.yml`: both 193-page PDF hashes, 73 bookmarks, 12 links, all 28 mapped practice/answer pairs, generated JS, the hub, and unchanged Paper 1.
- The original one-time "publish PDF guides after upload" automation was designed for the **obsolete 94-page Paper 1 / 97-page Paper 2** source edition. It must **not** be rerun on the current V4/V3 editions; it has been retired.
- `qa/master-audit-2026/j277-guide-cards-regression.cjs` checks the shared desktop/phone layout, Paper 1's two actions, Paper 2's Read/Download/**Print** actions and actual PDF paths.
- Structural validation does not replace **teacher approval of subject explanations, examples and model answers**. After future releases, check the live student site, mobile download and a physical print sample.

## Stable quiz links and future updates

- `skill-index.json` is the sole editable source mapping all **69 J277 skill IDs** to OCR specification points, lessons, editions and guide pages (**36 Paper 1 / 33 Paper 2**).
- `guide-links.js` is **generated**. Do not hand-edit it or embed page numbers inside MCQ banks.
- On future editions, update the matching guide metadata and all affected page mappings in `skill-index.json`; run `python3 tools/revision/build_j277_guide_links.py` and `python3 tools/revision/build_j277_guide_links.py --check`.
- Release through a branch, stage only required content and versioned PDF assets, run relevant technical and visual regression checks, obtain subject-owner review, then merge to `main`. Never update the hub links before matching PDFs exist.
- The PDF originals contain selectable text; do not replace them with raster-only reproductions.
