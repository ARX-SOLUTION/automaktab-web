import { Check, FileSpreadsheet } from "lucide-react";
import { DEBTORS, type DebtStoryContent } from "@/content/stories/debt";
import DebtStoryMotion from "./DebtStoryMotion";

const debtAfter = (d: (typeof DEBTORS)[number]) => d.price - d.paid - (d.payment ?? 0);

export default function DebtStory({ content }: { content: DebtStoryContent }) {
  const formatter = new Intl.NumberFormat(content.numberLocale);
  const format = (value: number) => formatter.format(Math.round(value)).replace(/[\u00A0\u202F]/g, " ");
  const totalAfter = DEBTORS.reduce((sum, d) => sum + debtAfter(d), 0);

  return (
    <section id="qarzdorlik" data-debt-state="static" data-screen-label="03a Qarzdorlik" className="debt-story" aria-labelledby="debt-heading">
      <div data-debt-track className="debt-track">
        <div className="landing-container debt-stage">
          <div className="debt-intro">
            <h2 id="debt-heading">{content.title}</h2>
            <p>{content.lead}</p>
            <p className="debt-total">
              <span>{content.totalLabel}</span>
              <strong><span data-debt-total aria-hidden="true">{format(totalAfter)}</span><span className="sr-only">{format(totalAfter)} {content.currency}</span></strong>
              <small aria-hidden="true">{content.currency}</small>
            </p>
            <p data-debt-export className="debt-export"><FileSpreadsheet size={18} aria-hidden="true" /><span>{content.exportFile}</span><Check size={16} aria-hidden="true" /></p>
          </div>

          <div className="debt-sheet">
            <div className="debt-sheet-head"><strong>{content.listTitle}</strong><span>{content.sample}</span></div>
            <div className="debt-columns" aria-hidden="true"><span>{content.nameLabel}</span><span>{content.debtLabel}</span></div>
            <ol className="debt-rows">
              {DEBTORS.map((debtor, index) => (
                <li key={debtor.name} data-debt-row={index} data-debt-balance={debtAfter(debtor)} data-debt-paying={debtor.payment ? "true" : undefined} className="debt-row">
                  <span className="debt-name">{debtor.name}</span>
                  <span className="debt-amount">
                    <span data-debt-amount aria-hidden="true">{format(debtAfter(debtor))}</span>
                    <span className="sr-only">{content.debtLabel}: {format(debtAfter(debtor))} {content.currency}</span>
                  </span>
                  <span className="debt-bar" aria-hidden="true"><span data-debt-fill style={{ transform: `scaleX(${(debtor.paid + (debtor.payment ?? 0)) / debtor.price})` }} /></span>
                  {debtor.payment ? <span data-debt-payment className="debt-payment">{content.paymentLabel} +{format(debtor.payment)}</span> : null}
                  <span data-debt-slip className="debt-slip" aria-hidden="true">{content.notes[index]}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <DebtStoryMotion targetId="qarzdorlik" numberLocale={content.numberLocale} />
    </section>
  );
}
