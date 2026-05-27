import { FadeIn } from "@/components/motion/fade-in";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PublicationList } from "@/components/site/publication-list";
import { SiteFooter } from "@/components/site/site-footer";
import { getHomePageData } from "@/lib/content";

export default async function PublicationsAndConferencesPage() {
  const data = await getHomePageData();

  return (
    <main className="px-4 pb-12 sm:px-6 lg:px-10 pt-2 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <section className="space-y-6 pt-4 sm:pt-6">
          <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
            Publications
          </h2>
          <PublicationList items={data.scholarship.publications} />
        </section>

        <section className="space-y-6 border-t border-[var(--border)] py-10 sm:py-14 mt-10">
          <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
            Conferences
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {data.scholarship.conferences.map((conference, index) => (
              <FadeIn
                className="rounded-[1.6rem] border border-[var(--border)] bg-[color:var(--background-elevated)] px-5 py-5 text-[1rem] leading-8 text-[var(--muted-foreground)] shadow-[var(--shadow)]"
                delay={index * 0.04}
                key={conference}
              >
                {conference}
              </FadeIn>
            ))}
          </div>
        </section>

        {data.scholarship.gallery.length > 0 ? (
          <section className="space-y-6 border-t border-[var(--border)] py-10 sm:py-14 mt-10">
            <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
              Gallery
            </h2>
            <GalleryGrid className="gap-5" items={data.scholarship.gallery} />
          </section>
        ) : null}

        <SiteFooter links={data.contact.links} />
      </div>
    </main>
  );
}
