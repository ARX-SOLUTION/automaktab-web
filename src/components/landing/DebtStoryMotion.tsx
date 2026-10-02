"use client";

import { useEffect } from "react";

/** Starts the debt scroll scene when the section comes near; the server markup is already the final state. */
export default function DebtStoryMotion({ targetId, numberLocale }: { targetId: string; numberLocale: string }) {
  useEffect(() => {
    const element = document.getElementById(targetId);
    if (!element) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      import("./debt-scene").then(({ mountDebtScene }) => {
        if (!cancelled) cleanup = mountDebtScene(element, numberLocale);
      });
    }, { rootMargin: "50% 0px" });
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup?.();
    };
  }, [targetId, numberLocale]);
  return null;
}
