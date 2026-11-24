/* OCR J277 Skill 32 · complete truth tables using the existing Logic Gates engine. */
(function(root,factory){
 const api=factory(typeof module==='object'&&module.exports?require('./logic.js'):root.J277Logic);
 if(typeof module==='object'&&module.exports)module.exports=api;else root.J277Truth=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(logic){
'use strict';
if(!logic)throw Error('Logic Gates engine is required.');
const {gate}=logic;
const easy=['AND','OR','NOT','OR','AND','NOT','AND','OR','NOT','AND'];
const medium=[
 ['AND','OR','pair'],['OR','AND','pair'],['AND','NOT','postnot'],['OR','NOT','postnot'],
 ['NOT','AND','prenot'],['NOT','OR','prenot'],['AND','AND','pair'],['OR','OR','pair'],['OR','AND','pair'],['AND','OR','pair']
];
const hard=[
 ['AND','OR','ab_notc'],['OR','AND','ab_notc'],['AND','OR','nota_bc'],['OR','AND','nota_bc'],
 ['AND','AND','ab_notc'],['OR','OR','ab_notc'],['OR','OR','nota_bc'],['AND','AND','nota_bc'],['OR','AND','ab_notc'],['AND','OR','ab_notc']
];
function makeQuestion(level,index){
 if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Truth Tables question');
 let inputs,columns,expressions,calculate;
 if(level==='easy'){
  const g=easy[index];inputs=g==='NOT'?['A']:['A','B'];columns=['Q'];expressions={Q:g==='NOT'?'NOT A':'A '+g+' B'};
  calculate=({A,B})=>({Q:gate(g,A,B)});
 }else if(level==='medium'){
  const [g1,g2,shape]=medium[index];inputs=shape==='pair'?['A','B','C']:['A','B'];columns=['X','Q'];
  expressions=shape==='pair'?{X:'A '+g1+' B',Q:'X '+g2+' C'}:shape==='postnot'?{X:'A '+g1+' B',Q:'NOT X'}:{X:'NOT A',Q:'X '+g2+' B'};
  calculate=({A,B,C})=>{const X=shape==='prenot'?gate('NOT',A):gate(g1,A,B);return {X,Q:shape==='postnot'?gate('NOT',X):gate(g2,X,shape==='pair'?C:B)};};
 }else{
  const [g1,g3,shape]=hard[index];inputs=['A','B','C'];columns=['X','Y','Q'];
  expressions=shape==='ab_notc'?{X:'A '+g1+' B',Y:'NOT C',Q:'X '+g3+' Y'}:{X:'NOT A',Y:'B '+g1+' C',Q:'X '+g3+' Y'};
  calculate=({A,B,C})=>{const X=shape==='ab_notc'?gate(g1,A,B):gate('NOT',A),Y=shape==='ab_notc'?gate('NOT',C):gate(g1,B,C);return {X,Y,Q:gate(g3,X,Y)};};
 }
 const rows=Array.from({length:2**inputs.length},(_,i)=>{
  const values=Object.fromEntries(inputs.map((name,j)=>[name,(i>>(inputs.length-j-1))&1]));
  return {inputs:values,outputs:calculate(values)};
 });
 // Easy has a worked first row; medium and hard require every output cell.
 const given=level==='easy'?[0]:[];
 const fields=rows.flatMap((r,i)=>given.includes(i)?[]:columns.map(col=>({id:i+'-'+col,row:i,col,answer:String(r.outputs[col])})));
 return {level,index,inputs,columns,expressions,rows,given,fields,prompt:'Complete the truth table.',context:'Use 0 for False and 1 for True. '+(level==='easy'?'The first row is completed for you.':'Calculate intermediate columns before Q.'),hint:'Work across one row at a time. AND needs both inputs to be 1; OR needs at least one; NOT reverses its input.',model:'Complete every input combination. '+Object.entries(expressions).map(([k,v])=>k+' = '+v).join('; ')+'.'};
}
function checkAnswer(q,r={}){const complete=q.fields.every(f=>r[f.id]==='0'||r[f.id]==='1');return{complete,correct:complete&&q.fields.every(f=>r[f.id]===f.answer)};}
function makeDemo(){
 const single={title:'One gate',task:'Complete a separate OR truth table, row by row.',codeLabel:'Boolean expression · Q = A OR B',traceTitle:'Truth table · all four combinations',columns:['A, B','Q'],lines:['Q = A OR B','A = 0, B = 0','A = 0, B = 1','A = 1, B = 0','A = 1, B = 1'],steps:[[2,'0, 0','0','Neither input is 1.'],[3,'0, 1','1','B is 1.'],[4,'1, 0','1','A is 1.'],[5,'1, 1','1','Both are 1; OR still gives 1.']],end:'Two inputs give four rows. Include 00, 01, 10 and 11.'};
 const combined={title:'Combined logic',task:'Work through a separate table where X = NOT A and Q = X AND B.',codeLabel:'Boolean expressions',traceTitle:'Truth table · intermediate results',columns:['A, B','X, Q'],lines:['X = NOT A','Q = X AND B','A = 0, B = 0','A = 0, B = 1','A = 1, B = 0','A = 1, B = 1'],steps:[[3,'0, 0','1, 0','NOT 0 gives 1. Then 1 AND 0 gives 0.'],[4,'0, 1','1, 1','NOT 0 gives 1. Both inputs to AND are 1.'],[5,'1, 0','0, 0','NOT 1 gives 0. AND gives 0.'],[6,'1, 1','0, 0','NOT 1 gives 0. AND gives 0.']],end:'Calculate X first on each row, then use X to find Q.'};
 const three={title:'Three inputs',task:'Complete all eight combinations for X = A AND B, Y = NOT C, Q = X OR Y.',codeLabel:'Boolean expressions',traceTitle:'All eight combinations',columns:['A, B, C','X, Y, Q'],lines:['X = A AND B','Y = NOT C','Q = X OR Y',...Array.from({length:8},(_,i)=>'Inputs: '+i.toString(2).padStart(3,'0').split('').join(', '))],steps:Array.from({length:8},(_,i)=>{const A=(i>>2)&1,B=(i>>1)&1,C=i&1,X=gate('AND',A,B),Y=gate('NOT',C),Q=gate('OR',X,Y);return[i+4,[A,B,C].join(', '),[X,Y,Q].join(', '),'X = '+A+' AND '+B+' = '+X+'. Y = NOT '+C+' = '+Y+'. Q = '+X+' OR '+Y+' = '+Q+'.'];}),end:'Three inputs give eight rows. Calculate both intermediate columns before the final output.'};
 return {...single,variants:[{label:'One gate',example:single},{label:'Combined logic',example:combined},{label:'Three inputs',example:three}]};
}
return {makeQuestion,checkAnswer,makeDemo};
});
