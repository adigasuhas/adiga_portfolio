import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import { ResourceGrid } from "@/components/site/resource-grid";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources"
};

export default async function ResourcesPage() {
  const data = await getSiteData();

  return (
    <main className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Title + intro side by side — same pattern as Research Interests */}
        <FadeIn>
          <div className="grid gap-8 pb-12 pt-10 sm:pt-14 sm:pb-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:items-start">
            <h1 className="text-display-l text-[var(--fg)]">
              Curated Tools and Learning Material
            </h1>
            {data.resourcesIntro && (
              <p className="text-[1.0625rem] text-[var(--fg-2)] leading-[1.85]">
                {data.resourcesIntro}
              </p>
            )}
          </div>
        </FadeIn>

        <section className="border-t border-[var(--border)] py-12">
          <ResourceGrid resources={data.resources} />
        </section>

      </div>
    </main>
  );
}
