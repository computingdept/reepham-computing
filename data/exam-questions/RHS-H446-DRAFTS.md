# RHS Computing — H446 practice-question drafting bank

**Started 21 November 2026.** This H446 bank deliberately mirrors the J277 RHS practice-question workflow without copying or changing the official OCR catalogue.

## Scope and current verified progress

- [RHS practice-draft CSV](h446-rhs-practice-drafts.csv): **410 records**, one per OCR H446 question part from **10 papers**, November 2021 and June 2022–2025, both H446/01 and H446/02.
- Original source IDs, paper, series, official numbered specification topic, maximum marks and mark-scheme links are preserved.
- **41/410** original RHS practice questions **written**, with source-text-linked answer points and marking rules: **all of June 2025 H446/01 Q1–Q8**.
- **369/410** are **awaiting original drafting and official source/answer checks**. Their RHS question and verified-answer fields are deliberately blank — **not** auto-generated from topic summaries.
- All 10 papers retain their **140-mark totals** (1,400 marks overall). Year totals: 2021 75 parts, 2022 92, 2023 84, 2024 81, 2025 78.
- The existing [canonical H446 question catalogue](h446-questions.csv), [SVG visual register](h446-visual-assets.csv) and [half-screen visual map](h446-question-view-map.csv) remain separate. The original source PDF is authoritative.
- **Nothing is released to students or deployed into lessons by this CSV.** Each record remains a draft until all checks are complete.

## Matching the J277 workflow

1. Catalogue original paper, question part, topic, marks and official OCR question/mark-scheme source.
2. Write **genuinely independent RHS scenario/questions** rather than copy OCR wording. Retain the specific assessed skills, command word demand and mark allocation; keep necessary numbers unchanged only when a source-dependent worked result requires them.
3. Inspect the **complete original OCR paper and mark scheme** for every part, including diagrams, datasets, shared stems, code, alternative answers and level descriptors. Do **not** infer an answer from an abbreviated question summary.
4. Enter **RHS-authored eligible answer points**, a precise marking rule and independently authored examiner insight where an identified examiner-report passage has actually been reviewed.
5. Make needed original SVG/HTML table/code/trace assets and link source-paper context. Question View is not an OCR diagram reproduction. An unrelated concept image cannot silently replace the original assessment figure.
6. Independently check question originality, technical accuracy, exact numerics, mark allocation, projector/mobile presentation, accessible diagrams and answer concealment.
7. Only then promote to classroom approval and enable use in the shared J277/H446 renderer, with teacher-controlled marking and answer reveal. Level-of-response questions require teacher review, not naive automatic marking.

## Field details

The H446 CSV intentionally uses the **same 24 headers** as `j277-rhs-practice-drafts.csv`, including `rhs_question_text`, `rhs_verified_answer_points`, `rhs_verified_marking_rule`, `rhs_examiner_insight`, `rhs_answer_verification_status`, `rhs_answer_source` and `rhs_answer_review_date`.

`mark_scheme_review_status` is **legacy metadata from the canonical catalogue**, not the current RHS progress indicator. Use `rhs_answer_verification_status` and `rhs_answer_review_date` for the new work. For the 41 drafted records the **OCR PDF question and scheme text** was compared, but independent **page-image/render checking remains outstanding**. OCR PDF screenshots could not be retrieved in the latest pass, so visual/table layout checking is an explicit blocker.

## Protection and release gates

- These RHS questions and teacher answer notes are **not** official OCR text, diagrams, schemes or approved material. The public GitHub repository must not include OCR's protected paper artwork or verbatim scheme passages.
- A changed scenario alone does **not** guarantee independent authorship; retain final originality review.
- Do not treat a source-linked answer as a classroom-ready question. Missing source figures and tables remain blockers.
- Do not deploy H446 questions by mutating J277 lessons, shared site CSS/JS or Cloudflare. No lesson edits are part of this drafting stage.

See [the H446 answer-progress audit](RHS-H446-ANSWER-VERIFICATION.md) for paper-by-paper counts and remaining requirements.

## June 2025 H446/01 Q4–Q8: second authored batch

The next **20 question parts** have now been drafted, bringing June 2025 Paper 1 to **41/41** RHS question drafts and source-text-linked teacher marking guidance. These include new LMC, K-map, SQL, AI training, RLE, ERD and JavaScript scenarios. The original assessment demands and mark allocations were retained; the new SQL labels and dataset are intentionally RHS-authored rather than reproducing the OCR company's records.

**Source-layout gates:** 10 of these 20 new questions have original table, code, grid or SVG presentation dependencies; the source-paper PDF page screenshots were unavailable, so none can be marked as visual/context approved. Program accuracy, originality, classroom readability and teacher approval remain separate requirements. The original HTML/diagram/marking assets are not silently replaced by visually similar unrelated concept diagrams.
