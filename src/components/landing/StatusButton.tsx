"use client";

import React from "react";

interface StatusButtonProps {
  label: string;
  icon: string;
  color: string;
  isSelected: boolean;
  onToggle: () => void;
  tabIndex: number;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  studentName: string;
}

export default function StatusButton({
  label,
  icon,
  color,
  isSelected,
  onToggle,
  tabIndex,
  onKeyDown,
  studentName,
}: StatusButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`${studentName}: ${label}`}
      title={`${studentName}: ${label}`}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onClick={onToggle}
      style={{
        backgroundColor: isSelected ? color : "#FFFFFF",
        borderColor: isSelected ? color : "#DCD3C1",
        color: isSelected ? "#FFFFFF" : "#3A453F",
      }}
      className="h-11 w-11 shrink-0 rounded-[10px] border font-body font-semibold text-[14px] flex items-center justify-center transition-colors duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <span aria-hidden="true" className="text-[15px] font-bold leading-none">{icon}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
