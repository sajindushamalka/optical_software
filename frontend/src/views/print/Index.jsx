// PrintA5Button.jsx
import React from "react";

/**
 * Props:
 *  - selector: CSS selector for the element to print (default: '.a5-card')
 *  - marginMm: margins in mm (default 8)
 */
export default function PrintA5Button({ selector = ".a5-card", marginMm = 8 }) {
  const mmToPxInCurrentWindow = (mm) => {
    const div = document.createElement("div");
    div.style.width = `${mm}mm`;
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    document.body.appendChild(div);
    const px = div.getBoundingClientRect().width;
    div.remove();
    return px;
  };

  const handlePrint = async () => {
    // get the element from main window
    const el = document.querySelector(selector);
    if (!el) {
      alert("Print target not found: " + selector);
      return;
    }

    // clone node (deep)
    const cloned = el.cloneNode(true);

    // open new window
    const printWin = window.open("", "_blank", "noopener,noreferrer");
    if (!printWin) {
      alert("Popup blocked. Allow popups for this site.");
      return;
    }

    // copy stylesheet links and inline styles to new window
    const head = printWin.document.head;
    // copy <link rel="stylesheet"> and <style> tags
    Array.from(document.querySelectorAll("link[rel=stylesheet], style")).forEach((node) => {
      head.appendChild(node.cloneNode(true));
    });

    // create a wrapper so we can scale easily
    const wrapper = printWin.document.createElement("div");
    wrapper.style.display = "inline-block";
    wrapper.style.boxSizing = "border-box";
    wrapper.appendChild(cloned);

    // append a helper style tag with @page and defaults
    const styleTag = printWin.document.createElement("style");
    styleTag.type = "text/css";
    styleTag.innerHTML = `
      @page { size: A5; margin: ${marginMm}mm; }
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: white;
      }
      /* avoid breaking inside the wrapper */
      .a5-card, .a5-card * { page-break-inside: avoid; break-inside: avoid; -webkit-print-color-adjust: exact; }
      /* ensure the wrapper doesn't auto scale by browser - we'll scale manually */
      body > div { display: flex; justify-content: center; align-items: center; height: 100%; }
    `;
    head.appendChild(styleTag);

    // put wrapper in body
    printWin.document.body.appendChild(wrapper);

    // Wait for images/fonts to load in the new window
    const waitForLoad = () =>
      new Promise((resolve) => {
        // try to resolve when load event fires, or after 800ms fallback
        let resolved = false;
        printWin.onload = () => {
          if (!resolved) {
            resolved = true;
            setTimeout(resolve, 50);
          }
        };
        // fallback in case onload doesn't fire
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        }, 800);
      });

    await waitForLoad();

    // Now compute scale: measure element in new window and target A5 size in px (use main window mm->px)
    // compute target width/height in px (148mm x 210mm minus margins)
    const targetWidthPx = mmToPxInCurrentWindow(148 - 2 * marginMm);
    const targetHeightPx = mmToPxInCurrentWindow(210 - 2 * marginMm);

    // measure cloned element (in new window)
    const clonedEl = printWin.document.querySelector(selector) || wrapper.firstElementChild;
    const rect = clonedEl.getBoundingClientRect();
    const elW = rect.width || clonedEl.offsetWidth;
    const elH = rect.height || clonedEl.offsetHeight;

    // if element is zero sized, try getComputedStyle width
    if (elW === 0 || elH === 0) {
      const cs = printWin.getComputedStyle(clonedEl);
      const w = parseFloat(cs.width.replace("px", "")) || elW;
      const h = parseFloat(cs.height.replace("px", "")) || elH;
      if (w) elW = w;
      if (h) elH = h;
    }

    // calculate scale (do not upscale >1)
    const scale = Math.min(1, targetWidthPx / elW, targetHeightPx / elH);

    // set transform on wrapper so layout stays identical but scaled
    wrapper.style.transformOrigin = "top left";
    wrapper.style.transform = `scale(${scale})`;

    // center scaled element inside page
    // compute resulting scaled size
    const finalW = elW * scale;
    const finalH = elH * scale;
    const pageWidth = mmToPxInCurrentWindow(148);
    const pageHeight = mmToPxInCurrentWindow(210);

    // compute margins to center
    const left = Math.max((pageWidth - finalW) / 2, 0);
    const top = Math.max((pageHeight - finalH) / 2, 0);

    // set wrapper container to have the fixed page size to ensure single page
    const container = printWin.document.createElement("div");
    container.style.width = `${pageWidth}px`;
    container.style.height = `${pageHeight}px`;
    container.style.display = "block";
    container.style.boxSizing = "border-box";
    container.style.overflow = "hidden";
    container.style.position = "relative";

    // move the scaled wrapper inside container and set offsets
    wrapper.style.position = "absolute";
    wrapper.style.left = `${left}px`;
    wrapper.style.top = `${top}px`;

    // replace body content with container (container contains wrapper already)
    printWin.document.body.innerHTML = "";
    printWin.document.body.appendChild(container);
    container.appendChild(wrapper);

    // small delay to ensure paints & font rendering complete
    setTimeout(() => {
      try {
        printWin.focus();
        // call print
        printWin.print();
      } catch (err) {
        console.error("Print failed", err);
      }
      // close popup after printing (some browsers block close without user interaction)
      // give more time for print dialog to start
      setTimeout(() => {
        try {
          printWin.close();
        } catch (e) {}
      }, 500);
    }, 350);
  };

  return (
    <button className="btn btn-primary" onClick={handlePrint}>
      Print A5 (Exact layout)
    </button>
  );
}
