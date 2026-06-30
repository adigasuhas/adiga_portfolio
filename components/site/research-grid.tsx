"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardBody } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content";

/* ─── Degree badge ───────────────────────────────────────────────────────── */

const DEGREE_STYLES: Record<Project["degree"], string> = {
  "B.Sc.":
    "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/35",
  "M.S.":
    "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/35",
  "Ph.D.":
    "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/35"
};

export function DegreeBadge({ degree }: { degree: Project["degree"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em]",
        DEGREE_STYLES[degree]
      )}
    >
      {degree}
    </span>
  );
}

/* ─── Status badge ───────────────────────────────────────────────────────── */

export function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Published
      </span>
    );
  }
  if (status === "manuscript-in-review") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/35 bg-amber-500/15 px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-amber-700 dark:text-amber-300">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        Manuscript in Review
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-5)] px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[var(--fg-2)]">
      Manuscript in Preparation
    </span>
  );
}

/* ─── Grid card (compact, 3-col) ─────────────────────────────────────────── */

type ProjectGridCardProps = {
  project: Project;
  onOpen: () => void;
};

function ProjectGridCard({ project, onOpen }: ProjectGridCardProps) {
  return (
    <Card
      as="article"
      className="flex h-full flex-col overflow-hidden"
      hover
    >
      {/* Image */}
      <div className="media-container m-3 mb-0 shrink-0 overflow-hidden rounded-xl">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            alt={project.title}
            className="h-full w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={project.image}
            unoptimized={project.image.endsWith(".gif")}
          />
        </div>
      </div>

      {/* Body */}
      <CardBody className="flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <DegreeBadge degree={project.degree} />
          <StatusBadge status={project.status} />
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[var(--fg)] tracking-tight line-clamp-3">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--fg-2)] leading-relaxed line-clamp-2 flex-1">
          {project.summary}
        </p>

        <button
          className={cn(
            "mt-auto self-start rounded-lg border border-[var(--border)] px-3 py-1.5",
            "text-sm text-[var(--fg-2)] transition-all duration-150",
            "hover:border-[var(--border-strong)] hover:text-[var(--fg)] hover:bg-[var(--bg-5)]",
            "focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
          )}
          onClick={onOpen}
          type="button"
        >
          Know More
        </button>
      </CardBody>
    </Card>
  );
}

/* ─── Modal content ──────────────────────────────────────────────────────── */

function ProjectModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div>
      {/* Image */}
      <div className="media-container m-4 mb-0 overflow-hidden rounded-xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            alt={project.title}
            className="h-full w-full object-contain"
            fill
            sizes="(max-width: 640px) 100vw, 672px"
            src={project.image}
            unoptimized={project.image.endsWith(".gif")}
          />
        </div>
      </div>

      <CardBody className="space-y-5">
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <DegreeBadge degree={project.degree} />
              <StatusBadge status={project.status} />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--fg)] leading-snug">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className="prose-shell text-sm">
          {project.description.split("\n\n").map((para, i) => (
            <p key={i} className="text-[var(--fg-2)] leading-7">
              {para}
            </p>
          ))}
        </div>

        {/* Citation */}
        {project.citation && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4">
            <p className="eyebrow mb-2 text-[0.625rem]">Citation</p>
            <p className="font-[family-name:var(--font-mono)] text-[0.8125rem] text-[var(--fg-2)] leading-6">
              {project.citation}
            </p>
          </div>
        )}

        {/* Links */}
        {(project.paperUrl || project.resources.length > 0) && (
          <div className="flex flex-wrap gap-3 pt-1">
            {project.paperUrl && (
              <a
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border border-[var(--border)]",
                  "px-3 py-2 text-sm text-[var(--fg-2)]",
                  "transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
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
                  "inline-flex items-center gap-2 rounded-lg border border-[var(--border)]",
                  "px-3 py-2 text-sm text-[var(--fg-2)]",
                  "transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
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
      </CardBody>
    </div>
  );
}

/* ─── Main grid component ────────────────────────────────────────────────── */

type ResearchGridProps = {
  projects: Project[];
};

export function ResearchGrid({ projects }: ResearchGridProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <FadeIn delay={i * 0.05} key={project.id}>
            <ProjectGridCard
              onOpen={() => setSelected(project)}
              project={project}
            />
          </FadeIn>
        ))}
      </div>

      <Modal onClose={() => setSelected(null)} open={selected !== null}>
        {selected && (
          <ProjectModalContent onClose={() => setSelected(null)} project={selected} />
        )}
      </Modal>
    </>
  );
}
