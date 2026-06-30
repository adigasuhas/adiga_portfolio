import Image from "next/image";
import { ArrowUpRight, BookOpen, ExternalLink, Github } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardBody } from "@/components/ui/card";
import type { Resource } from "@/lib/content";

type ResourceGridProps = {
  resources: Resource[];
};

/* ─── Shared card structure ────────────────────────────────────────────────
   All resource cards use the same outer frame:
     title → description → specific content (logo+link | categories)
   This keeps every card visually consistent regardless of type.
*/

/* ─── Feature resource (has a logo, e.g. Python4MS) ──────────────────────── */

function FeatureResource({ resource }: { resource: Resource }) {
  return (
    <Card as="article" variant="elevated">
      <CardBody className="space-y-5">
        {/* Logo — compact white-background chip, left-aligned with card content */}
        {resource.logo && (
          <div className="inline-flex items-center rounded-xl bg-white p-3">
            <Image
              alt={`${resource.title} logo`}
              className="block h-12 w-auto max-w-[10rem] object-contain"
              height={48}
              src={resource.logo}
              width={160}
              priority
            />
          </div>
        )}

        {/* Title — same style as category cards */}
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--fg)]">
          {resource.title}
        </h2>

        {resource.description && (
          <p className="leading-7 text-[var(--fg-2)]">
            {resource.description}
          </p>
        )}

        {resource.link && (
          <a
            className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-5)] px-4 py-2.5 text-sm font-medium text-[var(--fg)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
            href={resource.link.url}
            rel="noreferrer"
            target="_blank"
          >
            <Github className="size-4" />
            {resource.link.label}
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </CardBody>
    </Card>
  );
}

/* ─── Category resource (grouped link lists) ──────────────────────────────── */

function CategoryResource({ resource }: { resource: Resource }) {
  return (
    <Card as="article" variant="elevated">
      <CardBody className="space-y-5">
        {/* Title — same style as feature cards */}
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--fg)]">
          {resource.title}
        </h2>

        {resource.description && (
          <p className="leading-7 text-[var(--fg-2)]">
            {resource.description}
          </p>
        )}

        {resource.categories.map((cat, ci) => (
          <div className="space-y-3" key={ci}>
            {cat.heading && (
              <p className="eyebrow text-[0.6875rem]">{cat.heading}</p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {cat.items.map((item) => (
                <a
                  className="group flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-3)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-5)] hover:shadow-[var(--shadow)]"
                  href={item.url}
                  key={item.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-4)] text-[var(--fg-3)] transition-colors group-hover:text-[var(--accent-2-light)]">
                    <BookOpen className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-[var(--fg)] transition-colors group-hover:text-[var(--accent-2-light)]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--fg-3)]">
                      {item.description}
                    </p>
                  </div>
                  <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-[var(--fg-3)] transition-colors group-hover:text-[var(--accent-2-light)]" />
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Note / attribution — displayed at the bottom of the card */}
        {resource.note && (
          <p className="border-t border-[var(--border)] pt-4 text-[0.8125rem] italic text-[var(--fg-3)]">
            {resource.note}
          </p>
        )}
      </CardBody>
    </Card>
  );
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <div className="space-y-6">
      {resources.map((resource, index) => {
        const isFeature = Boolean(resource.logo && resource.link);
        return (
          <FadeIn delay={index * 0.07} key={resource.id}>
            {isFeature ? (
              <FeatureResource resource={resource} />
            ) : (
              <CategoryResource resource={resource} />
            )}
          </FadeIn>
        );
      })}
    </div>
  );
}
