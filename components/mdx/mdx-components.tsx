import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  a: ({ className, href = "", ...props }) => {
    const sharedClassName = cn(
      "font-medium text-[var(--foreground)] underline decoration-[color:var(--border-strong)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--accent)]",
      className
    );

    if (href.startsWith("/")) {
      return <Link className={sharedClassName} href={href} {...props} />;
    }

    return <a className={sharedClassName} href={href} rel="noreferrer" target="_blank" {...props} />;
  },
  p: ({ className, ...props }) => (
    <p className={cn("text-pretty text-[1.06rem] leading-8 text-[var(--muted-foreground)] sm:text-[1.09rem]", className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-[var(--foreground)]", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("list-disc space-y-3 pl-5 text-[var(--muted-foreground)] marker:text-[var(--accent)]", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("list-decimal space-y-3 pl-5 text-[var(--muted-foreground)] marker:text-[var(--accent)]", className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn("pl-1 leading-8", className)} {...props} />,
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "font-serif text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl lg:text-6xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-12 font-serif text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)]", className)} {...props} />
  ),
  h3: ({ className, ...props }) => <h3 className={cn("mt-10 text-2xl font-semibold text-[var(--foreground)]", className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-8 border-l border-[var(--border-strong)] pl-5 font-serif text-xl italic leading-8 text-[var(--foreground)]",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-md bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--foreground)]",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-8 overflow-x-auto rounded-3xl border border-[var(--border)] bg-[var(--surface-strong)] p-5 font-mono text-sm leading-7 shadow-[0_30px_80px_-55px_rgba(5,10,18,0.55)]",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => <hr className={cn("my-10 border-[var(--border)]", className)} {...props} />
};
