"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Clock3, UserX, Users, CalendarDays, ArrowDown, ArrowRight, UserRound, CarFront, Wrench, ShieldCheck, Fuel, BookOpen } from "lucide-react";
import type { LandingContent } from "@/content/uz";

gsap.registerPlugin(useGSAP);

type SceneKind = LandingContent["roles"]["tabs"][number]["scene"] | "leads" | "fleet" | "education";
const students = ["F. Saidova", "R. Ismoilov", "S. Abdullayeva", "A. Istomov"];
const attendanceIcons = [Check, Check, Clock3, UserX];

export default function ProductScene({ kind, content }: { kind: SceneKind; content: LandingContent["scenes"] }) {
  const root = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "playing" | "paused" | "complete">("static");

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ animate: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (context, childSafe) => {
      if (!context.conditions?.animate || !childSafe) { setState("static"); return; }
      const safe = childSafe as ReturnType<typeof useGSAP>["contextSafe"];
      let active = true;
      const paths = element.querySelectorAll<SVGPathElement>("[data-scene-path]");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      const sequence = gsap.timeline({
        paused: true,
        onStart: safe(() => { if (active) setState("playing"); }),
        onComplete: safe(() => { if (active) setState("complete"); }),
      });
      sequence.from(element.querySelectorAll("[data-scene-node]"), {
        x: kind === "registrar" ? -14 : kind === "accountant" ? 14 : 0,
        y: kind === "teacher" ? 6 : 0,
        duration: 0.35, stagger: 0.07, ease: "power3.out", clearProps: "transform",
      });
      if (paths.length) sequence.to(paths, { strokeDashoffset: 0, duration: 0.65, stagger: 0.08, ease: "power2.inOut" }, 0.15);
      const bars = element.querySelectorAll("[data-scene-bar]");
      if (bars.length) sequence.from(bars, { scaleX: 0, transformOrigin: "left center", duration: 0.65, stagger: 0.08, ease: "power3.out", clearProps: "transform" }, 0.65);
      const marks = element.querySelectorAll("[data-scene-mark]");
      if (marks.length) sequence.from(marks, { scale: 0.6, rotation: -20, duration: 0.3, stagger: 0.12, ease: "power3.out", clearProps: "transform" }, 0.5);
      sequence.fromTo(element.querySelector("[data-scene-focus]"),
        { boxShadow: "inset 0 0 0 2px rgba(36,88,217,0)" },
        { boxShadow: "inset 0 0 0 2px rgba(36,88,217,.5)", duration: 0.25, repeat: 1, yoyo: true, clearProps: "boxShadow" }, 1.2);
      let visible = false;
      const syncPlayback = safe(() => {
        if (!active || sequence.progress() === 1) return;
        if (visible && !document.hidden) { sequence.play(); setState("playing"); }
        else { sequence.pause(); setState("paused"); }
      });
      const observer = new IntersectionObserver(safe(([entry]: IntersectionObserverEntry[]) => { visible = entry.isIntersecting; syncPlayback(); }), { threshold: 0.2 });
      observer.observe(element);
      document.addEventListener("visibilitychange", syncPlayback);
      return () => {
        active = false;
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        setState("static");
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [kind, content], revertOnUpdate: true });

  const data = content[kind];
  return (
    <div ref={root} className={`product-scene scene-${kind}`} data-product-scene={kind} data-scene-state={state} role="group" aria-label={data.title}>
      <div className="scene-heading"><strong>{data.title}</strong><span className="scene-example">{content.sampleLabel}</span></div>

      {kind === "director" && <>
        <p className="scene-period">{content.director.period}</p>
        <dl className="scene-totals">
          <div data-scene-node><dt>{content.director.revenue}</dt><dd>18 400 000 <small>{content.currency}</small></dd></div>
          <div data-scene-node><dt>{content.director.debt}</dt><dd>6 200 000 <small>{content.currency}</small></dd></div>
        </dl>
        <svg className="scene-routes" viewBox="0 0 600 72" preserveAspectRatio="none" fill="none" aria-hidden="true">
          {[100, 300, 500].map((x) => <g key={x}><path d={`M300 4 C300 38 ${x} 32 ${x} 66`} className="scene-route-base" /><path d={`M300 4 C300 38 ${x} 32 ${x} 66`} data-scene-path className="scene-route" /><circle cx={x} cy="66" r="4" className="scene-endpoint" /></g>)}
        </svg>
        <div className="scene-branches" data-scene-focus>
          {["8 400 000", "6 000 000", "4 000 000"].map((value, index) => <div key={value}>
            <span>{content.director.branches[index]}</span><strong>{value}</strong>
            <div className="scene-bar-track" aria-hidden="true"><i data-scene-bar style={{ width: `${[100, 71.43, 47.62][index]}%` }} /></div>
          </div>)}
        </div>
        <p className="scene-note">{content.director.branchCaption}</p>
      </>}

      {kind === "registrar" && <>
        <p className="scene-period">{content.registrar.students}</p>
        <ul className="scene-students">
          {students.slice(0, 3).map((name, index) => <li key={name} data-scene-node><span className="scene-avatar" aria-hidden="true">{name[0]}</span><strong>{name}</strong><span className="scene-student-number">0{index + 1}</span></li>)}
        </ul>
        <svg className="scene-routes" viewBox="0 0 600 72" preserveAspectRatio="none" fill="none" aria-hidden="true">
          {[100, 300, 500].map((x) => <g key={x}><path d={`M${x} 4 C${x} 38 300 32 300 66`} className="scene-route-base" /><path d={`M${x} 4 C${x} 38 300 32 300 66`} data-scene-path className="scene-route" /></g>)}
        </svg>
        <div className="scene-placement" data-scene-focus>
          <div><Users size={22} data-scene-mark aria-hidden="true" /><span>{content.registrar.group}</span><strong>T-25</strong></div>
          <ArrowDown className="scene-placement-arrow" size={20} aria-hidden="true" />
          <div><CalendarDays size={22} data-scene-mark aria-hidden="true" /><span>{content.registrar.schedule}</span><strong>14:00</strong></div>
        </div>
        <p className="scene-note">{content.registrar.lesson}</p>
      </>}

      {kind === "teacher" && <>
        <div className="scene-lesson" data-scene-node><CalendarDays size={24} aria-hidden="true" /><strong>T-25 · 14:00</strong><span>{content.teacher.lesson}</span></div>
        <ul className="scene-attendance">
          {students.map((name, index) => {
            const Icon = attendanceIcons[index];
            return <li key={name} data-scene-node><strong>{name}</strong><span className={`scene-status scene-status-${index}`}><Icon size={18} data-scene-mark aria-hidden="true" />{content.teacher.statuses[index]}</span></li>;
          })}
        </ul>
        <div className="scene-attendance-total" data-scene-focus><Check size={22} aria-hidden="true" /><strong>4 / 4</strong><span>{content.teacher.marked}</span></div>
      </>}

      {kind === "accountant" && <>
        <ul className="scene-expenses">
          {["2 800 000", "2 000 000"].map((value, index) => <li key={value} data-scene-node><span>{content.accountant.categories[index]}</span><strong>{value} <small>{content.currency}</small></strong></li>)}
        </ul>
        <div className="scene-expense-total" data-scene-node><span>{content.accountant.expenses}</span><strong>4 800 000 <small>{content.currency}</small></strong></div>
        <svg className="scene-routes" viewBox="0 0 600 72" preserveAspectRatio="none" fill="none" aria-hidden="true">
          {[150, 450].map((x) => <g key={x}><path d={`M300 4 C300 40 ${x} 30 ${x} 66`} className="scene-route-base" /><path d={`M300 4 C300 40 ${x} 30 ${x} 66`} data-scene-path className="scene-route" /></g>)}
        </svg>
        <dl className="scene-payment-split" data-scene-focus>
          <div><dt><Check size={17} data-scene-mark aria-hidden="true" />{content.accountant.paid}</dt><dd>3 200 000</dd></div>
          <div><dt><Clock3 size={17} data-scene-mark aria-hidden="true" />{content.accountant.remaining}</dt><dd>1 600 000</dd></div>
        </dl>
        <div className="scene-split-bar" aria-hidden="true"><i data-scene-bar /><i data-scene-bar /></div>
      </>}
      {kind === "leads" && <>
        <ol className="scene-pipeline">
          {content.leads.stages.map((stage, index) => <li key={stage} data-scene-node><strong>{stage}</strong><span>{[12, 7, 4, 2][index]}</span><i aria-hidden="true" /></li>)}
        </ol>
        <div className="scene-lead-detail" data-scene-focus>
          <strong>F. Saidova</strong>
          <dl><div><dt>{content.leads.ownerLabel}</dt><dd><UserRound size={15} aria-hidden="true" />N. Yuldasheva</dd></div><div><dt>{content.leads.sourceLabel}</dt><dd>{content.leads.sourceValue}</dd></div><div><dt>{content.leads.followupLabel}</dt><dd><Clock3 size={15} data-scene-mark aria-hidden="true" />{content.leads.followupValue}</dd></div></dl>
        </div>
        <svg className="scene-conversion-route" viewBox="0 0 360 40" fill="none" aria-hidden="true"><path d="M24 2 V12 Q24 26 40 26 H320" className="scene-route-base" /><path d="M24 2 V12 Q24 26 40 26 H320" data-scene-path className="scene-route" /></svg>
        <div className="scene-conversion"><Check size={18} data-scene-mark aria-hidden="true" /><strong>{content.leads.conversionLabel}</strong><ArrowRight size={18} aria-hidden="true" /></div>
      </>}

      {kind === "fleet" && <>
        <ul className="scene-vehicles">{["Cobalt", "Nexia 3"].map((model, index) => <li key={model} data-scene-node><CarFront size={24} aria-hidden="true" /><div><strong>{model}</strong><span className="scene-plate">{["01 A 000 AA", "01 B 000 BB"][index]}</span></div><span className={`scene-vehicle-status vehicle-status-${index}`}>{content.fleet.statuses[index]}</span></li>)}</ul>
        <div className="scene-vehicle-assignment"><UserRound size={18} aria-hidden="true" /><span>{content.fleet.instructorLabel}</span><strong>A. Istomov</strong></div>
        <div className="scene-maintenance" data-scene-focus><Wrench size={20} data-scene-mark aria-hidden="true" /><div><span>{content.fleet.maintenanceLabel}</span><strong>{content.fleet.maintenanceValue}</strong></div></div>
        <ul className="scene-vehicle-docs"><li><ShieldCheck size={17} data-scene-mark aria-hidden="true" />{content.fleet.insuranceLabel}</li><li><Fuel size={17} aria-hidden="true" />{content.fleet.fuelLabel}</li></ul>
      </>}

      {kind === "education" && <>
        <ul className="scene-timetable">{content.education.days.map((day, index) => <li key={day} data-scene-node><span>{day}</span><strong>{["14:00", "10:00"][index]}</strong><div><BookOpen size={18} aria-hidden="true" /><strong>{index ? content.education.practice : content.education.theory}</strong><span>T-25 · {index ? "A. Istomov" : "N. Yuldasheva"}</span></div></li>)}</ul>
        <div className="scene-school-test" data-scene-focus><strong>{content.education.testTitle}</strong><dl>{[content.education.questionLabel, content.education.timeLabel, content.education.thresholdLabel].map((label, index) => <div key={label} data-scene-node><dt>{label}</dt><dd>{["20", "20", "90%"][index]}</dd></div>)}</dl><p><Check size={17} data-scene-mark aria-hidden="true" />{content.education.groupLabel} <strong>T-25</strong></p></div>
        <p className="scene-note">{content.education.internalNote}</p>
      </>}

    </div>
  );
}
