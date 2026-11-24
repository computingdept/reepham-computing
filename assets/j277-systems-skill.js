/* J277 reusable systems Skills. No lesson or assignment logic. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277SystemsSkill=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const labels={memory:['RAM','ROM','Cache','Virtual memory'],storage:['Magnetic HDD','Solid-state SSD','Optical disc','USB flash drive'],cpu:['Clock speed','Number of cores','Cache size','Not enough information']};
// Each row contains three separate scenarios and a worked reason, followed by two misconceptions.
// Security curriculum candidates: Y10 030–034; Y11 137–138. OCR 1.4.1–1.4.2.
const securityBank=[
 [
  [
   "Phishing",
   "Denial of service",
   "Brute-force attack",
   "Data interception"
  ],
  "A fake email asks you to enter your password. Identify the threat.",
  "A message pretending to be from IT asks a teacher to sign in using a link. Identify the threat.",
  "A convincing fake school email asks staff to submit their account details. Identify the attack and explain how it works.",
  "Phishing uses deceptive messages to trick people into revealing information or taking unsafe actions. Staff training and checking requests independently help reduce the risk.",
  "The attacker overwhelms the server with requests.",
  "The attacker tries many possible passwords automatically."
 ],
 [
  [
   "Malware",
   "Phishing",
   "Data interception",
   "Denial of service"
  ],
  "A downloaded game contains harmful software. Identify the threat.",
  "A file secretly installs a program that damages other files. Identify the threat.",
  "A school computer runs a downloaded program that encrypts its files and demands payment. Identify the type of threat.",
  "Malware is malicious software. Ransomware can encrypt files; anti-malware, updates and safe downloads help reduce the risk, and backups can aid recovery.",
  "Every encrypted file is evidence of phishing.",
  "The threat is simply too many legitimate users visiting a website."
 ],
 [
  [
   "Brute-force attack",
   "Phishing",
   "SQL injection",
   "Denial of service"
  ],
  "An attacker repeatedly guesses passwords. Identify the attack.",
  "An account receives thousands of automated failed login attempts. Identify the attack.",
  "A login is targeted by repeated automated attempts using different passwords. Identify the attack and explain the protection needed.",
  "Brute-force attacks try many possible passwords. Strong passwords and limits on login attempts reduce risk; additional authentication can protect accounts.",
  "The attack relies only on copying data in transit.",
  "The attacker must send a convincing email to every user."
 ],
 [
  [
   "Denial of service",
   "Data interception",
   "SQL injection",
   "Phishing"
  ],
  "A website is flooded with requests and stops responding. Identify the attack.",
  "A server cannot respond to genuine users because of an overwhelming volume of unwanted traffic. Identify the attack.",
  "A booking service becomes unavailable when traffic deliberately consumes its available resources. Identify the attack and its effect.",
  "A denial-of-service attack overwhelms resources so legitimate users cannot access a service. Traffic filtering and rate limiting can help reduce the impact.",
  "The attack always changes database records.",
  "The attacker has to obtain a user's password first."
 ],
 [
  [
   "Data interception",
   "Malware",
   "Brute-force attack",
   "Denial of service"
  ],
  "An unauthorised person reads data travelling over a network. Identify the threat.",
  "Unencrypted information is captured while it travels between devices. Identify the threat.",
  "A company discovers that private messages sent over a network were captured by an unauthorised party. Identify the threat and a suitable protection.",
  "Data interception captures communications in transit. Encryption helps prevent captured content being understood without the appropriate key.",
  "Encrypting the data prevents anyone from capturing network traffic at all.",
  "The threat is caused by a server receiving too many requests."
 ],
 [
  [
   "SQL injection",
   "Phishing",
   "Data interception",
   "Brute-force attack"
  ],
  "An attacker tries to make a website database run unintended commands through an input field. Identify the attack.",
  "A poorly protected search form allows input to alter a database query. Identify the attack.",
  "An online database returns unauthorised records because unsafe input changes the intended query. Identify the threat and explain a defensive measure.",
  "SQL injection occurs when untrusted input alters a database query. Parameterised queries help keep input separate from commands; appropriate input validation is also useful.",
  "The attack is only possible by guessing a user's password.",
  "Increasing the network bandwidth prevents database query manipulation."
 ],
 [
  [
   "Firewall",
   "Anti-malware software",
   "Encryption",
   "Access levels"
  ],
  "Which control filters network traffic according to rules?",
  "A school wants to restrict unwanted inbound network traffic. Choose the most appropriate control.",
  "A network administrator needs to allow legitimate connections while blocking traffic that violates network rules. Recommend the control.",
  "A firewall monitors and filters network traffic using rules about allowed connections; it does not guarantee that all allowed traffic is safe.",
  "A firewall removes every infected file already stored on a computer.",
  "Encryption automatically decides which network connections may enter."
 ],
 [
  [
   "Anti-malware software",
   "Firewall",
   "Penetration testing",
   "Encryption"
  ],
  "Which software scans for malicious programs?",
  "A laptop may contain harmful downloaded files. Choose a tool to detect and quarantine them.",
  "A school wants to detect known malicious files on its computers and prevent some infections. Recommend software and explain why updating it helps.",
  "Anti-malware software detects and blocks or quarantines malicious files; updates improve recognition of new threats. It cannot detect every threat.",
  "A firewall guarantees removal of all malicious files already on the disk.",
  "Encryption detects every malicious program."
 ],
 [
  [
   "User access levels",
   "Encryption",
   "Penetration testing",
   "Firewall"
  ],
  "Which control gives different users different permissions?",
  "Students must read shared files but only teachers may change them. Choose the control.",
  "An organisation wants staff to access only the files needed for their roles, even after successful login. Recommend the control.",
  "User access levels restrict what authenticated users can see or change. Passwords authenticate users; permissions then limit their access.",
  "A strong password automatically grants only the permissions a user needs.",
  "Encryption alone decides which authenticated users may edit each file."
 ],
 [
  [
   "Penetration testing",
   "Encryption",
   "User access levels",
   "Anti-malware software"
  ],
  "Which authorised activity tests systems for weaknesses?",
  "A company hires an authorised specialist to check its website for vulnerabilities. Identify the activity.",
  "Before launching a new service, a school wants an authorised security specialist to find exploitable weaknesses so they can be fixed. Recommend the method.",
  "Penetration testing is authorised security testing to identify weaknesses so they can be fixed. The scope and permission must be agreed.",
  "A backup automatically identifies every security weakness.",
  "Testing someone else's systems without permission is acceptable if nothing is changed."
 ]
];
// Software curriculum candidates: Y10 037–039; Y11 139–140 and relevant 155 revision. OCR 1.5.1–1.5.2.
const osBank=[
 [
  [
   "User interface",
   "Memory management",
   "Peripheral management",
   "File management"
  ],
  "Which OS function allows a person to interact with a computer?",
  "A receptionist uses windows and icons to open a booking application. Identify the OS function.",
  "A library needs an interface that beginners can use without remembering commands. Identify the OS function and justify a suitable interface.",
  "The user interface allows people to interact with a computer. A GUI uses visual controls such as icons and menus, which can help beginners.",
  "Memory management organises icons to make a computer easy to use.",
  "Peripheral management is responsible for displaying every application menu."
 ],
 [
  [
   "Memory management",
   "User management",
   "File management",
   "Peripheral management"
  ],
  "Which OS function allocates RAM to running programs?",
  "A computer opens two applications, both needing working memory. Which OS function allocates memory?",
  "Two applications request RAM at the same time. Identify how the OS helps allocate memory and prevents applications interfering with each other's allocated memory.",
  "Memory management allocates and manages RAM for programs and helps protect their memory areas from one another.",
  "File management allocates a separate physical CPU to every program.",
  "User management prevents memory use by all programs."
 ],
 [
  [
   "Multitasking",
   "File management",
   "User interface",
   "Peripheral management"
  ],
  "Which OS function helps several programs run during the same period?",
  "A pupil types a document while audio plays in the background. Identify the relevant OS function.",
  "On a single-core computer, a user edits text while an application downloads a file. Identify the OS function that helps both programs make progress.",
  "Multitasking allows programs to share processing time. The OS can switch the CPU between tasks so each makes progress.",
  "Multitasking requires a separate core for every open program.",
  "File management permanently stores every running program in ROM."
 ],
 [
  [
   "Peripheral management",
   "User management",
   "Memory management",
   "File management"
  ],
  "Which OS function manages communication with a printer?",
  "A computer connects to a new projector. Identify the OS function that manages this device.",
  "A school attaches a scanner that requires a driver. Identify the OS function and explain the purpose of the driver.",
  "Peripheral management controls communication with connected devices. A suitable driver lets the OS communicate with the particular hardware.",
  "File management makes all peripherals use identical commands without drivers.",
  "Memory management converts a scanner into an internal storage device."
 ],
 [
  [
   "File management",
   "Multitasking",
   "Peripheral management",
   "User interface"
  ],
  "Which OS function organises files and folders?",
  "A pupil creates a folder and moves documents into it. Identify the OS function.",
  "A teacher needs to rename, move and retrieve documents saved in different folders. Identify and explain the relevant OS function.",
  "File management organises files and directories and supports operations such as naming, moving, deleting and retrieving files.",
  "Multitasking automatically moves all files into a single folder.",
  "Peripheral management gives a file a name based on the monitor size."
 ],
 [
  [
   "User management",
   "Memory management",
   "Multitasking",
   "Peripheral management"
  ],
  "Which OS function manages accounts and permissions?",
  "A school computer lets a teacher install software but prevents a pupil from doing so. Identify the OS function.",
  "Several staff share one computer but each needs a separate account and appropriate permissions. Identify the function that supports this.",
  "User management manages accounts, authentication and access rights so users have appropriate permissions.",
  "Multitasking grants every user administrator rights.",
  "Peripheral management makes all user accounts share a password."
 ],
 [
  [
   "User interface",
   "Peripheral management",
   "File management",
   "Memory management"
  ],
  "Which OS function can provide a command-line interface?",
  "A technician types commands to manage a computer. Identify the OS function.",
  "An experienced technician needs to repeat many administrative commands. Identify the OS function and explain why a CLI may be useful.",
  "The user interface enables interaction. A command-line interface allows experienced users to enter commands efficiently and can support scripts.",
  "File management requires every task to use a graphical menu.",
  "Memory management eliminates the need to learn command syntax."
 ],
 [
  [
   "Memory management",
   "User management",
   "Peripheral management",
   "User interface"
  ],
  "Which OS function releases memory when a program closes?",
  "A drawing program closes and another application needs RAM. Identify the OS function that makes memory available.",
  "A large program closes and its allocated memory can now be reused. Identify the OS function and explain its role.",
  "Memory management allocates and releases working memory so available RAM can be reused by other processes.",
  "The user interface permanently reserves RAM for every program ever opened.",
  "Peripheral management deletes firmware to free working memory."
 ],
 [
  [
   "Peripheral management",
   "File management",
   "User management",
   "Multitasking"
  ],
  "Which OS function manages a queue of print jobs?",
  "Several users send documents to a shared printer. Identify the OS function that controls the device and its jobs.",
  "A printer is busy when another document arrives. Identify the OS function that helps manage the output device and waiting jobs.",
  "Peripheral management coordinates communication with devices; a print queue can hold jobs until the printer is ready.",
  "User management makes the printer complete every job at once.",
  "Multitasking guarantees every document is printed without waiting."
 ],
 [
  [
   "Multitasking",
   "Peripheral management",
   "User management",
   "File management"
  ],
  "Which OS function shares CPU time between programs?",
  "A web browser and a music player are active together. Identify the OS function that shares processor time.",
  "Several programs need the CPU, including a background application. Identify the OS function that coordinates their execution.",
  "Multitasking manages competing tasks and shares processor time so programs can make progress without each owning the CPU permanently.",
  "File management increases the CPU clock speed whenever a file is opened.",
  "User management ensures only one program can be open at a time."
 ]
];
const utilityBank=[
 [
  [
   "Encryption",
   "Compression",
   "Defragmentation",
   "Operating system"
  ],
  "Which utility makes data unreadable without an appropriate key?",
  "A business carries confidential records on a USB drive. Which utility protects the contents if the drive is lost?",
  "A portable device may be stolen. Recommend a utility that helps protect the confidentiality of saved customer records and explain how it works.",
  "Encryption transforms readable data into ciphertext; an appropriate key is needed to decrypt it. It helps protect confidentiality if storage is lost or stolen.",
  "Compression always makes files unreadable without a secret key.",
  "Defragmentation prevents anyone from reading a stolen drive."
 ],
 [
  [
   "Compression",
   "Encryption",
   "Defragmentation",
   "Operating system"
  ],
  "Which utility reduces the size of files?",
  "A teacher needs to send a folder of large documents by email. Choose a suitable utility.",
  "A company wants to reduce the size of files transferred over a slow link, while preserving all original document content. Recommend a utility and method.",
  "Lossless compression reduces the amount of data needed while allowing exact restoration of the original files; smaller files may transfer faster.",
  "Encryption guarantees that the file becomes smaller.",
  "Defragmentation reduces the number of characters in each document."
 ],
 [
  [
   "Defragmentation",
   "Encryption",
   "Compression",
   "Operating system"
  ],
  "Which utility reorganises fragmented files on a magnetic HDD?",
  "A magnetic hard drive has file fragments spread across the disk. Choose the utility that can reorganise them.",
  "A computer uses a mechanical HDD and frequently accesses files stored in many separate fragments. Recommend an appropriate maintenance utility.",
  "Defragmentation reorganises file fragments on an HDD to reduce unnecessary movement of the read/write head and potentially improve access time.",
  "Defragmentation increases the drive's physical capacity by deleting file content.",
  "Encryption physically moves file fragments next to each other."
 ],
 [
  [
   "Compression",
   "Defragmentation",
   "Encryption",
   "Operating system"
  ],
  "Which utility can create a smaller archive of several files?",
  "A school wants to package several documents into one smaller archive for download. Choose a utility.",
  "A set of source-code files must be distributed in a smaller archive without losing any character. Recommend the utility.",
  "Lossless compression can reduce archive size while preserving all original data when decompressed.",
  "Lossy compression is guaranteed to restore source code exactly.",
  "Encryption is designed to reduce every file to half its size."
 ],
 [
  [
   "Encryption",
   "Compression",
   "Defragmentation",
   "Operating system"
  ],
  "Which utility protects the meaning of stored data using a key?",
  "A researcher saves private information on a laptop. Choose a utility to help protect confidentiality.",
  "An organisation wants stolen storage media to reveal no readable records without the authorised key. Choose a suitable utility.",
  "Encryption helps make stored data unintelligible to unauthorised readers who lack the decryption key. Key management is essential.",
  "Defragmentation hides data by placing each file in a different folder.",
  "Compression provides confidentiality even when everyone has the decompression tool."
 ],
 [
  [
   "Compression",
   "Encryption",
   "Defragmentation",
   "Operating system"
  ],
  "Which utility can help save storage space by encoding data more efficiently?",
  "A photographer wants to reduce image file sizes and accepts some loss of image detail. Choose the utility.",
  "A website needs smaller photographic images and can accept reduced quality. Recommend a utility and explain the appropriate compression type.",
  "Lossy compression may reduce file size substantially by discarding some information. It can suit photographs when reduced quality is acceptable.",
  "Lossy compression always restores every original pixel exactly.",
  "Encryption improves image quality by rearranging pixels."
 ],
 [
  [
   "Defragmentation",
   "Compression",
   "Encryption",
   "Operating system"
  ],
  "Which utility may reduce mechanical seeking on a fragmented HDD?",
  "A desktop with a magnetic HDD is slow when reading fragmented files. Choose the relevant maintenance utility.",
  "A technician proposes reorganising scattered file fragments on an HDD, but not routinely on an SSD. Identify the utility and explain the difference.",
  "Defragmentation can reduce mechanical seeking on an HDD. SSDs have no mechanical read/write head and generally do not need traditional defragmentation.",
  "Defragmentation is required to make the laser in an SSD move faster.",
  "SSDs have rotating platters that need files placed together."
 ],
 [
  [
   "Encryption",
   "Defragmentation",
   "Compression",
   "Operating system"
  ],
  "Which utility uses a key to protect data confidentiality?",
  "A staff member sends a sensitive document that must not be readable by an unauthorised recipient. Choose a utility.",
  "A company needs a confidential file to remain unreadable to someone who obtains a copy without the key. Recommend the relevant utility.",
  "Encryption protects the confidentiality of data by converting it into ciphertext; only an authorised party with suitable key material should decrypt it.",
  "Compression is equivalent to password protection in all cases.",
  "Defragmentation prevents files from being copied."
 ],
 [
  [
   "Compression",
   "Encryption",
   "Defragmentation",
   "Operating system"
  ],
  "Which utility can reduce the amount of storage needed for a backup archive?",
  "A school wants to store copies of its documents using less space. Choose a utility that reduces file sizes.",
  "An archive contains documents whose exact contents must be preserved while reducing storage requirements. Recommend a suitable utility.",
  "Lossless compression can reduce storage requirements while preserving exact original data when restored; the reduction depends on the data.",
  "Lossy compression guarantees that every original bit is restored.",
  "Defragmentation removes repeated words from documents."
 ],
 [
  [
   "Defragmentation",
   "Encryption",
   "Compression",
   "Operating system"
  ],
  "Which utility puts fragments of files into more contiguous locations on an HDD?",
  "A mechanical drive spends time moving its head between parts of the same fragmented file. Choose a utility.",
  "An administrator wants to improve sequential access to fragmented files on a magnetic drive without changing their content. Recommend a utility.",
  "Defragmentation can reorganise file fragments into more contiguous locations on an HDD without changing file content, potentially reducing seek time.",
  "Defragmentation encrypts files so they cannot be read.",
  "Compression physically removes the read/write head from the drive."
 ]
];
// Network curriculum candidates: Y10 021, 022, 026; Y11 133, 136, 154. OCR 1.3.1–1.3.2.
const performanceBank=[
 [
  [
   "Bandwidth",
   "Number of users",
   "Signal interference",
   "Network topology"
  ],
  "What is the maximum amount of data a connection can transfer per second called?",
  "A connection is upgraded from 20 Mb/s to 100 Mb/s. Which factor has increased?",
  "Two otherwise similar networks differ only in link capacity. One can transfer more bits each second. Which factor could improve large file transfers?",
  "Bandwidth is the maximum data transfer rate of a connection. More bandwidth can allow more data to be transferred per second.",
  "Bandwidth counts how many devices are connected.",
  "Bandwidth is the distance a wireless signal travels."
 ],
 [
  [
   "Number of users",
   "Bandwidth of the link",
   "Cable material",
   "Signal range"
  ],
  "Which factor changes when more people use the same network at once?",
  "Thirty pupils download files over a shared connection instead of five. Which factor has changed?",
  "A school's internet link has unchanged capacity, but more pupils stream video simultaneously. Which factor can explain lower speeds for each pupil?",
  "More active users may compete for the same available bandwidth, reducing the data transfer rate each receives.",
  "Adding users automatically increases the capacity of the shared connection.",
  "All users receive the full link capacity regardless of simultaneous traffic."
 ],
 [
  [
   "Wireless interference",
   "Number of users",
   "Network model",
   "File format"
  ],
  "What can disrupt a Wi-Fi signal when other nearby devices use similar frequencies?",
  "A laptop's Wi-Fi becomes unreliable near equipment using the same frequency range. Identify the likely cause.",
  "A classroom has a strong Wi-Fi signal but neighbouring access points use overlapping channels. Wired devices work normally. Identify the likely wireless performance issue.",
  "Interference can disrupt wireless transmissions and cause retries, reducing effective throughput.",
  "Changing from client-server to peer-to-peer removes all radio interference.",
  "Interference increases the maximum data rate of the wired connection."
 ],
 [
  [
   "Weak wireless signal",
   "Higher bandwidth",
   "More server storage",
   "More CPU cores"
  ],
  "What may happen to Wi-Fi strength farther from an access point?",
  "A tablet moves behind thick walls and its wireless connection slows. Identify a likely cause.",
  "A laptop downloads quickly near the access point but slowly in a distant room with several walls. The number of users is unchanged. Identify the likely cause.",
  "Distance and obstacles can weaken wireless signals, causing lower effective data rates and more transmission errors.",
  "A distant wireless connection always has greater bandwidth.",
  "Thick walls improve wireless reception by increasing signal strength."
 ],
 [
  [
   "Wired connection",
   "Wireless connection",
   "Peer-to-peer model",
   "Cloud storage"
  ],
  "Which connection uses a physical cable?",
  "A fixed desktop needs a stable link and cabling is available. Choose the suitable connection type.",
  "A stationary workstation transfers large files. A suitable Ethernet connection offers higher reliable throughput than the congested Wi-Fi available. Recommend the connection.",
  "A wired Ethernet connection can offer stable throughput and avoids radio interference, although it restricts movement and requires cabling.",
  "Ethernet allows unrestricted movement away from the cable.",
  "Using a cable guarantees unlimited internet bandwidth."
 ],
 [
  [
   "Wireless connection",
   "Wired connection",
   "Client-server model",
   "Optical storage"
  ],
  "Which connection lets a device move without a network cable?",
  "Pupils carry tablets around a classroom. Choose a connection type that supports movement.",
  "A visitor area needs network access for mobile devices that do not have wired network ports. Choose a suitable connection, considering its limitations.",
  "Wi-Fi allows mobile devices to connect without cables. Its performance can depend on distance, obstacles and interference.",
  "Wireless connections always transfer data faster than every wired connection.",
  "Every wireless device must remain plugged into a network cable."
 ],
 [
  [
   "5 seconds",
   "10 seconds",
   "20 seconds",
   "60 seconds"
  ],
  "A 10 Mb file travels at 2 Mb/s. Calculate the ideal transfer time.",
  "A 60 Mb file travels at 12 Mb/s. Calculate the ideal transfer time.",
  "A 25 MB file travels at 40 Mb/s. Use 8 bits per byte. Calculate the ideal transfer time.",
  "Ideal time = file size in megabits ÷ rate in megabits per second. Convert MB to Mb first if needed. Real transfers may take longer.",
  "Multiply the file size by the transfer rate to find seconds.",
  "Treat megabytes and megabits as identical units."
 ],
 [
  [
   "8 seconds",
   "4 seconds",
   "16 seconds",
   "80 seconds"
  ],
  "A 16 Mb file travels at 2 Mb/s. Calculate the ideal transfer time.",
  "An 80 Mb file travels at 10 Mb/s. Calculate the ideal transfer time.",
  "A 10 MB file travels at 10 Mb/s. Use 8 bits per byte. Calculate the ideal transfer time.",
  "Divide the size in Mb by the rate in Mb/s. If size is given in MB, multiply by 8 to obtain Mb first.",
  "Divide the data rate by the file size.",
  "A byte contains only one bit."
 ],
 [
  [
   "12 seconds",
   "6 seconds",
   "24 seconds",
   "120 seconds"
  ],
  "A 24 Mb file travels at 2 Mb/s. Calculate the ideal transfer time.",
  "A 144 Mb file travels at 12 Mb/s. Calculate the ideal transfer time.",
  "A 30 MB file travels at 20 Mb/s. Use 8 bits per byte. Calculate the ideal transfer time.",
  "Convert bytes to bits when necessary, then divide file size in Mb by transfer rate in Mb/s.",
  "Multiply the rate in Mb/s by the number of MB.",
  "Divide MB directly by Mb/s without converting units."
 ],
 [
  [
   "4 Mb/s",
   "2 Mb/s",
   "8 Mb/s",
   "20 Mb/s"
  ],
  "A 20 Mb file transfers in 5 seconds. Calculate its average transfer rate.",
  "An 80 Mb file transfers in 20 seconds. Calculate its average transfer rate.",
  "A 15 MB file transfers in 30 seconds. Use 8 bits per byte. Calculate the average transfer rate in Mb/s.",
  "Average rate = transferred data in Mb ÷ elapsed time in seconds. Convert MB to Mb where necessary.",
  "Multiply transferred data by the elapsed time.",
  "Divide time by file size to obtain Mb/s."
 ]
];
const modelsBank=[
 [
  [
   "LAN",
   "WAN",
   "Client-server",
   "Peer-to-peer"
  ],
  "Which type of network covers a small geographical area?",
  "A library connects computers and printers within one building. Identify the network type.",
  "A school connects its classrooms within a single site using its own local networking equipment. Identify the network type and justify the choice.",
  "A LAN covers a limited geographical area such as a school site and usually uses locally managed networking infrastructure.",
  "A LAN must connect sites in several countries.",
  "A LAN is defined by having a dedicated file server."
 ],
 [
  [
   "WAN",
   "LAN",
   "Peer-to-peer",
   "Client-server"
  ],
  "Which type of network connects devices or networks over a large geographical area?",
  "A business connects offices in Norwich and London. Identify the network type.",
  "A retailer connects its branches across the country to share business data. Identify the network type and justify the choice.",
  "A WAN connects devices or networks across a wide geographical area and often uses telecommunications infrastructure from service providers.",
  "A WAN must be contained in a single room.",
  "A WAN is defined by having no server."
 ],
 [
  [
   "Client-server",
   "Peer-to-peer",
   "LAN",
   "WAN"
  ],
  "Which network model uses a server to provide services to clients?",
  "A school stores pupils' files on a central server that their computers access. Identify the model.",
  "A business wants centrally managed user accounts, shared files and backups for many workstations. Recommend the network model.",
  "In a client-server model, servers provide services to clients. Central management can simplify account control, shared storage and backups.",
  "In client-server networks every device must store and manage all shared resources independently.",
  "Client-server is defined by the distance between devices."
 ],
 [
  [
   "Peer-to-peer",
   "Client-server",
   "WAN",
   "LAN"
  ],
  "Which network model allows devices to share resources directly without a dedicated central server?",
  "Four laptops share files directly in a small group. Identify the network model.",
  "A small club has four devices and a limited budget. It needs occasional direct file sharing without maintaining a dedicated server. Recommend the model.",
  "In a peer-to-peer network devices can both request and provide resources directly. It can be inexpensive to set up but central administration and backups are harder.",
  "Every peer-to-peer network must use a dedicated file server.",
  "A peer-to-peer network guarantees that all shared files are available when every peer is switched off."
 ],
 [
  [
   "Client-server",
   "Peer-to-peer",
   "LAN",
   "WAN"
  ],
  "Which model can centralise management of accounts?",
  "A school technician wants to apply permissions from a central server. Choose the model.",
  "A large organisation needs consistent permissions and centralised backups across many computers. Recommend the model and explain one trade-off.",
  "Client-server supports central management and backups, but the server requires resources and maintenance and can be a point of failure without redundancy.",
  "A central server makes all failures impossible.",
  "Client-server has no hardware or administration costs."
 ],
 [
  [
   "Peer-to-peer",
   "Client-server",
   "LAN",
   "WAN"
  ],
  "Which model normally has no dedicated server for direct file sharing?",
  "Two friends want to share folders directly between their laptops. Choose the model.",
  "A group with few users wants to avoid purchasing and maintaining a dedicated server. It accepts that shared files may be unavailable when a peer is offline. Recommend the model.",
  "Peer-to-peer allows direct resource sharing with less dedicated infrastructure, but resource availability depends on the relevant peer being online.",
  "A peer-to-peer model automatically creates a central backup of every file.",
  "Every peer-to-peer device can share files only through a dedicated server."
 ],
 [
  [
   "WAN",
   "LAN",
   "Client-server",
   "Peer-to-peer"
  ],
  "Which network type can connect LANs in different towns?",
  "A charity links its three offices in different cities. Identify the network type.",
  "A company operates a local network at each branch and connects them using a telecom provider across the UK. Identify the overall network type.",
  "A WAN connects networks over long distances, often using telecommunications links; each branch can still have its own LAN.",
  "A WAN cannot include local networks.",
  "A WAN is determined only by the number of computers connected."
 ],
 [
  [
   "LAN",
   "WAN",
   "Peer-to-peer",
   "Client-server"
  ],
  "Which network type can cover an office building?",
  "A home connects computers and a printer using a router and Wi-Fi. Identify its local network type.",
  "A local office uses its own switch and wireless access point to connect staff devices within one building. Identify its local network type.",
  "A LAN connects devices over a limited area. It may use wired or wireless links and either resource-sharing model.",
  "A LAN must use only cables and never Wi-Fi.",
  "Connecting a router to the internet means no local network exists."
 ],
 [
  [
   "Client-server",
   "Peer-to-peer",
   "LAN",
   "WAN"
  ],
  "Which model uses a central service that clients request resources from?",
  "A file server fails and workstations cannot access the files it hosts. Identify the model.",
  "A central file server without redundancy goes offline. Users can still use local applications but cannot access the server's shared files. Identify the model.",
  "Clients rely on servers for the services those servers provide. A server failure can interrupt those services unless redundancy or recovery is available.",
  "All client-server computers must stop functioning if one server fails.",
  "A central file server is a requirement of peer-to-peer resource sharing."
 ],
 [
  [
   "Peer-to-peer",
   "Client-server",
   "WAN",
   "LAN"
  ],
  "Which model allows the same device to request and provide shared resources?",
  "A laptop shares a folder with another laptop and also requests files from it. Identify the model.",
  "A small workgroup shares resources directly. When one laptop is switched off, only the resources it provides become unavailable. Identify the model.",
  "Peers may act as both resource providers and requesters. When a peer goes offline, its own shared resources may become unavailable.",
  "A single peer must always control every other device.",
  "A peer going offline always disconnects every device on the network."
 ]
];
const bank={
cpu:[
 [
  0,
  "Which factor is measured in GHz?",
  "Two otherwise identical CPUs run at 2 GHz and 3 GHz. Which specification differs?",
  "A school compares two CPUs of the same design with equal cores and cache. One runs at 3 GHz rather than 2 GHz. Which factor could explain faster execution?",
  "Clock speed measures cycles per second. With the same CPU design and workload, a higher clock speed can allow more instructions to be processed per second.",
  "Clock speed measures how many cores a CPU contains.",
  "GHz measures the amount of data held in cache."
 ],
 [
  1,
  "Which CPU specification counts independent processing cores?",
  "Two otherwise identical CPUs have two and four cores. Which feature differs?",
  "A video renderer can divide its work into independent tasks. Both CPUs have the same design, clock speed and cache per core. One has twice as many cores. Identify the useful difference.",
  "More cores can process more tasks simultaneously when software can divide its work between them.",
  "Extra cores always double the speed of every individual instruction.",
  "More cores increase the clock frequency of each core automatically."
 ],
 [
  2,
  "Which CPU specification describes the capacity of its small, fast local memory?",
  "Two otherwise identical CPUs have 4 MB and 8 MB of cache. Which factor differs?",
  "An application repeatedly accesses data that no longer fits in a small cache. A larger cache may hold more of the working set. Identify the relevant specification.",
  "A larger cache may hold more frequently used data and instructions, reducing slower RAM accesses.",
  "Cache permanently stores all the user's files.",
  "Larger cache always doubles the number of cores."
 ],
 [
  3,
  "One CPU has a higher clock speed but fewer cores than another. Can the faster CPU always be identified from these facts alone?",
  "CPU A has 3 GHz and two cores; CPU B has 2 GHz and four cores. No workload is given. Can we know which finishes first?",
  "A buyer compares two processors of different designs. Only clock speeds are known. Can they reliably predict which completes every program faster?",
  "Performance depends on the workload and other CPU characteristics. These facts alone do not determine which CPU completes a particular program faster.",
  "The larger GHz figure always guarantees better performance in every program.",
  "The CPU with more cores always finishes every program first."
 ],
 [
  0,
  "Which factor describes the number of clock cycles per second?",
  "A CPU with the same design runs at a higher frequency while the core count stays fixed. What has changed?",
  "A task cannot be divided across cores. Two otherwise identical CPUs with identical cache differ only in operating frequency. Which factor may reduce its execution time?",
  "Higher clock speed means more clock cycles each second; for an otherwise identical CPU it can improve performance even on a single-core task.",
  "Clock speed is the amount of permanent storage.",
  "A higher frequency means the software must use more cores."
 ],
 [
  1,
  "Which specification may help a computer run independent tasks in parallel?",
  "A computer renders multiple independent images concurrently. Which CPU specification can provide more simultaneous execution resources?",
  "A teacher runs several demanding independent applications at once. With otherwise similar CPU designs and frequency, which upgrade may improve simultaneous processing?",
  "Additional cores provide more execution resources for independent tasks and parallel programs, where software and other resources allow.",
  "Additional cores remove the need for RAM.",
  "Extra cores force every program to run twice as fast."
 ],
 [
  2,
  "Which specification can reduce trips from the CPU to RAM by holding more local data?",
  "A processor often reuses a small lookup table. Which CPU feature can reduce repeated retrieval from RAM?",
  "A program frequently reuses data that could fit in a larger cache but not a smaller one. Which specification could reduce cache misses?",
  "A larger cache can reduce cache misses when more of the frequently accessed data fits, avoiding slower RAM retrieval.",
  "Cache size measures the CPU clock frequency.",
  "A larger cache guarantees no access to RAM is ever needed."
 ],
 [
  3,
  "A CPU has a larger cache but a lower clock speed than another. Is the fastest CPU always obvious?",
  "CPU A has more cache; CPU B has a higher clock speed. The program is unknown. What can be concluded about the winner?",
  "One processor has more cores, another more cache, and no relevant benchmark or workload is supplied. Can we guarantee either will finish first?",
  "Different programs benefit from different resources. The listed differences are not enough to guarantee a winner for an unspecified workload.",
  "A larger cache guarantees that every task is faster.",
  "Core count alone determines execution time."
 ],
 [
  0,
  "Which specification changes when a CPU runs at 2.4 rather than 2.8 GHz?",
  "A CPU has the same cores and cache as before but operates at a higher frequency. Identify the change.",
  "Two otherwise identical CPUs perform a calculation using the same number of clock cycles. One completes more clock cycles each second. Which factor explains the difference?",
  "The clock speed is the rate of clock cycles; more cycles per second can reduce the time for the same number of cycles.",
  "The cache is the number of cycles per second.",
  "A CPU's core count equals its clock frequency."
 ],
 [
  1,
  "Which factor describes whether a CPU has four or eight processing cores?",
  "A program divides a workload across multiple cores. Which CPU specification could let it process more independent parts at once?",
  "A simulation can run six independent calculations in parallel. Two otherwise similar processors have two and six available cores. Which factor may allow more calculations to proceed together?",
  "More available cores allow more independent parts of a parallel workload to be processed at the same time, subject to software and resource limits.",
  "Adding cores automatically increases the speed of all sequential tasks.",
  "More cores increase the size of every cache by definition."
 ]
],
memory:[
[0,'Where are the instructions and data for an open word processor normally held?','A pupil edits a spreadsheet. Which main memory holds its working data?','An unsaved document is lost when power fails. Which memory held the unsaved work?','RAM holds currently used instructions and data; it is volatile.','ROM is the temporary working area for open programs.','Virtual memory permanently saves every document.'],
[1,'Which memory can hold firmware needed to start a computer?','A controller needs its boot instructions after power is restored. Which memory fits?','An embedded device must retain fixed start-up instructions when unplugged. Choose the memory.','ROM is non-volatile and can hold firmware or start-up instructions.','RAM retains its contents without power.','Cache keeps boot instructions permanently.'],
[2,'Which small, fast memory holds frequently used data near the CPU?','A CPU repeatedly uses instructions in a loop. Which memory can reduce retrieval time?','Two processors differ in the size of their fast memory for recently used instructions. Identify that memory.','Cache is fast memory near or within the CPU; a cache hit avoids a slower access to RAM.','A hard drive becomes faster than RAM when files repeat.','ROM is rewritten whenever an instruction is reused.'],
[3,'Which technique uses secondary storage when RAM is insufficient?','Several applications need more memory than the available RAM. Which technique can help?','A laptop becomes slow while moving memory pages between its SSD and RAM. Identify the technique.','Virtual memory uses secondary storage to extend available memory; accessing it is slower than accessing RAM.','Virtual memory makes physical RAM chips larger.','Cache makes the whole SSD as fast as RAM.'],
[0,'Which volatile main memory is normally much larger than CPU cache?','A video editor needs space for frames currently being edited. Which main memory holds them?','A technician wants to fit more working data in physical memory and reduce transfers to disk. Which component should be increased?','More RAM allows more working data to fit in physical memory, reducing reliance on virtual memory.','Increasing ROM adds working space for open applications.','A larger disk always increases physical RAM.'],
[1,'Which memory normally retains fixed instructions when power is off?','A washing machine retains its firmware between uses. Which memory category fits?','A manufacturer needs non-volatile memory for fixed firmware, rather than live sensor readings. Choose the category.','ROM retains instructions without power; RAM holds changing working data.','RAM retains data indefinitely when power is off.','Cache is intended for permanent firmware storage.'],
[2,'Which is usually fastest for the CPU to access: RAM, ROM, cache or virtual memory?','A CPU checks small local memory before fetching an instruction from RAM. Name the local memory.','A program repeatedly accesses a small set of values. Which memory makes repeated access faster when those values are present?','Cache stores frequently or recently used values for faster access than RAM.','Virtual memory is faster because it uses a larger disk.','ROM automatically stores recently accessed variables.'],
[3,'Which technique can move inactive memory pages to an SSD or HDD?','RAM is almost full and the OS moves less-used pages to disk. Identify the technique.','A computer keeps applications open but frequently pauses to swap pages between RAM and disk. Identify the technique.','Virtual memory uses secondary storage for pages; frequent transfers can reduce performance.','Cache permanently stores all inactive applications.','ROM expands with the number of running programs.'],
[0,'Where is a game’s changing score normally held while it runs?','A program updates an array of customer orders. Which main memory contains the active array?','A logger saves data every minute but power is lost before the latest readings are saved. Which memory held those lost readings?','RAM holds live program data but loses its contents without power; saving to storage is separate.','ROM is the normal location for rapidly changing variables.','Cache guarantees unsaved values survive a power cut.'],
[1,'Which memory can retain fixed instructions while a device has no power?','A device reads firmware at start-up and loads working data elsewhere. Which memory contains the firmware?','A design has a non-volatile firmware area and a separate volatile working area. Identify the firmware area.','ROM is non-volatile and can hold persistent instructions; RAM holds changing data.','Virtual memory is a fixed firmware chip.','Cache is permanent storage for firmware.']
],
storage:[
[0,'Which device stores data on spinning magnetic platters?','A desktop needs 4 TB. The quoted HDD is cheaper than the equivalent SSD and speed is not critical. Choose storage.','A stationary school archive needs high capacity at low cost. Access is infrequent and the HDD quote is cheapest per GB. Recommend a device.','An HDD can offer high capacity at low cost per GB; moving parts make it less shock-resistant.','An HDD has no moving parts.','Optical discs always offer the highest capacity per device.'],
[1,'Which internal drive stores data electronically with no moving parts?','A laptop is carried between rooms. The internal drive must withstand movement and load programs quickly. Choose storage.','A travelling photographer needs fast random access and shock resistance. The quoted SSD meets the capacity and budget. Recommend an internal drive.','An SSD has no moving parts, usually offers fast access and resists shock, but can cost more per GB.','An SSD reads data with a laser.','An HDD cannot be damaged by movement while operating.'],
[2,'Which storage medium is read using a laser?','A DVD player needs a physical copy of a film. Choose compatible media.','A museum has a DVD kiosk with no USB input. Video must be supplied on compatible read-only media. Choose storage.','Optical media are read using a laser; a compatible drive can play a DVD. Capacity and compatibility are limitations.','A magnetic HDD is read with a laser.','USB flash drives fit directly in DVD trays.'],
[3,'Which small removable device commonly plugs directly into a USB port?','A pupil carries a small presentation between offline computers with USB ports. Choose the convenient option.','A technician transfers small files between offline devices using a pocket-sized drive and USB ports. Choose storage.','A USB flash drive is compact, removable, non-volatile storage; it is convenient but can be lost.','USB flash drives lose all data when unplugged.','An internal desktop HDD is normally the smallest direct USB plug-in device.'],
[0,'Which storage uses rotating disks and moving read/write heads?','A stationary home server needs several TB. The HDD meets the budget but an equivalent SSD does not. Choose storage.','A business retains a large local collection of completed recordings. Access is occasional and the HDD quote offers the lowest cost per GB. Recommend storage.','An HDD can be economical for stationary collections; slower access and moving parts may be acceptable.','HDDs are always faster than SSDs.','Every optical disc holds several terabytes.'],
[1,'Which internal drive uses flash memory rather than platters?','A computer needs faster booting and application loading. A replacement SSD meets the capacity and budget. Choose storage.','A school can replace a slow HDD with an equal-capacity SSD. Faster loading of many small files is the priority. Choose the drive.','SSDs usually have faster random access than HDDs because no mechanical head movement is needed.','SSDs are faster because their platters spin faster.','DVDs are fast writable system storage in every computer.'],
[2,'Which storage includes CDs, DVDs and Blu-ray discs?','A club distributes a recording for existing Blu-ray players. Choose media.','An audience needs fixed video content on compatible physical discs for players without network or USB access. Choose technology.','Optical discs suit compatible disc players and fixed content; capacity depends on format.','A USB port is required to read every optical disc.','An HDD fits directly in a Blu-ray tray.'],
[3,'Which removable flash device is designed to be carried in a pocket?','A teacher transfers a worksheet to an offline printer that accepts USB sticks. Choose storage.','An engineer transfers small diagnostic reports through a USB port. A separate encrypted backup exists. Which portable device fits?','USB flash storage is portable and works without a network; a backup and encryption can mitigate loss.','A USB flash drive is a backup that cannot fail.','Optical discs plug directly into USB ports.'],
[0,'Which device is magnetic secondary storage rather than optical or solid state?','A workstation needs a large inexpensive second internal drive for rarely used files. The HDD quote is cheaper per GB. Choose storage.','A studio already edits on SSDs. It needs a stationary local drive for completed footage; an HDD meets capacity at lower cost. Choose the device.','An HDD is a suitable low-cost capacity choice if slower access and mechanical limitations are acceptable.','Magnetic HDDs are volatile working memory.','A small USB stick always offers the cheapest multi-TB capacity.'],
[1,'Which non-volatile internal drive has no mechanical head or platter?','A handheld computer needs an internal drive that tolerates movement and vibration. Both quoted drives meet the capacity. Choose storage.','An internal drive for a vehicle must withstand vibration. Both quoted drives meet capacity and budget; shock resistance is the deciding factor. Choose storage.','SSDs have no moving parts and are generally more shock-resistant than mechanical HDDs.','SSDs cannot lose data or fail.','HDDs resist shock better because they have moving parts.']
]};
function rotate(a,n){const i=n%a.length;return a.slice(i).concat(a.slice(0,i));}
const extraBanks={
 "cpu": [
  [
   [
    "Embedded system",
    "General-purpose computer",
    "Server",
    "Secondary storage"
   ],
   "A washing machine controller runs the wash cycle. Identify the type of computer.",
   "A microwave controller reads buttons and controls heating. Identify the system.",
   "A traffic light controller responds to sensors and follows a programmed sequence. Identify the system and justify its suitability.",
   "An embedded system is built into a larger device to perform a specific function or set of functions.",
   "It must run any application the user installs.",
   "It is embedded only if connected to the internet."
  ],
  [
   [
    "General-purpose computer",
    "Embedded system",
    "ROM",
    "Cache"
   ],
   "Which type of computer can run many different applications?",
   "A laptop runs games, a browser and a word processor. Identify the type of computer.",
   "A designer needs to run changing combinations of applications rather than control one dedicated machine. Choose a type of computer.",
   "A general-purpose computer is designed to run different programs for many tasks.",
   "A general-purpose computer performs only one fixed function.",
   "Cache is a complete general-purpose computer."
  ],
  [
   [
    "Embedded system",
    "General-purpose computer",
    "Network switch",
    "Optical storage"
   ],
   "A thermostat controls heating using a sensor. Identify the type of system.",
   "A car's braking controller responds to wheel sensor readings. Identify the system.",
   "A battery-powered controller monitors a sensor and opens a valve when needed. It has limited resource requirements. Identify the system and justify its use.",
   "An embedded system can be tailored to a dedicated task, potentially using less power and memory than a general-purpose computer.",
   "Every embedded system needs the fastest processor available.",
   "An embedded system cannot contain software."
  ],
  [
   [
    "Embedded system",
    "General-purpose computer",
    "Cloud storage",
    "Protocol"
   ],
   "A digital alarm clock controls its display and alarm. Identify the system.",
   "A dishwasher controls wash programmes using a dedicated processor. Identify the system.",
   "A manufacturer needs a controller inside a device for a specific set of functions. Users do not need arbitrary applications. Choose the type of system.",
   "An embedded system performs defined functions within a device; hardware and software can be tailored to its requirements.",
   "Embedded systems cannot accept input or produce output.",
   "Every dedicated controller needs a general-purpose operating system."
  ]
 ],
 "utility": [
  [
   [
    "Lossless compression",
    "Lossy compression",
    "Encryption",
    "Defragmentation"
   ],
   "Which compression type restores the original exactly?",
   "A spreadsheet contains exam marks. Choose a compression type for archiving it.",
   "A school must reduce a database backup's size without losing any record. Recommend a compression type and explain why.",
   "Lossless compression allows exact reconstruction of the original data, essential when every value matters.",
   "Lossy compression always restores the original exactly.",
   "Encryption guarantees a smaller file."
  ],
  [
   [
    "Lossy compression",
    "Lossless compression",
    "Encryption",
    "Defragmentation"
   ],
   "Which compression type permanently discards some information?",
   "A website accepts a slight drop in photograph quality to reduce file size. Choose the compression type.",
   "A music service needs smaller audio files and can accept some loss of detail. Choose a compression type and justify the trade-off.",
   "Lossy compression discards information to reduce file size, potentially reducing quality.",
   "Lossy compression restores every original sample.",
   "Defragmentation reduces audio quality."
  ],
  [
   [
    "Lossless compression",
    "Lossy compression",
    "Encryption",
    "Defragmentation"
   ],
   "Which compression type suits source-code files?",
   "A developer sends code in a smaller archive. Choose a compression type.",
   "A program download must be reduced in size without changing any instruction after extraction. Recommend a compression type.",
   "Lossless compression preserves all original information so code can be restored exactly.",
   "Lossy compression safely removes executable instructions.",
   "Encryption reduces the instructions executed."
  ],
  [
   [
    "Lossy compression",
    "Lossless compression",
    "Defragmentation",
    "Encryption"
   ],
   "Which compression type may reduce image quality?",
   "A gallery needs smaller preview images and accepts lower detail. Choose the compression type.",
   "A news website keeps its original photos separately but needs small previews for users with slow connections. Recommend a compression type.",
   "Lossy compression can discard visual information to reduce file size, at the cost of some quality.",
   "Lossless compression permanently removes image details.",
   "Defragmentation reduces photo resolution."
  ]
 ],
 "security": [
  [
   [
    "Multi-factor authentication",
    "Defragmentation",
    "Compression",
    "Topology"
   ],
   "Which control uses more than one type of authentication evidence?",
   "A teacher signs in with a password and an authenticator app on a registered phone. Identify the control.",
   "A school wants to reduce the risk that a stolen password gives access to an account. Recommend a control requiring an additional independent factor.",
   "Multi-factor authentication requires different types of evidence, such as something known and something possessed; a stolen password alone is insufficient.",
   "Entering the same password twice provides two independent factors.",
   "Compression prevents use of stolen passwords."
  ],
  [
   [
    "Staff training",
    "Defragmentation",
    "Compression",
    "File storage"
   ],
   "Which measure helps users recognise phishing?",
   "Staff receive suspicious requests to share account details. Choose a preventative measure focused on their behaviour.",
   "Users are being tricked into revealing credentials by fake emails. Recommend a measure to help them recognise and report these requests.",
   "Training helps staff recognise suspicious requests, verify them independently and report them safely.",
   "Defragmentation removes the need to recognise phishing.",
   "Compression verifies every sender."
  ],
  [
   [
    "Encryption",
    "Defragmentation",
    "Lossy compression",
    "More RAM"
   ],
   "Which control protects the meaning of intercepted data?",
   "A company sends confidential information between offices. Choose a control protecting its contents if captured.",
   "Confidential records cross a network where interception is possible. Choose a measure to protect confidentiality in transit.",
   "Encryption converts readable data into ciphertext so intercepted content should be unintelligible without the appropriate key.",
   "Encryption prevents all packet capture.",
   "Lossy compression makes documents confidential."
  ],
  [
   [
    "Strong passwords",
    "Defragmentation",
    "Increasing bandwidth",
    "File extensions"
   ],
   "Which measure makes password guessing harder?",
   "A user chooses a long unique password instead of a common short password. Identify the measure.",
   "A school's accounts use easily guessed passwords. Recommend a control that makes guessing harder and explain why.",
   "Long unique passwords increase the difficulty of guessing credentials; rate limiting and additional authentication can also reduce risk.",
   "Short common passwords are harder to guess.",
   "More bandwidth prevents password guessing."
  ]
 ]
};
function make(id,level,index,round=0){
 if(extraBanks[id]){
  const l=['easy','medium','hard'].indexOf(level),position=index%10;
  if(position>0&&position%3===0){
   const r=extraBanks[id][(round*3+Math.floor(position/3)-1)%4];
   return {type:'systemsbuilder',skill:id,level,index,prompt:r[l+1],context:'OCR J277 · '+(id==='cpu'?'1.1.3 · Embedded systems':id==='utility'?'1.2.5 / 1.5.2 · Compression':'1.4.2 · Prevention'),a:0,choices:rotate(r[0].map((v,i)=>({v,i})),index+l),reasons:l?rotate(r.slice(4).map((v,i)=>({v,i})),index+l*2):null,why:r[4],hint:id==='cpu'?'Is this computer designed for a specific task or many applications?':id==='utility'?'Does the original data need to be restored exactly?':'Choose a measure that directly reduces the risk.'};
  }
  return {...makeOriginal(id,level,(round*7+position-Math.floor(position/3))%10),index};
 }
 return makeOriginal(id,level,index);
}
function makeOriginal(id,level,index){
 if((!bank[id]&&!['security','os','utility','netperformance','netmodels'].includes(id))||!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0)throw Error('Invalid systems Skill request');
 if(['security','os','utility','netperformance','netmodels'].includes(id)){
  const l=['easy','medium','hard'].indexOf(level),r=(id==='security'?securityBank:id==='os'?osBank:id==='utility'?utilityBank:id==='netperformance'?performanceBank:modelsBank)[index%10],a=0;
  return {type:'systemsbuilder',skill:id,level,index,prompt:r[l+1],context:'OCR J277 · '+(id==='os'?'1.5.1 · Operating systems':id==='utility'?'1.5.2 · Utility software':id==='netperformance'?'1.3.1–1.3.2 · Network performance':id==='netmodels'?'1.3.1 · Network models':index%10<6?'1.4.1 · Threats':'1.4.2 · Prevention'),a,choices:rotate(r[0].map((v,i)=>({v,i})),index+l),reasons:l?rotate(r.slice(4).map((v,i)=>({v,i})),index+l*2):null,why:r[4],hint:id==='os'?'Think about which operating system function manages the resource or interaction.':id==='utility'?'Identify whether the task needs confidentiality, smaller files or HDD file organisation.':id==='netperformance'?'Compare bandwidth, shared usage and connection quality. For calculations, use consistent bit and byte units.':id==='netmodels'?'Distinguish geographical coverage from how devices share resources.':'Identify what happens in the scenario, then choose a threat or a control that fits.'};
 }
 const l=['easy','medium','hard'].indexOf(level),r=bank[id][index%10];
 return {type:'systemsbuilder',skill:id,level,index,prompt:r[l+1],context:'OCR J277 · '+(id==='memory'?'1.2.1 · Primary memory':id==='storage'?'1.2.2 · Secondary storage':'1.1.2 · CPU performance'),a:r[0],choices:rotate(labels[id].map((v,i)=>({v,i})),index+l),reasons:l?rotate(r.slice(4).map((v,i)=>({v,i})),index+l*2):null,why:r[4],hint:id==='memory'?'Think about volatility, speed and what the memory holds.':id==='storage'?'Think about capacity, speed, cost, portability and compatibility.':'Compare clock cycles, parallel work and access to frequently used data. Consider whether the information is sufficient.'};
}
function isComplete(p,s){return !!s&&s.a>=0&&(!p.reasons||s.b>=0);}
function isCorrect(p,s){return isComplete(p,s)&&s.a===p.a&&(!p.reasons||s.b===0);}
function feedback(p,s){if(!isComplete(p,s))return 'Complete every step before checking.';return s.a!==p.a?'Read the scenario again. Which requirement matters most?':'Check which reason supports your choice.';}
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;}
function render(p,host,isLocked,setReady){
 const board=el('div','sys-skill-board'),s={a:-1,b:-1};
 function options(title,list,key){board.append(el('h3','sys-skill-label',title));const group=el('div','sys-skill-options');
  list.forEach(item=>{const b=el('button','sys-skill-option',item.v);b.type='button';b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{if(isLocked())return;s[key]=item.i;group.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));setReady(isComplete(p,s));});group.append(b);});board.append(group);}
 options('STEP 1 · '+(p.skill==='memory'?'Choose the memory':p.skill==='storage'?'Choose the storage':p.skill==='security'?'Identify the threat or choose the control':p.skill==='os'?'Identify the operating system function':p.skill==='utility'?'Choose the utility or compression type':p.skill==='netperformance'?'Choose the factor, connection or calculation result':p.skill==='netmodels'?'Identify the network type or model':'Identify the CPU factor or type of system'),p.choices,'a');
 if(p.reasons){if(p.level==='hard')board.append(el('p','sys-skill-write','Write your answer and reason in your book before selecting the best explanation.'));options('STEP 2 · '+(p.level==='hard'?'Justify your choice':'Explain your choice'),p.reasons,'b');}
 host.append(board);setReady(false);return s;
}
function reveal(p,s,host){const board=host.querySelector('.sys-skill-board'),model=el('section','sys-skill-model');model.append(el('strong','','MODEL ANSWER'),el('h3','',p.choices.find(x=>x.i===p.a).v),el('p','',p.why));if(p.level==='hard')model.append(el('small','','Compare your written answer with the model. The digital score checks your selections, not your written exam marks.'));board.append(model);board.querySelectorAll('button').forEach(b=>b.disabled=true);}
return {make,isComplete,isCorrect,feedback,render,reveal};
});
