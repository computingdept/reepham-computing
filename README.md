# RHSC Learning Hub

Mobile-friendly learning navigation for Reepham High School & College, Years 7–13.

## Structure

- `index.html`: year groups → subjects → Lessons / Skills Practice / Exam Practice. Routes use URL fragments and work on GitHub Pages without server configuration.
- `computing.html`: preserved Computing department homepage.
- `year-7-hub.html`, `year-8-hub.html`, `year-9-hub.html`: separate Computing resources with 35 lesson spaces and two assessment points per year.
- Existing J277 and H446 course hubs remain linked.

## Content sources and limits

Subject navigation checked against the official websites on 24 September 2026:

- https://www.reephamhigh.org.uk/pupils/curriculum/
- https://www.reephamhigh.org.uk/seecmsfile/?id=6925 (2026 Year 10 options)
- https://www.reephamcollege.org.uk/for-students-and-parents/subjects/

KS3 year/group allocation, current Year 11 options and college cohort availability require school confirmation. The navigation includes published subject areas, not a personalised timetable. Other subjects' lesson counts, assessment dates, resources and marking materials remain unset. Do not invent them or apply Computing's 35 lessons/two assessments to every subject.

## Classroom TV question layout standard (OCR H446 and J277)

**Principle:** The content determines the layout. Every question, diagram, table and essential prompt must be completely visible and readable from the back of a classroom. Do not solve clipping by shrinking text or cropping diagrams.

For **You Do** screens, choose the number of questions shown according to their *actual* complexity:

| Task type | Questions per screen | Typical examples |
| --- | --- | --- |
| Short | **3** | One-line retrieval, definitions, quick Boolean algebra or brief calculations |
| Medium | **2** | Short algorithms, small truth tables, multi-step calculations |
| Complex / visual | **1** | Karnaugh maps, trace tables, logic circuits, substantial code, extended exam questions |

Implementation: J277 and H446 Classroom TV lessons use `assets/h446-lesson/lesson.js`. Set `data-window-size="3"`, `data-window-size="2"` or `data-window-size="1"` on the lesson's `<section id="you-do" ...>` as appropriate. This is a deliberate authoring decision, not an automatic inference from text length. If a question still does not fit, redesign its layout or split its steps; do not reduce fonts until it becomes unreadable. The navigation continues through the rolling questions.

Other phase rules:

- **Do Now:** at most four mixed retrieval questions from prior learning, not only the last lesson; answer/review screens remain separate.
- **I Do:** one clearly identified, fully worked model with its original task and visual/code reference available throughout the steps.
- **We Do:** work through one guided task at a time; keep the task and any essential diagram visible while the answer steps change.
- **You Do:** use the **3 short / 2 medium / 1 complex** rule; show all inputs, labels, diagrams, code and units needed to answer independently.
- **Quality check before publication:** inspect on a classroom-TV-sized browser and a narrow phone, including lesson phase navigation. Confirm SVG `viewBox` encloses every label/cell and the answer matches the displayed task. Avoid horizontal clipping or reliance on hidden details.

This is the standard for **new and edited lessons**. Review existing lessons with complex visual content individually; **do not bulk-convert all existing You Do sections to one question per page**.

## Classroom TV answer pages (H446 and J277)

The shared answer presentation is in `assets/h446-lesson/answer-layout.css`. Lessons H446 001–005 and 027 are the first converted examples.

- **One original question per screen.** Repeat the question and any code/diagram/marks on the left, with the full worked solution on the right. On phones the panels stack.
- **Clear hierarchy:** original task, prominent final answer, then working and marking guidance. Keep the original exam attribution and distinguish classroom allocations from official OCR marking.
- **Do not shorten or invent answer content when restyling.** Retain all existing worked steps and source notes, including original OCR question references where provided.
- Include the shared stylesheet **after** the lesson base and classroom styles in each `answers.html`, and use the `answer-stage`, `answer-split`, `answer-prompt`, `answer-solution`, `answer-result` and `answer-working` classes.
- Keep Next/Previous/Return to You Do navigation, keyboard arrows and touch swipe. For visual tasks ensure SVG viewBoxes contain all K-map cells, labels and groups.
- Avoid duplicating the old inline answer CSS. Check one short solution, one multi-step algorithm or calculation and one large diagram on desktop and phone before extending the design further.
- Reuse this design for future J277 answers; existing J277 answer pages are not automatically converted by adding CSS alone because their HTML also needs the two-panel structure.

## Mobile requirement

All updates must remain usable on iPhones and Safari, at narrow screen widths and with enlarged text. Preserve RHSC green branding, keyboard focus, touch targets of at least 44px and clear back links. Avoid horizontal page overflow. Keep year-group content separate.

## Hosting

GitHub Pages uses main, root. Custom domain: rhsccs.org.
