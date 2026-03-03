"use client";

import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  light?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { wrap: "h-10", icon: "h-10 w-10" },
  md: { wrap: "h-12", icon: "h-12 w-12" },
  lg: { wrap: "h-16", icon: "h-16 w-16" },
} as const;

export function AnimatedLogo({
  variant = "full",
  size = "md",
  light = false,
  className,
}: AnimatedLogoProps) {
  const textColor = light ? "#F8FAFC" : "#1F2937";
  const accentColor = light ? "#3B82F6" : "#1D5D9B";
  const mutedColor = light ? "rgba(255,255,255,0.5)" : "#9CA3AF";
  const draftColor = light ? "rgba(255,255,255,0.15)" : "#D5D8DC";
  const shadowColor = light ? "rgba(59,130,246,0.3)" : "rgba(29,93,155,0.3)";
  const bracketTopColor = light ? "#3B82F6" : "#1D5D9B";
  const bracketBottomColor = light ? "#CBD5E1" : "#9CA3AF";

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 120 120"
        className={cn(SIZE_MAP[size].icon, className)}
        aria-hidden="true"
      >
        {/* Draft lines */}
        <line x1="10" y1="55" x2="110" y2="55" stroke={draftColor} strokeWidth="1" className="logo-dl" />
        <line x1="60" y1="5" x2="60" y2="105" stroke={draftColor} strokeWidth="1" className="logo-dl logo-dl-2" />
        <line x1="25" y1="90" x2="95" y2="20" stroke={draftColor} strokeWidth="1" className="logo-dl logo-dl-3" />
        {/* Shadow */}
        <ellipse cx="60" cy="108" rx="28" ry="3" fill={shadowColor} className="logo-shadow" />
        {/* Floating mark */}
        <g className="logo-float-group">
          <polyline points="35,50 35,20 85,20 85,50" fill="none" strokeWidth="10" stroke={bracketTopColor} className="logo-bracket-anim logo-bt" />
          <polyline points="35,60 35,90 85,90 85,60" fill="none" strokeWidth="10" stroke={bracketBottomColor} className="logo-bracket-anim logo-bb" />
        </g>
      </svg>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 120 120"
        className={cn(SIZE_MAP[size].icon)}
        aria-hidden="true"
      >
        {/* Draft lines */}
        <line x1="10" y1="55" x2="110" y2="55" stroke={draftColor} strokeWidth="1" className="logo-dl" />
        <line x1="60" y1="5" x2="60" y2="105" stroke={draftColor} strokeWidth="1" className="logo-dl logo-dl-2" />
        <line x1="25" y1="90" x2="95" y2="20" stroke={draftColor} strokeWidth="1" className="logo-dl logo-dl-3" />
        {/* Shadow */}
        <ellipse cx="60" cy="108" rx="28" ry="3" fill={shadowColor} className="logo-shadow" />
        {/* Floating mark */}
        <g className="logo-float-group">
          <polyline points="35,50 35,20 85,20 85,50" fill="none" strokeWidth="10" stroke={bracketTopColor} className="logo-bracket-anim logo-bt" />
          <polyline points="35,60 35,90 85,90 85,60" fill="none" strokeWidth="10" stroke={bracketBottomColor} className="logo-bracket-anim logo-bb" />
        </g>
      </svg>
      {/* Text stays fixed, never floats */}
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-wide" style={{ color: textColor }}>
          L<span style={{ color: accentColor }}>3</span>B
        </span>
        <span
          className="text-[0.55rem] font-light tracking-[0.2em] uppercase"
          style={{ color: mutedColor }}
        >
          Construction
        </span>
      </div>
    </div>
  );
}
