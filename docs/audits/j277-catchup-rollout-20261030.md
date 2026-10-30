# J277 Catch Up rollout — 30 October 2026

## Publication state
- All 164 J277 lesson numbers now have a Catch Up route through the existing course hub.
- Lessons 001–030 use the existing lesson-specific Catch Up JSON and newly added four-question classroom-matched MCQ Do Now bank.
- Lessons 031–164 use a shared **teacher-review draft** renderer, loading the actual corresponding `autumn2-NNN.json` classroom lesson and `donow-bank-20261020.json`.
- All 134 new `lesson-NNN/learn.html` pages were committed from one common HTML template, rather than copying layout/code per lesson.
- Hub displays **Catch up draft** for 031–164; do not change this to approved until reviewed.
- Classroom lessons, revision guides, and existing PDFs were not modified.

## Shared behaviour
- Do Now: four classroom question stems (Q1 last lesson; Q2/Q3 earlier; Q4 challenge) converted to four-option MCQs and marked separately out of four. First 30 MCQ distractors are individually authored; 031–164 use generated alternatives and require teacher review.
- Learning sequence: Do Now, I Do, We Do, You Do, Review & Improve.
- 13 objective learning questions from the independent lesson count toward 80% mastery (Do Now explicitly excluded).
- Code First uses actual classroom OCR ERL code and has a collapsed model answer.
- Written exam-style response is checked with an existing classroom model and student self-review.
- Progress is local browser-only, unlimited retries, no server-side student data.
- Print-booklet learning-purpose footer is generated centrally and the stage highlight updates.
- On phones the footer has five compact labels and a full current-stage purpose below, not a sticky toolbar.

## Automated checks
- All 134 expected classroom source JSON files (031–164) were found.
- Each had the required concept explanations, vocabulary, model, Code First and exam-style source questions. All 134 passed these source-presence checks.
- Sampled builds 031, 045, 070, 088, 099, 100, 110, 128, 142 and 164 each produced 5 stages and 17 questions (four Do Now plus 13 learning questions) with correct option present, unique multiple-choice alternatives and valid matching structure.
- Shared JavaScript (engine and generator) passed parsing checks.
- GitHub hub and endpoints 031/164 were re-fetched after publication.

## Not certified
- Automatically generated distractors for Do Now questions 1, 3 and 4 in lessons 031–164 still require **pedagogical audit**. Some are too easy or poorly matched to the question context, despite being syntactically valid.
- Generated vocabulary-based learning questions need teacher review for depth, variation and SEN accessibility. Do not call the collection "Gold Standard" or "teacher approved".
- Classroom-to-Catch-Up coverage and Code First worked examples need a specialist check for each lesson.
- Live GitHub Pages rendering, keyboard navigation, mobile portrait usability, accessibility testing and each answer's accuracy have not been fully verified in a browser.
- The original four-page printed booklets are unaffected.

## Publication gate
For each draft, verify its four Do Now MCQ answers/distractors, its model and classroom coverage, Code First output, written model, keyboard/mobile use and answer feedback before changing the hub label from **Catch up draft** to **Catch up**.
