'use strict';
// OCR J277 Paper 2 programming fundamentals, original five-question mastery banks.
const J277_SECTION={"code":"2.2","title":"Programming Fundamentals"};
const SKILLS=[
  {
    "id": "22-sequence",
    "section": "2.2",
    "spec": "2.2.1",
    "title": "Sequence, variables and input/output",
    "questions": [
      {
        "id": "22-sequence-1",
        "prompt": "What is sequence?",
        "answer": "Executing instructions in order",
        "options": [
          "Executing instructions in order",
          "Repeating until a condition changes",
          "Choosing a branch",
          "Sorting data"
        ],
        "explanation": "Sequence runs statements in their written order.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-2",
        "prompt": "What does a variable hold?",
        "answer": "A value that may change",
        "options": [
          "A value that may change",
          "A network cable",
          "A CPU core",
          "A monitor"
        ],
        "explanation": "Variables store values used by a program.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-3",
        "prompt": "Which OCR ERL command displays a message?",
        "answer": "print(\"Hello\")",
        "options": [
          "print(\"Hello\")",
          "Console.WriteLine(\"Hello\")",
          "print << \"Hello\"",
          "System.out.println(\"Hello\")"
        ],
        "explanation": "OCR Exam Reference Language uses print().",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-4",
        "prompt": "Which is assignment in OCR ERL?",
        "answer": "age = 9",
        "options": [
          "age = 9",
          "9 = age",
          "age == 9",
          "age >= 9"
        ],
        "explanation": "The variable on the left receives the value on the right.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-5",
        "prompt": "What is x after x = 5 followed by x = x + 2?",
        "answer": "7",
        "options": [
          "7",
          "5",
          "2",
          "10"
        ],
        "explanation": "The second assignment updates x to 5 plus 2.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-6",
        "prompt": "What makes variable names helpful?",
        "answer": "They explain what stored values mean",
        "options": [
          "They explain what stored values mean",
          "They automatically speed up the CPU",
          "They eliminate every bug",
          "They encrypt data"
        ],
        "explanation": "Meaningful names help people read and maintain code.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-7",
        "prompt": "Why does a program use input?",
        "answer": "To receive data from a user or another source",
        "options": [
          "To receive data from a user or another source",
          "To shut down all peripherals",
          "To compile every program",
          "To defragment an SSD"
        ],
        "explanation": "Input supplies values the program can process.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-8",
        "prompt": "Which instruction increments count?",
        "answer": "count = count + 1",
        "options": [
          "count = count + 1",
          "count == count + 1",
          "1 = count",
          "print(count)"
        ],
        "explanation": "The result of count plus one is assigned back to count.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-9",
        "prompt": "What is the result of a = 2 then b = 3 then print(a * b)?",
        "answer": "6",
        "options": [
          "6",
          "2",
          "3",
          "9"
        ],
        "explanation": "Two multiplied by three equals six.",
        "skill": "Sequence, variables and input/output"
      },
      {
        "id": "22-sequence-10",
        "prompt": "In a sequence what executes first?",
        "answer": "The earliest statement in the sequence",
        "options": [
          "The earliest statement in the sequence",
          "The final statement",
          "A random statement",
          "Only IF statements"
        ],
        "explanation": "Without branching or loops execution follows the order of statements.",
        "skill": "Sequence, variables and input/output"
      }
    ]
  },
  {
    "id": "22-selection",
    "section": "2.2",
    "spec": "2.2.1",
    "title": "IF, ELSE and Boolean selection",
    "questions": [
      {
        "id": "22-selection-1",
        "prompt": "What is selection?",
        "answer": "Choosing steps based on a condition",
        "options": [
          "Choosing steps based on a condition",
          "Repeating a block forever",
          "Loading a storage device",
          "Compressing a file"
        ],
        "explanation": "Selection chooses a branch from a condition.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-2",
        "prompt": "When does an IF block run?",
        "answer": "When its condition is true",
        "options": [
          "When its condition is true",
          "Whenever a program starts",
          "Only after a file is saved",
          "Only after a WHILE loop"
        ],
        "explanation": "The condition determines whether the IF block executes.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-3",
        "prompt": "When does ELSE run?",
        "answer": "When the IF condition is false",
        "options": [
          "When the IF condition is false",
          "Before IF is evaluated",
          "Only in a FOR loop",
          "Every time the program runs"
        ],
        "explanation": "ELSE provides an alternative branch.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-4",
        "prompt": "What is TRUE AND FALSE?",
        "answer": "FALSE",
        "options": [
          "FALSE",
          "TRUE",
          "2",
          "NULL"
        ],
        "explanation": "AND requires both sides to be true.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-5",
        "prompt": "What is TRUE OR FALSE?",
        "answer": "TRUE",
        "options": [
          "TRUE",
          "FALSE",
          "2",
          "NULL"
        ],
        "explanation": "OR is true when at least one input is true.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-6",
        "prompt": "Which OCR ERL comparison tests equality?",
        "answer": "==",
        "options": [
          "==",
          "=",
          "=>",
          "><"
        ],
        "explanation": "Double equals compares values while equals assigns.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-7",
        "prompt": "What is a nested IF?",
        "answer": "An IF inside another IF",
        "options": [
          "An IF inside another IF",
          "Two separate operating systems",
          "A WHILE loop without a condition",
          "An input statement in a file"
        ],
        "explanation": "Nested selections allow additional decisions.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-8",
        "prompt": "Which condition accepts someone aged 16 or over?",
        "answer": "age >= 16",
        "options": [
          "age >= 16",
          "age < 16",
          "age == 15",
          "age != 16"
        ],
        "explanation": "Greater-than-or-equal-to includes the threshold.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-9",
        "prompt": "What happens if x = 4 and the test is x == 5?",
        "answer": "The test is false",
        "options": [
          "The test is false",
          "The test is true",
          "x becomes 5",
          "The program must end"
        ],
        "explanation": "Four does not equal five.",
        "skill": "IF, ELSE and Boolean selection"
      },
      {
        "id": "22-selection-10",
        "prompt": "Which construct decides whether a password matches?",
        "answer": "Selection",
        "options": [
          "Selection",
          "Compression",
          "Image sampling",
          "Data storage"
        ],
        "explanation": "An IF can select a path after checking a condition.",
        "skill": "IF, ELSE and Boolean selection"
      }
    ]
  },
  {
    "id": "22-iteration",
    "section": "2.2",
    "spec": "2.2.1",
    "title": "FOR and WHILE loops",
    "questions": [
      {
        "id": "22-iteration-1",
        "prompt": "What is iteration?",
        "answer": "Repeating a block of instructions",
        "options": [
          "Repeating a block of instructions",
          "Selecting one branch once",
          "Storing a file",
          "Displaying an icon"
        ],
        "explanation": "Iteration uses loops to repeat operations.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-2",
        "prompt": "Which loop is normally suited to a known number of repeats?",
        "answer": "FOR",
        "options": [
          "FOR",
          "A single IF",
          "PRINT",
          "An assignment only"
        ],
        "explanation": "FOR loops commonly run across a specified range.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-3",
        "prompt": "Which loop repeats while a condition remains true?",
        "answer": "WHILE",
        "options": [
          "WHILE",
          "ELSE",
          "INPUT",
          "RETURN"
        ],
        "explanation": "A WHILE condition is checked before repetition.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-4",
        "prompt": "How many times does for i = 1 to 3 execute its body?",
        "answer": "3",
        "options": [
          "3",
          "2",
          "4",
          "1"
        ],
        "explanation": "The inclusive values are 1 2 and 3.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-5",
        "prompt": "What prevents an unintended infinite WHILE loop?",
        "answer": "Making its condition eventually false",
        "options": [
          "Making its condition eventually false",
          "Increasing screen brightness",
          "Changing the program filename",
          "Adding an extra monitor"
        ],
        "explanation": "Loop state must change when termination is expected.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-6",
        "prompt": "What is the value of x after x = 0 and while x < 3 do x = x + 1?",
        "answer": "3",
        "options": [
          "3",
          "2",
          "0",
          "4"
        ],
        "explanation": "x increases to three then the condition becomes false.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-7",
        "prompt": "When is a WHILE condition checked?",
        "answer": "Before each iteration",
        "options": [
          "Before each iteration",
          "Only after the whole loop",
          "Only at compile time",
          "Only on output"
        ],
        "explanation": "WHILE is a pre-condition loop.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-8",
        "prompt": "What is an infinite loop?",
        "answer": "A loop that never reaches termination",
        "options": [
          "A loop that never reaches termination",
          "A FOR loop that executes once",
          "A program with no variables",
          "Any statement using IF"
        ],
        "explanation": "A permanently true loop condition may repeat without end.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-9",
        "prompt": "What does a FOR loop counter show?",
        "answer": "The current iteration value",
        "options": [
          "The current iteration value",
          "The router IP address",
          "The character set size",
          "The number of hard disks"
        ],
        "explanation": "The counter varies through the loop.",
        "skill": "FOR and WHILE loops"
      },
      {
        "id": "22-iteration-10",
        "prompt": "If a WHILE test is false initially how often does the body execute?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "Forever"
        ],
        "explanation": "A pre-test WHILE can execute zero times.",
        "skill": "FOR and WHILE loops"
      }
    ]
  },
  {
    "id": "22-operators",
    "section": "2.2",
    "spec": "2.2.1",
    "title": "Arithmetic and comparison operators",
    "questions": [
      {
        "id": "22-operators-1",
        "prompt": "What does the + operator do to two numbers?",
        "answer": "Adds them",
        "options": [
          "Adds them",
          "Multiplies them",
          "Divides them",
          "Compares equality"
        ],
        "explanation": "Addition combines numeric values.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-2",
        "prompt": "What does * normally represent?",
        "answer": "Multiplication",
        "options": [
          "Multiplication",
          "Addition",
          "Subtraction",
          "String length"
        ],
        "explanation": "The asterisk represents multiply.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-3",
        "prompt": "What is 12 DIV 5 in integer division?",
        "answer": "2",
        "options": [
          "2",
          "2.4",
          "3",
          "7"
        ],
        "explanation": "Integer division gives a whole-number quotient.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-4",
        "prompt": "What is 12 MOD 5?",
        "answer": "2",
        "options": [
          "2",
          "0",
          "5",
          "12"
        ],
        "explanation": "Modulo returns the remainder after dividing.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-5",
        "prompt": "Which comparison tests not equal?",
        "answer": "!=",
        "options": [
          "!=",
          "==",
          "=",
          ">="
        ],
        "explanation": "The != operator checks whether two values differ.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-6",
        "prompt": "What does >= test?",
        "answer": "Greater than or equal to",
        "options": [
          "Greater than or equal to",
          "Greater than only",
          "Less than only",
          "Not equal to"
        ],
        "explanation": "Equality is included in >=.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-7",
        "prompt": "What is 3 * (2 + 4)?",
        "answer": "18",
        "options": [
          "18",
          "14",
          "11",
          "24"
        ],
        "explanation": "Brackets give 6 then multiply by 3.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-8",
        "prompt": "What is the result of 10 - 7?",
        "answer": "3",
        "options": [
          "3",
          "17",
          "70",
          "1"
        ],
        "explanation": "Subtraction removes seven from ten.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-9",
        "prompt": "Which is a Boolean operator?",
        "answer": "AND",
        "options": [
          "AND",
          "DIV",
          "MOD",
          "+"
        ],
        "explanation": "AND combines Boolean expressions.",
        "skill": "Arithmetic and comparison operators"
      },
      {
        "id": "22-operators-10",
        "prompt": "What is NOT TRUE?",
        "answer": "FALSE",
        "options": [
          "FALSE",
          "TRUE",
          "1",
          "2"
        ],
        "explanation": "NOT reverses the truth value.",
        "skill": "Arithmetic and comparison operators"
      }
    ]
  },
  {
    "id": "22-types",
    "section": "2.2",
    "spec": "2.2.2",
    "title": "Data types and casting",
    "questions": [
      {
        "id": "22-types-1",
        "prompt": "Which type holds a whole number such as 12?",
        "answer": "Integer",
        "options": [
          "Integer",
          "Real only",
          "Boolean",
          "String"
        ],
        "explanation": "Integers store whole numbers.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-2",
        "prompt": "Which type holds a fractional number such as 3.75?",
        "answer": "Real",
        "options": [
          "Real",
          "Integer",
          "Boolean",
          "Character"
        ],
        "explanation": "Real numbers can contain decimal fractions.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-3",
        "prompt": "Which type holds TRUE or FALSE?",
        "answer": "Boolean",
        "options": [
          "Boolean",
          "Integer",
          "Real",
          "String"
        ],
        "explanation": "Boolean data has truth values.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-4",
        "prompt": "Which type holds \"Hello\"?",
        "answer": "String",
        "options": [
          "String",
          "Boolean",
          "Integer",
          "Real"
        ],
        "explanation": "A string is a sequence of characters.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-5",
        "prompt": "What is a character?",
        "answer": "A single symbol",
        "options": [
          "A single symbol",
          "An entire spreadsheet",
          "A network packet",
          "A CPU register"
        ],
        "explanation": "A character stores one text symbol.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-6",
        "prompt": "What is casting?",
        "answer": "Converting between data types",
        "options": [
          "Converting between data types",
          "Moving data from RAM to ROM",
          "Compressing sound",
          "Reordering disk blocks"
        ],
        "explanation": "Casting changes the data type of a value.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-7",
        "prompt": "Why convert input text \"25\" to an integer?",
        "answer": "To use its numerical value in arithmetic",
        "options": [
          "To use its numerical value in arithmetic",
          "To increase CPU cores",
          "To encrypt the program",
          "To remove all possible errors"
        ],
        "explanation": "Text input may need numeric conversion.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-8",
        "prompt": "Which type best records whether access is granted?",
        "answer": "Boolean",
        "options": [
          "Boolean",
          "Real",
          "Integer only",
          "String only"
        ],
        "explanation": "Permission can be modelled as true or false.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-9",
        "prompt": "Which is a string rather than an integer?",
        "answer": "\"123\"",
        "options": [
          "\"123\"",
          "123",
          "-5",
          "0"
        ],
        "explanation": "Quotation marks denote text even if the content is digits.",
        "skill": "Data types and casting"
      },
      {
        "id": "22-types-10",
        "prompt": "What can happen when incompatible data types are combined?",
        "answer": "A type error or unintended operation",
        "options": [
          "A type error or unintended operation",
          "The CPU automatically doubles",
          "Every program file is deleted",
          "All RAM becomes ROM"
        ],
        "explanation": "Operations may require conversion or matching data types.",
        "skill": "Data types and casting"
      }
    ]
  }
];
