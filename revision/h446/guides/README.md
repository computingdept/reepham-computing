# H446 revision guides

The H446 hub serves these maintained student editions:

- `H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf`: 249 pages, reorganised into specification order on 23 October 2026. The existing public filename is retained so external links continue to open the guide.
- `H446_Paper_2_REVIEW_READY_2026-10-21.pdf`: now ordered 2.1, 2.2.1(a-f), 2.2.2, 2.3.1(a-f), then mixed recall. All 169 pages are retained.

The 19 October `MASTER` PDFs are historical snapshots and remain unchanged.

## Paper 1 navigation

`paper-1-page-map.json` is the single maintained lookup from stable page keys to current PDF page numbers. A key is the page number in the pre-reorder edition, used as a permanent identifier, not a current destination. Existing quiz banks retain these keys in their `page` fields; do not overwrite them with the new PDF page numbers.

Run `python tools/revision/build_guide_links.py` after changing the lookup. It generates `revision/h446/guide-links.js`. Every Paper 1 practice app, including the retired Data Types pilot, uses `RHSC_GUIDE_LINKS.paper1(key)`; page labels use `pageNumber(key)`. No bank or lesson navigation needs changing when a guide destination moves.

The edition query string updates the PDF URL's cache version. Publish the PDF, lookup, generated script and affected HTML/app files in one commit. Preserve each quiz's local-storage key and lesson URLs.

The contents page links and 53 bookmarks use the new physical PDF page numbers. Footers and the PDF viewer now agree. Four internal page-reference numbers were updated. Multi-topic practice/answer sets remain intact within their specification section. Mixed memory banks remain at the end.

`docs/audits/h446-paper1-page-order-20261023.csv` records all 249 old-to-new positions. `tools/revision/reorder_h446_paper1.py` records the checked ordering and retention checks. Its original input is the approved pre-reorder PDF; never apply the permutation again to the reordered edition.

## Paper 2 specification order

`paper-2-page-map.json` maps all 169 stable old-edition page keys to current destinations. The four Paper 2 apps use `RHSC_GUIDE_LINKS.paper2(key)`. Publish the guide, generated lookup, app dependencies and hub together. Lesson destinations, question banks and saved results are unchanged.

`docs/audits/h446-paper2-page-order-20261023.csv` records every destination. `tools/revision/reorder_h446_paper2.py` retains complete mixed-topic practice blocks and their answers; its input must be the pre-reorder edition. All 168 content page bodies are pixel-identical above the updated footers. The contents, bookmarks and continuous page numbers have been rebuilt.

## Character sets addition — 23 October 2026

Paper 1 now has 250 pages. Page 178 adds 1.4.1(j), ASCII and Unicode, aligned with Lesson 008. Stable key `250` identifies this new page; key `132` still identifies the original marking page. Later physical page destinations advance by one. The contents, bookmarks, continuous footers and four printed internal cross-references were updated. The lookup edition is `2026-10-23-character-sets`. `tools/revision/add_h446_character_sets.py` records this migration and refuses repeat application; use the 249-page pre-insertion edition as its input.

## Logic foundations addition — 23 October 2026

Paper 1 now has 252 pages. New keys `251` and `252` open pages 214 and 215: gate symbols/rules/truth tables, followed by the secure-door model from Lesson 026 and a complete 16-row truth table. These begin 1.4.3; all prior content is retained. The model and gates quiz topics now open these pages. Later destinations advance by two, with contents, bookmarks, footers and four printed references updated together. Edition: `2026-10-23-logic-gates`. `tools/revision/add_h446_logic_gates.py` requires the preceding 250-page edition and refuses repeat application. Its page drawing code is `h446_logic_gate_pages.py`.

## Shifts and masks addition — 23 October 2026

Paper 1 now has 253 pages. New key `253` opens page 172, a Lesson 003-aligned worked page for fixed-width logical shifts and AND/OR/XOR masks. The shifts quiz opens this page. All prior content remains; later page destinations, added-page metadata, contents, bookmarks, footers and four printed references advance together. Edition: `2026-10-23-shifts-masks`. `tools/revision/add_h446_shifts_masks.py` requires the preceding 252-page edition and refuses repeat application.
