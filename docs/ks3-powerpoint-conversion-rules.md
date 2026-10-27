# KS3 PowerPoint → Learning Hub conversion rulebook

**Status:** Living specification · Started 27 October 2026  
**Applies to:** Year 7, 8 and 9 Computing lessons in `lessons/year{n}/lesson-NNN/index.html`.  
**Source of truth:** The teacher's PPTX/worksheets for **educational content**; the existing approved J277/H446 classroom lesson assets for **interface and navigation**.  
**Review standard:** Lesson 003 (Microsoft Teams) is the first completed online KS3 lesson. Lesson 001 is a new pilot, not live until reviewed.

## How this rulebook grows

1. Before each conversion, read this file plus the source PowerPoint and all companion tasks.
2. Apply **Approved / established** rules by default. Interpret **Pilot / pending review** choices as provisional.
3. Log each newly raised issue under *Decision log*, with the lesson number, user's decision, and any correction.
4. Add or amend a general rule only once the teacher approves it. Do not silently turn a one-off edit into a sitewide change.
5. Preserve original files and keep new conversions at canonical `lesson-NNN/index.html`. The KS3 hub must mark **only teacher-approved lessons live**; existing legacy pages do not imply publication.
6. Before deployment, inspect the eight phases, content coverage, navigation, presentation width, short-screen scrolling, mobile readability and external links. Report source checks separately from live-browser verification.
7. The rulebook is a **versioned repo file**, not model training or autonomous learning. Its decisions can be consulted and reused in future sessions.

## A. Curriculum fidelity (established)

- Treat the original PowerPoint and worksheets as the source of teaching intentions, activities, context and sequence. Distinguish verbatim material from new scaffolds; don't invent assessments, learning objectives or links as though they were in the slides.
- Keep educational tasks and the required submission platform; the Learning Hub never falsely claims to submit files to Microsoft Teams or Arbor.
- Use information from previous lessons for Do Now **only if it has actually been taught**. Lesson 001 is an exception: use a clearly labelled *starting point / diagnostic* rather than pretending pupils have previous Year 7 lessons to retrieve.
- Do Now: four questions together followed by distinct answer screens. Always avoid answer leakage on the question screen.
- Eight phases in the established order: **Do Now → Objectives → New Learning → I Do → We Do → You Do → Key Vocabulary → Exit Ticket**. Use the shared `assets/h446-lesson/lesson-base.css`, `lesson-classroom.css` and `lesson.js` interface and behaviour. Keep classroom signs, mobile swipes, reveal sequence and left-side teacher navigation.
- I Do: teacher demonstration in ordered, hidden-until-revealed steps. We Do: guided pupil participation and ordered reveals. You Do: independent work, each substantial task on its own screen. Turn & Talk followed by count-in to silence, before independent work where appropriate.
- Key Vocabulary: **definition first → reveal term**. Exit: **three True/False questions**, each with a separate answer-and-explanation screen, then thumbs-up / sideways / down reflection. Do not expose answers before the response.

## B. Visual & accessibility (established by Lesson 003 corrections)

- Match J277/H446 lesson UI rather than building an independent KS3 visual system. Use responsive layout for classroom display and portrait phones; the same lesson must be understandable in both.
- Meaningful educational processes, flowcharts and relationships should be **editable, labelled SVG/HTML**, not decorative raster screenshots. Real-world photographs and true UI details that matter to teaching needn't be invented as SVG.
- A process diagram must include **visual clues** (recognisable icon, action label and short helpful hint), not only abstract boxes. Long six-step ribbons are hard to read on TV; use responsive cards or grouped stages.
- Avoid **nested two-column grids**: the shared classroom stylesheet already defines `.ido-example` and `.wedo-example` grids. Lesson 003 corrected this by placing a full-width heading above a single two-column card wrapper. On small screens stack panels and permit vertical scrolling instead of clipping.
- Keep images above supporting text where appropriate. Use large legible type, clear whitespace, balanced card widths and no horizontal scrolling on a phone.
- Highlight **key terms** with a subtle hand-highlighter yellow stroke, not large yellow boxes. Avoid duplicating labels or irrelevant decorations.
- Preserve shared lesson mechanics: button, click, touch swipe, answers and revealing remain functional. Lesson-specific styling must not modify unrelated lessons.

## C. External media (decisions confirmed in Lesson 003)

- A useful video should normally have its own purposeful *watch/investigate* screen, before the response task, with pre-viewing questions and a clear next step.
- Use embed only if the publisher **allows embedding**. No autoplay. If embedding is blocked, replace the broken player with a clearly labelled **Watch on YouTube** link that opens in a new tab. Don't work around the rights restriction.
- Keep a direct fallback link and disclose that school filtering may block external media. Do not replace the teacher's chosen content solely because embedding is unavailable.
- Identify old videos by their publication era, rather than asserting they are current technologies.

## D. Safety and privacy (applicable to Lesson 001 and later)

- Do **not** reproduce actual or plausible current school passwords, logins, pupil names, printer codes or security credentials from old slides. Use generic placeholders and NEVER ask students to type passwords into the Learning Hub, public planners or screenshots.
- Distinguish original historical rules (password length, sanction thresholds, behaviour reminders, monitoring conditions) from currently verified policy. Retain the concept but word policy-specific values as **check current school instructions**, unless verified.
- Explain filtering/monitoring without suggesting surveillance beyond school systems or specific disciplinary consequences without a current source.
- Screenshots/evidence should not show credentials, private messages or personally identifying information.

## E. Existing site & publication (established 27 October 2026)

- One entry: Learning Hub → **KS3 Computing** → Year 7/8/9 within the J277-style course hub.
- J277/H446 shared `assets/hub.css` for hub UI; use `assets/ks3-hub.js` to display only published KS3 lessons. Legacy lesson files remain in Git history/repository but are **retired**, not live.
- **Year 7 Lesson 003 is the only approved/live KS3 conversion** as of initial rulebook date. Do not mark another tile live until user review/approval.
- The original Year 8 booklet and revision hub remain accessible; revisions to KS3 lesson UI must not break them.
- Teacher review should be limited to one new pilot, not a demand to inspect dozens of legacy links.

## Decision log

| Date | Lesson | Decision | Status |
|---|---|---|---|
| 2026-10-27 | Y7 003 | Use J277/H446 eight-phase lesson engine and classroom signs. | Established |
| 2026-10-27 | Y7 003 | Replace generic flow boxes with SVG icons + action clues, responsive layout. | Established |
| 2026-10-27 | Y7 003 | Fix nested I Do/We Do two-column layout rather than resizing fonts or hiding content. | Established |
| 2026-10-27 | Y7 003 | Video rights block embeds: use separate external YouTube link with task on next screen. | Established |
| 2026-10-27 | KS3 hub | Legacy Y7/Y8/Y9 HTML lessons are retired; only Y7 003 is completed/live. | Established |
| 2026-10-27 | Y7 001 | Use starting-point diagnostic instead of prior-Year-7 retrieval. | Pilot — pending review |
| 2026-10-27 | Y7 001 | Omit old demonstration password and treat sanctions/credential handling as policy-dependent. | Safety rule — applied |
| 2026-10-27 | Y7 001 | Keep all original teaching strands: expectations, AUA, filtering, monitoring, sign-in, work presentation and safe evidence. | Pilot — pending review |

## Conversion QA checklist

- [ ] Correct source files identified; teacher's original preserved.
- [ ] Every source topic/activity covered, or omissions documented with reason.
- [ ] Four Do Now questions and separate answer screens; no untaught retrieval.
- [ ] Eight phases, correct nav IDs, accessible controls and mobile swipes.
- [ ] I Do/We Do step reveals readable on TV; no nested half-width containers.
- [ ] You Do tasks separate from answer screens; expected real-world submission clear.
- [ ] Definition-first vocabulary; 3 T/F exit answers with explanations and reflection.
- [ ] SVGs labelled, readable on TV/mobile; images accurately represent content.
- [ ] External links tested; no disabled iframe/unsupported auto-play.
- [ ] No real passwords/pupil identifiers or obsolete policies presented as current.
- [ ] JS syntax, required page structure, CSS paths and live-map publication checked.
- [ ] Live-browser visual and interaction QA logged separately from repository checks.
