# Year 13 H446 — Lesson 223 first exam-artwork integration preview

**QA-ONLY DRAFT; do not merge/publish without teacher review.**

The intended teacher-only opt-in is `/lessons/h446/lesson-223/index.html?h446-y13-preview=1#you-do` **on this draft branch when served in a preview environment**. A normal live URL without the parameter has no added cards. The branch is not yet deployed to rhsccs.org: that public URL currently cannot display this draft.

- Existing Year 13 Lesson 223 Foundation/Core/Stretch You Do questions remain intact and first.
- Only when `h446-y13-preview=1` is present, **two new source-aligned exam questions are appended after the originals**: `H446-2025-JUN-02-Q8BI` (getNextNode accessor, 2 marks) and `H446-2025-JUN-02-Q8E` (safe list deletion, 5 marks).
- Both stems, original RHS authorship, source IDs, marks, draft answer points and marking rules are taken from the original 2025 H446/02 RHS Paper 2 review bank. No new questions are fabricated.
- Their question and answer images are copied from existing draft source branches #170 and #167. The 2025 Q8(e) diagram's 10→25→39 nodes are **illustrative** and do not replace the general deletion algorithm that must be assessed.
- Existing shared H446 phase engine, Do Now, Objectives, New Learning, I Do, We Do, Vocabulary, Exit Ticket, student logins and Cloudflare scoring are untouched. No changes to J277.
- The addition uses an inert `<template>` plus a query-gated script that inserts into `#you-do .youdo-questions` **before** the existing shared lesson runtime initializes. Normal lesson HTML shows no added questions.
- During opt-in teacher preview, one complete question is shown per page. Answers remain hidden until the lesson's existing self-marking progression. A question-side illustration is hidden during the answer view, which instead uses its answer-side diagram.
- These original RHS teaching SVGs are drafts, not copied OCR images, nor approved student exam materials.

**Quality gates before production:** check pixel and half-screen classroom render at 1920×1080 and mobile, confirm the HTML source question/answer against bank and OCR mark scheme alternatives, verify navigation through existing three + two added questions and five answer reveals, and obtain teacher sign-off. Do not merge this PR as classroom-ready.
