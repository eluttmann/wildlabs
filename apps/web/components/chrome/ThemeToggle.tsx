"use client";

import { useEffect, useState } from "react";

type Choice = "light" | "dark" | "system";
const STORAGE_KEY = "wl-theme";

/**
 * Three states, not two. "System" is a real choice and the default — a binary
 * toggle silently overrides the user's OS preference the first time it is
 * touched and never gives it back.
 */
export function ThemeToggle() {
  const [choice, setChoice] = useState<Choice>("system");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") setChoice(stored);
    } catch {
      // Private windows and blocked site data throw on access. Ignore.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (choice === "system") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = choice;
    }
    try {
      if (choice === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Non-fatal — the choice still applies for this page view.
    }
  }, [choice]);

  const next: Choice = choice === "system" ? "dark" : choice === "dark" ? "light" : "system";
  const label = choice === "system" ? "Auto" : choice === "dark" ? "Dark" : "Light";

  return (
    <button
      type="button"
      onClick={() => setChoice(next)}
      className="wl-type cursor-pointer bg-transparent text-[var(--wl-text-muted)] transition-colors duration-[var(--wl-duration-quick)] hover:text-[var(--wl-text)]"
      data-step="label"
      aria-label={`Theme: ${label}. Switch to ${next}.`}
    >
      {label}
    </button>
  );
}
