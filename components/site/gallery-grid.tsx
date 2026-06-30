import Image from "next/image";

import type { ConferenceImage } from "@/lib/content";
import { cn } from "@/lib/utils";

type GalleryGridProps = {
  items: ConferenceImage[];
  className?: string;
  imageClassName?: string;
};

export function GalleryGrid({ items, className, imageClassName }: GalleryGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item) => (
        <figure
          className="group overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[color:var(--background-elevated)] shadow-[var(--shadow)]"
          key={item.src}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              alt={item.caption}
              className={cn("h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]", imageClassName)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1279px) 50vw, 25vw"
              src={item.src}
            />
          </div>
          <figcaption className="px-4 py-3 text-sm leading-7 text-[var(--muted-foreground)] sm:px-5">{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
