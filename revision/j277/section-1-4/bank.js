'use strict';
// OCR J277 1.4 Network Security — small skills for threats and prevention.
const J277_SECTION={"code":"1.4","title":"Network Security"};
const SKILLS=[
  {
    "id": "14-malware",
    "section": "1.4",
    "spec": "1.4.1",
    "title": "Malware and social engineering",
    "questions": [
      {
        "prompt": "What is malware?",
        "answer": "Software designed to harm or compromise systems",
        "options": [
          "Software designed to harm or compromise systems",
          "A kind of storage device",
          "A network topology",
          "A fast CPU register"
        ],
        "explanation": "Malware is malicious software.",
        "id": "14-malware-1",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "What does phishing usually involve?",
        "answer": "Deceptive messages trying to obtain information",
        "options": [
          "Deceptive messages trying to obtain information",
          "Cleaning files from a hard drive",
          "Connecting computers with fibre",
          "Defragmenting an SSD"
        ],
        "explanation": "Phishing tricks a recipient into providing details or following unsafe links.",
        "id": "14-malware-2",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "What does ransomware typically do?",
        "answer": "Encrypts or blocks access to data and demands payment",
        "options": [
          "Encrypts or blocks access to data and demands payment",
          "Increases the number of CPU cores",
          "Checks a disk for errors",
          "Increases Wi-Fi signal strength"
        ],
        "explanation": "Ransomware attempts to extort payment by denying access to data.",
        "id": "14-malware-3",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "What is a computer worm?",
        "answer": "Malware that can spread between systems",
        "options": [
          "Malware that can spread between systems",
          "A harmless text format",
          "A secure email protocol",
          "An optical storage medium"
        ],
        "explanation": "Worms can propagate across networks without needing a user to open every new copy.",
        "id": "14-malware-4",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "Which is an example of social engineering?",
        "answer": "Someone impersonates IT support to request a password",
        "options": [
          "Someone impersonates IT support to request a password",
          "The OS deletes temporary files",
          "A switch forwards frames",
          "A learner runs a local program"
        ],
        "explanation": "Social engineering manipulates people into bypassing security.",
        "id": "14-malware-5",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "What is spyware designed to do?",
        "answer": "Collect information about a user without permission",
        "options": [
          "Collect information about a user without permission",
          "Improve storage performance",
          "Compress an image without loss",
          "Improve monitor brightness"
        ],
        "explanation": "Spyware gathers sensitive information, often covertly.",
        "id": "14-malware-6",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "What describes a computer virus?",
        "answer": "Malicious code that replicates by infecting files or programs",
        "options": [
          "Malicious code that replicates by infecting files or programs",
          "A type of network cable",
          "A legal software licence",
          "A form of secondary storage"
        ],
        "explanation": "Viruses depend on infecting a host file or program to spread.",
        "id": "14-malware-7",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "Why are humans sometimes a weak point in security?",
        "answer": "People may be deceived into revealing credentials",
        "options": [
          "People may be deceived into revealing credentials",
          "All computers lack encryption",
          "All passwords are automatically public",
          "Network routers never check traffic"
        ],
        "explanation": "Attacks may exploit trust, urgency or lack of awareness.",
        "id": "14-malware-8",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "An email falsely claims your account will close unless you click a link. What does this suggest?",
        "answer": "Phishing",
        "options": [
          "Phishing",
          "Defragmentation",
          "Data compression",
          "Virtual memory"
        ],
        "explanation": "Urgent, deceptive messages can be used to trick users into handing over credentials.",
        "id": "14-malware-9",
        "skill": "Malware and social engineering"
      },
      {
        "prompt": "What is a Trojan?",
        "answer": "Malware disguised as useful or legitimate software",
        "options": [
          "Malware disguised as useful or legitimate software",
          "A physical LAN topology",
          "A storage unit",
          "A secure encrypted protocol"
        ],
        "explanation": "Trojans mislead users into running malicious programs.",
        "id": "14-malware-10",
        "skill": "Malware and social engineering"
      }
    ]
  },
  {
    "id": "14-attacks",
    "section": "1.4",
    "spec": "1.4.1",
    "title": "Brute force, DoS, interception and SQL injection",
    "questions": [
      {
        "prompt": "What is a brute-force password attack?",
        "answer": "Trying many candidate passwords until one works",
        "options": [
          "Trying many candidate passwords until one works",
          "Deleting unused folders",
          "Backing up a server",
          "Checking RAM for errors"
        ],
        "explanation": "Brute force relies on many guesses.",
        "id": "14-attacks-1",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "What is a denial-of-service attack designed to do?",
        "answer": "Make a service unavailable to legitimate users",
        "options": [
          "Make a service unavailable to legitimate users",
          "Improve bandwidth",
          "Increase a server's storage",
          "Update the operating system"
        ],
        "explanation": "DoS overwhelms or disrupts a service.",
        "id": "14-attacks-2",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "What is data interception?",
        "answer": "Unauthorised capture of data in transit",
        "options": [
          "Unauthorised capture of data in transit",
          "Removing data that was backed up",
          "Compressing data losslessly",
          "Converting bytes to bits"
        ],
        "explanation": "Interception involves observing communications without permission.",
        "id": "14-attacks-3",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "What can SQL injection exploit?",
        "answer": "Unsafe handling of user input in database queries",
        "options": [
          "Unsafe handling of user input in database queries",
          "A damaged fibre cable",
          "An empty RAM slot",
          "Incorrect screen contrast"
        ],
        "explanation": "Malicious input may alter a database query if not safely handled.",
        "id": "14-attacks-4",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "Which attack repeatedly guesses a login password?",
        "answer": "Brute force",
        "options": [
          "Brute force",
          "Defragmentation",
          "Lossless compression",
          "Software update"
        ],
        "explanation": "Repeated password attempts are brute-force behaviour.",
        "id": "14-attacks-5",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "Which is a typical DoS consequence?",
        "answer": "A website becomes unresponsive to normal visitors",
        "options": [
          "A website becomes unresponsive to normal visitors",
          "A file suddenly gains more pixels",
          "A CPU doubles its cores",
          "A router becomes an SSD"
        ],
        "explanation": "DoS prevents normal access to services.",
        "id": "14-attacks-6",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "What is a possible risk of unencrypted intercepted traffic?",
        "answer": "Sensitive information could be read",
        "options": [
          "Sensitive information could be read",
          "The data becomes lossless",
          "All routers stop using IP",
          "The computer gains RAM"
        ],
        "explanation": "Without suitable encryption, captured content may be intelligible.",
        "id": "14-attacks-7",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "How does a distributed DoS attack differ from a single-source DoS?",
        "answer": "Traffic comes from many attacking devices",
        "options": [
          "Traffic comes from many attacking devices",
          "It can only target printers",
          "It never uses a network",
          "It always repairs the service"
        ],
        "explanation": "Distributed attacks use multiple sources to disrupt a service.",
        "id": "14-attacks-8",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "What could SQL injection lead to?",
        "answer": "Unauthorised reading or alteration of database data",
        "options": [
          "Unauthorised reading or alteration of database data",
          "A higher screen refresh rate",
          "A larger CPU cache",
          "More optical-drive capacity"
        ],
        "explanation": "Unsafe queries can expose or modify data.",
        "id": "14-attacks-9",
        "skill": "Brute force, DoS, interception and SQL injection"
      },
      {
        "prompt": "A server is overwhelmed by thousands of deliberately repeated requests. What attack does this resemble?",
        "answer": "Denial of service",
        "options": [
          "Denial of service",
          "Secure backup",
          "Password hashing",
          "Binary search"
        ],
        "explanation": "Overloading a service with requests can deny access to ordinary users.",
        "id": "14-attacks-10",
        "skill": "Brute force, DoS, interception and SQL injection"
      }
    ]
  },
  {
    "id": "14-protection",
    "section": "1.4",
    "spec": "1.4.2",
    "title": "Security protections and vulnerabilities",
    "questions": [
      {
        "prompt": "What does a firewall do?",
        "answer": "Filter network traffic according to rules",
        "options": [
          "Filter network traffic according to rules",
          "Increase CPU clock speed",
          "Convert image pixels into sound",
          "Store start-up firmware"
        ],
        "explanation": "Firewalls help block unwanted traffic.",
        "id": "14-protection-1",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "What does anti-malware software aim to do?",
        "answer": "Detect, block or remove malicious software",
        "options": [
          "Detect, block or remove malicious software",
          "Create a star topology",
          "Increase disk capacity",
          "Translate URLs into IP addresses"
        ],
        "explanation": "Anti-malware tools help identify and contain malicious code.",
        "id": "14-protection-2",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "What is penetration testing?",
        "answer": "Authorised testing to find security weaknesses",
        "options": [
          "Authorised testing to find security weaknesses",
          "Guessing passwords on others' accounts without permission",
          "Deleting all backups",
          "Rearranging file-system blocks"
        ],
        "explanation": "Penetration tests identify vulnerabilities under permission.",
        "id": "14-protection-3",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "Why use access levels?",
        "answer": "To limit which resources each user can view or change",
        "options": [
          "To limit which resources each user can view or change",
          "To guarantee that no data is backed up",
          "To increase Wi-Fi range",
          "To remove all passwords"
        ],
        "explanation": "Least privilege limits the impact of compromised accounts and mistakes.",
        "id": "14-protection-4",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "How can encryption help protect intercepted data?",
        "answer": "Captured ciphertext is difficult to understand without the key",
        "options": [
          "Captured ciphertext is difficult to understand without the key",
          "It prevents every DoS attack",
          "It adds CPU cores",
          "It replaces authentication"
        ],
        "explanation": "Encryption protects confidentiality when implemented correctly.",
        "id": "14-protection-5",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "What does physical security protect against?",
        "answer": "Unauthorised access or theft of hardware",
        "options": [
          "Unauthorised access or theft of hardware",
          "Slow internet downloads",
          "Lossy compression",
          "Arithmetic overflow"
        ],
        "explanation": "Locks and controlled entry limit direct access to devices.",
        "id": "14-protection-6",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "Which password practice best resists simple guessing?",
        "answer": "Use a long, unique password",
        "options": [
          "Use a long, unique password",
          "Use the word password",
          "Reuse the same short password everywhere",
          "Share a password with friends"
        ],
        "explanation": "Length and uniqueness strengthen passwords.",
        "id": "14-protection-7",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "Why install security updates?",
        "answer": "They can fix known software vulnerabilities",
        "options": [
          "They can fix known software vulnerabilities",
          "They change a hard disk into an SSD",
          "They always prevent every phishing attempt",
          "They increase the number of network cables"
        ],
        "explanation": "Patches can correct exploitable weaknesses.",
        "id": "14-protection-8",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "A pupil must read marks but not change them. What control fits?",
        "answer": "Read-only access permissions",
        "options": [
          "Read-only access permissions",
          "Give administrator rights to everyone",
          "Remove all authentication",
          "Leave the spreadsheet publicly writable"
        ],
        "explanation": "Permissions limit actions users can perform.",
        "id": "14-protection-9",
        "skill": "Security protections and vulnerabilities"
      },
      {
        "prompt": "Which response best reduces the risk of malware from email attachments?",
        "answer": "Check unexpected attachments and use anti-malware protection",
        "options": [
          "Check unexpected attachments and use anti-malware protection",
          "Open every file immediately",
          "Disable software updates",
          "Share login details with the sender"
        ],
        "explanation": "User caution and technical safeguards help prevent infections.",
        "id": "14-protection-10",
        "skill": "Security protections and vulnerabilities"
      }
    ]
  }
];
