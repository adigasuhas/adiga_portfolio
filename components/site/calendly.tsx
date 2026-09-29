import { Calendar, ArrowUpRight } from "lucide-react";

import { arrowNudge, buttonClass } from "@/components/ui/link-button";

const CALENDLY_URL = "https://calendly.com/suhasadiga4work/30min";

/**
 * Premium meeting CTA. Opens the Calendly booking page in a new tab — no
 * floating badge, no popup widget, no third-party scripts loaded on the page.
 */
export function CalendlyButton({ className }: { className?: string }) {
  return (
    <a
      className={buttonClass("primary", "md", `w-full min-h-12 whitespace-normal ${className ?? ""}`)}
      href={CALENDLY_URL}
      rel="noreferrer"
      target="_blank"
    >
      <Calendar className="size-4 shrink-0" />
      Schedule a meet with me
      <ArrowUpRight className={arrowNudge} />
    </a>
  );
}
