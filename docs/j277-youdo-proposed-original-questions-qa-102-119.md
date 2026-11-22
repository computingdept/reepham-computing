# J277 You Do — original fourth-question drafts, Lessons 102–119

**Unpublished teacher review, 22 November 2026.** These are original practice questions, not OCR past-paper questions, and are **not independently mark-scheme verified**. The existing three questions and answers in each lesson are retained. Code and data use zero-based indexing where explicitly stated; projector legibility needs testing.

## Lesson 102 — Hexadecimal

**Draft:** `RHS-ORIGINAL-J277-102-Q4-DRAFT` · **3 marks**

**Question**

> A colour code is stored as hexadecimal 3F. Convert it to eight-bit binary and explain why each hexadecimal digit corresponds to four bits. [3 marks]

**Proposed marking points**

1. 3 is 0011 [1].
2. F is 1111, so the eight-bit result is 00111111 [1].
3. Each hex digit represents one of 16 values (0–15), requiring four bits [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 105 — Abstraction and Decomposition

**Draft:** `RHS-ORIGINAL-J277-105-Q4-DRAFT` · **4 marks**

**Question**

> A community centre is developing an online room-booking system. Describe TWO separate subproblems that could be developed and tested independently. Explain how separating them helps the team. [4 marks]

**Proposed marking points**

1. Check availability for a requested room/time [1].
2. Store or confirm a new reservation [1].
3. Each part can be implemented/tested independently [1].
4. Smaller parts are easier to debug, maintain or divide among developers [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 106 — Algorithm Design and Flowcharts

**Draft:** `RHS-ORIGINAL-J277-106-Q4-DRAFT` · **4 marks**

**Question**

> A flowchart takes an integer age. It outputs 'Child' for values below 13, 'Teen' for 13–17 and 'Adult' for 18 or above. State the three decision outcomes for ages 12, 17 and 19, and identify the comparison needed to separate teenagers from adults. [4 marks]

**Proposed marking points**

1. Age 12 outputs Child [1].
2. Age 17 outputs Teen [1].
3. Age 19 outputs Adult [1].
4. Use age < 18 (or age >= 18 for the adult branch), after excluding values below 13 [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 107 — Trace Tables

**Draft:** `RHS-ORIGINAL-J277-107-Q4-DRAFT` · **4 marks**

**Question**

> Trace the following pseudocode:
> 
> score = 1
> FOR i = 1 TO 3
>     score = score * 2 + i
> NEXT i
> OUTPUT score
> 
> Give the value of score after each iteration and the final output. [4 marks]

**Proposed marking points**

1. After i=1: score=3 [1].
2. After i=2: score=8 [1].
3. After i=3: score=19 [1].
4. The final output is 19 [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 108 — Linear Search

**Draft:** `RHS-ORIGINAL-J277-108-Q4-DRAFT` · **3 marks**

**Question**

> A cinema stores film identifiers in the unsorted array [31, 18, 42, 18, 9]. A linear search stops at the first match for 18. Give the index returned (starting at 0), the number of comparisons and one reason why another 18 is not checked. [3 marks]

**Proposed marking points**

1. Returns index 1 [1].
2. Makes two comparisons (31 then 18) [1].
3. The search stops immediately when the first match is found [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 109 — Binary Search

**Draft:** `RHS-ORIGINAL-J277-109-Q4-DRAFT` · **4 marks**

**Question**

> A binary search examines sorted values [4, 8, 12, 16, 20, 24, 28, 32, 36] to find 4, using the lower middle index when needed. Give the sequence of middle values examined, the final index (starting at zero) and one reason a linear search would not require sorting. [4 marks]

**Proposed marking points**

1. First middle value 20 (index 4) [1].
2. Next middle value 8 (index 1), then 4 (index 0) [1].
3. Final returned index 0 [1].
4. Linear search checks items in sequence and works on unsorted data [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 110 — Bubble Sort

**Draft:** `RHS-ORIGINAL-J277-110-Q4-DRAFT` · **3 marks**

**Question**

> A bubble-sort implementation records whether any swap happened during a pass. The array is [1, 2, 3, 4]. State how many swaps occur in the first pass, whether the algorithm should perform another pass and why. [3 marks]

**Proposed marking points**

1. Zero swaps occur [1].
2. It can terminate without another pass [1].
3. No swaps in a full pass indicates the list is already sorted [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 111 — Insertion Sort

**Draft:** `RHS-ORIGINAL-J277-111-Q4-DRAFT` · **4 marks**

**Question**

> Insertion sort has already ordered the prefix [1, 4, 7, 9]. The next key is 6. Identify which two values must shift right, give the new sorted prefix, and explain why 4 stays in place. [4 marks]

**Proposed marking points**

1. 9 shifts one position right [1].
2. 7 shifts one position right [1].
3. New prefix [1, 4, 6, 7, 9] [1].
4. 4 is smaller than 6, so insertion stops after it [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 112 — Merge Sort

**Draft:** `RHS-ORIGINAL-J277-112-Q4-DRAFT` · **4 marks**

**Question**

> Merge sort divides [8, 3, 6, 1] into two halves, sorts each half and merges them. Give the two sorted halves, the final sorted list, and explain how the first element of the merged list is selected. [4 marks]

**Proposed marking points**

1. Left half sorts to [3, 8] [1].
2. Right half sorts to [1, 6] [1].
3. Final sorted list is [1, 3, 6, 8] [1].
4. The smaller leading element of the two halves, 1, is chosen first [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 113 — Comparing Algorithms and Consolidation

**Draft:** `RHS-ORIGINAL-J277-113-Q4-DRAFT` · **4 marks**

**Question**

> A museum keeps 500 item numbers in an unsorted list but performs only one lookup each day. Explain one advantage and one disadvantage of sorting the list before using binary search, compared with using linear search directly. [4 marks]

**Proposed marking points**

1. Sorting enables binary search on the ordered list [1].
2. Binary search then reduces comparisons for a large list [1].
3. Sorting requires extra processing before the lookup [1].
4. For a single lookup, this preparation may outweigh any search-time saving [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 114 — String Manipulation

**Draft:** `RHS-ORIGINAL-J277-114-Q4-DRAFT` · **3 marks**

**Question**

> A program stores word = 'COMPUTER'. Using zero-based positions, give word[0], the substring from index 2 up to but not including index 5, and the length of word. [3 marks]

**Proposed marking points**

1. word[0] is 'C' [1].
2. The substring is 'MPU' [1].
3. The string length is 8 [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 115 — Two-Dimensional Arrays and Records

**Draft:** `RHS-ORIGINAL-J277-115-Q4-DRAFT` · **4 marks**

**Question**

> A timetable is stored in a two-dimensional array lessons. Each row is a day and each column is a period. The entry at lessons[2][1] is 'Maths'. Explain what the two indices mean, state which day/period it represents with zero-based indexing, and describe how to change it to 'Computing'. [4 marks]

**Proposed marking points**

1. First index 2 selects row/day [1].
2. Second index 1 selects column/period [1].
3. This is the third day and second period [1].
4. Assign lessons[2][1] = 'Computing' [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 116 — Parameters, Return Values and Scope

**Draft:** `RHS-ORIGINAL-J277-116-Q4-DRAFT` · **4 marks**

**Question**

> A program has a global variable total = 10. A function calculate(x) uses a local variable total = x + 2 and returns total. The program outputs calculate(5), then outputs the global total. Give both outputs and explain why the global variable is unchanged. [4 marks]

**Proposed marking points**

1. The function returns/outputs 7 [1].
2. The second output is 10 [1].
3. The function's total is a local variable [1].
4. Its scope is within the function, so it does not overwrite the separate global total [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 117 — File Handling

**Draft:** `RHS-ORIGINAL-J277-117-Q4-DRAFT` · **4 marks**

**Question**

> A program opens a text file for writing and writes two pupil names on separate lines. Describe the order of FOUR file-handling steps needed so the names are stored correctly. [4 marks]

**Proposed marking points**

1. Open the intended file for writing [1].
2. Write the first name with a line break [1].
3. Write the second name [1].
4. Close the file to finish/release the resource [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 118 — SQL Queries

**Draft:** `RHS-ORIGINAL-J277-118-Q4-DRAFT` · **4 marks**

**Question**

> A table called Books has fields Title, Author and Copies. Write a SQL query that displays Title and Author for books with fewer than three copies, sorted alphabetically by Title. [4 marks]

**Proposed marking points**

1. SELECT Title, Author [1].
2. FROM Books [1].
3. WHERE Copies < 3 [1].
4. ORDER BY Title ASC (or ORDER BY Title) [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

## Lesson 119 — Random Numbers and Combined Constructs

**Draft:** `RHS-ORIGINAL-J277-119-Q4-DRAFT` · **4 marks**

**Question**

> A quiz program generates an integer between 1 and 5. It gives two points if the value is 5; otherwise it gives one point. Explain how the program can repeat this for three rounds and display the total score. [4 marks]

**Proposed marking points**

1. Use a loop that repeats three times [1].
2. Generate one random integer from 1 to 5 inclusive per round [1].
3. Use selection to add 2 for a result of 5, otherwise 1 [1].
4. Initialise an accumulator at zero and output it after the loop [1].

**Review gates:** verify values/answers independently; inspect existing question set for repetition, code/SQL typography and half-screen projector legibility; teacher approval pending.

---

