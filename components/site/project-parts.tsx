import { ArrowUpRight, ExternalLink } from "lucide-react";

import { arrowNudge, buttonClass } from "@/components/ui/link-button";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/* Server-safe building blocks shared by the research grid, its modal and the
   project detail page. */

/* ─── Badges ─────────────────────────────────────────────────────────────── */

const DEGREE_STYLES: Record<Project["degree"], string> = {
  "B.Sc.": "border-amber-500/35 bg-amber-500/15 text-amber-700 dark:text-amber-300",
  "M.S.": "border-blue-500/35 bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "Ph.D.": "border-violet-500/35 bg-violet-500/15 text-violet-700 dark:text-violet-300"
};

const BADGE_BASE =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em]";

export function DegreeBadge({ degree, className }: { degree: Project["degree"]; className?: string }) {
  return <span className={cn(BADGE_BASE, DEGREE_STYLES[degree], className)}>{degree}</span>;
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "published") {
    return (
      <span className={cn(BADGE_BASE, "border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300")}>
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Published
      </span>
    );
  }
  if (status === "manuscript-in-review") {
    return (
      <span className={cn(BADGE_BASE, "border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300")}>
        <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
        Manuscript in Review
      </span>
    );
  }
  return (
    <span className={cn(BADGE_BASE, "border-[var(--border-strong)] bg-[var(--bg-5)] text-[var(--fg-2)]")}>
      <span className="size-1.5 rounded-full border border-[var(--fg-3)]" />
      Manuscript in Preparation
    </span>
  );
}

export function projectIndex(project: Project) {
  return String(project.number).padStart(2, "0");
}

export function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  if (!project.paperUrl && project.resources.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2.5">
      {project.paperUrl && (
        <a className={buttonClass("primary", size)} href={project.paperUrl} rel="noreferrer" target="_blank">
          Paper
          <ExternalLink className="size-3.5" />
        </a>
      )}
      {project.resources.map((r) => (
        <a
          className={buttonClass("ghost", size, "whitespace-normal text-left")}
          href={r.url}
          key={r.url}
          rel="noreferrer"
          target="_blank"
        >
          {r.label}
          <ArrowUpRight className={arrowNudge} />
        </a>
      ))}
    </div>
  );
}

export function Citation({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-4 sm:p-5">
      <p className="eyebrow mb-2">Citation</p>
      <p className="font-[family-name:var(--font-mono)] text-[0.8125rem] leading-6 text-[var(--fg-2)]">{text}</p>
    </div>
  );
}
