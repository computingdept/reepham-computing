# H446 2023–2024 OOP game scenarios — final supporting SVG group

**QA-ONLY DRAFT. NOT FOR CLASSROOM/STUDENT RELEASE.**

These **eight original source-specific SVGs** complete four valuable visual families after the earlier OOP batches [PR #169](https://github.com/computingdept/reepham-computing/pull/169) and [PR #170](https://github.com/computingdept/reepham-computing/pull/170). They introduce no new exam question, new answer, newly invented original scenario or scoring rule.

| Exact RHS mapping | Question view | Separate answer view |
|---|---| --- |
| **2024 H446/02 Q9(a)**, array suitability (3 marks) | Fully indexed **50-slot** road array from 0 to 49, no invented Cache placements | Same 50 slots; highlights three developed points: known fixed size, direct index-to-route mapping, nullable Cache references |
| **2024 H446/02 Q9(b)(iii)**, unique random placement (3 marks) | Clearly marked **illustrative** picks: road[17] occupied, road[31] null; outcomes withheld | On occupied index, retry; on free, store Cache. Example indexes are not actual paper answer data |
| **2024 H446/02 Q9(d)**, game loop (6 marks) | Four-stage game flow, with method/constructor and safety checks **blank** | `new Explorer("Mina")`, random step 1–4, `changePosition(step)`, `getRoadPosition()`, `position < 50` before array access, `road[position] != null`, `updateValues(pType, pValue)`. All six original assessed blanks stay in selectable native code |
| **2023 H446/02 Q9(d)**, examineCell (7 marks) | User row and column, Board and Artifact, empty/nonempty outcomes; public method chain not answered | `getGridItem(row,column)`, `getCategory() == ""`, no-artifact output or category/value through accessors. Full seven-mark source procedure remains selectable native text |

**Question-integrity rules:** no answer leak into unrevealed art; no invented source parameters. The 50 positions of the road are drawn explicitly. The random-slot examples are examples, not claims about the question's underlying algorithm. The Board is labelled as precisely 10 rows and 20 columns, but another earlier branch [#169](https://github.com/computingdept/reepham-computing/pull/169) already contains the full 200-cell Board diagram — do not redraw it.

**Scope exclusions:** no changes to live H446 or J277 lessons, CSS/JS, original paper mapping, underlying RHS question text, answers, marks, Cloudflare database, student attempts, homework or assignment scores. Code-only **2024 Q9(e)** remains a native text debugging task; drawing it as a static SVG would be detrimental.

**Release gates:** [eight-role register](h446-2023-24-oop-gameplay-finish-map.csv) sets every usage to `disabled_not_approved`. The independent workflow checks SVG parse/title/desc, 1240×740 raster, and produces a PNG contact sheet. Automated QA alone is **not** independent OCR source and mark-scheme approval, half-screen projector testing, mobile/print accessibility, or teacher sign-off. No merge or release before those checks.
