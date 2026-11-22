# J277 You Do — consolidated teacher review register (draft content)

**22 November 2026 — planning / source QA record, not a live release.** All 164 lessons are listed below with their source-proposal slots. This register does **not** claim that questions are externally marked, independently tested, visually rendered or ready for student display.

## Inventory results

- 164 lesson records, including 14 protected assessment/project/feedback/timed exceptions
- 150 ordinary lessons, all with four proposed exam-question slots (600 candidate positions)
- 225 distinct RHS bank source IDs, each allocated once across the lesson map
- 66 newly authored fourth-question drafts (outside the verified bank), with proposed answer points and marks, pending independent checking
- Existing lesson fallbacks remain source-linked and require answer/visual review
- 0 empty ordinary proposal slots
- Every `teacher_approved` and `published_bank_override_enabled` flag remains `false`

## Outstanding content and rendering QA

**Critical:** No lesson should be switched on before each question has independently checked answer points and correct mark totals. The source bank's field names describe recorded verification, not confirmation of this final lesson's question fit. New draft questions have **not** completed that check.

**Flagged specific follow-ups:**

- Lesson 150: asks learners to **write OCR-style pseudocode**, but the draft marking guidance presently lists algorithm steps rather than a complete exemplar program. Add a valid worked reference solution, suitable equivalent acceptances and negative/zero-number test cases before approval
- Lesson 124: confirm the expected terminology for *valid, invalid and erroneous test data* aligns with J277 specification and mark scheme conventions
- Lessons 042 and 142: re-check the precise current legal framing of the Computer Misuse Act and licensing/copyright before marking verification
- Lessons 080, 107, 109, 111, 112, 149, 162: independently calculate traces and index positions, and check use of inclusive ranges and zero-based indexing
- Lessons 102, 136, 161: independently verify bases, bit counts, data-rate units, arithmetic and show-working allocations
- Lessons 115, 118, 130: independently test array addressing, SQL syntax and file handling/pseudocode phrasing
- Verify no question-page SVG contains completed answers; any figure must match the scenario, labels and numbers exactly. For code/SQL, keep a clear monospaced layout and appropriate line breaks at half-screen projector size
- Confirm the You Do presentation sequence: Code First question; Code First same question with answer; four question grid; then **one question/answer pair per answer page**, answers aligned at top. Do not edit I Do, We Do or any other phase during this review

**Teacher end review:** check representative original questions and all 66 new drafts, use the corrected 66-slot baseline rather than the original 70-slot reporting figure (the initial 70 'missing bank' count included four already occupied source fallbacks), then approve per lesson. No bulk activation or automatic publication.

## Complete lesson register

| Lesson | Topic | RHS bank | Original fallback | New draft | Status |
|---|---|---:|---:|---:|---|
| 001 | Binary and Denary | 4 | 0 | 0 | Existing source QA needed |
| 002 | Binary Addition and Shifts | 4 | 0 | 0 | Existing source QA needed |
| 003 | Hexadecimal | 4 | 0 | 0 | Existing source QA needed |
| 004 | Characters, ASCII, Unicode and Data Units | 4 | 0 | 0 | Existing source QA needed |
| 005 | Images, Pixels, Colour Depth and File Sizes | 4 | 0 | 0 | Existing source QA needed |
| 006 | Sound, Sampling, Bit Depth and File Sizes | 4 | 0 | 0 | Existing source QA needed |
| 007 | Compression and Storage Calculations | 4 | 0 | 0 | Existing source QA needed |
| 008 | Primary Storage: RAM, ROM and Cache | 4 | 0 | 0 | Existing source QA needed |
| 009 | Secondary Storage and Device Choice | 4 | 0 | 0 | Existing source QA needed |
| 010 | CPU Architecture, Registers and Fetch–Execute Cycle | 4 | 0 | 0 | Existing source QA needed |
| 011 | CPU Performance: Clock Speed, Cache and Cores | 1 | 3 | 0 | Existing source QA needed |
| 012 | Computational Thinking — ADA | 4 | 0 | 0 | Existing source QA needed |
| 013 | Flowcharts, Pseudocode and Programming Constructs | 4 | 0 | 0 | Existing source QA needed |
| 014 | Linear Search and Algorithm Tracing | 4 | 0 | 0 | Existing source QA needed |
| 015 | Bubble Sort and Insertion Sort | 4 | 0 | 0 | Existing source QA needed |
| 016 | Variables, Input, Output and One-Dimensional Arrays | 3 | 1 | 0 | Existing source QA needed |
| 017 | Defensive Design, Validation and Testing | 4 | 0 | 0 | Existing source QA needed |
| 018 | Autumn 1 AP1 Assessment and Review | 0 | 0 | 0 | Protected exception |
| 019 | Sequence, Input and Output | 4 | 0 | 0 | Existing source QA needed |
| 020 | Variables, Assignment and Data Types | 4 | 0 | 0 | Existing source QA needed |
| 021 | LANs, WANs and Network Performance | 4 | 0 | 0 | Existing source QA needed |
| 022 | Client–Server and Peer-to-Peer Networks | 2 | 2 | 0 | Existing source QA needed |
| 023 | Network Hardware | 3 | 1 | 0 | Existing source QA needed |
| 024 | The Internet, DNS and Cloud Storage | 3 | 1 | 0 | Existing source QA needed |
| 025 | Network Topologies | 4 | 0 | 0 | Existing source QA needed |
| 026 | Wired and Wireless Networks | 4 | 0 | 0 | Existing source QA needed |
| 027 | IP and MAC Addresses | 3 | 1 | 0 | Existing source QA needed |
| 028 | Common Network Protocols | 3 | 1 | 0 | Existing source QA needed |
| 029 | Standards and Protocols | 1 | 3 | 0 | Existing source QA needed |
| 030 | Malware and Social Engineering | 1 | 3 | 0 | Existing source QA needed |
| 031 | Network Attacks | 0 | 3 | 1 | Draft QA needed |
| 032 | Firewalls and Network Security | 3 | 1 | 0 | Existing source QA needed |
| 033 | Passwords, Encryption and Penetration Testing | 2 | 2 | 0 | Existing source QA needed |
| 034 | Network Security Scenarios | 0 | 3 | 1 | Draft QA needed |
| 035 | Autumn 2 Assessment | 0 | 0 | 0 | Protected exception |
| 036 | Assessment Feedback and Reteaching | 0 | 0 | 0 | Protected exception |
| 037 | Operating Systems: Interfaces and Memory | 2 | 2 | 0 | Existing source QA needed |
| 038 | Operating Systems: Files and Devices | 0 | 3 | 1 | Draft QA needed |
| 039 | Utility Software | 3 | 1 | 0 | Existing source QA needed |
| 040 | Ethical and Social Impacts | 4 | 0 | 0 | Existing source QA needed |
| 041 | Data Protection Act 2018 | 1 | 3 | 0 | Existing source QA needed |
| 042 | Computer Misuse Act 1990 | 0 | 3 | 1 | Draft QA needed |
| 043 | Copyright and Software Licences | 3 | 1 | 0 | Existing source QA needed |
| 044 | Evaluating Technology Impacts | 0 | 3 | 1 | Draft QA needed |
| 045 | Abstraction and Decomposition | 0 | 3 | 1 | Draft QA needed |
| 046 | Algorithmic Thinking | 1 | 3 | 0 | Existing source QA needed |
| 047 | Inputs, Processes and Outputs | 1 | 3 | 0 | Existing source QA needed |
| 048 | Flowcharts and Algorithm Design | 3 | 1 | 0 | Existing source QA needed |
| 049 | Pseudocode and Trace Tables | 4 | 0 | 0 | Existing source QA needed |
| 050 | Spring 1 Review and Assessment | 0 | 0 | 0 | Protected exception |
| 051 | Sequence, Input and Output | 3 | 1 | 0 | Existing source QA needed |
| 052 | Variables, Assignment and Data Types | 2 | 2 | 0 | Existing source QA needed |
| 053 | Arithmetic, Comparison and Casting | 3 | 1 | 0 | Existing source QA needed |
| 054 | Boolean Conditions in Code | 2 | 2 | 0 | Existing source QA needed |
| 055 | Selection: IF Statements | 1 | 3 | 0 | Existing source QA needed |
| 056 | Selection: ELSE and Nested Conditions | 1 | 3 | 0 | Existing source QA needed |
| 057 | Iteration: FOR Loops | 2 | 2 | 0 | Existing source QA needed |
| 058 | Iteration: WHILE Loops | 1 | 3 | 0 | Existing source QA needed |
| 059 | Tracing Programming Constructs | 2 | 2 | 0 | Existing source QA needed |
| 060 | Combining Programming Constructs | 2 | 2 | 0 | Existing source QA needed |
| 061 | Debugging and Nested Constructs | 3 | 1 | 0 | Existing source QA needed |
| 062 | Programming Challenge and Review | 0 | 3 | 1 | Draft QA needed |
| 063 | Strings: Concatenation and Slicing | 3 | 1 | 0 | Existing source QA needed |
| 064 | Strings and Input Checking | 3 | 1 | 0 | Existing source QA needed |
| 065 | One-Dimensional Arrays | 0 | 3 | 1 | Draft QA needed |
| 066 | Array Traversal and Updates | 1 | 3 | 0 | Existing source QA needed |
| 067 | Two-Dimensional Arrays | 1 | 3 | 0 | Existing source QA needed |
| 068 | Records and Structured Data | 1 | 3 | 0 | Existing source QA needed |
| 069 | Functions and Return Values | 4 | 0 | 0 | Existing source QA needed |
| 070 | Procedures and Variable Scope | 2 | 2 | 0 | Existing source QA needed |
| 071 | Subprograms and Arrays | 0 | 3 | 1 | Draft QA needed |
| 072 | File Handling | 2 | 2 | 0 | Existing source QA needed |
| 073 | SQL: SELECT, FROM and WHERE | 4 | 0 | 0 | Existing source QA needed |
| 074 | Random Number Generation | 0 | 3 | 1 | Draft QA needed |
| 075 | Validation and Authentication | 0 | 3 | 1 | Draft QA needed |
| 076 | Defensive Design and Maintainability | 2 | 2 | 0 | Existing source QA needed |
| 077 | Testing: Normal, Boundary and Invalid Data | 4 | 0 | 0 | Existing source QA needed |
| 078 | Practical Programming Project | 0 | 0 | 0 | Protected exception |
| 079 | Project Review and Assessment Feedback | 0 | 0 | 0 | Protected exception |
| 080 | Trace Tables and Algorithm Refinement | 0 | 3 | 1 | Draft QA needed |
| 081 | Syntax and Logic Errors | 0 | 3 | 1 | Draft QA needed |
| 082 | Linear Search | 0 | 3 | 1 | Draft QA needed |
| 083 | Binary Search | 3 | 1 | 0 | Existing source QA needed |
| 084 | Bubble Sort | 1 | 3 | 0 | Existing source QA needed |
| 085 | Insertion Sort | 0 | 3 | 1 | Draft QA needed |
| 086 | Merge Sort | 3 | 1 | 0 | Existing source QA needed |
| 087 | Searching and Sorting Exam Practice | 0 | 3 | 1 | Draft QA needed |
| 088 | Logic Gates: AND, OR and NOT | 2 | 2 | 0 | Existing source QA needed |
| 089 | Truth Tables | 4 | 0 | 0 | Existing source QA needed |
| 090 | Combining Boolean Logic | 2 | 2 | 0 | Existing source QA needed |
| 091 | High-Level and Low-Level Languages | 2 | 2 | 0 | Existing source QA needed |
| 092 | Compilers and Interpreters | 2 | 2 | 0 | Existing source QA needed |
| 093 | Integrated Development Environments | 2 | 2 | 0 | Existing source QA needed |
| 094 | Full-Course Synoptic Assessment | 0 | 0 | 0 | Protected exception |
| 095 | Year 10 Review and Year 11 Bridge | 0 | 0 | 0 | Protected exception |
| 096 | Primary Storage: RAM, ROM and Cache | 1 | 3 | 0 | Existing source QA needed |
| 097 | Virtual Memory | 2 | 2 | 0 | Existing source QA needed |
| 098 | Secondary Storage | 2 | 2 | 0 | Existing source QA needed |
| 099 | Storage Units and Conversions | 4 | 0 | 0 | Existing source QA needed |
| 100 | Binary and Denary | 4 | 0 | 0 | Existing source QA needed |
| 101 | Binary Addition and Shifts | 2 | 2 | 0 | Existing source QA needed |
| 102 | Hexadecimal | 0 | 3 | 1 | Draft QA needed |
| 103 | Characters and Images | 4 | 0 | 0 | Existing source QA needed |
| 104 | Sound and Compression | 1 | 3 | 0 | Existing source QA needed |
| 105 | Abstraction and Decomposition | 0 | 3 | 1 | Draft QA needed |
| 106 | Algorithm Design and Flowcharts | 0 | 3 | 1 | Draft QA needed |
| 107 | Trace Tables | 0 | 3 | 1 | Draft QA needed |
| 108 | Linear Search | 0 | 3 | 1 | Draft QA needed |
| 109 | Binary Search | 0 | 3 | 1 | Draft QA needed |
| 110 | Bubble Sort | 0 | 3 | 1 | Draft QA needed |
| 111 | Insertion Sort | 0 | 3 | 1 | Draft QA needed |
| 112 | Merge Sort | 0 | 3 | 1 | Draft QA needed |
| 113 | Comparing Algorithms and Consolidation | 0 | 3 | 1 | Draft QA needed |
| 114 | String Manipulation | 0 | 3 | 1 | Draft QA needed |
| 115 | Two-Dimensional Arrays and Records | 0 | 3 | 1 | Draft QA needed |
| 116 | Parameters, Return Values and Scope | 0 | 3 | 1 | Draft QA needed |
| 117 | File Handling | 0 | 3 | 1 | Draft QA needed |
| 118 | SQL Queries | 0 | 3 | 1 | Draft QA needed |
| 119 | Random Numbers and Combined Constructs | 0 | 3 | 1 | Draft QA needed |
| 120 | Autumn Assessment (AP1) | 0 | 0 | 0 | Protected exception |
| 121 | Assessment Feedback and Corrections | 0 | 0 | 0 | Protected exception |
| 122 | Validation and Authentication | 0 | 3 | 1 | Draft QA needed |
| 123 | Defensive Design | 0 | 3 | 1 | Draft QA needed |
| 124 | Testing and Test Data | 0 | 3 | 1 | Draft QA needed |
| 125 | Debugging Syntax and Logic Errors | 0 | 3 | 1 | Draft QA needed |
| 126 | CPU Architecture and the Fetch-Execute Cycle | 0 | 3 | 1 | Draft QA needed |
| 127 | CPU Performance and Embedded Systems | 2 | 2 | 0 | Existing source QA needed |
| 128 | Programming: Arrays and Iteration Practice | 0 | 3 | 1 | Draft QA needed |
| 129 | Programming: Subprograms and Parameters | 0 | 3 | 1 | Draft QA needed |
| 130 | Programming: Files, SQL and Strings | 0 | 3 | 1 | Draft QA needed |
| 131 | Programming: Unseen Problems and Debugging | 0 | 3 | 1 | Draft QA needed |
| 132 | Mixed Paper 1 and Paper 2 Retrieval | 0 | 3 | 1 | Draft QA needed |
| 133 | LANs, WANs and Network Models | 1 | 3 | 0 | Existing source QA needed |
| 134 | Network Hardware and Topologies | 0 | 3 | 1 | Draft QA needed |
| 135 | Network Protocols and Layers | 1 | 3 | 0 | Existing source QA needed |
| 136 | Network Performance | 0 | 3 | 1 | Draft QA needed |
| 137 | Network Threats | 0 | 3 | 1 | Draft QA needed |
| 138 | Preventing Network Attacks | 0 | 3 | 1 | Draft QA needed |
| 139 | Operating Systems | 0 | 3 | 1 | Draft QA needed |
| 140 | Utility Software | 0 | 3 | 1 | Draft QA needed |
| 141 | Ethical, Cultural and Environmental Impacts | 0 | 3 | 1 | Draft QA needed |
| 142 | Legislation and Copyright | 0 | 3 | 1 | Draft QA needed |
| 143 | Spring Assessment (AP2) | 0 | 0 | 0 | Protected exception |
| 144 | Assessment Feedback and Target Setting | 0 | 0 | 0 | Protected exception |
| 145 | Boolean Logic: AND, OR and NOT | 0 | 3 | 1 | Draft QA needed |
| 146 | Truth Tables and Combined Logic | 1 | 3 | 0 | Existing source QA needed |
| 147 | Programming Languages and Translators | 0 | 3 | 1 | Draft QA needed |
| 148 | Integrated Development Environments | 0 | 3 | 1 | Draft QA needed |
| 149 | Algorithms: Examination Techniques | 0 | 3 | 1 | Draft QA needed |
| 150 | Paper 2: Writing Code from a Scenario | 0 | 3 | 1 | Draft QA needed |
| 151 | Paper 2: Validation, Testing and Debugging | 0 | 3 | 1 | Draft QA needed |
| 152 | Paper 1: CPU, Memory and Storage | 0 | 3 | 1 | Draft QA needed |
| 153 | Paper 1: Data Representation | 3 | 1 | 0 | Existing source QA needed |
| 154 | Paper 1: Networks and Security | 0 | 3 | 1 | Draft QA needed |
| 155 | Paper 1: Software, Impacts and Legislation | 0 | 3 | 1 | Draft QA needed |
| 156 | Timed Paper 1 Practice | 0 | 0 | 0 | Protected exception |
| 157 | Timed Paper 2 Practice | 0 | 0 | 0 | Protected exception |
| 158 | Paper 1: Weakest Topics | 0 | 3 | 1 | Draft QA needed |
| 159 | Paper 2: Searching and Sorting | 0 | 3 | 1 | Draft QA needed |
| 160 | Paper 2: Programming Fundamentals | 0 | 3 | 1 | Draft QA needed |
| 161 | Paper 1: Calculations and Extended Answers | 0 | 3 | 1 | Draft QA needed |
| 162 | Paper 2: Unseen Code and Debugging | 0 | 3 | 1 | Draft QA needed |
| 163 | Final Targeted Revision | 0 | 3 | 1 | Draft QA needed |
| 164 | Final GCSE Computer Science Consolidation | 0 | 3 | 1 | Draft QA needed |

## File navigation

- [Mapping workflow](j277-youdo-mapping-workflow.md)
- [Gap-completion tracker](j277-youdo-gap-completion-qa-tracker.md)
- [Draft 031–045](j277-youdo-proposed-original-questions-qa-031-045.md)
- [Draft 062–087](j277-youdo-proposed-original-questions-qa-062-087.md)
- [Draft 102–119](j277-youdo-proposed-original-questions-qa-102-119.md)
- [Draft 122–140](j277-youdo-proposed-original-questions-qa-122-140.md)
- [Draft 141–164](j277-youdo-proposed-original-questions-qa-141-164.md)

The source map is `data/exam-questions/j277-youdo-lesson-map.json`; it is the authoritative status record until the teacher approves publication.
