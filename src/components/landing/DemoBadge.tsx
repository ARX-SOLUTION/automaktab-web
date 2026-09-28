import React from "react";

interface DemoBadgeProps {
  label?: string;
  className?: string;
}

/**
 * Standard badge marking sample data as required by design.md §2.4.
 * Colors: bg #FBEFD5, border 1px #E8C27A, text #7A4E00.
 */
export default function DemoBadge({
  label = "DEMO MA’LUMOTLARI",
  className = "",
}: DemoBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#E8C27A] bg-[#FBEFD5] text-[#7A4E00] font-['JetBrains_Mono'] font-bold text-[11px] tracking-[0.08em] uppercase select-none ${className}`}
    >
      {label}
    </span>
  );
}
