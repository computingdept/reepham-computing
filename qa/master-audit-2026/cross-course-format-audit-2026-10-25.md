# J277 & H446 I Do / We Do — comprehensive format audit

**Date:** 25 October 2026  
**Focus:** presentation and behaviour only. No changes to teaching content, programmes, independent examination questions or mark schemes in this formatting pass.

## Scope and latest automated evidence

- **Existing source pages:** J277 164; H446 300 (Year 12 001–160, Year 13 181–320).
- **Standard lesson interface audited:** **463** pages — J277 163 + H446 300. J277 Lesson 113 is a documented standalone revision experience without the normal eight-phase lesson renderer, so it is separately excluded rather than falsely passed.
- **Viewport coverage:** Classroom TV **1920×1080**, compact TV **1300×635**, and phone **390×844**.
- **Latest full GitHub Actions regression:** [Run 40225303142](https://github.com/computingdept/reepham-computing/actions/runs/40225303142).
- **Outcome:** **26,391 passed browser assertions; 0 hard failures; 41 possible vertical-clipping review flags across 28 H446 lessons**.
- **Browser checks:** page and engine load, correct phase visible, exactly one worked/guided example rendered, hidden examples/stages absent, previous and step-reveal navigation, horizontal overflow, code/diagram width, nested grid panel width, and uncaught JavaScript errors. These checks do not establish subject accuracy or guarantee pixel-perfect rendering of every SVG.

## Verified group fixes applied

1. **J277 051–058, 060 and 068:** latest dedicated [programming-format run 40223943919](https://github.com/computingdept/reepham-computing/actions/runs/40223943919) passed **330/330** checks. Hidden second We Do examples and all step navigation behaved correctly at TV and phone widths.
2. **H446 specialist nested two-panel layout:** corrected direct inner grids so they span the full outer example width. Covered `h446-grid`, `algorithm-grid`, `route-grid`, `v13-grid`, `s-grid`, `lesson-grid13`, `syn22-grid`, `draft-grid`, `p-grid`, `p23-grid`, building on the existing `h13-grid` repair. Classroom source examples include H446 184, 187, 195–200, 205, 215, 220, 222, 225–228 and 231–232. No educational content or staged-reveal logic was changed.
3. **H446 mobile horizontal overflow:** targeted wrapping and containment of long headings, database field names and code within I Do / We Do. Previously failing Lessons **012, 136, 137 and 277** now pass the full browser rerun.
4. **Compact TV:** specialist full-width-grid repairs eliminated the H446 205 warning and reduced the overall potential clipping count from **54 to 41**.

## Remaining exceptions: compact-TV vertical fit

These are **warning signals**, not yet individually visually confirmed defects. The browser measured `scrollHeight - clientHeight > 40px` where a compact-screen phase uses `overflow:hidden`. Extra content may be clipped; no blanket CSS override was made because making every TV phase scroll or shrinking fonts could compromise the approved teaching experience.

**Highest-priority measurements** (excess beyond compact phase box):
- H446 **192** We Do 205px, I Do 159px
- H446 **020** I Do 175px
- H446 **125** I Do 148px, We Do 141px
- H446 **083** We Do 143px
- H446 **255** We Do 123px
- H446 **262** I Do 111px, We Do 104px
- H446 **197** I Do 93px, We Do 103px

The **complete 41-warning/28-lesson evidence list**, with phase and measured pixels, is in [h446-compact-tv-vertical-fit-2026-10-25.csv](h446-compact-tv-vertical-fit-2026-10-25.csv).

## Sign-off status and next work

- **Passed:** all tested standard-lesson I Do/We Do navigation, visibility, screen-width and mobile behaviour assertions across all 463 pages.
- **Unresolved:** 28 H446 compact-TV lesson pages need targeted *visual and DOM-height* review of 41 flagged phases. Prefer revising specialist layout positioning and diagram scale by family, preserving readable font sizes. Do not indiscriminately enable vertical scrolling or re-author content.
- **Separate UI:** J277 113 requires its own revision-interface testing rather than application of shared lesson assumptions.
- **Outside this targeted audit:** You Do detailed marking density, full New Learning diagrams, Do Now retrieval quality, specification coverage, and educational content accuracy remain independent workstreams.

**Audit policy:** Never call a page fully verified merely because it deploys successfully. Only a confirmed browser result supports a pass, and warnings must remain unresolved until independently cleared or shown to be false positives.
