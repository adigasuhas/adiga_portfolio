import { ResourceGrid } from "@/components/site/resource-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { getHomePageData } from "@/lib/content";

export default async function ResourcesPage() {
  const data = await getHomePageData();

  return (
    <main className="px-4 pb-12 sm:px-6 lg:px-10 pt-2 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <section className="pt-4 sm:pt-6 pb-10 sm:pb-14 space-y-6">
          <h1 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl lg:text-6xl mb-6">
            Resources
          </h1>
          <ResourceGrid logo={data.resources.logo} sections={data.resources.sections} />
        </section>
        <SiteFooter links={data.contact.links} />
      </div>
    </main>
  );
}
