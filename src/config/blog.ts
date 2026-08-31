import type { Locale } from "@/i18n/config";

type BlogCopy = {
  skipLink: string;
  eyebrow: string;
  title: string;
  description: string;
  articleLabel: string;
  readArticle: string;
  emptyTitle: string;
  emptyBody: string;
  backToBlog: string;
  minutes: string;
  closingTitle: string;
  closingBody: string;
  closingCta: string;
  evidenceLabel: string;
  evidenceImageAlt: string;
  tagsLabel: string;
};

export const BLOG_COPY: Record<Locale, BlogCopy> = {
  uz: {
    skipLink: "Asosiy kontentga o‘tish",
    eyebrow: "Avtomaktab boshqaruvi · amaliy maqolalar",
    title: "Tartibli boshqaruv uchun sodda qo‘llanmalar.",
    description: "To‘lov, qarzdorlik, jadval va davomatni raqamlashtirish haqida tekshirilgan, amaliy materiallar.",
    articleLabel: "Qo‘llanma",
    readArticle: "Maqolani o‘qish",
    emptyTitle: "Birinchi material tayyorlanmoqda",
    emptyBody: "Tasdiqlanmagan va’dani tez chiqarishdan ko‘ra, foydali maqolani tekshirib chiqaramiz.",
    backToBlog: "Barcha maqolalar",
    minutes: "daqiqalik o‘qish",
    closingTitle: "Avval tizimni o‘zingiz ko‘ring.",
    closingBody: "Sintetik demo ochiladi — ma’lumot qoldirish shart emas.",
    closingCta: "Demo’ni hozir oching",
    evidenceLabel: "automaktab.uz · mahsulot kadri",
    evidenceImageAlt: "automaktab.uz sintetik demo rahbar paneli",
    tagsLabel: "Maqola mavzulari",
  },
  ru: {
    skipLink: "Перейти к основному содержимому",
    eyebrow: "Управление автошколой · практические статьи",
    title: "Понятные руководства для системного управления.",
    description: "Проверенные материалы о цифровом учёте оплат, долгов, расписания и посещаемости.",
    articleLabel: "Руководство",
    readArticle: "Читать статью",
    emptyTitle: "Первый материал готовится",
    emptyBody: "Лучше проверить полезную статью, чем быстро публиковать неподтверждённые обещания.",
    backToBlog: "Все статьи",
    minutes: "минут чтения",
    closingTitle: "Сначала посмотрите саму систему.",
    closingBody: "Синтетическое демо откроется сразу — контакты не требуются.",
    closingCta: "Открыть демо сейчас",
    evidenceLabel: "automaktab.uz · кадр продукта",
    evidenceImageAlt: "Панель владельца в синтетическом демо automaktab.uz",
    tagsLabel: "Темы статьи",
  },
  en: {
    skipLink: "Skip to main content",
    eyebrow: "Driving-school operations · practical articles",
    title: "Plain guides for running a more orderly school.",
    description: "Verified, practical material on digitizing payments, debt, schedules, and attendance.",
    articleLabel: "Guide",
    readArticle: "Read the article",
    emptyTitle: "The first guide is being prepared",
    emptyBody: "A useful article deserves verification before unsupported promises are published.",
    backToBlog: "All articles",
    minutes: "minute read",
    closingTitle: "See the system itself first.",
    closingBody: "The synthetic demo opens immediately, with no contact gate.",
    closingCta: "Open the demo now",
    evidenceLabel: "automaktab.uz · product evidence",
    evidenceImageAlt: "automaktab.uz synthetic demo owner dashboard",
    tagsLabel: "Article topics",
  },
};
