"use strict";

// J277 Do Now only: keep MCQ choices short enough for the 2×2 projector layout.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");
const bank = require(path.join(root, "lessons/j277/donow-bank-20261020.json"));
const catchup = require(path.join(root, "data/catchup/j277-donow-mcq-20261030.json"));
const choices = "ABCD";
const wordCount = (s) => s.trim().split(/\s+/).length;

assert.equal(Object.keys(bank.lessons).length, 164);
let singleWord = 0;
let twoWord = 0;
for (const [id, entry] of Object.entries(bank.lessons)) {
  assert.equal(entry.questions.length, 4, `${id}: four Do Now questions`);
  const q = entry.questions[1];
  assert.equal(q.format, "MCQ", `${id}: Q2 is MCQ`);
  assert.equal(q.options.length, 4, `${id}: four options`);
  assert.equal(new Set(q.options).size, 4, `${id}: unique options`);
  assert.ok(choices.includes(q.correct_option), `${id}: valid answer letter`);
  assert.equal(q.answer, `${q.correct_option} — ${q.options[choices.indexOf(q.correct_option)]}`,
    `${id}: answer reveal matches correct option`);
  for (const option of q.options) {
    assert.ok(wordCount(option) <= 2, `${id}: option too long: ${option}`);
    if (wordCount(option) === 1) singleWord++;
    else twoWord++;
  }
}

assert.equal(Object.keys(catchup.lessons).length, 30);
for (const [id, questions] of Object.entries(catchup.lessons)) {
  const q2 = questions.find(q => q.id === "dn2");
  assert.ok(q2, `${id}: Catch Up Q2 exists`);
  assert.equal(q2.options.length, 4, `${id}: Catch Up has four choices`);
  assert.ok(q2.options.every(o => wordCount(o) <= 2), `${id}: Catch Up options short`);
  assert.ok(q2.options.includes(q2.answer), `${id}: Catch Up correct answer exists`);
  // 019/020 were already deliberately different from the classroom Q2.
  if (id !== "019" && id !== "020") {
    const main = bank.lessons[id].questions[1];
    assert.equal(q2.prompt, main.question, `${id}: same question in Catch Up`);
    assert.deepEqual(q2.options, main.options, `${id}: same options in Catch Up`);
    assert.equal(q2.answer, main.options[choices.indexOf(main.correct_option)]);
  }
}

// Lessons 001 and 002 have hand-authored HTML; they must stay in step with the bank.
for (const id of ["001", "002"]) {
  const html = fs.readFileSync(path.join(root, `lessons/j277/lesson-${id}/index.html`), "utf8");
  const q2 = bank.lessons[id].questions[1];
  const doNow = html.match(/<section id="do-now"[\s\S]*?<\/section>/)?.[0];
  assert.ok(doNow, `${id}: static Do Now exists`);
  assert.ok(doNow.includes(q2.question), `${id}: static Q2 text matches bank`);
  for (const option of q2.options) {
    assert.ok(doNow.includes(`<li>${option}</li>`), `${id}: static option ${option} matches bank`);
  }
}

console.log(`J277 Do Now MCQs checked: 164 lessons, ${singleWord} one-word and ${twoWord} two-word options; 30 Catch Up Q2s checked`);
