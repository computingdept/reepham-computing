#!/usr/bin/env node
/** Build branded *render-independent* SVG files from approved monochrome-glow masters.
 * Usage: node scripts/build-school-svg.mjs --school reepham [--qualification j277|h446|all] [--dry-run]
 * Output: dist/school-svg/<school>/<qualification>/*.svg
 * No dependencies, no edits to master SVGs or lessons.
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const flags = process.argv.slice(2);
function option(name, fallback = null) {
  const i = flags.indexOf(name);
  return i === -1 ? fallback : flags[i + 1] ?? fallback;
}
if (flags.includes("--help")) {
  console.log("Usage: node scripts/build-school-svg.mjs --school <registered-school> [--qualification j277|h446|all] [--dry-run]");
  process.exit(0);
}
const school = option("--school", "reepham");
const qualification = option("--qualification", "all");
const dryRun = flags.includes("--dry-run");
if (!/^[a-z0-9-]+$/.test(school) || !["j277", "h446", "all"].includes(qualification)) {
  throw new Error("Invalid school slug or qualification");
}
const themes = JSON.parse(readFileSync(join(projectRoot, "data/exam-questions/school-svg-themes.json"), "utf8"));
const theme = themes.school_themes?.[school];
if (!theme || !/^#[0-9a-fA-F]{6}$/.test(theme.glow)) throw new Error("Missing or invalid approved school colour for " + school);
const token = "#195B42";
const outRoot = resolve(projectRoot, "dist/school-svg", school);
const selected = qualification === "all" ? ["j277", "h446"] : [qualification];
let written = 0;

function walk(root) {
  if (!existsSync(root)) return [];
  const found = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.isDirectory() && !["reviews", "archive", "node_modules"].includes(entry.name)) found.push(...walk(join(root, entry.name)));
    else if (entry.isFile() && entry.name.endsWith(".svg")) found.push(join(root, entry.name));
  }
  return found;
}
function renderSchoolSvg(source, file) {
  if (!source.includes('id="schoolGlow"')) return null; // not a branded master
  if (!source.includes('<title ') || !source.includes('<desc ') || !source.includes('role="img"')) {
    throw new Error("Missing SVG accessibility metadata: " + file);
  }
  // Exclude comments/style from token scope checks. Brand may ONLY occur on blurred shapes.
  const tagsOnly = source.replace(/<!--[\s\S]*?-->/g, "").replace(/<style>[\s\S]*?<\/style>/g, "");
  const tags = tagsOnly.match(/<[^>]+>/g) ?? [];
  let coloured = 0;
  for (const tag of tags) {
    if (tag.includes(token)) {
      if (!tag.includes('stroke="' + token + '"') || !tag.includes('filter="url(#schoolGlow)"')) {
        throw new Error("School colour appears outside filtered glow: " + file);
      }
      coloured++;
    }
  }
  if (coloured === 0) throw new Error("Master has no glow shapes: " + file);
  return source.replaceAll(token, theme.glow.toUpperCase());
}

for (const q of selected) {
  const base = join(projectRoot, "assets/exam-questions", q);
  for (const src of walk(base)) {
    const original = readFileSync(src, "utf8");
    const rendered = renderSchoolSvg(original, src);
    if (rendered === null) continue;
    const relativeName = relative(base, src);
    if (relativeName.startsWith(".." + sep)) throw new Error("Unsafe relative path");
    const output = join(outRoot, q, relativeName);
    if (!dryRun) {
      mkdirSync(dirname(output), { recursive: true });
      writeFileSync(output, rendered, "utf8");
    }
    console.log((dryRun ? "Would write " : "Wrote ") + relative(projectRoot, output));
    written++;
  }
}
console.log("School: " + school + " (" + theme.brand_verification + "); SVGs: " + written);
if (!written) process.exitCode = 2;
