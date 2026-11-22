# H446 2022–2025 — Algorithms and linked-pointer illustration batch

**Draft-only supporting original RHS diagrams. No live lesson or student publication.**

This small batch builds **nine SVG assets across four exam-question families**. It targets diagrams that are useful alongside exam prompts without turning ordinary code panels or large trace tables into static artwork.

| Year / RHS question | Student question diagram | Separate answer diagram |
| --- | --- | --- |
| June 2022 H446/02 Q3(c) — merge sort | Eight source integers `2,12,1,9,3,5,15,7`; pair/four/eight stages blank | Pairs `[2,12] [1,9] [3,5] [7,15]`; fours `[1,2,9,12] [3,5,7,15]`; final `[1,2,3,5,7,9,12,15]` |
| June 2022 H446/02 Q7(b) — recursion | `sumTrail(5)` through `sumTrail(1)` call frames with return values hidden | `sumTrail(1)=1, (2)=3, (3)=6, (4)=10, (5)=15` |
| June 2023 H446/02 Q3(a–d) — linked list | All seven original array rows, including head=2 and free-list=4, shown in **physical index order** | One occupied-list answer (cyan→lilac→red→green→amber) and a **separate append-blue answer** (row1→4; row4.next=null; free-list=5) |
| June 2025 H446/02 Q8(e) — safe deletion | Three-node illustrative `10→25→39` chain, no deletion result | Previous node bypasses target node to successor; head deletion and missing target conditions also shown |

**Source integrity:**
- Source questions/marks and current draft marking rules are unchanged in `data/exam-questions/h446-rhs-practice-drafts.csv`.
- The linked-list source row values and next pointers are replicated exactly, including the distinct free list.
- The linked-list deletion example uses values from the same RHS library-kiosk sequence (10, 25, 39) as **an illustration only**; the actual question asks for a general algorithm that handles any target and the missing/head cases.
- Merge sort is a visual grouping of stages, not an assessment data table. The recursion illustration shows call/return relationships; full code remains in the original question text.
- All question views omit solved outputs, sorted intermediate stages, or appended/deleted links.
- These are draft **supporting diagrams**, not teacher-approved model exam answer pages.

[The 14-role register](h446-2022-25-algorithms-pointer-map.csv) records source IDs, roles and approval gates for the nine SVG files. Each is `disabled_not_approved`. A GitHub Actions workflow performs XML parsing and 1240×740 raster rendering, storing a **nine-image contact sheet** and individual PNGs.

**No H446/J277 lesson HTML, CSS, JS, Cloudflare scoring, assignments, or existing published resources are changed.** Release still requires original source checks, independent marking alternatives, projector/accessibility review and teacher sign-off.
