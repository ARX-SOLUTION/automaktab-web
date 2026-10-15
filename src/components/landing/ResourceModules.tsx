"use client";

import React, { useRef, useState } from "react";
import { Check } from "lucide-react";
import type { LandingContent } from "@/content/uz";
import ProductScene from "./ProductScene";
import { useMediaQuery, useRefreshOnResize } from "./story-mode";

interface ResourceModulesProps {
  label: string;
  modules: LandingContent["resources"]["modules"];
  scenes: LandingContent["scenes"];
}

/** Phones switch between the modules with tabs; wider screens and no-JS show all of them. */
export default function ResourceModules({ label, modules, scenes }: ResourceModulesProps) {
  const [active, setActive] = useState(0);
  const tabs = useMediaQuery("(max-width: 767.98px)");
  const panels = useRef<HTMLDivElement>(null);
  useRefreshOnResize(panels, tabs);
  const last = modules.length - 1;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowLeft" ? (index === 0 ? last : index - 1) : event.key === "ArrowRight" ? (index === last ? 0 : index + 1) : event.key === "Home" ? 0 : event.key === "End" ? last : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`#module-tab-${next}`)?.focus();
  };

  return (
    <>
      {tabs && (
        <div role="tablist" aria-label={label} className="module-tabs">
          {modules.map((module, index) => <button key={module.kind} id={`module-tab-${index}`} type="button" role="tab" aria-selected={index === active} aria-controls={`module-panel-${index}`} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => handleKeyDown(event, index)} className="role-tab">{module.title}</button>)}
        </div>
      )}
      <div ref={panels} className="module-proofs">
        {modules.map((module, index) => <div key={module.kind} id={`module-panel-${index}`} role={tabs ? "tabpanel" : undefined} aria-labelledby={tabs ? `module-tab-${index}` : undefined} hidden={tabs && index !== active} data-module-proof={module.kind} className={`module-proof module-proof-${module.kind}`}>
          <div className="module-copy"><h3>{module.title}</h3><p>{module.description}</p><ul>{module.points.map((point) => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}</ul></div>
          <ProductScene kind={module.kind} content={scenes} />
        </div>)}
      </div>
    </>
  );
}
