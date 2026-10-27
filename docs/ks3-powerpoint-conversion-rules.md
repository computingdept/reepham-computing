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

## Independent-learning clarity: one decision, then recall (revised 27 October 2026)

**Do not mistake more visible instructions for better scaffolding.** Classroom You Do screens should show just the action pupils must perform **now**, at the top and in large type. If the activity has multiple thinking stages, separate them with the existing **Next step** lesson navigation rather than fitting all stages onto the first screen.

- **Watch/choose stage:** give a concrete, bounded choice (usually three real examples, grounded in the linked resource). One pupil action: **Choose ONE clip and watch that section**. Provide direct, accessible links to the relevant chapters where available. Explicitly say what happens next: return and select **Next step**.
- **Recall/write stage:** start with an explicit output, e.g. **Write THREE sentences about your chosen invention**. Offer short writing frames for identification, function and audience/benefit. A single completed worked example can help pupils begin.
- **Do not front-load retrieval questions:** a screen asking pupils to choose and watch must not also display all the later writing questions. Those belong **after** the resource, on their own screen. Where there is a long teacher-authored question set, preserve it within a clearly labelled **Going further** disclosure rather than deleting it or displaying it all at once. Only make such tasks optional with explicit pedagogical approval.
- **Real examples, not invented clip claims:** Lesson 003's 2023 YouTube video has timestamped chapters for RayNeo X2 smart glasses (0:18), Aeo helper robot (4:52) and Aiper Elite Pro pool cleaner (5:29). These are three grounded starting options; the original full video remains accessible through those chapter links.
- **One shared presentation:** use the existing You Do `.youdo-stage` paging and shared `assets/ks3-lesson/lesson-pilot.css` classes `.ks3-clip-choice-grid`, `.ks3-clip-choice`, `.ks3-recall-frames`, `.ks3-recall-model` and `.ks3-recall-more`. No new navigation engine, storage or duplicated lesson-control JS is needed.
- **Pupil readability:** prominent task heading; minimal explanatory text; three large choices that stack vertically on mobile; a single plain-English next action; no unrelated labels or repeated footer instructions. Do not force pupils to read five questions and make three decisions before clicking Play.
- **Preserve the teacher's curriculum:** original video, all five source Task 1 questions, subsequent Task 2, homework, assessment and all lesson phases remain in the file. Ensure no answer is fabricated or represented as being provided by the video if it is only an assistant-created worked example.
- **QA:** verify timestamp links against the video's actual chapter listing; validate that three choices and three writing frames are visible in source and mobile CSS; test Next step from the clip selection to recall, and ensure any expandable original prompts stay within their own stage. Live-browser testing remains required before a wider rollout.


## Shared vocabulary introduction and highlighting (approved 27 October 2026)

**Non-negotiable teaching sequence:** **Objectives — introduce term and reveal definition → New Learning / I Do / We Do — reinforce with the same yellow highlighter-pen stroke → Key Vocabulary — show definition first and retrieve the term**. Do not test terms pupils have not been explicitly introduced to.

- **Single vocabulary source:** Every KS3 conversion already has definition-first Key Vocabulary retrieval stages in `#vocabulary .vocab-stage`. The shared `assets/h446-lesson/lesson.js` reads those existing terms and definitions, dynamically builds the Objectives introduction (term/definition cards, reveal controls, and introductory keyword chips), and **moves, rather than rewrites**, the original Objectives content. No manually duplicated term lists are required.
- **Use existing reveal controls and mobile gestures:** The generated Objective stages use the established `data-objectives-vocab="true"`, `.objective-vocab-stage` and `data-objective-vocab-definition` structures. The original shared Next / Previous / tap/swipe controller owns their interactions. KS3 phones must not skip vocabulary introduction.
- **One shared marker:** Extend `assets/h446-lesson/keyword-highlighter.js` to KS3 routes and read terms from the same generated Objectives chips. `keyword-highlighter.css` applies the established translucent yellow pen-stroke (not a solid yellow block) to both automatic `rhsc-shared-keyword` marks and existing manually marked `mark.keyword` text. No second KS3 highlighter engine.
- **Content fidelity:** Reuse teacher-authored terms/definitions verbatim. Do not automatically invent technical explanations or replace the original Objectives. The end retrieval remains separate and unchanged.
- **Safe fallback:** If a converted lesson has no valid definition-first retrieval entries or supplies its own authored Objective vocabulary layout, the shared generator does not fabricate content or override it. The converter must flag the lesson as missing the introduction during QA.
- **Source QA:** Check Objectives vocabulary staging, exact equality of start/end term sets and definitions, automatic and manual yellow-stroke styling, separate ending retrieval, desktop TV/mobile (including touch-to-reveal), and lesson content preservation. Live browser verification is still required to confirm appearance and interactions.
- **First rollout:** Year 7 Lessons **001, 003 and 004** use the central shared assets. This updates their behaviour without publishing preview lessons 001 or 004.

## Shared classroom-focus typography (pilot, 27 October 2026)

- **Teaching focus outranks headings:** the *currently revealed* I Do / We Do step should be readable from the rear of a classroom, not subordinate to large static titles.
- **Shared CSS:** `assets/h446-lesson/lesson-classroom.css` includes opt-in `body[data-classroom-focus]` rules for smaller phase/card headings, a larger current teaching step, and **balanced 50/50 visual/method panels** where an I Do/We Do panel pairing exists. Visual-card titles (approximately 18–22px) and instructional captions (approximately 15–18px) remain readable, while the revealed teaching step stays most prominent. It retains scrolling on shorter screens and one-column reading order on mobile.
- **Shared JavaScript:** `assets/h446-lesson/lesson.js` adds `syncClassroomFocus()` to the **existing** `updateControl()` flow. It reads the current `.ido-step`/`.wedo-step` hidden state, gives the visible step `.classroom-focus-active`, and otherwise focuses the question/prompt. It must **never** reveal, hide, reorder or advance teaching content.
- **Pilot only:** `lessons/year7/lesson-003/index.html` has `data-classroom-focus="pilot"` on `body`. Unflagged KS3/J277/H446 lessons remain unchanged while the pilot is checked.
- **Synchronized model diagrams (optional):** for a diagram that genuinely corresponds to reveal steps, annotate existing diagram elements with `data-classroom-focus-step="N"`. The shared JS applies `.classroom-focus-visual-active` to diagram elements for the current N. More than one diagram item may map to the same teaching step. No diagram-specific JS, change to lesson content, or manual annotation of all lessons is required: unannotated lessons retain balanced typography with no diagram highlighting.
- **Lesson 003 example:** diagram cards 1–4 follow model steps 1–4, while both `Hand In` and `Check submitted` highlight for model step 5; this reflects that the modelled final step covers pressing Hand In and checking completion.

- **Rollout:** do not edit hundreds of individual lesson files. After representative long-text, code, diagrams and mobile checks, enable the shared rule centrally in the common JS/CSS assets. Keep selectors scoped to I Do/We Do. Identify exceptions automatically and retain rollback by removing/disabling one feature gate.
- **QA:** test (1) question focus before a reveal, (2) visible step focus after reveal, (3) Previous restores earlier step focus, (4) no styling when flag absent, (5) classroom TV readability without cropped instruction and (6) mobile portrait without horizontal overflow. Source-level tests do not substitute for browser rendering checks.
- **Status:** shared implementation and pilot committed; pending independent TV and mobile visual confirmation before global rollout.

## Teaching-first compact screen hierarchy (CSS pilot, 27 October 2026)

- User-approved direction: do not alter educational content or lesson navigation merely to remove repeated visual headings. Test whether **central CSS alone** can solve it.
- **Pilot:** Year 7 Lesson 003 alone opts in via the existing `body[data-classroom-focus="pilot"]` feature flag and versioned `lesson-classroom.css?v=20261027-teachingfirst3`.
- Within a compatible I Do/We Do example, arrange the existing eyebrow and learning title in one compact top row; do not hide text or change the DOM.
- Put existing structural labels (e.g. "REVEAL EACH STEP" / "My demonstration") together as a compact row. Place the **revealed model step immediately below**, with its existing supporting paragraph visually underneath. This is presentation order only; the HTML and spoken/screen-reader order remain untouched.
- Preserve the 50/50 reference/working panels, rear-of-class legibility, optional step-synchronised diagram highlight and mobile stacking already implemented by the shared focus rules.
- **Generalisation constraint:** do not hide all `h2` or `.phase-tag` elements globally. Compact the specific model-panel structure (`.method-panel:has(> .ks3-model-steps)`) only. Other content arrangements require representative checks before extending the selector set.
- **Rollout gate:** share the CSS/JS centrally, but keep it opt-in until the current pilot and J277/H446 representative lessons have been checked for TV readability, mobile overflow and code/diagram safety. Source checks are not live visual QA.

## Student-facing editorial standard (approved 27 October 2026)

- **Student screens must read like finished lessons, not notes about converting a PowerPoint.** Include direct teaching explanations, questions, modelled actions and tasks. Do not display phrases such as "the original slides say", "the diagram is an example", "follow current teacher guidance", "this Learning Hub page does not...", or "preview converted from PowerPoint".
- **Keep authoring notes, uncertain policy details, platform-change caveats and rationale in this conversion rulebook or code comments**, not in learner-facing objectives, diagrams, activities, answer reveals, headers or footers.
- **Write direct instructions:** "Open OneDrive" rather than "use the route shown by your teacher"; "Save your work in OneDrive so you can access it at home" rather than explaining what the original task meant.
- **Keep necessary safety instructions** as direct, short pupil actions (e.g. "Keep your password private" and "Crop screenshots so private details are not visible"). Do not remove genuinely educational or safeguarding content when removing commentary.
- **Preserve the standard classroom phase labels and routines:** "I Do · Teacher demonstration" and exit reflection instructions remain useful elements of the agreed lesson interface.
- **Final QA:** search the rendered page content for "original", "PowerPoint", "teacher guidance", "pilot", "preview", "current instructions", "this website", and similar editorial phrases. Remove or relocate any that do not serve a real pupil learning action. Do not remove the underlying curriculum content.
- Only approved converted lessons appear as completed in the KS3 hub; removing "pilot" from the learner screen **does not publish the lesson**.

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
| 2026-10-27 | Y7 003 · classroom focus | Use central shared CSS and JS so the current I Do/We Do teaching step, not static headings, commands attention. Roll out after pilot rather than individual lesson edits. | **Pilot — source checks passed; visual QA outstanding** |
| 2026-10-27 | Y7 003 · visual balance | Match LHS/RHS width (50/50); enlarge meaningful SVG-card captions and link active diagram cards to the current model reveal. Keep the visual legible, not just the RHS text. | **Pilot refinement — source checks passed; visual QA outstanding** |
| 2026-10-27 | Y7 003 · teaching-first CSS | Compact existing phase/lesson/model headings into two short header rows, place current modelled step at the top of its panel and supporting notes below; **no content or JS behaviour changes**. | **Pilot — source audit pending, visual QA outstanding** |
| 2026-10-27 | KS3 001/003/004 · vocabulary | Generate Objectives vocabulary from the unchanged end retrieval set, use shared definition-reveal controls and J277/H446 pen-stroke highlighting. Require this in all future KS3 conversion audits. | **Approved shared standard** |
| 2026-10-27 | Y7 003 · independent instructions | Begin independent video/task screens with large **watch → choose → return/next** actions before the resource; remove repeated small-print directions below. Reusable task-first CSS, no video or quiz changes. | **Approved shared KS3 standard** |
| 2026-10-27 | Y7 003 · task visibility | Put **Choose ONE invention** as the largest visible task; reinforce with Watch → Choose → Answer and preview the same five Task 1 questions above the video. Match the next screen heading to the task. | **Superseded: too much on first screen** |
| 2026-10-27 | Y7 003 · bounded choice and recall | Give three confirmed timestamped video choices on one screen, then use Next step for a three-sentence recall scaffold and worked example. Retain five original Task 1 questions under optional Going further. | **Current pilot — visual QA outstanding** |
| 2026-10-27 | Y7 003 | Use J277/H446 eight-phase lesson engine and classroom signs. | Established |
| 2026-10-27 | Y7 003 | Replace generic flow boxes with SVG icons + action clues, responsive layout. | Established |
| 2026-10-27 | Y7 003 | Fix nested I Do/We Do two-column layout rather than resizing fonts or hiding content. | Established |
| 2026-10-27 | Y7 003 | Video rights block embeds: use separate external YouTube link with task on next screen. | Established |
| 2026-10-27 | KS3 hub | Legacy Y7/Y8/Y9 HTML lessons are retired; only Y7 003 is completed/live. | Established |
| 2026-10-27 | Y7 001 | Use starting-point diagnostic instead of prior-Year-7 retrieval. | Pilot — pending review |
| 2026-10-27 | Y7 001 | Omit old demonstration password and treat sanctions/credential handling as policy-dependent. | Safety rule — applied |
| 2026-10-27 | Y7 001 | Keep all original teaching strands: expectations, AUA, filtering, monitoring, sign-in, work presentation and safe evidence. | Pilot — pending review |
| 2026-10-27 | Y7 001 | Preserve three separate presentation expectations: green folders, paper lessons, Class Notebook; a generic "work neatly" summary loses important instruction. | Pilot — pending review |
| 2026-10-27 | Y7 001 | A blank/branding-only slide need not become a learning phase; repeat "organisation" slides may be consolidated while retaining each action. | Pilot — pending review |
| 2026-10-27 | Y7 004 | Student-facing prose must contain teaching and actions only; remove conversion commentary, policy caveats and unnecessary teacher guidance from visible screens. Preserve brief privacy/safety instructions. | **Approved rule** |
| 2026-10-27 | Y7 003 | Rebuilt the published Microsoft Teams lesson to the approved pupil-facing editorial standard: no conversion/source notes, no technical embed explanation, clear worksheet/Teams instructions; preserve five You Do screens and the original YouTube link. | Approved rule applied |
| 2026-10-27 | Y7 003 | Moved Lesson 003's exact existing CSS to the shared `assets/ks3-lesson/lesson-pilot.css` already used by Lesson 004, without changing visual selectors or classroom JavaScript. | Approved reuse |
| 2026-10-27 | Y7 004 | Where Microsoft interface screenshots may be outdated, replace with **illustrative SVGs** labelling stable concepts (folder, launcher, notebook, screenshot), not falsely exact screenshots of today's interface. | Pilot — pending review |
| 2026-10-27 | Y7 004 | Preserve prior-lesson review (Teams Hand In, OneNote, Teams areas, To/Cc/Bcc), including four separate answer screens, and move practical signing-in order into visual new learning. | Pilot — pending review |
| 2026-10-27 | Y7 004 | Preserve precise Class Notebook evidence task: date on the `7.1 Introduction to Computing` page, screenshots of homework email **and** Teams assignment, safely cropped. | Pilot — pending review |
| 2026-10-27 | Y7 004 | When PPT slides mention older school website labels, preserve navigation intent but acknowledge that school links may be renamed. Homework planner page number/reminders remain a teacher-confirmed historical instruction. | Pilot — pending review |


## Lesson 004 pilot source coverage (27 October 2026)

**Source:** `7.1 Lesson 4 - OneDrive & Class Notebook(3).pptx` (12 slides). The original PowerPoint is unchanged; conversion is `lessons/year7/lesson-004/index.html`.

| Original slide | Source content | Conversion coverage |
|---|---|---|
| 1 | Do Now and homework checklist: planner p16 signed, email teacher / Arbor, Teams assignment | Do Now homework check (teacher confirms current requirements) |
| 2 | True/False Hand In; identify the OneNote app | Do Now questions 1–2 with separate answers |
| 3 | Label Teams picture (Posts, Files, Assignments, Class Notebook); order home Microsoft login | Do Now question 3; New Learning stage 2 shows ordered access steps in SVG |
| 4 | Flashback To / Cc / Bcc roles | Do Now challenge question 4 and answer |
| 5 | OneDrive storage, Class Notebook evidence, screenshots | Objectives |
| 6 | OneDrive from home/school; school website, student links, Outlook/Microsoft, app launcher | New Learning stages 1–2, illustrative SVG (historical menu naming caveat) |
| 7–8 | Store school subject work in OneDrive rather than My Documents; make folders | New Learning stage 3; I Do; independent Task 1 |
| 9 | Unit page in Class Notebook as evidence of understanding, effort, presentation | New Learning stage 4; guided practice |
| 10 | Date 7.1 unit-page table; two earlier works (homework email + Teams assignment); Snipping Tool | New Learning stage 5; You Do Tasks 2–3; teacher guided We Do |
| 11 | Screenshot, OneDrive, Class Notebook definitions | Definition-first vocabulary, plus useful supporting terms OneNote, folder and app launcher |
| 12 | Recap objectives, positive recognition, end reminders | 3 T/F exit questions with separate explanations, thumbs reflection; current logistical notices left to teacher |

**Unchanged teaching intent:** pupils store accessible files, retrieve and edit them, and show evidence in Class Notebook. The new diagrams are clearly illustrative, not exact screenshots. Students never submit personal information or credentials via the Learning Hub.

**Publication:** Preview/pilot only. Lesson 003 remains the only teacher-approved live KS3 tile until review.

## Lesson 001 pilot source coverage (27 October 2026)

Original source: `7.1 Lesson 1 - Welcome to Computing.pptx` (9 slides; same teaching content as the current uploaded `(3)` version).

| Original slide | Content | Conversion / exception |
|---|---|---|
| 1 | Three Computing expectations | New Learning stage 1, Tasks 1 and 3 |
| 2 | Blank or brand-only visual | Not a separate learning stage |
| 3, 5, 7 | Repeated organisation checklist | New Learning stage 5 and You Do Tasks 2–3 |
| 4 | Filtering, monitoring, school consequence reminders | New Learning stages 3–4; specific sanctions deferred to **current school policy** |
| 6 | Logging in, password guidance and example credential | New Learning stage 5 and I Do; **sample credential deliberately excluded** |
| 8 | Safe evidence to Class Notebook; reflection; logistical reminders | You Do Task 4 and exit reflection; time-sensitive site logistics deferred to current teacher instructions |
| 9 | Presentation standards for folders, paper and Class Notebook | New Learning stage 6 and You Do Task 3 |

**Publication status:** `lessons/year7/lesson-001/index.html` is a review-only pilot. It must not enter the live KS3 lesson map until approved. `lesson-003` remains the only live KS3 conversion.

## Conversion QA checklist

- [ ] Correct source files identified; teacher's original preserved.
- [ ] Every source topic/activity covered, or omissions documented with reason.
- [ ] Four Do Now questions and separate answer screens; no untaught retrieval.
- [ ] Eight phases, correct nav IDs, accessible controls and mobile swipes.
- [ ] Vocabulary introduced in Objectives before end retrieval; identical term/definition source, on mobile too.
- [ ] Shared yellow pen-stroke highlights technical terms on all lesson screens; no separate KS3 styling engine.
- [ ] I Do/We Do step reveals readable on TV; no nested half-width containers.
- [ ] You Do tasks separate from answer screens; expected real-world submission clear.
- [ ] Independent-learning task has prominent **what/how/next** instructions before resource links, with no duplicated footer instructions.
- [ ] Clip-choice stage asks for only **one choice and one viewing action**; recall/writing questions appear on **the following screen**, not before the clip. Give a clearly modelled written response and preserve source questions as an optional extension where agreed.
- [ ] Definition-first vocabulary; 3 T/F exit answers with explanations and reflection.
- [ ] SVGs labelled, readable on TV/mobile; images accurately represent content.
- [ ] External links tested; no disabled iframe/unsupported auto-play.
- [ ] No real passwords/pupil identifiers or obsolete policies presented as current.
- [ ] No authoring/PowerPoint commentary, teacher-only implementation notes or generic caveats appear in pupil-facing screens.
- [ ] JS syntax, required page structure, CSS paths and live-map publication checked.
- [ ] Live-browser visual and interaction QA logged separately from repository checks.
