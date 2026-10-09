import type { Locale } from "@/i18n/config";
import type { FinanceBranchId } from "@/components/landing/finance-preview-model";

export interface FinancePreviewContent {
  title: string;
  sample: string;
  period: string;
  currency: string;
  filter: string;
  allBranches: string;
  branches: Record<FinanceBranchId, string>;
  revenue: string;
  debt: string;
  branchRevenue: string;
  students: string;
  debtors: string;
  remaining: string;
  instruction: string;
  payment: string;
  recorded: string;
  paymentFor: string;
  success: string;
  reset: string;
  resetSuccess: string;
  disclaimer: string;
  noScript: string;
  workflowTitle: string;
  workflowDescription: string;
}

export const financePreviewContent: Record<Locale, FinancePreviewContent> = {
  uz: {
    title: "Rahbar paneli",
    sample: "Interaktiv namuna",
    period: "Namuna maktab · 1–30 sentabr",
    currency: "so‘m",
    filter: "Filialni tanlang",
    allBranches: "Barchasi",
    branches: { chilonzor: "Chilonzor", yunusobod: "Yunusobod", sergeli: "Sergeli" },
    revenue: "Tushum",
    debt: "Qarzdorlik",
    branchRevenue: "Filiallar tushumi",
    students: "Talaba",
    debtors: "Qarzdorlar",
    remaining: "Qolgan to‘lov",
    instruction: "To‘lovni qayd eting. Tushum va qarzdorlik qanday o‘zgarishini ko‘ring.",
    payment: "Namuna to‘lovini qayd etish",
    recorded: "To‘lov qayd etildi",
    paymentFor: "{student} uchun",
    success: "Tushum oshdi. Qarzdorlik shu summaga kamaydi.",
    reset: "Qayta boshlash",
    resetSuccess: "Namuna boshlang‘ich holatga qaytdi.",
    disclaimer: "To‘qima ma’lumotlar. O‘zgarishlar saqlanmaydi; bu to‘lov qabul qilish xizmati emas.",
    noScript: "Bu statik namuna. Sinab ko‘rish uchun brauzeringizda JavaScript’ni yoqing.",
    workflowTitle: "Jamoangiz ishlaydi. Hisob bir joyda.",
    workflowDescription: "Talabalar, to‘lovlar va darslarni alohida jadvallardan bitta tartibli jarayonga birlashtiring.",
  },
  ru: {
    title: "Панель руководителя",
    sample: "Интерактивный пример",
    period: "Пример автошколы · 1–30 сентября",
    currency: "сум",
    filter: "Выберите филиал",
    allBranches: "Все",
    branches: { chilonzor: "Чиланзар", yunusobod: "Юнусабад", sergeli: "Сергели" },
    revenue: "Поступления",
    debt: "Задолженность",
    branchRevenue: "Поступления по филиалам",
    students: "Курсант",
    debtors: "Должники",
    remaining: "Остаток оплаты",
    instruction: "Отметьте оплату и посмотрите, как меняются поступления и задолженность.",
    payment: "Отметить пример оплаты",
    recorded: "Оплата отмечена",
    paymentFor: "для {student}",
    success: "Поступления выросли. Задолженность уменьшилась на ту же сумму.",
    reset: "Начать заново",
    resetSuccess: "Исходные данные примера восстановлены.",
    disclaimer: "Вымышленные данные. Изменения не сохраняются; это не сервис приёма платежей.",
    noScript: "Это статичный пример. Чтобы попробовать, включите JavaScript в браузере.",
    workflowTitle: "Команда работает. Учёт в одном месте.",
    workflowDescription: "Объедините учёт курсантов, оплат и занятий в один понятный рабочий процесс.",
  },
  en: {
    title: "Owner overview",
    sample: "Interactive example",
    period: "Sample school · 1–30 September",
    currency: "UZS",
    filter: "Choose a branch",
    allBranches: "All branches",
    branches: { chilonzor: "Chilonzor", yunusobod: "Yunusobod", sergeli: "Sergeli" },
    revenue: "Revenue",
    debt: "Outstanding debt",
    branchRevenue: "Revenue by branch",
    students: "Student",
    debtors: "Students with debt",
    remaining: "Balance due",
    instruction: "Record a payment and see revenue and outstanding debt change together.",
    payment: "Record example payment",
    recorded: "Payment recorded",
    paymentFor: "for {student}",
    success: "Revenue increased. Outstanding debt fell by the same amount.",
    reset: "Start again",
    resetSuccess: "The example is back to its starting values.",
    disclaimer: "Fictional data. Changes are not saved; this is not a payment service.",
    noScript: "This is a static example. Enable JavaScript in your browser to try it.",
    workflowTitle: "Your team works. The records stay together.",
    workflowDescription: "Bring students, payments and lessons from separate spreadsheets into one clear workflow.",
  },
};
