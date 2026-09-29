"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, FileText } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { Publication, Thesis } from "@/lib/content";
import { REDUCED_TRANSITION, useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

/* ─── Filter tabs (segmented control with sliding indicator) ─────────────── */

type Filter = "all" | "thesis" | number;

function FilterTabs({
  active,
  onChange,
  years
}: {
  active: Filter;
  onChange: (f: Filter) => void;
  years: number[];
}) {
  const reduceMotion = useReducedMotionSafe();
  const tabs: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    ...years.map((y) => ({ label: String(y), value: y as Filter })),
    { label: "Thesis", value: "thesis" }
  ];

  return (
    <div className="no-scrollbar -mx-1 overflow-x-auto px-1 py-1">
      <div
        aria-label="Filter publications"
        className="inline-flex gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-3)] p-1 shadow-[var(--shadow-sm)]"
        role="tablist"
      >
        {tabs.map((tab) => {
          const selected = active === tab.value;
          return (
            <button
              aria-selected={selected}
              className={cn(
                "relative isolate min-h-10 rounded-full px-5 text-sm font-medium",
                selected ? "text-[var(--bg-1)]" : "text-[var(--fg-2)] hover:text-[var(--fg)]"
              )}
              key={String(tab.value)}
              onClick={() => onChange(tab.value)}
              role="tab"
              type="button"
            >
              {selected && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--fg)]"
                  layoutId="pub-filter"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 450, damping: 38 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Cover cards (original grid layout, current card styling) ───────────── */

function Cover({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="media-container m-3 mb-0 shrink-0 overflow-hidden rounded-xl">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <Image
          alt={alt}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          src={src}
        />
      </div>
    </div>
  );
}

function ActionLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <a
      className="group/link inline-flex min-h-9 items-center gap-1 rounded-full border border-[var(--border)] px-2.5 text-[0.75rem] font-medium text-[var(--fg-2)] hover:border-[var(--accent)]/50 hover:text-[var(--accent-light)]"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {icon}
      {children}
      <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

const CARD = "card card-hover spotlight group flex h-full flex-col overflow-hidden";

function PublicationCard({ publication, priority }: { publication: Publication; priority?: boolean }) {
  // Nature citation style: journal vol (issue), article/pages (year) — volume bold.
  const refJsx = publication.volume ? (
    <>
      {publication.journal} <strong className="font-semibold text-[var(--fg-2)]">{publication.volume}</strong>
      {publication.issue ? ` (${publication.issue})` : ""}
      {publication.article ? `, ${publication.article}` : ""}
      {publication.pages ? `, ${publication.pages}` : ""}
      {` (${publication.year})`}
    </>
  ) : (
    <>
      {publication.journal} ({publication.year})
    </>
  );

  return (
    <article className={CARD}>
      <Cover alt={`Cover: ${publication.title}`} priority={priority} src={publication.cover} />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center gap-2">
          <span className="eyebrow tabular-nums text-[var(--accent-light)]">
            {String(publication.number).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span className="chip">{publication.year}</span>
        </div>
        <h3 className="line-clamp-3 flex-1 font-[family-name:var(--font-display)] text-xs font-semibold leading-snug tracking-tight text-[var(--fg)]">
          {publication.title}
        </h3>
        <p className="text-[0.6875rem] leading-snug text-[var(--fg-2)]">{publication.authors}</p>
        <p className="font-[family-name:var(--font-mono)] text-[0.625rem] leading-snug text-[var(--fg-3)]">{refJsx}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {publication.doi && <ActionLink href={publication.doi} icon={<FileText className="size-3.5" />}>DOI</ActionLink>}
          {publication.repository && <ActionLink href={publication.repository} icon={<Code2 className="size-3.5" />}>Code</ActionLink>}
        </div>
      </div>
    </article>
  );
}

function ThesisCard({ thesis }: { thesis: Thesis }) {
  return (
    <article className={CARD}>
      <Cover alt={`Cover: ${thesis.title}`} src={thesis.cover} />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="chip text-[0.55rem]">{thesis.degree}</span>
        </div>
        <h3 className="line-clamp-3 flex-1 font-[family-name:var(--font-display)] text-xs font-semibold leading-snug tracking-tight text-[var(--fg)]">
          {thesis.title}
        </h3>
        <p className="text-[0.6875rem] leading-snug text-[var(--fg-2)]">{thesis.authors}</p>
        <p className="font-[family-name:var(--font-mono)] text-[0.625rem] leading-snug text-[var(--fg-3)]">
          {thesis.institution} · {thesis.year}
        </p>
        {/* Always render this row so both thesis cards have identical height. */}
        <div className="mt-1 flex flex-wrap gap-1.5">
          {thesis.driveUrl ? (
            <ActionLink href={thesis.driveUrl} icon={<FileText className="size-3.5" />}>View PDF</ActionLink>
          ) : (
            <span aria-hidden="true" className="invisible inline-flex min-h-9 items-center px-2.5 text-[0.75rem]">View PDF</span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

type PublicationListProps = {
  publications: Publication[];
  theses: Thesis[];
};

export function PublicationList({ publications, theses }: PublicationListProps) {
  const reduceMotion = useReducedMotionSafe();
  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications]
  );

  const [filter, setFilter] = useState<Filter>("all");

  const visiblePubs = useMemo(() => {
    if (filter === "thesis") return [];
    if (filter === "all") return publications;
    return publications.filter((p) => p.year === filter);
  }, [filter, publications]);

  // On "All" (and the Thesis tab) theses are shown mixed in with publications.
  const visibleTheses = filter === "all" || filter === "thesis" ? theses : [];

  const items = [
    ...visiblePubs.map((p, i) => ({ key: p.id, node: <PublicationCard priority={i === 0} publication={p} /> })),
    ...visibleTheses.map((t) => ({ key: t.id, node: <ThesisCard thesis={t} /> }))
  ];

  return (
    <div className="space-y-10">
      <FilterTabs active={filter} onChange={setFilter} years={years} />

      <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:-mr-8 lg:grid-cols-5 xl:-mr-16" layout={!reduceMotion}>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="h-full"
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
              initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              key={item.key}
              layout={!reduceMotion}
              transition={reduceMotion ? REDUCED_TRANSITION : { duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.node}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && <p className="text-sm text-[var(--fg-2)]">No entries for this filter.</p>}
    </div>
  );
}
