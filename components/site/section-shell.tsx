import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, label, title, description, children, className }: SectionShellProps) {
  return (
    <section className={cn("border-t border-[var(--border)] py-16 sm:py-24", className)} id={id}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{label}</p>
          <div className="space-y-4">
            <h2 className="max-w-lg font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
              {title}
            </h2>
            {description ? <p className="max-w-md text-base leading-8 text-[var(--muted-foreground)]">{description}</p> : null}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
