# H446 Paper 2 — Sorting, Stack and Queue visual batch

**DRAFT-ONLY original RHS teaching illustrations, not approved for classroom or student release.**

This batch creates eight genuine instructional SVGs, four separate question and answer pairs, from the approved *draft question source context* at `data/exam-questions/h446-rhs-practice-drafts.csv`.

| RHS exam question | Unrevealed question screen | Answer screen |
| --- | --- | --- |
| 2025 H446/02 Q1(b) — insertion sort, 5 marks | Source array `20,8,15,36`; empty sorted/unprocessed stages | Sorted portions `[20]`, `[8,20]`, `[8,15,20]`, `[8,15,20,36]`, with remaining elements |
| 2025 H446/02 Q1(c)(iii) — quicksort pivot, 3 marks | **Illustrative** `[9,3,8,2,6]` with final element pivot 6 | One valid partition `[3,2,6,9,8]` with pivot at boundary. Left and right partitions are **not necessarily sorted** |
| 2024 H446/02 Q4(a–b) — FIFO queue, 4 marks across parts | Zero-indexed ten-slot array, `20,15,3,2` initially occupying indexes 0–3, head=0, tail=4 | After `enqueue(20), dequeue(), dequeue()`: logical `3,2,20`; head=2, tail=5. Removed positions are shown logically inactive, **not asserted physically cleared** |
| 2022 H446/02 Q8(a)(i–ii) — 100-slot array stack, 3 marks across parts | First ten slots only: initial `10,5,6,23,1`, `nextFree=5` | After `pop(),pop(),push(3),push(6),push(7)`: occupied `10,5,6,3,6,7`; `nextFree=6` |

## Source integrity and teaching rules

- Question views do not disclose final sorting states, pointer changes, or stack/queue outputs. Answers have separate screens.
- The 2025 quicksort question is conceptual and supplies **no concrete array**; the example is explicitly illustrative rather than a representation of an unseen OCR or RHS source figure.
- The 2024 queue `tailPointer` means **next available slot**. The 2022 `nextFree` means next unused stack slot, not index of the top value; avoid conflating with the 2025 H446/02 stack-pointer convention.
- These SVGs are **visual demonstrations**; when integrated, the actual original question and marking criteria must remain intact. Code and long trace tables should be native, accessible HTML rather than raster art.
- All diagrams use a monochrome 1240×740 style with subtle green answer cues and accessible SVG `title`/`desc`.

The [12-role register](h446-2022-25-stack-queue-sorting-map.csv) records actual part-to-asset usage. Every record remains `disabled_not_approved`, with teacher/source/answer alternatives and projector review pending.

GitHub Actions separately parses each SVG as XML, rasterises at 1240×740 and archives PNGs plus a contact sheet. It does not prove projected-distance legibility or teacher approval.

**Scope:** eight new SVGs in `assets/exam-questions/h446/question-view/`, one role CSV, this MD review and one isolated QA workflow. No live H446/J277 lessons, site CSS/JS, Cloudflare D1, assignments, marks or scoring changed.

## Actual technical screenshot QA — 22 November 2026

The isolated SVG validation/raster workflow [GitHub Actions run 45043036113](https://github.com/computingdept/reepham-computing/actions/runs/45043036113) passed **all eight images** in XML parsing and 1240×740 PNG generation. The [render evidence artifact 14762716353](https://github.com/computingdept/reepham-computing/actions/runs/45043036113/artifacts/14762716353) contains eight rendered PNGs, an eight-image contact sheet and JSON QA output.

A manual visual inspection of the contact sheet confirmed that the original/answer views are distinct, the four insertion-sort stages and illustrated partition are readable, queue head/tail arrows point at the intended indices, and `nextFree` points to the first unused stack slot before and after the five operations. No obvious clipped captions or missing values were seen.

**Teacher review still pending:** this technical result is not an actual classroom projector test, independent examiner-marking check, or approval to publish; all twelve asset-role records remain `disabled_not_approved`. The 2025 quicksort example is deliberately illustrative rather than a claimed original exam array. No live lessons, CSS/JS, J277, D1 or scoring changed.
