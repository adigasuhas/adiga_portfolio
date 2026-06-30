"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState, useMemo } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardBody } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Publication, Thesis } from "@/lib/content";

/* ─── Filter tabs ────────────────────────────────────────────────────────── */

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
  const tabs: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    ...years.map((y) => ({ label: String(y), value: y as Filter })),
    { label: "Thesis", value: "thesis" }
  ];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter publications"
    >
      {tabs.map((tab) => (
        <button
          aria-selected={active === tab.value}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150",
            "border focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]",
            active === tab.value
              ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent-light)]"
              : "border-[var(--border)] text-[var(--fg-2)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
          )}
          key={String(tab.value)}
          onClick={() => onChange(tab.value)}
          role="tab"
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Publication card ───────────────────────────────────────────────────── */

function PublicationCard({
  publication,
  index
}: {
  publication: Publication;
  index: number;
}) {
  // Nature citation style: journal vol (issue), article/pages (year) — volume bold.
  const refJsx = publication.volume ? (
    <>
      {publication.journal}{" "}
      <strong>{publication.volume}</strong>
      {publication.issue ? ` (${publication.issue})` : ""}
      {publication.article ? `, ${publication.article}` : ""}
      {publication.pages ? `, ${publication.pages}` : ""}
      {` (${publication.year})`}
    </>
  ) : (
    <>{publication.journal} ({publication.year})</>
  );

  return (
    <FadeIn delay={index * 0.06}>
      <Card as="article" className="flex h-full flex-col overflow-hidden" hover>
        {/* Cover image */}
        <div className="media-container m-3 mb-0 shrink-0 overflow-hidden rounded-xl">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              alt={`Cover: ${publication.title}`}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              src={publication.cover}
            />
          </div>
        </div>

        <CardBody className="flex flex-1 flex-col gap-2 p-3">
          <p className="eyebrow text-[0.55rem]">
            {String(publication.number).padStart(2, "0")}
          </p>

          <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold leading-snug text-[var(--fg)] tracking-tight flex-1 line-clamp-3">
            {publication.title}
          </h3>

          <p className="font-[family-name:var(--font-mono)] text-[0.625rem] text-[var(--fg-3)] leading-snug">
            {refJsx}
          </p>

          <div className="flex flex-wrap gap-3 mt-1 text-[0.75rem]">
            {publication.doi && (
              <a
                className="inline-flex items-center gap-1 text-[var(--fg-2)] transition-colors hover:text-[var(--accent-light)]"
                href={publication.doi}
                rel="noreferrer"
                target="_blank"
              >
                DOI
                <ArrowUpRight className="size-3" />
              </a>
            )}
            {publication.repository && (
              <a
                className="inline-flex items-center gap-1 text-[var(--fg-2)] transition-colors hover:text-[var(--accent-light)]"
                href={publication.repository}
                rel="noreferrer"
                target="_blank"
              >
                Code
                <ArrowUpRight className="size-3" />
              </a>
            )}
          </div>
        </CardBody>
      </Card>
    </FadeIn>
  );
}

/* ─── Thesis card ────────────────────────────────────────────────────────── */

function ThesisCard({ thesis, index }: { thesis: Thesis; index: number }) {
  return (
    <FadeIn delay={index * 0.06}>
      <Card as="article" className="flex h-full flex-col overflow-hidden" hover>
        {/* Cover image */}
        <div className="media-container m-3 mb-0 shrink-0 overflow-hidden rounded-xl">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              alt={`Cover: ${thesis.title}`}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              src={thesis.cover}
            />
          </div>
        </div>

        <CardBody className="flex flex-1 flex-col gap-2 p-3">
          <span className="inline-flex w-fit rounded-full bg-[var(--bg-5)] border border-[var(--border)] px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-[var(--fg-3)]">
            {thesis.degree}
          </span>

          <h3 className="font-[family-name:var(--font-display)] text-xs font-semibold leading-snug text-[var(--fg)] tracking-tight flex-1 line-clamp-3">
            {thesis.title}
          </h3>

          <p className="font-[family-name:var(--font-mono)] text-[0.625rem] text-[var(--fg-3)] leading-snug">
            {thesis.institution} · {thesis.year}
          </p>

          {/* Always render this row so both thesis cards have identical height. */}
          <div className="mt-1">
            {thesis.driveUrl ? (
              <a
                className="inline-flex items-center gap-1 text-[0.75rem] text-[var(--fg-2)] transition-colors hover:text-[var(--accent-light)]"
                href={thesis.driveUrl}
                rel="noreferrer"
                target="_blank"
              >
                View PDF
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              <span aria-hidden="true" className="invisible inline-flex items-center gap-1 text-[0.75rem]">
                View PDF
                <ArrowUpRight className="size-3" />
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </FadeIn>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

type PublicationListProps = {
  publications: Publication[];
  theses: Thesis[];
};

export function PublicationList({ publications, theses }: PublicationListProps) {
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

  // On "All" (and the Thesis tab) theses are shown mixed in with publications,
  // not visually isolated.
  const visibleTheses = filter === "all" || filter === "thesis" ? theses : [];

  const isEmpty = visiblePubs.length === 0 && visibleTheses.length === 0;

  return (
    <div className="space-y-10">
      <FilterTabs active={filter} onChange={setFilter} years={years} />

      {/* 5-column grid so all publications/theses fit in one row at desktop */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {visiblePubs.map((pub, i) => (
          <PublicationCard index={i} key={pub.id} publication={pub} />
        ))}
        {visibleTheses.map((thesis, i) => (
          <ThesisCard index={visiblePubs.length + i} key={thesis.id} thesis={thesis} />
        ))}
      </div>

      {isEmpty && (
        <p className="text-sm text-[var(--fg-2)]">No entries for this filter.</p>
      )}
    </div>
  );
}
