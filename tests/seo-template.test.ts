import { afterEach, describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import SeoPage from "@/app/[locale]/[...seoPath]/page";
import { SEO_PAGES, type SeoPageCopy } from "@/config/seo-pages";

const original = SEO_PAGES.payments.uz;

async function render(locale: "uz" | "ru" | "en", seoPath: string[]) {
  return renderToStaticMarkup(await SeoPage({ params: Promise.resolve({ locale, seoPath }) }));
}

function main(html: string) {
  return html.slice(html.indexOf("<main"), html.indexOf("</main>"));
}

function graph(html: string) {
  const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
  expect(match).toBeTruthy();
  return JSON.parse(match![1])["@graph"] as Array<Record<string, unknown>>;
}

afterEach(() => {
  SEO_PAGES.payments.uz = original;
});

describe("SEO page template", () => {
  it("adds WebPage and BreadcrumbList JSON-LD without FAQPage when a page has no FAQ", async () => {
    const html = await render("ru", ["features", "payments-and-debt"]);
    const nodes = graph(html);
    expect(nodes.map((node) => node["@type"])).toEqual(["WebPage", "BreadcrumbList"]);
    expect(nodes[0].url).toBe("https://automaktab.uz/ru/features/payments-and-debt");
    expect(nodes[1].itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://automaktab.uz/ru" },
      { "@type": "ListItem", position: 2, name: SEO_PAGES.payments.ru.eyebrow, item: "https://automaktab.uz/ru/features/payments-and-debt" },
    ]);
    expect(main(html)).not.toContain("<details");
    expect(main(html)).not.toContain("data-product-scene");
  });

  it("renders the optional definition, visual, comparison, FAQ, sources and related links", async () => {
    const extended: SeoPageCopy = {
      ...original,
      definition: "automaktab.uz har bir o‘quvchining to‘lovini yozadi.",
      visual: "scene:registrar",
      comparison: { caption: "Jadval", columns: ["Imkoniyat", "A", "B"], rows: [{ label: "SMS", cells: ["—", "✓"] }], legend: "✓ = bor" },
      faq: [{ question: "Savol?", answer: "Javob." }],
      sources: [{ label: "Manba", url: "https://example.com/", checkedAt: "2026-10-16" }],
      related: ["branches"],
    };
    SEO_PAGES.payments.uz = extended;
    const html = await render("uz", ["features", "payments-and-debt"]);

    const order = ["<h1>", "seo-definition", "data-product-scene=\"registrar\"", "<table>", "<details>", "Manbalar", "/features/branch-management", "article-cta"];
    const positions = order.map((needle) => main(html).indexOf(needle));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    expect(html).toContain('<th scope="row">SMS</th>');
    expect(main(html)).not.toContain("/features/schedules-and-groups");

    const faq = graph(html).find((node) => node["@type"] === "FAQPage");
    expect(faq?.mainEntity).toEqual([
      { "@type": "Question", name: "Savol?", acceptedAnswer: { "@type": "Answer", text: "Javob." } },
    ]);
  });
});
