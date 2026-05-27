import type { ContactLink } from "@/lib/content";

type SiteFooterProps = {
  links: ContactLink[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-xl tracking-[-0.04em] text-[var(--foreground)]">Suhas Adiga</p>
        <div className="flex flex-wrap gap-4 text-sm text-[var(--muted-foreground)]">
          {links.map((link) => (
            <a className="transition-colors hover:text-[var(--foreground)]" href={link.url} key={link.url} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
