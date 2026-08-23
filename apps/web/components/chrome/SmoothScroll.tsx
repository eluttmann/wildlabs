"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis smooth scroll.
 *
 * Deliberately restrained. Heavy scroll smoothing is the fastest way to make a
 * site feel like a demo rather than a place — it fights the user's input device
 * and adds latency to every gesture. A short duration and a gentle curve give
 * the page weight without taking control away.
 *
 * Disabled outright under reduced motion, where hijacking scroll is exactly the
 * thing the preference is asking you not to do.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Touch devices already have momentum scrolling; adding ours fights it.
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
