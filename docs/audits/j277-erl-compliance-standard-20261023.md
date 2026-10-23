# J277 Learning Hub — OCR ERL audit standard

Established 23 October 2026. Applies to **J277 only**. H446 is outside scope.

## Rule
All J277 instructional programming examples and model solutions in I Do, We Do, You Do, Code First, revision materials and marking guidance use **OCR Exam Reference Language (ERL)** as set out in OCR J277 specification version 3.1, Section 3c. Do not introduce C# or Python teaching-code examples into J277 pages. References to a Python-like function such as `int(input(...))` are acceptable **only if confirmed in OCR's actual ERL specification**; assess syntax against the published specification, never visual similarity alone.

Official specification: https://www.ocr.org.uk/images/558027-specification-gcse-computer-science-j277.pdf
OCR clarification: https://support.ocr.org.uk/hc/en-gb/articles/30600830976786-Cambridge-OCR-exam-reference-language-ERL

## Two separate gates
1. **ERL compliance:** syntax, constructs, inputs/outputs, operator spelling, indexing, delimiters, data types, notation, indentation/readability; check all lesson phases and revision.
2. **Mark-scheme accuracy:** distinct marking points, total equal to available marks, appropriate scenarios, accepted equivalent correct OCR ERL solutions. OCR examinations may allow high-level languages where specified, even though this learning hub deliberately standardises teaching examples on ERL.

## Register fields
Lesson number; phase; source path; code location; OCR ERL construct; verified/issue/needs human review; evidence; suggested correction; content approved; live desktop QA; live mobile QA; date/commit.

## Stage 1: 052–060
The 27 question-bank items have been inspected for structure and marking, but **syntax conformity has not yet been certified**. Re-check every model against the official Section 3c examples. Flag `endif`, `next i`, `int(input())`, `array pupils[2,2]`, compound Boolean conditions and any other token not matching OCR's stated notation. These are **check targets, not confirmed faults**.

## Rollout
Complete 052–060 syntax and browser checks; then 061–070; then all remaining J277 lessons and associated revision materials. Do not alter H446 or common CSS/JS as part of an ERL syntax correction.
