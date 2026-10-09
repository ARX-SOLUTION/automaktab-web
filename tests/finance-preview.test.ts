import { describe, expect, it } from "vitest";
import { FINANCE_BRANCHES, SAMPLE_PAYMENT, financeSnapshot } from "@/components/landing/finance-preview-model";

describe("synthetic finance playground", () => {
  it("conserves the combined amount when a payment moves from debt to revenue", () => {
    const before = financeSnapshot("all", []);
    const after = financeSnapshot("all", ["chilonzor"]);
    expect(after.revenue - before.revenue).toBe(SAMPLE_PAYMENT);
    expect(before.debt - after.debt).toBe(SAMPLE_PAYMENT);
    expect(after.revenue + after.debt).toBe(before.revenue + before.debt);
    expect(after.branches.slice(1)).toEqual(before.branches.slice(1));
  });

  it("keeps branch totals consistent with the all-branch result after several payments", () => {
    const payments = ["chilonzor", "sergeli"] as const;
    const all = financeSnapshot("all", payments);
    const parts = FINANCE_BRANCHES.map(({ id }) => financeSnapshot(id, payments));
    expect(parts.reduce((sum, part) => sum + part.revenue, 0)).toBe(all.revenue);
    expect(parts.reduce((sum, part) => sum + part.debt, 0)).toBe(all.debt);
    expect(financeSnapshot("yunusobod", payments).paymentTarget.id).toBe("yunusobod");
  });

  it("does not count a repeated payment twice or mutate its baseline", () => {
    expect(financeSnapshot("all", ["chilonzor", "chilonzor"]))
      .toEqual(financeSnapshot("all", ["chilonzor"]));
    financeSnapshot("sergeli", ["sergeli"]);
    expect(financeSnapshot("all", [])).toMatchObject({ revenue: 18_400_000, debt: 6_200_000 });
  });
});
