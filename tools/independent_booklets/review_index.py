"""Offline staff-only index for reviewing downloadable draft PDFs.

Review checkboxes are LOCAL browser state, not approval or publication.
"""
from __future__ import annotations

import html
import json
from pathlib import Path


def h(value):
    return html.escape(str(value or ""), quote=True)


def build_review_index(out: Path, records: list[dict]):
    cards = []
    for r in sorted(records, key=lambda x: (x["course"], x["lesson"])):
        key = r["label"]
        status = r["status"]
        tags = " ".join(r.get("missing_data", []) + r.get("failed_checks", []))
        warnings = r.get("warnings", [])
        notes = " · ".join(warnings[:2] + r.get("missing_data", [])[:2] + r.get("failed_checks", [])[:2])
        def link(field, label):
            target = r.get(field, "")
            if field == "independent_html" and target.startswith("/"):
                target = "https://rhsccs.org" + target
            return f'<a href="{h(target)}" target="_blank" rel="noopener">{h(label)}</a>' if target else ""
        links = " ".join(filter(None, [
            link("a4_pdf", "B&W A4"), link("colour_a4_pdf", "Colour A4"),
            link("a3_pdf", "B&W A3 booklet"), link("colour_a3_pdf", "Colour A3 booklet"),
            link("independent_html", "Existing online draft"),
        ]))
        if not links:
            links = "<span>PDF not generated</span>"
        cards.append(f'''
        <article class="lesson" data-key="{h(key)}" data-status="{h(status)}"
                 data-search="{h((key+" "+r.get("title","")+" "+r.get("spec","")+" "+notes).lower())}">
          <div class="lesson-main">
            <div class="lesson-title"><strong>{h(key)}</strong> <span>{h(r.get("title",""))}</span></div>
            <div class="meta">OCR {h(r["course"].upper())} · Spec {h(r.get("spec","to check"))}
              · {h(r.get("a4_pages",0))} A4 pages · <span class="status">{h(status.replace("_"," "))}</span></div>
            <div class="links">{links}</div>
            <p class="notes">{h(notes) if notes else "No missing source fields detected. Teacher content review still required."}</p>
          </div>
          <label class="check"><input type="checkbox" data-reviewed="{h(key)}"> Reviewed locally</label>
        </article>''')
    markup = '''<!doctype html><html lang="en-GB"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Independent Booklet Draft Review · Staff only</title>
<style>
:root{font:16px/1.45 system-ui,Arial,sans-serif;color:#172a28;background:#fff}
*{box-sizing:border-box}body{max-width:1160px;margin:0 auto;padding:22px 18px 60px}
h1{font-size:clamp(25px,3.2vw,36px);line-height:1.15;margin:0 0 10px}
p{max-width:90ch}a{color:#064c43;text-decoration-thickness:2px;text-underline-offset:3px}
.notice{border:2px solid #202d2b;padding:12px 16px;margin:14px 0 22px;background:#fafafa}
.controls{display:flex;gap:12px;flex-wrap:wrap;align-items:end;border-bottom:2px solid #182a28;padding-bottom:16px}
.controls label{display:grid;gap:5px;font-weight:700}
input[type=search],select,button{font:inherit;padding:9px 12px;border:1.5px solid #394b49;background:#fff;color:inherit;border-radius:5px}
input[type=search]{min-width:min(450px,80vw)}
button{cursor:pointer;font-weight:700}
.summary{margin:14px 0;font-weight:700}
.lesson{display:flex;justify-content:space-between;align-items:start;gap:16px;padding:15px 0;border-bottom:1px solid #c9d1d0}
.lesson-title{display:flex;gap:10px;flex-wrap:wrap;font-size:17px}
.lesson-title strong{font-weight:900}.meta{font-size:13px;color:#455755;margin:4px 0 9px}
.status{font-weight:700}.links{display:flex;gap:8px 16px;flex-wrap:wrap;font-size:14px;font-weight:700}
.notes{font-size:13px;color:#43514f;margin:8px 0 0;max-width:82ch}
.check{white-space:nowrap;display:flex;gap:8px;align-items:center;font-size:14px;font-weight:700}
.check input{width:19px;height:19px;accent-color:#064c43}
.lesson[hidden]{display:none!important}
@media(max-width:700px){.lesson{display:block}.check{margin-top:12px}.controls{display:grid}}
@media print{.controls{display:none}.notice{border:1px solid #333}body{padding:0}.lesson{break-inside:avoid}}
</style></head><body>
<h1>Independent booklet drafts · Review index</h1>
<div class="notice"><strong>STAFF ONLY · DRAFTS ARE NOT APPROVED FOR PUPILS.</strong>
<p>Every file is a first-pass source-grounded booklet, not a verified teaching resource.
Open the A4 PDF, compare it with the original lesson and revision guide, check every model
answer and diagram, then inspect the A3 fold/print layout. A checked box only records
your own review on this device; it does not publish or approve a lesson.</p></div>
<div class="controls">
<label>Find a lesson<input id="search" type="search" placeholder="Number, title, spec or issue"></label>
<label>Show<select id="filter"><option value="all">All lessons</option>
<option value="unchecked">Not yet reviewed locally</option>
<option value="checked">Reviewed locally</option>
<option value="incomplete">Incomplete source / failed checks</option>
<option value="visual">Visual / independence review</option>
<option value="ready">Ready for teacher audit</option><option value="assessment">Assessment — staff only</option></select></label>
<button id="export" type="button">Export my review log CSV</button>
<a href="SUMMARY.md">Read summary</a><a href="manifest.csv">Full audit CSV</a>
</div>
<div id="summary" class="summary" aria-live="polite"></div>
<main id="lessons">
''' + "\n".join(cards) + '''
</main>
<script>
(function(){
  const items=[...document.querySelectorAll('.lesson')],search=document.querySelector('#search'),
        filter=document.querySelector('#filter'),summary=document.querySelector('#summary');
  const storageKey='rhs-independent-booklet-draft-review-v1';
  let saved={};
  try{saved=JSON.parse(localStorage.getItem(storageKey)||'{}')||{}}catch(e){}
  function persist(){try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch(e){}}
  for(const item of items){
    const box=item.querySelector('input[data-reviewed]'),key=item.dataset.key;
    box.checked=!!saved[key];
    box.addEventListener('change',()=>{saved[key]=box.checked;persist();refresh()});
  }
  function refresh(){
    const query=search.value.toLowerCase().trim(),mode=filter.value;
    let shown=0;
    for(const item of items){
      const key=item.dataset.key,status=item.dataset.status,checked=!!saved[key];
      const okText=item.dataset.search.includes(query);
      const okFilter=mode==='all'||(mode==='checked'&&checked)||(mode==='unchecked'&&!checked)||
        (mode==='incomplete'&&/incomplete|failed|needs_audit/.test(status))||
        (mode==='visual'&&status.includes('visual'))||(mode==='ready'&&status.includes('ready_for_teacher'))||
        (mode==='assessment'&&status.includes('assessment_staff_only'));
      item.hidden=!(okText&&okFilter);if(!item.hidden)shown++;
    }
    summary.textContent=shown+' of '+items.length+' lessons shown · '+
      items.filter(i=>saved[i.dataset.key]).length+' marked reviewed locally';
  }
  search.addEventListener('input',refresh);filter.addEventListener('change',refresh);
  document.querySelector('#export').addEventListener('click',()=>{
    const rows=['Lesson,Reviewed locally,Source status'];
    for(const item of items){
      rows.push([item.dataset.key,saved[item.dataset.key]?'YES':'NO',item.dataset.status].map(v=>'"'+String(v).replaceAll('"','""')+'"').join(','));
    }
    const url=URL.createObjectURL(new Blob([rows.join('\\r\\n')],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='booklet-review-log.csv';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  });
  refresh();
})();
</script></body></html>'''
    (out / "REVIEW_INDEX.html").write_text(markup, encoding="utf-8")
