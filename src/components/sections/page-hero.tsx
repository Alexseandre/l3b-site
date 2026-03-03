import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { WithClassName } from "@/types";

interface PageHeroProps extends WithClassName {
  badge?: string;
  title: string;
  description: string;
  accent?: "primary" | "pegase";
}

const ACCENT_MAP = {
  primary: "from-primary-dark via-primary to-primary-light",
  pegase: "from-primary-dark via-primary to-pegase/40",
} as const;

export function PageHero({ badge, title, description, accent = "primary", className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", ACCENT_MAP[accent])} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <Container className="relative z-10">
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90">
            {badge}
          </span>
        )}
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          {description}
        </p>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
