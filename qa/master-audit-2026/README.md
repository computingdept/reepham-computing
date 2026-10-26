# RHSC Computer Science — J277 & H446 Master Audit

Central audit register. Started 24 October 2026.

**Scope:** OCR J277 GCSE, OCR H446 A Level, lessons, retrieval, programming, self-marking, revision guides, MCQs, specification coverage and classroom/mobile presentation.

## Status language
- **Approved design** = teacher accepts the approach, NOT verification across all files.
- **Historical report** = reported in an earlier ChatGPT working conversation, not freshly verified against the repository.
- **Applied** = source change confirmed in GitHub.
- **Published** = confirmed deployed to rhsccs.org.
- **Verified** = independently tested in the actual student/teacher interface.
- **Pending** = not yet checked or requires action.

## Decision baseline (24 October 2026)
- H446 revision-guide presentation and MCQ approach: **approved design; preserve**.
- H446 I Do / We Do / You Do formatting: **approved design; preserve**, subject to final live QA.
- J277 programming examples: OCR-style Exam Reference Language (ERL), not C#.
- J277 Do Now: four questions; Q2 simple short MCQ; Q4 challenge; retrieval from prior lessons.
- J277 You Do: separate Code First; three exam-style questions; yellow command words; grouped marking on classroom TV and sequential mobile marking.
- Do not make content or CSS changes just to redesign approved features; fix independently confirmed issues.

## You Do presentation audit · 25 October 2026

- [Cross-course You Do formatting audit and defect ledger](youdo-format-audit-2026-10-25.md): user-observed Lesson 001 binary SVG numbers concatenated by J277's exam-card adapter; root-cause code repair and responsive diagram grid committed; shared one-question-per-phone navigation; long H446 exam questions given own screen.
- [Automated You Do TV/compact TV/phone regression](../../.github/workflows/youdo-presentation-audit.yml): 463 standard lesson pages, all question diagrams, visible answers and source card geometry. Latest full browser pass: [40304293162](https://github.com/computingdept/reepham-computing/actions/runs/40304293162), all four shards successful (13,646 checks, zero warnings); this remains separate from I Do / We Do.
- Separate visual spot-checks remain useful for dense J277 phone diagrams; non-standard assessment page structure has been [tested independently](https://github.com/computingdept/reepham-computing/actions/runs/40323952386). Repeated Lesson 001 number 154 is a **content-quality** exception only, left unchanged during formatting.

## Whole-course presentation audit · 25 October 2026

- [Comprehensive I Do / We Do formatting report](cross-course-format-audit-2026-10-25.md) — **463 standard lessons**, three screen sizes, **26,547 passed browser checks**, zero hard failures and zero clipping warnings on the latest [revalidation 40228209877](https://github.com/computingdept/reepham-computing/actions/runs/40228209877). Historical 41 warnings were cleared.
- [Complete H446 compact-TV exception CSV](h446-compact-tv-vertical-fit-2026-10-25.csv) — measured excess height, grouped for follow-up. J277 113 is a standalone revision-interface exception.
- [Automated whole-course browser workflow](../../.github/workflows/full-course-format-audit.yml) — four shards, all existing standard lesson pages at TV, compact TV and mobile sizes.

## Shared yellow marker regression · 26 October 2026

- [Completed four-shard browser run 40322377801](https://github.com/computingdept/reepham-computing/actions/runs/40322377801): **463 standard lesson pages** (J277 163 + H446 300), **926 browser visits** at 1920×1080 and 390×844. Four successful shards, **zero hard failures and zero width-review warnings**.
- The test independently checks that the shared marker module and CSS load, vocabulary previews receive drawn pen-stroke styling when applicable, auto-highlighted vocabulary/command words have no solid rectangular fill, and no uncaught page errors occur. Counts across both viewports: **920 pages with vocabulary previews correctly drawn**, 1,694 shared vocabulary highlights, 1,808 shared command-word highlights, and 46 authored keyword highlights.
- [Automated source checker](keyword-highlighter-regression.cjs) and [workflow](../../.github/workflows/keyword-highlighter-audit.yml) rerun when shared marker styling or the lesson engine changes.
- **Scope limit:** evidence establishes shared highlight rendering and width consistency in Chromium, not the correctness or completeness of authored vocabulary, actual mobile-device appearance, or pixel-perfect visual review. Lesson 113 is a separate standalone interface.

## Current position

**Authoritative verified formatting status:** [26 October presentation verification register](presentation-verification-2026-10-26.md). It links the cross-course tests, standalone J277 113 and special assessment regression, with explicit limitations. Previous warning totals are historical when superseded by successful reruns.

See [workstreams.csv](workstreams.csv). Counts in that CSV are **historical reports, not a new repository-wide audit**. Treat completion, publication and coverage claims as unverified until the evidence is linked and retested.

## Evidence files
- [workstreams.csv](workstreams.csv): one status row per workstream
- [issues.csv](issues.csv): confirmed defects, proposed fixes, evidence and live verification
- [j277-coverage.csv](j277-coverage.csv): placeholders for J277 specification-point evidence
- [h446-coverage.csv](h446-coverage.csv): placeholders for H446 specification-point evidence
- [J277-H446-UI-INTEGRATION.md](J277-H446-UI-INTEGRATION.md): actual shared architecture, applied changes and pending tests
- [Classroom TV smoke test](classroom-tv-smoke-test.html): representative J277/H446 live browser checks
- [Exit Ticket rollout and QA](exit-ticket-rollout.md): approved staged YES/NO design; 164 J277 answer-data checks; 38 H446 verified-answer opt-ins; remaining exceptions and smoke-test plan
- [I Do / We Do reveal standard](modelling-step-reveal-2026-10-25.md): teacher-controlled first worked step, shared implementation, exceptions and verification samples
- [lesson-inventory.csv](lesson-inventory.csv): 164 J277 and 320 expected H446 lesson slots, source SHAs, exceptions and verification status

**Coverage tables are intentionally unpopulated.** Do not interpret an empty table as zero coverage or claim full specification coverage until every applicable point, including appendices, has been checked against the latest relevant OCR specification and actual lesson/question files.

## Operating workflow
1. Inventory lessons, supporting JS/CSS, revision guides and audits currently in repository.
2. Record source evidence paths and hash/date for each audit.
3. Assess discrepancies against OCR specification, not assumptions.
4. Log proposed changes, approvals and application.
5. Validate deployment and independently test desktop 1920×1080 and mobile ~390×844.
6. Update evidence and workstream status; do not silently mark items complete.

**GitHub holds evidence. ChatGPT Project “RHSC Computer Science — J277 & H446 Master Audit” holds discussion and decisions.** Moving a chat into the Project does not automatically copy its history into GitHub.

## Interactive Lesson 001 presentation review
- [Compare J277 and H446 — phase-by-phase reviewer](compare-lesson-001.html). This is a UI/UX review instrument, not a live lesson modification. Feedback stays in the reviewer's browser until copied back to the audit conversation.
