import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "katex/dist/katex.min.css";

import { PointerSpotlight } from "@/components/motion/pointer-spotlight";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteData } from "@/lib/content";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Suhas Adiga",
    template: "%s · Suhas Adiga"
  },
  description:
    "Research portfolio for Suhas Adiga — computational materials science, scientific machine learning, and data-driven materials discovery.",
  keywords: [
    "Suhas Adiga",
    "computational materials science",
    "materials informatics",
    "scientific machine learning",
    "materials discovery",
    "JNCASR",
    "University of Liverpool"
  ],
  openGraph: {
    title: "Suhas Adiga",
    description:
      "Computational materials science, scientific machine learning, and data-driven materials discovery.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Suhas Adiga",
    description:
      "Computational materials science, scientific machine learning, and data-driven materials discovery."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070707" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" }
  ]
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();

  return (
    <html
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-[var(--bg-1)] font-[family-name:var(--font-body)] text-[var(--fg)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme-preference">
          <a
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--fg)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--bg-1)]"
            href="#main"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <PointerSpotlight />
          <div className="relative isolate flex min-h-dvh flex-col">
            <SiteHeader links={data.about.links} name={data.about.name} />
            <div className="relative z-[1] flex-1" id="main">
              {children}
            </div>
            <SiteFooter links={data.about.links} name={data.about.name} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
