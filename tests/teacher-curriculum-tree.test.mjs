import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createContext, runInContext, Script } from 'node:vm';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'my-work-teacher-assign-pilot.html'), 'utf8');
const catalog = JSON.parse(readFileSync(join(root, 'assets/j277-assignment-catalog.json'), 'utf8')).items;
const relationships = JSON.parse(readFileSync(join(root, 'assets/assignment-relationships.json'), 'utf8'));
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
    if (selector === 'input[type="checkbox"]') {
      return nodes.filter(node => node.tagName === 'input' && node.type === 'checkbox');
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
  const context = createContext({ document, $, catalog, bundleSelected:new Set(), bundlePending:null, relationFixture:relationships });
  const maps = script.slice(script.indexOf('const BUNDLE_HALF_TERMS ='), script.indexOf('const bundleUKDate ='));
  const picker = script.slice(script.indexOf('function cancelBundleReview()'), script.indexOf('function renderBundleRules()'));
  assert.ok(maps.includes('BUNDLE_FIRST_TAUGHT') && picker.includes('renderBundleChoices'));
  runInContext(maps + '\n' + picker, context);
  runInContext('bundleRelationships = relationFixture', context);
  runInContext("function status(id, message, kind = '') { $(id).textContent = message; }", context);

  const render = (year, term, kind = 'skill') => {
    $('bundle-year').value = year;
    $('bundle-half-term').value = term;
    assert.ok(['skill','practice'].includes(kind));
    runInContext(`bundleKind = '${kind}'`, context);
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
  const counts = [1,2,3,4,5,6].map(term =>
    render('Y10',String(term),'skill').leaves.length + render('Y10',String(term),'practice').leaves.length);
  assert.ok(counts[0] > 20);
  for (let i=1;i<counts.length;i++) assert.ok(counts[i]>counts[i-1]);
  assert.equal(counts.at(-1),95);
  assert.match(render('Y10','1','skill').text,/Binary addition/);
  assert.doesNotMatch(render('Y10','1','skill').text,/Network Hardware/);
  assert.match(render('Y10','2','skill').text,/Network Hardware/);
  assert.doesNotMatch(render('Y10','2','skill').text,/Variables & Constants/);
  assert.match(render('Y10','4','skill').text,/Variables & Constants/);
  assert.doesNotMatch(render('Y10','4','practice').text,/Merge sort/);
  assert.match(render('Y10','6','practice').text,/Merge sort/);
});

test('two compact lists cover the whole J277 catalogue without duplicate activities', () => {
  const { render } = harness();
  const skills = render('Y11','all','skill');
  const mcqs = render('Y11','all','practice');
  assert.equal(skills.leaves.length,25);
  assert.equal(mcqs.leaves.length,70);
  const ids = [...skills.leaves,...mcqs.leaves].map(node=>node.dataset.activityId);
  assert.equal(new Set(ids).size,95);
  assert.ok(skills.branches.every(node=>node.className==='bundle-topic'));
  assert.ok(mcqs.branches.every(node=>node.className==='bundle-topic'));
});

test('Year 11 and Year 13 can see the full available course catalogue', () => {
  const { render } = harness();
  assert.equal(render('Y11','all','skill').leaves.length + render('Y11','all','practice').leaves.length,95);
  assert.equal(render('Y13','all','skill').leaves.length + render('Y13','all','practice').leaves.length,173);
  const autumn2 = render('Y12', '2');
  assert.ok(autumn2.leaves.length > 2 && autumn2.leaves.length < 16);
  assert.match(autumn2.text, /Conversion grid/);
  assert.doesNotMatch(autumn2.text, /Shortest Paths Lab/);
});

test('H446 branches use A Level headings and show score-reporting limits', () => {
  const { render } = harness();
  const skills = render('Y13','all','skill');
  const revision = render('Y13','all','practice');
  assert.equal(skills.leaves.length,16);
  assert.equal(revision.leaves.length,157);
  assert.equal(revision.branches.length,8);
  assert.match(revision.text, /1\.3 · Exchanging Data/);
  assert.match(revision.text, /1\.4\.2 · Data structures/);
  assert.doesNotMatch(revision.text, /1\.4\.2 · Network security measures/);
  assert.match(skills.text, /no automatic score/);
  assert.match(revision.text, /score saved on completion/);
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

test('selection panel allows removing a task without losing tree position', () => {
  const { render, context, $ } = harness();
  const { leaves, branches } = render('Y12', '2');
  assert.equal($('bundle-review-button').disabled, true);
  leaves[0].checked = true;
  leaves[0].listeners.change();
  assert.equal(context.bundleSelected.size, 1);
  assert.equal($('bundle-review-button').disabled, false);
  const remove = $('bundle-summary').descendants().find(node => node.className === 'bundle-remove');
  assert.ok(remove, 'selected task has its own remove button');
  remove.listeners.click();
  assert.equal(context.bundleSelected.size, 0);
  assert.equal(leaves[0].checked, false);
  assert.equal($('bundle-review-button').disabled, true);
  assert.ok(branches.some(node => node.open), 'the tree remains expanded after removing a task');
});

test('every Skill has valid curated revision links and teacher can add them without switching lists', () => {
  const all = new Map(catalog.map(item => [item.id,item]));
  const skills = catalog.filter(item => item.type === 'skill');
  assert.equal(Object.keys(relationships).length,skills.length);
  for (const skill of skills) {
    const related = relationships[skill.id];
    assert.ok(Array.isArray(related) && related.length, `Missing relationship for ${skill.id}`);
    for (const id of related) {
      const other = all.get(id);
      assert.ok(other && other.type === 'practice', `Invalid revision link ${id}`);
      assert.equal(other.id.slice(0,4),skill.id.slice(0,4));
    }
  }
  const { render,context } = harness();
  const skillsTree = render('Y13','all','skill');
  const button = skillsTree.branches[0].descendants().find(node => node.className === 'bundle-add-related');
  assert.ok(button);
  button.listeners.click();
  assert.ok(context.bundleSelected.size > 0);
  const revisionTree = render('Y13','all','practice');
  assert.equal(revisionTree.leaves.filter(node => node.checked).length,context.bundleSelected.size);
});
