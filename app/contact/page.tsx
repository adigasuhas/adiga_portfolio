import { FadeIn } from "@/components/motion/fade-in";
import { ContactPanel } from "@/components/site/contact-panel";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { SiteFooter } from "@/components/site/site-footer";
import { getHomePageData } from "@/lib/content";

export default async function ContactPage() {
  const data = await getHomePageData();

  return (
    <main className="px-4 pb-12 sm:px-6 lg:px-10 pt-2 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <section className="space-y-8 pt-4 sm:pt-6 pb-10 sm:pb-14">
          <FadeIn>
            <ContactPanel
              biography={data.contact.biography}
              details={data.contact.details}
              emails={data.profile.emails}
              links={data.contact.links}
            />
          </FadeIn>
          {data.contact.photography.length > 0 ? (
            <FadeIn>
              <GalleryGrid className="gap-5 lg:grid-cols-4" items={data.contact.photography} />
            </FadeIn>
          ) : null}
        </section>
        <SiteFooter links={data.contact.links} />
      </div>
    </main>
  );
}

