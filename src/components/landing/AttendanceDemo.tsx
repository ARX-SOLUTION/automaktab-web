"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LandingContent } from "@/content/uz";
import { track, buildDemoUrl } from "@/lib/analytics";
import StatusButton from "./StatusButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AttendanceDemoProps {
  content: LandingContent["attendanceDemo"];
}

type StatusKey = "keldi" | "kechikdi" | "kelmadi" | "uzrli";

function getTimestamp(): number {
  return Date.now();
}

export default function AttendanceDemo({ content }: AttendanceDemoProps) {
  const root = useRef<HTMLElement>(null);
  const worksheet = useRef<HTMLDivElement>(null);
  const toolbar = useRef<HTMLElement>(null);
  // 6 students attendance state (null if unmarked)
  const [attendance, setAttendance] = useState<Array<StatusKey | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const hasInteractedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  const demoUrl = buildDemoUrl("attendance_demo");

  useGSAP((_context, contextSafe) => {
    const element = root.current;
    const sheet = worksheet.current;
    const header = toolbar.current;
    if (!element || !sheet || !header || !contextSafe) return;
    let active = true;
    let frame = 0;
    sheet.dataset.attendanceReady = "true";
    const offset = () => parseFloat(getComputedStyle(header).getPropertyValue("--attendance-sticky-top"));
    ScrollTrigger.create({
      trigger: sheet,
      start: () => `top ${offset()}px`,
      end: () => `bottom ${offset() + header.offsetHeight}px`,
      toggleClass: { targets: header, className: "is-scrolled" },
      invalidateOnRefresh: true,
    });
    const refresh = contextSafe(() => {
      if (!active) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(contextSafe(() => { if (active) ScrollTrigger.refresh(); }));
    });
    const resize = new ResizeObserver(refresh);
    resize.observe(sheet);
    void document.fonts.ready.then(refresh);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (_context, childSafe) => {
      if (!childSafe) return;
      const safe = childSafe as ReturnType<typeof useGSAP>["contextSafe"];
      let live = true;
      let visible = false;
      const entrance = gsap.timeline({ paused: true }).from(element.querySelectorAll(".attendance-row"), {
        y: 6, duration: 0.32, stagger: 0.035, ease: "power3.out", clearProps: "transform",
      });
      const sync = safe(() => {
        if (!live || entrance.progress() === 1) return;
        if (visible && !document.hidden) entrance.play();
        else entrance.pause();
      });
      const observer = new IntersectionObserver(safe(([entry]: IntersectionObserverEntry[]) => {
        visible = entry.isIntersecting;
        sync();
      }), { threshold: 0.1 });
      observer.observe(sheet);
      document.addEventListener("visibilitychange", sync);
      return () => { live = false; observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
    });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
      media.revert();
      delete sheet.dataset.attendanceReady;
      header.classList.remove("is-scrolled");
    };
  }, { scope: root, dependencies: [content], revertOnUpdate: true });

  // Calculate KPIs
  const counts = {
    keldi: 0,
    kechikdi: 0,
    kelmadi: 0,
    uzrli: 0,
    unmarked: 0,
  };

  attendance.forEach((status) => {
    if (!status) counts.unmarked++;
    else counts[status]++;
  });

  const handleToggle = (index: number, status: StatusKey, allowReset = true) => {
    if (!allowReset && attendance[index] === status) return;
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      startTimeRef.current = getTimestamp();
      track("attendance_interact", { status });
    }

    const next = [...attendance];
    next[index] = allowReset && next[index] === status ? null : status;
    setAttendance(next);

    // If all are now marked
    if (next.every((s) => s !== null)) {
      const duration = startTimeRef.current ? getTimestamp() - startTimeRef.current : 0;
      track("attendance_complete", { time_to_complete_ms: duration });
    }
  };

  const handleStatusKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    studentIndex: number,
    statusIndex: number,
  ) => {
    let nextIndex = statusIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (statusIndex + 1) % content.statuses.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (statusIndex + content.statuses.length - 1) % content.statuses.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = content.statuses.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    handleToggle(studentIndex, content.statuses[nextIndex].key, false);
    (event.currentTarget.parentElement?.children[nextIndex] as HTMLButtonElement)?.focus();
  };

  const handleMarkAll = () => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      track("attendance_interact", { status: "mark_all" });
    }
    setAttendance(["keldi", "keldi", "keldi", "keldi", "keldi", "keldi"]);
    track("attendance_complete", { method: "mark_all" });
  };

  const liveMessage =
    counts.unmarked === 0
      ? content.allMarkedMsg
      : content.unmarkedTemplate.replace("{count}", String(counts.unmarked));

  const marked = attendance.length - counts.unmarked;
  const countItems = [
    ...content.statuses.map((s) => ({
      key: s.key,
      label: s.label,
      count: counts[s.key],
      color: s.color,
    })),
    { key: "unmarked", label: content.unmarkedLabel, count: counts.unmarked, color: "var(--c-sand-400)" },
  ];

  return (
    <section ref={root} id="sinab" data-screen-label="05 Sinab ko‘ring" className="attendance-demo" aria-labelledby="attendance-heading">
      <div className="landing-container">
        <header className="attendance-intro">
          <h2 id="attendance-heading">{content.title}</h2>
          <p id="attendance-instruction">{content.description}</p>
        </header>
        <div ref={worksheet} className="attendance-worksheet" role="group" aria-labelledby="attendance-lesson-heading" aria-describedby="attendance-instruction attendance-sample-note">
          <header ref={toolbar} className="attendance-toolbar">
            <div className="attendance-lesson">
              <h3 id="attendance-lesson-heading">{content.lessonSubject}</h3>
              <p><span>{content.lessonTitle}</span><span id="attendance-sample-note">{content.banner}</span></p>
            </div>
            <button type="button" onClick={handleMarkAll} className="attendance-bulk">{content.markAllButton}</button>
            <div className="attendance-summary">
              <p className="attendance-marked"><strong>{marked}<span>/{attendance.length}</span></strong><span>{content.markedLabel}</span></p>
              <dl className="attendance-counts">
                {countItems.map((item) => <div key={item.key} data-attendance-count={item.key} style={{ "--attendance-count-color": item.color } as React.CSSProperties}><dt>{item.label}</dt><dd>{item.count}</dd></div>)}
              </dl>
              <progress className="attendance-progress" value={marked} max={attendance.length} aria-label={content.markedLabel} />
            </div>
          </header>
          <ol className="attendance-roster">
            {content.students.map((name, index) => <li key={name} className="attendance-row">
              <div className="attendance-student"><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong></div>
              <div role="radiogroup" aria-label={content.attendanceStatusTemplate.replace("{name}", name)} className="attendance-choices">
                {content.statuses.map((status, statusIndex) => <StatusButton
                  key={status.key} label={status.label} icon={status.icon} color={status.color} background={status.bg} text={status.text}
                  isSelected={attendance[index] === status.key}
                  tabIndex={attendance[index] === status.key || (!attendance[index] && statusIndex === 0) ? 0 : -1}
                  onKeyDown={(event) => handleStatusKeyDown(event, index, statusIndex)}
                  onToggle={() => handleToggle(index, status.key)} studentName={name}
                />)}
              </div>
            </li>)}
          </ol>
          <footer className="attendance-footer">
            <p role="status" aria-live="polite" aria-atomic="true">{liveMessage}</p>
            <a href={demoUrl} onClick={() => track("cta_demo_click", { location: "attendance_demo" })} className="attendance-demo-link">{content.ctaButton}<span aria-hidden="true">↗</span></a>
          </footer>
        </div>
      </div>
    </section>
  );
}
