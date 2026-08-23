import type { ElementType, ReactNode } from "react";
import type { TypeStep } from "@wildlabs/tokens";
import { cn } from "../lib/cn";
import type { PolymorphicProps } from "../lib/polymorphic";

export interface TextOwnProps {
  /** A step from the scale. Never a raw font-size. */
  step?: TypeStep;
  /** Semantic colour role. Default inherits the surface's text colour. */
  tone?: "default" | "muted" | "subtle";
  /** Clamp to the reading measure (~68 characters). Prose only. */
  measure?: boolean;
  className?: string;
  children?: ReactNode;
}

export type TextProps<T extends ElementType = "p"> = PolymorphicProps<T, TextOwnProps>;

/**
 * Every piece of type in Wild Labs goes through here.
 *
 * `step` and `as` are deliberately separate. The heading level is a document
 * structure decision and the visual size is a design decision; fusing them is
 * how pages end up with an `h4` at the top because it happened to look right.
 */
export function Text<T extends ElementType = "p">({
  step = "body",
  tone = "default",
  measure = false,
  as,
  className,
  children,
  ...rest
}: TextProps<T>) {
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
  const Component = (as ?? "p") as unknown as (
    props: Record<string, unknown>,
  ) => ReactNode;

  return (
    <Component
      className={cn("wl-type", className)}
      data-step={step}
      data-tone={tone === "default" ? undefined : tone}
      data-measure={measure || undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}
