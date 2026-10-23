# J277 — proposed retrieval and paired-Q4 correction package

**Prepared 23 October 2026. AUDIT / DRAFT ONLY.**  
**No student-facing content, Do Now bank, lesson source, CSS, JS or H446 changed.**

## Executive conclusion

The current 656-question J277 Do Now bank covers **196 of 221 local micro-checks three times**. The other **25 checks need 43 genuinely new independent retrieval exposures** to reach the team's three-appearance goal. This 221-check decomposition is a local QA design, not an official number of OCR specification bullets.

At the same time, the **31 Q4 prompts carrying two coverage IDs all visibly ask two sub-questions** (e.g. Correct *both* claims, or (a)/(b) tasks). These should not be automatically split into two new Do Now slots or allowed to make Q2 complicated.

We have now drafted **31 single-task Q4 replacements**:
- **21 coherent integrated comparisons or scenarios**, provisionally retain their two check IDs **only** if a teacher confirms each *single prompt and answer* genuinely elicits both specification skills. Do not retain tags just to satisfy a spreadsheet.
- **10 questions require a single-check rewrite**, so their second original allocation is intentionally displaced. This adds **10 further proposed exposures** elsewhere.

Hence two valid planning scenarios:

| Scenario | Additional independent exposures required | Explanation |
|---|---:|---|
| Repair only the existing undercovered checks, leave all 31 original Q4 prompts unchanged | **43** | Restores three planned encounters per check but leaves paired-question quality problem unresolved |
| **Preferred**: repair the undercovered checks AND rewrite all 31 Q4 prompts as single cohesive tasks | **53** | 43 baseline + 10 displaced Q4 check credits (conditional on validating the 21 integrated rewrites) |
| Rewrite every dual-tagged Q4 into a single-check item, with none assessed holistically | **74** | 43 baseline + 31 displaced credits; less efficient and unnecessary for genuine comparison questions |

## Files

- [**53 proposed retrieval items — single master CSV, unpublished**](j277-53-proposed-retrieval-master-unpublished-20261023.csv). Contains each question, model answer, suggested marks, lesson anchor, OCR section, planning check, diagram dependency, and whether baseline/conditional.
- [31 paired-Q4 source questions and proposed single-task rewrites](j277-31-paired-q4-single-task-redesign-proposals-20261023.csv). Explicitly maps retained/displaced check IDs, without changing the Do Now bank.
- [43 baseline proposed lesson anchors](j277-43-retrieval-proposed-placement-schedule-20261023.csv).
- [10 additional conditional recovery prompts for the proposed Q4 cleanup](j277-q4-cleanup-10-conditional-recovery-questions-20261023.csv).
- [Full 25-check deficit audit](j277-donow-25-undercovered-checks-20261023.csv).

## QA simulation of preferred 53-item plan

A source-data simulation started with the actual current `allocated_check_ids` in `lessons/j277/donow-bank-20261020.json` and the 221 check definitions in `docs/audits/j277-donow-coverage-20261020.json`. It then:
1. Removed the second allocated check from the **10 Q4s** proposed for genuine single-check rewriting, while leaving the **21 integrated dual-tagged questions** provisionally credited.
2. Added the **43 baseline** proposed independent retrieval items.
3. Added **10 conditional** independent retrieval items for checks displaced by Q4 corrections.
4. Recounted every check, verified three **distinct lesson anchors** per check, checked teaching precedes retrieval, checked first-to-second gap at least 8 lessons and second-to-third gap at least 10 lessons, and avoided the ten special/assessment lesson positions.

**Simulated result:** 221/221 checks at exactly three planned occurrences; **no** post-teaching or spacing failures and **no** supplementary anchors on special lessons. At most two new retrieval suggestions share any one ordinary lesson anchor. These are proposed lesson indices, not guaranteed taught/calendar dates.

**Important:** the current Do Now bank still has 656 questions, 196 fully allocated checks, 25 checks below three. **Do not interpret the simulated 221/221 as the actual delivered bank.** New proposals are not counted until approved, correctly placed and published; references in existing approved Q4s remain unaffected for now.

## Teaching/editorial safeguards

- Preserve the **four-question Do Now**: Q1 previous lesson, Q2 one short four-option MCQ, Q3 earlier retrieval, Q4 one challenging application. **No new fifth question, no Q2 paired questions.**
- To preserve other checks already credited by Q3/Q4, deliver recovery prompts in **independent revision/retrieval checkpoints** first, or explicitly replace an existing Do Now only after modelling its lost allocation. Do **not** quietly replace another Q3/Q4 and claim no knock-on effect.
- **Two symbol-recognition questions**, `B082.02` items 1 and 2, explicitly require the standard **OR gate SVG** to be shown. They are **blocked for publication** until an accurate diagram is added, rendered and visually tested.
- Carefully check all 31 proposed Q4 rewrites for true single-task structure and exact 2/3/4-mark criteria. Integrated questions with two coverage IDs should assess a meaningful comparison or calculation rather than disguised "(a)/(b)" tasks.
- Review potential ambiguity on "real" data types, binary shift bit loss, substring start/length and mark awards before deployment. The drafts do not claim to be official OCR past-paper questions.
- Placements after lesson 150 can be very late in the course; staff must confirm a genuine future opportunity exists. An online revision checkpoint is different from a timetabled classroom Do Now.
- Retain distinct original tests, identifiers and historical audit evidence. Keep the revision guide, lesson and independent practice answer keys consistent with any future published change.

## Next actual steps

1. **Teacher editorial QA**: review 53 proposed retrieval questions and 31 Q4 rewrites; check 21 integrated two-check claims against the OCR wording.
2. Select the delivery mechanism and map suggested anchors to the live revision hub or lesson phase **without disturbing existing Q1/Q2/Q3/Q4 coverage**. Two OR gate symbol diagrams required before release.
3. **Publish J277-only changes in small, reversible batches** with previous outputs saved, starting with focused samples.
4. Re-run exact current-bank and supplement coverage calculations, followed by 1920×1080 classroom-TV / approximately 390×844 mobile QA.
5. Separately retain the established fixes in the 49-entry master exception register: mismatch in `answers.html` for reviewed You Do, ERL modelling in I Do / We Do and practical-programming Lesson 078. H446 is out of scope.

**All counts in this report are current-source evidence and simulations, not live-delivery or classroom observations.**
