import Image from "next/image";

import { RichText } from "@/components/mdx/rich-text";
import type { ResourceSection } from "@/lib/content";

type ResourceGridProps = {
  sections: ResourceSection[];
  logo?: string | null;
};

export async function ResourceGrid({ sections, logo }: ResourceGridProps) {
  const renderedSections = await Promise.all(
    sections.map(async (section, index) => ({
      index,
      title: section.title,
      content: await RichText({ source: section.content.replace(/^\[[^\]]+\]\n?/m, "") })
    }))
  );

  return (
    <div className="space-y-6">
      {renderedSections.map((section) => (
        <article
          className="rounded-[1.8rem] border border-[var(--border)] bg-[color:var(--background-elevated)] p-6 shadow-[var(--shadow)] sm:p-8"
          key={section.title}
        >
          <div className="mb-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
                {section.title}
              </h3>
            </div>
            {logo && section.index === 0 ? (
              <div className="relative h-20 w-36 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] flex-shrink-0 sm:h-24 sm:w-48 md:h-28 md:w-56 shadow-sm">
                <Image
                  alt="Python for Materials Science Logo"
                  className="object-contain p-2"
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 224px"
                  src={logo}
                />
              </div>
            ) : null}
          </div>
          <div className="text-[1rem] leading-8 text-[var(--muted-foreground)]">
            {section.content}
          </div>
        </article>
      ))}
    </div>
  );
}

