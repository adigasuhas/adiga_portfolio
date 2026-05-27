import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RichText } from "@/components/mdx/rich-text";
import { FadeIn } from "@/components/motion/fade-in";
import { PageIntro } from "@/components/site/page-intro";
import { SiteFooter } from "@/components/site/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getHomePageData, getProjectBySlug } from "@/lib/content";

type ResearchDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ResearchDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return {
    title: project?.title ?? "Research"
  };
}

export async function generateStaticParams() {
  const data = await getHomePageData();
  return data.research.projects.map((project) => ({
    slug: project.slug
  }));
}

export default async function ResearchDetailPage({ params }: ResearchDetailPageProps) {
  const { slug } = await params;
  const [project, data] = await Promise.all([getProjectBySlug(slug), getHomePageData()]);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-4 pb-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="pt-10 sm:pt-14">
          <Link
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "mb-6 px-0 text-[0.95rem] text-[var(--muted-foreground)] hover:bg-transparent hover:text-[var(--foreground)]"
            )}
            href="/research"
          >
            Back to Research
          </Link>
        </div>
        <PageIntro className="pb-8 pt-0 sm:pb-10 sm:pt-0" eyebrow="Research" title={project.title} />

        <section className="grid gap-8 border-t border-[var(--border)] py-10 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <FadeIn className="rounded-[2rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-6 shadow-[var(--shadow)] sm:p-8">
            <RichText source={project.rawContent} />
          </FadeIn>
          <FadeIn className="space-y-5" delay={0.08}>
            {project.image ? (
              <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    alt={project.title}
                    className="h-full w-full object-contain p-2"
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    src={project.image}
                    unoptimized={project.image.endsWith(".gif")}
                  />
                </div>
              </div>
            ) : null}
          </FadeIn>
        </section>

        <SiteFooter links={data.contact.links} />
      </div>
    </main>
  );
}
