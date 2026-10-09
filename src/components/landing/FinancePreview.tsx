"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowDownLeft, ArrowUpRight, Check, ChevronDown, LayoutDashboard, RotateCcw } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Locale } from "@/i18n/config";
import type { FinancePreviewContent } from "@/content/finance-preview";
import { track } from "@/lib/analytics";
import { FINANCE_BRANCHES, SAMPLE_PAYMENT, financeSnapshot, type FinanceBranchId, type FinanceFilter } from "./finance-preview-model";

gsap.registerPlugin(useGSAP);

const subscribe = () => () => {};
const interactiveSnapshot = () => true;
const staticSnapshot = () => false;
const numberFormatters = {
  uz: new Intl.NumberFormat("ru-RU"),
  ru: new Intl.NumberFormat("ru-RU"),
  en: new Intl.NumberFormat("en-US"),
};

export default function FinancePreview({ content, locale }: { content: FinancePreviewContent; locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<FinanceFilter>("all");
  const [payments, setPayments] = useState<FinanceBranchId[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const ready = useSyncExternalStore(subscribe, interactiveSnapshot, staticSnapshot);
  const snapshot = financeSnapshot(filter, payments);
  const target = snapshot.paymentTarget;
  const money = (value: number) => numberFormatters[locale].format(value).replace(/[\u00a0\u202f]/g, " ");
  const paymentKey = payments.join(",");

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (_context, contextSafe) => {
      if (!contextSafe) return;
      const safe = contextSafe as ReturnType<typeof useGSAP>["contextSafe"];
      const select = gsap.utils.selector(root);
      // Values update immediately; one finite sequence connects the paired changes.
      const sequence = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      sequence.from(select("[data-finance-total]"), { y: 5, duration: 0.28, stagger: 0.05, clearProps: "transform" });
      sequence.from(select("[data-finance-bar]"), { scaleX: 0.78, transformOrigin: "left center", duration: 0.42, stagger: 0.04, clearProps: "transform" }, 0);
      const receipt = select("[data-finance-receipt]");
      if (receipt.length) sequence.from(receipt, { y: 4, duration: 0.22, clearProps: "transform" }, 0.1);
      let visible = false;
      let active = true;
      const sync = safe(() => {
        if (!active) return;
        if (visible && !document.hidden) sequence.play();
        else sequence.pause();
      });
      const observer = new IntersectionObserver(safe(([entry]: IntersectionObserverEntry[]) => { visible = entry.isIntersecting; sync(); }), { threshold: 0.15 });
      observer.observe(element);
      document.addEventListener("visibilitychange", sync);
      return () => {
        active = false;
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [filter, paymentKey], revertOnUpdate: true });

  const recordPayment = () => {
    if (!ready || target.paid) return;
    setPayments((previous) => previous.includes(target.id) ? previous : [...previous, target.id]);
    setAnnouncement(`${content.recorded}: ${money(SAMPLE_PAYMENT)} ${content.currency}. ${content.success}`);
    track("finance_preview_interact");
  };

  const chooseBranch = (next: FinanceFilter) => {
    setFilter(next);
    setAnnouncement(next === "all" ? content.allBranches : content.branches[next]);
    track("finance_preview_interact");
  };

  return (
    <figure ref={root} id="finance-preview" className="finance-preview landing-hero-proof" data-hero-proof aria-labelledby="finance-preview-heading">
      <div className="finance-preview-header">
        <div className="finance-preview-identity">
          <LayoutDashboard size={21} aria-hidden="true" />
          <div><h2 id="finance-preview-heading">{content.title}</h2><p>{content.period}</p></div>
        </div>
        <span className="finance-sample">{content.sample}</span>
      </div>

      <fieldset className="finance-filters" disabled={!ready}>
        <legend>{content.filter}</legend>
        <div className="finance-filter-options">
          {(["all", ...FINANCE_BRANCHES.map((branch) => branch.id)] as const).map((id) => (
            <label key={id}>
              <input type="radio" name="finance-branch" value={id} checked={filter === id} onChange={() => chooseBranch(id)} />
              <span>{id === "all" ? content.allBranches : content.branches[id]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="finance-results" aria-label={filter === "all" ? content.allBranches : content.branches[filter]}>
        <dl className="finance-totals">
          <div className="finance-revenue"><dt><ArrowDownLeft size={17} aria-hidden="true" />{content.revenue}</dt><dd data-finance-total="revenue" data-value={snapshot.revenue}>{money(snapshot.revenue)}<small>{content.currency}</small></dd></div>
          <div className="finance-debt"><dt><ArrowUpRight size={17} aria-hidden="true" />{content.debt}</dt><dd data-finance-total="debt" data-value={snapshot.debt}>{money(snapshot.debt)}<small>{content.currency}</small></dd></div>
        </dl>

        <div className="finance-branches">
          <h3>{content.branchRevenue}</h3>
          <ul>
            {snapshot.branches.map((branch) => (
              <li key={branch.id} data-selected={filter === "all" || filter === branch.id}>
                <div className="finance-branch-label"><span>{content.branches[branch.id]}</span><strong>{money(branch.revenue)} <small>{content.currency}</small></strong></div>
                <div className="finance-bar-track" aria-hidden="true"><span data-finance-bar style={{ width: `${branch.revenue / 10_000_000 * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>

        <details className="finance-debtors">
          <summary><span>{content.debtors} <small>{snapshot.visible.length}</small></span><ChevronDown size={17} aria-hidden="true" /></summary>
          <table className="finance-students">
          <caption className="sr-only">{content.debt}</caption>
          <thead><tr><th scope="col">{content.students}</th><th scope="col">{content.remaining}</th></tr></thead>
          <tbody>{snapshot.visible.map((branch) => (
            <tr key={branch.id} data-finance-student={branch.id}>
              <th scope="row"><span>{branch.student}</span><small>{content.branches[branch.id]}</small></th>
              <td><span>{money(branch.debt)} <small>{content.currency}</small></span>{branch.paid && <small className="finance-recorded" data-finance-receipt><Check size={12} aria-hidden="true" />{content.recorded}</small>}</td>
            </tr>
          ))}</tbody>
          </table>
        </details>
      </div>

      <div className="finance-playground">
        <p>{content.instruction}</p>
        <div className="finance-payment-meta"><strong>{money(SAMPLE_PAYMENT)} {content.currency}</strong><span>{content.paymentFor.replace("{student}", target.student)}</span></div>
        <div className="finance-playground-actions">
          <button type="button" className="finance-payment-button" onClick={recordPayment} disabled={!ready} aria-disabled={target.paid}>
            {target.paid ? <Check size={18} aria-hidden="true" /> : <ArrowDownLeft size={18} aria-hidden="true" />}
            <span>{target.paid ? content.recorded : content.payment}</span>
          </button>
          <button type="button" className="finance-reset" onClick={() => { if (!ready || (payments.length === 0 && filter === "all")) return; setPayments([]); setFilter("all"); setAnnouncement(content.resetSuccess); }} disabled={!ready} aria-disabled={payments.length === 0 && filter === "all"}>
            <RotateCcw size={16} aria-hidden="true" /><span>{content.reset}</span>
          </button>
        </div>
        <p className="finance-feedback" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      </div>

      <figcaption>{content.disclaimer}</figcaption>
      <noscript><p className="finance-noscript">{content.noScript}</p></noscript>
    </figure>
  );
}
