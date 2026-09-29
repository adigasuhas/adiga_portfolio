"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { REDUCED_TRANSITION, useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px before the element settles. */
  y?: number;
  as?: "div" | "li" | "section";
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeIn({ children, className, delay = 0, y = 18, as = "div" }: FadeInProps) {
  const reduceMotion = useReducedMotionSafe();
  const Tag = motion[as];

  // Always keep a target state: the server renders `initial` (opacity 0)
  // before we know the user's motion preference, so the element must still
  // be animated back to visible — just without travel when motion is reduced.
  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={reduceMotion ? REDUCED_TRANSITION : { duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
