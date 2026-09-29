import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { AcademicTimeline } from "@/components/site/academic-timeline";
import { MarkdownText } from "@/components/site/markdown-text";
import { SectionHeading } from "@/components/site/page-header";
import { ParallaxPortrait } from "@/components/site/parallax-portrait";
import { SocialIcon } from "@/components/site/social-icon";
import { arrowNudge, arrowSlide, buttonClass } from "@/components/ui/link-button";
import { getSiteData } from "@/lib/content";

export default async function HomePage() {
  const data = await getSiteData();
  const { about } = data;

  return (
    <main className="shell">
      {/* ── About (hero) ─────────────────────────────────────────────────── */}
      <section className="grid gap-10 pb-12 pt-8 sm:gap-14 sm:pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:items-start lg:gap-20 lg:pt-20">
        {about.portrait && (
          <FadeIn className="order-first w-[13.5rem] sm:w-[17rem] lg:order-last lg:mt-4 lg:w-full" delay={0.15} y={24}>
            <ParallaxPortrait alt={about.name} src={about.portrait} />
          </FadeIn>
        )}

        <div className="min-w-0">
          <FadeIn>
            <p className="eyebrow eyebrow-rule">About</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1 className="text-display-xl mt-6 text-[var(--fg)]">{about.name}</h1>
          </FadeIn>

          <FadeIn delay={0.12}>
            <MarkdownText
              className="mt-8 max-w-[40rem] space-y-6 sm:mt-10"
                            paragraphClassName="text-body"
              text={about.biography}
            />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Link className={buttonClass("primary")} href="/research">
                Explore Research
                <ArrowRight className={arrowSlide} />
              </Link>
              {about.cvUrl && (
                <a className={buttonClass("secondary")} href={about.cvUrl} rel="noreferrer" target="_blank">
                  Curriculum Vitae
                  <ArrowUpRight className={arrowNudge} />
                </a>
              )}
            </div>
          </FadeIn>

          {about.links.length > 0 && (
            <FadeIn delay={0.26}>
              <ul className="mt-8 flex flex-wrap items-center gap-2">
                {about.links.map((link) => (
                  <li key={link.url}>
                    <a
                      aria-label={link.label}
                      className="group flex size-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-2)] hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:text-[var(--accent-light)]"
                      href={link.url}
                      rel="noreferrer"
                      target="_blank"
                      title={link.label}
                    >
                      <SocialIcon label={link.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Academic Trajectory ──────────────────────────────────────────── */}
      <section aria-labelledby="trajectory" className="py-16 sm:py-24">
        <div className="hairline mb-16 sm:mb-24" />
        <SectionHeading id="trajectory" title="Academic Trajectory" />
        <AcademicTimeline entries={data.timeline} />
      </section>

      {/* ── Open to Collaborations ───────────────────────────────────────── */}
      <section className="py-10 sm:py-16">
        <FadeIn>
          <div className="spotlight relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-3)] px-6 py-14 text-center shadow-[var(--shadow)] sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[var(--accent)]/15 blur-3xl"
            />

            <div className="relative mx-auto max-w-xl space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">Let&apos;s Build Something</h2>
              <p className="leading-7 text-[var(--fg-2)]">
                I&apos;m always interested in discussing research ideas, potential collaborations, and opportunities at the intersection of AI and materials science.
              </p>
              <div className="flex flex-col justify-center gap-3 pt-2 min-[420px]:flex-row min-[420px]:flex-wrap">
                <Link className={buttonClass("primary")} href="/contact">
                  Get in Touch
                  <ArrowRight className={arrowSlide} />
                </Link>
                <Link className={buttonClass("secondary")} href="/publications">
                  Read My Work
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
