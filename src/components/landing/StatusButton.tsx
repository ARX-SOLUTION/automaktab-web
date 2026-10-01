"use client";

import React from "react";

interface StatusButtonProps {
  label: string;
  icon: string;
  color: string;
  background: string;
  text: string;
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
  background,
  text,
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
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onClick={onToggle}
      style={{ "--attendance-status-color": color, "--attendance-status-bg": background, "--attendance-status-text": text } as React.CSSProperties}
      className="attendance-status"
    >
      <span aria-hidden="true" className="attendance-status-icon">{icon}</span>
      <span className="attendance-status-label">{label}</span>
    </button>
  );
}
