import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border-strong)] bg-[var(--foreground)] px-4 py-2 text-[var(--background)] shadow-[0_10px_30px_-18px_rgba(8,15,30,0.45)] hover:-translate-y-0.5 hover:opacity-95",
        ghost:
          "border-[var(--border)] bg-transparent px-4 py-2 text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface)]",
        subtle:
          "border-transparent bg-[var(--surface)] px-4 py-2 text-[var(--muted-foreground)] hover:-translate-y-0.5 hover:text-[var(--foreground)]"
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3 text-xs uppercase tracking-[0.18em]",
        lg: "h-11 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
