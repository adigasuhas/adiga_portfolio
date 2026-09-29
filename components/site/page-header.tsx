import type { ReactNode } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
};

/**
 * Consistent opening block for every page: mono eyebrow with an accent rule,
 * a large serif title, and optional intro content in a second column (lg+).
 */
export function PageHeader({ eyebrow, title, children, className, titleClassName }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "grid gap-8 pb-14 pt-10 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:pt-20",
        className
      )}
    >
      <FadeIn className="space-y-6">
        {eyebrow && <p className="eyebrow eyebrow-rule">{eyebrow}</p>}
        <h1 className={`${titleClassName ?? "text-display-xl"} text-[var(--fg)]`}>{title}</h1>
      </FadeIn>
      {children && (
        <FadeIn className="lg:pt-[2.6rem]" delay={0.1}>
          {children}
        </FadeIn>
      )}
    </header>
  );
}

type SectionHeadingProps = {
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
  /** Size class for the title (the original used display-xl or display-l per section). */
  titleClassName?: string;
};

/** Heading used for sections within a page — index number + serif title. */
export function SectionHeading({ index, title, description, id, className, titleClassName = "text-display-l" }: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "mb-10 grid gap-5 sm:mb-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-16",
        className
      )}
    >
      <div className="flex items-baseline gap-4">
        {index && <span className="eyebrow tabular-nums text-[var(--accent-light)]">{index}</span>}
        <h2 className={`${titleClassName} text-[var(--fg)]`} id={id}>
          {title}
        </h2>
      </div>
      {description && <div className="text-body max-w-2xl">{description}</div>}
    </FadeIn>
  );
}
