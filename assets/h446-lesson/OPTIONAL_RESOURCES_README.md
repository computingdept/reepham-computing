# Optional teaching phases – OCR H446

All existing H446 lesson pages support **Catch Up** and **Exam Practice** automatically, using shared JavaScript and CSS.

## Add content to a lesson
Place one or both files in the lesson folder, e.g. `lessons/h446/lesson-030/`:

- `catch-up.json` — displays **Catch Up**.
- `exam-practice.json` — displays **Exam Practice**.

Neither button appears until its file contains at least one usable task. Both sections appear after **You Do**, before Key Vocabulary, with the normal navigation, L### badge, coloured routines and phone swipes. No changes to individual lesson HTML or CSS are required. Do not create empty placeholders.

## Exam Practice example

```json
{
  "title": "Half adders",
  "intro": "Complete You Do before attempting these questions.",
  "questions": [
    {
      "title": "Half-adder outputs",
      "prompt": "For A=1, B=1, give Sum and Carry.",
      "marks": 2,
      "answer": "Sum = 0; Carry = 1.",
      "steps": ["1 XOR 1 = 0", "1 AND 1 = 1"],
      "marksBreak": ["1 mark for Sum", "1 mark for Carry"]
    }
  ]
}
```

## Catch Up example

```json
{
  "title": "Before you start",
  "intro": "Revisit the earlier knowledge you need.",
  "items": [
    {
      "title": "Binary addition",
      "prompt": "What is 1 + 1 in binary?",
      "answer": "10₂",
      "steps": ["Write 0 in this column", "Carry 1 to the next column"]
    }
  ]
}
```

For Karnaugh maps, include the optional `cols`, `rows`, `values`, `colName`, `rowName` and `groups` arrays in each question; see Lesson 029's `exam-practice.json` for a complete example. The printable worksheet and Classroom TV read the **same JSON file**, so answers need updating only once.

**This is a public teaching pilot.** Do not place confidential data or copyrighted ExamBuilder papers in public lesson files.
