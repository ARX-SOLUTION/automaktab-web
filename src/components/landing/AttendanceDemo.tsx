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

type StatusKey = LandingContent["attendanceDemo"]["statuses"][number]["key"];
type Mark = StatusKey | null;

// Synthetic lesson. The server renders it fully marked, so the static and reduced-motion view is complete.
const SAMPLE_MARKS: StatusKey[] = ["keldi", "keldi", "kechikdi", "keldi", "kelmadi", "uzrli"];
const CARD_STUDENT = 4;
const CARD_HISTORY: StatusKey[] = ["keldi", "kelmadi", "keldi", "keldi"];
const CARD_DEBT = "1\u00A0200\u00A0000";

function getTimestamp(): number {
  return Date.now();
}

export default function AttendanceDemo({ content }: AttendanceDemoProps) {
  const root = useRef<HTMLElement>(null);
  const [attendance, setAttendance] = useState<Mark[]>(SAMPLE_MARKS);
  const [announcement, setAnnouncement] = useState("");
  const hasInteractedRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);
  const stopAutoplayRef = useRef<(() => void) | null>(null);

  const demoUrl = buildDemoUrl("attendance_demo");

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(gsap.utils.toArray<HTMLElement>("[data-attendance-reveal]", element), {
        // The worksheet only fades: moving it would offset the row triggers measured inside it.
        y: (_index: number, target: HTMLElement) => target.classList.contains("attendance-worksheet") ? 0 : 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: element, start: "top 80%", once: true },
      });
      if (hasInteractedRef.current) return;
      // Each row is marked as it crosses the reading line, so the summary and card fill in while scrolling.
      setAttendance(SAMPLE_MARKS.map(() => null));
      const triggers = gsap.utils.toArray<HTMLElement>(".attendance-row", element).map((row, index) => ScrollTrigger.create({
        trigger: row,
        start: "top 70%",
        end: "max",
        onToggle: ({ isActive }) => setAttendance((current) => current.map((mark, i) => i === index ? (isActive ? SAMPLE_MARKS[index] : null) : mark)),
      }));
      stopAutoplayRef.current = () => triggers.forEach((trigger) => trigger.kill());
      return () => {
        stopAutoplayRef.current = null;
        if (!hasInteractedRef.current) setAttendance(SAMPLE_MARKS);
      };
    });
    return () => media.revert();
  }, { scope: root });

  const counts = { keldi: 0, kechikdi: 0, kelmadi: 0, uzrli: 0, unmarked: 0 };
  attendance.forEach((status) => {
    if (!status) counts.unmarked++;
    else counts[status]++;
  });

  const announce = (next: Mark[]) => {
    const unmarked = next.filter((status) => !status).length;
    setAnnouncement(unmarked === 0 ? content.allMarkedMsg : content.unmarkedTemplate.replace("{count}", String(unmarked)));
  };

  const takeOver = (status: StatusKey) => {
    if (hasInteractedRef.current) return;
    hasInteractedRef.current = true;
    startTimeRef.current = getTimestamp();
    stopAutoplayRef.current?.();
    stopAutoplayRef.current = null;
    track("attendance_interact", { status });
  };

  const handleToggle = (index: number, status: StatusKey, allowReset = true) => {
    if (!allowReset && attendance[index] === status) return;
    takeOver(status);
    const next = [...attendance];
    next[index] = allowReset && next[index] === status ? null : status;
    setAttendance(next);
    announce(next);
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

  const marked = attendance.length - counts.unmarked;
  const statusByKey = new Map(content.statuses.map((status) => [status.key, status]));
  const countItems = content.statuses.map((s) => ({ key: s.key, label: s.label, count: counts[s.key], color: s.color }));
  const history = [...CARD_HISTORY, attendance[CARD_STUDENT]];
  const cardIndex = String(CARD_STUDENT + 1).padStart(2, "0");

  return (
    <section ref={root} id="sinab" data-screen-label="05 Sinab ko‘ring" className="attendance-demo" aria-labelledby="attendance-heading">
      <div className="landing-container">
        <header className="attendance-intro" data-attendance-reveal>
          <h2 id="attendance-heading">{content.title}</h2>
          <p id="attendance-instruction">{content.description}</p>
        </header>
        <div className="attendance-layout">
          <div className="attendance-worksheet" role="group" aria-labelledby="attendance-lesson-heading" aria-describedby="attendance-instruction attendance-sample-note" data-attendance-reveal>
            <header className="attendance-toolbar">
              <div className="attendance-lesson">
                <h3 id="attendance-lesson-heading">{content.lessonSubject}</h3>
                <p><span>{content.lessonTitle}</span><span id="attendance-sample-note">{content.banner}</span></p>
              </div>
            </header>
            <ol className="attendance-roster">
              {content.students.map((name, index) => <li key={name} className="attendance-row" data-attendance-linked={index === CARD_STUDENT ? "" : undefined}>
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
          </div>
          <div className="attendance-rail">
            <div className="attendance-summary" data-attendance-reveal>
              <p className="attendance-marked"><strong><span key={marked} className="attendance-tick">{marked}</span><span>/{attendance.length}</span></strong><span>{content.markedLabel}</span></p>
              <div className="attendance-progress" role="progressbar" aria-label={content.markedLabel} aria-valuemin={0} aria-valuemax={attendance.length} aria-valuenow={marked}>
                <span style={{ transform: `scaleX(${marked / attendance.length})` }} />
              </div>
              <dl className="attendance-counts">
                {countItems.map((item) => <div key={item.key} data-attendance-count={item.key} style={{ "--attendance-count-color": item.color } as React.CSSProperties}><dt>{item.label}</dt><dd><span key={item.count} className="attendance-tick">{item.count}</span></dd></div>)}
              </dl>
            </div>
            <article className="attendance-card" aria-labelledby="attendance-card-name" data-attendance-reveal>
              <header>
                <span aria-hidden="true">{cardIndex}</span>
                <p>{content.card.title}</p>
                <h3 id="attendance-card-name">{content.students[CARD_STUDENT]}</h3>
              </header>
              <dl>
                <div>
                  <dt>{content.card.attendance}</dt>
                  <dd>
                    <ol className="attendance-history">
                      {history.map((key, index) => {
                        const status = key ? statusByKey.get(key) : undefined;
                        const today = index === history.length - 1;
                        return <li key={today ? `today-${key ?? "none"}` : index} data-attendance-history={key ?? "unmarked"} style={{ "--attendance-dot": status?.color } as React.CSSProperties}>
                          <i aria-hidden="true" />
                          {today && <span aria-hidden="true">{content.card.today}</span>}
                          <span className="sr-only">{today ? `${content.card.today}: ` : ""}{status?.label ?? content.unmarkedLabel}</span>
                        </li>;
                      })}
                    </ol>
                  </dd>
                </div>
                <div>
                  <dt>{content.card.debt}</dt>
                  <dd>{CARD_DEBT}{"\u00A0"}{content.card.currency}</dd>
                </div>
              </dl>
            </article>
            <a href={demoUrl} onClick={() => track("cta_demo_click", { location: "attendance_demo" })} className="attendance-demo-link">{content.ctaButton}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      </div>
    </section>
  );
}
