# J277 Paper 2 — V2 release candidate (not live)

The original 97-page Paper 2 source has been audited. Its last page is blank. The V2 review editions retain 96 source reference pages (including original diagrams, questions and worked examples), replace the blank last page with student instructions, and add 28 independent skill pages plus 28 separate answer pages. Total: **153 pages**.

## Content corrections and QA
- Corrected original glossary's algorithmic thinking definition (was an incorrect duplicate of decomposition) and repeated SQL operator explanation.
- 28 unique Paper 2 skill IDs each mapped to a new student practice page and separate self-marking page. No live page destinations changed.
- Both PDFs contain 153 pages, 72 bookmarks and 39 existing internal links. Every new student question and model answer is present.
- The printer PDF is converted to monochrome while preserving selectable text and in-PDF navigation. Black-and-white page samples rendered.
- Original reference pages with answers next to examples remain available as **worked models**; new independent practice and mark schemes are in separate sections.

## Files built for review (not yet committed into repository)
- Colour: `J277_Paper_2_Revision_Guide_V2_COLOUR_REVIEW.pdf` (9,419,997 bytes; sha256 `1fc2b8957cadb7c4c0533588de5069d5759b54e2580d3a8551781818e6eafa5f`)
- Print: `J277_Paper_2_Revision_Guide_V2_PRINT_REVIEW.pdf` (18,871,884 bytes; sha256 `e19dd14cf411d5ae97b1867ad068a146170e7c837cd2362d3e4ee59836b90713`)

## Blocking publication tasks
1. Transfer the **exact** PDF files above into `revision/j277/guides/` through a binary upload-capable GitHub channel. Do not publish just the mapping or just the PDF.
2. Review model answers and legacy reference worked examples with OCR J277 specification, including coding conventions. Verify phone reading and printer sample.
3. In a **single release**, change Paper 2 `guides['2']` in `skill-index.json` (153 pages, new edition), remap exactly the 28 Paper 2 skill IDs using `candidate-page-map.json`, regenerate the embedded `guide-links.js` source, and update two Paper 2 hub links. Paper 1 and existing lessons stay unchanged.
4. Test all 28 live `#page=N` targets, and J277/H446 mobile/TV revision flows.

Status **not published**. This branch is safe for review and must not be merged as if it contained the finished PDF.
