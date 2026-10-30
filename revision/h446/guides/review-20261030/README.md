# H446 Paper 1 — visual revision guide (teacher review)

**Status: REVIEW ONLY — not approved for the live student site.**

This branch is a staging area for the 337-page visual-revision master assembled on **30 October 2026**. It does not replace the student guide or change the hub, lessons, guide-links.js, or revision quizzes.

## Uploaded PDF — verified 30 October 2026

- **File:** [H446_Paper1_Review_337_pages.pdf](H446_Paper1_Review_337_pages.pdf)
- **Location:** `revision/h446/guides/review-20261030/`
- **Length:** 337 A4 pages
- **Uploaded size:** 1,271,443 bytes
- **SHA-256:** `0761c29ddb6f307df9197e0e76bac8c3c7b156768b9108a1742ae897966a2955`
- **Git blob SHA-1:** `1efb4d8f54da07c54d80f6ff8bffbe35919aabec` (matches GitHub file metadata)
- **Content:** Text of all 337 pages matches the original assembled 337-page master; 100 bookmarks and 89 links are retained.
- **Note:** This re-exported/downloadable copy has a different binary file hash from the original master, while its extracted text and navigation counts match. This is a review copy, not a teacher-approved publication.

## Next review PDF: corrections v2 — upload pending

A corrected **337-page v2 PDF** has been generated in the ChatGPT conversation. It restores memory fragmentation and optical mark recognition in **eight existing pages**, adds practice/marking points, and preserves all 100 bookmarks and 89 links. It has **not** replaced the v1 PDF in this GitHub branch.

- **File to upload:** `H446_Paper1_Review_337_pages_Corrections_v2.pdf`
- **SHA-256:** `b264409263a09691f9bf5d017603661585693d79b3c0836ab62a935c93eef06c`
- **Review notes:** [CORRECTIONS_V2_2026-10-30.md](CORRECTIONS_V2_2026-10-30.md)

The first-pass audit used an archived 249-page guide. The present **264-page published PDF still requires a complete content comparison** before the student website can be updated.

## Visual restoration v3 — new 342-page review PDF pending GitHub upload

Five full-page visual explanations have been recreated from the archived guide and linked from the appropriate 1.1 learning cycles. The corrected 337-page v2 remains at the same page positions; five pages have been appended (338–342). **The uploaded GitHub PDF is still the 337-page v1.**

- [Read the v3 contents and verification report](VISUAL_MEMORY_BRIDGES_V3_2026-10-30.md)
- **File to upload:** `H446_Paper1_Review_342_pages_Visual_Bridges_v3.pdf`
- **SHA-256:** `1c3361137b9b88a73c4f90ebc8b73087ff8df58505535c10abfa8c6483f4fe45`
- **Live site:** unchanged; release still **HOLD**.

## Appendix coverage improvements v4 — 392-page PDF review copy available in ChatGPT

The Appendix 5d/5f audit has been applied in a **new, separate 392-page teacher-review PDF**. The first 342 pages remain at their original page positions, followed by 50 pages of OCR-specific SQL, HTML, CSS, JavaScript, Boolean, ERD, LMC and OOP practice.

- [Full changes, verification and page map](APPENDIX_EXPANSION_V4_2026-10-30.md)
- **File to upload on this branch:** `H446_Paper1_Appendix_Complete_Review_v4_392_pages.pdf`
- **SHA-256:** `690fb110a186af49bdc54d56d5b26fc9e40c1a90a45d71f7b40e76371e13360b`
- The PDF currently in GitHub remains the **337-page v1**: v4 has **not** been uploaded there.
- **Release: HOLD** until 264-page content parity, old-to-new stable quiz links and teacher verification are complete.

## Appendix technical QA v4.1 — 392-page review PDF

The latest **392-page** appendix-corrected review copy is `H446_Paper1_Appendix_Review_v4_1_392_pages.pdf` (SHA-256 `e351cc1c7b0a6b49ca0cbaf82eb06624b08dd36d685bbfb2c5f789f54575986d`). It corrects the SQL marking example, JavaScript form invocation and LMC mailbox naming. The PDF is available in the ChatGPT conversation **but has not been uploaded to this GitHub branch**.

[Read the v4.1 technical QA report](APPENDIX_TECHNICAL_QA_V4_1_2026-10-30.md). The **release hold remains** until direct comparison with the 264-page published guide, mapping verification and teacher sign-off are complete.

## Live quiz-reference audit — checked against main

All **108** skill-level Paper 1 page references from five live question banks resolve to valid stable keys in the current 264-page map. They use **73** distinct keys, with **25 keys shared by multiple skills**. Some sharing needs separating for the 392-page guide, particularly SQL joins vs SQL modifications and CSS vs JavaScript.

[Read the quiz-link integrity results and proposed split-key strategy](LIVE_QUIZ_LINK_INTEGRITY_AND_SPLIT_PLAN_2026-10-30.md).

**No live files changed; quiz-link remapping and full content parity remain HOLD.**

## 108 quiz destinations mapped for review (not live)

The proposed V4.1 map now covers **all 108 Paper 1 quiz skills** with in-range teaching-page targets. It identifies **15 shared stable keys** whose skills need different destinations; these should be split deliberately at release rather than globally remapped.

- [Proposed page for each of 108 skills (CSV)](V4_1_PROPOSED_108_SKILL_DESTINATIONS.csv)
- [Review report and safe migration plan](V4_1_108_SKILL_LINK_REVIEW_REPORT.md)

No quiz banks, generated links, guide PDF, or student site have been changed. Full preservation audit against the **current 264-page binary** is still outstanding.

## V4.1 staged key-split migration (review-only)

The draft now maps **108 skills to 96 active key destinations**: **73 reused old keys plus 23 new split keys**. Its internal consistency checks pass, and **83 distinct proposed PDF pages** have been checked in the exact 392-page V4.1 file: all contain text, are within bounds and do not land on the self-marking/answer pages.

- [Draft skill/key migration JSON](V4_1_STAGED_SKILL_KEY_MIGRATION.json)
- [Read-only validation script](validate_staged_skill_map.py)
- [Full 108-skill destination CSV](V4_1_PROPOSED_108_SKILL_DESTINATIONS.csv)

**191 other legacy keys remain unresolved.** The review-file checker is intentionally fail-closed if question-bank fields or the current map change; it also supports `--pdf ... --require-pdf` for full binary-hash and page tests. These are **structural tests, not a content or teacher-approval audit**. No live code was changed. `main` and rhsccs.org remain unchanged.

## Contents

| Topic | Master PDF pages | Pages |
|---|---:|---:|
| 1.1 Processors, input/output and storage | 4–33 | 30 |
| 1.2 Software and software development | 34–91 | 58 |
| 1.3 Exchanging data | 92–173 | 82 |
| 1.4 Data types, structures and Boolean algebra | 174–271 | 98 |
| 1.5 Legal, moral, cultural and ethical issues | 272–329 | 58 |
| Supplementary recall | 330–337 | 8 |

There are three pages of global navigation, 79 four-page learning cycles, 100 bookmarks and 89 PDF links. Existing students' material is unaffected by this review branch.

## Initial structural checks

- [x] 337 A4 pages
- [x] Five chapter sections in OCR specification order
- [x] Selectable text present on each page
- [x] PDF bookmarks and internal link targets checked
- [x] No exactly duplicated text pages
- [x] Binary PDF uploaded and Git blob hash verified
- [ ] Page-by-page content comparison with the current **264-page published H446 guide**
- [ ] Validate diagrams, technical explanations and exam answers against OCR H446 and existing lessons
- [ ] Validate legacy recall appendix against the latest 264-page guide
- [ ] Rebuild and test the old-to-new page mappings before changing `guide-links.js`
- [ ] Cross-device screen/mobile/print checks
- [ ] Teacher sign-off before any student-facing link is changed

**Release gate: HOLD.** Keep this review branch separate from `main` until those checks have passed. A GitHub preview of the PDF is not equivalent to publication on rhsccs.org.
