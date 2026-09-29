import type { Metadata } from "next";

import { PageHeader, SectionHeading } from "@/components/site/page-header";
import { ResearchGrid } from "@/components/site/research-grid";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research"
};

export default async function ResearchPage() {
  const data = await getSiteData();
  const paragraphs = data.researchInterest.prose.split("\n\n").filter((p) => p.trim());

  return (
    <main className="shell">
      <PageHeader eyebrow="Research" title={<>Research<br />Interests</>}>
        <div className="max-w-2xl space-y-6">
          {paragraphs.map((para, i) => (
            <p className="text-body" key={i}>
              {para}
            </p>
          ))}
        </div>
      </PageHeader>

      <section aria-labelledby="projects" className="pb-8 pt-4 sm:pt-8">
        <div className="hairline mb-16 sm:mb-24" />
        <SectionHeading
          description={data.researchInterest.projectsIntro}
          id="projects"
          title="Projects"
          titleClassName="text-display-xl"
        />
        <ResearchGrid projects={data.projects} />
      </section>
    </main>
  );
}
