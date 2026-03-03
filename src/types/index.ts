import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export type HTMLDivProps = ComponentPropsWithoutRef<"div">;
export type HTMLButtonProps = ComponentPropsWithoutRef<"button">;
export type HTMLAnchorProps = ComponentPropsWithoutRef<"a">;
