'use strict';
// OCR J277 2.3 robust programs: validation, test plans and debugging.
const J277_SECTION={"code":"2.3","title":"Producing Robust Programs"};
const SKILLS=[
  {
    "id": "23-defensive",
    "section": "2.3",
    "spec": "2.3.1",
    "title": "Defensive design and input validation",
    "questions": [
      {
        "id": "23-defensive-1",
        "prompt": "What is defensive design?",
        "answer": "Planning for incorrect input and misuse",
        "options": [
          "Planning for incorrect input and misuse",
          "Assuming every user enters correct data",
          "Writing programs without testing",
          "Storing every password in plain text"
        ],
        "explanation": "Defensive programs anticipate faults and inappropriate use.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-2",
        "prompt": "What is input validation?",
        "answer": "Checking that input satisfies defined rules",
        "options": [
          "Checking that input satisfies defined rules",
          "Proving the data is factually true",
          "Encrypting every input",
          "Sorting every input value"
        ],
        "explanation": "Validation checks format range type or presence.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-3",
        "prompt": "Which is a range check?",
        "answer": "Age must be between 11 and 18",
        "options": [
          "Age must be between 11 and 18",
          "Age must be spelled correctly",
          "Age must be in a database already",
          "Age must be the user's real age"
        ],
        "explanation": "A range check tests numerical boundaries.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-4",
        "prompt": "Which is a presence check?",
        "answer": "A required field cannot be empty",
        "options": [
          "A required field cannot be empty",
          "A score must be at least 0",
          "A username must be six characters",
          "An email is sent correctly"
        ],
        "explanation": "Presence requires a value rather than a blank field.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-5",
        "prompt": "What is a length check?",
        "answer": "Testing the number of characters",
        "options": [
          "Testing the number of characters",
          "Checking the amount of installed RAM",
          "Testing network latency",
          "Measuring monitor height"
        ],
        "explanation": "Length checks enforce minimum or maximum character counts.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-6",
        "prompt": "Which method helps prevent repeated invalid input?",
        "answer": "Loop until a permitted value is entered",
        "options": [
          "Loop until a permitted value is entered",
          "Trust the first value unconditionally",
          "Disable all error messages",
          "Convert every value to Boolean"
        ],
        "explanation": "Input loops can prompt again after rejection.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-7",
        "prompt": "What is authentication?",
        "answer": "Checking that someone is who they claim to be",
        "options": [
          "Checking that someone is who they claim to be",
          "Giving every user administrator rights",
          "Encrypting any image",
          "Assigning a network route"
        ],
        "explanation": "Authentication verifies identity before granting access.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-8",
        "prompt": "What does a clear error message help users do?",
        "answer": "Correct an invalid entry",
        "options": [
          "Correct an invalid entry",
          "Increase CPU performance",
          "Bypass every security control",
          "Delete all storage"
        ],
        "explanation": "Helpful messages explain the required format or range.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-9",
        "prompt": "Why limit a program's access permissions?",
        "answer": "Reduce damage from mistakes or unauthorised actions",
        "options": [
          "Reduce damage from mistakes or unauthorised actions",
          "Make it run on a bigger monitor",
          "Avoid all data types",
          "Increase disk capacity"
        ],
        "explanation": "Least privilege limits what a user or process can change.",
        "skill": "Defensive design and input validation"
      },
      {
        "id": "23-defensive-10",
        "prompt": "What is a maintainable coding practice?",
        "answer": "Use clear names indentation and meaningful comments",
        "options": [
          "Use clear names indentation and meaningful comments",
          "Use one-letter names everywhere",
          "Remove all comments regardless of purpose",
          "Duplicate every block of code"
        ],
        "explanation": "Readable documented structure makes change and checking easier.",
        "skill": "Defensive design and input validation"
      }
    ]
  },
  {
    "id": "23-testing",
    "section": "2.3",
    "spec": "2.3.2",
    "title": "Test data: normal, boundary and invalid",
    "questions": [
      {
        "id": "23-testing-1",
        "prompt": "What is testing?",
        "answer": "Checking whether a program behaves as expected",
        "options": [
          "Checking whether a program behaves as expected",
          "Guaranteeing any program is perfect",
          "Only adding new features",
          "Deleting old code"
        ],
        "explanation": "Tests compare actual outputs with expected behaviour.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-2",
        "prompt": "What is normal test data?",
        "answer": "An ordinary valid value",
        "options": [
          "An ordinary valid value",
          "A value outside every valid range",
          "An empty file only",
          "Always the highest possible value"
        ],
        "explanation": "Normal data represents typical valid use.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-3",
        "prompt": "What is boundary test data?",
        "answer": "Values on or near valid limits",
        "options": [
          "Values on or near valid limits",
          "Only a string of letters",
          "Any random invalid input",
          "Every value larger than RAM"
        ],
        "explanation": "Boundary cases test around permitted edges.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-4",
        "prompt": "What is invalid test data?",
        "answer": "A value that should be rejected",
        "options": [
          "A value that should be rejected",
          "Any typical allowed input",
          "A value exactly on a valid boundary",
          "A known correct password only"
        ],
        "explanation": "Invalid inputs should trigger defensive behaviour.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-5",
        "prompt": "For an age range 11 to 18 inclusive which is a boundary valid value?",
        "answer": "11",
        "options": [
          "11",
          "10",
          "19",
          "-1"
        ],
        "explanation": "The lower inclusive bound is 11.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-6",
        "prompt": "For age 11 to 18 inclusive which is just below the lower bound?",
        "answer": "10",
        "options": [
          "10",
          "11",
          "12",
          "18"
        ],
        "explanation": "Ten should be rejected and tests the lower boundary.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-7",
        "prompt": "For a permitted mark 0 to 100 which is invalid?",
        "answer": "101",
        "options": [
          "101",
          "100",
          "50",
          "0"
        ],
        "explanation": "101 exceeds the upper bound.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-8",
        "prompt": "What should a test plan include?",
        "answer": "Inputs expected results and actual results",
        "options": [
          "Inputs expected results and actual results",
          "Only the program filename",
          "Only the CPU model",
          "Only the programmer's initials"
        ],
        "explanation": "A test plan checks actual behaviour against a defined expected result.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-9",
        "prompt": "What does a test failure indicate?",
        "answer": "Actual behaviour differs from the expected result",
        "options": [
          "Actual behaviour differs from the expected result",
          "The CPU is physically damaged",
          "The file is automatically corrupted",
          "All other test cases must pass"
        ],
        "explanation": "A failed test points to behaviour needing investigation.",
        "skill": "Test data: normal, boundary and invalid"
      },
      {
        "id": "23-testing-10",
        "prompt": "Why repeat tests after fixing a bug?",
        "answer": "Check the fix and ensure other functionality still works",
        "options": [
          "Check the fix and ensure other functionality still works",
          "Make the program longer",
          "Increase storage capacity",
          "Avoid writing documentation"
        ],
        "explanation": "Regression testing catches problems introduced by changes.",
        "skill": "Test data: normal, boundary and invalid"
      }
    ]
  },
  {
    "id": "23-errors",
    "section": "2.3",
    "spec": "2.3.2",
    "title": "Syntax errors, logic errors and debugging",
    "questions": [
      {
        "id": "23-errors-1",
        "prompt": "What is a syntax error?",
        "answer": "Code that breaks the programming language's grammar",
        "options": [
          "Code that breaks the programming language's grammar",
          "An incorrect but valid calculation result",
          "A physical network fault",
          "A full hard disk only"
        ],
        "explanation": "Syntax errors occur when code violates language rules.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-2",
        "prompt": "What is a logic error?",
        "answer": "Code runs but produces an incorrect result",
        "options": [
          "Code runs but produces an incorrect result",
          "A missing bracket that prevents parsing",
          "Always a hardware fault",
          "A legal permission problem"
        ],
        "explanation": "Incorrect logic can execute without crashing.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-3",
        "prompt": "Which is a common syntax error?",
        "answer": "A missing closing bracket in an expression",
        "options": [
          "A missing closing bracket in an expression",
          "Using the wrong formula",
          "Choosing a poor algorithm",
          "Giving a misleading result"
        ],
        "explanation": "Unbalanced brackets can violate syntax rules.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-4",
        "prompt": "Which is a logic error?",
        "answer": "Calculating an average with the wrong divisor",
        "options": [
          "Calculating an average with the wrong divisor",
          "A misspelled IF keyword",
          "An unmatched quotation mark",
          "An invalid indentation token only"
        ],
        "explanation": "An incorrect formula may produce a wrong answer while remaining executable.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-5",
        "prompt": "What is debugging?",
        "answer": "Finding and correcting faults in code",
        "options": [
          "Finding and correcting faults in code",
          "Only compressing code",
          "Printing every output permanently",
          "Using random variables"
        ],
        "explanation": "Debugging investigates and fixes errors.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-6",
        "prompt": "What does a breakpoint do?",
        "answer": "Pause execution at a chosen line",
        "options": [
          "Pause execution at a chosen line",
          "Delete the selected variable",
          "Reinstall the operating system",
          "Encrypt all stored files"
        ],
        "explanation": "Breakpoints let developers inspect program state.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-7",
        "prompt": "What is a trace table used for?",
        "answer": "Following variable values step by step",
        "options": [
          "Following variable values step by step",
          "Increasing CPU clock speed",
          "Managing network addresses",
          "Compressing images"
        ],
        "explanation": "Tracing can reveal when incorrect values first appear.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-8",
        "prompt": "What does stepping through code mean?",
        "answer": "Executing one statement or stage at a time",
        "options": [
          "Executing one statement or stage at a time",
          "Deleting comments automatically",
          "Running all tests without inspection",
          "Selecting random files"
        ],
        "explanation": "Step execution helps observe control flow.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-9",
        "prompt": "Why test after fixing a logic error?",
        "answer": "Confirm the correction produces expected outputs",
        "options": [
          "Confirm the correction produces expected outputs",
          "Make the file physically larger",
          "Disable every loop",
          "Remove the need for version control"
        ],
        "explanation": "Testing checks whether the corrected algorithm behaves properly.",
        "skill": "Syntax errors, logic errors and debugging"
      },
      {
        "id": "23-errors-10",
        "prompt": "If an IF condition uses > instead of >= at the boundary what is likely?",
        "answer": "A logic error at the threshold",
        "options": [
          "A logic error at the threshold",
          "A mandatory runtime syntax error",
          "A storage fault",
          "An encryption weakness by definition"
        ],
        "explanation": "The comparison is valid code but may reject a value that should be accepted.",
        "skill": "Syntax errors, logic errors and debugging"
      }
    ]
  }
];
