# J277 PDF revision guides — content and structure audit

**27 October 2026 · Source inspection only.** Neither published PDF, the J277 revision quizzes nor their feedback mappings has been edited.

## Agreed student-facing standard

Within each specification topic: **Theory → Key Terminology → Worked Examples → Exam Practice → Answers & Mark Scheme**. Use the yellow lesson-style highlighter directly behind selected key terms. Keep question pages separate from their answers.

## Findings

| Check | Paper 1 · Computer Systems | Paper 2 · Algorithms and Programming |
|---|---|---|
| Published PDF pages | 94 | 97 |
| Existing broad-topic keyword tables | 6 (PDF pp. 5, 15, 37, 49, 54, 63) | 5 (pp. 3, 20, 44, 55, 59) |
| Specification points indexed in quiz feedback | 15 | 11 |
| Individual mapped quiz skills | 33 | 28 |
| Questions and answers | 16 exam-question pages explicitly contain a **Model answer** column | Exam questions regularly share the page with answer text and tips, even though the column is not consistently labelled |
| Consistent Worked Example sections | Not yet; examples and worked methods exist | Not yet; worked tracing and code examples exist |
| Separate practice and answers | Partly: two longer practice papers have answer sections at the end | Partly: longer exam papers have answer sections at the end |

**Priority 1 — Stop answer leakage.** In Paper 1, the question/answer mix is directly visible on PDF pp. 10, 12, 14, 19, 21, 27, 33, 36, 43, 48, 51, 53, 59, 61, 67 and 69. Paper 2 examples include pp. 5, 12, 18 and 25. Question-only practice should precede separate worked solutions and mark schemes.

**Priority 2 — Terminology by specification point.** The existing eleven glossary tables cover broad topics, but 26 distinct sub-specification points are indexed by the 61 J277 quiz skills. Keep useful definitions, provide succinct topic-specific terminology, and avoid duplicate lists on every page.

**Priority 3 — Presentation consistency.** Label theory and worked methods consistently; remove teacher-facing framing. Paper 1 uses 'Teacher Tip' on pp. 18 and 23; Paper 2 includes a teacher attribution and a classroom-style reminder on pp. 24 and 40. Retain genuine misconceptions and independent-practice advice, expressed directly to students.

**Priority 4 — Accuracy and exam relevance.** Paper 1 p. 15 currently defines **Bit Depth** as 'The range of sounds recorded'. Correct to 'The number of bits used to represent each sound sample; this determines the number of available amplitude levels.' Review technical precision in other vocabulary definitions before republication.

**Priority 5 — Scope and navigation.** Paper 1 pp. 82–93 include a separate 'Exam Paper 2' question/answer set. This may be useful synoptic practice, but should be explicitly labelled so students do not mistake it for the main Paper 1 specification.

## Existing feedback destinations — preserve these stable skill IDs

Any pagination changes require updating the PDF destination for each existing skill ID in revision/j277/guides/skill-index.json and regenerating guide-links.js. Keep every existing skill ID, score, threshold, lesson link, and stored result intact.

### Paper 1: 15 specification points, 33 skills

| OCR specification | Existing mapped PDF page(s) | Skills |
|---|---|---:|
| 1.1.1 | 6, 7, 8 | 3 |
| 1.1.2 | 11 | 1 |
| 1.1.3 | 13 | 1 |
| 1.2.1 | 16, 18 | 2 |
| 1.2.2 | 20 | 1 |
| 1.2.3 | 22 | 1 |
| 1.2.4 | 24, 25, 28, 29, 30, 32, 33 | 7 |
| 1.2.5 | 35 | 1 |
| 1.3.1 | 38, 39, 40, 42 | 4 |
| 1.3.2 | 41, 45, 46 | 3 |
| 1.4.1 | 50 | 2 |
| 1.4.2 | 52 | 1 |
| 1.5.1 | 55, 56 | 2 |
| 1.5.2 | 60 | 1 |
| 1.6.1 | 64, 69 | 3 |

### Paper 2: 11 specification points, 28 skills

| OCR specification | Existing mapped PDF page(s) | Skills |
|---|---|---:|
| 2.1.1 | 4 | 2 |
| 2.1.2 | 7, 10 | 2 |
| 2.1.3 | 14, 15, 16 | 5 |
| 2.2.1 | 22, 23, 24 | 4 |
| 2.2.2 | 27 | 1 |
| 2.2.3 | 31, 32, 33, 35, 36, 39, 40 | 7 |
| 2.3.1 | 45 | 1 |
| 2.3.2 | 50, 51 | 2 |
| 2.4.1 | 56, 57 | 2 |
| 2.5.1 | 60 | 1 |
| 2.5.2 | 63 | 1 |

## Implementation sequence

1. Preserve both original published PDFs and the current skill-index as rollback sources.
2. Rebuild **Paper 1 / 1.1.1 CPU architecture** as the reference layout, preserving the existing explanation, diagrams and questions.
3. Apply a shared editorial style to the remaining J277 topics, including corrected terminology, question-only practice and separate answers.
4. Regenerate PDF page destinations and the 61-skill resolver *as a coordinated release*; do not assume page numbers remain stable when new pages are inserted.
5. Verify text and figures at classroom-TV size and mobile portrait, printable answer space, every mapped PDF fragment, and the full shared 894-check J277/H446 student-journey regression.

**Important scope note:** This audit is based on extracted content and representative visual page inspection, not a line-by-line validation of every model answer. The published J277 PDFs remain unchanged pending a safe source-based reorganisation.
