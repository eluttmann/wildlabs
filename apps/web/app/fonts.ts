import { Archivo } from "next/font/google";
import localFont from "next/font/local";

/**
 * Archivo — headings. SIL Open Font License.
 *
 * Chosen against Switzer rather than alongside it. Switzer is Helvetica-lineage
 * (warm, open apertures); Archivo descends from American gothic (squared, tight
 * apertures, flat-cut terminals). Indistinguishable in a paragraph, obviously
 * different in tracked caps at display size — which is exactly where the
 * contrast should live.
 *
 * The `wdth` axis (62–125) is why it earns the slot: one variable file gives a
 * compressed wordmark and an expanded display line, so a monochrome brand gets
 * editorial range without adding colour, ornament, or a third family.
 *
 * next/font downloads and self-hosts at build time — no runtime request to
 * Google, and no layout shift.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  weight: "variable",
  display: "swap",
  variable: "--font-archivo",
});

/**
 * Switzer — body. Indian Type Foundry Free Font License (see fonts/SWITZER-LICENSE.txt).
 * Not on Google Fonts, so the variable file is vendored directly.
 */
export const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/Switzer-VariableItalic.woff2", weight: "100 900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-switzer",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
