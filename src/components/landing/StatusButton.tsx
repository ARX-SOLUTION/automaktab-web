"use client";

import React from "react";

interface StatusButtonProps {
  label: string;
  icon: string;
  color: string;
  isSelected: boolean;
  onToggle: () => void;
  studentName: string;
}

export default function StatusButton({
  label,
  icon,
  color,
  isSelected,
  onToggle,
  studentName,
}: StatusButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`${studentName}: ${label}`}
      title={`${studentName}: ${label}`}
      onClick={onToggle}
      style={{
        backgroundColor: isSelected ? color : "#FFFFFF",
        borderColor: isSelected ? color : "#DCD3C1",
        color: isSelected ? "#FFFFFF" : "#3A453F",
      }}
      className={`h-[40px] min-w-[44px] px-2.5 rounded-[9px] border font-['Barlow'] font-semibold text-[14px] flex items-center justify-center gap-1.5 transition-colors duration-150 cursor-pointer select-none focus-visible:outline-none`}
    >
      <span className="text-[15px] font-bold leading-none">{icon}</span>
      {isSelected && <span className="leading-none text-[13px]">{label}</span>}
    </button>
  );
}
