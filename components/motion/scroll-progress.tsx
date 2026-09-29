"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

/** Hairline reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent-light)] to-[var(--accent-2-light)]"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
