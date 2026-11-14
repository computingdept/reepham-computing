/* Shared classroom diagram lightbox. Opt in with data-classroom-zoom on a figure.
   Works with the existing SVG; no duplicate artwork or external dependency. */
(() => {
  "use strict";
  const selector = "figure[data-classroom-zoom]";
  let dialog;
  let opener;

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
    const image = figure.querySelector("svg, img");
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
})();
