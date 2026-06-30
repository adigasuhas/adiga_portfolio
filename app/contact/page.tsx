import type { Metadata } from "next";

import { FadeIn } from "@/components/motion/fade-in";
import { ContactPanel } from "@/components/site/contact-panel";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact"
};

export default async function ContactPage() {
  const data = await getSiteData();

  return (
    <main className="px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        <FadeIn>
          <div className="pb-12 pt-10 sm:pt-14 sm:pb-14">
            <h1 className="text-display-xl text-[var(--fg)]">
              Let&apos;s Talk.
            </h1>
          </div>
        </FadeIn>

        <section className="border-t border-[var(--border)] py-12">
          <ContactPanel
            address={data.contact.address}
            biography={data.contact.biography}
            emails={data.about.emails}
            links={data.about.links}
            photography={data.contact.photography}
          />
        </section>

      </div>
    </main>
  );
}
