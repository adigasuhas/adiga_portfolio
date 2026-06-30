import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardBody } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getSiteData, getProjectBySlug } from "@/lib/content";

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

  return (
    <main className="px-4 pb-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Back link */}
        <div className="pt-10 sm:pt-14">
          <Link
            className={cn(
              "inline-flex items-center gap-2 text-sm text-[var(--fg-2)]",
              "transition-colors hover:text-[var(--fg)]"
            )}
            href="/research"
          >
            <ArrowLeft className="size-4" />
            Research
          </Link>
        </div>

        {/* Header */}
        <FadeIn>
          <div className="py-10 sm:py-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold border",
                  project.degree === "B.Sc."
                    ? "bg-[rgba(234,179,8,0.12)] text-[#ca8a04] border-[rgba(234,179,8,0.2)]"
                    : "bg-[var(--accent-dim)] text-[var(--accent-light)] border-[rgba(37,99,235,0.2)]"
                )}
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                {project.degree}
              </span>
              {project.status !== "published" && (
                <span className="inline-flex items-center rounded-full bg-[var(--bg-5)] px-2.5 py-0.5 text-[0.6rem] text-[var(--fg-3)] border border-[var(--border)]">
                  In preparation
                </span>
              )}
            </div>
            <h1 className="text-display-l text-[var(--fg)] max-w-3xl">
              {project.title}
            </h1>
          </div>
        </FadeIn>

        {/* Content grid */}
        <section className="border-t border-[var(--border)] py-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)]">

            {/* Left: description */}
            <FadeIn>
              <div className="space-y-8">
                <div className="space-y-5">
                  {project.description.split("\n\n").map((para, i) => (
                    <p className="text-[var(--fg-2)] leading-7" key={i}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Citation */}
                {project.citation && (
                  <Card variant="elevated">
                    <CardBody>
                      <p className="eyebrow mb-2 text-[0.6rem]">Citation</p>
                      <p className="font-[family-name:var(--font-mono)] text-[0.8125rem] text-[var(--fg-2)] leading-6">
                        {project.citation}
                      </p>
                    </CardBody>
                  </Card>
                )}

                {/* Links */}
                {(project.paperUrl || project.resources.length > 0) && (
                  <div className="flex flex-wrap gap-3">
                    {project.paperUrl && (
                      <a
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl border border-[var(--border)]",
                          "px-4 py-2.5 text-sm font-medium text-[var(--fg-2)]",
                          "transition-all hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                        )}
                        href={project.paperUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Paper
                        <ExternalLink className="size-3.5" />
                      </a>
                    )}
                    {project.resources.map((r) => (
                      <a
                        className={cn(
                          "inline-flex items-center gap-2 rounded-xl border border-[var(--border)]",
                          "px-4 py-2.5 text-sm font-medium text-[var(--fg-2)]",
                          "transition-all hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
                        )}
                        href={r.url}
                        key={r.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {r.label}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Right: image */}
            <FadeIn delay={0.1}>
              <div className="media-container overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    alt={project.title}
                    className="h-full w-full object-contain"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    src={project.image}
                    unoptimized={project.image.endsWith(".gif")}
                  />
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

      </div>
    </main>
  );
}
