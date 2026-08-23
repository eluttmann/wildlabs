import type { ComponentPropsWithoutRef, ElementType } from "react";

/**
 * Props for a component that can render as any element.
 *
 * `Own` are the component's own props; everything else is inherited from
 * whatever `as` resolves to. This is what lets `<Glass as={Link} href="…">`
 * and `<Glass as="button" onClick={…}>` both typecheck — without it, callers
 * end up sprinkling `@ts-expect-error` over every non-div usage, which throws
 * away the type safety the props were supposed to provide.
 */
export type PolymorphicProps<T extends ElementType, Own> = Own & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof Own | "as">;
