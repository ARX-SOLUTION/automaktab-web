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
    skipLink: "Asosiy qismga o‘tish",
    eyebrow: "Avtomaktab boshqaruvi",
    title: "Avtomaktab boshqaruvi uchun amaliy maslahatlar.",
    description: "Talabalar, to‘lovlar, qarzdorlik, jadval va davomatni yuritish bo‘yicha sodda qo‘llanmalar.",
    articleLabel: "Qo‘llanma",
    readArticle: "Maqolani o‘qish",
    emptyTitle: "Hozircha maqolalar yo‘q",
    emptyBody: "Avtomaktab boshqaruviga oid yangi maqolalar shu yerda chiqadi.",
    backToBlog: "Barcha maqolalar",
    minutes: "daqiqalik o‘qish",
    closingTitle: "Tizimni demoda sinab ko‘ring.",
    closingBody: "Demo namuna ma’lumotlari bilan ishlaydi. Telefon raqamingizni qoldirish shart emas.",
    closingCta: "Demoni ochish",
    evidenceLabel: "automaktab.uz · Demo",
    evidenceImageAlt: "automaktab.uz demosida namuna maktabning rahbar paneli",
    tagsLabel: "Maqola mavzulari",
  },
  ru: {
    skipLink: "Перейти к основному содержимому",
    eyebrow: "Управление автошколой",
    title: "Практические советы для вашей автошколы.",
    description: "Понятные руководства по учёту курсантов, оплат, долгов, расписания и посещаемости.",
    articleLabel: "Руководство",
    readArticle: "Читать статью",
    emptyTitle: "Статей пока нет",
    emptyBody: "Здесь появятся новые статьи об управлении автошколой.",
    backToBlog: "Все статьи",
    minutes: "минут чтения",
    closingTitle: "Попробуйте систему в демо.",
    closingBody: "В демо используются вымышленные данные. Оставлять номер телефона не нужно.",
    closingCta: "Открыть демо",
    evidenceLabel: "automaktab.uz · Демо",
    evidenceImageAlt: "Панель руководителя вымышленной автошколы в демо automaktab.uz",
    tagsLabel: "Темы статьи",
  },
  en: {
    skipLink: "Skip to main content",
    eyebrow: "Running a driving school",
    title: "Practical guides for running your school.",
    description: "Clear guides to managing students, payments, debt, schedules and attendance.",
    articleLabel: "Guide",
    readArticle: "Read the article",
    emptyTitle: "No articles yet",
    emptyBody: "New articles about running a driving school will appear here.",
    backToBlog: "All articles",
    minutes: "minute read",
    closingTitle: "Try the system in the demo.",
    closingBody: "The demo uses sample data. You do not need to leave your phone number.",
    closingCta: "Open demo",
    evidenceLabel: "automaktab.uz · Demo",
    evidenceImageAlt: "Sample school owner dashboard in the automaktab.uz demo",
    tagsLabel: "Article topics",
  },
};
