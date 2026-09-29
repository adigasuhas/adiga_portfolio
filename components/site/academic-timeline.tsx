"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { TimelineEntry } from "@/lib/content";
import { cn } from "@/lib/utils";
import { REDUCED_TRANSITION, useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

type AcademicTimelineProps = {
  entries: TimelineEntry[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

function UpcomingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
      <span className="relative flex size-1.5">
        <span className="ping-soft absolute inset-0 rounded-full bg-white" />
        <span className="relative size-1.5 rounded-full bg-white" />
      </span>
      upcoming
    </span>
  );
}

function Logo({ entry, className }: { entry: TimelineEntry; className?: string }) {
  return (
    <div
      className={cn(
        "relative z-10 flex shrink-0 items-center justify-center rounded-2xl border bg-white p-2.5 shadow-[var(--shadow)]",
        "transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lg)]",
        entry.upcoming ? "border-[var(--accent)] shadow-[0_0_0_2px_var(--accent-dim)]" : "border-[var(--border)]",
        className
      )}
    >
      <Image
        alt={entry.institution}
        className="h-full w-full object-contain"
        height={96}
        src={entry.logo}
        width={96}
      />
    </div>
  );
}

export function AcademicTimeline({ entries }: AcademicTimelineProps) {
  const reduceMotion = useReducedMotionSafe();

  const lineInitial = reduceMotion ? false : { scaleX: 0 };
  const lineInitialY = reduceMotion ? false : { scaleY: 0 };

  return (
    <>
      {/* Desktop / tablet: horizontal rail */}
      <ol className="relative hidden md:grid" style={{ gridTemplateColumns: `repeat(${entries.length}, minmax(0, 1fr))` }}>
        <motion.span
          aria-hidden="true"
          className="absolute left-[calc(50%/var(--n))] right-[calc(50%/var(--n))] top-12 h-px origin-left bg-gradient-to-r from-[var(--border-strong)] via-[var(--fg-3)] to-[var(--accent)]"
          initial={lineInitial}
          style={{ ["--n" as string]: entries.length }}
          transition={reduceMotion ? REDUCED_TRANSITION : { duration: 1.4, ease: EASE }}
          viewport={{ once: true, amount: 0.6 }}
          whileInView={{ scaleX: 1 }}
        />
        {entries.map((entry, i) => (
          <motion.li
            className="group flex flex-col items-center px-3 text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            key={entry.id}
            transition={reduceMotion ? REDUCED_TRANSITION : { duration: 0.7, delay: 0.25 + i * 0.18, ease: EASE }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Logo className="size-24" entry={entry} />
            <div className="mt-7 flex min-h-6 items-center">{entry.upcoming && <UpcomingBadge />}</div>
            <p className="mt-3 font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-[var(--fg)]">
              {entry.institution}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-[var(--fg-2)]">{entry.degree}</p>
            <p className="eyebrow mt-2 tabular-nums">{entry.years}</p>
          </motion.li>
        ))}
      </ol>

      {/* Phones: vertical rail */}
      <ol className="relative md:hidden">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-10 left-8 top-10 w-px origin-top bg-gradient-to-b from-[var(--border-strong)] via-[var(--fg-3)] to-[var(--accent)]"
          initial={lineInitialY}
          transition={reduceMotion ? REDUCED_TRANSITION : { duration: 1.2, ease: EASE }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ scaleY: 1 }}
        />
        {entries.map((entry, i) => (
          <motion.li
            className="group relative flex items-center gap-5 py-4"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            key={entry.id}
            transition={reduceMotion ? REDUCED_TRANSITION : { duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
            viewport={{ once: true, amount: 0.5 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Logo className="size-16" entry={entry} />
            <div className="min-w-0 space-y-1">
              {entry.upcoming && <UpcomingBadge />}
              <p className="font-[family-name:var(--font-display)] font-semibold leading-snug text-[var(--fg)]">
                {entry.institution}
              </p>
              <p className="text-sm text-[var(--fg-2)]">{entry.degree}</p>
              <p className="eyebrow tabular-nums">{entry.years}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </>
  );
}
