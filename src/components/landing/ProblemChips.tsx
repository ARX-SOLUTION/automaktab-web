"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { Send, Table2, FileText, Wallet, ClipboardCheck, CalendarDays, Layers, Check } from "lucide-react";
import type { LandingContent } from "@/content/uz";

gsap.registerPlugin(MotionPathPlugin, useGSAP);

const sourceIcons = [Send, Table2, FileText];
const outcomeIcons = [Wallet, ClipboardCheck, CalendarDays];
const diagrams = [
  { className: "flow-lines-desktop", viewBox: "0 0 140 336", paths: [
    "M0 58 C70 58 70 168 140 168", "M0 168 H140", "M0 278 C70 278 70 168 140 168",
  ] },
  { className: "flow-lines-mobile", viewBox: "0 0 360 60", paths: [
    "M60 0 C60 30 180 30 180 60", "M180 0 V60", "M300 0 C300 30 180 30 180 60",
  ] },
];

export default function ProblemChips({ content }: { content: LandingContent["problem"] }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = root.current;
    const diagram = stage.current;
    if (!element || !diagram) return;
    const select = gsap.utils.selector(element);
    const media = gsap.matchMedia();
    media.add({ animate: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (context, childSafe) => {
      element.dataset.flowState = "static";
      element.dataset.flowPhase = "static";
      element.dataset.flowCycle = "0";
      if (!context.conditions?.animate || !childSafe) return;
      const safe = childSafe as ReturnType<typeof useGSAP>["contextSafe"];
      const sources = select("[data-flow-source]") as HTMLLIElement[];
      const outputs = select("[data-flow-output]") as HTMLLIElement[];
      const routes = gsap.utils.toArray<SVGPathElement>("[data-flow-path]", element);
      const packets = gsap.utils.toArray<SVGCircleElement>(".flow-packet", element);
      const checks = gsap.utils.toArray<SVGSVGElement>(".flow-check", element);
      const checkPaths = gsap.utils.toArray<SVGPathElement>(".flow-check path", element);
      const header = select(".flow-platform-header")[0] as HTMLElement;
      const mark = select(".flow-platform-mark")[0] as HTMLElement;
      const inlet = select(".flow-inlet")[0] as HTMLElement;
      const one = select(".flow-one")[0] as HTMLElement;
      const colors = getComputedStyle(element);
      const blue = colors.getPropertyValue("--blue").trim();
      const lime = colors.getPropertyValue("--c-amber-500").trim();
      const paper = colors.getPropertyValue("--c-paper").trim();
      const quiet = colors.getPropertyValue("--c-sand-100").trim();
      const border = colors.getPropertyValue("--c-sand-300").trim();
      const startAt = gsap.utils.distribute({ base: 0.2, each: 0.82 });
      const sourceIndex = gsap.utils.wrap(0, sources.length);
      let visible = false;
      let active = true;
      let hovered = window.matchMedia("(hover: hover)").matches && diagram.matches(":hover");
      let focused = diagram.contains(document.activeElement);
      let cycle = 0;
      const phase = (name: string) => safe(() => { if (active) element.dataset.flowPhase = name; });

      gsap.set(routes, {
        strokeDasharray: (_index, path: SVGPathElement) => path.getTotalLength(),
        strokeDashoffset: (_index, path: SVGPathElement) => path.getTotalLength(),
        opacity: 0,
      });
      gsap.set(packets, { opacity: 0 });
      gsap.set(checks, { backgroundColor: paper, transformOrigin: "50% 50%" });
      gsap.set(checkPaths, {
        strokeDasharray: (_index, path: SVGPathElement) => path.getTotalLength(),
        strokeDashoffset: (_index, path: SVGPathElement) => path.getTotalLength(),
      });
      gsap.set([mark, inlet, one], { transformOrigin: "50% 50%" });
      const sequence = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat: safe(() => { if (active) element.dataset.flowCycle = String(++cycle); }),
      });

      sources.forEach((source, index) => {
        const at = Number(startAt(index, source, sources));
        sequence.call(phase(`source-${index + 1}`), undefined, at)
          .to(source, { borderColor: blue, backgroundColor: quiet, duration: 0.28, ease: "power3.out" }, at)
          .to(source.querySelector(".flow-icon"), { scale: 1.08, duration: 0.22, ease: "power3.out" }, at)
          .to(source.querySelector(".flow-icon"), { scale: 1, duration: 0.3, ease: "power3.out" }, at + 0.3);
      });
      // Both layouts share each beat; SVG coordinates keep packets on their routes during resizing.
      routes.forEach((route, index) => {
        const packet = packets[index];
        if (!packet) return;
        const source = sourceIndex(index);
        const at = Number(startAt(source, sources[source], sources)) + 0.24;
        sequence.to(route, { strokeDashoffset: 0, opacity: 1, duration: 0.98, ease: "power2.inOut" }, at)
          .to(packet, { opacity: 1, duration: 0.12 }, at)
          .to(packet, { motionPath: { path: route.getAttribute("d")!, autoRotate: false }, duration: 0.98, ease: "power2.inOut" }, at)
          .to(packet, { opacity: 0, duration: 0.12 }, at + 0.91);
        if (index < sources.length) {
          sequence.to(inlet, { scale: 1.4, duration: 0.14, ease: "power3.out" }, at + 0.88)
            .to(inlet, { scale: 1, duration: 0.22, ease: "power3.out" }, at + 1.02);
        }
      });

      sequence.call(phase("resolve"), undefined, 3.14)
        .to(header, { backgroundColor: paper, boxShadow: `inset 0 -2px 0 ${blue}`, duration: 0.4, ease: "power3.out" }, 3.14)
        .fromTo(mark, { scale: 0.92, rotation: -7 }, { scale: 1, rotation: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, 3.14)
        .to(one, { scale: 1.1, duration: 0.18, ease: "power3.out" }, 3.3)
        .to(one, { scale: 1, duration: 0.24, ease: "power3.out" }, 3.48);
      outputs.forEach((output, index) => {
        const at = 3.54 + index * 0.28;
        sequence.call(phase(`confirm-${index + 1}`), undefined, at)
          .to(output.querySelector(".flow-icon"), { scale: 1.07, duration: 0.18, ease: "power3.out" }, at)
          .to(output.querySelector(".flow-icon"), { scale: 1, duration: 0.24, ease: "power3.out" }, at + 0.18)
          .to(checks[index], { backgroundColor: lime, duration: 0.24, ease: "power3.out" }, at)
          .fromTo(checks[index], { scale: 0.86 }, { scale: 1, duration: 0.3, ease: "power3.out", immediateRender: false }, at)
          .to(checkPaths[index], { strokeDashoffset: 0, duration: 0.3, ease: "power2.out" }, at + 0.08);
      });
      sequence.call(phase("hold"), undefined, 4.54)
        .call(phase("reset"), undefined, 7.8)
        .to(routes, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 7.8)
        .to(sources, { borderColor: border, backgroundColor: paper, duration: 0.5, ease: "power2.inOut" }, 7.8)
        .to(header, { backgroundColor: quiet, boxShadow: `inset 0 -1px 0 ${border}`, duration: 0.5, ease: "power2.inOut" }, 7.8)
        .to(checks, { backgroundColor: paper, duration: 0.5, ease: "power2.inOut" }, 7.8)
        .to(checkPaths, { strokeDashoffset: (_index, path: SVGPathElement) => path.getTotalLength(), duration: 0.4, ease: "power2.inOut" }, 7.8)
        .set(routes, { strokeDashoffset: (_index, path: SVGPathElement) => path.getTotalLength() }, 8.3)
        .set(packets, { opacity: 0 }, 8.5);

      const syncPlayback = safe(() => {
        if (!active) return;
        const playing = visible && !document.hidden && !hovered && !focused;
        sequence.paused(!playing);
        element.dataset.flowState = playing ? "playing" : "paused";
      });
      const onEnter = safe((event: PointerEvent) => { if (event.pointerType !== "touch") { hovered = true; syncPlayback(); } });
      const onLeave = safe(() => { hovered = false; syncPlayback(); });
      const onFocus = safe(() => { focused = true; syncPlayback(); });
      const onBlur = safe((event: FocusEvent) => { focused = event.relatedTarget instanceof Node && diagram.contains(event.relatedTarget); syncPlayback(); });
      const observer = new IntersectionObserver(safe(([entry]: IntersectionObserverEntry[]) => {
        if (!active) return;
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        syncPlayback();
      }), { threshold: 0.2 });
      observer.observe(diagram);
      document.addEventListener("visibilitychange", syncPlayback);
      diagram.addEventListener("pointerenter", onEnter);
      diagram.addEventListener("pointerleave", onLeave);
      diagram.addEventListener("focusin", onFocus);
      diagram.addEventListener("focusout", onBlur);
      return () => {
        active = false;
        sequence.pause();
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        diagram.removeEventListener("pointerenter", onEnter);
        diagram.removeEventListener("pointerleave", onLeave);
        diagram.removeEventListener("focusin", onFocus);
        diagram.removeEventListener("focusout", onBlur);
        element.dataset.flowState = "static";
        element.dataset.flowPhase = "static";
        element.dataset.flowCycle = "0";
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [content], revertOnUpdate: true });

  return (
    <section id="platform-flow" ref={root} data-flow-state="static" data-flow-phase="static" data-flow-cycle="0" className="platform-flow" aria-labelledby="problem-heading">
      <h2 id="problem-heading" className="flow-heading">{content.title}</h2>
      <div className="flow-labels"><span>{content.sourceLabel}</span><span>{content.resultLabel}</span></div>
      <div ref={stage} className="flow-stage" tabIndex={0} role="group" aria-labelledby="problem-heading">
        {diagrams.map((diagram) => (
          <svg key={diagram.className} className={`flow-lines ${diagram.className}`} viewBox={diagram.viewBox} preserveAspectRatio="none" fill="none" aria-hidden="true">
            {diagram.paths.map((d) => <g key={d}><path d={d} className="flow-line-base" /><path d={d} data-flow-path="in" className="flow-line-active" /><circle r="4" className="flow-packet" /></g>)}
          </svg>
        ))}
        <ul className="flow-column flow-sources" aria-label={content.sourceLabel}>
          {content.sources.map((source, index) => {
            const Icon = sourceIcons[index];
            return <li key={source.title} data-flow-source className={`flow-node flow-source flow-source-${index}`}>
              <span className="flow-icon"><Icon size={24} strokeWidth={2.2} aria-hidden="true" /></span>
              <span className="flow-node-copy"><strong>{source.title}</strong><span>{source.detail}</span></span>
            </li>;
          })}
        </ul>
        <div data-flow-platform className="flow-platform" role="group" aria-label={content.platformLabel}>
          <span className="flow-inlet" aria-hidden="true" />
          <header className="flow-platform-header">
            <span className="flow-platform-mark"><Layers size={27} strokeWidth={2.2} aria-hidden="true" /></span>
            <span className="flow-brand"><strong>automaktab<span>.uz</span></strong><span>{content.platformLabel}</span></span>
            <span className="flow-one" aria-hidden="true">1</span>
          </header>
          <ul className="flow-column flow-outcomes">
            {content.outcomes.map((outcome, index) => {
              const Icon = outcomeIcons[index];
              return <li key={outcome.title} data-flow-output className="flow-output">
                <span className="flow-icon"><Icon size={23} strokeWidth={2.2} aria-hidden="true" /></span>
                <span className="flow-node-copy"><strong>{outcome.title}</strong><span>{outcome.detail}</span></span>
                <Check size={16} className="flow-check" aria-hidden="true" />
              </li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
