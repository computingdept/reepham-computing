/* Shared classroom diagram lightbox. Opt in with data-classroom-zoom on a figure or SVG.
   Works with the existing SVG; no duplicate artwork or external dependency. */
(() => {
  "use strict";
  const selector = "[data-classroom-zoom]";
  let dialog;
  let opener;

  function prepareZoomTarget(target, image) {
    if (target.hasAttribute("data-classroom-zoom")) return;
    const label = image.getAttribute("aria-label") || image.getAttribute("alt") || image.querySelector?.("title")?.textContent || "learning diagram";
    target.setAttribute("data-classroom-zoom", "");
    target.setAttribute("tabindex", "0");
    target.setAttribute("role", "button");
    target.setAttribute("aria-label", "Enlarge " + label);
  }

  function enhanceTeachingFigures() {
    if (/^\/lessons\/j277\/lesson-\d{3}\//i.test(location.pathname)) {
      const standaloneReference = document.querySelector("#new-learning .nl-reference > svg");
      if (standaloneReference) document.querySelector("#new-learning")?.classList.add("a1-visual-learning");
      // Preserve the existing J277 presentation and its figure-wide tap target.
      document.querySelectorAll("#new-learning svg, #i-do svg, #we-do svg").forEach(svg => {
        prepareZoomTarget(svg.closest("figure") || svg, svg);
      });
      return;
    }

    // H446 and modern KS3 use the same viewer. Enlarge only static learning
    // artwork: leave buttons, links, diagrams with controls and decorative icons alone.
    if (!/^\/lessons\/(?:h446|year[789])\/lesson-\d{3}\//i.test(location.pathname)) return;
    document.querySelectorAll(".page svg[role='img'], .page svg[aria-label], .page img:not(.iconimg)").forEach(image => {
      if (image.matches("[aria-hidden='true']") || image.closest("a, button, [role='button'], [data-no-zoom], [data-interactive], .rhsc-visual-zoom")) return;
      prepareZoomTarget(image, image);
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
    dialog.querySelector(".rhsc-visual-zoom-canvas").addEventListener("click", event => {
      // A second tap on the enlarged artwork returns to the same lesson step.
      if (event.target.closest?.("svg, img")) dialog.close();
    });
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
    expanded.removeAttribute("data-classroom-zoom");
    expanded.removeAttribute("tabindex");
    if (expanded.tagName.toLowerCase() === "svg") {
      expanded.setAttribute("role", "img");
      const label = expanded.getAttribute("aria-label");
      if (label?.startsWith("Enlarge ")) expanded.setAttribute("aria-label", label.slice(8));
    }
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
