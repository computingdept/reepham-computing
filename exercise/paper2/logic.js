/* OCR J277 Skill 31 · evaluate AND, OR and NOT circuit diagrams. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277Logic=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const easyCases=[
    ['AND',0,0],['AND',1,1],['OR',1,0],['OR',0,0],['NOT',1,null],
    ['NOT',0,null],['AND',1,0],['OR',0,1],['AND',0,1],['OR',1,1]
  ];
  const mediumCases=[
    {shape:'pair',g1:'AND',g2:'OR',A:1,B:0,C:1},
    {shape:'pair',g1:'OR',g2:'AND',A:0,B:0,C:1},
    {shape:'postnot',g1:'AND',g2:'NOT',A:1,B:1},
    {shape:'postnot',g1:'OR',g2:'NOT',A:0,B:0},
    {shape:'prenot',g1:'NOT',g2:'AND',A:0,B:1},
    {shape:'prenot',g1:'NOT',g2:'OR',A:1,B:0},
    {shape:'pair',g1:'AND',g2:'AND',A:1,B:1,C:1},
    {shape:'pair',g1:'OR',g2:'OR',A:0,B:0,C:0},
    {shape:'pair',g1:'OR',g2:'AND',A:1,B:0,C:0},
    {shape:'pair',g1:'AND',g2:'OR',A:1,B:1,C:0}
  ];
  const hardCases=[
    {shape:'ab_notc',g1:'AND',g2:'NOT',g3:'OR',A:1,B:0,C:0},
    {shape:'ab_notc',g1:'OR',g2:'NOT',g3:'AND',A:0,B:0,C:1},
    {shape:'nota_bc',g1:'NOT',g2:'AND',g3:'OR',A:1,B:1,C:1},
    {shape:'nota_bc',g1:'NOT',g2:'OR',g3:'AND',A:0,B:0,C:0},
    {shape:'ab_notc',g1:'AND',g2:'NOT',g3:'AND',A:1,B:1,C:0},
    {shape:'ab_notc',g1:'OR',g2:'NOT',g3:'OR',A:0,B:0,C:1},
    {shape:'nota_bc',g1:'NOT',g2:'OR',g3:'OR',A:0,B:1,C:0},
    {shape:'nota_bc',g1:'NOT',g2:'AND',g3:'AND',A:0,B:1,C:1},
    {shape:'ab_notc',g1:'OR',g2:'NOT',g3:'AND',A:1,B:0,C:1},
    {shape:'ab_notc',g1:'AND',g2:'NOT',g3:'OR',A:0,B:1,C:1}
  ];
  const flip=g=>g==='AND'?'OR':'AND';
  function gate(type,a,b){if(![0,1].includes(a))throw Error('A must be a bit');if(type==='NOT')return 1-a;if(![0,1].includes(b))throw Error('B must be a bit');if(type==='AND')return a&b;if(type==='OR')return a|b;throw Error('Unsupported OCR J277 gate '+type);}
  function expression(c){return c.shape==='ab_notc'?`(A ${c.g1} B) ${c.g3} (NOT C)`:`(NOT A) ${c.g3} (B ${c.g2} C)`;}
  function expressions(c,index){const correct=expression(c),arr=c.shape==='ab_notc'?
    [correct,`(A ${flip(c.g1)} B) ${c.g3} (NOT C)`,`(A ${c.g1} B) ${flip(c.g3)} (NOT C)`,`(A ${c.g1} B) ${c.g3} C`]:
    [correct,`(NOT A) ${c.g3} (B ${flip(c.g2)} C)`,`(NOT A) ${flip(c.g3)} (B ${c.g2} C)`,`A ${c.g3} (B ${c.g2} C)`];
    const offset=index%4;return[...arr.slice(offset),...arr.slice(0,offset)];
  }
  function makeQuestion(level,index){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Logic Gates question');
    if(level==='easy'){const[g1,A,B]=easyCases[index],Q=gate(g1,A,B);return{level,index,shape:'single',g1,A,B,Q,output:{Q},expression:g1==='NOT'?'NOT A':`A ${g1} B`,hint:g1==='AND'?'AND needs both inputs to be 1.':g1==='OR'?'OR needs at least one input to be 1.':'NOT flips the input: 0 becomes 1 and 1 becomes 0.',steps:[`Gate: ${g1}`,`Inputs: A=${A}${B===null?'':', B='+B}`,`Output: Q=${Q}`]};}
    const c=level==='medium'?mediumCases[index]:hardCases[index];let X,Y,Q,steps=[];
    if(level==='medium'){
      if(c.shape==='pair'){X=gate(c.g1,c.A,c.B);Q=gate(c.g2,X,c.C);steps=[`X = ${c.A} ${c.g1} ${c.B} = ${X}`,`Q = ${X} ${c.g2} ${c.C} = ${Q}`];}
      else if(c.shape==='postnot'){X=gate(c.g1,c.A,c.B);Q=gate('NOT',X);steps=[`X = ${c.A} ${c.g1} ${c.B} = ${X}`,`Q = NOT ${X} = ${Q}`];}
      else{X=gate('NOT',c.A);Q=gate(c.g2,X,c.B);steps=[`X = NOT ${c.A} = ${X}`,`Q = ${X} ${c.g2} ${c.B} = ${Q}`];}
      return{...c,level,index,X,Q,output:{X,Q},steps,hint:'Trace left to right. Work out X before choosing the final output Q.'};
    }
    if(c.shape==='ab_notc'){X=gate(c.g1,c.A,c.B);Y=gate('NOT',c.C);}else{X=gate('NOT',c.A);Y=gate(c.g2,c.B,c.C);}
    Q=gate(c.g3,X,Y);steps=c.shape==='ab_notc'?[`X = ${c.A} ${c.g1} ${c.B} = ${X}`,`Y = NOT ${c.C} = ${Y}`,`Q = ${X} ${c.g3} ${Y} = ${Q}`]:[`X = NOT ${c.A} = ${X}`,`Y = ${c.B} ${c.g2} ${c.C} = ${Y}`,`Q = ${X} ${c.g3} ${Y} = ${Q}`];
    return{...c,level,index,X,Y,Q,output:{X,Y,Q},expression:expression(c),expressionChoices:expressions(c,index),steps,hint:'Follow each branch separately. Find X and Y first, then apply the final gate to get Q.'};
  }
  function checkAnswer(q,response={}){const names=q.level==='easy'?['Q']:q.level==='medium'?['X','Q']:['X','Y','Q'];const complete=names.every(k=>response[k]==='0'||response[k]==='1')&&(q.level!=='hard'||Boolean(response.expression));return{complete,correct:complete&&names.every(k=>Number(response[k])===q.output[k])&&(q.level!=='hard'||response.expression===q.expression)};}
  function model(q){return{output:q.output,expression:q.expression,steps:q.steps};}
  function makeDemo(){
    const single={title:'One gate',task:'Trace an AND gate. Both inputs must be 1 before the lamp switches on.',entryLine:4,progressive:true,showAllCode:true,codeLabel:'Boolean model · AND gate',traceTitle:'One gate at a time',columns:['Check','Value'],lines:['function lamp(A, B)','    return A AND B','endfunction','print(lamp(True, False))'],steps:[
      [4,'START HERE','lamp(True, False)','The program calls the Boolean function.'],[1,'A','True (1)','The first input is on.'],[1,'B','False (0)','The second input is off.'],[2,'True AND False','False (0)','AND gives 1 only when both inputs are 1.'],[4,'Lamp','Off','The output remains 0.']],end:'AND requires two 1s. OR requires at least one 1. NOT reverses a single bit.'};
    const combined={title:'Three-gate circuit',task:'Trace each branch before evaluating the final OR gate.',entryLine:6,progressive:true,showAllCode:true,codeLabel:'Boolean model · three gates',traceTitle:'Intermediate values X and Y',columns:['Wire','Value'],lines:['function circuit(A, B, C)','    X = A AND B','    Y = NOT C','    return X OR Y','endfunction','print(circuit(False, True, False))'],steps:[
      [6,'START HERE','circuit(0, 1, 0)','Start with the subprogram call.'],[1,'A, B, C','0, 1, 0','Three input bits feed two branches.'],[2,'X = 0 AND 1','0','The upper branch gives 0.'],[3,'Y = NOT 0','1','The lower branch flips C to 1.'],[4,'Q = 0 OR 1','1','OR gives 1 because one branch is 1.'],[6,'Output Q','1','Trace both intermediate wires before the final output.']],end:'For combined circuits, always calculate intermediate values first. Skill 32 will use the same logic to complete truth tables.'};
    return{...single,variants:[{label:'One gate',example:single},{label:'Three gates',example:combined}]};
  }
  return{gate,makeQuestion,checkAnswer,model,makeDemo,easyCases,mediumCases,hardCases};
});
