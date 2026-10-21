const PILOT_TOPICS = [
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
        "id": "a1",
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
        "id": "a2",
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
        "id": "a3",
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
        "id": "a4",
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
        "id": "a5",
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
        "id": "a6",
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
        "id": "a7",
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
        "id": "a8",
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
        "id": "a9",
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
        "id": "a10",
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
    ]
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
        "id": "b1",
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
        "id": "b2",
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
        "id": "b3",
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
        "id": "b4",
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
        "id": "b5",
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
        "id": "b6",
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
        "id": "b7",
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
        "id": "b8",
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
        "id": "b9",
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
        "id": "b10",
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
    ]
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
        "id": "c1",
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
        "id": "c2",
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
        "id": "c3",
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
        "id": "c4",
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
        "id": "c9",
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
        "id": "c5",
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
        "id": "c6",
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
        "id": "c7",
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
        "id": "c8",
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
        "id": "c10",
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
    ]
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
        "id": "d1",
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
        "id": "d2",
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
        "id": "d3",
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
        "id": "d4",
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
        "id": "d9",
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
        "id": "d5",
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
        "id": "d6",
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
        "id": "d7",
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
        "id": "d8",
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
        "id": "d10",
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
    ]
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
        "id": "e1",
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
        "id": "e2",
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
        "id": "e3",
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
        "id": "e4",
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
        "id": "e5",
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
        "id": "e6",
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
        "id": "e7",
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
        "id": "e8",
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
        "id": "e9",
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
        "id": "e10",
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
    ]
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
        "id": "f1",
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
        "id": "f2",
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
        "id": "f3",
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
        "id": "f4",
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
        "id": "f5",
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
        "id": "f6",
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
        "id": "f7",
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
        "id": "f8",
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
        "id": "f9",
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
        "id": "f10",
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
    ]
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
        "id": "g1",
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
        "id": "g3",
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
        "id": "g7",
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
        "id": "g8",
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
        "id": "g9",
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
        "id": "g2",
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
        "id": "g4",
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
        "id": "g5",
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
        "id": "g6",
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
        "id": "g10",
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
    ]
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
        "id": "h1",
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
        "id": "h2",
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
        "id": "h3",
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
        "id": "h7",
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
        "id": "h8",
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
        "id": "h4",
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
        "id": "h5",
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
        "id": "h6",
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
        "id": "h9",
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
        "id": "h10",
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
    ]
  },
  {
    "key": "i",
    "title": "Shifts and bitwise masks",
    "lessons": [
      3
    ],
    "page": 131,
    "reading": 3,
    "questions": [
      {
        "id": "i1",
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
        "id": "i2",
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
        "id": "i3",
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
        "id": "i4",
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
        "id": "i5",
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
        "id": "i6",
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
        "id": "i7",
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
        "id": "i8",
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
        "id": "i9",
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
        "id": "i10",
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
    ]
  },
  {
    "key": "j",
    "title": "ASCII and Unicode",
    "lessons": [
      8
    ],
    "page": 132,
    "reading": 8,
    "questions": [
      {
        "id": "j1",
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
        "id": "j2",
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
        "id": "j3",
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
        "id": "j4",
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
        "id": "j5",
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
        "id": "j6",
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
        "id": "j7",
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
        "id": "j8",
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
        "id": "j9",
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
        "id": "j10",
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
    ]
  }
];
