import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { RichText } from "@/components/mdx/rich-text";
import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn, renderFormattedText } from "@/lib/utils";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

export async function ProjectCard({ project }: ProjectCardProps) {
  const isPreview = project.preview.length < project.description.length;

  return (
    <FadeIn>
      <article className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-5 shadow-[var(--shadow)] sm:p-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.95fr)] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Project {String(project.projectNumber).padStart(2, "0")}</p>
            <h3 className="max-w-3xl font-serif text-[2rem] font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.45rem]">
              {project.title}
            </h3>
          </div>
          <RichText className="max-w-none" source={isPreview ? project.preview : project.description} />
          {project.citation ? (
            <div className="rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
              <span className="mb-2 block font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--subtle-foreground)]">
                Selected Publication / Citation
              </span>
              <p className="font-serif text-[1rem] leading-relaxed text-[var(--foreground)]">
                {renderFormattedText(project.citation)}
              </p>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {isPreview ? (
              <Link className={cn(buttonVariants({ variant: "ghost" }))} href={`/research/${project.slug}`}>
                Know More
              </Link>
            ) : null}
            {project.paperUrl ? (
              <a
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                href={project.paperUrl}
                rel="noreferrer"
                target="_blank"
              >
                PAPER
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
        <div className="flex h-full flex-col gap-5">
          {project.image ? (
            <div className={cn("relative overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[var(--surface)]", "aspect-[4/3]")}>
              <Image
                alt={project.title}
                className="h-full w-full object-contain p-2 transition-transform duration-500 hover:scale-[1.02]"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                src={project.image}
                unoptimized={project.image.endsWith(".gif")}
              />
            </div>
          ) : null}
          {project.resources.length > 0 ? (
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="mt-1 flex flex-col gap-3">
                {project.resources.map((resource) => (
                  <a
                    className="inline-flex items-center gap-2 text-sm text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                    href={resource.url}
                    key={resource.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>{resource.label}</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </FadeIn>
  );
}
