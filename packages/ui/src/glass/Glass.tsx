import type { ElementType, ReactNode } from "react";
import type { GlassTier } from "@wildlabs/tokens";
import { cn } from "../lib/cn";
import type { PolymorphicProps } from "../lib/polymorphic";

export interface GlassOwnProps {
  /**
   * sheer — persistent chrome over content (nav, floating labels)
   * panel — content-bearing surfaces (chat, cards, the CV sheet)
   * scrim — modals and drawers, where glass separates rather than reveals
   */
  tier?: GlassTier;
  /** Hover lift and pointer affordance. Pair with a real button or link element. */
  interactive?: boolean;
  /**
   * Boundary refraction. On by default; worth disabling for surfaces that
   * scroll large amounts of content, where the extra filter pass costs more
   * than the effect returns.
   */
  refract?: boolean;
  className?: string;
  children?: ReactNode;
}

export type GlassProps<T extends ElementType = "div"> = PolymorphicProps<T, GlassOwnProps>;

/**
 * The only way to make glass in Wild Labs.
 *
 * Hand-rolling backdrop-filter per component is how a system drifts: one
 * surface gets a rim, another does not, a third picks a blur 4px off, and the
 * set stops reading as one material. Every tier and every fallback lives here.
 *
 * Glass needs something behind it. On a flat ground it is nearly invisible —
 * which is why the app mounts a persistent canvas rather than treating the 3D
 * layer as a per-page feature.
 */
export function Glass<T extends ElementType = "div">({
  tier = "panel",
  interactive = false,
  refract = true,
  as,
  className,
  children,
  ...rest
}: GlassProps<T>) {
  /*
   * Cast through a minimal function-component shape.
   *
   * `ElementType` is a union of every valid JSX tag, and @react-three/fiber
   * augments that union globally with the whole three.js element set. TypeScript
   * intersects the union's prop types when resolving JSX, and because many of
   * those elements declare children as never, the intersection collapses to
   * never — so a perfectly valid <Component>{children}</Component> fails to
   * compile in any app that imports R3F.
   *
   * Caller props are already fully checked by the polymorphic props type above;
   * this cast only governs how the element is applied, which React resolves at
   * runtime regardless.
   */
  const Component = (as ?? "div") as unknown as (
    props: Record<string, unknown>,
  ) => ReactNode;

  return (
    <Component
      className={cn("wl-glass", className)}
      data-tier={tier}
      data-interactive={interactive || undefined}
      data-refract={refract || undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}
