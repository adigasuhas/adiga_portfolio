export const NAV_LINKS = [
  { href: "/", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications & Awards" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" }
] as const;

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
