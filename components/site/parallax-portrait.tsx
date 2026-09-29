"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

type ParallaxPortraitProps = {
  src: string;
  alt: string;
};

/**
 * Framed portrait whose photo drifts slightly slower than the page as you
 * scroll, with an offset outline behind it for depth.
 */
export function ParallaxPortrait({ src, alt }: ParallaxPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <div className="relative" ref={ref}>
      {/* Offset outline for depth */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-[var(--accent)]/40 sm:translate-x-4 sm:translate-y-4"
        style={reduceMotion ? undefined : { y: frameY }}
      />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border-strong)] bg-[var(--bg-4)] p-1.5 shadow-[var(--shadow-lg)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
          <motion.div className="absolute inset-[-6%_0]" style={reduceMotion ? undefined : { y: imageY }}>
            <Image
              alt={alt}
              className="object-cover object-top"
              fill
              priority
              sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 24rem"
              src={src}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
