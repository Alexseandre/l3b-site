import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

interface SectionTitleProps extends WithClassName {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className,
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
