"use client";

import { useEffect, useState } from "react";

export type Tone = "light" | "dark";

/**
 * WebGL cannot read CSS custom properties, so the stage has to resolve the
 * theme itself. Mirrors the same precedence as tokens.css: an explicit
 * `data-theme` on <html> wins, otherwise the system preference decides.
 */
export function useThemeTone(): Tone {
  const [tone, setTone] = useState<Tone>("light");

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const resolve = () => {
      const explicit = document.documentElement.dataset.theme;
      if (explicit === "dark" || explicit === "light") {
        setTone(explicit);
        return;
      }
      setTone(query.matches ? "dark" : "light");
    };

    resolve();
    query.addEventListener("change", resolve);

    // Catch runtime theme toggles that flip the attribute.
    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      query.removeEventListener("change", resolve);
      observer.disconnect();
    };
  }, []);

  return tone;
}
