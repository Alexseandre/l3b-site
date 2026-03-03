import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

interface CardProps extends WithChildren, WithClassName {
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 lg:p-8",
        hover && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
