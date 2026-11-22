# J277 You Do — content review, Lessons 021–040

**Status:** Unpublished teacher-review proposal · 22 November 2026. This file references exact existing RHS bank wording and verified marking rules; it is not approved for student display.

**Scope:** Map-first only. No edits to lesson HTML/JSON, JavaScript, CSS, SVG, H446, Cloudflare or student-facing configuration. Assessment Lesson 035 and feedback/reteaching Lesson 036 remain excluded from automatic four-question substitution until separately reviewed.

**Student display contract (unchanged):** Code First question → Code First question repeated with answer → four exam questions together → each answer on its own full page. Every proposed answer and associated artwork still requires teacher originality, layout and projector QA.

## Batch overview

| Lesson | Topic | RHS candidates | Unfilled positions | Status |
|---|---|---:|---:|---|
| 021 | LANs, WANs and Network Performance | 4 | 0 | Candidate set needs approval |
| 022 | Client–Server and Peer-to-Peer Networks | 2 | 2 | Bank gap; fallback not yet verified |
| 023 | Network Hardware | 3 | 1 | Bank gap; fallback not yet verified |
| 024 | The Internet, DNS and Cloud Storage | 3 | 1 | Bank gap; fallback not yet verified |
| 025 | Network Topologies | 4 | 0 | Candidate set needs approval |
| 026 | Wired and Wireless Networks | 4 | 0 | Candidate set needs approval |
| 027 | IP and MAC Addresses | 3 | 1 | Bank gap; fallback not yet verified |
| 028 | Common Network Protocols | 3 | 1 | Bank gap; fallback not yet verified |
| 029 | Standards and Protocols | 1 | 3 | Bank gap; fallback not yet verified |
| 030 | Malware and Social Engineering | 1 | 3 | Bank gap; fallback not yet verified |
| 031 | Network Attacks | 0 | 4 | Bank gap; fallback not yet verified |
| 032 | Firewalls and Network Security | 3 | 1 | Bank gap; fallback not yet verified |
| 033 | Passwords, Encryption and Penetration Testing | 2 | 2 | Bank gap; fallback not yet verified |
| 034 | Network Security Scenarios | 0 | 4 | Bank gap; fallback not yet verified |
| 035 | Autumn 2 Assessment | 0 | — | Protected exception |
| 036 | Assessment Feedback and Reteaching | 0 | — | Protected exception |
| 037 | Operating Systems: Interfaces and Memory | 2 | 2 | Bank gap; fallback not yet verified |
| 038 | Operating Systems: Files and Devices | 0 | 4 | Bank gap; fallback not yet verified |
| 039 | Utility Software | 3 | 1 | Bank gap; fallback not yet verified |
| 040 | Ethical and Social Impacts | 4 | 0 | Candidate set needs approval |

**Count:** 42 unique additional RHS bank question parts; 30 open ordinary-lesson slots. No source-question fallbacks have been asserted without inspection. No repeated RHS IDs against Lessons 001–020 or within this batch.

## Full source question text and verified marking points

### Lesson 021 — LANs, WANs and Network Performance

- **Spec:** 1.3.1
- **Original lesson:** `lessons/j277/autumn2-021.json`
- **Review note:** Compare network performance figures and terminology; a direct graph may be needed.

#### Q1: RHS-J277-179 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(a)

**RHS-authored draft:**

> An airport has a computer network connecting 20 computers within a single terminal building.
> 
> State two characteristics that make this network a LAN rather than a WAN. [2]

**Verified answer points:**

> LAN covers one terminal building; airport controls/dedicates local hardware; no reliance on external WAN infrastructure.

**Marking rule:** Any two distinct LAN characteristics, 1 each; number of computers does not distinguish LAN from WAN.

**Graphic QA:** no_visual_assumed_pending_review. Compare network performance figures and terminology; a direct graph may be needed.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-008 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q3(a)(i)

**RHS-authored draft:**

> Visitors at a museum use its network simultaneously to view digital exhibits.
> 
> Explain why a growing number of active devices may reduce network performance. [3]

**Verified answer points:**

> More concurrent traffic; shared bandwidth means less is available per active device; slower transfers/waiting/latency/retransmissions.

**Marking rule:** Up to 3 distinct valid points; do not say total network bandwidth itself decreases.

**Graphic QA:** no_visual_assumed_pending_review. Compare network performance figures and terminology; a direct graph may be needed.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-009 — 1 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q3(a)(ii)

**RHS-authored draft:**

> A museum's network becomes slow during busy periods.
> 
> Identify one factor other than the number of connected devices that could affect its performance. [1]

**Verified answer points:**

> Bandwidth, interference, medium, transmission data, network hardware, distance, topology or error rate.

**Marking rule:** 1 distinct factor; do not repeat device count.

**Graphic QA:** no_visual_assumed_pending_review. Compare network performance figures and terminology; a direct graph may be needed.

**Approval:** pending; no student-display authority.

#### Q4: RHS-J277-183 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(c)(ii)

**RHS-authored draft:**

> A hotel has noticed that its network performance changes throughout the day.
> 
> Explain how bandwidth and the number of connected users can affect network performance. [4]

**Verified answer points:**

> More bandwidth enables faster transfers because more data moves per unit time. More simultaneous users slow communication as shared bandwidth/traffic increases.

**Marking rule:** Two marks per factor: direction of effect + valid explanation.

**Graphic QA:** no_visual_assumed_pending_review. Compare network performance figures and terminology; a direct graph may be needed.

**Approval:** pending; no student-display authority.

### Lesson 022 — Client–Server and Peer-to-Peer Networks

- **Spec:** 1.3.1
- **Original lesson:** `lessons/j277/autumn2-022.json`
- **Review note:** No peer-to-peer-specific bank match for remaining slots.

#### Q1: RHS-J277-080 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q5(c)(i)

**RHS-authored draft:**

> A photographer uploads images to a hosted website from a laptop.
> 
> Identify the client in this client-server interaction and justify your answer. [3]

**Verified answer points:**

> Photographer's laptop is the client; it sends upload requests/data to web server, receives responses; doesn't host other users' data.

**Marking rule:** 1 for identifying client plus up to 2 task-specific explanation marks.

**Graphic QA:** no_visual_assumed_pending_review. No peer-to-peer-specific bank match for remaining slots.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-081 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q5(c)(ii)

**RHS-authored draft:**

> A photographer publishes images on a hosted website.
> 
> Identify the server involved in the interaction and justify your answer. [3]

**Verified answer points:**

> Hosting web server is the server; stores the uploaded images, receives/processes upload request and confirms results.

**Marking rule:** 1 server identification and up to 2 task-specific reasons.

**Graphic QA:** no_visual_assumed_pending_review. No peer-to-peer-specific bank match for remaining slots.

**Approval:** pending; no student-display authority.

### Lesson 023 — Network Hardware

- **Spec:** 1.3.1
- **Original lesson:** `lessons/j277/autumn2-023.json`
- **Review note:** Check whether existing switch/router diagrams show answers.

#### Q1: RHS-J277-012 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q3(d)

**RHS-authored draft:**

> A café's network uses a router to communicate with other networks.
> 
> Identify three different tasks that the router performs when handling network traffic. [3]

**Verified answer points:**

> Receives packets; forwards packets; maintains a routing table; chooses path; assigns addresses; translates protocols.

**Marking rule:** Any 3 distinct router tasks, not just broad use/purpose.

**Graphic QA:** no_visual_assumed_pending_review. Check whether existing switch/router diagrams show answers.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-185 — 1 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(e)(i)

**RHS-authored draft:**

> A restaurant wants to connect its LAN to the Internet.
> 
> Identify one device that could be used. [1]

**Verified answer points:**

> Router or modem.

**Marking rule:** One correct device.

**Graphic QA:** inspect_original_or_new_visual. Check whether existing switch/router diagrams show answers.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-127 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q2(c)(iii)

**RHS-authored draft:**

> An office has several laptops connected to a switch in a star network.
> 
> Describe three functions performed by the switch when devices communicate across the network. [3]

**Verified answer points:**

> Switch connects LAN devices; learns/uses MAC-address table; forwards addressed frames to destination; unknown destinations can be flooded.

**Marking rule:** Up to three distinct switch functions, one each.

**Graphic QA:** no_visual_assumed_pending_review. Check whether existing switch/router diagrams show answers.

**Approval:** pending; no student-display authority.

### Lesson 024 — The Internet, DNS and Cloud Storage

- **Spec:** 1.3.1
- **Original lesson:** `lessons/j277/autumn2-024.json`
- **Review note:** Inspect DNS/cloud storage labels in existing lesson illustrations.

#### Q1: RHS-J277-010 — 7 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q3(b)

**RHS-authored draft:**

> A community theatre lets guests visit its website.
> 
> Complete seven gaps using terms from this word bank (not every term will be used): web server, file server, clients, routers, Uniform Resource Locator, Domain Name Server, 0, 1, 255, 256, colon, full stop.
> 
> (1) A site is hosted on a ___. (2) A visiting computer is a ___. (3) A person enters a ___ into the browser. (4) The browser can request a matching IP address from a ___. (5–6) IPv4 octets use values from ___ to ___ inclusive. (7) The octets are separated by a ___. [7]

**Verified answer points:**

> Web server; clients; Uniform Resource Locator; Domain Name Server; 0; 255; full stop.

**Marking rule:** 1 per correct gap; original supplies a word bank, RHS draft needs one to match support.

**Graphic QA:** no_visual_assumed_pending_review. Inspect DNS/cloud storage labels in existing lesson illustrations.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-184 — 5 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(d)

**RHS-authored draft:**

> A sports centre is considering using cloud storage for its files.
> 
> Describe five potential drawbacks of using cloud storage. [5]

**Verified answer points:**

> Examples: continuing subscription costs; need Internet; outages; provider security/location uncertainty; less control; possible lost access or data.

**Marking rule:** One independent adequately specific drawback per mark, max 5. Avoid vague 'expensive' or 'insecure'.

**Graphic QA:** no_visual_assumed_pending_review. Inspect DNS/cloud storage labels in existing lesson illustrations.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-187 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(e)(iii)

**RHS-authored draft:**

> A museum visitor enters www.example.org into a web browser.
> 
> Describe how DNS helps the browser find the IP address needed to access the website. [4]

**Verified answer points:**

> Browser checks cache; DNS receives domain; searches records or consults higher-level DNS; returns IP to computer/browser.

**Marking rule:** Up to 4 correct distinct stages; do not say the IP is returned to the human user.

**Graphic QA:** inspect_original_or_new_visual. Inspect DNS/cloud storage labels in existing lesson illustrations.

**Approval:** pending; no student-display authority.

### Lesson 025 — Network Topologies

- **Spec:** 1.3.1
- **Original lesson:** `lessons/j277/autumn2-025.json`
- **Review note:** Topology diagrams require matching nodes and links.

#### Q1: RHS-J277-125 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q2(c)(i)

**RHS-authored draft:**

> A café is setting up a star network.
> 
> Draw a network diagram containing five laptops, two printers and one switch. Label all devices and show how they are connected. [3]

**Verified answer points:**

> Five laptops (accepted as computers), two printers, one switch, labelled; all devices arranged as a star with no extra links.

**Marking rule:** 1 correct quantities/devices, 1 valid switch-centred star links, 1 no extra devices/links; any type of computer including laptops accepted.

**Graphic QA:** inspect_original_or_new_visual. Topology diagrams require matching nodes and links.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-126 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q2(c)(ii)

**RHS-authored draft:**

> A school is considering using a star topology instead of a mesh topology for its network.
> 
> Give one benefit and one drawback of choosing the star topology. [2]

**Verified answer points:**

> Benefit: simpler expansion/fewer links/central management; drawback: central switch failure or added switch cost.

**Marking rule:** 1 suitable benefit + 1 suitable drawback; 'Give' matches original one-mark-per-point demand.

**Graphic QA:** inspect_original_or_new_visual. Topology diagrams require matching nodes and links.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-180 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(b)(i)

**RHS-authored draft:**

> A hospital is planning to install a mesh network.
> 
> Describe two characteristics of a mesh network topology. [2]

**Verified answer points:**

> Multiple device-to-device connections; alternative routes; no required central switch.

**Marking rule:** Up to two distinct valid features, 1 each.

**Graphic QA:** inspect_original_or_new_visual. Topology diagrams require matching nodes and links.

**Approval:** pending; no student-display authority.

#### Q4: RHS-J277-181 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(b)(ii)

**RHS-authored draft:**

> An airport is considering a mesh network instead of a star network.
> 
> Explain one advantage and one disadvantage of using a mesh topology. [4]

**Verified answer points:**

> Advantage e.g. alternative routes avoid single-link failure with an explanation. Disadvantage e.g. increased connections complicate installation with an explanation.

**Marking rule:** 2 for a linked benefit (point+development), 2 for a linked drawback; no unsupported speed assumption.

**Graphic QA:** inspect_original_or_new_visual. Topology diagrams require matching nodes and links.

**Approval:** pending; no student-display authority.

### Lesson 026 — Wired and Wireless Networks

- **Spec:** 1.3.2
- **Original lesson:** `lessons/j277/autumn2-026.json`
- **Review note:** Do not reuse wireless icons as proof of transmission/security details.

#### Q1: RHS-J277-123 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q2(b)(i)

**RHS-authored draft:**

> A research laboratory uses wired connections for its computers.
> 
> Describe TWO benefits of a wired LAN. For each benefit, explain how it helps the laboratory's work with measurements or large data files. [4]

**Verified answer points:**

> Two wired-LAN benefits such as high/consistent bandwidth for large research datasets or low interference for accurate transfer of measurements.

**Marking rule:** For each of TWO benefits: 1 characteristic + 1 specific application to the research laboratory; 4 total.

**Graphic QA:** no_visual_assumed_pending_review. Do not reuse wireless icons as proof of transmission/security details.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-065 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q2(b)(ii)

**RHS-authored draft:**

> An office currently uses only wired network connections.
> 
> Describe the benefits of introducing wireless connectivity alongside the wired LAN. [4]

**Verified answer points:**

> Wireless admits mobile-only devices; devices move around while connected; fewer cables reduces cost/hazards; easy to extend capacity.

**Marking rule:** Up to 4 distinct valid points; generic easier/cheaper alone not creditworthy.

**Graphic QA:** no_visual_assumed_pending_review. Do not reuse wireless icons as proof of transmission/security details.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-066 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q2(b)(iii)

**RHS-authored draft:**

> An office plans to add wireless access to its network.
> 
> State two disadvantages of using wireless connections. [2]

**Verified answer points:**

> Interference; limited signal range; reduced bandwidth/transmission rate; security risks; unreliable links or higher error rates.

**Marking rule:** 1 independent drawback each, maximum 2.

**Graphic QA:** no_visual_assumed_pending_review. Do not reuse wireless icons as proof of transmission/security details.

**Approval:** pending; no student-display authority.

#### Q4: RHS-J277-124 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q2(b)(ii)

**RHS-authored draft:**

> A research laboratory already has wired networking and wishes to support portable devices.
> 
> Explain the benefits of adding wireless access to the existing LAN. [3]

**Verified answer points:**

> Wireless permits portable devices to move; connects equipment without Ethernet ports; avoids extra cables; easier expansion.

**Marking rule:** Any three developed relevant reasons, 1 each.

**Graphic QA:** no_visual_assumed_pending_review. Do not reuse wireless icons as proof of transmission/security details.

**Approval:** pending; no student-display authority.

### Lesson 027 — IP and MAC Addresses

- **Spec:** 1.3.2
- **Original lesson:** `lessons/j277/autumn2-027.json`
- **Review note:** Check IPv4/MAC text and digit legibility.

#### Q1: RHS-J277-121 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q2(a)(i)

**RHS-authored draft:**

> A hospital connects computers within its LAN.
> 
> Give one valid IPv4 address and one valid IPv6 address for network devices. [2]

**Verified answer points:**

> IPv4 e.g. 192.168.10.2; IPv6 e.g. 2001:0db8:0000:0000:0000:0000:0000:0001.

**Marking rule:** 1 valid IPv4 and 1 valid IPv6; IPv6 uses hex groups separated by colons.

**Graphic QA:** inspect_original_or_new_visual. Check IPv4/MAC text and digit legibility.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-122 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q2(a)(ii)

**RHS-authored draft:**

> A hospital IT technician inspects a device's MAC address.
> 
> Describe how a MAC address is structured and represented. [2]

**Verified answer points:**

> Six pairs of hexadecimal digits (12 digits / 48 bits), often hyphen/colon-separated; components may identify manufacturer and device.

**Marking rule:** Any two distinct correct format details.

**Graphic QA:** inspect_original_or_new_visual. Check IPv4/MAC text and digit legibility.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-186 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q4(e)(ii)

**RHS-authored draft:**

> A shopping centre is assigning IPv4 addresses to its computers.
> 
> For each address, state whether it is valid or invalid: 192.154.21.2; 258.0.0.3; 56.1.2.66.1; 251.58.3.7. [4]

**Verified answer points:**

> 192.154.21.2 valid; 258.0.0.3 invalid; 56.1.2.66.1 invalid; 251.58.3.7 valid.

**Marking rule:** One correctly classified IPv4 address per row.

**Graphic QA:** inspect_original_or_new_visual. Check IPv4/MAC text and digit legibility.

**Approval:** pending; no student-display authority.

### Lesson 028 — Common Network Protocols

- **Spec:** 1.3.2
- **Original lesson:** `lessons/j277/autumn2-028.json`
- **Review note:** Protocol examples may need a table rather than a diagram.

#### Q1: RHS-J277-014 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q3(f)

**RHS-authored draft:**

> Staff at a sports centre use a network to send messages and visit secure websites.
> 
> Identify an appropriate protocol for (a) sending email and (b) accessing a secure web page. [2]

**Verified answer points:**

> SMTP for sending email; HTTPS for securely accessing a website.

**Marking rule:** 1 per matching protocol.

**Graphic QA:** no_visual_assumed_pending_review. Protocol examples may need a table rather than a diagram.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-062 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q2(a)(i)

**RHS-authored draft:**

> A sports centre uses online services.
> 
> Name the most suitable protocol for each task: (a) loading an ordinary news page; (b) securely logging into an online bank account; (c) downloading a file from a server; (d) checking a mailbox for new messages. [4]

**Verified answer points:**

> Ordinary webpage HTTP/HTTPS; banking HTTPS; file download FTP/HTTP/HTTPS; email retrieval IMAP/POP (including POP3).

**Marking rule:** 1 correct protocol per task, 4 total; accept multiple listed protocol alternatives.

**Graphic QA:** no_visual_assumed_pending_review. Protocol examples may need a table rather than a diagram.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-063 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q2(a)(ii)

**RHS-authored draft:**

> An online shop exchanges data using a layered set of networking protocols.
> 
> Give two reasons for using protocol layers. [2]

**Verified answer points:**

> Layers separate tasks; each layer can be developed/changed without changing other layers; developers specialise; standardisation/interoperability.

**Marking rule:** 1 per distinct reason, maximum 2.

**Graphic QA:** no_visual_assumed_pending_review. Protocol examples may need a table rather than a diagram.

**Approval:** pending; no student-display authority.

### Lesson 029 — Standards and Protocols

- **Spec:** 1.3.2
- **Original lesson:** `lessons/j277/autumn2-029.json`
- **Review note:** Standards bank coverage is very limited.

#### Q1: RHS-J277-011 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q3(c)

**RHS-authored draft:**

> A recording studio uses Ethernet connections between its computers.
> 
> Explain why Ethernet is regarded as a networking standard. [2]

**Verified answer points:**

> Widely adopted by manufacturers; ensures compatibility; reliable/proven; inexpensive to install/use; other valid features.

**Marking rule:** Up to 2 independent credited reasons.

**Graphic QA:** no_visual_assumed_pending_review. Standards bank coverage is very limited.

**Approval:** pending; no student-display authority.

### Lesson 030 — Malware and Social Engineering

- **Spec:** 1.4.1
- **Original lesson:** `lessons/j277/autumn2-030.json`
- **Review note:** Threat-specific questions sparse; original lesson fallback needs source review.

#### Q1: RHS-J277-075 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q4(b)

**RHS-authored draft:**

> An online retailer has already considered spyware, brute-force attacks, intercepted messages and SQL injection.
> 
> Name another threat to its systems and describe how it works. [3]

**Verified answer points:**

> For example phishing: deceptive email or link impersonating trusted organisation; user tricked into revealing login details.

**Marking rule:** 1 named additional threat, up to 2 specific operational details; threats already in Q4(a) excluded.

**Graphic QA:** no_visual_assumed_pending_review. Threat-specific questions sparse; original lesson fallback needs source review.

**Approval:** pending; no student-display authority.

### Lesson 031 — Network Attacks

- **Spec:** 1.4.1
- **Original lesson:** `lessons/j277/autumn2-031.json`
- **Review note:** No unused bank question securely matched to this specific lesson.

**No bank candidate selected.** Original lesson/source fallback must be separately inspected before a four-slot proposal can be completed.

### Lesson 032 — Firewalls and Network Security

- **Spec:** 1.4.2
- **Original lesson:** `lessons/j277/autumn2-032.json`
- **Review note:** Keep security diagrams free of highlighted answers.

#### Q1: RHS-J277-016 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q5(a)

**RHS-authored draft:**

> A small museum is improving access to its computers.
> 
> Identify two physical security measures it could introduce. [2]

**Verified answer points:**

> Locks; access cards/passcodes; controlled-room biometrics; alarms; CCTV; guards.

**Marking rule:** 1 per distinct physical measure; passwords for logging into software do not count.

**Graphic QA:** no_visual_assumed_pending_review. Keep security diagrams free of highlighted answers.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-017 — 6 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q5(b)

**RHS-authored draft:**

> An office wants to protect its computers and files against unauthorised access.
> 
> Identify and describe two different software-based security methods that the office could implement. [6]

**Verified answer points:**

> Two distinct software measures such as anti-malware, firewall, encryption, authentication or user access levels, each with meaningful operation.

**Marking rule:** 3 marks per method: 1 naming, up to 2 valid description points. RHS wording must explicitly ask for two.

**Graphic QA:** no_visual_assumed_pending_review. Keep security diagrams free of highlighted answers.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-074 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q4(a)

**RHS-authored draft:**

> A charity is reviewing protection against cyber attacks.
> 
> Match each threat to an appropriate prevention method from this list (a method may be used more than once): anti-malware software, penetration testing, encryption, firewall.
> 
> Threats: (a) spyware; (b) brute-force login attempts; (c) intercepted network messages; (d) SQL injection. [4]

**Verified answer points:**

> Spyware → anti-malware (penetration testing also accepted); brute force → firewall (penetration testing accepted); interception → encryption; SQL injection → firewall (penetration testing accepted).

**Marking rule:** One suitable matching method per threat, maximum 4.

**Graphic QA:** no_visual_assumed_pending_review. Keep security diagrams free of highlighted answers.

**Approval:** pending; no student-display authority.

### Lesson 033 — Passwords, Encryption and Penetration Testing

- **Spec:** 1.4.2
- **Original lesson:** `lessons/j277/autumn2-033.json`
- **Review note:** Encryption under utility software is cross-spec; verify lesson fit before approval.

#### Q1: RHS-J277-013 — 2 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q3(e)

**RHS-authored draft:**

> An office transmits confidential files across its network.
> 
> Give two reasons why the organisation should encrypt data before transmission. [2]

**Verified answer points:**

> Intercepted encrypted data cannot be understood; protects personal or confidential information; may meet legal obligations.

**Marking rule:** 1 for each of 2 independent reasons relating to data transmission.

**Graphic QA:** no_visual_assumed_pending_review. Encryption under utility software is cross-spec; verify lesson fit before approval.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-177 — 3 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q2(b)(ii)

**RHS-authored draft:**

> A hospital encrypts personal data stored on its computers.
> 
> Explain what encryption software does and how it helps protect data. [3]

**Verified answer points:**

> Makes readable data unintelligible; uses algorithm/key for encryption/decryption; intercepted data has no usable meaning.

**Marking rule:** Three separate valid points. Saying encrypted data cannot be accessed or read is not enough for final consequence.

**Graphic QA:** no_visual_assumed_pending_review. Encryption under utility software is cross-spec; verify lesson fit before approval.

**Approval:** pending; no student-display authority.

### Lesson 034 — Network Security Scenarios

- **Spec:** 1.3 / 1.4
- **Original lesson:** `lessons/j277/autumn2-034.json`
- **Review note:** Synoptic scenario: review original lesson questions rather than attaching a poorly matched bank part.

**No bank candidate selected.** Original lesson/source fallback must be separately inspected before a four-slot proposal can be completed.

### Lesson 035 — Autumn 2 Assessment

- **Spec:** 1.1 / 1.3 / 1.4
- **Original lesson:** `lessons/j277/autumn2-035.json`
- **Review note:** Preserve assessment or reteaching material unchanged.

**No bank candidate selected.** Protected assessment/feedback exception.

### Lesson 036 — Assessment Feedback and Reteaching

- **Spec:** 1.1–1.4
- **Original lesson:** `lessons/j277/autumn2-036.json`
- **Review note:** Preserve assessment or reteaching material unchanged.

**No bank candidate selected.** Protected assessment/feedback exception.

### Lesson 037 — Operating Systems: Interfaces and Memory

- **Spec:** 1.5.1
- **Original lesson:** `lessons/j277/autumn2-037.json`
- **Review note:** OS question texts may combine roles; verify scope.

#### Q1: RHS-J277-128 — 4 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q3(a)

**RHS-authored draft:**

> A theatre's computer runs an operating system.
> 
> Complete four items in an OS functions grid: name the function that (a) transfers data from secondary storage into RAM and (b) manages files and folders; describe a task for (c) peripheral management and (d) the user interface. [4]

**Verified answer points:**

> Memory management; file management; peripheral management task e.g. install printer driver; user interface task e.g. accept user input.

**Marking rule:** Four independent correct table completions; neither 'folder management' nor repeating 'manages devices' describes a task adequately.

**Graphic QA:** no_visual_assumed_pending_review. OS question texts may combine roles; verify scope.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-175 — 5 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q2(a)

**RHS-authored draft:**

> A school laptop runs an operating system.
> 
> Classify each of these five tasks under memory, peripheral, user or file management: (a) multitasking; (b) renaming a folder; (c) creating a user account; (d) installing a printer driver; (e) moving data into and out of RAM. [5]

**Verified answer points:**

> (a) memory management; (b) file management; (c) user management; (d) peripheral management; (e) memory management.

**Marking rule:** One correct row per function, max 5.

**Graphic QA:** no_visual_assumed_pending_review. OS question texts may combine roles; verify scope.

**Approval:** pending; no student-display authority.

### Lesson 038 — Operating Systems: Files and Devices

- **Spec:** 1.5.1
- **Original lesson:** `lessons/j277/autumn2-038.json`
- **Review note:** No unused bank OS question directly addresses files/devices.

**No bank candidate selected.** Original lesson/source fallback must be separately inspected before a four-slot proposal can be completed.

### Lesson 039 — Utility Software

- **Spec:** 1.5.2
- **Original lesson:** `lessons/j277/autumn2-039.json`
- **Review note:** Distinguish utilities from operating-system duties.

#### Q1: RHS-J277-079 — 1 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q5(b)

**RHS-authored draft:**

> A photography studio installs disk-maintenance and security utilities.
> 
> State why a computer uses utility software. [1]

**Verified answer points:**

> Maintain/optimise/monitor system, perform housekeeping or diagnose/fix problems.

**Marking rule:** One purpose of utility software, not just one named utility.

**Graphic QA:** no_visual_assumed_pending_review. Distinguish utilities from operating-system duties.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-129 — 6 mark(s)

**OCR reference:** OCR J277/01 · June 2024 · Q3(b)

**RHS-authored draft:**

> A business uses encryption and disk defragmentation utilities.
> 
> Complete six missing terms in descriptions of these utilities: (a) the utility that transforms readable data; (b) a value used to transform it; (c) why intercepted encrypted data cannot readily be ___; (d) the utility that reorganises fragmented files; (e) the placement of parts together in ___ locations; (f) the disk-access property improved by moving related data closer together. [6]

**Verified answer points:**

> Encryption; key; understood; defragmentation; consecutive; access.

**Marking rule:** 1 for each of six technical terms in the correct gap.

**Graphic QA:** no_visual_assumed_pending_review. Distinguish utilities from operating-system duties.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-176 — 1 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q2(b)(i)

**RHS-authored draft:**

> A hospital computer has utility programs installed.
> 
> State the purpose of utility software. [1]

**Verified answer points:**

> System maintenance, housekeeping, monitoring, optimisation or configuration.

**Marking rule:** 1 appropriate overall utility purpose; simply naming an example utility is insufficient.

**Graphic QA:** no_visual_assumed_pending_review. Distinguish utilities from operating-system duties.

**Approval:** pending; no student-display authority.

### Lesson 040 — Ethical and Social Impacts

- **Spec:** 1.6.1
- **Original lesson:** `lessons/j277/autumn2-040.json`
- **Review note:** Question context includes privacy/licensing; verify taught scope.

#### Q1: RHS-J277-015 — 8 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q4*

**RHS-authored draft:**

> A social media platform used by a college employs artificial intelligence to monitor user posts.
> 
> Discuss the potential consequences of using AI to monitor activity on social networking websites. Consider more than one viewpoint. [8]

**Verified answer points:**

> Balanced argument about automatic monitoring of posts: privacy/consent, incorrect blocks, safeguarding, copyright, legal requirements and security.

**Marking rule:** Level of response: 1–2 limited; 3–5 reasonable; 6–8 thorough, balanced, contextual and justified.

**Graphic QA:** no_visual_assumed_pending_review. Question context includes privacy/licensing; verify taught scope.

**Approval:** pending; no student-display authority.

#### Q2: RHS-J277-018 — 5 mark(s)

**OCR reference:** OCR J277/01 · June 2022 · Q5(c)

**RHS-authored draft:**

> A library wants staff to recognise when computer laws apply.
> 
> For each situation, identify the relevant legislation: (1) customer details passed to another firm without a legal basis; (2) a visitor's private address accidentally displayed online; (3) a rival copies a paid application's original graphics; (4) a person uses another staff member's unlocked computer without permission; (5) an employee guesses a colleague's password to access their account. Choose between the Data Protection Act 2018, Computer Misuse Act 1990 and Copyright, Designs and Patents Act 1988. [5]

**Verified answer points:**

> Data Protection Act 2018; Data Protection Act 2018; Copyright, Designs and Patents Act 1988; Computer Misuse Act 1990; Computer Misuse Act 1990.

**Marking rule:** 1 appropriate law per scenario, max 5.

**Graphic QA:** no_visual_assumed_pending_review. Question context includes privacy/licensing; verify taught scope.

**Approval:** pending; no student-display authority.

#### Q3: RHS-J277-084 — 8 mark(s)

**OCR reference:** OCR J277/01 · June 2023 · Q6*

**RHS-authored draft:**

> A stadium already uses CCTV and is considering face recognition to identify and track visitors.
> 
> Discuss the potential benefits and disadvantages of this use of facial recognition, including ethical, privacy and legal implications. [8]

**Verified answer points:**

> A balanced assessment of stadium facial recognition: crime prevention/safety vs surveillance, consent, data protection and privacy, fairness and risks of misuse.

**Marking rule:** 8-mark levels: basic 1–2; developed 3–5; detailed, balanced and contextual 6–8; include legal, ethical and privacy factors.

**Graphic QA:** no_visual_assumed_pending_review. Question context includes privacy/licensing; verify taught scope.

**Approval:** pending; no student-display authority.

#### Q4: RHS-J277-178 — 8 mark(s)

**OCR reference:** OCR J277/01 · June 2025 · Q3*

**RHS-authored draft:**

> A company making smartwatches reduces manufacturing costs and plans to stop releasing software updates much sooner.
> 
> Discuss the ethical, environmental and commercial consequences for the business, users and society. Consider advantages and disadvantages. [8]

**Verified answer points:**

> Consider cheaper devices and shorter update support: customer costs and transparency, company profit/reputation, electronic waste, recycling and replacement frequency.

**Marking rule:** Levels of response 1–2 basic, 3–5 developed, 6–8 balanced, contextual, justified; top band covers both company/customer, ethical and environmental factors.

**Graphic QA:** no_visual_assumed_pending_review. Question context includes privacy/licensing; verify taught scope.

**Approval:** pending; no student-display authority.
