"use client";

import { motion } from "framer-motion";
import { REDUCED_TRANSITION, useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

/** Re-mounts on every navigation, giving each page a soft entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotionSafe();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? REDUCED_TRANSITION : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
