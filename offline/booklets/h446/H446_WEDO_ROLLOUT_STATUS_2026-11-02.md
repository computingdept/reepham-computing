# OCR H446 Print — We Do rollout and outstanding quality gates

**Status checked:** 2 November 2026, after the successful Year 12 and Year 13 GitHub Actions rollout.
**Student approval:** 0 of 288. All updated Print PDFs are review drafts.

## Coverage

| Measure | Count |
|---|---:|
| Print catalogue records | 288 |
| Illustrated resources with revised We Do + source-based CHECK | **202** |
| Diagram-free resources with revised We Do (prior batch) | **16** |
| **Print links using revised We Do** | **218 / 288** |
| Remaining original PDFs retained, no unsafe automatic replacement | **70** |
| Revised booklets longer than 16 A4 pages | **30** |
| Longest reviewed draft | **23 A4 pages** (Lesson 029) |
| Teacher-approved resources | **0** |

288 source catalogue records are from 300 curriculum slots; 12 assessment/feedback lessons are deliberately not in the public print catalogue.

## Completed and verified

- Shared instructional structure: **Try → Discuss → Improve**. Guided practice precedes You Do and Exit Ticket; original source CHECK explanations appear after the Exit Ticket, or are retained when already correctly positioned.
- Original PDF pages and any embedded figures are preserved when adding discussion and answer-check pages.
- Inline source SVG diagrams are restored only when the complete static source visual set can be verified; otherwise the original Print PDF remains linked.
- A4 colour and monochrome plus imposed A3 booklet editions are generated and verified for each accepted revision.
- All catalogue targets exist in the repository, with zero teacher-approval flags; interactive lessons and revision guides are unchanged.
- Visible footer page counts were corrected on updated illustrated versions.
- Both Year 12 and Year 13 publication workflows completed successfully: [Actions run](https://github.com/computingdept/reepham-computing/actions/runs/41527291922).

## Remaining 70 source conversion exceptions

### Four diagram-recovery exceptions
Lessons **016, 028, 031, 205** have an SVG/diagram count mismatch (for example, dynamically generated or duplicate visuals). Restore all instructional diagrams with source-specific validation before replacing their existing Print links.

### Sixty-six alternate We Do source layouts
Year 12 **046–057, 059–082, 085–087, 089–097, 099–105**.
Year 13 **264–267, 309–310, 316–320**.

These lessons use alternate side-by-side source markup (e.g. `.h13-grid`, `.h13-pane`, `.wedo-step`) where source models are not reliably separated by the current default extractor. This **does not demonstrate that the classroom source lacks a valid answer**. Inspection of sample original HTML confirms the problem and explanation can be in separate visible panes. The correct fix is a source-aware extraction path that keeps the problem and any essential input code in TRY but moves model explanations and potentially answer-bearing graphics to post-Exit CHECK. Never invent answers or expose worked models before the attempted questions.

These 66 were **not** overwritten by the mass-conversion generator.

## Page-length review gate

Thirty revised booklets exceed 16 A4 pages, and Lesson 029 is 23 pages. Retaining every diagram without loss can increase page counts, but these long resources require layout consolidation, source-diagram prioritisation and visual inspection before issue. The agreed **eight-page standard remains the default**, not an absolute limit if a longer document preserves essential teaching.

## Outstanding human quality checks

1. Resolve the 66 alternate-template conversions and four diagram recovery exceptions, using small validated source-aware batches.
2. Review and compact the 30 overlong revised PDFs without removing technical content or working space.
3. Inspect the printed visuals, OCR H446 technical content, authentic source explanations, and the pedagogical usefulness of the discussion prompts.
4. Mark teacher-approved status *only after* individual checks. The website button can continue to say **Print** without implying the materials are approved for students.

## Detailed results

- [Year 12 rollout report](H446_WEDO_YEAR12_ROLLOUT.md) and [JSON](H446_WEDO_YEAR12_ROLLOUT.json)
- [Year 13 rollout report](H446_WEDO_YEAR13_ROLLOUT.md) and [JSON](H446_WEDO_YEAR13_ROLLOUT.json)
- [Original course-wide structural audit](H446_WEDO_COURSE_AUDIT.md)

**Note:** Successful automated publication is structural validation, not a course-wide teacher pedagogical sign-off.
