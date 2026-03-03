import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";

interface ContainerProps extends WithChildren, WithClassName {
  as?: "div" | "section" | "article";
}

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
