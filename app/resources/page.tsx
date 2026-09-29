import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { ResourceGrid } from "@/components/site/resource-grid";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources"
};

export default async function ResourcesPage() {
  const data = await getSiteData();

  return (
    <main className="shell">
      <PageHeader eyebrow="Resources" title="Curated Tools and Learning Material" titleClassName="text-display-l">
        {data.resourcesIntro && <p className="text-lead max-w-2xl">{data.resourcesIntro}</p>}
      </PageHeader>

      <div className="hairline mb-12 sm:mb-16" />

      <ResourceGrid resources={data.resources} />
    </main>
  );
}
