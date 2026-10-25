# Exit Ticket rollout — 25 October 2026

## Approved Classroom TV standard

- Top signal: **Exit Questioning · Silence · Choral** (shared lesson engine).
- Question/statement at the top. **YES** and **NO** equally sized and centred across the working area.
- Continue 1: reveal the answer on an otherwise matching screen; correct option highlighted **light green**, other option muted. Where available, show a verified topic-specific explanation beneath.
- Continue 2: separate confidence/reflection stage, preserving existing lesson-specific confidence descriptors.
- Existing Previous/Continue navigation controls and the shared mobile adaptation remain in use.
- Keep original specification content and question intact: don't invent an answer or silently change subject knowledge.

## Implementation

- Shared CSS: `assets/h446-lesson/lesson-base.css`.
- Shared JS: `assets/h446-lesson/lesson.js`; transforms only `.exit-compact` tickets bearing explicit `data-exit-correct="yes"` or `"no"` attributes.
- **J277**: Lesson 001 is an individually designed approved exemplar. Lesson 002 is explicitly tagged with a checked answer. Lesson 003's legacy adapter uses its original source's marked **False** response. Generator files `lessons/j277/autumn1-rebuilt.js` and `autumn2-rebuilt.js` pass through each lesson's recorded `x[1]` Boolean; absent/non-Boolean values are not converted.
- **H446 verified rollout (38 lessons)**: 001–006, 008–024, 026–034, 038–043. Each has an explicit checked Yes/No answer and explanation. Lessons 007, 025, 035–037 and 044 onward are **not** bulk-converted.
- **Fixed a legacy answer leak**: H446 038–043 contained the answers (e.g. “True.”) alongside their question. `data-exit-question` supplies the clean question text before the revealed answer appears. H446 032–034 likewise previously carried their answer in hidden source markup; the transformed reveal now presents it only in stage 2.
- **Exceptions**: H446 025 includes a binary-search explanation and separate homework instructions; do not remove these automatically. H446 035, 036 and 037 are respectively a readiness prompt, examination finish instruction and feedback/reflection, not ordinary binary knowledge checks. H446 007's subtraction wording needs pedagogical clarification before it is marked.
- Shared top-response Choral tile applies across H446/J277 from the common lesson JS. Individual unconverted Exit Ticket content may still say Thumbs and requires further audit.

## Verification state

- Confirmed: source commits exist; all edited JavaScript files parsed successfully; the answer-verification gate prevents applying guessed truth values; the shared lesson navigation already supports `.exit-stage` reveals; source used for J277 003 explicitly marks the statement False.
- **Exhaustive J277 Boolean presence check completed**: all 15 Autumn 1 generated lesson records (004–018) and all 146 Autumn 2 individual JSON files (019–164) have Boolean `x[1]` values. Lesson 001 uses its approved manually composed YES answer; Lesson 002 explicitly records YES; Lesson 003's original source marks FALSE. This verifies *presence* of answer data across 164 J277 lessons, not necessarily the subject accuracy of all 164 decisions.
- **J277 wording refinement**: corrected 13 definition fragments/imperatives in lesson Exit Tickets 059, 060, 062, 065, 067, 068, 069, 070, 073, 075, 077, 078 and 080 so that pupils can judge a complete statement. Their recorded truth values were preserved.
- **Explanation safeguard**: when a J277 record provides a truth value but no explanation, the answer screen asks pupils to explain why; it no longer displays the tautology “This statement is correct/incorrect” as a supposed model answer. Writing checked explanations across generated J277 lessons remains a content-audit task.
- **Repeatable smoke checks added** to [classroom-tv-smoke-test.html](classroom-tv-smoke-test.html), testing staged navigation, hidden answer, Choral tile, horizontal centring, green answer reveal, reasoning text and Previous navigation on selectable 1920×1080 and 390×844 viewports. The smoke-test source parses but must be run in a browser to report actual outcomes.
- **Not yet verified:** full live-browser behaviour at 1920×1080 and 390×844; every H446 Exit Ticket; question correctness against OCR/source mark schemes.
- H446 is only partially rolled out (38 of 300 source lessons); 262 remain unchanged or need audit. Counts describe opted-in source lessons, not live-rendered functional tests. Do not copy a known answer between different statements.

## Next QA gate

1. Live-test J277 001, 002, 003, 004, 019, 035, 113 and 164 through Question → Reveal → Confidence → Back, desktop and mobile.
2. Live-test H446 001, 005, 010, 012, 032, 039 and 043 (True and False, plus previously leaked answer cases) with the same steps.
3. Inspect H446 remaining lessons individually or from verified assessment data before enabling correct-answer highlights.
4. Flag any incorrect quiz truth values or mismatched `x` data for teacher review, not silent auto-repair.
