"use client";

import { Mail, MapPin } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardBody } from "@/components/ui/card";
import { CalendlyButton } from "@/components/site/calendly";
import { FigureTile, Lightbox } from "@/components/site/lightbox";
import { MarkdownText } from "@/components/site/markdown-text";
import { SocialIcon } from "@/components/site/social-icon";
import type { ContactLink } from "@/lib/content";

type ContactPanelProps = {
  biography: string;
  address: string;
  emails: string[];
  links: ContactLink[];
  photography: { src: string; caption: string }[];
};

export function ContactPanel({
  biography,
  address,
  emails,
  links,
  photography
}: ContactPanelProps) {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">

      {/* ── Two-column layout: About Me (55%) | Email + Meetings stacked (45%) ── */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch">

        {/* Left: About Me */}
        <FadeIn>
          <Card as="article" className="h-full" variant="elevated">
            <CardBody className="h-full space-y-4">
              <p className="eyebrow text-[0.6875rem]">About Me</p>
              <MarkdownText
                className="space-y-4"
                paragraphClassName="text-sm leading-7 text-[var(--fg-2)]"
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
                  <div className="mb-3 flex items-center gap-2">
                    <Mail className="size-4 text-[var(--fg-3)]" />
                    <p className="eyebrow text-[0.6875rem]">Email</p>
                  </div>
                  <div className="space-y-1">
                    {emails.map((email) => (
                      <a
                        className="flex min-h-9 items-center text-sm text-[var(--fg)] transition-colors hover:text-[var(--accent-2-light)]"
                        href={`mailto:${email}`}
                        key={email}
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--border)] pt-4">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="size-4 text-[var(--fg-3)]" />
                    <p className="eyebrow text-[0.6875rem]">Location</p>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-6 text-[var(--fg-2)]">{address}</p>
                </div>
              </CardBody>
            </Card>
          </FadeIn>

          {/* Meetings */}
          <FadeIn className="flex-1" delay={0.12}>
            <Card as="article" className="spotlight h-full" variant="elevated">
              <CardBody className="space-y-4">
                <p className="font-[family-name:var(--font-display)] text-base font-semibold text-[var(--fg)]">
                  Meetings &amp; Discussion
                </p>
                <p className="text-sm leading-6 text-[var(--fg-2)]">
                  Feel free to schedule a 30-minute virtual session with me to discuss research, collaboration, or academic topics.
                </p>
                <CalendlyButton />
              </CardBody>
            </Card>
          </FadeIn>
        </div>
      </div>

      {/* ── Social Media Footprints — full width (2×2 on phones so labels fit) ── */}
      {links.length > 0 && (
        <FadeIn delay={0.16}>
          <Card as="section" variant="elevated">
            <CardBody className="space-y-4">
              <p className="eyebrow text-[0.6875rem]">Social Media Footprints</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {links.map((link) => (
                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-3)] px-3 py-2.5 text-sm font-medium text-[var(--fg-2)] transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--bg-5)] hover:text-[var(--fg)]"
                    href={link.url}
                    key={link.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SocialIcon label={link.label} />
                    <span className="text-[0.8125rem]">{link.label}</span>
                  </a>
                ))}
              </div>
            </CardBody>
          </Card>
        </FadeIn>
      )}

      {/* ── Photography grid (click to enlarge) ─────────────────────────── */}
      {photography.length > 0 && (
        <FadeIn delay={0.2}>
          <section aria-label="Photography">
            <p className="text-heading mb-5 font-[family-name:var(--font-display)] text-[var(--fg)]">
              Through the Lens of My Nord CE3 Lite
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {photography.map((photo, i) => (
                <FigureTile
                  image={photo}
                  key={photo.src}
                  onOpen={() => setPhotoIndex(i)}
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              ))}
            </div>
          </section>
          <Lightbox images={photography} index={photoIndex} onChange={setPhotoIndex} />
        </FadeIn>
      )}
    </div>
  );
}
