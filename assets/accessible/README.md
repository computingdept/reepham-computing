# Synergy Assist accessible PDF companion — pilot

## Scope
- One **optional** reflowing HTML companion for the published four-page J277 Lesson 001 PDF.
- The original PDF and Print action are unchanged.
- The original classroom lesson remains the teaching source; this reading companion is **not** a byte-for-byte or page-for-page PDF conversion.
- Only the PDF paths explicitly mapped in `catalogue.json` expose the Tools menu.
- Core viewer, shared stylesheet, preferences, speech control and focus behaviour work for future resource entries without duplication.

## Editing / adding a resource
1. Read and verify the actual lesson and the printable document. Confirm the independent Reading View contains the intended curriculum but does not silently invent questions or model answers.
2. Add a structured JSON file under `assets/accessible/` with `schema_version: 1`, source URL, objectives, sections, vocabulary and optional memory aids.
3. Add the *exact* published PDF pathname to `catalogue.json` and point it to the JSON file.
4. The UI creates DOM elements with `textContent`; **do not** insert arbitrary HTML, scripts or untrusted URLs.
5. Teacher-check mnemonic content, model answers and sequencing. Update `aid_policy.teacher_approved` only once reviewed. Set `aid_policy.memory_aids_enabled=false` to withhold aids while preserving reading accessibility.
6. Verify keyboard navigation, contrast, font and colour settings, TTS pause/resume, answer reveals, mobile layout and original PDF printing. Never change lesson questions or the PDF as part of visual accessibility updates.

## Safety and behaviour
- No account data or student identifiers are collected or transmitted. Display preferences save only to browser-local storage, if allowed.
- No speech recording or cloud speech services are added. Browser-provided speech synthesis may depend on platform capabilities and voice availability.
- Vocabulary and memory aids are **opt-in** and the latter remain marked as drafts until teacher approved.
- Question model answers are inside closed `details` elements, so they are not automatically read aloud before the user reveals them.
- This is an **editorial configuration**, not a secure teacher login/permission feature; student authentication would require a separately approved service.
- Original PDFs remain the print source. Text size, colours and spacing are applied to Reading View only.
