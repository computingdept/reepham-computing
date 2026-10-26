'use strict';
// OCR J277 1.3 Computer networks — seven sub-spec skills, ten MCQs per skill.
const J277_SECTION={"code":"1.3","title":"Computer Networks, Connections and Protocols"};
const SKILLS=[
  {
    "id": "13-lanwan",
    "section": "1.3",
    "spec": "1.3.1",
    "title": "LANs, WANs and network performance",
    "questions": [
      {
        "prompt": "What is a computer network?",
        "answer": "Two or more devices connected to share data or resources",
        "options": [
          "Two or more devices connected to share data or resources",
          "A computer with two monitors",
          "A single program running twice",
          "A set of unconnected printers"
        ],
        "explanation": "A network links devices for communication and resource sharing.",
        "id": "13-lanwan-1",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "What does LAN mean?",
        "answer": "Local Area Network",
        "options": [
          "Local Area Network",
          "Long Area Node",
          "Local Access Number",
          "Linked Array Network"
        ],
        "explanation": "A LAN covers a limited geographical area.",
        "id": "13-lanwan-2",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "What does WAN mean?",
        "answer": "Wide Area Network",
        "options": [
          "Wide Area Network",
          "Wireless Array Node",
          "Web Access Number",
          "Wired Area Name"
        ],
        "explanation": "A WAN spans a large geographical area.",
        "id": "13-lanwan-3",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "Which is a typical LAN?",
        "answer": "Computers connected across one school site",
        "options": [
          "Computers connected across one school site",
          "A worldwide network of connected countries",
          "Every computer on the global Internet",
          "Unconnected laptops across the UK"
        ],
        "explanation": "A school LAN connects nearby devices.",
        "id": "13-lanwan-4",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "Which network type commonly connects different offices across countries?",
        "answer": "WAN",
        "options": [
          "WAN",
          "LAN within one classroom",
          "A single isolated computer",
          "A USB-only connection"
        ],
        "explanation": "WANs span large distances and often link LANs.",
        "id": "13-lanwan-5",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "What does bandwidth measure?",
        "answer": "The amount of data that can be transmitted per unit time",
        "options": [
          "The amount of data that can be transmitted per unit time",
          "The permanent storage capacity of a disk",
          "The number of CPU registers",
          "The width of a monitor"
        ],
        "explanation": "Bandwidth describes available data transfer capacity, often in bits per second.",
        "id": "13-lanwan-6",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "What does latency describe?",
        "answer": "The delay before data travels or a response is received",
        "options": [
          "The delay before data travels or a response is received",
          "The monitor's pixel count",
          "The storage medium's capacity",
          "The number of program variables"
        ],
        "explanation": "Latency measures a communication delay.",
        "id": "13-lanwan-7",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "A network has many simultaneous users. What may reduce throughput?",
        "answer": "Greater contention for shared bandwidth",
        "options": [
          "Greater contention for shared bandwidth",
          "A more readable keyboard",
          "An increased paper size",
          "A brighter monitor"
        ],
        "explanation": "Shared capacity can be congested when many users transfer data.",
        "id": "13-lanwan-8",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "Which could improve wireless network performance?",
        "answer": "Reducing interference and placing access points appropriately",
        "options": [
          "Reducing interference and placing access points appropriately",
          "Increasing the wallpaper resolution",
          "Turning off all network interfaces",
          "Using a slower processor clock"
        ],
        "explanation": "Wireless signal strength and interference affect communication.",
        "id": "13-lanwan-9",
        "skill": "LANs, WANs and network performance"
      },
      {
        "prompt": "Why can distance affect a network connection?",
        "answer": "Signal loss and propagation delay can increase",
        "options": [
          "Signal loss and propagation delay can increase",
          "Distance automatically deletes files",
          "It changes ASCII into Unicode",
          "A longer cable adds CPU cores"
        ],
        "explanation": "Transmission medium and distance can affect signal strength and timing.",
        "id": "13-lanwan-10",
        "skill": "LANs, WANs and network performance"
      }
    ]
  },
  {
    "id": "13-models",
    "section": "1.3",
    "spec": "1.3.1",
    "title": "Client–server and peer-to-peer",
    "questions": [
      {
        "prompt": "What does a client do in a client–server network?",
        "answer": "Requests services or data from a server",
        "options": [
          "Requests services or data from a server",
          "Always acts as the central file server",
          "Only routes between continents",
          "Stores the DNS root zone"
        ],
        "explanation": "Clients request services provided by servers.",
        "id": "13-models-1",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "What is a server?",
        "answer": "A device or system providing services to clients",
        "options": [
          "A device or system providing services to clients",
          "Any monitor showing a webpage",
          "A cable containing optical fibres",
          "An IP address stored on paper"
        ],
        "explanation": "Servers respond to service requests.",
        "id": "13-models-2",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "Which feature is typical of a client–server network?",
        "answer": "Central user management and access control",
        "options": [
          "Central user management and access control",
          "No dedicated service providers ever",
          "Every device must be switched off together",
          "No shared resources"
        ],
        "explanation": "Central servers can manage accounts, permissions and files.",
        "id": "13-models-3",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "Which is an advantage of peer-to-peer for a very small network?",
        "answer": "Devices can share directly without a dedicated server",
        "options": [
          "Devices can share directly without a dedicated server",
          "It requires a large server room",
          "It guarantees strong central backup",
          "It has unlimited scalability"
        ],
        "explanation": "Peer-to-peer can be simple and inexpensive for small groups.",
        "id": "13-models-4",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "What is a common limitation of peer-to-peer networking?",
        "answer": "No central administration or standardised backups",
        "options": [
          "No central administration or standardised backups",
          "Devices cannot share files",
          "All nodes use routers only",
          "Every device needs a separate WAN"
        ],
        "explanation": "Decentralised management can make backup and permissions harder.",
        "id": "13-models-5",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "What is a potential disadvantage of a client–server network?",
        "answer": "Dedicated servers cost money to maintain",
        "options": [
          "Dedicated servers cost money to maintain",
          "No device can share a printer",
          "Clients cannot log in",
          "It cannot use a LAN"
        ],
        "explanation": "Server hardware, expertise and maintenance add costs.",
        "id": "13-models-6",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "A school's shared drive must be accessible from all classrooms. Which design fits?",
        "answer": "Client–server file service",
        "options": [
          "Client–server file service",
          "Unconnected USB drives",
          "A single offline printer",
          "An isolated keyboard"
        ],
        "explanation": "A central server can make shared files available to authenticated clients.",
        "id": "13-models-7",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "In peer-to-peer networking, a device may act as what?",
        "answer": "Both client and service provider",
        "options": [
          "Both client and service provider",
          "Only a router",
          "Only a DNS server",
          "Only a passive screen"
        ],
        "explanation": "Peers may request resources and share their own.",
        "id": "13-models-8",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "What happens if a central file server fails?",
        "answer": "Services dependent on it may become unavailable",
        "options": [
          "Services dependent on it may become unavailable",
          "All client devices always turn off",
          "Every LAN automatically becomes a WAN",
          "No users can operate any local application"
        ],
        "explanation": "A server outage affects services it provides, not necessarily every client function.",
        "id": "13-models-9",
        "skill": "Client–server and peer-to-peer"
      },
      {
        "prompt": "Why can centralised backups be simpler on client–server networks?",
        "answer": "Shared files can be managed on one or more servers",
        "options": [
          "Shared files can be managed on one or more servers",
          "Files never change",
          "All storage is volatile",
          "Every client has the same address"
        ],
        "explanation": "Central data can be backed up under a consistent policy.",
        "id": "13-models-10",
        "skill": "Client–server and peer-to-peer"
      }
    ]
  },
  {
    "id": "13-hardware",
    "section": "1.3",
    "spec": "1.3.1",
    "title": "NICs, switches, routers and access points",
    "questions": [
      {
        "prompt": "What does a network interface card (NIC) do?",
        "answer": "Allows a device to connect and exchange data on a network",
        "options": [
          "Allows a device to connect and exchange data on a network",
          "Stores the operating system",
          "Calculates image colour depth",
          "Converts every file into ASCII"
        ],
        "explanation": "A NIC provides an interface to a network.",
        "id": "13-hardware-1",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "What is the main role of a network switch?",
        "answer": "Connect devices in a LAN and forward frames towards their destinations",
        "options": [
          "Connect devices in a LAN and forward frames towards their destinations",
          "Print documents without software",
          "Store deleted emails",
          "Convert URLs into pixels"
        ],
        "explanation": "Switches typically forward frames using MAC addressing.",
        "id": "13-hardware-2",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "What is the role of a router?",
        "answer": "Forward packets between different networks",
        "options": [
          "Forward packets between different networks",
          "Store only keyboard input",
          "Run the ALU",
          "Convert images to binary"
        ],
        "explanation": "Routers use network addresses to direct traffic between networks.",
        "id": "13-hardware-3",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "What does a wireless access point provide?",
        "answer": "Wi-Fi connection into a network",
        "options": [
          "Wi-Fi connection into a network",
          "An extra CPU cache",
          "Optical disc writing",
          "Permanent primary storage"
        ],
        "explanation": "Access points let wireless clients connect to a network.",
        "id": "13-hardware-4",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "Which device typically forwards Ethernet frames using MAC addresses?",
        "answer": "Switch",
        "options": [
          "Switch",
          "Router using only IP routes",
          "Web browser",
          "Monitor"
        ],
        "explanation": "A LAN switch uses learned MAC addresses.",
        "id": "13-hardware-5",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "Which device usually forwards packets between a LAN and the Internet?",
        "answer": "Router",
        "options": [
          "Router",
          "RAM module",
          "Keyboard",
          "A passive hub only"
        ],
        "explanation": "A router joins different IP networks.",
        "id": "13-hardware-6",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "What does a MAC address identify?",
        "answer": "A network interface at the link layer",
        "options": [
          "A network interface at the link layer",
          "A website domain name",
          "The computer's storage capacity",
          "A colour depth setting"
        ],
        "explanation": "MAC addresses are link-layer interface identifiers.",
        "id": "13-hardware-7",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "Which hardware needs to be present to connect a typical computer to Ethernet?",
        "answer": "Ethernet NIC",
        "options": [
          "Ethernet NIC",
          "DVD burner",
          "Graphics tablet",
          "Sound card only"
        ],
        "explanation": "An Ethernet NIC sends and receives Ethernet frames.",
        "id": "13-hardware-8",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "In a wireless school network, where do phones normally associate?",
        "answer": "A wireless access point",
        "options": [
          "A wireless access point",
          "A magnetic HDD",
          "An ALU",
          "A word-processing document"
        ],
        "explanation": "Wireless clients join the network through an access point.",
        "id": "13-hardware-9",
        "skill": "NICs, switches, routers and access points"
      },
      {
        "prompt": "Why might a LAN use both a switch and router?",
        "answer": "The switch connects local devices; the router connects other networks",
        "options": [
          "The switch connects local devices; the router connects other networks",
          "Both are identical CPU components",
          "The switch stores backups; router supplies RAM",
          "Both perform only image editing"
        ],
        "explanation": "Different devices handle LAN forwarding and routing.",
        "id": "13-hardware-10",
        "skill": "NICs, switches, routers and access points"
      }
    ]
  },
  {
    "id": "13-topology",
    "section": "1.3",
    "spec": "1.3.1",
    "title": "Star and mesh topologies",
    "questions": [
      {
        "prompt": "How are devices connected in a star topology?",
        "answer": "Each has a connection to a central device",
        "options": [
          "Each has a connection to a central device",
          "Every device directly connects to every other",
          "No central connections exist",
          "All devices share a single keyboard"
        ],
        "explanation": "Star networks connect endpoints to a central switch or similar device.",
        "id": "13-topology-1",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "What is a vulnerability of a star topology?",
        "answer": "Failure of the central device can disrupt connectivity",
        "options": [
          "Failure of the central device can disrupt connectivity",
          "One endpoint failure disconnects all others every time",
          "No cable is ever needed",
          "All data must travel to space"
        ],
        "explanation": "The central device is a single point of failure.",
        "id": "13-topology-2",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "What is an advantage of a star topology?",
        "answer": "Individual endpoint cables can often be managed independently",
        "options": [
          "Individual endpoint cables can often be managed independently",
          "It needs no networking hardware",
          "There can be no network failures",
          "It never uses bandwidth"
        ],
        "explanation": "Star cabling simplifies maintenance and isolating endpoint faults.",
        "id": "13-topology-3",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "What characterises a mesh network?",
        "answer": "Devices have multiple interconnections or available routes",
        "options": [
          "Devices have multiple interconnections or available routes",
          "Every connection goes through one switch only",
          "It has no devices",
          "It must use magnetic discs"
        ],
        "explanation": "A mesh has multiple pathways between nodes.",
        "id": "13-topology-4",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "What is an advantage of mesh connectivity?",
        "answer": "Alternative routes can improve fault tolerance",
        "options": [
          "Alternative routes can improve fault tolerance",
          "All devices require no power",
          "Data is always transmitted instantly",
          "It has zero installation cost"
        ],
        "explanation": "Traffic can use another path when one link fails.",
        "id": "13-topology-5",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "What is a disadvantage of fully meshed connections?",
        "answer": "More links increase cost and complexity",
        "options": [
          "More links increase cost and complexity",
          "It prevents all data transfer",
          "It requires only one cable",
          "It cannot be wireless"
        ],
        "explanation": "Many interconnections need additional resources and management.",
        "id": "13-topology-6",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "A classroom PC's cable fails in a switched star network. What is most likely?",
        "answer": "Only that PC loses its direct connection",
        "options": [
          "Only that PC loses its direct connection",
          "The central switch is always destroyed",
          "Every other PC loses power",
          "The WAN is deleted"
        ],
        "explanation": "An individual endpoint cable fault need not affect other links.",
        "id": "13-topology-7",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "A main switch loses power in a star LAN. What is most likely?",
        "answer": "Connected devices lose their shared connectivity through it",
        "options": [
          "Connected devices lose their shared connectivity through it",
          "The PCs all gain new CPU cores",
          "All files permanently vanish",
          "Other networks gain bandwidth"
        ],
        "explanation": "The central switch is an important failure point.",
        "id": "13-topology-8",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "A link fails but data reaches its destination along another network path. Which feature helped?",
        "answer": "Mesh redundancy",
        "options": [
          "Mesh redundancy",
          "Optical disc storage",
          "RAM volatility",
          "Lossy compression"
        ],
        "explanation": "Multiple routes enable traffic to bypass a failed link.",
        "id": "13-topology-9",
        "skill": "Star and mesh topologies"
      },
      {
        "prompt": "Which topology commonly fits a typical school wired LAN?",
        "answer": "Star",
        "options": [
          "Star",
          "Every device connected to every device",
          "No topology",
          "A CPU ring register"
        ],
        "explanation": "Endpoints are often linked to central Ethernet switches.",
        "id": "13-topology-10",
        "skill": "Star and mesh topologies"
      }
    ]
  },
  {
    "id": "13-wired",
    "section": "1.3",
    "spec": "1.3.2",
    "title": "Wired, wireless and transmission media",
    "questions": [
      {
        "prompt": "Which medium transmits light pulses rather than electrical signals?",
        "answer": "Fibre-optic cable",
        "options": [
          "Fibre-optic cable",
          "Copper twisted pair",
          "Coaxial copper wire",
          "Electrical power cable"
        ],
        "explanation": "Fibre-optic links transmit light.",
        "id": "13-wired-1",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "What is a common advantage of wired Ethernet?",
        "answer": "A stable connection less exposed to radio interference",
        "options": [
          "A stable connection less exposed to radio interference",
          "No physical cable is required",
          "It always connects to satellites",
          "It uses only sound waves"
        ],
        "explanation": "Wired links avoid many wireless interference issues.",
        "id": "13-wired-2",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "What is a common advantage of Wi-Fi?",
        "answer": "Device mobility without a data cable",
        "options": [
          "Device mobility without a data cable",
          "It never suffers interference",
          "It always has infinite bandwidth",
          "It makes a router unnecessary in every network"
        ],
        "explanation": "Wireless connections allow devices to move within coverage.",
        "id": "13-wired-3",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "Which is a disadvantage of wireless transmission?",
        "answer": "Interference and signal attenuation",
        "options": [
          "Interference and signal attenuation",
          "It requires every computer to have an optical drive",
          "It cannot carry data",
          "It only supports text files"
        ],
        "explanation": "Radio signals can be weakened or disrupted.",
        "id": "13-wired-4",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "Which signals travel in copper network cable?",
        "answer": "Electrical signals",
        "options": [
          "Electrical signals",
          "Laser light only",
          "Sound waves only",
          "Magnetic disks"
        ],
        "explanation": "Copper cables conduct electrical signals.",
        "id": "13-wired-5",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "Which might favour fibre over copper for a long network backbone?",
        "answer": "High speed over longer distances and resistance to electromagnetic interference",
        "options": [
          "High speed over longer distances and resistance to electromagnetic interference",
          "Fibre is always cheaper to install",
          "Fibre transmits via copper electrons",
          "Fibre can be tied directly to keyboard wires"
        ],
        "explanation": "Fibre's light-based medium supports long, high-capacity links.",
        "id": "13-wired-6",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "Which technology commonly supplies wireless LAN connections?",
        "answer": "Wi-Fi",
        "options": [
          "Wi-Fi",
          "DVD",
          "RAM",
          "HDMI"
        ],
        "explanation": "Wi-Fi is commonly used for local wireless networking.",
        "id": "13-wired-7",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "What can block or weaken Wi-Fi coverage in a building?",
        "answer": "Thick walls and competing radio signals",
        "options": [
          "Thick walls and competing radio signals",
          "More available storage",
          "An extra printer cartridge",
          "A higher text font size"
        ],
        "explanation": "Building materials and interference affect signal quality.",
        "id": "13-wired-8",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "Which would be a sensible reason to wire a classroom desktop PC?",
        "answer": "Reliable high-speed connection at a fixed location",
        "options": [
          "Reliable high-speed connection at a fixed location",
          "It will delete unwanted software",
          "It automatically secures all passwords",
          "It removes the need for an NIC"
        ],
        "explanation": "Fixed devices often benefit from wired reliability.",
        "id": "13-wired-9",
        "skill": "Wired, wireless and transmission media"
      },
      {
        "prompt": "Which medium is more exposed to electromagnetic interference?",
        "answer": "Copper cable",
        "options": [
          "Copper cable",
          "Fibre-optic cable",
          "A blank DVD",
          "An unpowered screen"
        ],
        "explanation": "Electrical signals in copper can be affected by electromagnetic noise.",
        "id": "13-wired-10",
        "skill": "Wired, wireless and transmission media"
      }
    ]
  },
  {
    "id": "13-address",
    "section": "1.3",
    "spec": "1.3.2",
    "title": "IP, MAC addresses and DNS",
    "questions": [
      {
        "prompt": "What does an IP address help identify?",
        "answer": "A device or interface for communication on an IP network",
        "options": [
          "A device or interface for communication on an IP network",
          "The CPU's accumulator value",
          "The size of a PDF",
          "The number of connected monitors"
        ],
        "explanation": "IP addressing allows packets to reach networks and hosts.",
        "id": "13-address-1",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "Which is a valid IPv4 address?",
        "answer": "192.168.1.10",
        "options": [
          "192.168.1.10",
          "192.168.1.300",
          "192.168.-1.2",
          "192.168.1"
        ],
        "explanation": "IPv4 dotted-decimal notation contains four octets each from 0 to 255.",
        "id": "13-address-2",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "Why is 172.16.300.4 invalid IPv4?",
        "answer": "An octet is greater than 255",
        "options": [
          "An octet is greater than 255",
          "It contains four octets",
          "It begins with 172",
          "It has a decimal dot"
        ],
        "explanation": "Each IPv4 octet must be between 0 and 255.",
        "id": "13-address-3",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "What is the main job of DNS?",
        "answer": "Translate domain names into IP addresses",
        "options": [
          "Translate domain names into IP addresses",
          "Encrypt every message automatically",
          "Turn routers into switches",
          "Compress image files"
        ],
        "explanation": "DNS resolves human-readable domain names into addresses.",
        "id": "13-address-4",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "Which kind of address is generally used by switches to forward Ethernet frames?",
        "answer": "MAC address",
        "options": [
          "MAC address",
          "A school postcode",
          "A PDF page number",
          "A file extension"
        ],
        "explanation": "Switches learn and use link-layer MAC addresses.",
        "id": "13-address-5",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "Which addressing is used for routing between IP networks?",
        "answer": "IP address",
        "options": [
          "IP address",
          "ASCII code",
          "Colour value",
          "Byte size"
        ],
        "explanation": "IP addresses are used for network-layer forwarding.",
        "id": "13-address-6",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "Which is an IPv6 characteristic?",
        "answer": "It uses 128-bit addresses",
        "options": [
          "It uses 128-bit addresses",
          "It has only four decimal octets",
          "It always uses 8 bits",
          "It is identical to ASCII"
        ],
        "explanation": "IPv6 address space is 128 bits and commonly displayed in hexadecimal groups.",
        "id": "13-address-7",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "What happens when a browser needs a web server's IP address from its name?",
        "answer": "It can query DNS for a resolution",
        "options": [
          "It can query DNS for a resolution",
          "It searches only the CPU registers",
          "It converts the name into an image",
          "It always guesses an IP address"
        ],
        "explanation": "DNS lookup can supply the mapped IP address.",
        "id": "13-address-8",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "Which is a plausible hexadecimal-style MAC address?",
        "answer": "A4:5E:60:9F:12:3B",
        "options": [
          "A4:5E:60:9F:12:3B",
          "192.168.1.10",
          "www.example.org",
          "10.300.2.1"
        ],
        "explanation": "MAC addresses are commonly written as six groups of hexadecimal octets.",
        "id": "13-address-9",
        "skill": "IP, MAC addresses and DNS"
      },
      {
        "prompt": "What distinguishes MAC and IP addresses in typical network communication?",
        "answer": "MAC works on local link forwarding; IP supports routing across networks",
        "options": [
          "MAC works on local link forwarding; IP supports routing across networks",
          "They always contain exactly the same value",
          "MAC is a text encoding; IP is a CPU register",
          "Neither can identify network interfaces"
        ],
        "explanation": "They operate at different network layers.",
        "id": "13-address-10",
        "skill": "IP, MAC addresses and DNS"
      }
    ]
  },
  {
    "id": "13-protocols",
    "section": "1.3",
    "spec": "1.3.2",
    "title": "Protocols and standards",
    "questions": [
      {
        "prompt": "What is a network protocol?",
        "answer": "An agreed set of rules for network communication",
        "options": [
          "An agreed set of rules for network communication",
          "A brand of CPU",
          "A file-compression algorithm",
          "A fixed disk size"
        ],
        "explanation": "Protocols define how devices exchange data.",
        "id": "13-protocols-1",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "Which protocol is used to transfer web pages securely?",
        "answer": "HTTPS",
        "options": [
          "HTTPS",
          "FTP without TLS",
          "POP3",
          "SMTP"
        ],
        "explanation": "HTTPS uses HTTP over TLS to protect web traffic.",
        "id": "13-protocols-2",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "Which protocol is commonly used to send email between mail servers?",
        "answer": "SMTP",
        "options": [
          "SMTP",
          "IMAP",
          "POP3",
          "HTTP"
        ],
        "explanation": "SMTP is used for sending or relaying mail.",
        "id": "13-protocols-3",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "Which protocol is commonly used to retrieve and synchronise email across devices?",
        "answer": "IMAP",
        "options": [
          "IMAP",
          "SMTP",
          "HTTP",
          "FTP"
        ],
        "explanation": "IMAP allows remote mailbox synchronisation.",
        "id": "13-protocols-4",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "Which protocol is often used to transfer files?",
        "answer": "FTP",
        "options": [
          "FTP",
          "SMTP",
          "POP3",
          "IP-only routing"
        ],
        "explanation": "FTP is designed for file transfer; plain FTP is not encrypted.",
        "id": "13-protocols-5",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "What does TCP provide?",
        "answer": "Reliable ordered delivery of a byte stream",
        "options": [
          "Reliable ordered delivery of a byte stream",
          "The physical colour of a network cable",
          "File-size compression",
          "A graphics processing unit"
        ],
        "explanation": "TCP uses sequencing, acknowledgements and retransmissions.",
        "id": "13-protocols-6",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "What is the role of IP?",
        "answer": "Addressing and routing packets across networks",
        "options": [
          "Addressing and routing packets across networks",
          "Printing documents",
          "Storing operating-system files",
          "Generating secure passwords"
        ],
        "explanation": "IP forwards addressed packets.",
        "id": "13-protocols-7",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "What protocol automatically provides IP configuration on many networks?",
        "answer": "DHCP",
        "options": [
          "DHCP",
          "SMTP",
          "FTP",
          "POP3"
        ],
        "explanation": "DHCP can assign IP addresses and other network settings.",
        "id": "13-protocols-8",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "Why are network standards useful?",
        "answer": "Equipment from different makers can work together",
        "options": [
          "Equipment from different makers can work together",
          "Every device must use the same screen size",
          "All data becomes secret",
          "No network hardware is required"
        ],
        "explanation": "Standards support interoperability.",
        "id": "13-protocols-9",
        "skill": "Protocols and standards"
      },
      {
        "prompt": "Which protocol resolves website names into IP addresses?",
        "answer": "DNS",
        "options": [
          "DNS",
          "SMTP",
          "FTP",
          "POP3"
        ],
        "explanation": "DNS translates domain names into network addresses.",
        "id": "13-protocols-10",
        "skill": "Protocols and standards"
      }
    ]
  }
];
