"use strict";

/* J277 Do Now only. Measure four question cards on the real lesson renderer.
   Reports viewport overflow for editorial review rather than shrinking fonts,
   hiding options or silently permitting clipped questions. Lesson 113 uses a
   separate synoptic-revision interface and is intentionally excluded. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:8765";
const shard = Number(process.env.QA_DONOW_SHARD || 0);
const shards = Number(process.env.QA_DONOW_SHARDS || 1);
const selected = new Set((process.env.QA_DONOW_IDS || "").split(",").filter(Boolean));
const views = [
  { name: "projector-80pct-720p", width: 1366, height: 576, desktop: true },
  { name: "projector-720p", width: 1366, height: 720, desktop: true },
  { name: "projector-80pct-1080p", width: 1920, height: 864, desktop: true },
  { name: "phone", width: 390, height: 844, desktop: false }
];
const ids = fs.readdirSync(path.join(root, "lessons/j277"), { withFileTypes: true })
  .filter(x => x.isDirectory() && /^lesson-\d{3}$/.test(x.name))
  .map(x => x.name.slice(-3))
  .filter(x => x !== "113") // distinct 47-screen revision presentation
  .filter(x => fs.existsSync(path.join(root, "lessons/j277", "lesson-" + x, "index.html")))
  .filter(x => selected.size === 0 || selected.has(x))
  .filter(x => Number(x) % shards === shard)
  .sort();
const rows = [];
const hardFailures = [];
let screenshots = 0;

(async () => {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  try {
    for (const id of ids) {
      for (const view of views) {
        const context = await browser.newContext({
          viewport: { width: view.width, height: view.height },
          isMobile: !view.desktop, hasTouch: !view.desktop
        });
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", e => errors.push(e.message));
        try {
          await page.goto(origin + "/lessons/j277/lesson-" + id + "/index.html#do-now",
            { waitUntil: "domcontentloaded", timeout: 25000 });
          await page.waitForFunction(() => {
            const q = document.querySelector("#do-now .donow-questions");
            return q && q.children.length >= 4 &&
              document.querySelector("#do-now.page.active");
          }, null, { timeout: 18000 });

          const data = await page.evaluate(() => {
            const sec = document.querySelector("#do-now");
            const grid = sec.querySelector(".donow-stage:first-child .donow-questions");
            const cards = [...grid.querySelectorAll(":scope > .donow-question")];
            const q2 = cards[1]?.querySelector(".j277-mcq");
            const choices = q2 ? [...q2.children] : [];
            const bounds = sec.getBoundingClientRect();
            const r = el => el.getBoundingClientRect();
            const internalOverflow = cards.map((c, i) => ({
              number: i + 1, excess: Math.max(0, c.scrollHeight - c.clientHeight)
            })).filter(x => x.excess > 3);
            const belowScreen = cards.map((c, i) => ({
              number: i + 1, px: Math.max(0, Math.ceil(r(c).bottom - bounds.bottom))
            })).filter(x => x.px > 3);
            const columns = choices.length === 4
              ? Math.abs(r(choices[0]).top - r(choices[1]).top) <= 3 &&
                Math.abs(r(choices[2]).top - r(choices[3]).top) <= 3
              : null;
            return {
              count: cards.length,
              mcqOptions: choices.length,
              mcqTwoByTwo: columns,
              sectionOverflowPx: Math.max(0, sec.scrollHeight - sec.clientHeight),
              horizontalOverflowPx: Math.max(0,
                document.documentElement.scrollWidth - document.documentElement.clientWidth),
              internalOverflow,
              belowScreen,
              active: sec.classList.contains("active"),
              q2Text: cards[1]?.textContent.trim().replace(/\s+/g, " ").slice(0, 140),
              q4Text: cards[3]?.textContent.trim().replace(/\s+/g, " ").slice(0, 140),
              gridColumns: getComputedStyle(grid).gridTemplateColumns,
              sectionOverflowStyle: getComputedStyle(sec).overflowY,
              fontPx: cards[0] ? getComputedStyle(cards[0].querySelector("p") || cards[0]).fontSize : ""
            };
          });
          const structural = data.count !== 4 || !data.active || errors.length > 0 ||
            (view.desktop && data.mcqOptions === 4 && data.mcqTwoByTwo !== true);
          const fits = data.sectionOverflowPx <= 3 &&
            data.horizontalOverflowPx <= 3 &&
            data.internalOverflow.length === 0 &&
            data.belowScreen.length === 0;
          const record = { lesson: id, view: view.name,
            status: structural ? "FAIL" : !view.desktop ? "MOBILE_CHECK" : fits ? "FITS" : "CONTENT_REVIEW",
            ...data, errors };
          rows.push(record);
          if (structural) hardFailures.push(record);
          if (record.status === "CONTENT_REVIEW" || record.status === "FAIL") {
            console.log("DONOW_REVIEW " + JSON.stringify({
              lesson: id, view: view.name, status: record.status,
              scroll: data.sectionOverflowPx, below: data.belowScreen,
              internal: data.internalOverflow, mcq: data.mcqOptions, errors
            }));
            if (screenshots < 8 && view.desktop) {
              await fs.promises.mkdir(path.join(root, "qa-output", "j277-donow-screens"), { recursive: true });
              await page.screenshot({ path: path.join(root, "qa-output", "j277-donow-screens",
                "lesson-" + id + "-" + view.name + ".png"), fullPage: false });
              screenshots++;
            }
          }
        } catch (e) {
          const record = { lesson: id, view: view.name, status: "FAIL", error: String(e) };
          rows.push(record);
          hardFailures.push(record);
          console.log("DONOW_FAIL " + JSON.stringify(record));
        } finally { await context.close(); }
      }
    }
  } finally { await browser.close(); }
  const summary = {
    scope: "J277 Do Now only", excluded: ["113: standalone revision presentation"],
    shard, shards, lessonsChecked: ids.length, views,
    rendered: rows.length,
    desktopFits: rows.filter(x => x.status === "FITS").length,
    desktopNeedsEditorialReview: rows.filter(x => x.status === "CONTENT_REVIEW").length,
    structuralFailures: hardFailures.length,
    detail: rows
  };
  fs.mkdirSync(path.join(root, "qa-output"), { recursive: true });
  fs.writeFileSync(path.join(root, "qa-output", "j277-donow-shard-" + shard + ".json"),
    JSON.stringify(summary, null, 2) + "\n");
  console.log("DONOW_SUMMARY " + JSON.stringify({
    shard, lessons: ids.length, fits: summary.desktopFits,
    editorialReview: summary.desktopNeedsEditorialReview, fails: hardFailures.length
  }));
  if (hardFailures.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
