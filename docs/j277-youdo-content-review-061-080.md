# J277 You Do — teacher content review, Lessons 061–080

**22 November 2026 · Unpublished draft.** Candidate IDs refer to the actual RHS question bank with verified answers; no question is approved or student-facing. Project Lesson 078 and feedback/assessment Lesson 079 are protected exceptions. Source fallback review still required where four bank questions are unavailable.

| Lesson | Topic | RHS bank IDs selected | Unfilled ordinary slots |
|---|---|---|---:|
| 061 | Debugging and Nested Constructs | RHS-J277-054, RHS-J277-147, RHS-J277-146 | 1 |
| 062 | Programming Challenge and Review | — | 4 |
| 063 | Strings: Concatenation and Slicing | RHS-J277-107, RHS-J277-156, RHS-J277-155 | 1 |
| 064 | Strings and Input Checking | RHS-J277-050, RHS-J277-103, RHS-J277-214 | 1 |
| 065 | One-Dimensional Arrays | — | 4 |
| 066 | Array Traversal and Updates | RHS-J277-093 | 3 |
| 067 | Two-Dimensional Arrays | RHS-J277-115 | 3 |
| 068 | Records and Structured Data | RHS-J277-218 | 3 |
| 069 | Functions and Return Values | RHS-J277-052, RHS-J277-053, RHS-J277-110, RHS-J277-160 | 0 |
| 070 | Procedures and Variable Scope | RHS-J277-220, RHS-J277-221 | 2 |
| 071 | Subprograms and Arrays | — | 4 |
| 072 | File Handling | RHS-J277-113, RHS-J277-209 | 2 |
| 073 | SQL: SELECT, FROM and WHERE | RHS-J277-049, RHS-J277-112, RHS-J277-166, RHS-J277-217 | 0 |
| 074 | Random Number Generation | — | 4 |
| 075 | Validation and Authentication | — | 4 |
| 076 | Defensive Design and Maintainability | RHS-J277-043, RHS-J277-159 | 2 |
| 077 | Testing: Normal, Boundary and Invalid Data | RHS-J277-100, RHS-J277-101, RHS-J277-165, RHS-J277-197 | 0 |
| 078 | Practical Programming Project | — | — |
| 079 | Project Review and Assessment Feedback | — | — |
| 080 | Trace Tables and Algorithm Refinement | — | 4 |

## Exact RHS question wording, answer points and marking rule

### Lesson 061 — Debugging and Nested Constructs

**Specification:** 2.1.2 / 2.2.1. **Lesson source:** `lessons/j277/autumn2-061.json`.


#### Slot 1 · RHS-J277-054 · 2 mark(s)

**Source:** OCR J277/02 · June 2022 · Q5(d)

**RHS-authored question:**

> A guesthouse stores the number of guests in room[0..8]: 2, 1, 3, 2, 1, 0, 0, 4, 1.
> 
> The following algorithm is intended to add the occupants of all rooms but contains two logic errors:
> for count = 1 to 8
>     total = 0
>     total = total + room[count]
> next count
> print(total)
> 
> Describe two precise changes that correct the calculation. [2]

**Verified answer points:**

> Include index 0 in the loop; initialise total to 0 before the loop starts.

**Verified marking rule:** 1 fix per logic error. 'Move total out' alone is too vague; before loop required.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-147 · 4 mark(s)

**Source:** OCR J277/02 · June 2024 · Q3(b)

**RHS-authored question:**

> A sports-centre calculator adds two numbers and should output 'success' when the total is from 10 to 20 inclusive. This program has two logic errors:
> 
> 01 num1 = input('First number')
> 02 num2 = input('Second number')
> 03 total = num1 + num1
> 04 if total >= 10 then
> 05     print('success')
> 06 else
> 07     print('warning')
> 08 endif
> 
> Identify the faulty line numbers and rewrite each line so the program works correctly. [4]

**Verified answer points:**

> Line 03: total = num1 + num2; line 04: if total >= 10 and total <= 20 then.

**Verified marking rule:** 1 for each faulty line identification and 1 for each corresponding fix, maximum 4.

**Artwork / classroom approval:** pending.

#### Slot 3 · RHS-J277-146 · 2 mark(s)

**Source:** OCR J277/02 · June 2024 · Q3(a)

**RHS-authored question:**

> A new programmer working on a booking app makes a syntax error.
> 
> Define a syntax error and provide one example. [2]

**Verified answer points:**

> Syntax error breaks programming language rules and may prevent running/translation; e.g. incorrect keyword spelling or missing bracket.

**Verified marking rule:** 1 accurate definition and 1 unambiguously invalid-code example.

**Artwork / classroom approval:** pending.

### Lesson 062 — Programming Challenge and Review

**Specification:** 2.2.1. **Lesson source:** `lessons/j277/autumn2-062.json`.

**No unused relevant bank question:** inspect original lesson questions and answers for fallbacks.

### Lesson 063 — Strings: Concatenation and Slicing

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-063.json`.


#### Slot 1 · RHS-J277-107 · 1 mark(s)

**Source:** OCR J277/02 · June 2023 · Q6(c)(i)

**RHS-authored question:**

> A theatre alarm system runs this reset algorithm:
> 
> 01 sensorType = input('Sensor type?')
> 02 if CheckSensorCode(sensorType) then
> 03     sensorNumber = input('Sensor number?')
> 04     sensorID = sensorType + sensorNumber
> 05     ResetSensor(sensorID)
> 06 endif
> 
> Give the line number where concatenation takes place. [1]

**Verified answer points:**

> Line 04.

**Verified marking rule:** 1 exact concatenation line.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-156 · 3 mark(s)

**Source:** OCR J277/02 · June 2024 · Q6(b)

**RHS-authored question:**

> A tourist information app needs to build a greeting.
> 
> Write an algorithm that stores 'Hello' in word1 and 'Everyone' in word2, concatenates them without a space and saves the result in message. [3]

**Verified answer points:**

> word1='Hello'; word2='Everyone'; message=word1+word2.

**Verified marking rule:** 3 points: store both inputs in the specified variables, concatenate in order, assign joined result to message.

**Artwork / classroom approval:** pending.

#### Slot 3 · RHS-J277-155 · 3 mark(s)

**Source:** OCR J277/02 · June 2024 · Q6(a)

**RHS-authored question:**

> A game stores message = "abcd1234".
> 
> Determine the results of (a) message.upper, (b) message.left(4), and (c) int(message.right(4)) * 2. [3]

**Verified answer points:**

> ABCD1234; abcd; 2468.

**Verified marking rule:** 1 per correct output, including upper/lower case.

**Artwork / classroom approval:** pending.

### Lesson 064 — Strings and Input Checking

**Specification:** 2.2.3 / 2.3.1. **Lesson source:** `lessons/j277/autumn2-064.json`.


#### Slot 1 · RHS-J277-050 · 5 mark(s)

**Source:** OCR J277/02 · June 2022 · Q5(b)(i)

**RHS-authored question:**

> A guesthouse accepts bookings only when firstName and surname are not empty, room is either basic or premium, and nights is between 1 and 5 inclusive.
> 
> Complete an input-validation algorithm that outputs ALLOWED for a valid booking and NOT ALLOWED otherwise. [5]

**Verified answer points:**

> Validates both names are non-empty, room basic or premium, nights 1–5 inclusive; outputs ALLOWED only when all conditions true, NOT ALLOWED otherwise.

**Verified marking rule:** Five aspects, including both valid/invalid outcomes and appropriate logical operators; Section B requires actual code.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-103 · 6 mark(s)

**Source:** OCR J277/02 · June 2023 · Q5(b)

**RHS-authored question:**

> A maths game asks players three addition questions using random whole numbers from 1 to 10 inclusive.
> 
> Identify two different forms of input validation and explain how they could be applied to the game. [6]

**Verified answer points:**

> Two types, such as range check (whole-number sum must be 2–20) and type check (integer input), or presence check (nonblank answer).

**Verified marking rule:** Per method: 1 name, up to 2 appropriate explanations and application to addition answers. Checks must accept values 2–20.

**Artwork / classroom approval:** pending.

#### Slot 3 · RHS-J277-214 · 6 mark(s)

**Source:** OCR J277/02 · June 2025 · Q5(d)

**RHS-authored question:**

> A cinema asks users to create a PIN stored as a string. It must have exactly 4 characters and must not equal 1234 or 4321. You do not need to check whether the characters are digits.
> 
> Write an algorithm that prints VALID PIN for an acceptable value and INVALID PIN otherwise. [6]

**Verified answer points:**

> Take PIN string input; select/loop; check length exactly 4; reject 1234 and 4321; correctly output INVALID and VALID.

**Verified marking rule:** 6 distinct algorithm features including the input, checks and both exclusive outcomes.

**Artwork / classroom approval:** pending.

### Lesson 065 — One-Dimensional Arrays

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-065.json`.

**No unused relevant bank question:** inspect original lesson questions and answers for fallbacks.

### Lesson 066 — Array Traversal and Updates

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-066.json`.


#### Slot 1 · RHS-J277-093 · 4 mark(s)

**Source:** OCR J277/02 · June 2023 · Q2(b)

**RHS-authored question:**

> A sports club uses scores = [5, 9, 4, 7]. Its algorithm should total every element but has two logic errors:
> 
> 01 total = 0
> 02 for scoreCount = 1 to scores.length - 1
> 03     total = scores[scoreCount]
> 04 next scoreCount
> 05 print(total)
> 
> Identify each faulty line number and write its replacement statement. [4]

**Verified answer points:**

> Correct loop index to include scores[0]; change total calculation to add scores[scoreCount] to running total.

**Verified marking rule:** 2 correct faulty line identifications and 2 matching corrections; must provide source code with line numbers.

**Artwork / classroom approval:** pending.

### Lesson 067 — Two-Dimensional Arrays

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-067.json`.


#### Slot 1 · RHS-J277-115 · 6 mark(s)

**Source:** OCR J277/02 · June 2023 · Q6(f)(ii)

**RHS-authored question:**

> A warehouse stores seven sensor records, indexed 0 to 6, in arrayEvents. The four columns are Date (index 0), SensorID (1), SensorType (2) and Length (3). Each Length entry is stored as an integer count of seconds.
> 
> Write an algorithm that asks the user for a date, finds all matching records, totals their active seconds and displays the chosen date and calculated total. [6]

**Verified answer points:**

> Input date; inspect all 7 events (indices 0..6); compare each event's date; if matching, add length to total; output total and date.

**Verified marking rule:** 6 points: input, traversal, conditional, compare, accumulate, correct output. Include all seven records/indices.

**Artwork / classroom approval:** pending.

### Lesson 068 — Records and Structured Data

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-068.json`.


#### Slot 1 · RHS-J277-218 · 1 mark(s)

**Source:** OCR J277/02 · June 2025 · Q6(b)(ii)

**RHS-authored question:**

> A theatre has a database table TblMusic with the fields ActID, Stage, Day and SetLength.
> 
> Identify one complete record from this example table: (1, Platinum, Saturday, 0.5); (2, Hills, Saturday, 1.5); (3, Triangle, Sunday, 1.0); (4, Platinum, Sunday, 0.5). [1]

**Verified answer points:**

> Any complete four-field row, e.g. (1, Platinum, Saturday, 0.5).

**Verified marking rule:** 1 complete row with four values; a field name or definition alone not sufficient.

**Artwork / classroom approval:** pending.

### Lesson 069 — Functions and Return Values

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-069.json`.


#### Slot 1 · RHS-J277-052 · 4 mark(s)

**Source:** OCR J277/02 · June 2022 · Q5(c)(i)

**RHS-authored question:**

> A guesthouse charges £60 a night for a basic room or £80 for a premium room.
> 
> Write a function newPrice(nights, room) that calculates and returns the full booking price. [4]

**Verified answer points:**

> function newPrice(nights,room): calculate nights*60 or nights*80 based on type; return price.

**Verified marking rule:** 1 function header, 1 two parameters, 1 correct pricing calculation, 1 return.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-053 · 3 mark(s)

**Source:** OCR J277/02 · June 2022 · Q5(c)(ii)

**RHS-authored question:**

> A guesthouse uses a function called newPrice(nights, room).
> 
> Write code that calls the function for a premium room booked for 5 nights and outputs its returned price. [3]

**Verified answer points:**

> print(newPrice(5,'premium')) or equivalent assignment followed by print.

**Verified marking rule:** 1 call, 1 correct arguments, 1 output result.

**Artwork / classroom approval:** pending.

#### Slot 3 · RHS-J277-110 · 1 mark(s)

**Source:** OCR J277/02 · June 2023 · Q6(c)(iv)

**RHS-authored question:**

> A theatre alarm system runs this reset algorithm:
> 
> 01 sensorType = input('Sensor type?')
> 02 if CheckSensorCode(sensorType) then
> 03     sensorNumber = input('Sensor number?')
> 04     sensorID = sensorType + sensorNumber
> 05     ResetSensor(sensorID)
> 06 endif
> 
> Give the line number containing a function call. [1]

**Verified answer points:**

> Line 02.

**Verified marking rule:** 1 correct function-call line from RHS six-line program.

**Artwork / classroom approval:** pending.

#### Slot 4 · RHS-J277-160 · 6 mark(s)

**Source:** OCR J277/02 · June 2024 · Q8(b)

**RHS-authored question:**

> A puzzle game stores an integer position between 1 and 512 inclusive. Moving left subtracts 5 and moving right adds 5; values outside the range must be set to the nearest boundary.
> 
> Complete moveCharacter(direction, position) so it updates the position and returns a valid result. [6]

**Verified answer points:**

> Using direction and position parameters; valid selection; left subtracts 5; right adds 5; clamp result 1..512 after changing; return updated value.

**Verified marking rule:** 1 per algorithm feature, maximum 6. Bound checking must follow movement.

**Artwork / classroom approval:** pending.

### Lesson 070 — Procedures and Variable Scope

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-070.json`.


#### Slot 1 · RHS-J277-220 · 4 mark(s)

**Source:** OCR J277/02 · June 2025 · Q6(c)(i)

**RHS-authored question:**

> A theatre sells tickets at £60 each.
> 
> Write a function calculatePrice(quantity) that receives the number of tickets, calculates the total and returns it. [4]

**Verified answer points:**

> Define calculatePrice with quantity parameter; calculate quantity * 60; return result.

**Verified marking rule:** 1 function definition + 1 parameter + 1 multiplication + 1 return; printing is not a return.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-221 · 2 mark(s)

**Source:** OCR J277/02 · June 2025 · Q6(c)(ii)

**RHS-authored question:**

> A theatre uses the function calculatePrice(quantity) to find ticket costs.
> 
> Write code that passes 3 to calculatePrice() and stores its returned value in totalPrice. [2]

**Verified answer points:**

> totalPrice = calculatePrice(3)

**Verified marking rule:** 1 valid call with argument 3, 1 assignment of returned result to totalPrice.

**Artwork / classroom approval:** pending.

### Lesson 071 — Subprograms and Arrays

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-071.json`.

**No unused relevant bank question:** inspect original lesson questions and answers for fallbacks.

### Lesson 072 — File Handling

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-072.json`.


#### Slot 1 · RHS-J277-113 · 6 mark(s)

**Source:** OCR J277/02 · June 2023 · Q6(e)

**RHS-authored question:**

> A warehouse security system exports its sensor activity to a text file.
> 
> Write a procedure SaveLogs(data, filename) that takes the text to be saved and the target file name as parameters and writes the data to the file. [6]

**Verified answer points:**

> Define SaveLogs(data,filename); open passed filename for writing; write passed data; close file.

**Verified marking rule:** 6 marks: procedure definition, two params, opening file, filename used, write, data used, close; OCR uses 6 total so credit the independent features within cap.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-209 · 5 mark(s)

**Source:** OCR J277/02 · June 2025 · Q4(a)

**RHS-authored question:**

> A museum reads integers stored as lines in data.txt. It displays every value except zero.
> 
> Complete the five blanks using terms from this bank: data, for, if, myFile.close(), myFile.readLine(), input(), open, print, temp, txt, x.
> 
> myFile = ____('data.txt')
> while NOT myFile.endOfFile()
>     temp = ____
>     if int(____) != 0 then
>         ____(temp)
>     endif
> endwhile
> ____
> 
> [5]

**Verified answer points:**

> open; myFile.readLine(); temp; print; myFile.close().

**Verified marking rule:** Five missing statements, one mark each; RHS stem must include the incomplete code and full word bank.

**Artwork / classroom approval:** pending.

### Lesson 073 — SQL: SELECT, FROM and WHERE

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-073.json`.


#### Slot 1 · RHS-J277-049 · 4 mark(s)

**Source:** OCR J277/02 · June 2022 · Q5(a)(iii)

**RHS-authored question:**

> A guesthouse keeps booking records in TblBookings. The fields include FirstName, Surname, Nights, Room and StayComplete.
> 
> The following SQL is faulty:
> SELECT ALL
> FROM TblBookings
> IF Nights < 1
> 
> Rewrite it so ALL booking fields are returned for stays longer than one night. [4]

**Verified answer points:**

> SELECT * FROM TblBookings WHERE Nights > 1.

**Verified marking rule:** Four SQL parts: select all fields, correct table, WHERE, >1; wrong table/keyword/operator affects marks.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-112 · 3 mark(s)

**Source:** OCR J277/02 · June 2023 · Q6(d)

**RHS-authored question:**

> A warehouse records sensor activations in a database table called events with fields Date, SensorID, SensorType and Length.
> 
> Write SQL that displays SensorID for Door records with a Length greater than 20 seconds. [3]

**Verified answer points:**

> SELECT SensorID FROM events WHERE SensorType = 'Door' AND Length > 20.

**Verified marking rule:** 3 marks: SELECT correct field; FROM correct table; WHERE with both criteria and correct logical AND.

**Artwork / classroom approval:** pending.

#### Slot 3 · RHS-J277-166 · 4 mark(s)

**Source:** OCR J277/02 · June 2024 · Q9(d)

**RHS-authored question:**

> A school athletics department stores results in TblResult, fields StudentID, YearGroup, TeamName and Time. Complete the four missing SQL parts so StudentID and TeamName are returned for YearGroup 11:
> 
> SELECT StudentID, ____
> FROM ____
> ____ ____
> 
> [4]

**Verified answer points:**

> SELECT StudentID, TeamName FROM TblResult WHERE YearGroup = 11.

**Verified marking rule:** 4 missing parts in source-form SQL: TeamName, TblResult, WHERE, YearGroup=11.

**Artwork / classroom approval:** pending.

#### Slot 4 · RHS-J277-217 · 4 mark(s)

**Source:** OCR J277/02 · June 2025 · Q6(b)(i)

**RHS-authored question:**

> A theatre stores performance details in a database table TblMusic, with fields ActID, Stage, Day and SetLength. The intended query should show ActID and Stage for Saturday performances.
> 
> Correct this faulty SQL: SELECT ActID AND Stage / FROM TblActs / IF Day = Saturday. [4]

**Verified answer points:**

> SELECT ActID, Stage; FROM TblMusic; WHERE Day = 'Saturday'.

**Verified marking rule:** Four corrections: comma, table name, WHERE keyword, quoted Saturday.

**Artwork / classroom approval:** pending.

### Lesson 074 — Random Number Generation

**Specification:** 2.2.3. **Lesson source:** `lessons/j277/autumn2-074.json`.

**No unused relevant bank question:** inspect original lesson questions and answers for fallbacks.

### Lesson 075 — Validation and Authentication

**Specification:** 2.3.1. **Lesson source:** `lessons/j277/autumn2-075.json`.

**No unused relevant bank question:** inspect original lesson questions and answers for fallbacks.

### Lesson 076 — Defensive Design and Maintainability

**Specification:** 2.3.1. **Lesson source:** `lessons/j277/autumn2-076.json`.


#### Slot 1 · RHS-J277-043 · 2 mark(s)

**Source:** OCR J277/02 · June 2022 · Q4(a)

**RHS-authored question:**

> A theatre inherits a difficult-to-read booking program.
> 
> Suggest two changes that would make the program easier to maintain. [2]

**Verified answer points:**

> Use explanatory comments, meaningful variable names, a refactored subroutine or a loop replacing repeated statements.

**Verified marking rule:** Any two distinct practical maintainability improvements.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-159 · 4 mark(s)

**Source:** OCR J277/02 · June 2024 · Q8(a)

**RHS-authored question:**

> A puzzle game starts with the following program. The character position must be between 1 and 512 and the player enters left or right:
> 
> p = random(1,512)
> print('Position',p)
> a = ''
> while a != 'left' and a != 'right'
>     a = input('Direction?')
> endwhile
> 
> Describe TWO ways to improve the maintainability of this code. For each, explain why it helps a future programmer. [4]

**Verified answer points:**

> Meaningful names (e.g. position/direction rather than p/a) explained; appropriate comments; subroutine/constant to make updates local and improve reuse.

**Verified marking rule:** Up to two developed improvements, 2 marks each; a name or idea alone gets 1 only.

**Artwork / classroom approval:** pending.

### Lesson 077 — Testing: Normal, Boundary and Invalid Data

**Specification:** 2.3.2. **Lesson source:** `lessons/j277/autumn2-077.json`.


#### Slot 1 · RHS-J277-100 · 2 mark(s)

**Source:** OCR J277/02 · June 2023 · Q5(a)(i)

**RHS-authored question:**

> A trainee designs a maths quiz for a primary school.
> 
> Explain why its program should be tested before being used by pupils. [2]

**Verified answer points:**

> Identify bugs/errors, check expected results and user requirements, improve reliability/usability before release.

**Verified marking rule:** 2 different purposes, one each.

**Artwork / classroom approval:** pending.

#### Slot 2 · RHS-J277-101 · 2 mark(s)

**Source:** OCR J277/02 · June 2023 · Q5(a)(ii)

**RHS-authored question:**

> A sports quiz is about to be released.
> 
> Name one software testing method and describe how it would be used on the program. [2]

**Verified answer points:**

> Iterative testing during development on modules, or final testing of completed product, or normal/boundary/invalid input tests.

**Verified marking rule:** 1 correctly named testing method + 1 accurate description. Validation methods alone not equivalent to a testing method.

**Artwork / classroom approval:** pending.

#### Slot 3 · RHS-J277-165 · 3 mark(s)

**Source:** OCR J277/02 · June 2024 · Q9(c)(ii)

**RHS-authored question:**

> A sports centre accepts high-jump measurements from 40.0 to 180.0 cm inclusive.
> 
> Provide three test values for its validation routine: one normal, one boundary and one erroneous value, with the expected result of each. [3]

**Verified answer points:**

> Normal e.g. 100 → VALID; boundary 40 or 180 → VALID; erroneous 39 or 181 → NOT VALID.

**Verified marking rule:** One numeric input value for each category; do not just describe tests.

**Artwork / classroom approval:** pending.

#### Slot 4 · RHS-J277-197 · 4 mark(s)

**Source:** OCR J277/02 · June 2025 · Q1(a)

**RHS-authored question:**

> A gym app accepts whole-number inputs from 1 to 100 inclusive.
> 
> Classify each test input as normal, boundary and/or erroneous: 27; "Hello"; 105; 100. [4]

**Verified answer points:**

> 27 normal; Hello invalid; 105 invalid; 100 boundary (normal also acceptable).

**Verified marking rule:** 1 for each row, max 4.

**Artwork / classroom approval:** pending.

### Lesson 078 — Practical Programming Project

**Specification:** 2.2 / 2.3. **Lesson source:** `lessons/j277/autumn2-078.json`.

**Protected lesson:** preserve original project/feedback material; no bank substitution.

### Lesson 079 — Project Review and Assessment Feedback

**Specification:** 2.2 / 2.3. **Lesson source:** `lessons/j277/autumn2-079.json`.

**Protected lesson:** preserve original project/feedback material; no bank substitution.

### Lesson 080 — Trace Tables and Algorithm Refinement

**Specification:** 2.1.2. **Lesson source:** `lessons/j277/autumn2-080.json`.

**No unused relevant bank question:** inspect original lesson questions and answers for fallbacks.
