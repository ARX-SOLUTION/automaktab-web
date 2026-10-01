import React from "react";
import Image from "next/image";
import type { LandingContent } from "@/content/uz";
import DemoBadge from "./DemoBadge";

interface ProofFrameProps {
  content: LandingContent["proof"];
}

export default function ProofFrame({ content }: ProofFrameProps) {
  return (
    <figure
      data-screen-label="02 Proof"
      className="landing-hero-proof min-w-0 m-0 flex flex-col gap-4"
      aria-label={content.urlText}
    >
      <div className="bg-paper border border-sand-300 rounded-[var(--r-l)] shadow-[var(--shadow-proof)] overflow-hidden">
        <div className="min-h-11 bg-paper border-b border-sand-300 px-3 py-2 sm:px-4 flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0 font-mono text-[11px] sm:text-xs text-muted [overflow-wrap:anywhere]">
            {content.urlText}
          </div>

          <DemoBadge label={content.badge} />
        </div>

        <div className="relative w-full aspect-[1353/929] bg-paper">
          <Image
            src="/images/demo/dashboard.webp"
            alt={content.imageAlt}
            width={1353}
            height={929}
            loading="eager"
            sizes="(min-width: 1288px) 704px, (min-width: 1024px) 56vw, calc(100vw - 32px)"
            className="w-full h-auto"
          />

          {content.callouts.map((c) => (
            <span
              key={c.number}
              className="absolute w-6 h-6 grid place-items-center rounded-full border border-paper bg-amber-500 text-forest-800 font-mono font-bold text-xs -translate-x-1/2 -translate-y-1/2"
              style={{ top: c.topPct, left: c.leftPct }}
              aria-hidden="true"
            >
              {c.number}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="text-[13px] leading-relaxed text-on-dark-2">
        {content.caption}
      </figcaption>

      <dl className="m-0 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/15 pt-4">
        {content.callouts.map((c) => (
          <div key={c.number} className="min-w-0">
            <dt className="flex items-baseline gap-2 font-display font-bold text-xl leading-tight text-white">
              <span className="font-mono text-xs text-amber-500">{c.number}</span>
              {c.title}
            </dt>
            <dd className="m-0 mt-1.5 text-sm leading-relaxed text-on-dark-2">
              {c.description}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
