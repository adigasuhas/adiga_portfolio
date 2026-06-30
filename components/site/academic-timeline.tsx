import Image from "next/image";

import { FadeIn } from "@/components/motion/fade-in";
import type { TimelineEntry } from "@/lib/content";
import { cn } from "@/lib/utils";

type AcademicTimelineProps = {
  entries: TimelineEntry[];
};

export function AcademicTimeline({ entries }: AcademicTimelineProps) {
  return (
    <section className="py-20 sm:py-28">
      <FadeIn>
        <h2 className="text-display-l text-[var(--fg)] mb-12">Academic Trajectory</h2>
      </FadeIn>

      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <FadeIn delay={0.1}>
          <div className="relative">
            {/* Connecting line */}
            <div
              aria-hidden="true"
              className="absolute top-[3.25rem] h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--fg-3)] to-transparent"
              style={{ width: "96%", left: "2%" }}
            />

            <div className="flex items-start justify-between gap-6 lg:gap-10" style={{ width: "96%", margin: "0 auto" }}>
              {entries.map((entry) => (
                <div
                  className="flex flex-1 flex-col items-center text-center"
                  key={entry.id}
                >
                  {/* Logo dot */}
                  <div
                    className={cn(
                      "relative z-10 mb-6 flex h-[6.5rem] w-[6.5rem] items-center justify-center",
                      "rounded-2xl border bg-white p-3",
                      entry.upcoming
                        ? "border-[var(--accent)] shadow-[0_0_0_2px_var(--accent-dim)]"
                        : "border-[var(--border)]"
                    )}
                  >
                    <Image
                      alt={entry.institution}
                      className="h-full w-full object-contain"
                      height={80}
                      src={entry.logo}
                      width={80}
                    />
                    {entry.upcoming && (
                      <span className="absolute -top-2 -right-2 rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-wide text-white uppercase">
                        upcoming
                      </span>
                    )}
                  </div>

                  {/* Dot on line */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "mb-5 h-2 w-2 rounded-full",
                      entry.upcoming
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--fg-3)]"
                    )}
                  />

                  {/* Content */}
                  <div className="px-2 space-y-1 max-w-[13rem]">
                    <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--fg)] leading-snug">
                      {entry.institution}
                    </p>
                    <p className="text-[0.8125rem] text-[var(--fg-2)] leading-snug">{entry.degree}</p>
                    <p className="eyebrow text-[0.625rem] mt-1">{entry.years}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden space-y-0">
        {entries.map((entry, index) => (
          <FadeIn delay={index * 0.08} key={entry.id}>
            <div className="relative flex items-start gap-5 pb-12 last:pb-0">
              {/* Vertical connector */}
              {index < entries.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-[2.3125rem] top-[5rem] bottom-2 w-[2px] rounded-full bg-gradient-to-b from-[var(--fg-3)] to-[var(--border)]"
                />
              )}

              {/* Logo */}
              <div
                className={cn(
                  "relative z-10 shrink-0 flex h-[4.75rem] w-[4.75rem] items-center justify-center",
                  "rounded-xl border bg-white p-2",
                  entry.upcoming
                    ? "border-[var(--accent)] shadow-[0_0_0_2px_var(--accent-dim)]"
                    : "border-[var(--border)]"
                )}
              >
                <Image
                  alt={entry.institution}
                  className="h-full w-full object-contain"
                  height={56}
                  src={entry.logo}
                  width={56}
                />
              </div>

              {/* Text */}
              <div className="pt-1 space-y-1">
                {entry.upcoming && (
                  <span className="inline-block rounded-full bg-[var(--accent)] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-white">
                    upcoming
                  </span>
                )}
                <p className="font-[family-name:var(--font-display)] font-semibold text-[var(--fg)] leading-snug">
                  {entry.institution}
                </p>
                <p className="text-sm text-[var(--fg-2)]">{entry.degree}</p>
                <p className="eyebrow text-[0.6875rem]">{entry.years}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
