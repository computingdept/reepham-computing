'use strict';
// J277 1.6.1 Ethical, legal, cultural and environmental impacts.
const J277_SECTION={"code":"1.6","title":"Impacts of Digital Technology"};
const SKILLS=[
  {
    "id": "16-impacts",
    "section": "1.6",
    "spec": "1.6.1",
    "title": "Ethical, cultural and environmental impacts",
    "questions": [
      {
        "id": "16-impacts-1",
        "prompt": "What is an ethical issue?",
        "answer": "A question of fairness, right and wrong",
        "options": [
          "A question of fairness, right and wrong",
          "A computer's RAM capacity",
          "Only an issue covered by law",
          "A printer driver"
        ],
        "explanation": "Ethics asks what people ought to do, not only what is legally allowed.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-2",
        "prompt": "What is the digital divide?",
        "answer": "Unequal access to digital technology and skills",
        "options": [
          "Unequal access to digital technology and skills",
          "The boundary between RAM and ROM",
          "A LAN's physical topology",
          "An image colour model"
        ],
        "explanation": "People may be excluded because of cost, connectivity, disability or limited skills.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-3",
        "prompt": "How could remote working benefit the environment?",
        "answer": "It may reduce commuting",
        "options": [
          "It may reduce commuting",
          "It always removes all emissions",
          "It eliminates all server energy use",
          "It prevents hardware waste"
        ],
        "explanation": "Fewer journeys may lower transport emissions, though online activity has an environmental cost.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-4",
        "prompt": "Which is a concern associated with e-waste?",
        "answer": "Hazardous materials and disposal impacts",
        "options": [
          "Hazardous materials and disposal impacts",
          "Increased CPU performance",
          "Better file compression",
          "Reduced screen brightness"
        ],
        "explanation": "Improper disposal of electronics can harm health and the environment.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-5",
        "prompt": "Why might workplace automation affect society?",
        "answer": "It changes tasks, jobs and required skills",
        "options": [
          "It changes tasks, jobs and required skills",
          "It guarantees more jobs for everyone",
          "It makes all occupations illegal",
          "It removes the need for education"
        ],
        "explanation": "Automated systems can replace some tasks and create others.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-6",
        "prompt": "Why is tracking people's movements ethically sensitive?",
        "answer": "It can threaten privacy and personal autonomy",
        "options": [
          "It can threaten privacy and personal autonomy",
          "It always reduces data collection",
          "It removes every security risk",
          "It makes GPS impossible"
        ],
        "explanation": "Monitoring may give useful information but can also invade privacy.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-7",
        "prompt": "Which is a cultural effect of social media?",
        "answer": "Changes in communication and information sharing",
        "options": [
          "Changes in communication and information sharing",
          "More CPU registers",
          "Bigger storage sectors",
          "Faster monitor refresh"
        ],
        "explanation": "Social platforms influence language, relationships and news consumption.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-8",
        "prompt": "Who are stakeholders of a school facial-recognition system?",
        "answer": "Pupils, families and school staff affected by it",
        "options": [
          "Pupils, families and school staff affected by it",
          "Only the processor",
          "Only the screen maker",
          "No one until a problem occurs"
        ],
        "explanation": "Stakeholders are the people or groups affected by a decision.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-9",
        "prompt": "What would help address the digital divide?",
        "answer": "Accessible devices, connectivity and digital-skills support",
        "options": [
          "Accessible devices, connectivity and digital-skills support",
          "Require every pupil to buy a costly laptop",
          "Remove all offline routes",
          "Block assistive technology"
        ],
        "explanation": "Equitable access can require equipment, services and training.",
        "skill": "Ethical, cultural and environmental impacts"
      },
      {
        "id": "16-impacts-10",
        "prompt": "How should the impacts of a new digital system be evaluated?",
        "answer": "Compare benefits, harms and views of different stakeholders",
        "options": [
          "Compare benefits, harms and views of different stakeholders",
          "Assume it is always beneficial",
          "Look only at installation cost",
          "Ignore unintended effects"
        ],
        "explanation": "A balanced argument considers positive and negative impacts on groups affected.",
        "skill": "Ethical, cultural and environmental impacts"
      }
    ]
  },
  {
    "id": "16-laws",
    "section": "1.6",
    "spec": "1.6.1",
    "title": "Data protection, computer misuse and copyright",
    "questions": [
      {
        "id": "16-laws-1",
        "prompt": "Which law regulates the processing of personal data in the UK?",
        "answer": "Data Protection Act 2018",
        "options": [
          "Data Protection Act 2018",
          "Computer Misuse Act 1990",
          "Copyright, Designs and Patents Act 1988",
          "Road Traffic Act 1988"
        ],
        "explanation": "The DPA 2018 governs personal-data processing.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-2",
        "prompt": "Which law addresses unauthorised access to computer systems?",
        "answer": "Computer Misuse Act 1990",
        "options": [
          "Computer Misuse Act 1990",
          "Data Protection Act 2018",
          "Copyright, Designs and Patents Act 1988",
          "Companies Act 2006"
        ],
        "explanation": "Unauthorised computer access is covered by the Computer Misuse Act.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-3",
        "prompt": "Which law protects qualifying original software as copyright work?",
        "answer": "Copyright, Designs and Patents Act 1988",
        "options": [
          "Copyright, Designs and Patents Act 1988",
          "Computer Misuse Act 1990",
          "Data Protection Act 2018",
          "Road Traffic Act 1988"
        ],
        "explanation": "Copyright law protects original creations, including software.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-4",
        "prompt": "A person logs into someone else's account without permission. Which is relevant?",
        "answer": "Computer Misuse Act 1990",
        "options": [
          "Computer Misuse Act 1990",
          "Only the law of defamation",
          "Only the Copyright Act",
          "Only the Road Traffic Act"
        ],
        "explanation": "Unauthorised access can be a Computer Misuse Act offence.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-5",
        "prompt": "Why must a school protect pupil personal data?",
        "answer": "The law regulates collection, access and use of personal data",
        "options": [
          "The law regulates collection, access and use of personal data",
          "All pupil records are public",
          "Personal information is never sensitive",
          "Only paper records matter"
        ],
        "explanation": "Data protection duties apply to personal information held digitally or otherwise.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-6",
        "prompt": "Distributing pirated copies of proprietary software may breach which law?",
        "answer": "Copyright, Designs and Patents Act 1988",
        "options": [
          "Copyright, Designs and Patents Act 1988",
          "Only the Computer Misuse Act",
          "Only the Road Traffic Act",
          "Only the Education Act"
        ],
        "explanation": "Copying protected software without permission can infringe copyright.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-7",
        "prompt": "What is personal data?",
        "answer": "Information about an identifiable living person",
        "options": [
          "Information about an identifiable living person",
          "Only CPU clock values",
          "Only anonymous machine temperatures",
          "Only network cables"
        ],
        "explanation": "Data is personal when it relates to an identified or identifiable individual.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-8",
        "prompt": "Why restrict access to personal records?",
        "answer": "To limit unauthorised disclosure or alteration",
        "options": [
          "To limit unauthorised disclosure or alteration",
          "To speed up a display",
          "To turn RAM into ROM",
          "To add network ports"
        ],
        "explanation": "Appropriate permissions protect confidential information.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-9",
        "prompt": "Which may constitute an offence under the Computer Misuse Act?",
        "answer": "Unauthorised modification of computer data",
        "options": [
          "Unauthorised modification of computer data",
          "Using an authorised school account",
          "Saving your own homework",
          "Reading a public website"
        ],
        "explanation": "The Act addresses unauthorised access and related computer misuse.",
        "skill": "Data protection, computer misuse and copyright"
      },
      {
        "id": "16-laws-10",
        "prompt": "What is an important relationship between law and ethics?",
        "answer": "Something lawful may still raise ethical concerns",
        "options": [
          "Something lawful may still raise ethical concerns",
          "Everything legal must be ethical",
          "Every unethical action is a crime",
          "Digital technologies are not regulated"
        ],
        "explanation": "Legal compliance and ethical responsibility are distinct.",
        "skill": "Data protection, computer misuse and copyright"
      }
    ]
  },
  {
    "id": "16-licences",
    "section": "1.6",
    "spec": "1.6.1",
    "title": "Open-source and proprietary software licences",
    "questions": [
      {
        "id": "16-licences-1",
        "prompt": "What do software licences specify?",
        "answer": "Permitted uses, copying and redistribution",
        "options": [
          "Permitted uses, copying and redistribution",
          "CPU clock speed",
          "Disk rotation speed",
          "IP addresses"
        ],
        "explanation": "Software users must observe the rights and conditions in the licence.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-2",
        "prompt": "What is proprietary software?",
        "answer": "Software licensed under owner-controlled terms, often restrictive",
        "options": [
          "Software licensed under owner-controlled terms, often restrictive",
          "Only software with no copyright",
          "Any free open-source program",
          "Software that always has no restrictions"
        ],
        "explanation": "Proprietary licences commonly restrict redistribution or modification.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-3",
        "prompt": "What is open-source software?",
        "answer": "Software whose licence permits source access and certain reuse rights",
        "options": [
          "Software whose licence permits source access and certain reuse rights",
          "Software whose code is always secret",
          "Software that cannot be shared",
          "A computer without an operating system"
        ],
        "explanation": "Open-source licences grant specified freedoms to work with code.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-4",
        "prompt": "Does open-source software still have licence terms?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, it has no rules",
          "Only on phones",
          "Only when it is free of charge"
        ],
        "explanation": "Open-source licences may impose conditions on redistribution.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-5",
        "prompt": "Which can be an open-source advantage?",
        "answer": "Source code may be studied and modified under its licence",
        "options": [
          "Source code may be studied and modified under its licence",
          "It is always bug-free",
          "It never requires support",
          "It is always cheaper to operate"
        ],
        "explanation": "Code availability can enable understanding and customisation.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-6",
        "prompt": "Why should a school check licences before mass installation?",
        "answer": "The licence might limit users or installations",
        "options": [
          "The licence might limit users or installations",
          "Licences set monitor brightness",
          "Licences increase CPU cores",
          "Software rights never apply at school"
        ],
        "explanation": "Terms can limit deployment and permitted use.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-7",
        "prompt": "Can open-source software be sold?",
        "answer": "Yes",
        "options": [
          "Yes",
          "No, never",
          "Only without source code",
          "Only when it is proprietary"
        ],
        "explanation": "Open-source freedoms do not forbid charging for distribution or services.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-8",
        "prompt": "Which licence approach suits a developer wanting others to reuse code?",
        "answer": "A suitable open-source licence",
        "options": [
          "A suitable open-source licence",
          "No permissions granted",
          "A rule prohibiting all copies",
          "Only a hardware warranty"
        ],
        "explanation": "The chosen licence can specify rights and obligations.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-9",
        "prompt": "Why is the price of software insufficient to identify its licence type?",
        "answer": "Open-source and proprietary software may both be sold",
        "options": [
          "Open-source and proprietary software may both be sold",
          "Only proprietary programs cost money",
          "All open-source software is public domain",
          "Licences only apply to physical discs"
        ],
        "explanation": "Price and licensing rights are different things.",
        "skill": "Open-source and proprietary software licences"
      },
      {
        "id": "16-licences-10",
        "prompt": "What should someone do before copying another person's source code?",
        "answer": "Check and follow its licence",
        "options": [
          "Check and follow its licence",
          "Assume everything online is public domain",
          "Remove the copyright notice",
          "Treat paid access as permission to redistribute"
        ],
        "explanation": "Reuse is governed by copyright and licence terms.",
        "skill": "Open-source and proprietary software licences"
      }
    ]
  }
];
