/** Synthetic values for the public playground. No CRM or payment API is used. */
export const FINANCE_BRANCHES = [
  { id: "chilonzor", revenue: 8_400_000, debt: 2_400_000, student: "Bekzod Rahimov" },
  { id: "yunusobod", revenue: 6_000_000, debt: 2_100_000, student: "Jasur Karimov" },
  { id: "sergeli", revenue: 4_000_000, debt: 1_700_000, student: "Malika Yo‘ldosheva" },
] as const;

export type FinanceBranchId = typeof FINANCE_BRANCHES[number]["id"];
export type FinanceFilter = FinanceBranchId | "all";
export const SAMPLE_PAYMENT = 600_000;

export function financeSnapshot(filter: FinanceFilter, payments: readonly FinanceBranchId[]) {
  const branches = FINANCE_BRANCHES.map((branch) => {
    const paid = payments.includes(branch.id);
    return {
      ...branch,
      paid,
      revenue: branch.revenue + (paid ? SAMPLE_PAYMENT : 0),
      debt: branch.debt - (paid ? SAMPLE_PAYMENT : 0),
    };
  });
  const visible = branches.filter((branch) => filter === "all" || branch.id === filter);
  return {
    branches,
    visible,
    revenue: visible.reduce((sum, branch) => sum + branch.revenue, 0),
    debt: visible.reduce((sum, branch) => sum + branch.debt, 0),
    // A visitor can record one example payment per branch. Repeated clicks are idempotent.
    paymentTarget: filter === "all" ? branches[0] : visible[0],
  };
}
