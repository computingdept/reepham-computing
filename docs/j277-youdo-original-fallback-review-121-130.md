# J277 original exam questions — Lessons 121–130

**Unpublished teacher review (22 November 2026).** Source-linked original `e[index]` questions and answers; approval, marking and visual checks remain pending. Lesson 121 assessment feedback remains excluded.

## 122 — Validation and Authentication

### Slot 1 — original e[0]

**Question:**

> Explain validation versus verification. [2 marks]

**Answer:**

> Validation checks a rule or format; verification checks data matches the original/source input.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> Give a suitable boundary value when valid ages are 13–18. [2 marks]

**Answer:**

> 13 or 18, plus an adjacent invalid such as 12 or 19 for a test set.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> State one difference between authentication and validation. [2 marks]

**Answer:**

> Authentication confirms an asserted identity; validation checks input against constraints.

*Teacher QA pending.*

**Unfilled:** 1.

## 123 — Defensive Design

### Slot 1 — original e[0]

**Question:**

> State two defensive programming techniques. [2 marks]

**Answer:**

> Input validation and restricted access or appropriate sanitisation; any two justified techniques.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> Explain why meaningful variable names aid maintainability. [2 marks]

**Answer:**

> They make purpose easier to understand and reduce debugging/maintenance effort.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> Explain why showing a user's actual password in an error message is unsafe. [2 marks]

**Answer:**

> It exposes a secret to observers and can enable unauthorised access.

*Teacher QA pending.*

**Unfilled:** 1.

## 124 — Testing and Test Data

### Slot 1 — original e[0]

**Question:**

> Identify two boundary tests for valid ages 13–18. [2 marks]

**Answer:**

> 13 and 18.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> Distinguish invalid and erroneous data for a numeric mark. [4 marks]

**Answer:**

> Invalid: numeric 101 outside 0–100; erroneous: text 'apple' where an integer is expected.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> State why expected outcomes belong in a test plan. [2 marks]

**Answer:**

> They allow actual results to be compared with requirements and faults detected.

*Teacher QA pending.*

**Unfilled:** 1.

## 125 — Debugging Syntax and Logic Errors

### Slot 1 — original e[0]

**Question:**

> Differentiate a syntax error from a logic error. [2 marks]

**Answer:**

> Syntax violates language rules; logic produces incorrect behaviour even if program runs.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> Identify the fault in if age >= 13 OR age <= 18 for acceptance age 13–18. [2 marks]

**Answer:**

> Use AND, not OR; OR incorrectly accepts values outside the range.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> Explain why testing after debugging is necessary. [2 marks]

**Answer:**

> To verify the correction and ensure no new faults were introduced.

*Teacher QA pending.*

**Unfilled:** 1.

## 126 — CPU Architecture and the Fetch-Execute Cycle

### Slot 1 — original e[0]

**Question:**

> State the purpose of MAR and MDR. [4 marks]

**Answer:**

> MAR: address of memory location accessed; MDR: data/instruction being transferred.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> What does the Program Counter hold? [1 mark]

**Answer:**

> Address of the next instruction to fetch.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> Explain the role of the Control Unit. [2 marks]

**Answer:**

> Coordinates CPU operations and controls execution of instructions.

*Teacher QA pending.*

**Unfilled:** 1.

## 127 — CPU Performance and Embedded Systems

### Slot 3 — original e[0]

**Question:**

> State two CPU factors affecting performance. [2 marks]

**Answer:**

> Clock speed, cache size, number of cores (any two).

*Teacher QA pending.*

### Slot 4 — original e[1]

**Question:**

> Explain why a larger cache may improve performance. [3 marks]

**Answer:**

> Frequently needed instructions/data can be accessed faster, reducing waiting for RAM.

*Teacher QA pending.*

**Unfilled:** 0.

## 128 — Programming: Arrays and Iteration Practice

### Slot 1 — original e[0]

**Question:**

> Give the output of summing [4,1,3]. [2 marks]

**Answer:**

> 8.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> Explain why index 4 is invalid for a four-element zero-indexed array. [2 marks]

**Answer:**

> Valid indexes are 0,1,2,3; index 4 is out of bounds.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> Explain how to count even values in an array. [3 marks]

**Answer:**

> Iterate each element; if value MOD 2 = 0 then increment counter; output counter.

*Teacher QA pending.*

**Unfilled:** 1.

## 129 — Programming: Subprograms and Parameters

### Slot 1 — original e[0]

**Question:**

> Explain one difference between a function and a procedure. [2 marks]

**Answer:**

> A function returns a value; a procedure performs statements without necessarily returning a value.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> State the role of parameters. [2 marks]

**Answer:**

> They pass input values into a subprogram.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> Give one benefit of modular programming. [2 marks]

**Answer:**

> Reduces duplication, simplifies testing or maintenance.

*Teacher QA pending.*

**Unfilled:** 1.

## 130 — Programming: Files, SQL and Strings

### Slot 1 — original e[0]

**Question:**

> Write SQL to display Name from Pupils for pupils whose Mark >= 70. [3 marks]

**Answer:**

> SELECT Name [1] FROM Pupils [1] WHERE Mark >= 70 [1]; Ada and Mia match.

*Teacher QA pending.*

### Slot 2 — original e[1]

**Question:**

> Complete a code condition so that names[i] is printed only when marks[i] < 50. State the result using the shared data. [3 marks]

**Answer:**

> IF marks[i] < 50 THEN [2 for correct condition/control] print(names[i]) [1]; prints Ben.

*Teacher QA pending.*

### Slot 3 — original e[2]

**Question:**

> Explain why comparing '72' directly with numeric 50 can be problematic when reading marks from a CSV text file. [3 marks]

**Answer:**

> readLine() supplies text [1]; '72' is a string, while 50 is numeric [1]; the field must be converted/validated before a numerical comparison [1].

*Teacher QA pending.*

**Unfilled:** 1.
