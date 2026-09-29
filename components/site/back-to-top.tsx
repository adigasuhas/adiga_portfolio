"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      aria-label="Back to top"
      className="group flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-2)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
