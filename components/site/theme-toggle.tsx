"use client";

import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="sm"
      variant="ghost"
    >
      {isDark ? <SunMedium className="size-4" /> : <Moon className="size-4" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
