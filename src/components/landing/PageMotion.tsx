"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP((_context, contextSafe) => {
    const element = root.current;
    if (!element || !contextSafe) return;
    const mediaEvents = gsap as typeof gsap & {
      addEventListener(event: "matchMediaInit" | "matchMedia", callback: () => void): void;
      removeEventListener(event: "matchMediaInit" | "matchMedia", callback: () => void): void;
    };
    let active = true;
    let frame = 0;
    let mediaChange = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let rememberedMotion = motion.matches;
    let reading: { chapter: HTMLElement | null; top: number; scroll: number } | null = null;
    const remember = () => {
      // CSS and browser scroll anchoring can change before GSAP's media event arrives.
      if (!active || motion.matches !== rememberedMotion || element.dataset.motionChanging === "true") return;
      const chapter = Array.from(element.querySelectorAll<HTMLElement>(".story-chapter")).find((node) => {
        const bounds = node.getBoundingClientRect();
        return bounds.top <= innerHeight * 0.45 && bounds.bottom > innerHeight * 0.45;
      }) ?? null;
      reading = { chapter, top: chapter?.getBoundingClientRect().top ?? 0, scroll: window.scrollY };
    };
    // Keep the chapter at the same viewport position while GSAP rebuilds media contexts.
    const beginMediaChange = () => {
      if (!active) return;
      cancelAnimationFrame(frame);
      mediaChange++;
      element.dataset.motionChanging = "true";
    };
    const finishMediaChange = () => {
      cancelAnimationFrame(frame);
      const change = mediaChange;
      frame = requestAnimationFrame(contextSafe(() => {
        if (!active || change !== mediaChange) return;
        // Newly visible examples can load fonts; measure only after their layout settles.
        element.getBoundingClientRect();
        void document.fonts.ready.then(contextSafe(() => {
          if (!active || change !== mediaChange) return;
          frame = requestAnimationFrame(contextSafe(() => {
            if (!active || change !== mediaChange) return;
            ScrollTrigger.refresh();
            frame = requestAnimationFrame(contextSafe(() => {
              if (!active || change !== mediaChange) return;
              const top = reading?.chapter?.isConnected
                ? window.scrollY + reading.chapter.getBoundingClientRect().top - reading.top
                : reading?.scroll ?? window.scrollY;
              window.scrollTo({ top, behavior: "instant" });
              ScrollTrigger.update();
              rememberedMotion = motion.matches;
              delete element.dataset.motionChanging;
              remember();
            }));
          }));
        }));
      }));
    };
    remember();
    window.addEventListener("scroll", remember, { passive: true });
    ScrollTrigger.addEventListener("refresh", remember);
    mediaEvents.addEventListener("matchMediaInit", beginMediaChange);
    mediaEvents.addEventListener("matchMedia", finishMediaChange);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(element.querySelectorAll("[data-hero-item]"), {
        y: 18,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        clearProps: "transform",
      });
      gsap.from(element.querySelector("[data-hero-proof]"), {
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform",
      });
    });
    // Startup refreshes interrupt the browser's smooth fragment scroll.
    const initialHash = window.location.hash;
    const anchor = initialHash ? document.getElementById(initialHash.slice(1)) : null;
    let anchorPending = !!anchor && element.contains(anchor);
    let anchorFrame = 0;
    const intentEvents = ["wheel", "touchstart", "pointerdown", "keydown", "hashchange"] as const;
    const cancelAnchor = () => {
      anchorPending = false;
      cancelAnimationFrame(anchorFrame);
      for (const event of intentEvents) window.removeEventListener(event, cancelAnchor);
      window.removeEventListener("load", settleAnchor);
      motion.removeEventListener("change", cancelAnchor);
    };
    const settleAnchor = contextSafe(() => {
      if (!active || !anchorPending || window.location.hash !== initialHash) return;
      element.getBoundingClientRect();
      void document.fonts.ready.then(contextSafe(() => {
        if (!active || !anchorPending || window.location.hash !== initialHash) return;
        anchorFrame = requestAnimationFrame(contextSafe(() => {
          if (!active || !anchorPending) return;
          ScrollTrigger.refresh();
          anchorFrame = requestAnimationFrame(contextSafe(() => {
            if (!active || !anchorPending || !anchor?.isConnected || window.location.hash !== initialHash) return;
            cancelAnchor();
            anchor.scrollIntoView({ block: "start", behavior: "instant" });
            ScrollTrigger.update();
            remember();
          }));
        }));
      }));
    });
    if (anchorPending) {
      for (const event of intentEvents) window.addEventListener(event, cancelAnchor, { passive: true });
      motion.addEventListener("change", cancelAnchor);
      if (document.readyState === "complete") settleAnchor();
      else window.addEventListener("load", settleAnchor, { once: true });
    }
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      cancelAnchor();
      window.removeEventListener("scroll", remember);
      ScrollTrigger.removeEventListener("refresh", remember);
      mediaEvents.removeEventListener("matchMediaInit", beginMediaChange);
      mediaEvents.removeEventListener("matchMedia", finishMediaChange);
      delete element.dataset.motionChanging;
      media.revert();
    };
  }, { scope: root });

  return <main id="main-content" ref={root} className="flex-1 min-w-0" tabIndex={-1}>{children}</main>;
}
