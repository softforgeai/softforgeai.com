"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle fade-and-rise as content scrolls into view.
 * `reducedMotion="user"` drops the movement for visitors who prefer reduced
 * motion; a <noscript> rule in the root layout keeps content visible without JS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <MotionConfig reducedMotion="user">
      <Component
        data-reveal
        className={className}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {children}
      </Component>
    </MotionConfig>
  );
}
