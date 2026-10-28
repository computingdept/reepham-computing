# J277 Paper 1 — V3 student editions pre-publication QA

**28 October 2026 · Unpublished candidate only.** The live 94-page Paper 1 guide, 97-page Paper 2 guide, and all 61 MCQ feedback links remain unchanged.

## Files generated in this conversation

| Edition | File | Pages | SHA-256 |
|---|---|---:|---|
| Colour student PDF | `J277_Paper_1_DIGITAL_STUDENT_REVIEW_V3_UNPUBLISHED.pdf` | 291 | `732809014c00847020d4135e2a861b685d9b356c9fba7410051b706b97609c44` |
| Greyscale print PDF | `J277_Paper_1_PRINT_STUDENT_REVIEW_V3_UNPUBLISHED.pdf` | 291 | `b7a155ef1d36627e39ad4cfc7111e1baca1fff23cf80fd6f302dfbd23b3d5ef8` |
| Print-by-topic ZIP | `J277_Paper_1_PRINT_BY_TOPIC_STUDENT_REVIEW_V3_UNPUBLISHED.zip` | 16 PDFs, 265 topic pages | `3b166f164dd75bb440b9c6084984b0beed954dacaa0bfa83621d827bd5b7f8cf` |

These files exist as ChatGPT conversation attachments, **not** as public files in the GitHub repository. PDFs must not be treated as published.

## Editorial changes

- Replaced 49 targeted source-facing text blocks/lines with direct student revision guidance without changing the original diagrams, analogies, examination question content, or the 291-page structure.
- Changes occur on 27 PDF pages: 5, 17–20, 33, 58, 73, 89, 96, 110, 112, 145–146, 150, 182, 200, 202, 217, 222, 233–234, 239, 253, 256, 280, and 286.
- Replaced misleading appendix title **Exam Paper 2** with **Synoptic practice set B** without moving the appendix or its question/answer pages.
- Labelled formerly empty page 286 as **Working space**, with writing lines and the same printed page number.
- Preserved important technical corrections alongside original source illustrations, including the incorrect fridge/freezer art caption and binary value example.
- Digital and print editions have identical extracted text, page dimensions, bookmarks and PDF links.

## Automated checks — passed

- Both PDFs: **291/291 pages**, **103 bookmarks**, **20 links**, matching complete text and matching physical PDF page numbers.
- No unexpectedly blank pages, no text line boxes outside page geometry, and no remaining repeated `REFERENCE DRAFT` footer.
- **33 existing Paper 1 skill IDs** mapped to nonempty theory/learning pages within the candidate. Mappings in `candidate-paper1-page-map-20261028.json` remain proposals only.
- The other **28 Paper 2 MCQ skill IDs** and their live destinations were not changed.
- **All 291 greyscale PDF pages** sampled for colour and no meaningful RGB channel differences found.
- Regenerated **16 topic PDFs** from the V3 greyscale edition; their first and last page text is identical to the corresponding master ranges and the pack spans all 265 revised topic pages.
- Source page 280's unused PDF image-resource references were pruned during replacement of the appendix heading. A visual render comparison confirms no visible content changed outside that heading.
- Spot-rendered the impacted illustrations, anatomy of the documents, licence pages, TIER, and appendix writing space.

## Release blockers still open

1. Perform **human line-by-line technical and mark-scheme verification** across all 291 pages, not just automated geometry checks and representative visual inspection.
2. Test **actual smartphone PDF loading/performance** and a printed greyscale sample of dense original tables/illustrations.
3. Finalise whether the entire 291-page guide is practical for student use; per-topic PDFs help with printing but do not themselves reduce digital download size.
4. Only when signed off: publish final Paper 1 PDF and all 33 updated Paper 1 skill destinations, regenerate `revision/j277/guides/guide-links.js`, update hub edition URL, and run the J277/H446 live student-journey regression. Keep 28 Paper 2 destinations unchanged.
5. Reconfirm each PDF fragment `#page=N` on the actual publicly served PDF after deployment.

The print-by-topic pack retains visible master page numbers. MCQ feedback should link to the *full digital guide*, not a topic-PDF-local page.
