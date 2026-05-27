import { ArrowUpRight } from "lucide-react";

import type { Publication } from "@/lib/content";
import { renderFormattedText } from "@/lib/utils";

type PublicationListProps = {
  items: Publication[];
};

export function PublicationList({ items }: PublicationListProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((publication, index) => (
        <article
          className="rounded-[1.6rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-5 shadow-[var(--shadow)] sm:p-6"
          key={publication.id}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Paper {String(index + 1).padStart(2, "0")}</p>
          <p className="mt-3 text-[1.02rem] leading-8 text-[var(--foreground)]">{renderFormattedText(publication.text)}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            {publication.doi ? (
              <a className="inline-flex items-center gap-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]" href={publication.doi} rel="noreferrer" target="_blank">
                PAPER
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
            {publication.repository ? (
              <a className="inline-flex items-center gap-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]" href={publication.repository} rel="noreferrer" target="_blank">
                Repository
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
