import Image from "next/image";
import Link from "next/link";

import { RichText } from "@/components/mdx/rich-text";
import { FadeIn } from "@/components/motion/fade-in";
import { PageIntro } from "@/components/site/page-intro";
import { SiteFooter } from "@/components/site/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn, renderFormattedText } from "@/lib/utils";
import { getHomePageData } from "@/lib/content";

export default async function AboutPage() {
  const data = await getHomePageData();

  return (
    <main className="px-4 pb-12 sm:px-6 lg:px-10 pt-2 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 pt-4 sm:pt-6 pb-10 sm:pb-14 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <FadeIn className="space-y-4">
            {data.profile.portrait ? (
              <div className="mx-auto w-full max-w-[16rem] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] lg:mx-0">
                <div className="relative aspect-[4/5]">
                  <Image
                    alt={data.profile.name}
                    className="h-full w-full object-cover object-center"
                    fill
                    priority
                    sizes="16rem"
                    src={data.profile.portrait}
                  />
                </div>
              </div>
            ) : null}
            <div className="rounded-[1.6rem] border border-[var(--border)] bg-[color:var(--background-elevated)] px-4 py-3 shadow-[var(--shadow)] text-center lg:text-left overflow-hidden">
              {data.profile.emails.map((email) => (
                <a
                  className="block text-[0.82rem] leading-6 text-[var(--foreground)] hover:text-[var(--accent)] whitespace-nowrap overflow-hidden text-ellipsis"
                  href={`mailto:${email}`}
                  key={email}
                  title={email}
                >
                  {email}
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-6 shadow-[var(--shadow)] sm:p-8" delay={0.08}>
            <RichText source={data.profile.about} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className={cn(buttonVariants())} href="/research">
                Explore Research
              </Link>
              <Link className={cn(buttonVariants({ variant: "ghost" }))} href="/contact">
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </section>

        <section className="border-t border-[var(--border)] py-10 sm:py-14">
          <div className="max-w-5xl space-y-6">
            <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">Awards</h2>
            <div className="grid gap-4">
              {data.profile.awards.map((award, index) => (
                <FadeIn
                  className="grid gap-3 rounded-[1.6rem] border border-[var(--border)] bg-[color:var(--background-elevated)] px-5 py-5 shadow-[var(--shadow)] sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-5 sm:px-6"
                  delay={index * 0.04}
                  key={award}
                >
                  <div className="font-mono text-sm tracking-[0.18em] text-[var(--subtle-foreground)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-[1rem] leading-8 text-[var(--muted-foreground)]">{renderFormattedText(award)}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter links={data.contact.links} />
      </div>
    </main>
  );
}

