# J277 You Do — original question drafts for gaps in Lessons 062–087

**Editorial drafts, NOT OCR past-paper questions and NOT independently marking-verified. 22 November 2026.** Existing lesson questions are preserved. All student-facing flags remain off. Scenarios and marks require teacher scrutiny; diagrams, where required, must be checked at projector size.

## Lesson 062 — Programming Challenge and Review

**Draft ID:** `RHS-ORIGINAL-J277-062-Q4-DRAFT` · **3 marks**

**Question:**

> A library book club records how many members attend each of four meetings. Describe a plan for a program that reads each attendance number and displays the total. [3 marks]

**Proposed marking:**

1. Use a loop to read the four attendance values [1].
2. Add each value to an accumulator initialised to zero [1].
3. Display the accumulator after all four values have been processed [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 065 — One-Dimensional Arrays

**Draft ID:** `RHS-ORIGINAL-J277-065-Q4-DRAFT` · **3 marks**

**Question:**

> An array named scores contains [12, 18, 15, 9]. The first element is at index 0. Write the value of scores[2], the index holding 9, and the new array after scores[1] = 20. [3 marks]

**Proposed marking:**

1. scores[2] is 15 [1].
2. 9 is at index 3 [1].
3. The updated array is [12, 20, 15, 9] [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 071 — Subprograms and Arrays

**Draft ID:** `RHS-ORIGINAL-J277-071-Q4-DRAFT` · **4 marks**

**Question:**

> A function countPass(marks) takes an array of marks and returns the number of values at least 50. Describe how the function could calculate and return this number. [4 marks]

**Proposed marking:**

1. Initialise a count variable to zero [1].
2. Use iteration to inspect each array element [1].
3. Increase count by one only when an element is 50 or above [1].
4. Return count after processing all the elements [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 074 — Random Number Generation

**Draft ID:** `RHS-ORIGINAL-J277-074-Q4-DRAFT` · **3 marks**

**Question:**

> A board game simulates rolling one fair six-sided die. State a suitable inclusive range for a random integer and explain TWO checks you would use to test the result. [3 marks]

**Proposed marking:**

1. Generate an integer from 1 to 6 inclusive [1].
2. Check that values below 1 or above 6 never appear [1].
3. Run multiple rolls to check that the output can vary and is not always the same number [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 075 — Validation and Authentication

**Draft ID:** `RHS-ORIGINAL-J277-075-Q4-DRAFT` · **4 marks**

**Question:**

> An online club form asks for a participant's age, which must be between 12 and 17 inclusive. It also requires an existing member to sign in. Describe TWO validation test inputs for the age and explain why a correct age alone does not prove the member's identity. [4 marks]

**Proposed marking:**

1. 12 is valid at the lower boundary [1].
2. 18 is invalid just above the upper boundary [1].
3. Validation checks that an input meets defined rules [1].
4. Authentication separately confirms that the user is who they claim to be [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 080 — Trace Tables and Algorithm Refinement

**Draft ID:** `RHS-ORIGINAL-J277-080-Q4-DRAFT` · **4 marks**

**Question:**

> Consider the pseudocode:
> 
> total = 0
> FOR n = 1 TO 3
>     total = total + n * 2
> NEXT n
> OUTPUT total
> 
> Give the value of total after each iteration and the final output. [4 marks]

**Proposed marking:**

1. After iteration 1 total is 2 [1].
2. After iteration 2 total is 6 [1].
3. After iteration 3 total is 12 [1].
4. The final output is 12 [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 081 — Syntax and Logic Errors

**Draft ID:** `RHS-ORIGINAL-J277-081-Q4-DRAFT` · **3 marks**

**Question:**

> The following pseudocode is intended to calculate the cost of five £3 tickets:
> 
> tickets = 5
> price = 3
> total = tickets + price
> OUTPUT total
> 
> Identify the logic error, give the corrected statement, and state the correct output. [3 marks]

**Proposed marking:**

1. It adds the two values instead of multiplying [1].
2. total = tickets * price [1].
3. The correct output is 15 [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 082 — Linear Search

**Draft ID:** `RHS-ORIGINAL-J277-082-Q4-DRAFT` · **4 marks**

**Question:**

> A linear search checks the unsorted list [14, 8, 22, 5, 17] for the value 9. State the order of values checked, the number of comparisons, and the result reported. [4 marks]

**Proposed marking:**

1. Checks 14, 8, 22, 5, then 17 in order [2 marks; 1 for first three in order, 1 for last two in order].
2. Makes 5 comparisons [1].
3. Reports not found (or equivalent sentinel) [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 085 — Insertion Sort

**Draft ID:** `RHS-ORIGINAL-J277-085-Q4-DRAFT` · **4 marks**

**Question:**

> Trace insertion sort on the list [4, 2, 6, 3]. Give the list after inserting the second, third and fourth elements into the sorted section. State why 6 does not move during its insertion. [4 marks]

**Proposed marking:**

1. After inserting 2: [2, 4, 6, 3] [1].
2. After inserting 6: [2, 4, 6, 3] [1].
3. After inserting 3: [2, 3, 4, 6] [1].
4. 6 is already greater than the values in the sorted section, so no shift is required when it is inserted [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

## Lesson 087 — Searching and Sorting Exam Practice

**Draft ID:** `RHS-ORIGINAL-J277-087-Q4-DRAFT` · **4 marks**

**Question:**

> A sorted list is [2, 5, 7, 11, 14, 18, 23]. A binary search is used to find 18. Give the middle value examined first, the second middle value, and the index of 18 using zero-based indexing. Explain why binary search is appropriate. [4 marks]

**Proposed marking:**

1. The first middle value is 11 (index 3) [1].
2. The second middle value is 18 (index 5) [1].
3. The returned index is 5 [1].
4. The list is sorted, which is a prerequisite for binary search [1].

**Visual:** No image required; for code or arrays check alignment, indexing and readable monospace on the projector. **Approval:** pending.

---

