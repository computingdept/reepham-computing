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

## Current position
See [workstreams.csv](workstreams.csv). Counts in that CSV are **historical reports, not a new repository-wide audit**. Treat completion, publication and coverage claims as unverified until the evidence is linked and retested.

## Evidence files
- [workstreams.csv](workstreams.csv): one status row per workstream
- [issues.csv](issues.csv): confirmed defects, proposed fixes, evidence and live verification
- [j277-coverage.csv](j277-coverage.csv): placeholders for J277 specification-point evidence
- [h446-coverage.csv](h446-coverage.csv): placeholders for H446 specification-point evidence
- [J277-H446-UI-INTEGRATION.md](J277-H446-UI-INTEGRATION.md): actual shared architecture, applied changes and pending tests
- [Classroom TV smoke test](classroom-tv-smoke-test.html): representative J277/H446 live browser checks
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
