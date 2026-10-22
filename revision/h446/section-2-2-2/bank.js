// Original RHSC practice; OCR H446 2.2.2(a–f).
const SKILLS = [
  {
    "id": "222-a",
    "section": "2.2.2",
    "spec": "2.2.2(a)",
    "title": "Recognising solvable problems",
    "lessons": [
      65
    ],
    "page": 132,
    "questions": [
      {
        "id": "222-a-1",
        "prompt": "A shop wants to calculate the total cost of a basket. Which feature makes this well suited to computation?",
        "answer": "Clear inputs and rules",
        "options": [
          "Clear inputs and rules",
          "No measurable output",
          "Only personal taste",
          "No available data"
        ],
        "explanation": "Item prices and quantities can be represented as data, and a precise calculation produces the total.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-2",
        "prompt": "A school asks for software that makes every pupil happy. What must be clarified first?",
        "answer": "Measurable success criteria",
        "options": [
          "Measurable success criteria",
          "The font colour",
          "The file extension",
          "The keyboard layout"
        ],
        "explanation": "The goal is too vague to evaluate. A useful computational task needs an operational definition of success.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-3",
        "prompt": "Which task has the clearest objective rule?",
        "answer": "Count overdue loans",
        "options": [
          "Count overdue loans",
          "Choose the nicest poem",
          "Define perfect happiness",
          "Pick the best-ever song"
        ],
        "explanation": "Loan dates and a due-date rule allow an unambiguous count. Subjective choices need explicit criteria before they can be modelled.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-4",
        "prompt": "A route planner has road connections but no travel-time data. What limits its ability to find the fastest route?",
        "answer": "Missing relevant input data",
        "options": [
          "Missing relevant input data",
          "Too many font choices",
          "The use of a keyboard",
          "Having an output screen"
        ],
        "explanation": "Without relevant costs such as travel times, the planner cannot evaluate which route is fastest under the intended model.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-5",
        "prompt": "A problem has a valid algorithm, but it would take centuries on the available computer. What is the main issue?",
        "answer": "Practical feasibility",
        "options": [
          "Practical feasibility",
          "No defined output",
          "A syntax error necessarily",
          "No possible algorithm"
        ],
        "explanation": "A problem can be solvable in principle yet impractical within the available time and resources.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-6",
        "prompt": "A thermostat switches on below 18°C. Which property supports a computational solution?",
        "answer": "An explicit decision rule",
        "options": [
          "An explicit decision rule",
          "A subjective outcome",
          "No input values",
          "An undefined threshold"
        ],
        "explanation": "A measured temperature can be compared with an exact threshold to produce a repeatable decision.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-7",
        "prompt": "Which description best supports an automated room-booking check?",
        "answer": "Reject overlapping bookings",
        "options": [
          "Reject overlapping bookings",
          "Avoid awkward bookings",
          "Make bookings pleasant",
          "Keep everybody happy"
        ],
        "explanation": "Overlap can be defined precisely using room identifiers and start/end times. The other descriptions need clarification.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-8",
        "prompt": "A weather model predicts rain probabilities. What should users understand?",
        "answer": "Predictions have uncertainty",
        "options": [
          "Predictions have uncertainty",
          "Predictions are guaranteed",
          "Models need no data",
          "All assumptions are true"
        ],
        "explanation": "Computational models use assumptions and imperfect inputs. A probability forecast does not guarantee a particular outcome.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-9",
        "prompt": "Why represent a task’s information as data?",
        "answer": "So an algorithm can process it",
        "options": [
          "So an algorithm can process it",
          "To remove every constraint",
          "To guarantee perfect results",
          "To avoid defining outputs"
        ],
        "explanation": "An algorithm needs a usable representation of inputs and intermediate state. Choosing the representation is part of designing a solution.",
        "skill": "Recognising solvable problems"
      },
      {
        "id": "222-a-10",
        "prompt": "A school wants to allocate pupils to clubs. Which is a useful constraint?",
        "answer": "Each club has a capacity",
        "options": [
          "Each club has a capacity",
          "Use a cheerful colour",
          "Make the code impressive",
          "Choose a long filename"
        ],
        "explanation": "Capacity is a concrete restriction the allocation algorithm can check when deciding whether an assignment is valid.",
        "skill": "Recognising solvable problems"
      }
    ]
  },
  {
    "id": "222-b",
    "section": "2.2.2",
    "spec": "2.2.2(b)",
    "title": "Problem recognition",
    "lessons": [
      65
    ],
    "page": 132,
    "questions": [
      {
        "id": "222-b-1",
        "prompt": "A library says pupils often cannot find available books. What should be established before selecting an algorithm?",
        "answer": "The precise problem",
        "options": [
          "The precise problem",
          "The final logo",
          "The programming font",
          "The animation speed"
        ],
        "explanation": "Clarify what information users need, what data exists and what a successful answer looks like before selecting a method.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-2",
        "prompt": "A bus planner takes an origin and destination. Which is an output?",
        "answer": "A proposed route",
        "options": [
          "A proposed route",
          "The origin stop",
          "The destination stop",
          "The road data input"
        ],
        "explanation": "The proposed route is produced by processing the supplied journey request and transport data.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-3",
        "prompt": "A booking request specifies a room and a time interval. Which is an input?",
        "answer": "Requested start time",
        "options": [
          "Requested start time",
          "Acceptance message",
          "Rejection message",
          "Suggested alternative slot"
        ],
        "explanation": "The start time is supplied to the system. Acceptance, rejection or an alternative can be produced as results.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-4",
        "prompt": "A search routine requires an ascending sorted list. What is this requirement called?",
        "answer": "Precondition",
        "options": [
          "Precondition",
          "Postcondition",
          "Output format",
          "Syntax diagnostic"
        ],
        "explanation": "A precondition is something that must hold before the routine is used for its intended purpose.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-5",
        "prompt": "Which is a testable requirement for a stock-alert system?",
        "answer": "Alert when stock is below 5",
        "options": [
          "Alert when stock is below 5",
          "Make stock management nice",
          "Make the system clever",
          "Always impress the manager"
        ],
        "explanation": "A numeric threshold specifies exactly when an alert should appear, allowing both implementation and testing.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-6",
        "prompt": "Two staff disagree about what counts as a late arrival. What should the developer do first?",
        "answer": "Clarify the definition",
        "options": [
          "Clarify the definition",
          "Guess a cutoff",
          "Choose a sorting method",
          "Hide late records"
        ],
        "explanation": "Ambiguous domain rules should be resolved with the relevant stakeholders before encoding them.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-7",
        "prompt": "A school wants faster printing. Which question best defines a useful performance requirement?",
        "answer": "What maximum waiting time?",
        "options": [
          "What maximum waiting time?",
          "Which wallpaper colour?",
          "How large is the logo?",
          "Which mouse brand?"
        ],
        "explanation": "A maximum waiting-time target turns a vague wish into a measurable performance requirement.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-8",
        "prompt": "A payroll tool calculates pay from hours and rate. Which statement identifies the process?",
        "answer": "Multiply hours by rate",
        "options": [
          "Multiply hours by rate",
          "Enter hours worked",
          "Display the pay",
          "Store an employee name"
        ],
        "explanation": "Inputs are supplied, the process transforms them, and outputs report the result. Here the transformation is multiplication.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-9",
        "prompt": "A customer requests a delivery route that visits every address and returns to the depot. Which detail defines success?",
        "answer": "All addresses are visited",
        "options": [
          "All addresses are visited",
          "The code is short",
          "The map is colourful",
          "The computer is new"
        ],
        "explanation": "Success must include the required visits and return, together with any stated route constraints or optimisation target.",
        "skill": "Problem recognition"
      },
      {
        "id": "222-b-10",
        "prompt": "A system rejects a booking because end time is before start time. Which requirement has been violated?",
        "answer": "Valid time interval",
        "options": [
          "Valid time interval",
          "Shortest route",
          "Sorted input list",
          "Unique screen colour"
        ],
        "explanation": "A valid interval requires a sensible ordering of start and end times. This rule should be identified when defining inputs.",
        "skill": "Problem recognition"
      }
    ]
  },
  {
    "id": "222-c",
    "section": "2.2.2",
    "spec": "2.2.2(c)",
    "title": "Problem decomposition",
    "lessons": [
      66
    ],
    "page": 135,
    "questions": [
      {
        "id": "222-c-1",
        "prompt": "An online shop is split into basket, payment and delivery modules. Which technique is this?",
        "answer": "Decomposition",
        "options": [
          "Decomposition",
          "Encryption",
          "Pipelining only",
          "Data mining"
        ],
        "explanation": "Decomposition breaks a complex task into smaller manageable subproblems, each with a clear purpose.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-2",
        "prompt": "What is a useful first step when decomposing a school booking system?",
        "answer": "Identify major tasks",
        "options": [
          "Identify major tasks",
          "Write every line at once",
          "Delete all constraints",
          "Choose random modules"
        ],
        "explanation": "Identify coherent tasks such as validation, availability checking and booking storage, then refine them as needed.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-3",
        "prompt": "Why define the inputs and outputs of a subproblem?",
        "answer": "To connect modules correctly",
        "options": [
          "To connect modules correctly",
          "To remove all testing",
          "To make all data global",
          "To prevent reuse"
        ],
        "explanation": "Clear interfaces let modules pass the right information to one another and be developed or tested with known inputs.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-4",
        "prompt": "A validation module is tested separately with valid and invalid dates. What benefit of decomposition is shown?",
        "answer": "Independent testing",
        "options": [
          "Independent testing",
          "Guaranteed speed",
          "No need for integration",
          "Automatic correctness"
        ],
        "explanation": "A small focused module can be checked in isolation. The combined system still needs integration testing.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-5",
        "prompt": "Two teams build modules independently. What must they agree so the modules work together?",
        "answer": "Interface contracts",
        "options": [
          "Interface contracts",
          "Identical desk layouts",
          "Identical screen themes",
          "The same variable names everywhere"
        ],
        "explanation": "Agreeing argument types, return values and error behaviour helps separately developed modules fit together.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-6",
        "prompt": "Which is the most cohesive module for a ticket system?",
        "answer": "Calculate ticket price",
        "options": [
          "Calculate ticket price",
          "Price and change wallpaper",
          "Login and sort images",
          "Print and tune the monitor"
        ],
        "explanation": "A cohesive module has a focused responsibility. Unrelated tasks grouped together make understanding and maintenance harder.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-7",
        "prompt": "A developer divides a program into ten files without separating responsibilities. Has useful decomposition necessarily occurred?",
        "answer": "No, tasks still need structure",
        "options": [
          "No, tasks still need structure",
          "Yes, file count proves it",
          "Yes, any split is enough",
          "No program can be decomposed"
        ],
        "explanation": "The aim is manageable subproblems and clear responsibilities, rather than a particular number of files.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-8",
        "prompt": "A module both checks and stores a booking. A later design splits these responsibilities. What is a likely benefit?",
        "answer": "Easier isolated testing",
        "options": [
          "Easier isolated testing",
          "No data is required",
          "Every call becomes faster",
          "All bugs disappear"
        ],
        "explanation": "Validation can be tested without writing to storage, and storage can be tested with known valid data.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-9",
        "prompt": "Several modules need the same date-validation rule. What is the most maintainable design?",
        "answer": "One reusable validator",
        "options": [
          "One reusable validator",
          "Copy the rule everywhere",
          "Use different rules each time",
          "Remove validation"
        ],
        "explanation": "A reusable validator reduces duplication and gives one place to maintain a shared rule. It still needs suitable tests.",
        "skill": "Problem decomposition"
      },
      {
        "id": "222-c-10",
        "prompt": "How does decomposition differ from divide and conquer?",
        "answer": "Subtasks need not be alike",
        "options": [
          "Subtasks need not be alike",
          "It always sorts values",
          "It requires parallel hardware",
          "It cannot use functions"
        ],
        "explanation": "Decomposition may produce different tasks such as input, calculation and output. Divide and conquer tackles smaller instances of a problem.",
        "skill": "Problem decomposition"
      }
    ]
  },
  {
    "id": "222-d",
    "section": "2.2.2",
    "spec": "2.2.2(d)",
    "title": "Divide and conquer",
    "lessons": [
      67
    ],
    "page": 133,
    "questions": [
      {
        "id": "222-d-1",
        "prompt": "Which sequence best describes divide and conquer?",
        "answer": "Divide, solve, combine",
        "options": [
          "Divide, solve, combine",
          "Guess, print, stop",
          "Encrypt, transmit, decrypt",
          "Input, ignore, output"
        ],
        "explanation": "Split into smaller instances, solve them, and combine their results where the algorithm requires it.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-2",
        "prompt": "Merge sort splits a list, sorts the parts and merges them. Which technique does this demonstrate?",
        "answer": "Divide and conquer",
        "options": [
          "Divide and conquer",
          "Data mining",
          "Pipelining",
          "Performance modelling"
        ],
        "explanation": "Sorting the smaller lists solves smaller instances of the original problem; merging builds the final sorted result.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-3",
        "prompt": "A merge-sort list has 8 elements. It is split into two equal parts. How many elements are in each part?",
        "answer": "4",
        "options": [
          "4",
          "2",
          "6",
          "8"
        ],
        "explanation": "The initial balanced split divides 8 elements into two sublists of 4 elements each.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-4",
        "prompt": "Why does a recursive divide-and-conquer algorithm need a base case?",
        "answer": "To stop further splitting",
        "options": [
          "To stop further splitting",
          "To make every input sorted",
          "To eliminate all memory use",
          "To avoid combining results"
        ],
        "explanation": "A sufficiently small instance must be handled directly so the recursive splitting eventually stops.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-5",
        "prompt": "Which step combines the results in merge sort?",
        "answer": "Merge sorted sublists",
        "options": [
          "Merge sorted sublists",
          "Choose the font",
          "Read the filename",
          "Clear the screen"
        ],
        "explanation": "Merging preserves order while combining the two independently sorted sublists into one sorted result.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-6",
        "prompt": "Which task is ordinary decomposition rather than necessarily divide and conquer?",
        "answer": "Split into input and billing",
        "options": [
          "Split into input and billing",
          "Sort both halves of a list",
          "Solve two smaller sublists",
          "Recursively split a sort task"
        ],
        "explanation": "Input and billing are different responsibilities, rather than smaller instances of the same task.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-7",
        "prompt": "Two subproblems are to run simultaneously. Which property is most useful?",
        "answer": "They are independent",
        "options": [
          "They are independent",
          "They edit one shared value unsafely",
          "One waits for the other’s result",
          "They require the same locked device"
        ],
        "explanation": "Independent work can run concurrently. Dependencies or shared-resource conflicts can prevent safe simultaneous execution.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-8",
        "prompt": "Why might splitting a tiny task across processors be slower?",
        "answer": "Coordination overhead",
        "options": [
          "Coordination overhead",
          "Parallelism is impossible",
          "Small tasks cannot terminate",
          "Processors cannot communicate"
        ],
        "explanation": "Setup, communication and combining results can cost more time than parallel execution saves for small inputs.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-9",
        "prompt": "Sorted sublists [2, 7] and [1, 5] are merged. What is the final list?",
        "answer": "1, 2, 5, 7",
        "options": [
          "1, 2, 5, 7",
          "2, 7, 1, 5",
          "1, 5, 2, 7",
          "7, 5, 2, 1"
        ],
        "explanation": "Merging repeatedly takes the smallest available front value, preserving ascending order.",
        "skill": "Divide and conquer"
      },
      {
        "id": "222-d-10",
        "prompt": "When does a merge-sort subproblem need no further sorting?",
        "answer": "At zero or one element",
        "options": [
          "At zero or one element",
          "At exactly 10 elements",
          "Whenever the list is unsorted",
          "Only after a full program restart"
        ],
        "explanation": "An empty or single-element list is already sorted and forms a suitable base case.",
        "skill": "Divide and conquer"
      }
    ]
  },
  {
    "id": "222-e",
    "section": "2.2.2",
    "spec": "2.2.2(e)",
    "title": "Using abstraction",
    "lessons": [
      59,
      60
    ],
    "page": 125,
    "questions": [
      {
        "id": "222-e-1",
        "prompt": "A route map keeps junctions and travel times but leaves out building colours. Which technique is used?",
        "answer": "Abstraction",
        "options": [
          "Abstraction",
          "Backtracking",
          "Syntax analysis",
          "Encryption"
        ],
        "explanation": "The representation retains details relevant to routing and omits irrelevant visual detail.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-2",
        "prompt": "Which detail must a fastest-route model retain?",
        "answer": "Travel-time costs",
        "options": [
          "Travel-time costs",
          "Shop sign colours",
          "Driver’s favourite song",
          "Roadside flower colours"
        ],
        "explanation": "Travel times are relevant to the optimisation target. Removing them would stop the model distinguishing faster routes.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-3",
        "prompt": "Why is an abstraction different from reality?",
        "answer": "It deliberately simplifies",
        "options": [
          "It deliberately simplifies",
          "It contains every detail",
          "It cannot represent relationships",
          "It never uses data"
        ],
        "explanation": "A model keeps selected details for a purpose. Simplification makes the task manageable but creates limitations.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-4",
        "prompt": "A lift model records floor and direction. Which extra detail is essential for enforcing a weight limit?",
        "answer": "Current load weight",
        "options": [
          "Current load weight",
          "Button colour",
          "Mirror size",
          "Music track"
        ],
        "explanation": "What is relevant depends on the task. A safety check against a weight limit needs a representation of the load.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-5",
        "prompt": "A queue model ignores accessibility boarding time. Real queues become longer than predicted. What should be reviewed?",
        "answer": "The model’s assumptions",
        "options": [
          "The model’s assumptions",
          "Only the file name",
          "Only the font size",
          "The output colour"
        ],
        "explanation": "The simplification may omit a factor that materially affects service times. Compare assumptions with real behaviour.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-6",
        "prompt": "A school timetable model records teacher, room and time. Which detail is usually irrelevant to clash detection?",
        "answer": "Wall paint colour",
        "options": [
          "Wall paint colour",
          "Room identifier",
          "Teacher identifier",
          "Lesson start time"
        ],
        "explanation": "Clash detection needs resource identities and time intervals. Wall colour does not determine whether bookings overlap.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-7",
        "prompt": "What is the danger of removing a relevant detail from an abstraction?",
        "answer": "Misleading results",
        "options": [
          "Misleading results",
          "A guaranteed syntax error",
          "Automatic encryption",
          "No possible output ever"
        ],
        "explanation": "If an omitted factor affects the question being answered, the model can produce results that are inaccurate or unsuitable.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-8",
        "prompt": "One model predicts fuel use; another checks route connectivity. Must they keep exactly the same details?",
        "answer": "No, purpose determines detail",
        "options": [
          "No, purpose determines detail",
          "Yes, all models are identical",
          "Yes, always keep every detail",
          "No model needs road data"
        ],
        "explanation": "Fuel use may need gradients and vehicle characteristics. Connectivity can often use a simpler graph of links.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-9",
        "prompt": "A game represents a character using position and health instead of human biology. What is the benefit?",
        "answer": "Manageable relevant state",
        "options": [
          "Manageable relevant state",
          "Perfect realism",
          "No programming required",
          "Unlimited accuracy"
        ],
        "explanation": "The simplified state supports game rules without modelling unnecessary biological detail.",
        "skill": "Using abstraction"
      },
      {
        "id": "222-e-10",
        "prompt": "How should a developer judge whether an abstraction is suitable?",
        "answer": "Check it against its purpose",
        "options": [
          "Check it against its purpose",
          "Count its colours",
          "Make it as small as possible",
          "Remove every constraint"
        ],
        "explanation": "A useful abstraction retains enough detail to answer the intended question and is validated against relevant cases.",
        "skill": "Using abstraction"
      }
    ]
  },
  {
    "id": "222-f-backtracking",
    "section": "2.2.2",
    "spec": "2.2.2(f)",
    "title": "Backtracking",
    "lessons": [
      68
    ],
    "page": 127,
    "questions": [
      {
        "id": "222-f-backtracking-1",
        "prompt": "A maze solver reaches a dead end. What does backtracking do next?",
        "answer": "Undo and try another choice",
        "options": [
          "Undo and try another choice",
          "Restart the whole computer",
          "Stay at the dead end",
          "Choose an invalid exit"
        ],
        "explanation": "Backtracking returns to an earlier decision point and explores another available choice.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-2",
        "prompt": "A timetable search assigns two lessons to the same room and time. What should happen to that branch?",
        "answer": "Reject the invalid branch",
        "options": [
          "Reject the invalid branch",
          "Accept the clash",
          "Delete all constraints",
          "Keep adding clashes"
        ],
        "explanation": "A constraint violation means that partial assignment cannot become valid while retaining the conflict, so the branch is rejected.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-3",
        "prompt": "What is pruning in a search tree?",
        "answer": "Discarding unsuitable branches",
        "options": [
          "Discarding unsuitable branches",
          "Sorting every node",
          "Encrypting branch labels",
          "Always finding the nearest node"
        ],
        "explanation": "Pruning avoids exploring branches that cannot produce an acceptable solution under a valid rejection rule.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-4",
        "prompt": "A subset search uses only non-negative values and aims for 6. The current sum is 9. Can this branch be pruned?",
        "answer": "Yes, adding cannot reduce it",
        "options": [
          "Yes, adding cannot reduce it",
          "No, all sums must be explored",
          "Only if 9 is even",
          "Only after finding every subset"
        ],
        "explanation": "With non-negative remaining values, adding more cannot reduce 9 to 6. The assumption about the values makes this pruning rule valid.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-5",
        "prompt": "A search adds 4 to a partial sum of 2, then must undo that choice. What should the restored sum be?",
        "answer": "2",
        "options": [
          "2",
          "0",
          "4",
          "6"
        ],
        "explanation": "Undoing restores the state before the choice. The earlier partial sum of 2 must remain.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-6",
        "prompt": "Which structure naturally records the most recent choices to undo first?",
        "answer": "Stack",
        "options": [
          "Stack",
          "Priority queue only",
          "Hash function",
          "Character set"
        ],
        "explanation": "Backtracking reverses the latest choice first. This is last-in, first-out behaviour, which a stack supports.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-7",
        "prompt": "A backtracking algorithm finds no valid option at a decision point. What should it do?",
        "answer": "Return to the previous choice",
        "options": [
          "Return to the previous choice",
          "Accept an invalid option",
          "Loop at the same point forever",
          "Erase the success criteria"
        ],
        "explanation": "When no extension works, the algorithm returns to a previous decision so another branch can be explored.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-8",
        "prompt": "A subset search allows negative values. Is “prune whenever sum exceeds target” always safe?",
        "answer": "No, a later value may reduce it",
        "options": [
          "No, a later value may reduce it",
          "Yes, for every data set",
          "Yes, if the target is positive",
          "Only the first value matters"
        ],
        "explanation": "A later negative value might reduce an excessive sum to the target. The non-negative assumption cannot be dropped.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-9",
        "prompt": "Which problem is well suited to exploring choices with backtracking?",
        "answer": "Place non-conflicting queens",
        "options": [
          "Place non-conflicting queens",
          "Convert metres to centimetres",
          "Add two integers",
          "Display a fixed message"
        ],
        "explanation": "The queen-placement problem has a sequence of choices constrained by conflicts, allowing invalid partial arrangements to be rejected.",
        "skill": "Backtracking"
      },
      {
        "id": "222-f-backtracking-10",
        "prompt": "Which line belongs immediately after a failed recursive attempt?",
        "answer": "undoChoice()",
        "options": [
          "undoChoice()",
          "keepInvalidChoice()",
          "removeAllRules()",
          "printSuccess()"
        ],
        "explanation": "The choice must be undone before trying the next option, otherwise one branch’s state can corrupt another branch.",
        "skill": "Backtracking",
        "code": "makeChoice()\nif search() == true then\n  return true\nendif\n// missing line",
        "language": "OCR pseudocode"
      }
    ]
  },
  {
    "id": "222-f-data-mining",
    "section": "2.2.2",
    "spec": "2.2.2(f)",
    "title": "Data mining",
    "lessons": [
      69
    ],
    "page": 126,
    "questions": [
      {
        "id": "222-f-data-mining-1",
        "prompt": "A supermarket searches thousands of baskets for products often bought together. Which method is this?",
        "answer": "Data mining",
        "options": [
          "Data mining",
          "Pipelining",
          "Syntax checking",
          "Backtracking only"
        ],
        "explanation": "Data mining searches data for useful patterns or relationships, such as product associations.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-2",
        "prompt": "Customers who buy pasta often buy sauce. What has the analysis identified?",
        "answer": "An association",
        "options": [
          "An association",
          "Proof of causation",
          "A syntax error",
          "A guaranteed future purchase"
        ],
        "explanation": "The items occur together more often in the observed data. This does not prove that buying one causes buying the other.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-3",
        "prompt": "A school finds that revision-app use and attainment are correlated. What can it conclude from correlation alone?",
        "answer": "The measures are associated",
        "options": [
          "The measures are associated",
          "The app caused the grades",
          "Grades caused app use",
          "Every pupil benefits equally"
        ],
        "explanation": "Other factors such as motivation may affect both measures. Correlation alone does not establish cause and effect.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-4",
        "prompt": "Why remove duplicate customer records before analysing purchase patterns?",
        "answer": "To avoid distorted counts",
        "options": [
          "To avoid distorted counts",
          "To prove causation",
          "To make all trends linear",
          "To remove every outlier"
        ],
        "explanation": "Duplicate records can overrepresent some customers and bias the resulting counts and patterns.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-5",
        "prompt": "A shop analyses only its busiest Saturday. What is a risk when predicting a typical week?",
        "answer": "An unrepresentative sample",
        "options": [
          "An unrepresentative sample",
          "Guaranteed perfect accuracy",
          "Too much random memory",
          "No possible associations"
        ],
        "explanation": "A busy day may differ from ordinary weekdays. Patterns from that sample may not generalise to the whole week.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-6",
        "prompt": "A bank flags unusual transaction patterns. What is a sensible use of the result?",
        "answer": "Investigate flagged cases",
        "options": [
          "Investigate flagged cases",
          "Assume every flag proves fraud",
          "Delete every flagged account",
          "Ignore all ordinary activity"
        ],
        "explanation": "An unusual pattern can justify investigation, but legitimate activity may also be unusual. False positives must be considered.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-7",
        "prompt": "Why can analysing millions of records be computationally demanding?",
        "answer": "Many comparisons and features",
        "options": [
          "Many comparisons and features",
          "Data cannot be stored",
          "Patterns require no processing",
          "Every query is constant time"
        ],
        "explanation": "Large data volumes and many possible relationships increase the processing and storage required for analysis.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-8",
        "prompt": "A model learns spending patterns from old data. Shopping habits then change. What should happen?",
        "answer": "Revalidate with current data",
        "options": [
          "Revalidate with current data",
          "Assume the old pattern is permanent",
          "Delete all new records",
          "Stop checking accuracy"
        ],
        "explanation": "Relationships can change over time, so current data is needed to check whether earlier patterns remain useful.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-9",
        "prompt": "A retailer groups customers by similar purchasing behaviour. What can this support?",
        "answer": "Targeted recommendations",
        "options": [
          "Targeted recommendations",
          "Guaranteed individual choices",
          "Proof of personal motives",
          "Removal of all uncertainty"
        ],
        "explanation": "Groups with similar behaviour can inform recommendations, but individuals may differ from their group’s usual pattern.",
        "skill": "Data mining"
      },
      {
        "id": "222-f-data-mining-10",
        "prompt": "A data-mining result appears strong in its training data. What is a useful next check?",
        "answer": "Test on separate data",
        "options": [
          "Test on separate data",
          "Repeat only the same examples",
          "Hide weak predictions",
          "Treat confidence as proof"
        ],
        "explanation": "Separate representative data helps assess whether the detected relationship generalises beyond the data used to discover it.",
        "skill": "Data mining"
      }
    ]
  },
  {
    "id": "222-f-heuristics",
    "section": "2.2.2",
    "spec": "2.2.2(f)",
    "title": "Heuristics",
    "lessons": [
      70
    ],
    "page": 125,
    "questions": [
      {
        "id": "222-f-heuristics-1",
        "prompt": "A route planner uses an estimate to choose promising roads first. What is this estimate used as?",
        "answer": "Heuristic",
        "options": [
          "Heuristic",
          "Exact proof of the best route",
          "Syntax rule",
          "Encryption key"
        ],
        "explanation": "A heuristic uses a useful estimate or rule of thumb to guide a search towards promising choices.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-2",
        "prompt": "Why use a heuristic when exhaustive search would take too long?",
        "answer": "Reduce the search effort",
        "options": [
          "Reduce the search effort",
          "Guarantee no assumptions",
          "Remove all input data",
          "Always prove optimality"
        ],
        "explanation": "A useful heuristic can focus effort on promising candidates and find an acceptable result sooner.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-3",
        "prompt": "Which is a general limitation of heuristic methods?",
        "answer": "May miss the best solution",
        "options": [
          "May miss the best solution",
          "Cannot use numerical data",
          "Always examine every option",
          "Never use estimates"
        ],
        "explanation": "A heuristic is not a general guarantee of optimality. Some particular algorithms have stronger guarantees under stated conditions.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-4",
        "prompt": "A straight-line distance estimate ignores road bends. What does it estimate in route finding?",
        "answer": "Remaining journey distance",
        "options": [
          "Remaining journey distance",
          "Distance already travelled",
          "Number of road names",
          "Exact travel time always"
        ],
        "explanation": "Straight-line distance estimates what remains to the destination. The actual road route can be longer.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-5",
        "prompt": "A* ranks nodes using f = g + h. If g = 7 and h = 5, what is f?",
        "answer": "12",
        "options": [
          "12",
          "2",
          "7",
          "35"
        ],
        "explanation": "g is the cost so far and h estimates the remaining cost. Their sum is 7 + 5 = 12.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-6",
        "prompt": "A* has two candidate nodes: P has g=4, h=8; Q has g=6, h=3. Which has the lower f score?",
        "answer": "Q",
        "options": [
          "Q",
          "P",
          "They tie",
          "Cannot calculate f"
        ],
        "explanation": "P has f=12 and Q has f=9. Q has the lower estimated total cost despite its larger cost so far.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-7",
        "prompt": "A heuristic estimates remaining cost as 10 when the true minimum is 7. Which description applies?",
        "answer": "It overestimates",
        "options": [
          "It overestimates",
          "It underestimates",
          "It is exact",
          "It is always admissible"
        ],
        "explanation": "The estimate is higher than the actual minimum. An admissible heuristic must not overestimate the true minimum remaining cost.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-8",
        "prompt": "A game chooses the move with the most immediate points, without examining later moves. What is a possible weakness?",
        "answer": "It may overlook later gains",
        "options": [
          "It may overlook later gains",
          "It always finds a global optimum",
          "It examines all future states",
          "It never makes any decision"
        ],
        "explanation": "A locally attractive move may lead to a worse overall outcome. This greedy heuristic ignores future consequences.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-9",
        "prompt": "How should a developer compare two scheduling heuristics?",
        "answer": "Test time and solution quality",
        "options": [
          "Test time and solution quality",
          "Compare variable-name length",
          "Count screen colours",
          "Assume shorter code is best"
        ],
        "explanation": "Both resource use and the quality of results matter. Test representative cases against the task’s requirements.",
        "skill": "Heuristics"
      },
      {
        "id": "222-f-heuristics-10",
        "prompt": "A heuristic finds a feasible delivery route quickly. What does feasible mean?",
        "answer": "It meets the constraints",
        "options": [
          "It meets the constraints",
          "It is certainly the shortest",
          "It needs no validation",
          "It visits no addresses"
        ],
        "explanation": "Feasibility means the route obeys the requirements, such as visits and capacity. It does not by itself establish optimality.",
        "skill": "Heuristics"
      }
    ]
  },
  {
    "id": "222-f-performance",
    "section": "2.2.2",
    "spec": "2.2.2(f)",
    "title": "Performance modelling",
    "lessons": [
      70
    ],
    "page": 134,
    "questions": [
      {
        "id": "222-f-performance-1",
        "prompt": "A developer estimates response time before building a full system. Which method is this?",
        "answer": "Performance modelling",
        "options": [
          "Performance modelling",
          "Data encryption",
          "Syntax analysis",
          "Character encoding"
        ],
        "explanation": "A performance model predicts behaviour such as response time, throughput or resource demand under stated assumptions.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-2",
        "prompt": "A model assumes every server request takes exactly one second. What should be checked?",
        "answer": "Whether the assumption is realistic",
        "options": [
          "Whether the assumption is realistic",
          "Whether the filename is short",
          "Whether the logo is green",
          "Whether users like the mouse"
        ],
        "explanation": "Real service times may vary. If the assumption poorly matches the intended workload, the prediction can be misleading.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-3",
        "prompt": "A sequential model has three non-overlapping stages taking 2, 3 and 5 ms. How long does one job take?",
        "answer": "10 ms",
        "options": [
          "10 ms",
          "5 ms",
          "6 ms",
          "30 ms"
        ],
        "explanation": "Without overlap, the job completes all stages one after another: 2 + 3 + 5 = 10 ms.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-4",
        "prompt": "A process completes 120 requests in 60 seconds. What is its average throughput?",
        "answer": "2 requests/s",
        "options": [
          "2 requests/s",
          "0.5 requests/s",
          "60 requests/s",
          "120 requests/s"
        ],
        "explanation": "Throughput is completed work per unit time: 120 ÷ 60 = 2 requests per second.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-5",
        "prompt": "What is latency?",
        "answer": "Time for one item to complete",
        "options": [
          "Time for one item to complete",
          "Items completed per second",
          "Total source-code length",
          "Number of installed fonts"
        ],
        "explanation": "Latency measures delay from a defined start to completion for an individual item. Throughput measures the completion rate.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-6",
        "prompt": "A model predicts 2 seconds but repeated real tests take about 5 seconds. What should happen next?",
        "answer": "Review inputs and assumptions",
        "options": [
          "Review inputs and assumptions",
          "Declare the tests impossible",
          "Hide the measured results",
          "Treat the prediction as certain"
        ],
        "explanation": "Compare the model with measurements and investigate missing costs, inaccurate inputs or unrealistic assumptions.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-7",
        "prompt": "A pipeline has stages taking 2, 6 and 3 ms on separate resources. Which is the bottleneck?",
        "answer": "The 6 ms stage",
        "options": [
          "The 6 ms stage",
          "The 2 ms stage",
          "The 3 ms stage",
          "Every stage equally"
        ],
        "explanation": "The slowest stage limits the sustained completion rate when each stage has one resource and buffering permits overlap.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-8",
        "prompt": "A model predicts that doubling workload will double memory demand. What type of relationship is assumed?",
        "answer": "Linear",
        "options": [
          "Linear",
          "Constant",
          "Logarithmic",
          "Inverse"
        ],
        "explanation": "A direct proportional increase is linear in this model. It should be checked against actual workloads and implementation details.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-9",
        "prompt": "Why test a performance model at peak load as well as average load?",
        "answer": "Peak demand may expose limits",
        "options": [
          "Peak demand may expose limits",
          "Average load is never useful",
          "Peak tests remove all uncertainty",
          "Hardware does not affect results"
        ],
        "explanation": "A system that performs acceptably on average may have long queues or resource shortages during busy periods.",
        "skill": "Performance modelling"
      },
      {
        "id": "222-f-performance-10",
        "prompt": "Which is a fair comparison of two algorithm implementations?",
        "answer": "Same data and conditions",
        "options": [
          "Same data and conditions",
          "Different hardware for each",
          "Only the fastest run of one",
          "Different workloads without noting it"
        ],
        "explanation": "Controlling relevant conditions helps attribute differences to the implementations rather than unrelated test factors.",
        "skill": "Performance modelling"
      }
    ]
  },
  {
    "id": "222-f-pipelining",
    "section": "2.2.2",
    "spec": "2.2.2(f)",
    "title": "Pipelining",
    "lessons": [
      71
    ],
    "page": 134,
    "questions": [
      {
        "id": "222-f-pipelining-1",
        "prompt": "A program reads one item while processing an earlier item and saving another. What technique is demonstrated?",
        "answer": "Pipelining",
        "options": [
          "Pipelining",
          "Backtracking",
          "Data mining",
          "Abstraction only"
        ],
        "explanation": "Different items occupy different stages at the same time, with each item’s result passed to the next stage.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-2",
        "prompt": "Three separate one-cycle stages process four independent jobs with ideal overlap. How many cycles are needed?",
        "answer": "6",
        "options": [
          "6",
          "3",
          "4",
          "12"
        ],
        "explanation": "The first job needs three cycles. Each of the other three completes one cycle later: 3 + 4 − 1 = 6.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-3",
        "prompt": "The same four jobs use three one-cycle stages with no overlap. How many cycles are needed?",
        "answer": "12",
        "options": [
          "12",
          "4",
          "6",
          "7"
        ],
        "explanation": "Each job takes three cycles before the next job starts, so 4 × 3 = 12 cycles.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-4",
        "prompt": "What is the main benefit of a full, balanced pipeline?",
        "answer": "Higher throughput",
        "options": [
          "Higher throughput",
          "Zero latency",
          "No stage dependencies",
          "Instant first result"
        ],
        "explanation": "Once the pipeline fills, different stages work on different items and completed items can emerge more frequently.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-5",
        "prompt": "Why does the first item in a three-stage pipeline still take all three stages?",
        "answer": "It must complete each stage",
        "options": [
          "It must complete each stage",
          "All stages can be skipped",
          "The pipeline has no inputs",
          "Throughput equals stage count"
        ],
        "explanation": "Pipelining overlaps different items. It does not remove the stages an individual item must pass through.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-6",
        "prompt": "A stage needs output from the preceding stage for the same item. What must happen?",
        "answer": "Wait until that output is ready",
        "options": [
          "Wait until that output is ready",
          "Always ignore the dependency",
          "Use a future result",
          "Remove the item’s input"
        ],
        "explanation": "An item’s dependency must be respected even though other items can be processed in other stages at the same time.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-7",
        "prompt": "A pipeline’s first stage is much slower than the others. What is a likely effect?",
        "answer": "Later stages may wait",
        "options": [
          "Later stages may wait",
          "Every stage becomes faster",
          "No item can ever complete",
          "The slow stage is skipped"
        ],
        "explanation": "The slow stage supplies items less frequently, limiting throughput and potentially leaving later stages idle.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-8",
        "prompt": "Five independent jobs pass through four separate one-cycle stages with ideal overlap. How many cycles are needed?",
        "answer": "8",
        "options": [
          "8",
          "4",
          "5",
          "20"
        ],
        "explanation": "For k equal stages and n jobs under ideal assumptions, the completion time is k + n − 1: 4 + 5 − 1 = 8 cycles.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-9",
        "prompt": "Which assumption supports the ideal k + n − 1 cycle calculation?",
        "answer": "Each stage takes one cycle",
        "options": [
          "Each stage takes one cycle",
          "One resource runs all stages",
          "Every job needs the last job’s result",
          "Communication always takes five cycles"
        ],
        "explanation": "The formula assumes equal one-cycle stages, resources that allow overlap, and no stalls or extra transfer costs.",
        "skill": "Pipelining"
      },
      {
        "id": "222-f-pipelining-10",
        "prompt": "A pipeline reduces the total time for a large batch. Must it reduce the processing time of a single item?",
        "answer": "No, not necessarily",
        "options": [
          "No, not necessarily",
          "Yes, always to one cycle",
          "Yes, to zero time",
          "Only if the input is sorted"
        ],
        "explanation": "A pipeline can increase the rate of completed items while leaving a single item’s end-to-end latency unchanged or adding overhead.",
        "skill": "Pipelining"
      }
    ]
  },
  {
    "id": "222-f-visualisation",
    "section": "2.2.2",
    "spec": "2.2.2(f)",
    "title": "Visualisation",
    "lessons": [
      69
    ],
    "page": 126,
    "questions": [
      {
        "id": "222-f-visualisation-1",
        "prompt": "A programmer sketches how values move through a sorting algorithm. What is the purpose?",
        "answer": "Make behaviour easier to reason about",
        "options": [
          "Make behaviour easier to reason about",
          "Guarantee bug-free code",
          "Replace every test",
          "Encrypt the values"
        ],
        "explanation": "A visual representation makes state and changes easier to follow, supporting planning and checking.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-2",
        "prompt": "Which visual best shows the order of decisions and branches in an algorithm?",
        "answer": "Flowchart",
        "options": [
          "Flowchart",
          "Pie chart",
          "Photograph",
          "Colour palette"
        ],
        "explanation": "A flowchart shows control flow with decisions and paths, helping a developer anticipate possible execution routes.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-3",
        "prompt": "A developer needs to compare two numerical variables across many pupils. Which chart best reveals association?",
        "answer": "Scatter chart",
        "options": [
          "Scatter chart",
          "Pie chart",
          "Organisation chart",
          "Single icon"
        ],
        "explanation": "A scatter chart plots paired numerical values and can reveal a relationship, spread or unusual cases.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-4",
        "prompt": "A teacher compares the number of pupils in each club. Which chart is most suitable?",
        "answer": "Bar chart",
        "options": [
          "Bar chart",
          "Scatter chart",
          "Continuous waveform",
          "Call-stack diagram"
        ],
        "explanation": "Clubs are categories. Bar heights can represent and compare the count in each category.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-5",
        "prompt": "Which visual helps trace successive variable values through a loop?",
        "answer": "Trace table",
        "options": [
          "Trace table",
          "Pie chart",
          "Class logo",
          "Colour wheel"
        ],
        "explanation": "A trace table records state at chosen execution steps, helping predict output and find incorrect updates.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-6",
        "prompt": "A developer wants to inspect possible maze choices and dead ends. Which representation is most useful?",
        "answer": "Search tree",
        "options": [
          "Search tree",
          "Pie chart",
          "Font list",
          "Unlabelled photograph"
        ],
        "explanation": "A search tree makes branching decisions and rejected paths explicit, supporting backtracking analysis.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-7",
        "prompt": "A histogram is especially suited to displaying what?",
        "answer": "Frequencies in numeric intervals",
        "options": [
          "Frequencies in numeric intervals",
          "Arbitrary class relationships",
          "Individual method calls",
          "Only geographical routes"
        ],
        "explanation": "A histogram groups numerical observations into intervals and shows their frequencies; category comparisons usually use a bar chart.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-8",
        "prompt": "Why label axes and units on a performance graph?",
        "answer": "To make the measures interpretable",
        "options": [
          "To make the measures interpretable",
          "To guarantee the model is true",
          "To remove data bias",
          "To prevent every outlier"
        ],
        "explanation": "Readers need to know what is measured and in which units before they can interpret values or compare trends.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-9",
        "prompt": "A bar chart’s vertical axis starts at 95, exaggerating a change from 98 to 100. What is the concern?",
        "answer": "Misleading visual scale",
        "options": [
          "Misleading visual scale",
          "Too many valid data points",
          "Proof of causation",
          "A guaranteed computation error"
        ],
        "explanation": "A truncated axis can exaggerate differences in bar lengths. The scale and presentation should reflect the intended comparison fairly.",
        "skill": "Visualisation"
      },
      {
        "id": "222-f-visualisation-10",
        "prompt": "A diagram omits an important branch of a program. What is the main risk?",
        "answer": "Incorrect prediction of behaviour",
        "options": [
          "Incorrect prediction of behaviour",
          "Automatic code repair",
          "Guaranteed faster execution",
          "No need for validation"
        ],
        "explanation": "A visual model must represent relevant behaviour accurately. Missing a branch can cause a developer to overlook a possible execution path.",
        "skill": "Visualisation"
      }
    ]
  }
];
