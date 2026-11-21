# RHS Computing — J277 visual artwork pilot

**Date:** 21 November 2026  
**Scope:** Student question and teacher answer-reveal diagrams; standalone visual preview. **No live lesson changes.**

## Agreed design and delivery rules

- 900 × 900 responsive vector diagrams; prepared for the **left half** of a 16:9 projector screen, with full question wording on the right.
- Apple-inspired **black and white**, clean lines, generous white space and a restrained pale blue-grey glow only around edges or components.
- Labels are large (key labels approx. 36–48 SVG units; minor support labels 29) and never use colour alone to communicate the answer.
- The question stage **must not show a completed student answer**. Worked network, flowchart and logic diagrams only appear in the **teacher-controlled reveal stage**.
- The same presentation rule and shared renderer should eventually be used in J277 and H446; don't clone per-lesson CSS or JS.

## First SVG batch

| RHS question | Purpose | Student question image | Teacher answer image |
| --- | --- | --- | --- |
| RHS-J277-033 | OR + NOT + AND logic | Blank drawing workspace | [Worked logic](../../assets/j277/exam-figures/or-and-not-answer.svg) |
| RHS-J277-036 | Discount eligibility flowchart | Blank drawing workspace | [Worked flowchart](../../assets/j277/exam-figures/discount-flowchart-answer.svg) |
| RHS-J277-069 | 3×4 bitmap reconstruction | [Blank pixel grid](../../assets/j277/exam-figures/bitmap-grid-question.svg) | [Completed grid](../../assets/j277/exam-figures/bitmap-grid-answer.svg) |
| RHS-J277-098 | Floodlight logic gates | Blank drawing workspace | [Worked circuit](../../assets/j277/exam-figures/floodlight-logic-answer.svg) |
| RHS-J277-125 | Five laptops, two printers, one switch | Blank drawing workspace | [Worked star network](../../assets/j277/exam-figures/star-network-answer.svg) |
| RHS-J277-145 | Odd/even flowchart | Blank drawing workspace | [Worked flowchart](../../assets/j277/exam-figures/odd-even-flowchart-answer.svg) |
| RHS-J277-154 | NOT A AND (B OR C) | Blank drawing workspace | [Worked circuit](../../assets/j277/exam-figures/access-controller-logic-answer.svg) |
| RHS-J277-201 | Loop trace | [Question flowchart](../../assets/j277/exam-figures/loop-flowchart-question.svg) | Textual trace/marking |
| RHS-J277-211 | Account credentials and block status | Blank drawing workspace | [Reuse three-gate answer](../../assets/j277/exam-figures/or-and-not-answer.svg) |

**Nine original SVG files cover nine RHS question parts** (one logic SVG answer is intentionally shared between two equivalent circuits). Their roles are in [`manifest.json`](../../assets/j277/exam-figures/manifest.json) and the source CSV's `rhs_visual_*_svg` columns.

## Visual-review inventory

There were **66** source-flagged J277 questions in the original audit: **9** now have SVG assets created and **57** still require **HTML tables, trace layouts, code listings, or a source-specific visual review**. Do not convert text/data tables into decorative illustrations; retain usable, selectable, projector-readable text. The full per-question inventory is [`j277-visual-audit.csv`](j277-visual-audit.csv).

For the eight diagram answers, the SVG is a teacher-reveal resource, not the student question. The two question-side SVGs are the empty bitmap grid and the tracing flowchart.

## What has been checked

- All nine SVG files use a 900 × 900 viewBox, accessible `<title>`/`<desc>`, monochrome line diagrams with muted edge blur, large labels and no scripts or external resource references.
- Basic source/XML tag-nesting and asset path checks passed.
- All 225 source question IDs, OCR references, marks, question texts, answer summaries and source-reviewed answer statuses were preserved.
- The [preview](../../assets/j277/exam-figures/preview.html) is isolated from lesson pages. The answer SVG is not loaded until a user presses its reveal button.

## What remains before classroom deployment

1. **Human projector and phone review of these nine images:** check wire connections, gate symbols, case-study meaning, text legibility, layout at half-screen width, and questions whose original scheme permits alternatives.
2. **Complete remaining 57 layouts:** accessible HTML data, trace and marking grids, and programming listings; then check source values and outputs together.
3. Obtain final approval on wording and artwork before setting any question's `draft_status=approved_for_classroom`.
4. Integrate through the **shared** lesson renderer and test Lesson 134 first without altering the navigation, Do Now, I Do, We Do or You Do structures.
5. Extend to H446 only after the J277 component is proven.

**Status: art created and source checked; not projector-approved, not automatically marked, not deployed to live lessons.**
