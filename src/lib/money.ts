/**
 * Formats a numeric amount as Uzbek soums with space thousands separator.
 * Example: 3500000 -> "3 500 000 so‘m"
 * Adheres to design.md §3.3 and §10.1 (Uzbek single quote ‘ U+2018).
 */
const moneyFormatter = new Intl.NumberFormat("fr-FR");

export function formatMoney(amount: number): string {
  const formatted = moneyFormatter.format(amount).replace(/\u202F/g, " ");
  return `${formatted} so‘m`;
}
