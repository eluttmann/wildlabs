/**
 * Wild Labs is monochrome by rule, not by restraint.
 *
 * The brief: black and white chrome so the captured world is the only colour on
 * screen. That is a constraint the token layer enforces — there is no brand hue
 * here, and adding one is a brand decision, not a styling one.
 *
 * The ramp is OKLCH with zero chroma so every step is perceptually even. A hex
 * ramp drifts: the midtones read warm against the ends. Under glass, where two
 * neutrals sit a few percent apart and get blurred together, that drift shows.
 */

/** Perceptually even neutral ramp. `000` is white, `1000` is black. */
export const ink = {
  "000": "oklch(1 0 0)",
  "050": "oklch(0.972 0 0)",
  "100": "oklch(0.936 0 0)",
  "200": "oklch(0.867 0 0)",
  "300": "oklch(0.757 0 0)",
  "400": "oklch(0.646 0 0)",
  "500": "oklch(0.537 0 0)",
  "600": "oklch(0.437 0 0)",
  "700": "oklch(0.336 0 0)",
  "800": "oklch(0.236 0 0)",
  "900": "oklch(0.152 0 0)",
  "950": "oklch(0.094 0 0)",
  "1000": "oklch(0 0 0)",
} as const;

export type InkStep = keyof typeof ink;

/**
 * Semantic roles. Components reference these, never the ramp directly — that is
 * what lets the whole system invert for dark mode by swapping one block.
 */
export const semantic = {
  light: {
    /** Page ground. The stage renders behind this when a canvas is mounted. */
    surface: ink["000"],
    /** Raised opaque surfaces — used only where glass is unavailable. */
    surfaceRaised: ink["050"],
    /** Primary reading colour. */
    text: ink["950"],
    /** Secondary copy, captions, supporting detail. */
    textMuted: ink["600"],
    /** Metadata, labels, timestamps. Fails AA on purpose at small sizes — only for tracked caps at 11px+ where it clears. */
    textSubtle: ink["500"],
    /** Hairline rules and dividers. */
    line: "oklch(0 0 0 / 0.12)",
    /** Interactive hairline — hover and focus states. */
    lineStrong: "oklch(0 0 0 / 0.24)",
    /** Focus ring. Monochrome by design; contrast carries it, not hue. */
    focus: ink["950"],
    /** Scrim behind modals, before glass blur is applied. */
    scrim: "oklch(0 0 0 / 0.32)",
  },
  dark: {
    surface: ink["950"],
    surfaceRaised: ink["900"],
    text: ink["050"],
    textMuted: ink["400"],
    textSubtle: ink["500"],
    line: "oklch(1 0 0 / 0.14)",
    lineStrong: "oklch(1 0 0 / 0.28)",
    focus: ink["000"],
    scrim: "oklch(0 0 0 / 0.56)",
  },
} as const;

export type SemanticRole = keyof typeof semantic.light;
