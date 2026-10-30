# H446 Paper 1 — provisional 264-key review (30 October 2026)

**Status: HOLD — this is an audit, not a replacement mapping.**

## Files

- [Full 264-key provisional CSV](PROVISIONAL_264_KEY_MIGRATION_AUDIT.csv)
- [First-pass editorial audit](FIRST_PASS_EDITORIAL_AUDIT_2026-10-30.md)
- [Correction notes for review PDF v2](CORRECTIONS_V2_2026-10-30.md)

## Classification

| Type | Keys | Meaning |
|---|---:|---|
| Strong candidate, **unverified** | 98 | A comparatively strong text similarity match to a new chapter topic |
| Provisional | 82 | Topical candidate but uncertain destination |
| Low confidence | 61 | Manual question-by-question inspection required |
| Original recall pages | 7 | Reconcile recall appendix with the current published guide |
| Added since archived source | 15 | Requires direct inspection of the current 264-page edition |
| Original contents | 1 | Master contents needs deliberate replacement link |
| **Total** | **264** | All stable keys accounted for; **0 approved for live switch** |

These scores were derived against the *archived 249-page* H446 edition. They do not establish equivalence to the **current 264-page published PDF**, which was not accessible as a binary in the audit environment.

## Original visual explanations to retain explicitly

The archived guide has visual teaching explanations which do not appear by name in the review v2 PDF:

- **CPU highway, City Hall and Working Town**: archived page **2** introduces CPU, registers, cache, RAM, buses and secondary storage in one connected diagram. Restore as an illustration near the start of 1.1.1, before expecting full technical register-transfer language (review edition: pages 6–7).
- **Three highway routes**: archived page **3** distinguishes address/data/control buses, with a READ from RAM[205]. Carry this into 1.1.1 so learners can bridge the analogy to exact bus directions and functions.
- **Inside City Hall**: archived page **4** uses a six-step PC → MAR → MDR → CIR → CU and ACC trace. Integrate with the new worked FDE example (review pages 6–9), not as a competing register sequence.
- **The two roads into City Hall**: archived page **14** compares Von Neumann and Harvard access paths, including modified Harvard limitations. Integrate with review pages 14–15.
- **CPU highway / RISC-CISC delivery routes**: archived page **17** explicitly cautions that instruction count alone does not determine execution time. Restore the visual memory hook near review pages 18–19.
- **Memory bank**: archived page **25** includes the City Hall / depot / highway recap; reconcile with review appendix before release.

**Critical:** the analogy is a retrieval hook, never literal CPU wiring. Preserve the adjacent exam-accurate explanation and the model's limitations when restoring diagrams.

## Release blockers

1. Obtain **the current published 264-page PDF bytes**, then perform a page-by-page preservation audit. The archived 249-page PDF is not an adequate replacement.
2. Restore/verify the original analogies and diagrams before generating a final student edition.
3. Verify the exact question/answer locations for all 264 stable keys. Text similarity is not proof that a guide reference is correct. The CSV is **never** to be substituted blindly for `revision/h446/guides/paper-1-page-map.json`.
4. Review technical answers, remove teacher-review labels, check mobile and print, and obtain teacher approval.
5. Only then update the student guide, stable mapping and generated `guide-links.js` together.

**Live site and students' existing PDF remain unchanged.**
