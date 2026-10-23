# J277 editorial quality assurance — 53 recovery tasks + 31 Do Now Q4 rewrites

**23 October 2026 — reviewed draft stage, no student-facing publication**

## Editorial work completed

1. **53 supplementary retrieval tasks** were reviewed and rewritten where needed. All now have explicit individually awardable mark-point guidance, with **43 two-mark and 10 one-mark tasks**. These values are suggested classroom marking guidance, not reproduced OCR past-paper mark schemes.
2. **31 currently paired Q4 prompts** were rewritten into coherent, short single-task questions rather than old (a)/(b) paired tasks. **21** remain genuine integrated comparisons/scenarios that may assess two planning checks; **10** focus on one planning check and their displaced coverage credits are explicitly tracked.
3. The ten single-check Q4 replacements have been upgraded to require a worked result, supported decision or explanation where suitable. None is just a copy of another Q4 question.
4. **Two unpublished SVG diagrams** have been authored: an unlabelled OR gate for identification and a wrong AND symbol with a blank replacement area for drawing the correct OR symbol. Their form follows the standard two-input gate symbols in Cambridge OCR J277 v3.1 (printed page 20); graphical rendering still needs real 1920×1080/390×844 inspection. They are **not linked into live lessons**.
5. Reviewed Q4 command words (25 Explain, 2 Show, 2 Convert, 1 Recommend, 1 Compare); yellow emphasis will depend on the real lesson renderer after publication.

## Automated editorial validation

- **84 rows total**: 53 recovery questions + 31 Q4 rewrites; all CSV rows have the expected field counts.
- **0** missing or duplicate retrieval IDs.
- **0** marking total mismatches: every proposed mark is represented by one explicitly written `[1]` credit.
- **0** Q4 prompts containing the old (a)/(b) or “correct both claims” formulations.
- **0** missing command words in the revised Q4 prompt text.
- **0** orphaned symbol-question diagram references.
- All questions are under 265 characters (max Q4 **154**, max supplementary task **149**), although the Classroom TV/mobile layout has **not** yet been executed.
- The simulated **53 recovery item** plan, if all were genuinely taught independently and 21 two-check integrated Q4s validated, can bring the 221 planning checks to three spaced exposures. It does **not** update the 656-question Do Now bank.

## Editorial corrections worth noting

- Q4 007 and 103 now use two different colour-depth capacity decisions rather than identical `2^6` recall.
- Q4 027 and 091 now trace two different two-position logical-right-shift examples, with zeros/discarded bits visible in schemes.
- Q4 031 and 095 show the conversion method for binary↔hexadecimal, not just the final code.
- Q4 087 asks for a reasoned privacy-risk explanation rather than a two-part list.
- Q4 097 and 151 use different concatenation contexts.
- Q4 153 now assesses local variable versus global constant scope and changeability accurately.
- Two OR symbol tasks `B082.02-R1/R2` explicitly reference draft SVGs. The second requires learners to **draw** the replacement symbol rather than merely write the word “OR”.
- One-mark questions are kept to one valid point rather than artificially padded with an extra credit.

## Important execution gap — a separate revision checkpoint is NOT a Do Now slot

The original user requirement is to aim for **three retrieval appearances within Do Now**. The proposal currently schedules 53 new prompts as separate, *additional* revision/retrieval checkpoints, **not** replacements in the current fixed four-question Do Now lessons. These would improve practice but would **not satisfy a literal 3× Do Now quota** unless carefully integrated.

The current Do Now bank still contains **656 questions** and **67 unallocated question records**: **52 Q1**, **4 Q2**, **5 Q3**, **6 Q4**. Q1 must recall the preceding lesson and cannot be freely reassigned; Q2 must remain short and single-focus; the 15 unallocated Q2–Q4 positions are mostly at the very start (KS3 foundations) or end (L161–164), not necessarily valid spaced anchors. Simply replacing allocated Q3/Q4 creates new coverage deficits unless their old credits are also recovered. **No claim of complete Do Now coverage should be made from the independent revision plan.**

**Decision needed at execution, not editorial stage:** either
- preserve four Do Nows intact and count the 53 items as **separate revision exposures**, while truthfully reporting that the literal three Do Now encounters target remains unmet; or
- design a genuine Do Now reallocation schedule (question replacements and restored displaced credits) under the four-question limit, with an exact recomputed coverage and spacing proof before publication.

The latter is materially more involved and must not be faked by adding tags to unrelated questions. The preferred path is to treat the Q4 clarity corrections separately from a purpose-built Do Now coverage reallocation.

## GitHub draft artefacts

- [53 retrieval tasks — editorial v2, explicit marks and diagram refs](j277-53-retrieval-editorial-v2-with-mark-schemes-20261023.csv)
- [31 Q4 rewrites — editorial v2, explicit marks and command words](j277-31-q4-editorial-v2-marked-unpublished-20261023.csv)
- [OR gate identification diagram](visuals/j277-or-gate-recognition-DRAFT.svg)
- [AND-to-OR replacement diagram](visuals/j277-and-to-or-redraw-DRAFT.svg)
- [Original source coverage recovery simulation](j277-53-retrieval-recovery-and-q4-cleanup-plan-20261023.md)
- [Master exceptions](j277-master-exception-register-20261023.csv)

## QA limitations and required human checks

- Source-level factual and marking review is **not independent awarding-body sign-off**. The teacher should check each answer against the lesson and pupils' taught methods.
- OCR wording and table/symbol examples follow [Cambridge OCR J277 v3.1](https://www.ocr.org.uk/Images/558027-specification-gcse-computer-science-j277.pdf); the draft questions are original practice material.
- No interactive visual checks yet at 1920×1080 or 390×844, and no official ERL runtime tests were performed this round.
- Need proof of diagram SVG legibility and actual image rendering before release.
- Nothing has been added to `lessons/j277/donow-bank-20261020.json`, revised You Do answer banks, lesson pages, CSS, JS, H446 or the live site.

## Next practical phase

**Before publishing**: build an exact four-question Do Now reallocation plan if three Do Now appearances remains the intended strict standard; keep Q2 simple, Q1 anchored, Q4 high challenge, and ensure no existing retrieval tag is lost without replacement. Then stage small J277-only, reversible changes, verify question/answer route and board/mobile behaviour.
