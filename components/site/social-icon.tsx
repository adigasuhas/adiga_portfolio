import { ArrowUpRight, BookOpen, Github, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

/** Icon for a social/profile link, matched on its label. */
export function SocialIcon({ label, className }: { label: string; className?: string }) {
  const key = label.toLowerCase();
  const cls = cn("size-4 shrink-0", className);
  if (key.includes("linkedin")) return <Linkedin className={cls} />;
  if (key.includes("github")) return <Github className={cls} />;
  if (key === "x" || key.includes("twitter")) return <Twitter className={cls} />;
  if (key.includes("scholar")) return <BookOpen className={cls} />;
  return <ArrowUpRight className={cls} />;
}
