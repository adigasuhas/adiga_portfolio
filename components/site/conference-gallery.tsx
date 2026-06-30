import Image from "next/image";

import { FadeIn } from "@/components/motion/fade-in";
import type { Conference } from "@/lib/content";

type ConferenceGalleryProps = {
  conferences: Conference[];
};

export function ConferenceGallery({ conferences }: ConferenceGalleryProps) {
  // Flatten all images from conferences that have photos, preserving order.
  // Conferences with no images are skipped entirely.
  const images = conferences
    .filter((c) => c.images.length > 0)
    .flatMap((c) => c.images);

  if (images.length === 0) return null;

  // All images in one single row — column count equals number of images so
  // nothing wraps. On narrow screens fall back to 2-col wrapping.
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
      {images.map((img, i) => (
        <FadeIn delay={i * 0.06} key={img.src}>
          <figure className="group overflow-hidden rounded-2xl border border-[var(--border)]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt={img.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                src={img.src}
              />
            </div>
            {img.caption && (
              <figcaption className="px-3 py-2 text-[0.75rem] text-[var(--fg-3)] leading-snug">
                {img.caption}
              </figcaption>
            )}
          </figure>
        </FadeIn>
      ))}
    </div>
  );
}
