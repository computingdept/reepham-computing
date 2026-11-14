/* Shared presentation of exam-style marking points for H446 and J277.
   Preserve authored text; only convert plain paragraphs with a verified mark total. */
(() => {
  "use strict";

  function parseMarkScheme(text) {
    const opening = text.trim().match(/^\[(\d{1,2})\]\s+([\s\S]+)$/);
    if (!opening) return null;
    const total = Number(opening[1]);
    if (total < 2 || total > 20) return null;
    const parts = opening[2].split(/\s*;\s*/);
    if (parts.length < 2 || parts.length > 10) return null;

    const points = [];
    for (const part of parts) {
      const match = part.trim().match(/^([\s\S]+?)\s+\[(\d{1,2})\]\s*\.?$/);
      if (!match) return null;
      const wording = match[1].trim();
      const marks = Number(match[2]);
      if (!wording || marks < 1 || marks > 10) return null;
      points.push({wording, marks});
    }
    if (points.reduce((sum, point) => sum + point.marks, 0) !== total) return null;
    return {total, points};
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {parseMarkScheme};
  }
  if (typeof document === "undefined") return;

  function formatMarkSchemes() {
    document.querySelectorAll("#you-do .youdo-solution > p").forEach(paragraph => {
      if (paragraph.children.length || paragraph.dataset.rhscMarksChecked === "true") return;
      const result = parseMarkScheme(paragraph.textContent || "");
      if (!result) {
        paragraph.dataset.rhscMarksChecked = "true";
        return;
      }

      const list = document.createElement("ol");
      list.className = "rhsc-mark-scheme-list";
      list.setAttribute("aria-label", "Marking points");
      result.points.forEach(point => {
        const item = document.createElement("li");
        item.className = "rhsc-mark-scheme-point";
        const wording = document.createElement("span");
        wording.className = "rhsc-mark-scheme-wording";
        wording.textContent = point.wording;
        const mark = document.createElement("span");
        mark.className = "rhsc-mark-scheme-mark";
        mark.textContent = point.marks === 1 ? "1 mark" : point.marks + " marks";
        item.append(wording, mark);
        list.appendChild(item);
      });
      paragraph.replaceWith(list);

      const heading = list.closest(".youdo-solution")?.querySelector(":scope > strong");
      if (heading && !heading.querySelector(".rhsc-mark-scheme-total")) {
        heading.classList.add("rhsc-mark-scheme-heading");
        const total = document.createElement("span");
        total.className = "rhsc-mark-scheme-total";
        total.textContent = result.total + " marks";
        heading.appendChild(total);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", formatMarkSchemes, {once:true});
  } else {
    formatMarkSchemes();
  }
})();
