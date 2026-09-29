import Image from "next/image";
import { ArrowUpRight, BookOpen, Github } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { arrowNudge, buttonClass } from "@/components/ui/link-button";
import type { Resource } from "@/lib/content";

type ResourceGridProps = {
  resources: Resource[];
};

/* ─── Section header shared by every resource ────────────────────────────── */

function ResourceHeader({ resource }: { resource: Resource }) {
  return (
    <div className="space-y-4">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--fg)]">{resource.title}</h2>
      {resource.description && <p className="max-w-3xl leading-7 text-[var(--fg-2)]">{resource.description}</p>}
    </div>
  );
}

/* ─── Feature resource (has a logo, e.g. Python for Materials Science) ───── */

function FeatureResource({ resource }: { resource: Resource }) {
  if (!resource.link && !resource.logo) return null;
  return (
    <div className="card spotlight group grid overflow-hidden sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      {resource.logo && (
        <div className="flex items-center justify-center border-b border-[var(--border)] bg-white p-6 sm:border-b-0 sm:border-r sm:p-8">
          <Image
            alt={`${resource.title} logo`}
            className="h-auto w-full max-w-[18rem] object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            height={105}
            priority
            src={resource.logo}
            width={300}
          />
        </div>
      )}
      {resource.link && (
        <div className="flex flex-col items-start justify-center gap-5 p-6 sm:p-8">
          <p className="flex min-w-0 items-center gap-2 text-[0.8125rem] text-[var(--fg-3)]">
            <Github className="size-4 shrink-0" />
            <span className="break-all">{resource.link.url.replace(/^https?:\/\//, "")}</span>
          </p>
          <a
            className={buttonClass("primary", "md", "whitespace-normal")}
            href={resource.link.url}
            rel="noreferrer"
            target="_blank"
          >
            {resource.link.label}
            <ArrowUpRight className={arrowNudge} />
          </a>
        </div>
      )}
    </div>
  );
}

/* ─── Category resource (grouped link lists) ─────────────────────────────── */

function CategoryResource({ resource }: { resource: Resource }) {
  return (
    <div className="space-y-8">
      {resource.categories.map((cat, ci) => (
        <div className="space-y-4" key={ci}>
          {cat.heading && (
            <div className="flex items-center gap-3">
              <p className="eyebrow">{cat.heading}</p>
              <span className="h-px flex-1 bg-[var(--border)]" />
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {cat.items.map((item, i) => (
              <FadeIn className="h-full" delay={(i % 2) * 0.06} key={item.url}>
                <a
                  className="card card-hover spotlight group flex h-full items-start gap-4 p-4 sm:p-5"
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-5)] text-[var(--fg-3)] transition-colors duration-300 group-hover:border-[var(--accent-2)]/40 group-hover:bg-[var(--accent-2-dim)] group-hover:text-[var(--accent-2-light)]">
                    <BookOpen className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium leading-snug text-[var(--fg)] transition-colors group-hover:text-[var(--accent-2-light)]">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-[var(--fg-3)]">
                      {item.description}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-[var(--fg-3)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-2-light)]" />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <div>
      <div className="min-w-0 space-y-20 sm:space-y-24">
        {resources.map((resource) => {
          const isFeature = Boolean(resource.logo && resource.link);
          return (
            <section aria-label={resource.title} className="scroll-mt-32 space-y-8" id={resource.id} key={resource.id}>
              <FadeIn>
                <ResourceHeader resource={resource} />
              </FadeIn>
              <FadeIn delay={0.08}>
                {isFeature ? <FeatureResource resource={resource} /> : <CategoryResource resource={resource} />}
              </FadeIn>
              {resource.note && (
                <p className="border-l-2 border-[var(--accent)]/50 pl-4 text-[0.8125rem] italic text-[var(--fg-3)]">
                  {resource.note}
                </p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
