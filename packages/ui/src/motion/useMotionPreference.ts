"use client";

import { useEffect, useState } from "react";

/**
 * Two accessibility preferences that change what the design *is*, not just how
 * it performs.
 *
 * `prefers-reduced-transparency` is the one that matters most here. A user who
 * sets it gets the opaque path on every surface, every visit — so it is a
 * designed state with its own contrast budget, not a degradation.
 *
 * Both start `false` so server and first client render agree; the effect
 * corrects after hydration. Assuming the *reduced* value would be safer for
 * motion but would flash the fallback for the majority who have not set it.
 */
export function useMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [reducedTransparency, setReducedTransparency] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const transparencyQuery = window.matchMedia("(prefers-reduced-transparency: reduce)");

    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setReducedTransparency(transparencyQuery.matches);
    };

    sync();
    motionQuery.addEventListener("change", sync);
    transparencyQuery.addEventListener("change", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      transparencyQuery.removeEventListener("change", sync);
    };
  }, []);

  return { reducedMotion, reducedTransparency };
}
