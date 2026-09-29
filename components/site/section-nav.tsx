"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

type SectionNavProps = {
  sections: { id: string; label: string }[];
  className?: string;
};

/**
 * Sticky in-page navigation with scroll-spy. Sits just under the site header
 * and scrolls horizontally on narrow screens instead of wrapping.
 */
export function SectionNav({ sections, className }: SectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id);
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      className={cn("sticky top-[calc(var(--header-h)+0.25rem)] z-30 -mx-1 lg:top-[calc(var(--header-h)+0.5rem)]", className)}
    >
      <div className="no-scrollbar overflow-x-auto px-1 py-1">
        <ul className="inline-flex gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-2)]/80 p-1 shadow-[var(--shadow)] backdrop-blur-xl">
          {sections.map((section) => {
            const selected = active === section.id;
            return (
              <li key={section.id}>
                <a
                  aria-current={selected ? "location" : undefined}
                  className={cn(
                    "relative isolate inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full px-3 text-[0.8125rem] font-medium sm:px-4 sm:text-sm",
                    selected ? "text-[var(--fg)]" : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                  )}
                  href={`#${section.id}`}
                  onClick={() => setActive(section.id)}
                >
                  {selected && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-5)]"
                      layoutId="section-nav"
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
