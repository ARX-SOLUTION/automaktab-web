"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { DemoFormCopy } from "./DemoRequestForm";
import DemoRequestForm from "./DemoRequestForm";

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Selector for elements that can receive keyboard focus, used by the focus trap.
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function DemoRequestDialog({
  copy,
  triggerLabel,
  triggerClassName,
}: {
  copy: DemoFormCopy;
  triggerLabel: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = window.requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
          "input,textarea,select",
        )
        ?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(raf);
      trigger?.focus();
    };
  }, [open]);

  function onDialogKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const root = dialogRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !root.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !root.contains(active)) {
      e.preventDefault();
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
        <IconArrowRight className="size-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 animate-[scrim-in_200ms_ease-out] bg-black/60 motion-reduce:animate-none"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            onKeyDown={onDialogKeyDown}
            className="relative z-10 max-h-[90vh] w-full max-w-lg animate-[dialog-in_260ms_ease-out] overflow-y-auto rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl motion-reduce:animate-none"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.close}
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <h2 className="mb-1 pr-8 font-heading text-2xl font-bold tracking-tight text-foreground">
              {copy.title}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {copy.subtitle}
            </p>
            <DemoRequestForm copy={copy} />
          </div>
        </div>
      )}
    </>
  );
}
