"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import type { ContactLink } from "@/lib/content";

const NAV_LINKS = [
  { href: "/", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications & Awards" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" }
] as const;

type SiteHeaderProps = {
  links: ContactLink[];
};

export function SiteHeader({ links: _links }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-0 sm:px-6 lg:px-10">
      <nav
        aria-label="Main navigation"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 sm:px-7",
          "border transition-all duration-300",
          scrolled
            ? "border-[var(--border)] bg-[var(--bg-2)]/90 shadow-[var(--shadow)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Brand name — prominent display font */}
        <Link
          aria-label="Home"
          className="group flex items-center gap-2.5 shrink-0"
          href="/"
        >
          <span
            className={cn(
              "font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-tight",
              "text-[var(--fg)] transition-opacity duration-200 group-hover:opacity-75"
            )}
          >
            Suhas Adiga
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center rounded-lg px-3.5 py-2",
                    "text-[0.875rem] font-medium tracking-tight transition-all duration-200",
                    active
                      ? "text-[var(--fg)] bg-[var(--bg-4)]"
                      : "text-[var(--fg-2)] hover:text-[var(--fg)] hover:bg-[var(--bg-3)]"
                  )}
                  href={link.href}
                >
                  {link.label}
                  {/* Bottom accent line for active page */}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full bg-[var(--accent-2-light)] opacity-70"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="flex flex-col gap-[5px] p-2 md:hidden rounded-lg hover:bg-[var(--bg-3)] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            <span
              className={cn(
                "block h-px w-5 bg-[var(--fg-2)] transition-all duration-200",
                menuOpen && "translate-y-[6px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-[var(--fg-2)] transition-all duration-200",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-[var(--fg-2)] transition-all duration-200",
                menuOpen && "-translate-y-[6px] -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl",
            "border border-[var(--border)] bg-[var(--bg-2)]/95 shadow-[var(--shadow-lg)] backdrop-blur-xl"
          )}
        >
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-[var(--bg-5)] text-[var(--fg)]"
                      : "text-[var(--fg-2)] hover:bg-[var(--bg-4)] hover:text-[var(--fg)]"
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
