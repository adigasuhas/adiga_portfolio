"use client";

import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { FigureTile, Lightbox } from "@/components/site/lightbox";
import type { Conference } from "@/lib/content";

type ConferenceGalleryProps = {
  conferences: Conference[];
};

export function ConferenceGallery({ conferences }: ConferenceGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  // Flatten all images from conferences that have photos, preserving order.
  // Conferences with no images are skipped entirely.
  const images = conferences.filter((c) => c.images.length > 0).flatMap((c) => c.images);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((img, i) => (
          <FadeIn delay={i * 0.06} key={img.src}>
            <FigureTile
              image={img}
              onOpen={() => setIndex(i)}
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          </FadeIn>
        ))}
      </div>
      <Lightbox images={images} index={index} onChange={setIndex} />
    </>
  );
}
