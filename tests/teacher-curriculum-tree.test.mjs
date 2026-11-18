import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createContext, runInContext, Script } from 'node:vm';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'my-work-teacher-assign-pilot.html'), 'utf8');
const catalog = JSON.parse(readFileSync(join(root, 'assets/j277-assignment-catalog.json'), 'utf8')).items;
const script = html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'teacher page has its assignment script');
new Script(script, { filename: 'teacher-assignment-page.js' });

class Element {
  constructor(tagName = 'div') {
    this.tagName = tagName;
    this.children = [];
    this.dataset = {};
    this.listeners = {};
    this.className = '';
    this.textContent = '';
    this.checked = false;
    this.hidden = false;
    this.value = '';
  }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = [...children]; }
  addEventListener(event, handler) { this.listeners[event] = handler; }
  setAttribute(name, value) { this[name] = value; }
  descendants() {
    return this.children.flatMap(child => [child, ...(child.descendants?.() || [])]);
  }
  querySelectorAll(selector) {
    const nodes = this.descendants();
    if (selector === 'details') return nodes.filter(node => node.tagName === 'details');
    if (selector === 'input[type="checkbox"]:checked') {
      return nodes.filter(node => node.tagName === 'input' && node.type === 'checkbox' && node.checked);
    }
    if (selector === 'summary .bundle-tree-count') {
      return nodes.filter(node => node.className === 'bundle-tree-count');
    }
    throw new Error('Unexpected test selector: ' + selector);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}

function harness() {
  const nodes = new Map();
  const document = {
    getElementById(id) { if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id); },
    createElement(tagName) { return new Element(tagName); },
    createTextNode(value) { const node = new Element('#text'); node.textContent = value; return node; }
  };
  const $ = id => document.getElementById(id);
  const context = createContext({ document, $, catalog, bundleSelected:new Set(), bundlePending:null });
  const maps = script.slice(script.indexOf('const BUNDLE_HALF_TERMS ='), script.indexOf('const bundleUKDate ='));
  const picker = script.slice(script.indexOf('function cancelBundleReview()'), script.indexOf('function renderBundleRules()'));
  assert.ok(maps.includes('BUNDLE_FIRST_TAUGHT') && picker.includes('renderBundleChoices'));
  runInContext(maps + '\n' + picker, context);

  const render = (year, term) => {
    $('bundle-year').value = year;
    $('bundle-half-term').value = term;
    runInContext('renderBundleChoices()', context);
    const rootNode = $('bundle-choices');
    const leaves = rootNode.descendants().filter(node => node.tagName === 'input' && node.type === 'checkbox');
    const branches = rootNode.descendants().filter(node => node.tagName === 'details');
    return { leaves, branches, text: rootNode.descendants().map(node => node.textContent).join(' ') };
  };
  return { render, context, $ };
}

test('Year 10 half-terms progressively expose taught J277 content', () => {
  const { render } = harness();
  const autumn1 = render('Y10', '1');
  const autumn2 = render('Y10', '2');
  const spring1 = render('Y10', '3');
  const spring2 = render('Y10', '4');
  const summer1 = render('Y10', '5');
  const summer2 = render('Y10', '6');
  assert.ok(autumn1.leaves.length > 20);
  assert.ok(autumn2.leaves.length > autumn1.leaves.length);
  assert.ok(spring1.leaves.length > autumn2.leaves.length);
  assert.ok(spring2.leaves.length > spring1.leaves.length);
  assert.ok(summer1.leaves.length > spring2.leaves.length);
  assert.equal(summer2.leaves.length, 95);
  assert.match(autumn1.text, /Binary addition/);
  assert.doesNotMatch(autumn1.text, /Network Hardware/);
  assert.match(autumn2.text, /Network Hardware/);
  assert.doesNotMatch(autumn2.text, /Variables & Constants/);
  assert.match(spring2.text, /Variables & Constants/);
  assert.doesNotMatch(spring2.text, /Merge sort/);
  assert.match(summer2.text, /Merge sort/);
});

test('tree groups every activity once under its paper, topic and specification point', () => {
  const { render } = harness();
  const { leaves, branches } = render('Y11', 'all');
  assert.equal(leaves.length, 95);
  assert.equal(branches.filter(node => node.className === 'bundle-paper').length, 2);
  assert.equal(branches.filter(node => node.className === 'bundle-topic').length, 11);
  assert.ok(branches.filter(node => node.className === 'bundle-spec').length >= 25);
});

test('Year 11 and Year 13 can see the full available catalogue', () => {
  const { render } = harness();
  assert.equal(render('Y11', 'all').leaves.length, 95);
  assert.equal(render('Y13', 'all').leaves.length, 2);
  assert.equal(render('Y12', '2').leaves.length, 2);
});

test('later-term choices are removed if the teacher narrows the half-term', () => {
  const { render, context, $ } = harness();
  const late = render('Y10', '2');
  const chosen = late.leaves.find(node => node.getAttributeLabel?.includes('Network Hardware'));
  const networkInput = chosen || late.leaves.find(node => node['aria-label']?.includes('Network Hardware'));
  assert.ok(networkInput);
  networkInput.checked = true;
  networkInput.listeners.change();
  assert.equal(context.bundleSelected.size, 1);
  const early = render('Y10', '1');
  assert.equal(context.bundleSelected.size, 0);
  assert.match($('bundle-filter-note').textContent, /1 out-of-range selection was removed/);
  assert.ok(early.leaves.every(node => !node.checked));
});
