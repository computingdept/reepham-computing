#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const bankPath = path.resolve(__dirname, '../../data/do-now/q2-drafts/h446.json');
const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));

// Carefully authored first-stage examples. The source is a prior lesson,
// not merely the label that happened to appear in a legacy Do Now.
// Each tuple: [taught-in, short stem, four one-word options, correctIndex, explanation].
const proposals = {
 '001':['GCSE','Which type preserves leading zeroes in a student ID?',['String','Integer','Boolean','Float'],0,'Identifiers are strings because leading zeroes matter.'],
 '002':['GCSE','Which number base does binary use?',['Two','Eight','Ten','Sixteen'],0,'Binary uses exactly two digits: 0 and 1.'],
 '003':['L001','How many bits are in one byte?',['Four','Eight','Sixteen','Thirty-two'],1,'A byte contains eight bits.'],
 '004':['L002','Which bit stores the sign in sign-and-magnitude?',['Leftmost','Rightmost','Middle','Unused'],0,'The leftmost bit records whether the value is positive or negative.'],
 '005':['L003','Which number base does hexadecimal use?',['2','8','10','16'],3,'Hexadecimal is base 16, using digits 0–9 and A–F.'],
 '006':['L004','Which part sets the scale of a floating-point number?',['Exponent','Mantissa','Sign','Index'],0,'The exponent scales the value represented by the mantissa.'],
 '007':['L005','What does a positive exponent do to the mantissa value?',['Multiplies','Divides','Negates','Preserves'],0,'A positive exponent multiplies the mantissa by a power of two.'],
 '008':['L003','How many bits make one hexadecimal digit?',['Four','Eight','Two','Sixteen'],0,'Each hexadecimal digit corresponds to a four-bit nibble.'],
 '009':['L003','An unsigned left shift by one multiplies by what?',['2','4','8','16'],0,'One left shift multiplies by 2 if no bits are lost.'],
 '010':['L008','Which character set supports more writing systems?',['Unicode','ASCII','Baudot','BCD'],0,'Unicode covers many more characters and scripts than ASCII.'],
 '011':['L009','Which C# operator means logical AND?',['&&','||','!','^'],0,'Both conditions must be true for && to evaluate to true.'],
 '012':['L010','Which C# loop always runs at least once?',['do...while','for','while','foreach'],0,'The condition in a do...while loop is tested after its body.'],
 '013':['L010','Which loop normally suits a known iteration count?',['for','while','do','switch'],0,'A for loop combines initialisation, condition and update.'],
 '014':['L010','Which part of a for-loop controls whether it continues?',['Condition','Update','Initialisation','Body'],0,'The condition is checked before each iteration.'],
 '015':['L013','In board[row,column], which dimension identifies a row?',['First','Second','Third','Neither'],0,'The first index selects the row in this two-dimensional board.'],
 '016':['L014','What does GetLength(0) count in board[row,column]?',['Rows','Columns','Moves','Types'],0,'Dimension 0 is the number of rows.'],
 '017':['L011','Which kind of subroutine returns a value?',['Function','Procedure','Loop','Class'],0,'A function returns a result to its caller.'],
 '018':['L014','What does GetLength(1) count in board[row,column]?',['Columns','Rows','Boards','Values'],0,'Dimension 1 counts the columns.'],
 '019':['L017','What identifies an array element’s position?',['Index','Value','Type','Size'],0,'The index identifies the position; the element contains the value.'],
 '020':['L018','Which C# collection can grow or shrink?',['Array','Record','List','Tuple'],2,'A List can change length; an array is fixed-size.'],
 '021':['L018','Which structure groups values in named fields?',['Record','Stack','Queue','Array'],0,'Records combine named fields, potentially with different types.'],
 '022':['L019','Which field identifies the successor in a linked list?',['Next','Head','Root','Key'],0,'The next field stores a reference or index of the following node.'],
 '023':['L019','Which pointer value means no next node in our arrays?',['-1','0','1','2'],0,'The sentinel -1 indicates there is no next node.'],
 '024':['L020','Which structure removes the oldest item first?',['Stack','Queue','Tree','Graph'],1,'A queue is FIFO: the first item added leaves first.'],
 '025':['L019','What connects the nodes of a linked list?',['Pointer','Index','Array','Record'],0,'Each next pointer identifies another node in the list.'],
 '026':['L018','Which structure stores values in named fields?',['Queue','Array','Record','Stack'],2,'A record groups related values into named fields.'],
 '027':['L025','What must be true for binary search to work?',['Sorted','Unique','Random','Reversed'],0,'Binary search needs ordered data to eliminate half the interval.'],
 '028':['L026','Which gate outputs 1 only when both inputs are 1?',['AND','OR','XOR','NOR'],0,'AND outputs 1 only when both inputs are 1.'],
 '029':['L027','What does double negation ¬¬A simplify to?',['A','¬A','0','1'],0,'Two NOT operations cancel each other.'],
 '030':['L002','Which bit records the sign in sign-and-magnitude?',['Leftmost','Rightmost','Middle','Unused'],0,'The most significant bit is the sign bit.'],
 '031':['L027','Which operator replaces OR under De Morgan’s Law?',['AND','XOR','NOT','OR'],0,'Negating an OR changes it into an AND of the negated inputs.'],
 '032':['L028','For sum-of-products, what does a Karnaugh map group?',['Ones','Zeros','Bytes','Indexes'],0,'Grouping adjacent 1s gives simpler product terms.'],
 '033':['L031','Which input is sampled by a D-type flip-flop at a clock edge?',['D','Q','CLK','NOT'],0,'The D input is copied to Q at the triggering clock edge.'],
 '034':['L009','Which Boolean operation does C# && perform?',['AND','OR','NOT','XOR'],0,'&& evaluates to true only when both operands are true.'],
 '035':['L030','Which full-adder output reports a carry?',['Carry','Sum','Clock','Data'],0,'A full adder produces both Sum and Carry-out.'],
 '036':['L017','What identifies an array element’s position?',['Value','Index','Type','Size'],1,'The index identifies the position of the element.'],
 '037':['L030','Which output reports a carry from addition?',['Clock','Sum','State','Carry'],3,'A full adder outputs a Sum bit and a Carry-out bit.'],
 '038':['L011','In Add(int amount), what is amount called?',['Parameter','Argument','Return','Method'],0,'A parameter is the named input in a method declaration.'],
 '039':['L018','Which structure can store differently typed named fields?',['Record','Array','List','Stack'],0,'A record can group fields of different types.'],
 '040':['L030','Which bit accompanies Sum from a half adder?',['Carry','Clock','State','Data'],0,'A half adder outputs Sum and Carry.'],
 '041':['L025','If a search target exceeds the middle value, search which half?',['Right','Left','Both','Neither'],0,'The right half contains values greater than the middle value in an ascending array.'],
 '042':['L020','After pushing A, B, C and popping twice, what remains on top?',['A','B','C','Empty'],0,'A stack removes C then B, leaving A.'],
 '043':['L018','How is a record member accessed?',['Field','Index','Pointer','Bucket'],0,'Records expose named fields rather than numbered array indexes.'],
 '044':['L027','What replaces OR in ¬(A∨B) using De Morgan’s Law?',['AND','OR','XOR','NAND'],0,'¬(A∨B) is equivalent to ¬A AND ¬B.'],
 '045':['L040','In Book(string title), what is title?',['Parameter','Property','Method','Class'],0,'title is a parameter received by the constructor.']
};

for(const [id,[source,question,options,correctIndex,explanation]] of Object.entries(proposals)){
 const e=bank.lessons[id];
 if(!e)throw Error('Missing lesson L'+id);
 const n=Number(id);
 const diagnostic=source==='GCSE';
 if(!diagnostic && (Number(source.slice(1))>=n-1))
   throw Error('Q2 is not earlier learning: L'+id+' '+source);
 if(options.length!==4||new Set(options).size!==4
     ||options.some(o=>o.trim().split(/\s+/).length!==1))
   throw Error('Invalid one-word 2x2 options: L'+id);
 e.draft={
   ...e.draft,
   status:'authored-needs-teacher-review',
   question,
   options,
   correctIndex,
   explanation,
   taughtIn:[source],
   sourceStatus:diagnostic?'GCSE-diagnostic-to-review':'proposed-from-taught-topic-to-review',
   earlierThanPreviousLesson:diagnostic||Number(source.slice(1))<n-1,
   teacherApproved:false
 };
}
fs.writeFileSync(bankPath,JSON.stringify(bank,null,2)+'\n');
console.log('Authored '+Object.keys(proposals).length+' H446 Q2 MCQs; all retain prior questions and remain unpublished.');
