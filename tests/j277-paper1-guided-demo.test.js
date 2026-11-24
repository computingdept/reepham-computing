'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const guided=require('../assets/j277-paper1-guided-demo.js');

test('All twenty supported J277 Paper 1 Skills have explained separate examples',()=>{
  const ids=['convert','add','shift','count','units','text','ascii','image',
    'sound','pixels','address','hardware','topology','dns','protocol','impact','memory','storage','cpu','legislation'];
  assert.deepEqual([...guided.skills].sort(),[...ids].sort());
  for(const id of ids){
    const q=guided.get(id);
    assert.ok(q.title&&q.task);
    assert.ok(q.steps.length>=3&&q.steps.length<=5);
    assert.ok(q.steps.every(s=>s.length===3&&s[0].length>2&&s[1].length>0&&s[2].length>20),id);
  }
});

test('Paper 1 page includes the central component and read-only question context',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../exercise/paper1/index.html'),'utf8');
  assert.match(html,/j277-paper1-guided-demo.css/);
  assert.match(html,/j277-paper1-guided-demo.js/);
  assert.match(html,/RHSCPaper1DemoContext=\(\)=>\(\{skill,level,question\}\)/);
});

test('CPU simulator uses a normal home tile, not a review banner',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../exercise/paper1/index.html'),'utf8');
  const home=html.slice(html.indexOf('<section id="home">'),html.indexOf('<section id="practice"'));
  assert.match(home,/rhsc-resource-card--skill[\s\S]*?skill=cpu-cycle/);
  assert.doesNotMatch(home,/rhsc-skills-review|PREVIEWS/);
  assert.match(html,/\$\('home'\)\.classList\.add\('hidden'\)/);
});

test('Opening and stepping a Demo does not change the question or progress',()=>{
  class Node {
    constructor(tag){this.tagName=tag;this.children=[];this.listeners={};this.className='';this.textContent='';this.hidden=false;this.classList={add:k=>{this.className+=' '+k;},remove:k=>{this.className=this.className.replace(k,'');}};}
    append(...x){this.children.push(...x);}
    replaceChildren(...x){this.children=x;}
    after(x){this.sibling=x;}
    addEventListener(name,fn){this.listeners[name]=fn;}
    click(){this.listeners.click?.();}
    setAttribute(k,v){this[k]=v;}
    focus(){}
    querySelector(q){return q==='.skill-top'?heading:null;}
  }
  const heading=new Node('div'),practice=new Node('section');
  const doc={getElementById:id=>id==='practice'?practice:null,createElement:tag=>new Node(tag),addEventListener:()=>{}};
  const score={value:7},answer={text:'in progress'};
  const win={scrollY:210,scrollTo:(_,y)=>{win.scrollY=y;},RHSCPaper1DemoContext:()=>({skill:'convert',level:'hard',question:{prompt:'Different conversion',answer}})};
  const ui=guided.mount(doc,win);
  ui.launch.click();
  assert.equal(ui.panel.hidden,false);
  assert.match(ui.panel.children[2].textContent,/Convert 26/);
  const controls=ui.panel.children[4];
  controls.children[0].click();
  assert.equal(ui.panel.children[3].children[0].children.length,4);
  ui.close();
  assert.equal(ui.panel.hidden,true);
  assert.equal(score.value,7);
  assert.equal(answer.text,'in progress');
  assert.equal(win.scrollY,210);
});
