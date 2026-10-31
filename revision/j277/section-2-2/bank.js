'use strict';
// OCR J277 2.2 programming MCQs: twelve small skills and 120 original questions.
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
    "id": "22-code-traces",
    "section": "2.2",
    "spec": "2.2.1",
    "title": "Programming constructs: predict the output",
    "questions": [
      {
        "id": "22-code-traces-1",
        "prompt": "What is printed?",
        "answer": "8",
        "options": [
          "8",
          "5",
          "6",
          "13"
        ],
        "explanation": "5 is increased by 3 before printing.",
        "skill": "Programming constructs: predict the output",
        "code": "x = 5\nx = x + 3\nprint(x)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-2",
        "prompt": "What is printed?",
        "answer": "Pass",
        "options": [
          "Pass",
          "Fail",
          "70",
          "Nothing"
        ],
        "explanation": "The >= comparison includes the boundary value 70.",
        "skill": "Programming constructs: predict the output",
        "code": "mark = 70\nif mark >= 70 then\n  print(\"Pass\")\nelse\n  print(\"Fail\")\nendif",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-3",
        "prompt": "How many times does the loop execute its body?",
        "answer": "4",
        "options": [
          "4",
          "3",
          "5",
          "0"
        ],
        "explanation": "The loop visits values 1,2,3,4 inclusive.",
        "skill": "Programming constructs: predict the output",
        "code": "count = 0\nfor i = 1 to 4\n  count = count + 1\nnext i",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-4",
        "prompt": "What is the value of total after the loop?",
        "answer": "10",
        "options": [
          "10",
          "6",
          "4",
          "12"
        ],
        "explanation": "The loop adds 1+2+3+4.",
        "skill": "Programming constructs: predict the output",
        "code": "total = 0\nfor n = 1 to 4\n  total = total + n\nnext n",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-5",
        "prompt": "What is printed?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "3",
          "No output"
        ],
        "explanation": "The WHILE condition is false from the start, so count stays 0.",
        "skill": "Programming constructs: predict the output",
        "code": "count = 0\nwhile count > 3\n  count = count + 1\nendwhile\nprint(count)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-6",
        "prompt": "What is printed?",
        "answer": "7",
        "options": [
          "7",
          "5",
          "9",
          "4"
        ],
        "explanation": "Starting from 3, two increments of 2 give 7.",
        "skill": "Programming constructs: predict the output",
        "code": "x = 3\nfor i = 1 to 2\n  x = x + 2\nnext i\nprint(x)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-7",
        "prompt": "Which message is printed?",
        "answer": "Teen",
        "options": [
          "Teen",
          "Adult",
          "Child",
          "No output"
        ],
        "explanation": "Age 15 is not at least 18, but it is at least 13.",
        "skill": "Programming constructs: predict the output",
        "code": "age = 15\nif age >= 18 then\n  print(\"Adult\")\nelseif age >= 13 then\n  print(\"Teen\")\nelse\n  print(\"Child\")\nendif",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-8",
        "prompt": "What is printed?",
        "answer": "3",
        "options": [
          "3",
          "2",
          "4",
          "1"
        ],
        "explanation": "6 DIV 2 gives the integer quotient 3.",
        "skill": "Programming constructs: predict the output",
        "code": "print(6 DIV 2)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-9",
        "prompt": "What is printed?",
        "answer": "2",
        "options": [
          "2",
          "5",
          "3",
          "0"
        ],
        "explanation": "17 MOD 5 is the remainder 2.",
        "skill": "Programming constructs: predict the output",
        "code": "print(17 MOD 5)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-code-traces-10",
        "prompt": "What is printed?",
        "answer": "4",
        "options": [
          "4",
          "3",
          "5",
          "6"
        ],
        "explanation": "The loop increments x from 1 until x reaches 4; then x < 4 is false.",
        "skill": "Programming constructs: predict the output",
        "code": "x = 1\nwhile x < 4\n  x = x + 1\nendwhile\nprint(x)",
        "language": "OCR Exam Reference Language"
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
  },
  {
    "id": "22-strings",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "String operations",
    "questions": [
      {
        "id": "22-strings-1",
        "prompt": "What is a string?",
        "answer": "A sequence of characters",
        "options": [
          "A sequence of characters",
          "A whole-number type",
          "A hardware register",
          "A disk partition"
        ],
        "explanation": "Text can be represented as strings.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-2",
        "prompt": "What does concatenation do?",
        "answer": "Joins strings together",
        "options": [
          "Joins strings together",
          "Deletes all strings",
          "Sorts integers",
          "Divides two real values"
        ],
        "explanation": "Concatenation creates text from text parts.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-3",
        "prompt": "What is the result of joining \"Cat\" and \"fish\"?",
        "answer": "Catfish",
        "options": [
          "Catfish",
          "Cat fish",
          "Cat+fish",
          "fishCat"
        ],
        "explanation": "Without an added space concatenation places text directly together.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-4",
        "prompt": "What does string length measure?",
        "answer": "The number of characters",
        "options": [
          "The number of characters",
          "The number of RAM chips",
          "The number of files",
          "The CPU clock speed"
        ],
        "explanation": "Length is the character count.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-5",
        "prompt": "What is a substring?",
        "answer": "Part of an existing string",
        "options": [
          "Part of an existing string",
          "A type of CPU cache",
          "A network protocol",
          "A whole-number remainder"
        ],
        "explanation": "Substring operations take a section of text.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-6",
        "prompt": "Why might a program use string slicing?",
        "answer": "To extract characters from specified positions",
        "options": [
          "To extract characters from specified positions",
          "To increase core count",
          "To download drivers",
          "To change video resolution"
        ],
        "explanation": "Slicing selects a portion of text.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-7",
        "prompt": "What should be considered when comparing strings?",
        "answer": "Capitalisation may affect equality",
        "options": [
          "Capitalisation may affect equality",
          "All strings always compare equal",
          "Only screen size matters",
          "Strings cannot contain numbers"
        ],
        "explanation": "Case and exact characters can affect comparison.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-8",
        "prompt": "Which data type suits a UK postcode?",
        "answer": "String",
        "options": [
          "String",
          "Real",
          "Boolean only",
          "Integer only"
        ],
        "explanation": "Postcodes mix letters and digits and are identifiers rather than quantities.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-9",
        "prompt": "What could trim do to user-entered text?",
        "answer": "Remove unwanted leading or trailing spaces",
        "options": [
          "Remove unwanted leading or trailing spaces",
          "Change hardware clocks",
          "Encrypt the hard disk",
          "Create extra arrays"
        ],
        "explanation": "Trimming can normalise accidental spaces.",
        "skill": "String operations"
      },
      {
        "id": "22-strings-10",
        "prompt": "What might a string search return?",
        "answer": "The position of matching text",
        "options": [
          "The position of matching text",
          "The total number of CPU cores",
          "The MAC address of a router",
          "The printer speed"
        ],
        "explanation": "A search can locate a substring within a larger string.",
        "skill": "String operations"
      }
    ]
  },
  {
    "id": "22-string-slicing",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "String slicing and OCR ERL operations",
    "questions": [
      {
        "id": "22-string-slicing-1",
        "prompt": "What does the OCR ERL expression return?",
        "answer": "Comp",
        "options": [
          "Comp",
          "Compute",
          "uter",
          "ompu"
        ],
        "explanation": ".left(4) returns the first four characters.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"Computer\"\nprint(word.left(4))",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-2",
        "prompt": "What does the OCR ERL expression return?",
        "answer": "ter",
        "options": [
          "ter",
          "uter",
          "put",
          "Compute"
        ],
        "explanation": ".right(3) returns the final three characters.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"Computer\"\nprint(word.right(3))",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-3",
        "prompt": "What is printed?",
        "answer": "put",
        "options": [
          "put",
          "mpu",
          "ute",
          "Comp"
        ],
        "explanation": ".substring(3,3) starts at zero-based index 3 and returns three characters.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"Computer\"\nprint(word.substring(3,3))",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-4",
        "prompt": "What is printed?",
        "answer": "8",
        "options": [
          "8",
          "7",
          "9",
          "4"
        ],
        "explanation": "There are eight characters in Computer.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"Computer\"\nprint(word.length)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-5",
        "prompt": "What is printed?",
        "answer": "SunDay",
        "options": [
          "SunDay",
          "Sunday",
          "Sun Day",
          "SunD"
        ],
        "explanation": "Concatenation joins the two strings with no extra space.",
        "skill": "String slicing and OCR ERL operations",
        "code": "print(\"Sun\" + \"Day\")",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-6",
        "prompt": "What is printed?",
        "answer": "SCIENCE",
        "options": [
          "SCIENCE",
          "Science",
          "science",
          "SCI"
        ],
        "explanation": ".upper changes all letters to uppercase.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"Science\"\nprint(word.upper)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-7",
        "prompt": "What is printed?",
        "answer": "science",
        "options": [
          "science",
          "Science",
          "SCIENCE",
          "sci"
        ],
        "explanation": ".lower changes all letters to lowercase.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"SCIENCE\"\nprint(word.lower)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-8",
        "prompt": "What does this expression return?",
        "answer": "Exam",
        "options": [
          "Exam",
          "Exams",
          "xam",
          "Exa"
        ],
        "explanation": "The substring starts at index 0 and contains four characters.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"Exams\"\nprint(word.substring(0,4))",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-string-slicing-9",
        "prompt": "Which expression extracts the last two characters of word in OCR ERL?",
        "answer": "word.right(2)",
        "options": [
          "word.right(2)",
          "word.left(2)",
          "word.substring(2,0)",
          "word.length(2)"
        ],
        "explanation": "right(2) selects the final two characters, regardless of word length.",
        "skill": "String slicing and OCR ERL operations"
      },
      {
        "id": "22-string-slicing-10",
        "prompt": "What is printed?",
        "answer": "Cup",
        "options": [
          "Cup",
          "Up",
          "CUP",
          "CupUp"
        ],
        "explanation": "The first character, C, is joined to the final two characters, up.",
        "skill": "String slicing and OCR ERL operations",
        "code": "word = \"Computer\"\nprint(word.left(1) + word.right(2))",
        "language": "OCR Exam Reference Language"
      }
    ]
  },
  {
    "id": "22-array1",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "One-dimensional arrays",
    "questions": [
      {
        "id": "22-array1-1",
        "prompt": "What is a one-dimensional array?",
        "answer": "An indexed collection of values",
        "options": [
          "An indexed collection of values",
          "A single Boolean operator",
          "A network topology",
          "A hard-disk protocol"
        ],
        "explanation": "Arrays store multiple values accessible by index.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-2",
        "prompt": "What is an array index?",
        "answer": "The position used to select an element",
        "options": [
          "The position used to select an element",
          "The disk serial number",
          "The address of a website",
          "The CPU clock speed"
        ],
        "explanation": "Indexing selects individual array items.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-3",
        "prompt": "In a zero-based array what is the first index?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "-1",
          "10"
        ],
        "explanation": "Zero-based indexing begins at zero.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-4",
        "prompt": "A zero-based array holds 5 items. What is its last valid index?",
        "answer": "4",
        "options": [
          "4",
          "5",
          "6",
          "1"
        ],
        "explanation": "Indices range from zero to four.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-5",
        "prompt": "What is array traversal?",
        "answer": "Visiting array elements in turn",
        "options": [
          "Visiting array elements in turn",
          "Connecting network devices",
          "Deleting all items",
          "Compressing the data"
        ],
        "explanation": "Traversal processes each element using its index.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-6",
        "prompt": "An array holds [3, 7, 9]. What is values[1] using zero-based indexing?",
        "answer": "7",
        "options": [
          "7",
          "3",
          "9",
          "1"
        ],
        "explanation": "Index 1 accesses the second item.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-7",
        "prompt": "What can happen if an index is outside an array's valid range?",
        "answer": "An index error",
        "options": [
          "An index error",
          "The CPU becomes faster",
          "The array is automatically doubled",
          "The data becomes encrypted"
        ],
        "explanation": "Out-of-range accesses can fail.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-8",
        "prompt": "Why use an array for 30 test scores?",
        "answer": "It groups related values with index access",
        "options": [
          "It groups related values with index access",
          "It prevents all programming errors",
          "It replaces every loop",
          "It creates a new OS"
        ],
        "explanation": "Related scores can be processed as a collection.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-9",
        "prompt": "What is an array update?",
        "answer": "Assigning a new value to an indexed element",
        "options": [
          "Assigning a new value to an indexed element",
          "Changing the computer's MAC address",
          "Formatting the drive",
          "Changing the data type of the CPU"
        ],
        "explanation": "Assigning to an element changes that stored entry.",
        "skill": "One-dimensional arrays"
      },
      {
        "id": "22-array1-10",
        "prompt": "Which construct is useful for visiting every array item?",
        "answer": "FOR loop",
        "options": [
          "FOR loop",
          "Only a print statement",
          "Only an IF branch",
          "A storage utility"
        ],
        "explanation": "A loop can iterate over valid indices.",
        "skill": "One-dimensional arrays"
      }
    ]
  },
  {
    "id": "22-array2",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "Two-dimensional arrays and records",
    "questions": [
      {
        "id": "22-array2-1",
        "prompt": "What does a two-dimensional array resemble?",
        "answer": "A table of rows and columns",
        "options": [
          "A table of rows and columns",
          "One Boolean value",
          "A single character",
          "A network packet"
        ],
        "explanation": "2D arrays are indexed by row and column.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-2",
        "prompt": "How many cells are in a 3 by 4 2D array?",
        "answer": "12",
        "options": [
          "12",
          "7",
          "3",
          "4"
        ],
        "explanation": "Multiply rows by columns.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-3",
        "prompt": "How is an element of a 2D array commonly addressed?",
        "answer": "With two indices",
        "options": [
          "With two indices",
          "By its hard drive capacity",
          "Only by a filename",
          "By a public IP address"
        ],
        "explanation": "One index chooses the row and another the column.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-4",
        "prompt": "In a zero-based 3 by 3 grid which pair identifies the top-left cell?",
        "answer": "[0][0]",
        "options": [
          "[0][0]",
          "[1][1]",
          "[3][3]",
          "[-1][0]"
        ],
        "explanation": "The top-left is first row and first column.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-5",
        "prompt": "Why might a game board use a 2D array?",
        "answer": "Each square has a row and column location",
        "options": [
          "Each square has a row and column location",
          "It eliminates input handling",
          "It adds processor cores",
          "It automatically creates graphics"
        ],
        "explanation": "Boards naturally form grids.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-6",
        "prompt": "How many elements are in a 5 by 2 2D array?",
        "answer": "10",
        "options": [
          "10",
          "7",
          "25",
          "2"
        ],
        "explanation": "Five rows times two columns equals ten.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-7",
        "prompt": "What is a record?",
        "answer": "A collection of named fields describing one item",
        "options": [
          "A collection of named fields describing one item",
          "A CPU register",
          "Only a list of integers",
          "A network cable"
        ],
        "explanation": "Records group related attributes such as name and score.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-8",
        "prompt": "Which is a record field?",
        "answer": "studentName",
        "options": [
          "studentName",
          "A network topology",
          "CPU speed as hardware only",
          "An operating system process"
        ],
        "explanation": "A field stores one attribute within the record.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-9",
        "prompt": "What could a record represent?",
        "answer": "One pupil with name and mark fields",
        "options": [
          "One pupil with name and mark fields",
          "A whole computer network only",
          "A printer's electric motor",
          "A CPU control signal"
        ],
        "explanation": "Records collect values describing one entity.",
        "skill": "Two-dimensional arrays and records"
      },
      {
        "id": "22-array2-10",
        "prompt": "Which approach processes every cell of a 2D grid?",
        "answer": "Nested iteration over rows and columns",
        "options": [
          "Nested iteration over rows and columns",
          "A single constant assignment",
          "Only one IF statement",
          "A disk defragmenter"
        ],
        "explanation": "Two nested loops can traverse both dimensions.",
        "skill": "Two-dimensional arrays and records"
      }
    ]
  },
  {
    "id": "22-subprograms",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "Procedures, functions and parameters",
    "questions": [
      {
        "id": "22-subprograms-1",
        "prompt": "What is a subprogram?",
        "answer": "A named reusable block of instructions",
        "options": [
          "A named reusable block of instructions",
          "A network protocol",
          "A type of ROM",
          "A hard-drive partition"
        ],
        "explanation": "Subprograms separate and reuse program behaviour.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-2",
        "prompt": "What is a procedure?",
        "answer": "A callable block performing actions without necessarily returning a value",
        "options": [
          "A callable block performing actions without necessarily returning a value",
          "Only a Boolean expression",
          "A secondary storage device",
          "A data packet"
        ],
        "explanation": "Procedures perform tasks when called.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-3",
        "prompt": "What is a function?",
        "answer": "A subprogram designed to return a result",
        "options": [
          "A subprogram designed to return a result",
          "Only a graphical icon",
          "An optical disk",
          "A data encryption key"
        ],
        "explanation": "Functions compute or provide a value.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-4",
        "prompt": "What is a parameter?",
        "answer": "A named input accepted by a subprogram",
        "options": [
          "A named input accepted by a subprogram",
          "A monitor size",
          "A CPU instruction address",
          "A kind of network cable"
        ],
        "explanation": "Parameters let callers provide different data.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-5",
        "prompt": "What is an argument?",
        "answer": "A value supplied when a subprogram is called",
        "options": [
          "A value supplied when a subprogram is called",
          "A compiler error only",
          "An empty array",
          "A user login account"
        ],
        "explanation": "Arguments populate parameters at call time.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-6",
        "prompt": "What is a return value?",
        "answer": "A value sent back by a function",
        "options": [
          "A value sent back by a function",
          "The program's filename",
          "A router's address",
          "An array's maximum memory size"
        ],
        "explanation": "Functions use a result in the calling expression.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-7",
        "prompt": "Why use functions instead of duplicating calculations?",
        "answer": "To improve reuse and maintainability",
        "options": [
          "To improve reuse and maintainability",
          "To avoid all testing",
          "To speed up every CPU automatically",
          "To remove input data"
        ],
        "explanation": "A single subprogram can be called in several places.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-8",
        "prompt": "What is local scope?",
        "answer": "A variable is accessible within its defined subprogram context",
        "options": [
          "A variable is accessible within its defined subprogram context",
          "A value is available globally by default",
          "A special RAM module",
          "A file named local"
        ],
        "explanation": "Local variables are limited in visibility.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-9",
        "prompt": "What is global scope?",
        "answer": "A variable can be accessed across wider program contexts",
        "options": [
          "A variable can be accessed across wider program contexts",
          "A variable always stores text",
          "A loop runs forever",
          "A function cannot return values"
        ],
        "explanation": "Global variables have wider visibility and can create dependencies.",
        "skill": "Procedures, functions and parameters"
      },
      {
        "id": "22-subprograms-10",
        "prompt": "Why split a large program into subprograms?",
        "answer": "To support decomposition and simpler testing",
        "options": [
          "To support decomposition and simpler testing",
          "To increase monitor brightness",
          "To disable variables",
          "To replace all arrays"
        ],
        "explanation": "Small reusable units are easier to understand and test.",
        "skill": "Procedures, functions and parameters"
      }
    ]
  },
  {
    "id": "22-array-parameters",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "Subprograms, arrays and local variables",
    "questions": [
      {
        "id": "22-array-parameters-1",
        "prompt": "What is printed when the function is called?",
        "answer": "9",
        "options": [
          "9",
          "3",
          "6",
          "12"
        ],
        "explanation": "The function returns the square of its input, 3×3.",
        "skill": "Subprograms, arrays and local variables",
        "code": "function square(n)\n  return n * n\nendfunction\nprint(square(3))",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-array-parameters-2",
        "prompt": "In a function, what is a local variable?",
        "answer": "A variable accessible inside its own subprogram",
        "options": [
          "A variable accessible inside its own subprogram",
          "A value every program can change from anywhere",
          "A variable stored only in a file",
          "An argument passed to every subprogram automatically"
        ],
        "explanation": "Local scope limits access to the subprogram's local context.",
        "skill": "Subprograms, arrays and local variables"
      },
      {
        "id": "22-array-parameters-3",
        "prompt": "What is printed?",
        "answer": "5",
        "options": [
          "5",
          "9",
          "4",
          "14"
        ],
        "explanation": "The procedure receives n as a parameter and prints n+4.",
        "skill": "Subprograms, arrays and local variables",
        "code": "procedure show(n)\n  print(n + 4)\nendprocedure\nshow(1)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-array-parameters-4",
        "prompt": "A function processes a fixed-length integer array. What is a suitable parameter?",
        "answer": "The integer array to be processed",
        "options": [
          "The integer array to be processed",
          "The function's source-code filename",
          "The screen's background colour",
          "Only a separate integer constant"
        ],
        "explanation": "Passing the array makes the function reusable with different datasets.",
        "skill": "Subprograms, arrays and local variables"
      },
      {
        "id": "22-array-parameters-5",
        "prompt": "A function returns a new list of filtered values. Why return that array?",
        "answer": "The caller can use the filtered results",
        "options": [
          "The caller can use the filtered results",
          "Returning an array automatically deletes the input",
          "Array results cannot be stored",
          "The caller must ignore all function results"
        ],
        "explanation": "The returned collection provides the new computed result for the calling code.",
        "skill": "Subprograms, arrays and local variables"
      },
      {
        "id": "22-array-parameters-6",
        "prompt": "What is printed?",
        "answer": "6",
        "options": [
          "6",
          "3",
          "4",
          "9"
        ],
        "explanation": "The function adds the two input parameters and returns 6.",
        "skill": "Subprograms, arrays and local variables",
        "code": "function add(a,b)\n  return a+b\nendfunction\nprint(add(2,4))",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-array-parameters-7",
        "prompt": "Which of these is a sensible reason to pass a 1D array into a function?",
        "answer": "To process values without hard-coding one dataset",
        "options": [
          "To process values without hard-coding one dataset",
          "To make the function require no inputs",
          "To guarantee every array contains the same values",
          "To remove the need for a return statement in every function"
        ],
        "explanation": "The parameter supplies the actual array at each call.",
        "skill": "Subprograms, arrays and local variables"
      },
      {
        "id": "22-array-parameters-8",
        "prompt": "What value is printed by this function?",
        "answer": "3",
        "options": [
          "3",
          "2",
          "4",
          "5"
        ],
        "explanation": "The parameter receives the array and the loop counts three entries. The length is three.",
        "skill": "Subprograms, arrays and local variables",
        "code": "function countItems(values)\n  return values.length\nendfunction\narray nums = [5, 8, 2]\nprint(countItems(nums))",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-array-parameters-9",
        "prompt": "What is printed?",
        "answer": "10",
        "options": [
          "10",
          "5",
          "15",
          "0"
        ],
        "explanation": "The procedure prints the value it receives; the caller supplies 10.",
        "skill": "Subprograms, arrays and local variables",
        "code": "procedure display(value)\n  print(value)\nendprocedure\nx = 10\ndisplay(x)",
        "language": "OCR Exam Reference Language"
      },
      {
        "id": "22-array-parameters-10",
        "prompt": "What is a potential risk of relying on global variables inside many subprograms?",
        "answer": "Changes in one subprogram can affect another unexpectedly",
        "options": [
          "Changes in one subprogram can affect another unexpectedly",
          "Every function becomes easier to test in isolation",
          "Subprograms can no longer accept parameters",
          "Global variables automatically prevent data corruption"
        ],
        "explanation": "Shared global state increases coupling and hidden side effects.",
        "skill": "Subprograms, arrays and local variables"
      }
    ]
  },
  {
    "id": "22-files",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "File handling",
    "questions": [
      {
        "id": "22-files-1",
        "prompt": "Why does a program use file handling?",
        "answer": "To store or retrieve data persistently",
        "options": [
          "To store or retrieve data persistently",
          "To increase CPU clock speed",
          "To create a switch",
          "To resize every image"
        ],
        "explanation": "Files allow data to survive after the program exits.",
        "skill": "File handling"
      },
      {
        "id": "22-files-2",
        "prompt": "What is the role of opening a file?",
        "answer": "Establish access for reading or writing",
        "options": [
          "Establish access for reading or writing",
          "Increase RAM physically",
          "Change an IP address",
          "Create an encryption algorithm"
        ],
        "explanation": "The program opens a file to perform file operations.",
        "skill": "File handling"
      },
      {
        "id": "22-files-3",
        "prompt": "What does reading a file do?",
        "answer": "Load stored content into the program",
        "options": [
          "Load stored content into the program",
          "Erase it by default",
          "Increase the file-system capacity",
          "Compile the CPU"
        ],
        "explanation": "Reading obtains previously saved data.",
        "skill": "File handling"
      },
      {
        "id": "22-files-4",
        "prompt": "What does writing a file do?",
        "answer": "Store data in the file",
        "options": [
          "Store data in the file",
          "Compare two IP addresses",
          "Change every variable to Boolean",
          "Defragment an SSD"
        ],
        "explanation": "Writing records information on storage.",
        "skill": "File handling"
      },
      {
        "id": "22-files-5",
        "prompt": "What should a program do after finishing file operations?",
        "answer": "Close the file properly",
        "options": [
          "Close the file properly",
          "Remove the operating system",
          "Delete every folder",
          "Disable permissions"
        ],
        "explanation": "Closing helps release resources and finish writes.",
        "skill": "File handling"
      },
      {
        "id": "22-files-6",
        "prompt": "What can an append operation do?",
        "answer": "Add content at the end of a file",
        "options": [
          "Add content at the end of a file",
          "Always replace every earlier byte",
          "Change the filename extension only",
          "Move the file into RAM permanently"
        ],
        "explanation": "Appending preserves existing content while adding new data.",
        "skill": "File handling"
      },
      {
        "id": "22-files-7",
        "prompt": "Which file mode is suitable for reading existing data?",
        "answer": "Read mode",
        "options": [
          "Read mode",
          "Write-only mode",
          "Random mode",
          "Delete mode"
        ],
        "explanation": "Read mode opens existing content for retrieval.",
        "skill": "File handling"
      },
      {
        "id": "22-files-8",
        "prompt": "What is one danger of overwrite write mode?",
        "answer": "Existing data may be replaced",
        "options": [
          "Existing data may be replaced",
          "The CPU doubles its cores",
          "Every file becomes Unicode",
          "It automatically creates backups"
        ],
        "explanation": "Programs should avoid unintended loss of saved content.",
        "skill": "File handling"
      },
      {
        "id": "22-files-9",
        "prompt": "Why check for file errors?",
        "answer": "A missing file or unavailable storage may prevent access",
        "options": [
          "A missing file or unavailable storage may prevent access",
          "Files never fail",
          "File operations are always instant",
          "Only monitors experience errors"
        ],
        "explanation": "Programs should handle failed open and read operations.",
        "skill": "File handling"
      },
      {
        "id": "22-files-10",
        "prompt": "What is a sensible use of persistent file data?",
        "answer": "Saving a player's high score between sessions",
        "options": [
          "Saving a player's high score between sessions",
          "Storing a temporary loop counter only",
          "Changing the processor model",
          "Creating a network NIC"
        ],
        "explanation": "Persistent records can be loaded when the program runs again.",
        "skill": "File handling"
      }
    ]
  },
  {
    "id": "22-sql",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "SQL SELECT, FROM and WHERE",
    "questions": [
      {
        "id": "22-sql-1",
        "prompt": "What is SQL mainly used for?",
        "answer": "Working with relational databases",
        "options": [
          "Working with relational databases",
          "Increasing CPU cache",
          "Compressing sound",
          "Drawing flowcharts only"
        ],
        "explanation": "SQL can retrieve and manage structured table data.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-2",
        "prompt": "What does SELECT do in a query?",
        "answer": "Specify the fields to return",
        "options": [
          "Specify the fields to return",
          "Name the current network",
          "Delete all rows automatically",
          "Open an image file"
        ],
        "explanation": "SELECT identifies the columns requested.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-3",
        "prompt": "What does FROM identify?",
        "answer": "The table to query",
        "options": [
          "The table to query",
          "The CPU's instruction count",
          "The database password",
          "The file extension"
        ],
        "explanation": "FROM names the source table.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-4",
        "prompt": "What is WHERE used for?",
        "answer": "Filter records using a condition",
        "options": [
          "Filter records using a condition",
          "Sort the CPU cache",
          "Set monitor brightness",
          "Compress text"
        ],
        "explanation": "WHERE limits which rows match the query.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-5",
        "prompt": "Which query selects every field from Pupils?",
        "answer": "SELECT * FROM Pupils",
        "options": [
          "SELECT * FROM Pupils",
          "FROM * SELECT Pupils",
          "SHOW ALL Pupils WHERE",
          "PRINT Pupils ONLY"
        ],
        "explanation": "The asterisk means all columns.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-6",
        "prompt": "What does SELECT Name FROM Pupils return?",
        "answer": "Values from the Name column",
        "options": [
          "Values from the Name column",
          "Every column in every table",
          "Only the number of rows",
          "The database file size"
        ],
        "explanation": "SELECT targets a named column.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-7",
        "prompt": "What does WHERE Score > 50 do?",
        "answer": "Return rows with Score greater than 50",
        "options": [
          "Return rows with Score greater than 50",
          "Return every record regardless of score",
          "Delete scores less than 50",
          "Create a column named Score"
        ],
        "explanation": "The condition filters the result.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-8",
        "prompt": "What does SELECT Name FROM Pupils WHERE Score >= 70 return?",
        "answer": "Names of pupils meeting the score condition",
        "options": [
          "Names of pupils meeting the score condition",
          "Every score only",
          "All pupil names regardless of score",
          "Nothing because WHERE is forbidden"
        ],
        "explanation": "The query selects Name from matching rows.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-9",
        "prompt": "What is a database record in a table?",
        "answer": "One row",
        "options": [
          "One row",
          "One column name",
          "A single SQL keyword",
          "A CPU register"
        ],
        "explanation": "A row stores one entity's field values.",
        "skill": "SQL SELECT, FROM and WHERE"
      },
      {
        "id": "22-sql-10",
        "prompt": "What is a database field in a table?",
        "answer": "A column or named attribute",
        "options": [
          "A column or named attribute",
          "Every row combined",
          "A physical drive",
          "A stored password by definition"
        ],
        "explanation": "Columns represent categories of information.",
        "skill": "SQL SELECT, FROM and WHERE"
      }
    ]
  },
  {
    "id": "22-random",
    "section": "2.2",
    "spec": "2.2.3",
    "title": "Random values and combined techniques",
    "questions": [
      {
        "id": "22-random-1",
        "prompt": "What is a random-number function used for?",
        "answer": "Producing values selected within a specified range",
        "options": [
          "Producing values selected within a specified range",
          "Encrypting every file automatically",
          "Changing CPU cores",
          "Creating a DNS lookup"
        ],
        "explanation": "Random values are used in simulations and games.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-2",
        "prompt": "Which is a sensible use of random numbers?",
        "answer": "Selecting a quiz question at random",
        "options": [
          "Selecting a quiz question at random",
          "Choosing the CPU's physical address",
          "Guaranteeing a password is secure",
          "Replacing all program variables"
        ],
        "explanation": "Random selection can vary program behaviour.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-3",
        "prompt": "Why should random values have appropriate bounds?",
        "answer": "The program may require only valid outcomes",
        "options": [
          "The program may require only valid outcomes",
          "All random values are negative",
          "Ranges prevent every bug",
          "Random values never repeat"
        ],
        "explanation": "Bounds keep outcomes inside the intended set.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-4",
        "prompt": "A six-sided dice simulator should generate what values?",
        "answer": "1 through 6",
        "options": [
          "1 through 6",
          "0 through 9",
          "1 through 100",
          "Only 6"
        ],
        "explanation": "A dice has six valid face values.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-5",
        "prompt": "What can happen if two random picks return the same number?",
        "answer": "A repeated result may occur",
        "options": [
          "A repeated result may occur",
          "The CPU must reboot",
          "The program is invalid",
          "The RNG stops permanently"
        ],
        "explanation": "Random results can repeat unless uniqueness is explicitly enforced.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-6",
        "prompt": "Which construct can check whether a random result equals 6?",
        "answer": "IF statement",
        "options": [
          "IF statement",
          "Defragmentation",
          "A DNS query",
          "File compression"
        ],
        "explanation": "Selection can react to generated numbers.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-7",
        "prompt": "Which data type best holds a dice roll?",
        "answer": "Integer",
        "options": [
          "Integer",
          "String only",
          "Character only",
          "Real only"
        ],
        "explanation": "A die outcome is a whole number.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-8",
        "prompt": "Why might a random quiz generator keep a list of chosen indices?",
        "answer": "To avoid repeats when unique questions are required",
        "options": [
          "To avoid repeats when unique questions are required",
          "To turn a hard drive into RAM",
          "To reduce monitor resolution",
          "To avoid any code testing"
        ],
        "explanation": "Tracking selections supports sampling without replacement.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-9",
        "prompt": "What is a pseudorandom number?",
        "answer": "A value produced by a deterministic algorithm that appears random",
        "options": [
          "A value produced by a deterministic algorithm that appears random",
          "A physical disk drive",
          "A perfectly predictable user input only",
          "A guaranteed true random sample"
        ],
        "explanation": "Most software RNGs produce pseudorandom sequences.",
        "skill": "Random values and combined techniques"
      },
      {
        "id": "22-random-10",
        "prompt": "Why test a program that uses random numbers with varied results?",
        "answer": "Different outcomes can exercise different branches",
        "options": [
          "Different outcomes can exercise different branches",
          "Random programs never fail",
          "Only one result matters",
          "Testing changes the CPU's clock speed"
        ],
        "explanation": "Testing multiple outcomes can reveal edge cases.",
        "skill": "Random values and combined techniques"
      }
    ]
  }
];
