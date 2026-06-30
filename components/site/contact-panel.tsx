import Image from "next/image";
import { Mail, MapPin, Linkedin, Github, Twitter, BookOpen, ArrowUpRight } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardBody } from "@/components/ui/card";
import { CalendlyButton } from "@/components/site/calendly";
import { MarkdownText } from "@/components/site/markdown-text";
import type { ContactLink } from "@/lib/content";

type ContactPanelProps = {
  biography: string;
  address: string;
  emails: string[];
  links: ContactLink[];
  photography: { src: string; caption: string }[];
};

function getLinkIcon(label: string): React.ReactNode {
  const k = label.toLowerCase();
  if (k.includes("linkedin"))             return <Linkedin className="size-4 shrink-0" />;
  if (k.includes("github"))               return <Github className="size-4 shrink-0" />;
  if (k === "x" || k.includes("twitter")) return <Twitter className="size-4 shrink-0" />;
  if (k.includes("scholar"))              return <BookOpen className="size-4 shrink-0" />;
  return <ArrowUpRight className="size-4 shrink-0" />;
}

export function ContactPanel({
  biography,
  address,
  emails,
  links,
  photography
}: ContactPanelProps) {
  return (
    <div className="space-y-6">

      {/* ── Two-column layout: About Me (55%) | Email + Meetings stacked (45%) ── */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch">

        {/* Left: About Me */}
        <FadeIn>
          <Card as="article" variant="elevated" className="h-full">
            <CardBody className="h-full space-y-4">
              <p className="eyebrow text-[0.6875rem]">About Me</p>
              <MarkdownText
                className="space-y-4"
                paragraphClassName="text-[var(--fg-2)] leading-7 text-sm"
                text={biography}
              />
            </CardBody>
          </Card>
        </FadeIn>

        {/* Right: Email + Meetings stacked */}
        <div className="flex flex-col gap-5">

          {/* Email + Location */}
          <FadeIn delay={0.07}>
            <Card as="article" variant="elevated">
              <CardBody className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="size-4 text-[var(--fg-3)]" />
                    <p className="eyebrow text-[0.6875rem]">Email</p>
                  </div>
                  <div className="space-y-2">
                    {emails.map((email) => (
                      <a
                        className="block text-sm text-[var(--fg)] transition-colors hover:text-[var(--accent-2-light)]"
                        href={`mailto:${email}`}
                        key={email}
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--border)] pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="size-4 text-[var(--fg-3)]" />
                    <p className="eyebrow text-[0.6875rem]">Location</p>
                  </div>
                  <p className="text-sm text-[var(--fg-2)] whitespace-pre-line leading-6">
                    {address}
                  </p>
                </div>
              </CardBody>
            </Card>
          </FadeIn>

          {/* Meetings */}
          <FadeIn delay={0.12}>
            <Card as="article" variant="elevated" className="flex-1">
              <CardBody className="space-y-4">
                <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--fg)]">
                  Meetings &amp; Discussion
                </p>
                <p className="text-sm text-[var(--fg-2)] leading-6">
                  Feel free to schedule a 30-minute virtual session with me to discuss research, collaboration, or academic topics.
                </p>
                <CalendlyButton />
              </CardBody>
            </Card>
          </FadeIn>
        </div>
      </div>

      {/* ── Social Media Footprints — evenly distributed across full width ── */}
      {links.length > 0 && (
        <FadeIn delay={0.16}>
          <Card as="section" variant="elevated">
            <CardBody className="space-y-4">
              <p className="eyebrow text-[0.6875rem]">Social Media Footprints</p>
              {/* Grid: each link occupies equal width, icon + label on one line */}
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${links.length}, minmax(0, 1fr))` }}
              >
                {links.map((link) => (
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-3)] px-3 py-2.5 text-sm font-medium text-[var(--fg-2)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--fg)] hover:bg-[var(--bg-5)]"
                    href={link.url}
                    key={link.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {getLinkIcon(link.label)}
                    <span className="text-[0.8125rem] truncate">{link.label}</span>
                  </a>
                ))}
              </div>
            </CardBody>
          </Card>
        </FadeIn>
      )}

      {/* ── Photography grid ─────────────────────────────────────────────── */}
      {photography.length > 0 && (
        <FadeIn delay={0.2}>
          <section aria-label="Photography">
            <p className="font-[family-name:var(--font-display)] text-heading text-[var(--fg)] mb-5">
              Through the Lens of My Nord CE3 Lite
            </p>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
              {photography.map((photo) => (
                <figure
                  className="group overflow-hidden rounded-2xl border border-[var(--border)]"
                  key={photo.src}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      alt={photo.caption}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      src={photo.src}
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-[0.75rem] text-[var(--fg-3)] leading-snug">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </FadeIn>
      )}
    </div>
  );
}
