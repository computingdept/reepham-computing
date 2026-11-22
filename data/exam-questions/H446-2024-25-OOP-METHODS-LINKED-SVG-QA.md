# H446 2024–2025 — OOP methods and linked-list completion images

**DRAFT-ONLY ORIGINAL RHS SUPPORTING ART. NOT FOR LIVE LESSONS OR STUDENT RELEASE.**

This isolated batch adds **14 SVG files** (seven specific question views and seven distinct answer-reveal views) to complement existing draft PRs [#167](https://github.com/computingdept/reepham-computing/pull/167) and [#169](https://github.com/computingdept/reepham-computing/pull/169). It does **not** duplicate their linked-list deletion, Cache object instantiation or Explorer constructor images.

| Source | New diagram | Scope/answer integrity |
| --- | --- | --- |
| 2025 H446/02 Q8(b)(i) | Node nextNode accessor | Question hides return; answer shows return of existing reference |
| 2025 Q8(b)(ii) | Node setValue mutator | The source has no numeric value; 10 → 25 is explicitly illustrative |
| 2025 Q8(c)(i) | Empty linkedList constructor | Blank head reference then null |
| 2025 Q8(c)(ii) | Traversing the linked list | Illustrative values 10→25→39 from the same RHS scenario; no code blanks solved in student view |
| 2025 Q8(d) | Instantiate and populate myLoans | Exact source loan IDs 10, 25, 39 in order; answer visual only after reveal |
| 2024 Q9(b)(i) | Cache getName accessor | The original private attributes are shown without inventing object field values |
| 2024 Q9(c)(ii) | Explorer updateValues procedure | **Illustrative** inputs pValue=3 for money and 2 for experience, from source initial money=5/experience=0. Only the selected attribute changes |

All original RHS questions, code blanks, candidate writing areas, answer points, marking rules, year references and source URLs are unchanged in the existing mapped banks. **The code solution must remain native selectable text, not SVG**. These teaching images illustrate relationships; they cannot replace assessed code or written answers. In particular the traversal Q8(c)(ii) has **five code blanks** that should be displayed as native text, and Q9(c)(ii) requires a complete two-parameter **procedure** with mutually exclusive updates.

**Visual standards:** 1240×740 white/black Apple-like minimal styling, very soft green edge shadow, large text, warm yellow on the answer result, no crowded diagram or answer leaked in the question view. Question and answer names are paired in `assets/exam-questions/h446/question-view/`. All new assets are source-labelled as original RHS support, not copied OCR artwork.

**Source and release gates:** `data/exam-questions/h446-2024-25-oop-methods-linked-svg-map.csv` maps each of 14 usage roles with `disabled_not_approved`. Automated XML and raster checks are only technical QA; compare original OCR question/marking alternatives, inspect actual half-screen projector and accessibility, and receive teacher approval before use.

**Scope exclusions:** no changes to J277, live H446 lessons, You Do, stylesheets, scripts, student assignments, Cloudflare database, scores or publication flags.
