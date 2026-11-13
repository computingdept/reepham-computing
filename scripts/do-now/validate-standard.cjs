"use strict";

const fs = require("node:fs");
const path = require("node:path");
const standard = require("../../data/do-now/standard-v1.json");

const fail = (where, message) => { throw new Error(`${where}: ${message}`); };
const nonBlank = (value) => typeof value === "string" && value.trim().length > 0;
const text = (where, value) => { if (!nonBlank(value)) fail(where, "requires non-empty text"); };
const sources = (where, value) => {
  if (!Array.isArray(value) || !value.length || !value.every(nonBlank))
    fail(where, "requires at least one taught-sequence/source reference");
};

function validateLessonBank(bank, label = "bank") {
  if (!bank || bank.schemaVersion !== standard.version) fail(label, `expected v${standard.version} schema`);
  text(`${label}.course`, bank.course);
  if (!['draft', 'published'].includes(bank.status)) fail(label, "status must be draft or published");
  if (!bank.lessons || Array.isArray(bank.lessons) || typeof bank.lessons !== "object" || !Object.keys(bank.lessons).length)
    fail(label, "lessons must be a non-empty object");

  const ids = new Set();
  let trueCount = 0;
  let falseCount = 0;
  for (const [lessonId, lesson] of Object.entries(bank.lessons)) {
    const where = `${label}.lessons.${lessonId}`;
    text(`${where}.title`, lesson.title);
    if (!Array.isArray(lesson.questions) || lesson.questions.length !== standard.questionCount)
      fail(where, `requires exactly ${standard.questionCount} ordered questions`);
    if (bank.status === 'published' && lesson.approved !== true)
      fail(where, "published lessons require teacher approval");

    lesson.questions.forEach((question, index) => {
      const rule = standard.slots[index];
      const loc = `${where}.questions[${index}]`;
      if (!question || typeof question !== 'object') fail(loc, "question must be an object");
      text(`${loc}.id`, question.id);
      if (ids.has(question.id)) fail(loc, `duplicate question ID ${question.id}`);
      ids.add(question.id);
      if (question.type !== rule.type) fail(loc, `Q${index + 1} must be ${rule.type}`);
      if (question.role !== rule.role) fail(loc, `Q${index + 1} must have role ${rule.role}`);
      sources(`${loc}.sourceRefs`, question.sourceRefs);
      if (question.diagnostic === true && index !== 0)
        fail(loc, "diagnostic exception applies only to the first question");
      if (bank.status === 'published' && question.reviewed !== true)
        fail(loc, "published questions require teacher review");

      if (index === 0) {
        text(`${loc}.statement`, question.statement);
        if (typeof question.correct !== 'boolean') fail(loc, "True/False requires a Boolean answer");
        text(`${loc}.explanation`, question.explanation);
        if (!question.correct) {
          text(`${loc}.correction`, question.correction);
          falseCount++;
        } else trueCount++;
      } else if (index === 1) {
        text(`${loc}.stem`, question.stem);
        if (!Array.isArray(question.options) || question.options.length !== 4 ||
            !question.options.every(nonBlank) ||
            new Set(question.options.map(s => s.trim().toLocaleLowerCase('en-GB'))).size !== 4)
          fail(loc, "MCQ must have four distinct non-empty options");
        if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3)
          fail(loc, "MCQ correctIndex must be 0–3");
        text(`${loc}.explanation`, question.explanation);
      } else {
        text(`${loc}.prompt`, question.prompt);
        text(`${loc}.modelAnswer`, question.modelAnswer);
      }
    });
  }
  if (bank.status === 'published' && trueCount + falseCount >= 10) {
    const proportion = trueCount / (trueCount + falseCount);
    if (proportion < .3 || proportion > .7)
      fail(label, `Q1 True/False balance is ${Math.round(proportion * 100)}% true; review distribution`);
  }
  return {course:bank.course, lessons:Object.keys(bank.lessons).length,
    questions:ids.size, trueCount, falseCount, status:bank.status};
}

if (require.main === module) {
  const root = path.resolve(__dirname, '../..');
  const files = process.argv.slice(2).map(p => path.resolve(p));
  if (!files.length) {
    for (const folder of ['data/do-now/examples', 'data/do-now/banks']) {
      const directory = path.join(root, folder);
      if (fs.existsSync(directory))
        files.push(...fs.readdirSync(directory).filter(f => f.endsWith('.json')).map(f => path.join(directory, f)));
    }
  }
  if (!files.length) fail('standard', 'no authoring banks or examples found');
  for (const file of files) {
    const summary = validateLessonBank(JSON.parse(fs.readFileSync(file, 'utf8')), path.relative(root, file));
    console.log(`DO_NOW_STANDARD_OK ${JSON.stringify(summary)}`);
  }
}

module.exports = {validateLessonBank};
