import React from "react";
import type { LandingContent } from "@/content/uz";
import ProductScene from "./ProductScene";

interface ProofFrameProps {
  content: LandingContent["proof"];
  scenes: LandingContent["scenes"];
}

export default function ProofFrame({ content, scenes }: ProofFrameProps) {
  return (
    <figure
      data-screen-label="02 Proof"
      className="min-w-0 m-0 flex flex-col gap-4"
      aria-label={scenes.director.title}
    >
      <ProductScene kind="director" content={scenes} />

      <figcaption className="text-[13px] leading-relaxed text-muted">
        {content.caption}
      </figcaption>

      <dl className="m-0 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-sand-300 pt-4">
        {content.callouts.map((c) => (
          <div key={c.number} className="min-w-0">
            <dt className="flex items-baseline gap-2 font-display font-bold text-xl leading-tight text-ink">
              <span className="font-mono text-xs text-amber-700">{c.number}</span>
              {c.title}
            </dt>
            <dd className="m-0 mt-1.5 text-sm leading-relaxed text-body-2">
              {c.description}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
