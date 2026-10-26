'use strict';
// OCR J277 1.2 Memory and Storage — original small-skill MCQs, two five-question sets per skill.
const J277_SECTION={"code":"1.2","title":"Memory and Storage"};
const SKILLS=[
  {
    "id": "12-memory",
    "section": "1.2",
    "spec": "1.2.1",
    "title": "RAM and ROM",
    "questions": [
      {
        "prompt": "What does RAM store?",
        "answer": "Programs and data currently being used",
        "options": [
          "Programs and data currently being used",
          "Only start-up firmware",
          "Files permanently without power",
          "Screen resolution settings"
        ],
        "explanation": "RAM holds working data and running programs.",
        "id": "12-memory-1",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "What happens to ordinary RAM data when power is lost?",
        "answer": "It is lost",
        "options": [
          "It is lost",
          "It is kept forever",
          "It becomes ROM",
          "It moves automatically to a DVD"
        ],
        "explanation": "RAM is volatile.",
        "id": "12-memory-2",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "Which memory commonly stores start-up firmware?",
        "answer": "ROM",
        "options": [
          "ROM",
          "RAM",
          "Virtual memory",
          "GPU cache"
        ],
        "explanation": "ROM is non-volatile and can store firmware.",
        "id": "12-memory-3",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "What is meant by volatile memory?",
        "answer": "It needs power to retain data",
        "options": [
          "It needs power to retain data",
          "It cannot be read",
          "It always stores files permanently",
          "It uses a laser"
        ],
        "explanation": "Ordinary volatile memory loses contents without power.",
        "id": "12-memory-4",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "Which memory is normally read and written while applications run?",
        "answer": "RAM",
        "options": [
          "RAM",
          "ROM",
          "DVD",
          "Blu-ray"
        ],
        "explanation": "RAM is read/write working memory.",
        "id": "12-memory-5",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "Which is typically non-volatile?",
        "answer": "ROM",
        "options": [
          "ROM",
          "RAM",
          "CPU cache",
          "Working memory"
        ],
        "explanation": "Non-volatile memory retains data when power is removed.",
        "id": "12-memory-6",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "Where is the current working data of a running word processor primarily held?",
        "answer": "RAM",
        "options": [
          "RAM",
          "ROM",
          "Optical disc",
          "Printer cartridge"
        ],
        "explanation": "Running programs use RAM to access working data.",
        "id": "12-memory-7",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "Why does the CPU need primary memory?",
        "answer": "To access instructions and data quickly",
        "options": [
          "To access instructions and data quickly",
          "To replace the monitor",
          "To store only deleted files",
          "To send Wi-Fi signals"
        ],
        "explanation": "Primary memory gives rapid access to data being processed.",
        "id": "12-memory-8",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "Why can unsaved work be lost when power fails?",
        "answer": "Working data in RAM is volatile",
        "options": [
          "Working data in RAM is volatile",
          "ROM is erased",
          "The CPU destroys the SSD",
          "The keyboard has no ROM"
        ],
        "explanation": "Unsaved working data may not yet be copied to non-volatile storage.",
        "id": "12-memory-9",
        "skill": "RAM and ROM"
      },
      {
        "prompt": "What is a key distinction between ROM and ordinary RAM?",
        "answer": "ROM retains contents without power",
        "options": [
          "ROM retains contents without power",
          "RAM permanently stores the boot firmware",
          "ROM can never hold any instructions",
          "RAM cannot be written to"
        ],
        "explanation": "ROM is used for retained instructions, while RAM is volatile working memory.",
        "id": "12-memory-10",
        "skill": "RAM and ROM"
      }
    ]
  },
  {
    "id": "12-virtual",
    "section": "1.2",
    "spec": "1.2.1",
    "title": "Virtual memory",
    "questions": [
      {
        "prompt": "Why might an operating system use virtual memory?",
        "answer": "There is insufficient available RAM",
        "options": [
          "There is insufficient available RAM",
          "The screen is too bright",
          "The printer needs ink",
          "An HDMI cable is missing"
        ],
        "explanation": "Virtual memory helps manage RAM pressure.",
        "id": "12-virtual-1",
        "skill": "Virtual memory"
      },
      {
        "prompt": "Where can displaced memory pages be placed?",
        "answer": "Secondary storage",
        "options": [
          "Secondary storage",
          "Only in CPU registers",
          "On the keyboard",
          "Inside the monitor"
        ],
        "explanation": "Paging can use disk or SSD space as backing store.",
        "id": "12-virtual-2",
        "skill": "Virtual memory"
      },
      {
        "prompt": "Why is heavy use of virtual memory often slow?",
        "answer": "Secondary storage access is slower than RAM",
        "options": [
          "Secondary storage access is slower than RAM",
          "It reduces screen colour depth",
          "It changes every instruction into HTML",
          "It eliminates the control unit"
        ],
        "explanation": "Repeated storage access is typically slower than RAM access.",
        "id": "12-virtual-3",
        "skill": "Virtual memory"
      },
      {
        "prompt": "Does virtual memory add physical RAM chips?",
        "answer": "No",
        "options": [
          "No",
          "Yes, automatically",
          "Yes, through the GPU",
          "Yes, using ROM"
        ],
        "explanation": "Virtual memory uses storage and address management, not additional RAM modules.",
        "id": "12-virtual-4",
        "skill": "Virtual memory"
      },
      {
        "prompt": "What is paging?",
        "answer": "Moving memory pages between RAM and secondary storage",
        "options": [
          "Moving memory pages between RAM and secondary storage",
          "Dividing the monitor into windows",
          "Deleting all temporary files",
          "Converting text to images"
        ],
        "explanation": "Paging allows the OS to choose which pages remain in RAM.",
        "id": "12-virtual-5",
        "skill": "Virtual memory"
      },
      {
        "prompt": "What may happen if many applications cause constant paging?",
        "answer": "System responsiveness can worsen",
        "options": [
          "System responsiveness can worsen",
          "Processor core count doubles",
          "All files become lossless",
          "The cache becomes non-volatile"
        ],
        "explanation": "Frequent page transfers can bottleneck performance.",
        "id": "12-virtual-6",
        "skill": "Virtual memory"
      },
      {
        "prompt": "What is the main benefit of virtual memory?",
        "answer": "It lets programs continue when RAM is under pressure",
        "options": [
          "It lets programs continue when RAM is under pressure",
          "It guarantees faster operation than RAM",
          "It backs up every file permanently",
          "It disables secondary storage"
        ],
        "explanation": "It extends usable working space at a performance cost.",
        "id": "12-virtual-7",
        "skill": "Virtual memory"
      },
      {
        "prompt": "Which medium might a laptop use for virtual-memory backing?",
        "answer": "SSD",
        "options": [
          "SSD",
          "Monitor",
          "Mouse",
          "HDMI cable"
        ],
        "explanation": "An SSD provides non-volatile storage that can back virtual memory.",
        "id": "12-virtual-8",
        "skill": "Virtual memory"
      },
      {
        "prompt": "How is CPU cache different from virtual memory?",
        "answer": "Cache speeds access; virtual memory helps manage insufficient RAM",
        "options": [
          "Cache speeds access; virtual memory helps manage insufficient RAM",
          "They have identical purposes",
          "Both are optical discs",
          "Cache adds hard-drive capacity"
        ],
        "explanation": "Cache stores frequently needed data close to the CPU; virtual memory uses slower backing storage.",
        "id": "12-virtual-9",
        "skill": "Virtual memory"
      },
      {
        "prompt": "RAM is full and the storage drive is busy as you switch between apps. Why?",
        "answer": "The system may be paging data",
        "options": [
          "The system may be paging data",
          "ROM is downloading more cores",
          "The screen has lost pixels",
          "The keyboard is being sorted"
        ],
        "explanation": "Swapping memory pages can cause storage activity.",
        "id": "12-virtual-10",
        "skill": "Virtual memory"
      }
    ]
  },
  {
    "id": "12-secondary",
    "section": "1.2",
    "spec": "1.2.2",
    "title": "Secondary storage and choice",
    "questions": [
      {
        "prompt": "Why is secondary storage needed?",
        "answer": "To retain files without power",
        "options": [
          "To retain files without power",
          "To replace every CPU register",
          "To process every instruction",
          "To power the monitor"
        ],
        "explanation": "Secondary storage is non-volatile.",
        "id": "12-secondary-1",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "Which uses magnetic platters?",
        "answer": "Hard disk drive",
        "options": [
          "Hard disk drive",
          "SSD",
          "DVD",
          "RAM"
        ],
        "explanation": "HDDs store data on spinning magnetic platters.",
        "id": "12-secondary-2",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "Which uses flash memory with no moving parts?",
        "answer": "SSD",
        "options": [
          "SSD",
          "Hard disk drive",
          "Magnetic tape",
          "Blu-ray disc"
        ],
        "explanation": "Solid-state drives use electronic flash storage.",
        "id": "12-secondary-3",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "Which is optical storage?",
        "answer": "DVD",
        "options": [
          "DVD",
          "SSD",
          "HDD",
          "RAM"
        ],
        "explanation": "Optical discs are read with lasers.",
        "id": "12-secondary-4",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "Which option often provides large capacity at relatively low cost per GB?",
        "answer": "Magnetic hard disk",
        "options": [
          "Magnetic hard disk",
          "CPU register",
          "Cache memory",
          "ROM chip"
        ],
        "explanation": "Magnetic drives are often cost-effective for bulk storage.",
        "id": "12-secondary-5",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "Which is a common SSD advantage for portable use?",
        "answer": "Better resistance to shocks because it has no moving parts",
        "options": [
          "Better resistance to shocks because it has no moving parts",
          "It needs a spinning platter",
          "It loses all files when unplugged",
          "It can only store images"
        ],
        "explanation": "No moving mechanical parts reduces vulnerability to physical knocks.",
        "id": "12-secondary-6",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "What does storage capacity mean?",
        "answer": "The maximum amount of data the device can hold",
        "options": [
          "The maximum amount of data the device can hold",
          "Its number of CPU cores",
          "The monitor refresh rate",
          "Its screen resolution"
        ],
        "explanation": "Capacity measures the amount of storable data.",
        "id": "12-secondary-7",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "A user wants faster game loading. Which storage choice is often better?",
        "answer": "SSD",
        "options": [
          "SSD",
          "Slow optical disc",
          "A paper notebook",
          "ROM-only storage"
        ],
        "explanation": "Fast SSD access can shorten loading times.",
        "id": "12-secondary-8",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "Why might removable USB storage be useful?",
        "answer": "It is portable for transferring files",
        "options": [
          "It is portable for transferring files",
          "It increases CPU clock speed",
          "It is always volatile",
          "It eliminates malware"
        ],
        "explanation": "Small removable devices are easy to transport.",
        "id": "12-secondary-9",
        "skill": "Secondary storage and choice"
      },
      {
        "prompt": "Which characteristics should influence the choice of storage?",
        "answer": "Capacity, speed, durability, reliability, portability and cost",
        "options": [
          "Capacity, speed, durability, reliability, portability and cost",
          "Only wallpaper",
          "Only CPU cache size",
          "Only keyboard layout"
        ],
        "explanation": "The right medium depends on user requirements.",
        "id": "12-secondary-10",
        "skill": "Secondary storage and choice"
      }
    ]
  },
  {
    "id": "12-units",
    "section": "1.2",
    "spec": "1.2.3",
    "title": "Bits, bytes and storage units",
    "questions": [
      {
        "prompt": "How many bits are in one byte?",
        "answer": "8",
        "options": [
          "8",
          "2",
          "4",
          "16"
        ],
        "explanation": "A byte contains eight bits.",
        "id": "12-units-1",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "How many bits are in one nibble?",
        "answer": "4",
        "options": [
          "4",
          "2",
          "8",
          "16"
        ],
        "explanation": "A nibble contains four bits.",
        "id": "12-units-2",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "How many bytes make 40 bits?",
        "answer": "5",
        "options": [
          "5",
          "8",
          "20",
          "320"
        ],
        "explanation": "40 ÷ 8 = 5 bytes.",
        "id": "12-units-3",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "How many bits are in 9 bytes?",
        "answer": "72",
        "options": [
          "72",
          "9",
          "17",
          "90"
        ],
        "explanation": "9 × 8 = 72 bits.",
        "id": "12-units-4",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "What is one binary digit called?",
        "answer": "Bit",
        "options": [
          "Bit",
          "Byte",
          "Word",
          "Nibble"
        ],
        "explanation": "A bit stores 0 or 1.",
        "id": "12-units-5",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "Which capacity is the greatest?",
        "answer": "1 GB",
        "options": [
          "1 GB",
          "1 MB",
          "1 KB",
          "1 byte"
        ],
        "explanation": "1 GB is greater than 1 MB, KB or byte.",
        "id": "12-units-6",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "A drive holds 1,000 MB and uses 250 MB. What free space remains?",
        "answer": "750 MB",
        "options": [
          "750 MB",
          "250 MB",
          "1,250 MB",
          "4 MB"
        ],
        "explanation": "Capacity minus used space = 750 MB.",
        "id": "12-units-7",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "What is storage capacity?",
        "answer": "The maximum quantity of data that can be stored",
        "options": [
          "The maximum quantity of data that can be stored",
          "A drive's current unused area",
          "A CPU's clock frequency",
          "A network's bandwidth"
        ],
        "explanation": "Capacity is the maximum, unlike changeable free space.",
        "id": "12-units-8",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "Using 1 MB = 1,000 KB, convert 2 MB to KB.",
        "answer": "2,000 KB",
        "options": [
          "2,000 KB",
          "200 KB",
          "20,000 KB",
          "2 KB"
        ],
        "explanation": "2 × 1,000 = 2,000 KB.",
        "id": "12-units-9",
        "skill": "Bits, bytes and storage units"
      },
      {
        "prompt": "Using 1 KB = 1,000 bytes, convert 3 KB into bytes.",
        "answer": "3,000 bytes",
        "options": [
          "3,000 bytes",
          "300 bytes",
          "24 bytes",
          "3 bytes"
        ],
        "explanation": "3 × 1,000 = 3,000 bytes.",
        "id": "12-units-10",
        "skill": "Bits, bytes and storage units"
      }
    ]
  },
  {
    "id": "12-binary",
    "section": "1.2",
    "spec": "1.2.4",
    "title": "8-bit binary and denary",
    "questions": [
      {
        "prompt": "Convert the denary value 5 to 8-bit unsigned binary.",
        "answer": "00000101",
        "options": [
          "00000101",
          "00000110",
          "00001101",
          "00000100"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 00000101 = 5.",
        "id": "12-binary-1",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 13 to 8-bit unsigned binary.",
        "answer": "00001101",
        "options": [
          "00001101",
          "00001110",
          "00000101",
          "00001100"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 00001101 = 13.",
        "id": "12-binary-2",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 27 to 8-bit unsigned binary.",
        "answer": "00011011",
        "options": [
          "00011011",
          "00011100",
          "00010011",
          "00011010"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 00011011 = 27.",
        "id": "12-binary-3",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 42 to 8-bit unsigned binary.",
        "answer": "00101010",
        "options": [
          "00101010",
          "00101011",
          "00100010",
          "00101100"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 00101010 = 42.",
        "id": "12-binary-4",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 64 to 8-bit unsigned binary.",
        "answer": "01000000",
        "options": [
          "01000000",
          "01000001",
          "01001000",
          "01000010"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 01000000 = 64.",
        "id": "12-binary-5",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 100 to 8-bit unsigned binary.",
        "answer": "01100100",
        "options": [
          "01100100",
          "01100101",
          "01101100",
          "01100110"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 01100100 = 100.",
        "id": "12-binary-6",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 128 to 8-bit unsigned binary.",
        "answer": "10000000",
        "options": [
          "10000000",
          "10000001",
          "10001000",
          "10000010"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 10000000 = 128.",
        "id": "12-binary-7",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 154 to 8-bit unsigned binary.",
        "answer": "10011010",
        "options": [
          "10011010",
          "10011011",
          "10010010",
          "10011100"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 10011010 = 154.",
        "id": "12-binary-8",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 173 to 8-bit unsigned binary.",
        "answer": "10101101",
        "options": [
          "10101101",
          "10101110",
          "10100101",
          "10101100"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 10101101 = 173.",
        "id": "12-binary-9",
        "skill": "8-bit binary and denary"
      },
      {
        "prompt": "Convert the denary value 255 to 8-bit unsigned binary.",
        "answer": "11111111",
        "options": [
          "11111111",
          "00000000",
          "11110111",
          "11111110"
        ],
        "explanation": "Using the 8-bit place values 128 to 1 gives 11111111 = 255.",
        "id": "12-binary-10",
        "skill": "8-bit binary and denary"
      }
    ]
  },
  {
    "id": "12-addition",
    "section": "1.2",
    "spec": "1.2.4",
    "title": "8-bit binary addition",
    "questions": [
      {
        "prompt": "Calculate 00000011 + 00000101 as 8-bit unsigned binary.",
        "answer": "00001000",
        "options": [
          "00001000",
          "00001010",
          "00000111",
          "00001001"
        ],
        "explanation": "3 + 5 = 8 denary. The 8-bit sum is 00001000.",
        "id": "12-addition-1",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 00001100 + 00001001 as 8-bit unsigned binary.",
        "answer": "00010101",
        "options": [
          "00010101",
          "00010111",
          "00010100",
          "00010110"
        ],
        "explanation": "12 + 9 = 21 denary. The 8-bit sum is 00010101.",
        "id": "12-addition-2",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 00010111 + 00001110 as 8-bit unsigned binary.",
        "answer": "00100101",
        "options": [
          "00100101",
          "00100111",
          "00100100",
          "00100110"
        ],
        "explanation": "23 + 14 = 37 denary. The 8-bit sum is 00100101.",
        "id": "12-addition-3",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 00101000 + 00001011 as 8-bit unsigned binary.",
        "answer": "00110011",
        "options": [
          "00110011",
          "00110001",
          "00110010",
          "00110100"
        ],
        "explanation": "40 + 11 = 51 denary. The 8-bit sum is 00110011.",
        "id": "12-addition-4",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 01000000 + 00100000 as 8-bit unsigned binary.",
        "answer": "01100000",
        "options": [
          "01100000",
          "01100010",
          "01011111",
          "01100001"
        ],
        "explanation": "64 + 32 = 96 denary. The 8-bit sum is 01100000.",
        "id": "12-addition-5",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 01001000 + 00100001 as 8-bit unsigned binary.",
        "answer": "01101001",
        "options": [
          "01101001",
          "01101011",
          "01101000",
          "01101010"
        ],
        "explanation": "72 + 33 = 105 denary. The 8-bit sum is 01101001.",
        "id": "12-addition-6",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 01010101 + 00010100 as 8-bit unsigned binary.",
        "answer": "01101001",
        "options": [
          "01101001",
          "01101011",
          "01101000",
          "01101010"
        ],
        "explanation": "85 + 20 = 105 denary. The 8-bit sum is 01101001.",
        "id": "12-addition-7",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 00010001 + 00010010 as 8-bit unsigned binary.",
        "answer": "00100011",
        "options": [
          "00100011",
          "00100001",
          "00100010",
          "00100100"
        ],
        "explanation": "17 + 18 = 35 denary. The 8-bit sum is 00100011.",
        "id": "12-addition-8",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 01100100 + 00011001 as 8-bit unsigned binary.",
        "answer": "01111101",
        "options": [
          "01111101",
          "01111111",
          "01111100",
          "01111110"
        ],
        "explanation": "100 + 25 = 125 denary. The 8-bit sum is 01111101.",
        "id": "12-addition-9",
        "skill": "8-bit binary addition"
      },
      {
        "prompt": "Calculate 00110111 + 00101000 as 8-bit unsigned binary.",
        "answer": "01011111",
        "options": [
          "01011111",
          "01011101",
          "01011110",
          "01100000"
        ],
        "explanation": "55 + 40 = 95 denary. The 8-bit sum is 01011111.",
        "id": "12-addition-10",
        "skill": "8-bit binary addition"
      }
    ]
  },
  {
    "id": "12-shifts",
    "section": "1.2",
    "spec": "1.2.4",
    "title": "Logical binary shifts",
    "questions": [
      {
        "prompt": "Apply a 1-place logical left shift to the unsigned 8-bit pattern 00000101. What is the result?",
        "answer": "00001010",
        "options": [
          "00001010",
          "00001011",
          "00000101",
          "00001100"
        ],
        "explanation": "Shift the bits left 1 position(s), inserting 0s. The result is 00001010 (10 denary).",
        "id": "12-shifts-1",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 1-place logical left shift to the unsigned 8-bit pattern 00001100. What is the result?",
        "answer": "00011000",
        "options": [
          "00011000",
          "00011001",
          "00001100",
          "00011010"
        ],
        "explanation": "Shift the bits left 1 position(s), inserting 0s. The result is 00011000 (24 denary).",
        "id": "12-shifts-2",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 2-place logical left shift to the unsigned 8-bit pattern 00001001. What is the result?",
        "answer": "00100100",
        "options": [
          "00100100",
          "00100101",
          "00001001",
          "00100110"
        ],
        "explanation": "Shift the bits left 2 position(s), inserting 0s. The result is 00100100 (36 denary).",
        "id": "12-shifts-3",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 1-place logical left shift to the unsigned 8-bit pattern 00010010. What is the result?",
        "answer": "00100100",
        "options": [
          "00100100",
          "00100101",
          "00010010",
          "00100110"
        ],
        "explanation": "Shift the bits left 1 position(s), inserting 0s. The result is 00100100 (36 denary).",
        "id": "12-shifts-4",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 1-place logical right shift to the unsigned 8-bit pattern 00101000. What is the result?",
        "answer": "00010100",
        "options": [
          "00010100",
          "00010101",
          "00101000",
          "00010110"
        ],
        "explanation": "Shift the bits right 1 position(s), inserting 0s. The result is 00010100 (20 denary).",
        "id": "12-shifts-5",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 2-place logical right shift to the unsigned 8-bit pattern 00100100. What is the result?",
        "answer": "00001001",
        "options": [
          "00001001",
          "00001000",
          "00100100",
          "00001011"
        ],
        "explanation": "Shift the bits right 2 position(s), inserting 0s. The result is 00001001 (9 denary).",
        "id": "12-shifts-6",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 2-place logical right shift to the unsigned 8-bit pattern 01010000. What is the result?",
        "answer": "00010100",
        "options": [
          "00010100",
          "00010101",
          "01010000",
          "00010110"
        ],
        "explanation": "Shift the bits right 2 position(s), inserting 0s. The result is 00010100 (20 denary).",
        "id": "12-shifts-7",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 3-place logical left shift to the unsigned 8-bit pattern 00000111. What is the result?",
        "answer": "00111000",
        "options": [
          "00111000",
          "00111001",
          "00000111",
          "00111010"
        ],
        "explanation": "Shift the bits left 3 position(s), inserting 0s. The result is 00111000 (56 denary).",
        "id": "12-shifts-8",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 3-place logical right shift to the unsigned 8-bit pattern 01000000. What is the result?",
        "answer": "00001000",
        "options": [
          "00001000",
          "00001001",
          "01000000",
          "00001010"
        ],
        "explanation": "Shift the bits right 3 position(s), inserting 0s. The result is 00001000 (8 denary).",
        "id": "12-shifts-9",
        "skill": "Logical binary shifts"
      },
      {
        "prompt": "Apply a 1-place logical left shift to the unsigned 8-bit pattern 00001111. What is the result?",
        "answer": "00011110",
        "options": [
          "00011110",
          "00011111",
          "00001111",
          "00100000"
        ],
        "explanation": "Shift the bits left 1 position(s), inserting 0s. The result is 00011110 (30 denary).",
        "id": "12-shifts-10",
        "skill": "Logical binary shifts"
      }
    ]
  },
  {
    "id": "12-hex",
    "section": "1.2",
    "spec": "1.2.4",
    "title": "Hexadecimal conversion",
    "questions": [
      {
        "prompt": "Convert 10 denary into two-digit hexadecimal.",
        "answer": "0A",
        "options": [
          "0A",
          "0B",
          "1A",
          "09"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: 0A.",
        "id": "12-hex-1",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 15 denary into two-digit hexadecimal.",
        "answer": "0F",
        "options": [
          "0F",
          "10",
          "1F",
          "0E"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: 0F.",
        "id": "12-hex-2",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 26 denary into two-digit hexadecimal.",
        "answer": "1A",
        "options": [
          "1A",
          "1B",
          "0A",
          "19"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: 1A.",
        "id": "12-hex-3",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 47 denary into two-digit hexadecimal.",
        "answer": "2F",
        "options": [
          "2F",
          "30",
          "3F",
          "2E"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: 2F.",
        "id": "12-hex-4",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 64 denary into two-digit hexadecimal.",
        "answer": "40",
        "options": [
          "40",
          "41",
          "50",
          "3F"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: 40.",
        "id": "12-hex-5",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 127 denary into two-digit hexadecimal.",
        "answer": "7F",
        "options": [
          "7F",
          "80",
          "6F",
          "7E"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: 7F.",
        "id": "12-hex-6",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 160 denary into two-digit hexadecimal.",
        "answer": "A0",
        "options": [
          "A0",
          "A1",
          "B0",
          "9F"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: A0.",
        "id": "12-hex-7",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 172 denary into two-digit hexadecimal.",
        "answer": "AC",
        "options": [
          "AC",
          "AD",
          "BC",
          "AB"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: AC.",
        "id": "12-hex-8",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 223 denary into two-digit hexadecimal.",
        "answer": "DF",
        "options": [
          "DF",
          "E0",
          "CF",
          "DE"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: DF.",
        "id": "12-hex-9",
        "skill": "Hexadecimal conversion"
      },
      {
        "prompt": "Convert 255 denary into two-digit hexadecimal.",
        "answer": "FF",
        "options": [
          "FF",
          "100",
          "EF",
          "FE"
        ],
        "explanation": "Group the equivalent 8-bit binary value into two nibbles, converting each to one hex digit: FF.",
        "id": "12-hex-10",
        "skill": "Hexadecimal conversion"
      }
    ]
  },
  {
    "id": "12-characters",
    "section": "1.2",
    "spec": "1.2.4",
    "title": "Character sets, ASCII and Unicode",
    "questions": [
      {
        "prompt": "What is a character set?",
        "answer": "A mapping from characters to numerical codes",
        "options": [
          "A mapping from characters to numerical codes",
          "A collection of image pixels",
          "A hard-drive partition",
          "A CPU register file"
        ],
        "explanation": "Character sets associate symbols with numeric representations.",
        "id": "12-characters-1",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "Why is Unicode useful?",
        "answer": "It supports many more scripts and characters than basic ASCII",
        "options": [
          "It supports many more scripts and characters than basic ASCII",
          "It supports only English capitals",
          "It stores every symbol using one bit",
          "It can only encode numbers"
        ],
        "explanation": "Unicode is designed for a broad range of languages and symbols.",
        "id": "12-characters-2",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "If each of 12 characters uses 8 bits, how many bytes are needed?",
        "answer": "12",
        "options": [
          "12",
          "8",
          "96",
          "4"
        ],
        "explanation": "12 × 8 = 96 bits, or 12 bytes.",
        "id": "12-characters-3",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "Which statement correctly describes ASCII?",
        "answer": "It defines character codes for a limited repertoire",
        "options": [
          "It defines character codes for a limited repertoire",
          "It is a lossy image format",
          "It is a network topology",
          "It is a CPU manufacturer"
        ],
        "explanation": "ASCII maps common characters to numeric codes.",
        "id": "12-characters-4",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "ASCII uses decimal 65 for A. What is B?",
        "answer": "66",
        "options": [
          "66",
          "64",
          "97",
          "10"
        ],
        "explanation": "Capital letters have consecutive ASCII codes.",
        "id": "12-characters-5",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "How many distinct patterns can be held in 7 bits?",
        "answer": "128",
        "options": [
          "128",
          "7",
          "64",
          "256"
        ],
        "explanation": "2⁷ = 128.",
        "id": "12-characters-6",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "Which can Unicode represent but basic ASCII cannot?",
        "answer": "Characters from many additional writing systems",
        "options": [
          "Characters from many additional writing systems",
          "Digit 0",
          "Space",
          "Capital A"
        ],
        "explanation": "Basic ASCII supports a small set of characters.",
        "id": "12-characters-7",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "50 characters use exactly 16 bits each. How many bytes is this?",
        "answer": "100",
        "options": [
          "100",
          "50",
          "800",
          "16"
        ],
        "explanation": "50 × 16 ÷ 8 = 100 bytes.",
        "id": "12-characters-8",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "Why does text-file size depend on the encoding?",
        "answer": "The number of bytes per character can vary",
        "options": [
          "The number of bytes per character can vary",
          "Every character always takes one byte",
          "The CPU has four cores",
          "Screen brightness determines file size"
        ],
        "explanation": "Byte requirements depend on the encoding and encoded characters.",
        "id": "12-characters-9",
        "skill": "Character sets, ASCII and Unicode"
      },
      {
        "prompt": "What is the binary representation of the ASCII character A (65)?",
        "answer": "01000001",
        "options": [
          "01000001",
          "01000010",
          "01100001",
          "00100001"
        ],
        "explanation": "64 + 1 = 65, so its 8-bit pattern is 01000001.",
        "id": "12-characters-10",
        "skill": "Character sets, ASCII and Unicode"
      }
    ]
  },
  {
    "id": "12-images",
    "section": "1.2",
    "spec": "1.2.4",
    "title": "Bitmap images and file sizes",
    "questions": [
      {
        "prompt": "A bitmap is 8 × 8 pixels with 2-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "16 bytes",
        "options": [
          "16 bytes",
          "128 bytes",
          "32 bytes",
          "24 bytes"
        ],
        "explanation": "8 × 8 × 2 = 128 bits, then divide by 8: 16 bytes.",
        "id": "12-images-1",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 10 × 6 pixels with 4-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "30 bytes",
        "options": [
          "30 bytes",
          "240 bytes",
          "60 bytes",
          "38 bytes"
        ],
        "explanation": "10 × 6 × 4 = 240 bits, then divide by 8: 30 bytes.",
        "id": "12-images-2",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 16 × 16 pixels with 1-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "32 bytes",
        "options": [
          "32 bytes",
          "256 bytes",
          "64 bytes",
          "40 bytes"
        ],
        "explanation": "16 × 16 × 1 = 256 bits, then divide by 8: 32 bytes.",
        "id": "12-images-3",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 20 × 10 pixels with 8-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "200 bytes",
        "options": [
          "200 bytes",
          "1600 bytes",
          "400 bytes",
          "208 bytes"
        ],
        "explanation": "20 × 10 × 8 = 1600 bits, then divide by 8: 200 bytes.",
        "id": "12-images-4",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 12 × 5 pixels with 4-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "30 bytes",
        "options": [
          "30 bytes",
          "240 bytes",
          "60 bytes",
          "38 bytes"
        ],
        "explanation": "12 × 5 × 4 = 240 bits, then divide by 8: 30 bytes.",
        "id": "12-images-5",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 25 × 20 pixels with 8-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "500 bytes",
        "options": [
          "500 bytes",
          "4000 bytes",
          "1000 bytes",
          "508 bytes"
        ],
        "explanation": "25 × 20 × 8 = 4000 bits, then divide by 8: 500 bytes.",
        "id": "12-images-6",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 40 × 30 pixels with 2-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "300 bytes",
        "options": [
          "300 bytes",
          "2400 bytes",
          "600 bytes",
          "308 bytes"
        ],
        "explanation": "40 × 30 × 2 = 2400 bits, then divide by 8: 300 bytes.",
        "id": "12-images-7",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 100 × 20 pixels with 8-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "2000 bytes",
        "options": [
          "2000 bytes",
          "16000 bytes",
          "4000 bytes",
          "2008 bytes"
        ],
        "explanation": "100 × 20 × 8 = 16000 bits, then divide by 8: 2000 bytes.",
        "id": "12-images-8",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 32 × 32 pixels with 4-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "512 bytes",
        "options": [
          "512 bytes",
          "4096 bytes",
          "1024 bytes",
          "520 bytes"
        ],
        "explanation": "32 × 32 × 4 = 4096 bits, then divide by 8: 512 bytes.",
        "id": "12-images-9",
        "skill": "Bitmap images and file sizes"
      },
      {
        "prompt": "A bitmap is 128 × 64 pixels with 1-bit colour depth. Ignoring metadata and compression, what is its raw pixel-data size?",
        "answer": "1024 bytes",
        "options": [
          "1024 bytes",
          "8192 bytes",
          "2048 bytes",
          "1032 bytes"
        ],
        "explanation": "128 × 64 × 1 = 8192 bits, then divide by 8: 1024 bytes.",
        "id": "12-images-10",
        "skill": "Bitmap images and file sizes"
      }
    ]
  },
  {
    "id": "12-sound",
    "section": "1.2",
    "spec": "1.2.4",
    "title": "Sound sampling and file sizes",
    "questions": [
      {
        "prompt": "A mono audio recording is sampled at 10 Hz for 5 seconds with 8 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "50 bytes",
        "options": [
          "50 bytes",
          "400 bytes",
          "100 bytes",
          "25 bytes"
        ],
        "explanation": "10 × 5 × 8 = 400 bits. Divide by 8 to obtain 50 bytes.",
        "id": "12-sound-1",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 20 Hz for 10 seconds with 8 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "200 bytes",
        "options": [
          "200 bytes",
          "1600 bytes",
          "400 bytes",
          "100 bytes"
        ],
        "explanation": "20 × 10 × 8 = 1600 bits. Divide by 8 to obtain 200 bytes.",
        "id": "12-sound-2",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 100 Hz for 4 seconds with 16 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "800 bytes",
        "options": [
          "800 bytes",
          "6400 bytes",
          "1600 bytes",
          "400 bytes"
        ],
        "explanation": "100 × 4 × 16 = 6400 bits. Divide by 8 to obtain 800 bytes.",
        "id": "12-sound-3",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 50 Hz for 8 seconds with 8 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "400 bytes",
        "options": [
          "400 bytes",
          "3200 bytes",
          "800 bytes",
          "200 bytes"
        ],
        "explanation": "50 × 8 × 8 = 3200 bits. Divide by 8 to obtain 400 bytes.",
        "id": "12-sound-4",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 200 Hz for 2 seconds with 16 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "800 bytes",
        "options": [
          "800 bytes",
          "6400 bytes",
          "1600 bytes",
          "400 bytes"
        ],
        "explanation": "200 × 2 × 16 = 6400 bits. Divide by 8 to obtain 800 bytes.",
        "id": "12-sound-5",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 1000 Hz for 3 seconds with 8 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "3000 bytes",
        "options": [
          "3000 bytes",
          "24000 bytes",
          "6000 bytes",
          "1500 bytes"
        ],
        "explanation": "1000 × 3 × 8 = 24000 bits. Divide by 8 to obtain 3000 bytes.",
        "id": "12-sound-6",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 500 Hz for 8 seconds with 16 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "8000 bytes",
        "options": [
          "8000 bytes",
          "64000 bytes",
          "16000 bytes",
          "4000 bytes"
        ],
        "explanation": "500 × 8 × 16 = 64000 bits. Divide by 8 to obtain 8000 bytes.",
        "id": "12-sound-7",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 800 Hz for 5 seconds with 8 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "4000 bytes",
        "options": [
          "4000 bytes",
          "32000 bytes",
          "8000 bytes",
          "2000 bytes"
        ],
        "explanation": "800 × 5 × 8 = 32000 bits. Divide by 8 to obtain 4000 bytes.",
        "id": "12-sound-8",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 400 Hz for 10 seconds with 8 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "4000 bytes",
        "options": [
          "4000 bytes",
          "32000 bytes",
          "8000 bytes",
          "2000 bytes"
        ],
        "explanation": "400 × 10 × 8 = 32000 bits. Divide by 8 to obtain 4000 bytes.",
        "id": "12-sound-9",
        "skill": "Sound sampling and file sizes"
      },
      {
        "prompt": "A mono audio recording is sampled at 2000 Hz for 2 seconds with 8 bits per sample. What is the raw data size, ignoring headers?",
        "answer": "4000 bytes",
        "options": [
          "4000 bytes",
          "32000 bytes",
          "8000 bytes",
          "2000 bytes"
        ],
        "explanation": "2000 × 2 × 8 = 32000 bits. Divide by 8 to obtain 4000 bytes.",
        "id": "12-sound-10",
        "skill": "Sound sampling and file sizes"
      }
    ]
  },
  {
    "id": "12-compression",
    "section": "1.2",
    "spec": "1.2.5",
    "title": "Lossy and lossless compression",
    "questions": [
      {
        "prompt": "What is file compression used for?",
        "answer": "Reducing how much storage a file needs",
        "options": [
          "Reducing how much storage a file needs",
          "Increasing file size",
          "Adding CPU cores",
          "Changing a screen's resolution"
        ],
        "explanation": "Compression reduces file size and may speed transfers.",
        "id": "12-compression-1",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "Which type allows exact reconstruction?",
        "answer": "Lossless",
        "options": [
          "Lossless",
          "Lossy",
          "Analogue",
          "Optical-only"
        ],
        "explanation": "Lossless methods preserve all data needed to reconstruct the original.",
        "id": "12-compression-2",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "What happens with lossy compression?",
        "answer": "Some original data is permanently discarded",
        "options": [
          "Some original data is permanently discarded",
          "Every original bit is retained",
          "File size always increases",
          "No quality can ever change"
        ],
        "explanation": "Lossy compression sacrifices some data to reduce size.",
        "id": "12-compression-3",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "Which is most appropriate for source code?",
        "answer": "Lossless",
        "options": [
          "Lossless",
          "Lossy",
          "Analogue encoding",
          "Screen capture"
        ],
        "explanation": "Code must be restored exactly.",
        "id": "12-compression-4",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "Why might a photo use lossy compression?",
        "answer": "A small reduction in quality may be acceptable for a smaller file",
        "options": [
          "A small reduction in quality may be acceptable for a smaller file",
          "Photos cannot be compressed losslessly",
          "Colour depth always increases",
          "The photo becomes a program"
        ],
        "explanation": "Visual detail may be sacrificed to save storage.",
        "id": "12-compression-5",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "What is a benefit of compression when uploading?",
        "answer": "Fewer bytes need transferring",
        "options": [
          "Fewer bytes need transferring",
          "Every network becomes wireless",
          "The server needs no storage",
          "A CPU never uses RAM"
        ],
        "explanation": "Smaller files use less data and can transfer faster.",
        "id": "12-compression-6",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "Which file most strongly requires lossless compression?",
        "answer": "A program's source file",
        "options": [
          "A program's source file",
          "An online video preview",
          "A streaming music sample",
          "A photograph thumbnail"
        ],
        "explanation": "Deleting bytes of code could change its meaning.",
        "id": "12-compression-7",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "A file changes from 900 KB to 600 KB. How much is saved?",
        "answer": "300 KB",
        "options": [
          "300 KB",
          "600 KB",
          "1,500 KB",
          "33 KB"
        ],
        "explanation": "900 − 600 = 300 KB.",
        "id": "12-compression-8",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "A 1,000 KB file compresses to 700 KB. What percentage is saved?",
        "answer": "30%",
        "options": [
          "30%",
          "70%",
          "300%",
          "3%"
        ],
        "explanation": "300 ÷ 1000 × 100 = 30%.",
        "id": "12-compression-9",
        "skill": "Lossy and lossless compression"
      },
      {
        "prompt": "What is the main disadvantage of lossy compression?",
        "answer": "The original data cannot be restored exactly",
        "options": [
          "The original data cannot be restored exactly",
          "It cannot be used for images",
          "It always makes the file bigger",
          "It never speeds up downloads"
        ],
        "explanation": "Removed detail is permanently lost.",
        "id": "12-compression-10",
        "skill": "Lossy and lossless compression"
      }
    ]
  }
];
