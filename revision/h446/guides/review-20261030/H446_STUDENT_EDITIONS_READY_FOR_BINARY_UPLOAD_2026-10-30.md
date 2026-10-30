# H446 student editions — consolidated files ready for binary upload

**Assembled:** 30 October 2026  
**Delivery status:** Both final student-facing PDF files generated and structurally checked in the ChatGPT working environment. **They have not been uploaded to GitHub** because the available connector cannot transfer binary files.

## Ready student PDFs

| Paper | File | PDF pages | Contents |
|---|---|---:|---|
| Paper 1, Computer Systems | `H446_Paper_1_FINAL_Student_Revision_Guide.pdf` | **424** | 396-page expanded visual guide; preserved original exam practice appendix pp397–424 (index + 27 original pages) |
| Paper 2, Algorithms and Programming | `H446_Paper_2_FINAL_Student_Revision_Guide.pdf` | **279** | 248-page expanded visual guide; preserved original exam practice appendix pp249–279 (index + 30 original pages) |

Original practice pages are reproduced from the two *actual* GitHub-published source PDFs, with full source text retained. Paper 1 preserves database, data structures and extended legal/ethical practice. Paper 2 preserves C# programming tasks including CountPasses, ValidTimes, Overlaps and CountDistinctSorted, plus original mixed recall.

The original 264-page and 179-page PDFs remain available separately and are also included as backups in the ZIP packages, alongside unit-level PDF extracts.

## Structural checks

- Paper 1: **424 A4 pages; 130 bookmarks; 178 in-range PDF links**.
- Paper 2: **279 A4 pages; 69 bookmarks; 95 in-range PDF links**.
- All **27** Paper 1 and **30** Paper 2 reproduced original appendix-page text streams match their source pages (apart from added navigation labels).
- New master covers link to chapter starts and original practice appendices.
- Page numbering of the expanded original chapters remains unchanged.
- Administrative **teacher-review/not-published** labels removed from the student-facing PDFs; selected intro copy made student-appropriate.
- Selected rendered cover, chapter and appendix pages inspected.

**Important limitation:** Structural pass does **not** constitute exhaustive OCR subject-specialist verification of every technical calculation or original model answer.

## Safest GitHub release method

1. Upload both exact student PDFs as **new files** into `revision/h446/guides/` on a staging branch or directly via GitHub's upload UI. Keep the existing PDF files intact.
2. Update only the **main Read/Print guide links** in `h446-hub.html` to the two new filenames and check that both work.
3. **Do not edit** `revision/h446/guides/paper-1-page-map.json`, `paper-2-page-map.json`, `revision/h446/guide-links.js` or quiz banks during this immediate release. They continue to reference the old still-published PDFs, so no quiz link or student progress is broken.
4. Later, use the staged new skill-by-skill candidate link maps for a separate reviewed update. Those mappings are not mandatory to publish the improved student guides safely.
5. Test Read, Print and mobile after deployment. Confirm the PDFs actually exist on `main` before changing the hub.

## Why two existing links can coexist

The main revision guide can point to the new visual student edition, while old per-question guide feedback links intentionally continue to the original 264/179-page PDF. This is a deliberate compatibility phase, not a claim that the updated deep links have been migrated.

**Status right now:** PDFs created in the conversation, GitHub binary upload not performed; rhsccs.org not changed.
