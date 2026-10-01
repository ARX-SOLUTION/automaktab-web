"use client";

import React, { useState, useRef } from "react";
import type { LandingContent } from "@/content/uz";
import { track, buildDemoUrl } from "@/lib/analytics";
import StatusButton from "./StatusButton";

interface AttendanceDemoProps {
  content: LandingContent["attendanceDemo"];
}

type StatusKey = "keldi" | "kechikdi" | "kelmadi" | "uzrli";

function getTimestamp(): number {
  return Date.now();
}

export default function AttendanceDemo({ content }: AttendanceDemoProps) {
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

  const kpis = [
    ...content.statuses.map((s) => ({
      label: s.label,
      count: counts[s.key],
      color: s.color,
    })),
    { label: content.unmarkedLabel, count: counts.unmarked, color: "#CFC6B3" },
  ];

  return (
    <section
      id="sinab"
      data-screen-label="05 Sinab ko‘ring"
      className="py-16 sm:py-28 bg-forest-800 text-white scroll-mt-[68px]"
      aria-labelledby="attendance-heading"
    >
      <div className="landing-container min-w-0 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center">
        {/* Left Explanatory Column */}
        <div className="min-w-0 flex flex-col gap-5">
          <span className="font-mono font-semibold text-[13px] tracking-[0.08em] text-amber-500 uppercase">
            {content.eyebrow}
          </span>
          <h2
            id="attendance-heading"
            className="m-0 font-display font-extrabold text-[clamp(40px,5vw,64px)] leading-[0.95] [text-wrap:balance]"
          >
            {content.title}
          </h2>
          <p className="m-0 font-body font-normal text-[19px] leading-[1.6] text-on-dark-2 [text-wrap:pretty]">
            {content.description}
          </p>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2.5 max-w-[440px] mt-2 select-none">
            {content.statuses.map((s) => (
              <div
                key={s.key}
                className="flex items-center gap-2.5 font-body font-medium text-[16px] text-white"
              >
                <span
                  style={{ backgroundColor: s.color }}
                  className="w-7 h-7 rounded-[7px] grid place-items-center font-bold text-white leading-none shrink-0"
                  aria-hidden="true"
                >
                  {s.icon}
                </span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Interactive Card */}
        <div className="min-w-0 bg-sand-100 text-ink rounded-[var(--r-xl)] overflow-hidden shadow-[var(--shadow-demo)]">
          {/* Banner */}
          <div className="bg-[#8B5A12] text-white text-center py-2 px-3 font-body font-medium text-[14px] select-none">
            {content.banner}
          </div>

          <div className="p-4 sm:p-5 flex flex-col gap-4">
            {/* Header info + bulk button */}
            <div className="flex justify-between items-start gap-3 flex-wrap">
              <div>
                <div className="font-mono font-medium text-[13px] text-muted">
                  {content.lessonTitle}
                </div>
                <div className="font-display font-extrabold text-[26px] sm:text-[28px] leading-tight text-ink">
                  {content.lessonSubject}
                </div>
              </div>

              <button
                type="button"
                onClick={handleMarkAll}
                className="min-h-11 px-3.5 py-2 rounded-[10px] border border-sand-400 bg-white hover:border-ink font-body font-semibold text-[15px] text-ink cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {content.markAllButton}
              </button>
            </div>

            {/* KPI Counters */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 select-none">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  style={{ borderTopColor: k.color }}
                  className="min-w-0 bg-white rounded-[10px] p-2 sm:p-2.5 border-t-[3px] shadow-xs"
                >
                  <div className="font-display font-extrabold text-[24px] sm:text-[28px] leading-none text-ink">
                    {k.count}
                  </div>
                  <div className="font-body font-semibold text-[12px] sm:text-[13px] leading-snug text-muted mt-1 break-words">
                    {k.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Student Rows */}
            <div className="flex flex-col gap-1.5">
              {content.students.map((name, idx) => (
                <div
                  key={name}
                  className="flex flex-wrap items-center justify-between gap-2 bg-white rounded-[12px] p-2 pl-3.5 border border-sand-300"
                >
                  <span className="min-w-0 font-body font-semibold text-[16px] text-ink">
                    {name}
                  </span>

                  <div
                    role="radiogroup"
                    aria-label={content.attendanceStatusTemplate.replace("{name}", name)}
                    className="flex gap-2"
                  >
                    {content.statuses.map((s, statusIndex) => (
                      <StatusButton
                        key={s.key}
                        label={s.label}
                        icon={s.icon}
                        color={s.color}
                        isSelected={attendance[idx] === s.key}
                        tabIndex={attendance[idx] === s.key || (!attendance[idx] && statusIndex === 0) ? 0 : -1}
                        onKeyDown={(event) => handleStatusKeyDown(event, idx, statusIndex)}
                        onToggle={() => handleToggle(idx, s.key)}
                        studentName={name}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with Polite Live Region & CTA */}
            <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
              <span
                aria-live="polite"
                className="font-body font-medium text-[14px] text-muted"
              >
                {liveMessage}
              </span>

              <a
                href={demoUrl}
                onClick={() => track("cta_demo_click", { location: "attendance_demo" })}
                className="min-h-12 px-4.5 py-2 flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-forest-800 font-body font-bold text-[16px] rounded-[10px] no-underline shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <span>{content.ctaButton}</span>
                <span className="text-[18px] leading-none">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
