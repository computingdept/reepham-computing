# PowerPoint → Online Learning: shared design standard

**Version:** 0.2 · 27 October 2026  
**Status:** Agreed principles distilled from the RHSC Computing pilot; **a reusable starting point, not an automatic rollout or subject-wide content approval**.  
**Applies to:** Future school/Trust subject conversions of teacher-authored PowerPoints, worksheets and related resources into Learning Hub lessons.  
**Related subject-specific rulebook:** [KS3 Computing conversion decisions](ks3-powerpoint-conversion-rules.md).

## Purpose

**The goal is not to put PowerPoint slides on a website. It is to preserve the teacher's learning intentions while making the lesson usable in class, at home and when a pupil needs to catch up.**

A single lesson should work **independently by default and teacher-guided when presented in class**. The teacher remains the authority for what is taught; the shared web interface supplies reliable, familiar navigation, displays and classroom routines.

## 1. Preserve the teaching, change the delivery

- Treat the teacher's original PPTX, worksheets, activities, diagrams, analogies and assessment materials as the **content source of truth**. Retain an untouched copy; record intentional alterations and omissions.
- Identify the intended learning sequence and what pupils actually do. Do not mechanically turn every original slide into a separate web screen: divide or combine screens only when that makes the learning clearer **without losing the teaching**.
- Never invent school instructions, facts, assessment criteria, video contents, exemplar answers, credentials or resource links. Verify any concrete choice (such as a timestamped clip) against the real source.
- Keep teacher-approved tasks and outcomes intact. Moving or relabelling work as an optional extension is a **teaching-content decision requiring teacher approval**, not an automatic CSS conversion.
- Distinguish the **subject's pedagogy** from the universal interface. Do not require every subject to use Computing's exact eight phases, exam practice, Code First or specific vocabulary tests.

## 2. One screen, one learning focus

- The **thing pupils need to read, think about, do or write now** must be first and most visually prominent.
- Reduce *structural* clutter: large repeated phase labels, “My demonstration”, “Watch and think”, duplicated instructions, technical/editorial notes and oversized static headings. Do not automatically hide meaningful subject headings.
- Keep the current modelled step or question readable from the back of a classroom; the visual model and explanation should have balanced space. Use shared CSS/JS presentation rules rather than fixing each lesson by hand.
- Put actionable instructions **above** videos, worksheet links or other resources. Pupils must know what they are doing, how to start, and what happens when they finish.
- Avoid overloading a screen with everything pupils will need later. **Fewer simultaneous decisions** beats more visible instructions.

## 3. Independent by default; teacher-guided without a second lesson

The same learning sequence should work in both circumstances:

| In class | Learning independently |
| --- | --- |
| Teacher opens the lesson, models or selects an example, and asks a focused question | Pupil opens the same lesson and follows the clear next action |
| Teacher uses a brief established routine, such as **Turn & Talk**, then counts into silence | Pupil is invited to **think silently** about the same purposeful question |
| Teacher advances using the ordinary lesson control and supports writing | Pupil uses **Next step** and the same writing support |
| Teacher checks understanding, adapts explanations and feedback | Pupil sees enough instructions and worked support to continue |

**Do not create a second teacher-only content version or an additional mode unless there is a genuine need.** A short cue for classroom discussion must lead directly into the independent task, not become a competing activity.

## 4. Chunk media, talk/think and writing

For suitable lesson activities, use the **Watch → Discuss (or Think) → Write** pattern.

**Screen A — Watch and choose.** State a single action, such as “Choose ONE invention”. Offer a small set of *specific, real, source-grounded choices*; a teacher can select one for everyone, while an independent pupil can choose. Link directly to the relevant resource if possible. Clearly say: “Return here and select Next step.”

**Small bridge — Discuss or think.** Provide **one focused prompt** that will help with the subsequent writing, e.g. “Who could this invention help, and why?” Classroom pupils can Turn & Talk; pupils alone can think silently. Keep the cue brief and visually subordinate to the main task.

**Screen B — Write / recall.** State the exact written output, e.g. “Write THREE sentences”. Use readable sentence starters and, when useful, a concise completed example. Preserve the teacher's longer question set, but only make it a voluntary “Going further” option **when the teacher has agreed**.

The pattern is **illustrative, not mandatory**: other subjects and tasks may need read → discuss → solve, observe → predict → explain, listen → practise, etc. Reuse the *one-action-per-stage* principle instead of forcing videos into every lesson.

## 5. Vocabulary and visual conventions

- Where a subject tests key terminology, **introduce it explicitly before testing it**. Use the same teacher-approved terms and definitions for initial teaching, in-lesson reinforcement and later retrieval.
- Reuse the common **subtle, marker-pen-style yellow highlighting** for important language rather than creating inconsistent solid yellow boxes or another highlighter script.
- Keep diagrams, icons and analogies **meaningful and accurate**, large enough for classroom screens and mobile. Highlight the corresponding visual step only when the mapping is genuinely correct.
- Use established behaviour/response routines when a school/department has approved them; do not assume their exact labels are universal across all subjects.
- On mobile, prioritise readable vertical flow, usable controls and no horizontal overflow. Preserve the same lesson content and actions.

## 6. Shared technology and subject adapters

- **Shared presentation:** compact heading hierarchy, readable content panels, focused reveal typography, responsive spacing and resource/task cards.
- **Shared behaviour:** accessible Next/Previous, stage-by-stage reveals, preserving hidden answers, mobile navigation and optional focus synchronisation.
- **Subject/course-specific content:** curriculum order, exam terminology, code tasks, source material, diagrams, lesson objectives and assessments.
- Make the generic interface **opt-in and reversible during pilots**. Don't silently switch every lesson to new styling or require teachers to check every page by hand.
- Prefer a central design system with lightweight subject-specific rules, not many duplicated HTML/CSS/JS implementations.

## 7. Workflow for converting a source PowerPoint

1. **Read the whole source pack** (PowerPoint, worksheets, videos and relevant existing lesson structures) and record objectives, concepts, worked examples, pupil tasks and answers.
2. **Sketch the screen journey**: what pupils see first, what the teacher demonstrates, what pupils discuss/think, what pupils do or write, and how they check learning.
3. **Reuse the agreed interface and interactions**. Content may need teacher sign-off; shared design decisions should not need repeated lesson-by-lesson approval.
4. **Check fidelity**: compare online tasks, diagrams, vocabulary, examples and assessment prompts with their source; flag missing or changed teaching.
5. **Test representative display cases**: large TV, short-height TV, desktop, mobile portrait, long text, diagrams, code/equations/tables, keyboard access, media links and reveal/back controls.
6. **Pilot before broad release**. Record layout bugs and design decisions once; fix centrally when feasible; use automated checks for compliance and flag only genuine exceptions for teacher review.
7. **Record the decision and its status**. Separate *approved standard*, *pilot awaiting visual QA*, *subject-specific choice* and *superseded idea* so an abandoned prototype is not repeated in another department.


## 8. Approved rollout sequence and ownership (27 October 2026)

**This is the centrally agreed project strategy, not confirmation that other departments have consented, contributed materials or been scheduled.** The approach remains subject to the relevant department's and school's approval.

### Priorities — protect Computing workload reduction

1. **KS4 Computing (OCR J277):** complete and stabilise teaching and revision resources to reduce the Computing teacher's preparation, delivery and maintenance workload.
2. **KS5 Computer Science (OCR H446):** complete and stabilise teaching and revision resources for the same workload-reduction purpose.
3. **KS3 Computing showcase:** aim for **five converted lessons each in Years 7, 8 and 9** (15 lessons total), using original PowerPoints that were **not authored by the project lead**. Test whether the process preserves another teacher's pedagogy, works independently and avoids repeated one-off fixes. No unreviewed KS3 lesson should be marked live.
4. **Cross-subject pilots after Computing demonstrates the approach:** invite **Science** and **English** first, with departmental AI leads coordinating a small sample of existing lessons. Science tests diagrams/practicals; English tests extended reading, text annotation, modelling and writing. These are *candidate pilots*, not published commitments.
5. **Maths:** leave for a later, voluntary phase. Show evidence and listen to subject-specific concerns, including notation, worked solutions and existing practices; don't impose the platform or describe caution as a defect.

### Centrally maintained interface — a binding architecture rule

- **One Trust-wide design system:** all reusable layout, typography, task cards, highlighting, stage navigation, reveals, mobile interactions and accessibility behaviours are implemented in **centrally maintained CSS and JavaScript**. Subject lessons supply structured **content**, not per-lesson CSS/JS customisations.
- Do **not** paste subject-specific fixes into individual pages to make a showcase look polished. When a new activity type needs support, design a **generic, opt-in, reusable component** centrally, then test it across representative KS3/J277/H446 screens before broad activation.
- Subject variation is legitimate in **curriculum, content, tasks and pedagogical sequence**, but should use a shared set of presentation and interaction primitives. Don't force Computing's exact phases onto Science or English.
- Allow a **plain first pass**, but **not an unclear, inaccessible or broken one**. Preserve the pupil's ability to know what to do, see relevant content and navigate, even before visual refinements.
- Diagnose and solve defects **once centrally** where possible. Record whether the fault was content-specific, design-system-wide or a genuine subject-specific exception. Add regression coverage so earlier lessons do not break.
- Any warranted exception must be centrally documented and supported through a deliberate component/option, not a hidden workaround in a lesson file.

### Responsibilities, review and scale gate

| Role | Owns | Does not automatically own |
| --- | --- | --- |
| **Central Learning Hub / conversion process** | Shared CSS/JS, conversion rules, accessible templates, navigation, automated technical checks, staging and publishing | Deciding whether a Science or English explanation is correct |
| **Departmental AI lead** | Coordinates source packs, liaises with teachers, identifies subject-specific conversion issues and consolidates feedback | Maintaining GitHub, writing bespoke CSS/JS or independently changing curricular intent |
| **Subject teacher / curriculum owner** | Original teaching intentions, subject accuracy, diagrams/analogies, assessment integrity, approval of meaningful content changes | Debugging common website behaviour or repeating shared UI design decisions |

**Scaling gate:** Before inviting additional departments, show that a representative new PowerPoint can be turned into a correct, accessible lesson with *declining* manual intervention. Evaluate teacher review time, technical exceptions, pupil usability, maintenance effort and regression tests. Do not confuse quantity of published lessons with evidence of workload reduction or scalability.

**Publication rule:** This is a strategy and operating standard only. Do not automatically publish, alter existing teaching content, recruit departments or activate sitewide CSS/JS as a consequence of recording it.

## Decisions learned from Year 7 Lesson 003

| Lesson 003 discovery | Generalisable learning |
| --- | --- |
| Large repeated headings pushed teaching below the visible area | Compact structural headings; start with the learning |
| Enlarging only the right-hand model made the diagram hard to read | Treat both panels as teaching information; balance layout and current focus |
| Vocabulary was tested without explicit introduction | Teach terms first; highlight and retrieve the same terms later |
| Video instructions appeared above, below and beside a link | Give a single clear action before the resource; remove duplications |
| Watch → Choose → Answer *plus five visible questions* overwhelmed the first screen | One decision at a time; place the writing task on the next stage |
| “Choose an invention” did not tell pupils which ones | Offer a small number of concrete, verified choices |
| Teacher presentation and independent learning looked like separate needs | Use one lesson with a short optional **Talk / Think** bridge |
| Repeated per-lesson CSS fixes increased review burden | Change the shared engine, test a sample, flag exceptions only |

**Implementation boundary:** These principles are documented for future conversion work. They do not authorise publishing more KS3 lessons, rewriting other subjects' PowerPoints or activating sitewide CSS/JS without approval.
