# H446 quiz feedback destinations — 23 October 2026

## Result

The source check passes for all 146 quiz topics (108 Paper 1; 38 Paper 2). Each topic's stable guide key resolves to a valid page in the correct current PDF. All 194 topic-to-lesson relationships have both `#new-learning` and `#i-do` targets: 388 phase destinations across 146 distinct lessons. Each app loads the shared guide lookup before using it, and every linked lesson has an accessible label.

These are checks against the checked-out source. They establish destination existence and navigation wiring. They do not certify browser behaviour, the teaching quality of every page, question accuracy, or full specification coverage. The findings below come from targeted reading of destination content.

## Content improvements in teaching order

| Priority | Topic | Current destination | Finding and next action |
|---|---|---|---|
| 1 | 1.4.3(d), gates and truth tables | Paper 1 page 225, key 190 | The destination teaches Boolean rewriting laws rather than introducing gate symbols and truth tables. Lesson 026 is correctly linked. Add a gate-reference and worked truth-table page. |
| 2 | 1.4.3(a), defining a Boolean problem | Paper 1 page 225, key 190 | Related content, but the page does not provide a complete scenario-to-condition-to-expression model. Add that model before expecting independent transfer. |
| 2 | 1.4.1(i), shifts and masks | Paper 1 page 170, key 131 | The destination is an exam-practice page. Prefer a worked example showing fixed-width shifts and AND/OR/XOR masks. Lesson 003 is relevant. |
| 2 | 2.3.1(e), stack algorithms | Paper 2 page 121, key 95 | The destination introduces linked lists and defines stack behaviour. A direct push/pop algorithm example would be a better starting point for the stack quiz. Lessons 020 and 049 are relevant. |
| 2 | 2.3.1(e), queue algorithms | Paper 2 page 121, key 95 | The destination introduces structures and defines FIFO. A direct enqueue/dequeue algorithm example would be a better starting point for the queue quiz. Lessons 020 and 050 are relevant. |

The recommendations concern where feedback begins. They are not claims that the wider guide contains no related material. Shared overview pages elsewhere are acceptable where they contain the relevant explanation.

## Next small change

ASCII/Unicode was resolved on 23 October: a dedicated teaching page was inserted at Paper 1 page 178, key 250, and the ASCII quiz now opens it. The page follows Lesson 008's AB worked example and distinguishes repertoire, code point and encoding. All original pages remain. Later guide destinations, contents, bookmarks and four printed cross-references were updated together.

Next: gate foundations. The remaining recommendations above are unchanged. Question content, scoring rules, lesson links and saved-results keys were not changed by the character-sets update.

## Reproduction

Run `python tools/revision/audit_h446_feedback.py` with Node.js and PyMuPDF installed. The companion CSV records every topic, guide key, current PDF page and lesson/example destination. The two floating-point topics also retain their existing skill-sensitive support routing; the recorded lesson arrays cover every possible support destination.
