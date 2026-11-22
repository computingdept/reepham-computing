# J277 original lesson fallbacks — Lessons 111–120

**Teacher review only, 22 November 2026.** Question and answer are linked to their original `e` array index; no new question authoring or student display. Lesson 120 AP1 stays excluded.

## 111 — Insertion Sort

### Slot 1, original e[0]

**Question**

> After inserting the first two unsorted items from [5,2,4,3], state the array at each stage. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Insert 2 → [2,5,4,3] [2]; insert 4 → [2,4,5,3] [2].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Explain the purpose of the sorted section in insertion sort. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Contains elements already in order [1]; next key is placed at its appropriate position [1] to grow sorted section [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> A sorted prefix is [2,6,8] and next key is 5. State the resulting prefix after insertion. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> [2,5,6,8] [2].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 112 — Merge Sort

### Slot 1, original e[0]

**Question**

> Split [7,2,5,1] to singletons and write the two sorted pairs. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Split [7,2] and [5,1] [1]; singletons [7],[2],[5],[1] [1]; sorted pairs [2,7] [1] and [1,5] [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Merge the already sorted lists [1,4,9] and [2,3,8]. State the resulting list. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> [1,2,3,4,8,9] [3; 1 for first three, 1 for last three, 1 for completely correct].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Explain what divide-and-conquer means in merge sort. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Divide the list into smaller subproblems [1], solve them by sorting/merging sublists [1], combine to obtain one ordered result [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 113 — Comparing Algorithms and Consolidation

### Slot 1, original e[0]

**Question**

> Choose a search algorithm for an unsorted list and explain the choice. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Linear search [1]; compares items sequentially [1] without needing the list sorted [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> State the characteristic action of each sorting algorithm: bubble, insertion and merge. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Bubble: adjacent swaps [1]; insertion: insert key into sorted prefix [1]; merge: split then merge ordered sublists [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Explain why binary search may outperform linear search on a large sorted array. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Binary chooses midpoint [1] and discards half each unsuccessful check [1]; linear may inspect elements individually [1], so binary generally uses fewer checks for large sorted arrays [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 114 — String Manipulation

### Slot 1, original e[0]

**Question**

> Trace the following OCR Exam Reference Language. Write the exact TWO lines printed. Show how the substring is selected. [4 marks]
> 
> username = "TylerFox"
> prefix = username.left(2)
> suffix = username.substring(5, 3)
> code = prefix.upper + "-" + suffix.lower
> print(code)
> print(code.length)

**Answer**

> prefix = "Ty"; suffix = "Fox" (begin at index 5 and take 3 characters).
> First output: TY-fox.
> Second output: 6 (two letters, hyphen, three letters).
> Marking: correct parts (1), correct case and concatenation (1), exact first output (1), correct length (1).

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> A school generates a pupil identifier from the FIRST three letters of firstName and the LAST three letters of surname, both uppercase, separated by a hyphen.
> 
> With firstName = "Georgia" and surname = "Mitchell", the required output is GEO-ELL.
> 
> Write an OCR Exam Reference Language algorithm that prints "Invalid" if EITHER name has fewer than three characters; otherwise print the identifier. [6 marks]

**Answer**

> MODEL OCR ERL
> firstName = "Georgia"
> surname = "Mitchell"
> if firstName.length >= 3 AND surname.length >= 3 then
>     firstPart = firstName.left(3)
>     lastPart = surname.right(3)
>     print(firstPart.upper + "-" + lastPart.upper)
> else
>     print("Invalid")
> endif
> 
> Expected output: GEO-ELL.
> Marking: checks lengths of both inputs (2), correct left(3) (1), correct right(3) (1), uppercase and hyphen concatenation (1), correct valid/invalid output paths (1). Accept equivalent correct OCR ERL.

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> A programmer intends the following program to print MAT-27, but it produces the wrong result.
> 
> student = "Matilda"
> group = "27"
> code = student.substring(1, 3) + group
> print(code)
> 
> (a) State the output of the original program. [1]
> (b) Identify THREE changes needed to produce MAT-27. [3]
> (c) Rewrite the string-handling statements using OCR Exam Reference Language so the program prints MAT-27. [2]
> [6 marks total]

**Answer**

> (a) ati27.
> (b) Select characters starting at index 0, not index 1; convert the letters to uppercase; insert a quoted hyphen between the letters and group.
> (c) One acceptable answer:
> first = student.left(3)
> code = first.upper + "-" + group
> print(code)
> Alternative: student.substring(0, 3) instead of left(3).
> Marking: exact original output (1), three distinct corrections (3), valid slicing and uppercase (1), correct concatenation and print (1).

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 115 — Two-Dimensional Arrays and Records

### Slot 1, original e[0]

**Question**

> In the Pupils table, state the Name stored at row index 1, column index 1. [2 marks]

**Answer**

> Ben [1]; the first index selects row 1 and the second index selects Name/column 1 [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Explain what a row (record) and a column (field) represent in the Pupils table. [4 marks]

**Answer**

> A row stores the data for one pupil [1] across that pupil's related values [1]. A field/column stores the same property, such as Mark [1], for all pupil records [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Describe one difference between a 2D array of text and a named pupil record. [3 marks]

**Answer**

> The 2D array is accessed by row and column indexes [1] and uses one consistent element type [1]; a named record uses field names and may store different field types [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 116 — Parameters, Return Values and Scope

### Slot 1, original e[0]

**Question**

> Differentiate a function and a procedure. [2 marks]

**Answer**

> A function returns a value; a procedure performs an action and does not need to return a value.

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> A function returns x+5. What is returned for x=8? [1 mark]

**Answer**

> 13.

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Explain one benefit of local variables. [2 marks]

**Answer**

> They limit unintended interference between subprograms and make code easier to reason about.

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 117 — File Handling

### Slot 1, original e[0]

**Question**

> Name the four basic file-handling operations required by OCR J277. [4 marks]

**Answer**

> Open [1], Read [1], Write [1], Close [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Given pupils.csv with a header followed by 101,Ada,72 and 102,Ben,43, state what the second call to readLine() returns after opening the file. [2 marks]

**Answer**

> 101,Ada,72 [1]; because the first readLine() already returned the header [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Explain why the file should be closed after reading its final line. [2 marks]

**Answer**

> Releases the opened file resource/handle [1] and properly completes the file access [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 118 — SQL Queries

### Slot 1, original e[0]

**Question**

> Write SQL to return Name from Pupils where Mark > 70. [3 marks]

**Answer**

> SELECT Name [1] FROM Pupils [1] WHERE Mark > 70 [1]; result Ada and Mia.

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> For the shared table, what value is returned by SELECT Name FROM Pupils WHERE ID = 103;? [2 marks]

**Answer**

> Mia [1]; because the row with ID 103 matches the WHERE condition [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Explain how SELECT and WHERE perform different jobs in SELECT Name FROM Pupils WHERE Mark < 50; [3 marks]

**Answer**

> SELECT Name chooses the field to output [1]; WHERE Mark < 50 filters qualifying rows [1]; in this dataset only Ben matches [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 119 — Random Numbers and Combined Constructs

### Slot 1, original e[0]

**Question**

> Explain the purpose of random number generation in a dice simulation. [2 marks]

**Answer**

> It models different possible outcomes rather than a fixed predetermined roll.

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> State two programming constructs in a game with a loop and IF statement. [2 marks]

**Answer**

> Iteration and selection.

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Why should a game test both the minimum and maximum permitted dice rolls? [2 marks]

**Answer**

> They are boundaries of the expected range and may expose off-by-one errors.

*Source/marking/projector approval pending.*

**Still unfilled:** 1.
