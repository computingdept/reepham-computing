const test = require("node:test");
const assert = require("node:assert/strict");
const {parseMarkScheme} = require("../assets/h446-lesson/model-answer-marks.js");

test("formats the five H446 quicksort marking points without changing their meaning", () => {
  const answer = "[5] First pivot = 6 [1]; smaller [2,5,1] [1]; larger [9] [1]; sort the left sublist to [1,2,5] [1]; final result [1,2,5,6,9] [1].";
  const result = parseMarkScheme(answer);
  assert.equal(result.total, 5);
  assert.deepEqual(result.points.map(point => point.marks), [1,1,1,1,1]);
  assert.equal(result.points[4].wording, "final result [1,2,5,6,9]");
});

test("preserves a shorter answer with mixed mark weights", () => {
  assert.deepEqual(parseMarkScheme("[4] Two balanced partitions [2]; recurse until sublists contain one element [2].")?.points.map(p=>p.marks), [2,2]);
});

test("does not split a normal explanation containing semicolons", () => {
  assert.equal(parseMarkScheme("A cache is fast; RAM is slower."), null);
});

test("does not transform a code statement with semicolons", () => {
  assert.equal(parseMarkScheme("[3] for (i=0; i<3; i++) print(i) [3]"), null);
});

test("does not transform an answer if point marks do not equal the stated total", () => {
  assert.equal(parseMarkScheme("[5] First point [1]; second point [1]."), null);
});

test("does not treat bare array values as mark allocations", () => {
  assert.equal(parseMarkScheme("[2] smaller [1]; larger [2]"), null);
});
