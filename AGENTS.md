# Repository guidance for automated changes

## Mandatory learning platform architecture — all lesson changes

These standing instructions apply to H446, J277 and other numbered Learning Hub lessons. They apply to every automated coding session, including short requests such as "change lesson 45 to recursion". A content request does not authorise a redesign, framework migration or changes to shared presentation or behaviour. The teacher's current explicit scope and approved phase contracts take precedence; stop and flag a conflict rather than silently changing an established design.

### 1. Separate content, phase presentation and platform behaviour

- **Platform layer:** shared CSS/JavaScript owns navigation, classroom routines, branding, accessibility, common typography, responsive behaviour and shared lesson lifecycle.
- **Phase layer:** shared phase CSS/JavaScript owns each phase's layout, screen grouping, reveals, feedback and interactions. Use existing shared modules and markup contracts; the target is one maintained implementation per phase, reused across applicable courses. Do not introduce a new phase module or consolidate legacy modules as part of a content edit.
- **Lesson layer:** individual lessons supply subject content (questions, answers, examples, code, diagrams, objectives, vocabulary, skill references and agreed content metadata). They must not introduce presentation or behaviour overrides.
- Do not add, copy, expand or migrate lesson-local CSS, inline scripts, layout overrides, embedded event handlers or duplicate shared UI markup without explicit approval. SVG drawing attributes and code examples are content, not permission for local page styling or executable page scripts. Existing legacy exceptions are not templates for new work; do not remove unrelated existing exceptions during a content edit.
- Reuse the established phase HTML and existing approved SVGs/skills where suitable; do not clone an entire legacy lesson as a shortcut. Preserve asset loading and shared selectors/attributes. Read the actual consuming CSS/JS, not just a visually similar lesson.

### 2. Mandatory preflight — before any edit

1. Read this file and any applicable course/phase guidance. Inspect the target lesson, a current known-good example of the relevant phase, and the shared code that actually renders it.
2. Identify the scope: content-only, one approved phase, or an explicitly authorised shared architecture change. For content changes, freeze other phases and the shared CSS/JS; when repurposing an entire lesson, retain its established phase contracts. No incidental redesign, bulk rollout, unrelated audit or change to another course/NEA/Cloudflare.
3. Identify the authoritative content sources and downstream dependencies. Check which content is generated or overridden at runtime, and which authored HTML is only a fallback. Inspect both the displayed question and its answer reveal.
4. For a topic change, check the preceding and following taught lessons, curriculum grouping, Do Now references (including downstream retrieval of the changed topic), exam question mappings/banks, objectives, vocabulary, We Do skill mapping, Catch-Up and print resources. Modify only entries actually affected. Preserve unrelated records and approvals.
5. If the requested content cannot be represented by an existing shared component, stop at that boundary and explain the specific limitation. Obtain approval for a shared component change before implementing it.

### 3. Phase contracts to preserve

| Phase | Required approach |
| --- | --- |
| Do Now | Four retrieval questions for normal lessons: Q1 previous taught lesson true/false, Q2 earlier-learning MCQ, Q3 earlier retrieval, Q4 challenge. Match references to actual teaching. Keep question/answer screens separate. Use the established shared Do Now rendering and banks. |
| Objectives | Reuse shared objectives/vocabulary layout and term-definition reveal; do not create a bespoke panel. |
| New Learning | Use shared teaching/reference layout and reveal hooks; diagrams and examples are content. |
| I Do | Retain the original task/reference, EXAMPLE where present and shared stepped model/reveal behaviour. |
| We Do | Reuse the shared guided practice and Skills Hub mapping/launch components; use existing appropriate skills, allowing one skill to support multiple lessons. |
| You Do | Retain Code First where the course/lesson requires it, separate independent questions from compact model answers, and use the existing shared screen-fit/grouping policy. Where adaptive grouping is enabled, let the controller choose 1–4 fitting questions; do not impose local group sizes, restyle cards or add bespoke navigation. Respect protected specialist/assessment routes and the applicable J277 mapping workflow below. |
| Vocabulary | Use the shared definition-first retrieval/reveal structure. |
| Exit Ticket | Use the established shared three-statement true/false question, answer and confidence stages where applicable; use existing approved legacy/specialist formats only where required. No custom exit controller or extra reveal sequence. |

For H446, inspect `assets/h446-lesson/lesson.js`, `lesson-base.css` and `lesson-classroom.css` in that directory, plus the relevant phase assets. Current shared You Do assets include `assets/h446-y13/h446-you-do.css` and `assets/h446-y13/h446-you-do.js`; the current We Do skill stylesheet is `assets/j277/we-do-skills.css`. The actual loaded implementation is authoritative: these names describe the existing repository, not a request to reorganise files. Older README examples describing manual 3/2/1 grouping must not be used to override the current approved adaptive You Do implementation.

### 4. Single source of truth for content

For H446 Do Now, inspect these existing sources and the corresponding runtime loaders before editing a question:

- `data/do-now/q1-published/h446.json` — previous-lesson true/false.
- `data/do-now/q2-published/h446.json` — earlier-learning MCQ, four options, correct index and source lesson.
- `data/do-now/h446-q34-sources.json` — Q3/Q4 taught-source references and any reviewed replacement prompts/answers.

Do not add a second list of MCQ options or other generated controls to the lesson HTML. Follow the known-good authored fallback markup contract; the shared renderer must produce exactly one set of choices. Keep authored fallback text, answer reveal, central bank and taught-source reference consistent, including after runtime replacement. For other courses inspect their own equivalent sources rather than assuming H446 paths apply.

When a lesson is repurposed, synchronise the applicable hub titles/specification mapping, relevant exam/skill metadata, Catch-Up page/configuration and affected downstream retrieval references. Do not leave an old print/catch-up link presented as current; if a replacement has not been generated, mark the outdated resource superseded in the catalogue while preserving its historical file. Check approvals and do not publish draft questions as approved.

### 5. Required checks before commit and publication

- Review the diff against the agreed scope. A content-only change must not modify shared CSS/JS, add local styling/behaviour or touch unrelated lessons, except specifically identified dependent content records.
- Verify the eight phases, shared asset references, valid HTML/JSON, matching prompts and answers, correct marks, retrieval sources, all skill/diagram links and curriculum/Catch-Up consistency. Confirm no duplicate generated controls or authored fallbacks, and no premature answer exposure.
- Verify actual browser rendering at classroom-projector and narrow/mobile widths for each affected phase, including forward/back navigation, reveal states, readable diagrams/code and no avoidable scrolling. A source check is not a browser test. If rendering is unavailable, explicitly say so and do not claim visual approval or a fully verified rollout.
- Keep content edits small and reversible. Report exactly what changed, which shared components were left untouched, the GitHub commit, checks actually run and remaining limitations. Do not claim deployment or successful visual testing solely from a commit.
- If any of these checks reveal a conflict, fix the affected content or request approval for a separate shared-phase change; never patch global styling to hide a defect confined to one lesson.

This guidance is mandatory for new and edited lessons. Existing legacy code is migrated phase by phase only under a separately agreed scope.

## J277 You Do — mandatory preflight

**Before modifying any J277 You Do UI, question content, answer text, diagram, loader, CSS, or JavaScript:**

1. Read `docs/j277-youdo-mapping-workflow.md`.
2. Read the applicable records in `data/exam-questions/j277-youdo-lesson-map.json`.
3. Fetch the referenced `rhs_question_id` rows from `data/exam-questions/j277-rhs-practice-drafts.csv` and inspect any matching existing SVGs.
4. Respect the mapping's status and `published_bank_override_enabled` flag. Do **not** publish proposed questions as approved.
5. Preserve the classroom contract: Code First → **repeat the Code First question and starter code with its answer below** → **four exam questions together on one screen** → **answer 1, answer 2, answer 3 and answer 4 on separate full screens**.
6. Change only You Do. Protect all other seven phases, H446 and Cloudflare. Verify real browser rendering before claiming success.

No unrecorded question choices or implicit SVG reuse. If the mapping is incomplete, update the mapping as a proposal and leave the live lesson content untouched until the relevant approvals.
