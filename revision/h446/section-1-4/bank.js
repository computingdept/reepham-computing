const SKILLS = [
  {
    "key": "a",
    "title": "Primitive data types",
    "lessons": [
      1
    ],
    "page": 139,
    "reading": 1,
    "questions": [
      {
        "id": "141-a1",
        "prompt": "Which data type stores a true/false condition?",
        "answer": "Boolean",
        "options": [
          "Boolean",
          "Integer",
          "String",
          "Character"
        ],
        "explanation": "A Boolean has two possible values: true and false.",
        "skill": "Primitive data types",
        "source": "Adapted from existing Data Types recall bank"
      },
      {
        "id": "141-a2",
        "prompt": "Which type best preserves a telephone number starting with 0?",
        "answer": "String",
        "options": [
          "String",
          "Integer",
          "Real",
          "Boolean"
        ],
        "explanation": "A telephone number is an identifier. A string preserves its leading zero.",
        "skill": "Primitive data types",
        "source": "Adapted from existing Data Types recall bank"
      },
      {
        "id": "141-a3",
        "prompt": "Which type is suitable for the number of pupils in a class?",
        "answer": "Integer",
        "options": [
          "Integer",
          "Boolean",
          "Character",
          "Real"
        ],
        "explanation": "A count is a whole number.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      },
      {
        "id": "141-a4",
        "prompt": "Which type stores a single letter?",
        "answer": "Character",
        "options": [
          "Character",
          "Integer",
          "Boolean",
          "Real"
        ],
        "explanation": "A character stores one character.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      },
      {
        "id": "141-a5",
        "prompt": "Which type is suitable for a measured temperature of 18.75 °C?",
        "answer": "Real / floating point",
        "options": [
          "Real / floating point",
          "Integer",
          "Boolean",
          "Character"
        ],
        "explanation": "A real/floating-point type can represent fractional values.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      },
      {
        "id": "141-a6",
        "prompt": "Which type stores the text Computer Science?",
        "answer": "String",
        "options": [
          "String",
          "Character",
          "Integer",
          "Boolean"
        ],
        "explanation": "A string is a sequence of characters.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      },
      {
        "id": "141-a7",
        "prompt": "Which type should hold whether a door is locked?",
        "answer": "Boolean",
        "options": [
          "Boolean",
          "String",
          "Real",
          "Character"
        ],
        "explanation": "The condition has two states: locked or not locked.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      },
      {
        "id": "141-a8",
        "prompt": "Which type holds a whole-number score of 42?",
        "answer": "Integer",
        "options": [
          "Integer",
          "Character",
          "Boolean",
          "String"
        ],
        "explanation": "Use an integer when the value is a whole number used in arithmetic.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      },
      {
        "id": "141-a9",
        "prompt": "Which type is suitable for the single symbol @?",
        "answer": "Character",
        "options": [
          "Character",
          "Real",
          "Boolean",
          "Integer"
        ],
        "explanation": "A single symbol is one character.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      },
      {
        "id": "141-a10",
        "prompt": "A program converts the text \"27\" to a number for addition. Which type is suitable?",
        "answer": "Integer",
        "options": [
          "Integer",
          "Character",
          "Boolean",
          "String"
        ],
        "explanation": "Casting to integer allows whole-number arithmetic.",
        "skill": "Primitive data types",
        "source": "Original pilot question"
      }
    ],
    "id": "141-a",
    "section": "1.4.1",
    "spec": "1.4.1(a)",
    "legacy": "a"
  },
  {
    "key": "b",
    "title": "Positive integers in binary",
    "lessons": [
      1
    ],
    "page": 128,
    "reading": 1,
    "questions": [
      {
        "id": "141-b1",
        "prompt": "Write 13 as an unsigned eight-bit binary integer.",
        "answer": "00001101",
        "options": [
          "00001101",
          "00001110",
          "00010101",
          "00101101"
        ],
        "explanation": "Add the place values of the 1 bits: 8 + 4 + 1 = 13.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b2",
        "prompt": "Write 22 as an unsigned eight-bit binary integer.",
        "answer": "00010110",
        "options": [
          "00010110",
          "00010111",
          "00011110",
          "00110110"
        ],
        "explanation": "Add the place values of the 1 bits: 16 + 4 + 2 = 22.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b3",
        "prompt": "Write 45 as an unsigned eight-bit binary integer.",
        "answer": "00101101",
        "options": [
          "00101101",
          "00101110",
          "00110101",
          "01001101"
        ],
        "explanation": "Add the place values of the 1 bits: 32 + 8 + 4 + 1 = 45.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b4",
        "prompt": "Write 96 as an unsigned eight-bit binary integer.",
        "answer": "01100000",
        "options": [
          "01100000",
          "01100001",
          "01101000",
          "10000000"
        ],
        "explanation": "Add the place values of the 1 bits: 64 + 32 = 96.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b5",
        "prompt": "Write 182 as an unsigned eight-bit binary integer.",
        "answer": "10110110",
        "options": [
          "10110110",
          "10110111",
          "10111110",
          "11010110"
        ],
        "explanation": "Add the place values of the 1 bits: 128 + 32 + 16 + 4 + 2 = 182.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b6",
        "prompt": "Write 37 as an unsigned eight-bit binary integer.",
        "answer": "00100101",
        "options": [
          "00100101",
          "00100110",
          "00101101",
          "01000101"
        ],
        "explanation": "Add the place values of the 1 bits: 32 + 4 + 1 = 37.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b7",
        "prompt": "Write 58 as an unsigned eight-bit binary integer.",
        "answer": "00111010",
        "options": [
          "00111010",
          "00111011",
          "01000010",
          "01011010"
        ],
        "explanation": "Add the place values of the 1 bits: 32 + 16 + 8 + 2 = 58.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b8",
        "prompt": "Write 129 as an unsigned eight-bit binary integer.",
        "answer": "10000001",
        "options": [
          "10000001",
          "10000010",
          "10001001",
          "10100001"
        ],
        "explanation": "Add the place values of the 1 bits: 128 + 1 = 129.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b9",
        "prompt": "Write 170 as an unsigned eight-bit binary integer.",
        "answer": "10101010",
        "options": [
          "10101010",
          "10101011",
          "10110010",
          "11001010"
        ],
        "explanation": "Add the place values of the 1 bits: 128 + 32 + 8 + 2 = 170.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      },
      {
        "id": "141-b10",
        "prompt": "Write 255 as an unsigned eight-bit binary integer.",
        "answer": "11111111",
        "options": [
          "11111111",
          "00000000",
          "00000111",
          "00011111"
        ],
        "explanation": "Add the place values of the 1 bits: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255.",
        "skill": "Positive integers in binary",
        "source": "Original pilot question"
      }
    ],
    "id": "141-b",
    "section": "1.4.1",
    "spec": "1.4.1(b)",
    "legacy": "b"
  },
  {
    "key": "c",
    "title": "Negative binary integers",
    "lessons": [
      2
    ],
    "page": 129,
    "reading": 2,
    "questions": [
      {
        "id": "141-c1",
        "prompt": "Represent −8 in eight-bit two’s complement.",
        "answer": "11111000",
        "options": [
          "11111000",
          "10001000",
          "00001000",
          "11110111"
        ],
        "explanation": "Two’s complement: invert 00001000 and add 1.",
        "skill": "two’s complement",
        "source": "Original pilot question"
      },
      {
        "id": "141-c2",
        "prompt": "Represent −13 in eight-bit sign magnitude.",
        "answer": "10001101",
        "options": [
          "10001101",
          "11110011",
          "00001101",
          "11110010"
        ],
        "explanation": "Set the sign bit to 1 and use seven magnitude bits for 13.",
        "skill": "sign magnitude",
        "source": "Original pilot question"
      },
      {
        "id": "141-c3",
        "prompt": "Represent −25 in eight-bit two’s complement.",
        "answer": "11100111",
        "options": [
          "11100111",
          "10011001",
          "00011001",
          "11100110"
        ],
        "explanation": "Two’s complement: invert 00011001 and add 1.",
        "skill": "two’s complement",
        "source": "Original pilot question"
      },
      {
        "id": "141-c4",
        "prompt": "Represent −7 in eight-bit sign magnitude.",
        "answer": "10000111",
        "options": [
          "10000111",
          "11111001",
          "00000111",
          "11111000"
        ],
        "explanation": "Set the sign bit to 1 and use seven magnitude bits for 7.",
        "skill": "sign magnitude",
        "source": "Original pilot question"
      },
      {
        "id": "141-c9",
        "prompt": "What is the lowest eight-bit two’s-complement integer?",
        "answer": "−128",
        "options": [
          "−128",
          "−127",
          "−255",
          "−256"
        ],
        "explanation": "The most significant bit has weight −128; 10000000 represents −128.",
        "skill": "two’s complement",
        "source": "Original pilot question"
      },
      {
        "id": "141-c5",
        "prompt": "Represent −119 in eight-bit two’s complement.",
        "answer": "10001001",
        "options": [
          "10001001",
          "11110111",
          "01110111",
          "10001000"
        ],
        "explanation": "Two’s complement: invert 01110111 and add 1.",
        "skill": "two’s complement",
        "source": "Original pilot question"
      },
      {
        "id": "141-c6",
        "prompt": "Represent −12 in eight-bit two’s complement.",
        "answer": "11110100",
        "options": [
          "11110100",
          "10001100",
          "00001100",
          "11110011"
        ],
        "explanation": "Two’s complement: invert 00001100 and add 1.",
        "skill": "two’s complement",
        "source": "Original pilot question"
      },
      {
        "id": "141-c7",
        "prompt": "Represent −19 in eight-bit sign magnitude.",
        "answer": "10010011",
        "options": [
          "10010011",
          "11101101",
          "00010011",
          "11101100"
        ],
        "explanation": "Set the sign bit to 1 and use seven magnitude bits for 19.",
        "skill": "sign magnitude",
        "source": "Original pilot question"
      },
      {
        "id": "141-c8",
        "prompt": "Represent −31 in eight-bit two’s complement.",
        "answer": "11100001",
        "options": [
          "11100001",
          "10011111",
          "00011111",
          "11100000"
        ],
        "explanation": "Two’s complement: invert 00011111 and add 1.",
        "skill": "two’s complement",
        "source": "Original pilot question"
      },
      {
        "id": "141-c10",
        "prompt": "Which eight-bit representation has both positive and negative zero?",
        "answer": "Sign magnitude",
        "options": [
          "Sign magnitude",
          "Two’s complement",
          "Unsigned binary",
          "Neither"
        ],
        "explanation": "00000000 and 10000000 both represent zero in sign magnitude.",
        "skill": "sign magnitude",
        "source": "Original pilot question"
      }
    ],
    "id": "141-c",
    "section": "1.4.1",
    "spec": "1.4.1(c)",
    "legacy": "c"
  },
  {
    "key": "d",
    "title": "Binary addition and subtraction",
    "lessons": [
      2
    ],
    "page": 139,
    "reading": 2,
    "questions": [
      {
        "id": "141-d1",
        "prompt": "Calculate 00001101 + 00000111. Give the eight-bit result (two’s complement if negative).",
        "answer": "00010100",
        "options": [
          "00010100",
          "00010101",
          "00010011",
          "00011100"
        ],
        "explanation": "13 + 7 = 20, represented by 00010100. Carry whenever a binary column totals 2 or more.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d2",
        "prompt": "Calculate 00101101 + 00001100. Give the eight-bit result (two’s complement if negative).",
        "answer": "00111001",
        "options": [
          "00111001",
          "00111010",
          "00111000",
          "01000001"
        ],
        "explanation": "45 + 12 = 57, represented by 00111001. Carry whenever a binary column totals 2 or more.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d3",
        "prompt": "Calculate 00010010 − 00011101. Give the eight-bit result (two’s complement if negative).",
        "answer": "11110101",
        "options": [
          "11110101",
          "11110110",
          "11110100",
          "11111101"
        ],
        "explanation": "18 − 29 = -11, represented by 11110101. For subtraction, add the two’s complement of the second operand.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d4",
        "prompt": "Calculate 00010110 − 00001001. Give the eight-bit result (two’s complement if negative).",
        "answer": "00001101",
        "options": [
          "00001101",
          "00001110",
          "00001100",
          "00010101"
        ],
        "explanation": "22 − 9 = 13, represented by 00001101. For subtraction, add the two’s complement of the second operand.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d9",
        "prompt": "Two positive eight-bit two’s-complement integers add to a result with sign bit 1. What occurred?",
        "answer": "Signed overflow",
        "options": [
          "Signed overflow",
          "Underflow",
          "Normalisation",
          "A valid positive result"
        ],
        "explanation": "Two positive signed operands cannot have a negative sum within the representable range.",
        "skill": "overflow",
        "source": "Original pilot question"
      },
      {
        "id": "141-d5",
        "prompt": "Calculate 00111111 + 00000001. Give the eight-bit result (two’s complement if negative).",
        "answer": "01000000",
        "options": [
          "01000000",
          "01000001",
          "00111111",
          "01001000"
        ],
        "explanation": "63 + 1 = 64, represented by 01000000. Carry whenever a binary column totals 2 or more.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d6",
        "prompt": "Calculate 00001100 − 00010011. Give the eight-bit result (two’s complement if negative).",
        "answer": "11111001",
        "options": [
          "11111001",
          "11111010",
          "11111000",
          "00000001"
        ],
        "explanation": "12 − 19 = -7, represented by 11111001. For subtraction, add the two’s complement of the second operand.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d7",
        "prompt": "Calculate 00011111 + 00010000. Give the eight-bit result (two’s complement if negative).",
        "answer": "00101111",
        "options": [
          "00101111",
          "00110000",
          "00101110",
          "00110111"
        ],
        "explanation": "31 + 16 = 47, represented by 00101111. Carry whenever a binary column totals 2 or more.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d8",
        "prompt": "Calculate 00101010 − 00010001. Give the eight-bit result (two’s complement if negative).",
        "answer": "00011001",
        "options": [
          "00011001",
          "00011010",
          "00011000",
          "00100001"
        ],
        "explanation": "42 − 17 = 25, represented by 00011001. For subtraction, add the two’s complement of the second operand.",
        "skill": "integer arithmetic",
        "source": "Original pilot question"
      },
      {
        "id": "141-d10",
        "prompt": "Calculate 01110000 + 00100000 as eight-bit two’s complement. Is the result valid?",
        "answer": "No: 144 is out of range",
        "options": [
          "No: 144 is out of range",
          "Yes: the result is −112",
          "Yes: the result is 144",
          "No: a carry bit is always required"
        ],
        "explanation": "112 + 32 = 144 exceeds +127; the stored pattern 10010000 decodes to −112.",
        "skill": "overflow",
        "source": "Original pilot question"
      }
    ],
    "id": "141-d",
    "section": "1.4.1",
    "spec": "1.4.1(d)",
    "legacy": "d"
  },
  {
    "key": "e",
    "title": "Positive integers in hexadecimal",
    "lessons": [
      3
    ],
    "page": 128,
    "reading": 3,
    "questions": [
      {
        "id": "141-e1",
        "prompt": "Write denary 10 in hexadecimal.",
        "answer": "A",
        "options": [
          "A",
          "B",
          "1A",
          "9"
        ],
        "explanation": "0 × 16 + 10 = 10. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e2",
        "prompt": "Write denary 15 in hexadecimal.",
        "answer": "F",
        "options": [
          "F",
          "10",
          "1F",
          "E"
        ],
        "explanation": "0 × 16 + 15 = 15. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e3",
        "prompt": "Write denary 16 in hexadecimal.",
        "answer": "10",
        "options": [
          "10",
          "11",
          "20",
          "F"
        ],
        "explanation": "1 × 16 + 0 = 16. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e4",
        "prompt": "Write denary 26 in hexadecimal.",
        "answer": "1A",
        "options": [
          "1A",
          "1B",
          "2A",
          "19"
        ],
        "explanation": "1 × 16 + 10 = 26. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e5",
        "prompt": "Write denary 47 in hexadecimal.",
        "answer": "2F",
        "options": [
          "2F",
          "30",
          "3F",
          "2E"
        ],
        "explanation": "2 × 16 + 15 = 47. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e6",
        "prompt": "Write denary 64 in hexadecimal.",
        "answer": "40",
        "options": [
          "40",
          "41",
          "50",
          "3F"
        ],
        "explanation": "4 × 16 + 0 = 64. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e7",
        "prompt": "Write denary 127 in hexadecimal.",
        "answer": "7F",
        "options": [
          "7F",
          "80",
          "8F",
          "7E"
        ],
        "explanation": "7 × 16 + 15 = 127. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e8",
        "prompt": "Write denary 160 in hexadecimal.",
        "answer": "A0",
        "options": [
          "A0",
          "A1",
          "B0",
          "9F"
        ],
        "explanation": "10 × 16 + 0 = 160. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e9",
        "prompt": "Write denary 200 in hexadecimal.",
        "answer": "C8",
        "options": [
          "C8",
          "C9",
          "D8",
          "C7"
        ],
        "explanation": "12 × 16 + 8 = 200. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      },
      {
        "id": "141-e10",
        "prompt": "Write denary 255 in hexadecimal.",
        "answer": "FF",
        "options": [
          "FF",
          "100",
          "10F",
          "FE"
        ],
        "explanation": "15 × 16 + 15 = 255. Hexadecimal digits A–F represent 10–15.",
        "skill": "Positive integers in hexadecimal",
        "source": "Original pilot question"
      }
    ],
    "id": "141-e",
    "section": "1.4.1",
    "spec": "1.4.1(e)",
    "legacy": "e"
  },
  {
    "key": "f",
    "title": "Binary, hexadecimal and denary",
    "lessons": [
      3
    ],
    "page": 128,
    "reading": 3,
    "questions": [
      {
        "id": "141-f1",
        "prompt": "Convert hexadecimal 3A to eight-bit binary.",
        "answer": "00111010",
        "options": [
          "00111010",
          "00111011",
          "01001010",
          "00111110"
        ],
        "explanation": "Convert each hex digit to four bits: 0011 1010.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f2",
        "prompt": "Convert hexadecimal 6D to eight-bit binary.",
        "answer": "01101101",
        "options": [
          "01101101",
          "01101110",
          "01111101",
          "01110001"
        ],
        "explanation": "Convert each hex digit to four bits: 0110 1101.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f3",
        "prompt": "Convert hexadecimal B6 to eight-bit binary.",
        "answer": "10110110",
        "options": [
          "10110110",
          "10110111",
          "11000110",
          "10111010"
        ],
        "explanation": "Convert each hex digit to four bits: 1011 0110.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f4",
        "prompt": "Convert hexadecimal A7 to eight-bit binary.",
        "answer": "10100111",
        "options": [
          "10100111",
          "10101000",
          "10110111",
          "10101011"
        ],
        "explanation": "Convert each hex digit to four bits: 1010 0111.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f5",
        "prompt": "Convert hexadecimal F0 to eight-bit binary.",
        "answer": "11110000",
        "options": [
          "11110000",
          "11110001",
          "00000000",
          "11110100"
        ],
        "explanation": "Convert each hex digit to four bits: 1111 0000.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f6",
        "prompt": "Convert hexadecimal 27 to eight-bit binary.",
        "answer": "00100111",
        "options": [
          "00100111",
          "00101000",
          "00110111",
          "00101011"
        ],
        "explanation": "Convert each hex digit to four bits: 0010 0111.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f7",
        "prompt": "Convert hexadecimal 5D to eight-bit binary.",
        "answer": "01011101",
        "options": [
          "01011101",
          "01011110",
          "01101101",
          "01100001"
        ],
        "explanation": "Convert each hex digit to four bits: 0101 1101.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f8",
        "prompt": "Convert hexadecimal 80 to eight-bit binary.",
        "answer": "10000000",
        "options": [
          "10000000",
          "10000001",
          "10010000",
          "10000100"
        ],
        "explanation": "Convert each hex digit to four bits: 1000 0000.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f9",
        "prompt": "Convert hexadecimal CC to eight-bit binary.",
        "answer": "11001100",
        "options": [
          "11001100",
          "11001101",
          "11011100",
          "11010000"
        ],
        "explanation": "Convert each hex digit to four bits: 1100 1100.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      },
      {
        "id": "141-f10",
        "prompt": "Convert hexadecimal E7 to eight-bit binary.",
        "answer": "11100111",
        "options": [
          "11100111",
          "11101000",
          "11110111",
          "11101011"
        ],
        "explanation": "Convert each hex digit to four bits: 1110 0111.",
        "skill": "Binary, hexadecimal and denary",
        "source": "Original pilot question"
      }
    ],
    "id": "141-f",
    "section": "1.4.1",
    "spec": "1.4.1(f)",
    "legacy": "f"
  },
  {
    "key": "g",
    "title": "Floating-point representation",
    "lessons": [
      4,
      5
    ],
    "page": 133,
    "reading": 4,
    "questions": [
      {
        "id": "141-g1",
        "prompt": "Decode 01000000 0001. Use an eight-bit two’s-complement mantissa with the binary point after the sign bit, and a four-bit two’s-complement exponent.",
        "answer": "1",
        "options": [
          "1",
          "-1",
          "2",
          "0.5"
        ],
        "explanation": "The mantissa is 0.5; exponent 1. Value = 0.5 × 2^1 = 1.",
        "skill": "decode floating point",
        "source": "Original pilot question"
      },
      {
        "id": "141-g3",
        "prompt": "Decode 01010000 0011. Use an eight-bit two’s-complement mantissa with the binary point after the sign bit, and a four-bit two’s-complement exponent.",
        "answer": "5",
        "options": [
          "5",
          "-5",
          "10",
          "2.5"
        ],
        "explanation": "The mantissa is 0.625; exponent 3. Value = 0.625 × 2^3 = 5.",
        "skill": "decode floating point",
        "source": "Original pilot question"
      },
      {
        "id": "141-g7",
        "prompt": "Which leading bits identify a nonzero normalised positive two’s-complement mantissa?",
        "answer": "01",
        "options": [
          "01",
          "00",
          "10",
          "11"
        ],
        "explanation": "A normalised positive mantissa starts 01.",
        "skill": "normalisation",
        "source": "Original pilot question"
      },
      {
        "id": "141-g8",
        "prompt": "Which leading bits identify a normalised negative two’s-complement mantissa?",
        "answer": "10",
        "options": [
          "10",
          "00",
          "01",
          "11"
        ],
        "explanation": "A normalised negative mantissa starts 10.",
        "skill": "normalisation",
        "source": "Original pilot question"
      },
      {
        "id": "141-g9",
        "prompt": "Normalise 00110000 0011 in 8+4 two’s-complement format.",
        "answer": "01100000 0010",
        "options": [
          "01100000 0010",
          "01100000 0100",
          "00011000 0100",
          "00110000 0010"
        ],
        "explanation": "Shift the mantissa left once and decrease the exponent by 1, preserving the value 3.",
        "skill": "normalisation",
        "source": "Original pilot question"
      },
      {
        "id": "141-g2",
        "prompt": "Decode 01100000 0010. Use an eight-bit two’s-complement mantissa with the binary point after the sign bit, and a four-bit two’s-complement exponent.",
        "answer": "3",
        "options": [
          "3",
          "-3",
          "6",
          "1.5"
        ],
        "explanation": "The mantissa is 0.75; exponent 2. Value = 0.75 × 2^2 = 3.",
        "skill": "decode floating point",
        "source": "Original pilot question"
      },
      {
        "id": "141-g4",
        "prompt": "Decode 10100000 1111. Use an eight-bit two’s-complement mantissa with the binary point after the sign bit, and a four-bit two’s-complement exponent.",
        "answer": "-0.375",
        "options": [
          "-0.375",
          "0.375",
          "-0.75",
          "-0.1875"
        ],
        "explanation": "The mantissa is -0.75; exponent -1. Value = -0.75 × 2^-1 = -0.375.",
        "skill": "decode floating point",
        "source": "Original pilot question"
      },
      {
        "id": "141-g5",
        "prompt": "Decode 01100000 1110. Use an eight-bit two’s-complement mantissa with the binary point after the sign bit, and a four-bit two’s-complement exponent.",
        "answer": "0.1875",
        "options": [
          "0.1875",
          "-0.1875",
          "0.375",
          "0.09375"
        ],
        "explanation": "The mantissa is 0.75; exponent -2. Value = 0.75 × 2^-2 = 0.1875.",
        "skill": "decode floating point",
        "source": "Original pilot question"
      },
      {
        "id": "141-g6",
        "prompt": "Decode 01010000 1111. Use an eight-bit two’s-complement mantissa with the binary point after the sign bit, and a four-bit two’s-complement exponent.",
        "answer": "0.3125",
        "options": [
          "0.3125",
          "-0.3125",
          "0.625",
          "0.15625"
        ],
        "explanation": "The mantissa is 0.625; exponent -1. Value = 0.625 × 2^-1 = 0.3125.",
        "skill": "decode floating point",
        "source": "Original pilot question"
      },
      {
        "id": "141-g10",
        "prompt": "Does a negative exponent always mean a negative floating-point value?",
        "answer": "No; the mantissa determines the sign",
        "options": [
          "No; the mantissa determines the sign",
          "Yes; exponent is the sign",
          "Yes; both fields must be positive",
          "No; all floating-point values are positive"
        ],
        "explanation": "A negative exponent scales by a fraction; it does not determine the sign.",
        "skill": "decode floating point",
        "source": "Adapted from existing Data Types recall bank"
      }
    ],
    "id": "141-g",
    "section": "1.4.1",
    "spec": "1.4.1(g)",
    "legacy": "g"
  },
  {
    "key": "h",
    "title": "Floating-point arithmetic",
    "lessons": [
      6,
      7
    ],
    "page": 134,
    "reading": 6,
    "questions": [
      {
        "id": "141-h1",
        "prompt": "Calculate 6 + 2. Choose the normalised result using an eight-bit two’s-complement mantissa (point after sign bit) and four-bit exponent.",
        "answer": "01000000 0100",
        "options": [
          "01000000 0100",
          "01000000 0101",
          "01000000 0011",
          "01000001 0100"
        ],
        "explanation": "6 + 2 = 8. The mantissa is 0.5 and the exponent is 4.",
        "skill": "floating-point addition",
        "source": "Original pilot question"
      },
      {
        "id": "141-h2",
        "prompt": "Calculate 5 − 1.5. Choose the normalised result using an eight-bit two’s-complement mantissa (point after sign bit) and four-bit exponent.",
        "answer": "01110000 0010",
        "options": [
          "01110000 0010",
          "01110000 0011",
          "01110000 0001",
          "01110001 0010"
        ],
        "explanation": "5 − 1.5 = 3.5. The mantissa is 0.875 and the exponent is 2.",
        "skill": "floating-point subtraction",
        "source": "Original pilot question"
      },
      {
        "id": "141-h3",
        "prompt": "Calculate -3 + 1. Choose the normalised result using an eight-bit two’s-complement mantissa (point after sign bit) and four-bit exponent.",
        "answer": "10000000 0001",
        "options": [
          "10000000 0001",
          "10000000 0010",
          "10000000 0000",
          "10000001 0001"
        ],
        "explanation": "-3 + 1 = -2. The mantissa is -1 and the exponent is 1.",
        "skill": "floating-point addition",
        "source": "Original pilot question"
      },
      {
        "id": "141-h7",
        "prompt": "Before adding floating-point mantissas, what must match?",
        "answer": "Exponents",
        "options": [
          "Exponents",
          "Sign bits",
          "Mantissas",
          "Number of 1 bits"
        ],
        "explanation": "Mantissas must describe the same place values, so first align the exponents.",
        "skill": "exponent alignment",
        "source": "Original pilot question"
      },
      {
        "id": "141-h8",
        "prompt": "When right-shifting a negative two’s-complement mantissa to align exponents, what enters from the left?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "The last bit",
          "An extra exponent bit"
        ],
        "explanation": "Arithmetic right shift repeats the sign bit, which is 1 for a negative mantissa.",
        "skill": "exponent alignment",
        "source": "Adapted from existing Data Types recall bank"
      },
      {
        "id": "141-h4",
        "prompt": "Calculate 3 − -2. Choose the normalised result using an eight-bit two’s-complement mantissa (point after sign bit) and four-bit exponent.",
        "answer": "01010000 0011",
        "options": [
          "01010000 0011",
          "01010000 0100",
          "01010000 0010",
          "01010001 0011"
        ],
        "explanation": "3 − -2 = 5. The mantissa is 0.625 and the exponent is 3.",
        "skill": "floating-point subtraction",
        "source": "Original pilot question"
      },
      {
        "id": "141-h5",
        "prompt": "Calculate 1.5 + 0.5. Choose the normalised result using an eight-bit two’s-complement mantissa (point after sign bit) and four-bit exponent.",
        "answer": "01000000 0010",
        "options": [
          "01000000 0010",
          "01000000 0011",
          "01000000 0001",
          "01000001 0010"
        ],
        "explanation": "1.5 + 0.5 = 2. The mantissa is 0.5 and the exponent is 2.",
        "skill": "floating-point addition",
        "source": "Original pilot question"
      },
      {
        "id": "141-h6",
        "prompt": "Calculate 4 − 1.5. Choose the normalised result using an eight-bit two’s-complement mantissa (point after sign bit) and four-bit exponent.",
        "answer": "01010000 0010",
        "options": [
          "01010000 0010",
          "01010000 0011",
          "01010000 0001",
          "01010001 0010"
        ],
        "explanation": "4 − 1.5 = 2.5. The mantissa is 0.625 and the exponent is 2.",
        "skill": "floating-point subtraction",
        "source": "Original pilot question"
      },
      {
        "id": "141-h9",
        "prompt": "When normalising by shifting a mantissa left once, how must the exponent change?",
        "answer": "Decrease by 1",
        "options": [
          "Decrease by 1",
          "Increase by 1",
          "Stay unchanged",
          "Become positive"
        ],
        "explanation": "The mantissa doubles, so the power-of-two scale must halve.",
        "skill": "normalisation",
        "source": "Original pilot question"
      },
      {
        "id": "141-h10",
        "prompt": "Floating-point subtraction A − B can be performed as…",
        "answer": "A + (−B)",
        "options": [
          "A + (−B)",
          "A + B",
          "B − A",
          "−A + B"
        ],
        "explanation": "Negate the second operand, then align and add while retaining sufficient working precision.",
        "skill": "floating-point subtraction",
        "source": "Original pilot question"
      }
    ],
    "id": "141-h",
    "section": "1.4.1",
    "spec": "1.4.1(h)",
    "legacy": "h"
  },
  {
    "key": "i",
    "title": "Shifts and bitwise masks",
    "lessons": [
      3
    ],
    "page": 253,
    "reading": 3,
    "questions": [
      {
        "id": "141-i1",
        "prompt": "Apply AND mask 10101010 to 01010101.",
        "answer": "00000000",
        "options": [
          "00000000",
          "11111111",
          "10101010",
          "01010101"
        ],
        "explanation": "AND produces 1 only when both input bits are 1.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i2",
        "prompt": "Apply OR mask 10101010 to 01010101.",
        "answer": "11111111",
        "options": [
          "11111111",
          "00000000",
          "10101010",
          "01010101"
        ],
        "explanation": "OR produces 1 when either input bit is 1.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i3",
        "prompt": "Calculate 11001100 XOR 00001111.",
        "answer": "11000011",
        "options": [
          "11000011",
          "11001111",
          "00001100",
          "00110000"
        ],
        "explanation": "XOR produces 1 when the two input bits differ.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i4",
        "prompt": "Logically shift unsigned 00101100 right by two places.",
        "answer": "00001011",
        "options": [
          "00001011",
          "10110000",
          "00010110",
          "00000101"
        ],
        "explanation": "A logical right shift inserts zeros; 44 ÷ 4 = 11.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i5",
        "prompt": "Logically shift unsigned 00001100 left by two places.",
        "answer": "00110000",
        "options": [
          "00110000",
          "00000011",
          "00011000",
          "11000000"
        ],
        "explanation": "A left shift by two multiplies 12 by 4 here, with no significant bits lost.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i6",
        "prompt": "Which operation toggles positions where the mask is 1?",
        "answer": "XOR",
        "options": [
          "XOR",
          "AND",
          "OR",
          "Right shift"
        ],
        "explanation": "XOR with 1 flips a bit; XOR with 0 preserves it.",
        "skill": "Shifts and bitwise masks",
        "source": "Adapted from existing Data Types recall bank"
      },
      {
        "id": "141-i7",
        "prompt": "Choose a mask operation to clear bits 7 and 6, preserving the other six bits.",
        "answer": "AND 00111111",
        "options": [
          "AND 00111111",
          "OR 00111111",
          "XOR 11000000",
          "AND 11000000"
        ],
        "explanation": "AND with 0 clears; AND with 1 preserves.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i8",
        "prompt": "Choose a mask operation to set the lowest two bits, preserving all other bits.",
        "answer": "OR 00000011",
        "options": [
          "OR 00000011",
          "AND 00000011",
          "XOR 00000011",
          "OR 11111100"
        ],
        "explanation": "OR with 1 sets; OR with 0 preserves.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i9",
        "prompt": "Calculate 10110110 AND 00001111.",
        "answer": "00000110",
        "options": [
          "00000110",
          "10110000",
          "10111111",
          "00001111"
        ],
        "explanation": "The mask keeps only the lowest four bits.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      },
      {
        "id": "141-i10",
        "prompt": "Logically shift eight-bit unsigned 10000001 left once, discarding overflow.",
        "answer": "00000010",
        "options": [
          "00000010",
          "00000011",
          "10000010",
          "01000000"
        ],
        "explanation": "The leftmost bit is discarded and a zero enters on the right.",
        "skill": "Shifts and bitwise masks",
        "source": "Original pilot question"
      }
    ],
    "id": "141-i",
    "section": "1.4.1",
    "spec": "1.4.1(i)",
    "legacy": "i"
  },
  {
    "key": "j",
    "title": "ASCII and Unicode",
    "lessons": [
      8
    ],
    "page": 250,
    "reading": 8,
    "questions": [
      {
        "id": "141-j1",
        "prompt": "How many codes does standard seven-bit ASCII provide?",
        "answer": "128",
        "options": [
          "128",
          "127",
          "256",
          "64"
        ],
        "explanation": "Seven bits provide 2^7 = 128 distinct patterns.",
        "skill": "ASCII and Unicode",
        "source": "Adapted from existing Data Types recall bank"
      },
      {
        "id": "141-j2",
        "prompt": "What is the purpose of a character set?",
        "answer": "Map characters to codes",
        "options": [
          "Map characters to codes",
          "Encrypt all text",
          "Compress every character",
          "Store only numbers used in sums"
        ],
        "explanation": "A character set associates characters with numeric codes.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j3",
        "prompt": "Why is Unicode useful for international text?",
        "answer": "It covers many writing systems",
        "options": [
          "It covers many writing systems",
          "Every character uses one bit",
          "It stores only English letters",
          "It prevents spelling mistakes"
        ],
        "explanation": "Unicode has a much larger repertoire than ASCII.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j4",
        "prompt": "In UTF-8, how many bytes does an ASCII character use?",
        "answer": "1",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "explanation": "UTF-8 encodes the ASCII range in one byte.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j5",
        "prompt": "Must every Unicode character occupy exactly two bytes?",
        "answer": "No; it depends on encoding",
        "options": [
          "No; it depends on encoding",
          "Yes; always two",
          "Yes; unless it is a digit",
          "Yes; except spaces"
        ],
        "explanation": "Unicode code points and storage encodings are different; UTF-8 uses one to four bytes per code point.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j6",
        "prompt": "A UTF-8 string contains 20 ASCII code points, three euro signs (3 bytes each), and two emoji code points (4 bytes each). Total bytes?",
        "answer": "37",
        "options": [
          "37",
          "25",
          "29",
          "50"
        ],
        "explanation": "20 + (3 × 3) + (2 × 4) = 37 bytes; ignore metadata.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j7",
        "prompt": "Which is a control character rather than a printed symbol?",
        "answer": "Line feed",
        "options": [
          "Line feed",
          "Capital A",
          "Digit 7",
          "Question mark"
        ],
        "explanation": "Line feed controls text layout.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j8",
        "prompt": "How many bits are needed for 256 distinct character codes?",
        "answer": "8",
        "options": [
          "8",
          "7",
          "9",
          "16"
        ],
        "explanation": "2^8 = 256.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j9",
        "prompt": "What does UTF-8 describe?",
        "answer": "A Unicode encoding",
        "options": [
          "A Unicode encoding",
          "A sorting algorithm",
          "An encryption key",
          "A processor register"
        ],
        "explanation": "UTF-8 encodes Unicode code points as byte sequences.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      },
      {
        "id": "141-j10",
        "prompt": "Why can the same bytes display as incorrect text when opened?",
        "answer": "The wrong encoding was used",
        "options": [
          "The wrong encoding was used",
          "The font is always too small",
          "All Unicode is encrypted",
          "ASCII cannot represent digits"
        ],
        "explanation": "A decoder must interpret bytes using the encoding used to save them.",
        "skill": "ASCII and Unicode",
        "source": "Original pilot question"
      }
    ],
    "id": "141-j",
    "section": "1.4.1",
    "spec": "1.4.1(j)",
    "legacy": "j"
  },
  {
    "id": "142-arrays",
    "title": "Arrays: 1D, 2D and 3D",
    "spec": "1.4.2(a,c)",
    "section": "1.4.2",
    "lessons": [
      17
    ],
    "page": 159,
    "questions": [
      {
        "id": "142-arrays-1",
        "prompt": "An array contains five elements with zero-based indexing. What is its final index?",
        "answer": "4",
        "options": [
          "4",
          "5",
          "6",
          "0"
        ],
        "explanation": "The indices are 0, 1, 2, 3 and 4.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-4",
        "prompt": "Which structure is suitable for a fixed rectangular grid of integer scores?",
        "answer": "2D array",
        "options": [
          "2D array",
          "Boolean",
          "Single character",
          "Single integer"
        ],
        "explanation": "A 2D array uses two indices to locate a cell.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-6",
        "prompt": "A[0..2] contains [4, 8, 12]. What does A[1] return?",
        "answer": "8",
        "options": [
          "8",
          "4",
          "12",
          "1"
        ],
        "explanation": "Zero-based index 1 identifies the second element.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-8",
        "prompt": "To remove A[2] from a packed array without leaving a gap, what happens to later elements?",
        "answer": "Shift one place left",
        "options": [
          "Shift one place left",
          "Shift one place right",
          "All are erased",
          "Their values double"
        ],
        "explanation": "Later values move left; the logical count decreases.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-10",
        "prompt": "Inserting into the middle of a packed array with spare capacity normally requires…",
        "answer": "Shifting later values right",
        "options": [
          "Shifting later values right",
          "Sorting every value first",
          "Deleting the whole array",
          "Reversing all values"
        ],
        "explanation": "Move later values right before placing the new value.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-2",
        "prompt": "A two-dimensional array has 3 rows and 4 columns. How many elements does it contain?",
        "answer": "12",
        "options": [
          "12",
          "7",
          "9",
          "16"
        ],
        "explanation": "Multiply the dimensions: 3 × 4 = 12.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-3",
        "prompt": "A three-dimensional array has dimensions 2 × 3 × 4. How many elements are there?",
        "answer": "24",
        "options": [
          "24",
          "9",
          "12",
          "32"
        ],
        "explanation": "Multiply all three dimensions: 2 × 3 × 4 = 24.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-5",
        "prompt": "In a fixed-size array, what must be checked before appending a value?",
        "answer": "There is spare capacity",
        "options": [
          "There is spare capacity",
          "The array is sorted",
          "Every value is unique",
          "The first value is zero"
        ],
        "explanation": "Appending requires an unused element within the allocated capacity.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-7",
        "prompt": "What is needed to traverse every element of a 2D array by row and column?",
        "answer": "Two nested loops",
        "options": [
          "Two nested loops",
          "One Boolean value",
          "A recursive call for each bit",
          "A hash collision"
        ],
        "explanation": "One loop iterates over rows and the inner loop over columns.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-arrays-9",
        "prompt": "A zero-based 2D array has 4 rows and 5 columns. Which index pair is valid?",
        "answer": "[3,4]",
        "options": [
          "[3,4]",
          "[4,4]",
          "[3,5]",
          "[4,5]"
        ],
        "explanation": "Valid row indices are 0–3 and column indices 0–4.",
        "skill": "Arrays: 1D, 2D and 3D",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-records",
    "title": "Records",
    "spec": "1.4.2(a,c)",
    "section": "1.4.2",
    "lessons": [
      18
    ],
    "page": 160,
    "questions": [
      {
        "id": "142-records-1",
        "prompt": "Which structure groups a pupil name, age and attendance flag?",
        "answer": "Record",
        "options": [
          "Record",
          "Single integer",
          "Single character",
          "Boolean expression"
        ],
        "explanation": "A record groups named fields that may have different types.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-4",
        "prompt": "What is the main advantage of named record fields?",
        "answer": "They describe each stored value",
        "options": [
          "They describe each stored value",
          "They always compress values",
          "They prevent all input errors",
          "They sort records automatically"
        ],
        "explanation": "Names such as age and surname clarify the meaning of values.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-6",
        "prompt": "Which update changes only a record’s age?",
        "answer": "Assign to its age field",
        "options": [
          "Assign to its age field",
          "Delete the record definition",
          "Reverse the collection",
          "Change every name"
        ],
        "explanation": "Assigning to one field leaves the other fields unchanged.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-8",
        "prompt": "How would you traverse an array of pupil records?",
        "answer": "Visit each record by index",
        "options": [
          "Visit each record by index",
          "Read only its first field",
          "Sort the fields alphabetically",
          "Ignore the array length"
        ],
        "explanation": "Iterate over the occupied array positions and process each record.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-10",
        "prompt": "Why use a record rather than unrelated name, age and flag variables for each pupil?",
        "answer": "Keep related fields together",
        "options": [
          "Keep related fields together",
          "Guarantee smaller storage",
          "Prevent all duplicates",
          "Automatically encrypt the fields"
        ],
        "explanation": "A record represents one entity as a coherent group of fields.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-2",
        "prompt": "In a pupil record, name and age are examples of…",
        "answer": "Fields",
        "options": [
          "Fields",
          "Edges",
          "Pointers to every record",
          "Loop conditions"
        ],
        "explanation": "Fields are named components of a record.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-3",
        "prompt": "Which is a suitable type for the age field of a pupil record?",
        "answer": "Integer",
        "options": [
          "Integer",
          "Record name",
          "Logic gate",
          "Graph edge"
        ],
        "explanation": "A whole-number age can be stored as an integer field.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-5",
        "prompt": "What creates a new pupil record?",
        "answer": "Initialise its defined fields",
        "options": [
          "Initialise its defined fields",
          "Add an edge",
          "Pop the top item",
          "Normalise a mantissa"
        ],
        "explanation": "A new record must have the fields required by its definition.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-7",
        "prompt": "How can several pupil records be stored for processing?",
        "answer": "In a list or array of records",
        "options": [
          "In a list or array of records",
          "Only in a single Boolean",
          "Only in the CPU clock",
          "As logic gates"
        ],
        "explanation": "A collection can contain multiple records with the same field layout.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-records-9",
        "prompt": "Removing a pupil record from a packed array requires updating…",
        "answer": "The collection’s contents and count",
        "options": [
          "The collection’s contents and count",
          "Every field’s data type",
          "The record definition",
          "The CPU instruction set"
        ],
        "explanation": "Removal changes the stored collection, not the type definition.",
        "skill": "Records",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-lists",
    "title": "Lists",
    "spec": "1.4.2(a,c)",
    "section": "1.4.2",
    "lessons": [
      18
    ],
    "page": 159,
    "questions": [
      {
        "id": "142-lists-1",
        "prompt": "What is a list?",
        "answer": "An ordered collection",
        "options": [
          "An ordered collection",
          "Only a true/false value",
          "Only a fixed pair of bits",
          "An unordered logic gate"
        ],
        "explanation": "A list stores a sequence of elements.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-4",
        "prompt": "After appending 8 to [2, 4], what is the list?",
        "answer": "[2, 4, 8]",
        "options": [
          "[2, 4, 8]",
          "[8, 2, 4]",
          "[2, 8, 4]",
          "[8]"
        ],
        "explanation": "Appending preserves existing order and adds the value last.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-6",
        "prompt": "How can every element in a list be processed?",
        "answer": "Traverse it using iteration",
        "options": [
          "Traverse it using iteration",
          "Pop only one element",
          "Read only its length",
          "Hash its type name"
        ],
        "explanation": "Iteration visits the elements in sequence.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-8",
        "prompt": "Which operation creates an empty list?",
        "answer": "Initialise a list with no elements",
        "options": [
          "Initialise a list with no elements",
          "Set its first item to 1",
          "Remove the type definition",
          "Sort a single integer"
        ],
        "explanation": "An empty list has length zero.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-10",
        "prompt": "After inserting 6 at index 1 in [4, 8], what is the list?",
        "answer": "[4, 6, 8]",
        "options": [
          "[4, 6, 8]",
          "[6, 4, 8]",
          "[4, 8, 6]",
          "[6, 8]"
        ],
        "explanation": "Insert at index 1 places 6 before the existing second element.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-2",
        "prompt": "What does appending to a list normally do?",
        "answer": "Add at the end",
        "options": [
          "Add at the end",
          "Delete the first item",
          "Sort all items",
          "Reverse all items"
        ],
        "explanation": "Append adds a new element after the existing elements.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-3",
        "prompt": "List [3, 6, 9] uses zero-based indexing. What is item 2?",
        "answer": "9",
        "options": [
          "9",
          "3",
          "6",
          "2"
        ],
        "explanation": "Index 2 is the third position.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-5",
        "prompt": "What happens when inserting at the start of an array-backed list?",
        "answer": "Later elements shift right",
        "options": [
          "Later elements shift right",
          "All values are sorted",
          "Only the last value changes",
          "No positions change"
        ],
        "explanation": "Elements need space for the inserted value.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-7",
        "prompt": "After removing index 1 from [5, 7, 9], what remains?",
        "answer": "[5, 9]",
        "options": [
          "[5, 9]",
          "[7, 9]",
          "[5, 7]",
          "[9, 5]"
        ],
        "explanation": "The element at zero-based index 1 is 7.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-lists-9",
        "prompt": "Which operation removes every element while keeping a list available for reuse?",
        "answer": "Clear",
        "options": [
          "Clear",
          "Append",
          "Index",
          "Compare"
        ],
        "explanation": "Clear empties the collection.",
        "skill": "Lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-tuples",
    "title": "Tuples",
    "spec": "1.4.2(a,c)",
    "section": "1.4.2",
    "lessons": [
      18
    ],
    "page": 160,
    "questions": [
      {
        "id": "142-tuples-1",
        "prompt": "A tuple is best described as…",
        "answer": "An ordered group of values",
        "options": [
          "An ordered group of values",
          "An unordered graph",
          "A single logic gate",
          "A queue operation"
        ],
        "explanation": "Tuples group values into a fixed arrangement.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-4",
        "prompt": "A tuple contains (name, age). Which statement is true?",
        "answer": "Its values may have different types",
        "options": [
          "Its values may have different types",
          "Both must be Boolean",
          "It must contain only integers",
          "It is automatically sorted"
        ],
        "explanation": "Tuple components can represent different types.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-6",
        "prompt": "Unpacking (4, 9) into x and y gives…",
        "answer": "x = 4, y = 9",
        "options": [
          "x = 4, y = 9",
          "x = 9, y = 4",
          "x = 13, y = 13",
          "x = 0, y = 1"
        ],
        "explanation": "Unpacking assigns each component in order.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-8",
        "prompt": "In a language with immutable tuples, adding a third component requires…",
        "answer": "Constructing a new tuple",
        "options": [
          "Constructing a new tuple",
          "Appending in place",
          "Popping the first value",
          "Changing the CPU register"
        ],
        "explanation": "A new tuple is needed with the additional component.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-10",
        "prompt": "Why specify the language when discussing tuple updates?",
        "answer": "Tuple mutability varies",
        "options": [
          "Tuple mutability varies",
          "All tuples are identical",
          "Tuples cannot hold numbers",
          "Only arrays have types"
        ],
        "explanation": "For example, some languages use immutable tuples while others support mutable tuple fields.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-2",
        "prompt": "Which is a useful application of a tuple?",
        "answer": "Return a coordinate pair",
        "options": [
          "Return a coordinate pair",
          "Control a clock pulse",
          "Replace every database",
          "Store a tree edge only"
        ],
        "explanation": "A pair such as (x, y) naturally groups two related values.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-3",
        "prompt": "In tuple (7, 12), what is the second value?",
        "answer": "12",
        "options": [
          "12",
          "7",
          "2",
          "19"
        ],
        "explanation": "Order gives each tuple component its position.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-5",
        "prompt": "Using zero-based positions, what is component 0 of (3, 8, 5)?",
        "answer": "3",
        "options": [
          "3",
          "8",
          "5",
          "0"
        ],
        "explanation": "The first component has position 0.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-7",
        "prompt": "In a language with immutable tuples, how can (2, 5) be changed to (2, 7)?",
        "answer": "Create a replacement tuple",
        "options": [
          "Create a replacement tuple",
          "Overwrite the immutable component",
          "Dequeue the tuple",
          "Rotate its hash"
        ],
        "explanation": "Immutable values cannot be edited in place; construct a new tuple.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-tuples-9",
        "prompt": "In a language with immutable tuples, removing a component requires…",
        "answer": "Constructing a tuple without it",
        "options": [
          "Constructing a tuple without it",
          "Deleting it in place",
          "Setting all components to zero",
          "Sorting the tuple"
        ],
        "explanation": "Create a replacement containing the retained components.",
        "skill": "Tuples",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-linked",
    "title": "Linked lists",
    "spec": "1.4.2(b,c)",
    "section": "1.4.2",
    "lessons": [
      19
    ],
    "page": 162,
    "questions": [
      {
        "id": "142-linked-1",
        "prompt": "A node in a singly linked list normally stores…",
        "answer": "Data and a next reference",
        "options": [
          "Data and a next reference",
          "Only its index",
          "Only a clock value",
          "Two graph matrices"
        ],
        "explanation": "The next reference identifies the successor node.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-4",
        "prompt": "How do you traverse a singly linked list?",
        "answer": "Follow next references",
        "options": [
          "Follow next references",
          "Increment physical addresses blindly",
          "Always start at the tail",
          "Sort every node first"
        ],
        "explanation": "Starting at head, follow next until null.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-6",
        "prompt": "To insert N at the head, first set N.next to…",
        "answer": "The old head",
        "options": [
          "The old head",
          "N itself",
          "The old tail’s data",
          "Every node"
        ],
        "explanation": "Preserve the link to the old list, then make head refer to N.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-8",
        "prompt": "To insert N between P and Q, set N.next = Q and…",
        "answer": "P.next = N",
        "options": [
          "P.next = N",
          "Q.next = P",
          "P.next = Q",
          "N.next = P"
        ],
        "explanation": "Both connections maintain the list order.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-10",
        "prompt": "Why do linked-list nodes not need adjacent memory locations?",
        "answer": "References connect them",
        "options": [
          "References connect them",
          "Every node is a register",
          "They contain no data",
          "They are always sorted"
        ],
        "explanation": "Traversal follows references rather than physical adjacency.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-2",
        "prompt": "What identifies the first node in a linked list?",
        "answer": "Head reference",
        "options": [
          "Head reference",
          "Stack overflow",
          "Exponent",
          "Hash collision"
        ],
        "explanation": "The head reference starts traversal.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-3",
        "prompt": "How is an empty linked list represented?",
        "answer": "Head is null",
        "options": [
          "Head is null",
          "Head points to every node",
          "All nodes point backwards",
          "Head must equal 1"
        ],
        "explanation": "A null head indicates no first node.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-5",
        "prompt": "What marks the end of a normal singly linked list?",
        "answer": "A null next reference",
        "options": [
          "A null next reference",
          "A carry bit",
          "A negative exponent",
          "A compulsory zero data value"
        ],
        "explanation": "The last node has no successor.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-7",
        "prompt": "To remove the first node, update head to…",
        "answer": "The old head’s next",
        "options": [
          "The old head’s next",
          "The old head’s data",
          "The last node’s next",
          "The removed node itself"
        ],
        "explanation": "This bypasses the old first node.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-linked-9",
        "prompt": "Removing middle node Q after P requires…",
        "answer": "P.next = Q.next",
        "options": [
          "P.next = Q.next",
          "P.next = Q",
          "Q.next = P",
          "Head = Q always"
        ],
        "explanation": "The predecessor bypasses the removed node.",
        "skill": "Linked lists",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-graphs",
    "title": "Directed and undirected graphs",
    "spec": "1.4.2(b,c)",
    "section": "1.4.2",
    "lessons": [
      21
    ],
    "page": 164,
    "questions": [
      {
        "id": "142-graphs-1",
        "prompt": "A graph consists of…",
        "answer": "Vertices and edges",
        "options": [
          "Vertices and edges",
          "Only array indices",
          "Mantissas and exponents",
          "Only truth values"
        ],
        "explanation": "Vertices represent entities; edges represent connections.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-4",
        "prompt": "What can a weighted edge represent?",
        "answer": "Distance or cost",
        "options": [
          "Distance or cost",
          "Only a node name",
          "Only a Boolean type",
          "Only an array size"
        ],
        "explanation": "Weights attach quantities to connections.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-6",
        "prompt": "A directed adjacency matrix M[A,B] = 1 means…",
        "answer": "There is an edge A → B",
        "options": [
          "There is an edge A → B",
          "There must be an edge B → A",
          "A is the root",
          "B is a leaf"
        ],
        "explanation": "Rows and columns identify the source and destination in this convention.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-8",
        "prompt": "Removing a vertex also requires removing…",
        "answer": "Its incident edges",
        "options": [
          "Its incident edges",
          "All unrelated vertices",
          "Every graph weight",
          "All vertex labels"
        ],
        "explanation": "Edges pointing to or from the removed vertex must not remain dangling.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-10",
        "prompt": "To create a graph with isolated vertices, initialise…",
        "answer": "Vertices with empty adjacency lists",
        "options": [
          "Vertices with empty adjacency lists",
          "Only one compulsory edge",
          "A stack of exponents",
          "A complete graph"
        ],
        "explanation": "Isolated vertices start without neighbours.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-2",
        "prompt": "In a directed graph, an edge A → B permits…",
        "answer": "Travel A to B along that edge",
        "options": [
          "Travel A to B along that edge",
          "Travel both ways automatically",
          "Only travel B to A",
          "No traversal"
        ],
        "explanation": "Direction restricts how that edge can be followed.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-3",
        "prompt": "In an undirected graph, an edge between A and B connects…",
        "answer": "A and B both ways",
        "options": [
          "A and B both ways",
          "Only A to B",
          "Only B to A",
          "Neither vertex"
        ],
        "explanation": "An undirected edge has no one-way orientation.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-5",
        "prompt": "What does an adjacency list store for each vertex?",
        "answer": "Its neighbours",
        "options": [
          "Its neighbours",
          "Every character code",
          "Its binary mantissa",
          "Only its parent in all graphs"
        ],
        "explanation": "Neighbours are the vertices connected by outgoing edges, or incident edges if undirected.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-7",
        "prompt": "How do you add an undirected edge using adjacency lists?",
        "answer": "Add each vertex to the other’s list",
        "options": [
          "Add each vertex to the other’s list",
          "Update only one direction",
          "Remove both vertices",
          "Sort all weights"
        ],
        "explanation": "Both adjacency lists must represent the connection.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-graphs-9",
        "prompt": "Why use a visited set when traversing a graph with cycles?",
        "answer": "Avoid revisiting indefinitely",
        "options": [
          "Avoid revisiting indefinitely",
          "Force the graph to be sorted",
          "Delete every edge",
          "Make every edge undirected"
        ],
        "explanation": "Visited vertices prevent repeated processing or infinite traversal.",
        "skill": "Directed and undirected graphs",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-stacks",
    "title": "Stacks",
    "spec": "1.4.2(b,c)",
    "section": "1.4.2",
    "lessons": [
      20
    ],
    "page": 161,
    "questions": [
      {
        "id": "142-stacks-1",
        "prompt": "A stack uses which access rule?",
        "answer": "LIFO",
        "options": [
          "LIFO",
          "FIFO",
          "Alphabetical order",
          "Random order"
        ],
        "explanation": "The last item added is the first removed.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-4",
        "prompt": "Push A, then B, then C onto an empty stack. What pops first?",
        "answer": "C",
        "options": [
          "C",
          "A",
          "B",
          "Nothing"
        ],
        "explanation": "C is the last item added.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-6",
        "prompt": "Pushing onto a full fixed-capacity stack causes…",
        "answer": "Overflow",
        "options": [
          "Overflow",
          "Underflow",
          "Normalisation",
          "A hash collision"
        ],
        "explanation": "There is no spare space for another item.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-8",
        "prompt": "A stack stores top as the last occupied zero-based index. Its empty top value is…",
        "answer": "−1",
        "options": [
          "−1",
          "0",
          "1",
          "The capacity"
        ],
        "explanation": "No occupied element exists, so −1 is the empty sentinel in this convention.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-10",
        "prompt": "A non-destructive traversal of an array-backed stack can…",
        "answer": "Read occupied indices without popping",
        "options": [
          "Read occupied indices without popping",
          "Pop every item permanently",
          "Overwrite top with zero",
          "Read unoccupied slots only"
        ],
        "explanation": "Iteration over occupied positions preserves stack contents.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-2",
        "prompt": "Which operation adds to a stack?",
        "answer": "Push",
        "options": [
          "Push",
          "Pop",
          "Dequeue",
          "Traverse only"
        ],
        "explanation": "Push places an item on top.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-3",
        "prompt": "Which operation removes from a stack?",
        "answer": "Pop",
        "options": [
          "Pop",
          "Push",
          "Enqueue",
          "Normalise"
        ],
        "explanation": "Pop removes and returns the top item.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-5",
        "prompt": "What does peek normally do?",
        "answer": "Read top without removal",
        "options": [
          "Read top without removal",
          "Remove every item",
          "Add an item",
          "Sort the stack"
        ],
        "explanation": "Peek inspects the top item while preserving the stack.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-7",
        "prompt": "Popping an empty stack causes…",
        "answer": "Underflow",
        "options": [
          "Underflow",
          "Overflow",
          "A valid zero result",
          "A compulsory enqueue"
        ],
        "explanation": "There is no item to remove.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-stacks-9",
        "prompt": "With top = 2 and spare capacity, a push first changes top to…",
        "answer": "3",
        "options": [
          "3",
          "1",
          "0",
          "−1"
        ],
        "explanation": "Increment top before storing at the new top index in this convention.",
        "skill": "Stacks",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-queues",
    "title": "Queues",
    "spec": "1.4.2(b,c)",
    "section": "1.4.2",
    "lessons": [
      20
    ],
    "page": 161,
    "questions": [
      {
        "id": "142-queues-1",
        "prompt": "A queue uses which access rule?",
        "answer": "FIFO",
        "options": [
          "FIFO",
          "LIFO",
          "Largest first always",
          "Random order"
        ],
        "explanation": "The first item added is the first removed.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-4",
        "prompt": "Enqueue A, B and C into an empty queue. What leaves first?",
        "answer": "A",
        "options": [
          "A",
          "B",
          "C",
          "Nothing"
        ],
        "explanation": "A arrived first.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-6",
        "prompt": "In a circular queue of capacity 5, the index after 4 is…",
        "answer": "0",
        "options": [
          "0",
          "5",
          "−1",
          "1"
        ],
        "explanation": "Wrap around using (index + 1) mod 5.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-8",
        "prompt": "With a count-based queue of capacity 6, the full condition is…",
        "answer": "count = 6",
        "options": [
          "count = 6",
          "count = 0",
          "front = 6 always",
          "rear = −1 always"
        ],
        "explanation": "The item count equals the allocated capacity.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-10",
        "prompt": "To traverse a circular queue without changing it, follow…",
        "answer": "count items from front, wrapping",
        "options": [
          "count items from front, wrapping",
          "Only indices front to end",
          "Every allocated slot regardless of count",
          "Only the rear item"
        ],
        "explanation": "Use the logical order and modulo arithmetic; do not alter front or rear.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-2",
        "prompt": "Which operation adds an item to a queue?",
        "answer": "Enqueue",
        "options": [
          "Enqueue",
          "Pop",
          "Dequeue",
          "Negate"
        ],
        "explanation": "Enqueue adds at the rear.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-3",
        "prompt": "Which operation removes an item from a queue?",
        "answer": "Dequeue",
        "options": [
          "Dequeue",
          "Push",
          "Enqueue",
          "Hash"
        ],
        "explanation": "Dequeue removes from the front.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-5",
        "prompt": "Where is a new queue item normally added?",
        "answer": "Rear",
        "options": [
          "Rear",
          "Front",
          "Every position",
          "The root"
        ],
        "explanation": "Items join behind those already waiting.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-7",
        "prompt": "With a count-based queue, the empty condition is…",
        "answer": "count = 0",
        "options": [
          "count = 0",
          "count = capacity",
          "front = 1 always",
          "rear = capacity always"
        ],
        "explanation": "Zero stored items means the queue is empty.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-queues-9",
        "prompt": "After a successful dequeue in a count-based circular queue, count…",
        "answer": "Decreases by 1",
        "options": [
          "Decreases by 1",
          "Increases by 1",
          "Stays the same",
          "Becomes the capacity"
        ],
        "explanation": "One item has been removed.",
        "skill": "Queues",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-trees",
    "title": "Trees",
    "spec": "1.4.2(b,c)",
    "section": "1.4.2",
    "lessons": [
      22
    ],
    "page": 163,
    "questions": [
      {
        "id": "142-trees-1",
        "prompt": "Which node starts a rooted tree?",
        "answer": "Root",
        "options": [
          "Root",
          "Leaf",
          "Edge",
          "Rear"
        ],
        "explanation": "The root has no parent.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-4",
        "prompt": "What distinguishes a tree from a general connected undirected graph?",
        "answer": "It has no cycles",
        "options": [
          "It has no cycles",
          "It must have weights",
          "It must be complete",
          "Every vertex has two children"
        ],
        "explanation": "A tree is connected and acyclic.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-6",
        "prompt": "How many parents does a non-root node have in a rooted tree?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Any number"
        ],
        "explanation": "Each non-root node has one parent.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-8",
        "prompt": "In postorder traversal, when is the current node visited?",
        "answer": "After its subtrees",
        "options": [
          "After its subtrees",
          "Before both subtrees",
          "Only before the left",
          "Never at the root"
        ],
        "explanation": "Postorder visits children before the node.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-10",
        "prompt": "Deleting a leaf requires…",
        "answer": "Clearing its parent’s link",
        "options": [
          "Clearing its parent’s link",
          "Deleting all ancestors",
          "Adding a cycle",
          "Sorting every node"
        ],
        "explanation": "A leaf has no subtrees to reconnect.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-2",
        "prompt": "A leaf is a node with…",
        "answer": "No children",
        "options": [
          "No children",
          "No data",
          "Exactly two parents",
          "No connection to the root"
        ],
        "explanation": "Leaf nodes end branches.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-3",
        "prompt": "In a binary tree, a node can have at most…",
        "answer": "2 children",
        "options": [
          "2 children",
          "1 child",
          "3 children",
          "4 children"
        ],
        "explanation": "Each node has up to a left and right child.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-5",
        "prompt": "When creating a one-node rooted tree, the first node becomes…",
        "answer": "The root",
        "options": [
          "The root",
          "A second parent",
          "A hash bucket",
          "A queue rear only"
        ],
        "explanation": "There is one node and no child edges.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-7",
        "prompt": "In preorder traversal, when is the current node visited?",
        "answer": "Before its subtrees",
        "options": [
          "Before its subtrees",
          "After both subtrees",
          "Only if a leaf",
          "After the right subtree only"
        ],
        "explanation": "Preorder is node, left subtree, right subtree for a binary tree.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-trees-9",
        "prompt": "To add a child while preserving a rooted tree, the new node must…",
        "answer": "Attach to one parent without a cycle",
        "options": [
          "Attach to one parent without a cycle",
          "Attach to every ancestor",
          "Become its own parent",
          "Add a loop to the root"
        ],
        "explanation": "The tree must remain acyclic with one parent per non-root node.",
        "skill": "Trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-bst",
    "title": "Binary search trees",
    "spec": "1.4.2(b,c)",
    "section": "1.4.2",
    "lessons": [
      22
    ],
    "page": 163,
    "questions": [
      {
        "id": "142-bst-1",
        "prompt": "In a BST with unique keys, values in a node’s left subtree are…",
        "answer": "Smaller than the node",
        "options": [
          "Smaller than the node",
          "Larger than the node",
          "Always equal",
          "Unrelated to the node"
        ],
        "explanation": "The BST ordering property applies across each subtree.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-4",
        "prompt": "Search for 12 at a BST node containing 8. Which branch is considered next?",
        "answer": "Right",
        "options": [
          "Right",
          "Left",
          "Both always",
          "Neither always"
        ],
        "explanation": "12 is greater than 8.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-6",
        "prompt": "The first key inserted into an empty ordinary BST becomes…",
        "answer": "Root",
        "options": [
          "Root",
          "Left leaf always",
          "Right leaf always",
          "Rear"
        ],
        "explanation": "There is no existing node, so the new node starts the tree.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-8",
        "prompt": "One valid replacement when deleting a BST node with two children is…",
        "answer": "Smallest key in its right subtree",
        "options": [
          "Smallest key in its right subtree",
          "Largest key in the whole tree always",
          "Any unrelated key",
          "Its grandparent always"
        ],
        "explanation": "The inorder successor preserves the BST ordering property.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-10",
        "prompt": "Search reaches a null child link without finding the key. The key is…",
        "answer": "Not present",
        "options": [
          "Not present",
          "Definitely at the root",
          "Always at the last leaf",
          "A duplicate"
        ],
        "explanation": "The search path has ended without a match.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-2",
        "prompt": "Insert 7 into a BST with root 10 and no children. Where does 7 go?",
        "answer": "Left child of 10",
        "options": [
          "Left child of 10",
          "Right child of 10",
          "New root always",
          "Outside the tree"
        ],
        "explanation": "7 < 10, so follow the left link.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-3",
        "prompt": "Insert 15 into a BST with root 10 and no children. Where does 15 go?",
        "answer": "Right child of 10",
        "options": [
          "Right child of 10",
          "Left child of 10",
          "New root always",
          "A hash bucket"
        ],
        "explanation": "15 > 10, so follow the right link.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-5",
        "prompt": "What order does inorder traversal of a BST produce?",
        "answer": "Ascending key order",
        "options": [
          "Ascending key order",
          "Insertion order always",
          "Descending always",
          "Random order"
        ],
        "explanation": "Left subtree, node, right subtree yields sorted keys.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-7",
        "prompt": "To remove a BST node with exactly one child, reconnect its parent to…",
        "answer": "That child",
        "options": [
          "That child",
          "The deleted node",
          "Every leaf",
          "A new duplicate key"
        ],
        "explanation": "The child replaces the removed node’s position.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-bst-9",
        "prompt": "What can inserting sorted keys into an unbalanced ordinary BST produce?",
        "answer": "A chain-like tree",
        "options": [
          "A chain-like tree",
          "A guaranteed balanced tree",
          "A complete graph",
          "A circular queue"
        ],
        "explanation": "Every new key can follow the same side, increasing depth.",
        "skill": "Binary search trees",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "142-hash",
    "title": "Hash tables",
    "spec": "1.4.2(b,c)",
    "section": "1.4.2",
    "lessons": [
      23
    ],
    "page": 165,
    "questions": [
      {
        "id": "142-hash-1",
        "prompt": "What does a hash function calculate from a key?",
        "answer": "A table index",
        "options": [
          "A table index",
          "A complete sorted tree",
          "A Boolean expression",
          "The original record always"
        ],
        "explanation": "The index identifies a storage bucket or slot.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-4",
        "prompt": "What does separate chaining use to resolve a collision?",
        "answer": "A collection at the bucket",
        "options": [
          "A collection at the bucket",
          "A compulsory new hash function per item",
          "Deleting the existing key",
          "Sorting every table slot"
        ],
        "explanation": "The bucket stores multiple entries, often in a linked list.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-6",
        "prompt": "In capacity 10, linear probing after slot 9 continues at…",
        "answer": "0",
        "options": [
          "0",
          "10",
          "−1",
          "8"
        ],
        "explanation": "The probing sequence wraps around.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-8",
        "prompt": "Why use a tombstone when deleting from a linear-probing hash table?",
        "answer": "Preserve the probe chain",
        "options": [
          "Preserve the probe chain",
          "Guarantee no collisions",
          "Sort the keys",
          "Increase the hash value"
        ],
        "explanation": "A never-used empty marker could stop a later search too soon.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-10",
        "prompt": "To remove a key in separate chaining, locate the bucket and…",
        "answer": "Remove its matching entry",
        "options": [
          "Remove its matching entry",
          "Clear every bucket",
          "Delete the hash function",
          "Remove every collision"
        ],
        "explanation": "Other entries in the bucket must remain available.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-2",
        "prompt": "Using h(k) = k mod 10, where does key 37 map?",
        "answer": "7",
        "options": [
          "7",
          "3",
          "10",
          "37"
        ],
        "explanation": "37 divided by 10 leaves remainder 7.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-3",
        "prompt": "A collision occurs when…",
        "answer": "Different keys map to one index",
        "options": [
          "Different keys map to one index",
          "Two keys have different indices",
          "A table is always empty",
          "A value is sorted"
        ],
        "explanation": "The hash function can map distinct keys to the same bucket.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-5",
        "prompt": "What does linear probing do after an occupied target slot?",
        "answer": "Check subsequent slots",
        "options": [
          "Check subsequent slots",
          "Always overwrite it",
          "Search only backwards in a tree",
          "Delete the key"
        ],
        "explanation": "Try following slots, wrapping as required.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-7",
        "prompt": "To create an empty hash table, initialise its buckets or slots as…",
        "answer": "Empty",
        "options": [
          "Empty",
          "All occupied",
          "All duplicate keys",
          "A complete graph"
        ],
        "explanation": "Empty markers distinguish available locations.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "142-hash-9",
        "prompt": "How can all records in a hash table be traversed?",
        "answer": "Visit all buckets and their entries",
        "options": [
          "Visit all buckets and their entries",
          "Read one hash value only",
          "Follow only the root",
          "Ignore collision entries"
        ],
        "explanation": "Traversal includes each occupied slot or each chain entry.",
        "skill": "Hash tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-model",
    "title": "Define a Boolean problem",
    "spec": "1.4.3(a)",
    "section": "1.4.3",
    "lessons": [
      26
    ],
    "page": 252,
    "questions": [
      {
        "id": "143-model-1",
        "prompt": "A means valid ticket; B means staff pass. Entry is allowed with either. Which expression models entry?",
        "answer": "A OR B",
        "options": [
          "A OR B",
          "A AND B",
          "NOT A",
          "A XOR B"
        ],
        "explanation": "OR accepts either credential, including when both are true.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-4",
        "prompt": "A means key present; B means override active. Exactly one must be true. Expression?",
        "answer": "A XOR B",
        "options": [
          "A XOR B",
          "A OR B",
          "A AND B",
          "NOT A"
        ],
        "explanation": "XOR is true for exactly one true input.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-6",
        "prompt": "Which values can a Boolean variable take?",
        "answer": "True or false",
        "options": [
          "True or false",
          "Every integer",
          "Only text",
          "Only a decimal fraction"
        ],
        "explanation": "Boolean logic uses two truth values.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-8",
        "prompt": "A and B mean two buttons pressed. Neither button pressed is…",
        "answer": "NOT A AND NOT B",
        "options": [
          "NOT A AND NOT B",
          "A AND B",
          "A OR B",
          "NOT A OR B"
        ],
        "explanation": "Both button conditions must be false.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-10",
        "prompt": "A means door closed; B means guard fitted; C means emergency stop. Run if A and B, unless C. Expression?",
        "answer": "A AND B AND NOT C",
        "options": [
          "A AND B AND NOT C",
          "A OR B OR C",
          "A AND B AND C",
          "NOT A AND NOT B"
        ],
        "explanation": "Both safety requirements must be true and emergency stop false.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-2",
        "prompt": "A means alarm armed; B means motion detected. The alarm sounds only when both are true. Expression?",
        "answer": "A AND B",
        "options": [
          "A AND B",
          "A OR B",
          "NOT B",
          "A XOR B"
        ],
        "explanation": "Both required conditions are joined with AND.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-3",
        "prompt": "A means raining. Which expression means not raining?",
        "answer": "NOT A",
        "options": [
          "NOT A",
          "A AND A",
          "A OR A",
          "A XOR 0"
        ],
        "explanation": "NOT reverses the Boolean condition.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-5",
        "prompt": "A means logged in; B means blocked. Access requires logged in and not blocked. Expression?",
        "answer": "A AND NOT B",
        "options": [
          "A AND NOT B",
          "A OR B",
          "NOT A AND B",
          "A AND B"
        ],
        "explanation": "The blocked condition must be false.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-7",
        "prompt": "A means sensor active. When A = 0, NOT A equals…",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "NOT reverses 0 to 1.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-model-9",
        "prompt": "A means adult; B means accompanied. Admission unless neither applies is…",
        "answer": "A OR B",
        "options": [
          "A OR B",
          "A AND B",
          "A XOR B",
          "NOT A AND NOT B"
        ],
        "explanation": "Admission is denied only when A and B are both false.",
        "skill": "Define a Boolean problem",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-manipulate",
    "title": "Manipulate Boolean expressions",
    "spec": "1.4.3(b)",
    "section": "1.4.3",
    "lessons": [
      27
    ],
    "page": 190,
    "questions": [
      {
        "id": "143-manipulate-1",
        "prompt": "In Boolean algebra, A + A simplifies to…",
        "answer": "A",
        "options": [
          "A",
          "0",
          "1",
          "NOT A"
        ],
        "explanation": "OR of a value with itself leaves it unchanged.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-4",
        "prompt": "A AND 0 simplifies to…",
        "answer": "0",
        "options": [
          "0",
          "A",
          "1",
          "NOT A"
        ],
        "explanation": "AND is false when either input is false.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-6",
        "prompt": "A AND NOT A simplifies to…",
        "answer": "0",
        "options": [
          "0",
          "1",
          "A",
          "NOT A"
        ],
        "explanation": "A and its negation cannot both be true.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-8",
        "prompt": "A OR (A AND B) simplifies to…",
        "answer": "A",
        "options": [
          "A",
          "B",
          "A AND B",
          "NOT A"
        ],
        "explanation": "Absorption: if A is true the OR is true; otherwise both terms are false.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-10",
        "prompt": "NOT (NOT A) simplifies to…",
        "answer": "A",
        "options": [
          "A",
          "0",
          "1",
          "NOT A"
        ],
        "explanation": "Double negation restores the original value.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-2",
        "prompt": "A AND 1 simplifies to…",
        "answer": "A",
        "options": [
          "A",
          "0",
          "1",
          "NOT A"
        ],
        "explanation": "1 is the identity for AND.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-3",
        "prompt": "A OR 0 simplifies to…",
        "answer": "A",
        "options": [
          "A",
          "0",
          "1",
          "NOT A"
        ],
        "explanation": "0 is the identity for OR.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-5",
        "prompt": "A OR 1 simplifies to…",
        "answer": "1",
        "options": [
          "1",
          "A",
          "0",
          "NOT A"
        ],
        "explanation": "OR is true when either input is true.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-7",
        "prompt": "A OR NOT A simplifies to…",
        "answer": "1",
        "options": [
          "1",
          "0",
          "A",
          "NOT A"
        ],
        "explanation": "At least one of A and NOT A is true.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-manipulate-9",
        "prompt": "A AND (A OR B) simplifies to…",
        "answer": "A",
        "options": [
          "A",
          "B",
          "A OR B",
          "NOT B"
        ],
        "explanation": "Absorption removes the redundant OR term.",
        "skill": "Manipulate Boolean expressions",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-kmap",
    "title": "Karnaugh maps",
    "spec": "1.4.3(b)",
    "section": "1.4.3",
    "lessons": [
      28,
      29
    ],
    "page": 174,
    "questions": [
      {
        "id": "143-kmap-1",
        "prompt": "Why use Gray-code ordering on a Karnaugh map?",
        "answer": "Adjacent cells differ by one input",
        "options": [
          "Adjacent cells differ by one input",
          "Every row is sorted numerically",
          "Every cell has two outputs",
          "It removes all zeroes"
        ],
        "explanation": "One changing variable can be eliminated when grouping neighbours.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-4",
        "prompt": "Can two groups share a cell containing 1?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No",
          "Only if that cell is 0",
          "Only in two-variable maps"
        ],
        "explanation": "Overlapping groups are allowed and may aid simplification.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-6",
        "prompt": "A two-variable function is 1 for (A,B) = (1,0) and (1,1), and 0 elsewhere. Simplify it.",
        "answer": "A",
        "options": [
          "A",
          "B",
          "NOT A",
          "A AND B"
        ],
        "explanation": "A stays 1 in both cells; B changes and is eliminated.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-8",
        "prompt": "On a two-variable map, only (A,B) = (0,0) has output 1. Its term is…",
        "answer": "NOT A AND NOT B",
        "options": [
          "NOT A AND NOT B",
          "A AND B",
          "A OR B",
          "NOT A OR NOT B"
        ],
        "explanation": "Both input conditions must match zero.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-10",
        "prompt": "A group contains all four A,B combinations while C stays 1. Which term remains?",
        "answer": "C",
        "options": [
          "C",
          "A AND B",
          "NOT C",
          "A OR B"
        ],
        "explanation": "Only C is fixed across the group.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-2",
        "prompt": "Which is a valid size for a group of 1s on a Karnaugh map?",
        "answer": "4",
        "options": [
          "4",
          "3",
          "5",
          "6"
        ],
        "explanation": "Group sizes are powers of two: 1, 2, 4, 8 and so on.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-3",
        "prompt": "Can a Karnaugh-map group wrap across opposite edges?",
        "answer": "Yes, if cells are adjacent by Gray code",
        "options": [
          "Yes, if cells are adjacent by Gray code",
          "No, never",
          "Only across a diagonal",
          "Only if it includes a zero"
        ],
        "explanation": "Opposite edges are adjacent in the map topology.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-5",
        "prompt": "For sum-of-products simplification, groups must contain…",
        "answer": "Only 1s (and any permitted don’t-cares)",
        "options": [
          "Only 1s (and any permitted don’t-cares)",
          "Only zeroes",
          "At least one zero",
          "Every cell in the map"
        ],
        "explanation": "Each group represents cases where the output is true.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-7",
        "prompt": "A three-variable function is 1 whenever A = 0, regardless of B and C. Simplify it.",
        "answer": "NOT A",
        "options": [
          "NOT A",
          "A",
          "B AND C",
          "A OR B"
        ],
        "explanation": "B and C vary across the group, leaving NOT A.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-kmap-9",
        "prompt": "When expanding a valid group from 2 cells to 4 cells, the resulting product term normally has…",
        "answer": "One fewer literal",
        "options": [
          "One fewer literal",
          "One extra literal",
          "Exactly two extra gates",
          "No possible simplification"
        ],
        "explanation": "Each doubling eliminates one independently changing variable.",
        "skill": "Karnaugh maps",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-laws",
    "title": "Boolean laws and derivations",
    "spec": "1.4.3(c)",
    "section": "1.4.3",
    "lessons": [
      27
    ],
    "page": 190,
    "questions": [
      {
        "id": "143-laws-1",
        "prompt": "De Morgan: NOT (A AND B) is equivalent to…",
        "answer": "NOT A OR NOT B",
        "options": [
          "NOT A OR NOT B",
          "NOT A AND NOT B",
          "A OR B",
          "A AND NOT B"
        ],
        "explanation": "Negate each operand and swap AND to OR.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-4",
        "prompt": "Factor (A AND B) OR (A AND C).",
        "answer": "A AND (B OR C)",
        "options": [
          "A AND (B OR C)",
          "A OR B OR C",
          "A AND B AND C",
          "A OR (B AND C)"
        ],
        "explanation": "A is common to both product terms.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-6",
        "prompt": "Which law justifies (A OR B) OR C = A OR (B OR C)?",
        "answer": "Association",
        "options": [
          "Association",
          "Commutation",
          "Double negation",
          "De Morgan"
        ],
        "explanation": "Association changes grouping without changing operand order.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-8",
        "prompt": "Distribute A OR (B AND C).",
        "answer": "(A OR B) AND (A OR C)",
        "options": [
          "(A OR B) AND (A OR C)",
          "A AND B AND C",
          "(A AND B) OR C",
          "A OR B OR C"
        ],
        "explanation": "In Boolean algebra OR also distributes over AND.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-10",
        "prompt": "Which change applies association rather than commutation?",
        "answer": "(A AND B) AND C → A AND (B AND C)",
        "options": [
          "(A AND B) AND C → A AND (B AND C)",
          "A OR B → B OR A",
          "A AND B → B AND A",
          "A → NOT NOT A"
        ],
        "explanation": "Association changes brackets; commutation changes order.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-2",
        "prompt": "De Morgan: NOT (A OR B) is equivalent to…",
        "answer": "NOT A AND NOT B",
        "options": [
          "NOT A AND NOT B",
          "NOT A OR NOT B",
          "A AND B",
          "NOT A AND B"
        ],
        "explanation": "Negate each operand and swap OR to AND.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-3",
        "prompt": "Distribute A AND (B OR C).",
        "answer": "(A AND B) OR (A AND C)",
        "options": [
          "(A AND B) OR (A AND C)",
          "A OR B OR C",
          "(A OR B) AND C",
          "A AND B AND C"
        ],
        "explanation": "AND distributes over OR.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-5",
        "prompt": "Which law justifies A AND B = B AND A?",
        "answer": "Commutation",
        "options": [
          "Commutation",
          "Association",
          "Double negation",
          "De Morgan"
        ],
        "explanation": "Commutation swaps operand order.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-7",
        "prompt": "Which law justifies NOT NOT A = A?",
        "answer": "Double negation",
        "options": [
          "Double negation",
          "Distribution",
          "Association",
          "Commutation"
        ],
        "explanation": "Two NOT operations cancel.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-laws-9",
        "prompt": "Apply De Morgan to NOT (A AND (B OR C)).",
        "answer": "NOT A OR (NOT B AND NOT C)",
        "options": [
          "NOT A OR (NOT B AND NOT C)",
          "NOT A AND NOT B AND NOT C",
          "A OR B OR C",
          "NOT A OR NOT B OR NOT C"
        ],
        "explanation": "First negate the outer AND, then negate the inner OR.",
        "skill": "Boolean laws and derivations",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-gates",
    "title": "Logic gates and truth tables",
    "spec": "1.4.3(d)",
    "section": "1.4.3",
    "lessons": [
      26
    ],
    "page": 251,
    "questions": [
      {
        "id": "143-gates-1",
        "prompt": "Inputs (A,B) are ordered 00, 01, 10, 11. What output sequence does an AND gate produce?",
        "answer": "0001",
        "options": [
          "0001",
          "0000",
          "1111",
          "0101"
        ],
        "explanation": "In input order 00, 01, 10, 11, AND produces 0001.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-4",
        "prompt": "Inputs (A,B) are ordered 00, 01, 10, 11. What output sequence does an NAND gate produce?",
        "answer": "1110",
        "options": [
          "1110",
          "0000",
          "1111",
          "0101"
        ],
        "explanation": "In input order 00, 01, 10, 11, NAND produces 1110.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-6",
        "prompt": "A = 1, B = 0, C = 1. What is (A AND B) OR C?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Undefined"
        ],
        "explanation": "A AND B = 0, then 0 OR 1 = 1.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-8",
        "prompt": "How many rows are needed for all combinations of three Boolean inputs?",
        "answer": "8",
        "options": [
          "8",
          "3",
          "6",
          "9"
        ],
        "explanation": "There are 2^3 = 8 combinations.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-10",
        "prompt": "Which gate produces 1 only when its two inputs differ?",
        "answer": "XOR",
        "options": [
          "XOR",
          "AND",
          "OR",
          "NOR"
        ],
        "explanation": "XOR is 1 for inputs 01 and 10 only.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-2",
        "prompt": "Inputs (A,B) are ordered 00, 01, 10, 11. What output sequence does an OR gate produce?",
        "answer": "0111",
        "options": [
          "0111",
          "0000",
          "1111",
          "0101"
        ],
        "explanation": "In input order 00, 01, 10, 11, OR produces 0111.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-3",
        "prompt": "Inputs (A,B) are ordered 00, 01, 10, 11. What output sequence does an XOR gate produce?",
        "answer": "0110",
        "options": [
          "0110",
          "0000",
          "1111",
          "0101"
        ],
        "explanation": "In input order 00, 01, 10, 11, XOR produces 0110.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-5",
        "prompt": "Inputs (A,B) are ordered 00, 01, 10, 11. What output sequence does an NOR gate produce?",
        "answer": "1000",
        "options": [
          "1000",
          "0000",
          "1111",
          "0101"
        ],
        "explanation": "In input order 00, 01, 10, 11, NOR produces 1000.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-7",
        "prompt": "A = 0 and B = 1. What is NOT (A OR B)?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "Undefined"
        ],
        "explanation": "A OR B = 1, then NOT 1 = 0.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-gates-9",
        "prompt": "How many rows are needed for all combinations of four Boolean inputs?",
        "answer": "16",
        "options": [
          "16",
          "4",
          "8",
          "12"
        ],
        "explanation": "There are 2^4 = 16 combinations.",
        "skill": "Logic gates and truth tables",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-flip",
    "title": "D-type flip-flops",
    "spec": "1.4.3(e)",
    "section": "1.4.3",
    "lessons": [
      31
    ],
    "page": 184,
    "questions": [
      {
        "id": "143-flip-1",
        "prompt": "A D-type flip-flop stores how many bits?",
        "answer": "1",
        "options": [
          "1",
          "2",
          "4",
          "8"
        ],
        "explanation": "Its output Q stores one Boolean state.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-4",
        "prompt": "At the rising edge, D = 0 and old Q = 1. New Q is…",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "Always unchanged"
        ],
        "explanation": "The sampled D value replaces the old state.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-6",
        "prompt": "Q = 1. D becomes 0 without a rising edge. What is Q?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "2",
          "Not stored"
        ],
        "explanation": "The stored bit is held until the next active edge.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-8",
        "prompt": "A row of eight D-type flip-flops can form…",
        "answer": "An 8-bit register",
        "options": [
          "An 8-bit register",
          "An 8-way AND gate",
          "Only one stored bit",
          "A character set"
        ],
        "explanation": "Each flip-flop contributes one stored bit.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-10",
        "prompt": "At successive rising edges, D is 1, 0, 1. Q after those edges is…",
        "answer": "1, 0, 1",
        "options": [
          "1, 0, 1",
          "0, 1, 0",
          "1, 1, 1",
          "0, 0, 0"
        ],
        "explanation": "Each active edge captures that edge’s D value.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-2",
        "prompt": "A positive-edge-triggered D flip-flop samples D at…",
        "answer": "The rising clock edge",
        "options": [
          "The rising clock edge",
          "Every instant clock is high",
          "Only the falling edge",
          "Every input change"
        ],
        "explanation": "At the active rising edge, Q takes the current D value.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-3",
        "prompt": "At the rising edge, D = 1. What becomes Q?",
        "answer": "1",
        "options": [
          "1",
          "0",
          "It toggles regardless of D",
          "Undefined always"
        ],
        "explanation": "Q captures D at the active clock edge.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-5",
        "prompt": "Between active clock edges, D changes. What happens to Q in the ideal model?",
        "answer": "It holds its state",
        "options": [
          "It holds its state",
          "It always follows D",
          "It always becomes 0",
          "It always toggles"
        ],
        "explanation": "An edge-triggered flip-flop updates only at its active edge.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-7",
        "prompt": "With no asynchronous controls, what happens at a falling edge of a positive-edge-triggered D flip-flop?",
        "answer": "Q holds its state",
        "options": [
          "Q holds its state",
          "Q must become D",
          "Q must become 0",
          "Q must toggle"
        ],
        "explanation": "The falling edge is not its active sampling edge.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-flip-9",
        "prompt": "For an ideal D-type flip-flop, the next state at its active edge is…",
        "answer": "Q(next) = D",
        "options": [
          "Q(next) = D",
          "Q(next) = NOT D always",
          "Q(next) = clock always",
          "Q(next) = old Q always"
        ],
        "explanation": "The defining operation is sampling and storing D.",
        "skill": "D-type flip-flops",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-half",
    "title": "Half adders",
    "spec": "1.4.3(e)",
    "section": "1.4.3",
    "lessons": [
      30
    ],
    "page": 184,
    "questions": [
      {
        "id": "143-half-1",
        "prompt": "How many input bits does a half adder add?",
        "answer": "2",
        "options": [
          "2",
          "1",
          "3",
          "4"
        ],
        "explanation": "A half adder adds A and B without a carry-in.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-4",
        "prompt": "The half-adder carry expression is…",
        "answer": "A AND B",
        "options": [
          "A AND B",
          "A XOR B",
          "A OR B",
          "NOT B"
        ],
        "explanation": "A carry occurs only when both inputs are 1.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-6",
        "prompt": "Half adder: A = 0, B = 1. Give (sum, carry).",
        "answer": "(1, 0)",
        "options": [
          "(1, 0)",
          "(0, 0)",
          "(0, 1)",
          "(1, 1)"
        ],
        "explanation": "0 + 1 = 1: sum 1, carry 0.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-8",
        "prompt": "Half adder: A = 1, B = 1. Give (sum, carry).",
        "answer": "(0, 1)",
        "options": [
          "(0, 1)",
          "(0, 0)",
          "(1, 0)",
          "(1, 1)"
        ],
        "explanation": "1 + 1 = binary 10: carry 1 and sum 0.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-10",
        "prompt": "Which pair of gates implements a half adder?",
        "answer": "XOR and AND",
        "options": [
          "XOR and AND",
          "OR and NOT",
          "Two NOT gates",
          "NOR and OR"
        ],
        "explanation": "XOR produces sum and AND produces carry.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-2",
        "prompt": "A half adder produces…",
        "answer": "Sum and carry",
        "options": [
          "Sum and carry",
          "Only sum",
          "Only carry",
          "Three independent sums"
        ],
        "explanation": "Two outputs represent the result of adding two bits.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-3",
        "prompt": "The half-adder sum expression is…",
        "answer": "A XOR B",
        "options": [
          "A XOR B",
          "A AND B",
          "A OR B",
          "NOT A"
        ],
        "explanation": "XOR gives the least significant result bit.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-5",
        "prompt": "Half adder: A = 0, B = 0. Give (sum, carry).",
        "answer": "(0, 0)",
        "options": [
          "(0, 0)",
          "(0, 1)",
          "(1, 0)",
          "(1, 1)"
        ],
        "explanation": "0 + 0 = 0.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-7",
        "prompt": "Half adder: A = 1, B = 0. Give (sum, carry).",
        "answer": "(1, 0)",
        "options": [
          "(1, 0)",
          "(0, 0)",
          "(0, 1)",
          "(1, 1)"
        ],
        "explanation": "1 + 0 = 1: sum 1, carry 0.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-half-9",
        "prompt": "Why is a half adder insufficient for a middle bit in a multi-bit addition?",
        "answer": "It has no carry-in input",
        "options": [
          "It has no carry-in input",
          "It has no sum output",
          "It cannot add 1 and 1",
          "It stores the result forever"
        ],
        "explanation": "Middle columns may need to add a carry from the preceding column.",
        "skill": "Half adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  },
  {
    "id": "143-full",
    "title": "Full adders",
    "spec": "1.4.3(e)",
    "section": "1.4.3",
    "lessons": [
      30
    ],
    "page": 186,
    "questions": [
      {
        "id": "143-full-1",
        "prompt": "How many input bits does a full adder add?",
        "answer": "3",
        "options": [
          "3",
          "1",
          "2",
          "4"
        ],
        "explanation": "It adds A, B and carry-in.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-4",
        "prompt": "Full adder: inputs A, B, Cin are 0, 0, 1. Give (sum, carry-out).",
        "answer": "(1, 0)",
        "options": [
          "(1, 0)",
          "(0, 0)",
          "(0, 1)",
          "(1, 1)"
        ],
        "explanation": "The total is 1.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-6",
        "prompt": "Full adder: inputs A, B, Cin are 1, 1, 1. Give (sum, carry-out).",
        "answer": "(1, 1)",
        "options": [
          "(1, 1)",
          "(0, 0)",
          "(0, 1)",
          "(1, 0)"
        ],
        "explanation": "The total is 3, binary 11.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-8",
        "prompt": "How can a full adder be built from half adders?",
        "answer": "Two half adders and an OR gate",
        "options": [
          "Two half adders and an OR gate",
          "One half adder only",
          "Two NOT gates",
          "Only an AND gate"
        ],
        "explanation": "The half adders produce two carry signals; OR combines them.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-10",
        "prompt": "When is carry-out 1 for a full adder?",
        "answer": "At least two inputs are 1",
        "options": [
          "At least two inputs are 1",
          "Exactly one input is 1",
          "All inputs are 0",
          "Only when all three are 1"
        ],
        "explanation": "Two or three set input bits produce a total of at least 2.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-2",
        "prompt": "The full-adder sum is…",
        "answer": "A XOR B XOR Cin",
        "options": [
          "A XOR B XOR Cin",
          "A AND B AND Cin",
          "A OR B OR Cin",
          "NOT Cin"
        ],
        "explanation": "The sum bit is the parity of the three inputs.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-3",
        "prompt": "A valid full-adder carry-out expression is…",
        "answer": "(A AND B) OR (Cin AND (A XOR B))",
        "options": [
          "(A AND B) OR (Cin AND (A XOR B))",
          "A XOR B XOR Cin",
          "A AND NOT B",
          "NOT A AND NOT B"
        ],
        "explanation": "Carry is generated by A and B, or propagated through their XOR with carry-in.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-5",
        "prompt": "Full adder: inputs A, B, Cin are 0, 1, 1. Give (sum, carry-out).",
        "answer": "(0, 1)",
        "options": [
          "(0, 1)",
          "(0, 0)",
          "(1, 0)",
          "(1, 1)"
        ],
        "explanation": "The total is 2, binary 10.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-7",
        "prompt": "Full adder: inputs A, B, Cin are 1, 0, 1. Give (sum, carry-out).",
        "answer": "(0, 1)",
        "options": [
          "(0, 1)",
          "(0, 0)",
          "(1, 0)",
          "(1, 1)"
        ],
        "explanation": "The total is 2, binary 10.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      },
      {
        "id": "143-full-9",
        "prompt": "In a ripple-carry adder, a stage’s carry-out connects to…",
        "answer": "The next more significant stage’s carry-in",
        "options": [
          "The next more significant stage’s carry-in",
          "Its own sum input",
          "The previous stage’s data bit",
          "Every NOT gate"
        ],
        "explanation": "Carry moves toward more significant bit positions.",
        "skill": "Full adders",
        "source": "Original H446 practice question, checked against specification and linked teaching"
      }
    ]
  }
];
