"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { Locale } from "@/i18n/config";
import type { DemoFormCopy } from "./DemoRequestForm";
import DemoRequestForm from "./DemoRequestForm";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function DemoRequestDialog({
  copy,
  locale,
  triggerLabel,
  triggerClassName,
}: {
  copy: DemoFormCopy;
  locale: Locale;
  triggerLabel: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(frame);
      trigger?.focus();
    };
  }, [open]);

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const root = dialogRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (nodes.length === 0) return;

    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || !root.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !root.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={triggerClassName}
      >
        {triggerLabel}
        <ArrowRight />
      </button>

      {open && (
        <div className="dialog-layer">
          <button
            type="button"
            className="dialog-scrim"
            onClick={() => setOpen(false)}
            aria-label={copy.close}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onKeyDown={trapFocus}
            className="dialog-panel"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.close}
              className="dialog-close"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id={titleId}>{copy.title}</h2>
            <p id={descriptionId} className="dialog-description">
              {copy.subtitle}
            </p>
            <DemoRequestForm copy={copy} locale={locale} />
          </div>
        </div>
      )}
    </>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}
