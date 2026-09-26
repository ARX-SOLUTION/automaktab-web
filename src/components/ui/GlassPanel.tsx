import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const GLASS_TIERS = {
  nav: "glass-nav",
  panel: "glass-panel",
  proof: "glass-proof",
  form: "glass-form",
  inset: "glass-inset",
} as const;

export type GlassTier = keyof typeof GLASS_TIERS;

type GlassPanelProps<T extends ElementType> = {
  as?: T;
  tier?: GlassTier;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function GlassPanel<T extends ElementType = "div">({
  as,
  tier = "panel",
  className,
  children,
  ...props
}: GlassPanelProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag className={cn("glass", GLASS_TIERS[tier], className)} {...props}>
      {children}
    </Tag>
  );
}
