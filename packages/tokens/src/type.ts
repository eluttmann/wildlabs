/**
 * Two families, chosen to contrast at display size and converge at reading size.
 *
 * Archivo (headings) descends from American gothic — squared letterforms, tight
 * apertures, flat-cut terminals. Switzer (body) is Helvetica-lineage: warmer,
 * rounder, more open. Set at 100px in caps the difference is obvious. Set at
 * 17px in a paragraph it is invisible, which is the point — the contrast should
 * live in the hierarchy, not in the reading.
 *
 * Archivo's `wdth` axis (62–125) is the reason it earns the slot. One variable
 * file gives a compressed masthead and an expanded display line, so a monochrome
 * brand gets editorial range without adding colour, ornament, or a third family.
 */

export const family = {
  /** Archivo Variable — wght 100..900, wdth 62..125. SIL Open Font License. */
  display: `var(--wl-font-display, "Archivo Variable", "Archivo", "Helvetica Neue", Arial, sans-serif)`,
  /** Switzer Variable — wght 100..900. Indian Type Foundry Free Font License. */
  body: `var(--wl-font-body, "Switzer Variable", "Switzer", "Helvetica Neue", Arial, sans-serif)`,
} as const;

export const weight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

/**
 * Fluid scale. Every display step is `clamp()` so the type breathes with the
 * viewport instead of stepping at breakpoints — a static scale is the single
 * biggest tell that a site is a document rather than a place.
 */
export const scale = {
  /** Hero. Caps only. The one place `wdth` is pushed. */
  display1: {
    family: family.display,
    size: "clamp(2.75rem, 9vw, 8.5rem)",
    lineHeight: "0.92",
    weight: weight.extrabold,
    tracking: "0.10em",
    transform: "uppercase",
    width: 100,
  },
  /** Section openers. */
  display2: {
    family: family.display,
    size: "clamp(2rem, 5.5vw, 4.5rem)",
    lineHeight: "0.98",
    weight: weight.extrabold,
    tracking: "0.06em",
    transform: "uppercase",
    width: 100,
  },
  /** Compressed lockup — the wordmark and nav brand. */
  wordmark: {
    family: family.display,
    size: "clamp(1rem, 1.6vw, 1.375rem)",
    lineHeight: "1",
    weight: weight.extrabold,
    tracking: "0.04em",
    transform: "uppercase",
    width: 75,
  },
  title1: {
    family: family.display,
    size: "clamp(1.5rem, 2.6vw, 2.25rem)",
    lineHeight: "1.1",
    weight: weight.bold,
    tracking: "0.01em",
    transform: "none",
    width: 100,
  },
  title2: {
    family: family.display,
    size: "clamp(1.125rem, 1.8vw, 1.5rem)",
    lineHeight: "1.2",
    weight: weight.semibold,
    tracking: "0.005em",
    transform: "none",
    width: 100,
  },
  bodyLarge: {
    family: family.body,
    size: "clamp(1.0625rem, 1.3vw, 1.3125rem)",
    lineHeight: "1.5",
    weight: weight.regular,
    tracking: "0",
    transform: "none",
    width: 100,
  },
  body: {
    family: family.body,
    size: "1.0625rem",
    lineHeight: "1.55",
    weight: weight.regular,
    tracking: "0",
    transform: "none",
    width: 100,
  },
  bodySmall: {
    family: family.body,
    size: "0.9375rem",
    lineHeight: "1.5",
    weight: weight.regular,
    tracking: "0",
    transform: "none",
    width: 100,
  },
  /**
   * Metadata: roles, years, coordinates, ワイルド, © 2026.
   * Switzer in tracked caps rather than a third family — the tracking does the
   * work a monospace would, without another font file on the wire.
   */
  label: {
    family: family.body,
    size: "0.6875rem",
    lineHeight: "1.3",
    weight: weight.medium,
    tracking: "0.14em",
    transform: "uppercase",
    width: 100,
  },
} as const;

export type TypeStep = keyof typeof scale;
