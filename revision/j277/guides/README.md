# OCR J277 revision guides

The two current, audited AP1-aligned source files are:

- `J277_Paper_1_Revision_Guide_AP1_Aligned.pdf` — 94 pages, 20 October 2026
- `J277_Paper_2_Revision_Guide_AP1_Aligned.pdf` — 97 pages, 20 October 2026

**Status:** The PDFs must be uploaded to this folder as binary files. Do not activate their links until both files are present and open correctly on the public site. The original copies are available as ChatGPT conversation attachments.

## Stable quiz links

- `skill-index.json` is the editable source mapping J277 skill IDs to OCR sub-specification points, lesson IDs and PDF page numbers.
- `guide-links.js` is generated, not manually maintained.
- When a guide changes, revise the skill-to-page map and run `python3 tools/revision/build_j277_guide_links.py` to regenerate the resolver.
- Verify with `python3 tools/revision/build_j277_guide_links.py --check`.
- Once PDFs are published and pages verified, set the relevant `guides["1"].published` and `guides["2"].published` fields to `true` in `skill-index.json`, regenerate the resolver and run the J277 MCQ browser audit.
- Do not insert PDF page numbers directly into the MCQ banks.

Students receive the lesson, I Do worked-example and guide-page links only on the below-80% feedback screen, matching the H446 flow. An unpublished guide shows a non-clickable page reference, never a broken PDF hyperlink.
