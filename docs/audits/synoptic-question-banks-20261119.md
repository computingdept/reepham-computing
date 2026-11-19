# Synoptic homework — source question-bank audit

**Audit date:** 19 November 2026 · **Scope:** Existing published MCQ `bank.js` sources for Year 13 (H446) and Year 11 (J277). Read-only structural inspection.

**Source snapshot:** `computingdept/reepham-computing` main at commit
`1f4512b49c5373b2d70fb50f8845b4188ec7ceb3`. Re-check counts after
subsequent question-bank changes.

## Inventoried sources

Question IDs are stable inside each question's original topic bank. Paper
numbers below are taken from the section directory (`section-1-*` versus
`section-2-*`), not inferred from revision-guide page numbers.

| Course | Existing bank source | Topics (Skills) | MCQs |
| --- | --- | ---: | ---: |
| H446 P1 | `revision/h446/section-1-1/bank.js` | 13 | 130 |
| H446 P1 | `revision/h446/section-1-2/bank.js` | 24 | 240 |
| H446 P1 | `revision/h446/section-1-3/bank.js` | 30 | 300 |
| H446 P1 | `revision/h446/section-1-4/bank.js` | 30 | 300 |
| H446 P1 | `revision/h446/section-1-5/bank.js` | 15 | 150 |
| **H446 P1 total** | **5 banks** | **112** | **1,120** |
| H446 P2 | `revision/h446/section-2-1/bank.js` | 9 | 90 |
| H446 P2 | `revision/h446/section-2-2-1/bank.js` | 8 | 80 |
| H446 P2 | `revision/h446/section-2-2-2/bank.js` | 11 | 110 |
| H446 P2 | `revision/h446/section-2-3/bank.js` | 17 | 170 |
| **H446 P2 total** | **4 banks** | **45** | **450** |
| J277 P1 | `revision/j277/section-1-1/bank.js` | 5 | 50 |
| J277 P1 | `revision/j277/section-1-2/bank.js` | 15 | 150 |
| J277 P1 | `revision/j277/section-1-3/bank.js` | 7 | 70 |
| J277 P1 | `revision/j277/section-1-4/bank.js` | 3 | 30 |
| J277 P1 | `revision/j277/section-1-5/bank.js` | 3 | 30 |
| J277 P1 | `revision/j277/section-1-6/bank.js` | 3 | 30 |
| **J277 P1 total** | **6 banks** | **36** | **360** |
| J277 P2 | `revision/j277/section-2-1/bank.js` | 11 | 110 |
| J277 P2 | `revision/j277/section-2-2/bank.js` | 15 | 150 |
| J277 P2 | `revision/j277/section-2-3/bank.js` | 4 | 40 |
| J277 P2 | `revision/j277/section-2-4/bank.js` | 2 | 20 |
| J277 P2 | `revision/j277/section-2-5/bank.js` | 2 | 20 |
| **J277 P2 total** | **5 banks** | **34** | **340** |
| **All four pools** | **20 existing banks** | **227** | **2,270** |

## Checks carried out

All 20 bank files were fetched from the GitHub source, parsed without
executing the original `bank.js` code, and their `SKILLS[].questions` inspected.

| Structural check | Result |
| --- | --- |
| Bank parses as a question list | **20/20 pass** |
| Each question has a stable nonempty ID | **2,270/2,270 pass** |
| Question IDs are unique within each course | **Pass: no duplicates** |
| Question has nonempty prompt | **Pass** |
| Exactly four answer options | **Pass** |
| Correct answer matches one supplied option | **Pass** |
| Explanation present | **Pass** |
| Optional code and table fields have expected basic shape | **Pass** |

**Zero structural exceptions were found.**

## What this audit has NOT proved

- Correctness of every question, distractor and explanation.
- Alignment with the latest official OCR specification or terminology.
- Pedagogical difficulty and whether a question is overly similar to another.
- Whether `skill.lessons` (H446) or J277 skill-guide mapping resolves to a
  currently published lesson and revision-guide destination.
- Whether selection of ten questions covers a useful variety of spec points.
- Functionality of a new synoptic quiz, saved answers or reporting.

These require targeted **content and UI QA** before learner release. The
source banks are a pool of *candidates*, not automatically approved exam items.

## Next audit and regression safeguards

1. Check all generated 10-question sets contain ten distinct IDs and draw
   exclusively from the correct course/paper.
2. Check breadth across Skills/spec points; avoid ten near-identical questions.
3. Resolve the lesson/guide destination for every selected question.
4. Check formatting of questions containing code, tables or special symbols
   on mobile and desktop.
5. Confirm that the generated selection is **frozen per homework assignment**
   and does not change when a pupil refreshes or resumes.
6. Record a bank revision/version for each published assignment; future bank
   edits must not silently change an issued homework's marking.
7. Re-run this structural inventory when a bank changes. Add automated
   repository checks before broad deployment.

**Do not modify original question banks as a side-effect of this audit.**
The implementation contract is in
[../synoptic-homework-pilot.md](../synoptic-homework-pilot.md).
