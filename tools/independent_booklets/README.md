# Independent booklet draft production · OCR J277 + H446

**Status: experimental, unapproved. Never merge or publish without teacher sign-off.**

This is a source-grounded batch renderer, not an automatic guarantee that every lesson
has a classroom-ready independent booklet. It complements (and does not replace)
the existing hand-reviewed J277 001–004 HTML booklets. It never changes the
original Teach lessons, live hubs, revision guides or shared classroom assets.

## Run it

From the repository root with Python 3.11:

    python -m pip install reportlab==4.2.5 beautifulsoup4==4.12.3 PyMuPDF==1.26.4
    python tools/independent_booklets/generate.py --smoke --out build/booklet-pilots --fail-on-errors
    python tools/independent_booklets/generate.py --course j277 --out build/booklet-j277
    python tools/independent_booklets/generate.py --course h446 --out build/booklet-h446

The branch-only GitHub Actions workflow runs the smoke tests, then builds
downloadable artifacts for each course. In the Actions run, open the **Artifacts**
section and download the unapproved J277 or H446 ZIP. Every ZIP contains
A4 PDFs, A3 booklet-imposed PDFs, SUMMARY.md, manifest.csv and manifest.json.
A3: print **landscape, duplex, flip on short edge, 100%**, then fold.
The renderer inserts blank pages where necessary to make an A3 booklet.

## Source precedence

J277 001–004: preserve and statically audit the existing independent.html
documents; do not overwrite these with a crude automatic conversion.

J277 005–018: the real lesson data in autumn1-004-008.json,
autumn1-009-013.json and autumn1-014-018.json.

J277 019–164: the real lesson data in autumn2-NNN.json.

J277 Do Now: donow-bank-20261020.json (four prior-learning questions
with existing model answers). Code First: code-first-master-20261021.json
where available, otherwise the source lesson's original k task. Other
models, guided examples, You Do questions and Exit Ticket come from the
corresponding lesson JSON. Revision-guide paths are recorded for teacher
cross-checking but are **not** auto-verified.

H446: extract from each actual lessons/h446/lesson-NNN/index.html,
including the separate Do Now answer panels, vocabulary, new-learning
stages, I Do, We Do, You Do, embedded You Do solutions and Exit Ticket.
When an answers.html file has exactly one answer stage per You Do question,
reuse it; otherwise flag it rather than pairing answers by guesswork.
H446 rich diagrams, animations and teacher-dependent coding tasks need
manual adaptation; a text-only draft is not an approved equivalent.

## Central formatting and SEND rules

The renderer is shared across both courses. Each lesson has four
**phase groups**, which can expand over more than four A4 pages rather
than shrinking text or reducing answer space:

1. Do Now: prior learning, four questions, black pen.
2. I Do + We Do: vocabulary, new knowledge, worked examples and guidance.
3. You Do + Exit Ticket: original practice questions before any solutions.
4. Review & Improve: answers in order, green-pen checking, copy the full
   original question, then write a fresh answer with working.

The two-pen routine appears on every page, and the five stage-and-purpose
tiles in the footer are consistent. Content is selectable text, not a
tagged/PDF-UA certified export. Black-and-white contrast is the default.
Experimental 14-point larger-print drafts can be generated with
--large-print, but they are not yet approved or advertised to pupils.

## Manifest and release gate

Each manifest record contains: lesson, course, original Teach route, title,
spec, source paths, status, missing model content, static failures,
warnings, visual count, page counts and PDF paths. Read SUMMARY.md before
reviewing the PDFs. A PDF existing is **not** a content pass.

Release requires a teacher to verify the model answers, source alignment,
OCR specification, diagram fidelity, Code First outputs, four retrieval
questions, paper layout at 100% A4/A3, accessible writing space, and the
independent/cover-teacher instructions. Keep every draft out of the live
student hub until approved.

The original central HTML standard remains at
docs/independent-learning-central-standard.md and the approved pilot
design at docs/independent-booklet-master-template.html. The generated
PDFs are a first-pass content extraction to speed the audit, not a
pixel-identical clone of the hand-designed Lesson 002.

## Known limitations

- Source SVGs and rich teaching diagrams are flagged but not embedded.
- Some H446 lessons contain teacher-dependent instructions; these are
  flagged for rewriting, not silently altered.
- Some H446 answer pages are teacher notes rather than a safe one-to-one
  answer key; these are not blindly mapped to student questions.
- Revision guides are referenced by path, not compared page by page.
- Larger-print and screen-reader tagging require separate validation.
- Page counts vary; the correct response to overflow is more pages,
  not tiny type.

This repository branch and its Actions artifacts are for staff review only.
