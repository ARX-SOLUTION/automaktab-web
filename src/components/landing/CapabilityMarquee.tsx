"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function SignalDiamond() {
  return (
    <svg
      viewBox="0 0 10 10"
      className="size-2 shrink-0 text-primary"
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="7" height="7" transform="rotate(45 5 5)" />
    </svg>
  );
}

// Full-bleed capability ticker between the hero and the first section.
// GSAP drives the loop; hover pauses it. Under prefers-reduced-motion (or
// with JS off) the track simply stays put and overflows are clipped.
export default function CapabilityMarquee({
  items,
}: {
  items: readonly string[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.fromTo(
          track,
          { xPercent: 0 },
          {
            xPercent: -50,
            repeat: -1,
            duration: 26,
            ease: "none",
          },
        );
        const pause = () => tween.timeScale(0);
        const resume = () => tween.timeScale(1);
        track.addEventListener("pointerenter", pause);
        track.addEventListener("pointerleave", resume);
        return () => {
          track.removeEventListener("pointerenter", pause);
          track.removeEventListener("pointerleave", resume);
        };
      });

      return () => mm.revert();
    },
    { scope: trackRef },
  );

  // Two copies of the sequence so the -50% loop seam is invisible.
  const row = (ariaHidden: boolean) => (
    <div
      className="flex shrink-0 items-center gap-6 pr-6"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-6">
          <span className="whitespace-nowrap font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {item}
          </span>
          <SignalDiamond />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="overflow-hidden border-y border-border bg-card py-3.5"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
