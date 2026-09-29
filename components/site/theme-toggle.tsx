"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--bg-3)]/60 text-[var(--fg-2)] hover:bg-[var(--bg-5)] hover:text-[var(--fg)]"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          key={isDark ? "sun" : "moon"}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <SunMedium className="size-[1.1rem]" /> : <Moon className="size-[1.1rem]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
