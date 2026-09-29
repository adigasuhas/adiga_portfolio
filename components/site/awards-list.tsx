import Image from "next/image";
import { Award as AwardIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import type { Award } from "@/lib/content";

type AwardsListProps = {
  awards: Award[];
};

export function AwardsList({ awards }: AwardsListProps) {
  if (awards.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {awards.map((award, i) => (
        <FadeIn className="h-full" delay={i * 0.06} key={award.id}>
          <article className="card card-hover spotlight group relative flex h-full overflow-hidden p-5">
            {/* Left accent stripe — grows on hover */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-0 top-6 w-[3px] origin-center scale-y-75 rounded-full bg-gradient-to-b from-[var(--accent-2)] to-[var(--accent)] opacity-50 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-100"
            />

            <div className="flex w-full items-start gap-4 pl-4 sm:gap-5">
              {/* Logo */}
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-2.5 shadow-[var(--shadow-sm)] transition-transform duration-500 group-hover:-translate-y-0.5 sm:size-[5.5rem] sm:p-3">
                {award.logo ? (
                  <Image
                    alt={award.organization}
                    className="h-full w-full object-contain"
                    height={80}
                    src={award.logo}
                    width={80}
                  />
                ) : (
                  <AwardIcon className="size-9 text-neutral-400" strokeWidth={1.5} />
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1 space-y-2">
                <span className="chip font-[family-name:var(--font-mono)] text-[0.65rem] font-medium normal-case tracking-wider text-[var(--fg-3)]">
                  {award.month} {award.year}
                </span>

                <h3 className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold leading-snug text-[var(--fg)]">
                  {award.title}
                </h3>

                <p className="text-[0.875rem] font-medium text-[var(--accent-2-light)]">{award.organization}</p>

                {award.description && (
                  <p className="text-[0.8125rem] leading-6 text-[var(--fg-3)]">{award.description}</p>
                )}
              </div>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
