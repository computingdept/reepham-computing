'use strict';
// Original J277 MCQs aligned to AP1 Paper 2 guide, OCR J277 2.1.1–2.1.3.
const J277_SECTION={"code":"2.1","title":"Algorithms","guidePublished":false,"guideFile":"J277_Paper_2_Revision_Guide_AP1_Aligned.pdf","lessons":{"12":"Abstraction and decomposition","13":"Flowcharts and pseudocode","14":"Linear search","15":"Bubble sort and insertion sort","59":"Tracing constructs","82":"Linear search","83":"Binary search","84":"Bubble sort","85":"Insertion sort","86":"Merge sort","105":"Computational thinking","106":"Algorithm design","107":"Trace tables"}};
const SKILLS=[
  {
    "id": "21-thinking",
    "section": "2.1",
    "spec": "2.1.1",
    "title": "Computational thinking",
    "lessons": [
      12,
      105
    ],
    "page": 4,
    "questions": [
      {
        "id": "21-thinking-1",
        "prompt": "A programmer splits a library app into search, borrowing and user accounts. Which technique is this?",
        "answer": "Decomposition",
        "options": [
          "Decomposition",
          "Abstraction",
          "Compilation",
          "Encryption"
        ],
        "explanation": "Decomposition means breaking a large problem into smaller, manageable parts.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-2",
        "prompt": "When designing a bus timetable app, a programmer ignores the colour of passengers' coats. Which technique?",
        "answer": "Abstraction",
        "options": [
          "Abstraction",
          "Decomposition",
          "Sorting",
          "Validation"
        ],
        "explanation": "Abstraction removes irrelevant detail and retains information needed to solve the problem.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-3",
        "prompt": "Which is the best definition of an algorithm?",
        "answer": "A precise sequence of steps to solve a problem",
        "options": [
          "A precise sequence of steps to solve a problem",
          "A piece of physical computer hardware",
          "A computer network protocol",
          "A permanently stored file"
        ],
        "explanation": "An algorithm is a set of ordered instructions for solving a problem; it need not be written in a programming language.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-4",
        "prompt": "Which question best supports abstraction?",
        "answer": "Which details affect the required result?",
        "options": [
          "Which details affect the required result?",
          "How many different fonts could we use?",
          "Can every input be stored forever?",
          "Which wallpaper looks best?"
        ],
        "explanation": "Abstraction keeps relevant requirements and ignores details that do not matter.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-5",
        "prompt": "Breaking a school lunch ordering system into menus, payments and collection times is an example of what?",
        "answer": "Decomposition",
        "options": [
          "Decomposition",
          "Iteration",
          "Compression",
          "Authentication"
        ],
        "explanation": "Decomposition separates a complex problem into smaller tasks that can be developed and tested.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-6",
        "prompt": "A login algorithm says: input details; check credentials; grant or deny access. What skill is illustrated?",
        "answer": "Algorithmic thinking",
        "options": [
          "Algorithmic thinking",
          "Image compression",
          "Physical network topology",
          "Data encryption"
        ],
        "explanation": "Algorithmic thinking organises a solution as ordered steps and decisions.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-7",
        "prompt": "What is a benefit of decomposition for testing?",
        "answer": "Smaller components can be tested separately",
        "options": [
          "Smaller components can be tested separately",
          "It guarantees all code is error-free",
          "It removes the need to plan",
          "It always makes algorithms shorter"
        ],
        "explanation": "Breaking a system into parts makes individual features easier to examine and debug.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-8",
        "prompt": "Which of these should be kept when abstracting a library overdue-fine calculator?",
        "answer": "Days overdue and the fine rate",
        "options": [
          "Days overdue and the fine rate",
          "The colour of the library carpet",
          "The librarian's favourite song",
          "The brand of the desk"
        ],
        "explanation": "The calculation requires inputs related to the fine, not unrelated surroundings.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-9",
        "prompt": "What does computational thinking primarily support?",
        "answer": "Structured problem solving that can be implemented computationally",
        "options": [
          "Structured problem solving that can be implemented computationally",
          "Only writing code as quickly as possible",
          "Choosing office furniture",
          "Only installing antivirus software"
        ],
        "explanation": "It involves techniques such as decomposition, abstraction and algorithmic thinking.",
        "skill": "Computational thinking"
      },
      {
        "id": "21-thinking-10",
        "prompt": "Why should an algorithm's instructions be unambiguous?",
        "answer": "Different readers should follow them consistently",
        "options": [
          "Different readers should follow them consistently",
          "It makes every program use less RAM automatically",
          "It eliminates the need for inputs",
          "It forces the use of a particular language"
        ],
        "explanation": "Precise instructions reduce different interpretations and unexpected outcomes.",
        "skill": "Computational thinking"
      }
    ]
  },
  {
    "id": "21-design",
    "section": "2.1",
    "spec": "2.1.2",
    "title": "Designing and tracing algorithms",
    "lessons": [
      13,
      59,
      106,
      107
    ],
    "page": 9,
    "questions": [
      {
        "id": "21-design-1",
        "prompt": "In a flowchart, what shape normally represents a decision?",
        "answer": "Diamond",
        "options": [
          "Diamond",
          "Rectangle",
          "Oval",
          "Parallelogram"
        ],
        "explanation": "The diamond represents a condition and normally branches into choices such as Yes and No.",
        "skill": "Designing and tracing algorithms"
      },
      {
        "id": "21-design-2",
        "prompt": "In a flowchart, what shape normally represents a processing step?",
        "answer": "Rectangle",
        "options": [
          "Rectangle",
          "Diamond",
          "Parallelogram",
          "Arrowhead"
        ],
        "explanation": "A rectangle represents a process such as a calculation or assignment.",
        "skill": "Designing and tracing algorithms"
      },
      {
        "id": "21-design-3",
        "prompt": "Which representation is designed to be independent of a specific programming language?",
        "answer": "Pseudocode",
        "options": [
          "Pseudocode",
          "A compiled executable",
          "Machine code",
          "A processor instruction register"
        ],
        "explanation": "Pseudocode describes program logic without relying on one programming language's exact syntax.",
        "skill": "Designing and tracing algorithms"
      },
      {
        "id": "21-design-4",
        "prompt": "What is the main purpose of a trace table?",
        "answer": "Record how variables change during execution",
        "options": [
          "Record how variables change during execution",
          "Store final files on a hard disk",
          "Choose network passwords",
          "Increase CPU clock speed"
        ],
        "explanation": "A trace table follows program steps and tracks values and outputs to find logic errors.",
        "skill": "Designing and tracing algorithms"
      },
      {
        "id": "21-design-5",
        "prompt": "What is a dry run of an algorithm?",
        "answer": "Following its steps manually with test data",
        "options": [
          "Following its steps manually with test data",
          "Restarting the computer",
          "Executing only compiled machine code",
          "Deleting unused data files"
        ],
        "explanation": "A dry run tests the logic by stepping through the algorithm without running it as a program.",
        "skill": "Designing and tracing algorithms"
      },
      {
        "id": "21-design-6",
        "prompt": "What is the output of this OCR ERL program?",
        "answer": "9",
        "options": [
          "9",
          "6",
          "12",
          "3"
        ],
        "explanation": "The variable begins at 6 and is increased by 3, so the printed value is 9.",
        "skill": "Designing and tracing algorithms",
        "code": "total = 6\ntotal = total + 3\nprint(total)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "21-design-7",
        "prompt": "Which programming construct repeats a set of instructions?",
        "answer": "Iteration",
        "options": [
          "Iteration",
          "Selection",
          "Sequence only",
          "Concatenation"
        ],
        "explanation": "Iteration uses loops to carry out instructions multiple times.",
        "skill": "Designing and tracing algorithms"
      },
      {
        "id": "21-design-8",
        "prompt": "Which construct chooses between outcomes based on a condition?",
        "answer": "Selection",
        "options": [
          "Selection",
          "Iteration",
          "Sequence only",
          "Compression"
        ],
        "explanation": "Selection is typically implemented with IF and ELSE decisions.",
        "skill": "Designing and tracing algorithms"
      },
      {
        "id": "21-design-9",
        "prompt": "What is the output of this algorithm?",
        "answer": "Pass",
        "options": [
          "Pass",
          "Fail",
          "10",
          "No output"
        ],
        "explanation": "The condition 10 >= 10 is true so the first branch prints Pass.",
        "skill": "Designing and tracing algorithms",
        "code": "score = 10\nif score >= 10 then\n    print(\"Pass\")\nelse\n    print(\"Fail\")\nendif",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "21-design-10",
        "prompt": "Why can a trace table help correct an algorithm?",
        "answer": "It shows the step where values first become incorrect",
        "options": [
          "It shows the step where values first become incorrect",
          "It automatically writes all missing code",
          "It prevents every syntax error without testing",
          "It increases processor performance"
        ],
        "explanation": "Following changes step by step reveals where the algorithm's behaviour differs from expectations.",
        "skill": "Designing and tracing algorithms"
      }
    ]
  },
  {
    "id": "21-searchsort",
    "section": "2.1",
    "spec": "2.1.3",
    "title": "Searching and sorting algorithms",
    "lessons": [
      14,
      15,
      82,
      83,
      84,
      85,
      86
    ],
    "page": 14,
    "questions": [
      {
        "id": "21-searchsort-1",
        "prompt": "Which algorithm can search a list without it being sorted?",
        "answer": "Linear search",
        "options": [
          "Linear search",
          "Binary search only",
          "Merge sort",
          "Insertion sort"
        ],
        "explanation": "Linear search checks items in turn and does not require an ordered list.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-2",
        "prompt": "What must be true before a standard binary search is used?",
        "answer": "The list must already be sorted",
        "options": [
          "The list must already be sorted",
          "Every value must be unique",
          "The list must contain exactly eight values",
          "The list must be stored on an SSD"
        ],
        "explanation": "Binary search compares a target with a middle item and relies on the data being ordered.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-3",
        "prompt": "A sorted list has values 2, 5, 8, 11, 15. Which value is checked first in a typical binary search?",
        "answer": "8",
        "options": [
          "8",
          "2",
          "15",
          "5"
        ],
        "explanation": "The middle index of five values is 2 (zero-based), which holds 8.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-4",
        "prompt": "Which search examines one item at a time until it finds a match or reaches the end?",
        "answer": "Linear search",
        "options": [
          "Linear search",
          "Binary search",
          "Bubble sort",
          "Merge sort"
        ],
        "explanation": "Linear search scans consecutive elements without repeatedly halving the range.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-5",
        "prompt": "Which sorting method repeatedly compares and swaps adjacent out-of-order items?",
        "answer": "Bubble sort",
        "options": [
          "Bubble sort",
          "Binary search",
          "Linear search",
          "Merge sort"
        ],
        "explanation": "Bubble sort moves larger items towards the end over successive passes.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-6",
        "prompt": "What happens during insertion sort?",
        "answer": "Each new value is placed in its correct position within a sorted section",
        "options": [
          "Each new value is placed in its correct position within a sorted section",
          "The list is always split recursively in half",
          "The middle element is always searched first",
          "Each value is encrypted"
        ],
        "explanation": "Insertion sort grows a sorted prefix by inserting the next element appropriately.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-7",
        "prompt": "Which method divides data into smaller lists and merges sorted results?",
        "answer": "Merge sort",
        "options": [
          "Merge sort",
          "Bubble sort",
          "Linear search",
          "Binary search"
        ],
        "explanation": "Merge sort splits the list and combines sorted sublists.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-8",
        "prompt": "After one left-to-right bubble-sort pass on 4, 1, 3, 2, what is the order?",
        "answer": "1, 3, 2, 4",
        "options": [
          "1, 3, 2, 4",
          "1, 2, 3, 4",
          "4, 3, 2, 1",
          "1, 4, 3, 2"
        ],
        "explanation": "Swaps are 4/1, 4/3 and 4/2, leaving the largest value at the end.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-9",
        "prompt": "Binary search checks a middle item that is smaller than the target. Where does it search next?",
        "answer": "The higher-valued half",
        "options": [
          "The higher-valued half",
          "The lower-valued half",
          "Always the whole list again",
          "It stops even if the target may exist"
        ],
        "explanation": "In an ascending list, values below or equal to the middle value can be eliminated.",
        "skill": "Searching and sorting algorithms"
      },
      {
        "id": "21-searchsort-10",
        "prompt": "Which statement about bubble sort is accurate?",
        "answer": "Several passes may be needed to sort the whole list",
        "options": [
          "Several passes may be needed to sort the whole list",
          "One comparison always sorts a list",
          "Bubble sort requires an already sorted list",
          "It is the same process as a binary search"
        ],
        "explanation": "Each pass may move values closer to their correct positions; an unsorted list may require multiple passes.",
        "skill": "Searching and sorting algorithms"
      }
    ]
  }
];
