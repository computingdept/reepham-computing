/* Shared H446 A* / Dijkstra exam-style trace tables. Does not affect code or heuristic modes. */
(function () {
  'use strict';
  const instances = new WeakMap();
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const numeric = n => Number.isFinite(n) ? String(n) : '∞';

  function neighbours(graph, vertex) {
    return graph.e.filter(([a,b]) => a === vertex || b === vertex)
      .map(([a,b,w]) => ({to:a === vertex ? b : a, cost:w}));
  }

  function analyse(graph, algorithm) {
    const g = Object.fromEntries(graph.v.map(([name]) => [name, Infinity]));
    const previous = {}, edge = {}, selected = [], closed = new Set(), open = new Set([graph.start]);
    g[graph.start] = 0;
    const heuristic = name => algorithm === 'astar' ? Number(graph.h[name] || 0) : 0;
    while (open.size) {
      const current = [...open].sort((a,b) =>
        (g[a] + heuristic(a)) - (g[b] + heuristic(b)) ||
        g[a] - g[b] || a.localeCompare(b))[0];
      open.delete(current);
      if (closed.has(current)) continue;
      selected.push(current);
      if (current === graph.goal) break;
      closed.add(current);
      for (const candidate of neighbours(graph,current)) {
        if (algorithm === 'dijkstra' && closed.has(candidate.to)) continue;
        const cost = g[current] + candidate.cost;
        if (cost < g[candidate.to]) {
          g[candidate.to] = cost;
          previous[candidate.to] = current;
          edge[candidate.to] = candidate.cost;
          open.add(candidate.to);
          if (algorithm === 'astar') closed.delete(candidate.to);
        }
      }
    }
    const route = [], seen = new Set();
    let node = graph.goal;
    while (node && !seen.has(node)) {
      route.unshift(node);
      if (node === graph.start) break;
      seen.add(node);
      node = previous[node];
    }
    if (route[0] !== graph.start) route.length = 0;
    const rows = graph.v.map(([name]) => ({
      name,
      prev: previous[name] || '—',
      edge: edge[name] === undefined ? '—' : String(edge[name]),
      g: numeric(g[name]),
      h: algorithm === 'astar' ? String(graph.h[name]) : undefined,
      f: algorithm === 'astar' ? numeric(g[name] + graph.h[name]) : undefined,
      visit: selected.includes(name) ? String(selected.indexOf(name) + 1) : '—'
    }));
    const pathCosts = route.slice(1).map(name => edge[name]);
    return {rows,selected,route,cost:g[graph.goal],pathCosts};
  }

  function fieldsFor(algorithm) {
    return algorithm === 'astar'
      ? [{key:'prev',label:'From'},{key:'edge',label:'Edge cost'},{key:'g',label:'g'},{key:'h',label:'h'},{key:'f',label:'f = g+h'}]
      : [{key:'prev',label:'From'},{key:'edge',label:'Edge cost'},{key:'g',label:'Distance g'},{key:'visit',label:'Selected #'}];
  }

  function prefilled(level, algorithm, index, field, fieldIndex) {
    if (index === 0 && (field === 'prev' || field === 'edge')) return true;
    if (level === 'hard') return false;
    if (level === 'medium') return algorithm === 'astar' && field === 'h' || index === 0 && field === 'g';
    if (index === 0 || algorithm === 'astar' && field === 'h') return true;
    return (index + fieldIndex * 2) % 3 !== 0;
  }

  function init(config) {
    return {
      graph:config.graph, algorithm:config.algorithm, level:config.level,
      answer:analyse(config.graph,config.algorithm), values:{}, wrong:new Set(),
      stage:'table', selectedPath:[], costInput:'', feedback:'', feedbackType:'',
      revealCount:0, checkedTable:false, checkedPath:false
    };
  }

  function sameValue(raw, expected, field) {
    const value = String(raw).trim();
    if (expected === '—') return value === '' || value === '—' || value === '-';
    if (expected === '∞') return value === '∞' || /^inf(inity)?$/i.test(value);
    if (field === 'prev') return value.toUpperCase() === expected;
    return value !== '' && Number(value) === Number(expected);
  }

  function tableHtml(data,config) {
    const fields = fieldsFor(data.algorithm);
    const viewingAnswers = data.stage !== 'table';
    const teacherOrder = [...data.answer.selected,...data.answer.rows.map(row => row.name).filter(name => !data.answer.selected.includes(name))];
    const rows = data.answer.rows.map((row,i) => {
      const cells = fields.map((field,j) => {
        const key = `${i}:${field.key}`;
        const show = viewingAnswers || prefilled(data.level,data.algorithm,i,field.key,j);
        if (config.classroomBoard && teacherOrder.indexOf(row.name) < data.revealCount) {
          return `<td class="trace-given trace-revealed">${escapeHtml(row[field.key])}</td>`;
        }
        if (config.classroomBoard) {
          return `<td class="trace-empty">${show ? escapeHtml(row[field.key]) : '&nbsp;'}</td>`;
        }
        if (show) return `<td class="trace-given">${escapeHtml(row[field.key])}</td>`;
        const wrong = data.wrong.has(key);
        const current = escapeHtml(data.values[key] || '');
        if (field.key === 'prev') {
          const options = ['—',...data.graph.v.map(([name]) => name)]
            .map(name => `<option value="${name === '—' ? '' : escapeHtml(name)}"${(data.values[key] || '') === name ? ' selected' : ''}>${name}</option>`).join('');
          return `<td><select class="trace-entry${wrong ? ' trace-wrong' : ''}" data-cell="${key}" aria-label="Previous node for ${row.name}" aria-invalid="${wrong}">${options}</select></td>`;
        }
        return `<td><input class="trace-entry${wrong ? ' trace-wrong' : ''}" data-cell="${key}" aria-label="${field.label} for ${row.name}" inputmode="numeric" autocomplete="off" value="${current}" aria-invalid="${wrong}" /></td>`;
      }).join('');
      return `<tr><th scope="row">${escapeHtml(row.name)}</th>${cells}</tr>`;
    }).join('');
    return `<div class="trace-table-scroll"><table class="trace-table"><thead><tr><th scope="col">Node</th>${fields.map(f => `<th scope="col">${f.label}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  function pathHtml(data) {
    const nodes = data.graph.v.map(([name]) => {
      const position = data.selectedPath.indexOf(name);
      return `<button type="button" data-path="${escapeHtml(name)}" class="trace-chip${position >= 0 ? ' active' : ''}" aria-pressed="${position >= 0}">${position >= 0 ? `<span>${position + 1}</span>` : '<span>○</span>'} ${escapeHtml(name)}</button>`;
    }).join('');
    return `<div class="trace-final"><p class="trace-instruction"><strong>Tick the route in order</strong> from ${data.graph.start} to ${data.graph.goal}, then add the movement costs.</p><div class="trace-chips" role="group" aria-label="Select path nodes in order">${nodes}<button type="button" class="trace-light" id="trace-clear-path">Clear</button></div><div class="trace-cost-row"><span>Selected path: <strong>${data.selectedPath.length ? escapeHtml(data.selectedPath.join(' → ')) : '—'}</strong></span><label>Total cost <input id="trace-total-cost" type="number" inputmode="numeric" value="${escapeHtml(data.costInput)}" placeholder="?" /></label><button type="button" id="trace-check-path" class="trace-primary">Check final route</button></div></div>`;
  }

  function resultHtml(data) {
    return `<div class="trace-result"><strong>Correct path: ${escapeHtml(data.answer.route.join(' → '))}</strong><span>Edge costs: ${data.answer.pathCosts.join(' + ')} = <strong>${numeric(data.answer.cost)}</strong></span><span>Nodes selected by the algorithm: ${escapeHtml(data.answer.selected.join(' → '))}</span><button type="button" id="trace-next" class="trace-primary">Next graph →</button></div>`;
  }

  function explain(data) {
    if (data.algorithm === 'astar') return 'g is the known cost from the start; h is the estimated remaining cost; f = g + h. When a cheaper g is found, update the previous node and edge cost.';
    return 'Select the unvisited node with the lowest total distance. Add its edge cost to calculate a new distance; replace a route only when the new total is smaller.';
  }

  function draw(data,config) {
    const isAStar = data.algorithm === 'astar';
    const heading = isAStar ? 'A* · Exam-style trace' : 'Dijkstra · Distance trace';
    const graphImage = config.graphImage
      ? `<img class="trace-image" src="${escapeHtml(config.graphImage)}" alt="DancerGold A* graph from A to G. Edge weights and heuristic estimates are shown." />`
      : config.graphSvg;
    const classroom = !!config.classroomBoard;
    const status = data.feedback ? `<p class="trace-feedback ${data.feedbackType}" role="status">${escapeHtml(data.feedback)}</p>` : '<p class="trace-feedback" role="status"></p>';
    const teacherActions = `<div class="trace-actions"><button type="button" class="trace-primary" id="trace-reveal-row">${data.revealCount < data.answer.rows.length ? 'Reveal next row →' : 'Show all rows ✓'}</button><button type="button" class="trace-light" id="trace-reset">Start again</button></div>`;
    const studentActions = data.stage === 'table'
      ? `<div class="trace-actions"><button type="button" class="trace-primary" id="trace-check-table">Check table</button><button type="button" class="trace-light" id="trace-reset">Start again</button><span class="trace-tip">${data.level === 'hard' ? 'Every value is yours to calculate.' : data.level === 'medium' ? 'Use the graph to complete the missing values.' : 'Complete the few missing cells.'}</span></div>`
      : data.stage === 'route' ? pathHtml(data) : resultHtml(data);
    config.workspace.innerHTML = `<div class="trace-root${classroom ? ' trace-classroom' : ''}"><div class="trace-heading"><div><span class="trace-kicker">${classroom ? 'CLASSROOM MODEL' : data.level.toUpperCase() + ' · GRAPH PRACTICE'}${data.graph.id === 'dancergold' ? ' · OCR 8 MARKS' : ''}</span><h2>${heading}</h2></div><span class="trace-goal">${data.graph.start} → ${data.graph.goal}</span></div><div class="trace-columns"><div class="trace-graph-pane"><p class="trace-caption">Edge labels = movement costs${isAStar ? ' · Bold values = h estimates' : ''}</p>${graphImage}<details class="trace-hint"><summary>How do I calculate the table?</summary><p>${explain(data)}</p></details></div><div class="trace-working"><p class="trace-caption">${isAStar ? 'Previous + edge cost → g; then f = g + h' : 'Previous + edge cost → total distance'}</p>${tableHtml(data,config)}${status}${classroom ? teacherActions : studentActions}</div></div></div>`;
    if (classroom) {
      config.workspace.querySelector('#trace-reveal-row')?.addEventListener('click', () => {
        data.revealCount = Math.min(data.revealCount + 1, data.answer.rows.length);
        const order = [...data.answer.selected,...data.answer.rows.map(row => row.name).filter(name => !data.answer.selected.includes(name))];
        data.feedback = data.revealCount === data.answer.rows.length
          ? `Final route: ${data.answer.route.join(' → ')}; cost ${numeric(data.answer.cost)}. Selected order: ${data.answer.selected.join(' → ')}.`
          : `Discuss row ${order[data.revealCount - 1]} before continuing.`;
        data.feedbackType = 'good'; draw(data,config);
      });
    } else {
      config.workspace.querySelector('#trace-check-table')?.addEventListener('click',() => checkTable(data,config));
      config.workspace.querySelectorAll('[data-path]').forEach(button => button.addEventListener('click',() => {
        const node = button.dataset.path, pos = data.selectedPath.indexOf(node);
        if (pos >= 0) data.selectedPath = data.selectedPath.slice(0,pos);
        else data.selectedPath.push(node);
        data.costInput = config.workspace.querySelector('#trace-total-cost')?.value || data.costInput;
        draw(data,config);
      }));
      config.workspace.querySelector('#trace-clear-path')?.addEventListener('click',() => {data.selectedPath=[];draw(data,config)});
      config.workspace.querySelector('#trace-check-path')?.addEventListener('click',() => checkPath(data,config));
      config.workspace.querySelector('#trace-next')?.addEventListener('click',config.onNext);
    }
    config.workspace.querySelector('#trace-reset')?.addEventListener('click',() => {
      data.values={};data.wrong.clear();data.stage='table';data.revealCount=0;
      data.selectedPath=[];data.costInput='';data.feedback='';data.feedbackType='';draw(data,config);
    });
  }

  function checkTable(data,config) {
    config.workspace.querySelectorAll('[data-cell]').forEach(input => data.values[input.dataset.cell] = input.value.trim());
    data.wrong.clear();
    let blanks=0;
    const fields=fieldsFor(data.algorithm);
    data.answer.rows.forEach((row,i) => fields.forEach((field,j) => {
      if (prefilled(data.level,data.algorithm,i,field.key,j)) return;
      const key = `${i}:${field.key}`, entered=data.values[key] || '';
      if (!entered) blanks++;
      if (!sameValue(entered,row[field.key],field.key)) data.wrong.add(key);
    }));
    const ok = data.wrong.size === 0;
    const correctRows=data.answer.rows.filter((_,i) => ![...data.wrong].some(key => key.startsWith(`${i}:`))).length;
    if (!data.checkedTable) {data.checkedTable=true;config.onFirstAttempt(ok)}
    data.feedback = ok ? 'Table correct. Now tick the shortest path and calculate its total cost.'
      : `${correctRows} of ${data.answer.rows.length} rows correct. ${blanks ? 'Fill the empty cells and ' : ''}review the highlighted values. Remember to update a route when a cheaper cost is found.`;
    data.feedbackType = ok ? 'good' : 'bad';
    if (ok) data.stage='route';
    draw(data,config);
  }

  function checkPath(data,config) {
    data.costInput=config.workspace.querySelector('#trace-total-cost')?.value.trim() || '';
    const routeCorrect=data.selectedPath.join('|')===data.answer.route.join('|');
    const costCorrect=data.costInput !== '' && Number(data.costInput)===data.answer.cost;
    const ok=routeCorrect&&costCorrect;
    data.feedback=ok?'Correct — you have reconstructed the shortest route and total cost.'
      : `Check the predecessor chain from ${data.graph.goal} backwards and add each edge cost.`;
    data.feedbackType=ok?'good':'bad';
    if(ok)data.stage='complete';
    draw(data,config);
  }

  window.RHSCExamTrace = {
    render(config) {
      let data=instances.get(config.workspace);
      if(!data || data.graph!==config.graph || data.algorithm!==config.algorithm || data.level!==config.level) {
        data=init(config);instances.set(config.workspace,data);
      }
      draw(data,config);
    }
  };
})();
