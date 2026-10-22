// Original RHSC MCQ practice aligned to OCR H446 1.1.1–1.1.3.
const SKILLS = [
  {
    "id": "11-components",
    "section": "1.1",
    "spec": "1.1.1(a)",
    "title": "ALU, control unit and registers",
    "lessons": [
      90
    ],
    "page": 4,
    "questions": [
      {
        "id": "11-components-1",
        "prompt": "Which CPU component performs arithmetic operations and logical comparisons?",
        "answer": "ALU",
        "options": [
          "ALU",
          "Control unit",
          "Address bus",
          "Main memory"
        ],
        "explanation": "The arithmetic logic unit performs calculations and logic operations. The control unit coordinates execution rather than performing these calculations itself.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-2",
        "prompt": "Which component decodes instructions and coordinates CPU operations?",
        "answer": "Control unit",
        "options": [
          "Control unit",
          "Accumulator",
          "Data bus",
          "Secondary storage"
        ],
        "explanation": "The control unit interprets instructions and generates control signals to coordinate their execution.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-3",
        "prompt": "In the simplified CPU model, which register holds the address of the next instruction to fetch?",
        "answer": "PC",
        "options": [
          "PC",
          "ACC",
          "MDR",
          "CIR"
        ],
        "explanation": "The program counter identifies the next instruction address. A jump can replace its value to change program flow.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-4",
        "prompt": "Which register holds the address of the memory location currently being accessed?",
        "answer": "MAR",
        "options": [
          "MAR",
          "MDR",
          "ACC",
          "CIR"
        ],
        "explanation": "The memory address register identifies the location to read or write. It holds an address rather than the location’s contents.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-5",
        "prompt": "Which register holds a value being transferred to or from main memory?",
        "answer": "MDR",
        "options": [
          "MDR",
          "MAR",
          "PC",
          "Control unit"
        ],
        "explanation": "The memory data register buffers the contents being read from memory or written to memory.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-6",
        "prompt": "Which register holds the instruction currently being decoded and executed?",
        "answer": "CIR",
        "options": [
          "CIR",
          "PC",
          "MAR",
          "ACC"
        ],
        "explanation": "The current instruction register holds the fetched instruction. It is different from the PC, which holds an instruction address.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-7",
        "prompt": "In a simple accumulator-based processor, which register normally holds an arithmetic result?",
        "answer": "ACC",
        "options": [
          "ACC",
          "MAR",
          "PC",
          "CIR"
        ],
        "explanation": "The accumulator stores working values and arithmetic results in this processor model. Other processor designs can use general-purpose registers.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-8",
        "prompt": "Why are registers useful for currently needed CPU values?",
        "answer": "Very fast internal access",
        "options": [
          "Very fast internal access",
          "Unlimited permanent storage",
          "They replace every memory device",
          "They store only text"
        ],
        "explanation": "Registers are small, very fast storage locations inside the processor, supporting immediate operations and state tracking.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-9",
        "prompt": "An instruction’s address is 120, but the instruction stored there is ADD 300. What does the PC hold before the instruction is fetched?",
        "answer": "120",
        "options": [
          "120",
          "300",
          "ADD 300",
          "The arithmetic result"
        ],
        "explanation": "The PC holds the address to fetch, not the instruction contents or its operand address.",
        "skill": "ALU, control unit and registers"
      },
      {
        "id": "11-components-10",
        "prompt": "A calculation compares two values to decide which branch to take. Which component performs the comparison?",
        "answer": "ALU",
        "options": [
          "ALU",
          "Optical drive",
          "Address bus",
          "ROM only"
        ],
        "explanation": "Logical comparisons are an ALU role. The control unit then coordinates the actions required by the instruction and comparison result.",
        "skill": "ALU, control unit and registers"
      }
    ]
  },
  {
    "id": "11-buses",
    "section": "1.1",
    "spec": "1.1.1(a)",
    "title": "Address, data and control buses",
    "lessons": [
      92
    ],
    "page": 3,
    "questions": [
      {
        "id": "11-buses-1",
        "prompt": "Which bus carries the identity of a memory location being accessed?",
        "answer": "Address bus",
        "options": [
          "Address bus",
          "Data bus",
          "Control bus",
          "Cache"
        ],
        "explanation": "The address bus carries location information so that the correct memory address or device can be selected.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-2",
        "prompt": "Which bus carries instruction contents or data values between CPU and memory?",
        "answer": "Data bus",
        "options": [
          "Data bus",
          "Address bus",
          "Control bus",
          "Program counter"
        ],
        "explanation": "Instruction bits and data values are contents, so they travel on the data bus rather than the address bus.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-3",
        "prompt": "Which bus carries memory-read and memory-write signals?",
        "answer": "Control bus",
        "options": [
          "Control bus",
          "Address bus",
          "Data bus",
          "Accumulator"
        ],
        "explanation": "Control signals coordinate what operation is required and when it should occur.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-4",
        "prompt": "In the simplified CPU–memory model, why is the data bus bidirectional?",
        "answer": "The CPU reads and writes values",
        "options": [
          "The CPU reads and writes values",
          "Addresses are always negative",
          "Every instruction is a jump",
          "Memory never sends values"
        ],
        "explanation": "Reading transfers contents from memory to the CPU; writing transfers contents from the CPU to memory.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-5",
        "prompt": "An address bus has 16 bits. How many distinct binary addresses can it represent?",
        "answer": "65,536",
        "options": [
          "65,536",
          "16",
          "256",
          "32,768"
        ],
        "explanation": "Sixteen bits give 2¹⁶ distinct patterns, representing 65,536 addresses. This does not by itself specify how many bytes each address represents.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-6",
        "prompt": "A data bus is 64 bits wide. How many bits can one full-width transfer carry?",
        "answer": "64",
        "options": [
          "64",
          "8",
          "32",
          "512"
        ],
        "explanation": "Bus width states the number of parallel bits in a full-width transfer. Sixty-four bits equals eight bytes, not 64 bytes.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-7",
        "prompt": "The CPU reads the contents of memory location 205. What travels on the address bus?",
        "answer": "205",
        "options": [
          "205",
          "The contents stored at 205",
          "Only the read signal",
          "The whole program"
        ],
        "explanation": "205 identifies the location. Its contents travel separately on the data bus, coordinated by a control signal.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-8",
        "prompt": "Which register normally supplies the memory address used on the address bus?",
        "answer": "MAR",
        "options": [
          "MAR",
          "MDR",
          "ACC",
          "CIR"
        ],
        "explanation": "The MAR holds the address for the current memory access. The MDR supplies or receives the transferred contents.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-9",
        "prompt": "A memory device signals that a transfer is ready. What kind of bus information is this?",
        "answer": "Control information",
        "options": [
          "Control information",
          "The operand value",
          "A memory address only",
          "A saved user file"
        ],
        "explanation": "A ready signal coordinates the transfer rather than representing the address or payload contents.",
        "skill": "Address, data and control buses"
      },
      {
        "id": "11-buses-10",
        "prompt": "With all other relevant factors unchanged, what can a wider data bus allow?",
        "answer": "More bits per transfer",
        "options": [
          "More bits per transfer",
          "More clock cycles every second",
          "Automatic parallel software",
          "Unlimited addressable memory"
        ],
        "explanation": "A wider data bus can transfer more bits at once. Clock frequency and addressable range are separate characteristics.",
        "skill": "Address, data and control buses"
      }
    ]
  },
  {
    "id": "11-fde",
    "section": "1.1",
    "spec": "1.1.1(b)",
    "title": "Fetch–decode–execute and register traces",
    "lessons": [
      91
    ],
    "page": 7,
    "questions": [
      {
        "id": "11-fde-1",
        "prompt": "Which sequence gives the main stages of an instruction cycle?",
        "answer": "Fetch, decode, execute",
        "options": [
          "Fetch, decode, execute",
          "Decode, execute, fetch",
          "Execute, fetch, decode",
          "Fetch, execute, decode"
        ],
        "explanation": "Fetch obtains the instruction, decode interprets it, and execute carries out the specified operation.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-2",
        "prompt": "During a standard simplified fetch, why is PC copied to MAR?",
        "answer": "To select the instruction address",
        "options": [
          "To select the instruction address",
          "To calculate the instruction result",
          "To erase the current instruction",
          "To copy all RAM into the CPU"
        ],
        "explanation": "The PC identifies where the next instruction is stored. Moving its value into MAR prepares that memory location for access.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-3",
        "prompt": "A word-addressed CPU fetches the instruction at PC=40. In this model, fetch increments PC by 1. What is PC immediately afterwards?",
        "answer": "41",
        "options": [
          "41",
          "40",
          "205",
          "1"
        ],
        "explanation": "Under the stated one-address increment, the next sequential instruction address is 41. Real instruction sizes and PC increments depend on the processor.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-4",
        "prompt": "A fetched instruction arrives in MDR. Where is it copied so the control unit can decode it?",
        "answer": "CIR",
        "options": [
          "CIR",
          "PC",
          "MAR",
          "An optical disc"
        ],
        "explanation": "The instruction is placed in the current instruction register for decoding and execution.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-5",
        "prompt": "What is the control unit doing during decode?",
        "answer": "Interpreting the instruction",
        "options": [
          "Interpreting the instruction",
          "Reading every file from disk",
          "Adding one to all registers",
          "Sorting main memory"
        ],
        "explanation": "The control unit interprets the operation and relevant operand information, then coordinates the execution steps required.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-6",
        "prompt": "LOAD 205 copies Memory[205] into ACC. Using the state table, what is ACC after execution?",
        "answer": "12",
        "options": [
          "12",
          "205",
          "LOAD 205",
          "The old PC"
        ],
        "explanation": "205 is the operand address. LOAD reads the value stored there, 12, into the accumulator.",
        "skill": "Fetch–decode–execute and register traces",
        "table": {
          "caption": "Initial state · simplified accumulator CPU",
          "headers": [
            "Location",
            "Contents"
          ],
          "rows": [
            [
              "ACC",
              "7"
            ],
            [
              "Memory[205]",
              "12"
            ]
          ]
        }
      },
      {
        "id": "11-fde-7",
        "prompt": "ACC=7 and Memory[180]=5. ADD 180 adds that memory value to ACC. What is the new ACC?",
        "answer": "12",
        "options": [
          "12",
          "180",
          "187",
          "5"
        ],
        "explanation": "The operand value is 5, so the calculation is 7 + 5 = 12. The address 180 is not added.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-8",
        "prompt": "In this model, STORE 90 writes ACC to Memory[90]. If ACC=16, which value is written?",
        "answer": "16",
        "options": [
          "16",
          "90",
          "STORE 90",
          "The PC value"
        ],
        "explanation": "STORE writes the accumulator’s current contents into the specified memory location.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-9",
        "prompt": "A jump instruction sets PC to 72. Which instruction address is fetched next?",
        "answer": "72",
        "options": [
          "72",
          "73",
          "The old PC always",
          "0"
        ],
        "explanation": "A jump replaces the next-instruction address. The next fetch uses the target now held in PC.",
        "skill": "Fetch–decode–execute and register traces"
      },
      {
        "id": "11-fde-10",
        "prompt": "An operand read places MAR=205 and MDR=12. Which statement is correct?",
        "answer": "Address 205 supplied value 12",
        "options": [
          "Address 205 supplied value 12",
          "Address 12 supplied value 205",
          "The next instruction is always 205",
          "Both registers hold addresses"
        ],
        "explanation": "MAR identifies the accessed location, while MDR holds the contents transferred from that location.",
        "skill": "Fetch–decode–execute and register traces"
      }
    ]
  },
  {
    "id": "11-performance",
    "section": "1.1",
    "spec": "1.1.1(c)",
    "title": "Clock speed, cores and cache",
    "lessons": [
      94
    ],
    "page": 5,
    "questions": [
      {
        "id": "11-performance-1",
        "prompt": "What does a 3 GHz clock frequency mean?",
        "answer": "3 billion cycles per second",
        "options": [
          "3 billion cycles per second",
          "3 billion instructions always",
          "3 billion bytes of RAM",
          "3 cores per processor"
        ],
        "explanation": "Clock frequency counts cycles, not necessarily completed instructions. An instruction can require multiple cycles or overlap with other instructions.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-2",
        "prompt": "Two otherwise identical CPUs run the same workload at different clock frequencies. What can the higher clock frequency allow?",
        "answer": "More cycles in the same time",
        "options": [
          "More cycles in the same time",
          "More RAM addresses automatically",
          "Fewer program instructions always",
          "No memory delays"
        ],
        "explanation": "A higher clock frequency supplies more cycles per second. Actual performance also depends on work per cycle, memory and other bottlenecks.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-3",
        "prompt": "Why can cache improve processor performance?",
        "answer": "Avoid some slower RAM accesses",
        "options": [
          "Avoid some slower RAM accesses",
          "Make every instruction one cycle",
          "Replace all secondary storage",
          "Increase every program’s core count"
        ],
        "explanation": "Cache keeps copies of useful instructions or data near the CPU, reducing the cost of accesses that hit in the cache.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-4",
        "prompt": "A processor repeatedly accesses the same small set of values. Why might caching help?",
        "answer": "The values can be reused quickly",
        "options": [
          "The values can be reused quickly",
          "The values become permanent files",
          "The program stops needing instructions",
          "The address bus becomes unnecessary"
        ],
        "explanation": "Repeated accesses may hit in cache rather than repeatedly waiting for slower main memory.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-5",
        "prompt": "When can additional CPU cores particularly help one program?",
        "answer": "Its work can run in parallel",
        "options": [
          "Its work can run in parallel",
          "It has only dependent serial steps",
          "It never uses the extra cores",
          "It runs only one fixed instruction"
        ],
        "explanation": "Work that can be divided safely across cores may execute simultaneously. A strictly serial dependency chain cannot automatically use more cores.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-6",
        "prompt": "Why does doubling the number of cores not guarantee twice the performance?",
        "answer": "Serial work and overhead remain",
        "options": [
          "Serial work and overhead remain",
          "The clock frequency must halve",
          "Caches must disappear",
          "Every program uses two cores only"
        ],
        "explanation": "Sequential sections, coordination costs and shared-resource limits can restrict the benefit from extra cores.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-7",
        "prompt": "A CPU runs at 2 GHz and averages 2 cycles per instruction for the stated workload. What is the ideal instruction rate under these assumptions?",
        "answer": "1 billion instructions/s",
        "options": [
          "1 billion instructions/s",
          "2 billion instructions/s",
          "4 billion instructions/s",
          "2 instructions/s"
        ],
        "explanation": "Divide 2 billion cycles per second by 2 cycles per instruction to obtain 1 billion instructions per second.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-8",
        "prompt": "Which measurement is most useful for comparing two CPUs for a specific school workload?",
        "answer": "A representative workload benchmark",
        "options": [
          "A representative workload benchmark",
          "Clock frequency alone",
          "The case colour",
          "The instruction-set name alone"
        ],
        "explanation": "A representative benchmark captures the combined effect of the processor design, software and workload rather than relying on one headline specification.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-9",
        "prompt": "Why might increasing cache size produce little improvement for a workload?",
        "answer": "Few extra accesses become hits",
        "options": [
          "Few extra accesses become hits",
          "Cache stores only photographs",
          "Larger cache disables the CPU",
          "RAM can no longer be addressed"
        ],
        "explanation": "The benefit depends on the access pattern and the misses avoided. More capacity does not guarantee a useful change for every workload.",
        "skill": "Clock speed, cores and cache"
      },
      {
        "id": "11-performance-10",
        "prompt": "What is a cache miss?",
        "answer": "Requested data is absent from cache",
        "options": [
          "Requested data is absent from cache",
          "The CPU has no registers",
          "RAM loses all its contents",
          "A file has been permanently deleted"
        ],
        "explanation": "A miss means the request cannot be satisfied by that cache entry and must be served from a lower memory level or another source.",
        "skill": "Clock speed, cores and cache"
      }
    ]
  },
  {
    "id": "11-pipeline",
    "section": "1.1",
    "spec": "1.1.1(d)",
    "title": "CPU pipelining",
    "lessons": [
      95
    ],
    "page": 6,
    "questions": [
      {
        "id": "11-pipeline-1",
        "prompt": "What does instruction pipelining overlap?",
        "answer": "Stages of different instructions",
        "options": [
          "Stages of different instructions",
          "All stages of one instruction instantly",
          "Only two unrelated source files",
          "Only disk-backup operations"
        ],
        "explanation": "Different instructions occupy different processing stages at the same time, such as fetching one while decoding another.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-2",
        "prompt": "An ideal CPU has three separate one-cycle stages: fetch, decode, execute. Three instructions complete with full overlap and no stalls. How many cycles are needed?",
        "answer": "5",
        "options": [
          "5",
          "3",
          "6",
          "9"
        ],
        "explanation": "The first instruction needs three cycles. The next two complete one cycle apart, giving 3 + 3 − 1 = 5 cycles.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-3",
        "prompt": "The same three instructions use the three one-cycle stages without any overlap. How many cycles are needed?",
        "answer": "9",
        "options": [
          "9",
          "3",
          "5",
          "6"
        ],
        "explanation": "Each instruction takes three cycles before the next starts, so the total is 3 × 3 = 9 cycles.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-4",
        "prompt": "What is the main performance benefit of a full instruction pipeline?",
        "answer": "Higher instruction throughput",
        "options": [
          "Higher instruction throughput",
          "Zero instruction latency",
          "No control-unit work",
          "No memory accesses"
        ],
        "explanation": "A filled pipeline can complete instructions more frequently. Each instruction still has to pass through its required stages.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-5",
        "prompt": "In an ideal full three-stage pipeline with one-cycle stages and no stalls, how often can an instruction complete?",
        "answer": "Once per cycle",
        "options": [
          "Once per cycle",
          "Once every three cycles",
          "Three times in every stage",
          "Only after all instructions finish"
        ],
        "explanation": "Once filled, each stage handles a different instruction and the final stage can complete one instruction each cycle.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-6",
        "prompt": "Instruction B needs a result that instruction A has not yet produced. What kind of pipeline issue can this cause?",
        "answer": "Data dependency",
        "options": [
          "Data dependency",
          "A larger address bus",
          "Automatic cache expansion",
          "A storage-capacity increase"
        ],
        "explanation": "B cannot safely use a value before it is ready. Depending on the design, the dependency may need forwarding or a stall.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-7",
        "prompt": "A branch is mispredicted and later pipeline stages contain instructions from the wrong path. What may be necessary?",
        "answer": "Discard those instructions",
        "options": [
          "Discard those instructions",
          "Execute every wrong-path result",
          "Erase the entire hard disk",
          "Permanently disable branching"
        ],
        "explanation": "The incorrectly fetched path must not commit incorrect results. Flushing and refilling relevant pipeline stages costs time.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-8",
        "prompt": "What is a pipeline stall?",
        "answer": "A delay in stage progress",
        "options": [
          "A delay in stage progress",
          "An increase in bus width",
          "The permanent end of execution",
          "A larger instruction set"
        ],
        "explanation": "A stage or instruction must wait, for example for required data or a resource. This reduces ideal throughput.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-9",
        "prompt": "Does pipelining necessarily reduce the latency of one isolated instruction?",
        "answer": "No",
        "options": [
          "No",
          "Yes, always to one cycle",
          "Yes, always to zero cycles",
          "Only if the instruction is a jump"
        ],
        "explanation": "Pipelining mainly improves the rate of processing multiple instructions. One instruction still requires its stage sequence and may incur additional overhead.",
        "skill": "CPU pipelining"
      },
      {
        "id": "11-pipeline-10",
        "prompt": "Why can an ideal pipeline timing calculation overestimate real performance?",
        "answer": "It ignores stalls and overhead",
        "options": [
          "It ignores stalls and overhead",
          "It counts no instructions at all",
          "Every real stage takes zero time",
          "Real programs have no dependencies"
        ],
        "explanation": "Memory delays, data dependencies, branches and stage imbalance can prevent the ideal rate from being sustained.",
        "skill": "CPU pipelining"
      }
    ]
  },
  {
    "id": "11-architecture",
    "section": "1.1",
    "spec": "1.1.1(e)",
    "title": "Von Neumann, Harvard and modern designs",
    "lessons": [
      93
    ],
    "page": 14,
    "questions": [
      {
        "id": "11-architecture-1",
        "prompt": "In a pure Von Neumann model, how are instructions and data stored?",
        "answer": "In shared memory",
        "options": [
          "In shared memory",
          "Only in separate optical discs",
          "Always in different CPUs",
          "Only in the accumulator"
        ],
        "explanation": "Instructions and data share the same memory arrangement in the pure Von Neumann model.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-2",
        "prompt": "What distinguishes a pure Harvard architecture?",
        "answer": "Separate instruction/data memories",
        "options": [
          "Separate instruction/data memories",
          "No instruction memory",
          "One shared instruction/data path",
          "No input or output devices"
        ],
        "explanation": "Harvard separates instruction memory from data memory, normally with separate access pathways.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-3",
        "prompt": "Why can a shared Von Neumann access pathway become a bottleneck?",
        "answer": "Instructions and data compete for it",
        "options": [
          "Instructions and data compete for it",
          "Every instruction is invalid",
          "The CPU cannot contain registers",
          "Data cannot be represented in binary"
        ],
        "explanation": "Instruction fetches and data transfers may need the same pathway, restricting how much can be transferred at once.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-4",
        "prompt": "What can separate instruction and data pathways allow in Harvard architecture?",
        "answer": "Concurrent instruction/data access",
        "options": [
          "Concurrent instruction/data access",
          "Guaranteed zero memory latency",
          "Automatic infinite storage",
          "Execution without any clock"
        ],
        "explanation": "Separate pathways can permit an instruction fetch and a data access to proceed concurrently, subject to the actual design.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-5",
        "prompt": "A processor has separate instruction and data caches but unified main memory. Which description is most appropriate?",
        "answer": "A mixed contemporary arrangement",
        "options": [
          "A mixed contemporary arrangement",
          "A pure Harvard model at every level",
          "No stored-program capability",
          "A processor without memory"
        ],
        "explanation": "Modern designs can combine features: separate cache pathways near the core and a unified memory system farther away.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-6",
        "prompt": "Which statement best compares architecture models with modern CPUs?",
        "answer": "Real CPUs may combine features",
        "options": [
          "Real CPUs may combine features",
          "Every CPU is a pure textbook model",
          "Caches make all memory identical",
          "Multicore removes all architecture"
        ],
        "explanation": "Textbook models identify key arrangements. Real implementations may add caches, pipelines and other features without matching one pure model throughout.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-7",
        "prompt": "In the stored-program concept, what is held in memory alongside data in the Von Neumann model?",
        "answer": "Program instructions",
        "options": [
          "Program instructions",
          "Only screen coordinates",
          "Only the CPU clock signal",
          "Only external device names"
        ],
        "explanation": "Program instructions are represented in memory and fetched for execution, rather than existing only as fixed physical wiring.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-8",
        "prompt": "Which comparison focuses on Von Neumann versus Harvard rather than RISC versus CISC?",
        "answer": "Instruction/data memory arrangement",
        "options": [
          "Instruction/data memory arrangement",
          "Simple versus complex instructions",
          "Number of source-code comments",
          "Which programming font is used"
        ],
        "explanation": "Memory and access-path arrangements distinguish Von Neumann and Harvard. Instruction-set design is a separate classification.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-9",
        "prompt": "A student says Harvard architecture always makes every program faster. What is the best response?",
        "answer": "Performance depends on the system",
        "options": [
          "Performance depends on the system",
          "The claim is always correct",
          "Harvard has no data memory",
          "Only clock frequency matters"
        ],
        "explanation": "Separate pathways can reduce some contention, but overall performance also depends on workload, implementation, clocking and other bottlenecks.",
        "skill": "Von Neumann, Harvard and modern designs"
      },
      {
        "id": "11-architecture-10",
        "prompt": "Why might a designer separate instruction and data caches?",
        "answer": "Support different access streams",
        "options": [
          "Support different access streams",
          "Make instructions non-binary",
          "Remove the need for addresses",
          "Make every register non-volatile"
        ],
        "explanation": "The processor may need to fetch instructions and access data as distinct streams. Separate caches can support those demands without a single shared cache port being the only route.",
        "skill": "Von Neumann, Harvard and modern designs"
      }
    ]
  },
  {
    "id": "11-risc-cisc",
    "section": "1.1",
    "spec": "1.1.2(a)",
    "title": "RISC and CISC",
    "lessons": [
      99
    ],
    "page": 17,
    "questions": [
      {
        "id": "11-risc-cisc-1",
        "prompt": "Which describes a typical RISC instruction-set approach?",
        "answer": "Simple, regular instructions",
        "options": [
          "Simple, regular instructions",
          "No machine instructions",
          "Every instruction does many tasks",
          "Only variable-length instructions"
        ],
        "explanation": "RISC traditionally emphasises relatively simple, regular instructions, with much work performed through register operations.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-2",
        "prompt": "Which describes a typical CISC instruction-set approach?",
        "answer": "More complex instruction options",
        "options": [
          "More complex instruction options",
          "No memory operands ever",
          "No instruction decoding",
          "Only one instruction exists"
        ],
        "explanation": "CISC traditionally offers more complex instructions that can express more work in a single machine instruction. Actual implementations vary.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-3",
        "prompt": "In a typical load/store RISC model, how is a memory value used in arithmetic?",
        "answer": "Load to a register first",
        "options": [
          "Load to a register first",
          "Add its address instead",
          "Execute it directly from a disc",
          "Store it only in the PC"
        ],
        "explanation": "Load/store designs normally use explicit loads and stores for memory transfer, with arithmetic operating on registers.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-4",
        "prompt": "Why can regular fixed-length instructions help a pipeline design?",
        "answer": "Simpler instruction handling",
        "options": [
          "Simpler instruction handling",
          "No fetch stage is required",
          "All memory delays disappear",
          "All programs become parallel"
        ],
        "explanation": "Regular instruction boundaries and formats can simplify fetching and decoding. They do not remove all other pipeline issues.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-5",
        "prompt": "Does using fewer machine instructions prove that one implementation runs faster?",
        "answer": "No, instruction costs also matter",
        "options": [
          "No, instruction costs also matter",
          "Yes, always",
          "Only when the input is text",
          "Only on an optical drive"
        ],
        "explanation": "Instructions can have different execution costs. Performance depends on total work, cycles, clocking, memory behaviour and implementation.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-6",
        "prompt": "A model performs a task using four non-overlapped simple instructions at one cycle each, or one complex instruction at five cycles. Which takes fewer cycles?",
        "answer": "The four simple instructions",
        "options": [
          "The four simple instructions",
          "The complex instruction",
          "They take equal cycles",
          "The task cannot be compared"
        ],
        "explanation": "The simple sequence takes 4 × 1 = 4 cycles, while the complex instruction takes 5 cycles under these stated assumptions.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-7",
        "prompt": "What possible code-density benefit can a complex instruction set offer?",
        "answer": "More work encoded per instruction",
        "options": [
          "More work encoded per instruction",
          "No program storage is needed",
          "Every instruction is one bit",
          "Every program has one instruction"
        ],
        "explanation": "Some complex instructions can express a multi-step operation compactly. The resulting code size depends on instruction encoding and the compiled program.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-8",
        "prompt": "A compiler targets a simple load/store instruction set. What may it need to generate for a complex operation?",
        "answer": "Several simpler instructions",
        "options": [
          "Several simpler instructions",
          "No executable instructions",
          "Only a memory address bus",
          "A different input device"
        ],
        "explanation": "The compiler can express a complex source operation as a sequence of simpler machine instructions.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-9",
        "prompt": "Which is the safest evaluation of RISC and CISC performance?",
        "answer": "Compare the workload and design",
        "options": [
          "Compare the workload and design",
          "RISC is always faster",
          "CISC is always faster",
          "Instruction-set labels are enough"
        ],
        "explanation": "The label alone does not determine speed. Implementation details, compiled code, memory and workload all affect observed performance.",
        "skill": "RISC and CISC"
      },
      {
        "id": "11-risc-cisc-10",
        "prompt": "Are RISC/CISC and Harvard/Von Neumann the same classification?",
        "answer": "No, they describe different aspects",
        "options": [
          "No, they describe different aspects",
          "Yes, RISC always means Harvard",
          "Yes, CISC always means Harvard",
          "Yes, both mean no cache"
        ],
        "explanation": "RISC/CISC concerns instruction-set characteristics; Harvard/Von Neumann concerns instruction/data memory and access arrangements.",
        "skill": "RISC and CISC"
      }
    ]
  },
  {
    "id": "11-gpu",
    "section": "1.1",
    "spec": "1.1.2(b)",
    "title": "GPUs and their applications",
    "lessons": [
      100
    ],
    "page": 18,
    "questions": [
      {
        "id": "11-gpu-1",
        "prompt": "Which workload is especially well suited to a GPU?",
        "answer": "Similar operations on many pixels",
        "options": [
          "Similar operations on many pixels",
          "One long serial decision chain",
          "Only renaming a single file",
          "Waiting for one key press"
        ],
        "explanation": "A GPU can apply similar operations across many independent data elements, as in image processing.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-2",
        "prompt": "Which is a non-graphics application of GPU computation?",
        "answer": "Large matrix calculations",
        "options": [
          "Large matrix calculations",
          "Printing one fixed character",
          "Only adjusting screen brightness",
          "Only storing a small text file"
        ],
        "explanation": "Many matrix operations contain large amounts of similar parallel work, useful in scientific computing and machine-learning workloads.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-3",
        "prompt": "What does SIMD mean?",
        "answer": "Single instruction, multiple data",
        "options": [
          "Single instruction, multiple data",
          "Single input, multiple discs",
          "Shared instruction, memory deleted",
          "Sorted input, minimum delay"
        ],
        "explanation": "SIMD applies the same instruction operation across multiple data values, matching many data-parallel workloads.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-4",
        "prompt": "Why are many GPU processing lanes useful for suitable workloads?",
        "answer": "They process many data items together",
        "options": [
          "They process many data items together",
          "They remove every data dependency",
          "They replace all program memory",
          "They make every serial task parallel"
        ],
        "explanation": "Large numbers of lanes can perform similar work on many independent items, providing high throughput when the workload fits.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-5",
        "prompt": "A task’s next step depends on the previous result each time. Why may a GPU offer little benefit?",
        "answer": "Little parallel work is available",
        "options": [
          "Little parallel work is available",
          "GPUs cannot perform arithmetic",
          "GPUs have no memory access",
          "All CPU programs must use a GPU"
        ],
        "explanation": "A dependency chain limits simultaneous work, so many available lanes may not be used effectively.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-6",
        "prompt": "Why can transferring a small job from CPU memory to a GPU be inefficient?",
        "answer": "Transfer/setup costs may dominate",
        "options": [
          "Transfer/setup costs may dominate",
          "The GPU cannot receive data",
          "Every small job requires a new GPU",
          "Transfers always take zero time"
        ],
        "explanation": "Moving data and launching work incur overhead. The computation must be large or suitable enough to justify those costs.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-7",
        "prompt": "Which task illustrates a graphics use of a GPU?",
        "answer": "Processing many rendered pixels",
        "options": [
          "Processing many rendered pixels",
          "Choosing a keyboard layout",
          "Saving a plain text filename",
          "Checking one Boolean variable"
        ],
        "explanation": "Rendering includes many operations across vertices, fragments or pixels, providing substantial parallel work for GPU hardware.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-8",
        "prompt": "A simulation updates a million independent particles with the same equations. Why might a GPU fit?",
        "answer": "Regular data-parallel computation",
        "options": [
          "Regular data-parallel computation",
          "The particles must be sorted first",
          "The result requires no memory",
          "Every equation is a text label"
        ],
        "explanation": "Many independent, similar calculations can be spread across GPU lanes. Shared state and communication still need consideration.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-9",
        "prompt": "Many GPU lanes take different branches on their respective data. What may happen?",
        "answer": "Parallel efficiency can fall",
        "options": [
          "Parallel efficiency can fall",
          "Every branch becomes free",
          "The GPU turns into ROM",
          "All lanes must stop permanently"
        ],
        "explanation": "Divergent control flow can make a group of lanes execute paths separately, reducing efficient simultaneous work.",
        "skill": "GPUs and their applications"
      },
      {
        "id": "11-gpu-10",
        "prompt": "Does adding a GPU automatically accelerate every application?",
        "answer": "No",
        "options": [
          "No",
          "Yes, even without suitable software",
          "Yes, every task is data-parallel",
          "Only if all inputs are positive"
        ],
        "explanation": "Software must use the GPU effectively, and its workload must justify parallel execution and data-transfer overhead.",
        "skill": "GPUs and their applications"
      }
    ]
  },
  {
    "id": "11-multicore",
    "section": "1.1",
    "spec": "1.1.2(c)",
    "title": "Multicore and parallel systems",
    "lessons": [
      101
    ],
    "page": 18,
    "questions": [
      {
        "id": "11-multicore-1",
        "prompt": "What is a multicore processor?",
        "answer": "A processor with several cores",
        "options": [
          "A processor with several cores",
          "A computer with several screens",
          "A processor with no registers",
          "A storage device with many files"
        ],
        "explanation": "Multiple execution cores are integrated into one processor, allowing suitable work or different threads to execute on different cores.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-2",
        "prompt": "What is parallel processing?",
        "answer": "Executing work simultaneously",
        "options": [
          "Executing work simultaneously",
          "Only switching tasks in sequence",
          "Storing several files on a disc",
          "Writing one long source file"
        ],
        "explanation": "Parallel processing uses multiple execution resources at the same time. This differs from merely interleaving tasks on one execution resource.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-3",
        "prompt": "Twenty-four equal independent tasks are divided evenly across six cores, with no overhead. How many tasks does each core handle?",
        "answer": "4",
        "options": [
          "4",
          "6",
          "18",
          "24"
        ],
        "explanation": "24 ÷ 6 = 4 tasks per core under the stated equal-distribution assumptions.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-4",
        "prompt": "Which program is most likely to benefit from multiple cores?",
        "answer": "Independent video-frame processing",
        "options": [
          "Independent video-frame processing",
          "A strictly serial dependency chain",
          "Waiting for one user response",
          "A program restricted to one core"
        ],
        "explanation": "Independent work can be distributed across cores. Software and resource availability determine whether that potential is used.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-5",
        "prompt": "Why can extra cores help a computer running several applications?",
        "answer": "Different threads can use cores",
        "options": [
          "Different threads can use cores",
          "Each application gets infinite RAM",
          "No scheduling is ever needed",
          "Every application becomes identical"
        ],
        "explanation": "Runnable threads from different applications may execute on different cores, subject to scheduling and shared-resource limits.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-6",
        "prompt": "Why is communication overhead a limitation in a parallel system?",
        "answer": "Coordinating work consumes time",
        "options": [
          "Coordinating work consumes time",
          "Processors cannot exchange data",
          "Parallel tasks need no results",
          "Every message is a new program"
        ],
        "explanation": "Splitting work, transferring data and combining results can reduce the time saved by simultaneous computation.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-7",
        "prompt": "A job has a 3-second serial part and an 8-second part split perfectly across four cores. Ignoring overhead, what is the total time?",
        "answer": "5 seconds",
        "options": [
          "5 seconds",
          "2 seconds",
          "3 seconds",
          "11 seconds"
        ],
        "explanation": "The serial part still takes 3 seconds. The parallel part takes 8 ÷ 4 = 2 seconds, giving 5 seconds in total.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-8",
        "prompt": "Two parallel tasks write the same shared variable without coordination. What is a possible problem?",
        "answer": "An incorrect shared result",
        "options": [
          "An incorrect shared result",
          "Guaranteed correct ordering",
          "Automatic removal of all races",
          "No need for memory"
        ],
        "explanation": "Their updates can interfere, causing a race condition or lost update. Shared mutable data needs suitable coordination.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-9",
        "prompt": "Can parallel processing use multiple networked computers rather than one multicore CPU?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, it requires exactly one chip",
          "Only if all computers use one screen",
          "Only when there is no data transfer"
        ],
        "explanation": "Parallel systems can distribute work across processors or computers. Communication and coordination costs affect the benefit.",
        "skill": "Multicore and parallel systems"
      },
      {
        "id": "11-multicore-10",
        "prompt": "Why can one program fail to gain speed from additional cores?",
        "answer": "Its implementation remains serial",
        "options": [
          "Its implementation remains serial",
          "The core count is an address",
          "RAM must become read-only",
          "Parallel hardware forbids loops"
        ],
        "explanation": "Hardware alone does not split a serial algorithm into useful parallel tasks. Dependencies and implementation choices can limit speed-up.",
        "skill": "Multicore and parallel systems"
      }
    ]
  },
  {
    "id": "11-devices",
    "section": "1.1",
    "spec": "1.1.3(a)",
    "title": "Choosing input, output and storage devices",
    "lessons": [
      103
    ],
    "page": 193,
    "questions": [
      {
        "id": "11-devices-1",
        "prompt": "A checkout must quickly capture printed product codes. Which input device fits best?",
        "answer": "Barcode scanner",
        "options": [
          "Barcode scanner",
          "Loudspeaker",
          "Projector",
          "Thermal printer"
        ],
        "explanation": "A barcode scanner captures the encoded product identifier efficiently, avoiding manual typing for each item.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-2",
        "prompt": "A museum kiosk lets visitors view choices and select one by touching it. Which device provides both input and output?",
        "answer": "Touchscreen",
        "options": [
          "Touchscreen",
          "Microphone",
          "Printer",
          "Barcode scanner"
        ],
        "explanation": "The screen displays information as output and detects touch selections as input.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-3",
        "prompt": "A dictation application needs to capture spoken words. Which input device is suitable?",
        "answer": "Microphone",
        "options": [
          "Microphone",
          "Loudspeaker",
          "Monitor",
          "Actuator motor"
        ],
        "explanation": "A microphone captures sound for processing. A loudspeaker produces sound rather than capturing speech.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-4",
        "prompt": "A cold-room controller must measure how warm the room is. Which input device is appropriate?",
        "answer": "Temperature sensor",
        "options": [
          "Temperature sensor",
          "Light sensor",
          "Loudspeaker",
          "Laser printer"
        ],
        "explanation": "The input must measure the variable required by the control rule: temperature.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-5",
        "prompt": "A controller must physically open a ventilation flap. Which output device is suitable?",
        "answer": "Actuator motor",
        "options": [
          "Actuator motor",
          "Temperature sensor",
          "Barcode scanner",
          "Microphone"
        ],
        "explanation": "A motor or actuator turns a control signal into physical movement. A sensor supplies measurements rather than moving the flap.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-6",
        "prompt": "A blind user needs tactile text output that can change as a document is read. Which device is suitable?",
        "answer": "Refreshable Braille display",
        "options": [
          "Refreshable Braille display",
          "Barcode scanner",
          "Microphone",
          "Standard mouse"
        ],
        "explanation": "A refreshable Braille display provides changing tactile character output, supporting access to text without requiring visual reading.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-7",
        "prompt": "A car park automatically reads vehicle number plates. Which input device supplies the required images?",
        "answer": "Camera",
        "options": [
          "Camera",
          "Printer",
          "Loudspeaker",
          "Motor"
        ],
        "explanation": "A camera captures images that recognition software can analyse. The camera is the input device; interpretation is a processing task.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-8",
        "prompt": "A shop must provide a paper receipt immediately after a sale. Which output device meets that requirement?",
        "answer": "Receipt printer",
        "options": [
          "Receipt printer",
          "Camera",
          "Touch sensor",
          "Microphone"
        ],
        "explanation": "A receipt printer produces the required physical text record. Device choice should match the required output and context.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-9",
        "prompt": "A tank-pressure monitor must detect small changes in a specified pressure range. Which device property matters most?",
        "answer": "Suitable range and resolution",
        "options": [
          "Suitable range and resolution",
          "Matching the monitor’s colour",
          "The longest cable name",
          "Having the most buttons"
        ],
        "explanation": "The sensor needs to measure the required range with enough resolution for the control or monitoring task.",
        "skill": "Choosing input, output and storage devices"
      },
      {
        "id": "11-devices-10",
        "prompt": "A portable logger is often moved while recording and needs non-volatile storage without moving parts. Which is suitable?",
        "answer": "Flash storage",
        "options": [
          "Flash storage",
          "An unpowered RAM module",
          "A loudspeaker",
          "A paper display"
        ],
        "explanation": "Flash retains readings without power and has no mechanical moving parts, suiting a portable recording device.",
        "skill": "Choosing input, output and storage devices"
      }
    ]
  },
  {
    "id": "11-storage",
    "section": "1.1",
    "spec": "1.1.3(b)",
    "title": "Magnetic, optical and flash storage",
    "lessons": [
      104
    ],
    "page": 194,
    "questions": [
      {
        "id": "11-storage-1",
        "prompt": "Which storage technology records data using magnetic states?",
        "answer": "Hard disk drive",
        "options": [
          "Hard disk drive",
          "Flash memory stick",
          "Optical disc",
          "Volatile CPU register"
        ],
        "explanation": "A hard disk drive uses magnetic storage on rotating platters. Tape is another magnetic-storage medium.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-2",
        "prompt": "Which storage technology uses a laser when reading data?",
        "answer": "Optical disc",
        "options": [
          "Optical disc",
          "Magnetic tape",
          "Flash memory",
          "CPU register"
        ],
        "explanation": "Optical drives use light to read the disc’s encoded physical or optical states.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-3",
        "prompt": "Which describes flash storage?",
        "answer": "Non-volatile electronic storage",
        "options": [
          "Non-volatile electronic storage",
          "Volatile moving-platter storage",
          "Laser-only storage",
          "A mechanical input device"
        ],
        "explanation": "Flash stores data electronically and retains it without continuous power. It does not require moving platters or an optical laser.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-4",
        "prompt": "Why can flash storage suit a portable device exposed to movement?",
        "answer": "It has no moving mechanical parts",
        "options": [
          "It has no moving mechanical parts",
          "It can never fail",
          "It needs no physical components",
          "It has unlimited write endurance"
        ],
        "explanation": "No moving read/write mechanism helps flash tolerate movement. It remains subject to failure and other limitations.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-5",
        "prompt": "A large archive is written and restored mainly in batches. Which magnetic medium is commonly suitable?",
        "answer": "Magnetic tape",
        "options": [
          "Magnetic tape",
          "A CPU register",
          "A touchscreen",
          "A microphone"
        ],
        "explanation": "Tape suits large sequential archival transfers. Accessing a particular item generally requires moving through the tape rather than immediate random access.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-6",
        "prompt": "Why is tape usually less suitable for frequent random access to scattered files?",
        "answer": "It uses sequential access",
        "options": [
          "It uses sequential access",
          "It cannot retain data",
          "It is always volatile",
          "It stores only one character"
        ],
        "explanation": "Reaching a particular location may require winding through intervening tape, unlike direct access to locations on a disk or SSD.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-7",
        "prompt": "Which is a limitation of flash memory?",
        "answer": "Finite write/erase endurance",
        "options": [
          "Finite write/erase endurance",
          "It always loses data without power",
          "It requires spinning platters",
          "It can store only photographs"
        ],
        "explanation": "Flash cells tolerate a limited number of write/erase cycles. Controllers use techniques such as wear levelling to manage this limitation.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-8",
        "prompt": "A recorded optical disc is selected for offline distribution. Which consideration must still be checked?",
        "answer": "A compatible drive is available",
        "options": [
          "A compatible drive is available",
          "The recipient has infinite RAM",
          "The CPU has exactly one core",
          "The disc contains only binary zeros"
        ],
        "explanation": "An offline medium is useful only if the recipient can read its format and has the necessary device.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-9",
        "prompt": "A supplier offers a high-capacity HDD at lower cost than the quoted SSD. For a stationary bulk archive, which stated property supports the HDD?",
        "answer": "Lower cost for the needed capacity",
        "options": [
          "Lower cost for the needed capacity",
          "Guaranteed immunity to damage",
          "No moving parts",
          "Unlimited permanent reliability"
        ],
        "explanation": "The scenario gives a capacity/cost advantage. That can support an HDD choice when its speed, durability and other properties meet the requirements.",
        "skill": "Magnetic, optical and flash storage"
      },
      {
        "id": "11-storage-10",
        "prompt": "Does non-volatile storage remove the need to keep a separate backup of important files?",
        "answer": "No",
        "options": [
          "No",
          "Yes, data can never be lost",
          "Only for optical discs",
          "Only for magnetic tape"
        ],
        "explanation": "Retaining data without power does not protect against every failure, accidental deletion, theft or corruption.",
        "skill": "Magnetic, optical and flash storage"
      }
    ]
  },
  {
    "id": "11-ram-rom",
    "section": "1.1",
    "spec": "1.1.3(c)",
    "title": "RAM and ROM",
    "lessons": [
      105
    ],
    "page": 195,
    "questions": [
      {
        "id": "11-ram-rom-1",
        "prompt": "Which best describes the usual role of RAM?",
        "answer": "Working programs and data",
        "options": [
          "Working programs and data",
          "Only permanent startup instructions",
          "Only printed output",
          "Only remote file addresses"
        ],
        "explanation": "Main RAM holds programs and data currently in use, supporting read/write access during execution.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-2",
        "prompt": "What does volatile mean in relation to ordinary main RAM?",
        "answer": "Contents are lost without power",
        "options": [
          "Contents are lost without power",
          "It can only be read",
          "It is physically remote",
          "It can never be changed"
        ],
        "explanation": "Volatile memory needs power to retain its contents. Saving a file to non-volatile storage is a separate action.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-3",
        "prompt": "Why use non-volatile ROM or firmware memory for startup instructions?",
        "answer": "They must survive power-off",
        "options": [
          "They must survive power-off",
          "They must be erased every second",
          "They are only needed as sound",
          "They must replace every RAM value"
        ],
        "explanation": "The computer needs its initial startup code to remain available when power is restored.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-4",
        "prompt": "Which operation is ordinary main RAM designed to support during normal execution?",
        "answer": "Frequent reading and writing",
        "options": [
          "Frequent reading and writing",
          "Only reading fixed factory code",
          "Only optical recording",
          "Only magnetic tape winding"
        ],
        "explanation": "RAM supports the changing program instructions and data used while the computer is running.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-5",
        "prompt": "A document exists only in ordinary RAM when power fails. It has not been saved or backed up. What is the main risk?",
        "answer": "The unsaved content is lost",
        "options": [
          "The unsaved content is lost",
          "It automatically moves into ROM",
          "It becomes an optical disc",
          "It remains indefinitely in RAM"
        ],
        "explanation": "Ordinary volatile RAM does not retain the document after power loss. Non-volatile saving or another recovery mechanism is needed.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-6",
        "prompt": "Can RAM hold executable program instructions as well as data?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, only keyboard input",
          "No, only image pixels",
          "Only when it is read-only"
        ],
        "explanation": "Main RAM can hold both program instructions and data needed for execution. It is not restricted to one application or data type.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-7",
        "prompt": "An embedded device needs its control firmware to persist between uses. Which is the relevant memory property?",
        "answer": "Non-volatility",
        "options": [
          "Non-volatility",
          "Volatility",
          "A larger screen size",
          "A wider printer tray"
        ],
        "explanation": "Firmware must remain when the device is off, so it needs suitable non-volatile memory rather than ordinary volatile RAM.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-8",
        "prompt": "A modern device’s firmware can be updated electrically. Which statement is correct?",
        "answer": "Reprogrammable non-volatile memory fits",
        "options": [
          "Reprogrammable non-volatile memory fits",
          "All firmware memory is unchangeable",
          "Firmware must be stored only in RAM",
          "An update needs no stored code"
        ],
        "explanation": "Modern firmware is often held in reprogrammable flash. The textbook role of ROM as persistent firmware storage does not mean every implementation is permanently unchangeable.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-9",
        "prompt": "Why can adding RAM help a workload whose active data does not fit in available RAM?",
        "answer": "More active data can stay resident",
        "options": [
          "More active data can stay resident",
          "Clock frequency must double",
          "All code becomes parallel",
          "The CPU gains more cores"
        ],
        "explanation": "More capacity may reduce transfers to slower backing storage. The improvement depends on the workload and existing bottlenecks.",
        "skill": "RAM and ROM"
      },
      {
        "id": "11-ram-rom-10",
        "prompt": "What is the key distinction between RAM capacity and storage capacity?",
        "answer": "Working memory versus saved files",
        "options": [
          "Working memory versus saved files",
          "Both always mean CPU clock speed",
          "Both measure instruction complexity",
          "RAM means a remote network drive"
        ],
        "explanation": "RAM capacity concerns active working memory. Secondary storage capacity concerns non-volatile files and programs kept for later use.",
        "skill": "RAM and ROM"
      }
    ]
  },
  {
    "id": "11-virtual",
    "section": "1.1",
    "spec": "1.1.3(d)",
    "title": "Virtual storage",
    "lessons": [
      105,
      260
    ],
    "page": 195,
    "questions": [
      {
        "id": "11-virtual-1",
        "prompt": "A network drive appears in a user’s file manager like a local drive, but its files reside on a server. What does this illustrate?",
        "answer": "Virtual storage",
        "options": [
          "Virtual storage",
          "Virtual memory paging",
          "A CPU register",
          "An optical input device"
        ],
        "explanation": "The storage is presented through a local-looking interface while the physical files are located elsewhere on the network.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-2",
        "prompt": "In this specification, how does virtual storage differ from virtual memory?",
        "answer": "Remote storage versus memory backing",
        "options": [
          "Remote storage versus memory backing",
          "Both always mean extra CPU cores",
          "Both are names for RAM chips",
          "Remote storage is a CPU register"
        ],
        "explanation": "Virtual storage abstracts remotely located file storage. Virtual memory uses address translation and may use backing storage for memory pages; it is a different concept.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-3",
        "prompt": "What is a possible benefit of remotely hosted virtual storage?",
        "answer": "Access from different authorised devices",
        "options": [
          "Access from different authorised devices",
          "Guaranteed access without any network",
          "Unlimited free capacity",
          "No physical storage is needed"
        ],
        "explanation": "Users can access centrally stored files from suitable authorised devices with connectivity, subject to the service and access rules.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-4",
        "prompt": "A cloud-only file has no local copy. The required internet connection fails. What is a likely limitation?",
        "answer": "The file may be inaccessible",
        "options": [
          "The file may be inaccessible",
          "The file must move into RAM",
          "The CPU stops all computation",
          "The file becomes a register"
        ],
        "explanation": "Without connectivity to that remote service and without an available local copy, the user may be unable to retrieve the file.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-5",
        "prompt": "Where do the data in virtual storage ultimately reside?",
        "answer": "On physical storage somewhere",
        "options": [
          "On physical storage somewhere",
          "Nowhere physical",
          "Only in a browser address bar",
          "Only inside the address bus"
        ],
        "explanation": "Virtual presentation hides location details; it does not remove the need for physical storage hardware.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-6",
        "prompt": "An organisation maps a server folder as a drive letter. Does that alone make the files physically local?",
        "answer": "No",
        "options": [
          "No",
          "Yes, a letter changes location",
          "Only when the name is short",
          "Only on a single-core CPU"
        ],
        "explanation": "The mapping changes how the remote resource is presented, not where its underlying data are stored.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-7",
        "prompt": "A school increases its hosted storage allocation without installing a new local disk. What benefit is illustrated?",
        "answer": "Flexible remote capacity allocation",
        "options": [
          "Flexible remote capacity allocation",
          "Unlimited capacity without limits",
          "More CPU registers",
          "Automatic doubling of RAM"
        ],
        "explanation": "A provider or server can allocate additional capacity independently of the local device, within available resources, quotas and service terms.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-8",
        "prompt": "Why should a virtual-storage service enforce access permissions?",
        "answer": "To restrict who can read or change files",
        "options": [
          "To restrict who can read or change files",
          "To make all files publicly readable",
          "To convert files into instructions",
          "To remove every physical server"
        ],
        "explanation": "Remote access still needs appropriate authorisation. A local-looking interface does not mean that every user should have access to every file.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-9",
        "prompt": "A local edit and remote copy have not yet synchronised. What issue can arise?",
        "answer": "Different versions may exist",
        "options": [
          "Different versions may exist",
          "The address bus becomes wider",
          "Every device gains a GPU",
          "The file format must become text"
        ],
        "explanation": "Synchronisation delays or conflicting edits can leave different copies or versions. Correct handling depends on the service’s design.",
        "skill": "Virtual storage"
      },
      {
        "id": "11-virtual-10",
        "prompt": "A remote storage service immediately synchronises deletions to all devices. Does synchronisation alone guarantee a recoverable backup?",
        "answer": "No",
        "options": [
          "No",
          "Yes, every deletion is preserved",
          "Only when the file is large",
          "Only when the device has ROM"
        ],
        "explanation": "Synchronisation can propagate a deletion as well as a valid change. Recovery depends on separate version history, retention or backup arrangements.",
        "skill": "Virtual storage"
      }
    ]
  }
];
