// Original RHSC MCQ practice aligned to OCR H446 1.2.1–1.2.4.
const SKILLS = [
  {
    "id": "12-os",
    "section": "1.2",
    "spec": "1.2.1(a)",
    "title": "Operating-system functions",
    "lessons": [
      106
    ],
    "page": 31,
    "questions": [
      {
        "id": "12-os-1",
        "prompt": "A browser and music player both need processor time. Which OS function coordinates their CPU use?",
        "answer": "Process scheduling",
        "options": [
          "Process scheduling",
          "Lexical analysis",
          "Optical recording",
          "Image compression"
        ],
        "explanation": "The OS schedules runnable processes or threads so they can share processor resources.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-2",
        "prompt": "Two applications need separate working memory. Which OS function allocates and protects their memory regions?",
        "answer": "Memory management",
        "options": [
          "Memory management",
          "Source-code linking",
          "Syntax analysis",
          "Spreadsheet formatting"
        ],
        "explanation": "The OS manages memory allocation and protection so applications can use memory without freely corrupting one another.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-3",
        "prompt": "A user creates folders and saves documents. Which OS responsibility supports this?",
        "answer": "File management",
        "options": [
          "File management",
          "Machine-code generation",
          "Pixel shading",
          "Code optimisation"
        ],
        "explanation": "The file system organises file names, directories, storage locations and access operations.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-4",
        "prompt": "An application sends a standard print request rather than hardware-specific commands. What OS role is illustrated?",
        "answer": "Providing hardware access services",
        "options": [
          "Providing hardware access services",
          "Compiling every document",
          "Replacing all device electronics",
          "Making every printer identical"
        ],
        "explanation": "OS services and drivers provide a usable interface between applications and particular hardware devices.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-5",
        "prompt": "Why does a general-purpose OS enforce user access permissions?",
        "answer": "To control use of resources",
        "options": [
          "To control use of resources",
          "To make every account an administrator",
          "To remove every need for storage",
          "To make all source code public"
        ],
        "explanation": "Permissions restrict which resources and operations an account can access, according to the system’s policy.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-6",
        "prompt": "A graphical desktop lets users launch programs and manage windows. Which OS function is this?",
        "answer": "Providing a user interface",
        "options": [
          "Providing a user interface",
          "Assembling instructions",
          "Allocating network addresses only",
          "Compressing every program"
        ],
        "explanation": "The OS can provide an interface through which users interact with programs and system resources.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-7",
        "prompt": "An application asks the OS to open a file. What is the benefit of this service interface?",
        "answer": "It hides low-level storage details",
        "options": [
          "It hides low-level storage details",
          "It removes all file permissions",
          "It guarantees no errors",
          "It makes disks unnecessary"
        ],
        "explanation": "Applications can use defined services without implementing the physical storage hardware’s operation themselves.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-8",
        "prompt": "A program tries to access another process’s protected memory. What should memory protection support?",
        "answer": "Preventing unauthorised access",
        "options": [
          "Preventing unauthorised access",
          "Allowing every write",
          "Deleting all running applications",
          "Converting RAM into ROM"
        ],
        "explanation": "Memory protection helps isolate processes and prevent unintended or unauthorised changes to other address spaces.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-9",
        "prompt": "Which is an OS responsibility rather than an ordinary end-user application task?",
        "answer": "Managing competing hardware requests",
        "options": [
          "Managing competing hardware requests",
          "Editing a paragraph’s wording",
          "Drawing a company logo",
          "Choosing a photo crop"
        ],
        "explanation": "The OS coordinates shared resources and provides the platform on which end-user applications run.",
        "skill": "Operating-system functions"
      },
      {
        "id": "12-os-10",
        "prompt": "A background process waits for a slow device. Why can scheduling help responsiveness?",
        "answer": "Another ready process can run",
        "options": [
          "Another ready process can run",
          "The device becomes infinitely fast",
          "No context is ever saved",
          "Every process must wait together"
        ],
        "explanation": "The OS can allocate processor time to other runnable work while one process is waiting for input/output.",
        "skill": "Operating-system functions"
      }
    ]
  },
  {
    "id": "12-paging",
    "section": "1.2",
    "spec": "1.2.1(b)",
    "title": "Paging and segmentation",
    "lessons": [
      107
    ],
    "page": 49,
    "questions": [
      {
        "id": "12-paging-1",
        "prompt": "How does paging divide a process’s logical memory?",
        "answer": "Into fixed-size pages",
        "options": [
          "Into fixed-size pages",
          "Into variable-length named segments",
          "Into processor cores",
          "Into source-code tokens"
        ],
        "explanation": "Paging uses fixed-size logical pages mapped to equal-sized physical frames.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-2",
        "prompt": "How does segmentation normally divide a program’s address space?",
        "answer": "Into variable-sized logical units",
        "options": [
          "Into variable-sized logical units",
          "Into fixed-size cache lines only",
          "Into equal clock cycles",
          "Into printer buffers only"
        ],
        "explanation": "Segments can represent logical units such as code, stack or data, with sizes reflecting those units.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-3",
        "prompt": "In a byte-addressed paging model with page size 4 bytes, logical address 14 has which page number and offset?",
        "answer": "Page 3, offset 2",
        "options": [
          "Page 3, offset 2",
          "Page 2, offset 3",
          "Page 4, offset 2",
          "Page 14, offset 0"
        ],
        "explanation": "14 DIV 4 = 3 and 14 MOD 4 = 2. The address is two bytes into logical page 3.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-4",
        "prompt": "A segment has base address 100 and length 20 bytes. A valid offset is 7. What physical address is formed?",
        "answer": "107",
        "options": [
          "107",
          "7",
          "120",
          "127"
        ],
        "explanation": "Add the segment base to the valid offset: 100 + 7 = 107.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-5",
        "prompt": "What maps a logical page number to a physical frame?",
        "answer": "Page table",
        "options": [
          "Page table",
          "Symbol table",
          "Instruction decoder",
          "File extension"
        ],
        "explanation": "A page-table entry identifies the physical frame or relevant state for a logical page.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-6",
        "prompt": "A process’s pages occupy separated physical frames. Is this compatible with paging?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, all frames must be adjacent",
          "Only if every page is empty",
          "Only for read-only programs"
        ],
        "explanation": "Paging allows logical pages to map to non-contiguous frames, while address translation presents a logical address space.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-7",
        "prompt": "A final page occupies a full frame but uses only some of its bytes. What kind of wasted space is this?",
        "answer": "Internal fragmentation",
        "options": [
          "Internal fragmentation",
          "External fragmentation",
          "Syntax error",
          "Cache hit"
        ],
        "explanation": "Unused space inside an allocated fixed-size frame is internal fragmentation.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-8",
        "prompt": "Variable-sized contiguous segments leave scattered free gaps between allocated segments. What problem can this cause?",
        "answer": "External fragmentation",
        "options": [
          "External fragmentation",
          "Tokenisation",
          "Internal page numbering",
          "Automatic compilation"
        ],
        "explanation": "Total free space may exist but not as a sufficiently large contiguous gap for a new segment.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-9",
        "prompt": "A segment length is 20, allowing offsets 0–19. Which offset must be rejected?",
        "answer": "20",
        "options": [
          "20",
          "0",
          "7",
          "19"
        ],
        "explanation": "An offset equal to the length lies just outside the segment. Bounds checking protects adjacent memory.",
        "skill": "Paging and segmentation"
      },
      {
        "id": "12-paging-10",
        "prompt": "Logical page 3 maps to physical frame 5. Page/frame size is 4 bytes and offset is 2. What is the physical byte address?",
        "answer": "22",
        "options": [
          "22",
          "14",
          "20",
          "32"
        ],
        "explanation": "The physical address is frame × frame size + offset: 5 × 4 + 2 = 22.",
        "skill": "Paging and segmentation"
      }
    ]
  },
  {
    "id": "12-virtual-memory",
    "section": "1.2",
    "spec": "1.2.1(b)",
    "title": "Virtual memory",
    "lessons": [
      107,
      266
    ],
    "page": 50,
    "questions": [
      {
        "id": "12-virtual-memory-1",
        "prompt": "In a demand-paged system, why can disk-backed virtual memory help when physical RAM is limited?",
        "answer": "Some pages can reside on storage",
        "options": [
          "Some pages can reside on storage",
          "It creates physical RAM chips",
          "It makes every instruction one cycle",
          "It removes all address translation"
        ],
        "explanation": "The system can keep currently needed pages in RAM and other backed pages on secondary storage, subject to its implementation and limits.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-2",
        "prompt": "What is a page fault for an otherwise valid page that is not resident in RAM?",
        "answer": "An access needs a missing page",
        "options": [
          "An access needs a missing page",
          "A page is already in cache",
          "The program has finished",
          "A printer has run out of paper"
        ],
        "explanation": "The requested page is valid but not currently resident, so the OS must arrange for it to become available before access continues.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-3",
        "prompt": "A needed page is backed on disk and is absent from RAM. What may the OS need to do?",
        "answer": "Load it into a RAM frame",
        "options": [
          "Load it into a RAM frame",
          "Change its source-code syntax",
          "Make a new CPU core",
          "Convert the page into a driver"
        ],
        "explanation": "The OS can read the page from backing storage into a frame and update the relevant mapping.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-4",
        "prompt": "If RAM has no free frame, what may loading another page require?",
        "answer": "Replacing a resident page",
        "options": [
          "Replacing a resident page",
          "Deleting every user file",
          "Discarding the operating system",
          "Disabling the address bus"
        ],
        "explanation": "A replacement policy can select a frame to reuse. Modified data may need writing back before replacement.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-5",
        "prompt": "Why can heavy paging make a program slower?",
        "answer": "Backing storage access takes time",
        "options": [
          "Backing storage access takes time",
          "Virtual addresses cannot be numbers",
          "RAM must stop holding instructions",
          "All page tables become source code"
        ],
        "explanation": "Moving pages between storage and RAM can incur substantial delay compared with accessing already resident memory.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-6",
        "prompt": "Does a large virtual address space mean the computer has that much physical RAM installed?",
        "answer": "No",
        "options": [
          "No",
          "Yes, by definition",
          "Only if the screen is large",
          "Only for a single process"
        ],
        "explanation": "Virtual addressing and physical RAM capacity are different. Translation and backing arrangements do not physically add RAM chips.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-7",
        "prompt": "What is thrashing?",
        "answer": "Excessive repeated paging",
        "options": [
          "Excessive repeated paging",
          "Efficient reuse of a cache entry",
          "Compiling a program twice",
          "Printing many documents"
        ],
        "explanation": "When the active working set does not fit well in RAM, repeated page transfers can dominate time and leave little useful computation.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-8",
        "prompt": "Why track whether a page has been modified before replacing it?",
        "answer": "It may need writing back",
        "options": [
          "It may need writing back",
          "Every modified page is invalid",
          "It must become an interrupt",
          "It changes the CPU clock"
        ],
        "explanation": "A dirty page can contain newer data than its backing copy. Its changes must be preserved when required.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-9",
        "prompt": "Which is virtual memory rather than virtual file storage?",
        "answer": "Moving backed memory pages as needed",
        "options": [
          "Moving backed memory pages as needed",
          "Mapping a remote folder as a drive",
          "Sharing a cloud document link",
          "Accessing a remote archive"
        ],
        "explanation": "Memory paging supports an address space and resident working set. A mapped remote drive presents file storage and is a distinct concept.",
        "skill": "Virtual memory"
      },
      {
        "id": "12-virtual-memory-10",
        "prompt": "What can reduce paging caused by an oversized active working set?",
        "answer": "More suitable physical RAM capacity",
        "options": [
          "More suitable physical RAM capacity",
          "A different desktop wallpaper",
          "A longer source filename",
          "A brighter monitor"
        ],
        "explanation": "Enough RAM to retain more actively needed pages can reduce replacement and transfer frequency, depending on the workload.",
        "skill": "Virtual memory"
      }
    ]
  },
  {
    "id": "12-interrupts",
    "section": "1.2",
    "spec": "1.2.1(c)",
    "title": "Interrupts and service routines",
    "lessons": [
      108
    ],
    "page": 54,
    "questions": [
      {
        "id": "12-interrupts-1",
        "prompt": "What is an interrupt?",
        "answer": "A signal requesting CPU attention",
        "options": [
          "A signal requesting CPU attention",
          "A permanent source-code deletion",
          "A new memory-addressing mode",
          "A type of optical storage"
        ],
        "explanation": "An interrupt signals an event that may require the processor to suspend its current flow and handle that event.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-2",
        "prompt": "A device completes a transfer while an application is running. What can it issue to request attention?",
        "answer": "An interrupt",
        "options": [
          "An interrupt",
          "A compiler token",
          "A source-code comment",
          "A new instruction-set licence"
        ],
        "explanation": "A hardware interrupt can notify the CPU that a device event needs handling.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-3",
        "prompt": "What is the purpose of an interrupt service routine?",
        "answer": "Handle the interrupt’s event",
        "options": [
          "Handle the interrupt’s event",
          "Translate all source code",
          "Replace every process permanently",
          "Store all files in cache"
        ],
        "explanation": "An ISR is the routine executed to respond to the relevant event, such as device completion or a timer signal.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-4",
        "prompt": "Why preserve the interrupted program’s relevant CPU state?",
        "answer": "So execution can resume correctly",
        "options": [
          "So execution can resume correctly",
          "So its source becomes public",
          "So the clock speed doubles",
          "So no ISR is needed"
        ],
        "explanation": "The return address and necessary registers must be preserved so the interrupted computation can continue without losing its state.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-5",
        "prompt": "In the simplified instruction-cycle model, when are pending interrupts usually checked?",
        "answer": "After completing an instruction",
        "options": [
          "After completing an instruction",
          "Only before power-on",
          "Only during lexical analysis",
          "Only after the whole program ends"
        ],
        "explanation": "The model checks between instructions, allowing an appropriate interrupt to be handled without abandoning a partially completed instruction.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-6",
        "prompt": "What does the CPU normally do after the ISR has finished and the saved state is restored?",
        "answer": "Resume the interrupted flow",
        "options": [
          "Resume the interrupted flow",
          "Always restart at address zero",
          "Always delete the process",
          "Always recompile the program"
        ],
        "explanation": "Restoring the saved return address and relevant state lets the interrupted program continue appropriately.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-7",
        "prompt": "A timer interrupt can prompt the OS to do what?",
        "answer": "Reconsider processor scheduling",
        "options": [
          "Reconsider processor scheduling",
          "Physically add RAM",
          "Translate assembly mnemonics",
          "Defragment every file"
        ],
        "explanation": "A timer can provide the regular opportunity needed for pre-emptive scheduling and time sharing.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-8",
        "prompt": "Why can interrupt priorities be useful?",
        "answer": "More urgent events can be handled first",
        "options": [
          "More urgent events can be handled first",
          "Every interrupt has equal urgency",
          "Priorities remove all state saving",
          "Low-priority work is always deleted"
        ],
        "explanation": "A priority system lets the processor or OS distinguish events that require a more urgent response, under the system’s rules.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-9",
        "prompt": "Why can interrupts be preferable to continuously polling a slow device?",
        "answer": "Useful work can run while waiting",
        "options": [
          "Useful work can run while waiting",
          "The device never needs handling",
          "The CPU has no program counter",
          "Every device runs at CPU speed"
        ],
        "explanation": "The CPU can do other work until notification arrives rather than repeatedly asking whether the device is ready.",
        "skill": "Interrupts and service routines"
      },
      {
        "id": "12-interrupts-10",
        "prompt": "When several interrupts are pending, what determines which appropriate ISR runs first?",
        "answer": "Priority and interrupt-handling rules",
        "options": [
          "Priority and interrupt-handling rules",
          "Alphabetical source filenames",
          "The longest device name",
          "The screen resolution"
        ],
        "explanation": "The handling policy and current processor state determine which interrupt can be serviced; not every interrupt is handled immediately.",
        "skill": "Interrupts and service routines"
      }
    ]
  },
  {
    "id": "12-short-scheduling",
    "section": "1.2",
    "spec": "1.2.1(d)",
    "title": "FCFS, SJF and shortest remaining time",
    "lessons": [
      109
    ],
    "page": 41,
    "questions": [
      {
        "id": "12-short-scheduling-1",
        "prompt": "Which rule selects work in First Come First Served scheduling?",
        "answer": "Arrival order",
        "options": [
          "Arrival order",
          "Shortest remaining time always",
          "Highest memory address",
          "Longest job first always"
        ],
        "explanation": "FCFS takes ready processes in arrival order. In its ordinary non-pre-emptive form, a selected CPU burst runs until it finishes or blocks.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-2",
        "prompt": "Which ready job does non-pre-emptive Shortest Job First choose next?",
        "answer": "Smallest predicted CPU burst",
        "options": [
          "Smallest predicted CPU burst",
          "Earliest source-file date",
          "Largest predicted burst",
          "Smallest process identifier always"
        ],
        "explanation": "SJF chooses the shortest predicted next CPU burst among ready jobs when the CPU becomes available.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-3",
        "prompt": "Which scheduling method can pre-empt when a new ready job has a shorter remaining CPU time?",
        "answer": "Shortest Remaining Time First",
        "options": [
          "Shortest Remaining Time First",
          "Non-pre-emptive FCFS",
          "Non-pre-emptive SJF",
          "A fixed alphabetical queue"
        ],
        "explanation": "SRTF is the pre-emptive shortest-time approach, comparing remaining processing times rather than always waiting for the running job to finish.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-4",
        "prompt": "All jobs arrive at time 0 in order A, B, C. Their bursts are A=5, B=2, C=1. Under FCFS with no overhead, when does B start?",
        "answer": "5",
        "options": [
          "5",
          "0",
          "1",
          "7"
        ],
        "explanation": "FCFS first runs A for five time units. B starts at time 5.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-5",
        "prompt": "A starts at time 0 with burst 6. B arrives at time 2 with burst 2. Under SRTF, which job runs at time 2?",
        "answer": "B",
        "options": [
          "B",
          "A",
          "Both on one CPU at once",
          "Neither"
        ],
        "explanation": "A has four time units remaining, whereas B needs two. SRTF selects B and pre-empts A.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-6",
        "prompt": "All jobs are ready with bursts A=5, B=2, C=1. Under SJF, which order is selected?",
        "answer": "C, B, A",
        "options": [
          "C, B, A",
          "A, B, C",
          "B, A, C",
          "A, C, B"
        ],
        "explanation": "SJF orders these ready jobs by their predicted bursts: 1, then 2, then 5.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-7",
        "prompt": "What can cause a short job to wait a long time under FCFS?",
        "answer": "A long earlier job",
        "options": [
          "A long earlier job",
          "A smaller process identifier",
          "Having a short CPU burst alone",
          "A higher screen resolution"
        ],
        "explanation": "A long job at the front can delay shorter jobs queued behind it, often described as the convoy effect.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-8",
        "prompt": "What practical information does SJF need to make its choice?",
        "answer": "An estimate of CPU-burst length",
        "options": [
          "An estimate of CPU-burst length",
          "The user’s password",
          "The document’s colour palette",
          "Only the process name"
        ],
        "explanation": "The scheduler needs a prediction of the next CPU burst, which may not be known exactly in advance.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-9",
        "prompt": "A runs for 2 units before B pre-empts it. A originally needed 6 units. How much work does A have left?",
        "answer": "4",
        "options": [
          "4",
          "2",
          "6",
          "8"
        ],
        "explanation": "Remaining time is original burst minus completed work: 6 − 2 = 4.",
        "skill": "FCFS, SJF and shortest remaining time"
      },
      {
        "id": "12-short-scheduling-10",
        "prompt": "What is a possible drawback of continually favouring shorter jobs?",
        "answer": "A long job may starve",
        "options": [
          "A long job may starve",
          "Every job must finish immediately",
          "All estimates become exact",
          "Context switching disappears"
        ],
        "explanation": "If short jobs keep arriving, a long waiting job may repeatedly lose selection unless the policy includes safeguards.",
        "skill": "FCFS, SJF and shortest remaining time"
      }
    ]
  },
  {
    "id": "12-feedback",
    "section": "1.2",
    "spec": "1.2.1(d)",
    "title": "Round Robin and feedback queues",
    "lessons": [
      110
    ],
    "page": 42,
    "questions": [
      {
        "id": "12-feedback-1",
        "prompt": "What is a Round Robin time quantum?",
        "answer": "Maximum CPU turn before pre-emption",
        "options": [
          "Maximum CPU turn before pre-emption",
          "A process’s total lifetime",
          "The number of installed cores",
          "The size of a memory page"
        ],
        "explanation": "A runnable process gets up to a fixed time slice, then an unfinished process normally returns to the ready queue.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-2",
        "prompt": "A and B are ready at time 0, ordered A then B. Bursts are A=5, B=3; quantum=2 and no overhead. Which process runs after A’s first turn?",
        "answer": "B",
        "options": [
          "B",
          "A again immediately",
          "Both at once on one CPU",
          "No process"
        ],
        "explanation": "A uses two units and remains unfinished. Round Robin gives B the next turn.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-3",
        "prompt": "What distinguishes a multilevel feedback queue from a permanently fixed queue assignment?",
        "answer": "Processes can move between levels",
        "options": [
          "Processes can move between levels",
          "Every queue has identical priority",
          "Only one process may exist",
          "All jobs run to completion at entry"
        ],
        "explanation": "Feedback policies use behaviour such as time-slice use to change a process’s queue or priority.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-4",
        "prompt": "In a stated feedback policy, new jobs enter the highest queue and full-quantum users are demoted. A new job uses its whole quantum. What happens?",
        "answer": "It moves to a lower queue",
        "options": [
          "It moves to a lower queue",
          "It is permanently deleted",
          "It must move above the top queue",
          "Its burst becomes zero"
        ],
        "explanation": "The result follows the policy given in the question. Different feedback-queue designs can have different exact rules.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-5",
        "prompt": "A job needs 5 units. Its Round Robin quantum is 2. After one full turn, how much processing remains?",
        "answer": "3",
        "options": [
          "3",
          "0",
          "2",
          "5"
        ],
        "explanation": "The job has used 2 of its required 5 units, so 3 remain.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-6",
        "prompt": "Why can a very small Round Robin quantum reduce efficiency?",
        "answer": "Frequent switching adds overhead",
        "options": [
          "Frequent switching adds overhead",
          "It disables all pre-emption",
          "It gives every job one full day",
          "It removes the need for registers"
        ],
        "explanation": "Many short turns can cause frequent context switches, consuming time that could otherwise do useful work.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-7",
        "prompt": "What happens if the Round Robin quantum exceeds every ready job’s burst and all arrive together?",
        "answer": "The initial order acts like FCFS",
        "options": [
          "The initial order acts like FCFS",
          "Every job runs in parallel",
          "No job can finish",
          "The shortest job always jumps ahead"
        ],
        "explanation": "Each job finishes during its first turn, so the queue’s initial order determines the execution order.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-8",
        "prompt": "Why might a feedback policy favour short interactive bursts?",
        "answer": "Improve interactive response",
        "options": [
          "Improve interactive response",
          "Force every task to batch mode",
          "Remove all input devices",
          "Guarantee minimum total runtime"
        ],
        "explanation": "Giving responsive tasks prompt turns can improve perceived response, but the effect depends on queue and scheduling rules.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-9",
        "prompt": "Why can priority boosting or ageing help a feedback scheduler?",
        "answer": "Reduce long-job starvation risk",
        "options": [
          "Reduce long-job starvation risk",
          "Make every burst length zero",
          "Eliminate every scheduling decision",
          "Turn every queue into a stack"
        ],
        "explanation": "Raising long-waiting jobs’ priority can prevent low-level work being postponed indefinitely.",
        "skill": "Round Robin and feedback queues"
      },
      {
        "id": "12-feedback-10",
        "prompt": "A feedback policy uses several priority queues. Why must a scheduling trace state the policy’s rules?",
        "answer": "Movement and selection rules vary",
        "options": [
          "Movement and selection rules vary",
          "Queue names alone fix every detail",
          "All feedback algorithms are FCFS",
          "No process can change priority"
        ],
        "explanation": "Quantum lengths, demotion, promotion and tie-breaking rules determine the trace. The label alone is insufficient.",
        "skill": "Round Robin and feedback queues"
      }
    ]
  },
  {
    "id": "12-os-types",
    "section": "1.2",
    "spec": "1.2.1(e)",
    "title": "Types of operating system",
    "lessons": [
      111,
      269
    ],
    "page": 33,
    "questions": [
      {
        "id": "12-os-types-1",
        "prompt": "A controller must respond to an input before a strict deadline. Which OS characteristic is most relevant?",
        "answer": "Real-time",
        "options": [
          "Real-time",
          "Only multi-user",
          "Only distributed",
          "Only graphical"
        ],
        "explanation": "A real-time system is designed around timely responses to deadlines, rather than simply being fast on average.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-2",
        "prompt": "A washing-machine controller performs a dedicated role inside the appliance. Which classification fits?",
        "answer": "Embedded",
        "options": [
          "Embedded",
          "General-purpose desktop only",
          "Multi-user only",
          "Compiler-based only"
        ],
        "explanation": "An embedded system is integrated into a device for a dedicated function. It may also have other classifications.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-3",
        "prompt": "Many authorised users interact with the same central system at once. Which OS capability is needed?",
        "answer": "Multi-user",
        "options": [
          "Multi-user",
          "Single-task only",
          "Optical storage only",
          "Machine-code generation only"
        ],
        "explanation": "A multi-user OS manages concurrent users, their sessions, access and shared resources.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-4",
        "prompt": "One computer manages several running applications by sharing CPU time. Which capability is demonstrated?",
        "answer": "Multitasking",
        "options": [
          "Multitasking",
          "Only source-code linking",
          "Only virtual file storage",
          "Only firmware updating"
        ],
        "explanation": "Multitasking manages multiple processes or tasks so their progress can overlap or be interleaved.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-5",
        "prompt": "An OS coordinates work across several connected computers and presents a coherent system to users. Which classification fits?",
        "answer": "Distributed",
        "options": [
          "Distributed",
          "Standalone embedded only",
          "Single-user only",
          "Read-only firmware"
        ],
        "explanation": "A distributed OS coordinates multiple networked machines to provide system-wide services or a unified view.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-6",
        "prompt": "Can a dedicated braking controller be both embedded and real-time?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, categories are exclusive",
          "Only if it has several users",
          "Only if it never receives input"
        ],
        "explanation": "Embedded describes its dedicated role within a device; real-time describes timing requirements. These characteristics can overlap.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-7",
        "prompt": "Does real-time mean the system always has the highest average processing speed?",
        "answer": "No, deadlines define the need",
        "options": [
          "No, deadlines define the need",
          "Yes, in every workload",
          "Only if it is distributed",
          "Only if its files are compressed"
        ],
        "explanation": "A response that meets a strict deadline can be correct even when another system has a higher average throughput.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-8",
        "prompt": "Why does a multi-user OS need account permissions?",
        "answer": "To separate users’ access rights",
        "options": [
          "To separate users’ access rights",
          "To give everyone all files",
          "To remove scheduling",
          "To make every account identical"
        ],
        "explanation": "Users share resources but may have different access rights. The OS must enforce the intended boundaries.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-9",
        "prompt": "A distributed system depends on messages between computers. Which issue can affect its performance?",
        "answer": "Communication delay",
        "options": [
          "Communication delay",
          "The colour of one monitor",
          "The names of local variables",
          "The choice of text editor font"
        ],
        "explanation": "Network latency, bandwidth and coordination can limit the benefit of distributing processing across machines.",
        "skill": "Types of operating system"
      },
      {
        "id": "12-os-types-10",
        "prompt": "A single-core computer interleaves several tasks. Does multitasking alone prove true simultaneous execution on that core?",
        "answer": "No",
        "options": [
          "No",
          "Yes, every task runs at once",
          "Only if tasks have long names",
          "Only if every task uses a printer"
        ],
        "explanation": "Task switching can provide multitasking without separate execution resources running those tasks simultaneously.",
        "skill": "Types of operating system"
      }
    ]
  },
  {
    "id": "12-bios",
    "section": "1.2",
    "spec": "1.2.1(f)",
    "title": "BIOS, firmware and booting",
    "lessons": [
      111,
      270
    ],
    "page": 57,
    "questions": [
      {
        "id": "12-bios-1",
        "prompt": "Why must startup firmware be available before the main OS is running?",
        "answer": "It begins hardware startup and booting",
        "options": [
          "It begins hardware startup and booting",
          "It edits user documents",
          "It replaces every application",
          "It runs only after all users log out"
        ],
        "explanation": "Firmware provides the initial code needed to initialise the machine and begin the process of loading the OS.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-2",
        "prompt": "What does POST stand for in a traditional startup process?",
        "answer": "Power-On Self-Test",
        "options": [
          "Power-On Self-Test",
          "Program Output Scheduling Table",
          "Page Offset Storage Transfer",
          "Processor Object Syntax Tree"
        ],
        "explanation": "POST performs initial hardware checks as part of a traditional firmware startup sequence.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-3",
        "prompt": "Why is firmware normally held in non-volatile storage?",
        "answer": "It must survive power-off",
        "options": [
          "It must survive power-off",
          "It must vanish on shutdown",
          "It stores only temporary key presses",
          "It cannot contain instructions"
        ],
        "explanation": "The startup code must remain available when power is restored, before ordinary applications have loaded.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-4",
        "prompt": "After suitable hardware initialisation, what role does the boot loader perform?",
        "answer": "Loads and starts the OS kernel",
        "options": [
          "Loads and starts the OS kernel",
          "Performs all user word processing",
          "Compiles every installed application",
          "Permanently erases main RAM"
        ],
        "explanation": "The boot loader locates and loads the required OS code into memory and transfers control as appropriate.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-5",
        "prompt": "Which sequence best fits a simplified startup?",
        "answer": "Firmware → boot loader → OS",
        "options": [
          "Firmware → boot loader → OS",
          "OS → firmware → power-on",
          "Applications → POST → firmware",
          "Linker → document → monitor"
        ],
        "explanation": "Startup firmware begins initialisation, boot code loads the OS, and the OS then manages the running system.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-6",
        "prompt": "A computer has several possible boot devices. What can firmware configuration affect?",
        "answer": "Which device is tried for booting",
        "options": [
          "Which device is tried for booting",
          "The meaning of every CPU opcode",
          "The source language of every app",
          "The number of physical CPU cores"
        ],
        "explanation": "Boot configuration can specify available boot choices or their order. It does not rewrite the processor’s instruction set.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-7",
        "prompt": "Is modern firmware necessarily permanently unchangeable?",
        "answer": "No, it may be reprogrammable",
        "options": [
          "No, it may be reprogrammable",
          "Yes, all firmware is immutable",
          "Only if no RAM is installed",
          "Only if the machine is offline"
        ],
        "explanation": "Modern firmware is often stored in reprogrammable non-volatile memory. Persistence and permanent immutability are different properties.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-8",
        "prompt": "Which is a firmware/boot responsibility rather than an ordinary user application task?",
        "answer": "Initialising hardware before OS startup",
        "options": [
          "Initialising hardware before OS startup",
          "Formatting a paragraph",
          "Retouching an image",
          "Calculating a pupil’s average in a sheet"
        ],
        "explanation": "The initial boot environment must establish enough hardware operation to load and start the OS.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-9",
        "prompt": "Where is the running OS normally loaded for execution rather than left only as a file on secondary storage?",
        "answer": "Main memory",
        "options": [
          "Main memory",
          "Only an optical output tray",
          "Only the address bus",
          "Only a printer queue"
        ],
        "explanation": "OS instructions and active data need to be accessible for execution, with relevant parts resident in main memory.",
        "skill": "BIOS, firmware and booting"
      },
      {
        "id": "12-bios-10",
        "prompt": "A user says BIOS is the full operating system. Which response is correct?",
        "answer": "Firmware and OS have different roles",
        "options": [
          "Firmware and OS have different roles",
          "BIOS is always a word processor",
          "The OS never manages hardware",
          "Firmware cannot execute code"
        ],
        "explanation": "Firmware starts and supports initial machine operation, while the OS manages resources and services during normal use.",
        "skill": "BIOS, firmware and booting"
      }
    ]
  },
  {
    "id": "12-drivers",
    "section": "1.2",
    "spec": "1.2.1(g)",
    "title": "Device drivers",
    "lessons": [
      111,
      270
    ],
    "page": 58,
    "questions": [
      {
        "id": "12-drivers-1",
        "prompt": "What is a device driver?",
        "answer": "Software for controlling a device",
        "options": [
          "Software for controlling a device",
          "A physical input sensor",
          "A source-code grammar rule",
          "A user’s saved document"
        ],
        "explanation": "A driver enables the OS or its services to communicate with a particular device or device class.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-2",
        "prompt": "Why can applications use a standard print interface with different printers?",
        "answer": "Drivers handle device-specific details",
        "options": [
          "Drivers handle device-specific details",
          "All printers have identical hardware",
          "The document is always machine code",
          "Printers need no control commands"
        ],
        "explanation": "Drivers and OS interfaces translate standard requests into the operations supported by the device.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-3",
        "prompt": "A newly connected device is not supported by an available driver. What may be needed for normal OS use?",
        "answer": "A compatible device driver",
        "options": [
          "A compatible device driver",
          "A new source language",
          "A longer filename",
          "An extra spreadsheet formula"
        ],
        "explanation": "The OS needs appropriate support for the device’s interface and functions, whether supplied separately or already built in.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-4",
        "prompt": "Why must a driver be compatible with the intended operating system?",
        "answer": "Its interfaces must fit the OS",
        "options": [
          "Its interfaces must fit the OS",
          "It changes all program syntax",
          "It replaces every system call",
          "It only contains image pixels"
        ],
        "explanation": "Drivers rely on OS interfaces and operating conventions; a driver for a different environment may not function correctly.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-5",
        "prompt": "A driver exposes scan settings and retrieves image data from a scanner. Which function is illustrated?",
        "answer": "Hardware-specific device access",
        "options": [
          "Hardware-specific device access",
          "Lexical analysis",
          "Disk defragmentation",
          "Source-code optimisation"
        ],
        "explanation": "The driver controls the scanner’s supported operations and transfers results through the OS’s device interfaces.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-6",
        "prompt": "Does every peripheral require a separate manual driver installation?",
        "answer": "No, support may be built in",
        "options": [
          "No, support may be built in",
          "Yes, always from a separate disc",
          "Only if it has a short name",
          "Only if the device is wireless"
        ],
        "explanation": "An OS may already provide a suitable class driver or device support. The need is for compatible support, not necessarily a manual installation.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-7",
        "prompt": "A kernel-mode driver contains a serious fault. Why can this affect system stability?",
        "answer": "It runs with privileged access",
        "options": [
          "It runs with privileged access",
          "It is only an isolated text file",
          "It cannot access hardware",
          "It always runs after shutdown"
        ],
        "explanation": "Privileged driver code can affect shared system resources. Faults may therefore have consequences beyond one application.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-8",
        "prompt": "Which separates a device driver from a compiler?",
        "answer": "A driver controls hardware access",
        "options": [
          "A driver controls hardware access",
          "A driver always generates tokens",
          "A compiler moves printer paper",
          "Both exist only as physical chips"
        ],
        "explanation": "A compiler translates program code. A driver supports communication with and control of a device.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-9",
        "prompt": "A program asks to play sound through a standard OS service. Which component handles the relevant device-specific interaction?",
        "answer": "Audio driver",
        "options": [
          "Audio driver",
          "Spreadsheet formula",
          "Syntax tree",
          "Source-code comment"
        ],
        "explanation": "The OS’s audio services use appropriate driver support to communicate with the sound device.",
        "skill": "Device drivers"
      },
      {
        "id": "12-drivers-10",
        "prompt": "Why might a device function only partly with a basic generic driver?",
        "answer": "Special features may lack support",
        "options": [
          "Special features may lack support",
          "The CPU has no registers",
          "All generic drivers delete files",
          "The device becomes optical storage"
        ],
        "explanation": "A generic interface may cover common functions while a device has additional features requiring more specific support.",
        "skill": "Device drivers"
      }
    ]
  },
  {
    "id": "12-vms",
    "section": "1.2",
    "spec": "1.2.1(h)",
    "title": "Virtual machines",
    "lessons": [
      111,
      270
    ],
    "page": 59,
    "questions": [
      {
        "id": "12-vms-1",
        "prompt": "What is a virtual machine in this topic?",
        "answer": "Software behaving as a machine",
        "options": [
          "Software behaving as a machine",
          "An extra physical monitor",
          "A type of magnetic disc",
          "A fixed memory-address number"
        ],
        "explanation": "A VM provides a software-defined execution environment with behaviour resembling a machine or runtime platform.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-2",
        "prompt": "A technician runs a guest OS inside a VM on a host computer. What is one benefit?",
        "answer": "Test another OS without replacing the host",
        "options": [
          "Test another OS without replacing the host",
          "Eliminate all hardware requirements",
          "Guarantee every program is faster",
          "Avoid allocating any memory"
        ],
        "explanation": "Virtualisation can provide a separate guest environment while retaining the host’s installed OS.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-3",
        "prompt": "A runtime executes intermediate bytecode on different host platforms. Which examinable VM model is this?",
        "answer": "Intermediate-code execution environment",
        "options": [
          "Intermediate-code execution environment",
          "Only remote file storage",
          "Only a physical network adapter",
          "A fixed CPU register"
        ],
        "explanation": "A language/process VM provides an execution environment for intermediate instructions, rather than emulating an entire user computer necessarily.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-4",
        "prompt": "What supports portability of a program distributed as intermediate code?",
        "answer": "A suitable runtime on each platform",
        "options": [
          "A suitable runtime on each platform",
          "Identical screen resolutions",
          "Identical local filenames",
          "No translation at any stage"
        ],
        "explanation": "Platform-specific runtimes can execute the common intermediate representation. Required runtimes and libraries must be available.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-5",
        "prompt": "Why can a guest OS VM need significant host resources?",
        "answer": "Guest memory and processing consume them",
        "options": [
          "Guest memory and processing consume them",
          "Virtual machines have no instructions",
          "All guests share one immutable value",
          "Every guest automatically adds RAM"
        ],
        "explanation": "The guest’s OS and applications use host CPU time, memory and storage, plus virtualisation overhead.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-6",
        "prompt": "What does a hypervisor primarily support?",
        "answer": "Creating and managing guest machines",
        "options": [
          "Creating and managing guest machines",
          "Editing every guest document",
          "Tokenising all source code",
          "Printing all guest output"
        ],
        "explanation": "A hypervisor manages virtualised machines and their access to underlying resources.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-7",
        "prompt": "Which is a reasonable use of a VM snapshot?",
        "answer": "Return to a saved environment state",
        "options": [
          "Return to a saved environment state",
          "Guarantee every file is externally backed up",
          "Make hardware infinitely fast",
          "Remove every need for storage"
        ],
        "explanation": "A snapshot can support testing and rollback. Its exact coverage and protection depend on the VM and snapshot arrangement.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-8",
        "prompt": "Does VM isolation guarantee that no security or configuration failure is possible?",
        "answer": "No",
        "options": [
          "No",
          "Yes, software boundaries are infallible",
          "Only with a single guest",
          "Only without a network name"
        ],
        "explanation": "Isolation is useful but depends on correct implementation and configuration. It is not an absolute guarantee.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-9",
        "prompt": "Which distinguishes a guest OS VM from an intermediate-code VM?",
        "answer": "It provides a whole-system environment",
        "options": [
          "It provides a whole-system environment",
          "It must have no operating system",
          "It can never use virtual devices",
          "It executes only text documents"
        ],
        "explanation": "A system VM supports a guest OS and its virtual hardware environment; an intermediate-code VM supplies a runtime for a program representation.",
        "skill": "Virtual machines"
      },
      {
        "id": "12-vms-10",
        "prompt": "Why might a VM run more slowly than a suitable native setup?",
        "answer": "Resource sharing and extra overhead",
        "options": [
          "Resource sharing and extra overhead",
          "It cannot execute instructions",
          "The host has no physical memory",
          "All virtual disks have zero capacity"
        ],
        "explanation": "Virtualisation, competing host workloads and configured resource limits can affect speed. The effect varies with the system and task.",
        "skill": "Virtual machines"
      }
    ]
  },
  {
    "id": "12-applications",
    "section": "1.2",
    "spec": "1.2.2(a)",
    "title": "Choosing application software",
    "lessons": [
      112
    ],
    "page": 69,
    "questions": [
      {
        "id": "12-applications-1",
        "prompt": "A user must write and format a long report. Which application type is most suitable?",
        "answer": "Word processor",
        "options": [
          "Word processor",
          "Device driver",
          "Assembler",
          "Disk defragmenter"
        ],
        "explanation": "A word processor provides document text editing, layout and formatting functions.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-2",
        "prompt": "A teacher needs formulas and charts for a small marks table. Which application type fits?",
        "answer": "Spreadsheet",
        "options": [
          "Spreadsheet",
          "Compiler",
          "Boot loader",
          "Audio driver"
        ],
        "explanation": "Spreadsheets support tabular values, formulas and charts, suiting this stated numerical task.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-3",
        "prompt": "An organisation needs many linked records with controlled updates and queries. Which software type fits?",
        "answer": "Database management system",
        "options": [
          "Database management system",
          "Bitmap editor",
          "Media player",
          "Screen saver"
        ],
        "explanation": "A DBMS supports structured related data, queries and controlled data management.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-4",
        "prompt": "An engineer needs precise plans and dimensions for a component. Which application type is appropriate?",
        "answer": "Computer-aided design",
        "options": [
          "Computer-aided design",
          "Disk-cleanup utility",
          "Text-to-machine translator",
          "Boot firmware"
        ],
        "explanation": "CAD software supports precise design and modelling rather than general system maintenance.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-5",
        "prompt": "A shop commissions software for its unusual stock-allocation rules. Which description fits?",
        "answer": "Bespoke application",
        "options": [
          "Bespoke application",
          "Generic firmware always",
          "An interrupt routine only",
          "A standard CPU register"
        ],
        "explanation": "Bespoke software is developed or tailored for particular requirements, unlike an unmodified general package.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-6",
        "prompt": "What is a potential advantage of an off-the-shelf package that meets requirements?",
        "answer": "Available without a full custom build",
        "options": [
          "Available without a full custom build",
          "Guaranteed perfect fit for every user",
          "No licence terms ever apply",
          "No training can be needed"
        ],
        "explanation": "Existing software can save development effort and time, but suitability, support, cost and licence conditions still matter.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-7",
        "prompt": "What can be a drawback of bespoke software?",
        "answer": "Development and maintenance effort",
        "options": [
          "Development and maintenance effort",
          "It cannot meet specific requirements",
          "It must always be free",
          "It never requires testing"
        ],
        "explanation": "Custom development can fit needs closely but requires resources to build, test, support and update.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-8",
        "prompt": "A school needs software to edit photographs at pixel level. Which type fits?",
        "answer": "Bitmap image editor",
        "options": [
          "Bitmap image editor",
          "Assembler",
          "CPU scheduler",
          "Boot loader"
        ],
        "explanation": "Bitmap editors manipulate raster image pixels and provide suitable photo-editing operations.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-9",
        "prompt": "Why should application choice begin with the user’s requirements?",
        "answer": "Suitability depends on the task",
        "options": [
          "Suitability depends on the task",
          "The longest feature list always wins",
          "Only the logo matters",
          "Every application has the same role"
        ],
        "explanation": "Required functions, users, compatibility and constraints determine which application is appropriate.",
        "skill": "Choosing application software"
      },
      {
        "id": "12-applications-10",
        "prompt": "A package has the needed functions but cannot exchange the required file format with existing systems. What is a concern?",
        "answer": "Compatibility",
        "options": [
          "Compatibility",
          "The number of comments in its code",
          "The name of the CPU register",
          "The shape of the mouse pointer"
        ],
        "explanation": "Software must integrate with relevant formats and workflows, as well as provide individual features.",
        "skill": "Choosing application software"
      }
    ]
  },
  {
    "id": "12-utilities",
    "section": "1.2",
    "spec": "1.2.2(b)",
    "title": "Utility software",
    "lessons": [
      112
    ],
    "page": 70,
    "questions": [
      {
        "id": "12-utilities-1",
        "prompt": "What is the main purpose of utility software?",
        "answer": "Support system maintenance or management",
        "options": [
          "Support system maintenance or management",
          "Only create user presentations",
          "Only execute LMC instructions",
          "Only provide application themes"
        ],
        "explanation": "Utilities carry out supporting tasks such as backup, cleanup, compression and security-related maintenance.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-2",
        "prompt": "Which utility task helps recover files after the main copy is lost?",
        "answer": "Backup",
        "options": [
          "Backup",
          "Defragmentation alone",
          "Syntax analysis",
          "Monitor calibration"
        ],
        "explanation": "A suitable backup preserves recoverable copies independently of the main working copy, subject to its schedule and retention.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-3",
        "prompt": "What is a disk-cleanup utility intended to do?",
        "answer": "Remove selected unnecessary files",
        "options": [
          "Remove selected unnecessary files",
          "Translate all programs to machine code",
          "Guarantee data recovery",
          "Create more physical disk hardware"
        ],
        "explanation": "Cleanup can reclaim storage used by unnecessary temporary or selected files. It is not a substitute for backup.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-4",
        "prompt": "Why can defragmentation improve access on a mechanical hard disk?",
        "answer": "Related file blocks become closer",
        "options": [
          "Related file blocks become closer",
          "It adds physical read heads",
          "It creates more RAM chips",
          "It changes every file’s meaning"
        ],
        "explanation": "Reorganising fragments can reduce the head movement needed to read a file, where mechanical seeking is relevant.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-5",
        "prompt": "What does a file-compression utility aim to reduce?",
        "answer": "Storage or transfer size",
        "options": [
          "Storage or transfer size",
          "The number of CPU cores",
          "The meaning of every instruction",
          "The physical screen width"
        ],
        "explanation": "Compression represents data more compactly, subject to the method used and the nature of the data.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-6",
        "prompt": "Why does a solid-state drive not gain the same mechanical head-seek benefit from defragmentation?",
        "answer": "It has no moving read/write head",
        "options": [
          "It has no moving read/write head",
          "Its files contain no bits",
          "It cannot store fragmented data",
          "It is always volatile"
        ],
        "explanation": "The physical head movement that motivates traditional HDD defragmentation is absent from an SSD.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-7",
        "prompt": "A malware-scanning utility flags a suspicious file. What does the flag support?",
        "answer": "Investigation or protective action",
        "options": [
          "Investigation or protective action",
          "Proof that every flagged file is harmful",
          "Automatic correctness of all software",
          "Guaranteed removal of every threat"
        ],
        "explanation": "Detection can support protective action but can have false positives and missed threats. A flag is not a universal proof.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-8",
        "prompt": "Does compressing a file necessarily keep its contents confidential?",
        "answer": "No",
        "options": [
          "No",
          "Yes, compression is always encryption",
          "Only if the filename is long",
          "Only when the file is text"
        ],
        "explanation": "Compression reduces representation size; encryption addresses confidentiality. They are different functions.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-9",
        "prompt": "What should be checked to establish that a backup process is useful?",
        "answer": "That required data can be restored",
        "options": [
          "That required data can be restored",
          "Only that a progress bar appeared",
          "Only the backup software’s logo",
          "That no retention settings exist"
        ],
        "explanation": "A usable backup must support recovery of the required files and versions, rather than merely reporting that a job ran.",
        "skill": "Utility software"
      },
      {
        "id": "12-utilities-10",
        "prompt": "A utility reports storage usage by folder. What maintenance decision can this support?",
        "answer": "Identifying large storage consumers",
        "options": [
          "Identifying large storage consumers",
          "Changing a CPU opcode",
          "Selecting an ISR address automatically",
          "Proving every file is malware"
        ],
        "explanation": "Usage information can help users or administrators understand where capacity is being consumed.",
        "skill": "Utility software"
      }
    ]
  },
  {
    "id": "12-licensing",
    "section": "1.2",
    "spec": "1.2.2(c)",
    "title": "Open-source and closed-source software",
    "lessons": [
      113
    ],
    "page": 65,
    "questions": [
      {
        "id": "12-licensing-1",
        "prompt": "Which is central to open-source software?",
        "answer": "Source access with licence rights",
        "options": [
          "Source access with licence rights",
          "A price of exactly zero",
          "No copyright exists",
          "No one may inspect the code"
        ],
        "explanation": "Open-source licences provide rights to inspect, use, modify and redistribute source under their stated conditions.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-2",
        "prompt": "A closed-source application is supplied at no charge. Does that alone make it open source?",
        "answer": "No",
        "options": [
          "No",
          "Yes, free always means open",
          "Only if its icon is public",
          "Only on a single-core computer"
        ],
        "explanation": "Price and source licensing are different. A zero-price application can still withhold source code and modification rights.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-3",
        "prompt": "A school wants to adapt a feature itself. What can open source offer?",
        "answer": "Access and rights to modify source",
        "options": [
          "Access and rights to modify source",
          "A guarantee no expertise is needed",
          "Guaranteed free support forever",
          "No need to read licence terms"
        ],
        "explanation": "Source access and appropriate licence rights permit adaptation, but the school still needs the skills and resources to maintain its changes.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-4",
        "prompt": "Why must users still check an open-source licence?",
        "answer": "Conditions can govern redistribution",
        "options": [
          "Conditions can govern redistribution",
          "Open source has no conditions",
          "All licences are identical",
          "The licence sets CPU clock speed"
        ],
        "explanation": "Licences can impose different conditions, such as preserving notices or sharing certain distributed changes. The exact licence matters.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-5",
        "prompt": "What is a typical limitation of closed-source software for a user wanting a custom code change?",
        "answer": "No general source-modification access",
        "options": [
          "No general source-modification access",
          "It can never be supported",
          "It must always cost money",
          "It cannot run on ordinary hardware"
        ],
        "explanation": "Users normally rely on the supplier or permitted extension interfaces rather than freely modifying the unavailable source.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-6",
        "prompt": "Does public source code guarantee that software has no security bugs?",
        "answer": "No",
        "options": [
          "No",
          "Yes, inspection removes every bug",
          "Only if the files are small",
          "Only if it is downloaded free"
        ],
        "explanation": "Public review can help identify defects, but review quality, maintenance and implementation still determine the result.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-7",
        "prompt": "A company supplies paid support for an open-source product. Is this inherently contradictory?",
        "answer": "No",
        "options": [
          "No",
          "Yes, every open service must be free",
          "Only if support is a compiler",
          "Only if source code is hidden"
        ],
        "explanation": "Charging for services or distribution can be compatible with open-source licensing. Open source does not mean every associated service costs nothing.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-8",
        "prompt": "Why might an organisation prefer a supported proprietary package that meets its needs?",
        "answer": "A suitable support/service agreement",
        "options": [
          "A suitable support/service agreement",
          "The source must be bug-free",
          "It needs no training",
          "It has no usage restrictions"
        ],
        "explanation": "A suitable supplier agreement can be valuable, but the organisation should still consider terms, suitability, cost and dependency.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-9",
        "prompt": "An open-source project is abandoned. What possible advantage can source availability provide?",
        "answer": "Others may continue development",
        "options": [
          "Others may continue development",
          "Maintenance happens automatically",
          "Every user becomes a programmer",
          "The software cannot become outdated"
        ],
        "explanation": "Permitted access to the source can let a capable community or organisation maintain it. Continued development still requires effort.",
        "skill": "Open-source and closed-source software"
      },
      {
        "id": "12-licensing-10",
        "prompt": "Which comparison is most useful when choosing a licensing model for a school?",
        "answer": "Rights, support, cost and skills",
        "options": [
          "Rights, support, cost and skills",
          "Only the word free",
          "Only the icon colour",
          "Only source-file length"
        ],
        "explanation": "The choice should reflect required rights, available expertise, support arrangements and overall cost, rather than a single slogan.",
        "skill": "Open-source and closed-source software"
      }
    ]
  },
  {
    "id": "12-translators",
    "section": "1.2",
    "spec": "1.2.2(d)",
    "title": "Compilers, interpreters and assemblers",
    "lessons": [
      114
    ],
    "page": 64,
    "questions": [
      {
        "id": "12-translators-1",
        "prompt": "Why are translators needed for many programming languages?",
        "answer": "To make program representations executable",
        "options": [
          "To make program representations executable",
          "To add physical memory",
          "To choose a desktop theme",
          "To replace all algorithms"
        ],
        "explanation": "The written language or intermediate representation must be translated or handled by a suitable runtime for execution on the target system.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-2",
        "prompt": "What does an assembler translate?",
        "answer": "Assembly mnemonics into machine code",
        "options": [
          "Assembly mnemonics into machine code",
          "Photographs into paragraphs",
          "Only high-level class diagrams",
          "All source into English"
        ],
        "explanation": "An assembler converts assembly instructions, labels and related declarations into the corresponding machine representation.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-3",
        "prompt": "What can a compiler produce before the translated program is run?",
        "answer": "Target or object code",
        "options": [
          "Target or object code",
          "Only a printed error poster",
          "An extra physical CPU",
          "A new input device"
        ],
        "explanation": "Compilation translates a program into another representation, such as object, machine or intermediate code, before that output is executed.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-4",
        "prompt": "Which best describes interpretation?",
        "answer": "A runtime carries out the program",
        "options": [
          "A runtime carries out the program",
          "No program representation is used",
          "The CPU understands every source language",
          "Only assembly labels are processed"
        ],
        "explanation": "An interpreter executes a representation of the program through runtime software. Real systems can combine interpretation with compilation.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-5",
        "prompt": "What is a possible benefit of distributing a suitable native compiled executable?",
        "answer": "No source translation at every run",
        "options": [
          "No source translation at every run",
          "It runs on every architecture unchanged",
          "It is guaranteed bug-free",
          "It needs no system libraries ever"
        ],
        "explanation": "The translated executable can be run without recompiling source each time, provided its target and required dependencies are compatible.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-6",
        "prompt": "A developer wants to try small changes through an interactive runtime. Which approach can support this?",
        "answer": "Interpretation",
        "options": [
          "Interpretation",
          "Only printing source code",
          "Only changing hardware",
          "Only burning firmware"
        ],
        "explanation": "An interactive interpreter can let a developer execute and inspect small pieces of code during development.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-7",
        "prompt": "Does successful compilation prove that a program’s logic is correct?",
        "answer": "No",
        "options": [
          "No",
          "Yes, all outputs are checked",
          "Only when there are comments",
          "Only for numeric programs"
        ],
        "explanation": "A program can compile and still produce wrong answers, violate requirements or fail at runtime on particular inputs.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-8",
        "prompt": "Why may a native executable for one CPU architecture fail on another?",
        "answer": "Its machine instructions differ",
        "options": [
          "Its machine instructions differ",
          "The filename must be too short",
          "Every compiler removes all libraries",
          "All architectures share no data types"
        ],
        "explanation": "Native instruction encodings and platform conventions depend on the target. Source or a portable intermediate representation may need suitable translation/runtime support.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-9",
        "prompt": "A system compiles source to bytecode and later interprets or JIT-compiles it. Which statement is correct?",
        "answer": "Translation approaches can be combined",
        "options": [
          "Translation approaches can be combined",
          "It cannot be a real program",
          "Bytecode is always a physical chip",
          "A compiler can never produce bytecode"
        ],
        "explanation": "Compilation, interpretation and just-in-time compilation can be combined in one language implementation.",
        "skill": "Compilers, interpreters and assemblers"
      },
      {
        "id": "12-translators-10",
        "prompt": "Which translator most directly resolves LMC mnemonic instructions and labels into numeric instructions?",
        "answer": "Assembler",
        "options": [
          "Assembler",
          "Spreadsheet",
          "Backup utility",
          "Device scheduler"
        ],
        "explanation": "An assembler translates low-level mnemonic operations and label references into the machine’s instruction representation.",
        "skill": "Compilers, interpreters and assemblers"
      }
    ]
  },
  {
    "id": "12-compilation",
    "section": "1.2",
    "spec": "1.2.2(e)",
    "title": "Stages of compilation",
    "lessons": [
      115
    ],
    "page": 65,
    "questions": [
      {
        "id": "12-compilation-1",
        "prompt": "Which stage groups source characters into tokens?",
        "answer": "Lexical analysis",
        "options": [
          "Lexical analysis",
          "Loading",
          "Scheduling",
          "Disk defragmentation"
        ],
        "explanation": "Lexical analysis recognises tokens such as identifiers, keywords, operators and literals.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-2",
        "prompt": "Which stage checks whether token sequences follow the language’s grammar?",
        "answer": "Syntax analysis",
        "options": [
          "Syntax analysis",
          "File backup",
          "Paging",
          "Device initialisation"
        ],
        "explanation": "Syntax analysis parses the token sequence according to grammar rules and can identify malformed structures.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-3",
        "prompt": "Which stage produces target or object instructions from the program representation?",
        "answer": "Code generation",
        "options": [
          "Code generation",
          "Process scheduling",
          "Memory paging",
          "Optical recording"
        ],
        "explanation": "Code generation translates the analysed program representation into instructions for a target representation.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-4",
        "prompt": "What is the goal of compiler optimisation?",
        "answer": "Improve code while preserving behaviour",
        "options": [
          "Improve code while preserving behaviour",
          "Change every required output",
          "Remove all validation regardless of effect",
          "Guarantee constant-time execution"
        ],
        "explanation": "Optimisation seeks benefits such as smaller or faster code without changing the program’s intended observable behaviour.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-5",
        "prompt": "A source expression is x = 2 + 3. Replacing the constant calculation with x = 5 is what kind of activity?",
        "answer": "Optimisation",
        "options": [
          "Optimisation",
          "Scheduling",
          "Device driving",
          "Loading a guest OS"
        ],
        "explanation": "Constant folding evaluates a constant expression in advance, provided the transformation preserves the language’s behaviour.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-6",
        "prompt": "A source file contains a comment outside any string literal. Which stage can discard that unnecessary comment?",
        "answer": "Lexical analysis",
        "options": [
          "Lexical analysis",
          "The printer driver",
          "The CPU scheduler",
          "The backup loader"
        ],
        "explanation": "The lexer can ignore comments that do not contribute tokens. It must not discard meaningful characters inside a string literal.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-7",
        "prompt": "Which source problem is a clear syntax error?",
        "answer": "A missing required closing bracket",
        "options": [
          "A missing required closing bracket",
          "A wrong valid discount rate",
          "An inefficient valid loop",
          "An outdated user requirement"
        ],
        "explanation": "A missing required bracket violates the grammar. A program can be syntactically valid while containing logical mistakes.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-8",
        "prompt": "Why might a compiler use a symbol table?",
        "answer": "Record information about identifiers",
        "options": [
          "Record information about identifiers",
          "List every printer queue",
          "Store only raw image pixels",
          "Choose the next process to run"
        ],
        "explanation": "A symbol table can record names and associated information such as types, declarations or scope for later analysis and generation.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-9",
        "prompt": "What does a parse or abstract syntax tree represent?",
        "answer": "The program’s structured form",
        "options": [
          "The program’s structured form",
          "The folder names on every disk",
          "The physical CPU wiring",
          "Only a list of running processes"
        ],
        "explanation": "The tree captures syntactic structure and relationships within the program, supporting later analysis and code generation.",
        "skill": "Stages of compilation"
      },
      {
        "id": "12-compilation-10",
        "prompt": "An assignment is proven to have no observable effect and no side effects. Removing it can be an example of what?",
        "answer": "Dead-code optimisation",
        "options": [
          "Dead-code optimisation",
          "Interrupt handling",
          "Page replacement",
          "Device-driver loading"
        ],
        "explanation": "Removing genuinely unnecessary code can improve the output program, but the compiler must preserve required behaviour and side effects.",
        "skill": "Stages of compilation"
      }
    ]
  },
  {
    "id": "12-link-load",
    "section": "1.2",
    "spec": "1.2.2(f)",
    "title": "Linkers, loaders and libraries",
    "lessons": [
      116
    ],
    "page": 71,
    "questions": [
      {
        "id": "12-link-load-1",
        "prompt": "What does a linker primarily do?",
        "answer": "Combine modules and resolve references",
        "options": [
          "Combine modules and resolve references",
          "Schedule CPU time",
          "Check a user’s spelling",
          "Move a print head"
        ],
        "explanation": "The linker combines object modules and required code, resolving references such as calls to routines defined elsewhere.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-2",
        "prompt": "What does a loader primarily do?",
        "answer": "Prepare a program in memory to run",
        "options": [
          "Prepare a program in memory to run",
          "Translate comments into tokens",
          "Design a software licence",
          "Sort every source file"
        ],
        "explanation": "The loader prepares the executable and required runtime mappings in memory and arranges for execution to begin.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-3",
        "prompt": "Why can a code library save development effort?",
        "answer": "It provides reusable routines",
        "options": [
          "It provides reusable routines",
          "It removes every need for testing",
          "It guarantees no dependencies",
          "It requires no interface knowledge"
        ],
        "explanation": "Libraries supply existing functions or components that can be used through defined interfaces, reducing repeated implementation effort.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-4",
        "prompt": "A compiled module calls a function defined in another object module. Which stage resolves that reference in a normal static build?",
        "answer": "Linking",
        "options": [
          "Linking",
          "Page replacement",
          "Disk cleanup",
          "User authentication"
        ],
        "explanation": "The linker matches external references to their definitions and produces the combined result.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-5",
        "prompt": "What is static linking?",
        "answer": "Include required library code in the build",
        "options": [
          "Include required library code in the build",
          "Load every library from a network always",
          "Interpret the source one line at a time",
          "Schedule libraries in time slices"
        ],
        "explanation": "Static linking copies required library code into the resulting program image, subject to the toolchain’s behaviour.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-6",
        "prompt": "What is a potential benefit of dynamic linking?",
        "answer": "Programs can share library code",
        "options": [
          "Programs can share library code",
          "No library must ever be installed",
          "All version issues disappear",
          "Every function becomes a source comment"
        ],
        "explanation": "Shared libraries can avoid duplicating the same library code across programs, though runtime dependencies and compatibility must be managed.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-7",
        "prompt": "An application expects a library function missing from the installed version. What issue is illustrated?",
        "answer": "Dependency/version incompatibility",
        "options": [
          "Dependency/version incompatibility",
          "A larger CPU cache",
          "Successful lexical analysis only",
          "A guaranteed hardware failure"
        ],
        "explanation": "Using libraries requires compatible interfaces and versions. A missing expected routine can prevent correct loading or execution.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-8",
        "prompt": "Does using a tested library remove the need to test its integration into your application?",
        "answer": "No",
        "options": [
          "No",
          "Yes, every call is automatically correct",
          "Only for short programs",
          "Only if the library is closed source"
        ],
        "explanation": "The application can misuse the interface or make wrong assumptions. Tests must check the actual integration and required behaviour.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-9",
        "prompt": "Why consult a library’s interface documentation?",
        "answer": "To use inputs and outputs correctly",
        "options": [
          "To use inputs and outputs correctly",
          "To avoid all licence conditions",
          "To change the CPU’s instruction set",
          "To remove every error check"
        ],
        "explanation": "An interface describes calls, arguments, results and conditions needed for correct use.",
        "skill": "Linkers, loaders and libraries"
      },
      {
        "id": "12-link-load-10",
        "prompt": "Which task belongs to loading rather than compiling source?",
        "answer": "Mapping executable code into memory",
        "options": [
          "Mapping executable code into memory",
          "Recognising keywords as tokens",
          "Checking grammar brackets",
          "Folding a constant source expression"
        ],
        "explanation": "Loading concerns preparing a built program’s memory/execution environment, rather than analysing its original source syntax.",
        "skill": "Linkers, loaders and libraries"
      }
    ]
  },
  {
    "id": "12-waterfall-spiral",
    "section": "1.2",
    "spec": "1.2.3(a,b)",
    "title": "Waterfall and spiral development",
    "lessons": [
      117,
      119
    ],
    "page": 200,
    "questions": [
      {
        "id": "12-waterfall-spiral-1",
        "prompt": "Which is a defining emphasis of a traditional waterfall lifecycle?",
        "answer": "Planned phases with documented outputs",
        "options": [
          "Planned phases with documented outputs",
          "No requirements are gathered",
          "All work happens without a plan",
          "Every task is a time quantum"
        ],
        "explanation": "Waterfall organises development into phases such as analysis, design, implementation and testing, with outputs used by later phases.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-2",
        "prompt": "Which is a defining emphasis of the spiral model?",
        "answer": "Iterative risk analysis",
        "options": [
          "Iterative risk analysis",
          "No user requirements",
          "Only one irreversible coding pass",
          "No evaluation until delivery"
        ],
        "explanation": "Spiral development repeatedly considers objectives, risks, development and evaluation, with risk guiding the next work.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-3",
        "prompt": "Why can waterfall suit a project with stable, clearly understood requirements?",
        "answer": "Up-front planning is more dependable",
        "options": [
          "Up-front planning is more dependable",
          "It never needs testing",
          "It always finishes at zero cost",
          "It cannot produce documentation"
        ],
        "explanation": "Stable requirements make it easier to plan phased work and review documented deliverables, though project risks still remain.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-4",
        "prompt": "A project has uncertain technical risks. Why might spiral development help?",
        "answer": "Investigate major risks iteratively",
        "options": [
          "Investigate major risks iteratively",
          "Guarantee all risks vanish",
          "Avoid every prototype",
          "Ignore evaluation"
        ],
        "explanation": "Risk-driven iterations can investigate uncertain parts, for example through prototypes, before committing to larger development effort.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-5",
        "prompt": "In waterfall, why can a major requirement change discovered late be costly?",
        "answer": "Earlier phase outputs need revision",
        "options": [
          "Earlier phase outputs need revision",
          "The source cannot ever be edited",
          "Testing is legally forbidden",
          "Only hardware can change"
        ],
        "explanation": "Design, implementation and tests based on the old requirement may need substantial rework.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-6",
        "prompt": "What is a useful outcome of an early spiral iteration investigating feasibility?",
        "answer": "Evidence about an important risk",
        "options": [
          "Evidence about an important risk",
          "Proof no future testing is needed",
          "A promise every feature is finished",
          "An automatic OS installation"
        ],
        "explanation": "An iteration can reduce uncertainty about a key technical or project risk, informing later decisions.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-7",
        "prompt": "Does waterfall necessarily forbid returning to an earlier phase?",
        "answer": "No, but rework can be expensive",
        "options": [
          "No, but rework can be expensive",
          "Yes, changes are physically impossible",
          "Only if no code exists",
          "Only in a single-user system"
        ],
        "explanation": "The phased emphasis can make late changes costly, but real waterfall projects can still revisit and revise earlier work.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-8",
        "prompt": "What can be a drawback of the spiral model for a small routine project?",
        "answer": "Risk-management effort may be excessive",
        "options": [
          "Risk-management effort may be excessive",
          "No development can occur",
          "It has no iterations",
          "It cannot use prototypes"
        ],
        "explanation": "Structured risk analysis and management require expertise and effort that may outweigh their benefit on a simple low-risk task.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-9",
        "prompt": "Why can documented phase reviews be useful in waterfall?",
        "answer": "Track agreed requirements and progress",
        "options": [
          "Track agreed requirements and progress",
          "Eliminate every misunderstanding",
          "Replace every software test",
          "Guarantee no future changes"
        ],
        "explanation": "Documentation and reviews provide traceable outputs and checkpoints, while still needing competent validation and testing.",
        "skill": "Waterfall and spiral development"
      },
      {
        "id": "12-waterfall-spiral-10",
        "prompt": "Which is the most justified method choice?",
        "answer": "Match uncertainty and project needs",
        "options": [
          "Match uncertainty and project needs",
          "Always choose one model for everything",
          "Choose only the shortest model name",
          "Ignore user involvement"
        ],
        "explanation": "Requirements stability, risk, team capability and user access all affect suitability. No lifecycle label guarantees success.",
        "skill": "Waterfall and spiral development"
      }
    ]
  },
  {
    "id": "12-agile",
    "section": "1.2",
    "spec": "1.2.3(a,b)",
    "title": "Agile, XP and RAD",
    "lessons": [
      117,
      118
    ],
    "page": 200,
    "questions": [
      {
        "id": "12-agile-1",
        "prompt": "Which feature is central to many Agile approaches?",
        "answer": "Frequent delivery and feedback",
        "options": [
          "Frequent delivery and feedback",
          "No planning of any kind",
          "No user communication",
          "One final test after all changes"
        ],
        "explanation": "Short iterations and feedback support adapting the product as understanding and requirements develop.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-2",
        "prompt": "Which practice is associated with Extreme Programming?",
        "answer": "Pair programming",
        "options": [
          "Pair programming",
          "Never testing before release",
          "Forbidding refactoring",
          "Hiding all changes from teammates"
        ],
        "explanation": "XP includes practices such as pair programming, frequent testing, refactoring and close customer involvement.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-3",
        "prompt": "What is a key emphasis of Rapid Application Development?",
        "answer": "Rapid prototyping with user feedback",
        "options": [
          "Rapid prototyping with user feedback",
          "No prototypes until final delivery",
          "Only compiling faster",
          "Only changing physical hardware"
        ],
        "explanation": "RAD emphasises quickly developing and refining prototypes, often using tools and reusable components with active user involvement.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-4",
        "prompt": "In pair programming, what does the navigator mainly do while the driver types?",
        "answer": "Review and think ahead",
        "options": [
          "Review and think ahead",
          "Avoid looking at the code",
          "Write an unrelated program",
          "Replace every test with a comment"
        ],
        "explanation": "The navigator reviews the work and considers design or next steps, while the driver enters code. Roles can be exchanged.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-5",
        "prompt": "A user changes priorities after trying an early working increment. Which approach is designed to accommodate that feedback?",
        "answer": "Agile iteration",
        "options": [
          "Agile iteration",
          "No further review",
          "Fixed source code without revisions",
          "Only disk defragmentation"
        ],
        "explanation": "Iterative delivery provides opportunities to revise priorities and adapt later work using actual feedback.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-6",
        "prompt": "Does Agile mean that documentation and design are unnecessary?",
        "answer": "No",
        "options": [
          "No",
          "Yes, all written information is banned",
          "Only when the team is small",
          "Only if the application is web-based"
        ],
        "explanation": "Agile favours useful collaboration and working software, but appropriate documentation, design and planning still support effective development.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-7",
        "prompt": "Why use frequent automated tests during XP development?",
        "answer": "Detect regressions after changes",
        "options": [
          "Detect regressions after changes",
          "Prove all requirements are perfect",
          "Avoid ever examining code",
          "Guarantee every test is meaningful"
        ],
        "explanation": "Repeatable tests can expose changes that break expected behaviour. Test quality and coverage still matter.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-8",
        "prompt": "RAD relies on frequent user feedback. Which project condition can make this difficult?",
        "answer": "Users are rarely available",
        "options": [
          "Users are rarely available",
          "Users can review prototypes often",
          "Requirements can be demonstrated",
          "Reusable components are available"
        ],
        "explanation": "Without representative users providing timely feedback, rapid prototype refinement may fail to address actual needs.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-9",
        "prompt": "What is refactoring when it preserves intended behaviour?",
        "answer": "Improving internal code structure",
        "options": [
          "Improving internal code structure",
          "Changing every output randomly",
          "Deleting all useful tests",
          "Translating every file into images"
        ],
        "explanation": "Refactoring improves maintainability or structure while keeping the program’s externally required behaviour intact.",
        "skill": "Agile, XP and RAD"
      },
      {
        "id": "12-agile-10",
        "prompt": "Why might rapidly built prototypes need further engineering before production?",
        "answer": "Prototype shortcuts may need resolving",
        "options": [
          "Prototype shortcuts may need resolving",
          "A prototype can never run",
          "All prototypes already meet every need",
          "Testing is impossible after prototyping"
        ],
        "explanation": "A prototype may omit robustness, maintainability or full integration. Fast feedback does not automatically make it production-ready.",
        "skill": "Agile, XP and RAD"
      }
    ]
  },
  {
    "id": "12-algorithms",
    "section": "1.2",
    "spec": "1.2.3(c)",
    "title": "Writing and following algorithms",
    "lessons": [
      120,
      121
    ],
    "page": 205,
    "questions": [
      {
        "id": "12-algorithms-1",
        "prompt": "What does this algorithm print?",
        "answer": "14",
        "options": [
          "14",
          "3",
          "9",
          "15"
        ],
        "explanation": "The total accumulates 4 + 1 + 9 = 14. Each array element is included once.",
        "skill": "Writing and following algorithms",
        "code": "values = [4, 1, 9]\ntotal = 0\nfor i = 0 to 2\n  total = total + values[i]\nnext i\nprint(total)",
        "language": "OCR pseudocode"
      },
      {
        "id": "12-algorithms-2",
        "prompt": "A maximum-finding function must handle a nonempty list containing only negative numbers. Which initial value is suitable?",
        "answer": "The first list value",
        "options": [
          "The first list value",
          "Always zero",
          "The length of the list",
          "Always one"
        ],
        "explanation": "An actual list element gives a valid initial candidate. Zero can incorrectly exceed every negative value without belonging to the list.",
        "skill": "Writing and following algorithms"
      },
      {
        "id": "12-algorithms-3",
        "prompt": "A function must accept marks from 0 to 100 inclusive. Which input is just outside the upper boundary?",
        "answer": "101",
        "options": [
          "101",
          "100",
          "99",
          "0"
        ],
        "explanation": "101 lies immediately above the permitted upper limit. Boundary tests should distinguish accepted endpoints from adjacent rejected values.",
        "skill": "Writing and following algorithms"
      },
      {
        "id": "12-algorithms-4",
        "prompt": "A loop repeats input until quantity is greater than zero. Which quantity should allow it to stop?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "-1",
          "-5"
        ],
        "explanation": "The condition quantity > 0 is true for 1, but not for zero or negative values.",
        "skill": "Writing and following algorithms"
      },
      {
        "id": "12-algorithms-5",
        "prompt": "What does addFive(3) return to print?",
        "answer": "8",
        "options": [
          "8",
          "3",
          "5",
          "15"
        ],
        "explanation": "The function returns its argument plus 5. Calling it with 3 gives 8.",
        "skill": "Writing and following algorithms",
        "code": "function addFive(n)\n  return n + 5\nendfunction\nprint(addFive(3))",
        "language": "OCR pseudocode"
      },
      {
        "id": "12-algorithms-6",
        "prompt": "A programmer swaps x and y using x=y followed by y=x. What is the defect?",
        "answer": "The original x is overwritten",
        "options": [
          "The original x is overwritten",
          "Both values are preserved",
          "The program cannot contain variables",
          "The values automatically reverse"
        ],
        "explanation": "After x=y, both names contain the old y value. A temporary value or valid simultaneous assignment is needed to preserve the old x.",
        "skill": "Writing and following algorithms"
      },
      {
        "id": "12-algorithms-7",
        "prompt": "What does the counter print?",
        "answer": "2",
        "options": [
          "2",
          "0",
          "1",
          "3"
        ],
        "explanation": "The values 6 and 10 meet the >= 6 condition. The value 2 does not.",
        "skill": "Writing and following algorithms",
        "code": "values = [2, 6, 10]\ncount = 0\nfor i = 0 to 2\n  if values[i] >= 6 then\n    count = count + 1\n  endif\nnext i\nprint(count)",
        "language": "OCR pseudocode"
      },
      {
        "id": "12-algorithms-8",
        "prompt": "Why should a trace table record values after defined execution steps?",
        "answer": "To show how state changes",
        "options": [
          "To show how state changes",
          "To replace the algorithm with guesses",
          "To make every output positive",
          "To avoid following branches"
        ],
        "explanation": "A trace table makes updates and control flow visible, allowing the final result and intermediate states to be checked.",
        "skill": "Writing and following algorithms"
      },
      {
        "id": "12-algorithms-9",
        "prompt": "A sum function should return 0 for an empty list. Which test directly exercises that case?",
        "answer": "Input [] expecting 0",
        "options": [
          "Input [] expecting 0",
          "Input [0] expecting 0",
          "Input [1, -1] expecting 0",
          "Input [2] expecting 2"
        ],
        "explanation": "The empty list tests the path where there are no elements to process, unlike a nonempty list whose values sum to zero.",
        "skill": "Writing and following algorithms"
      },
      {
        "id": "12-algorithms-10",
        "prompt": "A loop changes only total, but its condition depends on i and i never changes. What must be checked?",
        "answer": "Whether the loop can terminate",
        "options": [
          "Whether the loop can terminate",
          "Whether total is a short name",
          "Whether the file is read-only",
          "Whether the monitor is wide"
        ],
        "explanation": "A loop needs progress towards a stopping condition. If the controlling state never changes, the condition may remain true indefinitely.",
        "skill": "Writing and following algorithms"
      }
    ]
  },
  {
    "id": "12-paradigms",
    "section": "1.2",
    "spec": "1.2.4(a)",
    "title": "Programming paradigms",
    "lessons": [
      123
    ],
    "page": 223,
    "questions": [
      {
        "id": "12-paradigms-1",
        "prompt": "What is a programming paradigm?",
        "answer": "An approach to organising computation",
        "options": [
          "An approach to organising computation",
          "A fixed processor clock speed",
          "A type of network cable",
          "Only a source-file extension"
        ],
        "explanation": "A paradigm describes a way of expressing and structuring programs, such as procedural or object-oriented programming.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-2",
        "prompt": "Which description best fits procedural programming?",
        "answer": "Ordered operations grouped in routines",
        "options": [
          "Ordered operations grouped in routines",
          "Only a set of unrelated image files",
          "No control flow or state",
          "Only hardware circuit wiring"
        ],
        "explanation": "Procedural code organises instructions into routines and uses explicit control flow and state changes.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-3",
        "prompt": "Which description best fits object-oriented programming?",
        "answer": "Objects combine state and behaviour",
        "options": [
          "Objects combine state and behaviour",
          "Only a single global variable",
          "Only direct memory addresses",
          "Only unordered source comments"
        ],
        "explanation": "Objects hold state through attributes and expose behaviour through methods, with supporting features such as encapsulation and inheritance.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-4",
        "prompt": "An engineer needs explicit control of a small instruction sequence close to the processor. Which language level is most directly relevant?",
        "answer": "Low-level assembly",
        "options": [
          "Low-level assembly",
          "Only a spreadsheet formula",
          "Only a document-markup style",
          "Only a slide-layout language"
        ],
        "explanation": "Assembly exposes processor instructions and registers closely, though it requires hardware-specific knowledge.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-5",
        "prompt": "Why might a high-level language improve portability?",
        "answer": "It abstracts hardware-specific details",
        "options": [
          "It abstracts hardware-specific details",
          "It removes all runtime requirements",
          "It always uses identical machine code",
          "It makes every program parallel"
        ],
        "explanation": "A suitable implementation can translate or execute high-level constructs on different systems, though dependencies and platform assumptions still matter.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-6",
        "prompt": "Can one language support more than one programming paradigm?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, every language is exclusive",
          "Only if it has no compiler",
          "Only for one-line programs"
        ],
        "explanation": "Languages can provide features for different styles, so the paradigm used also depends on how the program is designed.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-7",
        "prompt": "Which is an imperative description?",
        "answer": "Specify the steps to perform",
        "options": [
          "Specify the steps to perform",
          "State only the desired result",
          "List only required relationships",
          "Describe no operations"
        ],
        "explanation": "Imperative code expresses actions and control flow that change program state.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-8",
        "prompt": "A query states which records are wanted without specifying each search step. Which style does this illustrate?",
        "answer": "Declarative",
        "options": [
          "Declarative",
          "Only assembly",
          "Only imperative",
          "Only interrupt handling"
        ],
        "explanation": "Declarative expressions focus on the required result or relationships, leaving execution strategy to the implementation.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-9",
        "prompt": "Why can assembly be less portable than a suitable high-level program?",
        "answer": "Instructions depend on the target",
        "options": [
          "Instructions depend on the target",
          "It contains no executable operations",
          "It cannot use names or labels",
          "It never accesses memory"
        ],
        "explanation": "Instruction sets and platform conventions vary between target processors and environments.",
        "skill": "Programming paradigms"
      },
      {
        "id": "12-paradigms-10",
        "prompt": "Which is the best basis for selecting a programming approach?",
        "answer": "Task, constraints and maintainability",
        "options": [
          "Task, constraints and maintainability",
          "Always choose the lowest-level syntax",
          "Always use the fewest characters",
          "Only the programmer’s favourite colour"
        ],
        "explanation": "The program’s requirements, performance needs, team skills and maintenance needs should guide the approach.",
        "skill": "Programming paradigms"
      }
    ]
  },
  {
    "id": "12-procedural",
    "section": "1.2",
    "spec": "1.2.4(b)",
    "title": "Procedural language features",
    "lessons": [
      124
    ],
    "page": 223,
    "questions": [
      {
        "id": "12-procedural-1",
        "prompt": "Which construct chooses between alternative paths using a condition?",
        "answer": "Selection",
        "options": [
          "Selection",
          "Sequence only",
          "A constant declaration only",
          "A source comment"
        ],
        "explanation": "Selection uses a Boolean decision to choose which instructions run.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-2",
        "prompt": "Which construct repeats a block of instructions?",
        "answer": "Iteration",
        "options": [
          "Iteration",
          "A literal string",
          "A single assignment only",
          "A file extension"
        ],
        "explanation": "Iteration expresses repetition through a loop controlled by a count or condition.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-3",
        "prompt": "What is the purpose of a named constant?",
        "answer": "Represent a value that should not change",
        "options": [
          "Represent a value that should not change",
          "Provide a variable for any update",
          "Store only program comments",
          "Replace every procedure"
        ],
        "explanation": "A constant gives a meaningful name to a value treated as fixed by the program, improving clarity and maintenance.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-4",
        "prompt": "A subprogram calculates a value that its caller uses in an expression. Which feature supplies that value?",
        "answer": "Return value",
        "options": [
          "Return value",
          "A source-code comment",
          "A file name",
          "A screen colour"
        ],
        "explanation": "A function returns a result to its caller, which can then use it in assignments or other expressions.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-5",
        "prompt": "Why pass an input through a parameter rather than hard-code one fixed input?",
        "answer": "The routine can handle different values",
        "options": [
          "The routine can handle different values",
          "It removes all need for testing",
          "Every argument becomes a constant",
          "The routine can no longer return"
        ],
        "explanation": "Parameters make the required inputs explicit and allow the same routine to serve different calls.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-6",
        "prompt": "What is printed after updating x?",
        "answer": "12",
        "options": [
          "12",
          "2",
          "5",
          "7"
        ],
        "explanation": "Sequence matters: x becomes 5 + 1 = 6, then the next statement outputs 6 × 2 = 12.",
        "skill": "Procedural language features",
        "code": "x = 5\nx = x + 1\nprint(x * 2)",
        "language": "OCR pseudocode"
      },
      {
        "id": "12-procedural-7",
        "prompt": "A string holds HELLO. Which property answers how many characters it contains?",
        "answer": "Length",
        "options": [
          "Length",
          "File extension",
          "Memory-address mode",
          "Processor quantum"
        ],
        "explanation": "String length gives the number of characters in the represented string, here five.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-8",
        "prompt": "A program has opened a text file and finished reading it. Which action appropriately releases its file resource?",
        "answer": "Close the file",
        "options": [
          "Close the file",
          "Change the CPU instruction set",
          "Delete all previously read values",
          "Rename the operating system"
        ],
        "explanation": "Closing a file releases the associated resource and completes any required file-handle cleanup.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-9",
        "prompt": "A discount requires both membership and a sufficient basket total. Which Boolean operator joins those requirements?",
        "answer": "AND",
        "options": [
          "AND",
          "OR",
          "NOT alone",
          "DIV"
        ],
        "explanation": "AND is true only when both stated requirements hold.",
        "skill": "Procedural language features"
      },
      {
        "id": "12-procedural-10",
        "prompt": "What is the benefit of extracting a repeated calculation into a focused routine?",
        "answer": "Reuse one implementation",
        "options": [
          "Reuse one implementation",
          "Guarantee every caller is correct",
          "Remove all input validation",
          "Make all program data global"
        ],
        "explanation": "A reusable routine reduces duplication and gives one place to maintain the calculation, while calls and inputs still need validation.",
        "skill": "Procedural language features"
      }
    ]
  },
  {
    "id": "12-lmc",
    "section": "1.2",
    "spec": "1.2.4(c)",
    "title": "Assembly language and Little Man Computer",
    "lessons": [
      96,
      97,
      125
    ],
    "page": 230,
    "questions": [
      {
        "id": "12-lmc-1",
        "prompt": "In LMC, what does INP do?",
        "answer": "Read input into the accumulator",
        "options": [
          "Read input into the accumulator",
          "Print the accumulator",
          "Store the accumulator in every mailbox",
          "Stop the program"
        ],
        "explanation": "INP accepts a value into the accumulator. OUT performs output, and HLT stops execution.",
        "skill": "Assembly language and Little Man Computer"
      },
      {
        "id": "12-lmc-2",
        "prompt": "In LMC, what does STA VALUE do?",
        "answer": "Copy ACC to mailbox VALUE",
        "options": [
          "Copy ACC to mailbox VALUE",
          "Load VALUE into ACC",
          "Always clear ACC",
          "Branch to VALUE"
        ],
        "explanation": "STA stores the accumulator’s contents in the specified mailbox; it does not normally clear the accumulator.",
        "skill": "Assembly language and Little Man Computer"
      },
      {
        "id": "12-lmc-3",
        "prompt": "In LMC, what does LDA VALUE do?",
        "answer": "Load mailbox VALUE into ACC",
        "options": [
          "Load mailbox VALUE into ACC",
          "Store ACC in VALUE",
          "Print the mailbox address",
          "Change every mailbox to zero"
        ],
        "explanation": "LDA reads the contents at the operand address into the accumulator.",
        "skill": "Assembly language and Little Man Computer"
      },
      {
        "id": "12-lmc-4",
        "prompt": "Inputs are 3 then 8. With no overflow, what is output?",
        "answer": "11",
        "options": [
          "11",
          "3",
          "8",
          "24"
        ],
        "explanation": "The first input is saved in FIRST. The second input becomes ACC, then ADD FIRST adds 3 to 8.",
        "skill": "Assembly language and Little Man Computer",
        "code": "INP\nSTA FIRST\nINP\nADD FIRST\nOUT\nHLT\nFIRST DAT 0",
        "language": "LMC assembly"
      },
      {
        "id": "12-lmc-5",
        "prompt": "When does BRZ TARGET branch in the standard LMC model?",
        "answer": "When ACC is zero",
        "options": [
          "When ACC is zero",
          "Whenever ACC is positive",
          "Whenever any mailbox is empty",
          "Only after HLT"
        ],
        "explanation": "BRZ tests for a zero accumulator result and, if true, changes the next instruction address to TARGET.",
        "skill": "Assembly language and Little Man Computer"
      },
      {
        "id": "12-lmc-6",
        "prompt": "In the standard LMC model, does BRP include a zero result as well as a positive result?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, strictly positive only",
          "Only if the target is zero",
          "Only after INP"
        ],
        "explanation": "BRP branches for a non-negative result, including zero, according to the LMC branch/negative-flag convention.",
        "skill": "Assembly language and Little Man Computer"
      },
      {
        "id": "12-lmc-7",
        "prompt": "What does BRA TARGET do?",
        "answer": "Branch unconditionally",
        "options": [
          "Branch unconditionally",
          "Branch only when ACC is zero",
          "Add TARGET to ACC",
          "Stop without a target"
        ],
        "explanation": "BRA changes the program’s next instruction address without a data-value condition.",
        "skill": "Assembly language and Little Man Computer"
      },
      {
        "id": "12-lmc-8",
        "prompt": "Assume BRP branches on a non-negative subtraction result and there is no overflow. What sequence is output?",
        "answer": "2, 1, 0",
        "options": [
          "2, 1, 0",
          "2, 1",
          "0, 1, 2",
          "2, 1, 0, -1"
        ],
        "explanation": "Each loop outputs the current non-negative value, then subtracts one. After outputting zero, subtraction is negative so BRP is not taken.",
        "skill": "Assembly language and Little Man Computer",
        "code": "LDA START\nLOOP OUT\nSUB ONE\nBRP LOOP\nHLT\nSTART DAT 2\nONE DAT 1",
        "language": "LMC assembly"
      },
      {
        "id": "12-lmc-9",
        "prompt": "ACC is 15 and mailbox 20 contains 6. What is ACC after SUB 20, without overflow?",
        "answer": "9",
        "options": [
          "9",
          "6",
          "20",
          "-5"
        ],
        "explanation": "SUB uses the value in mailbox 20: 15 − 6 = 9. It does not subtract the address 20.",
        "skill": "Assembly language and Little Man Computer"
      },
      {
        "id": "12-lmc-10",
        "prompt": "What is the role of VALUE DAT 7 in an LMC assembly source file?",
        "answer": "Reserve/initialise a data mailbox",
        "options": [
          "Reserve/initialise a data mailbox",
          "Output 7 immediately",
          "Branch seven instructions forward",
          "Add 7 to every register"
        ],
        "explanation": "DAT declares storage with an initial value. The label lets instructions refer to that mailbox.",
        "skill": "Assembly language and Little Man Computer"
      }
    ]
  },
  {
    "id": "12-addressing",
    "section": "1.2",
    "spec": "1.2.4(d)",
    "title": "Immediate, direct, indirect and indexed",
    "lessons": [
      126
    ],
    "page": 229,
    "questions": [
      {
        "id": "12-addressing-1",
        "prompt": "In this generic assembly notation, #30 means immediate addressing. What operand value is used?",
        "answer": "30",
        "options": [
          "30",
          "Memory[30]",
          "Memory[Memory[30]]",
          "The current index value"
        ],
        "explanation": "Immediate addressing supplies the literal value encoded in the instruction. This generic notation is not an added LMC instruction.",
        "skill": "Immediate, direct, indirect and indexed"
      },
      {
        "id": "12-addressing-2",
        "prompt": "Direct addressing uses operand address 30. Which value is read from the stated memory?",
        "answer": "8",
        "options": [
          "8",
          "30",
          "5",
          "32"
        ],
        "explanation": "Direct addressing reads Memory[30], which contains 8.",
        "skill": "Immediate, direct, indirect and indexed",
        "table": {
          "caption": "Generic assembly model · byte addresses; index X = 2",
          "headers": [
            "Location",
            "Value"
          ],
          "rows": [
            [
              "Memory[30]",
              "8"
            ],
            [
              "Memory[31]",
              "30"
            ],
            [
              "Memory[32]",
              "5"
            ]
          ]
        }
      },
      {
        "id": "12-addressing-3",
        "prompt": "Indirect addressing follows the pointer stored at address 31, then reads the pointed-to memory value. What is obtained?",
        "answer": "8",
        "options": [
          "8",
          "30",
          "31",
          "5"
        ],
        "explanation": "Memory[31] is 30, so the operand is Memory[30], which is 8.",
        "skill": "Immediate, direct, indirect and indexed",
        "table": {
          "caption": "Generic assembly model · byte addresses; index X = 2",
          "headers": [
            "Location",
            "Value"
          ],
          "rows": [
            [
              "Memory[30]",
              "8"
            ],
            [
              "Memory[31]",
              "30"
            ],
            [
              "Memory[32]",
              "5"
            ]
          ]
        }
      },
      {
        "id": "12-addressing-4",
        "prompt": "Indexed addressing uses effective address = base + X. With base 30 and X=2, which operand value is read?",
        "answer": "5",
        "options": [
          "5",
          "8",
          "30",
          "32"
        ],
        "explanation": "The effective address is 30 + 2 = 32. Memory[32] holds 5.",
        "skill": "Immediate, direct, indirect and indexed",
        "table": {
          "caption": "Generic assembly model · byte addresses; index X = 2",
          "headers": [
            "Location",
            "Value"
          ],
          "rows": [
            [
              "Memory[30]",
              "8"
            ],
            [
              "Memory[31]",
              "30"
            ],
            [
              "Memory[32]",
              "5"
            ]
          ]
        }
      },
      {
        "id": "12-addressing-5",
        "prompt": "Excluding instruction fetch and caches, how many operand-memory reads does this simple indirect addressing need?",
        "answer": "2",
        "options": [
          "2",
          "0",
          "1",
          "3"
        ],
        "explanation": "One read obtains the pointer from the stated address, and a second read obtains the operand at the pointed-to address.",
        "skill": "Immediate, direct, indirect and indexed"
      },
      {
        "id": "12-addressing-6",
        "prompt": "Memory[30] changes from 8 to 9. Which comparison is correct?",
        "answer": "Direct 30 changes; immediate #30 does not",
        "options": [
          "Direct 30 changes; immediate #30 does not",
          "Both values must become 9",
          "Both values must remain 30",
          "Immediate #30 now reads 9"
        ],
        "explanation": "Direct addressing uses the memory contents, while immediate addressing uses the literal encoded value 30.",
        "skill": "Immediate, direct, indirect and indexed"
      },
      {
        "id": "12-addressing-7",
        "prompt": "Indexed addressing uses base 30 and X=0. What is the effective address?",
        "answer": "30",
        "options": [
          "30",
          "0",
          "8",
          "32"
        ],
        "explanation": "The effective address is base + index: 30 + 0 = 30.",
        "skill": "Immediate, direct, indirect and indexed"
      },
      {
        "id": "12-addressing-8",
        "prompt": "Memory[31] is changed to 32, and Memory[32] remains 5. Indirect addressing through 31 now obtains what?",
        "answer": "5",
        "options": [
          "5",
          "8",
          "30",
          "31"
        ],
        "explanation": "The updated pointer identifies address 32, so the operand is the value stored there, 5.",
        "skill": "Immediate, direct, indirect and indexed"
      },
      {
        "id": "12-addressing-9",
        "prompt": "Why can indexed addressing help process an array?",
        "answer": "Vary an offset from a base",
        "options": [
          "Vary an offset from a base",
          "Remove every memory access",
          "Guarantee all values are sorted",
          "Turn every element into an opcode"
        ],
        "explanation": "Changing the index selects successive elements relative to an array’s base address, using the appropriate element-size scaling for the model.",
        "skill": "Immediate, direct, indirect and indexed"
      },
      {
        "id": "12-addressing-10",
        "prompt": "Which addressing mode embeds the actual operand value rather than an address to its stored value?",
        "answer": "Immediate",
        "options": [
          "Immediate",
          "Direct",
          "Indirect",
          "Indexed"
        ],
        "explanation": "An immediate operand is supplied within the instruction. The other listed modes determine a memory address from which to obtain a value.",
        "skill": "Immediate, direct, indirect and indexed"
      }
    ]
  },
  {
    "id": "12-oop",
    "section": "1.2",
    "spec": "1.2.4(e)",
    "title": "Object-oriented language features",
    "lessons": [
      44,
      45,
      225
    ],
    "page": 218,
    "questions": [
      {
        "id": "12-oop-1",
        "prompt": "A program defines a Ticket class, then creates several tickets. What is each created ticket?",
        "answer": "An object instance",
        "options": [
          "An object instance",
          "The whole class definition",
          "A compiler token only",
          "A CPU instruction address"
        ],
        "explanation": "A class describes a type’s state and behaviour; an object is a particular instance with its own relevant state.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-2",
        "prompt": "A Ticket object stores price and provides refund(). Which is a method?",
        "answer": "refund()",
        "options": [
          "refund()",
          "price",
          "The class name alone",
          "The stored numeric value"
        ],
        "explanation": "Methods define behaviour associated with an object. An attribute such as price stores state.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-3",
        "prompt": "Why make an account balance private and expose a checked deposit method?",
        "answer": "Control access to valid state changes",
        "options": [
          "Control access to valid state changes",
          "Make the balance global",
          "Stop all methods from using it",
          "Guarantee no program bugs"
        ],
        "explanation": "Encapsulation controls how outside code accesses state and can enforce checks in public methods.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-4",
        "prompt": "A SavingsAccount class extends Account. Which relationship is this?",
        "answer": "Inheritance",
        "options": [
          "Inheritance",
          "Only iteration",
          "Only file compression",
          "Immediate addressing"
        ],
        "explanation": "A subclass can inherit accessible structure and behaviour from a superclass and add or specialise features.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-5",
        "prompt": "A base-class reference points to a subclass object that overrides a virtual method. Which implementation is chosen by dynamic dispatch?",
        "answer": "The runtime object’s override",
        "options": [
          "The runtime object’s override",
          "Always the base method",
          "Both implementations automatically",
          "Only the method with the shortest name"
        ],
        "explanation": "Polymorphic dispatch chooses the overridden implementation associated with the runtime object type, under the language’s virtual-method rules.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-6",
        "prompt": "What is a constructor normally used for?",
        "answer": "Initialising a new object",
        "options": [
          "Initialising a new object",
          "Sorting every class name",
          "Destroying all previous objects",
          "Converting objects into source files"
        ],
        "explanation": "A constructor establishes initial state during object creation, often using supplied parameters.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-7",
        "prompt": "Two distinct objects have separate ordinary instance attributes. Changing one object’s price means what for the other object’s price?",
        "answer": "It need not change",
        "options": [
          "It need not change",
          "It must always match",
          "It must become zero",
          "It becomes a class name"
        ],
        "explanation": "Instance attributes belong to their respective objects. Updating one distinct object does not automatically update another.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-8",
        "prompt": "Two references identify the same mutable object. One reference calls a method that updates its state. What can the other observe?",
        "answer": "The same updated object state",
        "options": [
          "The same updated object state",
          "A guaranteed independent copy",
          "Only its old state forever",
          "A new class definition"
        ],
        "explanation": "Copying a reference does not clone the object. Both references can still identify the same underlying instance.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-9",
        "prompt": "A getter returns a private attribute through a public method. What is its purpose?",
        "answer": "Provide controlled read access",
        "options": [
          "Provide controlled read access",
          "Make every attribute publicly writable",
          "Delete the original attribute",
          "Prevent the class using its own data"
        ],
        "explanation": "A getter can expose a selected value while keeping direct access to the underlying representation restricted.",
        "skill": "Object-oriented language features"
      },
      {
        "id": "12-oop-10",
        "prompt": "Several subclasses share genuinely common validation behaviour. Where can inheritance place that shared behaviour?",
        "answer": "In a suitable superclass",
        "options": [
          "In a suitable superclass",
          "Only in unrelated duplicate routines",
          "Only in a global text file",
          "Only in the CPU scheduler"
        ],
        "explanation": "A suitable superclass can hold common behaviour, reducing duplication while allowing subclasses to specialise where needed.",
        "skill": "Object-oriented language features"
      }
    ]
  }
];
