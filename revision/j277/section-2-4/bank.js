'use strict';
// OCR J277 2.4 Boolean logic and truth tables.
const J277_SECTION={"code":"2.4","title":"Boolean Logic"};
const SKILLS=[
  {
    "id": "24-gates",
    "section": "2.4",
    "spec": "2.4.1",
    "title": "Logic gates: AND, OR and NOT",
    "questions": [
      {
        "id": "24-gates-1",
        "prompt": "When is the output of AND equal to 1?",
        "answer": "Only when both inputs are 1",
        "options": [
          "Only when both inputs are 1",
          "When either input is 1",
          "When both inputs are 0",
          "Whenever the first input is 0"
        ],
        "explanation": "An AND gate needs both inputs true.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-2",
        "prompt": "When is the output of OR equal to 1?",
        "answer": "When at least one input is 1",
        "options": [
          "When at least one input is 1",
          "Only when both inputs are 1",
          "Only when both inputs are 0",
          "Only if the second input is 0"
        ],
        "explanation": "OR produces true if either input is true.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-3",
        "prompt": "What does a NOT gate do?",
        "answer": "Inverts a single Boolean input",
        "options": [
          "Inverts a single Boolean input",
          "Multiplies its two inputs",
          "Adds two binary numbers",
          "Stores a Boolean value"
        ],
        "explanation": "NOT changes 1 to 0 and 0 to 1.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-4",
        "prompt": "What is 1 AND 0?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "TRUE AND TRUE"
        ],
        "explanation": "AND requires both operands to be one.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-5",
        "prompt": "What is 1 OR 0?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "OR is one when either operand is one.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-6",
        "prompt": "What is NOT 1?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "11"
        ],
        "explanation": "NOT inverts one to zero.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-7",
        "prompt": "Which gate has exactly one input in its basic form?",
        "answer": "NOT",
        "options": [
          "NOT",
          "AND",
          "OR",
          "XOR"
        ],
        "explanation": "A NOT gate inverts its single input.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-8",
        "prompt": "What is 0 AND 0?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "10"
        ],
        "explanation": "Both operands are false so AND is false.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-9",
        "prompt": "What is 0 OR 0?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "10"
        ],
        "explanation": "Neither operand is true so OR is false.",
        "skill": "Logic gates: AND, OR and NOT"
      },
      {
        "id": "24-gates-10",
        "prompt": "For an alarm requiring BOTH sensors to activate which gate fits?",
        "answer": "AND",
        "options": [
          "AND",
          "OR",
          "NOT",
          "No gate is possible"
        ],
        "explanation": "AND can require two conditions to be true together.",
        "skill": "Logic gates: AND, OR and NOT"
      }
    ]
  },
  {
    "id": "24-tables",
    "section": "2.4",
    "spec": "2.4.1",
    "title": "Truth tables and combined Boolean expressions",
    "questions": [
      {
        "id": "24-tables-1",
        "prompt": "How many rows are required for a complete two-input truth table?",
        "answer": "4",
        "options": [
          "4",
          "2",
          "3",
          "8"
        ],
        "explanation": "Two Boolean inputs have 2 squared or four combinations.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-2",
        "prompt": "How many rows are needed for three Boolean inputs?",
        "answer": "8",
        "options": [
          "8",
          "3",
          "6",
          "16"
        ],
        "explanation": "Three inputs have 2 cubed or eight combinations.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-3",
        "prompt": "For A=1 and B=0 what is A AND B?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "Undefined"
        ],
        "explanation": "AND requires A and B both true.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-4",
        "prompt": "For A=1 and B=0 what is A OR B?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "OR needs at least one true input.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-5",
        "prompt": "For A=0 what is NOT A?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "NOT inverts zero to one.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-6",
        "prompt": "With A=1 B=0 what is (A AND B) OR A?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "A AND B is zero then zero OR one is one.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-7",
        "prompt": "With A=0 B=1 what is NOT A AND B?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "NOT A is one and one AND B is one.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-8",
        "prompt": "With A=1 B=1 what is NOT (A AND B)?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "Undefined"
        ],
        "explanation": "AND gives one; NOT changes it to zero.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-9",
        "prompt": "A=0 B=0. What is NOT A OR B?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "NOT A is one; one OR zero is one.",
        "skill": "Truth tables and combined Boolean expressions"
      },
      {
        "id": "24-tables-10",
        "prompt": "Which is the correct output column for a two-input AND table ordered 00 01 10 11?",
        "answer": "0 0 0 1",
        "options": [
          "0 0 0 1",
          "0 1 1 1",
          "1 0 0 0",
          "1 1 1 0"
        ],
        "explanation": "AND is true only for 11.",
        "skill": "Truth tables and combined Boolean expressions"
      }
    ]
  }
];
