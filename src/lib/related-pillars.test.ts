import { describe, expect, it } from "vitest";
import { SEO_RELATED_PAGE_IDS } from "@/config/seo-pages";
import {
  PILLAR_CHOICE_MODEL,
  PILLAR_IDS,
  applyPillarAnswer,
  buildPillarChoiceRequest,
  recommendPillarsBaseline,
} from "./related-pillars";

describe("pillar ids stay in sync with SEO", () => {
  it("matches SEO_RELATED_PAGE_IDS exactly", () => {
    expect([...PILLAR_IDS]).toEqual([...SEO_RELATED_PAGE_IDS]);
  });
});

describe("recommendPillarsBaseline", () => {
  it("is deterministic for the same input", () => {
    const first = recommendPillarsBaseline(
      "How to track student payments and debt",
      "See who paid and who still has debt on the student record.",
      ["payments"],
    );
    const second = recommendPillarsBaseline(
      "How to track student payments and debt",
      "See who paid and who still has debt on the student record.",
      ["payments"],
    );
    expect(second).toEqual(first);
    expect(first[0]).toBe("payments");
  });

  it("ranks the matching pillar first and caps at three", () => {
    const ranked = recommendPillarsBaseline(
      "Weekly lesson schedule for groups and teachers",
      "Plan theory and driving practice, mark attendance, compare branch revenue and trial pricing.",
      [],
    );
    expect(ranked[0]).toBe("schedule");
    expect(ranked.length).toBeLessThanOrEqual(3);
    expect(new Set(ranked).size).toBe(ranked.length);
  });

  it("returns empty when nothing matches", () => {
    expect(recommendPillarsBaseline("Hello world", "Nothing relevant here.", [])).toEqual([]);
  });

  it("matches Russian Cyrillic copy", () => {
    const ranked = recommendPillarsBaseline(
      "Оплаты и задолженность автошколы",
      "Смотрите оплаты и остаток долга в карточке курсанта.",
      [],
    );
    expect(ranked[0]).toBe("payments");
  });

  it("returns empty for stopword-only and single-char input", () => {
    expect(recommendPillarsBaseline("and the for with", "or and the", [])).toEqual([]);
    expect(recommendPillarsBaseline("a b c", "x y z", [])).toEqual([]);
    expect(recommendPillarsBaseline("va bir uchun", "bilan qanday", [])).toEqual([]);
    expect(recommendPillarsBaseline("и в на для", "как что или", [])).toEqual([]);
  });

  it("keeps PILLAR_IDS order on score ties", () => {
    // "payment" (+3 payments) and "tariff" (+3 pricing) tie; payments precedes pricing.
    expect(recommendPillarsBaseline("payment tariff", "", [])).toEqual([
      "payments",
      "pricing",
    ]);
  });

  it("ranks a title match above excerpt-only matches", () => {
    const ranked = recommendPillarsBaseline(
      "tariff and trial",
      "payment debt schedule group",
      [],
    );
    expect(ranked[0]).toBe("pricing");
  });

  it("matches the multi-word keyword via split tokens and bigram overlap", () => {
    const ranked = recommendPillarsBaseline("Book a driving lesson", "", []);
    expect(ranked[0]).toBe("schedule");
  });

  it("matches Uzbek copy case-insensitively", () => {
    const ranked = recommendPillarsBaseline("TO'LOVLAR VA QARZDORLIK", "", []);
    expect(ranked[0]).toBe("payments");
  });

  it("does not stem bare past-tense paid to payment", () => {
    // Substring morphology only: "paid" matches no keyword, so this stays empty.
    expect(recommendPillarsBaseline("Who paid for the course", "", [])).toEqual([]);
  });

  it("excludes the current pillar when given", () => {
    const withoutSelf = recommendPillarsBaseline(
      "Weekly lesson schedule for groups and teachers",
      "",
      [],
      "schedule",
    );
    expect(withoutSelf).not.toContain("schedule");
  });

  it("applies the minScore threshold", () => {
    expect(recommendPillarsBaseline("tariff", "", []).length).toBeGreaterThan(0);
    expect(recommendPillarsBaseline("tariff", "", [], undefined, 10)).toEqual([]);
    expect(recommendPillarsBaseline("tariff", "", [], undefined, 3)[0]).toBe("pricing");
  });

  it("never throws on non-string inputs", () => {
    expect(recommendPillarsBaseline(42, null, "nope")).toEqual([]);
    expect(recommendPillarsBaseline(undefined, undefined, undefined)).toEqual([]);
    expect(recommendPillarsBaseline(["x"], { y: 1 }, 7)).toEqual([]);
  });
});

describe("buildPillarChoiceRequest", () => {
  it("returns the Drex contract with model, state and typed questions", () => {
    const request = buildPillarChoiceRequest("Title", "Excerpt", ["payments"]);
    expect(request.model).toBe("drex-v2.0");
    expect(request.model).toBe(PILLAR_CHOICE_MODEL);
    expect(request.state).toEqual({ title: "Title", excerpt: "Excerpt", tags: ["payments"] });
    expect(request.questions.related_pillars.type).toBe("choice");
    expect(request.questions.related_pillars.instructions).toContain("uz");
    expect(Object.keys(request.questions.related_pillars.criteria).sort()).toEqual(
      [...PILLAR_IDS].sort(),
    );
  });

  it("puts the locale into instructions", () => {
    expect(buildPillarChoiceRequest("T", "E", [], "ru").questions.related_pillars.instructions).toContain(
      "ru",
    );
    expect(buildPillarChoiceRequest("T", "E", [], "en").questions.related_pillars.instructions).toContain(
      "en",
    );
  });

  it("accepts a model override", () => {
    const request = buildPillarChoiceRequest("T", "E", [], "uz", "drex-v3.0");
    expect(request.model).toBe("drex-v3.0");
  });

  it("coerces non-string inputs instead of throwing", () => {
    const request = buildPillarChoiceRequest(42, null, 7);
    expect(request.state).toEqual({ title: "42", excerpt: "", tags: [] });
  });
});

describe("applyPillarAnswer", () => {
  it("merges Drex picks first and fills from baseline to three", () => {
    const baseline = ["attendance", "branches"];
    const result = applyPillarAnswer(baseline, ["payments"]);
    expect(result).toEqual(["payments", "attendance", "branches"]);
    expect(baseline).toEqual(["attendance", "branches"]);
  });

  it("dedupes picks against the baseline fill", () => {
    expect(applyPillarAnswer(["attendance", "branches"], ["attendance"])).toEqual([
      "attendance",
      "branches",
    ]);
  });

  it("fills a two-pick answer with the baseline remainder", () => {
    expect(applyPillarAnswer(["schedule", "attendance"], ["pricing", "branches"])).toEqual([
      "pricing",
      "branches",
      "schedule",
    ]);
  });

  it("falls back to the validated baseline for missing or invalid answers", () => {
    const baseline = ["payments"];
    expect(applyPillarAnswer([...baseline])).toEqual(["payments"]);
    expect(applyPillarAnswer([...baseline], ["nope", 42])).toEqual(["payments"]);
  });

  it("sanitizes a polluted baseline in every path", () => {
    const polluted = ["payments", "nope", 42, "payments", "schedule", "attendance", "branches", "pricing"];
    expect(applyPillarAnswer(polluted, ["unknown"])).toEqual([
      "payments",
      "schedule",
      "attendance",
    ]);
    expect(applyPillarAnswer(polluted, { choice: "nope" })).toEqual([
      "payments",
      "schedule",
      "attendance",
    ]);
  });

  it("returns empty for a non-array baseline with an invalid answer", () => {
    expect(applyPillarAnswer("payments", 42)).toEqual([]);
    expect(applyPillarAnswer(undefined, undefined)).toEqual([]);
  });

  it("normalizes case and surrounding spaces in answers", () => {
    expect(applyPillarAnswer(["attendance"], [" Payments ", "SCHEDULE"])).toEqual([
      "payments",
      "schedule",
      "attendance",
    ]);
  });

  it("accepts Drex envelopes and bare values", () => {
    expect(applyPillarAnswer(["attendance"], { choice: "payments" })).toEqual([
      "payments",
      "attendance",
    ]);
    expect(applyPillarAnswer(["attendance"], { choice: ["pricing", "branches"] })).toEqual([
      "pricing",
      "branches",
      "attendance",
    ]);
    expect(applyPillarAnswer([], { answers: ["pricing", "branches"] })).toEqual([
      "pricing",
      "branches",
    ]);
    expect(applyPillarAnswer([], "payments")).toEqual(["payments"]);
  });

  it("dedupes and caps the answer at three pillars", () => {
    const result = applyPillarAnswer([], ["payments", "payments", "schedule", "attendance", "branches"]);
    expect(result).toEqual(["payments", "schedule", "attendance"]);
  });
});
