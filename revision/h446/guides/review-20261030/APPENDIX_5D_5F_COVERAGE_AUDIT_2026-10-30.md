# OCR H446 Paper 1 — Appendices 5d and 5f coverage audit

**Date:** 30 October 2026  
**Audited candidate:** `H446_Paper1_Review_342_pages_Visual_Bridges_v3.pdf` (342-page teacher-review PDF)  
**Scope:** Only the candidate PDF, **not** the live interactive lessons or the current 264-page student guide.  
**Decision:** **HOLD** — substantive gaps remain before this candidate can replace the student guide.

## Sources and interpretation

- OCR H446 specification, section **1.3.2(d)**: “SQL — Interpret and modify. See appendix 5d.”
- Section **1.3.4(a)**: “HTML, CSS and JavaScript. See appendix 5d.”
- Section **1.4.3(a,d)**: Boolean logic and truth tables — see appendix 5d.
- Section **1.3.2(a)**: ER diagrams — see appendix 5f.
- Appendix 5d of the **2026 version 3.0** text consulted alongside OCR's official indexed 2024 version 2.7. The referenced appendices cover the same core topic lists checked here. The 2026 version's summary states branding and NEA AI-guidance changes; this report does not assume a content change to the examined appendix topics.
- OCR's rule: **other** HTML tags, CSS properties and SQL structures will be introduced/explained in the exam question; this does **not** remove the need to teach those specifically listed.

References:
- https://www.ocr.org.uk/Images/170844-specification-accredited-a-level-gce-computer-science-h446.pdf
- https://www.ocr.org.uk/qualifications/as-a-level-gce/computer-science-h046-h446-from-2015/
- Text-accessible 2026 edition: https://www.scribd.com/document/1066564769/170844-Specification-Accredited-a-Level-Gce-Computer-Science-h446

## 1. SQL — **PARTIAL; several examinable omissions**

**Existing pages:** 126–133; additional general SQL references on pp 122–125 and 335–336.

| Specific appendix 5d item | Evidence / missing material | Status |
|---|---|---|
| SELECT, FROM, WHERE | Worked SELECT with filter and table names, pp 126–129 | Covered |
| JOIN (INNER JOIN only is required) | Two-table key matching, pp 126–129 | Covered |
| SELECT including **nested SELECTs** | No nested SELECT worked or practice example anywhere in candidate | **Missing** |
| LIKE | No SQL LIKE predicate example | **Missing** |
| Wildcards `*` and `%` | No explicit `SELECT *` and `LIKE 'A%'` contrast or practice | **Missing** |
| AND / OR in SQL conditions | AND appears in a compound-key UPDATE at p 133; no deliberate AND/OR SQL filter comparison | **Weak** |
| INSERT | `INSERT INTO` shown p 131 | Covered |
| DELETE | `DELETE FROM` shown p 131 | Covered |
| DROP | Only mentioned in a recall question p 336; no demonstrated `DROP TABLE` | **Missing** |
| Differentiating DELETE vs DROP | Asked as unsupported recall, p 336; dedicated demonstration missing | **Weak** |

**Above appendix minimum, already present:** UPDATE and ORDER BY (pp 126–133). Useful for general understanding, but they must **not** displace the explicitly required operators. Interpret/modify tasks should appear, not only write-from-scratch tasks.

**Required patch:** 2–3 focused four-page cycles covering nested SELECT; LIKE/wildcards/AND/OR; INSERT/DELETE/DROP and interpretation of existing SQL. Use examples with a small stated schema and **separate mark points**.

## 2. HTML — **INSUFFICIENT**

**Existing pages:** 162–165.

OCR specifies awareness of: `html`, `link` (CSS), `head`, `title`, `body`, `h1`/`h2`/`h3`, `img` with **src/alt/height/width**, `a` with **href**, `div`, `form`, `input` text with **name**, `input` submit, `p`, `li`, `ol`, `ul`, `script`.

The candidate has meaningful markup examples only for `<p id="msg">`, `<button id="go">`, and a paragraph `id="score"` (pp 163–165). **The required tag/attribute set is not systematically shown, traced or practised.** Note `button` is fine to demonstrate but is **not** one of the appendix's explicitly listed tags.

**Required patch:** whole-page annotated HTML document; label each required tag/attribute; show a form with `input type="text" name="..."`, a submit input, list, image with alt and sizes, link, headings, and an external stylesheet link. Add errors-to-fix and output-prediction exam questions.

## 3. CSS — **INSUFFICIENT**

**Existing pages:** 162–165.

The candidate includes `#msg { color: navy; }` and `#score { color: blue; }`: only an ID selector and basic colour.

OCR expects:
- Inline `style` attribute and **external stylesheet** linked from HTML;
- Element selectors, **class** selectors (`.`), and **ID** selectors (`#`);
- `background-color`, `border-color`, `border-style`, `border-width`, `color` (named and hex), `font-family`, `font-size`, `height`, `width`.

No `style=`, `font-family`, `background-color` or border-property examples occur in the candidate's extracted text.

**Required patch:** annotated side-by-side inline/class/ID/element examples, external stylesheet link, required-property reference table, and short rendered-result interpretation tasks.

## 4. JavaScript — **PARTIAL**

**Existing pages:** 162–165, 170–173.

A button click updating `document.getElementById(...).textContent` is modelled well on p 163, and pp 170–173 distinguish client and server validation.

Appendix 5d also expects learners to **follow and write basic JavaScript** using the main programming structures (variables, decisions, loops, subroutines), take data from a form, and understand output via **HTML-element changes, document.write, or alert**. It explicitly says **exact syntax need not be memorised** and students are not expected to use JavaScript for OOP or file handling.

The candidate has **no worked JavaScript loop or selection trace, no form-input reading example, and no alert/document.write example** in its extracted text.

**Required patch:** a complete accessible input → IF/ELSE → update/output program with a short trace table, plus a separate loop-tracing example. Keep focus on interpreting code and results; don't turn this into a browser-API memorisation test.

## 5. Boolean notation in 5d — **MOST CONCEPTS PRESENT; OCR SYMBOLS WEAK**

**Existing pages:** 240–259 (AND/OR/NOT, XOR, laws, K-maps and truth-table exercises), pp 260–271 (adders and sequential logic).

Teach an explicit notation key for OCR's **∧, ∨, ¬, XOR/⊕ and equivalence ≡/↔**, alongside accepted word/symbol alternatives. The candidate uses mainly English AND/OR/NOT and the word XOR; `⊕`, `≡` and `↔` do **not** appear in extracted text. Ensure learners can *interpret* OCR notation as well as write words. A few concise model questions would address this without a full replacement chapter.

## 6. Little Man Computer reference in 5d — **GOOD BASIC START; needs branching practice**

**Existing pages:** 84–87.

The candidate names **LDA, STA, ADD, SUB, INP, OUT, BRA, BRZ, BRP, HLT and DAT** and works a straight-line ACC/memory trace. It clearly distinguishes generic addressing-mode examples from OCR LMC syntax.

What remains: an **actual BRZ/BRP branch trace**, a compact OCR mnemonics sheet and an exam-style program-follow/modify task. The appendix permits certain alternative mnemonics; the main OCR left-column forms should remain the default.

## 7. Entity-relationship diagrams, appendix 5f — **PARTIAL**

**Existing pages:** 114–117.

The candidate explains primary/foreign keys and 1:M/M:M relationships, including an associative table. However, the **actual OCR diagram relationship symbols** for **1:1, 1:M, M:M** are not explicitly presented and decoded.

**Required patch:** a three-diagram visual reference using OCR-style entity/cardinality symbols, with one conversion from a many-to-many relationship to a link entity and a correctly annotated answer.

## 8. Other items in 5d / scope notes

- Appendix 5d also contains **pseudocode**, arrays, subroutines and object notation. For Paper 1, 1.2.4 OOP is described on pp 88–91, but the candidate should also show OCR-style `class`, `new`, `inherits` and `super` in one short interpreted example. Comprehensive pseudocode syntax and subroutine pass-by-value/reference checks are especially important for **Paper 2**, and should be audited there too.
- Appendix 5e lists **NEA languages**; it is not a separate Paper 1 revision chapter.
- Appendix 5c lists mathematical expectations and is worth a *separate* cross-paper audit.

## Recommended sequence (no live site edits)

1. **Priority 1:** SQL appendix-complete worked examples and exercises.
2. **Priority 2:** HTML/CSS appendix-complete illustrated reference + output/fix tasks.
3. **Priority 3:** JavaScript programming/tracing.
4. **Priority 4:** Appendix 5f OCR-style ERD symbols; Boolean notation legend.
5. **Priority 5:** LMC branching and OCR-style OOP reference, then full spec-to-page traceability.
6. Retest question/answer separation, all PDF navigation links/bookmarks, page layouts, and quiz mappings.

**The candidate PDF has not been edited in this audit.** No student-facing site, lessons, or current guide links have been changed.
