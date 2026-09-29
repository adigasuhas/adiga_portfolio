"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * `prefers-reduced-motion`, but always `false` on the server and on the first
 * client render. Reading the media query during hydration makes the client
 * render differ from the server HTML (a hydration mismatch); this defers it
 * until after mount, when it can safely switch transitions off.
 */
export function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && Boolean(prefersReduced);
}

/** Transition for reduced motion: movement is instant, opacity still eases. */
export const REDUCED_TRANSITION = { default: { duration: 0 }, opacity: { duration: 0.2 } } as const;
