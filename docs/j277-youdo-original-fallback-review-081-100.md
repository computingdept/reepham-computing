# J277 You Do — existing question fallback review, Lessons 081–100

**Source-only unpublished review — 22 November 2026.** Original `e[index]` question/answer pairs are linked without rewriting or publishing. Original lesson marking and matching SVGs require teacher verification. Lessons 094 and 095 retain their separate assessment/review status.


## 081 — Syntax and Logic Errors

### Slot 1 — source e[0]

**Original question:**

> State the difference between a syntax error and a logic error. [2 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Syntax: invalid language grammar [1]; logic: program runs but produces incorrect results [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 2 — source e[1]

**Original question:**

> A fee calculator adds 5 to the number of tickets instead of multiplying by 5. With 3 tickets, identify the error and correct the calculation. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Adding gives 8 [1] but expected price is 15 [1]; use multiplication [1], giving 3*5=15 [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 3 — source e[2]

**Original question:**

> Explain how tracing and retesting can identify, fix and confirm both syntax and logic errors in a program. [6 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> A syntax error breaks language rules [1] and should be corrected according to diagnostic feedback [1]. Logic errors produce wrong results [1] and trace tables show the first incorrect value [1]. Repeat failed test after correction [1] and test another normal/boundary case to avoid regressions [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 1.

## 082 — Linear Search

### Slot 1 — source e[0]

**Original question:**

> State one advantage of linear search on an unsorted array. [2 marks]
> 
> Source: Original OCR J277-style question; not an official OCR past-paper original.

**Original marking answer:**

> It does not require sorted data [1], so it can search the current unsorted array without sorting it first [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 2 — source e[1]

**Original question:**

> A list is [6,3,8,1]. Trace linear search for 1, stating each comparison and index. [4 marks]
> 
> Source: Original OCR J277-style question; not an official OCR past-paper original.

**Original marking answer:**

> Compare 6 [1], then 3 [1], then 8 [1], then 1 at zero-based index 3 [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 3 — source e[2]

**Original question:**

> A shop has an unsorted array [5,9,2,7,3]. Explain the main steps of linear search for 7, compare successful and unsuccessful outcomes and describe how an index is reported. [6 marks]
> 
> Source: Original OCR J277-style question; not an official OCR past-paper original.

**Original marking answer:**

> Start at index 0 [1], compare 5 then 9 then 2 [1]; at index 3 value 7 matches [1]. Return index 3 [1]. If all entries were checked without a match [1], report not found, e.g. -1 [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 1.

## 083 — Binary Search

### Slot 4 — source e[0]

**Original question:**

> State the required property of an array before binary search can be used correctly. [1 mark]
> 
> Source: Original OCR J277-style question; not an official OCR past-paper original.

**Original marking answer:**

> Values must be in sorted order [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 084 — Bubble Sort

### Slot 2 — source e[0]

**Original question:**

> State when two adjacent numbers swap during an ascending bubble sort. [2 marks]
> 
> Source: Original OCR J277-style question; not an official OCR past-paper original.

**Original marking answer:**

> The left value is greater than the right value [1], so their positions are exchanged [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 3 — source e[1]

**Original question:**

> Complete one bubble-sort pass on [7,2,5]. State the two intermediate arrays. [4 marks]
> 
> Source: Original OCR J277-style question; not an official OCR past-paper original.

**Original marking answer:**

> 7 > 2 [1], swap [2,7,5] [1]; 7 > 5 [1], swap [2,5,7] [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[2]

**Original question:**

> Explain how bubble sort orders [4,3,1], showing the results after each necessary swap and pass. [6 marks]
> 
> Source: Original OCR J277-style question; not an official OCR past-paper original.

**Original marking answer:**

> Compare 4 and 3 [1], swap [3,4,1] [1]. Compare 4 and 1 [1], swap [3,1,4] [1]. Next pass compare 3 and 1 [1], swap [1,3,4], now sorted [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 085 — Insertion Sort

### Slot 1 — source e[0]

**Original question:**

> State what is meant by the key in insertion sort. [2 marks]
> 
> Source: Original OCR J277-style question; not an official past-paper original.

**Original marking answer:**

> The current unsorted element being inserted [1] into its correct place among the already-sorted elements [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 2 — source e[1]

**Original question:**

> Show insertion sort on [6,3,5] after each insertion. [4 marks]
> 
> Source: Original OCR J277-style question; not an official past-paper original.

**Original marking answer:**

> Initially 6 is sorted [1]. Shift 6 and insert 3 to produce [3,6,5] [1]. Shift 6 again [1] and insert 5 to get [3,5,6] [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 3 — source e[2]

**Original question:**

> Explain how insertion sort orders [7,2,5,1] by maintaining a sorted section and shifting values. [6 marks]
> 
> Source: Original OCR J277-style question; not an official past-paper original.

**Original marking answer:**

> Start with [7] as sorted [1]. Insert 2 before 7 → [2,7,5,1] [1]. Insert 5 before 7 → [2,5,7,1] [1]. For key 1 shift 7 then 5 then 2 right [2]. Insert 1 first → [1,2,5,7] [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 1.

## 086 — Merge Sort

### Slot 4 — source e[0]

**Original question:**

> State the key idea behind the divide step of merge sort. [2 marks]
> 
> Source: Original OCR J277-style question; not an official past-paper original.

**Original marking answer:**

> Split an array into smaller halves [1] until individual items/single-element lists remain [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 087 — Searching and Sorting Exam Practice

### Slot 1 — source e[0]

**Original question:**

> State the prerequisite for binary search. [1 mark]
> 
> Source: Original OCR J277-style question; not an official past-paper original.

**Original marking answer:**

> The data must be sorted [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 2 — source e[1]

**Original question:**

> Trace the first bubble-sort pass on [5,3,4] and state the output array. [4 marks]
> 
> Source: Original OCR J277-style question; not an official past-paper original.

**Original marking answer:**

> Compare 5>3 [1], swap to [3,5,4] [1]. Compare 5>4 [1], swap to [3,4,5] [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 3 — source e[2]

**Original question:**

> A dataset [6,2,9,1] is unsorted. Explain how to search for 9 without sorting, then describe how insertion sort would sort the whole list. [6 marks]
> 
> Source: Original OCR J277-style question; not an official past-paper original.

**Original marking answer:**

> Linear search is suitable for unsorted data [1], comparing 6, 2 then 9 [1], found at index 2 [1]. Insertion sort builds sorted section [1]: insert 2 before 6 [1], then 9 and finally 1 into the correct places, giving [1,2,6,9] [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 1.

## 088 — Logic Gates: AND, OR and NOT

### Slot 3 — source e[0]

**Original question:**

> State the output of an AND gate given A=1 and B=0. [1 mark]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> 0 [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[1]

**Original question:**

> Give OR outputs for input pairs 00, 01, 10 and 11 in that order. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> 0 [1], 1 [1], 1 [1], 1 [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 090 — Combining Boolean Logic

### Slot 3 — source e[0]

**Original question:**

> State the intermediate expression X for Q=(A AND B) OR C. [1 mark]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> X=A AND B [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[1]

**Original question:**

> Find X and Q for (A,B,C)=(0,0,1) and (1,1,0). [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> For 0,0,1 X=0 [1], Q=1 [1]. For 1,1,0 X=1 [1], Q=1 [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 091 — High-Level and Low-Level Languages

### Slot 3 — source e[0]

**Original question:**

> A new colleague takes over a school reports program. Explain TWO advantages of the code having been written in a high-level language. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> High-level code is easier to read [1], helping the colleague understand existing instructions [1]. It is generally easier to maintain [1], making changes and fault correction quicker [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[1]

**Original question:**

> A computer is upgraded to a processor with a different instruction set. Explain TWO possible drawbacks of an existing low-level program. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Low-level instructions are often specific to the original processor [1], so the new processor might not execute the code [1]. The program may need rewriting for the new instruction set [1], increasing development time and maintenance costs [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 092 — Compilers and Interpreters

### Slot 3 — source e[0]

**Original question:**

> A compiler reports an error before the programmer can run a new program. Explain why translation is necessary and how the compiler helps find a problem. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> The CPU needs executable machine instructions [1], so source code must be translated [1]. The compiler attempts to translate the whole source [1] and reports errors found during compilation so the programmer can correct them [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[1]

**Original question:**

> A learner changes the source code of a small program many times while testing. Explain ONE benefit and ONE drawback of interpreting the program. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> An interpreter translates and executes during running [1], allowing the learner to test changed code without a separate compilation step [1]. The interpreter is required at each run [1], which may make repeated execution slower than running a compiled executable [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 093 — Integrated Development Environments

### Slot 3 — source e[0]

**Original question:**

> A learner writes and improves a quiz application. Explain how an IDE's editor and run-time environment help during development. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> The editor lets the learner write and change source code [1], so they can improve the quiz instructions [1]. The run-time environment lets them execute the application [1], so they can check that the questions and scores behave correctly [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[1]

**Original question:**

> A programmer cannot run their new source code because it contains a syntax error. Explain how TWO IDE facilities help them get the program running. [4 marks]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Error diagnostics identify the syntax problem [1], helping the programmer locate and correct it [1]. The IDE's translator converts corrected source into an executable form [1], allowing it to run [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 096 — Primary Storage: RAM, ROM and Cache

### Slot 2 — source e[0]

**Original question:**

> State whether RAM is volatile and describe what happens to its contents when power is lost. [2]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Volatile [1]; contents are lost when power is removed [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 3 — source e[1]

**Original question:**

> Explain why a CPU benefits from cache memory. [3]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Frequently used data/instructions stored in cache [1]; CPU can access them faster than RAM [1], improving speed/reducing waits [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[2]

**Original question:**

> Compare RAM and ROM using purpose and volatility. [4]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> RAM stores currently running programs/data [1] and is volatile [1]; ROM typically stores firmware/startup instructions [1] and is non-volatile [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 097 — Virtual Memory

### Slot 3 — source e[0]

**Original question:**

> State what type of storage is used to provide virtual memory. [1]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Secondary storage, e.g. SSD/HDD [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[1]

**Original question:**

> Explain two reasons why extensive paging can reduce performance. [4]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Pages transferred between RAM and storage [1], requiring additional input/output operations [1]; secondary storage is slower than RAM [1], so applications wait for required data [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.

## 098 — Secondary Storage

### Slot 3 — source e[0]

**Original question:**

> Name the storage technology used by (i) DVD, (ii) HDD and (iii) USB flash drive. [3]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> (i) Optical [1]; (ii) magnetic [1]; (iii) solid-state/flash [1].

**Approval:** pending independent marks, wording, and visual checks.

### Slot 4 — source e[1]

**Original question:**

> Explain one advantage and one disadvantage of magnetic storage compared with solid-state storage. [4]
> 
> Source: Original OCR J277-style practice question.

**Original marking answer:**

> Magnetic HDD often costs less per GB [1], advantageous for large capacity [1]; it has moving parts [1], increasing vulnerability to physical shock [1].

**Approval:** pending independent marks, wording, and visual checks.

Remaining unmatched slots: 0.
