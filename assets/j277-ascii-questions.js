/* RHS Computing: J277 ASCII Code Builder (8-bit representation of ASCII).
   Each reference and word uses the same letter case. */
(function(root){
'use strict';
const pools={
 easy:['CAB','BAD','BED','ACE','DAD','BAG','CAT','DOG','HAT','BEE','FED','FACE','AGE','GAS','BIG','MAP','PEN','TEN'],
 medium:['POP','MOP','BUMP','QUIZ','LAMP','STAR','WAVE','DATA','CODE','BYTE','NODE','LOOP','MOON','JUMP','MATH','PARK','ZERO','FROG'],
 hard:['APPLE','QUEUE','HELLO','WORLD','PRINT','LOGIC','TRACE','DEBUG','ROBOT','STACK','ARRAY','LEVEL','CODES','PIXEL','SHIFT','CACHE','BYTES','INPUT','MOUSE','TRACK','SOUND','CHAR','mouse','cache','hello']
};
function format8(value){return value.toString(2).padStart(8,'0')}
function make(level,index,previous=null,random=Math.random){
 if(!Object.prototype.hasOwnProperty.call(pools,level))throw new RangeError('Invalid level');
 const words=pools[level];
 let slot=Math.min(words.length-1,Math.floor(random()*words.length));
 if(words.length>1&&words[slot]===previous)slot=(slot+1)%words.length;
 const word=words[slot];
 const reference=level==='easy'?'A':level==='medium'?word[Math.floor(word.length/2)]:word[Math.min(word.length-1,Math.floor(random()*word.length))];
 const code=reference.charCodeAt(0);
 const format=level==='easy'?'denary':level==='medium'?'binary':index%2===0?'denary':'binary';
 const referenceText=reference+' = '+(format==='denary'?String(code)+' (denary)':format8(code)+' (8-bit binary)');
 const rows=[...word].map(letter=>{const denary=letter.charCodeAt(0);return Object.freeze({letter,denary,binary:format8(denary)})});
 const hint=format==='binary'?
  'First convert '+format8(code)+' into denary. ASCII letters in the same case have consecutive codes. Add or subtract the alphabet positions, then convert each code to eight bits.':
  'Each successive letter increases its ASCII denary code by 1. Use the supplied reference to find the denary code, then convert it to eight bits.';
 return Object.freeze({
  type:'ascii',word,reference,referenceCode:code,referenceFormat:format,
  referenceText,rows,prompt:'Complete the ASCII codes for '+word+'.',
  context:'Use the single supplied character code. Give each denary value and its 8-bit binary representation.',
  hint,why:rows.map(r=>r.letter+' = '+r.denary+' = '+r.binary).join(' · ')
 });
}
root.J277AsciiQuestions=Object.freeze({make,format8});
})(window);
