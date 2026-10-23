# J277 whole-course audit — baseline and first source sweep

Date: 23 October 2026. **Read-only teaching-content audit.** This is an initial baseline, not a claim that the entire course has been inspected or passed.

## Repository inventory
From GitHub main recursive tree: 724 entries under `lessons/j277/` including 161 JSON files, 360 HTML files and 17 JS files. A substantial portion of the HTML files are lesson shells or answer pages; numbers are **file counts**, not teaching-lesson counts. Sources include `autumn2-NNN.json`, earlier bundled autumn1 lessons, special assessment lessons, J277-only Code First master, approved You Do overrides and shared J277 scripts. The rendered lesson draws from several sources, so raw JSON checks alone cannot certify what pupils actually see.

## Sample examined
16 early lesson data entries `autumn2-019.json` through `autumn2-034.json`, their three original exam-question prompts per lesson; plus previously audited reviewed You Do bank entries 052–060 (27 questions). This does **not** include every phase, marking scheme, Code First or live-browser display.

## Confirmed and candidate findings
- **024 Q2:** `State one purpose of DNS. [2 marks]` appears over-allocated relative to wording. Review actual existing mark guidance; either change to 1 mark or explicitly request two distinct elements, such as role plus explanation. **Priority: high — marking validity.**
- **Format heterogeneity:** Lessons 019–034 regularly use a 1/2/3-mark initial prompt and 4/6-mark later questions rather than 2–3–4. This is not automatically wrong; audit question quality by intended cognitive demand, not blindly enforce a template on Paper 1.
- **30 and 31:** two-mark `Define phishing` and `Define a brute-force attack` may reasonably allow two parts, but verify two distinct marking criteria before approval.
- **33:** `State what encryption does to data. [2 marks]` needs a two-point marking check to ensure credit isn't given twice for one idea.
- **052 Q3 and 059 Q3:** previously confirmed weak/overlapping mark points in reviewed You Do bank. **Priority: high.**
- **057 Q4:** optional challenge improvement, lower priority.

## Audit dimensions and release gates
For **each J277 lesson** audit rendered source references across I Do, We Do, You Do, Code First; OCR ERL syntax, spec-subpoint match, marking accuracy and distinctness, scenario authenticity, command words, challenge and progression, repetition and retrieval, and relevant assessments/revision. Record issue confidence (confirmed / requires verification), severity, phase, evidence, resolution and status. Then carry out targeted desktop/mobile QA. Keep full-course diagnosis separate from corrections; do not modify H446.

## Next source sweep
Continue with 035–164 and remaining 001–018, distinguishing teaching, assessments and reserved slots. Reconcile overrides when scoring published exam questions. Summarise by issue type before any content changes.

No teaching files were modified in this audit.
