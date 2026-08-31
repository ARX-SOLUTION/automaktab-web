"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Data-attribute contract (all optional; markup degrades to static):
//   [data-hero-word]      single word of the hero title → masked rise
//   [data-hero-item]      hero badge / sub / CTA → fade-rise stagger
//   [data-mock]           product mock → settle (rotate + rise)
//   [data-chart-line]     SVG path (pathLength="1") → draw after mock lands
//   [data-count-to="N"]   element textContent → counts 0..N, grouped digits
//   [data-road-bed]      SVG path (pathLength="1") → draws after load
//   [data-road-dash]     SVG path → travelling dashes
//   [data-road-car]      SVG <g> → travels along [data-road-bed]
//   [data-reveal]         section; its [data-reveal-item]s reveal on scroll
//   [data-reveal-dir]     "up" (default) | "left" | "right" | "zoom"
//   [data-scroll-signal]  amber progress line drawing with page scroll

function formatCount(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

export default function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Hero: title words rise in with a rolling stagger ──────────────
        const words = el.querySelectorAll("[data-hero-word]");
        if (words.length) {
          gsap.from(words, {
            y: "0.55em",
            rotate: 3,
            opacity: 0,
            duration: 0.85,
            stagger: 0.045,
            ease: "power4.out",
            clearProps: "transform,opacity",
          });
        }

        const heroItems = el.querySelectorAll("[data-hero-item]");
        if (heroItems.length) {
          gsap.from(heroItems, {
            opacity: 0,
            y: 18,
            duration: 0.6,
            stagger: 0.09,
            delay: 0.2,
            ease: "power3.out",
            clearProps: "opacity,transform",
          });
        }

        // ── Product mock: settles out of a slight tilt, like a screenshot
        //    being set down on the table. ─────────────────────────────────
        gsap.from("[data-mock]", {
          y: 36,
          rotate: 1.4,
          transformOrigin: "50% 22%",
          opacity: 0,
          duration: 0.95,
          delay: 0.45,
          ease: "power3.out",
          clearProps: "all",
        });

        // ── Dashboard becomes "live": sparkline draws, KPIs count up ─────
        const chartLine = el.querySelector("[data-chart-line]");
        const counts = el.querySelectorAll<HTMLElement>("[data-count-to]");
        if (chartLine || counts.length) {
          const tl = gsap.timeline({ delay: 1.1 });
          if (chartLine) {
            tl.fromTo(
              chartLine,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" },
              0,
            );
          }
          counts.forEach((node) => {
            const target = Number(node.dataset.countTo ?? "0");
            if (!Number.isFinite(target) || target <= 0) return;
            const state = { v: 0 };
            tl.add(
              gsap.to(state, {
                v: target,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  node.textContent = formatCount(state.v);
                },
              }),
              0.15,
            );
          });
        }

        // ── The road: bed draws in, dashes travel, car drives to the mock ──
        const roadLine = el.querySelector("[data-road-bed]");
        const roadDashes = el.querySelector("[data-road-dash]");
        const roadCar = el.querySelector<SVGGElement>("[data-road-car]");
        if (
          roadLine &&
          roadCar &&
          (roadLine as SVGPathElement).getTotalLength() >= 0
        ) {
          const path = roadLine as SVGPathElement;
          const length = path.getTotalLength();
          const carState = { t: 0 };
          gsap.fromTo(
            roadLine,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.2, delay: 0.7, ease: "power2.inOut" },
          );
          if (roadDashes) {
            gsap.fromTo(
              roadDashes,
              { strokeDashoffset: 0 },
              {
                strokeDashoffset: -34,
                repeat: -1,
                duration: 1.1,
                ease: "none",
                delay: 0.9,
              },
            );
          }
          gsap.set(roadCar, {
            opacity: 1,
            delay: 1.15,
          });
          gsap.to(carState, {
            t: 1,
            duration: 1.9,
            delay: 1.15,
            ease: "power2.inOut",
            onUpdate: () => {
              const d = carState.t * length;
              const p = path.getPointAtLength(d);
              const p2 = path.getPointAtLength(Math.min(d + 2, length));
              const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
              gsap.set(roadCar, {
                attr: {
                  transform: `translate(${p.x} ${p.y}) rotate(${angle})`,
                },
              });
            },
          });
        }

        // ── Scroll signal: amber line draws down the right edge ──────────
        const signal = el.querySelector<HTMLElement>("[data-scroll-signal]");
        if (signal) {
          gsap.fromTo(
            signal,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top",
              scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
            },
          );
        }

        // ── Section reveals, direction-aware ─────────────────────────────
        gsap.utils.toArray<HTMLElement>("[data-reveal]", el).forEach((section) => {
          const items = section.querySelectorAll<HTMLElement>(
            "[data-reveal-item]",
          );
          const targets = items.length ? Array.from(items) : [section];
          const dir = section.dataset.revealDir ?? "up";
          const from: gsap.TweenVars = { opacity: 0, duration: 0.7, ease: "power3.out" };
          if (dir === "left") from.x = -40;
          else if (dir === "right") from.x = 40;
          else if (dir === "zoom") from.scale = 0.95;
          else if (dir === "zoomLeft") {
            from.scale = 0.96;
            from.x = -28;
          } else from.y = 28;
          gsap.from(targets, {
            ...from,
            stagger: items.length ? 0.07 : 0,
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
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
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-[3px] lg:block"
      >
        <div className="absolute inset-y-0 right-px w-px bg-border" />
        <div
          data-scroll-signal
          className="absolute inset-0 bg-primary"
        />
      </div>
      {children}
    </main>
  );
}
