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
  }
};

window.LEARNING_HUB_DEFAULT_SCHOOL = "reepham";
