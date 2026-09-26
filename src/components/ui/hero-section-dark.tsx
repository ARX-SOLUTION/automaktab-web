import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { HeroAtmosphere } from "@/components/landing/HeroAtmosphere";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";

interface HeroSectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: { regular: string; gradient: string };
  description: string;
  ctaText?: string;
  ctaHref?: string;
  actions?: ReactNode;
  bottomImage?: {
    light: string;
    dark: string;
    alt: string;
    caption: string;
    width?: number;
    height?: number;
  };
}

export function HeroSection({
  className,
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  actions,
  bottomImage,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={cn("hero", className)}
      aria-labelledby="hero-title"
      {...props}
    >
      <HeroAtmosphere />
      <div className="section-shell hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker" data-hero-item>
            {title}
          </p>
          <h1 id="hero-title" className="max-w-6xl w-full" data-hero-title>
            {subtitle.regular} <span>{subtitle.gradient}</span>
          </h1>
          <p className="hero-lead" data-hero-item>
            {description}
          </p>
          <div className="hero-actions" data-hero-item>
            {actions ?? (
              <a className="button button-primary" href={ctaHref}>
                {ctaText}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        {bottomImage && (
          <GlassPanel
            as="figure"
            tier="proof"
            className="hero-evidence group"
            data-hero-proof
          >
            <figcaption className="evidence-topline">
              <span className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>{bottomImage.caption}</span>
              <ArrowUpRight aria-hidden="true" />
            </figcaption>
            <div className="hero-image-frame overflow-hidden">
              <Image
                src={bottomImage.dark}
                alt={bottomImage.alt}
                width={bottomImage.width ?? 1440}
                height={bottomImage.height ?? 900}
                preload
                sizes="(max-width: 767px) 100vw, (max-width: 1099px) 90vw, 55vw"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </GlassPanel>
        )}
      </div>
    </section>
  );
}
