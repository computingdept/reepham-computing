'use strict';
// OCR J277 MCQs. Stable skill IDs link via guides/skill-index.json; no page numbers in question banks.
const J277_SECTION={"code":"2.1","title":"Algorithms"};
const SKILLS=[
  {
    "id": "21-thinking",
    "section": "2.1",
    "spec": "2.1.1",
    "title": "Computational thinking: decomposition and abstraction",
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
        "skill": "Computational thinking: decomposition and abstraction"
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
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "id": "21-thinking-3",
        "prompt": "Which question best supports abstraction?",
        "answer": "Which details affect the required result?",
        "options": [
          "Which details affect the required result?",
          "How many different fonts could we use?",
          "Can every input be stored forever?",
          "Which wallpaper looks best?"
        ],
        "explanation": "Abstraction keeps relevant requirements and ignores details that do not matter.",
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "id": "21-thinking-4",
        "prompt": "Breaking a school lunch ordering system into menus, payments and collection times is an example of what?",
        "answer": "Decomposition",
        "options": [
          "Decomposition",
          "Iteration",
          "Compression",
          "Authentication"
        ],
        "explanation": "Decomposition separates a complex problem into smaller tasks that can be developed and tested.",
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "id": "21-thinking-5",
        "prompt": "What is a benefit of decomposition for testing?",
        "answer": "Smaller components can be tested separately",
        "options": [
          "Smaller components can be tested separately",
          "It guarantees all code is error-free",
          "It removes the need to plan",
          "It always makes algorithms shorter"
        ],
        "explanation": "Breaking a system into parts makes individual features easier to examine and debug.",
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "id": "21-thinking-6",
        "prompt": "Which of these should be kept when abstracting a library overdue-fine calculator?",
        "answer": "Days overdue and the fine rate",
        "options": [
          "Days overdue and the fine rate",
          "The colour of the library carpet",
          "The librarian's favourite song",
          "The brand of the desk"
        ],
        "explanation": "The calculation requires inputs related to the fine, not unrelated surroundings.",
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "prompt": "Which method helps split a large computing task into smaller independently solvable tasks?",
        "answer": "Decomposition",
        "options": [
          "Decomposition",
          "Abstraction",
          "Compilation",
          "Encryption"
        ],
        "explanation": "Decomposition breaks a complex problem into manageable components.",
        "id": "21-thinking-7",
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "prompt": "When modelling a train fare, which detail is relevant?",
        "answer": "The journey distance or fare zone",
        "options": [
          "The journey distance or fare zone",
          "The driver's favourite food",
          "The colour of a station wall",
          "The manufacturer's logo on a bench"
        ],
        "explanation": "Abstraction retains details affecting the required result.",
        "id": "21-thinking-8",
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "prompt": "A website is divided into sign-in, search and checkout modules. Which approach is shown?",
        "answer": "Decomposition",
        "options": [
          "Decomposition",
          "Compression",
          "Sorting",
          "Boolean logic"
        ],
        "explanation": "Different components can be implemented and tested separately.",
        "id": "21-thinking-9",
        "skill": "Computational thinking: decomposition and abstraction"
      },
      {
        "prompt": "A map shows roads and junctions but not individual blades of grass. What is this?",
        "answer": "Abstraction",
        "options": [
          "Abstraction",
          "Decomposition",
          "Iteration",
          "Validation"
        ],
        "explanation": "A useful model keeps important details and ignores irrelevant ones.",
        "id": "21-thinking-10",
        "skill": "Computational thinking: decomposition and abstraction"
      }
    ]
  },
  {
    "id": "21-algorithmic",
    "section": "2.1",
    "spec": "2.1.1",
    "title": "Algorithmic thinking and planning",
    "questions": [
      {
        "id": "21-algorithmic-1",
        "prompt": "Which is the best definition of an algorithm?",
        "answer": "A precise sequence of steps to solve a problem",
        "options": [
          "A precise sequence of steps to solve a problem",
          "A piece of physical computer hardware",
          "A computer network protocol",
          "A permanently stored file"
        ],
        "explanation": "An algorithm is a set of ordered instructions for solving a problem; it need not be written in a programming language.",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "id": "21-algorithmic-2",
        "prompt": "A login algorithm says: input details; check credentials; grant or deny access. What skill is illustrated?",
        "answer": "Algorithmic thinking",
        "options": [
          "Algorithmic thinking",
          "Image compression",
          "Physical network topology",
          "Data encryption"
        ],
        "explanation": "Algorithmic thinking organises a solution as ordered steps and decisions.",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "id": "21-algorithmic-3",
        "prompt": "What does computational thinking primarily support?",
        "answer": "Structured problem solving that can be implemented computationally",
        "options": [
          "Structured problem solving that can be implemented computationally",
          "Only writing code as quickly as possible",
          "Choosing office furniture",
          "Only installing antivirus software"
        ],
        "explanation": "It involves techniques such as decomposition, abstraction and algorithmic thinking.",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "id": "21-algorithmic-4",
        "prompt": "Why should an algorithm's instructions be unambiguous?",
        "answer": "Different readers should follow them consistently",
        "options": [
          "Different readers should follow them consistently",
          "It makes every program use less RAM automatically",
          "It eliminates the need for inputs",
          "It forces the use of a particular language"
        ],
        "explanation": "Precise instructions reduce different interpretations and unexpected outcomes.",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "prompt": "Why should a recipe-like algorithm have a definite order of steps?",
        "answer": "Each action may depend on previous steps",
        "options": [
          "Each action may depend on previous steps",
          "All instructions always happen at once",
          "It guarantees the code uses no memory",
          "It removes all user input"
        ],
        "explanation": "The sequence matters to achieving the intended result.",
        "id": "21-algorithmic-5",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "prompt": "Which is a suitable algorithmic step for calculating an average?",
        "answer": "Add the values, then divide by the number of values",
        "options": [
          "Add the values, then divide by the number of values",
          "Choose a font",
          "Delete every input",
          "Increase the screen brightness"
        ],
        "explanation": "An algorithm gives purposeful, ordered processing steps.",
        "id": "21-algorithmic-6",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "prompt": "How should you start when planning a solution to an unfamiliar problem?",
        "answer": "Identify inputs, processing and expected outputs",
        "options": [
          "Identify inputs, processing and expected outputs",
          "Write random instructions first",
          "Ignore constraints",
          "Avoid testing"
        ],
        "explanation": "Knowing what data is required and what result is expected guides design.",
        "id": "21-algorithmic-7",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "prompt": "What is a useful property of a well-defined algorithm?",
        "answer": "Its instructions have clear, unambiguous meaning",
        "options": [
          "Its instructions have clear, unambiguous meaning",
          "It always has exactly five instructions",
          "It never uses conditions",
          "It requires a graphical interface"
        ],
        "explanation": "An unambiguous description can be followed consistently.",
        "id": "21-algorithmic-8",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "prompt": "A program is intended to decide whether a pupil passed. Which detail is essential?",
        "answer": "The pupil's mark and the pass threshold",
        "options": [
          "The pupil's mark and the pass threshold",
          "The classroom wallpaper",
          "The processor manufacturer",
          "The school lunch menu"
        ],
        "explanation": "The decision depends on the mark and threshold.",
        "id": "21-algorithmic-9",
        "skill": "Algorithmic thinking and planning"
      },
      {
        "prompt": "Which sequence correctly calculates a discount?",
        "answer": "Read price and discount rate; calculate reduction; output reduced price",
        "options": [
          "Read price and discount rate; calculate reduction; output reduced price",
          "Output reduced price; read inputs; calculate reduction",
          "Read price; ignore discount; output original price",
          "Calculate a reduction before reading any values"
        ],
        "explanation": "A logical algorithm orders input, processing and output.",
        "id": "21-algorithmic-10",
        "skill": "Algorithmic thinking and planning"
      }
    ]
  },
  {
    "id": "21-design",
    "section": "2.1",
    "spec": "2.1.2",
    "title": "Flowcharts and pseudocode",
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
        "skill": "Flowcharts and pseudocode"
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
        "skill": "Flowcharts and pseudocode"
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
        "skill": "Flowcharts and pseudocode"
      },
      {
        "id": "21-design-4",
        "prompt": "What is the output of this OCR ERL program?",
        "answer": "9",
        "options": [
          "9",
          "6",
          "12",
          "3"
        ],
        "explanation": "The variable begins at 6 and is increased by 3, so the printed value is 9.",
        "skill": "Flowcharts and pseudocode",
        "code": "total = 6\ntotal = total + 3\nprint(total)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "21-design-5",
        "prompt": "Which programming construct repeats a set of instructions?",
        "answer": "Iteration",
        "options": [
          "Iteration",
          "Selection",
          "Sequence only",
          "Concatenation"
        ],
        "explanation": "Iteration uses loops to carry out instructions multiple times.",
        "skill": "Flowcharts and pseudocode"
      },
      {
        "id": "21-design-6",
        "prompt": "Which construct chooses between outcomes based on a condition?",
        "answer": "Selection",
        "options": [
          "Selection",
          "Iteration",
          "Sequence only",
          "Compression"
        ],
        "explanation": "Selection is typically implemented with IF and ELSE decisions.",
        "skill": "Flowcharts and pseudocode"
      },
      {
        "id": "21-design-7",
        "prompt": "What is the output of this algorithm?",
        "answer": "Pass",
        "options": [
          "Pass",
          "Fail",
          "10",
          "No output"
        ],
        "explanation": "The condition 10 >= 10 is true so the first branch prints Pass.",
        "skill": "Flowcharts and pseudocode",
        "code": "score = 10\nif score >= 10 then\n    print(\"Pass\")\nelse\n    print(\"Fail\")\nendif",
        "language": "OCR Exam Reference Language"
      },
      {
        "prompt": "Which flowchart shape is normally used to show input or output?",
        "answer": "Parallelogram",
        "options": [
          "Parallelogram",
          "Diamond",
          "Rectangle",
          "Circle only"
        ],
        "explanation": "Input and output normally use a parallelogram in a standard flowchart.",
        "id": "21-design-8",
        "skill": "Flowcharts and pseudocode"
      },
      {
        "prompt": "Which flowchart symbol indicates Start or End?",
        "answer": "Terminator (oval/rounded shape)",
        "options": [
          "Terminator (oval/rounded shape)",
          "Decision diamond",
          "Data-store cylinder",
          "Process rectangle"
        ],
        "explanation": "Start and End are shown with terminator symbols.",
        "id": "21-design-9",
        "skill": "Flowcharts and pseudocode"
      },
      {
        "prompt": "What does an arrow in a flowchart indicate?",
        "answer": "The direction of control flow",
        "options": [
          "The direction of control flow",
          "The number of program files",
          "The width of a data bus",
          "The size of a list"
        ],
        "explanation": "Flow lines show which step follows next.",
        "id": "21-design-10",
        "skill": "Flowcharts and pseudocode"
      }
    ]
  },
  {
    "id": "21-flowchart-reading",
    "section": "2.1",
    "spec": "2.1.2",
    "title": "Read and trace complete flowcharts",
    "questions": [
      {
        "id": "21-flowchart-reading-1",
        "prompt": "For input n = 10, what does this flowchart output?",
        "answer": "High",
        "options": [
          "High",
          "Low",
          "10",
          "Nothing"
        ],
        "explanation": "The decision n >= 10 is true, so follow Yes to the output High.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-selection-grade.svg",
          "alt": "Start, input n, test n greater than or equal to 10. Yes outputs High; No outputs Low. Then End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-2",
        "prompt": "For input n = 7, what is the output?",
        "answer": "Low",
        "options": [
          "Low",
          "High",
          "7",
          "No output"
        ],
        "explanation": "7 is less than 10, so the No branch outputs Low.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-selection-grade.svg",
          "alt": "Start, input n, test n greater than or equal to 10. Yes outputs High; No outputs Low. Then End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-3",
        "prompt": "The flowchart receives a = 4 and b = 7. What value is output?",
        "answer": "11",
        "options": [
          "11",
          "47",
          "3",
          "7"
        ],
        "explanation": "The process adds the two input values, 4 + 7 = 11, before outputting total.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-sequence.svg",
          "alt": "Start, input a and b, process total equals a plus b, output total, then End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-4",
        "prompt": "For input a = -2 and b = 5, what is output?",
        "answer": "3",
        "options": [
          "3",
          "-7",
          "7",
          "-3"
        ],
        "explanation": "The process calculates -2 + 5 = 3.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-sequence.svg",
          "alt": "Start, input a and b, process total equals a plus b, output total, then End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-5",
        "prompt": "What does the counter-loop flowchart output?",
        "answer": "10",
        "options": [
          "10",
          "4",
          "6",
          "15"
        ],
        "explanation": "It adds 1 + 2 + 3 + 4 before the decision becomes false.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-counter-loop.svg",
          "alt": "Start, set total to zero and count to one. While count is at most four, add count to total, increase count by one, then test again. Otherwise output total and End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-6",
        "prompt": "How many times is total = total + count carried out?",
        "answer": "4",
        "options": [
          "4",
          "3",
          "5",
          "1"
        ],
        "explanation": "The Yes branch is taken for count values 1, 2, 3 and 4.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-counter-loop.svg",
          "alt": "Start, set total to zero and count to one. While count is at most four, add count to total, increase count by one, then test again. Otherwise output total and End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-7",
        "prompt": "If the decision were changed to count < 4, what total would be output?",
        "answer": "6",
        "options": [
          "6",
          "10",
          "4",
          "3"
        ],
        "explanation": "The body would run for count 1, 2 and 3 only; the sum is 6.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-counter-loop.svg",
          "alt": "Start, set total to zero and count to one. While count is at most four, add count to total, increase count by one, then test again. Otherwise output total and End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-8",
        "prompt": "For input n = 7, what does the flowchart output?",
        "answer": "Odd",
        "options": [
          "Odd",
          "Even",
          "7",
          "Nothing"
        ],
        "explanation": "7 MOD 2 is 1, so the decision is false and the No branch outputs Odd.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-selection-parity.svg",
          "alt": "Start, input n, test whether n MOD 2 equals 0. Yes outputs Even; No outputs Odd. Then End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-9",
        "prompt": "For input n = 0, what does the flowchart output?",
        "answer": "Even",
        "options": [
          "Even",
          "Odd",
          "0",
          "Nothing"
        ],
        "explanation": "0 MOD 2 is 0, so the Yes branch outputs Even.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-selection-parity.svg",
          "alt": "Start, input n, test whether n MOD 2 equals 0. Yes outputs Even; No outputs Odd. Then End."
        },
        "skill": "Read and trace complete flowcharts"
      },
      {
        "id": "21-flowchart-reading-10",
        "prompt": "If the decision were changed to n MOD 2 != 0 and n were 7, what would the output be?",
        "answer": "Even",
        "options": [
          "Even",
          "Odd",
          "7",
          "Nothing"
        ],
        "explanation": "For 7 the changed condition is true; the flowchart's Yes branch is still labelled Even, illustrating a logic error.",
        "diagram": {
          "src": "/revision/j277/diagrams/flowchart-selection-parity.svg",
          "alt": "Start, input n, test whether n MOD 2 equals 0. Yes outputs Even; No outputs Odd. Then End."
        },
        "skill": "Read and trace complete flowcharts"
      }
    ]
  },
  {
    "id": "21-tracing",
    "section": "2.1",
    "spec": "2.1.2",
    "title": "Trace tables and dry runs",
    "questions": [
      {
        "id": "21-tracing-1",
        "prompt": "What is the main purpose of a trace table?",
        "answer": "Record how variables change during execution",
        "options": [
          "Record how variables change during execution",
          "Store final files on a hard disk",
          "Choose network passwords",
          "Increase CPU clock speed"
        ],
        "explanation": "A trace table follows program steps and tracks values and outputs to find logic errors.",
        "skill": "Trace tables and dry runs"
      },
      {
        "id": "21-tracing-2",
        "prompt": "What is a dry run of an algorithm?",
        "answer": "Following its steps manually with test data",
        "options": [
          "Following its steps manually with test data",
          "Restarting the computer",
          "Executing only compiled machine code",
          "Deleting unused data files"
        ],
        "explanation": "A dry run tests the logic by stepping through the algorithm without running it as a program.",
        "skill": "Trace tables and dry runs"
      },
      {
        "id": "21-tracing-3",
        "prompt": "Why can a trace table help correct an algorithm?",
        "answer": "It shows the step where values first become incorrect",
        "options": [
          "It shows the step where values first become incorrect",
          "It automatically writes all missing code",
          "It prevents every syntax error without testing",
          "It increases processor performance"
        ],
        "explanation": "Following changes step by step reveals where the algorithm's behaviour differs from expectations.",
        "skill": "Trace tables and dry runs"
      },
      {
        "prompt": "After this code, what is x?",
        "answer": "8",
        "options": [
          "8",
          "5",
          "3",
          "10"
        ],
        "explanation": "The value starts at 5 and is increased by 3.",
        "code": "x = 5\nx = x + 3\nprint(x)",
        "language": "OCR Exam Reference Language",
        "id": "21-tracing-4",
        "skill": "Trace tables and dry runs"
      },
      {
        "prompt": "What is printed by this selection?",
        "answer": "Small",
        "options": [
          "Small",
          "Large",
          "4",
          "No output"
        ],
        "explanation": "Because 4 < 5 is true, the first branch runs.",
        "code": "n = 4\nif n < 5 then\n    print(\"Small\")\nelse\n    print(\"Large\")\nendif",
        "language": "OCR Exam Reference Language",
        "id": "21-tracing-5",
        "skill": "Trace tables and dry runs"
      },
      {
        "prompt": "What value does total have after the loop?",
        "answer": "6",
        "options": [
          "6",
          "3",
          "9",
          "12"
        ],
        "explanation": "The loop adds 1, 2 and 3: total = 6.",
        "code": "total = 0\nfor n = 1 to 3\n    total = total + n\nnext n",
        "language": "OCR Exam Reference Language",
        "id": "21-tracing-6",
        "skill": "Trace tables and dry runs"
      },
      {
        "prompt": "Which columns are most useful for tracing x = x + 1 in a loop?",
        "answer": "Loop iteration and x",
        "options": [
          "Loop iteration and x",
          "File extension and screen size",
          "Keyboard and mouse type",
          "Network router and gateway"
        ],
        "explanation": "A trace table records the step and values that change.",
        "id": "21-tracing-7",
        "skill": "Trace tables and dry runs"
      },
      {
        "prompt": "What should be entered in a trace table after an assignment?",
        "answer": "The variable's updated value",
        "options": [
          "The variable's updated value",
          "Always its original value",
          "Only the program title",
          "A random test result"
        ],
        "explanation": "Assignments change stored values; the trace shows the change.",
        "id": "21-tracing-8",
        "skill": "Trace tables and dry runs"
      },
      {
        "prompt": "What is printed by this loop?",
        "answer": "1, then 2",
        "options": [
          "1, then 2",
          "0, then 1",
          "2, then 3",
          "1 only"
        ],
        "explanation": "The FOR loop runs for i = 1 and i = 2.",
        "code": "for i = 1 to 2\n    print(i)\nnext i",
        "language": "OCR Exam Reference Language",
        "id": "21-tracing-9",
        "skill": "Trace tables and dry runs"
      },
      {
        "prompt": "If a trace differs from the expected output, what should be checked?",
        "answer": "The first step where the variable changes incorrectly",
        "options": [
          "The first step where the variable changes incorrectly",
          "Only the final printed line",
          "The colour of the code editor",
          "The monitor resolution"
        ],
        "explanation": "The earliest incorrect update often reveals the logic error.",
        "id": "21-tracing-10",
        "skill": "Trace tables and dry runs"
      }
    ]
  },
  {
    "id": "21-nested",
    "section": "2.1",
    "spec": "2.1.2",
    "title": "Nested selection and iteration: code tracing",
    "questions": [
      {
        "id": "21-nested-1",
        "prompt": "What is printed?",
        "answer": "High",
        "options": [
          "High",
          "Pass",
          "Low",
          "Nothing"
        ],
        "explanation": "Both conditions are true, so the nested branch prints High.",
        "code": "mark = 75\nif mark >= 40 then\n  if mark >= 70 then\n    print(\"High\")\n  else\n    print(\"Pass\")\n  endif\nelse\n  print(\"Low\")\nendif",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-2",
        "prompt": "What is printed when mark is 55?",
        "answer": "Pass",
        "options": [
          "Pass",
          "High",
          "Low",
          "Nothing"
        ],
        "explanation": "55 passes the outer condition but fails the nested >=70 condition.",
        "code": "mark = 55\nif mark >= 40 then\n  if mark >= 70 then\n    print(\"High\")\n  else\n    print(\"Pass\")\n  endif\nelse\n  print(\"Low\")\nendif",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-3",
        "prompt": "How many times is print(\"*\") executed?",
        "answer": "6",
        "options": [
          "6",
          "2",
          "3",
          "5"
        ],
        "explanation": "There are 2 outer iterations and 3 inner iterations, so 2 × 3 = 6.",
        "code": "for row = 1 to 2\n  for col = 1 to 3\n    print(\"*\")\n  next col\nnext row",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-4",
        "prompt": "What is the final value of total?",
        "answer": "12",
        "options": [
          "12",
          "6",
          "9",
          "18"
        ],
        "explanation": "The inner loop adds 2 on three iterations, and the outer loop repeats twice: 2×3×2=12.",
        "code": "total = 0\nfor a = 1 to 2\n  for b = 1 to 3\n    total = total + 2\n  next b\nnext a",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-5",
        "prompt": "How many values are printed?",
        "answer": "2",
        "options": [
          "2",
          "1",
          "3",
          "4"
        ],
        "explanation": "Only i=2 and i=4 are even numbers in the inclusive loop.",
        "code": "for i = 1 to 4\n  if i MOD 2 == 0 then\n    print(i)\n  endif\nnext i",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-6",
        "prompt": "What is printed?",
        "answer": "Inside",
        "options": [
          "Inside",
          "Outside",
          "Neither",
          "Both"
        ],
        "explanation": "The outer IF is true and the inner IF tests 3<5, which is also true.",
        "code": "x = 3\nif x > 0 then\n  if x < 5 then\n    print(\"Inside\")\n  else\n    print(\"Outside\")\n  endif\nendif",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-7",
        "prompt": "What is the final value of count?",
        "answer": "3",
        "options": [
          "3",
          "0",
          "2",
          "6"
        ],
        "explanation": "For a=1, two inner iterations satisfy b>=a; for a=2, only b=2 qualifies.",
        "code": "count = 0\nfor a = 1 to 2\n  for b = 1 to 2\n    if b >= a then\n      count = count + 1\n    endif\n  next b\nnext a",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-8",
        "prompt": "Which is the final output?",
        "answer": "4",
        "options": [
          "4",
          "2",
          "6",
          "8"
        ],
        "explanation": "The loop executes four times, but the IF counts only values greater than 2.",
        "code": "count = 0\nfor i = 1 to 4\n  if i > 2 then\n    count = count + 2\n  endif\nnext i\nprint(count)",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-9",
        "prompt": "What is printed?",
        "answer": "Done",
        "options": [
          "Done",
          "Still waiting",
          "Both messages",
          "Nothing"
        ],
        "explanation": "The nested loop stops at x=3; only after it terminates does the final print run.",
        "code": "x = 1\nwhile x < 3\n  x = x + 1\nendwhile\nif x == 3 then\n  print(\"Done\")\nelse\n  print(\"Still waiting\")\nendif",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      },
      {
        "id": "21-nested-10",
        "prompt": "What is the final value of total?",
        "answer": "4",
        "options": [
          "4",
          "2",
          "3",
          "6"
        ],
        "explanation": "For i=1, j=1 adds one. For i=2, j=1 adds one and j=2 adds two: total four.",
        "code": "total = 0\nfor i = 1 to 2\n  for j = 1 to i\n    total = total + j\n  next j\nnext i\nprint(total)",
        "language": "OCR Exam Reference Language",
        "skill": "Nested selection and iteration: code tracing"
      }
    ]
  },
  {
    "id": "21-linear",
    "section": "2.1",
    "spec": "2.1.3",
    "title": "Linear search",
    "questions": [
      {
        "id": "21-linear-1",
        "prompt": "Which algorithm can search a list without it being sorted?",
        "answer": "Linear search",
        "options": [
          "Linear search",
          "Binary search only",
          "Merge sort",
          "Insertion sort"
        ],
        "explanation": "Linear search checks items in turn and does not require an ordered list.",
        "skill": "Linear search"
      },
      {
        "id": "21-linear-2",
        "prompt": "Which search examines one item at a time until it finds a match or reaches the end?",
        "answer": "Linear search",
        "options": [
          "Linear search",
          "Binary search",
          "Bubble sort",
          "Merge sort"
        ],
        "explanation": "Linear search scans consecutive elements without repeatedly halving the range.",
        "skill": "Linear search"
      },
      {
        "prompt": "A linear search checks [7, 4, 9, 2] for 9. How many values are checked?",
        "answer": "3",
        "options": [
          "3",
          "1",
          "2",
          "4"
        ],
        "explanation": "It checks 7, 4, then 9.",
        "id": "21-linear-3",
        "skill": "Linear search"
      },
      {
        "prompt": "What is the worst case for a linear search of 12 elements?",
        "answer": "12 checks",
        "options": [
          "12 checks",
          "1 check",
          "6 checks",
          "24 checks"
        ],
        "explanation": "If the value is last or absent, every element may be examined.",
        "id": "21-linear-4",
        "skill": "Linear search"
      },
      {
        "prompt": "Which list can a linear search use?",
        "answer": "An unsorted list",
        "options": [
          "An unsorted list",
          "Only a sorted list",
          "Only a list with two items",
          "Only a list with unique values"
        ],
        "explanation": "Linear search has no sorting prerequisite.",
        "id": "21-linear-5",
        "skill": "Linear search"
      },
      {
        "prompt": "When can linear search stop early?",
        "answer": "As soon as the target is found",
        "options": [
          "As soon as the target is found",
          "Only when every item is compared",
          "Only once the list is sorted",
          "Only if the list is empty"
        ],
        "explanation": "The algorithm can return the matching index as soon as it finds the target.",
        "id": "21-linear-6",
        "skill": "Linear search"
      },
      {
        "prompt": "Searching [5, 8, 3] for 6 returns what?",
        "answer": "Not found",
        "options": [
          "Not found",
          "Index 1",
          "Index 2",
          "Index 0"
        ],
        "explanation": "None of the three elements is equal to 6.",
        "id": "21-linear-7",
        "skill": "Linear search"
      },
      {
        "prompt": "What is the first item checked by a typical linear search?",
        "answer": "The item at the start of the list",
        "options": [
          "The item at the start of the list",
          "The middle item",
          "The last item",
          "A random item"
        ],
        "explanation": "The conventional algorithm scans from the first element forwards.",
        "id": "21-linear-8",
        "skill": "Linear search"
      },
      {
        "prompt": "What is the output of this search fragment?",
        "answer": "2",
        "options": [
          "2",
          "1",
          "3",
          "0"
        ],
        "explanation": "The target 9 is at zero-based index 2.",
        "code": "values = [4, 7, 9]\nfor i = 0 to 2\n    if values[i] == 9 then\n        print(i)\n    endif\nnext i",
        "language": "OCR Exam Reference Language",
        "id": "21-linear-9",
        "skill": "Linear search"
      },
      {
        "prompt": "A linear search checks [2, 6, 8, 10] for 2. How many checks?",
        "answer": "1",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "explanation": "It finds the target immediately at the first item.",
        "id": "21-linear-10",
        "skill": "Linear search"
      }
    ]
  },
  {
    "id": "21-binary",
    "section": "2.1",
    "spec": "2.1.3",
    "title": "Binary search",
    "questions": [
      {
        "id": "21-binary-1",
        "prompt": "What must be true before a standard binary search is used?",
        "answer": "The list must already be sorted",
        "options": [
          "The list must already be sorted",
          "Every value must be unique",
          "The list must contain exactly eight values",
          "The list must be stored on an SSD"
        ],
        "explanation": "Binary search compares a target with a middle item and relies on the data being ordered.",
        "skill": "Binary search"
      },
      {
        "id": "21-binary-2",
        "prompt": "A sorted list has values 2, 5, 8, 11, 15. Which value is checked first in a typical binary search?",
        "answer": "8",
        "options": [
          "8",
          "2",
          "15",
          "5"
        ],
        "explanation": "The middle index of five values is 2 (zero-based), which holds 8.",
        "skill": "Binary search"
      },
      {
        "id": "21-binary-3",
        "prompt": "Binary search checks a middle item that is smaller than the target. Where does it search next?",
        "answer": "The higher-valued half",
        "options": [
          "The higher-valued half",
          "The lower-valued half",
          "Always the whole list again",
          "It stops even if the target may exist"
        ],
        "explanation": "In an ascending list, values below or equal to the middle value can be eliminated.",
        "skill": "Binary search"
      },
      {
        "prompt": "Which list is ready for ascending-order binary search?",
        "answer": "[2, 5, 9, 12]",
        "options": [
          "[2, 5, 9, 12]",
          "[9, 2, 12, 5]",
          "[5, 12, 2, 9]",
          "[12, 2, 5, 9]"
        ],
        "explanation": "Binary search assumes a consistently ordered list.",
        "id": "21-binary-4",
        "skill": "Binary search"
      },
      {
        "prompt": "When the target is less than the midpoint value in an ascending list, which half remains?",
        "answer": "Lower-valued half",
        "options": [
          "Lower-valued half",
          "Higher-valued half",
          "Both halves",
          "Neither half"
        ],
        "explanation": "All values to the right of the midpoint are too large.",
        "id": "21-binary-5",
        "skill": "Binary search"
      },
      {
        "prompt": "Binary search checks 9 in [1, 4, 9, 13, 18]. The target is 18. What happens next?",
        "answer": "Search the half containing 13 and 18",
        "options": [
          "Search the half containing 13 and 18",
          "Search only 1 and 4",
          "Finish without finding",
          "Resort the list randomly"
        ],
        "explanation": "18 is above 9, so the lower-valued half can be eliminated.",
        "id": "21-binary-6",
        "skill": "Binary search"
      },
      {
        "prompt": "Why can binary search be quicker than linear search on a large sorted list?",
        "answer": "It discards about half the remaining candidates each check",
        "options": [
          "It discards about half the remaining candidates each check",
          "It compares every item twice",
          "It never checks an item",
          "It sorts the list after each check"
        ],
        "explanation": "The search space is repeatedly reduced by comparing with its midpoint.",
        "id": "21-binary-7",
        "skill": "Binary search"
      },
      {
        "prompt": "For [3, 7, 11, 15, 19, 23, 27], which value is the middle?",
        "answer": "15",
        "options": [
          "15",
          "3",
          "11",
          "27"
        ],
        "explanation": "With seven values, the fourth is the midpoint.",
        "id": "21-binary-8",
        "skill": "Binary search"
      },
      {
        "prompt": "If the lower boundary moves above the upper boundary, what should binary search report?",
        "answer": "Not found",
        "options": [
          "Not found",
          "Found at index 0",
          "List sorted",
          "Try the same midpoint forever"
        ],
        "explanation": "When no candidate indices remain, the target is absent.",
        "id": "21-binary-9",
        "skill": "Binary search"
      },
      {
        "prompt": "A sorted list has values [2, 4, 6, 8, 10]. Target 4: what is checked first?",
        "answer": "6",
        "options": [
          "6",
          "2",
          "4",
          "10"
        ],
        "explanation": "The middle element is 6; 4 lies in the lower half.",
        "id": "21-binary-10",
        "skill": "Binary search"
      }
    ]
  },
  {
    "id": "21-bubble",
    "section": "2.1",
    "spec": "2.1.3",
    "title": "Bubble sort",
    "questions": [
      {
        "id": "21-bubble-1",
        "prompt": "Which sorting method repeatedly compares and swaps adjacent out-of-order items?",
        "answer": "Bubble sort",
        "options": [
          "Bubble sort",
          "Binary search",
          "Linear search",
          "Merge sort"
        ],
        "explanation": "Bubble sort moves larger items towards the end over successive passes.",
        "skill": "Bubble sort"
      },
      {
        "id": "21-bubble-2",
        "prompt": "After one left-to-right bubble-sort pass on 4, 1, 3, 2, what is the order?",
        "answer": "1, 3, 2, 4",
        "options": [
          "1, 3, 2, 4",
          "1, 2, 3, 4",
          "4, 3, 2, 1",
          "1, 4, 3, 2"
        ],
        "explanation": "Swaps are 4/1, 4/3 and 4/2, leaving the largest value at the end.",
        "skill": "Bubble sort"
      },
      {
        "id": "21-bubble-3",
        "prompt": "Which statement about bubble sort is accurate?",
        "answer": "Several passes may be needed to sort the whole list",
        "options": [
          "Several passes may be needed to sort the whole list",
          "One comparison always sorts a list",
          "Bubble sort requires an already sorted list",
          "It is the same process as a binary search"
        ],
        "explanation": "Each pass may move values closer to their correct positions; an unsorted list may require multiple passes.",
        "skill": "Bubble sort"
      },
      {
        "prompt": "After one bubble pass through [5, 2, 4, 1], what is the order?",
        "answer": "[2, 4, 1, 5]",
        "options": [
          "[2, 4, 1, 5]",
          "[1, 2, 4, 5]",
          "[5, 4, 2, 1]",
          "[2, 5, 4, 1]"
        ],
        "explanation": "Each out-of-order adjacent pair swaps, moving 5 to the end.",
        "id": "21-bubble-4",
        "skill": "Bubble sort"
      },
      {
        "prompt": "During ascending bubble sort, when are two adjacent items swapped?",
        "answer": "When the left item is larger than the right item",
        "options": [
          "When the left item is larger than the right item",
          "When the left item is smaller",
          "Only when equal",
          "Always"
        ],
        "explanation": "A swap corrects an adjacent inversion.",
        "id": "21-bubble-5",
        "skill": "Bubble sort"
      },
      {
        "prompt": "What does one complete bubble-sort pass guarantee?",
        "answer": "The largest remaining value is at its correct end position",
        "options": [
          "The largest remaining value is at its correct end position",
          "The entire list is always sorted",
          "The smallest value is deleted",
          "The list becomes reverse sorted"
        ],
        "explanation": "The largest unsorted element bubbles to the right end.",
        "id": "21-bubble-6",
        "skill": "Bubble sort"
      },
      {
        "prompt": "What can an optimised bubble sort do if an entire pass makes no swaps?",
        "answer": "Stop early because the list is sorted",
        "options": [
          "Stop early because the list is sorted",
          "Start the list again randomly",
          "Delete the last element",
          "Change to binary search"
        ],
        "explanation": "No adjacent inversions means the list is in order.",
        "id": "21-bubble-7",
        "skill": "Bubble sort"
      },
      {
        "prompt": "What is [3, 1, 2] after one left-to-right bubble pass?",
        "answer": "[1, 2, 3]",
        "options": [
          "[1, 2, 3]",
          "[3, 2, 1]",
          "[1, 3, 2]",
          "[2, 3, 1]"
        ],
        "explanation": "Swap 3 with 1, then 3 with 2.",
        "id": "21-bubble-8",
        "skill": "Bubble sort"
      },
      {
        "prompt": "Which pairs does bubble sort compare?",
        "answer": "Adjacent pairs",
        "options": [
          "Adjacent pairs",
          "Only first and last",
          "Only middle elements",
          "Every pair simultaneously"
        ],
        "explanation": "Bubble sort repeatedly examines neighbours.",
        "id": "21-bubble-9",
        "skill": "Bubble sort"
      },
      {
        "prompt": "For [8, 7, 6], what happens in the first comparison of ascending bubble sort?",
        "answer": "8 and 7 swap",
        "options": [
          "8 and 7 swap",
          "8 and 6 swap",
          "Nothing changes",
          "7 is deleted"
        ],
        "explanation": "8 is larger than adjacent 7, so the pair swaps.",
        "id": "21-bubble-10",
        "skill": "Bubble sort"
      }
    ]
  },
  {
    "id": "21-insertion",
    "section": "2.1",
    "spec": "2.1.3",
    "title": "Insertion sort",
    "questions": [
      {
        "id": "21-insertion-1",
        "prompt": "What happens during insertion sort?",
        "answer": "Each new value is placed in its correct position within a sorted section",
        "options": [
          "Each new value is placed in its correct position within a sorted section",
          "The list is always split recursively in half",
          "The middle element is always searched first",
          "Each value is encrypted"
        ],
        "explanation": "Insertion sort grows a sorted prefix by inserting the next element appropriately.",
        "skill": "Insertion sort"
      },
      {
        "prompt": "What does insertion sort maintain while processing the list?",
        "answer": "A growing sorted section",
        "options": [
          "A growing sorted section",
          "A growing random section",
          "Only two unsorted halves",
          "A hash table"
        ],
        "explanation": "Each next item is inserted into a sorted prefix.",
        "id": "21-insertion-2",
        "skill": "Insertion sort"
      },
      {
        "prompt": "Insert 2 into sorted [3, 5, 8]. What is the result?",
        "answer": "[2, 3, 5, 8]",
        "options": [
          "[2, 3, 5, 8]",
          "[3, 5, 8, 2]",
          "[3, 2, 5, 8]",
          "[8, 5, 3, 2]"
        ],
        "explanation": "2 belongs before 3.",
        "id": "21-insertion-3",
        "skill": "Insertion sort"
      },
      {
        "prompt": "Insert 6 into sorted [2, 4, 7]. What is the result?",
        "answer": "[2, 4, 6, 7]",
        "options": [
          "[2, 4, 6, 7]",
          "[6, 2, 4, 7]",
          "[2, 6, 4, 7]",
          "[2, 4, 7, 6]"
        ],
        "explanation": "6 goes between 4 and 7.",
        "id": "21-insertion-4",
        "skill": "Insertion sort"
      },
      {
        "prompt": "In insertion sort, what is shifted to make space for a new value?",
        "answer": "Larger values in the sorted section",
        "options": [
          "Larger values in the sorted section",
          "All smaller values out of the list",
          "Only the final item",
          "Every value in random order"
        ],
        "explanation": "Elements larger than the key shift one place right.",
        "id": "21-insertion-5",
        "skill": "Insertion sort"
      },
      {
        "prompt": "After inserting the second item of [5, 2, 8], how does the sorted section begin?",
        "answer": "[2, 5]",
        "options": [
          "[2, 5]",
          "[5, 2]",
          "[8, 5]",
          "[2, 8]"
        ],
        "explanation": "2 is inserted ahead of 5.",
        "id": "21-insertion-6",
        "skill": "Insertion sort"
      },
      {
        "prompt": "Which initial list is most favourable for insertion sort?",
        "answer": "Already sorted",
        "options": [
          "Already sorted",
          "Reverse sorted",
          "Randomly shuffled",
          "Only strings"
        ],
        "explanation": "Insertion sort requires little shifting when values are already ordered.",
        "id": "21-insertion-7",
        "skill": "Insertion sort"
      },
      {
        "prompt": "For [4, 3, 2], after processing the second element, what is the order?",
        "answer": "[3, 4, 2]",
        "options": [
          "[3, 4, 2]",
          "[2, 3, 4]",
          "[4, 2, 3]",
          "[4, 3, 2]"
        ],
        "explanation": "Insert 3 before 4; 2 remains unprocessed.",
        "id": "21-insertion-8",
        "skill": "Insertion sort"
      },
      {
        "prompt": "How many values are in the sorted prefix when insertion sort has processed three items?",
        "answer": "3",
        "options": [
          "3",
          "1",
          "2",
          "All items regardless of list size"
        ],
        "explanation": "Each processed item is inserted into the prefix.",
        "id": "21-insertion-9",
        "skill": "Insertion sort"
      },
      {
        "prompt": "How does insertion sort differ from bubble sort?",
        "answer": "It inserts a key into a growing sorted prefix",
        "options": [
          "It inserts a key into a growing sorted prefix",
          "It always halves the list",
          "It searches only sorted arrays",
          "It compares no values"
        ],
        "explanation": "Bubble swaps neighbours over passes; insertion shifts elements to place a key.",
        "id": "21-insertion-10",
        "skill": "Insertion sort"
      }
    ]
  },
  {
    "id": "21-merge",
    "section": "2.1",
    "spec": "2.1.3",
    "title": "Merge sort",
    "questions": [
      {
        "id": "21-merge-1",
        "prompt": "Which method divides data into smaller lists and merges sorted results?",
        "answer": "Merge sort",
        "options": [
          "Merge sort",
          "Bubble sort",
          "Linear search",
          "Binary search"
        ],
        "explanation": "Merge sort splits the list and combines sorted sublists.",
        "skill": "Merge sort"
      },
      {
        "prompt": "What is the main divide step in merge sort?",
        "answer": "Split the list into smaller sublists",
        "options": [
          "Split the list into smaller sublists",
          "Swap neighbouring items repeatedly",
          "Pick the middle item to search",
          "Ignore half the data forever"
        ],
        "explanation": "Merge sort recursively divides the list before merging.",
        "id": "21-merge-2",
        "skill": "Merge sort"
      },
      {
        "prompt": "What is the main combine step?",
        "answer": "Merge two sorted sublists in order",
        "options": [
          "Merge two sorted sublists in order",
          "Delete all duplicate elements",
          "Reverse every second item",
          "Pick random entries"
        ],
        "explanation": "The algorithm combines sorted runs into a larger sorted list.",
        "id": "21-merge-3",
        "skill": "Merge sort"
      },
      {
        "prompt": "Merge [1, 5] and [2, 4]. What is the result?",
        "answer": "[1, 2, 4, 5]",
        "options": [
          "[1, 2, 4, 5]",
          "[1, 5, 2, 4]",
          "[5, 4, 2, 1]",
          "[2, 1, 5, 4]"
        ],
        "explanation": "Compare the first remaining element from each sorted list to build the output.",
        "id": "21-merge-4",
        "skill": "Merge sort"
      },
      {
        "prompt": "Why must two input runs be sorted before the standard merge step?",
        "answer": "The merge can then take the smaller leading value each time",
        "options": [
          "The merge can then take the smaller leading value each time",
          "It prevents any memory use",
          "It makes the number of elements change",
          "It avoids all comparisons"
        ],
        "explanation": "The merge algorithm relies on each input run being ordered.",
        "id": "21-merge-5",
        "skill": "Merge sort"
      },
      {
        "prompt": "After splitting [8, 3, 6, 1] into halves, what are the two sublists?",
        "answer": "[8, 3] and [6, 1]",
        "options": [
          "[8, 3] and [6, 1]",
          "[8, 6] and [3, 1]",
          "[8, 3, 6] and [1]",
          "[1, 3] and [6, 8]"
        ],
        "explanation": "The divide step cuts the list into contiguous halves.",
        "id": "21-merge-6",
        "skill": "Merge sort"
      },
      {
        "prompt": "When does recursive splitting normally stop?",
        "answer": "When a sublist has zero or one element",
        "options": [
          "When a sublist has zero or one element",
          "When the list is reverse sorted",
          "After exactly two steps",
          "Only when every value equals zero"
        ],
        "explanation": "Single-item runs are already sorted.",
        "id": "21-merge-7",
        "skill": "Merge sort"
      },
      {
        "prompt": "Merge [3, 9] and [4, 7]. Which value is output first?",
        "answer": "3",
        "options": [
          "3",
          "4",
          "7",
          "9"
        ],
        "explanation": "Compare the first items: 3 is smaller than 4.",
        "id": "21-merge-8",
        "skill": "Merge sort"
      },
      {
        "prompt": "Which algorithm is divide-and-conquer sorting?",
        "answer": "Merge sort",
        "options": [
          "Merge sort",
          "Linear search",
          "Bubble sort",
          "Binary search"
        ],
        "explanation": "Merge sort splits the problem then combines the sorted results.",
        "id": "21-merge-9",
        "skill": "Merge sort"
      },
      {
        "prompt": "What is the result of merging [2, 6] and [1, 5]?",
        "answer": "[1, 2, 5, 6]",
        "options": [
          "[1, 2, 5, 6]",
          "[2, 6, 1, 5]",
          "[6, 5, 2, 1]",
          "[2, 1, 6, 5]"
        ],
        "explanation": "Choose the smallest leading element until both runs are exhausted.",
        "id": "21-merge-10",
        "skill": "Merge sort"
      }
    ]
  }
];
