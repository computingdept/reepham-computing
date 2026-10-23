# J277 audit — early lessons 001–018 and consolidated source-stage position

Date: 23 October 2026. **Read-only investigation; no lesson edits.**

## Sources examined
- GitHub tree and `lesson-001/index.html`, `lesson-002/index.html`, `lesson-003/index.html`.
- `autumn1-004-008.json`, `autumn1-009-013.json`, `autumn1-014-018.json`: 15 lesson records and their authored three exam-question prompts.
- Code First master structure (`code-first-master-20261021.json`; 154 registered lesson keys). Existing source audits 019–164 and overrides 051–060.

## Findings and candidate QA issues
| Lesson(s) | Observation | Required audit action |
|---|---|---|
| 001–002 | Standalone large authored HTML, containing Code First and several custom question cards; not structurally identical to adapter lessons | Check original question-to-answer mapping and grouped renderer compatibility, confirm maths and mark schemes in live browser |
| 003–018 | Lightweight HTML wrappers load `h446-adapter.js`; learning content comes from separate data/build scripts, not HTML source | Verify adapter and browser-derived content rather than calling wrappers blank or missing |
| 004–018 | 15 sets of exam-question prompts available from three grouped JSON sources | Check marking-point alignment, spec requirements and rendered overrides phase-by-phase |
| 006 Q2 | 'State what is meant by sample rate' allocates two marks | Verify two distinct marks in scheme; possible under-specified wording |
| 009 | Storage choice justifications use realistic scenarios | Keep where valid; check mark points before rewriting |
| 012 | Good combination of decomposition/abstraction and input-process-output in prompt set | Verify worked examples build towards practice |
| 016 | Programming assignment explicitly requests OCR ERL | Verify actual ERL syntax and shown array examples |
| 018 | Assessment and review lesson | Apply special assessment rules, not routine You Do constraints |

## Whole-course source stage
- The original authored You Do question **prompts** have now been inspected for 004–164 (161 lesson numbers); 001–002 were examined in standalone HTML, and 003 loader inspected, but the rendered early lesson and its full authored question text remains to be verified.
- This **does not mean the full course is audited**: the prior sweeps did not comprehensively validate all marking schemes, I Do, We Do, Code First, current runtime overrides, specification subpoint coverage or visual presentation.
- Across earlier sweeps, recurring issues include under-specified two- and three-mark questions, generic programming-question templates in source 051–080 (with 051–060 overrides already published), and special assessment/revision pages needing distinct criteria.

## Next audit pass — mandatory before content changes
1. Reconcile every lesson's effective published question source (authored original, approved override, special assessment) and Code First model.
2. Check actual marking points and OCR ERL for each phase; record lesson/question/severity/evidence in a master register.
3. Compare each coded requirement with OCR J277 spec subpoints; identify holes and unnecessary repetition.
4. Run targeted desktop/mobile visual and navigation QA, paying special attention to standalone 001–002, loader 003–018 and special assessment lessons.
5. Only after full diagnosis, prioritise and edit teaching content. H446 untouched.

Related source reports: `j277-whole-course-baseline-20261023.md`, `j277-whole-course-sweep-035-094-20261023.md`, `j277-whole-course-sweep-095-164-20261023.md`.
