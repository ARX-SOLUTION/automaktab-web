"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(
          element.querySelectorAll("[data-hero-title], [data-hero-item]"),
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "all",
          },
        );
        const proof = element.querySelector("[data-hero-proof]");
        if (proof) {
          gsap.fromTo(
            proof,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
          );
          gsap.to(proof.querySelector(".hero-image-frame"), {
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: proof,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stack = element.querySelector<HTMLElement>("[data-card-stack]");
          if (!stack) return;
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-stack-card]",
            stack,
          );
          cards.slice(0, -1).forEach((card, index) => {
            ScrollTrigger.create({
              trigger: card,
              start: "top 24%",
              endTrigger: cards[cards.length - 1],
              end: "top 24%",
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
            gsap.to(card, {
              scale: 0.94,
              opacity: 0.35,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: cards[index + 1],
                start: "top 65%",
                end: "top 24%",
                scrub: true,
              },
            });
          });

          const accordion = element.querySelector(".product-accordion");
          if (!accordion) return;
          const observer = new ResizeObserver(() => ScrollTrigger.refresh());
          observer.observe(accordion);
          return () => observer.disconnect();
        },
      );

      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <main
      id="main-content"
      ref={root}
      className="overflow-x-hidden w-full max-w-full"
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
