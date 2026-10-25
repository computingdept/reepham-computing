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

## Whole-course presentation audit · 25 October 2026

- [Comprehensive I Do / We Do formatting report](cross-course-format-audit-2026-10-25.md) — **463 standard lessons**, three screen sizes, **26,391 passed browser checks**, zero hard failures; 41 potential compact-TV clipping warnings in 28 H446 lessons remain under review.
- [Complete H446 compact-TV exception CSV](h446-compact-tv-vertical-fit-2026-10-25.csv) — measured excess height, grouped for follow-up. J277 113 is a standalone revision-interface exception.
- [Automated whole-course browser workflow](../../.github/workflows/full-course-format-audit.yml) — four shards, all existing standard lesson pages at TV, compact TV and mobile sizes.

## Current position
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
