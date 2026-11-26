"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const {ASSETS, LOADERS, plan} = require("../scripts/release-youdo.cjs");
function fixture() {
  const f = Object.fromEntries([...ASSETS, ...LOADERS].map(n => [n, "/* original */"]));
  f[ASSETS[1]] = '@import url("./h446-youdo-question-sheet.css?v=old");\n';
  f[ASSETS[5]] = '@import url("../h446-y13/h446-you-do.css?v=old");\n';
  f[LOADERS[0]] = "'<script src=\"../../../assets/h446-y13/h446-you-do.js?v=old\"></script>'";
  f["lessons/h446/lesson-233/index.html"] = '<link href="../../../assets/h446-y13/h446-you-do.css?v=old"><script src="../../../assets/h446-y13/h446-you-do.js?v=old"></script><section id="you-do">Original questions and answers</section>';
  f["lessons/j277/lesson-020/index.html"] = '<script src="../autumn2-rebuilt.js?v=old"></script><p>Code First</p>';
  f["lessons/h446/lesson-212/index.html"] = '<section id="you-do">Timed paper</section>';
  f["lessons/j277/lesson-120/index.html"] = '<script src="../year11-assessment.js?v=old"></script>';
  return f;
}
test("one fingerprint updates enrolled references and nested imports", () => {
  const f = fixture(), p = plan(f), v = p.version;
  assert.match(v, /^[0-9a-f]{12}$/);
  for (const key of [ASSETS[1], ASSETS[5], LOADERS[0], "lessons/h446/lesson-233/index.html", "lessons/j277/lesson-020/index.html"]) {
    assert.ok(p.updates[key].includes("?v=" + v), key);
    assert.equal(p.updates[key].replaceAll("?v=" + v, "?v=old"), f[key]);
  }
  assert.equal(p.updates["lessons/h446/lesson-212/index.html"], undefined);
  assert.equal(p.updates["lessons/j277/lesson-120/index.html"], undefined);
  const next = {...f, ...p.updates};
  assert.equal(plan(next).version, v);
  assert.deepEqual(plan(next).updates, {});
  next[ASSETS[0]] += "\n/* new behaviour */";
  assert.notEqual(plan(next).version, v);
});
test("external URLs and non-enrolled lessons are not changed", () => {
  const f = fixture();
  f["lessons/h446/lesson-001/index.html"] = '<a href="https://example.com/h446-you-do.js?v=old">external</a><p>h446-you-do.js?v=old</p>';
  assert.equal(plan(f).updates["lessons/h446/lesson-001/index.html"], undefined);
});
test("missing asset aborts the entire plan", () => {
  const f = fixture(); delete f[ASSETS[0]];
  assert.throws(() => plan(f), /Missing release source/);
});

test("legacy GCSE adapters, preview assets and static renderers share the release version", () => {
  const f=fixture();
  f["assets/j277/youdo-unified.js"]='css.href="../../../assets/j277/youdo-unified.css?v=old";';
  f["assets/j277/youdo-unified.css"]='@import url("../h446-y13/h446-you-do.css?v=old");';
  f["lessons/j277/h446-adapter.js"]='const ui = "../../../assets/j277/youdo-unified.js?v=old";';
  f["lessons/j277/lesson-004/index.html"]='<script src="../h446-adapter.js?v=old"></script>';
  f["lessons/j277/autumn2-rebuilt.js"]='const bank = "../../../assets/j277/year11-bank-preview.js?v=old";';
  const p=plan(f);
  for(const key of ["assets/j277/youdo-unified.js","assets/j277/youdo-unified.css","lessons/j277/h446-adapter.js","lessons/j277/lesson-004/index.html","lessons/j277/autumn2-rebuilt.js"]){
    assert.ok(p.updates[key].includes("?v="+p.version),key);
    assert.equal(p.updates[key].replaceAll("?v="+p.version,"?v=old"),f[key]);
  }
  assert.deepEqual(plan({...f,...p.updates}).updates,{});
});
