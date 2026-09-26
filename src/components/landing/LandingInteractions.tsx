"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Pause,
  Play,
} from "lucide-react";
import type { LandingCopy, ProductProof } from "@/config/landing";
import { GlassPanel } from "@/components/ui/GlassPanel";

export function ProductAccordion({
  items,
  label,
}: {
  items: ProductProof[];
  label: string;
}) {
  const [active, setActive] = useState(items[0].id);

  return (
    <div className="product-accordion">
      {items.map((item) => (
        <GlassPanel
          as="article"
          tier="proof"
          key={item.id}
          className="product-panel"
          data-active={active === item.id}
        >
          <h3>
            <button
              type="button"
              onClick={() => setActive(item.id)}
              aria-expanded={active === item.id}
              aria-controls={`panel-${item.id}`}
              id={`trigger-${item.id}`}
            >
              <span>{item.eyebrow}</span>
              <ArrowUpRight aria-hidden="true" />
            </button>
          </h3>
          <div
            id={`panel-${item.id}`}
            role="region"
            aria-labelledby={`trigger-${item.id}`}
            hidden={active !== item.id}
            className="product-panel-content"
          >
            <div className="product-panel-copy">
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
            <figure className="group overflow-hidden">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={item.imageWidth}
                height={item.imageHeight}
                sizes="(max-width: 767px) 92vw, 70vw"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <figcaption>{label}</figcaption>
            </figure>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}

export function WorkflowMarquee({
  items,
  pauseLabel,
}: {
  items: string[];
  pauseLabel: string;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <GlassPanel className="workflow-strip" data-paused={paused}>
      <div className="workflow-mask">
        <div className="workflow-track">
          {[0, 1].map((copy) => (
            <div
              className="workflow-set"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {items.map((item) => (
                <span key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="icon-button marquee-toggle"
        aria-label={pauseLabel}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </GlassPanel>
  );
}

export function TrialCarousel({ copy }: { copy: LandingCopy["trial"] }) {
  const [active, setActive] = useState(0);

  return (
    <GlassPanel
      className="trial-carousel"
      role="region"
      aria-label={copy.title}
    >
      <div className="trial-progress" aria-hidden="true">
        {copy.steps.map((step, index) => (
          <span key={step.index} data-active={index === active} />
        ))}
      </div>
      <div className="trial-slide" aria-live="polite" aria-atomic="true">
        <span className="trial-number" aria-hidden="true">
          {copy.steps[active].index}
        </span>
        <h3>{copy.steps[active].title}</h3>
        <p>{copy.steps[active].body}</p>
      </div>
      <div className="trial-controls">
        <span className="trial-count">
          {active + 1} / {copy.steps.length}
        </span>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label={copy.previous}
            onClick={() =>
              setActive((active + copy.steps.length - 1) % copy.steps.length)
            }
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label={copy.next}
            onClick={() => setActive((active + 1) % copy.steps.length)}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}
