const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../revision/h446/section-2-3/dijkstra-lab.html'), 'utf8');

function functionSource(name, nextName) {
  const start = source.indexOf(`function ${name}(`);
  const end = source.indexOf(`\nfunction ${nextName}(`, start);
  assert.ok(start !== -1 && end !== -1, `Could not find ${name}`);
  return source.slice(start, end);
}

// Exercise the page's real checker, with only its browser inputs and display stubbed.
const checker = [
  functionSource('adjacent', 'solve'),
  functionSource('fmt', 'esc'),
  functionSource('applyUpdate', 'checkRoute'),
].join('\n');

const graph = {
  v: [['A'], ['B'], ['C'], ['D'], ['E'], ['F']],
  e: [
    ['A', 'B', 9], ['A', 'C', 2], ['C', 'B', 3], ['B', 'D', 2],
    ['C', 'E', 6], ['E', 'D', 1], ['D', 'F', 3], ['E', 'F', 9],
  ],
  start: 'A', goal: 'F',
};

function runUpdate({ eDistance = '8', ePrevious = 'C', knownE = 8 } = {}) {
  const attempts = [];
  const feedback = { textContent: '', className: '' };
  const state = {
    g: graph,
    dist: { A: 0, B: 5, C: 2, D: 7, E: knownE, F: Infinity },
    previous: { B: 'C', C: 'A', D: 'B', E: 'C' },
    visited: new Set(['A', 'C', 'B']),
    focus: 'D', stage: 'update',
  };
  const fields = {
    '[data-distance="E"]': eDistance,
    '[data-prev="E"]': ePrevious,
    '[data-distance="F"]': '10',
    '[data-prev="F"]': 'D',
  };
  const context = {
    state,
    workspace: { querySelector: selector => selector === '.feedback'
      ? feedback
      : Object.hasOwn(fields, selector) ? { value: fields[selector] } : null },
    firstAttempt: correct => attempts.push(correct),
    renderGraph: () => {},
    feedback: '', feedbackType: '', stageFirst: true,
  };
  vm.runInNewContext(`${checker}\napplyUpdate();`, context);
  return { state, attempts, feedback };
}

test('Dijkstra accepts the original predecessor when two routes to E cost 8', () => {
  const { state, attempts } = runUpdate({ ePrevious: 'C' });
  assert.deepEqual(attempts, [true]);
  assert.equal(state.previous.E, 'C');
  assert.equal(state.dist.E, 8);
  assert.equal(state.dist.F, 10);
  assert.equal(state.previous.F, 'D');
  assert.ok(state.visited.has('D'));
});

test('Dijkstra accepts the alternate equal-cost predecessor without losing first-attempt credit', () => {
  const { state, attempts } = runUpdate({ ePrevious: 'D' });
  assert.deepEqual(attempts, [true]);
  assert.equal(state.previous.E, 'D');
  assert.equal(state.dist.E, 8);
  assert.ok(state.visited.has('D'));
});

test('Dijkstra still rejects an incorrect predecessor or total cost', () => {
  const wrongPredecessor = runUpdate({ ePrevious: 'B' });
  assert.deepEqual(wrongPredecessor.attempts, [false]);
  assert.equal(wrongPredecessor.state.visited.has('D'), false);
  assert.match(wrongPredecessor.feedback.textContent, /C or D/);

  const wrongCost = runUpdate({ eDistance: '9', ePrevious: 'D' });
  assert.deepEqual(wrongCost.attempts, [false]);
  assert.equal(wrongCost.state.visited.has('D'), false);
});

test('Dijkstra does not accept a longer route as an alternative predecessor', () => {
  const { state, attempts } = runUpdate({ knownE: 6, eDistance: '6', ePrevious: 'D' });
  assert.deepEqual(attempts, [false]);
  assert.equal(state.visited.has('D'), false);
});
