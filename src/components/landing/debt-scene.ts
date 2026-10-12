import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEBTORS } from "@/content/stories/debt";

gsap.registerPlugin(ScrollTrigger);

const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";
// Same media query as the tall scroll track in globals.css; elsewhere the scene plays once on enter.
const SCRUB_QUERY = "(min-width: 1024px) and (min-height: 640px)";
// The scrubbed timeline is about 10 units long; on enter it plays in roughly 2.5 seconds.
const ENTER_SPEED = 4;
// Where each notebook slip lies before the list takes shape: [x, y, rotation].
const SCATTER: [number, number, number][] = [[-56, 28, -7], [64, -18, 5], [-28, 46, 4], [44, 10, -6]];

const debtBefore = (d: (typeof DEBTORS)[number]) => d.price - d.paid;
const debtAfter = (d: (typeof DEBTORS)[number]) => d.price - d.paid - (d.payment ?? 0);

/** Scroll scene for the debt story. Loaded only when the section is near; returns its cleanup. */
export function mountDebtScene(element: HTMLElement, numberLocale: string): () => void {
  const formatter = new Intl.NumberFormat(numberLocale);
  const format = (value: number) => formatter.format(Math.round(value)).replace(/[\u00A0\u202F]/g, " ");
  const totalAfter = DEBTORS.reduce((sum, d) => sum + debtAfter(d), 0);
  const totalBefore = DEBTORS.reduce((sum, d) => sum + debtBefore(d), 0);
  const payer = DEBTORS.findIndex((d) => d.payment);
  const payment = DEBTORS[payer]?.payment ?? 0;
  const media = gsap.matchMedia();
  media.add({ motion: MOTION_QUERY, scrub: SCRUB_QUERY }, (ctx) => {
    if (!ctx.conditions?.motion) return;
    const scrub = Boolean(ctx.conditions?.scrub);
    const q = gsap.utils.selector(element);
    const rows = q<HTMLElement>("[data-debt-row]");
    const slips = q<HTMLElement>("[data-debt-slip]");
    const fills = q<HTMLElement>("[data-debt-fill]");
    const amounts = q<HTMLElement>("[data-debt-amount]");
    const total = element.querySelector<HTMLElement>("[data-debt-total]");
    const reach = scrub ? 1 : 0.35;
    const values: Record<string, number> = { total: 0 };
    DEBTORS.forEach((_d, i) => { values[`a${i}`] = 0; });
    const render = () => {
      if (total) total.textContent = values.total > 0 ? format(values.total) : "?";
      amounts.forEach((node, i) => { node.textContent = values[`a${i}`] > 0 ? format(values[`a${i}`]) : "?"; });
    };

    const story = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onUpdate: render,
      paused: !scrub,
      scrollTrigger: scrub ? { trigger: element.querySelector("[data-debt-track]"), start: "top 15%", end: "bottom bottom", scrub: 0.6 } : undefined,
    });
    // 1. Scattered notebook slips straighten into one list.
    story.fromTo(rows, {
      x: (i: number) => SCATTER[i][0] * reach, y: (i: number) => SCATTER[i][1], rotation: (i: number) => SCATTER[i][2],
    }, { x: 0, y: 0, rotation: 0, duration: 3, stagger: 0.3 }, 0.4)
      .fromTo(slips, { opacity: 1 }, { opacity: 0, duration: 1.2, stagger: 0.3 }, 2.4)
      // 2. Each balance and the total are counted from what was paid.
      .fromTo(fills, { scaleX: 0 }, { scaleX: (i: number) => DEBTORS[i].paid / DEBTORS[i].price, duration: 1.6, stagger: 0.2, ease: "power3.out" }, 3.8)
      .fromTo(values, { total: 0, ...Object.fromEntries(DEBTORS.map((_d, i) => [`a${i}`, 0])) }, {
        total: totalBefore, ...Object.fromEntries(DEBTORS.map((d, i) => [`a${i}`, debtBefore(d)])), duration: 1.6, ease: "power3.out",
      }, 3.8)
      // 3. A payment lands and the running balance drops.
      .fromTo(q("[data-debt-payment]"), { x: 96, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 6)
      .to(values, { total: totalAfter, [`a${payer}`]: debtAfter(DEBTORS[payer]), duration: 1, ease: "power1.out" }, 7)
      .to(fills[payer], { scaleX: (DEBTORS[payer].paid + payment) / DEBTORS[payer].price, duration: 1, ease: "power1.out" }, 7)
      // 4. The same list leaves as an Excel file.
      .fromTo(q("[data-debt-export]"), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 8.6)
      .to({}, { duration: 0.6 });
    render();
    if (!scrub) {
      story.timeScale(ENTER_SPEED);
      // end: "max" also starts the scene when the page opens below it.
      ScrollTrigger.create({ trigger: element.querySelector(".debt-sheet"), start: "top 75%", end: "max", once: true, onEnter: () => { story.play(); } });
    }
    element.dataset.debtState = scrub ? "scroll" : "enter";

    return () => {
      element.dataset.debtState = "static";
      values.total = totalAfter;
      DEBTORS.forEach((d, i) => { values[`a${i}`] = debtAfter(d); });
      render();
    };
  });
  return () => media.revert();
}
