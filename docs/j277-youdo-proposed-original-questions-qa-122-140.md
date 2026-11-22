# J277 original fourth-question drafts — Lessons 122–140

**Unpublished, not independently verified or approved.** New RHS-style questions only, not OCR past-paper material. Each one complements existing question sets and is source-linked by draft ID. Original questions and answers remain unchanged.

## Lesson 122 — Validation and Authentication

**ID:** `RHS-ORIGINAL-J277-122-Q4-DRAFT` · **4 marks**

**Question:**

> A youth club registration form accepts members aged 11–17 inclusive. Give TWO different invalid test ages and explain the expected response for each. [4 marks]

**Proposed answer/mark scheme:**

1. 10 is below the permitted range [1].
2. The form should reject 10 and request a valid age [1].
3. 18 is above the permitted range [1].
4. The form should reject 18 and request a valid age [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 123 — Defensive Design

**ID:** `RHS-ORIGINAL-J277-123-Q4-DRAFT` · **4 marks**

**Question:**

> A developer writes a payment program used by different colleagues. Explain TWO code-design choices that would make later corrections easier without altering its intended output. [4 marks]

**Proposed answer/mark scheme:**

1. Break the program into named subprograms for separate tasks [1].
2. This makes individual functions easier to test/change [1].
3. Use meaningful names and concise explanatory comments [1].
4. These make logic easier to understand and reduce maintenance mistakes [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 124 — Testing and Test Data

**ID:** `RHS-ORIGINAL-J277-124-Q4-DRAFT` · **4 marks**

**Question:**

> A system accepts an integer ticket quantity from 1 to 8 inclusive. Give an example of valid normal, valid boundary, invalid and erroneous test data. [4 marks]

**Proposed answer/mark scheme:**

1. 4 is valid normal data [1].
2. 1 or 8 is valid boundary data [1].
3. 0 or 9 is invalid numeric data outside range [1].
4. A non-numeric input such as 'blue' is erroneous data [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 125 — Debugging Syntax and Logic Errors

**ID:** `RHS-ORIGINAL-J277-125-Q4-DRAFT` · **3 marks**

**Question:**

> An algorithm should output 'Pass' for a mark of 50 or more, but it uses IF mark > 50. Identify the error type, give the correction and name a test value that would expose the mistake. [3 marks]

**Proposed answer/mark scheme:**

1. It is a logic error [1].
2. Use mark >= 50 [1].
3. Test with mark = 50, which should pass [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 126 — CPU Architecture and the Fetch-Execute Cycle

**ID:** `RHS-ORIGINAL-J277-126-Q4-DRAFT` · **4 marks**

**Question:**

> During the fetch stage the CPU reads the instruction stored at the memory address in the Program Counter. Describe the roles of MAR, MDR, CIR and the Program Counter in obtaining this instruction. [4 marks]

**Proposed answer/mark scheme:**

1. The PC contains the address of the next instruction [1].
2. The MAR holds the address for the memory read [1].
3. The MDR holds the instruction fetched from memory [1].
4. The CIR receives/holds the current instruction for decoding [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 128 — Programming: Arrays and Iteration Practice

**ID:** `RHS-ORIGINAL-J277-128-Q4-DRAFT` · **4 marks**

**Question:**

> An array contains [3, 7, 2, 8, 5]. Describe an algorithm that prints only the values above 5 and state the values printed. [4 marks]

**Proposed answer/mark scheme:**

1. Iterate through each array element [1].
2. Compare each element with 5 using > [1].
3. Output an element only when the condition is true [1].
4. The outputs are 7 and 8, in that order [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 129 — Programming: Subprograms and Parameters

**ID:** `RHS-ORIGINAL-J277-129-Q4-DRAFT` · **4 marks**

**Question:**

> A function square(n) returns n*n. A program calls it twice, for 3 and 5, and adds the two returned results. State the two return values, the final sum, and explain the role of the parameter n. [4 marks]

**Proposed answer/mark scheme:**

1. square(3) returns 9 [1].
2. square(5) returns 25 [1].
3. The final sum is 34 [1].
4. n receives the supplied argument for each call [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 130 — Programming: Files, SQL and Strings

**ID:** `RHS-ORIGINAL-J277-130-Q4-DRAFT` · **4 marks**

**Question:**

> A file contains lines 'Ada,72' and 'Ben,48'. A program must print names whose mark is at least 50. Explain FOUR steps needed after opening the file. [4 marks]

**Proposed answer/mark scheme:**

1. Read each line from the file [1].
2. Split each line into name and mark fields [1].
3. Convert the mark text to a number before comparing it with 50 [1].
4. Print Ada only, since 72 meets the condition and 48 does not [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 131 — Programming: Unseen Problems and Debugging

**ID:** `RHS-ORIGINAL-J277-131-Q4-DRAFT` · **4 marks**

**Question:**

> A program is meant to calculate the average of four quiz scores, but it divides their total by 5. Describe how to identify, correct and verify this fault. [4 marks]

**Proposed answer/mark scheme:**

1. Run a known set of four scores and calculate the expected average [1].
2. Compare actual output with the expected average to find the mismatch [1].
3. Correct the divisor from 5 to 4 [1].
4. Rerun the same and at least one further test to confirm the correction [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 132 — Mixed Paper 1 and Paper 2 Retrieval

**ID:** `RHS-ORIGINAL-J277-132-Q4-DRAFT` · **4 marks**

**Question:**

> A school plans to use a cloud-based booking system for a large event. Explain ONE networking advantage, ONE security risk and a suitable mitigation for that risk. [4 marks]

**Proposed answer/mark scheme:**

1. Cloud access allows authorised staff to use the system from different connected devices/locations [1].
2. This improves collaboration or reduces dependence on a single on-site machine [1].
3. Stolen credentials or interception may expose booking data [1].
4. Use multi-factor authentication, encryption in transit or suitable permissions to reduce that specific risk [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 134 — Network Hardware and Topologies

**ID:** `RHS-ORIGINAL-J277-134-Q4-DRAFT` · **4 marks**

**Question:**

> A school connects six classroom computers through one central switch. Identify the network topology, state the number of links needed from computers to the switch, and explain TWO consequences if the switch fails. [4 marks]

**Proposed answer/mark scheme:**

1. It is a star topology [1].
2. Six computer-to-switch links are needed [1].
3. All computers lose connectivity to each other through that switch [1].
4. Shared services or resources reached through the switch become unavailable until the switch is restored [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 136 — Network Performance

**ID:** `RHS-ORIGINAL-J277-136-Q4-DRAFT` · **4 marks**

**Question:**

> A pupil transfers a 24 megabit file over a connection with an ideal data rate of 6 megabits per second. Calculate the theoretical transfer time and explain TWO reasons why the real transfer may take longer. [4 marks]

**Proposed answer/mark scheme:**

1. Theoretical time = 24 ÷ 6 = 4 seconds [2 marks, 1 for correct division and 1 for result].
2. Protocol overhead or competing network traffic reduces the effective data rate [1].
3. Interference, retransmission or congestion adds delay [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 137 — Network Threats

**ID:** `RHS-ORIGINAL-J277-137-Q4-DRAFT` · **4 marks**

**Question:**

> A staff member receives an email saying their account will close unless they follow a link and enter their password. Identify TWO suspicious features and describe TWO safe actions to take. [4 marks]

**Proposed answer/mark scheme:**

1. The message creates urgency or threatens account closure [1].
2. It requests credentials through an unexpected link [1].
3. Do not follow the link or enter the password [1].
4. Check via a known official route and/or report the message to IT [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 138 — Preventing Network Attacks

**ID:** `RHS-ORIGINAL-J277-138-Q4-DRAFT` · **4 marks**

**Question:**

> A company wants to reduce the damage caused by a ransomware infection. Describe TWO different technical measures and explain how each limits the impact. [4 marks]

**Proposed answer/mark scheme:**

1. Keep tested offline/isolated backups [1].
2. Files can be restored without relying on the encrypted copies [1].
3. Apply timely security updates or restrict execution using permissions [1].
4. This reduces the likelihood of exploitation or limits what malware can access [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 139 — Operating Systems

**ID:** `RHS-ORIGINAL-J277-139-Q4-DRAFT` · **4 marks**

**Question:**

> A computer runs a browser, a music player and a document editor at once. Explain TWO tasks its operating system performs to keep these programs working. [4 marks]

**Proposed answer/mark scheme:**

1. Allocates memory/RAM to running programs [1].
2. This keeps each program's required data and instructions available [1].
3. Schedules CPU time between processes [1].
4. This allows the programs to make progress while sharing the CPU [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

## Lesson 140 — Utility Software

**ID:** `RHS-ORIGINAL-J277-140-Q4-DRAFT` · **4 marks**

**Question:**

> A photographer needs to send a collection of large photos to a colleague without losing image information. Recommend a suitable type of compression and explain ONE benefit and ONE possible limitation. [4 marks]

**Proposed answer/mark scheme:**

1. Use lossless compression [1].
2. The original image data can be reconstructed exactly [1].
3. Reducing file size can save transfer time/storage [1].
4. The file reduction may be smaller than with lossy compression [1].

**Review:** marking logic, lesson fit, no duplicated demand, accessibility, projector QA and teacher sign-off pending.

---

