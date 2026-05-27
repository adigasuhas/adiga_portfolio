import { ArrowRight, MoveDownRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

type HeroProps = {
  name: string;
  role: string;
  summary: string;
  nextStep?: string | null;
};

export function Hero({ name, role, summary, nextStep }: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(124,138,255,0.12),transparent_46%),radial-gradient(circle_at_18%_18%,rgba(89,179,155,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top,rgba(124,138,255,0.16),transparent_42%),radial-gradient(circle_at_18%_18%,rgba(89,179,155,0.14),transparent_24%)]" />
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.7fr)] lg:items-end">
        <FadeIn className="space-y-9">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[color:var(--background-elevated)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
            <span>Materials Informatics</span>
            <MoveDownRight className="size-3.5 text-[var(--accent)]" />
            <span>Scientific ML</span>
          </div>
          <div className="space-y-7">
            <h1 className="max-w-5xl text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-[var(--foreground)] sm:text-6xl lg:text-8xl">
              {name}
            </h1>
            <div className="max-w-3xl space-y-5">
              <p className="text-balance text-xl leading-9 text-[var(--foreground)] sm:text-2xl">{role}</p>
              <p className="max-w-2xl text-pretty text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">{summary}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#research">
              <Button>
                Explore research
                <ArrowRight className="size-4" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="ghost">Get in touch</Button>
            </a>
          </div>
        </FadeIn>
        <FadeIn className="lg:justify-self-end" delay={0.1}>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--surface)_92%,transparent),transparent)] p-6 shadow-[0_30px_80px_-56px_rgba(8,12,22,0.72)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Next step</p>
            <p className="mt-4 font-serif text-2xl leading-tight tracking-[-0.04em] text-[var(--foreground)]">
              University of Liverpool
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
              {nextStep ??
                "Joining the EPSRC CDT in Digital and Automated Materials Chemistry in October 2026."}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
