"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useCallback, useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Citation, DegreeBadge, ProjectLinks, StatusBadge } from "@/components/site/project-parts";
import { arrowSlide } from "@/components/ui/link-button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

/* ─── Grid card ──────────────────────────────────────────────────────────── */

function ProjectGridCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="card card-hover spotlight group relative flex h-full flex-col overflow-hidden">
      <div className="media-container m-2.5 mb-0 overflow-hidden rounded-[0.9rem] p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            alt={project.title}
            className="object-contain p-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            src={project.image}
            unoptimized={project.image.endsWith(".gif")}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <DegreeBadge degree={project.degree} />
          <StatusBadge status={project.status} />
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug tracking-tight text-[var(--fg)]">
          {project.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-[var(--fg-2)]">{project.summary}</p>

        {/* The whole card is the hit area (stretched pseudo-element). */}
        <button
          aria-haspopup="dialog"
          className={cn(
            "mt-2 inline-flex min-h-11 items-center gap-3 self-start text-sm font-medium text-[var(--fg)]",
            "after:absolute after:inset-0 after:rounded-[1.25rem] after:content-['']",
            "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--border-focus)]"
          )}
          onClick={onOpen}
          type="button"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-[var(--border-strong)] transition-all duration-300 group-hover:rotate-90 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-1)]">
            <Plus className="size-4" />
          </span>
          Know More
        </button>
      </div>
    </article>
  );
}

/* ─── Modal content ──────────────────────────────────────────────────────── */

function ProjectModalContent({ project }: { project: Project }) {
  return (
    <div>
      <div className="media-container m-3 mb-0 overflow-hidden rounded-xl p-0 sm:m-4 sm:mb-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            alt={project.title}
            className="object-contain p-3"
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            src={project.image}
            unoptimized={project.image.endsWith(".gif")}
          />
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <DegreeBadge degree={project.degree} />
            <StatusBadge status={project.status} />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-tight text-[var(--fg)]">
            {project.title}
          </h2>
        </div>

        <div className="space-y-4">
          {project.description
            .split("\n\n")
            .filter((p) => p.trim())
            .map((para, i) => (
              <p className="text-sm leading-7 text-[var(--fg-2)]" key={i}>
                {para}
              </p>
            ))}
        </div>

        {project.citation && <Citation text={project.citation} />}

        <ProjectLinks project={project} />

        <div className="border-t border-[var(--border)] pt-5">
          <Link
            className="group/btn inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[var(--accent-light)] hover:text-[var(--fg)]"
            href={`/research/${project.slug}`}
          >
            Open project page
            <ArrowRight className={arrowSlide} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main grid ──────────────────────────────────────────────────────────── */

export function ResearchGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {projects.map((project, i) => (
          <FadeIn className="h-full" delay={(i % 3) * 0.08} key={project.id}>
            <ProjectGridCard onOpen={() => setSelected(project)} project={project} />
          </FadeIn>
        ))}
      </div>

      <Modal label={selected?.title} onClose={close} open={selected !== null}>
        {selected && <ProjectModalContent project={selected} />}
      </Modal>
    </>
  );
}
