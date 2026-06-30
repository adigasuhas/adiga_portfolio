import Link from "next/link";
import { Linkedin, Github, Twitter, BookOpen } from "lucide-react";

import type { ContactLink } from "@/lib/content";

type SiteFooterProps = {
  links: ContactLink[];
  name: string;
};

const LINK_ICONS: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="size-3.5" />,
  github:   <Github className="size-3.5" />,
  x:        <Twitter className="size-3.5" />,
  twitter:  <Twitter className="size-3.5" />,
  scholar:  <BookOpen className="size-3.5" />,
};

function getLinkIcon(label: string): React.ReactNode {
  const key = label.toLowerCase();
  if (key.includes("linkedin")) return LINK_ICONS.linkedin;
  if (key.includes("github"))   return LINK_ICONS.github;
  if (key === "x" || key.includes("twitter")) return LINK_ICONS.x;
  if (key.includes("scholar"))  return LINK_ICONS.scholar;
  return null;
}

export function SiteFooter({ links, name }: SiteFooterProps) {
  return (
    <footer className="relative z-[1] border-t border-[var(--border)] mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--fg)]">
            {name}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => {
              const icon = getLinkIcon(link.label);
              return (
                <a
                  className="inline-flex items-center gap-1.5 text-sm text-[var(--fg-2)] transition-colors hover:text-[var(--fg)]"
                  href={link.url}
                  key={link.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {icon}
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-6 border-t border-[var(--border)] pt-5">
          <p className="text-caption">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
