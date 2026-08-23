/**
 * One physics system.
 *
 * The thing that separates a site that feels designed from one that feels
 * assembled is not how much it moves — it is whether everything moves the same
 * way. Three durations, two curves, one spring. Nothing in Wild Labs animates
 * on a value that is not in this file.
 *
 * `ease.out` is an expo-out curve. It leaves fast and lands slow, which is what
 * reads as "floaty" rather than "fast" — the eye reads the settle, not the
 * departure. It is the default for anything entering or responding to input.
 */

export const duration = {
  /** Hover, focus, press. Below ~200ms motion reads as response, not animation. */
  quick: 180,
  /** Panels, reveals, glass transitions. The workhorse. */
  base: 420,
  /** Camera moves, route changes, stage transitions. */
  slow: 900,
} as const;

export const ease = {
  /** Expo-out. Entrances, reveals, anything answering a user action. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric. Only for continuous or reversible motion — camera, scrub, loops. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** CSS-serialised forms of the curves above. */
export const easeCss = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

/**
 * The single spring. Slightly underdamped so panels overshoot by a hair and
 * settle — that overshoot is the entire difference between "glass panel" and
 * "div with a blur on it".
 */
export const spring = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
} as const;

/**
 * Reduced motion is a real state, not a fallback.
 *
 * Honouring `prefers-reduced-motion` by disabling transitions leaves the UI
 * snapping between states, which is worse than the animation. Instead we
 * collapse every duration toward zero but keep opacity crossfades — position
 * and scale stop moving, presence still reads.
 */
export const reduced = {
  quick: 0,
  base: 120,
  slow: 120,
} as const;

export type DurationStep = keyof typeof duration;
export type EaseStep = keyof typeof ease;
