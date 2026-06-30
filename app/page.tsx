import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { AcademicTimeline } from "@/components/site/academic-timeline";
import { MarkdownText } from "@/components/site/markdown-text";
import { Card, CardBody } from "@/components/ui/card";
import { getSiteData } from "@/lib/content";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <main className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* ── About ────────────────────────────────────────────────────── */}
        <section className="grid gap-10 pt-6 pb-12 sm:pt-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.7fr)] lg:items-start lg:gap-14 lg:pb-14 lg:pt-12">
          <FadeIn className="space-y-7">
            {/* Section heading — display font, same style as Research Interests */}
            <h1 className="text-display-xl text-[var(--fg)]">About</h1>

            {/* Full biography from about.json, rendered as markdown with links */}
            <MarkdownText
              className="max-w-2xl space-y-5"
              paragraphClassName="text-[1.0625rem] text-[var(--fg-2)] leading-[1.85]"
              text={data.about.biography}
            />

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl",
                  "bg-[var(--fg)] px-5 py-3 text-sm font-semibold text-[var(--bg-1)]",
                  "transition-all duration-150 hover:opacity-90 active:scale-[0.98]",
                  "focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
                )}
                href="/research"
              >
                Explore Research
                <ArrowRight className="size-4" />
              </Link>
              {data.about.cvUrl && (
                <a
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl",
                    "border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--fg-2)]",
                    "transition-all duration-150 hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                  )}
                  href={data.about.cvUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Curriculum Vitae
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </FadeIn>

          {/* Portrait */}
          {data.about.portrait && (
            <FadeIn delay={0.12}>
              <div className="media-container mx-auto w-full max-w-[14rem] sm:max-w-none overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image
                    alt={data.about.name}
                    className="h-full w-full object-cover object-top"
                    fill
                    priority
                    sizes="(max-width: 1024px) 14rem, 22rem"
                    src={data.about.portrait}
                  />
                </div>
              </div>
            </FadeIn>
          )}
        </section>

        {/* ── Academic Trajectory ──────────────────────────────────────── */}
        <section className="border-t border-[var(--border)]">
          <AcademicTimeline entries={data.timeline} />
        </section>

        {/* ── Open to Collaborations ────────────────────────────────────── */}
        <FadeIn>
          <section className="border-t border-[var(--border)] py-8 sm:py-10">
            <Card variant="elevated" className="text-center">
              <CardBody className="py-10 space-y-5 max-w-lg mx-auto">
                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--fg)]">
                  Let&apos;s Build Something
                </h2>
                <p className="text-[var(--fg-2)] leading-7">
                  I&apos;m always interested in discussing research ideas, potential collaborations, and opportunities at the intersection of AI and materials science.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl",
                      "bg-[var(--fg)] px-6 py-3 text-sm font-semibold text-[var(--bg-1)]",
                      "transition-all hover:opacity-90"
                    )}
                    href="/contact"
                  >
                    Get in Touch
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl",
                      "border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--fg-2)]",
                      "transition-all hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                    )}
                    href="/publications"
                  >
                    Read My Work
                  </Link>
                </div>
              </CardBody>
            </Card>
          </section>
        </FadeIn>

      </div>
    </main>
  );
}
