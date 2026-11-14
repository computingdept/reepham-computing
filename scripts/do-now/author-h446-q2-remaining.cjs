#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const bankPath = path.resolve(__dirname, '../../data/do-now/q2-drafts/h446.json');
const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));

// Reusable retrieval prompts. Every source ID names the lesson that teaches
// the tested concept; a lesson only receives a prompt once that source is
// earlier than its immediately preceding lesson. These are teacher-review
// drafts and are not connected to classroom pages.
// [source, one-screen question, 4 short answers, correct index, explanation]
const pool = [
 ['L001','Which data type preserves leading zeroes?',['String','Integer','Boolean','Float'],0,'An identifier is stored as a string so leading zeroes remain.'],
 ['L002','Which representation uses invert-then-add-one?',['TwosComplement','SignMagnitude','Unsigned','BCD'],0,'Two’s complement negates a fixed-width value by inverting bits and adding one.'],
 ['L003','How many bits represent one hexadecimal digit?',['Four','Two','Eight','Sixteen'],0,'One hexadecimal digit represents a four-bit nibble.'],
 ['L004','Which part scales a floating-point mantissa?',['Exponent','Sign','Index','Flag'],0,'The exponent determines the power-of-two scale.'],
 ['L008','Which character set supports most world scripts?',['Unicode','ASCII','Baudot','BCD'],0,'Unicode covers a much wider range of characters than ASCII.'],
 ['L009','Which symbol means logical AND in C#?',['&&','||','!','^'],0,'The && operator requires both conditions to be true.'],
 ['L010','Which loop normally suits a known count?',['for','while','do','switch'],0,'A for loop combines initialisation, condition and update.'],
 ['L011','Which subroutine returns a value?',['Function','Procedure','Loop','Class'],0,'A function passes a return value to its caller.'],
 ['L012','Which term names an input in a method declaration?',['Parameter','Argument','Variable','Property'],0,'Parameters are named in the declaration; arguments are passed in calls.'],
 ['L014','What does GetLength(1) count in a 2D grid?',['Columns','Rows','Boards','Classes'],0,'For board[row,column], dimension 1 counts columns.'],
 ['L017','What identifies an array element’s position?',['Index','Value','Type','Size'],0,'The index locates an element within an array.'],
 ['L018','Which collection can grow or shrink?',['List','Array','Record','Tuple'],0,'A C# List can change its number of elements.'],
 ['L019','Which field links to the next node?',['Next','Root','Key','Index'],0,'A linked-list node uses a next reference or index.'],
 ['L020','Which data structure uses FIFO?',['Queue','Stack','Tree','Graph'],0,'A queue removes the earliest item first.'],
 ['L021','What is a point in a graph called?',['Vertex','Edge','Root','Branch'],0,'Vertices are graph nodes connected by edges.'],
 ['L022','Which BST branch holds smaller values?',['Left','Right','Top','Bottom'],0,'Smaller keys go into the left subtree of a binary search tree.'],
 ['L023','What occurs when two keys share a hash location?',['Collision','Overflow','Traversal','Merge'],0,'A collision occurs when different keys map to the same bucket.'],
 ['L025','Which input condition enables binary search?',['Sorted','Random','Unique','Reversed'],0,'Binary search relies on the values being ordered.'],
 ['L026','Which gate is true only for two true inputs?',['AND','OR','XOR','NOR'],0,'AND is true only when both operands are true.'],
 ['L027','Which operator replaces OR under De Morgan’s law?',['AND','XOR','NOR','OR'],0,'Negating an OR expression produces AND of the negated inputs.'],
 ['L028','What do basic Karnaugh-map SOP groups contain?',['Ones','Bytes','Indexes','Signs'],0,'Sum-of-products minimisation groups adjacent 1s.'],
 ['L030','Which output records overflow from an adder column?',['Carry','Sum','Clock','Input'],0,'Carry-out records the binary carry from addition.'],
 ['L031','Which input does a D flip-flop sample?',['D','Q','CLK','RST'],0,'The D input is copied to Q on the active clock edge.'],
 ['L038','What is an instance of a class called?',['Object','Method','Field','Property'],0,'An object is an instance of a class.'],
 ['L039','Which class feature stores an object’s state?',['Attribute','Method','Constructor','Namespace'],0,'Attributes store an object’s data and state.'],
 ['L040','Which method initialises an object?',['Constructor','Destructor','Accessor','Override'],0,'A constructor runs when a new object is created.'],
 ['L041','Which access modifier hides class members externally?',['private','public','virtual','static'],0,'private restricts access to the declaring class.'],
 ['L042','Which OOP mechanism reuses a parent class?',['Inheritance','Encapsulation','Compilation','Indexing'],0,'Inheritance allows a derived class to reuse base-class behaviour.'],
 ['L043','Which keyword lets a derived method replace behaviour?',['override','private','static','readonly'],0,'An override supplies specialised behaviour for a virtual member.'],
 ['L047','In a 2D array, what does the second index identify?',['Column','Row','Depth','Page'],0,'For array[row,column], the second index selects a column.'],
 ['L048','Which List method appends an item?',['Add','Insert','Remove','Clear'],0,'Add places an item at the end of a List.'],
 ['L049','Which removal principle describes a stack?',['LIFO','FIFO','FILO','Random'],0,'Stacks remove the most recently pushed item first.'],
 ['L050','Which service order describes a queue?',['FIFO','LIFO','Random','Priority'],0,'FIFO removes the item that arrived earliest.'],
 ['L051','Which reference identifies the first linked-list node?',['Head','Tail','Root','Leaf'],0,'HEAD refers to the first node in a linked list.'],
 ['L052','Which BST branch holds a smaller key?',['Left','Right','Root','Tail'],0,'Smaller keys follow the left branch.'],
 ['L053','Which structure normally drives breadth-first traversal?',['Queue','Stack','Tree','Heap'],0,'BFS discovers a level before moving to the next using a queue.'],
 ['L054','Which structure maps keys to values?',['Dictionary','Stack','Queue','Tree'],0,'A dictionary associates each key with its value.'],
 ['L056','Which traversal visits left, right, then root?',['Postorder','Preorder','Inorder','Levelorder'],0,'Postorder traverses both subtrees before the root.'],
 ['L059','Which method removes irrelevant details?',['Abstraction','Validation','Compilation','Encryption'],0,'Abstraction keeps only details relevant to the problem.'],
 ['L060','What must be checked before trusting a model?',['Assumptions','Passwords','Registers','Opcodes'],0,'A model depends on assumptions which must be checked.'],
 ['L061','What must hold before an algorithm starts?',['Precondition','Postcondition','Breakpoint','Exception'],0,'A precondition is an input requirement before execution.'],
 ['L062','Which term means one task relies on another?',['Dependency','Iteration','Variable','Output'],0,'A dependency determines which subprocedure must run first.'],
 ['L063','Which operator combines two true conditions?',['AND','XOR','NOT','MOD'],0,'AND is true only when both inputs are true.'],
 ['L064','Which term describes simultaneous independent work?',['Parallelism','Caching','Recursion','Paging'],0,'Parallelism is actual work occurring at the same time.'],
 ['L066','Which method separates a complex problem into parts?',['Decomposition','Encapsulation','Compression','Compilation'],0,'Decomposition splits a problem into smaller solvable tasks.'],
 ['L067','Which search repeatedly halves its search area?',['Binary','Linear','Sequential','Random'],0,'Binary search uses divide-and-conquer on sorted data.'],
 ['L068','Which method undoes a failed choice?',['Backtracking','Indexing','Hashing','Linking'],0,'Backtracking reverts choices that lead to dead ends.'],
 ['L069','Which term describes an unusually distant data value?',['Outlier','Median','Mode','Range'],0,'An outlier differs markedly from most observations.'],
 ['L070','Which method uses an estimate to guide searching?',['Heuristic','Exhaustive','Sequential','Random'],0,'A heuristic estimates which search step is promising.'],
 ['L071','Which CPU technique overlaps instruction stages?',['Pipelining','Paging','Caching','Swapping'],0,'Pipelining processes different instructions in overlapping stages.'],
 ['L072','What gives ordered steps for solving a problem?',['Algorithm','Protocol','Compiler','Opcode'],0,'An algorithm is a defined sequence of steps.'],
 ['L073','Which table tracks variables during execution?',['Trace','Truth','Lookup','Hash'],0,'A trace table records how variables change.'],
 ['L074','Which notation describes linear time?',['O(n)','O(1)','O(logn)','O(n²)'],0,'O(n) means the required work grows in proportion to the input size.'],
 ['L075','Which complexity grows with n squared?',['Quadratic','Linear','Constant','Logarithmic'],0,'Quadratic growth is O(n²).'],
 ['L076','Which measure records extra algorithm memory?',['Space','Time','Latency','Throughput'],0,'Auxiliary space counts extra working memory.'],
 ['L077','Which search checks items sequentially?',['Linear','Binary','Hash','Depth'],0,'Linear search examines one item after another.'],
 ['L078','Which search needs sorted input?',['Binary','Linear','Hash','Random'],0,'Binary search discards half an ordered interval.'],
 ['L079','Which sort exchanges neighbouring values?',['Bubble','Merge','Quick','Insertion'],0,'Bubble sort swaps adjacent out-of-order items.'],
 ['L080','Which sort expands a sorted prefix?',['Insertion','Bubble','Merge','Quick'],0,'Insertion sort places each key into a growing sorted prefix.'],
 ['L081','Which sort combines ordered runs?',['Merge','Quick','Bubble','Selection'],0,'Merge sort joins previously sorted runs.'],
 ['L082','Which value partitions an array in quicksort?',['Pivot','Index','Sentinel','Root'],0,'Quicksort rearranges elements around a pivot.'],
 ['L083','Which algorithm finds nonnegative shortest paths?',['Dijkstra','Kruskal','Bubble','Prim'],0,'Dijkstra finds shortest paths when edge weights are non-negative.'],
 ['L084','Which A* score estimates distance remaining?',['h','f','g','n'],0,'The h score is the heuristic estimate to the goal.'],
 ['L086','Which error gives a wrong result without invalid syntax?',['Logic','Syntax','Typing','Compilation'],0,'A logic error causes incorrect results even when code can execute.'],
 ['L089','Which CPU component performs arithmetic?',['ALU','MAR','PC','CIR'],0,'The arithmetic logic unit performs arithmetic and logic operations.'],
 ['L090','Which unit coordinates instruction execution?',['Control','ALU','Cache','Bus'],0,'The control unit decodes and coordinates CPU operations.'],
 ['L091','Which register holds a memory address?',['MAR','MDR','CIR','ACC'],0,'MAR stores the address for a memory access.'],
 ['L092','Which bus transfers data values?',['Data','Address','Control','Clock'],0,'The data bus carries values between components.'],
 ['L094','Which measure counts processor cycles per second?',['Clock','Core','Cache','Bus'],0,'Clock speed indicates cycles each second.'],
 ['L095','What can interrupt instruction pipelining?',['Hazard','Cache','Clock','Opcode'],0,'A pipeline hazard delays or disrupts overlapping instructions.'],
 ['L096','Which LMC instruction accepts an input?',['INP','OUT','STA','LDA'],0,'INP reads a supplied value into the accumulator.'],
 ['L097','Which LMC instruction branches on zero?',['BRZ','BRA','BRP','HLT'],0,'BRZ branches when the accumulator is zero.'],
 ['L099','Which instruction set tends to use simpler commands?',['RISC','CISC','GPU','LMC'],0,'RISC uses a smaller set of relatively simple instructions.'],
 ['L100','Which processor excels at massive parallel work?',['GPU','ROM','SSD','NIC'],0,'GPUs execute many similar operations in parallel.'],
 ['L101','What describes multiple cores working simultaneously?',['Parallelism','Caching','Paging','Spooling'],0,'Multiple cores can execute independent work in parallel.'],
 ['L103','Which device category sends information outward?',['Output','Input','Storage','Memory'],0,'An output device communicates a result or causes action.'],
 ['L104','Which storage typically uses magnetic platters?',['HDD','SSD','DVD','ROM'],0,'Hard disk drives store data on magnetic platters.'],
 ['L105','Which memory loses its contents without power?',['RAM','ROM','Flash','SSD'],0,'RAM is normally volatile.'],
 ['L106','Which software manages hardware resources?',['OS','IDE','Browser','Compiler'],0,'An operating system schedules and manages hardware resources.'],
 ['L107','Which technique maps virtual pages to frames?',['Paging','Sorting','Hashing','Linking'],0,'Paging maps virtual pages to physical frames.'],
 ['L108','What signals that the CPU must handle an event?',['Interrupt','Cache','Index','Pointer'],0,'An interrupt diverts the processor to a handler.'],
 ['L109','Which scheduler runs jobs in arrival order?',['FCFS','SJF','SRT','RR'],0,'First Come First Served uses arrival order.'],
 ['L110','Which scheduler gives jobs repeated time slices?',['Round-robin','FCFS','SJF','SRT'],0,'Round Robin cycles through runnable processes using time quanta.'],
 ['L111','Which software bridges an OS and a device?',['Driver','Compiler','Browser','Protocol'],0,'A device driver exposes hardware operations to the OS.'],
 ['L113','Which source model permits code inspection?',['Open','Closed','Binary','Encrypted'],0,'Open-source licences permit access to source code.'],
 ['L114','Which translator compiles a complete program?',['Compiler','Interpreter','Assembler','Linker'],0,'A compiler translates source into target or intermediate code.'],
 ['L115','Which stage generates target instructions?',['Codegen','Lexing','Parsing','Linking'],0,'Code generation produces target instructions from a program representation.'],
 ['L116','Which tool combines separately compiled modules?',['Linker','Loader','Compiler','Debugger'],0,'A linker resolves external symbols and combines modules.'],
 ['L117','Which lifecycle uses ordered fixed stages?',['Waterfall','Agile','RAD','XP'],0,'Waterfall follows sequential development phases.'],
 ['L118','Which method commonly uses pair programming?',['XP','Waterfall','Spiral','RAD'],0,'Extreme Programming includes pair programming.'],
 ['L119','Which model revisits risks over repeated cycles?',['Spiral','Waterfall','VModel','BigBang'],0,'Spiral development addresses risks in repeated iterations.'],
 ['L120','Which table follows variable values through code?',['Trace','Truth','Lookup','Data'],0,'Trace tables record intermediate state.'],
 ['L121','Which process checks that input values are allowed?',['Validation','Compilation','Encryption','Sorting'],0,'Validation rejects input that breaks specified rules.'],
 ['L123','Which paradigm organises code around objects?',['OOP','Procedural','Functional','Declarative'],0,'Object-oriented programming organises behaviour and state in objects.'],
 ['L124','Which paradigm organises code into procedures?',['Procedural','Functional','Declarative','Object'],0,'Procedural programs use procedures and explicit state changes.'],
 ['L125','Which language uses symbolic machine instructions?',['Assembly','Python','HTML','SQL'],0,'Assembly represents CPU instructions using mnemonic symbols.'],
 ['L126','Which addressing mode places a constant in the instruction?',['Immediate','Indirect','Indexed','Direct'],0,'Immediate addressing embeds a literal operand.'],
 ['L127','Which compression allows exact restoration?',['Lossless','Lossy','Random','Adaptive'],0,'Lossless encoding reconstructs the exact original data.'],
 ['L128','Which compression stores counts of repeated symbols?',['RLE','JPEG','Huffman','LZW'],0,'Run-length encoding stores runs as a symbol and a count.'],
 ['L129','Which scheme replaces repeated strings with references?',['Dictionary','RLE','Lossy','Delta'],0,'Dictionary compression stores repeated sequences by reference.'],
 ['L130','Which encryption uses one shared key?',['Symmetric','Asymmetric','Hybrid','Hashing'],0,'Symmetric encryption uses the same secret key to encrypt and decrypt.'],
 ['L131','Which encryption uses public and private keys?',['Asymmetric','Symmetric','Hashing','RLE'],0,'Asymmetric encryption uses a public-private key pair.'],
 ['L132','Which approach combines two encryption methods?',['Hybrid','Symmetric','Hash','Substitution'],0,'Hybrid encryption combines asymmetric key exchange with symmetric data encryption.'],
 ['L133','Which function creates a fixed-length digest?',['Hash','Cipher','Compress','Parse'],0,'A cryptographic hash function returns a fixed-size digest.'],
 ['L134','Which designated database key identifies each row?',['Primary','Foreign','Composite','Secondary'],0,'A primary key uniquely identifies rows in the table.'],
 ['L136','Which normal form removes partial dependencies?',['2NF','1NF','3NF','UNF'],0,'Second normal form removes partial dependency on composite keys.'],
 ['L137','Which normal form removes transitive dependencies?',['3NF','1NF','2NF','UNF'],0,'Third normal form removes transitive dependencies.'],
 ['L138','Which SQL keyword specifies returned columns?',['SELECT','WHERE','ORDER','JOIN'],0,'SELECT chooses output columns.'],
 ['L139','Which SQL keyword modifies existing rows?',['UPDATE','INSERT','DELETE','SELECT'],0,'UPDATE changes column values in existing records.'],
 ['L140','Which rule keeps foreign-key references valid?',['Referential','Domain','Entity','Unique'],0,'Referential integrity requires foreign keys to refer to valid keys.'],
 ['L141','Which ACID property avoids partial transactions?',['Atomicity','Isolation','Durability','Consistency'],0,'Atomicity means all-or-nothing transaction completion.'],
 ['L142','Which network type normally covers a school?',['LAN','WAN','PAN','MAN'],0,'A local area network covers a limited site.'],
 ['L143','Which TCP/IP layer handles IP routing?',['Internet','Transport','Application','Link'],0,'The Internet layer routes IP packets.'],
 ['L144','Which service resolves domain names to IP addresses?',['DNS','DHCP','HTTP','SMTP'],0,'DNS provides relevant address records for a domain.'],
 ['L145','Which switching method divides messages into units?',['Packet','Circuit','Serial','Parallel'],0,'Packet switching transfers separately addressed packets.'],
 ['L146','Which attack overwhelms a service with traffic?',['DDoS','Phishing','Spoofing','Malware'],0,'Distributed denial of service floods a target.'],
 ['L147','Which control filters network traffic by policy?',['Firewall','Router','Switch','Modem'],0,'A firewall enforces traffic rules.'],
 ['L148','Which device forwards packets between IP networks?',['Router','Switch','Hub','Repeater'],0,'Routers forward packets based on network addresses.'],
 ['L149','Which role provides services in a client-server network?',['Server','Client','Router','Switch'],0,'A server provides shared network resources to clients.'],
 ['L150','Which language structures a web page?',['HTML','CSS','SQL','JSON'],0,'HTML describes the structure and semantic content of pages.'],
 ['L151','Which language styles a web page?',['CSS','HTML','SQL','CSharp'],0,'CSS rules style HTML elements.'],
 ['L152','Which language handles browser DOM events?',['JavaScript','CSS','HTML','SQL'],0,'JavaScript responds to events and changes the DOM.'],
 ['L153','Which side must validate forms securely?',['Server','Client','Browser','CSS'],0,'The server must validate submitted values even if the browser also checks.'],
 ['L154','Which stage discovers pages for search engines?',['Crawling','Indexing','Ranking','Parsing'],0,'Crawlers visit pages so a search engine can index them.'],
 ['L155','Which ranking method uses the link graph?',['PageRank','Quicksort','Dijkstra','Hashing'],0,'PageRank derives scores from the link structure.'],
 ['L156','Which side runs code on the user’s device?',['Client','Server','Proxy','Cloud'],0,'Client-side processing happens on the user’s device.'],
 ['L157','Which UK framework regulates personal data?',['GDPR','CMA','CDPA','RIPA'],0,'UK GDPR sets rules for processing personal data.'],
 ['L158','Under the Computer Misuse Act, which access is prohibited?',['Unauthorised','Licensed','Permitted','Approved'],0,'Access without the owner’s permission is an offence under the Computer Misuse Act.'],
 ['L159','Which act protects software copyright?',['CDPA','CMA','RIPA','GDPR'],0,'The Copyright, Designs and Patents Act protects software and creative content.'],
 ['L160','Which law covers certain interception powers?',['RIPA','CMA','GDPR','CDPA'],0,'RIPA includes powers and safeguards concerning interception.'],
 // New Year 13 teaching, available only after its source lesson.
 ['L181','Which case stops a recursive function?',['Base','Recursive','Worst','General'],0,'The base case provides a stopping condition.'],
 ['L182','Which structure tracks nested function calls?',['Stack','Queue','Array','Hash'],0,'Each recursive call adds a frame to the call stack.'],
 ['L184','Which sort swaps adjacent out-of-order elements?',['Bubble','Merge','Quick','Insertion'],0,'Bubble sort performs adjacent swaps across passes.'],
 ['L185','Which sort places a key into a sorted prefix?',['Insertion','Bubble','Quick','Merge'],0,'Insertion sort grows a sorted prefix.'],
 ['L186','Which sort combines previously ordered runs?',['Merge','Quick','Bubble','Selection'],0,'Merge sort merges ordered runs.'],
 ['L187','Which search checks items from the start?',['Linear','Binary','Hash','Tree'],0,'Linear search examines items sequentially.'],
 ['L188','Which search needs an ordered array?',['Binary','Linear','Random','Sequential'],0,'Binary search discards half a sorted search interval.'],
 ['L192','Which parameter mode can alter the caller’s variable?',['byRef','byVal','const','private'],0,'By-reference passing can modify the referenced caller variable.'],
 ['L194','Which part stores a floating-point fraction?',['Mantissa','Exponent','Index','Opcode'],0,'The mantissa contains the significand bits.'],
 ['L197','Which structure removes the most recent item?',['Stack','Queue','Tree','Graph'],0,'A stack uses Last In First Out.'],
 ['L198','Which reference moves through linked nodes?',['Next','Root','Key','Index'],0,'Each next reference points to the next node.'],
 ['L199','Which BST branch holds smaller values?',['Left','Right','Root','Parent'],0,'Smaller values belong in the left subtree of a binary search tree.'],
 ['L200','Which structure can store a graph’s neighbours?',['List','Stack','Queue','Record'],0,'An adjacency list records neighbours per vertex.'],
 ['L201','What happens when two keys hash to one bucket?',['Collision','Overflow','Recursion','Merge'],0,'A hash collision occurs when locations match.'],
 ['L202','Which operator replaces AND in a De Morgan rewrite?',['OR','AND','XOR','NOT'],0,'Negating an AND gives an OR of negated operands.'],
 ['L203','What do basic SOP Karnaugh-map groups contain?',['Ones','Zeroes','Bytes','Edges'],0,'Grouping adjacent 1s removes changing variables.'],
 ['L204','Which logic component stores one bit?',['Flip-flop','Adder','Decoder','Encoder'],0,'A flip-flop stores a bit of state.'],
 ['L216','What defines a quicksort partition?',['Pivot','Index','Root','Queue'],0,'Quicksort partitions its input around a pivot.'],
 ['L218','Which algorithm requires nonnegative edge weights?',['Dijkstra','Quicksort','PageRank','Bubble'],0,'Dijkstra’s greedy shortest-path guarantee needs non-negative weights.'],
 ['L220','Which search uses g and h estimates?',['A*','Dijkstra','Bubble','Binary'],0,'A* combines path cost g and heuristic estimate h.'],
 ['L223','Which link identifies the next object in a list?',['Next','Root','Index','Value'],0,'Object-based linked lists use next references.'],
 ['L224','Which side of a BST holds smaller keys?',['Left','Right','Root','Parent'],0,'BST insertion compares with the current node.'],
 ['L229','Which paradigm centres on object state?',['OOP','Procedural','Functional','Assembly'],0,'OOP groups data and behaviour into objects.'],
 ['L233','Which lifecycle uses short Agile iterations?',['Sprint','Waterfall','Spiral','VModel'],0,'Agile teams often work in short sprints.'],
 ['L237','Which testing term means a previously fixed feature fails?',['Regression','Boundary','Unit','Normal'],0,'A regression reintroduces a defect after a change.'],
 ['L240','Which test type checks unusual boundary values?',['Boundary','Normal','Load','Smoke'],0,'Boundary tests probe values at and next to limits.'],
 ['L244','Which term describes making progress on overlapping tasks?',['Concurrency','Recursion','Sorting','Encoding'],0,'Concurrency allows progress on independent tasks during overlapping periods.'],
 ['L249','Which complexity describes repeated halving?',['Logarithmic','Linear','Quadratic','Constant'],0,'Logarithmic time is typical of repeated halving.']
 ,['L251','Which CPU register stores the next instruction address?',['PC','MAR','MDR','ACC'],0,'The program counter stores the address of the next instruction.']
 ,['L252','Which bus carries a memory location?',['Address','Data','Control','Clock'],0,'The address bus carries the location being accessed.']
 ,['L253','Which memory provides fast CPU access to recent data?',['Cache','ROM','Flash','HDD'],0,'Cache retains copies of frequently or recently needed data.']
 ,['L254','Which architecture separates instruction and data memories?',['Harvard','RISC','CISC','Neumann'],0,'Harvard architecture uses separate instruction and data memories.']
 ,['L255','Which architecture favours simpler instructions?',['RISC','CISC','SIMD','GPU'],0,'RISC designs typically use simpler instructions.']
 ,['L256','Which processor excels at many similar calculations?',['GPU','CPU','ROM','SSD'],0,'A GPU supports highly parallel computation.']
 ,['L257','Which class of device reads a barcode?',['Input','Output','Storage','Memory'],0,'A barcode reader is an input device.']
 ,['L259','Which medium uses laser-read optical discs?',['Optical','Magnetic','Flash','Cloud'],0,'Optical discs are read using a laser.']
 ,['L260','Which memory normally loses data without power?',['RAM','ROM','Flash','SSD'],0,'RAM is volatile working memory.']
 ,['L261','Which addressing mode embeds a literal?',['Immediate','Indexed','Indirect','Direct'],0,'Immediate operands are literal values within instructions.']
 ,['L262','Which LMC instruction stores the accumulator?',['STA','LDA','ADD','INP'],0,'STA writes the accumulator value to a mailbox.']
 ,['L263','Which LMC instruction branches on zero?',['BRZ','BRP','BRA','HLT'],0,'BRZ branches if the accumulator is zero.']
 ,['L264','Which software schedules processes and memory?',['OS','IDE','Browser','Compiler'],0,'The operating system manages processes and hardware resources.']
 ,['L266','Which technique maps memory pages to frames?',['Paging','Sorting','Hashing','Encoding'],0,'Paging maps virtual pages into physical frames.']
 ,['L267','Which event diverts the CPU to a handler?',['Interrupt','Loop','Cache','Trace'],0,'An interrupt causes service code to run.']
 ,['L268','Which scheduling method rotates time slices?',['RoundRobin','FCFS','SJF','SRT'],0,'Round Robin assigns each runnable process a time quantum.']
 ,['L269','Which OS supports immediate time-critical responses?',['Real-time','Batch','Desktop','Network'],0,'A real-time operating system aims to satisfy timing deadlines.']
 ,['L270','Which software lets an OS operate a peripheral?',['Driver','Loader','Compiler','Browser'],0,'A device driver translates software requests into hardware operations.']
 ,['L271','Which licence model makes source code available?',['Open','Closed','Trial','Binary'],0,'Open-source licences make source code available under their terms.']
 ,['L273','Which translator executes statements directly?',['Interpreter','Compiler','Linker','Assembler'],0,'An interpreter processes instructions at runtime.']
 ,['L274','Which tool resolves cross-module references?',['Linker','Parser','Lexer','Editor'],0,'A linker resolves external references across compiled modules.']
 ,['L275','Which key uniquely identifies a database row?',['Primary','Foreign','Secondary','Alternate'],0,'A primary key identifies each table record uniquely.']
 ,['L276','Which diagram models entities and relationships?',['ERD','DFD','UML','Gantt'],0,'An entity relationship diagram models data entities and links.']
 ,['L277','Which normal form removes transitive dependency?',['3NF','2NF','1NF','UNF'],0,'Third normal form removes transitive dependency on a key.']
 ,['L278','Which SQL command retrieves records?',['SELECT','UPDATE','DELETE','INSERT'],0,'SELECT retrieves rows and columns from tables.']
 ,['L279','Which SQL command removes rows?',['DELETE','DROP','INSERT','ALTER'],0,'DELETE removes matching rows; DROP removes a table.']
 ,['L281','Which transaction property means all-or-nothing?',['Atomicity','Isolation','Durability','Consistency'],0,'Atomicity prevents partial commits.']
 ,['L282','Which device routes between IP networks?',['Router','Switch','Hub','Repeater'],0,'A router forwards packets between networks.']
 ,['L283','Which service maps a domain to an IP address?',['DNS','DHCP','SMTP','FTP'],0,'DNS records can resolve domain names into IP addresses.']
 ,['L284','Which switching method sends separately routed units?',['Packet','Circuit','Serial','Parallel'],0,'Packet switching sends individually addressed packets.']
 ,['L285','Which component filters connections by security policy?',['Firewall','Repeater','Hub','Bridge'],0,'A firewall applies rules to network traffic.']
 ,['L286','Which compression restores the original exactly?',['Lossless','Lossy','Hybrid','Adaptive'],0,'Lossless compression is completely reversible.']
 ,['L287','Which compression records repeated runs?',['RLE','JPEG','MP3','PNG'],0,'Run-length encoding represents a run with its symbol and count.']
 ,['L288','Which encryption uses one shared secret key?',['Symmetric','Asymmetric','Hashing','Compression'],0,'Symmetric encryption encrypts and decrypts using the shared secret.']
 ,['L289','Which cryptographic process produces a digest?',['Hashing','Sorting','Encoding','Parsing'],0,'Hashing maps input to a fixed-size digest.']
 ,['L291','Which language defines web page structure?',['HTML','CSS','SQL','JSON'],0,'HTML marks up the structure of webpages.']
 ,['L292','Which language handles browser interaction?',['JavaScript','CSS','HTML','SQL'],0,'JavaScript can respond to browser events.']
 ,['L293','Which side must check submitted inputs securely?',['Server','Client','Browser','CSS'],0,'Server-side validation cannot be bypassed merely by editing browser code.']
 ,['L294','Which search technique follows links to discover pages?',['Crawling','Ranking','Caching','Sorting'],0,'Web crawlers discover linked webpages before indexing.']
 ,['L295','Which law addresses unauthorised computer access?',['CMA','RIPA','CDPA','GDPR'],0,'The Computer Misuse Act covers unauthorised access.']
 ,['L296','Which concern arises from automated unfair decisions?',['Bias','Latency','Caching','Throughput'],0,'Biased training data or rules can lead to unfair outcomes.']
 ,['L297','Which design principle supports disabled users?',['Accessibility','Encryption','Compression','Caching'],0,'Accessibility aims to let people with disabilities use technology.']
 ,['L298','Which method reverses a failed decision?',['Backtracking','Paging','Hashing','Pipelining'],0,'Backtracking undoes an unsuccessful branch.']
 ,['L299','Which diagram displays numeric frequencies as bars?',['Histogram','Flowchart','ERD','Pseudocode'],0,'A histogram groups numerical data into frequency bars.']
];

const choicePool = pool.map(([source,question,options,correctIndex,explanation]) =>
 ({source,number:Number(source.slice(1)),question,options,correctIndex,explanation}));
for(const row of choicePool){
 if(row.options.length!==4 || new Set(row.options).size!==4
   || row.options.some(s=>s.trim().split(/\s+/).length!==1))
   throw Error('Invalid options for '+row.source+': '+row.options.join(','));
}

let authored=0;
const counts=new Map();
const recentSources=[];
for(const [id,e] of Object.entries(bank.lessons).sort((a,b)=>Number(a[0])-Number(b[0]))){
 if(e.draft.sourceStatus!=='curriculum-mapped-proposal-to-review'
   && e.draft.status!=='mcq-to-author'){
   for(const source of e.draft.taughtIn||[])recentSources.push({n:Number(id),source});
   continue;
 }
 const n=Number(id);
 const eligible=choicePool.filter(p=>p.number<n-1
   && !(n<=160 && p.number>=181));
 if(!eligible.length)throw Error('No prior source for L'+id);
 // Mix short, medium and long retrieval gaps. Tie-break by prior use count,
 // with a deterministic rotation so answers do not all occupy box A.
 const gaps=n<=160?[4,8,14,23,36,50,65,90]:[5,11,21,36,60,90,130,185];
 const target=n-Math.min(gaps[n%gaps.length],Math.max(4,n-9));
 eligible.sort((a,b)=>{
   const cost=(p)=>Math.abs(p.number-target)
     +recentSources.some(r=>r.source===p.source&&n-r.n<=8) * 45
     +(counts.get(p.source)||0) * 1.2;
   return cost(a)-cost(b)||a.number-b.number;
 });
 const selected=eligible[0];
 const shift=(n*7)%4;
 const rotated=selected.options.map((_,i)=>selected.options[(i+4-shift)%4]);
 const correct=(selected.correctIndex+shift)%4;
 if(rotated[correct]!==selected.options[selected.correctIndex])
   throw Error('Option position error in L'+id);
 e.draft={
   ...e.draft,
   status:'authored-needs-teacher-review',
   question:selected.question,
   options:rotated,
   correctIndex:correct,
   explanation:selected.explanation,
   taughtIn:[selected.source],
   sourceStatus:'curriculum-mapped-proposal-to-review',
   earlierThanPreviousLesson:true,
   teacherApproved:false
 };
 counts.set(selected.source,(counts.get(selected.source)||0)+1);
 recentSources.push({n,source:selected.source});
 authored++;
}
fs.writeFileSync(bankPath,JSON.stringify(bank,null,2)+'\n');
console.log('Authored '+authored+' additional H446 Q2 drafts from '+pool.length
  +' source-linked retrieval prompts; no live lessons changed.');
