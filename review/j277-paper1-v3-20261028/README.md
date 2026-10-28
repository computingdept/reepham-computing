# J277 Paper 1 — V3 review only (not live)

This is a **separate review branch**. It does **not** change the public Learning Hub, the current 94-page Paper 1 guide, the 97-page Paper 2 guide, or the 61 MCQ feedback mappings.

## Upload three files here

Open the `incoming/` folder in **this branch**. Choose **Add file → Upload files**, and upload these three files together:

1. `J277_Paper_1_DIGITAL_STUDENT_REVIEW_V3_UNPUBLISHED.pdf.part01` — 16.0 MB
2. `J277_Paper_1_DIGITAL_STUDENT_REVIEW_V3_UNPUBLISHED.pdf.part02` — 14.8 MB
3. `J277_Paper_1_PRINT_STUDENT_REVIEW_V3_UNPUBLISHED.pdf` — 18.5 MB

The digital source is split **without recompression** because GitHub's web upload limit is 25 MB per file. All three upload files are under that limit.

Do not rename the parts; **commit to this review branch, not `main`**.

## What happens automatically

The review-only GitHub Actions workflow verifies every source file's **size and SHA-256**, rejoins the two digital parts into the **byte-for-byte original 291-page V3 digital PDF**, and confirms:

- 291 pages in both editions
- 103 bookmarks, 20 PDF navigation links, identical selectable text
- all 33 proposed Paper 1 MCQ destinations point to populated candidate pages
- the current live 61-skill index is still unchanged

Once checks pass, the workflow places the two full PDFs and a JSON verification report into `verified/` **on this review branch only**. It removes the temporary upload parts. If a file is missing or has the wrong checksum, it does not publish the PDFs.

The proposal for the **33 future** PDF page destinations is tracked in `revision/j277/guides/candidate-paper1-page-map-20261028.json`.

## Still blocked before a live release

Full technical/mark-scheme sign-off, an actual mobile loading test, and a representative physical black-and-white print review.

**Never merge this branch directly into `main`**. A later controlled release must coordinate the final PDF, all 33 changed Paper 1 page destinations, the generated link resolver, and the complete mobile/TV student-journey regression.
