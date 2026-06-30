"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ open, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-4 py-8 sm:py-12"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "card card-elevated relative z-10 w-full max-w-2xl shadow-[var(--shadow-modal)]",
          "animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        <button
          aria-label="Close"
          className={cn(
            "absolute right-4 top-4 z-10",
            "flex items-center justify-center rounded-lg",
            "h-8 w-8 border border-[var(--border)] bg-[var(--bg-2)]",
            "text-[var(--fg-2)] transition-colors hover:text-[var(--fg)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
          )}
          onClick={onClose}
          type="button"
        >
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
