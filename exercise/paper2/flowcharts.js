/* OCR J277 Skill 20 · sequence, selection and iteration in flowcharts. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277Flowcharts=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const symbols=['Terminator','Input/output','Process','Decision'];
const easy=[
 ['Enter a score','Input/output','Input is shown in a parallelogram.'],
 ['Calculate total','Process','A calculation or assignment uses a rectangle.'],
 ['Display a total','Input/output','Output is shown in a parallelogram.'],
 ['Begin the algorithm','Terminator','Start and Stop use terminator shapes.'],
 ['Check whether age >= 18','Decision','A condition with Yes and No paths uses a diamond.'],
 ['Store count = 0','Process','An assignment changes a value and uses a rectangle.'],
 ['Read a name','Input/output','Reading data uses a parallelogram.'],
 ['Check whether count < 5','Decision','A loop condition also uses a decision diamond.'],
 ['Increase count by 1','Process','Updating a variable is a process.'],
 ['Finish the algorithm','Terminator','The end of an algorithm uses a terminator.']
];
const contexts=[
 ['score',50,64,'Pass','Retry'],['age',18,16,'Adult','Child'],
 ['temperature',20,20,'Warm','Cool'],['points',100,98,'Reward','Wait'],
 ['speed',30,35,'Fast','Slow'],['height',140,140,'Tall enough','Too short'],
 ['stock',10,12,'In stock','Low stock'],['mark',60,59,'Merit','Try again'],
 ['distance',5,5,'Long','Short'],['total',25,28,'Discount','Full price']
];
function makeQuestion(level,index){
 if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid flowchart question');
 if(level==='easy'){
  const [action,answer,why]=easy[index],offset=index%4;
  return {level,index,kind:'symbol',prompt:'Choose the correct flowchart symbol.',context:'Which symbol represents this action?',action,fields:[{id:'symbol',label:'Choose the symbol',options:[...symbols.slice(offset),...symbols.slice(0,offset)],answer}],hint:'Start/Stop = terminator; input/output = parallelogram; assignment = rectangle; condition = diamond.',model:answer+'. '+why};
 }
 if(level==='medium'){
  const [v,limit,value,yes,no]=contexts[index],condition=v+' >= '+limit,answer=value>=limit?yes:no;
  const opts=[condition,v+' < '+limit,v+' == '+(limit+1),v+' > '+(limit+1)];
  const offset=index%4;
  return {level,index,kind:'selection',prompt:'Complete and trace the decision.',context:'If '+v+' is at least '+limit+', output '+yes+'. Otherwise output '+no+'. The input is '+value+'.',v,limit,value,yes,no,condition,fields:[{id:'condition',label:'Missing decision',options:[...opts.slice(offset),...opts.slice(0,offset)],answer:condition},{id:'output',label:'Output for '+v+' = '+value,options:index%2?[no,yes]:[yes,no],answer}],hint:'At least means >=. Follow the Yes branch if the comparison is true; otherwise follow No.',model:condition+'; '+value+' >= '+limit+' is '+(value>=limit?'True':'False')+'. Follow '+(value>=limit?'Yes':'No')+' and output '+answer+'.'};
 }
 const start=index%4+1,step=index%2+1,limit=start+step*(2+index%3),out=[];
 for(let i=start;i<limit;i+=step)out.push(i);
 const last=start+step*out.length,update='i = i + '+step;
 const opts=[update,'i = i - '+step,'i = '+start,'i = i + '+(step+1)],offset=index%4;
 return {level,index,kind:'loop',prompt:'Complete the loop and trace its output.',context:'Start at '+start+'. Output i while i < '+limit+', increasing i by '+step+' each time.',start,step,limit,fields:[{id:'update',label:'Missing process',options:[...opts.slice(offset),...opts.slice(0,offset)],answer:update},{id:'output',label:'Values output, in order (separate with commas)',answer:out.join(',')},{id:'final',label:'Final value of i',answer:String(last)}],hint:'Test the condition before each repetition. Print the current i, then update it. Stop when the condition becomes false.',model:'Update: '+update+'. Outputs: '+out.join(', ')+'. Final i = '+last+'; '+last+' < '+limit+' is False, so follow No to Stop.'};
}
function normal(s){return String(s??'').trim().replace(/\s*,\s*/g,',').replace(/\s+/g,' ');}
function checkAnswer(q,r={}){const complete=q.fields.every(f=>normal(r[f.id])!=='');return{complete,correct:complete&&q.fields.every(f=>normal(r[f.id])===normal(f.answer))};}
function makeDemo(){const sequence={title:'Sequence',task:'Follow an input, calculation and output. Match each line to its flowchart symbol.',codeLabel:'Algorithm · flowchart symbols',traceTitle:'Follow the arrows',columns:['Symbol','Action'],lines:['start','number = input()','total = number * 2','print(total)','stop'],steps:[[1,'Terminator','Start','Start marks the entry to the algorithm.'],[2,'Input/output','Read 4','A parallelogram represents input.'],[3,'Process','total = 8','A rectangle represents calculation or assignment.'],[4,'Input/output','Output 8','A parallelogram also represents output.'],[5,'Terminator','Stop','The algorithm ends.']],end:'Input/output is a parallelogram; process is a rectangle; Start/Stop is a terminator.'};
 const selection={title:'Selection',task:'Trace a different decision with input 7.',codeLabel:'Algorithm · selection',traceTitle:'Decision diamond',columns:['Step','Value or route'],lines:['number = 7','if number >= 10 then','    print("Large")','else','    print("Small")','endif'],steps:[[1,'number','7','Store the input.'],[2,'Decision','False','The diamond tests number >= 10.'],[4,'No branch','else','Follow No because the test is false.'],[5,'Output','Small','Print Small.'],[6,'Merge','End selection','Both branches rejoin after the selection.']],end:'A decision diamond has two labelled branches. Only one is taken.'};
 const iteration={title:'Iteration',task:'Trace a different count-controlled loop with a decision and return arrow.',codeLabel:'Algorithm · iteration',traceTitle:'Follow the loop',columns:['Step','Value or route'],lines:['i = 2','while i < 6','    print(i)','    i = i + 2','endwhile'],steps:[[1,'i','2','Initialise the counter.'],[2,'Decision','True','2 < 6, follow Yes.'],[3,'Output','2','Print i before the update.'],[4,'i','4','Increase i by 2 and return to the diamond.'],[2,'Decision','True','4 < 6, follow Yes again.'],[3,'Output','4','Print the current value.'],[4,'i','6','Update and return to the decision.'],[2,'Decision','False','6 < 6 is false. Follow No to Stop.']],end:'Outputs: 2, 4. Final i = 6. The condition is tested before each repetition.'};
 return {...sequence,variants:[{label:'Sequence',example:sequence},{label:'Selection',example:selection},{label:'Iteration',example:iteration}]};
}
return{makeQuestion,checkAnswer,makeDemo};
});
