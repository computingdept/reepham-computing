# H446 Paper 1 V4.2 — late-edition vocabulary preservation

**Date:** 30 October 2026  
**Status:** teacher-review candidate only. **No files on `main` or rhsccs.org were changed.**

## Candidate PDF created, not uploaded to GitHub

- Filename: `H446_Paper1_Review_v4_2_396pages_Glossary_Restored.pdf`
- Pages: **396 A4** (the complete 392-page V4.1 followed by a 4-page reference supplement)
- SHA-256: `e663c6e3e7a7ccb08a1a73dfbd763b4ae530f78c8881e7c21378e6d52b9b1672`
- File size: **1,508,415 bytes**
- The first 392 pages have **exactly the same extracted text** as V4.1; no page order, learning cycle, practice or answers were changed.
- PDF bookmarks: **125** (120 original + 5 reference bookmarks).
- Internal PDF links: **168** (164 original + 4 working index links).
- New supplement pages **393–396**. The clickable reference index is on page 393.
- Reviewed rendered images of all four new pages; no visible overlap or clipping.
- GitHub continues to hold the prior **337-page v1 PDF**, pending deliberate upload of a new review edition.

## What the 264-page repository history proved

The current `main` repository contains guarded migration scripts that describe how the original 249-page edition became the published **264-page** PDF. They added:

1. **Four subject additions**: stable keys 250 (character sets), 251 (logic gates), 252 (Boolean problems/truth tables), 253 (logical shifts/masks). Relevant teaching topics are present in V4.1 at pages **204, 244, 240 and 200** respectively.
2. **Eleven glossary/reference pages**: stable keys 254–263 (ten terminology tables) and 264 (Boolean glossary). The original source `tools/revision/h446_paper1_terms.json` defines the terms. A keyword check against the relevant sections of V4.1 identified gaps, so the new **V4.2 four-page supplement** restores core wording and short explanatory examples.

### Terms explicitly restored

| New page | Terms clarified |
|---:|---|
| 394 | Control unit, program counter, parallel processing, SIMD, input device, sensor, actuator, DAC |
| 395 | Prototyping, HTTP GET, HTTP POST |
| 396 | Character encoding, bit mask, algorithmic bias, digital divide |

Some of these ideas appeared under different wording or in another chapter, but the revised supplement provides **an explicit searchable definition and example**. This is a *targeted vocabulary preservation patch*, not an assertion that the new document reproduces every original glossary page.

## Proposed destinations for the 15 post-archive stable keys

[Read the 15-row crosswalk](V4_2_LAST_15_STABLE_KEY_CROSSWALK_REVIEW.csv). The proposed pages are **not approved as a replacement for live keys** until verified against the actual current 264-page PDF. Legacy quiz links should stay on the existing published guide.

## QA performed

- [x] 396 A4 pages; original 392 pages' extracted text identical.
- [x] 125 bookmarks and 168 links; all link target pages within 1–396.
- [x] Four reference index links point to the intended glossary page panels (394 / 394 / 395 / 396).
- [x] Rendered and inspected new pages.
- [x] Added explicit terminology where the prior candidate lacked exact wording.
- [x] All 15 post-249-page legacy keys accounted for in provisional crosswalk.
- [ ] Compare the complete current **264-page binary** against V4.2. Only the archived 249-page PDF was available to inspect locally; the public GitHub raw download was blocked in this execution environment.
- [ ] Check topic-level preservation of diagrams, original examples, mark schemes and glossary detail.
- [ ] Verify all **264** legacy page keys, not only the 108 active quiz skill references / 15 added keys.
- [ ] Subject-level validation, teacher sign-off, removal of review notices, phone/print QA.

**RELEASE HOLD:** Neither V4.2 nor its 15-key provisional crosswalk may be deployed to the student website yet. Do not modify `paper-1-page-map.json`, `guide-links.js`, question banks, or lesson navigation based on these suggestions alone.

## Sources

- `revision/h446/guides/paper-1-page-map.json` (264 stable keys, original added-page entries 250–264)
- `tools/revision/h446_paper1_terms.json` (ten glossary definitions)
- `tools/revision/add_h446_paper1_logic_vocabulary.py` (final logic glossary)
- `tools/revision/migrate_h446_paper1_terminology.py` (253-to-263-page glossary migration)
- OCR H446 specification, Appendix 5d/5f: https://www.ocr.org.uk/Images/170844-specification-accredited-a-level-gce-computer-science-h446.pdf
