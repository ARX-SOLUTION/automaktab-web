"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Send, Check, Clock3 } from "lucide-react";
import type { LandingContent } from "@/content/uz";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MorningReportWidget({ content }: { content: LandingContent["morningReport"] }) {
  const root = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "playing" | "paused" | "complete">("static");
  const format = new Intl.NumberFormat(content.numberLocale === "uz-UZ" ? "fr-FR" : content.numberLocale);
  const formatNumber = (value: number) => format.format(value).replace(/[\u00A0\u202F]/g, " ");
  const revenue = content.branches.reduce((total, branch) => total + branch.revenue, 0);
  const students = content.branches.reduce((total, branch) => total + branch.students, 0);

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (_context, childSafe) => {
      if (!childSafe) return;
      const safe = childSafe as ReturnType<typeof useGSAP>["contextSafe"];
      let active = true;
      let visible = false;
      const paths = element.querySelectorAll<SVGPathElement>("[data-report-path]");
      paths.forEach((path) => { const length = path.getTotalLength(); gsap.set(path, { strokeDasharray: length, strokeDashoffset: length }); });
      const sequence = gsap.timeline({ paused: true, onStart: safe(() => { if (active) setState("playing"); }), onComplete: safe(() => { if (active) setState("complete"); }) });
      sequence
        .from(element.querySelectorAll("[data-report-branch]"), { clipPath: "inset(0 0 0 8%)", x: 6, duration: 0.35, stagger: 0.12, ease: "power3.out", clearProps: "clipPath,transform" })
        .to(paths, { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, 0.35)
        .from(element.querySelector("[data-report-total]"), { clipPath: "inset(0 0 12% 0 round 14px)", y: 4, duration: 0.4, ease: "power3.out", clearProps: "clipPath,transform" }, 0.75);
      const sync = safe(() => {
        if (!active || sequence.progress() === 1) return;
        if (visible && !document.hidden) { sequence.play(); setState("playing"); }
        else { sequence.pause(); setState("paused"); }
      });
      ScrollTrigger.create({ trigger: element, start: "top 80%", onEnter: sync });
      const observer = new IntersectionObserver(safe(([entry]: IntersectionObserverEntry[]) => { visible = entry.isIntersecting; sync(); }), { threshold: 0.2 });
      observer.observe(element);
      document.addEventListener("visibilitychange", sync);
      return () => { active = false; observer.disconnect(); document.removeEventListener("visibilitychange", sync); setState("static"); };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [content], revertOnUpdate: true });

  return (
    <section ref={root} id="morning-report" data-report-state={state} className="report-section bg-paper" aria-labelledby="morning-report-heading">
      <div className="landing-container report-layout">
        <div className="report-intro">
          <h2 id="morning-report-heading" className="m-0 font-display font-extrabold text-ink [text-wrap:balance]">{content.title}<span className="text-forest-600">{content.titleAccent}</span></h2>
          <p>{content.description}</p>
          <ul>{content.bullets.map((bullet) => <li key={bullet}><Check size={20} aria-hidden="true" />{bullet}</li>)}</ul>
          <a href="#tariflar" className="action-secondary">{content.ctaButton}</a>
          <span className="report-trial-note">{content.trialNote}</span>
        </div>
        <div className="report-example">
          <div className="report-bot"><span className="report-bot-icon"><Send size={24} aria-hidden="true" /></span><div><strong>{content.botTitle}</strong><span>{content.botSub}</span></div><span className="report-clock"><Clock3 size={15} aria-hidden="true" />{content.timeLabel}</span></div>
          <div className="report-message">
            <div className="report-message-heading"><strong>{content.headerTitle}</strong><span>{content.dateLabel}</span></div>
            <table className="report-branches">
              <thead><tr><th scope="col">{content.branchLabel}</th><th scope="col">{content.revenueCollectedLabel}</th><th scope="col">{content.newStudentsLabel}</th></tr></thead>
              <tbody>{content.branches.map((branch, index) => <tr key={branch.name} data-report-branch={index} data-revenue={branch.revenue} data-students={branch.students}><th scope="row">{branch.name}</th><td>{formatNumber(branch.revenue)}<small>{content.currency}</small></td><td>{formatNumber(branch.students)}</td></tr>)}</tbody>
            </table>
            <svg className="report-routes" viewBox="0 0 360 44" fill="none" aria-hidden="true">{[60, 180, 300].map((x) => <g key={x}><path d={`M${x} 2 C${x} 24 180 20 180 40`} className="scene-route-base" /><path d={`M${x} 2 C${x} 24 180 20 180 40`} data-report-path className="scene-route" /></g>)}</svg>
            <div data-report-total data-report-total-revenue={revenue} data-report-total-students={students} className="report-total">
              <strong>{content.totalLabel}</strong>
              <dl><div><dt>{content.revenueCollectedLabel}</dt><dd>{formatNumber(revenue)} <small>{content.currency}</small></dd></div><div><dt>{content.newStudentsLabel}</dt><dd>{formatNumber(students)}</dd></div></dl>
            </div>
          </div>
          <p className="report-sample-caption">{content.sampleCaption}</p>
        </div>
      </div>
    </section>
  );
}
