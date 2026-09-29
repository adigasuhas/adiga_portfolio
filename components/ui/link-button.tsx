import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

/**
 * Shared call-to-action styling for <a>/<Link>/<button>. Every size keeps a
 * ≥44px (md) or ≥40px (sm) touch target.
 */
export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group/btn relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium",
    "whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-focus)]",
    "active:scale-[0.97]",
    size === "md" ? "min-h-11 px-5 text-sm" : "min-h-10 px-4 text-sm",
    variant === "primary" &&
      "bg-[var(--fg)] text-[var(--bg-1)] shadow-[var(--shadow)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
    variant === "secondary" &&
      "border border-[var(--border-strong)] bg-[var(--bg-3)]/60 text-[var(--fg)] backdrop-blur hover:-translate-y-0.5 hover:border-[var(--fg-3)] hover:bg-[var(--bg-5)]",
    variant === "ghost" &&
      "border border-[var(--border)] text-[var(--fg-2)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-5)] hover:text-[var(--fg)]",
    className
  );
}

/** Icon that nudges diagonally when its parent button is hovered. */
export const arrowNudge =
  "size-4 shrink-0 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5";

/** Icon that slides right when its parent button is hovered. */
export const arrowSlide = "size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1";
