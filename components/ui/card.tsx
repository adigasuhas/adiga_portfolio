import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "elevated";
  hover?: boolean;
  as?: "article" | "div" | "section";
};

export function Card({
  className,
  variant = "default",
  hover = false,
  as: Tag = "div",
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "card",
        variant === "elevated" && "card-elevated",
        hover && "card-hover",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("card-body", className)} {...props} />;
}
