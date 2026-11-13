# Shared Skills system · RHSC Computing

This is the source pattern for **KS3, J277 (KS4) and H446 (KS5)**. Stage,
curriculum and challenge may change; learner navigation and interaction do not.

## Permanent teacher-shareable URLs

- Hub: `/exercise/{course}/{paper-or-group}/` where relevant.
- Skill: `/exercise/{course}/{paper-or-group}/{skill-slug}/`.
- Direct difficulty: add `?level=easy`, `?level=medium` or `?level=hard`.
- Print: add `print/` under each skill, retaining the level query.
- Answer key: `print/?level=medium&answers=1` (separate from pupil sheet).

Examples now live in source:

- `/exercise/paper2/variables/?level=medium`
- `/exercise/paper2/variables/print/?level=medium`

Older Paper 1 `?skill=...` links remain supported until those activities are
individually migrated. Older Paper 2 `?skill=variables` redirects to its page.

## Shared files, no per-skill style duplication

- `/assets/skills-system.css`: compact hubs, cards, paper switch and common
  activity layout. Must only affect `.rhsc-skills-system` pages.
- `/assets/skills-system.js`: validated level deep links and safe browser-local
  progress helpers.
- `/assets/skills-print.css`: common A4 worksheet/answer-key layout and print
  media rules. Print pages must use this file.
- Stage/skill files contain only question data, marking and special interaction.

Do not modify common lessons/Do Now CSS to implement a Skills activity.

## Standard skill experience

1. Open directly into the activity; no introductory wall of text.
2. Compact back link, skill name, Easy/Medium/Hard controls and Print link.
3. One question and one interactive working surface at a time.
4. Check, explain, retry, hint, next; never lock other skills after a score.
5. Use the same accessible layout on phone, desktop and classroom display.
6. Save progress under a unique course/skill/level key on the current device.
7. Teacher can link directly to the skill and chosen level.
8. Provide printer-ready A4 questions and a **separate matching answer key**.
9. Test every level, direct link, print page and regression-sensitive hub.

## Teaching progression

The labels are **consistent** but the difficulty is **relative to stage**:

| Level | Universal learner experience | Change with stage |
| --- | --- | --- |
| Easy | Explore or select with support | Vocabulary, example size, starting knowledge |
| Medium | Trace, complete or apply | Complexity, number of steps, scaffolding |
| Hard | Construct, explain, repair or evaluate | Independent demand and exam language |

J277 coding answers use OCR Exam Reference Language where appropriate. At H446,
tasks use the relevant OCR specification demands; KS3 uses accessible language.

## Incremental migration

Variables & Constants is the first dedicated skill page. Paper 1 remains on its
working legacy engine until each activity can be extracted without breaking
teacher deep links or pupil progress. New skills must use the dedicated route
and shared files above from the start.
