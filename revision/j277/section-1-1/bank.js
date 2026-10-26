'use strict';
// Original J277 MCQ bank built from the AP1-aligned Paper 1 guide; spec 1.1.1–1.1.3.
const J277_SECTION={"code":"1.1","title":"Systems Architecture","guidePublished":false,"guideFile":"J277_Paper_1_Revision_Guide_AP1_Aligned.pdf","lessons":{"10":"CPU architecture and registers","11":"CPU performance","20":"Embedded systems","126":"CPU architecture revision","127":"Performance and embedded systems"}};
const SKILLS=[
  {
    "id": "11-cpu",
    "section": "1.1",
    "spec": "1.1.1",
    "title": "CPU components and registers",
    "lessons": [
      10,
      126
    ],
    "page": 6,
    "questions": [
      {
        "id": "11-cpu-1",
        "prompt": "Which part of the CPU performs arithmetic and logical operations?",
        "answer": "ALU",
        "options": [
          "ALU",
          "Control unit",
          "Program counter",
          "Cache"
        ],
        "explanation": "The arithmetic logic unit performs calculations and logic comparisons.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-2",
        "prompt": "What is the main job of the control unit?",
        "answer": "Coordinate CPU operations and decode instructions",
        "options": [
          "Coordinate CPU operations and decode instructions",
          "Store every file permanently",
          "Perform all arithmetic itself",
          "Display results on a monitor"
        ],
        "explanation": "The control unit decodes instructions and sends control signals to coordinate components.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-3",
        "prompt": "Which register holds the address of the next instruction to fetch?",
        "answer": "Program counter (PC)",
        "options": [
          "Program counter (PC)",
          "Memory data register (MDR)",
          "Accumulator (ACC)",
          "Memory address register (MAR)"
        ],
        "explanation": "The program counter stores the address of the next instruction. A branch may change its value.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-4",
        "prompt": "What does the memory address register (MAR) hold?",
        "answer": "The address of the memory location being accessed",
        "options": [
          "The address of the memory location being accessed",
          "The result of a calculation",
          "The contents being transferred from memory",
          "The number of CPU cores"
        ],
        "explanation": "MAR holds an address, not the data at that address.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-5",
        "prompt": "What does the memory data register (MDR) hold?",
        "answer": "Data or an instruction being transferred to or from memory",
        "options": [
          "Data or an instruction being transferred to or from memory",
          "The address of the next instruction",
          "The CPU clock frequency",
          "The current screen resolution"
        ],
        "explanation": "MDR holds the value being transferred; MAR holds where to access it.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-6",
        "prompt": "What is stored in the accumulator (ACC)?",
        "answer": "Intermediate results of calculations",
        "options": [
          "Intermediate results of calculations",
          "The location of the next instruction",
          "Files saved on the SSD",
          "The CPU clock speed"
        ],
        "explanation": "The accumulator stores data and arithmetic results used by the CPU.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-7",
        "prompt": "What is the correct order of the fetch–decode–execute cycle?",
        "answer": "Fetch, decode, execute",
        "options": [
          "Fetch, decode, execute",
          "Decode, execute, fetch",
          "Execute, fetch, decode",
          "Fetch, execute, decode"
        ],
        "explanation": "The CPU fetches an instruction, the control unit decodes it, and the CPU executes it.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-8",
        "prompt": "A CPU retrieves an instruction from main memory. Which stage is this?",
        "answer": "Fetch",
        "options": [
          "Fetch",
          "Decode",
          "Execute",
          "Store"
        ],
        "explanation": "Fetch obtains the next instruction from main memory.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-9",
        "prompt": "Which statement correctly distinguishes MAR and MDR?",
        "answer": "MAR stores an address; MDR stores a value",
        "options": [
          "MAR stores an address; MDR stores a value",
          "MAR stores a value; MDR stores an address",
          "Both store addresses only",
          "Both store calculation results only"
        ],
        "explanation": "A memory address identifies a location; memory data is what is read or written there.",
        "skill": "CPU components and registers"
      },
      {
        "id": "11-cpu-10",
        "prompt": "When does the control unit interpret what an instruction means?",
        "answer": "During decode",
        "options": [
          "During decode",
          "During fetch only",
          "Only after the whole program ends",
          "Only when saving files"
        ],
        "explanation": "The control unit decodes an instruction before coordinating its execution.",
        "skill": "CPU components and registers"
      }
    ]
  },
  {
    "id": "11-performance",
    "section": "1.1",
    "spec": "1.1.2",
    "title": "CPU performance factors",
    "lessons": [
      11,
      127
    ],
    "page": 11,
    "questions": [
      {
        "id": "11-performance-1",
        "prompt": "What does a CPU's clock speed describe?",
        "answer": "The number of clock cycles per second",
        "options": [
          "The number of clock cycles per second",
          "The number of files on the disk",
          "The size of a monitor",
          "The amount of printer memory"
        ],
        "explanation": "Clock speed is measured in hertz; GHz means billions of cycles each second.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-2",
        "prompt": "What is the most accurate reason a larger CPU cache may improve performance?",
        "answer": "Frequently needed data can be accessed more quickly",
        "options": [
          "Frequently needed data can be accessed more quickly",
          "It permanently stores more photographs",
          "It increases internet bandwidth",
          "It replaces all secondary storage"
        ],
        "explanation": "Cache is fast memory close to the CPU, reducing slower main-memory accesses.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-3",
        "prompt": "What is a CPU core?",
        "answer": "An independent processing unit within a CPU",
        "options": [
          "An independent processing unit within a CPU",
          "A storage sector on an SSD",
          "A network adapter",
          "A graphics connector"
        ],
        "explanation": "Multiple cores can execute different work at the same time when software supports it.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-4",
        "prompt": "Which unit is commonly used to express CPU clock speed?",
        "answer": "GHz",
        "options": [
          "GHz",
          "GB",
          "Gb/s",
          "Pixels"
        ],
        "explanation": "GHz measures frequency; GB measures data capacity.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-5",
        "prompt": "A program can divide work into independent tasks. Which change may help?",
        "answer": "More CPU cores",
        "options": [
          "More CPU cores",
          "A larger monitor",
          "A slower disk",
          "Fewer RAM slots"
        ],
        "explanation": "Independent tasks may be processed simultaneously on separate cores.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-6",
        "prompt": "Why does increasing the number of cores not always double performance?",
        "answer": "Some tasks cannot be split across cores",
        "options": [
          "Some tasks cannot be split across cores",
          "Core count has no relationship to processing",
          "Two cores always have different clock speeds",
          "Additional cores reduce RAM capacity"
        ],
        "explanation": "Serial parts of a program and other bottlenecks limit parallel speed-up.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-7",
        "prompt": "What is the likely advantage of a higher clock speed, all else equal?",
        "answer": "More CPU cycles can occur each second",
        "options": [
          "More CPU cycles can occur each second",
          "The CPU gains more physical cores automatically",
          "Secondary storage becomes non-volatile",
          "The processor uses no electricity"
        ],
        "explanation": "A higher frequency allows more cycles per second, although it does not guarantee a proportionate speed-up.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-8",
        "prompt": "Where is CPU cache normally located in relation to the processor?",
        "answer": "On or very close to the CPU",
        "options": [
          "On or very close to the CPU",
          "Only on a remote server",
          "Only inside an optical disk",
          "Only in the keyboard"
        ],
        "explanation": "Cache is close to the CPU to provide fast access.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-9",
        "prompt": "Which combination is most relevant when comparing CPU performance?",
        "answer": "Clock speed, number of cores and cache size",
        "options": [
          "Clock speed, number of cores and cache size",
          "Screen size, wallpaper and case colour",
          "Printer speed, mouse buttons and HDMI ports",
          "File names, icons and application themes"
        ],
        "explanation": "OCR J277 identifies clock speed, cache and core count as key processor-performance factors.",
        "skill": "CPU performance factors"
      },
      {
        "id": "11-performance-10",
        "prompt": "Which statement about cache is correct?",
        "answer": "Cache can reduce the need to fetch frequently used data from RAM",
        "options": [
          "Cache can reduce the need to fetch frequently used data from RAM",
          "Cache always contains all files on the computer",
          "Cache is slower than a hard disk",
          "Cache is a type of removable optical medium"
        ],
        "explanation": "Cache provides a small, fast store for frequently accessed instructions and data.",
        "skill": "CPU performance factors"
      }
    ]
  },
  {
    "id": "11-embedded",
    "section": "1.1",
    "spec": "1.1.3",
    "title": "Embedded systems",
    "lessons": [
      20,
      127
    ],
    "page": 13,
    "questions": [
      {
        "id": "11-embedded-1",
        "prompt": "What best describes an embedded system?",
        "answer": "A computer designed to perform a dedicated function within a larger device",
        "options": [
          "A computer designed to perform a dedicated function within a larger device",
          "A general-purpose laptop running many unrelated applications",
          "Any external USB drive",
          "A network that spans several countries"
        ],
        "explanation": "Embedded systems are built into another device and normally perform a specific role.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-2",
        "prompt": "Which device is most likely to contain an embedded system?",
        "answer": "A washing machine controller",
        "options": [
          "A washing machine controller",
          "A blank sheet of paper",
          "A wooden ruler",
          "An unplugged extension lead"
        ],
        "explanation": "A washing machine controller monitors sensors and controls the wash cycle.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-3",
        "prompt": "Why might an embedded system have limited memory?",
        "answer": "Its dedicated job may need only modest resources",
        "options": [
          "Its dedicated job may need only modest resources",
          "All embedded systems must have zero memory",
          "They cannot execute instructions",
          "They must connect to cloud storage"
        ],
        "explanation": "Dedicated functionality often allows resources to be tailored to the task.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-4",
        "prompt": "Which feature is common in embedded systems?",
        "answer": "A specific, repeated control task",
        "options": [
          "A specific, repeated control task",
          "Users always install arbitrary desktop applications",
          "Unlimited storage and processing power",
          "No input sensors of any kind"
        ],
        "explanation": "Many embedded systems repeatedly read inputs and control outputs.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-5",
        "prompt": "A thermostat measures room temperature and switches heating on. What is its likely input?",
        "answer": "A temperature sensor reading",
        "options": [
          "A temperature sensor reading",
          "A printer cartridge",
          "The screen wallpaper",
          "The keyboard layout"
        ],
        "explanation": "The thermostat uses the sensor's measurement to make a control decision.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-6",
        "prompt": "What is a likely output from an embedded heating controller?",
        "answer": "A signal to turn the heating on or off",
        "options": [
          "A signal to turn the heating on or off",
          "A new CPU register address",
          "A file name chosen by a user",
          "A network's MAC address"
        ],
        "explanation": "An embedded controller often actuates hardware in response to sensor input.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-7",
        "prompt": "Why are power requirements important in a battery-powered embedded device?",
        "answer": "Lower power use can extend battery life",
        "options": [
          "Lower power use can extend battery life",
          "Power use changes the programming language automatically",
          "Batteries eliminate the need for any processor",
          "More power always improves accuracy"
        ],
        "explanation": "Embedded systems may need to operate for long periods on limited energy.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-8",
        "prompt": "What makes a digital camera's image-control circuitry an embedded system?",
        "answer": "It performs specialist functions inside the camera",
        "options": [
          "It performs specialist functions inside the camera",
          "It is always connected to a desktop computer",
          "It runs every kind of office application",
          "It has no memory at all"
        ],
        "explanation": "It is a computing component integrated into a larger product for a particular purpose.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-9",
        "prompt": "How can a traffic-light controller use inputs?",
        "answer": "Read sensors and timers before changing signals",
        "options": [
          "Read sensors and timers before changing signals",
          "Ignore all environmental information",
          "Use a monitor size to decide traffic flow",
          "Store every passing car as a video game"
        ],
        "explanation": "Sensors and timers can control when an embedded system changes outputs.",
        "skill": "Embedded systems"
      },
      {
        "id": "11-embedded-10",
        "prompt": "Which statement is most accurate?",
        "answer": "An embedded system may use a microcontroller and dedicated software",
        "options": [
          "An embedded system may use a microcontroller and dedicated software",
          "An embedded system cannot run software",
          "Every embedded system needs a keyboard and mouse",
          "Embedded systems are always larger than desktop computers"
        ],
        "explanation": "Embedded systems commonly combine small computing hardware with a task-specific program.",
        "skill": "Embedded systems"
      }
    ]
  }
];
