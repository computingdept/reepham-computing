# H446 Check answer controls — 23 October 2026

All nine H446 practice apps retain explicit Check answer and Next actions. Students may change their selection before checking; feedback appears only after submission. Check answer is disabled until a selection is made and resets for every question.

The action controls now sit inside the answer form directly beneath the options. On phones, feedback follows the form; on desktop it remains alongside. Revealing feedback therefore cannot move the action button. Next explicitly has type="button" so it never submits the form. Enter on an answer radio submits the chosen answer. Focus moves to Next without forcing a scroll, and progression remains manual.

## Validation

- Browser QA at a 390 x 844 phone frame: long 1.5 monitoring argument question; changed selection before committing; feedback hidden before checking; Check answer and Next had identical document position and height; no horizontal overflow (375-pixel content/scroll width, with the frame scrollbar accounting for the remaining width).
- Phone argument quiz completed through all five stages to results: two displayed correct responses produced 40%; lesson and guide support links remained correct.
- Desktop browser QA at 1365 x 940: queue quiz, Enter submission, initial disabled state and per-question reset. Check answer and Next had identical position. One displayed correct response produced 20% after five questions; guide feedback opened Paper 2 page 122.
- All nine apps pass JavaScript syntax checks and HTML checks for control placement and explicit button types.
- Each app's source differs only in the added selection gate, scoped Enter handling and scroll-preserving focus. Question banks, scoring, saved-results keys and feedback routing are unchanged.

Long questions still require ordinary page scrolling on a phone; the control is not a sticky overlay. No automatic advance or timer has been added.
