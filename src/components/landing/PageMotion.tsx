"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip, ScrollTrigger, SplitText, useGSAP);

export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const title = element.querySelector<HTMLElement>("[data-hero-title]");
        if (!title) return;

        const split = SplitText.create(title, {
          type: "words",
          wordsClass: "hero-word",
          aria: "auto",
        });
        const eyebrow = element.querySelector("[data-hero-eyebrow]");
        const items = element.querySelectorAll("[data-hero-item]");
        const proof = element.querySelector("[data-hero-proof]");

        const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
        hero
          .from(eyebrow, { opacity: 0, y: 12, duration: 0.45 })
          .from(
            split.words,
            {
              opacity: 0,
              yPercent: 105,
              rotateX: -28,
              transformOrigin: "50% 100%",
              duration: 0.8,
              stagger: 0.045,
              ease: "power4.out",
            },
            0.08,
          )
          .from(
            items,
            { opacity: 0, y: 16, duration: 0.55, stagger: 0.09 },
            0.32,
          )
          .from(
            proof,
            {
              opacity: 0,
              y: 34,
              rotate: 0.8,
              scale: 0.985,
              duration: 0.9,
              ease: "power4.out",
            },
            0.42,
          );

        return () => split.revert();
      });

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pin = element.querySelector<HTMLElement>("[data-proof-pin]");
          const frames = gsap.utils.toArray<HTMLElement>(
            "[data-proof-frame]",
            element,
          );
          const steps = gsap.utils.toArray<HTMLElement>(
            "[data-proof-step]",
            element,
          );
          const targets = gsap.utils.toArray<HTMLElement>(
            "[data-proof-target]",
            element,
          );
          const signal = element.querySelector<HTMLElement>(
            "[data-proof-signal]",
          );

          if (
            !pin ||
            frames.length !== 3 ||
            steps.length !== 3 ||
            targets.length !== 3 ||
            !signal
          ) {
            return;
          }

          gsap.set(frames.slice(1), {
            autoAlpha: 0,
            yPercent: 4,
            scale: 0.985,
          });

          let activeIndex = 0;
          let activeFlip: gsap.core.Animation | undefined;

          const activate = (nextIndex: number) => {
            if (nextIndex === activeIndex) return;
            activeFlip?.kill();

            const state = Flip.getState(signal);
            targets[nextIndex].appendChild(signal);
            activeFlip = Flip.from(state, {
              absolute: true,
              duration: 0.42,
              ease: "power3.inOut",
            });

            steps.forEach((step, index) => {
              step.dataset.active = String(index === nextIndex);
            });
            frames.forEach((frame, index) => {
              frame.dataset.active = String(index === nextIndex);
            });
            activeIndex = nextIndex;
          };

          const proofTimeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => activate(Math.min(2, Math.round(self.progress * 2))),
            },
          });

          proofTimeline
            .to(frames[0], { autoAlpha: 0, yPercent: -3, scale: 0.99, duration: 0.3 }, 0.55)
            .to(frames[1], { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.38 }, 0.66)
            .to(frames[1], { autoAlpha: 0, yPercent: -3, scale: 0.99, duration: 0.3 }, 1.55)
            .to(frames[2], { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.38 }, 1.66);

          return () => {
            activeFlip?.kill();
            targets[0].appendChild(signal);
            steps.forEach((step, index) => {
              step.dataset.active = String(index === 0);
            });
            frames.forEach((frame, index) => {
              frame.dataset.active = String(index === 0);
            });
          };
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main id="main-content" ref={root}>
      {children}
    </main>
  );
}
