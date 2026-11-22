# J277 original lesson fallback review — 071–080

**Draft; not student-facing.** Original lesson `e` question-and-answer pair references only. No marking or visual sign-off implied.

## 071 — Subprograms and Arrays

### Slot 1 · e[0]

**Original question:**

> The function firstValue(values) returns values[0]. State its output when passed [9,3,8] and explain the index. [2 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Returns 9 [1]; index 0 is the first element [1].

*Teacher marking and visual QA pending.*

### Slot 2 · e[1]

**Original question:**

> A function totalTwo(values) returns values[0] + values[1]. Called with [4,7], explain the parameter, calculation and return. [4 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> The array [4,7] is passed to values [1]; elements at indexes 0 and 1 are read [1]; the function calculates 11 [1] and returns it to the caller [1].

*Teacher marking and visual QA pending.*

### Slot 3 · e[2]

**Original question:**

> A function adds values[0] and values[1]. Give outputs for [3,5] and [0,0]; identify the problem with [9] and a safe correction. [6 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> [3,5] returns 8 [1]; [0,0] returns 0 [1]; [9] has no element at index 1 [1], so an invalid array access would occur [1]; check length before accessing [1] and either reject input or define safe handling [1].

*Teacher marking and visual QA pending.*

Remaining source-supported gaps: 1.

## 072 — File Handling

### Slot 3 · e[0]

**Original question:**

> State TWO relevant ideas or operations from this topic. [2 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Open file [1]; Read line [1].

*Teacher marking and visual QA pending.*

### Slot 4 · e[1]

**Original question:**

> Explain read line and write line in a sport-result text file. [4 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Read line [1]; handle.readLine() obtains the next line of text from an opened file. [1]. Write line [1]; handle.writeLine(text) adds a line to an opened file. [1].

*Teacher marking and visual QA pending.*

Remaining source-supported gaps: 0.

## 074 — Random Number Generation

### Slot 1 · e[0]

**Original question:**

> State TWO relevant ideas or operations from this topic. [2 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Random numbers [1]; Integer range [1].

*Teacher marking and visual QA pending.*

### Slot 2 · e[1]

**Original question:**

> Explain integer range and unpredictability in a virtual spinner. [4 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Integer range [1]; random(1,6) can return any whole number from 1 to 6. [1]. Unpredictability [1]; Successive random calls can produce different values; outputs are not fixed. [1].

*Teacher marking and visual QA pending.*

### Slot 3 · e[2]

**Original question:**

> A programmer makes a sports draw. Explain the roles of random numbers, unpredictability and simulation. [6 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Random numbers [1]; random(low,high) produces a value inside the inclusive range. [1]. Unpredictability [1]; Successive random calls can produce different values; outputs are not fixed. [1]. Simulation [1]; Random values can model dice, cards or game events without physical devices. [1].

*Teacher marking and visual QA pending.*

Remaining source-supported gaps: 1.

## 075 — Validation and Authentication

### Slot 1 · e[0]

**Original question:**

> State TWO concepts relevant to this topic. [2 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Validation [1]; Authentication [1].

*Teacher marking and visual QA pending.*

### Slot 2 · e[1]

**Original question:**

> Explain how range check and authentication help in a school trip form. [4 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Range check [1]; Tests whether a numeric value is between minimum and maximum limits. [1]. Authentication [1]; Checks identity, for example using username and password, rather than checking input format. [1].

*Teacher marking and visual QA pending.*

### Slot 3 · e[2]

**Original question:**

> Explain the roles of validation, authentication and re-prompt in a café membership. [6 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Validation [1]; Checks input against specified rules, rejecting values outside the allowed range. [1]. Authentication [1]; Checks identity, for example using username and password, rather than checking input format. [1]. Re-prompt [1]; A valid design asks again when input does not meet a validation rule. [1].

*Teacher marking and visual QA pending.*

Remaining source-supported gaps: 1.

## 076 — Defensive Design and Maintainability

### Slot 3 · e[0]

**Original question:**

> State TWO concepts relevant to this topic. [2 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Meaningful naming [1]; Comments [1].

*Teacher marking and visual QA pending.*

### Slot 4 · e[1]

**Original question:**

> Explain how indentation and comments help in a travel app. [4 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Indentation [1]; Consistent indentation reveals which instructions belong in a block. [1]. Comments [1]; Explain important intent, rather than repeating obvious syntax line by line. [1].

*Teacher marking and visual QA pending.*

Remaining source-supported gaps: 0.

## 080 — Trace Tables and Algorithm Refinement

### Slot 1 · e[0]

**Original question:**

> State TWO concepts relevant to this topic. [2 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Trace table [1]; Expected output [1].

*Teacher marking and visual QA pending.*

### Slot 2 · e[1]

**Original question:**

> Explain how accumulator and expected output help in a sports count. [4 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Accumulator [1]; A variable updated repeatedly to store a running total. [1]. Expected output [1]; The result that should occur according to the problem requirements. [1].

*Teacher marking and visual QA pending.*

### Slot 3 · e[2]

**Original question:**

> Explain the roles of trace table, expected output and refinement in a fundraising sum. [6 marks]
> 
> Source: Original OCR J277-style teaching question; not an official past paper.

**Original answer:**

> Trace table [1]; Manually records changes to variables and printed outputs as code executes. [1]. Expected output [1]; The result that should occur according to the problem requirements. [1]. Refinement [1]; Use discrepancies in the trace to revise instructions and retest. [1].

*Teacher marking and visual QA pending.*

Remaining source-supported gaps: 1.
