"use client";

import { useEffect, useState, type ComponentType } from "react";
import { shouldRunLiquid } from "./liquid-policy";

type Connection = { saveData?: boolean };

function readSaveData(): boolean {
  const connection = (navigator as Navigator & { connection?: Connection })
    .connection;
  return Boolean(connection?.saveData);
}

export function HeroAtmosphere() {
  const [Field, setField] = useState<ComponentType | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!shouldRunLiquid({ reducedMotion: reduced, saveData: readSaveData() })) {
      return;
    }

    let cancelled = false;
    const start = () => {
      void import("./LiquidField").then((mod) => {
        if (!cancelled) setField(() => mod.LiquidField);
      });
    };

    const idle = window.requestIdleCallback?.(start, { timeout: 1500 });
    const timer =
      idle === undefined ? window.setTimeout(start, 400) : undefined;

    return () => {
      cancelled = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="hero-field" aria-hidden="true">
      <div className="hero-field-static" />
      {Field ? <Field /> : null}
    </div>
  );
}
