# J277 You Do — content review, Lessons 001–020

**Status:** Source-derived, unpublished teacher-review copy · **22 November 2026**.

**What this is:** Four proposed exam-question slots per ordinary lesson, each linked to the exact RHS-authored GitHub question and its independently verified RHS answer points. The 164-lesson mapping JSON is the canonical set of IDs. This document is a human-readable snapshot for content approval, not a separate live question source.

**What this is not:** Nothing below has been enabled as a live exam-bank override; the question drafts still require final originality, suitability, numerical/visual QA and teacher approval. Do not transfer any values to SVGs without verifying question-to-diagram agreement.

The agreed student-facing You Do is: Code First → repeat Code First question and give its answer → four exam questions on one screen → four separate answer pages. No changes to other lesson phases.

## Batch at a glance

| Lesson | Actual lesson topic | RHS bank candidates | Existing lesson fallbacks | Status |
|---|---|---:|---:|---|
| 001 | Binary and Denary | 4 | 0 | Review candidate set |
| 002 | Binary Addition and Shifts | 4 | 0 | Review candidate set |
| 003 | Hexadecimal | 4 | 0 | Review candidate set |
| 004 | Characters, ASCII, Unicode and Data Units | 4 | 0 | Review candidate set |
| 005 | Images, Pixels, Colour Depth and File Sizes | 4 | 0 | Review candidate set |
| 006 | Sound, Sampling, Bit Depth and File Sizes | 4 | 0 | Review candidate set |
| 007 | Compression and Storage Calculations | 4 | 0 | Review candidate set |
| 008 | Primary Storage: RAM, ROM and Cache | 4 | 0 | Review candidate set |
| 009 | Secondary Storage and Device Choice | 4 | 0 | Review candidate set |
| 010 | CPU Architecture, Registers and Fetch–Execute Cycle | 4 | 0 | Review candidate set |
| 011 | CPU Performance: Clock Speed, Cache and Cores | 1 | 3 | Needs bank coverage |
| 012 | Computational Thinking — ADA | 4 | 0 | Review candidate set |
| 013 | Flowcharts, Pseudocode and Programming Constructs | 4 | 0 | Review candidate set |
| 014 | Linear Search and Algorithm Tracing | 4 | 0 | Review candidate set |
| 015 | Bubble Sort and Insertion Sort | 4 | 0 | Review candidate set |
| 016 | Variables, Input, Output and One-Dimensional Arrays | 3 | 1 | Needs bank coverage |
| 017 | Defensive Design, Validation and Testing | 4 | 0 | Review candidate set |
| 018 | Autumn 1 AP1 Assessment and Review | 0 | 0 | AP1 assessment — preserve original |
| 019 | Sequence, Input and Output | 4 | 0 | Review candidate set |
| 020 | Variables, Assignment and Data Types | 4 | 0 | Review candidate set |

## Questions and verified marking guidance

### Lesson 001 — Binary and Denary

- **Specification:** 1.2.4
- **Source:** `lessons/j277/lesson-001/index.html`

#### Q1

**RHS-J277-002** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q1(b)

**RHS question draft:**

> A music studio stores a track identifier as the denary number 221.
>  
> Convert 221 into an 8-bit binary value. Show your working. [2]

**Verified answer points:**

> 11011101

**Marking rule:** 1 working mark for a valid conversion method; 1 answer mark.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-005** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q1(e)

**RHS question draft:**

> A digital wristband uses 4 bits for its status code.
>  
> State how many different codes are possible. [1]

**Verified answer points:**

> 16

**Marking rule:** 1 correct answer.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-116** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q1(a)

**RHS question draft:**

> An art studio stores three design codes.
>  
> Complete these conversions: (a) binary 11110000 into denary; (b) denary 105 into 8-bit binary; (c) binary 00011110 into denary. [3]

**Verified answer points:**

> 240; 01101001; 30.

**Marking rule:** 1 per correct conversion; all binary outputs eight bits.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-117** · 4 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q1(b)

**RHS question draft:**

> A digital museum is planning how many different values it can encode.
>  
> Calculate: (a) the smallest unsigned value using 4 bits; (b) the greatest unsigned value using 6 bits; (c) the number of colours possible using 7 bits; (d) the fewest bits needed for 150 different characters. [4]

**Verified answer points:**

> 0; 63; 128; 8.

**Marking rule:** 1 per correct value.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 002 — Binary Addition and Shifts

- **Specification:** 1.2.4
- **Source:** `lessons/j277/lesson-002/index.html`

#### Q1

**RHS-J277-060** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q1(e)

**RHS question draft:**

> A digital camera adds two binary counters.
>  
> Calculate 01110001 + 10011110 using 8-bit binary addition. Show your working. [2]

**Verified answer points:**

> 00001111, with appropriate carries; any overflow is discarded in the 8-bit result.

**Marking rule:** 1 correct answer, 1 correctly indicated carrying; ordinary denary conversion alone does not get working mark.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-120** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q1(e)

**RHS question draft:**

> A ticket scanner adds two binary counters.
>  
> Work out 01101011 + 00001111 using 8-bit binary addition. Show the calculation. [2]

**Verified answer points:**

> 01111010.

**Marking rule:** 1 for working using appropriate binary carries; 1 for correct result.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-061** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q1(f)

**RHS question draft:**

> A security system changes an 8-bit value from 10110000 to 10000000.
>  
> Identify the direction and number of places of the binary shift. [2]

**Verified answer points:**

> Left shift, three places.

**Marking rule:** 1 direction and 1 shift amount.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-118** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q1(c)

**RHS question draft:**

> A games console stores the 8-bit number 00001111.
>  
> Write the result of shifting this value four positions left, keeping an 8-bit result. [1]

**Verified answer points:**

> 11110000.

**Marking rule:** 1 correct binary result.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 003 — Hexadecimal

- **Specification:** 1.2.4
- **Source:** `lessons/j277/lesson-003.html + lessons/j277/h446-adapter.js`

#### Q1

**RHS-J277-003** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q1(c)

**RHS question draft:**

> A warehouse barcode contains the hexadecimal value 2F.
>  
> Calculate its denary equivalent, showing the method. [2]

**Verified answer points:**

> 47

**Marking rule:** 1 method mark (e.g. 2 × 16 + 15); 1 final answer mark.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-004** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q1(d)

**RHS question draft:**

> A museum stores the 8-bit binary value 10110000 in a digital record.
>  
> Express this value in hexadecimal. [1]

**Verified answer points:**

> B0

**Marking rule:** 1 correct answer.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-119** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q1(d)

**RHS question draft:**

> A warehouse tracks goods using two-digit hexadecimal codes.
>  
> Describe a method for converting any two-digit hexadecimal value into denary. Include a worked example. [3]

**Verified answer points:**

> For a two-digit hexadecimal number, multiply the left digit's value by 16 and add the right digit's value; e.g. 2F is 2×16+15=47.

**Marking rule:** 1 correct worked example, 1 mark each for two accurate conversion steps.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-190** · 4 mark(s) · OCR source reference: OCR J277/01 · June 2025 · Q5(b)

**RHS question draft:**

> A science museum stores four reference numbers. Complete the missing values in the denary | 8-bit binary | two-digit hexadecimal table:
> (1) 38 | ___ | 26
> (2) ___ | 01001110 | 4E
> (3) 156 | 10011100 | ___
> (4) 215 | ___ | D7. [4]

**Verified answer points:**

> (1) 00100110; (2) 78; (3) 9C; (4) 11010111.

**Marking rule:** 1 per missing conversion, max 4; binary entries must have eight digits.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 004 — Characters, ASCII, Unicode and Data Units

- **Specification:** 1.2.3 / 1.2.4b
- **Source:** `lessons/j277/autumn1-004-008.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-021** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q6(b)(i)

**RHS question draft:**

> A museum archives exhibit labels with ASCII characters. The consecutive codes include M = 77, N = 78, O = 79, P = 80 and Q = 81.
>  
> Which letter is represented by decimal ASCII code 84? [1]

**Verified answer points:**

> T

**Marking rule:** Case sensitive; 1 mark.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-022** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q6(b)(ii)

**RHS question draft:**

> A publishing company currently uses ASCII to store characters.
>  
> Name another character-encoding system it could use. [1]

**Verified answer points:**

> Unicode (or another valid character set).

**Marking rule:** 1 correct alternative.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-195** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2025 · Q6(b)

**RHS question draft:**

> A school is choosing between ASCII and Unicode for a new computer system.
>  
> Identify one advantage and one disadvantage of using Unicode instead of ASCII. [2]

**Verified answer points:**

> Unicode represents more scripts/characters or emoji; disadvantage may be larger storage or non-ASCII legacy compatibility.

**Marking rule:** 1 relevant benefit and 1 relevant drawback.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-058** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q1(c)

**RHS question draft:**

> A media company compares four backup sizes.
>  
> Select the greatest capacity: 2,000,000 bytes; 2,300 KB; 200 MB; 0.1 GB. [1]

**Verified answer points:**

> 200 MB.

**Marking rule:** 1 correct largest option only.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 005 — Images, Pixels, Colour Depth and File Sizes

- **Specification:** 1.2.3 / 1.2.4c
- **Source:** `lessons/j277/autumn1-004-008.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-171** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2025 · Q1(b)(i)

**RHS question draft:**

> A digital artist is designing a bitmap image.
>  
> Define the term pixel. [1]

**Verified answer points:**

> A pixel is one picture element, usually a single-colour dot/square in a digital image.

**Marking rule:** One accurate definition.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-069** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q3(b)(ii)

**RHS question draft:**

> A museum display uses a 3-column by 4-row bitmap. Each colour has a 4-bit code: red 0000, green 0010, blue 1000, purple 0110. Pixels are stored from left to right, top to bottom.
>  
> Use this stream of 48 bits to fill the 3 × 4 grid in row order:
> 000000000110 100000101000 011001100110 000000101000
>  
> Write the colour name inside each cell. [2]

**Verified answer points:**

> Row 1: red red purple. Row 2: blue green blue. Row 3: purple purple purple. Row 4: red green blue.

**Marking rule:** 1 for all 3 first-row colours; 1 for remaining 9 colours in sequence.

**Candidate question SVG:** `assets/j277/exam-figures/bitmap-grid-question.svg` — visual QA pending.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q3

**RHS-J277-070** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q3(b)(iii)

**RHS question draft:**

> An art gallery stores image colours using 4 bits per pixel.
>  
> State the maximum number of distinct colours that can be represented. [1]

**Verified answer points:**

> 16 colours (2^4).

**Marking rule:** 1 correct number.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-172** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2025 · Q1(b)(ii)

**RHS question draft:**

> An animation company has 10 uncompressed bitmap images. Each is 800 × 500 pixels with an 8-bit colour depth.
>  
> Calculate the combined size of all 10 images in kilobytes. Show your working. [2]

**Verified answer points:**

> 4,000 kilobytes (4,000,000 bytes): 800×500×10×8 bits, then divide by 8 and 1000.

**Marking rule:** 1 for a valid calculation step; 1 final answer. OCR also accepts 3906.25 KB if using 1024 conversion.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 006 — Sound, Sampling, Bit Depth and File Sizes

- **Specification:** 1.2.3 / 1.2.4d
- **Source:** `lessons/j277/autumn1-004-008.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-131** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q5(a)(i)

**RHS question draft:**

> A sound engineer is digitising a voice recording.
>  
> Choose the correct description of sampling: A. Measuring pitch only once. B. Measuring the analogue signal's amplitude at regular intervals. C. Measuring a digital waveform before recording. D. Dividing audio into equal-length songs. [1]

**Verified answer points:**

> B: sampling measures analogue amplitude at regular intervals.

**Marking rule:** One correct option only.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-019** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q6(a)(i)

**RHS question draft:**

> A podcast producer records interviews using a microphone.
>  
> Describe how the analogue sound signal is turned into a digital recording. [3]

**Verified answer points:**

> Sample analogue signal amplitude at regular intervals; encode measured amplitudes as binary values stored in order.

**Marking rule:** Up to 3 distinct stages. Measuring frequency instead of amplitude is not creditworthy.

**Visual candidate:** existing lesson `lessons/j277/autumn1-004-008.json`; do not reuse without checking question values.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-132** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q5(a)(ii)

**RHS question draft:**

> A podcast producer plans to increase the bit depth of a digital recording.
>  
> Explain how this change can affect the audio file. [2]

**Verified answer points:**

> More bits per sample; file size rises; each amplitude is represented more precisely; potential sound-quality improvement.

**Marking rule:** Two independent correctly developed impacts of altered bit depth.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-020** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q6(a)(ii)

**RHS question draft:**

> A radio station changes a recording. For each change, select every effect that applies from: file size increases, file size decreases, accuracy increases, accuracy decreases.
>  
> (a) Duration increases from 10 to 20 minutes. (b) Sample rate falls from 44 kHz to 8 kHz. (c) Bit depth rises from 8 to 16 bits. [3]

**Verified answer points:**

> Longer duration → larger file; lower sampling rate → smaller file and reduced accuracy; higher bit depth → larger file and greater accuracy.

**Marking rule:** 1 correct selection per row (potentially multiple effects in a row). RHS draft needs a clear multi-select answer table.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

---

### Lesson 007 — Compression and Storage Calculations

- **Specification:** 1.2.3 / 1.2.5
- **Source:** `lessons/j277/autumn1-004-008.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-024** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q6(d)(i)

**RHS question draft:**

> An architect emails a set of design files to a client.
>  
> Give two benefits of compressing the files first. [2]

**Verified answer points:**

> Reduced file size, faster transmission, less storage, bandwidth or mobile data needed.

**Marking rule:** 1 per separate benefit, max 2.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-025** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q6(d)(ii)

**RHS question draft:**

> An architect needs to send both photographs and editable text documents.
>  
> Explain why lossy compression may be unsuitable for some of these files. [2]

**Verified answer points:**

> Lossy compression permanently discards some data; text documents must be preserved exactly and may be damaged/lose information.

**Marking rule:** 1 for information loss; 1 for why some original files, especially text, require lossless preservation.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-072** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q3(c)(i)

**RHS question draft:**

> A law firm needs to compress a text document while retaining the exact original text.
>  
> Identify the most appropriate compression approach and justify the choice. [3]

**Verified answer points:**

> Lossless; preserves all data perfectly for reconstruction; text requires exact characters/formatting for legibility and accuracy.

**Marking rule:** 1 lossless selection; up to 2 relevant justification points.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-073** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q3(c)(ii)

**RHS question draft:**

> A design company wants to reduce the size of a photographic image as much as possible for a website.
>  
> Identify a suitable compression approach and justify your decision. [3]

**Verified answer points:**

> Lossy; much greater file-size reduction; removes detail often imperceptible to user.

**Marking rule:** 1 lossless/lossy approach? Preferred lossy: 1 for lossy, up to 2 relevant justification; OCR permits credible lossless choice with followed-through justifications.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 008 — Primary Storage: RAM, ROM and Cache

- **Specification:** 1.2.1
- **Source:** `lessons/j277/autumn1-004-008.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-026** · 1 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q7(a)(i)

**RHS question draft:**

> A large digital information display at an airport uses both RAM and ROM.
>  
> State one difference between RAM and ROM. [1]

**Verified answer points:**

> RAM volatile and typically changeable; ROM non-volatile and generally fixed.

**Marking rule:** 1 accurate contrast.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q2

**RHS-J277-027** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q7(a)(ii)

**RHS question draft:**

> An airport information display plays announcements and shows travel videos.
>  
> Give two examples of data it could hold in RAM while operating. [2]

**Verified answer points:**

> Currently running app/part of OS, buffered/downloaded sound, current volume/input setting or a current process value.

**Marking rule:** 1 per specific example of working data in RAM, max 2.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q3

**RHS-J277-141** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q7(b)(i)

**RHS question draft:**

> A delivery vehicle uses ROM in its automatic distance-control system.
>  
> State two examples of information that could be held in ROM. [2]

**Verified answer points:**

> Start-up/firmware instructions; limits such as safe following distance or maximum operating speed.

**Marking rule:** 1 per distinct plausible permanent instruction/data item.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-142** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q7(b)(ii)

**RHS question draft:**

> A delivery vehicle's automatic distance-control system stores live information in RAM.
>  
> State three examples of data that could be stored there while the system is operating. [3]

**Verified answer points:**

> Current gap to leading vehicle; desired gap; vehicle speed; target vehicle speed; live sensor reading or driver control input.

**Marking rule:** 1 per distinct appropriately contextual RAM data item.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 009 — Secondary Storage and Device Choice

- **Specification:** 1.2.2
- **Source:** `lessons/j277/autumn1-009-013.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-028** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q7(b)(i)

**RHS question draft:**

> An airport information display also contains secondary storage.
>  
> Explain why it requires secondary storage, using an appropriate example. [2]

**Verified answer points:**

> Installed software/operating system, recorded media or user settings survive power-off.

**Marking rule:** 1 suitable example plus 1 reason referring to non-volatile storage.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q2

**RHS-J277-029** · 4 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q7(b)(ii)

**RHS question draft:**

> An airport is fitting a large information display with permanent storage for software, videos and settings.
>  
> Identify one appropriate secondary storage type and justify why it suits the display. [4]

**Verified answer points:**

> Magnetic or solid state; provide 3 relevant reasons linked to the selected technology.

**Marking rule:** 1 suitable type plus up to 3 justified characteristics. RHS 'smart speaker' makes some magnetic-storage arguments inappropriate; alter scenario to large fixed smart display.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q3

**RHS-J277-077** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2023 · Q5(a)(ii)

**RHS question draft:**

> A film editor needs to save project files after switching off the computer.
>  
> Name a suitable secondary storage device and give an example of the data stored on it. [2]

**Verified answer points:**

> SSD/hard drive/USB storage/CD/DVD etc, with saved film files/projects or application data.

**Marking rule:** 1 named physical secondary storage device, 1 appropriate saved data example. General type 'magnetic' alone not enough.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-133** · 4 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q5(b)(i)

**RHS question draft:**

> A music producer needs more secondary storage for a studio computer.
>  
> Recommend magnetic or solid-state storage and justify the recommendation. [4]

**Verified answer points:**

> Magnetic: cost per capacity, high storage capacity. Solid-state: low noise, speed, portable/durable, power use, capacity.

**Marking rule:** Up to FOUR justified points related to the selected type, no mark for just choosing magnetic/solid-state.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 010 — CPU Architecture, Registers and Fetch–Execute Cycle

- **Specification:** 1.1.1
- **Source:** `lessons/j277/autumn1-009-013.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-007** · 4 mark(s) · OCR source reference: OCR J277/01 · June 2022 · Q2

**RHS question draft:**

> A computer in a design office uses several CPU components and registers.
>  
> Complete four missing entries in this table: (a) ___ stores the address of the next instruction; (b) the role of the Control Unit is ___; (c) ___ stores the address of a location in main memory; (d) ___ performs arithmetic and logical operations. [4]

**Verified answer points:**

> PC; CU coordinates/control or decodes instructions; MAR; ALU.

**Marking rule:** 1 mark each for the four missing table entries; current RHS question incorrectly supplies the names.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q2

**RHS-J277-137** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q6(a)

**RHS question draft:**

> A hospital workstation executes instructions using its CPU.
>  
> Describe the main stages of the fetch-execute cycle. [2]

**Verified answer points:**

> Fetch data/instruction from RAM; place in appropriate registers; decode; execute using CPU/ALU.

**Marking rule:** Up to 2 distinct accurate FDE cycle stages.

**Visual candidate:** existing lesson `lessons/j277/autumn1-009-013.json`; do not reuse without checking question values.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-138** · 4 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q6(b)

**RHS question draft:**

> A library computer uses internal CPU registers during instruction processing.
>  
> Name two registers used in the fetch-execute cycle and describe the purpose of each. [4]

**Verified answer points:**

> Two paired register examples e.g. PC/next-instruction address; MAR/memory address; MDR/data fetched; accumulator/ALU result.

**Marking rule:** One named register plus one matching purpose, twice; 4 total.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-196** · 2 mark(s) · OCR source reference: OCR J277/01 · June 2025 · Q6(c)

**RHS question draft:**

> A school computer's CPU contains several registers.
>  
> Name two different registers and state what each does. [2]

**Verified answer points:**

> Any two distinct pairs: PC—next instruction address; MAR—memory address; MDR—data being moved; accumulator—intermediate ALU result.

**Marking rule:** 1 per correct named register WITH its matching purpose; 2 max.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 011 — CPU Performance: Clock Speed, Cache and Cores

- **Specification:** 1.1.2
- **Source:** `lessons/j277/autumn1-009-013.json`
- **Coverage:** Only 1 directly appropriate, separately verified RHS bank part(s) available for this lesson. 3 existing authored question(s) retained as proposals. Do not invent new bank questions.

#### Q1

**RHS-J277-139** · 3 mark(s) · OCR source reference: OCR J277/01 · June 2024 · Q6(c)

**RHS question draft:**

> A computer shop is comparing the performance of two processors.
>  
> State three CPU characteristics that can influence processing performance. [3]

**Verified answer points:**

> Clock speed; cache size; number of cores.

**Marking rule:** 1 per precise CPU characteristic, not vague 'speed' or 'cores'.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2 — existing lesson fallback

**Existing source:** `lessons/j277/autumn1-009-013.json` · existing exam question #1

**Existing question (unchanged):**

> State two characteristics affecting CPU performance. [2 marks]

**Existing answer (unchanged):**

> Any two from clock speed, cache size, number of cores [1 each].

**Approval:** retain as a proposed fallback until additional appropriate RHS question-bank coverage exists.

#### Q3 — existing lesson fallback

**Existing source:** `lessons/j277/autumn1-009-013.json` · existing exam question #2

**Existing question (unchanged):**

> Explain how a larger cache may improve performance. [2 marks]

**Existing answer (unchanged):**

> Holds frequently used data/instructions near CPU [1], reducing slower RAM accesses [1].

**Approval:** retain as a proposed fallback until additional appropriate RHS question-bank coverage exists.

#### Q4 — existing lesson fallback

**Existing source:** `lessons/j277/autumn1-009-013.json` · existing exam question #3

**Existing question (unchanged):**

> Two CPUs both run at 2 GHz but one has twice as many cores. Explain why it may not always finish a task faster. [4 marks]

**Existing answer (unchanged):**

> More parallel capacity [1]; only when software uses multiple threads [1]; single-threaded code cannot fully use extra cores [1]; other factors such as cache and architecture matter [1].

**Approval:** retain as a proposed fallback until additional appropriate RHS question-bank coverage exists.

---

### Lesson 012 — Computational Thinking — ADA

- **Specification:** 2.1.1 / 2.1.2
- **Source:** `lessons/j277/autumn1-009-013.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-032** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q1(c)

**RHS question draft:**

> A travel-booking app must solve a complex problem by splitting it into smaller tasks and ignoring unnecessary detail.
>  
> Name the two computational thinking techniques used. [2]

**Verified answer points:**

> Decomposition; abstraction.

**Marking rule:** 1 mark for each technique.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-167** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2024 · Q9(e)(i)

**RHS question draft:**

> A school sports festival has software for team scoring and results.
>  
> Identify one way the programmers might use abstraction in its design. [1]

**Verified answer points:**

> Ignore irrelevant student details (e.g. eye colour/favourite food); retain relevant team/year/event data.

**Marking rule:** 1 concrete simplification tied to sports festival; generic definition not enough.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-168** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2024 · Q9(e)(ii)

**RHS question draft:**

> A school sports festival has software for registration, event scores and winning teams.
>  
> Identify one way decomposition could be used to design the program. [1]

**Verified answer points:**

> Divide the program into event-scoring, validation, reporting or separate event subroutines; databases into suitable event tables.

**Marking rule:** 1 concrete context-based breakdown of a program/database, not splitting a record into fields.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-213** · 3 mark(s) · OCR source reference: OCR J277/02 · June 2025 · Q5(c)

**RHS question draft:**

> A charity is designing an online donation system.
>  
> Match abstraction, decomposition and algorithmic thinking to these examples: (A) designing an ordered set of steps to take a payment; (B) keeping only the information needed to check an account; (C) building separate security and payment modules. [3]

**Verified answer points:**

> Abstraction → retain essentials; decomposition → security/payment modules; algorithmic thinking → payment steps.

**Marking rule:** 1 per correct pairing.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 013 — Flowcharts, Pseudocode and Programming Constructs

- **Specification:** 2.1.2 / 2.2.1
- **Source:** `lessons/j277/autumn1-009-013.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-036** · 5 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q2(b)

**RHS question draft:**

> An aquarium café offers half-price meals to students or loyalty-card holders, except on Saturdays.
>  
> Design a flowchart that accepts the required inputs, decides eligibility and outputs whether the discount applies. [5]

**Verified answer points:**

> Start/end, input A/B/C, valid decisions, output half-price for not-Saturday and (student OR loyalty), otherwise full-price.

**Marking rule:** Five criteria: flowchart endpoints, parallelogram inputs, diamond tests, correct half-price and full-price output paths.

**Visual candidate:** existing lesson `lessons/j277/autumn1-009-013.json`; do not reuse without checking question values.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-037** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q2(c)

**RHS question draft:**

> An aquarium café adds a 5% service charge when a group has more than five people. Customers may also add an optional tip, either as a fixed sum or a percentage.
>  
> Identify the additional information the booking algorithm must accept. [2]

**Verified answer points:**

> Number in party; choice of tip as percentage or fixed sum, including amount/percentage.

**Marking rule:** 1 for party size; 1 for tip type/values. Merely saying 'whether a tip' is not enough.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-030** · 4 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q1(a)

**RHS question draft:**

> A games studio uses four pieces of pseudocode: a FOR loop, a WHILE loop, an IF statement and a SWITCH/CASE statement.
>  
> For each construct, identify whether it uses selection or iteration. [4]

**Verified answer points:**

> FOR, WHILE → iteration. IF, SWITCH/CASE → selection.

**Marking rule:** One correct classification for each of four constructs.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-203** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2025 · Q2(b)(ii)

**RHS question draft:**

> A software company has already used iteration.
>  
> Name two other fundamental programming constructs. [2]

**Verified answer points:**

> Sequence; selection.

**Marking rule:** One mark each; names not just examples.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 014 — Linear Search and Algorithm Tracing

- **Specification:** 2.1.3
- **Source:** `lessons/j277/autumn1-014-018.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-042** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q3(c)

**RHS question draft:**

> A pet shop searches a list of animal IDs one item at a time, but the requested ID is absent.
>  
> Describe how an unsuccessful linear search would proceed. [2]

**Verified answer points:**

> Start with first item; compare all items sequentially in order until the end.

**Marking rule:** 1 first-item starting point; 1 complete ordered search through the list.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-162** · 4 mark(s) · OCR source reference: OCR J277/02 · June 2024 · Q9(a)(ii)

**RHS question draft:**

> A school sports festival stores six names in theTeam, indexed 0–5. Complete the FOUR missing expressions in this linear-search function:
>  
> function linearSearch(studentName)
>     for count = 0 to ____
>         if theTeam[____] == ____ then
>             return ____
>         endif
>     next count
>     return False
> endfunction
>  
> [4]

**Verified answer points:**

> for count=0 to 5; if theTeam[count]==studentName; return True; return False on completion.

**Marking rule:** 4 missing components: length bound, index count, target studentName, True result; false already provided.

**Visual candidate:** existing lesson `lessons/j277/autumn1-014-018.json`; do not reuse without checking question values.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q3

**RHS-J277-207** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2025 · Q3(c)(i)

**RHS question draft:**

> A veterinary surgery looks up animal records from the start of a list, comparing one entry at a time until a match is found.
>  
> Name this searching algorithm. [1]

**Verified answer points:**

> Linear search.

**Marking rule:** One mark.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-208** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2025 · Q3(c)(ii)

**RHS question draft:**

> A veterinary surgery searches through animal records one at a time.
>  
> Other than finding the target, state a condition that would cause this search to finish. [1]

**Verified answer points:**

> Every item has been checked, i.e. the end of the list is reached with no match.

**Marking rule:** One mark; merely saying 'not found' without indicating end of search is insufficient.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 015 — Bubble Sort and Insertion Sort

- **Specification:** 2.1.3
- **Source:** `lessons/j277/autumn1-014-018.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.
- **Content gap:** The bank has comparison/explanation questions for insertion and bubble sorting, but does not supply a dedicated bubble-sort execution trace; original lesson practice provides that skill.

#### Q1

**RHS-J277-094** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q3(a)

**RHS question draft:**

> A visitor-centre booking list is sorted using insertion sort.
>  
> Describe why the algorithm needs a temporary variable when swapping two entries. [2]

**Verified answer points:**

> temp holds a name/value temporarily while entries swap, preventing loss when the previous array cell is overwritten.

**Marking rule:** 1 for holding the stored name; 1 for enabling safe swap/movement without losing it.

**Visual candidate:** existing lesson `lessons/j277/autumn1-014-018.json`; do not reuse without checking question values.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-095** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q3(b)

**RHS question draft:**

> A library sorts a list of book titles using insertion sort. Its inner loop continues only while an element is out of order and has not reached the start of the list.
>  
> Explain why a condition-controlled inner loop is appropriate. [2]

**Verified answer points:**

> Number of swaps needed cannot be known in advance; continue until adjacent comparison no longer requires a swap or value reaches correct position.

**Marking rule:** 1 uncertain iteration count; 1 relevant stopping/continuing condition. Generic 'while in wrong order' not enough.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-096** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q3(c)(i)

**RHS question draft:**

> A music archive is comparing insertion sort with bubble sort.
>  
> Describe one difference in how the two algorithms rearrange values. [2]

**Verified answer points:**

> Insertion: builds a sorted portion starting at left and moves a value into place; bubble: repeatedly compares/swaps adjacent items, largest moving to right.

**Marking rule:** One accurate process for insertion, one for bubble, max 2.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-097** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q3(c)(ii)

**RHS question draft:**

> A music archive is comparing insertion sort with bubble sort.
>  
> Describe two similarities between the sorting methods. [2]

**Verified answer points:**

> Both compare values, use loops and may swap items; both work on arrays and build a sorted list.

**Marking rule:** Any 2 distinct valid similarities, not 2 ways of saying 'sort'.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 016 — Variables, Input, Output and One-Dimensional Arrays

- **Specification:** 2.2.1 / 2.2.3
- **Source:** `lessons/j277/autumn1-014-018.json`
- **Coverage:** Only 3 directly appropriate, separately verified RHS bank part(s) available for this lesson. 1 existing authored question(s) retained as proposals. Do not invent new bank questions.
- **Content gap:** Insufficient bank parts specifically testing basic one-dimensional array indexing. Fallback is the lesson's existing indexing question (e[1]).

#### Q1

**RHS-J277-031** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q1(b)

**RHS question draft:**

> A game keeps a variable named score.
>  
> Write one pseudocode statement that increases score by 1. [1]

**Verified answer points:**

> score = score + 1 (or +=1).

**Marking rule:** 1 for writing back the incremented score; standalone expression score+1 is not enough.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-199** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2025 · Q1(b)(ii)

**RHS question draft:**

> A gym app uses the statement num = input("Enter a number between 1 and 100").
>  
> Identify the variable used in this statement. [1]

**Verified answer points:**

> num

**Marking rule:** Variable identifier only, 1 mark.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-108** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q6(c)(ii)

**RHS question draft:**

> A theatre alarm system runs this reset algorithm:
>  
> 01 sensorType = input('Sensor type?')
> 02 if CheckSensorCode(sensorType) then
> 03     sensorNumber = input('Sensor number?')
> 04     sensorID = sensorType + sensorNumber
> 05     ResetSensor(sensorID)
> 06 endif
>  
> Name one variable identifier used in this algorithm. [1]

**Verified answer points:**

> sensorType or sensorNumber or sensorID.

**Marking rule:** 1 correctly identified variable, not function name.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q4 — existing lesson fallback

**Existing source:** `lessons/j277/autumn1-014-018.json` · existing exam question #2

**Existing question (unchanged):**

> Given values = [7, 2, 5], state the values at indices 0 and 2. [2 marks]

**Existing answer (unchanged):**

> Index 0 is 7 [1]; index 2 is 5 [1].

**Approval:** retain as a proposed fallback until additional appropriate RHS question-bank coverage exists.

---

### Lesson 017 — Defensive Design, Validation and Testing

- **Specification:** 2.3.1 / 2.3.2
- **Source:** `lessons/j277/autumn1-014-018.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-152** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2024 · Q4(b)

**RHS question draft:**

> A museum is developing a public video app.
>  
> Describe one defensive-design technique that could improve its reliability or security. [2]

**Verified answer points:**

> Validation restricts ratings to an allowed range; authentication restricts access; sanitisation removes malicious characters; maintainability via modules/comments.

**Marking rule:** Up to 2 distinct points relating to ONE defensive technique, ideally name and development.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-164** · 4 mark(s) · OCR source reference: OCR J277/02 · June 2024 · Q9(c)(i)

**RHS question draft:**

> A sports centre validates a recorded high-jump height, which must be from 40.0 to 180.0 cm inclusive.
>  
> Write an algorithm that inputs the height and outputs VALID or NOT VALID. [4]

**Verified answer points:**

> Input measured height; test minimum ≥40; test maximum ≤180 using AND (or invalid cases using OR); output VALID only within range and NOT VALID outside.

**Marking rule:** 4 independently assessed criteria including both boundaries.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-051** · 3 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q5(b)(ii)

**RHS question draft:**

> A guesthouse accepts bookings of 1–5 nights inclusive.
>  
> Supply three values to test its input validator: (a) a normal value with expected output ALLOWED, (b) a valid boundary value with ALLOWED, and (c) an invalid value with NOT ALLOWED. [3]

**Verified answer points:**

> Normal test 2; boundary valid 1 or 5; erroneous e.g. 7 with NOT ALLOWED.

**Marking rule:** 1 for each missing test-plan element, total 3.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-092** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q2(a)

**RHS question draft:**

> A software company has found two different programming mistakes.
>  
> Explain the difference between a syntax error and a logic error. [2]

**Verified answer points:**

> Syntax error violates language grammar and prevents translation/execution; logic error allows execution but produces unexpected output.

**Marking rule:** 1 correct definition per error. Examples alone not enough.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 018 — Autumn 1 AP1 Assessment and Review

- **Specification:** 1.1 / 1.2 / 2.1 / 2.2 / 2.3
- **Assessment exception:** keep existing AP1 format. No automatic bank substitution.

### Lesson 019 — Sequence, Input and Output

- **Specification:** 2.2.1
- **Source:** `lessons/j277/autumn2-019.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.

#### Q1

**RHS-J277-215** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2025 · Q6(a)(i)

**RHS question draft:**

> A sports club asks members to enter their password twice, storing the entries as passA and passB.
>  
> Which option contains valid pseudocode assignments?
> A: passA, passB = input('twice')
> B: input('first') = passA; input('second') = passB
> C: passA = input('first'); passB = input('second')
> D: 'passA' = input('first'); 'passB' = input('second')
>  
> Select one option. [1]

**Verified answer points:**

> C — separately assign the two input() results to passA and passB.

**Marking rule:** 1 for choosing the two valid assignment statements; RHS options must be two valid separate statements.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_visual_or_final_approval_pending).

#### Q2

**RHS-J277-151** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2024 · Q4(a)

**RHS question draft:**

> A museum offers a video app where visitors search for clips, play them and submit ratings.
>  
> Identify one input and one output of the app. [2]

**Verified answer points:**

> Input e.g. search keyword, play/pause control, user rating; output e.g. video/audio, search results or rating feedback.

**Marking rule:** 1 valid input, 1 valid output.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-087** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q1(b)

**RHS question draft:**

> A sports scoring app stores two integer values in num1 and num2.
>  
> Write one pseudocode statement that adds them and stores the answer in total. [1]

**Verified answer points:**

> total = num1 + num2.

**Marking rule:** 1 valid expression with assignment to a new variable.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-090** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q1(c)(iii)

**RHS question draft:**

> A measuring app compares values of 300 and 100.
>  
> Write the missing arithmetic operator: difference = measurement1 ___ measurement2. [1]

**Verified answer points:**

> - (subtraction).

**Marking rule:** 1 valid subtraction operator.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

### Lesson 020 — Variables, Assignment and Data Types

- **Specification:** 2.2.1 / 2.2.2
- **Source:** `lessons/j277/autumn2-020.json`
- **Coverage:** Four relevant RHS bank candidate parts selected; any visual adaptations and final originality/student-display checks remain pending.
- **Content gap:** Selected parts focus on data types; original lesson's variable-update and tracing exercises must remain available in You Do skills practice.

#### Q1

**RHS-J277-047** · 2 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q5(a)(i)

**RHS question draft:**

> A guesthouse booking record stores the number of nights and a room category.
>  
> State the most appropriate data type for each of these two fields. [2]

**Verified answer points:**

> Nights Integer; Room String.

**Marking rule:** 1 correct data type per field.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q2

**RHS-J277-048** · 1 mark(s) · OCR source reference: OCR J277/02 · June 2022 · Q5(a)(ii)

**RHS question draft:**

> A guesthouse booking record includes firstName, surname, nights, room and stayComplete.
>  
> Identify one field that should use the Boolean data type. [1]

**Verified answer points:**

> stayComplete.

**Marking rule:** 1 suitable Boolean booking field.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q3

**RHS-J277-105** · 4 mark(s) · OCR source reference: OCR J277/02 · June 2023 · Q6(a)

**RHS question draft:**

> A theatre uses an alarm system. It stores UserName = "Admin123", EmergencyPhoneNumber = "+449999999999", DoorSensorActive = True and DoorActiveTime = 100 seconds.
>  
> Select the most appropriate data type for each of these four values: Boolean, Character, String, Integer or Real. [4]

**Verified answer points:**

> UserName String; EmergencyPhoneNumber String; DoorSensorActive Boolean; DoorActiveTime Integer.

**Marking rule:** 1 correct type per variable, 4 total.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

#### Q4

**RHS-J277-161** · 3 mark(s) · OCR source reference: OCR J277/02 · June 2024 · Q9(a)(i)

**RHS question draft:**

> A school sports festival records teamName = "Super-Team", studentYearGroup = 11 and javelinThrow = 18.2.
>  
> Choose a different appropriate data type for each of the three variables. [3]

**Verified answer points:**

> teamName String; studentYearGroup Integer; javelinThrow Real/Float.

**Marking rule:** 1 appropriate type each.

**Visual:** no student question SVG required by this proposal.

**Approval:** `candidate_pending_final_approval` (marking_verified_final_approval_pending).

---

## Release gates

This snapshot is for content review. Publishing must not begin until: the RHS text's final editorial/originality approval, specification fit, question/mark-scheme alignment, SVG accuracy and visibility, screen fit, and teacher sign-off are recorded in the canonical map. Never treat checked answer points as approval for student display.
