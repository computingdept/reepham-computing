// Original RHSC practice questions; aligned to OCR H446 2.2.1(a–f).
const SKILLS = [
  {
    "id": "221-a",
    "section": "2.2.1",
    "spec": "2.2.1(a)",
    "title": "Sequence, branching and iteration",
    "lessons": [
      38,
      39
    ],
    "questions": [
      {
        "id": "221-a-1",
        "prompt": "A ticket machine must calculate a price before printing it. Which construct makes instruction order matter?",
        "answer": "Sequence",
        "options": [
          "Sequence",
          "Branching",
          "Iteration",
          "Recursion"
        ],
        "explanation": "Sequence executes instructions in order. Printing before calculating would use the wrong value.",
        "skill": "Sequence, branching and iteration"
      },
      {
        "id": "221-a-2",
        "prompt": "What is printed?",
        "answer": "14",
        "options": [
          "14",
          "7",
          "10",
          "17"
        ],
        "explanation": "The second assignment uses the updated x: 4 + 3 = 7, then 7 × 2 = 14.",
        "skill": "Sequence, branching and iteration",
        "code": "x = 4\nx = x + 3\nprint(x * 2)",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-a-3",
        "prompt": "A pupil scores 70. Which message is printed?",
        "answer": "Distinction",
        "options": [
          "Distinction",
          "Pass",
          "Fail",
          "Both messages"
        ],
        "explanation": "The first condition is true. An elseif branch is considered only when the preceding condition is false.",
        "skill": "Sequence, branching and iteration",
        "code": "mark = 70\nif mark >= 70 then\n  print(\"Distinction\")\nelseif mark >= 40 then\n  print(\"Pass\")\nelse\n  print(\"Fail\")\nendif",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-a-4",
        "prompt": "A sensor must keep taking readings while a door is open. The door may already be closed. Which loop fits best?",
        "answer": "while",
        "options": [
          "while",
          "for",
          "do until",
          "No loop"
        ],
        "explanation": "A while loop tests before its body and can run zero times. That suits an unknown number of readings.",
        "skill": "Sequence, branching and iteration"
      },
      {
        "id": "221-a-5",
        "prompt": "What final total is printed?",
        "answer": "12",
        "options": [
          "12",
          "6",
          "8",
          "16"
        ],
        "explanation": "OCR for loops include both endpoints here: total becomes 2, then 6, then 12.",
        "skill": "Sequence, branching and iteration",
        "code": "total = 0\nfor i = 1 to 3\n  total = total + i * 2\nnext i\nprint(total)",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-a-6",
        "prompt": "A password prompt must appear at least once, then repeat until the password is correct. Which loop fits best?",
        "answer": "do until",
        "options": [
          "do until",
          "while",
          "if",
          "Sequence only"
        ],
        "explanation": "A do-until loop checks its stopping condition after the body, so the prompt runs at least once.",
        "skill": "Sequence, branching and iteration"
      },
      {
        "id": "221-a-7",
        "prompt": "Which value of age makes the condition true?",
        "answer": "16",
        "options": [
          "16",
          "15",
          "19",
          "20"
        ],
        "explanation": "Both parts of an AND must be true. The permitted range includes 16 and 18.",
        "skill": "Sequence, branching and iteration",
        "code": "age >= 16 AND age <= 18",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-a-8",
        "prompt": "How many times is the asterisk printed?",
        "answer": "6",
        "options": [
          "6",
          "2",
          "3",
          "5"
        ],
        "explanation": "The inner loop runs three times for each of two outer iterations: 2 × 3 = 6.",
        "skill": "Sequence, branching and iteration",
        "code": "for row = 1 to 2\n  for col = 1 to 3\n    print(\"*\")\n  next col\nnext row",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-a-9",
        "prompt": "What is printed?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "3",
          "4"
        ],
        "explanation": "A while loop tests first. Since 3 < 3 is false, the body never runs.",
        "skill": "Sequence, branching and iteration",
        "code": "x = 3\ncount = 0\nwhile x < 3\n  count = count + 1\n  x = x + 1\nendwhile\nprint(count)",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-a-10",
        "prompt": "The loop should stop after counting down to zero. Which line fixes it?",
        "answer": "x = x - 1",
        "options": [
          "x = x - 1",
          "x = x + 1",
          "x = 3",
          "x = x * 1"
        ],
        "explanation": "Decreasing x makes progress towards the point where x > 0 becomes false.",
        "skill": "Sequence, branching and iteration",
        "code": "x = 3\nwhile x > 0\n  print(x)\n  // missing line\nendwhile",
        "language": "OCR pseudocode"
      }
    ],
    "page": 12
  },
  {
    "id": "221-b",
    "section": "2.2.1",
    "spec": "2.2.1(b)",
    "title": "Recursion and iteration",
    "lessons": [
      181,
      182
    ],
    "questions": [
      {
        "id": "221-b-1",
        "prompt": "Which part of a recursive function returns without making another recursive call?",
        "answer": "Base case",
        "options": [
          "Base case",
          "Recursive step",
          "Loop counter",
          "Parameter list"
        ],
        "explanation": "A base case supplies a result directly, allowing the pending calls to return.",
        "skill": "Recursion and iteration"
      },
      {
        "id": "221-b-2",
        "prompt": "What does fact(4) return?",
        "answer": "24",
        "options": [
          "24",
          "4",
          "10",
          "16"
        ],
        "explanation": "fact(4) = 4 × fact(3) = 4 × 3 × 2 × 1 = 24.",
        "skill": "Recursion and iteration",
        "code": "function fact(n)\n  if n == 0 then\n    return 1\n  endif\n  return n * fact(n - 1)\nendfunction",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-b-3",
        "prompt": "Including the initial call and the base case, how many calls does down(3) make?",
        "answer": "4",
        "options": [
          "4",
          "2",
          "3",
          "6"
        ],
        "explanation": "The calls are down(3), down(2), down(1) and down(0).",
        "skill": "Recursion and iteration",
        "code": "procedure down(n)\n  if n > 0 then\n    down(n - 1)\n  endif\nendprocedure",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-b-4",
        "prompt": "Which structure stores active recursive calls and their local state?",
        "answer": "Call stack",
        "options": [
          "Call stack",
          "Queue",
          "Hash table",
          "Source file"
        ],
        "explanation": "Each active call has a stack frame. The most recent call returns first.",
        "skill": "Recursion and iteration"
      },
      {
        "id": "221-b-5",
        "prompt": "For n = 3, which change makes the recursion reach its base case?",
        "answer": "Use count(n - 1)",
        "options": [
          "Use count(n - 1)",
          "Use count(n + 1)",
          "Use count(n)",
          "Remove the if"
        ],
        "explanation": "For positive n, subtracting one moves each call towards zero. The original code moves away from the base case.",
        "skill": "Recursion and iteration",
        "code": "function count(n)\n  if n == 0 then\n    return 0\n  endif\n  return 1 + count(n + 1)\nendfunction",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-b-6",
        "prompt": "For a simple countdown, which is a usual advantage of a loop over recursion?",
        "answer": "Fewer stack frames",
        "options": [
          "Fewer stack frames",
          "Always less code",
          "No stopping condition",
          "Always faster for any task"
        ],
        "explanation": "A loop can reuse one function call frame. Recursion normally creates a frame for each pending call; exact performance depends on the implementation.",
        "skill": "Recursion and iteration"
      },
      {
        "id": "221-b-7",
        "prompt": "Which order is printed by show(3)?",
        "answer": "1, 2, 3",
        "options": [
          "1, 2, 3",
          "3, 2, 1",
          "0, 1, 2",
          "3 only"
        ],
        "explanation": "Each call prints after the deeper call returns. show(0) prints nothing, then the calls unwind with 1, 2 and 3.",
        "skill": "Recursion and iteration",
        "code": "procedure show(n)\n  if n > 0 then\n    show(n - 1)\n    print(n)\n  endif\nendprocedure",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-b-8",
        "prompt": "What does sum(3) return?",
        "answer": "6",
        "options": [
          "6",
          "3",
          "5",
          "9"
        ],
        "explanation": "sum(3) = 3 + sum(2) = 3 + 2 + 1 + 0 = 6.",
        "skill": "Recursion and iteration",
        "code": "function sum(n)\n  if n == 0 then\n    return 0\n  endif\n  return n + sum(n - 1)\nendfunction",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-b-9",
        "prompt": "A recursive traversal descends a folder tree. Why can recursion suit this task?",
        "answer": "Subfolders repeat the structure",
        "options": [
          "Subfolders repeat the structure",
          "Every folder has one file",
          "It avoids all memory use",
          "It needs no base case"
        ],
        "explanation": "A subfolder has the same kind of structure as its parent. The same procedure can process each smaller subtree, stopping at folders with no further subfolders.",
        "skill": "Recursion and iteration"
      },
      {
        "id": "221-b-10",
        "prompt": "A program makes very many recursive calls before any return. What can happen?",
        "answer": "Stack overflow",
        "options": [
          "Stack overflow",
          "Automatic sorting",
          "Syntax error",
          "Guaranteed faster execution"
        ],
        "explanation": "Each pending call uses stack space. A sufficiently deep chain can exhaust that space.",
        "skill": "Recursion and iteration"
      }
    ],
    "page": 49
  },
  {
    "id": "221-c",
    "section": "2.2.1",
    "spec": "2.2.1(c)",
    "title": "Global and local variables",
    "lessons": [
      41,
      12
    ],
    "questions": [
      {
        "id": "221-c-1",
        "prompt": "A temporary value is needed only inside one function. Which scope is most suitable?",
        "answer": "Local",
        "options": [
          "Local",
          "Global",
          "Public everywhere",
          "Shared by all calls"
        ],
        "explanation": "Local scope limits access to the function, reducing unintended changes elsewhere.",
        "skill": "Global and local variables"
      },
      {
        "id": "221-c-2",
        "prompt": "What does the final print output?",
        "answer": "10",
        "options": [
          "10",
          "3",
          "13",
          "An error"
        ],
        "explanation": "The local score belongs to Demo. It hides the class field inside that method but does not change the field. The final print in the calling routine uses the field: 10.",
        "skill": "Global and local variables",
        "code": "static int score = 10;\nstatic void Demo() {\n  int score = 3;\n  Console.WriteLine(score);\n}\n// In the calling routine:\nDemo();\nConsole.WriteLine(score);",
        "language": "C#"
      },
      {
        "id": "221-c-3",
        "prompt": "Two different functions each declare a local variable called total. Which statement is correct?",
        "answer": "They are separate variables",
        "options": [
          "They are separate variables",
          "They always share a value",
          "The second is forbidden",
          "Both become global"
        ],
        "explanation": "Each local declaration belongs to its own function scope. Reusing the name does not join the variables.",
        "skill": "Global and local variables"
      },
      {
        "id": "221-c-4",
        "prompt": "Why can excessive use of mutable global variables make a program harder to debug?",
        "answer": "Many routines can change them",
        "options": [
          "Many routines can change them",
          "They cannot hold numbers",
          "They prevent all functions",
          "They remove all parameters"
        ],
        "explanation": "Changes can come from many places, making the cause of an incorrect value harder to locate.",
        "skill": "Global and local variables"
      },
      {
        "id": "221-c-5",
        "prompt": "Which variable can the print inside display access?",
        "answer": "value",
        "options": [
          "value",
          "secret",
          "Both variables",
          "Neither variable"
        ],
        "explanation": "value is a parameter local to display. secret is local to other and is outside display’s scope.",
        "skill": "Global and local variables",
        "code": "procedure other()\n  secret = 9\nendprocedure\nprocedure display(value)\n  print(value)\nendprocedure",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-c-6",
        "prompt": "What is printed by the second call?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "4"
        ],
        "explanation": "Each call creates a new local x and initialises it to zero. The value from the first call is not retained.",
        "skill": "Global and local variables",
        "code": "procedure tick()\n  x = 0\n  x = x + 1\n  print(x)\nendprocedure\ntick()\ntick()",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-c-7",
        "prompt": "A function needs a caller’s mark but should not depend on a global mark variable. How should it receive the value?",
        "answer": "As a parameter",
        "options": [
          "As a parameter",
          "As a comment",
          "Through its name",
          "By changing the IDE"
        ],
        "explanation": "A parameter makes the input explicit and helps the function work with different callers and values.",
        "skill": "Global and local variables"
      },
      {
        "id": "221-c-8",
        "prompt": "In a recursive function, how are ordinary local variables stored?",
        "answer": "Separately for each active call",
        "options": [
          "Separately for each active call",
          "Once for the whole program",
          "Inside the source text",
          "Only in the first call"
        ],
        "explanation": "Each active call has its own frame containing its parameters and local variables.",
        "skill": "Global and local variables"
      },
      {
        "id": "221-c-9",
        "prompt": "Which statement describes the scope of a variable?",
        "answer": "Where it can be accessed",
        "options": [
          "Where it can be accessed",
          "How large its value is",
          "How fast it changes",
          "How many bits it uses"
        ],
        "explanation": "Scope concerns visibility in the program. Lifetime concerns how long a variable exists.",
        "skill": "Global and local variables"
      },
      {
        "id": "221-c-10",
        "prompt": "What is printed after addBonus returns?",
        "answer": "7",
        "options": [
          "7",
          "5",
          "2",
          "12"
        ],
        "explanation": "addBonus explicitly updates the shared global points. This differs from creating a local variable with the same name.",
        "skill": "Global and local variables",
        "code": "global points = 5\nprocedure addBonus()\n  points = points + 2\nendprocedure\naddBonus()\nprint(points)",
        "language": "OCR pseudocode"
      }
    ],
    "page": 35
  },
  {
    "id": "221-d",
    "section": "2.2.1",
    "spec": "2.2.1(d)",
    "title": "Modularity and parameter passing",
    "lessons": [
      40,
      42
    ],
    "questions": [
      {
        "id": "221-d-1",
        "prompt": "A program needs a subprogram that calculates and supplies a discounted price to its caller. Which should it use?",
        "answer": "Function",
        "options": [
          "Function",
          "Comment",
          "Loop alone",
          "Procedure with no result"
        ],
        "explanation": "A function returns a value that the caller can use in an expression or assignment.",
        "skill": "Modularity and parameter passing"
      },
      {
        "id": "221-d-2",
        "prompt": "A routine displays a menu and returns no value. Which description fits?",
        "answer": "Procedure",
        "options": [
          "Procedure",
          "Value-returning function",
          "Global variable",
          "Constructor only"
        ],
        "explanation": "A procedure carries out an action without returning a result value to the caller.",
        "skill": "Modularity and parameter passing"
      },
      {
        "id": "221-d-3",
        "prompt": "What is printed?",
        "answer": "4",
        "options": [
          "4",
          "7",
          "3",
          "An error"
        ],
        "explanation": "Passing by value copies the argument into n. Changing this local copy does not change x.",
        "skill": "Modularity and parameter passing",
        "code": "procedure increase(n:byVal)\n  n = n + 3\nendprocedure\nx = 4\nincrease(x)\nprint(x)",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-d-4",
        "prompt": "What is printed?",
        "answer": "7",
        "options": [
          "7",
          "4",
          "3",
          "11"
        ],
        "explanation": "By-reference passing lets the procedure update the caller’s variable through n.",
        "skill": "Modularity and parameter passing",
        "code": "procedure increase(n:byRef)\n  n = n + 3\nendprocedure\nx = 4\nincrease(x)\nprint(x)",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-d-5",
        "prompt": "A school uses the same validation rule in six screens. What is a benefit of placing it in one subprogram?",
        "answer": "One place to update the rule",
        "options": [
          "One place to update the rule",
          "No need to test it",
          "All inputs become global",
          "It cannot contain errors"
        ],
        "explanation": "A shared module reduces duplicated code and helps keep the rule consistent. It still needs testing.",
        "skill": "Modularity and parameter passing"
      },
      {
        "id": "221-d-6",
        "prompt": "What is printed?",
        "answer": "11",
        "options": [
          "11",
          "5",
          "6",
          "30"
        ],
        "explanation": "The arguments 5 and 6 become a and b. The function returns their sum, 11.",
        "skill": "Modularity and parameter passing",
        "code": "function combine(a, b)\n  return a + b\nendfunction\nprint(combine(5, 6))",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-d-7",
        "prompt": "A calculation should use an integer without changing the caller’s integer variable. Which passing method is most suitable?",
        "answer": "By value",
        "options": [
          "By value",
          "By reference",
          "Global scope",
          "Inheritance"
        ],
        "explanation": "Passing the integer by value gives the routine its own copy and protects the caller’s variable from reassignment through the parameter.",
        "skill": "Modularity and parameter passing"
      },
      {
        "id": "221-d-8",
        "prompt": "In calculate(12), what is 12 called?",
        "answer": "Argument",
        "options": [
          "Argument",
          "Parameter declaration",
          "Return statement",
          "Local scope"
        ],
        "explanation": "An argument is the actual value supplied at the call. A parameter is the name in the subprogram definition.",
        "skill": "Modularity and parameter passing"
      },
      {
        "id": "221-d-9",
        "prompt": "What is printed by this C# program fragment?",
        "answer": "4",
        "options": [
          "4",
          "7",
          "3",
          "An error"
        ],
        "explanation": "An ordinary C# int parameter is passed by value. Use an explicit ref parameter and ref at the call to allow reassignment of the caller’s int.",
        "skill": "Modularity and parameter passing",
        "code": "static void Add(int n) {\n  n = n + 3;\n}\nint x = 4;\nAdd(x);\nConsole.WriteLine(x);",
        "language": "C#"
      },
      {
        "id": "221-d-10",
        "prompt": "This C# call passes an object reference by value. What is printed?",
        "answer": "9",
        "options": [
          "9",
          "2",
          "0",
          "An error"
        ],
        "explanation": "The copied reference still points to the same Box, so changing its Value affects that object. This does not make the parameter a C# ref parameter. Reassigning b itself would not reassign the caller’s box.",
        "skill": "Modularity and parameter passing",
        "code": "// Box has a public int field: Value\nstatic void Set(Box b) {\n  b.Value = 9;\n}\nBox box = new Box();\nbox.Value = 2;\nSet(box);\nConsole.WriteLine(box.Value);",
        "language": "C#"
      }
    ],
    "page": 26
  },
  {
    "id": "221-e",
    "section": "2.2.1",
    "spec": "2.2.1(e)",
    "title": "Using an IDE to debug",
    "lessons": [
      43,
      86
    ],
    "questions": [
      {
        "id": "221-e-1",
        "prompt": "A total becomes incorrect inside a loop. Which tool lets you inspect its value while execution is paused?",
        "answer": "Variable watch",
        "options": [
          "Variable watch",
          "Colour theme",
          "File rename",
          "Print preview"
        ],
        "explanation": "A watch or variable inspector shows runtime values so you can compare them with expected values.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-2",
        "prompt": "You want execution to pause just before a suspect line runs. What should you set?",
        "answer": "Breakpoint",
        "options": [
          "Breakpoint",
          "Bookmark only",
          "Comment",
          "Indentation"
        ],
        "explanation": "A breakpoint pauses execution when reached during debugging, allowing the program’s state to be inspected.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-3",
        "prompt": "Execution is paused at a call to calculateTotal(). You want to inspect lines inside it. Which action should you use?",
        "answer": "Step Into",
        "options": [
          "Step Into",
          "Step Over",
          "Step Out",
          "Stop debugging"
        ],
        "explanation": "Step Into enters the called routine so you can follow its instructions.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-4",
        "prompt": "Execution is paused at a tested helper-function call. You want to run it and pause at the next line in the current routine. Which action fits?",
        "answer": "Step Over",
        "options": [
          "Step Over",
          "Step Into",
          "Step Out",
          "Delete breakpoint"
        ],
        "explanation": "Step Over executes the call without stepping through its internal lines, then pauses at the next line in the current routine.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-5",
        "prompt": "You are paused inside a helper function and want it to finish, then pause back in the caller. Which action fits?",
        "answer": "Step Out",
        "options": [
          "Step Out",
          "Step Into",
          "Restart",
          "Toggle comment"
        ],
        "explanation": "Step Out runs the rest of the current function and pauses after control returns to its caller. Other breakpoints may interrupt stepping.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-6",
        "prompt": "The program runs but gives the wrong discount. Which type of error is most likely?",
        "answer": "Logic error",
        "options": [
          "Logic error",
          "Syntax error",
          "Missing file always",
          "Hardware failure always"
        ],
        "explanation": "A logic error can allow execution to complete while producing an incorrect result. Use known test data and inspect the calculation.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-7",
        "prompt": "A missing closing bracket prevents compilation. Which IDE feature is most useful first?",
        "answer": "Syntax diagnostics",
        "options": [
          "Syntax diagnostics",
          "Call stack",
          "Variable watch",
          "Step Out"
        ],
        "explanation": "Syntax diagnostics identify invalid code and its location before successful compilation or execution.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-8",
        "prompt": "A recursive program fails several calls deep. Which debugger view helps identify the chain of calls?",
        "answer": "Call stack",
        "options": [
          "Call stack",
          "Font picker",
          "File explorer",
          "Colour theme"
        ],
        "explanation": "The call stack shows active calls and their callers. Selecting a frame can help inspect that call’s state.",
        "skill": "Using an IDE to debug"
      },
      {
        "id": "221-e-9",
        "prompt": "The watch shows total = 6 and i = 4 just before the highlighted line. What should total be after one step?",
        "answer": "10",
        "options": [
          "10",
          "6",
          "4",
          "24"
        ],
        "explanation": "The next statement adds i to total: 6 + 4 = 10. Compare the watched value after stepping with this prediction.",
        "skill": "Using an IDE to debug",
        "code": "total = total + i",
        "language": "OCR pseudocode"
      },
      {
        "id": "221-e-10",
        "prompt": "A programmer wants to check a loop for an off-by-one error. Which approach is most useful?",
        "answer": "Step and watch the index",
        "options": [
          "Step and watch the index",
          "Change the colour theme",
          "Hide all warnings",
          "Remove all tests"
        ],
        "explanation": "Stepping through boundary iterations and watching the index reveals whether the loop starts or stops at the wrong position.",
        "skill": "Using an IDE to debug"
      }
    ],
    "page": 43
  },
  {
    "id": "221-f",
    "section": "2.2.1",
    "spec": "2.2.1(f)",
    "title": "Object-oriented techniques",
    "lessons": [
      44,
      45
    ],
    "questions": [
      {
        "id": "221-f-1",
        "prompt": "A school program defines Student, then creates three students. What is Student?",
        "answer": "Class",
        "options": [
          "Class",
          "One student object",
          "Argument value",
          "Loop"
        ],
        "explanation": "A class defines the attributes and methods shared by its instances. Each created student is an object.",
        "skill": "Object-oriented techniques"
      },
      {
        "id": "221-f-2",
        "prompt": "An account object has balance and deposit(amount). Which is a method?",
        "answer": "deposit(amount)",
        "options": [
          "deposit(amount)",
          "balance",
          "amount alone",
          "The account’s value"
        ],
        "explanation": "A method defines behaviour associated with an object. balance is an attribute holding state.",
        "skill": "Object-oriented techniques"
      },
      {
        "id": "221-f-3",
        "prompt": "What is the main role of a constructor?",
        "answer": "Initialise a new object",
        "options": [
          "Initialise a new object",
          "Destroy every object",
          "Repeat all methods",
          "Hide syntax errors"
        ],
        "explanation": "A constructor runs during object creation and establishes initial state, often using supplied arguments.",
        "skill": "Object-oriented techniques"
      },
      {
        "id": "221-f-4",
        "prompt": "Why make balance private and provide a public deposit method that checks the amount?",
        "answer": "Control changes to state",
        "options": [
          "Control changes to state",
          "Stop all access to objects",
          "Make balance global",
          "Guarantee no bugs"
        ],
        "explanation": "Encapsulation controls access to internal state. The method can reject invalid changes, such as a negative deposit.",
        "skill": "Object-oriented techniques"
      },
      {
        "id": "221-f-5",
        "prompt": "SavingsAccount extends Account. Which is the superclass?",
        "answer": "Account",
        "options": [
          "Account",
          "SavingsAccount",
          "Both equally",
          "Neither"
        ],
        "explanation": "Account is the superclass (parent). SavingsAccount is the subclass and can inherit accessible behaviour and add or specialise features.",
        "skill": "Object-oriented techniques"
      },
      {
        "id": "221-f-6",
        "prompt": "Two separate Counter objects start at zero. Only a is incremented. What is b.Value?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "Unknown always"
        ],
        "explanation": "Value is an instance field, so each object has its own value. Updating a does not update the distinct object b.",
        "skill": "Object-oriented techniques",
        "code": "// Counter has an instance field Value\nCounter a = new Counter();\nCounter b = new Counter();\na.Value = a.Value + 1;\nConsole.WriteLine(b.Value);",
        "language": "C#"
      },
      {
        "id": "221-f-7",
        "prompt": "What is printed?",
        "answer": "Woof",
        "options": [
          "Woof",
          "Sound",
          "Animal",
          "Both messages"
        ],
        "explanation": "The runtime object is a Dog. The overridden virtual method is selected even though pet is declared as Animal: polymorphism.",
        "skill": "Object-oriented techniques",
        "code": "class Animal {\n  public virtual string Speak() { return \"Sound\"; }\n}\nclass Dog : Animal {\n  public override string Speak() { return \"Woof\"; }\n}\n// In the calling routine:\nAnimal pet = new Dog();\nConsole.WriteLine(pet.Speak());",
        "language": "C#"
      },
      {
        "id": "221-f-8",
        "prompt": "A class diagram marks - balance and + getBalance(). What does the minus sign mean?",
        "answer": "Private",
        "options": [
          "Private",
          "Public",
          "Negative balance",
          "Static"
        ],
        "explanation": "In standard UML class notation, − marks private visibility and + marks public visibility. This describes access, not the attribute’s numeric value.",
        "skill": "Object-oriented techniques"
      },
      {
        "id": "221-f-9",
        "prompt": "A library models Book and DVD as subclasses of Item. Where should their shared title-handling behaviour usually go?",
        "answer": "Item",
        "options": [
          "Item",
          "Only Book",
          "Only DVD",
          "A global variable"
        ],
        "explanation": "Putting genuinely shared behaviour in the superclass avoids duplicating it in both subclasses.",
        "skill": "Object-oriented techniques"
      },
      {
        "id": "221-f-10",
        "prompt": "A renderer calls draw() on Circle and Rectangle objects through a Shape reference. Each draws differently. Which technique is demonstrated?",
        "answer": "Polymorphism",
        "options": [
          "Polymorphism",
          "Iteration only",
          "By-reference passing",
          "Global scope"
        ],
        "explanation": "A common interface can invoke different implementations depending on the runtime object type.",
        "skill": "Object-oriented techniques"
      }
    ],
    "page": 39
  },
  {
    "id": "221-loops",
    "section": "2.2.1",
    "spec": "2.2.1(a)",
    "title": "Iteration: loop bounds, guards and termination",
    "lessons": [
      66
    ],
    "page": 12,
    "questions": [
      {
        "id": "221-loops-1",
        "prompt": "A WHILE condition is false before the loop starts. How many times does its body execute?",
        "answer": "Zero times",
        "options": [
          "Zero times",
          "Once",
          "Twice",
          "At least once"
        ],
        "explanation": "A WHILE loop tests its condition before entering its body.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57"
      },
      {
        "id": "221-loops-2",
        "prompt": "Which iteration structure always executes its body at least once before checking the stopping condition?",
        "answer": "REPEAT ... UNTIL",
        "options": [
          "REPEAT ... UNTIL",
          "WHILE ... ENDWHILE",
          "FOR with zero iterations",
          "An IF statement"
        ],
        "explanation": "REPEAT ... UNTIL checks after running its body.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57"
      },
      {
        "id": "221-loops-3",
        "prompt": "A list has n elements and uses zero-based indices. Which loop bound visits each element once without overstepping?",
        "answer": "0 through n - 1 inclusive",
        "options": [
          "0 through n - 1 inclusive",
          "0 through n inclusive",
          "1 through n inclusive",
          "1 through n - 1 inclusive"
        ],
        "explanation": "There are n indices from 0 to n-1; index n would be out of bounds.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57"
      },
      {
        "id": "221-loops-4",
        "prompt": "What value is printed by this loop?",
        "answer": "4",
        "options": [
          "4",
          "3",
          "5",
          "0"
        ],
        "explanation": "The values 0,1,2,3 each increment the counter once.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57",
        "code": "count = 0\nfor i = 0 to 3\n  count = count + 1\nnext i\nprint(count)"
      },
      {
        "id": "221-loops-5",
        "prompt": "Which change ensures that this loop eventually terminates for an initial x of 3?",
        "answer": "Decrease x in the body",
        "options": [
          "Decrease x in the body",
          "Keep x unchanged",
          "Increase x by one in the body",
          "Reset x to 3 each iteration"
        ],
        "explanation": "Decrementing x eventually makes x > 0 false.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57",
        "code": "x = 3\nwhile x > 0\n  print(x)\n  // add one update\nendwhile"
      },
      {
        "id": "221-loops-6",
        "prompt": "A password must be requested at least once, then requested again while it remains invalid. Which loop structure suits this requirement?",
        "answer": "A post-test REPEAT loop",
        "options": [
          "A post-test REPEAT loop",
          "A pre-test WHILE loop that may skip the prompt",
          "A single IF without repetition",
          "A FOR loop fixed at zero iterations"
        ],
        "explanation": "The requirement explicitly guarantees one prompt, so a post-test loop is appropriate.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57"
      },
      {
        "id": "221-loops-7",
        "prompt": "What is wrong with using i <= length for a zero-indexed array of length elements?",
        "answer": "It attempts to access index length, which is outside the array",
        "options": [
          "It attempts to access index length, which is outside the array",
          "It skips index zero",
          "It makes the array one-indexed",
          "It guarantees only length - 1 iterations"
        ],
        "explanation": "The last valid zero-based index is length-1.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57"
      },
      {
        "id": "221-loops-8",
        "prompt": "A sensor can return positive or negative values; -1 alone is the end sentinel. What condition should a pre-test WHILE loop use after the first input?",
        "answer": "reading != -1",
        "options": [
          "reading != -1",
          "reading == -1",
          "reading > -1 only",
          "reading == 0"
        ],
        "explanation": "The loop continues while the reading is not the sentinel.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57"
      },
      {
        "id": "221-loops-9",
        "prompt": "A loop computes an average total/count. What must be checked before this division?",
        "answer": "That count is greater than zero",
        "options": [
          "That count is greater than zero",
          "That total is larger than count",
          "That the array is sorted",
          "That the loop used a FOR instead of WHILE"
        ],
        "explanation": "Division by zero must be avoided, including when there were no valid readings.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57"
      },
      {
        "id": "221-loops-10",
        "prompt": "What is printed after this loop?",
        "answer": "3",
        "options": [
          "3",
          "2",
          "4",
          "5"
        ],
        "explanation": "Starting at 1, the loop visits i=1,2,3 then ends when i becomes 4.",
        "skill": "Iteration: loop bounds, guards and termination",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 54–57",
        "code": "count = 0\nfor i = 1 to 3\n  count = count + 1\nnext i\nprint(count)"
      }
    ]
  },
  {
    "id": "221-parameters",
    "section": "2.2.1",
    "spec": "2.2.1(d)",
    "title": "Parameter passing: value and reference",
    "lessons": [
      68
    ],
    "page": 26,
    "questions": [
      {
        "id": "221-parameters-1",
        "prompt": "What is printed when the procedure receives an integer by value?",
        "answer": "4",
        "options": [
          "4",
          "7",
          "3",
          "0"
        ],
        "explanation": "Changing the copied parameter does not change the caller's integer variable.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73",
        "code": "procedure inc(n:byVal)\n  n = n + 3\nendprocedure\nx = 4\ninc(x)\nprint(x)"
      },
      {
        "id": "221-parameters-2",
        "prompt": "What is printed when the procedure receives the integer by reference?",
        "answer": "7",
        "options": [
          "7",
          "4",
          "3",
          "0"
        ],
        "explanation": "The procedure updates the caller's variable through the reference parameter.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73",
        "code": "procedure inc(n:byRef)\n  n = n + 3\nendprocedure\nx = 4\ninc(x)\nprint(x)"
      },
      {
        "id": "221-parameters-3",
        "prompt": "Which C# call correctly supplies x to a parameter declared with ref?",
        "answer": "Increase(ref x)",
        "options": [
          "Increase(ref x)",
          "Increase(x)",
          "Increase(out x)",
          "Increase(ref 4)"
        ],
        "explanation": "C# requires ref on the argument when the corresponding parameter is declared ref.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73"
      },
      {
        "id": "221-parameters-4",
        "prompt": "What value is printed by this C# example?",
        "answer": "5",
        "options": [
          "5",
          "4",
          "1",
          "0"
        ],
        "explanation": "The ref parameter refers to x, so incrementing it updates the caller.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73",
        "code": "static void Increase(ref int n) { n++; }\nint x = 4;\nIncrease(ref x);\nConsole.WriteLine(x);"
      },
      {
        "id": "221-parameters-5",
        "prompt": "A function must not change its caller's integer variable. Which passing method is more appropriate?",
        "answer": "Pass by value",
        "options": [
          "Pass by value",
          "Pass by reference",
          "Make every variable global",
          "Use two aliases for the same variable"
        ],
        "explanation": "A value parameter can be changed locally without changing the caller's integer.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73"
      },
      {
        "id": "221-parameters-6",
        "prompt": "A routine receives the same caller variable in two by-reference parameters. What is a potential risk?",
        "answer": "Aliasing can cause unexpected interactions between updates",
        "options": [
          "Aliasing can cause unexpected interactions between updates",
          "The two references always hold independent copies",
          "The variable can no longer be read",
          "The routine is forced to return two values"
        ],
        "explanation": "Two references may refer to the same storage, so changing one affects the value seen through the other.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73"
      },
      {
        "id": "221-parameters-7",
        "prompt": "In C#, an array reference is passed by value, and the method changes array[0]. What does the caller observe?",
        "answer": "The first element is updated in the same array",
        "options": [
          "The first element is updated in the same array",
          "The array is always copied automatically",
          "The caller's array must remain unchanged",
          "The method changes the array length instead"
        ],
        "explanation": "A copied reference still points to the same array object; mutating an element is visible to the caller.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73",
        "code": "static void Edit(int[] a) { a[0] = 9; }\nint[] data = {2, 3};\nEdit(data);\nConsole.WriteLine(data[0]);"
      },
      {
        "id": "221-parameters-8",
        "prompt": "In C#, a reference to an array is passed by value and reassigned inside a method. What happens to the caller's array reference?",
        "answer": "It still points to the original array",
        "options": [
          "It still points to the original array",
          "It now points to the new array",
          "It becomes a null reference automatically",
          "The original array is deleted"
        ],
        "explanation": "Reassigning the local reference variable does not reassign the caller's variable.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73",
        "code": "static void Replace(int[] a) { a = new int[] {9}; }\nint[] data = {2};\nReplace(data);"
      },
      {
        "id": "221-parameters-9",
        "prompt": "Why might a developer avoid a by-reference parameter for a calculation that only needs to produce one result?",
        "answer": "A return value makes the data flow clearer and avoids hidden mutation",
        "options": [
          "A return value makes the data flow clearer and avoids hidden mutation",
          "By-reference parameters cannot hold integers",
          "A function cannot return an integer",
          "By-reference passing always saves more memory"
        ],
        "explanation": "Returning an explicit result can be easier to reason about than changing caller state.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73"
      },
      {
        "id": "221-parameters-10",
        "prompt": "A procedure modifies a parameter by reference, but its caller expected no changes to the argument. What contract problem exists?",
        "answer": "The procedure's side effect was not communicated or expected",
        "options": [
          "The procedure's side effect was not communicated or expected",
          "Passing by reference guarantees no side effects",
          "The procedure must have been a function",
          "The argument can only have been a constant"
        ],
        "explanation": "Callers need to understand whether a routine may modify its arguments.",
        "skill": "Parameter passing: value and reference",
        "source": "Final H446 Paper 2 guide, section 2.2.1, learning cycle 70–73"
      }
    ]
  }
];
