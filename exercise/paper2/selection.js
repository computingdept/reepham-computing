/* OCR J277/02 Skill 07: IF / ELSEIF / ELSE, with a bounded ERL interpreter. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Selection = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function randomFor(seed, level, index) {
    let n = (Number(seed) || 1) | 0;
    for (const c of level + ':' + index) n = (Math.imul(n, 31) + c.charCodeAt(0)) | 0;
    return function () {
      n = (n + 0x6D2B79F5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const int = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
  function shuffle(items, r) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = int(r, 0, i); [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function compare(a, op, b) {
    switch (op) {
      case '<': return a < b;
      case '<=': return a <= b;
      case '>': return a > b;
      case '>=': return a >= b;
      case '==': return a === b;
      case '!=': return a !== b;
      default: return null;
    }
  }
  const easyCases = [
    ['score', '>=', 50, 'Pass', 'Retry'],
    ['lives', '>', 0, 'Play', 'Game over'],
    ['age', '>=', 18, 'Adult', 'Under 18'],
    ['tickets', '==', 0, 'Sold out', 'Available'],
    ['points', '<', 10, 'Keep going', 'Level up'],
    ['hours', '<=', 5, 'Early', 'Late'],
    ['attempts', '!=', 3, 'Try again', 'Stop'],
    ['mark', '>=', 40, 'Achieved', 'Not yet'],
    ['speed', '>', 60, 'Too fast', 'Safe'],
    ['stock', '==', 0, 'Reorder', 'In stock']
  ];
  function easy(index, r) {
    const [variable, op, threshold, yes, no] = easyCases[index % 10];
    const offsets = index % 2 ? [0, -1, 1] : [0, 1, -1];
    const offset = offsets[int(r, 0, 2)];
    const value = threshold + offset;
    const result = compare(value, op, threshold);
    const expected = result ? yes : no;
    return {
      level: 'easy', type: 'choose', prompt: 'Which message is printed?',
      context: 'Only one branch runs. Test the IF condition first.',
      code: [variable + ' = ' + value, 'if ' + variable + ' ' + op + ' ' + threshold + ' then',
        '    print("' + yes + '")', 'else', '    print("' + no + '")', 'endif'],
      expected, options: shuffle([yes, no], r),
      hint: 'If the condition is True, use the first print. If it is False, use ELSE.',
      model: expected,
      explanation: variable + ' ' + op + ' ' + threshold + ' is ' + (result ? 'True' : 'False') + ', so the ' + (result ? 'IF' : 'ELSE') + ' branch runs.'
    };
  }

  function medium(index, r) {
    const shift = int(r, -4, 4);
    const cases = [
      {variable:'score', value:[85 + shift, 50 + shift, 45 + shift][index % 3],
        clauses:[['>=', 80 + shift, 'High'], ['>=', 50 + shift, 'Pass']], otherwise:'Retry'},
      {variable:'age', value:[12 + shift, 15 + shift, 20 + shift][index % 3],
        clauses:[['<', 13 + shift, 'Child'], ['<', 18 + shift, 'Teen']], otherwise:'Adult'},
      {variable:'temperature', value:[-2 + shift, 10 + shift, 25 + shift][index % 3],
        clauses:[['<', 0 + shift, 'Cold'], ['<=', 20 + shift, 'Mild']], otherwise:'Hot'},
      {variable:'points', value:[10 + shift, 12 + shift, 8 + shift][index % 3],
        clauses:[['==', 10 + shift, 'Exact'], ['>', 10 + shift, 'Above']], otherwise:'Below'},
      {variable:'hours', value:[8 + shift, 11 + shift, 17 + shift][index % 3],
        clauses:[['<=', 9 + shift, 'Early'], ['<', 16 + shift, 'On time']], otherwise:'Late'}
    ];
    const item = cases[index % cases.length];
    const [first, second] = item.clauses;
    const outputs = [first[2], second[2], item.otherwise];
    const expected = compare(item.value, first[0], first[1]) ? first[2] :
      compare(item.value, second[0], second[1]) ? second[2] : item.otherwise;
    return {
      level:'medium',type:'choose',prompt:'What will this code print?',
      context:'Follow IF → ELSEIF → ELSE, stopping at the first True condition.',
      code:[item.variable + ' = ' + item.value,
        'if ' + item.variable + ' ' + first[0] + ' ' + first[1] + ' then',
        '    print("' + first[2] + '")',
        'elseif ' + item.variable + ' ' + second[0] + ' ' + second[1] + ' then',
        '    print("' + second[2] + '")',
        'else', '    print("' + item.otherwise + '")', 'endif'],
      expected, options:shuffle(outputs,r), model:'Output: ' + expected,
      hint:'Test IF first. Only if that is False do you test ELSEIF. ELSE runs if neither is True.',
      explanation:'The first matching branch prints "' + expected + '". Later branches are skipped.'
    };
  }

  function hard(index, r) {
    const delta = int(r, -4, 4);
    const examples = [
      {variable:'mark', subject:'mark', clauses:[['>=',50 + delta,'Pass']], otherwise:'Retry'},
      {variable:'age', subject:'age', clauses:[['>=',18 + delta,'Adult']], otherwise:'Under'},
      {variable:'temp', subject:'temperature', clauses:[['<',0 + delta,'Freeze']], otherwise:'Above'},
      {variable:'number', subject:'number', clauses:[['==',10 + delta,'Match']], otherwise:'Other'},
      {variable:'score', subject:'score', clauses:[['>=',80 + delta,'High'],['>=',50 + delta,'Pass']], otherwise:'Retry'},
      {variable:'age', subject:'age', clauses:[['<',13 + delta,'Child'],['<',18 + delta,'Teen']], otherwise:'Adult'},
      {variable:'mark', subject:'mark', clauses:[['>',75 + delta,'Excellent'],['>',40 + delta,'Good']], otherwise:'More'},
      {variable:'number', subject:'number', clauses:[['<',0,'Negative'],['==',0,'Zero']], otherwise:'Positive'},
      {variable:'points', subject:'points', clauses:[['<=',5 + delta,'Low'],['<=',10 + delta,'Medium']], otherwise:'High'},
      {variable:'speed', subject:'speed', clauses:[['>',60 + delta,'Fast'],['>=',30 + delta,'Steady']], otherwise:'Slow'}
    ];
    const item = examples[index % 10];
    function describe([op, threshold, label]) {
      const words = {'>':'greater than','>=':'at least','<':'less than','<=':'at most','==':'equal to','!=':'not equal to'};
      return '"' + label + '" if it is ' + words[op] + ' ' + threshold;
    }
    const prompt = 'Ask for a whole-number ' + item.subject + '. Print ' + item.clauses.map(describe).join(', otherwise ') +
      (item.clauses.length > 1 ? ', otherwise "' + item.otherwise + '".' : ', otherwise "' + item.otherwise + '".');
    const code = [item.variable + ' = input("' + item.subject + '")'];
    item.clauses.forEach(([op, threshold, label], i) => {
      code.push((i ? 'elseif ' : 'if ') + item.variable + ' ' + op + ' ' + threshold + ' then');
      code.push('    print("' + label + '")');
    });
    code.push('else','    print("' + item.otherwise + '")','endif');
    return {
      level:'hard',type:'write',prompt,context:'Write a complete OCR ERL algorithm using IF, optional ELSEIF, ELSE and ENDIF.',
      ...item,model:code.join('\n'),
      hint:'Start with input(). Test the most restrictive condition first; use elseif for the next case, then else and endif.',
      explanation:'Your branching code was checked against values on both sides of every boundary.'
    };
  }
  function makeQuestion(level, index, seed) {
    if (!['easy','medium','hard'].includes(level) || !Number.isInteger(index) || index < 0) throw new Error('Invalid selection question');
    const r = randomFor(seed,level,index);
    return level === 'easy' ? easy(index,r) : level === 'medium' ? medium(index,r) : hard(index,r);
  }

  function expectedOutput(question, value) {
    for (const [operator, threshold, output] of question.clauses) {
      if (compare(value,operator,threshold)) return output;
    }
    return question.otherwise;
  }
  function parseProgram(source) {
    const lines = String(source ?? '').replace(/\r/g,'').split('\n')
      .map(line=>line.replace(/\/\/.*$/,'').trim()).filter(Boolean);
    if (lines.length < 5 || lines.length > 35) return null;
    let cursor=0, operations=0;
    function block(depth) {
      if (depth > 6) return null;
      const nodes=[];
      while (cursor < lines.length) {
        const line = lines[cursor];
        if (/^(?:elseif\b|else\b|endif\b)/i.test(line)) break;
        if (++operations > 55) return null;
        const matchIf=line.match(/^if\s+(.+?)\s+then$/i);
        if (matchIf) {
          cursor++;
          const yes=block(depth+1); if (!yes || !yes.length) return null;
          const branches=[{condition:matchIf[1],body:yes}];
          while (cursor<lines.length) {
            const matchElseIf=lines[cursor].match(/^elseif\s+(.+?)\s+then$/i);
            if (!matchElseIf) break;
            cursor++;
            const body=block(depth+1); if (!body || !body.length) return null;
            branches.push({condition:matchElseIf[1],body});
          }
          let otherwise=[];
          if (/^else$/i.test(lines[cursor]||'')) {
            cursor++; otherwise=block(depth+1); if (!otherwise || !otherwise.length) return null;
          }
          if (!/^endif$/i.test(lines[cursor]||'')) return null;
          cursor++;
          nodes.push({type:'if',branches,otherwise});
          continue;
        }
        const printed=line.match(/^print\s*\(\s*(.+?)\s*\)$/i);
        if (printed) {nodes.push({type:'print',expr:printed[1]});cursor++;continue;}
        const assigned=line.match(/^([A-Za-z_]\w*)\s*(?:=|:=|←)\s*(.+)$/);
        if (assigned) {nodes.push({type:'assign',name:assigned[1].toLowerCase(),expr:assigned[2]});cursor++;continue;}
        return null;
      }
      return nodes;
    }
    const ast=block(0);
    return ast && cursor===lines.length && ast.length ? ast : null;
  }

  function runProgram(ast, supplied) {
    if (!Array.isArray(ast)) return null;
    const env=Object.create(null);
    let inputCount=0,stepCount=0;
    const printed=[];
    function value(expr) {
      const text=String(expr).trim();
      const quoted=text.match(/^(?:"([^"]*)"|'([^']*)')$/);
      if (quoted) return quoted[1] ?? quoted[2];
      if (/^-?\d+(?:\.\d+)?$/.test(text)) return Number(text);
      if (/^[A-Za-z_]\w*$/.test(text)) return Object.prototype.hasOwnProperty.call(env,text.toLowerCase()) ? env[text.toLowerCase()] : null;
      const simple=text.match(/^([A-Za-z_]\w*|-?\d+)\s*([+\-*\/])\s*([A-Za-z_]\w*|-?\d+)$/);
      if (simple) {
        const a=value(simple[1]),b=value(simple[3]);
        if (typeof a!=='number'||typeof b!=='number'||(simple[2]==='/'&&b===0)) return null;
        const x=simple[2]==='+'?a+b:simple[2]==='-'?a-b:simple[2]==='*'?a*b:a/b;
        return Number.isFinite(x)?x:null;
      }
      return null;
    }
    function condition(expr) {
      const match=String(expr).trim().match(/^(.+?)\s*(==|!=|<=|>=|<|>)\s*(.+)$/);
      if (!match) return null;
      const a=value(match[1]),b=value(match[3]);
      if (a===null||b===null||typeof a!==typeof b) return null;
      return compare(a,match[2],b);
    }
    function execute(nodes) {
      for (const node of nodes) {
        if (++stepCount>80) return false;
        if (node.type==='assign') {
          const match=node.expr.match(/^(?:int\s*\(\s*)?input\s*\(\s*(?:"[^"]*"|'[^']*')?\s*\)\s*\)?$/i);
          if (match) {
            if (inputCount>=1) return false;
            env[node.name]=supplied;inputCount++;continue;
          }
          const result=value(node.expr);if(result===null)return false;
          env[node.name]=result;continue;
        }
        if (node.type==='print') {
          const result=value(node.expr);if(result===null)return false;
          printed.push(String(result));if(printed.length>1)return false;
          continue;
        }
        if (node.type==='if') {
          let matched=false;
          for (const branch of node.branches) {
            const result=condition(branch.condition);if(result===null)return false;
            if (result) {if(!execute(branch.body))return false;matched=true;break;}
          }
          if (!matched && !execute(node.otherwise)) return false;
          continue;
        }
        return false;
      }
      return true;
    }
    if (!execute(ast) || inputCount!==1 || printed.length!==1) return null;
    return printed[0];
  }

  function testValues(q) {
    const values=new Set([-100,-5,-1,0,1,2,10,15,25,40,50,60,75,80,99,100,101,200]);
    for (const [,t] of q.clauses) for (const d of [-5,-2,-1,0,1,2,5]) values.add(t+d);
    return [...values];
  }
  function checkAnswer(q, response) {
    const text=String(response??'').trim();
    if (q.type==='choose') return {complete:text!=='',correct:text!==''&&text===q.expected};
    const ast=text?parseProgram(text):null;
    return {
      complete:text!=='',
      correct:!!ast && testValues(q).every(n => {
        const output=runProgram(ast,n);
        return output!==null && output.trim().toLowerCase()===expectedOutput(q,n).toLowerCase();
      })
    };
  }
  return {makeQuestion,checkAnswer,compare,parseProgram,runProgram,expectedOutput,testValues};
});
