/**
 * Apple Glass, three tiers.
 *
 * Glass has a hard dependency that is easy to miss until the page is built:
 * it is invisible on a flat ground. Refraction, the specular rim, the sense of
 * depth — none of it reads unless something is moving behind it. That is why
 * Wild Labs mounts a persistent canvas: the glass needs a world to bend.
 *
 * Each tier is four effects stacked, and all four matter:
 *   1. blur + saturate  — the backdrop sample
 *   2. a translucent tint  — gives the pane a body
 *   3. a specular rim  — the lit top edge that makes it read as a solid object
 *   4. displacement  — the actual lensing at the boundary (see `refraction`)
 *
 * Drop any one and it degrades to "frosted div". The rim is the one people skip
 * and it is the one doing the most work.
 */

export const glass = {
  /**
   * Chrome that sits over content permanently — nav, floating labels.
   * Lightest blur so what is behind stays legible through it.
   */
  sheer: {
    blur: 20,
    saturate: 180,
    tintLight: "oklch(1 0 0 / 0.55)",
    tintDark: "oklch(0.15 0 0 / 0.5)",
    rimLight: "oklch(1 0 0 / 0.7)",
    rimDark: "oklch(1 0 0 / 0.14)",
    borderLight: "oklch(1 0 0 / 0.5)",
    borderDark: "oklch(1 0 0 / 0.1)",
    shadow: "0 1px 2px oklch(0 0 0 / 0.04), 0 8px 24px oklch(0 0 0 / 0.06)",
    displacement: 0.6,
  },
  /**
   * Content-bearing panes — chat, project cards, CV sheet.
   * Enough blur that text on top clears contrast over a busy backdrop.
   */
  panel: {
    blur: 32,
    saturate: 160,
    tintLight: "oklch(1 0 0 / 0.72)",
    tintDark: "oklch(0.17 0 0 / 0.68)",
    rimLight: "oklch(1 0 0 / 0.85)",
    rimDark: "oklch(1 0 0 / 0.18)",
    borderLight: "oklch(1 0 0 / 0.6)",
    borderDark: "oklch(1 0 0 / 0.12)",
    shadow: "0 2px 6px oklch(0 0 0 / 0.05), 0 16px 48px oklch(0 0 0 / 0.1)",
    displacement: 1,
  },
  /**
   * Modal and drawer surfaces. Nearly opaque — at this tier glass is about
   * separation, not transparency.
   */
  scrim: {
    blur: 48,
    saturate: 140,
    tintLight: "oklch(1 0 0 / 0.86)",
    tintDark: "oklch(0.13 0 0 / 0.84)",
    rimLight: "oklch(1 0 0 / 0.9)",
    rimDark: "oklch(1 0 0 / 0.2)",
    borderLight: "oklch(1 0 0 / 0.68)",
    borderDark: "oklch(1 0 0 / 0.14)",
    shadow: "0 4px 12px oklch(0 0 0 / 0.08), 0 32px 80px oklch(0 0 0 / 0.16)",
    displacement: 1.4,
  },
} as const;

export type GlassTier = keyof typeof glass;

/**
 * Displacement-map filter parameters, consumed by <GlassFilters /> in
 * @wildlabs/ui. Chrome and Safari sample `backdrop-filter: url(#...)`
 * differently and Firefox ignores it entirely, so this is strictly an
 * enhancement layered on top of blur — never the thing carrying the effect.
 */
export const refraction = {
  /** Turbulence frequency. Low = broad lensing; high = frosted noise. */
  baseFrequency: 0.008,
  octaves: 2,
  /** Multiplied by each tier's `displacement` to get the final scale. */
  scale: 18,
  seed: 4,
} as const;

/**
 * Opaque equivalents for `prefers-reduced-transparency`, and for the print
 * stylesheet where backdrop-filter means nothing.
 *
 * This is not a graceful degradation afterthought — some users get this path
 * every time, so it is a designed state with its own contrast budget.
 */
export const glassFallback = {
  light: { background: "oklch(0.985 0 0)", border: "oklch(0 0 0 / 0.14)" },
  dark: { background: "oklch(0.19 0 0)", border: "oklch(1 0 0 / 0.16)" },
} as const;
