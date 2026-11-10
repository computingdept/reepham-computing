/* J277 Paper 1 - one shared question bank for screen practice and print.
   A deterministic sequence means question N has the same values in both views. */
(function(root){
  'use strict';
  const levels=['easy','medium','hard'];
  const easyValues=[173,10,15,26,45,63,128,171,214,255];
  function seed(x){
    return function(){
      x|=0; x=x+0x6D2B79F5|0;
      let t=Math.imul(x^x>>>15,1|x);
      t=t+Math.imul(t^t>>>7,61|t)^t;
      return ((t^t>>>14)>>>0)/4294967296;
    };
  }
  function randomFor(level,index){
    let h=0;
    for(const c of 'convert-'+level+'-'+index)
      h=(Math.imul(h,31)+c.charCodeAt(0))|0;
    return seed(h);
  }
  function question(level,index){
    if(!levels.includes(level)||!Number.isInteger(index)||index<0||index>9)
      throw new RangeError('Expected a conversion difficulty and question index 0-9');
    const r=randomFor(level,index);
    const diff=levels.indexOf(level);
    const n=diff===0?easyValues[index]:1+Math.floor(r()*(diff===1?191:255));
    const bits=n.toString(2).padStart(8,'0');
    const hex=n.toString(16).toUpperCase().padStart(2,'0');
    const source=diff===0?'denary':
      (diff===1?['denary','binary','hex']:['hex','binary','denary'])[index%3];
    const shown=source==='denary'?n:source==='binary'?bits:hex;
    return Object.freeze({index,number:index+1,denary:n,binary:bits,hex,
      source,shown,high:Math.floor(n/16),low:n%16});
  }
  root.J277ConversionQuestions=Object.freeze({
    question,all:level=>Array.from({length:10},(_,i)=>question(level,i))
  });
})(window);
