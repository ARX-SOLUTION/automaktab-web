import DemoBadge from "./DemoBadge";
import type { LandingContent } from "@/content/uz";

/** Practical-driving preview card, shared by the homepage journey and the practical-driving page. */
export default function DrivingCard({ content, sampleLabel }: {
  content: LandingContent["journey"]["previews"]["driving"];
  sampleLabel: string;
}) {
  return (
    <div className="bg-sand-100 border border-sand-300 rounded-[18px] p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="font-mono font-semibold text-[12px] text-muted">
          {content.title}
        </span>
        <DemoBadge label={sampleLabel} />
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-display font-extrabold text-[64px] leading-none text-ink">
          600
        </span>
        <span className="font-display font-bold text-[26px] text-muted">
          {content.quota}
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-3.5 rounded-[7px] bg-sand-300 overflow-hidden">
        <div
          className="w-1/2 h-full"
          style={{
            background:
              "var(--c-amber-500)",
          }}
        />
      </div>
      <div className="flex justify-between font-body font-semibold text-[14px] text-muted">
        <span>{content.completed}</span>
        <span>{content.remaining}</span>
      </div>
      {/* Session list */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-sand-300">
          <span className="font-body font-semibold text-[16px] text-ink">{content.sessions[0]}</span>
          <div className="flex gap-1.5 flex-wrap justify-end">
            <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
              ✓ {content.instructorNote}
            </span>
            <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
              ✓ {content.confirmed}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2.5 bg-white rounded-[10px] p-3 border border-sand-300">
          <span className="font-body font-semibold text-[16px] text-ink">{content.sessions[1]}</span>
          <div className="flex gap-1.5 flex-wrap justify-end">
            <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-ok-bg text-ok-text">
              ✓ {content.instructorNote}
            </span>
            <span className="font-body font-semibold text-[12px] px-2 py-0.5 rounded-[5px] bg-warn-bg text-warn-text">
              ◷ {content.pending}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
