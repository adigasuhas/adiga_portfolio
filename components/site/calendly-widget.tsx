"use client";

import { useEffect } from "react";

export function CalendlyWidget() {
  useEffect(() => {
    // 1. Add CSS stylesheet
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // 2. Add Script tag
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      // @ts-ignore
      if (window.Calendly) {
        // @ts-ignore
        window.Calendly.initBadgeWidget({
          url: "https://calendly.com/suhasadiga4work/30min",
          text: "Schedule time with me",
          color: "#4f7699", // The site's primary accent color instead of default Calendly blue
          textColor: "#ffffff",
          branding: true
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup: remove elements on unmount to prevent memory leaks and residual UI on other pages
    return () => {
      try {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      } catch (err) {
        console.warn("Calendly clean up error:", err);
      }
      
      const badge = document.querySelector(".calendly-badge-widget");
      if (badge) {
        badge.remove();
      }
    };
  }, []);

  return null;
}
