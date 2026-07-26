import { describe, expect, it } from "vitest";
import { buildLocaleAlternates } from "./locale-metadata";

describe("buildLocaleAlternates", () => {
  it("builds alternates for a uz (default, unprefixed) path", () => {
    const alternates = buildLocaleAlternates("/", "uz");

    expect(alternates?.canonical).toBe("https://automaktab.uz/");
    expect(alternates?.languages).toEqual({
      uz: "https://automaktab.uz/",
      ru: "https://automaktab.uz/ru",
      en: "https://automaktab.uz/en",
      "x-default": "https://automaktab.uz/",
    });
  });

  it("builds alternates for a ru path, with a self-referencing canonical", () => {
    const alternates = buildLocaleAlternates("/pricing", "ru");

    expect(alternates?.canonical).toBe("https://automaktab.uz/ru/pricing");
    expect(alternates?.languages).toEqual({
      uz: "https://automaktab.uz/pricing",
      ru: "https://automaktab.uz/ru/pricing",
      en: "https://automaktab.uz/en/pricing",
      "x-default": "https://automaktab.uz/pricing",
    });
  });
});
