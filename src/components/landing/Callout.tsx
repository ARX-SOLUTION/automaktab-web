export function CalloutPin({ number, topPct, leftPct }: { number: number; topPct: string; leftPct: string }) {
  return (
    <div
      style={{ top: topPct, left: leftPct }}
      className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#E8A317] text-[#0B2B1F] shadow-[0_0_0_6px_rgba(232,163,23,0.3)] grid place-items-center font-['Barlow_Condensed'] font-extrabold text-[19px] leading-none pointer-events-none select-none z-10"
      aria-hidden="true"
    >
      {number}
    </div>
  );
}

export function CalloutCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3.5 py-1">
      <span
        className="w-[30px] h-[30px] rounded-full bg-[#14211A] text-[#E8A317] grid place-items-center font-['Barlow_Condensed'] font-extrabold text-[16px] leading-none shrink-0 select-none"
        aria-hidden="true"
      >
        {number}
      </span>
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="m-0 font-['Barlow_Condensed'] font-bold text-[22px] leading-[1.1] text-[#14211A]">
          {title}
        </h3>
        <p className="m-0 font-['Barlow'] font-normal text-[15px] leading-[1.5] text-[#5A6660]">
          {description}
        </p>
      </div>
    </div>
  );
}
