import { describe, it, expect } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("formats positive numbers with spaces and so‘m suffix", () => {
    expect(formatMoney(3500000)).toBe("3 500 000 so‘m");
    expect(formatMoney(2800000)).toBe("2 800 000 so‘m");
    expect(formatMoney(0)).toBe("0 so‘m");
  });

  it("uses the correct Uzbek single quote ‘ (U+2018)", () => {
    const formatted = formatMoney(100000);
    expect(formatted).toContain("so‘m");
    expect(formatted).not.toContain("so'm");
  });
});
