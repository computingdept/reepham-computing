# J277 Paper 1 V3 — final release-readiness audit

**Date:** 28 October 2026  
**Candidate:** two V3 PDFs, 291 pages each, review branch only.  
**Disposition: NOT APPROVED FOR STUDENT PUBLICATION.**

## Passed checks

- Exact hashes, full PDF reconstruction, 291/291 page parity, 103 bookmarks and 20 navigational links.
- **33/33 proposed Paper 1 MCQ page destinations:** correct OCR specification and populated theory or worked-example page; the other 28 live Paper 2 skill IDs are unchanged.
- **16/16 topic segments:** question-only practice precedes separate mark-scheme pages.
- Every page in the printer edition scanned for grayscale and dark-ink coverage; average page area below RGB 200 is approximately 6.55%. Highest nonwhite coverage is approximately 65%, mostly pale-grey panel backgrounds.
- No page text extends outside its page geometry in the existing whole-document structural scan.
- No evidence of lost source illustrations in the V3 assembly.
- The correct live Paper 1 is still 94 pages and Paper 2 is 97 pages; live 61-skill feedback index is unchanged.

## Newly confirmed editorial issues

The automated targeted source-facing language scan found **at least eight unambiguous passages on eight pages**, including:

| PDF physical page | Issue |
|---:|---|
| 3 | Still says the booklet is an **unpublished review candidate**; mentions source heading `Exam Paper 2` despite updated synoptic heading |
| 59 | “Same artwork as the published J277 guide” |
| 90 | Says “original number-line picture on the preceding page” instead of student instructions |
| 92 | Talks about mistakes in the “original hex examples” |
| 93 | Describes a worked binary-addition method as “missing from the original” |
| 94 | Says “Preserving the source left/right shift illustration” |
| 127 | Calls the Internet diagram “these original pictures” |
| 129 | Heading “Star and mesh · original diagrams” |

A broader scan finds additional original/source-production language and question labels elsewhere; the eight flagged passages are **not an assertion that all editorial issues have been enumerated**. Safe remediation should be made at the source/topic level or with carefully tested PDF text edits, not indiscriminate redaction.

## Subject-accuracy risk

- PDF **p.33:** the original fridge/freezer illustration still contains an incorrect wash-cycle caption. Correct wording is adjacent, but a student could remember the image label.
- PDF **p.71–72:** original LEGO picture repeats “Gigabyte” and mislabels “Petabyte”; a corrected unit table is already adjacent.
- PDF **p.166:** the original security illustration repeats “SQL injection” and simplifies attack mechanisms; correction notes are adjacent.

The diagrams are protected teaching content and should be visibly corrected **without losing the original analogies**. Human subject review of every answer and mark allocation is **not yet certified** by automated checks. Use the current OCR J277 v3.1 specification and mark-scheme principles: <https://www.ocr.org.uk/images/558027-specification-gcse-computer-science-j277.pdf>.

## Mobile and physical-print status

- Initial Chromium-native iframe run: HTTP range delivery and viewport geometry passed, but **the native PDF appeared blank** in headless screenshot; this test cannot certify actual document rendering.
- A separate [PDF.js-rendering workflow passed on 28 October 2026](https://github.com/computingdept/reepham-computing/actions/runs/40669459096). It genuinely rendered **pages 6, 59, 129 and 234** at 390×844 (phone) and 1920×1080 (classroom) and confirmed 291-page source, visible ink and no surrounding horizontal overflow.
- **Mobile usability concern:** full-page fit-to-width at 390 px renders teaching text very small; learners must zoom and pan. The PDF is a supplemental reference and should not replace the responsive online lesson/accessible study experience. The test is browser emulation, **not a physical smartphone**, and does not certify download performance on a mobile connection.
- Greyscale page-wide check is complete, but a **physical printer check remains outstanding**. The nine-page black-and-white sample uses master pages 9, 33, 59, 72, 94, 129, 166, 234 and 254 and is attached in the ChatGPT conversation.

## Recommendation

1. Keep both V3 PDFs on the separate review branch; **do not publish them or merge this branch**.
2. Correct residual editorial instructions and misleading labels while retaining original source images/analogies, then generate V4 with the same pagination.
3. Fully verify technical model answers, worked examples and question marks against the OCR J277 specification.
4. Check the nine-page physical print sample and loading on an actual student phone; automated emulation can support but not replace this check.
5. Once the final approved PDF exists, release it **atomically** with all 33 remapped Paper 1 MCQ PDF pages, regenerated `guide-links.js`, and the hub's updated PDF edition. Run the complete J277/H446 mobile/TV student-journey regression and verify every published `#page=N` URL after deployment.

**Live site at end of this audit:** unchanged (94-page Paper 1, 97-page Paper 2, 61 existing MCQ mappings).
