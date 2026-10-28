# J277 Paper 1 V3 — verified review copies (NOT LIVE)

**Uploaded and verified: 28 October 2026.** The automatic workflow [passed](https://github.com/computingdept/reepham-computing/actions/runs/40668010768).

The review files are in [verified/](verified/):

- [Colour digital student edition — 291 pages](verified/J277_Paper_1_DIGITAL_STUDENT_REVIEW_V3_UNPUBLISHED.pdf)
- [Greyscale printer edition — 291 pages](verified/J277_Paper1_Print_V3.pdf)
- [Machine verification report](verified/REVIEW_VERIFICATION.json)

The colour edition was reassembled byte-for-byte from the two uploaded parts. The greyscale edition was uploaded under the short filename `J277_Paper1_Print_V3.pdf` and matches the recorded original SHA-256. Temporary source parts have been removed.

## Verified automatically

- SHA-256 hashes and exact byte counts match both source V3 PDFs.
- Both editions contain 291 pages, 103 bookmarks and 20 PDF navigation links.
- Extracted text is identical across the colour and print editions.
- Each of the 33 *proposed* Paper 1 MCQ destinations points to non-empty content.
- The currently published Paper 1 is still **94 pages**, and Paper 2 **97 pages**; none of the 61 live skill IDs or page destinations has changed.

## Still needed before live publication

1. Line-by-line technical content and model-answer sign-off.
2. Test loading the full digital PDF on a real smartphone.
3. Review a printed greyscale sample of dense images and tables.
4. Make the deliberate live deployment: final PDF + all 33 new Paper 1 feedback page targets + regenerated `guide-links.js`, followed by the mobile/TV revision regression.

**Do not merge this review branch directly into `main`**: review files must not accidentally replace the live guide. This is only a staging area.
