const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const file = relative => fs.readFileSync(path.join(__dirname, '..', relative), 'utf8');

test('the call marker uses the exact irregular Code First WRITE stroke', () => {
  const marker = file('assets/h446-lesson/keyword-highlighter.css');
  const demo = file('assets/j277-coding-demo.css');
  assert.match(marker, /\.rhsc-skills-activity mark\.rhsc-skill-start\s*\{/);
  assert.match(marker, /\.rhsc-skills-activity mark\.rhsc-skill-start::before\s*\{/);
  assert.match(marker, /transform:rotate\(-2\.4deg\)/);
  assert.match(marker, /background-image:url\("data:image\/svg\+xml/);
  assert.match(marker, /background-color:transparent!important/);
  assert.match(demo, /\.skill-demo-line \.rhsc-skill-start\{margin-left:auto\}/);
});

test('the shared renderer adds START HERE only for an explicitly selected call line', () => {
  const renderer = file('assets/skills-system.js');
  assert.match(renderer, /function numberedCode\(lines, options = \{\}\)/);
  assert.match(renderer, /options\.startLine === index \+ 1/);
  assert.match(renderer, /marker\.className = 'rhsc-skill-start'/);
  assert.match(renderer, /source\.append\(' ', marker\)/);
});

for (const skill of ['procedures', 'functions']) {
  test(`${skill} places the marker at the call in each difficulty and the Demo`, () => {
    const app = file(`exercise/paper2/${skill}-app.js`);
    const page = file(`exercise/paper2/${skill}/index.html`);
    assert.match(app, /startLine=program\?1:/);
    assert.match(app, /ending\+2:null/);
    assert.match(page, /keyword-highlighter\.css\?v=20261115-write-brush2/);
  });
}

test('shared subprogram Demo draws the same brush marker', () => {
  const demo = file('assets/j277-coding-demo.js');
  assert.match(demo, /row\.append\(make\('mark', 'rhsc-skill-start', 'START HERE'\)\)/);
});
