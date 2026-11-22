# J277 You Do — candidate review, Lessons 041–060

**Status: proposal only; no student display or teacher approval, 22 November 2026.** All question texts and verified marking guidance below are read from the RHS bank, not regenerated. Gaps need source-linked original lesson fallbacks or newly authored, verified material. Lesson 050 is an assessment exception.

| Lesson | Topic | Bank candidates | Open fallback slots |
|---|---|---:|---:|
| 041 | Data Protection Act 2018 | 1 | 3 |
| 042 | Computer Misuse Act 1990 | 0 | 4 |
| 043 | Copyright and Software Licences | 3 | 1 |
| 044 | Evaluating Technology Impacts | 0 | 4 |
| 045 | Abstraction and Decomposition | 0 | 4 |
| 046 | Algorithmic Thinking | 1 | 3 |
| 047 | Inputs, Processes and Outputs | 1 | 3 |
| 048 | Flowcharts and Algorithm Design | 3 | 1 |
| 049 | Pseudocode and Trace Tables | 4 | 0 |
| 050 | Spring 1 Review and Assessment | 0 | — |
| 051 | Sequence, Input and Output | 3 | 1 |
| 052 | Variables, Assignment and Data Types | 2 | 2 |
| 053 | Arithmetic, Comparison and Casting | 3 | 1 |
| 054 | Boolean Conditions in Code | 2 | 2 |
| 055 | Selection: IF Statements | 1 | 3 |
| 056 | Selection: ELSE and Nested Conditions | 1 | 3 |
| 057 | Iteration: FOR Loops | 2 | 2 |
| 058 | Iteration: WHILE Loops | 1 | 3 |
| 059 | Tracing Programming Constructs | 2 | 2 |
| 060 | Combining Programming Constructs | 2 | 2 |

## Source question and verified marking review

### 041 — Data Protection Act 2018

**Lesson source:** `lessons/j277/autumn2-041.json`. **Specification:** 1.6.1.


#### Slot 1 · RHS-J277-188 · 4 marks

**OCR reference:** OCR J277/01 · June 2025 · Q4(f)

**Question:**

> A gym stores personal details of its members in a database.
> 
> Identify one relevant piece of legislation governing this information and describe actions the gym should take to comply. [4]

**Verified answer:**

> Data Protection Act 2018 / GDPR; practical measures include protect data, restrict access, collect only needed data, keep accurate, retain for justified period, respect rights.

**Marking rule:** 1 relevant law + up to 3 independent appropriate steps.

**Visual/originality/teacher approval:** pending.

### 042 — Computer Misuse Act 1990

**Lesson source:** `lessons/j277/autumn2-042.json`. **Specification:** 1.6.1.

No suitable unused RHS part assigned; original lesson content requires separate fallback inspection.

### 043 — Copyright and Software Licences

**Lesson source:** `lessons/j277/autumn2-043.json`. **Specification:** 1.6.1.


#### Slot 1 · RHS-J277-082 · 4 marks

**OCR reference:** OCR J277/01 · June 2023 · Q5(d)(i)

**Question:**

> Two developers want to sell a new video-editing application.
> 
> Describe two advantages to its creators of using proprietary licensing rather than open source. [4]

**Verified answer:**

> Creators can charge licensing fees and control redistribution; source code access can be restricted to discourage copying or modification.

**Marking rule:** Up to 4 separate developed creator benefits; do not award copyright ownership because both licences permit that.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-083 · 2 marks

**OCR reference:** OCR J277/01 · June 2023 · Q5(d)(ii)

**Question:**

> A customer downloads a video-editing application.
> 
> Describe one benefit to that customer if the application is released as open source. [2]

**Verified answer:**

> Users may edit source code to customise features or fix bugs, learn from code, or redistribute; potentially avoid paying.

**Marking rule:** 1 valid user benefit, 1 linked development.

**Visual/originality/teacher approval:** pending.

#### Slot 3 · RHS-J277-130 · 8 marks

**OCR reference:** OCR J277/01 · June 2024 · Q4*

**Question:**

> A small independent game developer is choosing between proprietary and open-source licensing for a downloadable computer game.
> 
> Discuss the key characteristics, legal and ethical considerations, benefits and limitations of both approaches, then make a justified recommendation. [8]

**Verified answer:**

> Evaluate open source vs proprietary for independent game release, covering licensing, legal/ethical issues, advantages, drawbacks and justified choice.

**Marking rule:** 8-mark levels of response; top band balanced, contextual and recommends an option with justification.

**Visual/originality/teacher approval:** pending.

### 044 — Evaluating Technology Impacts

**Lesson source:** `lessons/j277/autumn2-044.json`. **Specification:** 1.6.1.

No suitable unused RHS part assigned; original lesson content requires separate fallback inspection.

### 045 — Abstraction and Decomposition

**Lesson source:** `lessons/j277/autumn2-045.json`. **Specification:** 2.1.1.

No suitable unused RHS part assigned; original lesson content requires separate fallback inspection.

### 046 — Algorithmic Thinking

**Lesson source:** `lessons/j277/autumn2-046.json`. **Specification:** 2.1.1.


#### Slot 1 · RHS-J277-223 · 2 marks

**OCR reference:** OCR J277/02 · June 2025 · Q6(d)(ii)

**Question:**

> A theatre extends actNumbers from three to five entries. The values at indices 0–4 are 10, 14, 6, 9 and 11.
> 
> The existing loop contains:
> 01 count = 0
> 02 for x = 0 to 2
> 03     count = count + actNumbers[x]
> 04 next x
> 05 print(count)
> 
> State the line number to change, then write the updated line so all five values are processed. [2]

**Verified answer:**

> Line 02; for x = 0 to 4

**Marking rule:** 1 line number; 1 corrected loop bound. Must use x.

**Visual/originality/teacher approval:** pending.

### 047 — Inputs, Processes and Outputs

**Lesson source:** `lessons/j277/autumn2-047.json`. **Specification:** 2.1.2.


#### Slot 1 · RHS-J277-224 · 1 marks

**OCR reference:** OCR J277/02 · June 2025 · Q6(d)(iii)

**Question:**

> A theatre uses this algorithm to count acts:
> 01 count = 0
> 02 for x = 0 to 2
> 03     count = count + actNumbers[x]
> 04 next x
> 05 print(count)
> 
> Rewrite line 05 so it outputs the words 'The total act count is ' followed by the current numeric value of count. [1]

**Verified answer:**

> print('The total act count is ' + str(count))

**Marking rule:** 1 for outputting text together with the variable, not literal 'count'.

**Visual/originality/teacher approval:** pending.

### 048 — Flowcharts and Algorithm Design

**Lesson source:** `lessons/j277/autumn2-048.json`. **Specification:** 2.1.2.


#### Slot 1 · RHS-J277-145 · 4 marks

**OCR reference:** OCR J277/02 · June 2024 · Q2

**Question:**

> A café's till checks whether a whole number is even or odd. Draw a complete flowchart that accepts an integer num, checks num MOD 2 == 0, outputs 'Even' when the check is true or 'Odd' otherwise, and finishes. Use conventional input/output and decision shapes and label both branches. [4]

**Verified answer:**

> Parallelogram input and both outputs; diamond decision; correct True/False paths (True→Even); all lines connected to End.

**Marking rule:** 1 mark per correct flowchart criterion, maximum 4; source-equivalent chart required.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-201 · 2 marks

**OCR reference:** OCR J277/02 · June 2025 · Q2(a)

**Question:**

> A factory checks a countdown using a flowchart: start with input x, display OK, subtract 2 from x, repeat until x is less than 0.
> 
> State how many times OK is displayed for each starting value: (a) 3 and (b) 10. [2]

**Verified answer:**

> 3 → 2 outputs; 10 → 6 outputs.

**Marking rule:** 1 for each correct count.

**Visual/originality/teacher approval:** pending.

#### Slot 3 · RHS-J277-198 · 3 marks

**OCR reference:** OCR J277/02 · June 2025 · Q1(b)(i)

**Question:**

> A gym app accepts integer values from 1 to 100 inclusive. Complete these missing sections:
> 
> num = input('Enter 1 to 100')
> if num ____ AND ____ then
>     print('accepted')
> ____
>     print('not accepted')
> endif
> 
> Use appropriate comparisons and a selection keyword. [3]

**Verified answer:**

> Condition 1 <= num <= 100 expressed as num >= 1 AND num <= 100; else keyword.

**Marking rule:** One mark each for both comparisons and else; must include num in comparisons.

**Visual/originality/teacher approval:** pending.

### 049 — Pseudocode and Trace Tables

**Lesson source:** `lessons/j277/autumn2-049.json`. **Specification:** 2.1.2.


#### Slot 1 · RHS-J277-039 · 4 marks

**OCR reference:** OCR J277/02 · June 2022 · Q2(d)(ii)

**Question:**

> An events venue creates unique employee IDs with this algorithm:
> 
> 01 surname = input('Enter surname')
> 02 startYear = input('Enter starting year')
> 03 employeeCode = surname + str(startYear)
> 04 while employeeCode.length < 10
> 05     employeeCode = employeeCode + 'x'
> 06 endwhile
> 07 print('ID ' + employeeCode)
> 
> Trace the algorithm when surname is Kofi and startYear is 2021. Complete the table showing employeeCode after each change and the final output. [4]

**Verified answer:**

> Code after line 03: Kofi2021; after first line 05: Kofi2021x; after second: Kofi2021xx; line 07 outputs ID Kofi2021xx.

**Marking rule:** Four trace checkpoints, correctly ordered.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-091 · 3 marks

**OCR reference:** OCR J277/02 · June 2023 · Q1(d)

**Question:**

> A warehouse runs this countdown:
> 
> 01 start = 3
> 02 repeat
> 03     print(start)
> 04     start = start - 1
> 05 until start == -1
> 06 print('Finished')
> 
> Complete a trace table showing executed line number, start value after any change and printed output in order. [3]

**Verified answer:**

> Line 01 start=3; line 03 prints 3; line 04 decrements to 2,1,0,-1; lines 03 output 2,1,0; line 06 prints Finished (does not print -1).

**Marking rule:** 3 chunks: initial+first print; full loop trace with line numbers and outputs; final Finished. Missing line numbers may lose mark.

**Visual/originality/teacher approval:** pending.

#### Slot 3 · RHS-J277-163 · 4 marks

**OCR reference:** OCR J277/02 · June 2024 · Q9(b)

**Question:**

> A sports festival awards 3 points for javelin throws of at least 20.0m, 2 points for at least 10.0m, and 1 point otherwise. Year groups other than 11 have their scores doubled.
> 
> 01 javelinThrow = input('Throw in metres')
> 02 yearGroup = input('Year group')
> 03 if javelinThrow >= 20.0 then
> 04     score = 3
> 05 elseif javelinThrow >= 10.0 then
> 06     score = 2
> 07 else
> 08     score = 1
> 09 endif
> 10 if yearGroup != 11 then
> 11     score = score * 2
> 12 endif
> 13 print('The score is', score)
> 
> Complete a trace table with line numbers, javelinThrow, yearGroup, score and output for a student in Year 10 who throws 14.3m. [4]

**Verified answer:**

> Line01 javelinThrow 14.3; line02 yearGroup 10; line06 score 2; line11 score 4; line13 output 'The score is 4'.

**Marking rule:** 4 mark groups: both inputs; first score, doubled score, output. Include correct line numbers.

**Visual/originality/teacher approval:** pending.

#### Slot 4 · RHS-J277-222 · 4 marks

**OCR reference:** OCR J277/02 · June 2025 · Q6(d)(i)

**Question:**

> A theatre records the number of acts on three stages in actNumbers = [10, 14, 6], indexed 0, 1 and 2.
> 
> Trace the following five-line algorithm. Include count, x and output:
> 
> 01 count = 0
> 02 for x = 0 to 2
> 03     count = count + actNumbers[x]
> 04 next x
> 05 print(count)
> 
> [4]

**Verified answer:**

> Initial count=0; values 10,24,30; loop index 0,1,2 (may show final 3); one final output 30.

**Marking rule:** Four trace criteria: initial, accumulations, index progression, final output.

**Visual/originality/teacher approval:** pending.

### 050 — Spring 1 Review and Assessment

**Lesson source:** `lessons/j277/autumn2-050.json`. **Specification:** 1.5 / 1.6 / 2.1.

Assessment protected; no substitute questions proposed.

### 051 — Sequence, Input and Output

**Lesson source:** `lessons/j277/autumn2-051.json`. **Specification:** 2.2.1.


#### Slot 1 · RHS-J277-044 · 2 marks

**OCR reference:** OCR J277/02 · June 2022 · Q4(b)(i)

**Question:**

> A sports club's program calculates an overall price and the cost per participant.
> 
> Identify which arithmetic operators should be used for multiplication and division in the two calculations. [2]

**Verified answer:**

> Multiplication operator *; division operator /.

**Marking rule:** 1 correct operator purpose each.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-088 · 1 marks

**OCR reference:** OCR J277/02 · June 2023 · Q1(c)(i)

**Question:**

> A scientific simulation calculates the square of 12.
> 
> Write the arithmetic operator missing from print(12 ___ 2). [1]

**Verified answer:**

> Exponent operator ^ or ** (or pow).

**Marking rule:** 1 recognised power operator.

**Visual/originality/teacher approval:** pending.

#### Slot 3 · RHS-J277-089 · 1 marks

**OCR reference:** OCR J277/02 · June 2023 · Q1(c)(ii)

**Question:**

> A game checks whether the integer 53 is even.
> 
> Complete the expression 53 ___ 2 == 0 with the correct operator. [1]

**Verified answer:**

> MOD or %.

**Marking rule:** 1 modulus operator; not division.

**Visual/originality/teacher approval:** pending.

### 052 — Variables, Assignment and Data Types

**Lesson source:** `lessons/j277/autumn2-052.json`. **Specification:** 2.2.1 / 2.2.2.


#### Slot 1 · RHS-J277-109 · 1 marks

**OCR reference:** OCR J277/02 · June 2023 · Q6(c)(iii)

**Question:**

> A theatre alarm system uses the function CheckSensorCode() in the following algorithm:
> 
> 01 sensorType = input('Sensor type?')
> 02 if CheckSensorCode(sensorType) then
> 03     sensorNumber = input('Sensor number?')
> 04     sensorID = sensorType + sensorNumber
> 05     ResetSensor(sensorID)
> 06 endif
> 
> State the data type returned by CheckSensorCode(). [1]

**Verified answer:**

> Boolean.

**Marking rule:** 1 correct return type, Bool accepted.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-219 · 2 marks

**OCR reference:** OCR J277/02 · June 2025 · Q6(b)(iii)

**Question:**

> A theatre keeps performance details in TblMusic.
> 
> State the most suitable data type for (a) Stage, which stores a stage name, and (b) SetLength, which stores a performance duration in hours, such as 0.5 or 1.5. [2]

**Verified answer:**

> Stage String; SetLength Real/Float.

**Marking rule:** 1 per suitable type.

**Visual/originality/teacher approval:** pending.

### 053 — Arithmetic, Comparison and Casting

**Lesson source:** `lessons/j277/autumn2-053.json`. **Specification:** 2.2.1 / 2.2.2.


#### Slot 1 · RHS-J277-038 · 2 marks

**OCR reference:** OCR J277/02 · June 2022 · Q2(d)(i)

**Question:**

> An events venue creates unique employee IDs with this algorithm:
> 
> 01 surname = input('Enter surname')
> 02 startYear = input('Enter starting year')
> 03 employeeCode = surname + str(startYear)
> 04 while employeeCode.length < 10
> 05     employeeCode = employeeCode + 'x'
> 06 endwhile
> 07 print('ID ' + employeeCode)
> 
> Define casting and identify the line number where it is used. [2]

**Verified answer:**

> Casting is changing a value from one type to another; line 03.

**Marking rule:** 1 proper general definition plus 1 exact line number. Needs associated source-code text.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-114 · 1 marks

**OCR reference:** OCR J277/02 · June 2023 · Q6(f)(i)

**Question:**

> A warehouse stores sensor durations as strings in a two-dimensional array.
> 
> Name the programming operation used to turn an integer duration into a string. [1]

**Verified answer:**

> Casting or type casting.

**Marking rule:** 1 technical term. Generic conversion not accepted in OCR June 2023 scheme.

**Visual/originality/teacher approval:** pending.

#### Slot 3 · RHS-J277-210 · 1 marks

**OCR reference:** OCR J277/02 · June 2025 · Q4(b)

**Question:**

> A museum imports a line from a text file as a string and evaluates int(temp) to compare it with zero.
> 
> Identify the type conversion taking place. [1]

**Verified answer:**

> Converting the text from the file into an integer using int().

**Marking rule:** 1 mark; generic 'converts data type' is too vague.

**Visual/originality/teacher approval:** pending.

### 054 — Boolean Conditions in Code

**Lesson source:** `lessons/j277/autumn2-054.json`. **Specification:** 2.2.1.


#### Slot 1 · RHS-J277-200 · 1 marks

**OCR reference:** OCR J277/02 · June 2025 · Q1(b)(iii)

**Question:**

> A gym app checks that num is at least 1 AND no more than 100.
> 
> Name the Boolean operator that combines those two comparisons. [1]

**Verified answer:**

> AND

**Marking rule:** Boolean operator only, 1 mark.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-106 · 4 marks

**OCR reference:** OCR J277/02 · June 2023 · Q6(b)

**Question:**

> A museum alarm uses Boolean variables SystemArmed, DoorSensorActive and WindowSensorActive.
> 
> Write code that calls SoundAlarm() when the system is armed and either sensor is active. [4]

**Verified answer:**

> Conditionally execute code; ensure SystemArmed; evaluate DoorSensorActive OR WindowSensorActive; call SoundAlarm() if and only if both criteria met.

**Marking rule:** 1 for selection, 1 armed check, 1 OR sensor test, 1 correct call; parentheses needed when combined with AND.

**Visual/originality/teacher approval:** pending.

### 055 — Selection: IF Statements

**Lesson source:** `lessons/j277/autumn2-055.json`. **Specification:** 2.2.1.


#### Slot 1 · RHS-J277-216 · 3 marks

**OCR reference:** OCR J277/02 · June 2025 · Q6(a)(ii)

**Question:**

> A sports club registers a member by asking them to enter a password into passA and passB.
> 
> Write an algorithm that compares the two entries and outputs passwords match or passwords do not match, as appropriate. [3]

**Verified answer:**

> Compare passA and passB; when equal print match; when unequal print do not match.

**Marking rule:** 1 comparison plus 1 each for correct true and false output.

**Visual/originality/teacher approval:** pending.

### 056 — Selection: ELSE and Nested Conditions

**Lesson source:** `lessons/j277/autumn2-056.json`. **Specification:** 2.2.1.


#### Slot 1 · RHS-J277-055 · 6 marks

**OCR reference:** OCR J277/02 · June 2022 · Q5(e)

**Question:**

> A cinema car park charges £4 per hour for a petrol or diesel vehicle and £2 per hour for an electric vehicle.
> 
> Write an algorithm that repeatedly inputs hours parked and whether the vehicle is electric, calculates and outputs the charge, and stops when 0 hours is entered. [6]

**Verified answer:**

> Input hours and electric status; use branching; electric hours×2; other hours×4; repeat booking inputs and calculation; stop when hours=0.

**Marking rule:** Six key algorithm elements; do not use a positive-hours-only loop that would fail to stop on negative input.

**Visual/originality/teacher approval:** pending.

### 057 — Iteration: FOR Loops

**Lesson source:** `lessons/j277/autumn2-057.json`. **Specification:** 2.2.1.


#### Slot 1 · RHS-J277-046 · 6 marks

**OCR reference:** OCR J277/02 · June 2022 · Q4(c)

**Question:**

> A sports centre records how many participants' scores it will enter. Its program must first ask for the number of scores, read exactly that many values, and calculate their total and average.
> 
> Write an algorithm that performs these steps and displays both results. [6]

**Verified answer:**

> Input quantity; iterate the specified count; input values inside loop; accumulate total; calculate average; display total and average.

**Marking rule:** Six algorithm features, one each; output both values.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-202 · 4 marks

**OCR reference:** OCR J277/02 · June 2025 · Q2(b)(i)

**Question:**

> A software company uses repetition in its programs.
> 
> Identify two different iteration constructs available in a high-level language and describe how each works. [4]

**Verified answer:**

> FOR count-controlled; WHILE checks before loop; REPEAT UNTIL checks after loop.

**Marking rule:** Two different constructs, each 1 name and 1 accurate characteristic.

**Visual/originality/teacher approval:** pending.

### 058 — Iteration: WHILE Loops

**Lesson source:** `lessons/j277/autumn2-058.json`. **Specification:** 2.2.1.


#### Slot 1 · RHS-J277-169 · 6 marks

**OCR reference:** OCR J277/02 · June 2024 · Q9(f)

**Question:**

> A school charity competition enters team names and scores until the operator enters stop.
> 
> Write an algorithm that identifies the highest score and displays the winning team name and its score. [6]

**Verified answer:**

> Input each team name and score; loop until stop; track highest score; remember matching team; display both team and score.

**Marking rule:** Six aspects: paired input, iteration, sentinel stop, high-score comparison, tracking winning team, final output.

**Visual/originality/teacher approval:** pending.

### 059 — Tracing Programming Constructs

**Lesson source:** `lessons/j277/autumn2-059.json`. **Specification:** 2.1.2 / 2.2.1.


#### Slot 1 · RHS-J277-111 · 2 marks

**OCR reference:** OCR J277/02 · June 2023 · Q6(c)(v)

**Question:**

> A theatre alarm system runs this reset algorithm:
> 
> 01 sensorType = input('Sensor type?')
> 02 if CheckSensorCode(sensorType) then
> 03     sensorNumber = input('Sensor number?')
> 04     sensorID = sensorType + sensorNumber
> 05     ResetSensor(sensorID)
> 06 endif
> 
> Identify TWO programming constructs used. [2]

**Verified answer:**

> Selection and sequence.

**Marking rule:** 1 per construct name, not IF example or a non-existent loop.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-144 · 3 marks

**OCR reference:** OCR J277/02 · June 2024 · Q1

**Question:**

> A games studio uses the keywords IF, FOR and WHILE.
> 
> Classify each as a selection or iteration construct. [3]

**Verified answer:**

> IF selection; FOR iteration; WHILE iteration.

**Marking rule:** 1 correct classification per term.

**Visual/originality/teacher approval:** pending.

### 060 — Combining Programming Constructs

**Lesson source:** `lessons/j277/autumn2-060.json`. **Specification:** 2.2.1.


#### Slot 1 · RHS-J277-225 · 6 marks

**OCR reference:** OCR J277/02 · June 2025 · Q6(e)

**Question:**

> A theatre has 500 tickets in stock, tracked by the variable tickets. Write an algorithm starting with tickets = 500 that repeatedly asks how many tickets a customer wants. If there are enough tickets, display 'Tickets booked' and deduct the requested amount; otherwise display 'Not enough tickets' without changing stock. End when the number of tickets remaining reaches zero. [6]

**Verified answer:**

> Input ticket request; check stock including equal amount; correct booking/rejection responses; decrease stock only when booked; loop while tickets remain.

**Marking rule:** Six independently assessed algorithm aspects including controlled repetition and no reset of stock.

**Visual/originality/teacher approval:** pending.

#### Slot 2 · RHS-J277-104 · 6 marks

**OCR reference:** OCR J277/02 · June 2023 · Q5(c)

**Question:**

> A museum creates a maths game for visitors. It asks three addition questions. Each uses two random integers from 1 to 10 inclusive. A correct answer earns 1 point; the total score is shown at the end.
> 
> Write an algorithm to play the game. [6]

**Verified answer:**

> Initialise score to 0; produce two fresh random values 1–10; prompt for sum; check answer; add a point if correct; repeat for three questions; show final score.

**Marking rule:** Up to 6 independent logic marks; new random values every time, not fixed sum.

**Visual/originality/teacher approval:** pending.
