# OCR J277 revision guides

## Student edition source PDFs

These are the two original, verified files held in the teacher's ChatGPT Library:

- `J277_Paper_1_Revision_Guide_AP1_Aligned.pdf` — 94 pages; 9,700,116 bytes
- `J277_Paper_2_Revision_Guide_AP1_Aligned.pdf` — 97 pages; 10,699,995 bytes

The PDFs have not yet been copied into this GitHub folder. **Do not enable student links before both are present.**

### Publish the source PDFs

Using the GitHub web UI, open this `revision/j277/guides/` folder, select **Add file → Upload files**, and upload both original PDFs under the exact names above in one commit to `main`.

The workflow `.github/workflows/publish-j277-pdf-guides.yml` detects the uploads and automatically:

1. Confirms both files have valid PDF headers and 94/97 pages.
2. Verifies the existing skill-to-page references stay within those page counts.
3. Replaces the J277 hub's `Revision Booklet coming soon` panel with separate Paper 1 and Paper 2 **Read / Download** cards.
4. Enables guide-page links in the under-80% interactive revision feedback, without changing the MCQs, marking, thresholds, lessons or student progress.
5. Regenerates `guide-links.js`, verifies its stable skill IDs, and commits the coordinated activation.

If either PDF is missing or fails validation, the workflow publishes **nothing**, leaving current links and saved results untouched.

## Stable quiz links

- `skill-index.json` is the sole editable source mapping J277 skill IDs to OCR specification points, lesson IDs and PDF page numbers.
- `guide-links.js` is generated. Do not manually edit it or put page numbers into MCQ banks.
- When an edition changes, update page mappings in `skill-index.json`; run `python3 tools/revision/build_j277_guide_links.py` and `python3 tools/revision/build_j277_guide_links.py --check`.
- Students see lesson, worked-example and guide-page links on the below-80% feedback screen, matching H446. An unpublished guide intentionally shows a non-clickable page reference.

The PDF source files themselves must not be replaced with a recreated or raster-only copy: they are the audited, selectable-text originals.
