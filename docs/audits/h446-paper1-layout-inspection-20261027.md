# H446 Paper 1 layout inspection — 27 October 2026

Pages: 253

- `\bI\s*DO\b`: 67 pages; first 35: [7, 15, 20, 26, 27, 28, 34, 39, 40, 45, 49, 51, 60, 64, 65, 67, 72, 76, 77, 78, 82, 87, 91, 97, 102, 108, 113, 117, 121, 127, 132, 138, 139, 140, 141]
- `\bWE\s*DO\b`: 62 pages; first 35: [8, 15, 20, 26, 27, 28, 34, 39, 40, 45, 49, 52, 60, 64, 65, 67, 72, 76, 77, 78, 82, 87, 91, 97, 103, 108, 113, 117, 121, 127, 132, 138, 139, 140, 141]
- `\bYOU\s*DO\b`: 2 pages; first 35: [221, 222]
- `KEY\s+(?:TERMS|WORD|VOCAB)`: 5 pages; first 35: [33, 71, 107, 116, 217]
- `WORKED\s+(?:EXAMPLE|SOLUTION)`: 9 pages; first 35: [1, 34, 49, 72, 108, 117, 132, 174, 232]
- `EXAM\s+PRACTICE`: 74 pages; first 35: [16, 29, 35, 36, 42, 43, 46, 51, 52, 53, 54, 55, 56, 57, 61, 62, 68, 69, 73, 74, 75, 84, 88, 92, 98, 102, 103, 104, 105, 106, 111, 118, 119, 122, 128]

## First page of every specification section

### 1.1.1: Processor structure and architecture (page 2)
Text ends at y=726 of 842; links=0
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
THE CPU HIGHWAY
H446 1.1.1 | Road networks, register transfers and processor architecture
REMEMBER THIS / THE COMPUTER IS A CONNECTED COUNTRY
The CPU is the city control centre; RAM is the busy working town; cache is a small fast depot inside the CPU; and registers
are the immediate workspaces within the centre. Buses are the communication highways.
THE CPU HIGHWAY: CONNECTED COMPONENTS
CITY HALL
CPU (processor)
CU
control
ALU
calculations
Registers
now
Cache
nearby
WORKING TOWN
RAM (main memory)
120: LOAD 205
121: ADD 180
205: 17
ADDRESS
DATA
CONTROL
ARCHIVES: secondary storage (SSD/HDD) is connected through I/O hardware
CPU / I/O interface
I/O controller
SSD / HDD
COLOUR KEY Blue = address Green = data Orange = control signals Grey = I/O link
Translate the picture into exam terminology
Memory image
Exam-accurate meaning
City Hall / CPU
The processor executes instructions; the CU coordinates control, and the ALU performs
arithmetic/logic.
Cache depot / registers
Cache keeps frequently accessed instructions or data; registers hold current
addresses, instructions and results.
Working town / RAM
RAM stores the instructions and data of currently running programs.
Three highways / buses
Address carries location, data carries content, control carries command and timing
signals.
```

### 1.1.2: Types of processor (page 19)
Text ends at y=593 of 842; links=0
```text
RHSC  /  A LEVEL COMPUTER SCIENCE  /  H446/01
1.1.2  PROCESSOR TYPES
1.1.2 / PROCESSOR TYPES
REMEMBER THIS / DIFFERENT ROUTES, SAME DESTINATION
On the CPU highway, RISC takes several simple, regular delivery steps; CISC can encode more work in a
single instruction. Neither route is automatically faster.
One job, different instruction-set approaches
RISC-like teaching sequence
CISC-like compound instruction
LOAD R1, [A]
LOAD R2, [B]
ADD R3, R1, R2
STORE [C], R3
ADD_MEMORY C, A, B
(illustrative pseudo-ISA)
More work per instruction
does not ensure less time.
Now be precise: instruction sets
RISC (typical)
CISC (typical)
Simpler, regular operations; load/store designs often
separate memory and arithmetic.
Richer, sometimes more complex instructions; often
variable-length encodings.
May support efficient decoding and pipelining, but
more instructions can increase program size.
May offer compact code, while decoding and internal
execution may be complex.
MISCONCEPTION TO AVOID
RISC does not always execute more quickly, and instruction count alone does not measure performance.
The teaching commands in the diagram are not real machine instructions.
19
```

### 1.1.3: Input, output and storage (page 26)
Text ends at y=682 of 842; links=0
```text
RHSC / A LEVEL COMPUTER SCIENCE / H446
PAPER 1
1.1.3 Input, output and storage
Remember the control room: SENSE → SAMPLE → DECIDE → ACT. Sensors collect
measurements; software processes them; actuators change the physical world. An ADC
converts an analogue signal into digital samples when needed.
From the physical world to a controlled action
Sensor
measures heat
ADC
digitises reading
Controller
compares limit
Actuator
opens vent
Only use an ADC when the sensor signal needs analogue-to-digital conversion.
SENSE > SAMPLE > DECIDE > ACT
NOW BE PRECISE
An input device supplies data to a computer. An output device presents information or
controls a physical process. A sensor is an input transducer; an actuator creates an action.
An ADC is needed only where the incoming signal is analogue and digital processing is
required.
I DO / Automatic door
Choose a suitable input and output for an automatic door. A proximity sensor detects an
approaching person; the controller evaluates the reading, and a motor actuator opens the
door. Safety sensing must also check when it is safe to close.
WE DO / Pedestrian crossing
A crossing must work for people with different accessibility needs. Identify one input and two
output methods.
Guided explanation
Use an accessible push button as input. Signal lights give visual information; audible
and/or tactile outputs assist users with different needs. The control system must obey safe
timing rules.
26
```

### 1.2.1: Systems software and operating systems (page 33)
Text ends at y=596 of 842; links=0
```text
REEPHAM HIGH SCHOOL & COLLEGE   /   H446 REVISION
PAPER 1
1.2.1 / Operating systems and scheduling
Remember: The OS is an airport controller, not the aeroplane.
ROUND ROBIN: TIME QUANTUM = 2
All three processes arrive at time 0.
P1
0
P2
2
P3
4
P1
6
P2
8
9
At t = 2, P1 is pre-empted with 2 units remaining.
ANALOGY - PICTURE IT
The controller allocates a runway to each plane; an operating system allocates processor time and other resources to
processes.
NOW BE PRECISE - WHERE THE ANALOGY STOPS
Aircraft operate physically and schedules vary. In computing, process scheduling follows a defined algorithm; the CPU
executes the instructions.
Essential key vocabulary
Keyword
Exam-accurate meaning
Process scheduling
Choosing which ready process receives CPU time.
Round robin (RR)
Each ready process runs for a fixed time quantum in turn.
Pre-emptive
A running process may be interrupted and placed back in the ready queue.
Paging
Fixed-size pages and frames; page tables map logical to physical memory.
Segmentation
Variable-sized logical sections of a program.
ISR
Interrupt Service Routine; code that responds to an interrupt.
33
```

### 1.2.2: Applications generation (page 71)
Text ends at y=670 of 842; links=0
```text
REEPHAM HIGH SCHOOL & COLLEGE   /   H446 REVISION
PAPER 1
1.2.2 / Applications and translation
Remember: The compiler is a translator; the linker is an organiser.
FROM SOURCE CODE TO A RUNNING PROGRAM
1. SOURCE
int total = 12;
2. LEX + PARSE
tokens and syntax
3. GENERATE
target instructions
4. LINK
resolve libraries
5. LOAD
place in memory
Compilation, linking and loading are distinct stages.
ANALOGY - PICTURE IT
A translator changes the language of instructions; a linker combines translated modules with required library code.
NOW BE PRECISE - WHERE THE ANALOGY STOPS
Compilers may optimise and target machine code or intermediate representations. Interpretation is an execution
approach, not merely translation word-by-word.
Essential key vocabulary
Keyword
Exam-accurate meaning
Compiler
Translates source into target code; reports errors before or during translation.
Interpreter
Executes a program through an interpretation process, normally processing instructions
during execution.
Assembler
Translates assembly-language mnemonics into machine instructions.
Lexical analysis
Groups source characters into tokens.
Syntax analysis
Checks token structure against the language grammar.
Linker and loader
Linker resolves external code references; loader places a program in memory for
execution.
71
```

### 1.2.3: Software development (page 82)
Text ends at y=651 of 842; links=0
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446
PAPER 1
1.2.3 Software development
Remember: waterfall is a staircase, Agile is a series of laps, XP is a pit crew, Spiral is a risk
radar, and RAD is the quick prototype. Each memory hook is a starting point, not an exact
description of every project.
Five ways to manage software development
WATERFALL
phases
AGILE
iterations
XP
practices
SPIRAL
risk
RAD
prototype
Select the method to suit the project, not the other way around.
Fixed requirements | frequent feedback | technical risk | fast prototypes
NOW BE PRECISE
Waterfall works through relatively distinct stages; Agile uses iterative, incremental delivery
and feedback; extreme programming (XP) adds disciplined engineering practices such as
pair programming and test-driven development; Spiral explicitly evaluates risks each cycle;
RAD uses rapid prototypes and close user input.
I DO / High-risk project
A satellite-control project has major technical and safety uncertainties. Spiral is a defensible
choice because early cycles can prototype risky components and evaluate the results before
committing to the next stage.
WE DO / Revision app
Students request changes after trying each version of a revision app. Which approach suits
the feedback cycle?
Guided response
An Agile approach can release an initial quiz feature, gather student feedback, then
prioritise improvements. Explain the benefit of working increments and the cost of regular
consultation.
82
```

### 1.2.4: Types of programming language (page 90)
Text ends at y=717 of 842; links=0
```text
RHSC  /  A LEVEL COMPUTER SCIENCE  /  H446/01
OCR H446  /  COMPUTER SYSTEMS
1.2.4(a)(b)(e) / COMPUTER SYSTEMS
Programming paradigms and objects
The same problem can be expressed procedurally or using objects. The important distinction is
how instructions, data and state are organised.
REMEMBER THIS
Procedural programming is like a recipe: call instructions with ingredients. An object is like
a vending machine: state and allowed operations are grouped together.
NOW BE PRECISE
Procedural code groups operations into subroutines; object-oriented code uses classes to
define objects with attributes and methods. Encapsulation controls access to state.
Inheritance and polymorphism support reuse and different behaviour behind a shared
interface.
Where the analogy stops: A real object is not a physical box. C# supports multiple styles; a short standalone
function is not automatically a purely functional program.
ONE TASK, TWO DESIGNS
PROCEDURAL: pass the values
balance = 10
->
Deposit(10, 5)
->
15
OBJECT-ORIENTED: an object holds its state
Account object A
Balance = 10
Deposit(5) ->
Same object A
Balance = 15
One problem, two designs: the data and method are arranged differently.
EXAM PRECISION / PARADIGMS AND MODULARITY
Procedural: express steps using statements and subroutines. Declarative: specify a desired result (e.g. SQL). Functional:
compose functions while limiting side effects. Modularity means separating a system into components; a program can be both
procedural and modular.
90
```

### 1.3.1: Compression, encryption and hashing (page 107)
Text ends at y=583 of 842; links=0
```text
REEPHAM HIGH SCHOOL & COLLEGE   /   H446 REVISION
PAPER 1
1.3.1 / Compression, encryption and hashing
Remember: ZIP, lock and fingerprint: three different jobs.
COMPRESSION, ENCRYPTION AND HASHING
LOSSLESS
AAAAABBBCC
  5A3B2C
Exact recovery
ENCRYPT
plaintext
  ciphertext
Key enables decryption
HASH
message
  digest
Not reversible
These operations solve different problems; a hash is not encryption.
ANALOGY - PICTURE IT
Compression packs a suitcase; encryption locks it; hashing produces a fixed-size digital fingerprint.
NOW BE PRECISE - WHERE THE ANALOGY STOPS
A hash is not guaranteed unique: collisions are possible. Encryption is reversible with the correct key; hashing is not
decryption.
Essential key vocabulary
Keyword
Exam-accurate meaning
Lossless
The exact original can be reconstructed.
Lossy
Some information is discarded irreversibly to reduce size.
Run-length encoding
Stores a run of repeated symbols as a count and value.
Symmetric encryption
Sender and receiver use the same secret key.
Asymmetric encryption
A mathematically related public/private key pair supports specified operations.
Cryptographic hash
One-way mapping to a fixed-length digest; collisions are possible.
107
```

### 1.3.2: Databases (page 116)
Text ends at y=621 of 842; links=0
```text
REEPHAM HIGH SCHOOL & COLLEGE   /   H446 REVISION
PAPER 1
1.3.2 / Relational databases and SQL
Remember: A primary key is a unique library card number.
ONE STUDENT CAN HAVE MANY RESULTS
STUDENT
StudentID (PK)
Name
RESULT
ResultID (PK)
StudentID (FK)
Mark
1
many
StudentID is unique in STUDENT but may repeat in RESULT.
ANALOGY - PICTURE IT
A student has a unique ID; a result record stores that ID so the database can link the result to the correct student.
NOW BE PRECISE - WHERE THE ANALOGY STOPS
Names are not guaranteed unique. Foreign keys may repeat and must meet referential-integrity constraints, not act as
primary keys.
Essential key vocabulary
Keyword
Exam-accurate meaning
Primary key (PK)
Field or combination uniquely identifying a row.
Foreign key (FK)
Field referencing a key in a related table.
1NF
Atomic column values; no repeating groups.
2NF
In 1NF and every non-key attribute fully dependent on the whole candidate key.
3NF
In 2NF and no non-key attribute transitively dependent on a candidate key.
INNER JOIN
Combines rows that satisfy a specified matching condition.
116
```

### 1.3.3: Networks (page 146)
Text ends at y=662 of 842; links=0
```text
RHSC  /  OCR H446  /  PAPER 1
1.3.3  NETWORKS
1.3.3 NETWORKS / Networks, protocols and
network security
REMEMBER THIS / THE SCHOOL ROAD NETWORK
NIC = vehicle access; switch = local junction; router = junction between networks. The model helps
explain traffic movement but cannot replace protocol and addressing detail.
A pupil opens a website from the school LAN
Laptop / NIC
Switch
Router
Internet host
Switch: local Ethernet frames
Router: between networks
Return traffic may follow a different route.
Blue: school LAN / Green: between networks
Now be precise
Component
Role
NIC
Interface that connects a device to a network.
Switch
Forwards LAN frames, generally using MAC addresses.
Router
Forwards IP packets between networks.
Wireless access point
Connects Wi-Fi clients to the local network.
MISCONCEPTION
A switch and router do not perform the same forwarding task. A WAN is not defined by using Wi-Fi; it
spans a wide geographical area.
146
```

### 1.3.4: Web technologies (page 158)
Text ends at y=526 of 842; links=0
```text
RHSC  /  OCR H446  /  PAPER 1
1.3.4  WEB TECHNOLOGIES
1.3.4 WEB TECHNOLOGIES / Web
technologies and client-server processing
REMEMBER / THE WEB THEATRE
HTML builds the stage, CSS chooses the costumes, and JavaScript responds to cues. Use the analogy
to distinguish responsibilities; the DOM is the actual structured document model.
One webpage: three different jobs
HTML
Structure and meaning
CSS
Presentation and layout
JavaScript
Behaviour on an event
Remember: DOM is the document model JavaScript can update.
HTML form and GET request
A form collects fields. A label connects to its input through matching for and id; the input name
becomes the submitted key.
If a GET form submits a field name="q" with value binary to /find, its URL is /find?q=binary. GET data
appears in the URL and is unsuitable for secret credentials.
I DO / Working with HTML forms
158
```

### 1.4.1: Data types and representation (page 164)
Text ends at y=747 of 842; links=0
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.4.1(a,d)
Data types and eight-bit arithmetic
Understand it  /  I Do  /  We Do
Representations describe both the type of a value and the bit patterns used to store it. Binary
subtraction is most reliable when the working shows every stage.
Subtract by adding the opposite
19
00010011
invert + 1
11101101
45 + (-19)
00011010
answer
26
8-bit arithmetic; discard the final carry when representing the 8-bit result.
REMEMBER THIS
CRIBS, then invert-and-add. CRIBS: Character, Real, Integer, Boolean, String. To subtract using
two’s complement, invert the second binary number and add one.
Now be precise
• Integer: exact whole number; real: an approximation may be necessary in binary floating point.
Boolean: true or false; character: a single code point/unit; string: a sequence of characters.
• Eight-bit subtraction: 45 − 19. 19=00010011; invert=11101100; add one=11101101;
45=00101101; add → 1 00011010; discard carry → 00011010 = 26.
• Overflow: with signed eight-bit two’s complement the representable range is −128 to +127. 124 +
10 = 134 is out of range; the retained bit pattern 10000110 is interpreted as −122.
I DO
Calculate 45 − 19 in eight-bit two’s complement.
Method: 00101101 + 11101101 = 1 00011010; discard the ninth carry. Answer 00011010 (26). This is
a subtraction, not a bitwise NOT alone.
WE DO
Calculate 31 − 12 in eight-bit two’s complement.
Method: 31 = 00011111; 12 = 00001100; invert 11110011, add 1 = 11110100; add = 1 00010011;
answer 00010011 (19).
COMMON MISTAKE
A carry out is not the same as signed overflow; compare operand/result signs or representable
range.
OCR H446/01  /  REVISION
164
```

### 1.4.2: Data structures (page 180)
Text ends at y=682 of 842; links=0
```text
REEPHAM HIGH SCHOOL & COLLEGE  /  COMPUTER SCIENCE
H446/01 / COMPUTER SYSTEMS
1.4.2 / Arrays, records, stacks and trees
Choose the structure from the operations the problem actually needs.
OCR 1.4.2 • SPECIFICATION CHECK
• Read 1D–3D arrays, records, lists and tuples.
• Trace stack, queue, linked list, BST and graph operations.
• Explain which structures support rapid search, insertion, deletion or ordered access.
Visualise the order of removal
17
9
4
Stack (LIFO)
POP = 17
Front   4
9
17   Rear
Queue (FIFO)
Structure
Useful invariant / operation
Stack
LIFO: push and pop operate on one end (top).
Queue
FIFO: enqueue at rear, dequeue at front.
Linked list
Nodes store values and links; deletion changes references, not an array shift.
Binary search tree
Left subtree values smaller, right subtree values greater (with a stated
duplicate policy).
Graph
Vertices and edges; directed edges have an orientation.
Hash table
Hash function gives a slot; collisions need a resolution strategy.
C# arrays: int[,,] x = new int[2,3,4]; holds 24 integer elements, with length 4 on
dimension 2.
Use the same operations to trace arrays, records and linked structures.
180
```

### 1.4.3: Boolean algebra and logic hardware (page 215)
Text ends at y=734 of 842; links=0
```text
OCR H446 / PAPER 1 / 1.4.3(d)
Logic gates: recognise the rule
Revisit Lesson 026: New Learning and I Do.
Inputs and outputs use 1 = true / on and 0 = false / off.
Read from inputs on the left to output Q on the right.
AND
A
B
Q
Both inputs must be 1.
Q = A AND B
OR
A
B
Q
At least one input must be 1.
Q = A OR B
NOT
A
Q
Reverse one input.
Q = NOT A
XOR
A
B
Q
Exactly one input must be 1.
Q = A XOR B
TRUTH TABLES / List every input combination
A
B
AND
OR
XOR
0
0
0
0
0
0
1
0
1
1
1
```

### 1.5: Legal, moral, cultural and ethical issues (page 237)
Text ends at y=678 of 842; links=0
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446
PAPER 1
1.5 Legal, moral, social and ethical issues
Remember: law asks “is it permitted?”; ethics asks “is it justified?” Both questions matter
when computing systems affect people.
Legislation and ethical judgement answer different questions
LEGAL QUESTION
What does the law allow
or require?
ETHICAL QUESTION
Is this fair, justified
and proportionate?
An action may be lawful yet raise serious ethical concerns.
SPECIFICATION AND CURRENT LAW
OCR H446 explicitly lists the Data Protection Act 1998 (historical syllabus wording),
Computer Misuse Act 1990, Copyright, Designs and Patents Act 1988, and Regulation of
Investigatory Powers Act 2000. When discussing UK data protection today, refer to UK
GDPR and the Data Protection Act 2018, as amended. Do not describe the 1998 Act as the
current framework.
I DO / Unauthorised access
A person uses another employee’s login credentials without permission to access private
files. The central legal issue is unauthorised access under the Computer Misuse Act; copying
personal information or protected work may raise additional legal questions.
WE DO / Copyright and copying
A student copies commercial software and distributes it. Explain why this may breach
copyright legislation and whether the fact that it is easy to copy makes it ethically
acceptable.
Guided response
Copyright protection can apply to computer software. Redistribution without authorisation
may infringe rights; ease of copying does not establish permission. Consider the impact on
rights holders as well as fair access and legal licensing.
237
```

### RECALL: Mixed memory banks (page 247)
Text ends at y=452 of 842; links=0
```text
REEPHAM HIGH SCHOOL & COLLEGE   /   H446 REVISION
PAPER 1
H446 MEMORY BANK
Read the hook, then cover the precise wording and try to explain the concept without the analogy.
Processor / 1.1.1 / CPU as head chef
NOW BE PRECISE
PC = next instruction address; MAR = memory address; MDR = data/instruction; CIR = fetched instruction.
Careful: A chef cannot model processor pipelining or precise register transfers.
Binary / 1.4.1 / Two’s complement = invert + one
NOW BE PRECISE
For a fixed width: flip all bits, then add 1 to form a negative value.
Careful: Check representable range and overflow; this is not sign-magnitude.
Data structures / 1.4.2 / Plates & queues
NOW BE PRECISE
Stack = LIFO; queue = FIFO.
Careful: An abstract data type defines operations independent of implementation.
Boolean / 1.4.3 / K-map = joined-edge map
NOW BE PRECISE
Opposite edges are adjacent. Circle power-of-two groups of 1s.
Careful: Do not group diagonals; draw only one source for each logic input.
247
```

### Detail of page 2
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
THE CPU HIGHWAY
H446 1.1.1 | Road networks, register transfers and processor architecture
REMEMBER THIS / THE COMPUTER IS A CONNECTED COUNTRY
The CPU is the city control centre; RAM is the busy working town; cache is a small fast depot inside the CPU; and registers
are the immediate workspaces within the centre. Buses are the communication highways.
THE CPU HIGHWAY: CONNECTED COMPONENTS
CITY HALL
CPU (processor)
CU
control
ALU
calculations
Registers
now
Cache
nearby
WORKING TOWN
RAM (main memory)
120: LOAD 205
121: ADD 180
205: 17
ADDRESS
DATA
CONTROL
ARCHIVES: secondary storage (SSD/HDD) is connected through I/O hardware
CPU / I/O interface
I/O controller
SSD / HDD
COLOUR KEY Blue = address Green = data Orange = control signals Grey = I/O link
Translate the picture into exam terminology
Memory image
Exam-accurate meaning
City Hall / CPU
The processor executes instructions; the CU coordinates control, and the ALU performs
arithmetic/logic.
Cache depot / registers
Cache keeps frequently accessed instructions or data; registers hold current
addresses, instructions and results.
Working town / RAM
RAM stores the instructions and data of currently running programs.
Three highways / buses
Address carries location, data carries content, control carries command and timing
signals.
Archives / SSD or HDD
Non-volatile secondary storage is accessed using I/O hardware, not as if it were a RAM
address.
NOW BE PRECISE
A bus is a set of electrical signal lines, not a literal road. Instructions and data are patterns of bits. This map is a reminder
about where information goes, not a literal representation of CPU wiring.
2
```

### Detail of page 3
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
Three highways, three different jobs
Address identifies the location. Data is the content. Control coordinates the operation.
THREE BUSES - THREE DIFFERENT JOBS
CPU
RAM
ADDRESS
WHERE to access
CPU to memory
CPU
RAM
DATA
WHAT is transferred
two-way
CPU
RAM
CONTROL
WHAT to do / WHEN
signals both ways
Blue = address Green = data Orange = control signals
Bus
Direction (simplified model)
Exact function
Address
CPU → memory (one way)
Carries address of memory or I/O location accessed.
Data
CPU ↔ memory (two ways)
Carries data or instructions between CPU and memory.
Control
Signals in both directions
READ, WRITE, READY and other coordination/timing signals.
REMEMBER: A-D-C
Address = where; Data = what; Control = what action/when. A-dress is not the actual package; an address gives its
location.
A READ from RAM location 205
Step
Which pathway?
What happens
1
Address
MAR is loaded with 205 and the address is signalled to memory.
2
Control
Control unit coordinates a memory READ operation.
3
Data
The contents stored in RAM[205] travel back on the data bus into the MDR.
COMMON MISCONCEPTION
A 12-bit address bus can distinguish 212 = 4,096 locations; a 16-bit data bus may transfer 16 data bits per bus transfer.
Address width does not mean 12 bits are fetched, and bus widths alone do not determine CPU speed.
Quick retrieval: Which bus carries the memory address? Which carries the READ signal? Why does the data bus need both
directions?
3
```

### Detail of page 4
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
Inside City Hall: five registers and FDE
Keep the highway picture, but name the real components and show how values change.
FETCH - DECODE - EXECUTE: FOLLOW ONE INSTRUCTION
1. PC
Next address
120
2. MAR
Memory location
120
3. RAM
Instruction at 120
LOAD 205
4. MDR
Received instruction
LOAD 205
5. CIR
Current instruction
LOAD 205
6. CU
Decodes opcode
LOAD
EXECUTE | PC   121 Operand RAM[205]   MDR = 17 ACC   17
Teaching model: a branch may change PC instead of sequentially advancing.
Register
What it stores
Memory hook
PC
Address of the next instruction to fetch.
Next stop.
MAR
Address of the memory location being accessed.
Street number.
MDR
Data or instruction being transferred to/from memory.
What came from that address.
CIR
The current instruction being decoded/executed.
Work order.
ACC
Result/intermediate value from ALU work in this teaching model.
Result counter.
Fetch–Decode–Execute: exam wording
Fetch: PC value is copied into MAR. The address bus identifies that memory location; a READ is requested.
The instruction returns on the data bus into MDR, then is copied to CIR. PC ordinarily advances. Decode:
the CU interprets the opcode and any operand. Execute: the required operation takes place; this may fetch
an operand, use the ALU, update a register or change PC for a branch.
TWO COMPLEMENTARY ANALOGIES
Highway: where addresses, instructions and data travel. Kitchen/chef: what fetch, decode and execute mean. Use both
only for the job they explain accurately.
4
```

### Detail of page 5
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
Shared highways, parallel work and performance
Von Neumann vs Harvard; pipelining; clock, cache and cores.
VON NEUMANN VS HARVARD
VON NEUMANN
CPU
HARVARD
CPU
one shared
path
Instructions + data
Shared memory
Instruction
memory
Data
memory
Shared transfers may contend; separate routes can overlap.
Von Neumann: shared main memory and path for program instructions and data; competing transfers can limit throughput
(the Von Neumann bottleneck). Harvard: separate instruction and data memories/buses, which can permit simultaneous
access. Real contemporary processors may mix design features; the diagrams are simplified models.
5
```

### Detail of page 6
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
Pipelining and processor performance
PIPELINING: AN ASSEMBLY LINE FOR INSTRUCTIONS
Cycle 1
Cycle 2
Cycle 3
Cycle 4
Cycle 5
Instr 1
FETCH
DECODE
EXECUTE
Instr 2
FETCH
DECODE
EXECUTE
Instr 3
FETCH
DECODE
EXECUTE
Overlapping stages can improve throughput; stalls and hazards can interrupt flow.
Pipelining overlaps stages of different instructions. It aims to increase throughput, not necessarily shorten one instruction.
Dependencies, branches and resource conflicts can introduce stalls.
Factor
Precise explanation / limits
Clock speed
Clock cycles per second; higher clock rate alone does not guarantee more instructions per
second.
Cache
Frequently used instructions/data can be accessed with lower average latency; hit rate matters.
Cores
Multiple cores can execute tasks in parallel where the software is designed for it.
REMEMBER
More traffic lanes may increase potential bandwidth; better nearby depots reduce waiting; parallel work crews help
independent jobs. But these are analogies, not interchangeable definitions.
6
```

### Detail of page 7
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
I DO / trace an assembly instruction
Read the example below as a sequence of register values, not as a journey of physical cars.
I DO: TRACE LOAD 205 - ONE INSTRUCTION
CPU BEFORE FETCH
RAM
PC
120
MAR
(old)
MDR
(old)
CIR
(old)
ACC
3
120
LOAD 205
121
ADD 180
180
5
205
17
address
instruction
After execution: CIR = LOAD 205; MAR = 205; MDR = 17; ACC = 17; PC = 121.
Blue = address Green = data/instruction Numbers are example values.
Starting state: PC = 120, ACC = 3; RAM[120] = LOAD 205; RAM[205] = 17. Assume a simple accumulator-based teaching
CPU, with an ordinary sequential instruction.
Phase
What happens
Resulting state
Fetch
Copy PC to MAR; signal address 120; READ retrieves
RAM[120] into MDR; copy instruction to CIR.
MAR = 120; MDR = LOAD 205; CIR =
LOAD 205; PC = 121
Decode
CU recognises opcode LOAD, operand address 205.
CIR retains LOAD 205
Execute
Read RAM[205] via MAR/MDR and load its value into ACC.
MAR = 205; MDR = 17; ACC = 17; PC =
121
I DO / MEMORY CHECK
120 and 205 are addresses. LOAD 205 is an instruction. 17 is data stored at location 205. PC normally points ahead after
fetch; MAR and MDR may change again while executing.
7
```

### Detail of page 8
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
WE DO / different question, same method
PC = 72, ACC = 7; RAM[72] = ADD 180 and RAM[180] = 5. Predict PC, CIR, MAR, MDR and ACC
immediately after the instruction finishes.
SCAFFOLD BEFORE CHECKING
1. Fetch the instruction at 72. 2. Increase the PC to the next sequential address. 3. Decode ADD 180. 4. Fetch the value at
address 180. 5. Add that value to the old ACC.
GUIDED CHECK / AFTER ATTEMPTING
PC = 73; CIR = ADD 180; MAR = 180; MDR = 5; ACC = 12. The instruction was at address 72, but the operand is at
address 180. The ALU added 5 to the original accumulator 7.
8
```

### Detail of page 9
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
Processor architecture · independent exam questions
Q1 [3 marks] State what the address bus, data bus and control bus each carry.
Q2 [4 marks] Explain how MAR and MDR differ, and state the separate purposes of
PC and CIR.
Q3 [2 marks] A processor has a 12-bit address bus. Calculate the maximum
number of distinct memory locations it can address. Show your working.
WORKING / METHOD
9
```

### Detail of page 10
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
Processor architecture · independent exam questions
Q4 [4 marks] Explain why the data bus needs to carry signals in both directions,
while the address bus in the simplified CPU–RAM model is one-way.
Q5 [4 marks] Compare Von Neumann and Harvard architectures, including a
performance implication.
10
```

### Detail of page 11
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
Processor architecture · extended responses
Q1 [6 marks] In a simple accumulator CPU, the PC contains 48. Memory location
48 stores ADD 93, memory location 93 stores 4, and ACC initially stores 9. Explain
the fetch–decode–execute process, naming the registers and relevant buses, and
state the resulting ACC and PC values.
Q2 [6 marks] A developer claims a CPU must be faster because it has more cores,
a higher clock speed and a larger cache. Discuss why those features may improve
performance, and why they do not guarantee it for every program.
11
```

### Detail of page 12
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
Processor architecture · extended responses
Q3 [3 marks] Explain how pipelining can improve processor throughput and
identify one condition that can cause a pipeline stall.
12
```

### Detail of page 13
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
MODEL ANSWERS / Questions 1–5
Indicative mark points for the original questions in this chapter (not an OCR-issued mark scheme).
Q1 [3]
MARK POINTS
Address bus carries memory location addresses [1]; data bus carries data and/or instructions [1]; control bus carries
control or timing signals [1].
Q2 [4]
MARK POINTS
MAR holds the address being accessed [1]; MDR holds the data or instruction being transferred [1]; PC holds the next
instruction address [1]; CIR holds the current instruction [1].
Q3 [2]
MARK POINTS
An n-bit address bus provides 2n distinct address patterns [1]. 212 = 4,096 locations [1]. Do not infer a number of bytes
unless location size is given.
Q4 [4]
MARK POINTS
A READ moves data/instructions from RAM towards the CPU [1]; a WRITE moves data from CPU towards RAM [1]. The CPU
specifies which memory address is accessed [1], so address signals in this simplified architecture flow from processor to
memory [1].
Q5 [4]
MARK POINTS
Von Neumann uses a shared instruction/data memory [1] and shared transfer path [1]; Harvard uses separate instruction
and data memory/pathways [1], potentially allowing instruction and data access concurrently, avoiding some shared-path
contention [1]. Accept valid equivalent comparisons.
EXAM WRITING
Do not write “the address bus carries data to RAM”. It carries addresses. Use words such as register, instruction, control
signal, memory location and shared transfer path.
13
```

### Detail of page 14
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1   PROCESSOR STRUCTURE
MODEL ANSWERS / Questions 6–8
For extended answers, award only distinct correct points that address the question.
Q6 [6] Fetch, decode, execute an ADD
INDICATIVE SIX MARK POINTS
[1] PC 48 is copied into MAR. [2] Address bus carries 48; a READ control signal requests the instruction. [3] RAM[48]
places ADD 93 on the data bus into MDR; instruction copies into CIR. [4] PC becomes 49 for normal sequential execution.
[5] CU decodes ADD and the operand address 93; CPU reads RAM[93] = 4 (via MAR/MDR). [6] ALU adds 4 to ACC 9,
leaving ACC = 13. Equivalent well-sequenced accounts gain credit.
Q7 [6] Clock, cache, cores
INDICATIVE SIX MARK POINTS
[1] Higher clock speed means more cycles per second. [2] More cycles can help performance, but work per clock cycle
varies. [3] Larger/effective cache reduces slower memory access for frequently used content. [4] Improvement depends
on cache hits and memory-access pattern. [5] More cores can execute independent work in parallel. [6] A largely
sequential program, contention or synchronisation overhead can limit the gain. Other supported trade-offs are
creditworthy.
Q8 [3] Pipelining
INDICATIVE THREE MARK POINTS
Different instructions can occupy different stages at once [1], allowing a greater number of instructions to be completed
per unit time after the pipeline fills [1]. A data dependency, branch or structural conflict may stall/flush the pipeline [1].
THE ANALOGY STOPS HERE
The highway metaphor explains communication and potential bottlenecks. It does not replace electronic signals, real
instruction encodings, clock-cycle timing, or the actual architecture of contemporary chips. For exam answers, use the
technical column—not the road names.
14
```

### Detail of page 15
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1(e)
Processor architectures: compare the routes
Understand it  /  I Do  /  We Do
A processor needs instructions and data. Architecture determines how these are stored and
accessed; performance depends on the actual design and workload.
Compare two memory pathways
VON NEUMANN
HARVARD
CPU
Shared
memory
one path
CPU
Instructions
Data
Blue: one shared route. Green: distinct instruction and data routes.
REMEMBER THIS
Two roads into City Hall. Von Neumann has shared instruction/data memory and a shared access
pathway. Harvard has separate instruction and data memories/pathways. Modern CPUs may
have split instruction/data caches yet a shared main memory.
Now be precise
• Von Neumann: instructions and data are stored in the same addressable memory; accesses may
compete for bandwidth (the Von Neumann bottleneck).
• Harvard: separate instruction and data storage and access routes can allow both to be fetched
concurrently, subject to implementation.
• Modified Harvard: a processor can have separate L1 instruction and data caches and share further
levels of memory. Do not claim every modern CPU is purely Harvard.
I DO
A CPU fetches an instruction while a previous instruction needs a data item.
Method: On a single shared memory path, requests may compete; separate instruction/data paths
reduce that specific conflict, though neither guarantees faster execution.
WE DO
A microcontroller stores fixed firmware instructions separately from changing sensor measurements.
Method: A Harvard-style arrangement is appropriate to describe the separated code/data access.
Explain the distinct routes rather than relying on the words “fast” or “slow”.
COMMON MISTAKE
Separate caches do not automatically imply separate physical main memory.
OCR H446/01  /  REVISION
15
```

### Detail of page 16
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1(e)
Exam practice
Write independently. Marks are shown beside each question.
Q1 · 2 marks. Explain one potential bottleneck of a shared instruction/data pathway.
Q2 · 4 marks. Compare Harvard and Von Neumann arrangements using instructions
and data.
Q3 · 4 marks. Explain why a contemporary CPU may not fit a simple pure-Harvard or
pure-Von-Neumann label.
OCR H446/01  /  REVISION
16
```

### Detail of page 17
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
1.1.1(e)
Mark scheme
Compare only after completing the questions.
Q1 · 2 marks
A shared access route can be needed for instruction and data fetches [1], creating contention/delays
when both are requested [1].
Q2 · 4 marks
Von Neumann stores instructions and data together [1] using a shared path [1]; Harvard separates
stores [1] and pathways [1].
Q3 · 4 marks
Separate instruction/data caches [1] can coexist with shared higher-level memory [1]; the organisation
is hybrid/modified Harvard [1]; real speed depends on implementation and workload [1].
RECALL
Two roads into City Hall: Von Neumann has shared instruction/data memory and a shared
access pathway. Harvard has separate instruction and data memories/pathways. Modern CPUs
may have split instruction/data caches yet a shared main memory.
OCR H446/01  /  REVISION
17
```

### Detail of page 18
```text
RHSC  /  A LEVEL COMPUTER SCIENCE  /  H446/01
Memory bank / processor structure
City Hall
CPU executes instructions; CU coordinates and ALU calculates.
Nearby depot
Cache stores frequently accessed data/instructions.
Next address
PC holds the next instruction address; MAR holds the address
accessed.
Package / work order
MDR holds transferred data/instructions; CIR holds the current
instruction.
Calculation desk
ACC holds arithmetic/logic results in a simplified accumulator CPU.
Highway signs
Address bus: location. Data bus: contents. Control bus: control
signals.
One common route
Von Neumann shares instruction/data memory and access paths.
Two separate routes
Harvard has separate instruction/data memories and access paths.
Assembly line
Pipelining overlaps stages of different instructions.
Speed / depot / teams
Clock speed, cache and parallelism affect performance.
Five retrieval checks
1. Which buses are involved in reading an instruction from RAM?
2. What are the different roles of MAR and MDR?
3. Why may extra CPU cores not speed up a sequential program?
4. What does pipelining improve, and what can cause a stall?
5. Where does the highway analogy stop being technically accurate?
OCR H446/01  /  RECALL THE HOOK, THEN GIVE THE PRECISE TERM
18
```

### Detail of page 19
```text
RHSC  /  A LEVEL COMPUTER SCIENCE  /  H446/01
1.1.2  PROCESSOR TYPES
1.1.2 / PROCESSOR TYPES
REMEMBER THIS / DIFFERENT ROUTES, SAME DESTINATION
On the CPU highway, RISC takes several simple, regular delivery steps; CISC can encode more work in a
single instruction. Neither route is automatically faster.
One job, different instruction-set approaches
RISC-like teaching sequence
CISC-like compound instruction
LOAD R1, [A]
LOAD R2, [B]
ADD R3, R1, R2
STORE [C], R3
ADD_MEMORY C, A, B
(illustrative pseudo-ISA)
More work per instruction
does not ensure less time.
Now be precise: instruction sets
RISC (typical)
CISC (typical)
Simpler, regular operations; load/store designs often
separate memory and arithmetic.
Richer, sometimes more complex instructions; often
variable-length encodings.
May support efficient decoding and pipelining, but
more instructions can increase program size.
May offer compact code, while decoding and internal
execution may be complex.
MISCONCEPTION TO AVOID
RISC does not always execute more quickly, and instruction count alone does not measure performance.
The teaching commands in the diagram are not real machine instructions.
19
```

### Detail of page 20
```text
RHSC  /  A LEVEL COMPUTER SCIENCE  /  H446/01
1.1.2  PROCESSOR TYPES
1.1.2 / MULTICORE PROCESSORS AND GPUs
MEMORY HOOK / MANY CHECKOUTS OR MANY IDENTICAL PARCELS
Multicore CPUs can handle separate threads; GPUs excel at applying similar operations to large numbers
of independent data elements. The analogy ends where synchronisation, branching and transfers begin.
Match the processor to the shape of the job
Multicore CPU
GPU-style parallel lanes
Core 1
Core 2
Core 3
Core 4
1
2
3
4
5
6
7
8
9
10
11
12
Several different threads
Same operation on many items
12 equal image tiles across 4 CPU cores: 12 ÷ 4 = 3 tiles per core in an ideal workload. With
equal independent work and no overhead, completion may approach a quarter of the serial time.
Real performance depends on memory access, communication, scheduling and any serial work.
WE DO / fresh problem
A graphics task has 30 independent tiles and 5 CPU worker cores. How many tiles per core?
Which two practical limits could stop the task achieving a fivefold speed-up?
Method
Expected reasoning
Divide independent work
30 ÷ 5 = 6 tiles per core.
Evaluate practical limits
Examples: serial stages, synchronisation, memory bandwidth, data transfer,
uneven workloads.
NOW BE PRECISE
A multicore CPU has several processor cores. A GPU has many execution resources suited to data-parallel
calculations, such as graphics operations or matrix processing; it is not automatically faster for sequential
tasks.
I DO / Dividing independent work
20
```

### Detail of page 21
```text
RHSC  /  A LEVEL COMPUTER SCIENCE  /  H446/01
1.1.2  PROCESSOR TYPES
REVISION SUMMARY / PROCESSOR TYPES
Use the hook to remember the idea, then replace the metaphor with exact H446 terminology.
Keyword
Exam-accurate explanation
RISC
Reduced Instruction Set Computer: an ISA approach using relatively simple regular
instructions.
CISC
Complex Instruction Set Computer: an ISA approach permitting more complex
operations.
Opcode
The operation specified by the instruction.
Code density
How much program functionality is encoded in a given amount of machine code.
Multicore CPU
Processor with multiple cores that can execute work concurrently.
GPU
Processor adapted for massive data parallelism on suitable workloads.
Synchronisation
Coordination between concurrent tasks sharing data or resources.
Bandwidth
Amount of information transferable per unit time.
QUICK SELF-TEST
1. Why can fewer instructions still take longer? 2. When does extra parallel hardware bring little benefit?
3. What does data-parallel mean?
21
```

### Detail of page 22
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
Processor types · RISC, CISC, CPU and GPU
Q1 [4 marks] State two typical characteristics of RISC designs and two typical
characteristics of CISC designs.
Q2 [6 marks] Compare the illustrative LOAD, LOAD, ADD, STORE sequence with a
compound memory-add instruction. Explain why instruction count alone does not
establish which executes more quickly.
22
```

### Detail of page 23
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
Processor types · RISC, CISC, CPU and GPU
Q3 [6 marks] Evaluate the claim that a RISC processor must always be faster than
a CISC processor. Refer to instruction decoding, pipelining and code density.
Q4 [4 marks] Give one graphics and one non-graphics use of a GPU, and explain
what makes each suitable for data-parallel execution.
23
```

### Detail of page 24
```text
RHSC   /   A LEVEL COMPUTER SCIENCE   /   H446/01
Processor types · RISC, CISC, CPU and GPU
Q5 [6 marks] A workload has 24 equal independent chunks and six CPU cores.
Calculate the ideal chunks per core and explain two limits to real speed-up.
WORKING / METHOD
Q6 [6 marks] A video pipeline contains a serial input stage and an independent
colour correction for every frame. Explain which parts may benefit from GPU
acceleration and why speed-up is not unlimited.
24
```

### Detail of page 25
```text
RHSC  /  A LEVEL COMPUTER SCIENCE  /  H446/01
1.1.2  PROCESSOR TYPES
Model answers / processor types
Award one mark for each distinct valid point. Credit equivalent correct phrasing; do not reward a point twice.
Q1  /  4 marks
[1] RISC typically uses a smaller or more regular instruction set.
[1] RISC commonly follows load/store organisation (arithmetic on registers).
[1] CISC may provide more complex, multi-operation instructions.
[1] CISC often supports richer addressing modes or variable-length instructions.
Q2  /  6 marks
[1] First LOAD obtains one input value from memory.
[1] Second LOAD obtains the other input value.
[1] ADD carries out the arithmetic on available operands.
[1] STORE writes the result to memory.
[1] A compound memory-add instruction can express more work in one instruction.
[1] Instruction count alone ignores cycles, decoding, memory access and pipeline behaviour.
Q3  /  6 marks
[1] Regular/simpler instruction formats can simplify decoding.
[1] This regularity can support efficient pipelining.
[1] A RISC sequence may require more instructions for the same task.
[1] That can increase code size and/or instruction-fetch work.
[1] CISC may improve code density with richer individual instructions.
[1] Actual performance depends on implementation and workload, not the ISA label alone.
Q4  /  4 marks
[1] Graphics example: image rendering or applying a filter to many pixels.
[1] Many pixels can undergo similar independent calculations concurrently.
[1] Non-graphics example: machine-learning matrix operations.
[1] Independent matrix elements/operations can be processed across parallel GPU units.
Q5  /  6 marks
[1] Calculate 24 / 6 = 4 chunks per core.
[1] With equal independent chunks, ideal distribution is four to each core.
[1] Some sequential stages of a workload cannot be parallelised.
[1] Those sequential stages limit overall acceleration even with more cores.
[1] Synchronisation, communication or task creation can introduce overhead.
[1] Memory bandwidth contention, transfers or uneven work can further reduce speed-up.
Q6  /  6 marks
[1] Indepe
```

### Detail of page 26
```text
RHSC / A LEVEL COMPUTER SCIENCE / H446
PAPER 1
1.1.3 Input, output and storage
Remember the control room: SENSE → SAMPLE → DECIDE → ACT. Sensors collect
measurements; software processes them; actuators change the physical world. An ADC
converts an analogue signal into digital samples when needed.
From the physical world to a controlled action
Sensor
measures heat
ADC
digitises reading
Controller
compares limit
Actuator
opens vent
Only use an ADC when the sensor signal needs analogue-to-digital conversion.
SENSE > SAMPLE > DECIDE > ACT
NOW BE PRECISE
An input device supplies data to a computer. An output device presents information or
controls a physical process. A sensor is an input transducer; an actuator creates an action.
An ADC is needed only where the incoming signal is analogue and digital processing is
required.
I DO / Automatic door
Choose a suitable input and output for an automatic door. A proximity sensor detects an
approaching person; the controller evaluates the reading, and a motor actuator opens the
door. Safety sensing must also check when it is safe to close.
WE DO / Pedestrian crossing
A crossing must work for people with different accessibility needs. Identify one input and two
output methods.
Guided explanation
Use an accessible push button as input. Signal lights give visual information; audible
and/or tactile outputs assist users with different needs. The control system must obey safe
timing rules.
26
```

## First 45 classroom-label spans
page 7; box (65.5, 74.8, 365.2, 89.6); font DejaVuSans-Bold 14.8; `I DO / trace an assembly instruction`
page 7; box (74.9, 117.1, 343.1, 135.1); font NotoSans-Regular 13.2; `I DO: TRACE LOAD 205 - ONE INSTRUCTION`
page 7; box (68.5, 570.9, 169.2, 578.9); font DejaVuSans-Bold 8.0; `I DO / MEMORY CHECK`
page 8; box (65.5, 74.8, 413.2, 89.6); font DejaVuSans-Bold 14.8; `WE DO / different question, same method`
page 15; box (49.0, 90.2, 186.9, 99.2); font DejaVuSans 9.0; `Understand it  /  I Do  /  We Do`
page 15; box (49.0, 545.8, 75.4, 556.8); font DejaVuSans-Bold 11.0; `I DO`
page 15; box (49.0, 624.8, 91.0, 635.8); font DejaVuSans-Bold 11.0; `WE DO`
page 20; box (65.5, 475.9, 219.3, 487.9); font DejaVuSans-Bold 12.0; `WE DO / fresh problem`
page 20; box (65.5, 402.3, 290.0, 416.2); font DejaVuSans-Bold 12.0; `I DO / Dividing independent work`
page 26; box (62.7, 452.8, 233.1, 466.8); font DejaVuSans-Bold 14.0; `I DO / Automatic door`
page 26; box (62.7, 537.8, 287.5, 551.8); font DejaVuSans-Bold 14.0; `WE DO / Pedestrian crossing`
page 27; box (62.7, 436.8, 220.1, 450.8); font DejaVuSans-Bold 14.0; `I DO / Photographer`
page 27; box (62.7, 537.8, 268.2, 551.8); font DejaVuSans-Bold 14.0; `WE DO / Offline exhibition`
page 28; box (62.7, 424.7, 190.2, 438.7); font DejaVuSans-Bold 14.0; `I DO / Power cut`
page 28; box (62.7, 493.7, 278.1, 507.7); font DejaVuSans-Bold 14.0; `WE DO / Online coursework`
page 34; box (65.5, 217.2, 200.7, 227.8); font DejaVuSans-Bold 10.6; `I DO / worked example`
page 34; box (65.5, 343.1, 290.5, 353.7); font DejaVuSans-Bold 10.6; `WE DO / same skill, different problem`
page 39; box (43.0, 89.9, 275.8, 101.9); font DejaVuSans-Bold 12.0; `I Do / browser, backup and printer`
page 39; box (43.0, 524.9, 372.1, 536.9); font DejaVuSans-Bold 12.0; `We Do / same responsibilities, different problem`
page 40; box (44.0, 194.0, 258.2, 205.7); font DejaVuSans-Bold 11.7; `I Do / translate a virtual address`
page 40; box (44.0, 536.2, 245.7, 547.9); font DejaVuSans-Bold 11.7; `We Do / a different translation`
page 45; box (44.0, 475.3, 337.6, 487.0); font DejaVuSans-Bold 11.7; `I Do / key pressed during a running program`
page 45; box (44.0, 569.5, 232.3, 581.2); font DejaVuSans-Bold 11.7; `We Do / disk read completes`
page 49; box (43.0, 278.5, 220.7, 288.2); font DejaVuSans-Bold 9.7; `I DO / CALCULATE WAITING TIME`
page 49; box (43.0, 359.1, 182.8, 368.8); font DejaVuSans-Bold 9.7; `I DO / SRTF PRE-EMPTION`
page 49; box (43.0, 439.7, 228.4, 449.4); font DejaVuSans-Bold 9.7; `WE DO / OS BEYOND SCHEDULING`
page 51; box (43.0, 566.4, 207.9, 577.7); font DejaVuSans-Bold 11.3; `I DO / EVALUATE WAITING`
page 52; box (43.0, 455.6, 371.1, 466.9); font DejaVuSans-Bold 11.3; `WE DO / A DIFFERENT FEEDBACK-QUEUE SCHEDULE`
page 60; box (43.0, 89.9, 262.4, 101.9); font DejaVuSans-Bold 12.0; `I Do / emergency-stop controller`
page 60; box (43.0, 251.0, 250.0, 263.0); font DejaVuSans-Bold 12.0; `We Do / school network server`
page 64; box (43.0, 478.7, 227.0, 490.7); font DejaVuSans-Bold 12.0; `I Do / laptop is switched on`
page 64; box (43.0, 576.3, 249.4, 588.3); font DejaVuSans-Bold 12.0; `We Do / boot fails before login`
page 65; box (43.0, 450.8, 315.1, 462.8); font DejaVuSans-Bold 12.0; `I Do / a printer appears but cannot print`
page 65; box (43.0, 532.0, 197.2, 544.0); font DejaVuSans-Bold 12.0; `We Do / a new scanner`
page 67; box (43.0, 89.9, 308.8, 101.9); font DejaVuSans-Bold 12.0; `I Do / test another OS on one computer`
page 67; box (43.0, 251.0, 304.2, 263.0); font DejaVuSans-Bold 12.0; `We Do / program for several platforms`
page 72; box (65.5, 217.2, 200.7, 227.8); font DejaVuSans-Bold 10.6; `I DO / worked example`
page 72; box (65.5, 343.1, 290.5, 353.7); font DejaVuSans-Bold 10.6; `WE DO / same skill, different problem`
page 76; box (43.0, 401.0, 382.1, 413.0); font DejaVuSans-Bold 12.0; `I Do / a school writes a report and analyses marks`
page 76; box (43.0, 498.6, 235.3, 510.6); font DejaVuSans-Bold 12.0; `We Do / a photo department`
page 77; box (43.0, 549.1, 235.5, 561.1); font DejaVuSans-Bold 12.0; `I Do / coursework protection`
page 77; box (43.0, 630.3, 228.9, 642.3); font DejaVuSans-Bold 12.0; `We Do / a full school laptop`
page 78; box (43.0, 474.6, 340.1, 486.6); font DejaVuSans-Bold 12.0; `I Do / missing PrintReport() implementation`
page 78; box (43.0, 572.2, 280.5, 584.2); font DejaVuSans-Bold 12.0; `We Do / built program fails to start`
page 82; box (62.7, 435.6, 243.5, 449.6); font DejaVuSans-Bold 14.0; `I DO / High-risk project`
