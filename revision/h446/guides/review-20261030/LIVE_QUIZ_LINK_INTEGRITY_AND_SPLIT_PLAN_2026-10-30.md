# H446 Paper 1 — live quiz-link integrity and v4.1 split-key plan

**Date:** 30 October 2026  
**Release status: HOLD.** This is a read-only audit of `main`; no quiz bank, guide PDF, page map, generated script or student-facing site was changed.

## What was actually checked

On the live/default `main` branch, inspected all five Paper 1 question banks:

- `revision/h446/section-1-1/bank.js`
- `revision/h446/section-1-2/bank.js`
- `revision/h446/section-1-3/bank.js`
- `revision/h446/section-1-4/bank.js`
- `revision/h446/section-1-5/bank.js`

Verified the numeric skill-level `page` fields against the **264 stable keys** in `revision/h446/guides/paper-1-page-map.json`. Confirmed that quiz apps call `RHSC_GUIDE_LINKS.paper1(active.page)`.

| Metric | Observed |
|---|---:|
| Paper 1 question-bank files | 5 |
| Skill-level guide references | **108** |
| Distinct stable keys used by those skills | **73** |
| References that fail to resolve to current 264-page map | **0** |
| Stable keys supported in the existing page map | 264 |
| Destination changes made | **0** |

This verifies **link integrity under the currently published guide**, not accuracy of a future destination.

## Key problem: several learning skills share one stable page key

Some sharing is pedagogically reasonable, but several combinations are now too broad if they are to point precisely at v4.1's separate appendix lessons.

| Shared stable key | Skills currently sharing it | Why separate destinations may help |
|---:|---|---|
| **104** | SQL joins and nested queries; SQL INSERT, UPDATE, DELETE and DROP | SQL nesting is taught on v4.1 p345, whereas SQL modification and DROP are taught on p353; INNER JOIN is included on p353 |
| **123** | CSS selectors and presentation; JavaScript and page behaviour | CSS in v4.1 p365, JavaScript form and tracing in pp369/373 |
| **122** | HTML structure, links and forms; client-side/server-side processing | HTML in pp357/361, client/server is in main chapter pp170–173 |
| **65** | Open-source/closed-source software; stages of compilation | Distinct software concepts |
| **76** | Run-length encoding; encryption; hashing | Distinct 1.3.1 subtopics |
| **184** | D-type flip-flops; half adders | Different 1.4.3 concepts |
| **139** | Primitive data types; binary addition/subtraction | Distinct 1.4.1 concepts |

There are **25 distinct keys used by more than one skill** across these five banks. The other shared keys need individual judgment; sharing is not inherently a bug.

## Verified review-edition destinations for focused teacher checking

These are **review destinations**, not approved replacements for the live stable key map.

| Skill | Current stable key | v4.1 main-chapter page | v4.1 focused appendix starting page(s) |
|---|---:|---:|---|
| Assembly language and Little Man Computer | 230 | 84 | 385 |
| Object-oriented language features | 218 | 88 | 389 |
| Entity relationships | 85 | 114 | 381 |
| SQL SELECT, filters and sorting | 88 | 126 | 345, 349 |
| SQL joins and nested queries | **104** | 126 | 345, 353 |
| SQL INSERT, UPDATE, DELETE and DROP | **104** | 130 | 353 |
| HTML structure, links and forms | **122** | 162 | 357, 361 |
| CSS selectors and presentation | **123** | 162 | 365 |
| JavaScript and page behaviour | **123** | 162 | 369, 373 |
| Define a Boolean problem | 252 | 240 | 377 |

The new 392-page PDF contains tested internal appendix links originating from main-chapter pages 2, 84, 88, 114, 126, 130, 162, 164, 170 and 240, and appendix topics have additional navigation from the appendix index on pp343–344.

## Safe release strategy

1. **Keep the current 264-key mapping unchanged** until a complete 264-page source comparison and teacher subject review.
2. For shared keys that genuinely need different outcomes, give each affected skill its **own stable numeric key** (e.g. new keys after 264) and add that key to the **new** page map. Avoid arbitrary remaps of every occurrence of old key 104 or 123, which would send at least one skill to the wrong topic.
3. Change only each affected skill's `page` field, leaving question IDs, skill IDs, answer content, score thresholds and local-storage keys alone. The apps can continue using their existing `RHSC_GUIDE_LINKS.paper1(active.page)` interface.
4. Rebuild `revision/h446/guide-links.js` using the existing generator and validate *every* skill link against the final student PDF.
5. Preserve old stable keys for prior deep links; don't delete or repurpose them without explicit audit.
6. **Publish the student PDF, map, bank page fields and generated link script together**, after visual/mobile/print regression and teacher approval.

## Remaining limitation

The accessible archived H446 PDF is the **249-page edition**. The live repository holds a **264-page PDF**, but the connector exposed its filename/size/blob SHA, not its binary contents. Therefore **full content parity with the actual current edition is still unverified**. A link/key integrity check cannot substitute for that comparison.

**No change was made to `main` or to rhsccs.org.**
