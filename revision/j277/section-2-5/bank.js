'use strict';
// OCR J277 2.5 Languages, translators and integrated development environments.
const J277_SECTION={"code":"2.5","title":"Programming Languages and IDEs"};
const SKILLS=[
  {
    "id": "25-languages",
    "section": "2.5",
    "spec": "2.5.1",
    "title": "High-level, low-level and translators",
    "questions": [
      {
        "id": "25-languages-1",
        "prompt": "What is a high-level programming language?",
        "answer": "A language closer to human-readable concepts",
        "options": [
          "A language closer to human-readable concepts",
          "Only processor machine instructions",
          "A network protocol",
          "An image format"
        ],
        "explanation": "High-level languages abstract many hardware details.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-2",
        "prompt": "What is machine code?",
        "answer": "Binary instructions executed directly by a CPU",
        "options": [
          "Binary instructions executed directly by a CPU",
          "An English algorithm description",
          "A spreadsheet formula only",
          "A file name"
        ],
        "explanation": "Processors execute their own machine instructions.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-3",
        "prompt": "What is assembly language?",
        "answer": "Low-level code using mnemonics for processor instructions",
        "options": [
          "Low-level code using mnemonics for processor instructions",
          "A database query language only",
          "A photo format",
          "A general network standard"
        ],
        "explanation": "Assembly uses symbols closely tied to machine instructions.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-4",
        "prompt": "What does a compiler usually do?",
        "answer": "Translate an entire source program into executable code before running it",
        "options": [
          "Translate an entire source program into executable code before running it",
          "Execute only one line and discard it",
          "Create an image from binary",
          "Change screen size"
        ],
        "explanation": "A compiler produces a translated program for later execution.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-5",
        "prompt": "What does an interpreter usually do?",
        "answer": "Translate or execute source instructions as the program runs",
        "options": [
          "Translate or execute source instructions as the program runs",
          "Always create a separate permanent executable",
          "Replace the CPU",
          "Generate a file system"
        ],
        "explanation": "Interpreters process code during execution.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-6",
        "prompt": "What is a potential benefit of high-level languages?",
        "answer": "Code is generally easier to write and maintain",
        "options": [
          "Code is generally easier to write and maintain",
          "They never need translation",
          "They are executed directly by every CPU",
          "They cannot have logic errors"
        ],
        "explanation": "Higher-level abstractions can improve programmer productivity.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-7",
        "prompt": "Why is machine code processor dependent?",
        "answer": "Different CPUs may have different instruction sets",
        "options": [
          "Different CPUs may have different instruction sets",
          "Every CPU uses identical instructions",
          "It is written using English words only",
          "It can never contain jumps"
        ],
        "explanation": "Instructions are encoded for the target architecture.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-8",
        "prompt": "What is an assembler?",
        "answer": "Software translating assembly language into machine code",
        "options": [
          "Software translating assembly language into machine code",
          "A device that prints paper",
          "A network switch",
          "An operating system file format"
        ],
        "explanation": "Assemblers convert mnemonics into machine instructions.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-9",
        "prompt": "Which translator often produces a separate executable file?",
        "answer": "Compiler",
        "options": [
          "Compiler",
          "Interpreter only",
          "NIC",
          "File browser"
        ],
        "explanation": "Compiled programs can run from translated machine code.",
        "skill": "High-level, low-level and translators"
      },
      {
        "id": "25-languages-10",
        "prompt": "What is a common advantage of an interpreter for testing?",
        "answer": "It can support immediate execution and feedback",
        "options": [
          "It can support immediate execution and feedback",
          "It guarantees no errors",
          "It removes all hardware requirements",
          "It never uses memory"
        ],
        "explanation": "Interpreted execution can make iterative debugging convenient.",
        "skill": "High-level, low-level and translators"
      }
    ]
  },
  {
    "id": "25-ide",
    "section": "2.5",
    "spec": "2.5.2",
    "title": "Integrated development environments",
    "questions": [
      {
        "id": "25-ide-1",
        "prompt": "What does IDE stand for?",
        "answer": "Integrated Development Environment",
        "options": [
          "Integrated Development Environment",
          "Internal Data Encoder",
          "Internet Device Exchange",
          "Instruction Disk Editor"
        ],
        "explanation": "An IDE brings software development tools together.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-2",
        "prompt": "What does a code editor provide?",
        "answer": "A place to enter and modify source code",
        "options": [
          "A place to enter and modify source code",
          "A network router",
          "Extra physical RAM",
          "A fibre-optic connection"
        ],
        "explanation": "The editor is where programmers write code.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-3",
        "prompt": "What is syntax highlighting?",
        "answer": "Colouring code elements to help readability",
        "options": [
          "Colouring code elements to help readability",
          "Encrypting the program automatically",
          "Adding comments to every line",
          "Compiling hardware instructions"
        ],
        "explanation": "Highlighting can distinguish keywords strings and other tokens.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-4",
        "prompt": "What can auto-completion do?",
        "answer": "Suggest and complete code while typing",
        "options": [
          "Suggest and complete code while typing",
          "Always remove every bug",
          "Delete unused files",
          "Automatically buy software licences"
        ],
        "explanation": "Suggestions can speed up entry and reduce typing errors.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-5",
        "prompt": "What can an IDE debugger do?",
        "answer": "Help inspect execution and variable values",
        "options": [
          "Help inspect execution and variable values",
          "Replace the entire OS",
          "Change a monitor's resolution",
          "Provide network encryption only"
        ],
        "explanation": "Debuggers support breakpoints and stepping.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-6",
        "prompt": "What does a breakpoint do?",
        "answer": "Pause execution at a chosen place",
        "options": [
          "Pause execution at a chosen place",
          "Permanently delete the program",
          "Insert a new RAM module",
          "Increase the CPU clock rate"
        ],
        "explanation": "Pausing helps inspect state around a fault.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-7",
        "prompt": "What can an error diagnostic in an IDE help identify?",
        "answer": "Syntax errors and other detected problems",
        "options": [
          "Syntax errors and other detected problems",
          "Every possible logical mistake automatically",
          "A defective monitor",
          "All legal compliance issues"
        ],
        "explanation": "Diagnostic messages can point to invalid code.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-8",
        "prompt": "What is a run-time environment in an IDE?",
        "answer": "The facility used to execute and observe a program",
        "options": [
          "The facility used to execute and observe a program",
          "A source-code colour theme only",
          "A screen brightness control",
          "A remote network topology"
        ],
        "explanation": "It lets developers run and test a program.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-9",
        "prompt": "Why is indentation support useful?",
        "answer": "It makes nested code structure easier to read",
        "options": [
          "It makes nested code structure easier to read",
          "It always makes programs faster",
          "It increases storage capacity",
          "It removes loops"
        ],
        "explanation": "Consistent indentation improves understanding and error checking.",
        "skill": "Integrated development environments"
      },
      {
        "id": "25-ide-10",
        "prompt": "What is an advantage of keeping editor debugger and runner together?",
        "answer": "A more efficient write-test-debug cycle",
        "options": [
          "A more efficient write-test-debug cycle",
          "No testing is ever needed",
          "Programs cannot have syntax errors",
          "Hardware never needs an operating system"
        ],
        "explanation": "Integrated tools let programmers switch quickly between development tasks.",
        "skill": "Integrated development environments"
      }
    ]
  }
];
