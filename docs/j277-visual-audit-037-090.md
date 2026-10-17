# OCR J277 Year 10 — SVG Learning Audit · Lessons 037–090

**Date:** 17 October 2026  
**Scope:** 54 lessons, including the Spring 1 independent assessment (Lesson 050).  
**Repository:** `computingdept/reepham-computing`

## Initial findings

- Many lessons had 13 technically valid SVGs but reused the same generic diagram across all four New Learning steps, especially Lessons 047–049 and 051–081.
- Some algorithm examples depicted values different from their question, or did not show the intermediate array/search/trace state.
- Two Do Now retrieval questions per lesson lacked a diagram; the first independent exam question also lacked a visual prompt.
- Correct, previously authored topic-specific drawings (for example GUI/CLI, HDD defragmentation, file/folder trees) should not be replaced by generic boxes.

## Implemented

1. **Progressive teaching diagrams:** Added curriculum-aligned stage descriptions and scene types for programming, variables, loops, decisions, two-dimensional arrays, strings, subprograms, SQL, sorting, searching, trace tables, defensive design and Boolean logic.
2. **Question alignment:** Guided sorting/searching sketches use arrays from the corresponding question where available. Binary-search guidance distinguishes unsorted input and prevents an invented target. Combined-logic examples show intermediate gate reasoning.
3. **Stronger visual semantics:** New flowcharts show two labelled branches; bubble/insertion stages show changes to the actual values; merge sort includes halves, sorted pairs and the merged result; trace diagrams track variable values; truth tables display all four or eight input combinations as appropriate.
4. **More useful graphics:** Added compact question-specific visual prompts to the second and fourth Do Now tasks and every current-topic exam question. Prompts hide worked outputs until answers are revealed.
5. **Keep strong originals:** Retained effective diagrams from the original systems software, impacts and computational thinking lessons where they illustrate the topic better than the new templates.
6. **Readability/accessibility:** Applied the enhanced layouts responsively on TV/laptop/mobile; SVGs have `role="img"` and accessible labels. Worked answers and eight lesson phases remain intact.

## Coverage and structural checks

| Lesson type | Before | After |
|---|---:|---:|
| Normal lessons (53) | 13 SVGs per lesson | 16 SVGs per lesson |
| Lesson 050 (assessment lesson) | 10 SVGs | 12 SVGs |
| Total generated SVG instances in Lessons 037–090 | 699 | **860** |

A normal lesson generates four Do Now visuals, four New Learning visuals, one I Do model diagram, three We Do diagrams and four You Do exam/retrieval illustrations. Lesson 050 keeps its separate **45-minute, 45-mark printable paper**, with no worked answers added to the question paper.

### Verification performed

- Generated-page validation across all 54 lesson data files before the final visual refinements.
- Representative generated-page checks after the final refinements, including Lessons 037, 039, 042, 045, 048–050, 054, 063, 065 and 083–090.
- SVG open/close tag balance, phase counts, accessible labels and worked-answer screen counts.
- Original Lessons 019–036 sample regression checks to confirm they do not activate the new visual renderer.

### Remaining review

A live classroom-browser visual check on a large display and mobile screen is still advised. In particular, inspect Lessons 048, 049, 065, 083–086 and 088–090 at the intended teaching resolution, to confirm label size and spacing. Original J277-style practice questions must not be described as authentic OCR past-paper questions.

**Design rule going forward:** the diagram must match the question's values/devices, show an actual process or comparison, and never disclose an unrevealed answer in guided or independent practice.
