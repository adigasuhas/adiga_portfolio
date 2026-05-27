"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications-and-conferences", label: "Publications & Conferences" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" }
] as const;

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <div
        className={cn(
          "mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] border px-4 py-4 backdrop-blur-xl transition-all duration-300 sm:px-6 md:flex-row md:items-center md:justify-between",
          isScrolled
            ? "border-[var(--border-strong)] bg-[color:var(--background-elevated)] shadow-[var(--shadow)]"
            : "border-transparent bg-transparent"
        )}
      >
        <Link className="text-sm font-semibold tracking-[0.12em] text-[var(--foreground)] uppercase" href="/">
          Suhas Adiga
        </Link>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <Link
                className={cn(
                  "text-sm transition-colors hover:text-[var(--foreground)]",
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)]"
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

