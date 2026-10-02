import type { Locale } from "@/i18n/config";

export interface DebtStoryContent {
  title: string;
  lead: string;
  listTitle: string;
  sample: string;
  nameLabel: string;
  debtLabel: string;
  totalLabel: string;
  paymentLabel: string;
  exportFile: string;
  currency: string;
  numberLocale: string;
  /** Notebook scribbles shown before the list takes shape. Decorative only. */
  notes: [string, string, string, string];
}

export interface Debtor {
  name: string;
  price: number;
  paid: number;
  /** A payment that lands during the story and lowers the running balance. */
  payment?: number;
}

/** Synthetic students, ordered by remaining balance before the payment. */
export const DEBTORS: Debtor[] = [
  { name: "Rahimov Bekzod", price: 3600000, paid: 1200000 },
  { name: "Karimov Jasur", price: 3600000, paid: 1800000, payment: 600000 },
  { name: "Yo‘ldosheva Malika", price: 2700000, paid: 1800000 },
  { name: "Toshpo‘latova Dilnoza", price: 2700000, paid: 2250000 },
];

export const debtStory: Record<Locale, DebtStoryContent> = {
  uz: {
    title: "Kim qancha qarz?",
    lead: "Daftar emas, ro‘yxat.",
    listTitle: "Qarzdorlar",
    sample: "Namuna",
    nameLabel: "Talaba",
    debtLabel: "Qarz",
    totalLabel: "Jami qarz",
    paymentLabel: "To‘lov",
    exportFile: "talabalar.xlsx",
    currency: "so‘m",
    numberLocale: "fr-FR",
    notes: ["Bekzod 2,4 mln?", "Jasur qoldi 1 800", "Malika to‘ladimi?", "Dilnoza 450 ming"],
  },
  ru: {
    title: "Кто сколько должен?",
    lead: "Не тетрадь, а список.",
    listTitle: "Должники",
    sample: "Пример",
    nameLabel: "Ученик",
    debtLabel: "Долг",
    totalLabel: "Общий долг",
    paymentLabel: "Оплата",
    exportFile: "talabalar.xlsx",
    currency: "сум",
    numberLocale: "fr-FR",
    notes: ["Бекзод 2,4 млн?", "Жасур остаток 1 800", "Малика оплатила?", "Дилноза 450 тыс."],
  },
  en: {
    title: "Who owes what?",
    lead: "A list, not a notebook.",
    listTitle: "Balances due",
    sample: "Sample",
    nameLabel: "Student",
    debtLabel: "Owed",
    totalLabel: "Total owed",
    paymentLabel: "Payment",
    exportFile: "talabalar.xlsx",
    currency: "UZS",
    numberLocale: "en-US",
    notes: ["Bekzod 2.4m?", "Jasur owes 1,800", "Did Malika pay?", "Dilnoza 450k"],
  },
};
