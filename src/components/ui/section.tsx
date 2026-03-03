import { cn } from "@/lib/utils";
import type { WithChildren, WithClassName } from "@/types";
import { Container } from "./container";

interface SectionProps extends WithChildren, WithClassName {
  id?: string;
  background?: "white" | "muted" | "primary" | "anthracite";
}

const BG_MAP = {
  white: "bg-white",
  muted: "bg-muted",
  primary: "bg-primary text-white",
  anthracite: "bg-anthracite text-white",
} as const;

export function Section({ children, className, id, background = "white" }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", BG_MAP[background], className)}>
      <Container>{children}</Container>
    </section>
  );
}
