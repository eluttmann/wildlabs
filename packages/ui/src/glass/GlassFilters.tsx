/**
 * SVG displacement filters backing the glass lens.
 *
 * Mount once, near the top of the tree. The filters are referenced by
 * `backdrop-filter: url(#wl-refract-*)` from glass.css, so they must exist in
 * the document for the lens layer to resolve — but the glass is designed to
 * look correct without them, and Firefox will never resolve them at all.
 *
 * How it works: fractal noise becomes a displacement map, and each pixel of the
 * backdrop is offset by the map's red channel horizontally and green channel
 * vertically. Blurring the noise first is what turns it from grain into broad,
 * smooth lensing — without that step it reads as television static.
 */
export function GlassFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {(
          [
            ["wl-refract-sheer", 10.8],
            ["wl-refract-panel", 18],
            ["wl-refract-scrim", 25.2],
          ] as const
        ).map(([id, scale]) => (
          <filter key={id} id={id} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves={2}
              seed={4}
              result="noise"
            />
            {/* Turns grain into lensing. Without it the effect reads as static. */}
            <feGaussianBlur in="noise" stdDeviation="2.4" result="softNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softNoise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
