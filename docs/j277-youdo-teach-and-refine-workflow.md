# J277 You Do — teach, review and refine (rolling approval workflow)

**Agreed 22 November 2026. Applies to J277 You Do only. No blanket approval or automatic student release.**

## Decision

The complete J277 question inventory is a **draft working library**, not a requirement for the teacher to review all 600 question positions in advance. Teacher content review happens **when preparing and teaching a particular lesson**, and can continue after delivery based on pupil responses.

Current baseline: **164** lesson records; **150** ordinary lessons with four proposed exam question positions; **14** protected assessment/project/feedback/timed exceptions. There are **66** newly authored draft questions with proposed marking points; all must receive independent content and marking checks before release. The existing RHS bank contains **225** unique mapped questions, but all proposed lesson placements still require appropriate review. Student-facing override and teacher-approval flags are **off for every lesson**.

## Routine for each lesson

1. **Choose the lesson** from `data/exam-questions/j277-youdo-lesson-map.json`. Show its four proposed questions with answers and marking guidance, plus Code First and any linked visuals. Preserve their provenance: RHS practice bank, existing lesson fallback, or newly authored review draft. Do not relabel original teaching questions as OCR past-paper originals.
2. **Technical/content QA before student display:** check the lesson specification fit; independently verify factual, arithmetic, trace, SQL and code answers; make sure marks are awarded for distinct, valid points; test that source figure labels and numbers correspond exactly to the question; make sure no answer is visible prematurely; render on a half-screen classroom projector and on a phone. For original new drafts, the proposed mark scheme is *not* evidence of independent verification.
3. **Teacher review at the point of use:** accept or edit wording, scenario, model answer, marking rules and/or visual. Record the explicit decision *for that lesson*, including any remaining changes. `Not yet assessed` is **not** approval.
4. **Controlled publication only after explicit per-lesson approval:** then and only then may a separate implementation change enable that lesson's approved You Do content. Retain original lesson questions and answers as fallbacks. Do not bulk-enable or infer permission from readiness of neighbouring lessons.
5. **During/after teaching:** note ambiguity, difficulty, poor differentiation, wrong marking or a hard-to-read illustration. Amend the draft; recheck the affected question/answer/visual and republish that lesson only following normal checks.

## Fixed You Do presentation contract

- Code First question first; the Code First answer view repeats the question clearly.
- Four exam questions on one readable 2×2 selection screen.
- **One full answer page per exam question**, question repeated at top and the mark scheme clearly visible; four separate answer pages.
- The student's question view must not reveal the solution; exam SVGs large enough for half a projector screen, where relevant.
- **Only You Do** changes. Do not modify Do Now, Objectives, New Learning, I Do, We Do, Vocabulary, Exit Ticket, shared site CSS/JS beyond any separately agreed minimal You Do adapter, H446 or Cloudflare scoring.

## Teacher decision fields (record when used)

| Field | Permitted state / note |
|---|---|
| Lesson | J277 ID |
| Question set | Four mapped draft candidates and source IDs |
| Marking QA | Pending / needs correction / independently checked |
| Visual QA | Pending / needs correction / rendered and checked |
| Teacher decision | Not yet assessed / revise / approved for this lesson |
| Live override | **Disabled until explicit per-lesson approval** |
| After-lesson changes | Issue, replacement, recheck date if relevant |

Existing submitted teacher decisions: Lessons **042, 044, 045 = Not yet assessed; no comments** (see `docs/j277-youdo-teacher-review-decisions-20261122.md`). They are explicitly **not approved**.

## Standing QA risks

See [consolidated review register](j277-youdo-consolidated-final-review-register.md). In particular, Lesson 150 needs a complete worked pseudocode exemplar, not merely marking points; numerical traces, legal terminology and programming syntax require independent checking. The inventory is complete as a set of *proposals*, **not a validated product**.

**No live lesson edit, student activation, or automatic future action is authorised by this workflow document.**
