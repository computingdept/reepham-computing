# J277 You Do — gap completion and QA tracker

**22 November 2026 · editorial review only; do not publish.**

## Corrected baseline

- Total lesson records: **164**.
- Protected assessment/project/feedback/timed exceptions: **14**.
- Ordinary lessons requiring four questions: **150** (600 presentation positions).
- Canonical RHS bank: **225 distinct bank question IDs**, assigned once, still not approved for student display.
- Initial inventory report of **70** `missing_bank_question_slots` included **four positions already filled by original lesson fallbacks** (three in Lesson 011 and one in Lesson 016). Genuine empty positions before new drafting: **66**, not 70.
- This review adds six *new, unapproved* fourth-question drafts (031, 034, 038, 042, 044, 045), leaving **60 genuinely empty positions**.
- 90 ordinary lessons currently have four proposal slots, **including six editorial-only drafts**; filled slots are not equivalent to approved questions.
- All **164** `teacher_approved=false` and `published_bank_override_enabled=false`.

## Six draft QA records

| Lesson | Draft | Content/marking | Visual | Teacher sign-off | Student display |
|---|---|---|---|---|---|
| 031 | `RHS-ORIGINAL-J277-031-Q4-DRAFT` | Needs independent check | No figure required (pending projector QA) | Pending | Disabled |
| 034 | `RHS-ORIGINAL-J277-034-Q4-DRAFT` | Needs independent check | No figure required (pending projector QA) | Pending | Disabled |
| 038 | `RHS-ORIGINAL-J277-038-Q4-DRAFT` | Needs independent check | No figure required (pending projector QA) | Pending | Disabled |
| 042 | `RHS-ORIGINAL-J277-042-Q4-DRAFT` | Needs independent check | No figure required (pending projector QA) | Pending | Disabled |
| 044 | `RHS-ORIGINAL-J277-044-Q4-DRAFT` | Needs independent check | No figure required (pending projector QA) | Pending | Disabled |
| 045 | `RHS-ORIGINAL-J277-045-Q4-DRAFT` | Needs independent check | No figure required (pending projector QA) | Pending | Disabled |

## Remaining review gates

1. Finish remaining 60 genuinely empty positions from unique original scenarios; preserve exact lesson alignment and do not clone the same question across lessons.
2. Audit question texts for OCR-source distinction/originality, answer completeness and realistic mark allocation. Bank marking-verification status does **not** constitute teacher approval; new drafts do not yet have independent marking verification.
3. Review the complete four-question lesson sets for suitable variation and no unexpected repeats, then inspect all associated question and answer artwork. No completed-answer SVG may appear on the question screen.
4. Test actual You Do view at classroom projector half-screen, mobile and print; four exam questions together, one full-page answer per question, top-aligned readable answers. Retain the original Code First task and repeated prompt/answer.
5. Teacher approval required before any per-lesson `teacher_approved` and `published_bank_override_enabled` changes. Do not switch any flags as part of these content review branches.

**No source lesson, JS, CSS, SVG, other phase, Cloudflare or H446 edits are included.**
