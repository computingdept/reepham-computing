// Original RHSC MCQ practice aligned to OCR H446 2.1.1–2.1.5.
const SKILLS = [
  {
    "id": "21-1",
    "section": "2.1",
    "spec": "2.1.1",
    "title": "Thinking abstractly",
    "lessons": [
      59,
      60
    ],
    "page": 111,
    "questions": [
      {
        "id": "21-1-1",
        "spec": "2.1.1(a)",
        "prompt": "An airport diagram shows terminals and walkways but omits window positions. What has the designer done?",
        "answer": "Selected relevant detail",
        "options": [
          "Selected relevant detail",
          "Recorded every physical detail",
          "Predicted passenger numbers",
          "Ordered program instructions"
        ],
        "explanation": "The diagram is an abstraction: it retains the information needed for navigation and leaves out details that do not help with that task.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-2",
        "spec": "2.1.1(b)",
        "prompt": "A simulator represents each raindrop individually, but only total rainfall is needed. Why simplify it?",
        "answer": "Reduce unnecessary complexity",
        "options": [
          "Reduce unnecessary complexity",
          "Guarantee perfect accuracy",
          "Remove the need for inputs",
          "Make rainfall predictable"
        ],
        "explanation": "Keeping only the detail needed for the purpose can reduce processing and storage requirements and make the model easier to understand.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-3",
        "spec": "2.1.1(d)",
        "prompt": "A ferry-booking model must prevent overloading the vehicle deck. Which data should it retain?",
        "answer": "Vehicle space requirements",
        "options": [
          "Vehicle space requirements",
          "Vehicle paint colours",
          "Passengers’ favourite films",
          "Booking-page font choices"
        ],
        "explanation": "The model needs data that determines whether vehicles fit within capacity. Paint colour does not affect the required deck space.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-4",
        "spec": "2.1.1(c)",
        "prompt": "A game models a football as a point. What limitation follows?",
        "answer": "Its size is not represented",
        "options": [
          "Its size is not represented",
          "Its position cannot be stored",
          "It must move at constant speed",
          "It cannot have a direction"
        ],
        "explanation": "A point model can retain position and movement while omitting the ball’s physical dimensions. That may be unsuitable for detailed collision checks.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-5",
        "spec": "2.1.1(d)",
        "prompt": "A music app must find songs by artist. Which model is most useful?",
        "answer": "Song ID, title and artist",
        "options": [
          "Song ID, title and artist",
          "Song ID and screen colour",
          "Title and button position",
          "Artist and keyboard layout"
        ],
        "explanation": "An abstract record should retain the fields needed for searching and identifying results. The artist field supports the required search.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-6",
        "spec": "2.1.1(a)",
        "prompt": "A chess program represents a bishop by its square and permitted moves. Which statement best describes this representation?",
        "answer": "A model of relevant features",
        "options": [
          "A model of relevant features",
          "A complete physical replica",
          "A schedule of all future moves",
          "A record of every human thought"
        ],
        "explanation": "An abstraction represents selected properties and rules needed by the program rather than every feature of the real object.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-7",
        "spec": "2.1.1(b)",
        "prompt": "Why might an engineer use a simplified bridge model before a full simulation?",
        "answer": "Explore key relationships cheaply",
        "options": [
          "Explore key relationships cheaply",
          "Prove every design is safe",
          "Avoid all later validation",
          "Include every material detail"
        ],
        "explanation": "A simpler model can help explore relevant relationships with less work. Its results still depend on assumptions and need suitable validation.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-8",
        "spec": "2.1.1(c)",
        "prompt": "A flood model assumes drains never block. Real drains become blocked. What is the concern?",
        "answer": "The model may underpredict flooding",
        "options": [
          "The model may underpredict flooding",
          "The model becomes exact",
          "The program must have a syntax error",
          "The assumption proves no risk"
        ],
        "explanation": "An abstraction can differ from reality in a way that affects its predictions. A relevant assumption must be reviewed when conditions change.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-9",
        "spec": "2.1.1(d)",
        "prompt": "A walking-route app is being adapted for wheelchair users. Which extra information is most relevant?",
        "answer": "Steps and accessible gradients",
        "options": [
          "Steps and accessible gradients",
          "Nearby shop logos",
          "Street-name font sizes",
          "Building paint colours"
        ],
        "explanation": "What counts as relevant changes with the model’s purpose. Accessibility planning needs information about barriers and usable routes.",
        "skill": "Thinking abstractly"
      },
      {
        "id": "21-1-10",
        "spec": "2.1.1(a)",
        "prompt": "A programmer replaces detailed customer objects with customer IDs when checking duplicate bookings. What is the key question?",
        "answer": "Do IDs retain what the check needs?",
        "options": [
          "Do IDs retain what the check needs?",
          "Are IDs always shorter than names?",
          "Does every record use more memory?",
          "Can all customer data be deleted?"
        ],
        "explanation": "A representation is useful when it preserves the information needed for its task. Unique IDs can identify repeated customers without carrying unrelated attributes.",
        "skill": "Thinking abstractly"
      }
    ]
  },
  {
    "id": "21-2",
    "section": "2.1",
    "spec": "2.1.2",
    "title": "Thinking ahead",
    "lessons": [
      61,
      239
    ],
    "page": 112,
    "questions": [
      {
        "id": "21-2-1",
        "spec": "2.1.2(a)",
        "prompt": "A parcel-pricing function receives mass and delivery zone. Which is its intended output?",
        "answer": "Calculated delivery charge",
        "options": [
          "Calculated delivery charge",
          "Entered parcel mass",
          "Selected delivery zone",
          "The pricing table input"
        ],
        "explanation": "Inputs supply the information to process. The function produces a delivery charge from those inputs and the relevant pricing rules.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-2",
        "spec": "2.1.2(b)",
        "prompt": "A function returns the first element of an array without checking its size. Which precondition is necessary?",
        "answer": "The array is nonempty",
        "options": [
          "The array is nonempty",
          "The array is sorted",
          "Every value is positive",
          "The length is an even number"
        ],
        "explanation": "At least one element must exist for an unconditional access to the first element to be valid. Sorting is irrelevant to this operation.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-3",
        "spec": "2.1.2(c)",
        "prompt": "A graphics program stores the result of an expensive calculation for later identical requests. What is this called?",
        "answer": "Caching",
        "options": [
          "Caching",
          "Backtracking",
          "Decomposition",
          "Compilation"
        ],
        "explanation": "Caching stores a result or data so a later request can reuse it instead of repeating the original work.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-4",
        "spec": "2.1.2(c)",
        "prompt": "The same valid cached result is requested repeatedly. What is a likely benefit?",
        "answer": "Less repeated computation",
        "options": [
          "Less repeated computation",
          "No memory is used",
          "Every result becomes newer",
          "Every request is a cache miss"
        ],
        "explanation": "A cache hit can avoid repeating an expensive calculation or retrieval. The cache itself uses storage and has management costs.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-5",
        "spec": "2.1.2(d)",
        "prompt": "Two school apps need the same email-address validation rule. What should be planned?",
        "answer": "A reusable validation component",
        "options": [
          "A reusable validation component",
          "Two unrelated copies of the rule",
          "A global variable for every input",
          "A separate rule for every screen"
        ],
        "explanation": "A reusable component provides a consistent implementation and reduces duplication. Its interface and expected behaviour must be defined clearly.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-6",
        "spec": "2.1.2(a)",
        "prompt": "A temperature-alert program receives sensor readings and a threshold. Which is an input?",
        "answer": "The threshold value",
        "options": [
          "The threshold value",
          "The displayed alert",
          "The generated warning sound",
          "The decision to switch a fan on"
        ],
        "explanation": "The threshold is supplied to the decision process. Alerts or control decisions are outputs produced by processing the inputs.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-7",
        "spec": "2.1.2(b)",
        "prompt": "A function calculates an average by dividing by the number of readings. Which precondition avoids division by zero?",
        "answer": "At least one reading exists",
        "options": [
          "At least one reading exists",
          "Every reading is different",
          "The readings are sorted",
          "The first reading is zero"
        ],
        "explanation": "The divisor is the count of readings. A nonempty set gives a positive count; an empty set needs separate handling.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-8",
        "spec": "2.1.2(c)",
        "prompt": "A train timetable is cached. The source timetable changes, but the cache is not refreshed. What is the main risk?",
        "answer": "Outdated departures are shown",
        "options": [
          "Outdated departures are shown",
          "The cache cannot be read",
          "All trains stop running",
          "The data is automatically corrected"
        ],
        "explanation": "Cached data can become stale. Refreshing or invalidating entries when source data changes helps prevent incorrect results.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-9",
        "spec": "2.1.2(c)",
        "prompt": "An application caches thousands of results that are never requested again. What is a drawback?",
        "answer": "Storage without useful reuse",
        "options": [
          "Storage without useful reuse",
          "Guaranteed faster responses",
          "The original work is avoided",
          "No cache-management cost"
        ],
        "explanation": "Caching consumes storage and incurs management overhead. It is less useful when stored values are unlikely to be reused.",
        "skill": "Thinking ahead"
      },
      {
        "id": "21-2-10",
        "spec": "2.1.2(d)",
        "prompt": "A developer plans to reuse an existing payment component. What must be checked before integration?",
        "answer": "Its interface meets requirements",
        "options": [
          "Its interface meets requirements",
          "Its code has the fewest lines",
          "It uses identical local names",
          "Its logo matches the app"
        ],
        "explanation": "A reusable component must provide the required behaviour through compatible inputs and outputs. Reuse does not remove the need to check suitability and integration.",
        "skill": "Thinking ahead"
      }
    ]
  },
  {
    "id": "21-3",
    "section": "2.1",
    "spec": "2.1.3",
    "title": "Thinking procedurally",
    "lessons": [
      62
    ],
    "page": 111,
    "questions": [
      {
        "id": "21-3-1",
        "spec": "2.1.3(a)",
        "prompt": "A photo service must accept an upload, resize the image and store it. What is a useful first analysis step?",
        "answer": "Identify these component tasks",
        "options": [
          "Identify these component tasks",
          "Choose output colours first",
          "Combine every action in one line",
          "Ignore the storage requirement"
        ],
        "explanation": "Thinking procedurally starts by identifying the parts that make up the problem, then planning how a solution will handle them.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-2",
        "spec": "2.1.3(b)",
        "prompt": "A photo service has identified resizing as a requirement. Which is a component of its solution?",
        "answer": "A resizeImage subprocedure",
        "options": [
          "A resizeImage subprocedure",
          "The user’s screen wallpaper",
          "The camera’s paint colour",
          "The operating-system theme"
        ],
        "explanation": "A solution component implements a required part of the task. A resizeImage subprocedure can have a defined input image and output image.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-3",
        "spec": "2.1.3(c)",
        "prompt": "A delivery app must obtain an address, calculate postage and display the charge. Which order respects the dependencies?",
        "answer": "Address → calculate → display",
        "options": [
          "Address → calculate → display",
          "Display → calculate → address",
          "Calculate → display → address",
          "Display → address → calculate"
        ],
        "explanation": "The calculation needs the address, and displaying the charge needs the calculated result. The required data must exist before each step uses it.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-4",
        "spec": "2.1.3(d)",
        "prompt": "A quiz app needs to determine a score from a list of answers. Which subprocedure has the clearest responsibility?",
        "answer": "calculateScore(answers)",
        "options": [
          "calculateScore(answers)",
          "changeThemeAndScore()",
          "doEverything()",
          "startAndDeleteResults()"
        ],
        "explanation": "A focused subprocedure has a clear job and interface. Scoring the answers can be separated from display or unrelated settings.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-5",
        "spec": "2.1.3(c)",
        "prompt": "A program writes a report before calculating its totals. What planning error is most likely?",
        "answer": "Steps violate a dependency",
        "options": [
          "Steps violate a dependency",
          "Too many valid modules",
          "All variables are immutable",
          "The report is too abstract"
        ],
        "explanation": "The report requires the totals. Calculating them after the report is written puts dependent steps in the wrong order.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-6",
        "spec": "2.1.3(a)",
        "prompt": "A cinema kiosk must sell a ticket, take payment and issue a receipt. What must the analysis identify?",
        "answer": "The required tasks and constraints",
        "options": [
          "The required tasks and constraints",
          "Only the final receipt colour",
          "Only the number of code files",
          "Only the quickest payment brand"
        ],
        "explanation": "The problem includes related tasks and requirements such as selecting a valid seat and obtaining payment. These need to be identified before implementation.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-7",
        "spec": "2.1.3(b)",
        "prompt": "A program has input validation, calculation and output requirements. What should a procedural design specify?",
        "answer": "How solution components interact",
        "options": [
          "How solution components interact",
          "Only their filenames",
          "Only their screen positions",
          "Only the compiler version"
        ],
        "explanation": "A useful procedural design identifies components and the flow of control and data between them, rather than just naming files.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-8",
        "spec": "2.1.3(d)",
        "prompt": "Three reports need the same currency-formatting behaviour. Which subprocedure is most reusable?",
        "answer": "formatCurrency(value)",
        "options": [
          "formatCurrency(value)",
          "formatOnlyToday’sReport()",
          "printEverythingAndExit()",
          "setAllGlobalVariables()"
        ],
        "explanation": "A parameterised subprocedure with a focused purpose can serve different reports. It avoids tying the formatting rule to one particular report.",
        "skill": "Thinking procedurally"
      },
      {
        "id": "21-3-9",
        "spec": "2.1.3(c)",
        "prompt": "A program executes the subprocedures in this order. What is printed?",
        "answer": "11",
        "options": [
          "11",
          "5",
          "6",
          "10"
        ],
        "explanation": "getValue supplies 5, addSix returns 11, and print then displays that returned value. The call order follows the data dependency.",
        "skill": "Thinking procedurally",
        "code": "function getValue()\n  return 5\nendfunction\nfunction addSix(x)\n  return x + 6\nendfunction\nvalue = getValue()\nvalue = addSix(value)\nprint(value)",
        "language": "OCR pseudocode"
      },
      {
        "id": "21-3-10",
        "spec": "2.1.3(d)",
        "prompt": "A booking app repeatedly needs to check whether a requested seat exists. What should be extracted?",
        "answer": "A seat-validation subprocedure",
        "options": [
          "A seat-validation subprocedure",
          "A new copy for each call",
          "A display-colour constant",
          "A separate application each time"
        ],
        "explanation": "A subprocedure can encapsulate the seat check and be called wherever it is required, with a clear input and result.",
        "skill": "Thinking procedurally"
      }
    ]
  },
  {
    "id": "21-4",
    "section": "2.1",
    "spec": "2.1.4",
    "title": "Thinking logically",
    "lessons": [
      63
    ],
    "page": 113,
    "questions": [
      {
        "id": "21-4-1",
        "spec": "2.1.4(a)",
        "prompt": "A car-park exit charges only when the stay exceeds two hours. Where is a decision needed?",
        "answer": "Before choosing whether to charge",
        "options": [
          "Before choosing whether to charge",
          "Only when naming variables",
          "Only after printing the receipt",
          "Only when saving the source file"
        ],
        "explanation": "The program must branch according to the duration before it chooses the appropriate charge or free-exit action.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-2",
        "spec": "2.1.4(b)",
        "prompt": "A club admits a person only if they are a member AND have a valid pass. Member is true and validPass is false. What is the outcome?",
        "answer": "Admission refused",
        "options": [
          "Admission refused",
          "Admission granted",
          "Both branches run",
          "No decision is possible"
        ],
        "explanation": "AND requires both conditions to be true. A false validPass makes the combined admission condition false.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-3",
        "spec": "2.1.4(b)",
        "prompt": "An alert is raised if smokeDetected OR manualAlarm is true. Smoke is false and manualAlarm is true. What happens?",
        "answer": "The alert is raised",
        "options": [
          "The alert is raised",
          "No alert is raised",
          "Both inputs must be true",
          "The condition is undefined"
        ],
        "explanation": "OR is true when at least one operand is true. The manual alarm is enough to trigger this rule.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-4",
        "spec": "2.1.4(c)",
        "prompt": "For a score of 85, which result does this code print?",
        "answer": "Pass",
        "options": [
          "Pass",
          "Distinction",
          "Both messages",
          "No message"
        ],
        "explanation": "The first true branch runs and the elseif branch is skipped. To prioritise Distinction, test score >= 80 before score >= 50.",
        "skill": "Thinking logically",
        "code": "score = 85\nif score >= 50 then\n  print(\"Pass\")\nelseif score >= 80 then\n  print(\"Distinction\")\nendif",
        "language": "OCR pseudocode"
      },
      {
        "id": "21-4-5",
        "spec": "2.1.4(a)",
        "prompt": "A password-recovery system must choose between sending a reset link and rejecting an unknown account. Which check belongs at the decision point?",
        "answer": "Does the account exist?",
        "options": [
          "Does the account exist?",
          "What font is in use?",
          "Is the screen wide?",
          "How long is the filename?"
        ],
        "explanation": "The branch depends on whether the account exists. That Boolean condition determines which of the specified actions is appropriate.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-6",
        "spec": "2.1.4(b)",
        "prompt": "A validated temperature must be from 2 to 8 inclusive. Which condition accepts exactly that range?",
        "answer": "t >= 2 AND t <= 8",
        "options": [
          "t >= 2 AND t <= 8",
          "t >= 2 OR t <= 8",
          "t > 2 AND t < 8",
          "t < 2 AND t > 8"
        ],
        "explanation": "Both bounds must hold, and inclusive comparisons admit the endpoints 2 and 8. OR would accept values outside the intended range.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-7",
        "spec": "2.1.4(c)",
        "prompt": "A valid order must pass payment verification before dispatch. What should the failed-payment branch do?",
        "answer": "Prevent dispatch",
        "options": [
          "Prevent dispatch",
          "Always dispatch anyway",
          "Skip every later check",
          "Mark payment as verified"
        ],
        "explanation": "The decision must control subsequent flow so that an unverified order cannot reach the dispatch action under this rule.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-8",
        "spec": "2.1.4(b)",
        "prompt": "A door opens when NOT locked is true. If locked is true, what is NOT locked?",
        "answer": "False",
        "options": [
          "False",
          "True",
          "1 and 0 together",
          "Unknown"
        ],
        "explanation": "NOT reverses a Boolean value. Since locked is true, NOT locked is false and this condition does not permit opening.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-9",
        "spec": "2.1.4(a)",
        "prompt": "A program repeatedly asks for a quantity until it is positive. At which point must a decision occur?",
        "answer": "After each quantity is entered",
        "options": [
          "After each quantity is entered",
          "Only before the program starts",
          "Only when the file is named",
          "Only after all prompts have ended"
        ],
        "explanation": "Each entered quantity must be checked to decide whether to repeat the prompt or proceed with a valid value.",
        "skill": "Thinking logically"
      },
      {
        "id": "21-4-10",
        "spec": "2.1.4(c)",
        "prompt": "The two if statements are independent. For x = 7, which messages are printed?",
        "answer": "Both messages",
        "options": [
          "Both messages",
          "Only Above five",
          "Only Below ten",
          "Neither message"
        ],
        "explanation": "Both conditions are true and each if is evaluated separately. This differs from an if/elseif structure where only one branch runs.",
        "skill": "Thinking logically",
        "code": "x = 7\nif x > 5 then\n  print(\"Above five\")\nendif\nif x < 10 then\n  print(\"Below ten\")\nendif",
        "language": "OCR pseudocode"
      }
    ]
  },
  {
    "id": "21-5",
    "section": "2.1",
    "spec": "2.1.5",
    "title": "Thinking concurrently",
    "lessons": [
      64
    ],
    "page": 101,
    "questions": [
      {
        "id": "21-5-1",
        "spec": "2.1.5(a)",
        "prompt": "A video editor can generate a thumbnail and calculate an audio waveform from the same read-only file. Neither task needs the other’s result. What makes overlap possible?",
        "answer": "The tasks are independent",
        "options": [
          "The tasks are independent",
          "They overwrite the same variable",
          "Each waits for the other",
          "They need one exclusive device"
        ],
        "explanation": "Independent processing can overlap when resources allow. Sharing read-only input does not by itself create a conflicting update.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-2",
        "spec": "2.1.5(b)",
        "prompt": "Independent tasks take 4 and 7 seconds on separate resources. With ideal simultaneous execution and no overhead, when are both finished?",
        "answer": "After 7 seconds",
        "options": [
          "After 7 seconds",
          "After 4 seconds",
          "After 11 seconds",
          "After 28 seconds"
        ],
        "explanation": "Both can start together. Completion waits for the longer task, so the ideal combined time is max(4, 7) = 7 seconds.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-3",
        "spec": "2.1.5(a)",
        "prompt": "A checksum must use the final contents of a newly generated file. Which dependency must be respected?",
        "answer": "Generate the file before its checksum",
        "options": [
          "Generate the file before its checksum",
          "Calculate checksum before any data",
          "Both need no shared information",
          "The checksum determines the file size"
        ],
        "explanation": "The checksum depends on the completed file in this scenario. Running it before that data exists would violate the dependency.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-4",
        "spec": "2.1.5(b)",
        "prompt": "Two tasks update the same counter without coordination. What is a possible risk?",
        "answer": "A lost update",
        "options": [
          "A lost update",
          "Guaranteed faster updates",
          "No memory access",
          "Automatic sorting"
        ],
        "explanation": "Both tasks may read the same old value and then overwrite one another’s changes. Shared mutable state needs suitable coordination.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-5",
        "spec": "2.1.5(b)",
        "prompt": "Why might creating threads for two tiny calculations increase total time?",
        "answer": "Coordination overhead",
        "options": [
          "Coordination overhead",
          "Threads remove all computation",
          "Small calculations cannot overlap",
          "All results become incorrect"
        ],
        "explanation": "Thread creation, scheduling and communication can cost more time than concurrency saves for very small tasks.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-6",
        "spec": "2.1.5(a)",
        "prompt": "A report needs a summary after both a sales calculation and a stock calculation. Which plan respects the dependencies?",
        "answer": "Overlap calculations, then summarise",
        "options": [
          "Overlap calculations, then summarise",
          "Summarise before both calculations",
          "Run the summary without results",
          "Discard one calculation’s output"
        ],
        "explanation": "The independent calculations may overlap, but the summary must wait until both required outputs are ready.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-7",
        "spec": "2.1.5(b)",
        "prompt": "A single-core CPU switches between two unfinished tasks. What does this demonstrate?",
        "answer": "Concurrency without parallel execution",
        "options": [
          "Concurrency without parallel execution",
          "Two instructions at once on that core",
          "No concurrent progress is possible",
          "Both tasks must share all variables"
        ],
        "explanation": "Concurrency can interleave progress on a single core. Parallel execution means work actually runs simultaneously on separate execution resources.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-8",
        "spec": "2.1.5(a)",
        "prompt": "Two tasks both need exclusive use of one printer. What limits their simultaneous printing?",
        "answer": "A shared-resource conflict",
        "options": [
          "A shared-resource conflict",
          "Different local variable names",
          "Different source-file lengths",
          "The use of separate input data"
        ],
        "explanation": "The same exclusive device cannot perform both jobs at once. They need scheduling or coordination even if other parts of the tasks can overlap.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-9",
        "spec": "2.1.5(a)",
        "prompt": "Tasks A and B are independent. Task C needs both outputs. A takes 3 seconds, B takes 5 and C takes 2. What is the ideal total on sufficient separate resources, without overhead?",
        "answer": "7 seconds",
        "options": [
          "7 seconds",
          "5 seconds",
          "8 seconds",
          "10 seconds"
        ],
        "explanation": "A and B overlap for max(3, 5) = 5 seconds. C then takes 2 more, giving 7 seconds in total.",
        "skill": "Thinking concurrently"
      },
      {
        "id": "21-5-10",
        "spec": "2.1.5(b)",
        "prompt": "A shared list can be changed by two concurrent tasks. What is a suitable safeguard?",
        "answer": "Coordinate critical updates",
        "options": [
          "Coordinate critical updates",
          "Assume updates are always atomic",
          "Remove every validity check",
          "Let both overwrite any state"
        ],
        "explanation": "Appropriate synchronisation, such as locking a critical section, can protect shared updates. This coordination can introduce waiting and overhead.",
        "skill": "Thinking concurrently"
      }
    ]
  }
];
