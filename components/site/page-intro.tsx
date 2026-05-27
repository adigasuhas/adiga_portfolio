import { cn } from "@/lib/utils";

type PageIntroProps = {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageIntro({ title, eyebrow, children, className }: PageIntroProps) {
  const normalizedEyebrow = eyebrow?.replace(/&/g, "and").trim().toLowerCase();
  const normalizedTitle = title.replace(/&/g, "and").trim().toLowerCase();
  const shouldRenderEyebrow = Boolean(eyebrow && normalizedEyebrow !== normalizedTitle);

  return (
    <header className={cn("space-y-5 pb-10 pt-10 sm:pb-14 sm:pt-14", className)}>
      {shouldRenderEyebrow ? (
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{eyebrow}</p>
      ) : null}
      <div className="max-w-4xl space-y-5">
        <h1 className="font-serif text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children ? <div className="max-w-3xl">{children}</div> : null}
      </div>
    </header>
  );
}
