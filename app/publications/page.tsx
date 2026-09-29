import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import { AwardsList } from "@/components/site/awards-list";
import { ConferenceGallery } from "@/components/site/conference-gallery";
import { PublicationList } from "@/components/site/publication-list";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications"
};

export default async function PublicationsPage() {
  const data = await getSiteData();

  return (
    <main className="shell">
      {/* Page header */}
      <FadeIn>
        <div className="pb-12 pt-12 sm:pb-14 sm:pt-16">
          <h1 className="text-display-xl text-[var(--fg)]">Publications</h1>
        </div>
      </FadeIn>

      {/* Publication list with filter tabs */}
      <section className="border-t border-[var(--border)] py-12 sm:py-14" id="publications">
        <PublicationList publications={data.publications} theses={data.theses} />
      </section>

      {/* Awards */}
      <section className="border-t border-[var(--border)] py-12 sm:py-16" id="awards">
        <FadeIn>
          <h2 className="text-display-xl mb-10 text-[var(--fg)]">Awards</h2>
        </FadeIn>
        <AwardsList awards={data.awards} />
      </section>

      {/* Conferences */}
      <section className="border-t border-[var(--border)] py-12 sm:py-16" id="conferences">
        <FadeIn>
          <h2 className="text-display-xl mb-10 text-[var(--fg)]">Conferences</h2>
        </FadeIn>
        <ConferenceGallery conferences={data.conferences} />
      </section>
    </main>
  );
}
