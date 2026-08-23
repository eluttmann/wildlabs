"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease } from "@wildlabs/tokens";

const SECONDS = 1000;

export interface RevealProps {
  children?: ReactNode;
  /** Seconds of delay. Prefer <Stagger> over hand-tuning these across siblings. */
  delay?: number;
  /** Travel distance in px. Kept small — big translations read as slideshow. */
  distance?: number;
  className?: string;
  /** Fire once on enter (default) or every time it re-enters the viewport. */
  once?: boolean;
}

/**
 * The standard entrance.
 *
 * Everything that appears on scroll uses this, at the shared duration and the
 * shared expo-out curve, so the whole site settles with one motion signature.
 * A component that animates on its own numbers is the thing that breaks the
 * illusion of a single physics system.
 *
 * Under reduced motion this crossfades in place — no translation. Removing the
 * animation entirely would snap elements in, which is worse than what it
 * replaces.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 16,
  className,
  once = true,
}: RevealProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: (shouldReduce ? 120 : duration.base) / SECONDS,
        ease: [...ease.out],
        delay: shouldReduce ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

/**
 * Stagger a list without hand-assigning delays.
 *
 * Delays computed from an index couple every item to its position — reorder the
 * list and the rhythm breaks. Orchestration belongs to the container.
 */
export function Stagger({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 14,
}: {
  children?: ReactNode;
  className?: string;
  distance?: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: shouldReduce ? 0 : distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: (shouldReduce ? 120 : duration.base) / SECONDS,
            ease: [...ease.out],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
