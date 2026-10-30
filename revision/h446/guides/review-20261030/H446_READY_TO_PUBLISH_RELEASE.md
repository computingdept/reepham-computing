# H446: Two consolidated student PDFs — ready for upload

Prepared 30 October 2026. The student PDFs were built in ChatGPT from the expanded visual guides and both verified original published source PDFs. **Both PDF binary files exist as downloadable ChatGPT attachments but are not yet present in this GitHub branch.**

## Upload exactly these two PDF files

Upload to the **branch `h446-paper1-teacher-review-20261030`** in folder **`revision/h446/guides/`**:

| Filename | Pages | SHA-256 |
| --- | ---: | --- |
| `H446_Paper_1_FINAL_Student_Revision_Guide.pdf` | 424 | `223ab1fdd7fb3bffc6f324e7963c912f955c4330d548aa63ed00dee605c5cc64` |
| `H446_Paper_2_FINAL_Student_Revision_Guide.pdf` | 279 | `270559b03f9842c647f43f2b7157faeba8b874d4b1c0e1f021fb1f1f66eb7e17` |

The branch **already stages the two Read and Download guide links** in `h446-hub.html`. There are four href replacements only. **Do not merge this branch before uploading both PDFs**, or the new links will be broken. Then preview all four links and merge once complete.

## Content and QC

- Paper 1 retains the full expanded 396-page revision guide and appends 27 selected source-original worked/practice/answer pages (plus one index), including databases, data structures and nine-mark ethics reasoning.
- Paper 2 retains the full expanded 248-page visual guide and appends 30 selected original C# practice and recall pages (plus one index), including `CountPasses`, `ValidTimes`, `Overlaps`, `CountDistinctSorted`.
- Original artwork and original practice source pages have been preserved as a fallback inside each user's downloadable ZIP bundle.
- Master chapter pages and existing question/answer phases remain in the same positions as the expanded drafts.
- Both PDFs use student-facing covers, chapter links, appendix links and working bookmarks.
- Structural PDF checks: **Paper 1 424 pages / 130 bookmarks / 178 internal links**, **Paper 2 279 pages / 69 bookmarks / 95 links**, with no out-of-range GOTO links. Appended source page text checked for all 57 original preserved practice pages.
- Technical correctness spot checks were completed previously; **not every technical claim/indicative marking point was independently revalidated**. The guides should still receive final teacher acceptance before student release.

## Safety of existing student quiz links

Do **not** modify the current `paper-1-page-map.json`, `paper-2-page-map.json`, `guide-links.js`, or question-bank `page` fields as part of this release. All existing per-question revision links continue to open the old guides, which remain intact in `revision/h446/guides/`. No IDs, stored progress or navigation behaviour need change.

## Limitation

The available GitHub connector can change text files, but it could not transfer generated **binary PDF** bytes directly. Therefore there is still a required PDF upload via the GitHub web UI or an enabled binary-upload tool. **This document is not evidence that the PDFs have been published.**
