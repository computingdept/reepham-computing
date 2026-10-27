/* RHSC shared marker highlighting — common to KS3, J277 and H446.
   Vocabulary is sourced from the lesson's existing, teacher-authored term chips. */
(function(){
'use strict';
if(!/^\/lessons\/(?:j277|h446|year[789])\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
if(document.documentElement.hasAttribute('data-rhsc-marker-ready'))return;
document.documentElement.setAttribute('data-rhsc-marker-ready','20261026');
var link=document.createElement('link');
link.rel='stylesheet';link.href='../../../assets/h446-lesson/keyword-highlighter.css?v=20261027-ks3vocab1';
document.head.appendChild(link);

var excluded='script,style,pre,code,kbd,samp,svg,math,button,a,mark,.vocab-tip,.vocab-answer,.youdo-solution,.wedo-answer,.model-answer,.solution-card,.answer-panel,.j277-sm-review,.phase-tag,[hidden],[aria-hidden="true"],[data-vocab-answer]';
var chips=[...document.querySelectorAll('#overview .vocab-intro-list > span')];
// Older H446 lessons use plain chips; some later lessons show a glossary as
// Key vocabulary paragraphs instead. Read ONLY terms visibly authored in Overview.
document.querySelectorAll('#overview h2').forEach(function(heading){
  if(!/^key vocabulary/i.test(heading.textContent.trim()))return;
  heading.parentElement.querySelectorAll(':scope > p > strong,:scope > ul > li > strong').forEach(function(el){
    chips.push(el);
  });
});
chips.forEach(function(chip){chip.classList.add('rhsc-preview-term')});
var vocabulary=[];
chips.forEach(function(chip){
  var full=chip.textContent.replace(/\s+/g,' ').trim();
  (full.includes(' / ')?full.split(/\s+\/\s+/):[full]).forEach(function(word){
    word=word.trim();
    if(word.length<3||word.length>45||!/[a-z]/i.test(word))return;
    if(!vocabulary.some(function(v){return v.toLowerCase()===word.toLowerCase()}))vocabulary.push(word);
  });
});
vocabulary.sort(function(a,b){return b.length-a.length});
vocabulary=vocabulary.slice(0,20);

function textNodes(root){
  var walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[],node;
  while((node=walk.nextNode())){
    if(!node.nodeValue.trim()||!node.parentElement||node.parentElement.closest(excluded))continue;
    nodes.push(node);
  }
  return nodes;
}
function wrap(node,start,length,cls){
  var part=node.splitText(start);
  part.splitText(length);
  var mark=document.createElement('mark');
  mark.className=cls;
  mark.textContent=part.nodeValue;
  part.replaceWith(mark);
}
function matchTerm(text,term){
  var escaped=term.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&');
  var found=new RegExp('(^|[^A-Za-z0-9_])('+escaped+')(?=$|[^A-Za-z0-9_])','i').exec(text);
  return found?{start:found.index+found[1].length,length:found[2].length}:null;
}
// Manual vocabulary markings in Lesson 002 remain authoritative.
function markVocabulary(){
  if(!vocabulary.length||document.querySelector('mark.rhsc-keyword'))return;
  ['new-learning','i-do','we-do'].forEach(function(id){
    var page=document.getElementById(id);
    if(!page)return;
    var used=new Set(),count=0;
    page.querySelectorAll('h2,h3,p,li').forEach(function(block){
      if(count>=6||block.closest(excluded)||block.querySelector('mark'))return;
      var nodes=textNodes(block);
      for(var i=0;i<vocabulary.length;i++){
        var term=vocabulary[i];
        if(used.has(term.toLowerCase()))continue;
        var found=null;
        for(var j=0;j<nodes.length;j++){
          var pos=matchTerm(nodes[j].nodeValue,term);
          if(pos){found={node:nodes[j],pos:pos};break;}
        }
        if(found){
          wrap(found.node,found.pos.start,found.pos.length,'rhsc-shared-keyword');
          used.add(term.toLowerCase());count++;
          break;
        }
      }
    });
  });
}
var commandWords=/\b(?:Add|Analyse|Annotate|Calculate|Compare|Complete|Convert|Define|Describe|Design|Discuss|Draw|Evaluate|Explain|Give|Identify|Justify|Label|List|Order|Outline|Refine|Show|Solve|State|Tick|Write)\b/gi;
function markCommands(){
  document.querySelectorAll('#you-do .question-text,#you-do .youdo-question-prompt h2,#you-do .j277-sm-question').forEach(function(block){
    if(block.hasAttribute('data-rhsc-command-ready'))return;
    if(block.closest('.j277-code-first,.j277-code-first-preview,.youdo-solution,.j277-sm-review,[data-answer-mode="true"]'))return;
    block.setAttribute('data-rhsc-command-ready','true');
    if(block.querySelector('mark.j277-sm-command,mark.rhsc-shared-command'))return;
    var count=0;
    textNodes(block).forEach(function(node){
      if(count>=2)return;
      commandWords.lastIndex=0;
      var matches=[...node.nodeValue.matchAll(commandWords)].slice(0,2-count);
      // Work right to left so two command words in one question stay intact.
      matches.reverse().forEach(function(match){
        wrap(node,match.index,match[0].length,'rhsc-shared-command');
        count++;
      });
    });
  });
}
markVocabulary();
markCommands();
// J277 exam questions may load from JSON after the main lesson finishes.
var youDo=document.getElementById('you-do');
if(youDo&&typeof MutationObserver!=='undefined'){
  var pending=false;
  var observer=new MutationObserver(function(changes){
    if(pending||!changes.some(function(change){return change.addedNodes.length>0}))return;
    pending=true;
    requestAnimationFrame(function(){pending=false;markCommands()});
  });
  observer.observe(youDo,{subtree:true,childList:true});
}
})();