'use strict';
// OCR J277 MCQs. Stable skill IDs link via guides/skill-index.json; no page numbers in question banks.
const J277_SECTION={"code":"1.1","title":"Systems Architecture"};
const SKILLS=[
  {
    "id": "11-components",
    "section": "1.1",
    "spec": "1.1.1",
    "title": "ALU, control unit and cache",
    "questions": [
      {
        "id": "11-components-1",
        "prompt": "What does the ALU do?",
        "answer": "Performs arithmetic and logical operations",
        "options": [
          "Performs arithmetic and logical operations",
          "Stores all files permanently",
          "Controls the display resolution",
          "Holds the next instruction address"
        ],
        "explanation": "The arithmetic logic unit carries out calculations and logical comparisons.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-2",
        "prompt": "What is the purpose of the control unit?",
        "answer": "Coordinates operations and decodes instructions",
        "options": [
          "Coordinates operations and decodes instructions",
          "Permanently stores software",
          "Carries out only arithmetic",
          "Replaces RAM"
        ],
        "explanation": "The CU decodes instructions and coordinates CPU components using control signals.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-3",
        "prompt": "Which CPU component performs a comparison such as whether 7 is greater than 4?",
        "answer": "ALU",
        "options": [
          "ALU",
          "Program counter",
          "Control unit",
          "Optical drive"
        ],
        "explanation": "Logic comparisons are performed by the ALU.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-4",
        "prompt": "Which CPU component coordinates the movement of data and instructions?",
        "answer": "Control unit",
        "options": [
          "Control unit",
          "Hard disk drive",
          "Accumulator only",
          "Output monitor"
        ],
        "explanation": "The control unit directs other parts of the CPU.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-5",
        "prompt": "Why does the CPU use cache?",
        "answer": "To access frequently used data and instructions quickly",
        "options": [
          "To access frequently used data and instructions quickly",
          "To replace every register",
          "To store photographs permanently",
          "To connect to the internet"
        ],
        "explanation": "Cache reduces the need to fetch frequently used data from slower RAM.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-6",
        "prompt": "Which storage inside or near the CPU is very fast but relatively small?",
        "answer": "Cache",
        "options": [
          "Cache",
          "SSD",
          "Optical disc",
          "USB stick"
        ],
        "explanation": "Cache is fast, small-capacity storage used by the CPU.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-7",
        "prompt": "What is the CPU primarily responsible for?",
        "answer": "Fetching, decoding and executing instructions",
        "options": [
          "Fetching, decoding and executing instructions",
          "Printing documents without software",
          "Displaying power to the mains",
          "Storing every file when switched off"
        ],
        "explanation": "A processor runs program instructions through the fetch–decode–execute cycle.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-8",
        "prompt": "Which component is mainly responsible for interpreting an instruction?",
        "answer": "Control unit",
        "options": [
          "Control unit",
          "ALU",
          "Secondary storage",
          "Network adapter"
        ],
        "explanation": "The control unit decodes the instruction and directs its execution.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-9",
        "prompt": "An instruction requires 12 + 9. Which component completes the calculation?",
        "answer": "ALU",
        "options": [
          "ALU",
          "Control unit",
          "Program counter",
          "Network switch"
        ],
        "explanation": "The ALU performs arithmetic.",
        "skill": "ALU, control unit and cache"
      },
      {
        "id": "11-components-10",
        "prompt": "Which pairing is correct?",
        "answer": "ALU: calculation; CU: coordination",
        "options": [
          "ALU: calculation; CU: coordination",
          "ALU: permanent files; CU: disk storage",
          "ALU: email; CU: network cabling",
          "ALU: power supply; CU: screen output"
        ],
        "explanation": "The ALU computes, while the CU orchestrates execution.",
        "skill": "ALU, control unit and cache"
      }
    ]
  },
  {
    "id": "11-registers",
    "section": "1.1",
    "spec": "1.1.1",
    "title": "CPU registers: MAR, MDR, PC and ACC",
    "questions": [
      {
        "id": "11-registers-1",
        "prompt": "Which register holds the address of the next instruction?",
        "answer": "PC",
        "options": [
          "PC",
          "MDR",
          "ACC",
          "MAR"
        ],
        "explanation": "The program counter contains the next instruction address.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-2",
        "prompt": "Which register holds the address of a memory location in use?",
        "answer": "MAR",
        "options": [
          "MAR",
          "ACC",
          "PC",
          "MDR"
        ],
        "explanation": "MAR is the memory address register.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-3",
        "prompt": "Which register holds information transferred to or from memory?",
        "answer": "MDR",
        "options": [
          "MDR",
          "MAR",
          "PC",
          "ACC"
        ],
        "explanation": "MDR contains the data or instruction being moved.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-4",
        "prompt": "What is usually stored in the accumulator?",
        "answer": "Intermediate calculation results",
        "options": [
          "Intermediate calculation results",
          "The address of a file on the internet",
          "The clock frequency",
          "The next instruction address"
        ],
        "explanation": "ACC stores calculation results used by the CPU.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-5",
        "prompt": "Which statement is true?",
        "answer": "MAR holds an address and MDR holds a value",
        "options": [
          "MAR holds an address and MDR holds a value",
          "MDR holds an address and MAR holds a value",
          "PC stores the screen colour",
          "ACC always stores the next instruction"
        ],
        "explanation": "Addresses and data are held in different registers.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-6",
        "prompt": "The processor needs to read address 24. Where is 24 placed?",
        "answer": "MAR",
        "options": [
          "MAR",
          "ACC",
          "MDR",
          "CU"
        ],
        "explanation": "The memory location being accessed is held in MAR.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-7",
        "prompt": "The number 99 is retrieved from RAM. Which register can hold 99 in transit?",
        "answer": "MDR",
        "options": [
          "MDR",
          "MAR",
          "PC",
          "Clock"
        ],
        "explanation": "MDR holds the value being read or written.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-8",
        "prompt": "A jump instruction changes which register to redirect execution?",
        "answer": "PC",
        "options": [
          "PC",
          "MDR",
          "MAR",
          "ACC"
        ],
        "explanation": "Changing the program counter changes which instruction is fetched next.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-9",
        "prompt": "A calculation gives 27. Which register is designed to hold that interim result?",
        "answer": "ACC",
        "options": [
          "ACC",
          "PC",
          "MAR",
          "MDR"
        ],
        "explanation": "Accumulator holds intermediate results.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      },
      {
        "id": "11-registers-10",
        "prompt": "Why are CPU registers useful?",
        "answer": "They provide very fast temporary storage inside the processor",
        "options": [
          "They provide very fast temporary storage inside the processor",
          "They archive files when power is off",
          "They replace an entire operating system",
          "They extend internet bandwidth"
        ],
        "explanation": "Registers provide quick access to instructions, data, addresses and results.",
        "skill": "CPU registers: MAR, MDR, PC and ACC"
      }
    ]
  },
  {
    "id": "11-fde",
    "section": "1.1",
    "spec": "1.1.1",
    "title": "Fetch–decode–execute cycle",
    "questions": [
      {
        "id": "11-fde-1",
        "prompt": "In what order does the CPU handle an instruction?",
        "answer": "Fetch, decode, execute",
        "options": [
          "Fetch, decode, execute",
          "Execute, fetch, decode",
          "Decode, execute, fetch",
          "Fetch, execute, decode"
        ],
        "explanation": "A new instruction is fetched, interpreted, then acted upon.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-2",
        "prompt": "What happens during the fetch stage?",
        "answer": "An instruction is brought from memory",
        "options": [
          "An instruction is brought from memory",
          "The user installs software",
          "The ALU stores files on disk",
          "The monitor displays a webpage"
        ],
        "explanation": "Fetch gets the instruction identified by the PC.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-3",
        "prompt": "What happens during decode?",
        "answer": "The control unit interprets the instruction",
        "options": [
          "The control unit interprets the instruction",
          "The keyboard produces a result",
          "The monitor receives power",
          "The hard drive formats itself"
        ],
        "explanation": "Decode determines the operation required.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-4",
        "prompt": "What happens during execute?",
        "answer": "The CPU carries out the instruction",
        "options": [
          "The CPU carries out the instruction",
          "The computer must shut down",
          "The instruction is only copied",
          "The program counter is always reset to zero"
        ],
        "explanation": "Execute performs the requested operation.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-5",
        "prompt": "Which register normally provides the address of the next instruction to fetch?",
        "answer": "PC",
        "options": [
          "PC",
          "ACC",
          "MDR",
          "Cache"
        ],
        "explanation": "The program counter identifies the next instruction.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-6",
        "prompt": "Where is a memory address placed when the next instruction is fetched?",
        "answer": "MAR",
        "options": [
          "MAR",
          "ACC",
          "Monitor",
          "ALU"
        ],
        "explanation": "MAR holds the memory location being accessed.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-7",
        "prompt": "An instruction has arrived from memory. Which stage identifies what action it specifies?",
        "answer": "Decode",
        "options": [
          "Decode",
          "Fetch",
          "Execute",
          "Storage"
        ],
        "explanation": "Decode determines what the retrieved instruction means.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-8",
        "prompt": "The ALU adds two values as requested by an instruction. Which stage is this?",
        "answer": "Execute",
        "options": [
          "Execute",
          "Fetch",
          "Decode",
          "Input"
        ],
        "explanation": "The calculation is the execution of the decoded instruction.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-9",
        "prompt": "Which statement about the FDE cycle is accurate?",
        "answer": "It repeats as a program runs",
        "options": [
          "It repeats as a program runs",
          "It happens only once when the computer is switched on",
          "It is used only for graphics",
          "It always requires internet access"
        ],
        "explanation": "The processor repeats the cycle to run instructions.",
        "skill": "Fetch–decode–execute cycle"
      },
      {
        "id": "11-fde-10",
        "prompt": "How can a branch affect the next fetch?",
        "answer": "It can change the PC to a different instruction address",
        "options": [
          "It can change the PC to a different instruction address",
          "It permanently increases cache size",
          "It deletes all registers",
          "It turns RAM into secondary storage"
        ],
        "explanation": "Branch instructions change program flow by changing the PC.",
        "skill": "Fetch–decode–execute cycle"
      }
    ]
  },
  {
    "id": "11-performance",
    "section": "1.1",
    "spec": "1.1.2",
    "title": "CPU performance factors",
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
