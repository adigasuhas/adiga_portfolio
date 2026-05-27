"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export function CalendlyButton() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Add CSS
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // 2. Add Script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {
      try {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      } catch (err) {
        console.warn("Calendly button clean up error:", err);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/suhasadiga4work/30min"
      });
    } else {
      window.open("https://calendly.com/suhasadiga4work/30min", "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="inline-flex w-full items-center justify-center gap-3 rounded-[1.2rem] border border-[var(--border-strong)] bg-[var(--foreground)] px-4 py-3.5 text-sm font-semibold text-[var(--background)] shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:scale-[1.01] hover:opacity-95 cursor-pointer active:scale-95 transition-all duration-150"
    >
      <Calendar className="size-4" />
      <span>Schedule a meet with me</span>
    </button>
  );
}
