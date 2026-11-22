# J277 You Do — RHS content review, Lessons 081–100

**Unpublished, not approved. 22 November 2026.** Question wording, verified answer points, marks and rules are taken directly from the canonical RHS practice bank. Do not enable student overrides, or substitute mismatched diagrams. Lessons 094 (synoptic assessment) and 095 (review/bridge) are protected exceptions pending separate consideration.

| Lesson | Topic | RHS bank candidates | Missing ordinary slots |
|---|---|---:|---:|
| 081 | Syntax and Logic Errors | 0 | 4 |
| 082 | Linear Search | 0 | 4 |
| 083 | Binary Search | 3 | 1 |
| 084 | Bubble Sort | 1 | 3 |
| 085 | Insertion Sort | 0 | 4 |
| 086 | Merge Sort | 3 | 1 |
| 087 | Searching and Sorting Exam Practice | 0 | 4 |
| 088 | Logic Gates: AND, OR and NOT | 2 | 2 |
| 089 | Truth Tables | 4 | 0 |
| 090 | Combining Boolean Logic | 2 | 2 |
| 091 | High-Level and Low-Level Languages | 2 | 2 |
| 092 | Compilers and Interpreters | 2 | 2 |
| 093 | Integrated Development Environments | 2 | 2 |
| 094 | Full-Course Synoptic Assessment | 0 | — |
| 095 | Year 10 Review and Year 11 Bridge | 0 | — |
| 096 | Primary Storage: RAM, ROM and Cache | 1 | 3 |
| 097 | Virtual Memory | 2 | 2 |
| 098 | Secondary Storage | 2 | 2 |
| 099 | Storage Units and Conversions | 4 | 0 |
| 100 | Binary and Denary | 4 | 0 |

## Source-derived question text and marking

### 081 — Syntax and Logic Errors

**Spec:** 2.1.2 / 2.3.2; **lesson:** `lessons/j277/autumn2-081.json`.

No unused exact bank candidate matched; original question fallback inspection is required.

### 082 — Linear Search

**Spec:** 2.1.3; **lesson:** `lessons/j277/autumn2-082.json`.

No unused exact bank candidate matched; original question fallback inspection is required.

### 083 — Binary Search

**Spec:** 2.1.3; **lesson:** `lessons/j277/autumn2-083.json`.


#### Slot 1: RHS-J277-041 (4 marks)

**OCR reference:** OCR J277/02 · June 2022 · Q3(b)

**RHS question draft:**

> A warehouse has a sorted list of product numbers.
> 
> Describe the stages a binary search would use to find a specified number in that list. [4]

**Verified answer points:**

> Choose middle of sorted list; check equality; discard the wrong half based on comparison; repeat until match or search space empty.

**Marking rule:** Up to 4 separate correct binary-search steps; not just 'split list in half'.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-148 (3 marks)

**OCR reference:** OCR J277/02 · June 2024 · Q3(c)(i)

**RHS question draft:**

> A parcel service keeps these sorted delivery codes: 1, 2, 5, 6, 7, 10, 20.
> 
> Trace a binary search to find the code 10, stating the values checked as the range narrows. [3]

**Verified answer points:**

> Compare middle value 6; because 6 < 10 discard values 1,2,5 and 6; compare new middle value 10.

**Marking rule:** 1 correct middle comparison, 1 right-half selection, 1 target comparison.

**Visual/teacher approval:** pending.

#### Slot 3: RHS-J277-149 (1 marks)

**OCR reference:** OCR J277/02 · June 2024 · Q3(c)(ii)

**RHS question draft:**

> A warehouse is using binary search for item codes.
> 
> State one condition the stored data must meet before binary search can be used. [1]

**Verified answer points:**

> Data must be sorted/orderable.

**Marking rule:** 1 valid prerequisite.

**Visual/teacher approval:** pending.

### 084 — Bubble Sort

**Spec:** 2.1.3; **lesson:** `lessons/j277/autumn2-084.json`.


#### Slot 1: RHS-J277-206 (3 marks)

**OCR reference:** OCR J277/02 · June 2025 · Q3(b)

**RHS question draft:**

> A shop is comparing its sorting methods and data structures.
> 
> For each statement, choose the correct completion: (a) Insertion sort maintains a sorted and unsorted section / always starts in the middle / combines split lists. (b) Bubble sort swaps neighbouring values always / when they are in order / when they are out of order. (c) An array normally has a fixed declared length / cannot change element values / is always one-dimensional. [3]

**Verified answer points:**

> A: maintains sorted/unsorted sections; B: bubble sort swaps out-of-order neighbouring values; C: array has a fixed declared length.

**Marking rule:** One correct selection for each of three choices.

**Visual/teacher approval:** pending.

### 085 — Insertion Sort

**Spec:** 2.1.3; **lesson:** `lessons/j277/autumn2-085.json`.

No unused exact bank candidate matched; original question fallback inspection is required.

### 086 — Merge Sort

**Spec:** 2.1.3; **lesson:** `lessons/j277/autumn2-086.json`.


#### Slot 1: RHS-J277-040 (3 marks)

**OCR reference:** OCR J277/02 · June 2022 · Q3(a)

**RHS question draft:**

> A weather station stores eight readings: 45, 12, -99, 100, -13, 0, 17 and -27.
> 
> Show the remaining splitting and merging stages needed to sort these values in ascending order using merge sort. [3]

**Verified answer points:**

> Sorted pairs: [12,45], [-99,100], [-13,0], [-27,17]; quartets: [-99,12,45,100] and [-27,-13,0,17]; final sorted eight: [-99,-27,-13,0,12,17,45,100].

**Marking rule:** 1 per successful merge stage: pairs, quartets, full list. Needs trace showing correct merges, not just final sorted result.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-150 (1 marks)

**OCR reference:** OCR J277/02 · June 2024 · Q3(c)(iii)

**RHS question draft:**

> A museum has three possible sorting methods: bubble sort, insertion sort and merge sort.
> 
> Which method divides items into smaller groups before combining them in sorted order? [1]

**Verified answer points:**

> Merge sort.

**Marking rule:** 1 correct algorithm.

**Visual/teacher approval:** pending.

#### Slot 3: RHS-J277-205 (4 marks)

**OCR reference:** OCR J277/02 · June 2025 · Q3(a)

**RHS question draft:**

> A library needs to sort eight book reference values: 2, 7, 3, 1, 9, 6, 5, 4.
> 
> Show the divisions and merging stages of merge sort until the list is in ascending order. [4]

**Verified answer points:**

> Divide into 8 single-element lists, merge sorted pairs [2,7] [1,3] [6,9] [4,5], then [1,2,3,7] [4,5,6,9], finish [1,2,3,4,5,6,7,9].

**Marking rule:** Four stage marks; sorting must take place while merging, not after.

**Visual/teacher approval:** pending.

### 087 — Searching and Sorting Exam Practice

**Spec:** 2.1.3; **lesson:** `lessons/j277/autumn2-087.json`.

No unused exact bank candidate matched; original question fallback inspection is required.

### 088 — Logic Gates: AND, OR and NOT

**Spec:** 2.4.1; **lesson:** `lessons/j277/autumn2-088.json`.


#### Slot 1: RHS-J277-154 (3 marks)

**OCR reference:** OCR J277/02 · June 2024 · Q5(b)

**RHS question draft:**

> A building-access controller uses the Boolean expression P = (NOT A) AND (B OR C).
> 
> Draw a logic circuit with correctly connected gates to produce P. [3]

**Verified answer points:**

> NOT A, OR(B,C), AND of the two branches to P.

**Marking rule:** 1 for NOT, 1 OR, 1 connected AND; correct shapes and wiring.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-211 (3 marks)

**OCR reference:** OCR J277/02 · June 2025 · Q5(a)

**RHS question draft:**

> A charity's online donation system accepts a payment if either a correct password (A) or correct PIN (B) is supplied, provided the account is not blocked (C).
> 
> Draw a logic circuit for this decision, with output P. [3]

**Verified answer points:**

> A OR B; NOT C; final AND connecting both results.

**Marking rule:** One correct gate/connection for each of 3 criteria; avoid unnecessary gates.

**Visual/teacher approval:** pending.

### 089 — Truth Tables

**Spec:** 2.4.1; **lesson:** `lessons/j277/autumn2-089.json`.


#### Slot 1: RHS-J277-034 (2 marks)

**OCR reference:** OCR J277/02 · June 2022 · Q2(a)(ii)

**RHS question draft:**

> An events centre uses a three-input logic circuit.
> 
> Describe what a truth table shows about the circuit's behaviour. [2]

**Verified answer points:**

> Lists every possible input combination and shows its corresponding output.

**Marking rule:** 1 for all inputs, 1 for dependent output.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-035 (1 marks)

**OCR reference:** OCR J277/02 · June 2022 · Q2(a)(iii)

**RHS question draft:**

> A ticketing system uses the expression P = (A OR B) AND NOT C.
> 
> State how many input combinations its full truth table requires. [1]

**Verified answer points:**

> 8.

**Marking rule:** 1 correct row count, excluding heading.

**Visual/teacher approval:** pending.

#### Slot 3: RHS-J277-099 (2 marks)

**OCR reference:** OCR J277/02 · June 2023 · Q4(b)

**RHS question draft:**

> An aquarium control system uses two different two-input gates.
> 
> Identify each gate from its output sequence for inputs 00, 01, 10, 11: Gate 1 produces 0, 1, 1, 1; Gate 2 produces 0, 0, 0, 1. [2]

**Verified answer points:**

> Gate 1 OR; Gate 2 AND.

**Marking rule:** 1 mark per correct identification.

**Visual/teacher approval:** pending.

#### Slot 4: RHS-J277-153 (4 marks)

**OCR reference:** OCR J277/02 · June 2024 · Q5(a)

**RHS question draft:**

> A building-access controller uses P = (A AND B) OR C. Complete the eight-row truth table by writing P for inputs ABC in this order: 000, 001, 010, 011, 100, 101, 110, 111. [4]

**Verified answer points:**

> For inputs ABC = 000,001,010,011,100,101,110,111, outputs 0,1,0,1,0,1,1,1.

**Marking rule:** 1 mark per fully correct pair of rows, 4 marks total.

**Visual/teacher approval:** pending.

### 090 — Combining Boolean Logic

**Spec:** 2.4.1; **lesson:** `lessons/j277/autumn2-090.json`.


#### Slot 1: RHS-J277-033 (3 marks)

**OCR reference:** OCR J277/02 · June 2022 · Q2(a)(i)

**RHS question draft:**

> A cinema offers a discount when a visitor is a student (A) OR holds a loyalty card (B), but NOT on Saturdays (C).
> 
> Draw and connect three logic gates to implement P = (A OR B) AND (NOT C). Label inputs A, B, C and output P. [3]

**Verified answer points:**

> OR gate combining A and B; NOT on C; AND joining both branches.

**Marking rule:** Three correctly drawn gate types, one each.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-098 (3 marks)

**OCR reference:** OCR J277/02 · June 2023 · Q4(a)

**RHS question draft:**

> A warehouse security light uses three inputs: A = movement detected, B = daylight, C = manual switch enabled. The light should turn on only when movement is detected at night and the switch is enabled.
> 
> Draw a logic-gate circuit for the required output. [3]

**Verified answer points:**

> Q = A AND (NOT B) AND C; invert daylight B then combine A and C through AND stages.

**Marking rule:** 3 gate/connection elements: NOT on B plus two AND stages. Correct shapes and wiring.

**Visual/teacher approval:** pending.

### 091 — High-Level and Low-Level Languages

**Spec:** 2.5.1; **lesson:** `lessons/j277/autumn2-091.json`.


#### Slot 1: RHS-J277-086 (4 marks)

**OCR reference:** OCR J277/02 · June 2023 · Q1(a)

**RHS question draft:**

> An engineering firm compares high-level and low-level programming languages.
> 
> For each characteristic, identify the most suitable language category: (a) source code is portable across different processor architectures; (b) the programmer can access hardware memory directly; (c) it commonly uses English-like commands; (d) programs written in this category always need translating into object or machine code to execute. [4]

**Verified answer points:**

> a High-level; b Low-level; c High-level; d High-level.

**Marking rule:** 1 correct classification per row, 4 marks.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-157 (2 marks)

**OCR reference:** OCR J277/02 · June 2024 · Q7(a)

**RHS question draft:**

> A robotics firm considers using a low-level language instead of a high-level language.
> 
> Give two reasons why this might be appropriate. [2]

**Verified answer points:**

> Direct hardware/memory control; potentially faster code/less memory; optimising for specific hardware; machine instructions need no further translation.

**Marking rule:** Any two precise benefits, maximum 2. Vague 'more efficient' not enough.

**Visual/teacher approval:** pending.

### 092 — Compilers and Interpreters

**Spec:** 2.5.1; **lesson:** `lessons/j277/autumn2-092.json`.


#### Slot 1: RHS-J277-045 (5 marks)

**OCR reference:** OCR J277/02 · June 2022 · Q4(b)(ii)

**RHS question draft:**

> A video-editing studio writes software using high-level languages.
> 
> Complete five blanks using the word bank (not every term is used): continues, crashes, stops, high-level, low-level, no, executable, with, without, many.
> 
> (1) Source code is written in a ___ language and needs translating before execution. (2) An interpreter converts and executes one line at a time, but ___ when an error is found. (3) A compiler reports errors and the program cannot run until there are ___ errors. (4) A compiler may create an ___ file that runs (5) ___ the compiler. [5]

**Verified answer points:**

> high-level; stops; no; executable; without.

**Marking rule:** 1 per gap; include a complete student gap-fill passage and suitable word bank.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-158 (3 marks)

**OCR reference:** OCR J277/02 · June 2024 · Q7(b)

**RHS question draft:**

> A software house must choose between compiling and interpreting its applications.
> 
> Describe potential benefits of using a compiler rather than an interpreter. [3]

**Verified answer points:**

> Executable created once; faster compiled execution; end user needs no translator or source; source protected; multiple errors highlighted; optimisation.

**Marking rule:** 1 creditworthy benefit each, maximum 3; 'translates all at once' alone not creditworthy.

**Visual/teacher approval:** pending.

### 093 — Integrated Development Environments

**Spec:** 2.5.2; **lesson:** `lessons/j277/autumn2-093.json`.


#### Slot 1: RHS-J277-102 (4 marks)

**OCR reference:** OCR J277/02 · June 2023 · Q5(a)(iii)

**RHS question draft:**

> A museum app developer is checking a program for errors.
> 
> Identify two IDE features that support testing and describe how each can be used. [4]

**Verified answer points:**

> Two appropriate IDE features (e.g. debugger to step/inspect state; compiler to translate/check errors; error diagnostics to locate faults; variable watch to inspect values).

**Marking rule:** 1 distinct feature and 1 specific associated use for each, max 4.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-204 (4 marks)

**OCR reference:** OCR J277/02 · June 2025 · Q2(c)

**RHS question draft:**

> A technician is turning a flowchart into a program using an IDE.
> 
> Identify two IDE features that could help develop the program and describe the use of each. [4]

**Verified answer points:**

> Any two suitable IDE tools with corresponding uses: editor to enter code, debugger to diagnose, compiler to translate, stepper to execute line-by-line.

**Marking rule:** 1 name + 1 matching description per tool, max 4.

**Visual/teacher approval:** pending.

### 094 — Full-Course Synoptic Assessment

**Spec:** 1.1–1.6 / 2.1–2.5; **lesson:** `lessons/j277/autumn2-094.json`.

**Protected exception:** no override proposed.

### 095 — Year 10 Review and Year 11 Bridge

**Spec:** 1.1–2.5; **lesson:** `lessons/j277/autumn2-095.json`.

**Protected exception:** no override proposed.

### 096 — Primary Storage: RAM, ROM and Cache

**Spec:** 1.2.1; **lesson:** `lessons/j277/autumn2-096.json`.


#### Slot 1: RHS-J277-076 (2 marks)

**OCR reference:** OCR J277/01 · June 2023 · Q5(a)(i)

**RHS question draft:**

> A film editor's computer has RAM and an SSD.
> 
> Explain why both primary memory and secondary storage are needed. [2]

**Verified answer points:**

> Primary memory holds active data/instructions needed by CPU; secondary storage saves files/data when computer powers down.

**Marking rule:** One distinct why-needed reason for each type.

**Visual/teacher approval:** pending.

### 097 — Virtual Memory

**Spec:** 1.2.1; **lesson:** `lessons/j277/autumn2-097.json`.


#### Slot 1: RHS-J277-078 (4 marks)

**OCR reference:** OCR J277/01 · June 2023 · Q5(a)(iii)

**RHS question draft:**

> A graphic designer's PC uses virtual memory. Decide whether each statement is correct; correct any false ones: (a) virtual memory reserves an area of primary memory; (b) information from ROM is moved into virtual memory; (c) virtual memory may be used when RAM is almost full; (d) information held in virtual memory is transferred back to secondary storage when needed. [4]

**Verified answer points:**

> a false: virtual memory uses secondary storage; b false: RAM data is moved to virtual memory; c true; d false: data returns to RAM.

**Marking rule:** 1 correct judgement/correction per statement, maximum 4; avoid substituting generic 'primary' for RAM.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-143 (2 marks)

**OCR reference:** OCR J277/01 · June 2024 · Q7(b)(iii)

**RHS question draft:**

> A delivery vehicle's automatic distance-control computer has RAM but no virtual memory.
> 
> Explain why virtual memory may not be necessary for this embedded system. [2]

**Verified answer points:**

> Limited dedicated software and data; sufficient RAM so memory pressure unlikely; may lack secondary storage for swap.

**Marking rule:** Two separate valid reasons.

**Visual/teacher approval:** pending.

### 098 — Secondary Storage

**Spec:** 1.2.2; **lesson:** `lessons/j277/autumn2-098.json`.


#### Slot 1: RHS-J277-134 (1 marks)

**OCR reference:** OCR J277/01 · June 2024 · Q5(b)(ii)

**RHS question draft:**

> A music studio already has magnetic and solid-state drives.
> 
> Identify another category of secondary storage technology. [1]

**Verified answer points:**

> Optical.

**Marking rule:** One correct secondary storage category, not only a particular named disc.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-174 (4 marks)

**OCR reference:** OCR J277/01 · June 2025 · Q1(c)

**RHS question draft:**

> A photographer needs to move image files between two computers.
> 
> Recommend either optical or solid-state removable storage and justify your choice. [4]

**Verified answer points:**

> Solid state: durable, quick transfer, compact and compatible. Optical: low media cost, adequate capacity and portable.

**Marking rule:** Four appropriately explained justifications that match the chosen type. No mark for choice by itself; unsupported reliability/longevity not credited.

**Visual/teacher approval:** pending.

### 099 — Storage Units and Conversions

**Spec:** 1.2.3; **lesson:** `lessons/j277/autumn2-099.json`.


#### Slot 1: RHS-J277-001 (4 marks)

**OCR reference:** OCR J277/01 · June 2022 · Q1(a)

**RHS question draft:**

> A cinema is reviewing the storage units used for its video files.
> 
> For each capacity, select its binary-unit equivalent from: 2 megabytes, 2 petabytes, 2 kilobytes, 2 bytes, 2 gigabytes.
> 
> Capacities: 2000 bytes; 2000 terabytes; 16 bits; 4 nibbles. [4]

**Verified answer points:**

> 2 kilobytes; 2 petabytes; 2 bytes; 2 bytes.

**Marking rule:** 1 correct match per row; 4 total.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-059 (1 marks)

**OCR reference:** OCR J277/01 · June 2023 · Q1(d)

**RHS question draft:**

> A museum lists four storage sizes.
> 
> Select the two equivalent values: 4,500,000 bytes; 450 KB; 4.5 MB; 0.45 GB. [1]

**Verified answer points:**

> 4,500,000 bytes and 4.5 MB.

**Marking rule:** 1 only if both correct choices selected.

**Visual/teacher approval:** pending.

#### Slot 3: RHS-J277-135 (1 marks)

**OCR reference:** OCR J277/01 · June 2024 · Q5(b)(iii)

**RHS question draft:**

> A music archive compares available drives.
> 
> Select the smallest capacity: 2.1 GB; 300 MB; 200,000 KB; 0.0021 TB. [1]

**Verified answer points:**

> 200,000 KB.

**Marking rule:** One correct smallest option.

**Visual/teacher approval:** pending.

#### Slot 4: RHS-J277-136 (2 marks)

**OCR reference:** OCR J277/01 · June 2024 · Q5(b)(iv)

**RHS question draft:**

> A school choir has 1,000 audio recordings, each occupying approximately 3 MB.
> 
> Calculate the total estimated storage needed in GB. Show your working. [2]

**Verified answer points:**

> 3 GB.

**Marking rule:** 1 for correct work (1000×3 MB, convert to GB); 1 result. OCR accepts 1024-based equivalent.

**Visual/teacher approval:** pending.

### 100 — Binary and Denary

**Spec:** 1.2.4; **lesson:** `lessons/j277/autumn2-100.json`.


#### Slot 1: RHS-J277-056 (1 marks)

**OCR reference:** OCR J277/01 · June 2023 · Q1(a)

**RHS question draft:**

> A theatre technician explains why computers store information in binary.
> 
> Choose the correct statement: A. Binary uses only 0, 1 and 2. B. The leftmost bit always has the lowest value. C. Electronic switching circuits can represent two states. D. An 8-bit unsigned value cannot be zero. [1]

**Verified answer points:**

> C – binary represents the two electronic switching states.

**Marking rule:** 1 correct selection.

**Visual/teacher approval:** pending.

#### Slot 2: RHS-J277-057 (4 marks)

**OCR reference:** OCR J277/01 · June 2023 · Q1(b)

**RHS question draft:**

> A gallery is converting image reference numbers. Complete the four missing entries in this conversion grid (denary | 8-bit binary | hexadecimal):
> (1) ___ | 00000111 | 7
> (2) 49 | ___ | 31
> (3) ___ | 01100110 | 66
> (4) 244 | 11110100 | ___. [4]

**Verified answer points:**

> (1) 7; (2) 00110001; (3) 102; (4) F4.

**Marking rule:** 1 each; eight binary digits mandatory.

**Visual/teacher approval:** pending.

#### Slot 3: RHS-J277-191 (2 marks)

**OCR reference:** OCR J277/01 · June 2025 · Q5(c)

**RHS question draft:**

> A game controller adds two 8-bit values.
> 
> Calculate 01110011 + 00110100 in binary. Show your working. [2]

**Verified answer points:**

> 10100111.

**Marking rule:** 1 for correct binary addition working/carries; 1 final result.

**Visual/teacher approval:** pending.

#### Slot 4: RHS-J277-192 (1 marks)

**OCR reference:** OCR J277/01 · June 2025 · Q5(d)

**RHS question draft:**

> An electronic scoreboard stores the binary value 01110111.
> 
> Select the result of a two-place right shift: 00011101; 11101110; 00111011; 11011100. [1]

**Verified answer points:**

> 00011101.

**Marking rule:** One correct option.

**Visual/teacher approval:** pending.
