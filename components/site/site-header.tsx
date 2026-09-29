"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/site/theme-toggle";
import type { ContactLink } from "@/lib/content";
import { NAV_LINKS, isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

type SiteHeaderProps = {
  links: ContactLink[];
  name: string;
};

export function SiteHeader({ name }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close the menu on navigation, and whenever the viewport grows past `lg`.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const activeHref = NAV_LINKS.find((link) => isActivePath(pathname, link.href))?.href ?? null;
  const pillHref = hovered ?? activeHref;

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
        <nav
          aria-label="Main navigation"
          className={cn(
            "mx-auto flex h-14 max-w-[74rem] items-center justify-between gap-3 rounded-full border pl-2 pr-2 sm:pl-2.5",
            "transition-[background-color,border-color,box-shadow] duration-500",
            scrolled || menuOpen
              ? "border-[var(--border)] bg-[var(--bg-2)]/80 shadow-[var(--shadow-lg)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
          )}
        >
          {/* Brand */}
          <Link
            aria-label={`${name} — home`}
            className="group flex min-h-11 shrink-0 items-center rounded-full px-3"
            href="/"
          >
            <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold tracking-tight text-[var(--fg)] transition-opacity duration-200 group-hover:opacity-75">
              {name}
            </span>
          </Link>

          {/* Desktop links with a sliding highlight */}
          <ul className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {NAV_LINKS.map((link) => {
              const active = activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative isolate inline-flex min-h-10 items-center rounded-full px-4 text-[0.875rem] font-medium tracking-[-0.005em]",
                      active ? "text-[var(--fg)]" : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                    )}
                    href={link.href}
                    onFocus={() => setHovered(link.href)}
                    onMouseEnter={() => setHovered(link.href)}
                  >
                    {pillHref === link.href && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full border border-[var(--border)] bg-[var(--bg-5)]"
                        layoutId="nav-pill"
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1.5 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-[var(--accent-2-light)] opacity-80"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {/* Menu button (below lg) */}
            <button
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-3)]/60 hover:bg-[var(--bg-5)] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              type="button"
            >
              <span className="relative block h-3 w-[1.125rem]">
                <span
                  className={cn(
                    "absolute left-0 top-0 block h-[1.5px] w-full rounded-full bg-[var(--fg)] transition-all duration-300",
                    menuOpen && "top-[5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 block h-[1.5px] w-full rounded-full bg-[var(--fg)] transition-all duration-300",
                    menuOpen && "bottom-[5px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile / tablet menu — dropdown panel, as in the original design */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-2 max-w-[74rem] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-2)]/95 shadow-[var(--shadow-lg)] backdrop-blur-xl lg:hidden"
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              id="mobile-menu"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col p-2">
                {NAV_LINKS.map((link) => {
                  const active = activeHref === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "bg-[var(--bg-5)] text-[var(--fg)]"
                            : "text-[var(--fg-2)] hover:bg-[var(--bg-4)] hover:text-[var(--fg)]"
                        )}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
