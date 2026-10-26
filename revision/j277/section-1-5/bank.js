'use strict';
// OCR J277 1.5 Systems Software — user interfaces, system management and utilities.
const J277_SECTION={"code":"1.5","title":"Systems Software"};
const SKILLS=[
  {
    "id": "15-os",
    "section": "1.5",
    "spec": "1.5.1",
    "title": "Operating systems: interfaces, memory and multitasking",
    "questions": [
      {
        "prompt": "What is the main purpose of an operating system?",
        "answer": "Manage hardware and provide services to applications",
        "options": [
          "Manage hardware and provide services to applications",
          "Only print photographs",
          "Replace secondary storage",
          "Create network cables"
        ],
        "explanation": "The OS coordinates the system and offers services to users and software.",
        "id": "15-os-1",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "What does a user interface provide?",
        "answer": "A way for users to interact with a computer",
        "options": [
          "A way for users to interact with a computer",
          "Extra physical CPU cores",
          "A permanent memory chip",
          "A private IP address"
        ],
        "explanation": "The UI lets people issue commands and see results.",
        "id": "15-os-2",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "Which interface uses windows, icons and menus?",
        "answer": "GUI",
        "options": [
          "GUI",
          "CLI only",
          "BIOS register",
          "NIC"
        ],
        "explanation": "A graphical user interface uses visual controls.",
        "id": "15-os-3",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "Which interface uses typed commands?",
        "answer": "CLI",
        "options": [
          "CLI",
          "GUI icon menu",
          "WAP",
          "RAM"
        ],
        "explanation": "Command-line interfaces accept text commands.",
        "id": "15-os-4",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "How does an OS support multitasking?",
        "answer": "Schedules processor time among active processes",
        "options": [
          "Schedules processor time among active processes",
          "Adds a separate CPU to every app",
          "Makes all files read-only",
          "Disables device drivers"
        ],
        "explanation": "Scheduling lets programs share available processing resources.",
        "id": "15-os-5",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "What is memory management?",
        "answer": "Allocating and tracking RAM use by processes",
        "options": [
          "Allocating and tracking RAM use by processes",
          "Replacing optical discs",
          "Changing a monitor's size",
          "Creating email domains"
        ],
        "explanation": "The OS manages memory allocated to programs.",
        "id": "15-os-6",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "Why must processes be isolated where possible?",
        "answer": "To reduce interference and protect data",
        "options": [
          "To reduce interference and protect data",
          "To make RAM volatile",
          "To add more keyboard keys",
          "To increase printer ink"
        ],
        "explanation": "Memory protection can prevent processes from overwriting each other's data.",
        "id": "15-os-7",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "What is a process?",
        "answer": "A program currently being executed",
        "options": [
          "A program currently being executed",
          "A permanently stored DVD",
          "A networking cable",
          "A file extension"
        ],
        "explanation": "The OS manages active running programs as processes.",
        "id": "15-os-8",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "What could happen if two applications request the CPU at once?",
        "answer": "The OS scheduler allocates execution time",
        "options": [
          "The OS scheduler allocates execution time",
          "Both always erase the hard drive",
          "The processor automatically gains two more cores",
          "All networking stops"
        ],
        "explanation": "CPU scheduling manages competing running tasks.",
        "id": "15-os-9",
        "skill": "Operating systems: interfaces, memory and multitasking"
      },
      {
        "prompt": "What is a typical GUI advantage for occasional users?",
        "answer": "Visual menus may be easier to discover than commands",
        "options": [
          "Visual menus may be easier to discover than commands",
          "It never needs RAM",
          "It is always more efficient for automation",
          "It can run without hardware"
        ],
        "explanation": "Graphical controls can improve learnability for many tasks.",
        "id": "15-os-10",
        "skill": "Operating systems: interfaces, memory and multitasking"
      }
    ]
  },
  {
    "id": "15-files",
    "section": "1.5",
    "spec": "1.5.1",
    "title": "Operating systems: users, files, drivers and peripherals",
    "questions": [
      {
        "prompt": "Why does an OS manage user accounts?",
        "answer": "To control identities and access rights",
        "options": [
          "To control identities and access rights",
          "To compress every image",
          "To set CPU voltage only",
          "To convert between binary and hex"
        ],
        "explanation": "Accounts and permissions help secure system resources.",
        "id": "15-files-1",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "What does file management include?",
        "answer": "Naming, organising, copying and deleting files",
        "options": [
          "Naming, organising, copying and deleting files",
          "Increasing screen resolution",
          "Transmitting Wi-Fi only",
          "Resetting memory clocks"
        ],
        "explanation": "The OS maintains file operations and organisation.",
        "id": "15-files-2",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "What is a device driver?",
        "answer": "Software enabling the OS to communicate with particular hardware",
        "options": [
          "Software enabling the OS to communicate with particular hardware",
          "A network's physical cable",
          "An image file extension",
          "A computer virus by definition"
        ],
        "explanation": "Drivers translate OS requests into device-specific operations.",
        "id": "15-files-3",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "What is a peripheral?",
        "answer": "A hardware device connected for input, output or storage",
        "options": [
          "A hardware device connected for input, output or storage",
          "Only the CPU's program counter",
          "A software licence",
          "An internet domain"
        ],
        "explanation": "Examples include printers, keyboards and external storage devices.",
        "id": "15-files-4",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "Why does an OS use printer buffers?",
        "answer": "To hold data while a slower printer processes it",
        "options": [
          "To hold data while a slower printer processes it",
          "To convert every file into a PDF",
          "To increase clock speed",
          "To change encryption keys automatically"
        ],
        "explanation": "Buffering helps match data-transfer rates between processor and printer.",
        "id": "15-files-5",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "What is the advantage of separate user permissions?",
        "answer": "Users can be limited to appropriate files and settings",
        "options": [
          "Users can be limited to appropriate files and settings",
          "It makes every user administrator",
          "It disables authentication",
          "It deletes secondary storage"
        ],
        "explanation": "Access rights enforce security boundaries.",
        "id": "15-files-6",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "How does an OS handle a connected keyboard?",
        "answer": "It receives input through hardware interfaces and drivers",
        "options": [
          "It receives input through hardware interfaces and drivers",
          "It changes the keyboard into a server",
          "It stores input permanently in ROM only",
          "It uses a router instead of a driver"
        ],
        "explanation": "The OS manages input devices through appropriate device support.",
        "id": "15-files-7",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "What is a folder used for?",
        "answer": "Organising files in a hierarchy",
        "options": [
          "Organising files in a hierarchy",
          "Increasing CPU core count",
          "Managing radio channels",
          "Changing a byte into a bit"
        ],
        "explanation": "Directories let files be grouped and located.",
        "id": "15-files-8",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "Why is file access control useful in schools?",
        "answer": "Pupils should not be able to edit every shared file",
        "options": [
          "Pupils should not be able to edit every shared file",
          "All pupils need full administrator access",
          "It improves monitor contrast",
          "It removes the need for backups"
        ],
        "explanation": "Permissions protect sensitive documents and prevent unwanted changes.",
        "id": "15-files-9",
        "skill": "Operating systems: users, files, drivers and peripherals"
      },
      {
        "prompt": "What is the purpose of peripheral management?",
        "answer": "Coordinate input/output devices and allocate access to them",
        "options": [
          "Coordinate input/output devices and allocate access to them",
          "Choose the user's favourite browser",
          "Run only antivirus scans",
          "Convert sound into network addresses"
        ],
        "explanation": "The OS manages communications and resource sharing with connected hardware.",
        "id": "15-files-10",
        "skill": "Operating systems: users, files, drivers and peripherals"
      }
    ]
  },
  {
    "id": "15-utilities",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Utility software",
    "questions": [
      {
        "prompt": "What is utility software?",
        "answer": "Software that maintains, manages or protects a computer system",
        "options": [
          "Software that maintains, manages or protects a computer system",
          "A physical input device",
          "A type of network cable",
          "A CPU register"
        ],
        "explanation": "Utilities carry out housekeeping and protection tasks.",
        "id": "15-utilities-1",
        "skill": "Utility software"
      },
      {
        "prompt": "What does encryption utility software do?",
        "answer": "Convert readable data into ciphertext using an algorithm and key",
        "options": [
          "Convert readable data into ciphertext using an algorithm and key",
          "Permanently delete every file",
          "Increase screen brightness",
          "Install extra RAM chips"
        ],
        "explanation": "Encryption protects data confidentiality.",
        "id": "15-utilities-2",
        "skill": "Utility software"
      },
      {
        "prompt": "What does defragmentation do on a traditional hard disk?",
        "answer": "Rearrange fragmented file parts to reduce mechanical head movement",
        "options": [
          "Rearrange fragmented file parts to reduce mechanical head movement",
          "Increase monitor pixels",
          "Remove all viruses automatically",
          "Encrypt all network packets"
        ],
        "explanation": "Defragmentation can improve access on mechanical HDDs.",
        "id": "15-utilities-3",
        "skill": "Utility software"
      },
      {
        "prompt": "Why is defragmentation generally unnecessary on an SSD?",
        "answer": "SSDs do not have moving read/write heads",
        "options": [
          "SSDs do not have moving read/write heads",
          "SSDs contain rotating platters",
          "SSDs are always volatile",
          "All SSDs store data optically"
        ],
        "explanation": "Random-access costs are not tied to mechanical seek movement as on HDDs.",
        "id": "15-utilities-4",
        "skill": "Utility software"
      },
      {
        "prompt": "What does file compression software do?",
        "answer": "Reduce the storage size of data",
        "options": [
          "Reduce the storage size of data",
          "Give the CPU more cores",
          "Increase the physical disk capacity",
          "Create internet bandwidth"
        ],
        "explanation": "Compression encodes data more compactly.",
        "id": "15-utilities-5",
        "skill": "Utility software"
      },
      {
        "prompt": "Which is a suitable utility for protecting a file's contents if a laptop is stolen?",
        "answer": "Encryption software",
        "options": [
          "Encryption software",
          "Disk defragmenter only",
          "Screenshot editor",
          "Mouse settings utility"
        ],
        "explanation": "Encrypted files are difficult to read without the decryption key.",
        "id": "15-utilities-6",
        "skill": "Utility software"
      },
      {
        "prompt": "A mechanical HDD reads a highly fragmented file slowly. Which utility might help?",
        "answer": "Defragmentation utility",
        "options": [
          "Defragmentation utility",
          "Unicode converter",
          "System clock widget",
          "Network browser"
        ],
        "explanation": "Reorganising file fragments may reduce slow head movements.",
        "id": "15-utilities-7",
        "skill": "Utility software"
      },
      {
        "prompt": "Which data may require lossless compression?",
        "answer": "Source code that must be restored exactly",
        "options": [
          "Source code that must be restored exactly",
          "A low-quality thumbnail where detail may be discarded",
          "A video preview with accepted quality reduction",
          "An intentionally reduced-resolution photo"
        ],
        "explanation": "Lossless compression preserves exact bytes.",
        "id": "15-utilities-8",
        "skill": "Utility software"
      },
      {
        "prompt": "Which statement about utilities is correct?",
        "answer": "They support system maintenance rather than being the operating system itself",
        "options": [
          "They support system maintenance rather than being the operating system itself",
          "Every utility replaces the OS",
          "They only run on servers",
          "They all have identical functions"
        ],
        "explanation": "Utilities supplement the operating system.",
        "id": "15-utilities-9",
        "skill": "Utility software"
      },
      {
        "prompt": "Why does a user compress several files into an archive?",
        "answer": "To package them conveniently and often reduce transfer size",
        "options": [
          "To package them conveniently and often reduce transfer size",
          "To create a new processor",
          "To convert every file into an executable",
          "To increase printer resolution"
        ],
        "explanation": "Archiving can package files together and compression can lower their size.",
        "id": "15-utilities-10",
        "skill": "Utility software"
      }
    ]
  }
];
