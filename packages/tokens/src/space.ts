/** 4px base grid. Named by step, not by pixel, so the grid can be retuned once. */
export const space = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  40: "10rem",
  48: "12rem",
} as const;

/**
 * Generous radii throughout — Apple Glass reads as soft-bodied, and a tight
 * corner on a translucent pane looks like a cut-out rather than an object.
 *
 * These are circular corners. True continuous ("squircle") curvature needs a
 * clip-path or paint worklet; the visual gap is small at these radii and the
 * cost of the workaround is not. Revisit if `corner-shape` ships broadly.
 */
export const radius = {
  sm: "0.5rem",
  md: "0.875rem",
  lg: "1.375rem",
  xl: "2rem",
  full: "999px",
} as const;

/** Stage sits at 0. Chrome floats above it. Nothing competes for these. */
export const z = {
  stage: 0,
  content: 10,
  chrome: 100,
  panel: 200,
  modal: 300,
} as const;

export const layout = {
  /** Reading measure. ~68 characters at the body step. */
  measure: "34rem",
  /** Content column. */
  content: "72rem",
  /** Full-bleed max before the stage takes over. */
  wide: "96rem",
  gutter: "clamp(1.25rem, 4vw, 4rem)",
} as const;
