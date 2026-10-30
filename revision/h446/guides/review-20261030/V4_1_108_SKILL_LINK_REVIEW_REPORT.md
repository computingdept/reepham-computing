# H446 Paper 1 V4.1 — 108 skill-link review report

**Status: proposed map only; no live changes**  
**Review edition:** 392-page H446 Paper 1 appendix-corrected v4.1  
**Audit date:** 30 October 2026

## Verified structural facts

The five current Paper 1 question banks contain **108 skill-level revision-guide references**, using **73 old stable page keys**. All 108 resolve in the current 264-key map on `main`.

The new [proposed 108-skill destinations](V4_1_PROPOSED_108_SKILL_DESTINATIONS.csv) account for all **108 skills**, with a proposed target between pages 6 and 389 of the 392-page review edition. There are **85 distinct candidate teaching-page destinations**.

**Important:** This is a topic-level first-pass proposal using the candidate PDF's actual heading and teaching-page starts. All targets are in range; that does **not** certify their detailed explanations/marking points or compare them to the 264-page source. Every row is deliberately marked `PROPOSED_NOT_APPROVED`.

## Shared keys requiring an explicit split

**15** existing keys lead to different proposed review destinations for their skills. Do not repoint such a key wholesale.

| Current key | Existing skill(s) | Proposed v4.1 pages |
|---:|---|---|
| 65 | Licensing / compilation stages | 60 / 64 |
| 76 | RLE / encryption / hashing | 98 / 106 / 110 |
| 104 | SQL joins and nested queries / data modification | 345 / 353 |
| 110 | Network protocols / network hardware | 138 / 154 |
| 111 | TCP/IP stack / DNS and routing | 138 / 142 |
| 112 | Circuit and packet switching / security | 146 / 150 |
| 122 | HTML / client-versus-server processing | 361 / 170 |
| 123 | CSS / JavaScript | 365 / 369 |
| 139 | Primitive types / binary addition | 176 / 188 |
| 161 | Stacks / queues | 212 / 216 |
| 163 | Tree traversal / BST | 228 / 224 |
| 184 | D flip-flops / half adders | 268 / 260 |
| 208 | Data protection / Computer Misuse / copyright / surveillance | 274 / 282 / 286 / 290 |
| 209 | Monitoring / automated decisions / AI | 314 / 298 / 302 |
| 214 | Workforce / personal information / environment / censorship / piracy / communications / design | 294 / 318 / 306 / 310 / 322 / 322 / 326 |

Some multiple-skill keys **can safely stay shared** if the teacher confirms the one destination covers both. **25 old keys** are reused by more than one skill, but only 15 require different proposed destinations.

## Appendix-specific checks

| Skill | Live key | Proposed explanation start | Additional useful page |
|---|---:|---:|---:|
| Entity relationships | 85 | 381 (OCR symbols) | 114 (relational model) |
| SQL joins and nested `SELECT` | 104 | 345 (nested query) | 353 (join) |
| SQL record/table modification | 104 | 353 | 130 (referential integrity) |
| HTML tags, links, forms | 122 | 361 | 357 (whole document) |
| CSS selectors and style | 123 | 365 | 162 (web overview) |
| JavaScript behaviour | 123 | 369 | 373 (loop trace) |
| Little Man Computer | 230 | 385 | 84 (original chapter) |
| Object-oriented syntax | 218 | 389 | 88 (original chapter) |
| Boolean notation | 252 | 240 | 377 (notation reference) |

## Required migration method (not yet executed)

1. Obtain the **current published 264-page PDF**, compare its actual teaching material, analogies, diagrams and mark schemes with v4.1. An archived 249-page source is insufficient to declare parity.
2. Teacher-review the 108 proposed destinations, especially multi-skill and appendix split cases.
3. Preserve existing stable keys as backwards-compatible IDs where appropriate; assign **new numeric keys** for the skills genuinely needing different destination pages, and keep them unique.
4. Edit **only** the affected skill-level `page` fields in `revision/h446/section-1-*/bank.js`, after teacher approval. Do not change question IDs, wording, scoring, answer order, lesson links, saved progress or UI behaviour.
5. Build a *new* v4.1 page map from approved destinations and regenerate `revision/h446/guide-links.js` with the existing generator.
6. Verify all 108 question-bank link destinations, all deep links from old keys, and phone/desktop/print PDF navigation; publish the student PDF + map + script + needed bank fields in one reviewed release.
7. Do not deploy review-only marks or source metadata.

**Release decision: HOLD.** Neither `main` nor rhsccs.org has been modified.
