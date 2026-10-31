// Original RHSC H446 1.5 MCQs. Ordered ethics sets model an argument; options are shuffled.
const SKILLS = [
  {
    "id": "15-data-law",
    "section": "1.5",
    "spec": "1.5.1(a)",
    "title": "Data protection: syllabus and application",
    "lessons": [
      157
    ],
    "page": 208,
    "questions": [
      {
        "id": "15-data-law-1",
        "prompt": "Which Data Protection Act is explicitly named in the OCR H446 specification?",
        "answer": "Data Protection Act 1998",
        "options": [
          "Data Protection Act 1998",
          "Data Protection Act 2018 only",
          "Computer Misuse Act 1990",
          "RIPA 2000"
        ],
        "explanation": "OCR names the historical 1998 Act. Distinguish that syllabus wording from the current UK framework rather than presenting the 1998 Act as current law.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-2",
        "prompt": "Which framework governs UK data protection today, as amended?",
        "answer": "UK GDPR and DPA 2018",
        "options": [
          "UK GDPR and DPA 2018",
          "DPA 1998 alone",
          "Copyright Act alone",
          "RIPA alone"
        ],
        "explanation": "The current framework includes UK GDPR and the Data Protection Act 2018, as amended; the 1998 Act is the historical specification reference.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-3",
        "prompt": "A school collects full family histories for a simple library account. Which principle is most directly relevant?",
        "answer": "Data minimisation",
        "options": [
          "Data minimisation",
          "Copyright ownership",
          "Unauthorised access only",
          "Packet sequencing"
        ],
        "explanation": "Collecting information beyond the stated need raises minimisation concerns. Explain which data is unnecessary and why, instead of merely naming a principle.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-4",
        "prompt": "An address is recorded incorrectly and affects messages home. Which principle most directly supports correction?",
        "answer": "Accuracy",
        "options": [
          "Accuracy",
          "Storage limitation only",
          "Copyright licensing",
          "Network interoperability"
        ],
        "explanation": "Personal information should be accurate and corrected where appropriate; the address error makes this principle directly relevant.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-5",
        "prompt": "A service keeps identifiable records indefinitely with no justified purpose. Which principle is most directly relevant?",
        "answer": "Storage limitation",
        "options": [
          "Storage limitation",
          "Pixel resolution",
          "Software copyright",
          "Public-key distribution"
        ],
        "explanation": "Keeping personal information longer than needed raises storage-limitation concerns. Retention should be justified by its purpose rather than indefinite by default.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-6",
        "prompt": "A staff member sends identifiable pupil records to an unrelated company. Which legal area is most directly relevant?",
        "answer": "Data protection",
        "options": [
          "Data protection",
          "Copyright alone",
          "Patent registration alone",
          "CPU scheduling"
        ],
        "explanation": "Sharing identifiable records involves handling personal data. The purpose, lawful basis, security and permitted disclosure matter; identifying a person does not depend on the file format.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-7",
        "prompt": "Does obtaining consent remove every other data-protection responsibility?",
        "answer": "No",
        "options": [
          "No",
          "Yes, if a box is ticked",
          "Yes, if the user is an adult",
          "Only for electronic records"
        ],
        "explanation": "Consent is not a blanket exemption from minimisation, accuracy, security and other obligations; consent is also not the only possible lawful basis.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-8",
        "prompt": "A school restricts sensitive records to staff who need them. Which concern is this addressing?",
        "answer": "Security and confidentiality",
        "options": [
          "Security and confidentiality",
          "A compulsory public licence",
          "The length of an HTML title",
          "Compression ratio"
        ],
        "explanation": "Appropriate access controls reduce unauthorised disclosure of personal information; they do not by themselves settle every data-protection duty.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-9",
        "prompt": "Does removing names automatically make a detailed pupil dataset anonymous?",
        "answer": "No, re-identification may remain",
        "options": [
          "No, re-identification may remain",
          "Yes, in every case",
          "Yes, if saved as CSV",
          "Only if compressed"
        ],
        "explanation": "Combinations of other fields can still identify people. Anonymity depends on whether individuals can be identified, not just whether the name column is absent.",
        "skill": "Data protection: syllabus and application"
      },
      {
        "id": "15-data-law-10",
        "prompt": "Which statement best distinguishes a legal and ethical judgement about data use?",
        "answer": "Lawfulness does not settle fairness",
        "options": [
          "Lawfulness does not settle fairness",
          "Legal use is always ethical",
          "Ethical concern proves a crime",
          "Consent settles every ethical issue"
        ],
        "explanation": "A use can raise ethical concerns even if legally permitted. Apply legal rules accurately, then evaluate effects and fairness rather than treating the two questions as identical.",
        "skill": "Data protection: syllabus and application"
      }
    ]
  },
  {
    "id": "15-misuse",
    "section": "1.5",
    "spec": "1.5.1(b)",
    "title": "Computer Misuse Act: permission and acts",
    "lessons": [
      158
    ],
    "page": 208,
    "questions": [
      {
        "id": "15-misuse-1",
        "prompt": "A pupil knowingly uses a teacher’s password without permission to read private files. Which Act is most directly relevant?",
        "answer": "Computer Misuse Act 1990",
        "options": [
          "Computer Misuse Act 1990",
          "Copyright Act 1988 only",
          "DPA 1998 only",
          "RIPA 2000 only"
        ],
        "explanation": "Knowingly causing a computer to access material without authorisation engages the Computer Misuse Act. A working password does not establish permission.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-2",
        "prompt": "A person reads restricted records without permission but changes nothing. Is lack of modification enough to rule out unauthorised-access concerns?",
        "answer": "No",
        "options": [
          "No",
          "Yes, reading is always permitted",
          "Yes, if no file is copied",
          "Only if the records are small"
        ],
        "explanation": "Unauthorised access can be the issue even when no modification or copying occurs. Focus on permission and the intentional access.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-3",
        "prompt": "What is most important before performing a penetration test on someone else’s system?",
        "answer": "Clear authorisation and scope",
        "options": [
          "Clear authorisation and scope",
          "A fast internet connection only",
          "Owning security software",
          "Knowing a valid password"
        ],
        "explanation": "Testing needs appropriate permission with defined scope. A helpful motive or possession of tools does not itself authorise access.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-4",
        "prompt": "An employee is allowed to use email but deliberately accesses a restricted payroll system. What matters most?",
        "answer": "Permission for that access",
        "options": [
          "Permission for that access",
          "Employment alone",
          "Office opening hours",
          "The file extension"
        ],
        "explanation": "General employment or some legitimate access does not automatically authorise access to every system or type of data.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-5",
        "prompt": "An attacker deliberately deploys malware to disrupt a service without authorisation. Which Act is most directly relevant?",
        "answer": "Computer Misuse Act 1990",
        "options": [
          "Computer Misuse Act 1990",
          "Copyright Act alone",
          "Patent legislation alone",
          "RIPA alone"
        ],
        "explanation": "Unauthorised acts intended to impair computer operation fall within the Computer Misuse Act; the act and its intent matter.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-6",
        "prompt": "Someone guesses an account password and knowingly accesses it without permission. What is the strongest explanation of the issue?",
        "answer": "Valid credentials are not permission",
        "options": [
          "Valid credentials are not permission",
          "Guessing makes it authorised",
          "No law applies without payment",
          "Only copied files are relevant"
        ],
        "explanation": "Successfully authenticating technically is different from having authorisation. Explain the deliberate unpermitted access.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-7",
        "prompt": "A developer tests only their own isolated lab system. What distinguishes this from attacking an unrelated server?",
        "answer": "Authority over the test target",
        "options": [
          "Authority over the test target",
          "The programming language used",
          "The same tool is always illegal",
          "The lab has fewer files"
        ],
        "explanation": "Permission and scope distinguish legitimate testing from unauthorised acts; a tool’s name alone does not determine the legal issue.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-8",
        "prompt": "An account is left logged in. A visitor knowingly reads files they are not allowed to access. Does the open session itself grant permission?",
        "answer": "No",
        "options": [
          "No",
          "Yes, the screen was unlocked",
          "Yes, if nothing is changed",
          "Only until the owner returns"
        ],
        "explanation": "An unlocked device or session does not itself authorise a visitor to access restricted material.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-9",
        "prompt": "Why should a security report distinguish accidental errors from intentional unauthorised acts?",
        "answer": "Knowledge and intent matter",
        "options": [
          "Knowledge and intent matter",
          "Every error is a cybercrime",
          "Damage is irrelevant in every case",
          "A report replaces legal rules"
        ],
        "explanation": "The relevant offences have particular elements, including knowledge or intent. Do not label every mistake as a Computer Misuse Act offence.",
        "skill": "Computer Misuse Act: permission and acts"
      },
      {
        "id": "15-misuse-10",
        "prompt": "Which is the strongest scenario-linked explanation of a misuse concern?",
        "answer": "They knowingly accessed restricted files without permission",
        "options": [
          "They knowingly accessed restricted files without permission",
          "They used a computer at work",
          "The device had internet access",
          "The data was stored electronically"
        ],
        "explanation": "The first explanation identifies the intentional access and missing authorisation; the others describe ordinary computer use without establishing the issue.",
        "skill": "Computer Misuse Act: permission and acts"
      }
    ]
  },
  {
    "id": "15-copyright-law",
    "section": "1.5",
    "spec": "1.5.1(c)",
    "title": "Copyright: ownership and permitted use",
    "lessons": [
      159
    ],
    "page": 208,
    "questions": [
      {
        "id": "15-copyright-law-1",
        "prompt": "Which named Act protects copyright works such as original software code?",
        "answer": "Copyright, Designs and Patents Act 1988",
        "options": [
          "Copyright, Designs and Patents Act 1988",
          "Computer Misuse Act 1990",
          "DPA 1998",
          "RIPA 2000"
        ],
        "explanation": "The Copyright, Designs and Patents Act 1988 covers copyright protection, including computer programs; permission and applicable exceptions affect permitted use.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-2",
        "prompt": "A pupil uploads a commercial program for everyone to copy without permission. What is the main issue?",
        "answer": "Unauthorised distribution",
        "options": [
          "Unauthorised distribution",
          "Automatic loss of all copyright",
          "A DNS failure",
          "A compulsory patent application"
        ],
        "explanation": "Distribution can infringe copyright when not authorised or covered by an applicable exception. Ease of copying does not provide permission.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-3",
        "prompt": "Does finding an image through a search engine grant unrestricted reuse rights?",
        "answer": "No",
        "options": [
          "No",
          "Yes, it is searchable",
          "Yes, if downloaded once",
          "Only when the file is small"
        ],
        "explanation": "Public accessibility is not the same as permission to copy or redistribute. Check the licence, ownership and any applicable exception.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-4",
        "prompt": "A developer releases code under an open-source licence. What should a reuser do?",
        "answer": "Follow the licence conditions",
        "options": [
          "Follow the licence conditions",
          "Assume copyright has vanished",
          "Remove all attribution by default",
          "Treat every licence as identical"
        ],
        "explanation": "Open-source licences permit specified uses subject to their terms; different licences impose different requirements.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-5",
        "prompt": "Does crediting the creator always replace the need for permission?",
        "answer": "No",
        "options": [
          "No",
          "Yes, for every copied work",
          "Yes, if the creator is famous",
          "Only in a web page footer"
        ],
        "explanation": "Attribution and permission are different. Some uses may require permission or a licence even where the author is named.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-6",
        "prompt": "A school has a licence for 30 installations and plans 50. What should it check first?",
        "answer": "Whether the licence permits 50",
        "options": [
          "Whether the licence permits 50",
          "Whether the files can be compressed",
          "Whether all computers look alike",
          "Whether the program starts quickly"
        ],
        "explanation": "A working installer does not establish permission for additional installations; the licence’s scope and terms matter.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-7",
        "prompt": "Which reason best challenges “it is easy to copy, so it is acceptable”?",
        "answer": "Technical ease does not grant rights",
        "options": [
          "Technical ease does not grant rights",
          "All copies must damage the original",
          "Every free work has no owner",
          "Copyright depends on download speed"
        ],
        "explanation": "Ethical and legal permission is not established by how easily a digital copy can be made.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-8",
        "prompt": "Can some copying be permitted by a licence or a relevant legal exception?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, every copy is unlawful",
          "Only if the work is anonymous",
          "Only if no computer is used"
        ],
        "explanation": "Copyright rules include permissions and defined exceptions. Avoid the false claim that all copying is prohibited.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-9",
        "prompt": "A developer copies another’s code and calls it entirely their own. Which distinction is useful?",
        "answer": "Authorship and reuse permission both matter",
        "options": [
          "Authorship and reuse permission both matter",
          "Renaming variables removes copyright",
          "No issue exists if it compiles",
          "Text files cannot contain protected work"
        ],
        "explanation": "Misrepresenting authorship is an integrity concern, while copying may also breach copyright or licence terms; identify both accurately.",
        "skill": "Copyright: ownership and permitted use"
      },
      {
        "id": "15-copyright-law-10",
        "prompt": "Which question most directly checks whether a planned reuse is authorised?",
        "answer": "What rights or licence cover this use?",
        "options": [
          "What rights or licence cover this use?",
          "How many pixels are in the logo?",
          "Which processor runs the editor?",
          "How long is the file name?"
        ],
        "explanation": "The relevant permissions depend on the intended use and applicable rights or exceptions, not technical file properties.",
        "skill": "Copyright: ownership and permitted use"
      }
    ]
  },
  {
    "id": "15-ripa",
    "section": "1.5",
    "spec": "1.5.1(d)",
    "title": "RIPA: powers, purpose and safeguards",
    "lessons": [
      160
    ],
    "page": 208,
    "questions": [
      {
        "id": "15-ripa-1",
        "prompt": "What is the general subject of RIPA 2000 in the OCR syllabus?",
        "answer": "Investigatory and surveillance powers",
        "options": [
          "Investigatory and surveillance powers",
          "Ownership of all software",
          "General database normalisation",
          "CPU interrupt priorities"
        ],
        "explanation": "RIPA regulates specified investigatory activities, including surveillance and interception-related matters. It is not blanket permission for anyone to monitor anyone.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-2",
        "prompt": "Does RIPA give every employer unrestricted permission to read all communication?",
        "answer": "No",
        "options": [
          "No",
          "Yes, for every employee",
          "Yes, if software is installed",
          "Only if the employer owns a router"
        ],
        "explanation": "RIPA is not a universal permission slip. Authority, applicable rules, purpose and safeguards must be considered.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-3",
        "prompt": "Why does a discussion of investigatory powers consider proportionality?",
        "answer": "Intrusion should be justified by the aim",
        "options": [
          "Intrusion should be justified by the aim",
          "All investigations must be public",
          "More data is always better",
          "A password removes every safeguard"
        ],
        "explanation": "Proportionality weighs the interference with people against the legitimate objective rather than assuming any possible benefit justifies unlimited intrusion.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-4",
        "prompt": "What should distinguish authorised investigatory activity from arbitrary snooping?",
        "answer": "A lawful authority and safeguards",
        "options": [
          "A lawful authority and safeguards",
          "A hidden browser window",
          "A larger hard disk",
          "A public social-media account"
        ],
        "explanation": "A valid investigatory basis and required safeguards matter; secrecy or technical capability alone does not establish authorisation.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-5",
        "prompt": "Why should students avoid saying RIPA 2000 is the whole of current UK investigatory law?",
        "answer": "The legal framework has evolved",
        "options": [
          "The legal framework has evolved",
          "RIPA concerns only HTML",
          "No surveillance law exists now",
          "Every older Act is meaningless"
        ],
        "explanation": "RIPA remains a syllabus reference, while later legislation and amendments also form part of the relevant framework. Avoid presenting a static, complete account of current law.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-6",
        "prompt": "A proposal gathers unrelated people’s private information during an investigation. Which concern is directly relevant?",
        "answer": "Collateral intrusion",
        "options": [
          "Collateral intrusion",
          "A hash-table collision",
          "Lossless compression",
          "Compiler optimisation"
        ],
        "explanation": "People beyond the investigation’s target can be affected. Necessity, proportionality and safeguards address such intrusions.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-7",
        "prompt": "Which is the strongest explanation of why oversight matters?",
        "answer": "Check powers are used within limits",
        "options": [
          "Check powers are used within limits",
          "Guarantee every suspicion is correct",
          "Remove all investigation costs",
          "Allow any official to ignore rules"
        ],
        "explanation": "Oversight supports accountability and checks lawful limits; it does not guarantee the accuracy of every inference.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-8",
        "prompt": "Does a useful result retrospectively prove that any surveillance method was authorised?",
        "answer": "No",
        "options": [
          "No",
          "Yes, if it helped",
          "Yes, if no complaint was made",
          "Only if the result was electronic"
        ],
        "explanation": "A useful outcome does not itself establish that the method had the required authority or complied with safeguards.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-9",
        "prompt": "Which question should accompany a claim that surveillance is necessary?",
        "answer": "Could a less intrusive method meet the aim?",
        "options": [
          "Could a less intrusive method meet the aim?",
          "Could we collect everything forever?",
          "Could every record be made public?",
          "Could oversight be removed to save time?"
        ],
        "explanation": "Considering alternatives helps evaluate whether the intrusion is justified rather than treating surveillance as the only possible response.",
        "skill": "RIPA: powers, purpose and safeguards"
      },
      {
        "id": "15-ripa-10",
        "prompt": "Which statement keeps legal application separate from ethical evaluation?",
        "answer": "Lawful activity can still raise ethical concerns",
        "options": [
          "Lawful activity can still raise ethical concerns",
          "Every ethical concern proves illegality",
          "RIPA settles every privacy debate",
          "Public authorities have no limits"
        ],
        "explanation": "Identify the relevant powers and safeguards accurately, then evaluate fairness and consequences. Legal permission does not answer every ethical question.",
        "skill": "RIPA: powers, purpose and safeguards"
      }
    ]
  },
  {
    "id": "15-monitoring",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: school AI monitoring",
    "lessons": [
      296
    ],
    "page": 209,
    "ordered": true,
    "sets": [
      {
        "title": "School device alerts",
        "scenario": "A fictional school proposes AI monitoring on school-managed devices. It flags potentially concerning activity for trained safeguarding staff, who check context before acting. There are no automatic sanctions."
      },
      {
        "title": "Automatic sanctions",
        "scenario": "The school changes the proposal: every alert now triggers an automatic detention. Pupils can appeal afterwards. Staff say this will reduce the time spent deciding initial sanctions."
      }
    ],
    "questions": [
      {
        "id": "15-monitoring-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Pupils could receive earlier safeguarding support.",
        "options": [
          "Pupils could receive earlier safeguarding support.",
          "The monitoring software could run on school devices.",
          "The supplier would choose a name for the system.",
          "Trial it with prompt review, limited collection and a route to challenge errors."
        ],
        "explanation": "The point names an affected stakeholder and a specific possible benefit. Device location and supplier naming describe the system; being affected is too vague. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Point",
        "model": "Pupils could receive earlier safeguarding support."
      },
      {
        "id": "15-monitoring-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Alerts could identify concerning activity sooner than manual review.",
        "options": [
          "Alerts could identify concerning activity sooner than manual review.",
          "Support could be earlier because it would happen sooner.",
          "The alerts would prove which pupils need intervention.",
          "Trial it with prompt review, limited collection and a route to challenge errors."
        ],
        "explanation": "The explanation supplies a mechanism for earlier support. Repeating “earlier” adds no cause, and an alert is not proof. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Explanation",
        "model": "Alerts could identify concerning activity sooner than manual review."
      },
      {
        "id": "15-monitoring-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Prompt staff checks could lead to help before a concern escalates.",
        "options": [
          "Prompt staff checks could lead to help before a concern escalates.",
          "The school could say the system gives earlier support.",
          "Pupils could benefit because the software has an alert feature.",
          "Trial it with prompt review, limited collection and a route to challenge errors."
        ],
        "explanation": "The consequence connects prompt checking to an outcome for pupils. A feature description or repeated benefit is not a developed effect, and prevention is not guaranteed. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Consequence",
        "model": "Prompt staff checks could lead to help before a concern escalates."
      },
      {
        "id": "15-monitoring-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "False alerts could distress pupils and divert staff from genuine concerns.",
        "options": [
          "False alerts could distress pupils and divert staff from genuine concerns.",
          "The system may have a different name from its predecessor.",
          "An automated alert would make the original benefit certain.",
          "Trial it with prompt review, limited collection and a route to challenge errors."
        ],
        "explanation": "This challenges the benefit with a relevant competing consequence. More alerts are not automatically better if they consume attention or misinterpret activity. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Counterargument",
        "model": "False alerts could distress pupils and divert staff from genuine concerns."
      },
      {
        "id": "15-monitoring-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Trial it with prompt review, limited collection and a route to challenge errors.",
        "options": [
          "Trial it with prompt review, limited collection and a route to challenge errors.",
          "Use it because any safeguarding benefit outweighs privacy costs, even if staff cannot check alerts promptly or pupils cannot challenge mistakes.",
          "Reject it because all automated tools produce the same harm.",
          "Decide only from how many staff prefer each colour scheme."
        ],
        "explanation": "The judgement supports a limited trial subject to safeguards that address the risks. It is stronger than an absolute claim or an unrelated preference; evidence could still justify a different decision.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Judgement",
        "model": "Trial it with prompt review, limited collection and a route to challenge errors."
      },
      {
        "id": "15-monitoring-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Automatic sanctions could reduce staff time spent on initial decisions.",
        "options": [
          "Automatic sanctions could reduce staff time spent on initial decisions.",
          "Automatic sanctions could be introduced after buying software.",
          "The school could install alerts on several devices.",
          "Require review before sanctions; the time saving does not justify unverified punishment."
        ],
        "explanation": "The point identifies a specific potential effect on staff. The alternatives describe implementation or attitudes without a developed benefit. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Point",
        "model": "Automatic sanctions could reduce staff time spent on initial decisions."
      },
      {
        "id": "15-monitoring-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "The system would issue sanctions without staff assessing each initial alert.",
        "options": [
          "The system would issue sanctions without staff assessing each initial alert.",
          "Decision time could fall because decisions might take less time.",
          "Appeals would establish that every initial alert was justified.",
          "Require review before sanctions; the time saving does not justify unverified punishment."
        ],
        "explanation": "This explains the proposed time saving through automation. It does not treat speed as proof of accuracy or assume contextual understanding. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Explanation",
        "model": "The system would issue sanctions without staff assessing each initial alert."
      },
      {
        "id": "15-monitoring-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Staff might have more time for other tasks if appeal work stays manageable.",
        "options": [
          "Staff might have more time for other tasks if appeal work stays manageable.",
          "The system might be described as an efficient way to make decisions.",
          "The saved time would necessarily improve every pupil’s results.",
          "Require review before sanctions; the time saving does not justify unverified punishment."
        ],
        "explanation": "The consequence develops the effect on workload and recognises a condition. Appeals could consume the initial saving, so the benefit is not unconditional. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Consequence",
        "model": "Staff might have more time for other tasks if appeal work stays manageable."
      },
      {
        "id": "15-monitoring-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "A false alert could punish legitimate research before an appeal is heard.",
        "options": [
          "A false alert could punish legitimate research before an appeal is heard.",
          "Some detention notices might be delivered on a different day.",
          "Using more computers would make staff time less important.",
          "Require review before sanctions; the time saving does not justify unverified punishment."
        ],
        "explanation": "The challenge explains a specific fairness cost. A later appeal may correct the decision but cannot erase all distress or lost time caused beforehand. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Counterargument",
        "model": "A false alert could punish legitimate research before an appeal is heard."
      },
      {
        "id": "15-monitoring-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Require review before sanctions; the time saving does not justify unverified punishment.",
        "options": [
          "Require review before sanctions; the time saving does not justify unverified punishment.",
          "Keep automatic sanctions because appeals can correct errors later, even though an initial false detention could already have harmed a pupil.",
          "Reject every safeguarding alert regardless of how it is reviewed.",
          "Support it because the proposal mentions both staff and pupils."
        ],
        "explanation": "This judgement weighs the claimed saving against harm before review. It targets the changed sanction rule rather than rejecting every possible use of alerts.",
        "skill": "Build an argument: school AI monitoring",
        "stage": "Judgement",
        "model": "Require review before sanctions; the time saving does not justify unverified punishment."
      }
    ],
    "writing": {
      "prompt": "A school proposes checking alerts only at the end of each month. Write three sentences judging whether the earlier-support benefit still justifies a trial.",
      "model": "Earlier support is a possible benefit only if alerts are checked soon enough to help. Monthly checks could let a concern escalate while pupils remain under monitoring. I would delay this proposal until the school can provide timely review; collecting alerts without capacity to act weakens the main justification."
    }
  },
  {
    "id": "15-workforce",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: computers in the workforce",
    "lessons": [
      296
    ],
    "page": 214,
    "ordered": true,
    "sets": [
      {
        "title": "Staff triage",
        "scenario": "A school proposes software to group routine pupil-support requests before staff review. It expects less manual sorting, but staff will need training and must check unusual cases."
      },
      {
        "title": "Replacing an admin task",
        "scenario": "A company proposes automating routine data entry. Some tasks would disappear, and it offers existing clerical staff training for data-quality roles. Access to training may vary by shift."
      }
    ],
    "questions": [
      {
        "id": "15-workforce-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Support staff could spend less time manually sorting routine requests.",
        "options": [
          "Support staff could spend less time manually sorting routine requests.",
          "The school could store the requests in a digital table.",
          "The software would have several settings for staff to choose.",
          "Pilot it and compare total workload, with training and staff input before expansion."
        ],
        "explanation": "The point gives a specific possible workload effect for a stakeholder. A storage feature or claim about everyone’s reaction does not establish that benefit. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Point",
        "model": "Support staff could spend less time manually sorting routine requests."
      },
      {
        "id": "15-workforce-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Software would group standard requests before staff begin their review.",
        "options": [
          "Software would group standard requests before staff begin their review.",
          "Sorting would take less time because it would be faster.",
          "The software would remove the need for professional judgement.",
          "Pilot it and compare total workload, with training and staff input before expansion."
        ],
        "explanation": "This explains the mechanism: an automated first grouping. Staff still need to interpret cases; neither automation nor training guarantees correctness. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Explanation",
        "model": "Software would group standard requests before staff begin their review."
      },
      {
        "id": "15-workforce-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Staff could use the saved time for complex cases that need judgement.",
        "options": [
          "Staff could use the saved time for complex cases that need judgement.",
          "Staff could call the process a modern sorting system.",
          "Every support role would disappear as soon as it was installed.",
          "Pilot it and compare total workload, with training and staff input before expansion."
        ],
        "explanation": "The consequence develops how saved time could improve staff work. It avoids assuming that automating one task eliminates a whole role. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Consequence",
        "model": "Staff could use the saved time for complex cases that need judgement."
      },
      {
        "id": "15-workforce-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Training and correction work could absorb the expected time saving.",
        "options": [
          "Training and correction work could absorb the expected time saving.",
          "The new workflow would still contain requests and categories.",
          "A quicker first step would make all later work quicker too.",
          "Pilot it and compare total workload, with training and staff input before expansion."
        ],
        "explanation": "This is a relevant limitation on the saving. Total workload includes training, checking and correction rather than only the first sorting step. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Counterargument",
        "model": "Training and correction work could absorb the expected time saving."
      },
      {
        "id": "15-workforce-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Pilot it and compare total workload, with training and staff input before expansion.",
        "options": [
          "Pilot it and compare total workload, with training and staff input before expansion.",
          "Expand it from the supplier’s sorting-speed claim alone, even though that measure excludes staff training, corrections and the time spent on unusual cases.",
          "Reject it because every change necessarily removes every job.",
          "Approve it based only on the supplier’s promised sorting speed."
        ],
        "explanation": "The judgement tests whether the overall benefit survives the costs and includes people affected by the transition. A single speed claim is insufficient.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Judgement",
        "model": "Pilot it and compare total workload, with training and staff input before expansion."
      },
      {
        "id": "15-workforce-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Clerical staff could gain new data-quality responsibilities.",
        "options": [
          "Clerical staff could gain new data-quality responsibilities.",
          "Automation would require a choice of software supplier.",
          "Every staff member would prefer a new role immediately.",
          "Support a phased change only with accessible training and evidence of suitable roles."
        ],
        "explanation": "The point identifies an opportunity for workers, without assuming all staff will experience the transition in the same way. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Point",
        "model": "Clerical staff could gain new data-quality responsibilities."
      },
      {
        "id": "15-workforce-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Automation could leave staff checking exceptions instead of retyping standard data.",
        "options": [
          "Automation could leave staff checking exceptions instead of retyping standard data.",
          "The new roles would be valuable because they would be new.",
          "The software would learn every skill each employee has.",
          "Support a phased change only with accessible training and evidence of suitable roles."
        ],
        "explanation": "The explanation connects the changed task to a changed role. Newness and a general training promise do not establish the mechanism or fair access. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Explanation",
        "model": "Automation could leave staff checking exceptions instead of retyping standard data."
      },
      {
        "id": "15-workforce-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Suitable training could help staff retain employment while using different skills.",
        "options": [
          "Suitable training could help staff retain employment while using different skills.",
          "Staff would continue to have job titles after the change.",
          "The change would remove every future employment risk.",
          "Support a phased change only with accessible training and evidence of suitable roles."
        ],
        "explanation": "This develops an effect on employment and skills, conditional on suitable training rather than guaranteed by automation itself. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Consequence",
        "model": "Suitable training could help staff retain employment while using different skills."
      },
      {
        "id": "15-workforce-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Shift patterns could exclude some staff from the training they need.",
        "options": [
          "Shift patterns could exclude some staff from the training they need.",
          "The software could use a different icon from the old system.",
          "A new role would automatically be suitable for every worker.",
          "Support a phased change only with accessible training and evidence of suitable roles."
        ],
        "explanation": "The limitation identifies unequal access to the proposed opportunity. The presence of a training scheme does not show that everyone can use it. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Counterargument",
        "model": "Shift patterns could exclude some staff from the training they need."
      },
      {
        "id": "15-workforce-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Support a phased change only with accessible training and evidence of suitable roles.",
        "options": [
          "Support a phased change only with accessible training and evidence of suitable roles.",
          "Automate at once because new data-quality roles are promised, even if some shifts cannot access training and no suitable roles have been confirmed.",
          "Reject all retraining because established skills never transfer.",
          "Choose the option with the shortest description of staff duties."
        ],
        "explanation": "The judgement weighs the possible opportunity against unequal access and transition risks, with conditions that address those concerns.",
        "skill": "Build an argument: computers in the workforce",
        "stage": "Judgement",
        "model": "Support a phased change only with accessible training and evidence of suitable roles."
      }
    ],
    "writing": {
      "prompt": "A firm promises retraining but provides it only during unpaid weekends. Write three sentences evaluating the effect on workers.",
      "model": "Retraining could help staff move into new roles, but unpaid weekends may exclude people with caring duties or other commitments. Those workers could lose opportunities despite the promise of support. I would require accessible paid training before treating retraining as sufficient justification for the transition."
    }
  },
  {
    "id": "15-decisions",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: automated decisions",
    "lessons": [
      296
    ],
    "page": 209,
    "ordered": true,
    "sets": [
      {
        "title": "Support allocation",
        "scenario": "A college proposes automatically allocating extra support from attendance and test scores. Staff would review the allocations weekly; missing records are common during transfers between systems."
      },
      {
        "title": "Human review removed",
        "scenario": "The college removes weekly review to cut costs. Pupils denied support can request a review, but the online request form is difficult to find."
      }
    ],
    "questions": [
      {
        "id": "15-decisions-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Pupils might be identified for extra support more consistently.",
        "options": [
          "Pupils might be identified for extra support more consistently.",
          "The college could import attendance into the same spreadsheet.",
          "The support list might contain pupils from several classes.",
          "Use recommendations only with checked records and timely staff review of allocation."
        ],
        "explanation": "The point identifies a possible benefit for pupils. Consistency concerns applying rules; it does not mean that inputs or decisions are correct. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Point",
        "model": "Pupils might be identified for extra support more consistently."
      },
      {
        "id": "15-decisions-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "The same stated allocation rules would be applied to each supplied record.",
        "options": [
          "The same stated allocation rules would be applied to each supplied record.",
          "Consistency would improve because allocation would be consistent.",
          "Attendance alone would reveal why every pupil missed lessons.",
          "Use recommendations only with checked records and timely staff review of allocation."
        ],
        "explanation": "The explanation gives a mechanism for consistency without equating consistent rules with complete context, accuracy or neutrality. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Explanation",
        "model": "The same stated allocation rules would be applied to each supplied record."
      },
      {
        "id": "15-decisions-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Pupils overlooked by an informal process could receive a support review.",
        "options": [
          "Pupils overlooked by an informal process could receive a support review.",
          "Pupils would appear on a list containing their support allocation.",
          "Every pupil’s support need would necessarily be met immediately.",
          "Use recommendations only with checked records and timely staff review of allocation."
        ],
        "explanation": "The consequence develops who might benefit and how. Appearing on a list alone is not proof that effective support follows. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Consequence",
        "model": "Pupils overlooked by an informal process could receive a support review."
      },
      {
        "id": "15-decisions-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Missing records could lead to unsuitable allocations before the weekly review.",
        "options": [
          "Missing records could lead to unsuitable allocations before the weekly review.",
          "The college might run the process at a different time of day.",
          "All pupils would prefer automatic allocation to a staff discussion.",
          "Use recommendations only with checked records and timely staff review of allocation."
        ],
        "explanation": "The challenge links poor data to real allocation effects. Consistent processing cannot repair missing information by itself. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Counterargument",
        "model": "Missing records could lead to unsuitable allocations before the weekly review."
      },
      {
        "id": "15-decisions-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Use recommendations only with checked records and timely staff review of allocation.",
        "options": [
          "Use recommendations only with checked records and timely staff review of allocation.",
          "Allocate support automatically because the same rules apply to everyone, even when missing records could give some pupils unsuitable allocations.",
          "Reject any use of test scores because missing data exists somewhere.",
          "Approve it if the list looks clearer than the previous spreadsheet."
        ],
        "explanation": "The judgement weighs consistency against data quality and review timing. The conditions address the mechanism causing the risk.",
        "skill": "Build an argument: automated decisions",
        "stage": "Judgement",
        "model": "Use recommendations only with checked records and timely staff review of allocation."
      },
      {
        "id": "15-decisions-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "The college could reduce time spent on routine allocation review.",
        "options": [
          "The college could reduce time spent on routine allocation review.",
          "The college could publish a longer description of the process.",
          "The online form could be saved in a different folder.",
          "Keep accessible review and audit denials; cost savings alone do not justify unchecked exclusion."
        ],
        "explanation": "The point acknowledges a plausible institutional saving, which can then be weighed against the effect on pupils. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Point",
        "model": "The college could reduce time spent on routine allocation review."
      },
      {
        "id": "15-decisions-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Staff would no longer check every allocation on a weekly cycle.",
        "options": [
          "Staff would no longer check every allocation on a weekly cycle.",
          "The saving would occur because costs would become cheaper.",
          "The hidden form would make the original allocation accurate.",
          "Keep accessible review and audit denials; cost savings alone do not justify unchecked exclusion."
        ],
        "explanation": "This explains where the saving comes from. It does not claim that removing checks improves the decisions being checked. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Explanation",
        "model": "Staff would no longer check every allocation on a weekly cycle."
      },
      {
        "id": "15-decisions-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Saved staff time could be redirected to support, if the college actually funds it.",
        "options": [
          "Saved staff time could be redirected to support, if the college actually funds it.",
          "The college could describe the process as less expensive.",
          "Every denied pupil would automatically find another source of help.",
          "Keep accessible review and audit denials; cost savings alone do not justify unchecked exclusion."
        ],
        "explanation": "The consequence identifies a possible use of the saving and makes its dependency explicit. Savings alone do not establish better provision. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Consequence",
        "model": "Saved staff time could be redirected to support, if the college actually funds it."
      },
      {
        "id": "15-decisions-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Pupils with incorrect denials may miss support because they cannot find the review route.",
        "options": [
          "Pupils with incorrect denials may miss support because they cannot find the review route.",
          "The review page could be shorter than the college homepage.",
          "Removing checks would guarantee that appeals fall to zero.",
          "Keep accessible review and audit denials; cost savings alone do not justify unchecked exclusion."
        ],
        "explanation": "The counterargument connects a hard-to-find route with uncorrected decisions. A nominal appeal is weaker than one people can meaningfully access. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: automated decisions",
        "stage": "Counterargument",
        "model": "Pupils with incorrect denials may miss support because they cannot find the review route."
      },
      {
        "id": "15-decisions-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Keep accessible review and audit denials; cost savings alone do not justify unchecked exclusion.",
        "options": [
          "Keep accessible review and audit denials; cost savings alone do not justify unchecked exclusion.",
          "Approve it because a review form technically exists, even if pupils with incorrect denials cannot find it and therefore lose access to needed support.",
          "Reject every computer record because the form is hard to find.",
          "Decide from the number of pages used to describe the process."
        ],
        "explanation": "The judgement weighs the saving against the risk of lost support and proposes checks that address accessibility and errors.",
        "skill": "Build an argument: automated decisions",
        "stage": "Judgement",
        "model": "Keep accessible review and audit denials; cost savings alone do not justify unchecked exclusion."
      }
    ],
    "writing": {
      "prompt": "A college checks appeals promptly but audits none of the pupils who never appeal. Write a judgement about whether this is enough oversight.",
      "model": "Prompt appeals can correct some errors, but pupils who cannot recognise or challenge a denial may still be missed. Auditing only people who complain could leave systematic exclusion undetected. I would combine accessible appeals with checks of non-appealed decisions before calling the oversight adequate."
    }
  },
  {
    "id": "15-ai",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: AI and bias",
    "lessons": [
      296
    ],
    "page": 209,
    "ordered": true,
    "sets": [
      {
        "title": "Alert model bias",
        "scenario": "A school’s AI alert model was trained on past referrals. Staff can review alerts, but the school has not checked whether error rates differ across pupil groups."
      },
      {
        "title": "Recruitment training data",
        "scenario": "An employer trains an AI shortlist on past hiring decisions. Career breaks are used as a negative signal. Rejected applicants are not shown reasons or offered review."
      }
    ],
    "questions": [
      {
        "id": "15-ai-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "The model could help staff notice patterns in many records.",
        "options": [
          "The model could help staff notice patterns in many records.",
          "The model could contain a large number of adjustable values.",
          "The school could put its logo on the alert screen.",
          "Test group error rates and staff review before a limited trial; revise or stop if harms persist."
        ],
        "explanation": "The point identifies a potential information-processing benefit. Model size, branding and the AI label do not establish usefulness or fairness. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Point",
        "model": "The model could help staff notice patterns in many records."
      },
      {
        "id": "15-ai-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "It could compare recorded patterns across more cases than one manual review.",
        "options": [
          "It could compare recorded patterns across more cases than one manual review.",
          "It would find useful patterns because it is artificial intelligence.",
          "Historical referrals would contain every pupil’s full context.",
          "Test group error rates and staff review before a limited trial; revise or stop if harms persist."
        ],
        "explanation": "This explains the possible scale benefit while avoiding a claim that training data is complete or that AI is inherently unbiased. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Explanation",
        "model": "It could compare recorded patterns across more cases than one manual review."
      },
      {
        "id": "15-ai-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Staff might prioritise a useful review that they otherwise would have missed.",
        "options": [
          "Staff might prioritise a useful review that they otherwise would have missed.",
          "The software could produce a score for each stored case.",
          "The prediction would establish what a pupil will do next.",
          "Test group error rates and staff review before a limited trial; revise or stop if harms persist."
        ],
        "explanation": "The consequence connects pattern detection to a possible human action, without turning a prediction or past association into proof. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Consequence",
        "model": "Staff might prioritise a useful review that they otherwise would have missed."
      },
      {
        "id": "15-ai-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Biased past referrals could produce uneven false alerts across groups.",
        "options": [
          "Biased past referrals could produce uneven false alerts across groups.",
          "The model might use a different version number next term.",
          "Human review would remove every effect of biased alerts.",
          "Test group error rates and staff review before a limited trial; revise or stop if harms persist."
        ],
        "explanation": "The challenge identifies a route from biased data to unequal effects. Review may help, but can still be influenced by the initial alert. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Counterargument",
        "model": "Biased past referrals could produce uneven false alerts across groups."
      },
      {
        "id": "15-ai-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Test group error rates and staff review before a limited trial; revise or stop if harms persist.",
        "options": [
          "Test group error rates and staff review before a limited trial; revise or stop if harms persist.",
          "Deploy widely because the overall pattern-finding task is fast, even though the school has not checked whether false alerts fall unfairly on particular groups.",
          "Reject every pattern-finding tool without checking this model’s effects.",
          "Approve it only if its technical description is sufficiently long."
        ],
        "explanation": "The judgement makes adoption conditional on evidence about the relevant risks, rather than assuming either universal benefit or universal harm.",
        "skill": "Build an argument: AI and bias",
        "stage": "Judgement",
        "model": "Test group error rates and staff review before a limited trial; revise or stop if harms persist."
      },
      {
        "id": "15-ai-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Recruiters could process an initial shortlist faster.",
        "options": [
          "Recruiters could process an initial shortlist faster.",
          "Applicants could be stored in a digital format.",
          "The employer could advertise that it uses modern software.",
          "Reject this design; assess job-relevant evidence, audit outcomes and provide meaningful review."
        ],
        "explanation": "The point acknowledges a specific possible benefit to recruiters. Automation and modernity do not establish fairness. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Point",
        "model": "Recruiters could process an initial shortlist faster."
      },
      {
        "id": "15-ai-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "The model could score applications before recruiters read every one.",
        "options": [
          "The model could score applications before recruiters read every one.",
          "Recruitment would be faster because shortlisting would take less time.",
          "Past hiring decisions would prove which candidates deserve rejection.",
          "Reject this design; assess job-relevant evidence, audit outcomes and provide meaningful review."
        ],
        "explanation": "This explains the speed mechanism. Past choices and career breaks are not sufficient proof of present suitability. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Explanation",
        "model": "The model could score applications before recruiters read every one."
      },
      {
        "id": "15-ai-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Recruiters could spend more time assessing shortlisted candidates in depth.",
        "options": [
          "Recruiters could spend more time assessing shortlisted candidates in depth.",
          "The employer could call the result an efficient shortlist.",
          "Every rejected candidate would benefit from having no interview.",
          "Reject this design; assess job-relevant evidence, audit outcomes and provide meaningful review."
        ],
        "explanation": "The consequence develops how the saving could affect recruitment work, without assuming that a score fully describes a person. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Consequence",
        "model": "Recruiters could spend more time assessing shortlisted candidates in depth."
      },
      {
        "id": "15-ai-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Past bias and career-break proxies could exclude capable applicants without challenge.",
        "options": [
          "Past bias and career-break proxies could exclude capable applicants without challenge.",
          "The employer might choose a different month to advertise the role.",
          "A numerical score would make reasons and review unnecessary.",
          "Reject this design; assess job-relevant evidence, audit outcomes and provide meaningful review."
        ],
        "explanation": "The challenge identifies the mechanism and consequence: historical bias or an unsuitable proxy can produce unfair exclusion with no correction route. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: AI and bias",
        "stage": "Counterargument",
        "model": "Past bias and career-break proxies could exclude capable applicants without challenge."
      },
      {
        "id": "15-ai-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Reject this design; assess job-relevant evidence, audit outcomes and provide meaningful review.",
        "options": [
          "Reject this design; assess job-relevant evidence, audit outcomes and provide meaningful review.",
          "Use the shortlist because interview time matters more than explaining exclusions, even when career-break proxies could reject capable applicants without review.",
          "Reject every digital recruitment tool regardless of how it is designed.",
          "Accept it if applicants can read the employer’s general mission statement."
        ],
        "explanation": "The judgement weighs speed against unreviewable exclusion and identifies design changes that address the risk. It evaluates this proposal rather than every possible tool.",
        "skill": "Build an argument: AI and bias",
        "stage": "Judgement",
        "model": "Reject this design; assess job-relevant evidence, audit outcomes and provide meaningful review."
      }
    ],
    "writing": {
      "prompt": "A supplier reports 95% overall accuracy but gives no subgroup results. Write three sentences explaining whether this is enough evidence for deployment.",
      "model": "Overall accuracy can hide high error rates for a smaller group. Deploying on that figure alone could expose some pupils to disproportionate false alerts. I would ask for relevant group results and contextual testing, then assess the errors and safeguards before deciding."
    }
  },
  {
    "id": "15-personal",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: analysing personal information",
    "lessons": [
      296
    ],
    "page": 214,
    "ordered": true,
    "sets": [
      {
        "title": "Combining school records",
        "scenario": "A school proposes combining attendance, library borrowing and device-activity records to identify pupils needing support. Staff would review flags; access and retention limits have not been specified."
      },
      {
        "title": "Wider data sharing",
        "scenario": "The school proposes sharing detailed pupil profiles with an external supplier to improve its general product. The school’s existing support system can run without this sharing."
      }
    ],
    "questions": [
      {
        "id": "15-personal-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Combining records could help staff identify a support need.",
        "options": [
          "Combining records could help staff identify a support need.",
          "The system could put several fields in one table.",
          "The project could give each database a shorter name.",
          "Require a justified purpose, limited fields, access controls and retention before a trial."
        ],
        "explanation": "The point identifies a possible pupil-support benefit, while avoiding an assumption that more data guarantees a correct interpretation. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Point",
        "model": "Combining records could help staff identify a support need."
      },
      {
        "id": "15-personal-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Patterns across the records might reveal a concern that one source misses.",
        "options": [
          "Patterns across the records might reveal a concern that one source misses.",
          "Combining data would be useful because the data would be combined.",
          "Library choices would prove why each pupil was absent.",
          "Require a justified purpose, limited fields, access controls and retention before a trial."
        ],
        "explanation": "The explanation supplies a plausible mechanism but treats a pattern as a clue, not a complete or certain explanation of a person. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Explanation",
        "model": "Patterns across the records might reveal a concern that one source misses."
      },
      {
        "id": "15-personal-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "A checked flag could prompt a supportive conversation with the pupil.",
        "options": [
          "A checked flag could prompt a supportive conversation with the pupil.",
          "The system could create a longer profile for each pupil.",
          "All pupils would receive the same improvement in wellbeing.",
          "Require a justified purpose, limited fields, access controls and retention before a trial."
        ],
        "explanation": "The consequence connects analysis to a possible supportive action, conditional on checking rather than guaranteed by a detailed profile. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Consequence",
        "model": "A checked flag could prompt a supportive conversation with the pupil."
      },
      {
        "id": "15-personal-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Linked records could expose sensitive interests to people who do not need them.",
        "options": [
          "Linked records could expose sensitive interests to people who do not need them.",
          "The data might be displayed in a different column order.",
          "Using three sources would eliminate misinterpretation.",
          "Require a justified purpose, limited fields, access controls and retention before a trial."
        ],
        "explanation": "The counterargument identifies a privacy cost from linkage and undefined access. A good purpose does not make every collection or disclosure justified. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Counterargument",
        "model": "Linked records could expose sensitive interests to people who do not need them."
      },
      {
        "id": "15-personal-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Require a justified purpose, limited fields, access controls and retention before a trial.",
        "options": [
          "Require a justified purpose, limited fields, access controls and retention before a trial.",
          "Combine all available records because support is a worthwhile aim, even though access, retention and the need for sensitive fields have not been established.",
          "Reject every analysis of attendance regardless of its purpose or safeguards.",
          "Decide only by the number of existing databases it replaces."
        ],
        "explanation": "The judgement weighs potential support against avoidable exposure and sets relevant conditions rather than assuming any amount of data is acceptable.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Judgement",
        "model": "Require a justified purpose, limited fields, access controls and retention before a trial."
      },
      {
        "id": "15-personal-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "The supplier might improve its product using additional real-world examples.",
        "options": [
          "The supplier might improve its product using additional real-world examples.",
          "The school could attach the profiles to a different file format.",
          "The sharing could happen through an encrypted network link.",
          "Decline detailed sharing as proposed; assess necessity, less intrusive data and clear safeguards first."
        ],
        "explanation": "The point acknowledges a potential supplier benefit without treating a possible future product improvement as a guaranteed pupil benefit. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Point",
        "model": "The supplier might improve its product using additional real-world examples."
      },
      {
        "id": "15-personal-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "More examples could reveal situations the supplier’s existing data misses.",
        "options": [
          "More examples could reveal situations the supplier’s existing data misses.",
          "The product would improve because improvement is the supplier’s aim.",
          "An encrypted transfer would make the profiles anonymous.",
          "Decline detailed sharing as proposed; assess necessity, less intrusive data and clear safeguards first."
        ],
        "explanation": "This explains a plausible learning or testing benefit, while separating transport security from anonymity and quantity from representativeness. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Explanation",
        "model": "More examples could reveal situations the supplier’s existing data misses."
      },
      {
        "id": "15-personal-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Future users might receive better-tested features if the examples are suitable.",
        "options": [
          "Future users might receive better-tested features if the examples are suitable.",
          "The supplier could describe the new dataset as extensive.",
          "The pupils whose data is shared would certainly receive a direct benefit.",
          "Decline detailed sharing as proposed; assess necessity, less intrusive data and clear safeguards first."
        ],
        "explanation": "The consequence is conditional and identifies who might benefit. A future product improvement does not guarantee a direct benefit to current pupils. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Consequence",
        "model": "Future users might receive better-tested features if the examples are suitable."
      },
      {
        "id": "15-personal-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Pupils bear extra exposure for a use not needed to run their current support service.",
        "options": [
          "Pupils bear extra exposure for a use not needed to run their current support service.",
          "The external supplier might have different office opening hours.",
          "The original school purpose automatically covers any later purpose.",
          "Decline detailed sharing as proposed; assess necessity, less intrusive data and clear safeguards first."
        ],
        "explanation": "The challenge weighs an additional, distinct use against the lack of necessity for the existing service; de-identification is not automatically anonymity. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Counterargument",
        "model": "Pupils bear extra exposure for a use not needed to run their current support service."
      },
      {
        "id": "15-personal-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Decline detailed sharing as proposed; assess necessity, less intrusive data and clear safeguards first.",
        "options": [
          "Decline detailed sharing as proposed; assess necessity, less intrusive data and clear safeguards first.",
          "Share every detailed profile because a future product might improve, even though current pupils bear extra exposure and their service needs no such sharing.",
          "Reject all supplier relationships regardless of what data they involve.",
          "Approve it solely because the transfer connection uses encryption."
        ],
        "explanation": "The judgement addresses this avoidable extra exposure and considers alternatives. Encryption protects transit but does not settle the purpose or amount of sharing.",
        "skill": "Build an argument: analysing personal information",
        "stage": "Judgement",
        "model": "Decline detailed sharing as proposed; assess necessity, less intrusive data and clear safeguards first."
      }
    ],
    "writing": {
      "prompt": "A school says it can keep records indefinitely because access is restricted. Write a judgement about that argument.",
      "model": "Access restrictions reduce disclosure risk, but do not show why records need to be kept forever. Longer retention can increase exposure and allow outdated information to influence decisions. I would require a justified retention period as well as access controls, rather than treating one safeguard as a complete answer."
    }
  },
  {
    "id": "15-environment",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: environmental effects",
    "lessons": [
      296,
      297
    ],
    "page": 214,
    "ordered": true,
    "sets": [
      {
        "title": "Replacing school devices",
        "scenario": "A school proposes replacing working laptops with models that use less electricity. The old devices have several useful years left. No comparison of manufacturing impacts and energy savings has been made."
      },
      {
        "title": "Remote meetings",
        "scenario": "A company proposes more online meetings to reduce travel. It would also buy staff new webcams and upgrade servers. Some meetings would remain in person."
      }
    ],
    "questions": [
      {
        "id": "15-environment-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Newer laptops could reduce electricity use during school work.",
        "options": [
          "Newer laptops could reduce electricity use during school work.",
          "The new laptops could be sold in different colours.",
          "Every replaced laptop would automatically be recycled fully.",
          "Compare whole-life impacts and extend useful life unless replacement gives a justified net benefit."
        ],
        "explanation": "The point identifies a possible operational benefit while keeping it separate from total environmental impact over the devices’ lives. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Point",
        "model": "Newer laptops could reduce electricity use during school work."
      },
      {
        "id": "15-environment-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "The newer models may need less power for the same workload.",
        "options": [
          "The newer models may need less power for the same workload.",
          "The laptops would be greener because they would be newer.",
          "Recycling would erase all emissions from manufacture.",
          "Compare whole-life impacts and extend useful life unless replacement gives a justified net benefit."
        ],
        "explanation": "This explains how an electricity saving could occur. Model age alone is not a measure of energy use or whole-life impact. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Explanation",
        "model": "The newer models may need less power for the same workload."
      },
      {
        "id": "15-environment-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Lower electricity demand could reduce running emissions, depending on the energy source.",
        "options": [
          "Lower electricity demand could reduce running emissions, depending on the energy source.",
          "The school could publish a shorter electricity report.",
          "Every reduction in electricity would eliminate all environmental harm.",
          "Compare whole-life impacts and extend useful life unless replacement gives a justified net benefit."
        ],
        "explanation": "The consequence develops the environmental effect and recognises the energy source. A label or report does not establish an emissions reduction. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Consequence",
        "model": "Lower electricity demand could reduce running emissions, depending on the energy source."
      },
      {
        "id": "15-environment-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Manufacturing replacements and retiring usable devices could outweigh the running savings.",
        "options": [
          "Manufacturing replacements and retiring usable devices could outweigh the running savings.",
          "The new laptops might use a different start-up screen.",
          "The devices use less power, so manufacturing is irrelevant.",
          "Compare whole-life impacts and extend useful life unless replacement gives a justified net benefit."
        ],
        "explanation": "The challenge identifies whole-life costs that could reverse the initial benefit. Working-device life, manufacture and end-of-life handling all matter. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Counterargument",
        "model": "Manufacturing replacements and retiring usable devices could outweigh the running savings."
      },
      {
        "id": "15-environment-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Compare whole-life impacts and extend useful life unless replacement gives a justified net benefit.",
        "options": [
          "Compare whole-life impacts and extend useful life unless replacement gives a justified net benefit.",
          "Replace every working device because the new models use less power, even if manufacturing and early disposal cause more impact than those running savings avoid.",
          "Keep every device forever regardless of safety, repairability or consumption.",
          "Decide only from the amount saved on the purchase invoice."
        ],
        "explanation": "The judgement weighs manufacture, use and disposal instead of treating one efficiency measure as the complete environmental answer.",
        "skill": "Build an argument: environmental effects",
        "stage": "Judgement",
        "model": "Compare whole-life impacts and extend useful life unless replacement gives a justified net benefit."
      },
      {
        "id": "15-environment-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Staff could avoid some journeys for routine meetings.",
        "options": [
          "Staff could avoid some journeys for routine meetings.",
          "The meeting software could show more participant windows.",
          "Online meetings would remove every form of resource use.",
          "Assess journeys actually avoided against equipment and energy costs before expanding."
        ],
        "explanation": "The point identifies a specific possible change in travel rather than assuming online activity has no physical infrastructure. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Point",
        "model": "Staff could avoid some journeys for routine meetings."
      },
      {
        "id": "15-environment-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Remote participation would replace some trips to a shared meeting location.",
        "options": [
          "Remote participation would replace some trips to a shared meeting location.",
          "Travel would fall because there would be fewer journeys.",
          "Digital communication would not need devices or electricity.",
          "Assess journeys actually avoided against equipment and energy costs before expanding."
        ],
        "explanation": "This explains the mechanism and limits it to trips actually replaced. Travel mode and distance affect the size of the saving. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Explanation",
        "model": "Remote participation would replace some trips to a shared meeting location."
      },
      {
        "id": "15-environment-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Avoided journeys could reduce transport emissions and staff travel time.",
        "options": [
          "Avoided journeys could reduce transport emissions and staff travel time.",
          "The company could describe its meeting policy as modern.",
          "Online attendance would guarantee higher productivity for every employee.",
          "Assess journeys actually avoided against equipment and energy costs before expanding."
        ],
        "explanation": "The consequence develops environmental and human effects without guaranteeing gains unrelated to the evidence. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Consequence",
        "model": "Avoided journeys could reduce transport emissions and staff travel time."
      },
      {
        "id": "15-environment-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Device manufacture and extra computing could offset some travel savings.",
        "options": [
          "Device manufacture and extra computing could offset some travel savings.",
          "The new webcams might have a different logo.",
          "An online meeting’s electricity use is always larger than any journey.",
          "Assess journeys actually avoided against equipment and energy costs before expanding."
        ],
        "explanation": "The challenge includes digital infrastructure impacts without assuming either side always dominates. Their scale needs comparison. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: environmental effects",
        "stage": "Counterargument",
        "model": "Device manufacture and extra computing could offset some travel savings."
      },
      {
        "id": "15-environment-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Assess journeys actually avoided against equipment and energy costs before expanding.",
        "options": [
          "Assess journeys actually avoided against equipment and energy costs before expanding.",
          "Move every meeting online because some journeys would be avoided, even without comparing the trips actually replaced with equipment manufacture and computing demand.",
          "Reject remote meetings because computers consume some electricity.",
          "Choose only from which meeting format staff have used longest."
        ],
        "explanation": "The judgement weighs both sources of impact using the actual pattern of use, rather than a blanket rule for all meetings.",
        "skill": "Build an argument: environmental effects",
        "stage": "Judgement",
        "model": "Assess journeys actually avoided against equipment and energy costs before expanding."
      }
    ],
    "writing": {
      "prompt": "A school plans to repair laptops, but the repaired models consume much more electricity. Write a conditional environmental judgement.",
      "model": "Repair can avoid manufacturing and e-waste, while the higher electricity use is a continuing cost. The better option depends on likely remaining life, workload and energy source. I would compare those whole-life effects rather than assume either repair or replacement is always greener."
    }
  },
  {
    "id": "15-censorship",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: censorship and filtering",
    "lessons": [
      296,
      297
    ],
    "page": 214,
    "ordered": true,
    "sets": [
      {
        "title": "School keyword filter",
        "scenario": "A school proposes blocking every webpage containing one flagged word. The same word appears in legitimate medical and literature research. Pupils can ask staff to review a block."
      },
      {
        "title": "Public discussion platform",
        "scenario": "A discussion platform proposes removing all posts criticising a public service because some contain abusive language. It can instead distinguish targeted abuse from reasoned criticism and provide appeals."
      }
    ],
    "questions": [
      {
        "id": "15-censorship-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Filtering could reduce pupils’ exposure to some harmful material.",
        "options": [
          "Filtering could reduce pupils’ exposure to some harmful material.",
          "The filter could run whenever a browser is open.",
          "A blocked page would necessarily contain unlawful content.",
          "Use contextual filtering and timely review, balancing harm reduction with legitimate access."
        ],
        "explanation": "The point identifies a possible protective effect. A keyword hit does not establish that content is harmful or unlawful in its context. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Point",
        "model": "Filtering could reduce pupils’ exposure to some harmful material."
      },
      {
        "id": "15-censorship-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Some pages with harmful content would be stopped before pupils view them.",
        "options": [
          "Some pages with harmful content would be stopped before pupils view them.",
          "The filter would help because harmful material would be filtered.",
          "The word would have the same meaning in every context.",
          "Use contextual filtering and timely review, balancing harm reduction with legitimate access."
        ],
        "explanation": "This explains a plausible protective mechanism without treating the keyword as a reliable understanding of meaning. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Explanation",
        "model": "Some pages with harmful content would be stopped before pupils view them."
      },
      {
        "id": "15-censorship-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Staff might need to respond to fewer incidents involving those blocked pages.",
        "options": [
          "Staff might need to respond to fewer incidents involving those blocked pages.",
          "Pupils would see a screen saying the page was blocked.",
          "Every pupil would become safer in every online interaction.",
          "Use contextual filtering and timely review, balancing harm reduction with legitimate access."
        ],
        "explanation": "The consequence develops the effect of reduced exposure, rather than restating a system action or promising complete safety. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Consequence",
        "model": "Staff might need to respond to fewer incidents involving those blocked pages."
      },
      {
        "id": "15-censorship-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Legitimate research could be blocked, restricting learning and access to information.",
        "options": [
          "Legitimate research could be blocked, restricting learning and access to information.",
          "The block screen might use a different illustration.",
          "Having a review route would prevent any lesson-time disruption.",
          "Use contextual filtering and timely review, balancing harm reduction with legitimate access."
        ],
        "explanation": "The counterargument links a known ambiguity to a learning cost. A review route can help but may still involve delay. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Counterargument",
        "model": "Legitimate research could be blocked, restricting learning and access to information."
      },
      {
        "id": "15-censorship-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Use contextual filtering and timely review, balancing harm reduction with legitimate access.",
        "options": [
          "Use contextual filtering and timely review, balancing harm reduction with legitimate access.",
          "Block every occurrence because reducing any possible harm settles the decision, even if legitimate medical and literature research is delayed or prevented.",
          "Remove every safeguard because some research pages are blocked.",
          "Choose the policy from the total number of blocked pages alone."
        ],
        "explanation": "The judgement responds to both the protective aim and overblocking, rather than treating maximum blocking or no protection as automatically justified.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Judgement",
        "model": "Use contextual filtering and timely review, balancing harm reduction with legitimate access."
      },
      {
        "id": "15-censorship-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Moderation could protect participants from some abusive communication.",
        "options": [
          "Moderation could protect participants from some abusive communication.",
          "The platform could display fewer posts on one page.",
          "Criticism would be harmful whenever someone dislikes it.",
          "Target abuse with clear rules, contextual review and appeals while preserving reasoned criticism."
        ],
        "explanation": "The point identifies a potential protective benefit without equating criticism, offence, harm and illegality. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Point",
        "model": "Moderation could protect participants from some abusive communication."
      },
      {
        "id": "15-censorship-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Removing targeted abusive posts could reduce their immediate visibility.",
        "options": [
          "Removing targeted abusive posts could reduce their immediate visibility.",
          "Moderation would be useful because moderators would moderate.",
          "Deleting criticism would prove the public service has no problems.",
          "Target abuse with clear rules, contextual review and appeals while preserving reasoned criticism."
        ],
        "explanation": "This explains how reduced visibility might protect users, without assuming perfect understanding or that criticism is itself abuse. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Explanation",
        "model": "Removing targeted abusive posts could reduce their immediate visibility."
      },
      {
        "id": "15-censorship-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Affected users might feel more able to participate in discussion.",
        "options": [
          "Affected users might feel more able to participate in discussion.",
          "The platform could report that its post count has fallen.",
          "Every participant would agree with the resulting discussion.",
          "Target abuse with clear rules, contextual review and appeals while preserving reasoned criticism."
        ],
        "explanation": "The consequence develops an effect on participation. Fewer posts alone do not demonstrate a healthier or more accountable discussion. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Consequence",
        "model": "Affected users might feel more able to participate in discussion."
      },
      {
        "id": "15-censorship-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Removing all criticism would also suppress legitimate scrutiny and complaints.",
        "options": [
          "Removing all criticism would also suppress legitimate scrutiny and complaints.",
          "Some users might prefer a different sign-in icon.",
          "Targeted abuse and reasoned criticism would have identical effects.",
          "Target abuse with clear rules, contextual review and appeals while preserving reasoned criticism."
        ],
        "explanation": "The counterargument identifies the cost of the proposal’s excessive scope. Appeals can help correct mistakes but do not eliminate the initial restriction. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Counterargument",
        "model": "Removing all criticism would also suppress legitimate scrutiny and complaints."
      },
      {
        "id": "15-censorship-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Target abuse with clear rules, contextual review and appeals while preserving reasoned criticism.",
        "options": [
          "Target abuse with clear rules, contextual review and appeals while preserving reasoned criticism.",
          "Remove all criticism because some posts contain abuse, even though reasoned complaints and scrutiny could then disappear alongside the targeted harmful messages.",
          "Publish every abusive message because moderation has some risks.",
          "Decide only from which option produces the smallest moderation budget."
        ],
        "explanation": "The judgement distinguishes the harmful behaviour from legitimate expression and provides relevant safeguards rather than an absolute policy.",
        "skill": "Build an argument: censorship and filtering",
        "stage": "Judgement",
        "model": "Target abuse with clear rules, contextual review and appeals while preserving reasoned criticism."
      }
    ],
    "writing": {
      "prompt": "A platform claims that an appeals process justifies removing every ambiguous post immediately. Write three sentences evaluating this claim.",
      "model": "Appeals can correct some mistakes but take time and may be difficult to use. Removing every ambiguous post could suppress legitimate discussion while people wait. I would assess the likely harm, use context and provide timely review, rather than treat appeals as a reason for unlimited initial removal."
    }
  },
  {
    "id": "15-piracy",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: piracy and access",
    "lessons": [
      296,
      297
    ],
    "page": 214,
    "ordered": true,
    "sets": [
      {
        "title": "Unauthorised school software sharing",
        "scenario": "Students propose sharing unauthorised copies of commercial revision software to help classmates who cannot afford it. The school can investigate licensed access and free alternatives."
      },
      {
        "title": "Sharing a creator’s course",
        "scenario": "A creator sells a digital course and also offers a smaller free version. A club proposes publicly uploading the full paid course without permission, saying this would help more people learn."
      }
    ],
    "questions": [
      {
        "id": "15-piracy-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Students unable to afford the software could gain access to its activities.",
        "options": [
          "Students unable to afford the software could gain access to its activities.",
          "Digital files could be sent to several computers.",
          "Easy copying would make the redistribution authorised.",
          "Pursue licensed access or suitable free tools rather than justify unauthorised copies by need alone."
        ],
        "explanation": "The point identifies the access argument without confusing an understandable benefit with legal permission or guaranteed learning. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Point",
        "model": "Students unable to afford the software could gain access to its activities."
      },
      {
        "id": "15-piracy-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Shared copies would avoid the purchase cost for those recipients.",
        "options": [
          "Shared copies would avoid the purchase cost for those recipients.",
          "Access would improve because more pupils would have access.",
          "Copying would transfer ownership of the developer’s copyright.",
          "Pursue licensed access or suitable free tools rather than justify unauthorised copies by need alone."
        ],
        "explanation": "The explanation identifies the proposed route to access. Avoiding a price does not establish permission, and unauthorised sharing does not create payment. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Explanation",
        "model": "Shared copies would avoid the purchase cost for those recipients."
      },
      {
        "id": "15-piracy-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Some classmates might practise tasks they otherwise could not afford.",
        "options": [
          "Some classmates might practise tasks they otherwise could not afford.",
          "Students could describe the software as widely available.",
          "Every downloaded copy would produce a higher examination grade.",
          "Pursue licensed access or suitable free tools rather than justify unauthorised copies by need alone."
        ],
        "explanation": "The consequence develops a possible educational effect without promising outcomes or assuming software access resolves all disadvantages. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Consequence",
        "model": "Some classmates might practise tasks they otherwise could not afford."
      },
      {
        "id": "15-piracy-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Unauthorised sharing could undermine creators’ rights and income from licensed use.",
        "options": [
          "Unauthorised sharing could undermine creators’ rights and income from licensed use.",
          "The shared files might have a longer name than the installer.",
          "The access benefit would settle every concern about the method.",
          "Pursue licensed access or suitable free tools rather than justify unauthorised copies by need alone."
        ],
        "explanation": "The challenge recognises rights and economic effects even though copying does not physically remove the original. The access aim does not itself authorise the method. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Counterargument",
        "model": "Unauthorised sharing could undermine creators’ rights and income from licensed use."
      },
      {
        "id": "15-piracy-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Pursue licensed access or suitable free tools rather than justify unauthorised copies by need alone.",
        "options": [
          "Pursue licensed access or suitable free tools rather than justify unauthorised copies by need alone.",
          "Approve the unauthorised sharing because classmates might learn more, even though licensed access and suitable free alternatives could address the need without it.",
          "Reject any free software because creators must always charge.",
          "Choose only by which installer has the smallest download size."
        ],
        "explanation": "The judgement takes unequal access seriously while seeking alternatives that respect rights. It does not dismiss the need or treat it as blanket permission.",
        "skill": "Build an argument: piracy and access",
        "stage": "Judgement",
        "model": "Pursue licensed access or suitable free tools rather than justify unauthorised copies by need alone."
      },
      {
        "id": "15-piracy-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "A free public copy could reach learners who cannot buy the full course.",
        "options": [
          "A free public copy could reach learners who cannot buy the full course.",
          "The course could be placed on another website.",
          "Public availability would show the creator has no ownership rights.",
          "Ask for permission or use authorised resources; wider reach alone does not justify this upload."
        ],
        "explanation": "The point acknowledges the proposed reach benefit without assuming the distribution is authorised or uniquely valuable to all learners. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Point",
        "model": "A free public copy could reach learners who cannot buy the full course."
      },
      {
        "id": "15-piracy-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Removing the price barrier could let more people view the lessons.",
        "options": [
          "Removing the price barrier could let more people view the lessons.",
          "The course would be accessible because access would be increased.",
          "Public uploading would automatically pay the creator through attribution.",
          "Ask for permission or use authorised resources; wider reach alone does not justify this upload."
        ],
        "explanation": "The explanation gives the price mechanism. Attribution is not payment or blanket permission, and an open link does not create an exception. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Explanation",
        "model": "Removing the price barrier could let more people view the lessons."
      },
      {
        "id": "15-piracy-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Some learners could study material they otherwise would not see.",
        "options": [
          "Some learners could study material they otherwise would not see.",
          "The club could count the number of downloaded files.",
          "Each download would guarantee a completed qualification.",
          "Ask for permission or use authorised resources; wider reach alone does not justify this upload."
        ],
        "explanation": "The consequence develops a possible learner outcome, avoiding claims that download counts prove learning or remove production costs. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Consequence",
        "model": "Some learners could study material they otherwise would not see."
      },
      {
        "id": "15-piracy-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Unlicensed redistribution could reduce the creator’s control and funding for future work.",
        "options": [
          "Unlicensed redistribution could reduce the creator’s control and funding for future work.",
          "The creator might design a different cover for next year.",
          "A positive educational aim would remove any need to consider rights.",
          "Ask for permission or use authorised resources; wider reach alone does not justify this upload."
        ],
        "explanation": "The challenge links unauthorised reuse to a plausible effect on the creator while recognising that the exact revenue effect needs evidence. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: piracy and access",
        "stage": "Counterargument",
        "model": "Unlicensed redistribution could reduce the creator’s control and funding for future work."
      },
      {
        "id": "15-piracy-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Ask for permission or use authorised resources; wider reach alone does not justify this upload.",
        "options": [
          "Ask for permission or use authorised resources; wider reach alone does not justify this upload.",
          "Upload the paid course because some future learners might benefit, even though the creator has not permitted redistribution and offers authorised free material.",
          "Ban all course sharing including the creator’s authorised free version.",
          "Decide only from how often the club has previously shared files."
        ],
        "explanation": "The judgement weighs access against rights and proposes a permitted route, rather than treating all sharing as either allowed or prohibited.",
        "skill": "Build an argument: piracy and access",
        "stage": "Judgement",
        "model": "Ask for permission or use authorised resources; wider reach alone does not justify this upload."
      }
    ],
    "writing": {
      "prompt": "A creator permits free school use if attribution is retained. A pupil says any free reuse must still be piracy. Write a short response.",
      "model": "Free reuse is not necessarily piracy: the creator has granted permission for specified school use. The school should follow the attribution and other applicable terms. I would use the authorised resource under those conditions rather than assume that every digital copy is unlicensed."
    }
  },
  {
    "id": "15-communication",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: offensive communications",
    "lessons": [
      296,
      297
    ],
    "page": 214,
    "ordered": true,
    "sets": [
      {
        "title": "Student discussion forum",
        "scenario": "A school forum has legitimate disagreements alongside repeated targeted insults. The proposal is to let moderators remove targeted abuse using published rules, while allowing reasoned disagreement and appeals."
      },
      {
        "title": "AI message filtering",
        "scenario": "A platform uses AI to hide messages likely to contain abuse. It sometimes misreads quoted slurs in educational discussion. Hidden messages can be checked by trained reviewers on request."
      }
    ],
    "questions": [
      {
        "id": "15-communication-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Moderation could reduce harm to pupils targeted by repeated insults.",
        "options": [
          "Moderation could reduce harm to pupils targeted by repeated insults.",
          "The forum could store posts in a different order.",
          "Every disagreement would become harmless if it stayed online.",
          "Use clear rules, contextual review and appeals to protect pupils without banning disagreement."
        ],
        "explanation": "The point identifies a concrete effect on people affected by targeted behaviour. It distinguishes harm from disagreement and avoids an unsupported legal conclusion. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Point",
        "model": "Moderation could reduce harm to pupils targeted by repeated insults."
      },
      {
        "id": "15-communication-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Removing repeated targeted insults could reduce their continuing exposure.",
        "options": [
          "Removing repeated targeted insults could reduce their continuing exposure.",
          "Moderation could help because harmful posts would be moderated.",
          "Published rules would make every moderator judgement correct.",
          "Use clear rules, contextual review and appeals to protect pupils without banning disagreement."
        ],
        "explanation": "The explanation connects action to exposure rather than repeating the benefit or treating moderation rules as error-proof. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Explanation",
        "model": "Removing repeated targeted insults could reduce their continuing exposure."
      },
      {
        "id": "15-communication-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Targeted pupils may feel safer contributing to discussions.",
        "options": [
          "Targeted pupils may feel safer contributing to discussions.",
          "The forum could report that several messages were removed.",
          "Every pupil would agree with every moderation decision.",
          "Use clear rules, contextual review and appeals to protect pupils without banning disagreement."
        ],
        "explanation": "The consequence develops an effect on participation, without treating removal counts as proof or promising universal agreement. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Consequence",
        "model": "Targeted pupils may feel safer contributing to discussions."
      },
      {
        "id": "15-communication-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Poor contextual decisions could remove legitimate disagreement as well as abuse.",
        "options": [
          "Poor contextual decisions could remove legitimate disagreement as well as abuse.",
          "The forum might use a different icon for replies.",
          "Because abuse exists, any restriction on speech would be justified.",
          "Use clear rules, contextual review and appeals to protect pupils without banning disagreement."
        ],
        "explanation": "The counterargument identifies a relevant moderation risk. A correction route helps but does not undo every cost of an initial mistake. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Counterargument",
        "model": "Poor contextual decisions could remove legitimate disagreement as well as abuse."
      },
      {
        "id": "15-communication-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Use clear rules, contextual review and appeals to protect pupils without banning disagreement.",
        "options": [
          "Use clear rules, contextual review and appeals to protect pupils without banning disagreement.",
          "Remove every critical comment because some messages are abusive, even though this would also suppress reasoned disagreement rather than target the harmful behaviour.",
          "Allow all targeted insults because moderation can make mistakes.",
          "Decide from which approach would produce the largest post count."
        ],
        "explanation": "The judgement balances protection and legitimate expression with safeguards addressing the specific risk of misclassification.",
        "skill": "Build an argument: offensive communications",
        "stage": "Judgement",
        "model": "Use clear rules, contextual review and appeals to protect pupils without banning disagreement."
      },
      {
        "id": "15-communication-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "Automatic hiding could reduce how long users are exposed to some abuse.",
        "options": [
          "Automatic hiding could reduce how long users are exposed to some abuse.",
          "The model could score every message as a number.",
          "An AI label would prove the filter understands every quotation.",
          "Use fast review of disputed cases and monitor errors rather than treating AI scores as final."
        ],
        "explanation": "The point identifies a potential timing benefit without equating a prediction with full contextual understanding or a legal determination. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Point",
        "model": "Automatic hiding could reduce how long users are exposed to some abuse."
      },
      {
        "id": "15-communication-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "The filter could act before a moderator manually reads the message.",
        "options": [
          "The filter could act before a moderator manually reads the message.",
          "Abuse would be reduced because the model would reduce abuse.",
          "The training process would remove every ambiguous phrase.",
          "Use fast review of disputed cases and monitor errors rather than treating AI scores as final."
        ],
        "explanation": "This gives the mechanism for speed, while leaving accuracy and context open to evaluation. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Explanation",
        "model": "The filter could act before a moderator manually reads the message."
      },
      {
        "id": "15-communication-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "A targeted user might avoid repeated harmful exposure while staff review the case.",
        "options": [
          "A targeted user might avoid repeated harmful exposure while staff review the case.",
          "The platform could display the word filtered beside a message.",
          "Every person would benefit equally from every hidden message.",
          "Use fast review of disputed cases and monitor errors rather than treating AI scores as final."
        ],
        "explanation": "The consequence develops the possible benefit for a user and preserves the distinction between an alert and evidence of intent. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Consequence",
        "model": "A targeted user might avoid repeated harmful exposure while staff review the case."
      },
      {
        "id": "15-communication-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Misread educational quotations could be hidden, restricting useful discussion.",
        "options": [
          "Misread educational quotations could be hidden, restricting useful discussion.",
          "The review team could use a different shift pattern.",
          "A reviewer being available would mean no harmless message is ever hidden.",
          "Use fast review of disputed cases and monitor errors rather than treating AI scores as final."
        ],
        "explanation": "The challenge uses the stated context error to show a cost. Human review can help but does not prevent every initial suppression or delay. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: offensive communications",
        "stage": "Counterargument",
        "model": "Misread educational quotations could be hidden, restricting useful discussion."
      },
      {
        "id": "15-communication-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Use fast review of disputed cases and monitor errors rather than treating AI scores as final.",
        "options": [
          "Use fast review of disputed cases and monitor errors rather than treating AI scores as final.",
          "Make every AI-hidden message a permanent ban because filtering is fast, even when quoted language in legitimate educational discussions is being misread.",
          "Disable every protection because quotations can be misread.",
          "Choose the policy solely from the average length of hidden posts."
        ],
        "explanation": "The judgement retains a possible speed benefit while addressing context errors, review and the risk of treating estimates as final findings.",
        "skill": "Build an argument: offensive communications",
        "stage": "Judgement",
        "model": "Use fast review of disputed cases and monitor errors rather than treating AI scores as final."
      }
    ],
    "writing": {
      "prompt": "A user argues that anything they find offensive must be criminal. Write three sentences distinguishing an ethical concern from a legal conclusion.",
      "model": "A message can be upsetting or ethically objectionable without that reaction alone establishing a criminal offence. Legal assessment depends on the applicable rules and the content and context. I would address harm and moderation fairly while avoiding an unsupported claim that every offensive statement is unlawful."
    }
  },
  {
    "id": "15-culture",
    "section": "1.5",
    "spec": "1.5.2",
    "title": "Build an argument: layout, colour and character sets",
    "lessons": [
      296,
      297
    ],
    "page": 214,
    "ordered": true,
    "sets": [
      {
        "title": "Colour-only school dashboard",
        "scenario": "A school support dashboard uses only red and green to distinguish outcomes. It proposes adding text labels and symbols, clear layout, keyboard access and readable contrast. Staff worry about visual clutter."
      },
      {
        "title": "Multilingual pupil form",
        "scenario": "A school form accepts only a limited character set and rejects some pupils’ names. It proposes Unicode support, suitable fonts, clear labels and layouts tested with users of different languages and writing directions."
      }
    ],
    "questions": [
      {
        "id": "15-culture-1",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "More pupils could understand the dashboard’s outcome messages.",
        "options": [
          "More pupils could understand the dashboard’s outcome messages.",
          "The dashboard could contain additional text characters.",
          "Every pupil would prefer the same colours and layout.",
          "Test concise labels and familiar cues with diverse users, retaining readable layout and keyboard access."
        ],
        "explanation": "The point identifies an inclusion benefit and avoids assuming that colour perception, conventions or preferences are universal. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Point",
        "model": "More pupils could understand the dashboard’s outcome messages."
      },
      {
        "id": "15-culture-2",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Labels and symbols would provide meaning beyond colour alone.",
        "options": [
          "Labels and symbols would provide meaning beyond colour alone.",
          "The dashboard would be clearer because it would be easier to understand.",
          "Every pupil would recognise every icon without explanation.",
          "Test concise labels and familiar cues with diverse users, retaining readable layout and keyboard access."
        ],
        "explanation": "The explanation identifies a second channel for meaning. It does not assume icons are universal or forbid colour as a supplementary cue. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Explanation",
        "model": "Labels and symbols would provide meaning beyond colour alone."
      },
      {
        "id": "15-culture-3",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Pupils who struggle with colour-only cues could act on feedback more independently.",
        "options": [
          "Pupils who struggle with colour-only cues could act on feedback more independently.",
          "The school could display more symbols beside its data.",
          "Every interface difficulty would disappear after one label was added.",
          "Test concise labels and familiar cues with diverse users, retaining readable layout and keyboard access."
        ],
        "explanation": "The consequence develops access to an action rather than simply counting features. Accessible display does not establish data accuracy. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Consequence",
        "model": "Pupils who struggle with colour-only cues could act on feedback more independently."
      },
      {
        "id": "15-culture-4",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Too many unfamiliar symbols could add confusion instead of clarity.",
        "options": [
          "Too many unfamiliar symbols could add confusion instead of clarity.",
          "The redesigned page might have a different file name.",
          "Adding any text would necessarily make a dashboard inaccessible.",
          "Test concise labels and familiar cues with diverse users, retaining readable layout and keyboard access."
        ],
        "explanation": "The challenge addresses the stated design concern without dismissing labels. Meaning, familiarity, layout and testing matter together. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Counterargument",
        "model": "Too many unfamiliar symbols could add confusion instead of clarity."
      },
      {
        "id": "15-culture-5",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Test concise labels and familiar cues with diverse users, retaining readable layout and keyboard access.",
        "options": [
          "Test concise labels and familiar cues with diverse users, retaining readable layout and keyboard access.",
          "Keep colour-only outcomes because staff dislike additional labels, even if some pupils cannot distinguish those cues and therefore cannot act on feedback independently.",
          "Add as many symbols as possible because more information is always clearer.",
          "Choose the design only from the headteacher’s preferred colour."
        ],
        "explanation": "The judgement balances clarity with clutter and proposes user testing of relevant accessibility features, instead of one person’s aesthetic preference.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Judgement",
        "model": "Test concise labels and familiar cues with diverse users, retaining readable layout and keyboard access."
      },
      {
        "id": "15-culture-6",
        "prompt": "Which opening point introduces a possible benefit, before explaining or judging the proposal?",
        "answer": "More pupils could enter and recognise their names accurately.",
        "options": [
          "More pupils could enter and recognise their names accurately.",
          "The form could store names in a larger database file.",
          "One script would be the natural choice for every family.",
          "Support Unicode and test input, fonts, labels and direction with the users affected."
        ],
        "explanation": "The point identifies a specific inclusion and accuracy benefit, rather than treating one language or script as universal. The proposed decision is a judgement, rather than the point requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Point",
        "model": "More pupils could enter and recognise their names accurately."
      },
      {
        "id": "15-culture-7",
        "prompt": "Which explanation shows why that effect could happen?",
        "answer": "Unicode can represent characters from many scripts that the old set omits.",
        "options": [
          "Unicode can represent characters from many scripts that the old set omits.",
          "The form would be inclusive because it would include more people.",
          "Choosing Unicode would itself guarantee correct fonts and layout.",
          "Support Unicode and test input, fonts, labels and direction with the users affected."
        ],
        "explanation": "The explanation addresses character representation while recognising that fonts, input handling and layout are additional design requirements. The proposed decision is a judgement, rather than the explanation requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Explanation",
        "model": "Unicode can represent characters from many scripts that the old set omits."
      },
      {
        "id": "15-culture-8",
        "prompt": "Which consequence develops the argument rather than repeating it?",
        "answer": "Pupils could avoid substitute spellings and mismatches across school records.",
        "options": [
          "Pupils could avoid substitute spellings and mismatches across school records.",
          "The school could report that it supports a newer encoding.",
          "Every record would become correct without checking entered data.",
          "Support Unicode and test input, fonts, labels and direction with the users affected."
        ],
        "explanation": "The consequence develops the practical effect of representing names accurately. Encoding alone does not verify data or explain fields. The proposed decision is a judgement, rather than the consequence requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Consequence",
        "model": "Pupils could avoid substitute spellings and mismatches across school records."
      },
      {
        "id": "15-culture-9",
        "prompt": "Which counterargument states a competing cost or limitation, rather than proposing a decision?",
        "answer": "Encoding support alone would not fix unreadable fonts or unsuitable writing direction.",
        "options": [
          "Encoding support alone would not fix unreadable fonts or unsuitable writing direction.",
          "The new form could be hosted under a different page title.",
          "Using one familiar script would give everyone equal access.",
          "Support Unicode and test input, fonts, labels and direction with the users affected."
        ],
        "explanation": "The challenge identifies remaining barriers rather than rejecting Unicode. Representation, display, direction and cultural expectations need consideration together. The proposed decision is a judgement, rather than the counterargument requested at this step.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Counterargument",
        "model": "Encoding support alone would not fix unreadable fonts or unsuitable writing direction."
      },
      {
        "id": "15-culture-10",
        "prompt": "Which judgement weighs the effects and gives useful conditions?",
        "answer": "Support Unicode and test input, fonts, labels and direction with the users affected.",
        "options": [
          "Support Unicode and test input, fonts, labels and direction with the users affected.",
          "Switch to Unicode and assume inclusion is solved, even if fonts remain unreadable, input fails for some scripts and the layout ignores writing direction.",
          "Switch encoding and assume every language and layout issue is solved.",
          "Choose a script only from which uses the fewest bytes per character."
        ],
        "explanation": "The judgement addresses both representation and usable display. It is stronger than treating encoding alone as a complete accessibility solution.",
        "skill": "Build an argument: layout, colour and character sets",
        "stage": "Judgement",
        "model": "Support Unicode and test input, fonts, labels and direction with the users affected."
      }
    ],
    "writing": {
      "prompt": "A dashboard adds icons but removes all text labels to save space. Write a conditional judgement about cultural accessibility.",
      "model": "Icons can help users scan information, but their meanings may be unfamiliar or culturally variable. Removing labels could exclude people even if the screen looks cleaner. I would test the design with affected users and retain concise accessible explanations rather than assume symbols are universally understood."
    }
  },
  {
    "id": "15-rights",
    "section": "1.5",
    "spec": "1.5.1(a)",
    "title": "Data principles, individual rights and controls",
    "lessons": [
      157
    ],
    "page": 208,
    "questions": [
      {
        "id": "15-rights-1",
        "prompt": "A newsletter signup requests names, email addresses and shoe sizes. Which change most directly applies data minimisation?",
        "answer": "Remove shoe size because it is unnecessary for the newsletter",
        "options": [
          "Remove shoe size because it is unnecessary for the newsletter",
          "Encrypt the unnecessary shoe sizes",
          "Keep the records indefinitely",
          "Publish the form without any explanation"
        ],
        "explanation": "Minimisation is about collecting only needed fields; encryption protects data retained for a legitimate purpose.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-2",
        "prompt": "A club collected addresses for delivery updates and now wants to use them for unrelated advertising. Which principle requires it to review that new purpose?",
        "answer": "Purpose limitation",
        "options": [
          "Purpose limitation",
          "Data availability",
          "Bitwise integrity",
          "CPU scheduling"
        ],
        "explanation": "Personal information should be used for specified purposes; an unrelated purpose needs proper assessment and lawful handling.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-3",
        "prompt": "A parent asks an organisation what personal data it holds about them. Which individual right is most directly relevant?",
        "answer": "Right of access",
        "options": [
          "Right of access",
          "Right to rectification",
          "Right to object",
          "Right to data portability"
        ],
        "explanation": "An access request concerns obtaining personal data and information about its processing.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-4",
        "prompt": "A club has recorded a member's email address incorrectly. Which right most directly enables the person to request correction?",
        "answer": "Right to rectification",
        "options": [
          "Right to rectification",
          "Right to access",
          "Right to object",
          "Right to portability"
        ],
        "explanation": "Rectification concerns inaccurate personal data.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-5",
        "prompt": "An individual asks for all personal records to be deleted. Which response is legally more accurate?",
        "answer": "Assess whether erasure applies and whether exceptions justify keeping some data",
        "options": [
          "Assess whether erasure applies and whether exceptions justify keeping some data",
          "Delete everything immediately in every case",
          "Refuse every deletion request automatically",
          "Keep the data only because it has been encrypted"
        ],
        "explanation": "Erasure is not an unconditional right in every circumstance; applicable grounds and exceptions matter.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-6",
        "prompt": "A school retains old mailing-list details with no remaining purpose. Which principle is most directly relevant?",
        "answer": "Storage limitation",
        "options": [
          "Storage limitation",
          "Network neutrality",
          "Function cohesion",
          "Selection control"
        ],
        "explanation": "Identifiable data should not be kept for longer than justified by the purpose and applicable obligations.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-7",
        "prompt": "An organisation tells members what it collects, why, who receives it and how long it is kept. Which principle is being demonstrated most directly?",
        "answer": "Transparency",
        "options": [
          "Transparency",
          "Pipelining",
          "Load balancing",
          "Encapsulation"
        ],
        "explanation": "Providing clear information helps people understand how their data is processed.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-8",
        "prompt": "Which measure most directly addresses unauthorised staff viewing of membership records?",
        "answer": "Role-based access controls",
        "options": [
          "Role-based access controls",
          "Collecting additional identifiers",
          "Increasing browser cache",
          "Removing all record validation"
        ],
        "explanation": "Permissions limit access to staff whose roles require the data.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-9",
        "prompt": "An encrypted database contains far more personal information than a service needs. Which conclusion is most accurate?",
        "answer": "Encryption does not remove the duty to minimise collection",
        "options": [
          "Encryption does not remove the duty to minimise collection",
          "Encryption makes every collection lawful",
          "Security and minimisation mean exactly the same thing",
          "Encryption removes all individual rights"
        ],
        "explanation": "Security protects stored data; minimisation independently limits unnecessary collection.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      },
      {
        "id": "15-rights-10",
        "prompt": "Which evidence most directly demonstrates accountability for personal-data handling?",
        "answer": "Documented lawful purposes, retention rules and access reviews",
        "options": [
          "Documented lawful purposes, retention rules and access reviews",
          "An undocumented assumption of consent",
          "A password shared across all staff",
          "Collecting all available fields"
        ],
        "explanation": "Accountability requires organisations to demonstrate compliance through documented decisions and safeguards.",
        "skill": "Data principles, individual rights and controls",
        "source": "H446 final Paper 1 guide, data principles, rights and controls (pages 278–281)"
      }
    ]
  }
];
