/**
 * DRAFT ONLY: render existing independent.html booklet pages into PDFs.
 * Never publishes them to student-facing hubs.
 * Requires npm install --no-save playwright@1.56.1 and playwright chromium.
 * Usage: node tools/independent/render_booklets.mjs --course j277 --ids 001,002,003,004
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
const root = process.cwd();
function opt(name, fallback) {
  const at = process.argv.indexOf('--' + name);
  return at < 0 ? fallback : process.argv[at + 1];
}
const course = opt('course', 'j277');
const ids = opt('ids', '001,002,003,004').split(',').map(s => s.trim()).filter(Boolean);
const outDir = path.resolve(opt('out', 'draft-booklets/' + course));
if (!['j277', 'h446'].includes(course)) throw new Error('Invalid course');
if (!ids.length || ids.some(id => !/^\d{3}$/.test(id))) throw new Error('Use --ids 001,002,...');
await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const report = { course, generatedAt: new Date().toISOString(), status: 'draft - teacher approval required', results: [] };
const a4CSS = [
'@media print {',
'@page { size: A4 portrait; margin: 0; }',
'html, body { margin: 0 !important; padding: 0 !important; background: white !important; }',
'.screen-toolbar, .instructions, .print-spreads, .independent-progress,',
'.independent-stepnav, .independent-guidance { display: none !important; }',
'#viewer.viewer { display: block !important; width: 210mm !important;',
'padding: 0 !important; margin: 0 !important; gap: 0 !important; }',
'#viewer > .page { display: flex !important; box-sizing: border-box !important;',
'width: 210mm !important; height: 297mm !important; min-height: 297mm !important;',
'max-height: 297mm !important; margin: 0 !important; padding: 12mm 12mm 10mm !important;',
'box-shadow: none !important; overflow: hidden !important;',
'break-before: auto !important; break-inside: avoid !important;',
'break-after: page !important; page-break-after: always !important; }',
'#viewer > .page:last-child { break-after: auto !important; page-break-after: auto !important; }',
'#viewer > .page[hidden] { display: flex !important; }',
'}',
].join('\n');
try {
 for (const id of ids) {
  const lessonPath = path.join(root, 'lessons', course, 'lesson-' + id, 'independent.html');
  const item = { lesson: id, source: path.relative(root, lessonPath), files: [], warnings: [], errors: [] };
  report.results.push(item);
  try { await fs.access(lessonPath); } catch {
   item.errors.push('No grounded independent.html draft exists yet.');
   continue;
  }
  const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });
  try {
   for (const mode of ['colour', 'bw']) {
    const url = pathToFileURL(lessonPath);
    url.searchParams.set('version', mode);
    await page.goto(url.href, { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(async () => {
     await document.fonts.ready;
     for (const img of document.images) if (!img.complete) await new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
     });
    });
    const inspection = await page.evaluate(() => {
     const pages = [...document.querySelectorAll('#viewer > .page')];
     return {
      pages: pages.length,
      metrics: pages.map((el, i) => {
       const main = el.querySelector('main');
       const footer = el.querySelector('footer');
       const last = main?.lastElementChild?.getBoundingClientRect();
       const footerTop = footer?.getBoundingClientRect().top;
       return { number: i + 1, possibleCollision: !!(last && footer && last.bottom > footerTop - 4) };
      }),
     };
    });
    if (inspection.pages !== 4)
     item.warnings.push(mode + ': ' + inspection.pages + ' pages; the standard expects four.');
    for (const metric of inspection.metrics)
     if (metric.possibleCollision) item.warnings.push(mode + ': page ' + metric.number + ' may overlap the footer.');
    // A3 printer spreads come from the existing shared independent-print.js.
    const a3 = path.join(outDir, course.toUpperCase() + '_Lesson_' + id + '_' + mode + '_A3_spreads.pdf');
    await page.pdf({ path: a3, printBackground: true, preferCSSPageSize: true });
    item.files.push(path.relative(root, a3));
    // A4 reading copy, four single pages in natural order.
    await page.evaluate(() => {
     document.body.classList.remove('independent-paged');
     document.querySelectorAll('#viewer > .page').forEach(p => p.removeAttribute('hidden'));
    });
    await page.addStyleTag({ content: a4CSS });
    const a4 = path.join(outDir, course.toUpperCase() + '_Lesson_' + id + '_' + mode + '_A4_pages.pdf');
    await page.pdf({ path: a4, printBackground: true, preferCSSPageSize: true });
    item.files.push(path.relative(root, a4));
   }
  } catch (err) {
   item.errors.push(String(err?.stack || err));
  } finally { await page.close(); }
 }
} finally { await browser.close(); }
report.counts = {
 lessonsRequested: ids.length,
 lessonsWithPDFs: report.results.filter(r => r.files.length === 4 && !r.errors.length).length,
 missingOrFailed: report.results.filter(r => r.errors.length).length,
 files: report.results.reduce((sum, r) => sum + r.files.length, 0),
};
await fs.writeFile(path.join(outDir, 'generation-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report.counts));
if (report.counts.lessonsWithPDFs < 1) process.exitCode = 1;
