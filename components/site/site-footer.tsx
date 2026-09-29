import Link from "next/link";

import { BackToTop } from "@/components/site/back-to-top";
import { SocialIcon } from "@/components/site/social-icon";
import type { ContactLink } from "@/lib/content";
import { NAV_LINKS } from "@/lib/nav";

type SiteFooterProps = {
  links: ContactLink[];
  name: string;
};

export function SiteFooter({ links, name }: SiteFooterProps) {
  return (
    <footer className="relative z-[1] mt-20 sm:mt-28">
      <div className="hairline" />
      <div className="shell py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <div className="space-y-4">
            <Link
              className="inline-block font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--fg)] hover:text-[var(--accent-light)]"
              href="/"
            >
              {name}
            </Link>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    className="inline-flex min-h-10 items-center text-sm text-[var(--fg-2)] hover:text-[var(--fg)]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  className="group inline-flex min-h-10 min-w-10 items-center gap-2 text-sm text-[var(--fg-2)] hover:text-[var(--fg)]"
                  href={link.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  <SocialIcon className="size-3.5 text-[var(--fg-3)] group-hover:text-[var(--accent-light)]" label={link.label} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
          <p className="text-caption">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
