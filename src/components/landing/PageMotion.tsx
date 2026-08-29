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
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroItems = el.querySelectorAll("[data-hero-item]");
        if (heroItems.length) {
          gsap.from(heroItems, {
            opacity: 0,
            y: 20,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "opacity,transform",
          });
        }

        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", el)
          .forEach((section) => {
            const items =
              section.querySelectorAll<HTMLElement>("[data-reveal-item]");
            const targets = items.length ? Array.from(items) : [section];
            gsap.from(targets, {
              opacity: 0,
              y: 24,
              duration: 0.6,
              ease: "power3.out",
              stagger: items.length ? 0.06 : 0,
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                once: true,
              },
            });
          });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main id="main-content" ref={root}>
      {children}
    </main>
  );
}
