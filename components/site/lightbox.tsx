"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import type { ConferenceImage } from "@/lib/content";
import { cn } from "@/lib/utils";

/* ─── Controlled lightbox ────────────────────────────────────────────────── */

type LightboxProps = {
  images: ConferenceImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ images, index, onChange }: LightboxProps) {
  const open = index !== null;
  const current = index !== null ? images[index] : null;
  const many = images.length > 1;

  const step = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + images.length) % images.length);
  };

  useEffect(() => {
    if (!open || !many) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onChange(((index ?? 0) + 1) % images.length);
      if (event.key === "ArrowLeft") onChange(((index ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, many, index, images.length, onChange]);

  const navButton =
    "flex size-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-2)] text-[var(--fg-2)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]";

  return (
    <Modal className="max-w-4xl" label={current?.caption ?? "Image viewer"} onClose={() => onChange(null)} open={open}>
      {current && (
        <figure className="p-3 pt-3 sm:p-4">
          <div className="relative overflow-hidden rounded-xl bg-[var(--bg-0)]">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate={{ opacity: 1 }}
                className="relative h-[min(70dvh,40rem)] w-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={current.src}
                transition={{ duration: 0.25 }}
              >
                <Image
                  alt={current.caption}
                  className="object-contain"
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  src={current.src}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <figcaption className="flex items-center gap-3 px-1 pt-4">
            <p className="min-w-0 flex-1 text-sm leading-6 text-[var(--fg-2)]">{current.caption}</p>
            {many && (
              <div className="flex shrink-0 items-center gap-2">
                <span className="mr-1 text-sm tabular-nums text-[var(--fg-3)]">
                  {(index ?? 0) + 1} / {images.length}
                </span>
                <button aria-label="Previous image" className={navButton} onClick={() => step(-1)} type="button">
                  <ChevronLeft className="size-4" />
                </button>
                <button aria-label="Next image" className={navButton} onClick={() => step(1)} type="button">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </figcaption>
        </figure>
      )}
    </Modal>
  );
}

/* ─── Figure tile (used by galleries) ────────────────────────────────────── */

type FigureTileProps = {
  image: ConferenceImage;
  onOpen: () => void;
  sizes: string;
  className?: string;
};

export function FigureTile({ image, onOpen, sizes, className }: FigureTileProps) {
  return (
    <figure className={cn("group", className)}>
      <button
        aria-label={`View image: ${image.caption}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-4)]"
        onClick={onOpen}
        type="button"
      >
        <Image
          alt={image.caption}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          fill
          sizes={sizes}
          src={image.src}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex size-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Expand className="size-4" />
        </span>
      </button>
      <figcaption className="px-1 pt-2 text-[0.75rem] leading-snug text-[var(--fg-3)]">
        {image.caption}
      </figcaption>
    </figure>
  );
}

/* ─── Gallery: swipe carousel on phones, grid from `sm` ──────────────────── */

type GalleryProps = {
  images: ConferenceImage[];
  label: string;
};

export function Gallery({ images, label }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div
        aria-label={label}
        className={cn(
          // Phones: horizontal snap carousel that bleeds to the screen edge.
          "no-scrollbar -mx-[1.125rem] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[1.125rem] pb-2",
          // Tablet / desktop: regular grid.
          "sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        )}
        role="list"
      >
        {images.map((image, i) => (
          <div className="w-[78%] shrink-0 snap-start sm:w-auto" key={image.src} role="listitem">
            <FigureTile
              image={image}
              onOpen={() => setIndex(i)}
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
      <Lightbox images={images} index={index} onChange={setIndex} />
    </>
  );
}
