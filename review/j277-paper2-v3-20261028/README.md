# J277 Paper 2 V3 — staged publication (NOT YET LIVE)

This branch is **intentionally incomplete** until the two PDFs are uploaded. Do not merge the draft pull request while the gate is failing.

## Required files

Upload the supplied local release-package PDFs to the **release branch**, at:

1. `revision/j277/guides/J277_Paper_2_Revision_Guide_V3.pdf` — 9,713,830 bytes, SHA-256 `fb1b3c12969765e6044d58fdbd903933267de3df377750902d2416c8e3f261fa`
2. `revision/j277/guides/J277_Paper_2_Revision_Guide_Print_V3.pdf` — 15,637,168 bytes, SHA-256 `0ed01e0511a9de3dac052acaa22fe99bbbfd5c9ae9e1409a5695c633524aa5ee`

The files were generated and checked in ChatGPT, but the GitHub connector **does not accept local binary filesystem paths**, so the PDFs have not been uploaded by the assistant.

## Changes already staged in this branch

- J277 skill index: 28 Paper 2 mapped pages, 193-page guide edition, unchanged Paper 1 mapping.
- `guide-links.js` regenerated from the full index.
- J277 hub: Paper 2 Read, Download, Print point to V3 files.
- Release manifest contains exact sizes, SHA-256 hashes and the 28 practice/answer page pairs.
- Automated gate fails if either PDF is missing, wrong, mismatched to manifest, incorrectly mapped or if Paper 1 is changed.

## After uploading both PDFs

- Run the J277 Paper 2 release gate on this branch and confirm PASS.
- Check Paper 2 skill feedback links across mobile and desktop; confirm that Paper 1 still opens the 291-page V4 edition.
- Review physical printer output and a real phone download when practical.
- Then mark draft PR ready and merge to `main`, with GitHub Pages deployment verification.
- Do not claim publication based solely on the staged branch; check the live PDF and both hub buttons afterwards.

The complete programme content and model answers still require teacher-level subject approval. Automated structural QA cannot certify them.
