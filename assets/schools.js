/* Learning Hub school configuration.
   Add schools here rather than duplicating the Learning Hub shell. */
window.LEARNING_HUB_SCHOOLS = {
  reepham: {
    id: "reepham",
    name: "Reepham High School & College",
    shortName: "RHSC",
    academicYear: "2026–27",
    years: [7, 8, 9, 10, 11, 12, 13],
    brand: {
      primary: "#006347"
    },
    links: {
      website: "https://www.reephamhigh.org.uk/",
      curriculum: "https://www.reephamhigh.org.uk/pupils/curriculum/",
      collegeCourses: "https://www.reephamcollege.org.uk/for-students-and-parents/subjects/"
    },
    stageGroups: [
      {
        id: "10-11",
        years: [10, 11],
        title: "Years 10–11 courses",
        eyebrow: "YEARS 10–11",
        subtitle: "Choose your course",
        intro: "Choose the course you study. You can switch between Year 10 and Year 11 inside the course.",
        subjectSet: "years10to11",
        dark: false
      },
      {
        id: "12-13",
        years: [12, 13],
        title: "Sixth Form courses",
        eyebrow: "SIXTH FORM",
        subtitle: "Choose your course",
        intro: "Choose the course you study. You can switch between Year 12 and Year 13 inside the course.",
        subjectSet: "years12to13",
        dark: true
      }
    ],
    subjects: {
      years7to9: [
        "Art and Design",
        "Computing",
        "Design and Technology",
        "English",
        "Geography",
        "History",
        "Mathematics",
        "Modern Foreign Languages",
        "Music",
        "Physical Education",
        "PSHE",
        "Religious Education",
        "Science"
      ],
      years10to11: {
        core: [
          "English",
          "Mathematics",
          "Science",
          "Core Physical Education",
          "Personal Development"
        ],
        courses: [
          "Art, Craft and Design",
          "Business Studies",
          "Computer Science",
          "Design Technology",
          "Food Preparation",
          "French",
          "Geography",
          "History",
          "Information Technology",
          "Music",
          "Physical Education GCSE",
          "Photography",
          "Religious Studies",
          "Spanish",
          "Sports Studies"
        ]
      },
      years12to13: [
        "Art, Craft & Design",
        "Biology",
        "Business Studies",
        "Chemistry",
        "Computer Science",
        "Criminology",
        "Economics",
        "English Language",
        "English Literature",
        "French",
        "Further Mathematics",
        "Geography",
        "History",
        "Law",
        "Mathematics",
        "Photography",
        "Physical Education",
        "Physics",
        "Politics",
        "Product Design",
        "Psychology",
        "Sociology",
        "Spanish"
      ]
    }
  },
  stalham: {
    id: "stalham",
    name: "Stalham High School",
    shortName: "SHS",
    academicYear: "2026–27",
    years: [7, 8, 9, 10, 11],
    logo: "https://www.stalhamhigh.org.uk/images/uploads/img-13-3601.png",
    brand: {
      primary: "#23365f",
      dark: "#182947",
      secondary: "#e52329",
      accent: "#f4d21f",
      soft: "#f2f5f9",
      line: "#d4ddea",
      yearCards: {
        "7": { bg: "#eef3f8", ink: "#23365f", arrow: "rgba(35,54,95,.08)" },
        "8": { bg: "#dbe5f0", ink: "#23365f", arrow: "rgba(35,54,95,.08)" },
        "9": { bg: "#b9c9dc", ink: "#182947", arrow: "rgba(24,41,71,.10)" }
      },
      yearThemes: {
        "7": { accent: "#8297b7", pale: "#eef3f8", border: "#b7c6d9", ink: "#23365f" },
        "8": { accent: "#667fa5", pale: "#e6edf5", border: "#9fb1c9", ink: "#20365c" },
        "9": { accent: "#4e6991", pale: "#dde6f0", border: "#879dbb", ink: "#1d3154" },
        "10": { accent: "#354f79", pale: "#e8edf4", border: "#758aa8", ink: "#21365f" },
        "11": { accent: "#23365f", pale: "#e2e8f0", border: "#657a9b", ink: "#182947" }
      }
    },
    links: {
      website: "https://www.stalhamhigh.org.uk/",
      curriculum: "https://www.stalhamhigh.org.uk/for-students/curriculum-subject-overview/",
      preferences: "https://www.stalhamhigh.org.uk/for-students/preferences/"
    },
    stageGroups: [
      {
        id: "10-11",
        years: [10, 11],
        title: "Years 10–11 courses",
        eyebrow: "YEARS 10–11",
        subtitle: "Choose your course",
        intro: "Choose the course you study. You can switch between Year 10 and Year 11 inside the course.",
        subjectSet: "years10to11",
        colour: "#23365f",
        dark: false
      }
    ],
    subjects: {
      years7to9: [
        "Art",
        "Computing",
        "Drama",
        "English",
        "Food and Nutrition",
        "French",
        "Geography",
        "History",
        "Mathematics",
        "Music",
        "Physical Education",
        "Religious Studies",
        "Science",
        "Spanish"
      ],
      years10to11: {
        core: [
          "English Language",
          "English Literature",
          "Mathematics",
          "Science",
          "Core Physical Education",
          "Religion, Self and Society"
        ],
        courses: [
          "Art",
          "Business Studies",
          "Computing",
          "Drama",
          "Food and Nutrition",
          "French",
          "Geography",
          "History",
          "Land Based Studies",
          "Media Studies",
          "Photography",
          "Physical Education GCSE",
          "Psychology",
          "Triple Science"
        ]
      },
      years12to13: []
    }
  }
};

window.LEARNING_HUB_DEFAULT_SCHOOL = "reepham";
