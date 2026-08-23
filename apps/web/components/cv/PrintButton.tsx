"use client";

import { useCallback } from "react";
import { Glass } from "@wildlabs/ui";

/**
 * The PDF is the print stylesheet.
 *
 * No headless browser, no server render, no second document that can drift from
 * the page. The browser's own print-to-PDF produces selectable text, which is
 * what an applicant tracking system needs — a canvas or image-based export
 * parses as an empty document and quietly sinks the application.
 *
 * The title rename is the whole trick: browsers name the saved file after
 * `document.title`, so this is the difference between "Eric Luttmann — CV.pdf"
 * and "localhost_3000_cv.pdf".
 */
export function PrintButton({ name }: { name: string }) {
  const handlePrint = useCallback(() => {
    const original = document.title;
    document.title = `${name} — CV`;

    // Restore after the dialog closes, whichever way the browser reports it.
    const restore = () => {
      document.title = original;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);

    window.print();

    // Safari does not always fire afterprint; belt and braces.
    window.setTimeout(restore, 1000);
  }, [name]);

  return (
    <Glass
      as="button"
      type="button"
      onClick={handlePrint}
      tier="sheer"
      interactive
      data-print="hide"
      className="wl-type rounded-[var(--wl-radius-full)] px-5 py-2.5"
      data-step="label"
    >
      Download PDF
    </Glass>
  );
}
