import type { Metadata } from "next";
import { Figtree, JetBrains_Mono, Lora } from "next/font/google";
import "katex/dist/katex.min.css";

import { SiteHeader } from "@/components/site/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Suhas Adiga",
    template: "%s · Suhas Adiga"
  },
  description:
    "Research portfolio for Suhas Adiga, spanning AI, materials science, scientific machine learning, and computational materials discovery.",
  keywords: [
    "Suhas Adiga",
    "materials science",
    "scientific machine learning",
    "materials informatics",
    "computational materials discovery",
    "AI for science"
  ],
  openGraph: {
    title: "Suhas Adiga",
    description:
      "Research portfolio in AI, materials science, scientific machine learning, and computational materials discovery.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Suhas Adiga",
    description:
      "Research portfolio in AI, materials science, scientific machine learning, and computational materials discovery."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} bg-[var(--background)] font-sans text-[var(--foreground)] antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-[var(--background)]">
            <SiteHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
