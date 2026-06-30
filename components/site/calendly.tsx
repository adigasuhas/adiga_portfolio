import { Calendar, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/suhasadiga4work/30min";

/**
 * Premium meeting CTA. Opens the Calendly booking page in a new tab — no
 * floating badge, no popup widget, no third-party scripts loaded on the page.
 */
export function CalendlyButton({ className }: { className?: string }) {
  return (
    <a
      className={cn(
        "group inline-flex w-full items-center justify-center gap-2.5 rounded-xl",
        "bg-[var(--fg)] px-5 py-3.5 text-sm font-semibold text-[var(--bg-1)]",
        "shadow-[var(--shadow)] transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] active:translate-y-0",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-focus)]",
        className
      )}
      href={CALENDLY_URL}
      rel="noreferrer"
      target="_blank"
    >
      <Calendar className="size-4" />
      Schedule a meet with me
      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
