"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Accessible name for the dialog. */
  label?: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Dialog that renders as a bottom sheet on phones and a centred panel from
 * `sm` up. Locks body scroll, closes on Escape / backdrop, traps focus and
 * returns it to the trigger on close.
 */
export function Modal({ open, onClose, children, className, label }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 30);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          aria-label={label}
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
        >
          <motion.div
            animate={{ opacity: 1 }}
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "card card-elevated relative z-10 flex w-full max-w-2xl flex-col overflow-hidden",
              "max-h-[92dvh] rounded-b-none sm:max-h-[88dvh] sm:rounded-b-[1.25rem]",
              "shadow-[var(--shadow-modal)] outline-none",
              className
            )}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.98 }}
            ref={panelRef}
            tabIndex={-1}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Grab handle — a visual affordance for the sheet on phones */}
            <div aria-hidden="true" className="flex justify-center pt-2.5 sm:hidden">
              <span className="h-1 w-10 rounded-full bg-[var(--border-strong)]" />
            </div>

            <button
              aria-label="Close"
              className={cn(
                "absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full sm:right-4 sm:top-4",
                "border border-[var(--border)] bg-[var(--bg-2)]/85 text-[var(--fg-2)] backdrop-blur",
                "hover:rotate-90 hover:text-[var(--fg)]"
              )}
              onClick={onClose}
              type="button"
            >
              <X className="size-4" />
            </button>

            <div className="overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
