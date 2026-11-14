/* Shared classroom diagram lightbox. Opt in with data-classroom-zoom on a figure or SVG.
   Works with the existing SVG; no duplicate artwork or external dependency. */
(() => {
  "use strict";
  const selector = "[data-classroom-zoom]";
  let dialog;
  let opener;

  function enhanceTeachingFigures() {
    const standaloneReference = document.querySelector("#new-learning .nl-reference > svg");
    if (standaloneReference) document.querySelector("#new-learning")?.classList.add("a1-visual-learning");
    // The two J277 lesson generators render several SVG figure variants.
    // Opt in their static teaching diagrams without changing lesson content.
    document.querySelectorAll("#new-learning svg, #i-do svg, #we-do svg").forEach(svg => {
      const target = svg.closest("figure") || svg;
      if (target.hasAttribute("data-classroom-zoom")) return;
      target.setAttribute("data-classroom-zoom", "");
      target.setAttribute("tabindex", "0");
      target.setAttribute("role", "button");
      target.setAttribute("aria-label", "Enlarge " + (svg.getAttribute("aria-label") || "learning diagram"));
    });
  }

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "rhsc-visual-zoom";
    dialog.setAttribute("aria-label", "Enlarged learning diagram");
    dialog.innerHTML = `
      <div class="rhsc-visual-zoom-toolbar">
        <strong>Learning diagram</strong>
        <button type="button" class="rhsc-visual-zoom-close" aria-label="Close enlarged diagram">✕ Close</button>
      </div>
      <div class="rhsc-visual-zoom-canvas" tabindex="0"></div>`;
    document.body.appendChild(dialog);
    dialog.querySelector(".rhsc-visual-zoom-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      dialog.querySelector(".rhsc-visual-zoom-canvas").replaceChildren();
      opener?.focus({preventScroll: true});
      opener = null;
    });
    return dialog;
  }

  function enlarge(figure) {
    const image = figure.matches("svg, img") ? figure : figure.querySelector("svg, img");
    if (!image) return;
    const modal = ensureDialog();
    if (modal.open) return;
    opener = figure;
    const expanded = image.cloneNode(true);
    expanded.removeAttribute("width");
    expanded.removeAttribute("height");
    modal.querySelector(".rhsc-visual-zoom-canvas").replaceChildren(expanded);
    modal.showModal();
    modal.querySelector(".rhsc-visual-zoom-close").focus();
  }

  document.addEventListener("click", event => {
    const figure = event.target.closest?.(selector);
    if (figure) enlarge(figure);
  });
  document.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches?.(selector)) {
      event.preventDefault();
      enlarge(event.target);
    }
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceTeachingFigures, {once:true});
  } else {
    enhanceTeachingFigures();
  }
})();
