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
        <FadeIn delay={i * 0.06} key={award.id}>
          <article className="group relative flex h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-3)] p-5 transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-4)] hover:shadow-[var(--shadow-lg)]">
            {/* Left accent stripe */}
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-[var(--accent-2)] to-[var(--accent)] opacity-50" />

            <div className="flex items-start gap-5 pl-4 w-full">
              {/* Logo */}
              <div className="flex h-[5.5rem] w-[5.5rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-3 shadow-[var(--shadow-sm)]">
                {award.logo ? (
                  <Image
                    alt={award.organization}
                    className="h-full w-full object-contain"
                    height={80}
                    src={award.logo}
                    width={80}
                  />
                ) : (
                  <AwardIcon className="size-9 text-[var(--fg-3)]" strokeWidth={1.5} />
                )}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1 space-y-2">
                {/* Year chip */}
                <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--bg-5)] px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.65rem] font-medium tracking-wider text-[var(--fg-3)]">
                  {award.month} {award.year}
                </span>

                <h3 className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold leading-snug text-[var(--fg)]">
                  {award.title}
                </h3>

                <p className="text-[0.875rem] font-medium text-[var(--accent-2-light)]">
                  {award.organization}
                </p>

                {award.description && (
                  <p className="text-[0.8125rem] leading-6 text-[var(--fg-3)]">
                    {award.description}
                  </p>
                )}
              </div>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  );
}
