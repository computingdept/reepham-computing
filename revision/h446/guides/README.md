# H446 revision guides

The H446 hub serves these maintained student editions:

- `H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf`: 249 pages, reorganised into specification order on 23 October 2026. The existing public filename is retained so external links continue to open the guide.
- `H446_Paper_2_REVIEW_READY_2026-10-21.pdf`: unchanged by this reordering.

The 19 October `MASTER` PDFs are historical snapshots and remain unchanged.

## Paper 1 navigation

`paper-1-page-map.json` is the single maintained lookup from stable page keys to current PDF page numbers. A key is the page number in the pre-reorder edition, used as a permanent identifier, not a current destination. Existing quiz banks retain these keys in their `page` fields; do not overwrite them with the new PDF page numbers.

Run `python tools/revision/build_guide_links.py` after changing the lookup. It generates `revision/h446/guide-links.js`. Every Paper 1 practice app, including the retired Data Types pilot, uses `RHSC_GUIDE_LINKS.paper1(key)`; page labels use `pageNumber(key)`. No bank or lesson navigation needs changing when a guide destination moves.

The edition query string updates the PDF URL's cache version. Publish the PDF, lookup, generated script and affected HTML/app files in one commit. Preserve each quiz's local-storage key and lesson URLs.

The contents page links and 53 bookmarks use the new physical PDF page numbers. Footers and the PDF viewer now agree. Four internal page-reference numbers were updated. Multi-topic practice/answer sets remain intact within their specification section. Mixed memory banks remain at the end.

`docs/audits/h446-paper1-page-order-20261023.csv` records all 249 old-to-new positions. `tools/revision/reorder_h446_paper1.py` records the checked ordering and retention checks. Its original input is the approved pre-reorder PDF; never apply the permutation again to the reordered edition.
