# J277 Code First — 154 approved activities mapped to coding-cycle indicator

**Date:** 25 October 2026  
**Status:** stage metadata applied to the existing master bank; original student tasks, starter code, model code and expected outputs preserved.  
**Evidence:** [154-task audit, 23 October](j277-code-first-154-task-starter-model-alignment-20261023.csv) and [Code First master bank](../../lessons/j277/code-first-master-20261021.json).

## Stage interpretation

| Highlighted stage | Count | Rule |
|---|---:|---|
| **Predict** | 37 | Original audit says *Prediction (no code change)*. |
| **Write** | 95 | Complete a gap, write instructions or make a directed code change without debugging. |
| **Test** | 2 | Actively choose an input/test value to exercise the program (077, 124). |
| **Iterate** | 20 | Identify/correct an error or repair existing logic, including 096 and 138, which are phrased as 'Change' but fix incorrect conditions. |
| **Total** | **154** | No existing task or mark scheme rewritten. |

**Important:** these are *the main action for the task*, not requirements that pupils must perform four stages every time. The four-stage graphic remains a coding-cycle reminder, and the highlighted stage shows the immediate action. A simple "Predict" task does not imply actual testing, writing or iteration.

## Lesson IDs by emphasis

### Predict (37)

001, 002, 006, 008, 009, 010, 011, 013, 015, 017, 019, 021, 022, 023, 025, 026, 027, 028, 030, 032, 033, 036, 037, 038, 040, 041, 042, 043, 044, 046, 048, 049, 059, 080, 126, 134, 152

### Write (95)

003, 004, 005, 007, 012, 014, 016, 020, 024, 029, 031, 034, 039, 045, 047, 051, 052, 053, 054, 055, 056, 057, 058, 060, 062, 063, 064, 065, 066, 067, 068, 069, 070, 071, 072, 073, 074, 075, 076, 082, 083, 084, 085, 086, 087, 088, 089, 090, 091, 095, 097, 098, 099, 100, 101, 102, 103, 104, 105, 107, 108, 109, 111, 112, 114, 115, 116, 117, 118, 119, 122, 123, 127, 128, 129, 130, 132, 133, 135, 137, 139, 140, 141, 142, 145, 146, 149, 150, 155, 158, 159, 160, 161, 163, 164

### Test (2)

077, 124

### Iterate (20)

061, 079, 081, 092, 093, 096, 106, 110, 121, 125, 131, 136, 138, 144, 147, 148, 151, 153, 154, 162


## Historical audit exceptions retained (not rewritten in this metadata change)

Existing concerns remain at **068** and **115** (record versus 2D-array terminology), **117** (unspecified file contents), **118** (SQL field mismatch), **161** (ambiguous target bit depth), and optional context reviews **073** and **130**. The mapping does not mark those issues solved.

## Implementation and release boundary

- `focus_stage` is explicitly authored for each of the 154 entries, with only **predict**, **write**, **test**, **iterate** permitted.
- The existing Lesson 002 Code First SVG can consume the metadata directly, preferring `focus_stage` over task-text guessing. Lesson 002 remains **Predict**.
- Other lessons retain their existing Code First layout for now; an all-lesson *visual rollout* requires separate TV/mobile acceptance of the Lesson 002 graphic and generated-lesson CSS/JS QA.
- Assessment/special exceptions (018, 035, 050, 078, 094, 113, 120, 143, 156, 157) are not given entries.
- The metadata is not a claim that all ERL has been executed in an official interpreter; the source audit's limitations still apply.
