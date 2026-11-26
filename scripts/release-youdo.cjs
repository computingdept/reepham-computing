"use strict";
// One content fingerprint for the existing shared You Do assets and loaders.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const ASSETS = [
  "assets/h446-y13/h446-you-do.js",
  "assets/h446-y13/h446-you-do.css",
  "assets/h446-y13/h446-youdo-question-sheet.css",
  "assets/rhs-youdo/command-brush.css",
  "assets/rhs-youdo/youdo-presentation-20261122-compact.js",
  "assets/rhs-youdo/youdo-presentation-20261122-compact.css",
  "assets/j277/youdo-unified.js",
  "assets/j277/youdo-unified.css",
  "assets/j277/year11-bank-preview.js",
  "assets/j277/year11-bank-preview.css"
];
const LOADERS = [
  "lessons/j277/autumn1-rebuilt.js",
  "lessons/j277/autumn2-rebuilt.js",
  "lessons/j277/h446-adapter.js"
];
const ASSET_SET = new Set(ASSETS);
const LOADER_SET = new Set(LOADERS);
const GENERATED_CONTEXT = new Set([...LOADERS, "assets/j277/youdo-unified.js"]);
const REF = /(["'])([./A-Za-z0-9_-]+\.(?:js|css))(\?v=[A-Za-z0-9_.-]+)?\1/g;
function rewrite(file, body, targets, version, generated = false) {
  const context = generated ? "lessons/j277/lesson-020/index.html" : file;
  const parent = path.posix.dirname(context);
  return body.replace(REF, (all, quote, url) => {
    const resolved = url.startsWith("/") ? url.slice(1) : path.posix.normalize(path.posix.join(parent, url));
    return targets.has(resolved) ? quote + url + "?v=" + version + quote : all;
  });
}
function lessonPage(name) {
  return /^lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/index\.html|\.html)$/.test(name);
}
function plan(files) {
  const source = {};
  for (const name of [...ASSETS, ...LOADERS]) {
    if (typeof files[name] !== "string") throw new Error("Missing release source: " + name);
    source[name] = rewrite(name, files[name], ASSET_SET, "RELEASE", GENERATED_CONTEXT.has(name));
  }
  // Normalize embedded release versions before hashing, so the result is stable.
  const version = crypto.createHash("sha256")
    .update(JSON.stringify(Object.entries(source))).digest("hex").slice(0, 12);
  const updates = {};
  const enrolled = {h446: 0, j277: 0};
  for (const name of [...ASSETS, ...LOADERS]) {
    const body = rewrite(name, files[name], ASSET_SET, version, GENERATED_CONTEXT.has(name));
    if (body !== files[name]) updates[name] = body;
  }
  for (const [name, old] of Object.entries(files)) {
    if (!lessonPage(name)) continue;
    const next = rewrite(name, rewrite(name, old, ASSET_SET, version), LOADER_SET, version);
    if (rewrite(name, rewrite(name, old, ASSET_SET, "RELEASE"), LOADER_SET, "RELEASE") !== old) {
      enrolled[name.split("/")[1]]++;
    }
    if (next !== old) updates[name] = next;
  }
  return {version, updates, enrolled};
}
function readSources(root) {
  const files = {};
  const read = name => { files[name] = fs.readFileSync(path.join(root, name), "utf8"); };
  for (const name of [...ASSETS, ...LOADERS]) read(name);
  for (const course of ["j277", "h446"]) {
    const dir = "lessons/" + course;
    for (const entry of fs.readdirSync(path.join(root, dir), {withFileTypes:true})) {
      if (entry.isDirectory() && /^lesson-\d{3}$/.test(entry.name)) {
        const file = dir + "/" + entry.name + "/index.html";
        if (fs.existsSync(path.join(root, file))) read(file);
      } else if (entry.isFile() && /^lesson-\d{3}\.html$/.test(entry.name)) {
        read(dir + "/" + entry.name);
      }
    }
  }
  return files;
}
function main(args) {
  if (args.length !== 1 || !["--check", "--write"].includes(args[0])) {
    console.error("Usage: node scripts/release-youdo.cjs --check|--write");
    return 2;
  }
  const root = path.resolve(__dirname, "..");
  const result = plan(readSources(root));
  const entries = Object.entries(result.updates);
  console.log("Shared You Do release " + result.version);
  console.log("Existing linked lesson pages: " + JSON.stringify(result.enrolled));
  console.log("Changed references: " + entries.length + " files");
  for (const [name, body] of entries) {
    console.log((args[0] === "--write" ? "UPDATE " : "STALE ") + name);
    if (args[0] === "--write") fs.writeFileSync(path.join(root, name), body, "utf8");
  }
  return args[0] === "--check" && entries.length ? 1 : 0;
}
module.exports = {ASSETS, LOADERS, rewrite, plan};
if (require.main === module) process.exitCode = main(process.argv.slice(2));
