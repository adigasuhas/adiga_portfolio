import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import { ResearchGrid } from "@/components/site/research-grid";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research"
};

export default async function ResearchPage() {
  const data = await getSiteData();

  return (
    <main className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Research Interests header */}
        <FadeIn>
          <div className="grid gap-8 pb-12 pt-12 sm:pt-16 sm:pb-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <h1 className="text-display-xl text-[var(--fg)]">
              Research<br />Interests
            </h1>
            <div className="max-w-2xl space-y-5">
              {data.researchInterest.prose.split("\n\n").map((para, i) => (
                <p
                  className="text-[1.0625rem] text-[var(--fg-2)] leading-[1.85]"
                  key={i}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Projects section */}
        <section className="border-t border-[var(--border)] py-12 sm:py-16">
          <FadeIn>
            <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:items-start">
              <h2 className="text-display-xl text-[var(--fg)]">Projects</h2>
              {data.researchInterest.projectsIntro && (
                <p className="text-[1.0625rem] text-[var(--fg-2)] leading-[1.85]">
                  {data.researchInterest.projectsIntro}
                </p>
              )}
            </div>
          </FadeIn>
          <ResearchGrid projects={data.projects} />
        </section>

      </div>
    </main>
  );
}
