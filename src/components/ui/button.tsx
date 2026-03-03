import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const VARIANTS = {
  primary:
    "bg-primary text-white hover:bg-primary-light focus-visible:ring-primary",
  secondary:
    "bg-secondary text-white hover:bg-secondary-light focus-visible:ring-secondary",
  pegase:
    "bg-pegase text-white hover:bg-pegase-light focus-visible:ring-pegase",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
  ghost:
    "text-primary hover:bg-primary/10 focus-visible:ring-primary",
} as const;

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
} as const;

interface ButtonBaseProps {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps, Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (href) {
    const { ...linkProps } = props as Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps>;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = props as Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
