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
  },
  {
    "id": "21-assumptions",
    "section": "2.1",
    "spec": "2.1.1(c,d)",
    "title": "Abstraction: assumptions and model validity",
    "lessons": [
      59,
      60
    ],
    "page": 111,
    "questions": [
      {
        "id": "21-assumptions-1",
        "prompt": "A route model assumes every train runs exactly on schedule. Which real event most directly tests that assumption?",
        "answer": "A significant train delay",
        "options": [
          "A significant train delay",
          "A change in station wall colour",
          "A new poster design",
          "A new logo font"
        ],
        "explanation": "Unexpected delays challenge the assumed journey times, whereas decoration does not affect that model's objective.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-2",
        "prompt": "A model gives correct results for typical journeys but is wrong when a lift is closed. What is the strongest conclusion?",
        "answer": "The model may omit a constraint needed for accessible routes",
        "options": [
          "The model may omit a constraint needed for accessible routes",
          "The model must represent every station's appearance",
          "All abstraction is invalid",
          "The journey-time weights are automatically wrong"
        ],
        "explanation": "The model must retain accessibility constraints when its purpose includes accessible routing.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-3",
        "prompt": "A library reminder model uses due date and whether a book is returned. Which additional field matters when renewals are allowed?",
        "answer": "The revised due date",
        "options": [
          "The revised due date",
          "Cover colour",
          "Shelf paint",
          "Book jacket font"
        ],
        "explanation": "A renewal changes whether the loan is overdue, so the revised date affects the output.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-4",
        "prompt": "Which test best validates an abstract model of overdue notices?",
        "answer": "Compare predicted notices with real boundary and exception cases",
        "options": [
          "Compare predicted notices with real boundary and exception cases",
          "Check that the diagram uses attractive colours",
          "Count the number of variable names",
          "Assume a normal case proves correctness"
        ],
        "explanation": "Model validation checks its predictions against realistic and boundary cases.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-5",
        "prompt": "A map removes platform-accessibility information. When should that detail be restored?",
        "answer": "When the task requires a step-free route",
        "options": [
          "When the task requires a step-free route",
          "Whenever a map is displayed in colour",
          "Only when every journey is the same length",
          "Only if the station names are abbreviated"
        ],
        "explanation": "Relevance is defined by the task's constraints, not a fixed list of details to discard.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-6",
        "prompt": "A sales model assumes a product's price never changes, but the shop runs timed discounts. What is most likely wrong?",
        "answer": "The assumption can give incorrect totals at discount times",
        "options": [
          "The assumption can give incorrect totals at discount times",
          "The model has too many input variables",
          "Every discounted sale must be excluded",
          "The model's output must be a text string"
        ],
        "explanation": "If price depends on time, omitting time or the applicable price can make results incorrect.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-7",
        "prompt": "Which is a useful assumption to state when comparing two algorithms on the same workload?",
        "answer": "Both receive the same input data under comparable conditions",
        "options": [
          "Both receive the same input data under comparable conditions",
          "One algorithm may have less data without reporting it",
          "Clock speed cannot affect execution time",
          "Memory requirements never matter"
        ],
        "explanation": "A fair comparison needs comparable workloads and a declared measurement setup.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-8",
        "prompt": "A model's objective changes from shortest distance to shortest journey time. Which data probably becomes necessary?",
        "answer": "Travel-time costs for each usable connection",
        "options": [
          "Travel-time costs for each usable connection",
          "The alphabetic order of station names",
          "The physical colour of route lines",
          "A different font for distances"
        ],
        "explanation": "The objective defines the edge weight; distance alone may not determine time.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-9",
        "prompt": "An abstraction excludes a rare exception that changes the required output. What should the developer do?",
        "answer": "Revise the model and test the exception",
        "options": [
          "Revise the model and test the exception",
          "Keep the model unchanged because the case is rare",
          "Add unrelated detail to every record",
          "Replace validation with a simpler diagram"
        ],
        "explanation": "Relevant exceptions must be included or handled explicitly for correctness.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      },
      {
        "id": "21-assumptions-10",
        "prompt": "A library-notice model works for returned books but incorrectly notifies loans returned just before closing. Which is the best first investigation?",
        "answer": "Check how return times and overdue boundaries are represented",
        "options": [
          "Check how return times and overdue boundaries are represented",
          "Remove borrower identifiers",
          "Increase the screen resolution",
          "Sort the books by colour"
        ],
        "explanation": "The output depends on return timing and boundary policy; inspect those assumptions first.",
        "skill": "Abstraction: assumptions and model validity",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 12–15"
      }
    ]
  },
  {
    "id": "21-caching",
    "section": "2.1",
    "spec": "2.1.2(c)",
    "title": "Thinking ahead: caching",
    "lessons": [
      61
    ],
    "page": 112,
    "questions": [
      {
        "id": "21-caching-1",
        "prompt": "A computed result is reused for the same valid inputs. What is the main potential benefit of caching it?",
        "answer": "Avoiding repeated expensive computation",
        "options": [
          "Avoiding repeated expensive computation",
          "Making the algorithm always correct",
          "Reducing every output's size",
          "Removing the need for invalidation"
        ],
        "explanation": "A cache trades storage and maintenance for less repeated processing.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-2",
        "prompt": "A timetable is updated but cached journey times remain unchanged. What problem occurs?",
        "answer": "Stale cached data",
        "options": [
          "Stale cached data",
          "A guaranteed cache hit with correct data",
          "A stack overflow caused by a cache",
          "An improved accuracy guarantee"
        ],
        "explanation": "Cached values can become out of date when their sources change.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-3",
        "prompt": "Which situation is most likely to benefit from caching?",
        "answer": "An expensive result requested repeatedly with unchanged inputs",
        "options": [
          "An expensive result requested repeatedly with unchanged inputs",
          "A one-off calculation never reused",
          "A result that changes on every read",
          "Data that must never be stored"
        ],
        "explanation": "Repeated use of a stable expensive result makes the saved computation valuable.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-4",
        "prompt": "A cache returns the stored result for a matching request. What is this called?",
        "answer": "Cache hit",
        "options": [
          "Cache hit",
          "Cache miss",
          "Cache invalidation",
          "Cache eviction"
        ],
        "explanation": "A hit means a suitable stored result was found.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-5",
        "prompt": "A requested result is not in the cache. What is the normal next step?",
        "answer": "Compute or fetch the result before optionally storing it",
        "options": [
          "Compute or fetch the result before optionally storing it",
          "Return an unrelated stored value",
          "Assume the result must be zero",
          "Mark all other entries invalid"
        ],
        "explanation": "A cache miss requires a valid fallback before the new result can be cached.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-6",
        "prompt": "A cache stores a price quote keyed only by product ID even though price depends on delivery region. What is the flaw?",
        "answer": "The key omits an input that changes the result",
        "options": [
          "The key omits an input that changes the result",
          "The key is too long",
          "The price should never be cached",
          "The algorithm uses a number rather than text"
        ],
        "explanation": "Cache keys must distinguish inputs on which the output depends.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-7",
        "prompt": "What is a realistic drawback of caching a very large number of rarely reused results?",
        "answer": "Additional memory usage with little time saved",
        "options": [
          "Additional memory usage with little time saved",
          "Automatic elimination of memory use",
          "Guaranteed improvement for every request",
          "Loss of all ability to calculate new values"
        ],
        "explanation": "Cache entries consume resources and are not always worth keeping.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-8",
        "prompt": "A school website caches a revision-page list but the list changes when a new unit is published. What is an appropriate design decision?",
        "answer": "Invalidate or refresh the cache when the list changes",
        "options": [
          "Invalidate or refresh the cache when the list changes",
          "Keep old entries indefinitely",
          "Stop checking the source permanently",
          "Treat stale entries as the only truth"
        ],
        "explanation": "Cache invalidation keeps the stored view consistent with the underlying data.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-9",
        "prompt": "What can happen if two different requests mistakenly use the same cache key?",
        "answer": "An incorrect result can be returned for one request",
        "options": [
          "An incorrect result can be returned for one request",
          "The result must become faster and correct",
          "The cache automatically distinguishes requests",
          "Both inputs become identical"
        ],
        "explanation": "A key collision at the application level can reuse data from the wrong request.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      },
      {
        "id": "21-caching-10",
        "prompt": "When is caching less appropriate?",
        "answer": "When results change continually and validity cannot be checked cheaply",
        "options": [
          "When results change continually and validity cannot be checked cheaply",
          "When results are costly and repeat often",
          "When unchanged inputs yield identical outputs",
          "When a bounded cache fits available memory"
        ],
        "explanation": "Frequent change can create invalidation costs and make cached values unreliable.",
        "skill": "Thinking ahead: caching",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 20–23"
      }
    ]
  },
  {
    "id": "21-reuse",
    "section": "2.1",
    "spec": "2.1.2(d)",
    "title": "Thinking ahead: reusable components",
    "lessons": [
      61
    ],
    "page": 112,
    "questions": [
      {
        "id": "21-reuse-1",
        "prompt": "Two applications need the same tested postcode-validation rule. What is a good design choice?",
        "answer": "Provide a reusable validation component with a clear interface",
        "options": [
          "Provide a reusable validation component with a clear interface",
          "Duplicate separate untested rules in every screen",
          "Store rules only in interface colours",
          "Remove all input checks"
        ],
        "explanation": "Reuse avoids needless duplication and allows consistent correction.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-2",
        "prompt": "Before using an existing payment component, what should be checked?",
        "answer": "Its inputs, outputs, behaviour and compatibility with the new system",
        "options": [
          "Its inputs, outputs, behaviour and compatibility with the new system",
          "Its logo colour alone",
          "Only its filename length",
          "Whether its source has the fewest lines"
        ],
        "explanation": "An interface contract and compatibility are essential for safe reuse.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-3",
        "prompt": "What is a potential maintenance advantage of using one shared calculation function?",
        "answer": "One tested fix can benefit every caller",
        "options": [
          "One tested fix can benefit every caller",
          "Every caller becomes independent of updates",
          "All callers receive identical inputs automatically",
          "Functions no longer need tests"
        ],
        "explanation": "Sharing a component reduces duplicated fixes, subject to regression testing.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-4",
        "prompt": "What is a useful precondition for a function that calculates an average by dividing by a list length?",
        "answer": "The list is nonempty",
        "options": [
          "The list is nonempty",
          "The list is sorted alphabetically",
          "The output is always an integer",
          "The list contains only unique values"
        ],
        "explanation": "An empty list leads to division by zero unless handled separately.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-5",
        "prompt": "What does an interface describe for a reusable function?",
        "answer": "How callers supply inputs and receive results",
        "options": [
          "How callers supply inputs and receive results",
          "Only how its code is indented",
          "The colour used for its icon",
          "The order in which the code was written"
        ],
        "explanation": "An interface is the contract between the component and its callers.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-6",
        "prompt": "A reused routine silently changes a global variable that callers depend on. What risk does this create?",
        "answer": "Unexpected side effects in other parts of the system",
        "options": [
          "Unexpected side effects in other parts of the system",
          "Guaranteed stronger modularity",
          "Elimination of testing",
          "Automatic isolation of all state"
        ],
        "explanation": "Hidden mutation makes component behaviour harder to predict and reuse.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-7",
        "prompt": "A shared component gets a new version that changes its argument order. What should the team test?",
        "answer": "Every caller's compatibility with the changed interface",
        "options": [
          "Every caller's compatibility with the changed interface",
          "Only the component's header colour",
          "Only how many functions are in the file",
          "Nothing because reuse guarantees compatibility"
        ],
        "explanation": "Breaking interface changes can affect every calling program.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-8",
        "prompt": "Which design most directly supports reuse of a search routine?",
        "answer": "Accept the dataset and target as parameters",
        "options": [
          "Accept the dataset and target as parameters",
          "Hard-code one school's pupil list",
          "Read an unnamed global list only",
          "Return the same fixed index for every search"
        ],
        "explanation": "Parameterisation avoids tying the component to one fixed dataset.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-9",
        "prompt": "Why is a reusable component still tested in a new application?",
        "answer": "Integration assumptions and edge cases may differ from earlier uses",
        "options": [
          "Integration assumptions and edge cases may differ from earlier uses",
          "Reuse always introduces a new syntax error",
          "Its old tests are necessarily false",
          "Testing only matters for new code"
        ],
        "explanation": "A previously tested component can fail if new callers violate assumptions.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      },
      {
        "id": "21-reuse-10",
        "prompt": "A library function performs input validation and also updates a public web page unexpectedly. What would improve its reusability?",
        "answer": "Separate validation from unrelated display effects",
        "options": [
          "Separate validation from unrelated display effects",
          "Add more unrelated display updates",
          "Hide the extra effect from documentation",
          "Make every caller use the same page"
        ],
        "explanation": "A component with one focused responsibility and explicit effects is easier to reuse.",
        "skill": "Thinking ahead: reusable components",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 24–27"
      }
    ]
  },
  {
    "id": "21-tradeoffs",
    "section": "2.1",
    "spec": "2.1.5(b)",
    "title": "Thinking concurrently: trade-offs",
    "lessons": [
      64
    ],
    "page": 101,
    "questions": [
      {
        "id": "21-tradeoffs-1",
        "prompt": "Two independent tasks take 3 and 5 seconds. Under ideal parallel execution on separate resources with no overhead, how long until both finish?",
        "answer": "5 seconds",
        "options": [
          "5 seconds",
          "8 seconds",
          "3 seconds",
          "15 seconds"
        ],
        "explanation": "Both start together and completion is determined by the slower task.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-2",
        "prompt": "Two tasks both update the same shared total without synchronisation. What can happen?",
        "answer": "A race condition causes a lost update",
        "options": [
          "A race condition causes a lost update",
          "The sum is guaranteed correct",
          "Both writes automatically become atomic",
          "Concurrency removes shared-state risks"
        ],
        "explanation": "Interleaved reads and writes can overwrite a prior update.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-3",
        "prompt": "Why can splitting a tiny calculation into several threads make it slower?",
        "answer": "Thread creation and coordination may outweigh useful parallel work",
        "options": [
          "Thread creation and coordination may outweigh useful parallel work",
          "Parallel work always has zero overhead",
          "Threads remove every serial operation",
          "The CPU performs no context switching"
        ],
        "explanation": "Coordination overhead can exceed the saved calculation time.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-4",
        "prompt": "Task C requires the results of independent tasks A and B. Which schedule preserves dependencies?",
        "answer": "Run A and B concurrently, then C after both finish",
        "options": [
          "Run A and B concurrently, then C after both finish",
          "Start C before A and B produce results",
          "Run C instead of A and B",
          "Force A to read C's missing result"
        ],
        "explanation": "C cannot run correctly until its required inputs from both tasks exist.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-5",
        "prompt": "A shared printer can serve only one print job at a time. What limits the gain from concurrent requests?",
        "answer": "Contention for the single printer resource",
        "options": [
          "Contention for the single printer resource",
          "A lack of independent input files",
          "The presence of different filenames",
          "The keyboard layout"
        ],
        "explanation": "Concurrent submission does not make a single exclusive printer process multiple jobs simultaneously.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-6",
        "prompt": "Two tasks each wait permanently for a resource held by the other. What condition is this?",
        "answer": "Deadlock",
        "options": [
          "Deadlock",
          "Cache hit",
          "Normalisation",
          "Pipelining"
        ],
        "explanation": "Circular waiting can stop both tasks progressing.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-7",
        "prompt": "An algorithm has one long stage that must run sequentially. Why is speed-up from extra cores limited?",
        "answer": "The sequential stage still takes time and cannot be parallelised",
        "options": [
          "The sequential stage still takes time and cannot be parallelised",
          "All stages automatically run twice",
          "Extra cores guarantee a linear speed-up",
          "Memory use becomes exactly zero"
        ],
        "explanation": "A serial portion sets a lower bound on total runtime.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-8",
        "prompt": "Two workers need to change one shared counter correctly. What is a typical safeguard?",
        "answer": "Coordinate access with an appropriate lock or atomic operation",
        "options": [
          "Coordinate access with an appropriate lock or atomic operation",
          "Remove all checks and read it concurrently",
          "Use two unrelated counters without combining them",
          "Replace the count with a fixed value"
        ],
        "explanation": "Protecting read-modify-write operations prevents lost updates.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-9",
        "prompt": "A concurrent design is slower than a sequential version on small inputs but faster on large inputs. What is the best explanation?",
        "answer": "Coordination overhead matters more on small workloads",
        "options": [
          "Coordination overhead matters more on small workloads",
          "Parallelism is always incorrect on small workloads",
          "The time complexity of both becomes constant",
          "Every large input must be cached"
        ],
        "explanation": "Startup and synchronisation costs can dominate small workloads.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      },
      {
        "id": "21-tradeoffs-10",
        "prompt": "Tasks A and B take 4 and 7 seconds in parallel, then dependent task C takes 2 seconds. With ideal resources and no overhead, what is the total?",
        "answer": "9 seconds",
        "options": [
          "9 seconds",
          "13 seconds",
          "7 seconds",
          "6 seconds"
        ],
        "explanation": "A and B finish after 7 seconds; C starts then and takes another 2.",
        "skill": "Thinking concurrently: trade-offs",
        "source": "H446 final Paper 2, 2.1 learning-cycle pages 40–43"
      }
    ]
  }
];
