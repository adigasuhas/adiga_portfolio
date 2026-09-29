import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Citation, DegreeBadge, ProjectLinks, StatusBadge } from "@/components/site/project-parts";
import { getSiteData, getProjectBySlug } from "@/lib/content";
import { cn } from "@/lib/utils";

type ResearchDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ResearchDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return { title: project?.title ?? "Research" };
}

export async function generateStaticParams() {
  const data = await getSiteData();
  return data.projects.map((p) => ({ slug: p.slug }));
}

export default async function ResearchDetailPage({ params }: ResearchDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { projects } = await getSiteData();
  const position = projects.findIndex((p) => p.slug === project.slug);
  const previous = position > 0 ? projects[position - 1] : null;
  const next = position < projects.length - 1 ? projects[position + 1] : null;

  return (
    <main className="shell">
      {/* Back link */}
      <div className="pt-8 sm:pt-12">
        <Link
          className="group inline-flex min-h-11 items-center gap-2 rounded-full pr-3 text-sm text-[var(--fg-2)] hover:text-[var(--fg)]"
          href="/research"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-[var(--border)] transition-transform duration-300 group-hover:-translate-x-0.5">
            <ArrowLeft className="size-4" />
          </span>
          Research
        </Link>
      </div>

      {/* Header */}
      <FadeIn>
        <header className="pb-12 pt-8 sm:pb-16 sm:pt-12">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <DegreeBadge className="px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.6875rem] tracking-[0.18em]" degree={project.degree} />
            <StatusBadge status={project.status} />
          </div>
          <h1 className="text-display-l max-w-4xl text-[var(--fg)]">{project.title}</h1>
        </header>
      </FadeIn>

      <div className="hairline" />

      {/* Content */}
      <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:gap-16">
        <FadeIn className="order-last space-y-8 lg:order-first">
          <div className="space-y-6">
            {project.description
              .split("\n\n")
              .filter((p) => p.trim())
              .map((para, i) => (
                <p className="leading-7 text-[var(--fg-2)]" key={i}>
                  {para}
                </p>
              ))}
          </div>

          {project.citation && <Citation text={project.citation} />}

          <ProjectLinks project={project} size="md" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <div className="media-container overflow-hidden rounded-2xl p-0 shadow-[var(--shadow-lg)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  alt={project.title}
                  className="object-contain p-3"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  src={project.image}
                  unoptimized={project.image.endsWith(".gif")}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Previous / next project */}
      {(previous || next) && (
        <nav aria-label="More projects" className="grid gap-4 border-t border-[var(--border)] pt-10 sm:grid-cols-2">
          {[previous, next].map((item, i) =>
            item ? (
              <Link
                className={cn(
                  "card card-hover spotlight group flex min-h-24 flex-col justify-center gap-2 p-5 sm:p-6",
                  i === 1 && "sm:col-start-2 sm:text-right"
                )}
                href={`/research/${item.slug}`}
                key={item.slug}
              >
                <span className={cn("inline-flex text-[var(--fg-3)]", i === 1 && "sm:justify-end")}>
                  {i === 0 ? <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" /> : <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />}
                </span>
                <span className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[var(--fg)]">
                  {item.title}
                </span>
              </Link>
            ) : null
          )}
        </nav>
      )}
    </main>
  );
}
