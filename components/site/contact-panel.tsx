import { ArrowUpRight, Mail } from "lucide-react";

import { RichText } from "@/components/mdx/rich-text";
import { CalendlyButton } from "@/components/site/calendly-button";
import type { ContactLink } from "@/lib/content";

type ContactPanelProps = {
  emails: string[];
  biography: string;
  details: string;
  links: ContactLink[];
};

export async function ContactPanel({ emails, biography, details, links }: ContactPanelProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
      <article className="rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-5 shadow-[var(--shadow)] sm:p-7">
        <div className="mb-6 flex items-center gap-3 text-[var(--foreground)]">
          <Mail className="size-4" />
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Reach out</p>
        </div>
        <div className="flex flex-col gap-3">
          {emails.map((email) => (
            <a
              className="text-base text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              href={`mailto:${email}`}
              key={email}
            >
              {email}
            </a>
          ))}
        </div>
        <div className="mt-8 border-t border-[var(--border)] pt-8">
          <RichText source={biography} />
        </div>
      </article>
      <div className="space-y-5">
        <article className="rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-5 shadow-[var(--shadow)] sm:p-6">
          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-[var(--muted-foreground)]">{details}</div>
        </article>

        {/* Meetings & Discussion Card */}
        <article className="rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-5 shadow-[var(--shadow)] sm:p-6">
          <h4 className="font-serif text-lg font-semibold tracking-[-0.02em] text-[var(--foreground)]">Meetings & Discussion</h4>
          <p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">
            Feel free to schedule a 30-minute virtual session with me to discuss research, collaboration, or academic topics.
          </p>
          <div className="mt-5">
            <CalendlyButton />
          </div>
        </article>

        <article className="rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-5 shadow-[var(--shadow)] sm:p-6">
          <div className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                className="inline-flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] hover:border-[var(--border-strong)]"
                href={link.url}
                key={link.url}
                rel="noreferrer"
                target="_blank"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="size-4 text-[var(--muted-foreground)]" />
              </a>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

