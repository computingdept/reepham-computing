# Synergy Assist — central Listen service (November 2026)

## Architecture
- `/assets/synergy-voice.js` and `/assets/synergy-voice.css` implement a single reusable opt-in voice selector, speed controls, preview, and screen narration.
- `/assets/site-nav.js` loads this service on pages with the shared site-navigation loader: course hubs, classroom lessons, Catch Up, revision hubs/practice and other shared navigation pages.
- `/print-viewer.html` loads the same voice service but **does not mount a second floating Listen button**. Its original slim Tools menu shows Voice, Preview and existing Play/Pause/Stop controls.
- One local preference key `synergy-assist-voice-v1` stores voice URI and speed for this device only. The PDF viewer also preserves its other local reading preferences.
- The service prioritises on-device British English and then other on-device English voices, falling back to browser-provided English voices. Actual names depend on the browser and installed OS voices.
- It detects asynchronously loaded voices using `voiceschanged`. Voice preview reads short Computer Science terms.
- Some browser-provided online voices may process text with their provider. Those are explicitly labelled in the selector. No dedicated external TTS API, keys, or user account is used.

## Accessibility and pedagogy
- Speaking begins only on an explicit Play or Preview action. Changing tabs or lesson phases stops any ongoing speech.
- On classroom and Catch Up pages, Play reads the current *visible* main content, not course navigation or hidden model answers. If the student first selects a short text passage, Play reads that passage instead.
- Hidden elements, question feedback, and answer/mark-scheme containers are excluded. Newly revealed content may only be read after the learner/teacher chooses to reveal it.
- The icon is a small separate control so it does not replace or modify lesson navigation, answer state, quizzes, print or independent-learning logic.
- Original PDF printing remains unchanged. Other PDF files without source-bound HTML reading companions do not pretend to have accessible reflowing text.
- `Remember It` remains deferred, hidden and teacher-gated.

## Check before wider rollout
- Validate on Safari/macOS, Chrome/Windows and one mobile device; voices may differ, and browser speech-synthesis implementations are inconsistent.
- Compare the voice options, voice preview, Play/Pause/Stop, page navigation while speaking, and content revealed/hidden during lessons.
- Verify printed four-page J277 Lesson 001 booklet is unchanged.
- Confirm that high-stakes tasks and timed marking stay silent unless a learner explicitly chooses Listen.
