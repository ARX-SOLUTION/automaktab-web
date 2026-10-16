import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

export const SEO_PAGE_IDS = [
  "payments",
  "schedule",
  "attendance",
  "branches",
  "pricing",
  "leads",
  "privacy",
  "terms",
  "driving",
  "compare",
] as const;

export type SeoPageId = (typeof SEO_PAGE_IDS)[number];

/** Cross-links for product SEO surfaces (legal stubs excluded). */
export const SEO_RELATED_PAGE_IDS = [
  "payments",
  "schedule",
  "attendance",
  "branches",
  "pricing",
  "leads",
] as const satisfies readonly SeoPageId[];

/**
 * Answer-first detail pages (REPORT §13.3). Not in the header/footer menus;
 * reached through `related` links on feature pages, the sitemap and llms.txt.
 */
export const SEO_DETAIL_PAGE_IDS = [
  "driving",
  "compare",
] as const satisfies readonly SeoPageId[];

export const SEO_LEGAL_PAGE_IDS = [
  "privacy",
  "terms",
] as const satisfies readonly SeoPageId[];

type SeoSection = {
  title: string;
  body: string;
};

/** Existing motion components a page can reuse (REPORT §13.2); no new animation. */
export type SeoVisualId =
  | "morning-report"
  | "driving-card"
  | "scene:director"
  | "scene:registrar"
  | "scene:accountant"
  | "scene:teacher"
  | "scene:leads"
  | "scene:fleet"
  | "scene:education";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoSource = {
  label: string;
  url: string;
  checkedAt: string;
};

export type SeoComparison = {
  caption: string;
  /** First column header, then one header per compared product. */
  columns: readonly string[];
  rows: readonly { label: string; cells: readonly string[] }[];
  legend: string;
};

export type SeoPageCopy = {
  segments: readonly string[];
  title: string;
  description: string;
  keywords: readonly string[];
  eyebrow: string;
  heading: string;
  intro: string;
  sections: readonly SeoSection[];
  /** Answer-first sentence shown right under the H1. */
  definition?: string;
  visual?: SeoVisualId;
  comparison?: SeoComparison;
  faq?: readonly SeoFaqItem[];
  sources?: readonly SeoSource[];
  /** Explicit internal links; falls back to SEO_RELATED_PAGE_IDS. */
  related?: readonly SeoPageId[];
  relatedLabel: string;
  cta: {
    title: string;
    body: string;
    label: string;
  };
  updatedAt: string;
};

export const SEO_PAGES: Record<
  SeoPageId,
  Record<Locale, SeoPageCopy>
> = {
  payments: {
    uz: {
      segments: ["features", "payments-and-debt"],
      title: "Avtomaktab to‘lovlari va qarzdorlik hisobi | automaktab.uz",
      description:
        "O‘quvchilar to‘lovlari va qolgan qarzni bir joyda ko‘ring. Qarzdorlarni filial va guruh bo‘yicha toping.",
      keywords: [
        "avtomaktab to‘lovlari",
        "qarzdorlik nazorati",
        "avtomaktab CRM",
      ],
      eyebrow: "To‘lovlar nazorati",
      heading: "Avtomaktab to‘lovlari va qarzdorligini boshqaring.",
      intro:
        "Kim qancha to‘laganini va qancha qarzi qolganini ko‘ring. O‘quvchi kartasi va qarzdorlar ro‘yxati bir tizimda.",
      definition:
        "automaktab.uz har bir o‘quvchining to‘lovlari va qolgan qarzini kartasida saqlaydi; qarzdorlarni filial bo‘yicha saralaysiz, guruh sahifasida esa har bir o‘quvchining qarz holati ko‘rinadi.",
      visual: "scene:director",
      sections: [
        {
          title: "To‘lovlar o‘quvchi kartasida",
          body:
            "O‘quvchining to‘lov tarixi va qolgan qarzini kartasidan tekshiring. Kerakli ma’lumot boshqa faylda qolib ketmaydi.",
        },
        {
          title: "Qarzdorlarni tez toping",
          body:
            "Qarzdorlar ro‘yxatidan kim bilan bog‘lanish yoki qaysi to‘lovni tekshirish kerakligini ko‘ring.",
        },
        {
          title: "Demoda sinab ko‘ring",
          body:
            "Namuna ma’lumotlari bilan to‘lovlar va rahbar panelini tekshiring. Telefon raqamingizni qoldirish shart emas.",
        },
        {
          title: "To‘lov usullari va Excel",
          body:
            "To‘lovni maktab xodimi kiritadi: naqd, karta yoki bank o‘tkazmasi. Har bir to‘lov alohida yoziladi va o‘quvchining qolgan qarzini kamaytiradi, shuning uchun bo‘lib to‘lash ham aniq ko‘rinadi. To‘lovlar va o‘quvchilar ro‘yxatini Excel faylga yuklab olish mumkin, masalan, buxgalterga yoki rahbarga yuborish uchun.",
        },
        {
          title: "Rahbar paneli va filiallar",
          body:
            "O‘quvchilar ro‘yxatida qarzi borlarni alohida filtrlang va qarz miqdori bo‘yicha saralang. Rahbar panelida davr tushumi va o‘quvchilar qarzdorligi jami va har bir filial bo‘yicha ko‘rinadi.",
        },
        {
          title: "Kim nimani ko‘radi",
          body:
            "To‘lov ma’lumotlarini faqat ruxsati bor xodimlar ko‘radi va kiritadi. Har bir xodim o‘ziga ruxsat berilgan filiallar to‘lovlarini ko‘radi. To‘lov yoki o‘quvchi kartasidagi o‘zgarishni kim va qachon qilgani audit tarixida qoladi.",
        },
        {
          title: "O‘quvchi kartasida nima bor",
          body:
            "Kartada kurs narxi, to‘langan summa, qolgan qarz va to‘lovlar tarixi turadi. Shartnoma raqami, 083 tibbiy ma’lumotnoma va hujjatlar holati ham shu kartada, shuning uchun o‘quvchi haqida savolga bitta joydan javob topasiz.",
        },
      ],
      faq: [
        {
          question: "Qanday to‘lov usullari bor?",
          answer:
            "Naqd, karta va bank o‘tkazmasi. To‘lovni maktab xodimi kiritadi. Click yoki Payme orqali onlayn to‘lov hozir yo‘q.",
        },
        {
          question: "Bo‘lib to‘lash qanday ko‘rinadi?",
          answer:
            "Har bir to‘lov alohida yoziladi. Qolgan qarz o‘quvchi kartasida va qarzdorlar ro‘yxatida darhol yangilanadi.",
        },
        {
          question: "To‘lovlarni Excel'ga yuklab olsa bo‘ladimi?",
          answer:
            "Ha. To‘lovlar ro‘yxati va o‘quvchilar ro‘yxati xlsx faylga yuklab olinadi.",
        },
        {
          question: "O‘quvchi o‘z to‘lovini ko‘radimi?",
          answer:
            "Hozir yo‘q. O‘quvchi kabinetida jadval va davomat bor, to‘lovlar esa faqat maktab xodimlariga ko‘rinadi.",
        },
        {
          question: "Qarzdorlar haqida Telegram'da xabar keladimi?",
          answer:
            "Yo‘q. 08:00 dagi Telegram hisobotida kechagi tushum va yangi o‘quvchilar soni bor. Qarzdorlarni tizimdagi ro‘yxatdan ko‘rasiz.",
        },
      ],
      related: ["branches", "attendance", "compare"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "To‘lovlar hisobini demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "payments-and-debt"],
      title: "Учёт оплат и задолженности автошколы | automaktab.uz",
      description:
        "Смотрите оплаты и остаток долга в карточке курсанта. Находите должников по филиалу и группе.",
      keywords: ["оплаты автошколы", "задолженность автошколы", "CRM автошколы"],
      eyebrow: "Контроль оплат",
      heading: "Управляйте оплатами и задолженностью автошколы.",
      intro:
        "Проверяйте, сколько курсант оплатил и сколько осталось. Карточка курсанта и список задолженности находятся в одной системе.",
      definition:
        "automaktab.uz хранит оплаты и остаток долга каждого курсанта в его карточке; должников можно отфильтровать по филиалу, а на странице группы виден долг каждого курсанта.",
      visual: "scene:director",
      sections: [
        {
          title: "Оплаты в карточке курсанта",
          body:
            "Проверяйте историю оплат и остаток долга в карточке. Не нужно искать эти записи в другом файле.",
        },
        {
          title: "Быстро находите должников",
          body:
            "Список задолженности помогает понять, с кем связаться и какие оплаты проверить.",
        },
        {
          title: "Попробуйте в демо",
          body:
            "Проверьте оплаты и панель руководителя на вымышленных данных. Оставлять номер телефона не нужно.",
        },
        {
          title: "Способы оплаты и Excel",
          body:
            "Оплату вносит сотрудник школы: наличные, карта или банковский перевод. Каждая оплата записывается отдельно и уменьшает остаток долга курсанта, поэтому оплата частями тоже видна точно. Списки оплат и курсантов можно выгрузить в Excel, например, для бухгалтера или руководителя.",
        },
        {
          title: "Панель руководителя и филиалы",
          body:
            "В списке курсантов отфильтруйте тех, у кого есть долг, и отсортируйте по сумме долга. На панели руководителя выручка за период и задолженность курсантов видны в целом и по каждому филиалу.",
        },
        {
          title: "Кто что видит",
          body:
            "Платёжные данные видят и вносят только сотрудники с нужными правами. Каждый сотрудник видит оплаты только разрешённых ему филиалов. Кто и когда изменил оплату или карточку курсанта, остаётся в журнале аудита.",
        },
        {
          title: "Что в карточке курсанта",
          body:
            "В карточке указаны цена курса, оплаченная сумма, остаток долга и история оплат. Номер договора, медсправка 083 и статус документов тоже здесь, поэтому ответ на вопрос о курсанте находится в одном месте.",
        },
      ],
      faq: [
        {
          question: "Какие способы оплаты есть?",
          answer:
            "Наличные, карта и банковский перевод. Оплату вносит сотрудник школы. Онлайн-оплаты через Click или Payme сейчас нет.",
        },
        {
          question: "Как видна оплата частями?",
          answer:
            "Каждая оплата записывается отдельно. Остаток долга сразу обновляется в карточке курсанта и в списке должников.",
        },
        {
          question: "Можно ли выгрузить оплаты в Excel?",
          answer:
            "Да. Список оплат и список курсантов выгружаются в файл xlsx.",
        },
        {
          question: "Видит ли курсант свои оплаты?",
          answer:
            "Сейчас нет. В кабинете курсанта есть расписание и посещаемость, а оплаты видят только сотрудники школы.",
        },
        {
          question: "Приходят ли уведомления о должниках в Telegram?",
          answer:
            "Нет. В отчёте в Telegram в 08:00 есть вчерашняя выручка и число новых курсантов. Должников смотрите в списке в системе.",
        },
      ],
      related: ["branches", "attendance", "compare"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите учёт оплат в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "payments-and-debt"],
      title: "Driving school payment and debt tracking | automaktab.uz",
      description:
        "See payments and outstanding debt on each student record. Find students with debt by branch and group.",
      keywords: ["driving school payments", "driving school debt", "driving school CRM"],
      eyebrow: "Payment control",
      heading: "Keep track of payments and student debt.",
      intro:
        "See how much each student has paid and what remains. Student records and the debt list are in one system.",
      definition:
        "automaktab.uz keeps every student's payments and outstanding debt on their record; you filter students with debt by branch, and the group page shows each student's debt status.",
      visual: "scene:director",
      sections: [
        {
          title: "Payments stay with the student record",
          body:
            "Check payment history and outstanding debt on the student record. No need to find them in another file.",
        },
        {
          title: "Find students with outstanding payments",
          body:
            "Use the debt list to see who needs a follow-up and which payments need checking.",
        },
        {
          title: "Try it in the demo",
          body:
            "Check payments and the owner dashboard with sample data. You do not need to leave your phone number.",
        },
        {
          title: "Payment methods and Excel",
          body:
            "School staff record each payment: cash, card or bank transfer. Every payment is stored separately and reduces the student's outstanding debt, so installments stay clear. Payment and student lists can be downloaded to Excel, for example for the accountant or the owner.",
        },
        {
          title: "Owner dashboard and branches",
          body:
            "Filter the student list to those with debt and sort by the amount owed. The owner dashboard shows revenue for the period and student debt in total and for each branch.",
        },
        {
          title: "Who sees what",
          body:
            "Only staff with the right permissions see and record payment data. Each staff member sees payments only for the branches they are allowed to access. Who changed a payment or a student record, and when, stays in the audit log.",
        },
        {
          title: "What the student record holds",
          body:
            "The record shows the course price, amount paid, outstanding debt and payment history. The contract number, the 083 medical certificate and document status sit on the same record, so questions about a student have one place to look.",
        },
      ],
      faq: [
        {
          question: "Which payment methods are supported?",
          answer:
            "Cash, card and bank transfer. School staff record the payment. Online payment through Click or Payme is not available.",
        },
        {
          question: "How do installments show up?",
          answer:
            "Each payment is stored separately. The remaining debt updates right away on the student record and in the debtor list.",
        },
        {
          question: "Can I export payments to Excel?",
          answer:
            "Yes. The payment list and the student list download as xlsx files.",
        },
        {
          question: "Can students see their own payments?",
          answer:
            "Not at the moment. The student portal shows the schedule and attendance; payments are visible to school staff only.",
        },
        {
          question: "Do debtor alerts come to Telegram?",
          answer:
            "No. The 08:00 Telegram report has yesterday's revenue and the number of new students. You see students with debt in the list inside the system.",
        },
      ],
      related: ["branches", "attendance", "compare"],
      relatedLabel: "Other features",
      cta: {
        title: "See payment records in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  schedule: {
    uz: {
      segments: ["features", "schedules-and-groups"],
      title: "Avtomaktab dars jadvali va guruhlar | automaktab.uz",
      description:
        "Nazariya va amaliy darslarni guruh hamda o‘qituvchi bilan haftalik jadvalda rejalashtiring.",
      keywords: ["avtomaktab dars jadvali", "avtomaktab guruhlari", "nazariya va amaliy darslar"],
      eyebrow: "Jadval va guruhlar",
      heading: "Dars jadvali va guruhlar bir tizimda.",
      intro:
        "Nazariya va haydash mashg‘ulotlarini bir jadvalda rejalashtiring. Guruh, o‘qituvchi va dars vaqtini belgilang.",
      sections: [
        {
          title: "Bir haftalik darslar ko‘z oldingizda",
          body:
            "Haftalik jadvaldan qaysi kuni qanday dars borligini ko‘ring. Turli daftar va xabarlardan yig‘ish shart emas.",
        },
        {
          title: "Guruh va o‘qituvchini belgilang",
          body:
            "Har bir darsga guruh va o‘qituvchini biriktiring. Jadvaldagi o‘zgarishlarni shu yerda kuzating.",
        },
        {
          title: "Nazariya va haydash bir jadvalda",
          body:
            "Dars turini kalendardan ko‘ring. Nazariya va amaliy haydash mashg‘ulotlarini alohida ajrating.",
        },
      ],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Dars jadvalini demoda ko‘ring.",
        body: "Namuna maktabning haftalik jadvali, guruhlari va darslarini tekshiring.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["features", "schedules-and-groups"],
      title: "Расписание и группы автошколы | automaktab.uz",
      description:
        "Планируйте теорию и практику в недельном расписании с группой и преподавателем.",
      keywords: ["расписание автошколы", "группы автошколы", "теория и практика"],
      eyebrow: "Расписание и группы",
      heading: "Расписание и группы в одной системе.",
      intro:
        "Планируйте теорию и вождение в одном расписании. Для каждого занятия укажите группу, преподавателя и время.",
      sections: [
        {
          title: "Вся неделя перед глазами",
          body:
            "Смотрите, какие занятия запланированы на каждый день. Не нужно собирать расписание из журналов и сообщений.",
        },
        {
          title: "Укажите группу и преподавателя",
          body:
            "Назначьте группу и преподавателя для каждого занятия. Следите за изменениями в том же расписании.",
        },
        {
          title: "Теория и вождение в одном расписании",
          body:
            "Тип занятия виден в календаре. Теорию и практическое вождение легко различить.",
        },
      ],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите расписание в демо.",
        body: "Проверьте недельное расписание, группы и занятия на примере автошколы.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["features", "schedules-and-groups"],
      title: "Driving-school schedules and groups | automaktab.uz",
      description:
        "Plan theory and driving lessons in a weekly schedule. Assign each lesson to a group and teacher.",
      keywords: ["driving school schedule", "driving school groups", "theory and practical lessons"],
      eyebrow: "Schedules and groups",
      heading: "Schedule groups and lessons in one place.",
      intro:
        "Plan theory and driving lessons in one schedule. Set the group, teacher and time for each lesson.",
      sections: [
        {
          title: "See the whole week at a glance",
          body:
            "See which lessons are planned each day. No need to piece together a schedule from notebooks and messages.",
        },
        {
          title: "Assign the group and teacher",
          body:
            "Assign a group and teacher to each lesson. Track changes in the same schedule.",
        },
        {
          title: "Theory and driving in one schedule",
          body:
            "Lesson types are visible in the calendar, making theory and driving practice easy to tell apart.",
        },
      ],
      relatedLabel: "Other features",
      cta: {
        title: "See the schedule in the demo.",
        body: "Explore the weekly schedule, groups and lessons in a sample school.",
        label: "Open demo",
      },
      updatedAt: "2026-09-19",
    },
  },
  attendance: {
    uz: {
      segments: ["features", "digital-attendance"],
      title: "Avtomaktab davomat jurnali | automaktab.uz",
      description:
        "Har bir darsda kim kelganini, kechikkanini yoki kelmaganini belgilang. Davomatni guruh va dars bilan bir joyda yuriting.",
      keywords: ["avtomaktab davomat", "raqamli davomat", "davomat jurnali"],
      eyebrow: "Raqamli davomat",
      heading: "Har bir dars davomatini bir joyda yuriting.",
      intro:
        "Guruh ro‘yxatidan har bir o‘quvchining davomatini belgilang. Qaysi darslarni qoldirganini shu tizimda tekshiring.",
      sections: [
        {
          title: "To‘rtta tushunarli holat",
          body:
            "Keldi, kechikdi, kelmadi yoki uzrli. Har bir o‘quvchining holatini dars ro‘yxatida belgilang.",
        },
        {
          title: "Jadval va davomat yonma-yon",
          body:
            "Dars, guruh va davomat bitta tizimda. Alohida qog‘oz jurnalni qidirishga hojat yo‘q.",
        },
        {
          title: "Dars holatini tekshiring",
          body:
            "Menejer va o‘qituvchi dars ro‘yxatidan kim kelganini va kim dars qoldirganini ko‘radi.",
        },
      ],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Davomatni demoda belgilab ko‘ring.",
        body: "Namuna ma’lumotlari bilan davomat belgilashni sinang.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["features", "digital-attendance"],
      title: "Цифровая посещаемость автошколы | automaktab.uz",
      description:
        "Отмечайте посещаемость каждого занятия: пришёл, опоздал, не пришёл или пропустил по уважительной причине.",
      keywords: ["посещаемость автошколы", "цифровая посещаемость", "журнал посещаемости"],
      eyebrow: "Цифровая посещаемость",
      heading: "Ведите посещаемость каждого занятия в одной системе.",
      intro:
        "Отмечайте посещаемость в списке группы. Здесь же проверяйте, какие занятия пропустил курсант.",
      sections: [
        {
          title: "Четыре понятных статуса",
          body:
            "Пришёл, опоздал, не пришёл или пропустил по уважительной причине. Отметьте каждого курсанта в списке занятия.",
        },
        {
          title: "Расписание и посещаемость рядом",
          body:
            "Занятие, группа и посещаемость находятся в одной системе. Не нужно искать отдельный бумажный журнал.",
        },
        {
          title: "Проверяйте посещаемость занятия",
          body:
            "Менеджер и преподаватель видят, кто пришёл и кто пропустил занятие.",
        },
      ],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Попробуйте отметить посещаемость в демо.",
        body: "Попробуйте журнал посещаемости на вымышленных данных.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["features", "digital-attendance"],
      title: "Digital attendance for driving schools | automaktab.uz",
      description:
        "Record clear attendance statuses for every driving-school lesson: present, late, absent, or excused.",
      keywords: ["driving school attendance", "digital attendance", "attendance record"],
      eyebrow: "Digital attendance",
      heading: "Keep attendance for every lesson together.",
      intro:
        "Mark attendance on the group list. Check which lessons each student has missed in the same system.",
      sections: [
        {
          title: "Four clear attendance choices",
          body:
            "Present, late, absent or excused. Mark each student on the lesson roster.",
        },
        {
          title: "Schedules and attendance stay together",
          body:
            "Lessons, groups and attendance are in one system. No need to find a separate paper register.",
        },
        {
          title: "Check who attended the lesson",
          body:
            "Managers and teachers can see who attended and who missed the lesson.",
        },
      ],
      relatedLabel: "Other features",
      cta: {
        title: "Try taking attendance in the demo.",
        body: "Try the attendance register with sample data.",
        label: "Open demo",
      },
      updatedAt: "2026-09-19",
    },
  },
  branches: {
    uz: {
      segments: ["features", "branch-management"],
      title: "Avtomaktab filiallari boshqaruvi | automaktab.uz",
      description:
        "Filiallar tushumi va qarzdorligini rahbar panelida solishtiring. Maktabning umumiy holatini bir joyda ko‘ring.",
      keywords: ["avtomaktab filiallari", "filiallar boshqaruvi", "rahbar paneli"],
      eyebrow: "Filiallar boshqaruvi",
      heading: "Barcha filiallar holati bir joyda.",
      intro:
        "Filiallar tushumi va qarzdorligini rahbar panelida solishtiring. Qaysi filialga e’tibor kerakligini ko‘ring.",
      sections: [
        {
          title: "Filiallarni alohida va birga ko‘ring",
          body:
            "Har bir filial natijasini va maktabning umumiy holatini bir paneldan tekshiring.",
        },
        {
          title: "Natijalarni bir xil davrda solishtiring",
          body:
            "Filiallar bir tizimda ishlaydi. Rahbar natijalarni solishtirib, qaysi ishni tekshirish kerakligini aniqlaydi.",
        },
        {
          title: "Har bir xodimga kerakli kirish huquqi",
          body:
            "Rahbar, menejer, qabul xodimi, buxgalter va o‘qituvchi ishiga mos bo‘limlarni ko‘radi.",
        },
      ],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Filiallar natijasini demoda ko‘ring.",
        body: "Rahbar panelini namuna ma’lumotlari bilan tekshiring.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["features", "branch-management"],
      title: "Управление филиалами автошколы | automaktab.uz",
      description:
        "Сравнивайте поступления и задолженность филиалов на панели руководителя. Смотрите результаты всей автошколы в одном месте.",
      keywords: ["филиалы автошколы", "управление филиалами", "панель владельца"],
      eyebrow: "Управление филиалами",
      heading: "Все филиалы на одном экране.",
      intro:
        "Сравнивайте поступления и задолженность филиалов на панели руководителя. Видно, какому филиалу нужно внимание.",
      sections: [
        {
          title: "Смотрите филиалы отдельно и вместе",
          body:
            "Проверяйте результаты каждого филиала и общую картину автошколы на одной панели.",
        },
        {
          title: "Сравнивайте результаты за один период",
          body:
            "Филиалы работают в одной системе. Руководитель сравнивает результаты и решает, какие процессы проверить.",
        },
        {
          title: "Каждому сотруднику нужный доступ",
          body:
            "Руководитель, менеджер, сотрудник приёмной, бухгалтер и преподаватель видят разделы для своей работы.",
        },
      ],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Сравните филиалы в демо.",
        body: "Проверьте панель руководителя на вымышленных данных.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["features", "branch-management"],
      title: "Driving-school branch management | automaktab.uz",
      description:
        "Compare branch revenue and student debt on the owner dashboard. See how the whole school is doing in one place.",
      keywords: ["driving school branches", "branch management", "owner dashboard"],
      eyebrow: "Branch management",
      heading: "Keep every branch in view.",
      intro:
        "Compare branch revenue and student debt on the owner dashboard. See which branch needs attention.",
      sections: [
        {
          title: "View branches separately and together",
          body:
            "Check each branch’s results and the whole school’s performance from one dashboard.",
        },
        {
          title: "Compare results for the same period",
          body:
            "Branches work in one system. Owners compare results and decide which tasks need attention.",
        },
        {
          title: "Give each employee the access they need",
          body:
            "Owners, managers, admissions staff, accountants and teachers see the sections they need for their work.",
        },
      ],
      relatedLabel: "Other features",
      cta: {
        title: "Compare branches in the demo.",
        body: "Explore the owner dashboard with sample data.",
        label: "Open demo",
      },
      updatedAt: "2026-09-19",
    },
  },
  pricing: {
    uz: {
      segments: ["pricing"],
      title: "Tariflar | automaktab.uz",
      description:
        "Namuna demoni oching. Maktabingiz uchun 30 kunlik sinov, narx va cheklovlarni boshlashdan oldin yozma kelishing.",
      keywords: ["avtomaktab CRM narxi", "avtomaktab tariflari", "boshqaruv tizimi narxi"],
      eyebrow: "Tariflar va sinov",
      heading: "Maktabingiz uchun narx va sinov shartlari.",
      intro:
        "Demo namuna ma’lumotlari bilan ishlaydi. Maktabingiz ma’lumotlari bilan 30 kunlik sinov, narx va cheklovlarni oldindan yozma kelishamiz.",
      sections: [
        {
          title: "Maktabingizda 30 kun sinang",
          body:
            "Sinov muddati, narx, ma’lumot ko‘chirish va cheklovlarni boshlashdan oldin yozma kelishamiz.",
        },
        {
          title: "Narx maktabingizga qarab hisoblanadi",
          body:
            "Filiallar, o‘quvchilar soni va kerakli bo‘limlarni ayting. Sizga mos shartlarni yozma taklifda oling.",
        },
        {
          title: "Avval tizimni o‘zingiz ko‘ring",
          body:
            "Telefon raqamingizni qoldirmasdan demoni oching. Rahbar paneli, jadval, davomat va to‘lovlarni namuna ma’lumotlari bilan tekshiring.",
        },
      ],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Avval demoni ko‘ring, keyin sinov so‘rang.",
        body: "Namuna ma’lumotlari bilan tanishing. Keyin maktabingiz uchun sinov shartlarini kelishamiz.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-01",
    },
    ru: {
      segments: ["pricing"],
      title: "Тарифы и пробный период | automaktab.uz",
      description:
        "Откройте демо. Цену и ограничения 30-дневного пробного периода для вашей автошколы согласуем письменно до начала.",
      keywords: ["стоимость CRM для автошколы", "тарифы автошколы", "цена системы управления"],
      eyebrow: "Тарифы и пробный период",
      heading: "Цена и пробный период для вашей автошколы.",
      intro:
        "Демо использует вымышленные данные. 30-дневный пробный период работает на данных вашей школы. Цену и ограничения согласуем письменно до начала.",
      sections: [
        {
          title: "30 дней в вашей автошколе",
          body:
            "Срок, цену, перенос данных и ограничения согласуем письменно до начала пробного периода.",
        },
        {
          title: "Цена зависит от вашей школы",
          body:
            "Расскажите о филиалах, числе курсантов и нужных разделах. Получите подходящие условия в письменном предложении.",
        },
        {
          title: "Сначала посмотрите саму систему",
          body:
            "Откройте демо без номера телефона. Проверьте панель руководителя, расписание, посещаемость и оплаты на вымышленных данных.",
        },
      ],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите демо перед пробным периодом.",
        body: "Познакомьтесь с системой на вымышленных данных. Затем согласуем пробный период для вашей школы.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-01",
    },
    en: {
      segments: ["pricing"],
      title: "Pricing and trial terms | automaktab.uz",
      description:
        "Explore the demo. Agree on pricing and limits for a 30-day trial with your school’s data in writing before starting.",
      keywords: ["driving school CRM pricing", "driving school management pricing", "30-day school trial"],
      eyebrow: "Pricing and trial",
      heading: "Pricing and trial terms for your school.",
      intro:
        "The demo uses sample data. The 30-day trial uses your school’s data. We agree on pricing and limits in writing beforehand.",
      sections: [
        {
          title: "30 days at your school",
          body:
            "Agree on trial duration, price, data migration and limits in writing before you start.",
        },
        {
          title: "Pricing depends on your school",
          body:
            "Tell us your branch and student counts and the sections you need. Get suitable terms in a written offer.",
        },
        {
          title: "See the system before you decide",
          body:
            "Open the demo without leaving your phone number. Check the owner dashboard, schedules, attendance and payments with sample data.",
        },
      ],
      relatedLabel: "Other features",
      cta: {
        title: "Explore the demo before the trial.",
        body: "Get to know the system with sample data. Then we’ll agree on a trial for your school.",
        label: "Open demo",
      },
      updatedAt: "2026-10-01",
    },
  },
  leads: {
    uz: {
      segments: ["features", "leads-and-enrollment"],
      title: "Murojaatlar va o‘quvchilarni qabul qilish | automaktab.uz",
      description:
        "Yangi murojaatlarni yo‘qotmang. Har bir nomzodni guruhga biriktirib, qabul holatini bir joyda ko‘ring.",
      keywords: [
        "avtomaktab murojaatlari",
        "o‘quvchi qabul qilish",
        "avtomaktab CRM",
      ],
      eyebrow: "Murojaatlar va qabul",
      heading: "Har bir murojaat guruhga aylanadi.",
      intro:
        "Telefon, Telegram va tashrifdan kelgan murojaatlarni bir ro‘yxatda to‘plang. Qaysi nomzod qaysi guruhga yozilganini shu yerda ko‘ring.",
      sections: [
        {
          title: "Murojaatlar bir ro‘yxatda",
          body:
            "Qayerdan kelganidan qat’i nazar, har bir murojaat bitta ro‘yxatda. Javob berilmagani ko‘rinib turadi.",
        },
        {
          title: "Nomzoddan guruhga",
          body:
            "Qabul qilingan o‘quvchini guruhga biriktiring. To‘lov va davomat shu kartadan davom etadi.",
        },
        {
          title: "Demoda sinab ko‘ring",
          body:
            "Namuna murojaatlar bilan qabul jarayonini tekshiring. Telefon raqamingizni qoldirish shart emas.",
        },
      ],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Qabul jarayonini demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-15",
    },
    ru: {
      segments: ["features", "leads-and-enrollment"],
      title: "Заявки и приём курсантов | automaktab.uz",
      description:
        "Не теряйте заявки. Ведите каждого кандидата до группы и смотрите статус приёма в одном месте.",
      keywords: ["заявки автошколы", "приём курсантов", "CRM автошколы"],
      eyebrow: "Заявки и приём",
      heading: "Каждая заявка становится группой.",
      intro:
        "Собирайте заявки из звонков, Telegram и визитов в одном списке. Видно, какой кандидат в какую группу зачислен.",
      sections: [
        {
          title: "Заявки в одном списке",
          body:
            "Неважно, откуда пришла заявка, — каждая попадает в общий список. Видно, на какие заявки ещё не ответили.",
        },
        {
          title: "От кандидата к группе",
          body:
            "Зачислите принятого курсанта в группу. Оплаты и посещаемость продолжаются с его карточки.",
        },
        {
          title: "Попробуйте в демо",
          body:
            "Проверьте процесс приёма на вымышленных заявках. Оставлять номер телефона не нужно.",
        },
      ],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите процесс приёма в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-15",
    },
    en: {
      segments: ["features", "leads-and-enrollment"],
      title: "Inquiries and student enrollment | automaktab.uz",
      description:
        "Stop losing inquiries. Track every candidate through to group placement in one place.",
      keywords: ["driving school inquiries", "student enrollment", "driving school CRM"],
      eyebrow: "Inquiries and enrollment",
      heading: "Every inquiry becomes a placement.",
      intro:
        "Collect inquiries from calls, Telegram and walk-ins in one list. See which candidate joined which group.",
      sections: [
        {
          title: "Inquiries in one list",
          body:
            "Whatever the source, every inquiry lands in one list. Unanswered ones stay visible.",
        },
        {
          title: "From candidate to group",
          body:
            "Place an admitted student into a group. Payments and attendance continue from their record.",
        },
        {
          title: "Try it in the demo",
          body:
            "Check the enrollment flow with sample inquiries. You do not need to leave your phone number.",
        },
      ],
      relatedLabel: "Other features",
      cta: {
        title: "See enrollment in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-15",
    },
  },
  privacy: {
    uz: {
      segments: ["privacy"],
      title: "Maxfiylik siyosati | automaktab.uz",
      description:
        "automaktab.uz maxfiylik siyosati: CRM ishlashi uchun qanday ma’lumotlar ishlatiladi va qanday bog‘lanish mumkin.",
      keywords: ["maxfiylik siyosati", "avtomaktab CRM ma’lumotlari", "automaktab.uz"],
      eyebrow: "Maxfiylik",
      heading: "Maxfiylik siyosati",
      intro:
        "Bu qisqa siyosat automaktab.uz marketing sayti va avtomaktablar uchun boshqaruv tizimi (CRM) operatori sifatida qanday ma’lumotlar bilan ishlashini tushuntiradi. Bu yuridik maslahat o‘rnini bosmaydi; kerak bo‘lsa, alohida shartnoma va yangilangan matn taqdim etiladi.",
      sections: [
        {
          title: "Kim operator",
          body:
            "Sayt va xizmatni automaktab.uz brendi ostidagi jamoa yuritadi. Yuridik rekvizitlar (nom, manzil, STIR) shartnoma yoki hisob-fakturada ko‘rsatiladi.",
        },
        {
          title: "Qanday ma’lumotlar ishlatiladi",
          body:
            "CRM maktabning kundalik ishi uchun kerakli ma’lumotlarni saqlaydi: o‘quvchilar, guruhlar, to‘lov va qarzdorlik yozuvlari, dars jadvali, davomat va xodim akkauntlari. Saytdagi so‘rov formasidan yuborilgan ism, telefon va maktab haqidagi qisqa ma’lumot faqat bog‘lanish uchun ishlatiladi. Demoda haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        },
        {
          title: "Saqlash, kirish va huquqlar",
          body:
            "Ma’lumotlar xizmatni ko‘rsatish, xavfsizlik va qo‘llab-quvvatlash uchun ishlatiladi. Maktab jamoasi rolga mos kirish orqali o‘z ma’lumotlarini boshqaradi. So‘rov, tuzatish yoki o‘chirish bo‘yicha murojaatni mahsulot kanallari orqali yuboring — saytdagi so‘rov formasi yoki shartnomada ko‘rsatilgan aloqa.",
        },
        {
          title: "Yangilanishlar",
          body:
            "Siyosat yangilansa, ushbu sahifa yangilanadi. Muhim o‘zgarishlar faol mijozlarga mavjud aloqa kanallari orqali yetkazilishi mumkin.",
        },
      ],
      relatedLabel: "Huquqiy sahifalar",
      cta: {
        title: "Demoda namuna ma’lumotlari ishlatiladi.",
        body: "Savollar bo‘yicha saytdagi so‘rov formasi yoki shartnomadagi aloqa orqali bog‘laning. Demo haqiqiy mijoz ma’lumotlarini ishlatmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-09-24",
    },
    ru: {
      segments: ["privacy"],
      title: "Политика конфиденциальности | automaktab.uz",
      description:
        "Краткая политика конфиденциальности automaktab.uz: какие данные нужны для работы CRM и как связаться с оператором.",
      keywords: [
        "политика конфиденциальности",
        "данные CRM автошколы",
        "automaktab.uz",
      ],
      eyebrow: "Конфиденциальность",
      heading: "Политика конфиденциальности",
      intro:
        "Эта краткая политика объясняет, как оператор automaktab.uz обрабатывает данные на маркетинговом сайте и в системе управления для автошкол (CRM). Она не заменяет юридическую консультацию; при необходимости предоставляются договор и обновлённый текст.",
      sections: [
        {
          title: "Кто оператор",
          body:
            "Сайт и сервис обслуживает команда под брендом automaktab.uz. Юридические реквизиты (наименование, адрес, ИНН) указаны в договоре или счёте-фактуре.",
        },
        {
          title: "Какие данные используются",
          body:
            "CRM хранит данные для повседневной работы школы: курсанты, группы, оплаты и задолженность, расписание, посещаемость и учётные записи сотрудников. Данные из формы заявки на сайте (имя, телефон, краткие сведения о школе) используются для связи. В демо используются вымышленные данные, а не данные реальных клиентов.",
        },
        {
          title: "Хранение, доступ и права",
          body:
            "Данные используются для оказания услуги, безопасности и поддержки. Команда школы управляет своими данными через ролевой доступ. Запросы на доступ, исправление или удаление направляйте через продуктовые каналы — форму заявки на сайте или контакт из договора.",
        },
        {
          title: "Обновления",
          body:
            "При изменении политики обновляется эта страница. О существенных изменениях активным клиентам могут сообщить по доступным каналам связи.",
        },
      ],
      relatedLabel: "Правовые страницы",
      cta: {
        title: "В демо используются вымышленные данные.",
        body: "По вопросам свяжитесь через форму на сайте или контакты из договора. Демо не использует данные реальных клиентов.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-24",
    },
    en: {
      segments: ["privacy"],
      title: "Privacy policy | automaktab.uz",
      description:
        "Short privacy policy for automaktab.uz: what data the CRM needs to operate and how to contact the operator.",
      keywords: ["privacy policy", "driving school CRM data", "automaktab.uz"],
      eyebrow: "Privacy",
      heading: "Privacy policy",
      intro:
        "This short policy explains how the operator of automaktab.uz handles data on the marketing site and in the driving-school management system (CRM). It is not legal advice; a contract and updated text are provided when needed.",
      sections: [
        {
          title: "Who operates the service",
          body:
            "The site and service are operated by the team behind automaktab.uz. Legal details (legal name, address, tax ID) appear in contracts or invoices.",
        },
        {
          title: "What data we use",
          body:
            "The CRM stores data needed for day-to-day school operations: students, groups, payments and debt, schedules, attendance and staff accounts. Request-form details on the site (name, phone, brief school information) are used to get in touch. The demo uses sample data, not real customer records.",
        },
        {
          title: "Storage, access, and requests",
          body:
            "Data is used to provide the service, protect security, and offer support. School teams manage their own data through role-based access. For access, correction, or deletion requests, use product channels — the on-site request form or the contact listed in your agreement.",
        },
        {
          title: "Updates",
          body:
            "When this policy changes, this page is updated. Material changes may be communicated to active customers through available contact channels.",
        },
      ],
      relatedLabel: "Legal pages",
      cta: {
        title: "The demo uses sample data.",
        body: "For questions, use the site’s request form or your contract contact. The demo does not use real customer data.",
        label: "Open demo",
      },
      updatedAt: "2026-09-24",
    },
  },
  terms: {
    uz: {
      segments: ["terms"],
      title: "Foydalanish shartlari (oferta) | automaktab.uz",
      description:
        "automaktab.uz sayti va CRM sinovi uchun qisqa foydalanish shartlari. Batafsil shartlar shartnomada kelishiladi.",
      keywords: ["oferta", "foydalanish shartlari", "avtomaktab CRM"],
      eyebrow: "Oferta",
      heading: "Foydalanish shartlari",
      intro:
        "Ushbu qisqa shartlar automaktab.uz marketing sayti va avtomaktablar uchun boshqaruv tizimidan (CRM) foydalanishning asosiy qoidalarini bayon etadi. Bu qisqa matn to‘liq yuridik oferta o‘rnini bosmaydi; tijorat shartlari alohida kelishiladi.",
      sections: [
        {
          title: "Xizmat nima",
          body:
            "automaktab.uz avtomaktablarga o‘quvchilar, to‘lovlar, jadval va davomatni bitta tizimda boshqarishga yordam beradi. Saytdagi materiallar axborot xarakterida; mahsulot imkoniyatlari sinov va shartnomada tasdiqlangan doirada beriladi.",
        },
        {
          title: "Demo va sinov",
          body:
            "“Demoni ochish” namuna ma’lumotlari bilan ishlaydigan demoni ochadi. Haqiqiy mijoz ma’lumotlari talab qilinmaydi. Demo va maktabingiz ma’lumotlari bilan sinov alohida. 30 kunlik sinov muddati, narxi va cheklovlari boshlashdan oldin yozma kelishiladi.",
        },
        {
          title: "Maktabning majburiyatlari",
          body:
            "Mijoz o‘z xodimlarining kirish huquqini boshqaradi, faqat qonuniy asosda ma’lumot kiritadi va akkaunt xavfsizligini saqlaydi. Xizmatni suiiste’mol qilish, buzishga urinish yoki uchinchi shaxslarga ruxsatsiz ulashish taqiqlanadi.",
        },
        {
          title: "Javobgarlik va aloqa",
          body:
            "Xizmat “boricha” taqdim etiladi; kafolatlar shartnomada yoziladi. Nizolarni avval muzokara orqali hal etishga harakat qilinadi. Bog‘lanish: saytdagi so‘rov formasi yoki shartnomadagi aloqa kanallari. Operator — automaktab.uz brendi ostidagi jamoa; rekvizitlar hujjatlarda ko‘rsatiladi.",
        },
      ],
      relatedLabel: "Huquqiy sahifalar",
      cta: {
        title: "Avval mahsulotni ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Tijorat shartlari alohida kelishiladi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-01",
    },
    ru: {
      segments: ["terms"],
      title: "Условия использования (оферта) | automaktab.uz",
      description:
        "Краткие условия использования сайта и пробного периода CRM automaktab.uz. Коммерческие детали согласуются в договоре.",
      keywords: ["оферта", "условия использования", "CRM автошколы"],
      eyebrow: "Оферта",
      heading: "Условия использования",
      intro:
        "Эти краткие условия описывают основные правила маркетингового сайта automaktab.uz и системы управления для автошкол (CRM). Этот краткий текст не заменяет полную юридическую оферту; коммерческие условия согласуются отдельно.",
      sections: [
        {
          title: "Что это за сервис",
          body:
            "automaktab.uz помогает автошколам вести учёт курсантов и оплат, планировать занятия и отмечать посещаемость в одной системе. Материалы сайта носят информационный характер; возможности продукта предоставляются в рамках пробного периода и договора.",
        },
        {
          title: "Демо и пробный период",
          body:
            "Кнопка «Открыть демо» открывает систему с вымышленными данными и не требует данных реальных клиентов. Демо и пробный период с данными вашей школы различаются. Срок 30-дневного пробного периода, стоимость и ограничения согласуются письменно до начала.",
        },
        {
          title: "Обязанности школы",
          body:
            "Клиент управляет доступом сотрудников, вносит данные на законном основании и обеспечивает безопасность учётных записей. Запрещены злоупотребление сервисом, попытки взлома и передача доступа третьим лицам без разрешения.",
        },
        {
          title: "Ответственность и связь",
          body:
            "Сервис предоставляется «как есть»; гарантии фиксируются в договоре. Споры сначала стараются решить переговорами. Связь: форма заявки на сайте или контакты из договора. Оператор — команда под брендом automaktab.uz; реквизиты указываются в документах.",
        },
      ],
      relatedLabel: "Правовые страницы",
      cta: {
        title: "Сначала посмотрите продукт.",
        body: "Демо открывается на вымышленных данных. Коммерческие условия согласуются отдельно.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-01",
    },
    en: {
      segments: ["terms"],
      title: "Terms of use | automaktab.uz",
      description:
        "Short terms for the automaktab.uz site and CRM trial. Commercial details are agreed in a contract.",
      keywords: ["terms of use", "offer", "driving school CRM"],
      eyebrow: "Terms",
      heading: "Terms of use",
      intro:
        "These short terms outline the main rules for the automaktab.uz marketing site and the driving-school management system (CRM). This short text is not a full legal offer; commercial terms are agreed separately.",
      sections: [
        {
          title: "What the service is",
          body:
            "automaktab.uz helps driving schools manage students, payments, schedules, and attendance in one system. Site materials are informational; product capabilities are provided within the trial and any signed agreement.",
        },
        {
          title: "Demo and trial",
          body:
            "“Open demo” starts a session with sample data and does not require real customer data. The sample demo and a trial with your school’s data are separate. Agree on the 30-day trial duration, pricing and limits in writing before starting.",
        },
        {
          title: "School responsibilities",
          body:
            "Customers manage staff access, enter data on a lawful basis, and keep accounts secure. Abuse of the service, attempts to compromise it, or sharing access with third parties without permission is not allowed.",
        },
        {
          title: "Liability and contact",
          body:
            "The service is provided as is; warranties are stated in the agreement. Disputes are first addressed through discussion. Contact: the on-site request form or channels listed in your agreement. The operator is the team behind automaktab.uz; formal details appear in documents.",
        },
      ],
      relatedLabel: "Legal pages",
      cta: {
        title: "See the product first.",
        body: "The demo opens with sample data. Commercial terms are agreed separately.",
        label: "Open demo",
      },
      updatedAt: "2026-10-01",
    },
  },
  driving: {
    uz: {
      segments: ["features", "practical-driving"],
      title: "Amaliy haydash va instruktorlar hisobi | automaktab.uz",
      description:
        "Har bir haydash mashg‘uloti o‘quvchi, mashina, instruktor va vaqt bilan yoziladi. O‘qish rejasiga faqat tasdiqlangan daqiqalar qo‘shiladi.",
      keywords: ["amaliy haydash hisobi", "instruktorlar hisobi", "avtomaktab CRM"],
      eyebrow: "Amaliy haydash",
      heading: "Amaliy haydash mashg‘ulotlari va instruktorlar hisobi",
      definition:
        "automaktab.uz har bir haydash mashg‘ulotini o‘quvchi, mashina, instruktor va vaqt bilan yozadi; faqat tasdiqlangan daqiqalar o‘quvchining o‘qish rejasiga qo‘shiladi.",
      intro:
        "Kim qachon, qaysi mashinada va qaysi instruktor bilan haydaganini daftarsiz ko‘ring. O‘tilgan va qolgan daqiqalar o‘quvchining o‘qish rejasida turadi.",
      visual: "driving-card",
      sections: [
        {
          title: "Mashg‘ulot holatlari",
          body:
            "Mashg‘ulot avval rejalashtiriladi. Haydashdan keyin instruktor uni haqiqiy daqiqalar bilan yuboradi. Menejer tasdiqlaydi yoki rad etadi. Kerak bo‘lsa, mashg‘ulot bekor qilinadi yoki menejer daqiqalarni tuzatadi. Har bir o‘zgarish mashg‘ulot tarixida qoladi.",
        },
        {
          title: "O‘tilgan va qolgan daqiqalar",
          body:
            "O‘qish rejasida kerakli daqiqalar soni belgilanadi, masalan 1200. Tasdiqlangan mashg‘ulot daqiqalari shu rejaga qo‘shiladi va qolgan daqiqalar hisoblanadi. Rejalashtirilgan, yuborilgan yoki rad etilgan mashg‘ulot hisobga kirmaydi.",
        },
        {
          title: "Instruktor va mashina",
          body:
            "Mashg‘ulotga instruktor va avtoparkdagi mashina biriktiriladi. Mashina kartasida shu mashinadagi mashg‘ulotlar ro‘yxati ko‘rinadi, shuning uchun mashina qayerda ishlaganini alohida yozish shart emas.",
        },
      ],
      faq: [
        {
          question: "Haydash daqiqalari qanday hisoblanadi?",
          answer:
            "O‘quvchining o‘qish rejasiga faqat tasdiqlangan mashg‘ulot daqiqalari qo‘shiladi. Tasdiqlanmagan yoki rad etilgan mashg‘ulot hisobga kirmaydi.",
        },
        {
          question: "Mashg‘ulotni kim tasdiqlaydi?",
          answer: "Instruktor mashg‘ulotni yuboradi, menejer uni tasdiqlaydi yoki rad etadi.",
        },
        {
          question: "Masofa (km) yoziladimi?",
          answer:
            "Yo‘q. Mashg‘ulot bo‘yicha masofa yozilmaydi. Mashinaning odometri avtopark bo‘limida yuritiladi.",
        },
      ],
      related: ["schedule", "attendance", "compare"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Haydash hisobini demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "practical-driving"],
      title: "Учёт практического вождения и инструкторов | automaktab.uz",
      description:
        "Каждое занятие по вождению записывается с курсантом, машиной, инструктором и временем. В план обучения идут только подтверждённые минуты.",
      keywords: ["учёт вождения автошкола", "расписание инструкторов", "CRM автошколы"],
      eyebrow: "Практическое вождение",
      heading: "Учёт практического вождения и инструкторов",
      definition:
        "automaktab.uz записывает каждое занятие по вождению с курсантом, машиной, инструктором и временем; в план обучения курсанта засчитываются только подтверждённые минуты.",
      intro:
        "Видно, кто, когда, на какой машине и с каким инструктором ездил, без бумажного журнала. Пройденные и оставшиеся минуты хранятся в плане обучения курсанта.",
      visual: "driving-card",
      sections: [
        {
          title: "Статусы занятия",
          body:
            "Занятие сначала планируется. После вождения инструктор отправляет его с фактическими минутами. Менеджер подтверждает или отклоняет. При необходимости занятие отменяют или менеджер исправляет минуты. Каждое изменение остаётся в истории занятия.",
        },
        {
          title: "Пройденные и оставшиеся минуты",
          body:
            "В плане обучения задаётся нужное число минут, например 1200. Минуты подтверждённых занятий добавляются к плану, остаток считается автоматически. Запланированные, отправленные и отклонённые занятия не засчитываются.",
        },
        {
          title: "Инструктор и машина",
          body:
            "К занятию привязываются инструктор и машина из автопарка. В карточке машины виден список занятий на ней, поэтому отдельно записывать, где работала машина, не нужно.",
        },
      ],
      faq: [
        {
          question: "Как считаются минуты вождения?",
          answer:
            "В план обучения курсанта идут только минуты подтверждённых занятий. Неподтверждённые и отклонённые занятия не засчитываются.",
        },
        {
          question: "Кто подтверждает занятие?",
          answer: "Инструктор отправляет занятие, менеджер подтверждает или отклоняет его.",
        },
        {
          question: "Записывается ли пробег (км)?",
          answer:
            "Нет. Пробег по занятию не записывается. Одометр машины ведётся в разделе автопарка.",
        },
      ],
      related: ["schedule", "attendance", "compare"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите учёт вождения в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "practical-driving"],
      title: "Practical driving lessons and instructor tracking | automaktab.uz",
      description:
        "Every driving lesson is recorded with the student, vehicle, instructor and time. Only approved minutes count toward the training plan.",
      keywords: ["driving lesson tracking", "driving instructor management software", "driving school CRM"],
      eyebrow: "Practical driving",
      heading: "Practical driving lessons and instructor tracking",
      definition:
        "automaktab.uz records every driving lesson with the student, vehicle, instructor and time; only approved minutes count toward the student's training plan.",
      intro:
        "See who drove when, in which vehicle and with which instructor, without a paper log. Completed and remaining minutes sit on the student's training plan.",
      visual: "driving-card",
      sections: [
        {
          title: "Lesson statuses",
          body:
            "A lesson is planned first. After driving, the instructor submits it with the actual minutes. A manager approves or rejects it. If needed, the lesson is cancelled or a manager corrects the minutes. Every change stays in the lesson history.",
        },
        {
          title: "Completed and remaining minutes",
          body:
            "The training plan sets the required minutes, for example 1200. Minutes from approved lessons are added to the plan and the remainder is calculated. Planned, submitted and rejected lessons do not count.",
        },
        {
          title: "Instructor and vehicle",
          body:
            "Each lesson gets an instructor and a vehicle from the fleet. The vehicle record lists the lessons driven in it, so nobody has to log where the car was used.",
        },
      ],
      faq: [
        {
          question: "How are driving minutes counted?",
          answer:
            "Only minutes from approved lessons are added to the student's training plan. Unapproved and rejected lessons do not count.",
        },
        {
          question: "Who approves a lesson?",
          answer: "The instructor submits the lesson; a manager approves or rejects it.",
        },
        {
          question: "Is distance (km) recorded?",
          answer:
            "No. Distance is not recorded per lesson. The vehicle odometer is kept in the fleet section.",
        },
      ],
      related: ["schedule", "attendance", "compare"],
      relatedLabel: "Other features",
      cta: {
        title: "See driving lesson tracking in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  compare: {
    uz: {
      segments: ["compare"],
      title: "automaktab.uz va boshqa avtomaktab dasturlari: taqqoslash | automaktab.uz",
      description:
        "automaktab.uz'ni E-AVTOMAKTAB, LeaderCRM, Intalim va EducationCRM bilan ularning ochiq sahifalari asosida taqqoslang: nima bor va nima yo‘q.",
      keywords: ["e-avtomaktab alternativasi", "avtomaktab dasturi", "avtomaktab CRM"],
      eyebrow: "Taqqoslash",
      heading: "automaktab.uz va boshqa avtomaktab dasturlari: ochiq taqqoslash",
      definition:
        "automaktab.uz avtomaktablar uchun boshqaruv tizimi (CRM). Quyidagi jadval uni O‘zbekistondagi to‘rtta yechim bilan ularning ochiq sahifalari asosida taqqoslaydi; tekshirilgan sana: 2026-10-16.",
      intro:
        "Boshqa mahsulotlar ustuni faqat ularning o‘z saytida yozilganiga tayanadi. automaktab.uz ustuni mahsulot kodiga tayanadi. Biz o‘zimizda yo‘q narsalarni ham ochiq yozamiz.",
      comparison: {
        caption: "Imkoniyatlar (2026-10-16 holatiga)",
        columns: ["Imkoniyat", "automaktab.uz", "E-AVTOMAKTAB", "LeaderCRM", "Intalim", "EducationCRM"],
        rows: [
          { label: "Amaliy haydash daqiqalari, instruktor tasdig‘i bilan", cells: ["✓", "?", "—", "◐", "?"] },
          { label: "Avtopark: hujjatlar, texnik xizmat, yoqilg‘i", cells: ["✓", "?", "—", "◐", "?"] },
          { label: "Murojaatlar (lidlar)", cells: ["✓", "?", "✓", "◐", "✓"] },
          { label: "Xarajatlar hisobi", cells: ["✓", "?", "?", "?", "✓"] },
          { label: "Telegram bot yoki hisobot", cells: ["✓", "✓", "✓", "?", "✓"] },
          { label: "Filiallar va filial bo‘yicha ruxsat", cells: ["✓", "◐", "✓", "?", "✓"] },
          { label: "YHQ testi", cells: ["◐", "✓", "◐", "✓", "◐"] },
          { label: "O‘quvchi kabineti", cells: ["✓", "✓", "◐", "✓", "✓"] },
          { label: "O‘quvchi o‘z to‘lovini ko‘radi", cells: ["—", "✓", "?", "?", "✓"] },
          { label: "Onlayn to‘lov (Click, Payme)", cells: ["—", "✓", "?", "?", "✓"] },
          { label: "SMS", cells: ["—", "✓", "✓", "✓", "✓"] },
          { label: "Davlat tizimlari (e-test, e-license, YHXX)", cells: ["—", "✓", "—", "✓", "?"] },
          { label: "Video yoki animatsion darslik", cells: ["—", "✓", "?", "✓", "?"] },
          { label: "Mobil ilova", cells: ["—", "?", "✓", "✓", "✓"] },
          { label: "Ochiq narx", cells: ["—", "?", "✓", "✓", "✓"] },
        ],
        legend:
          "✓ manbada bor. ◐ qisman yoki cheklangan. — yo‘q: automaktab.uz uchun kodda yo‘q, boshqalar uchun o‘z manbasida yo‘qligi aytilgan. ? manbada topilmadi. Manbada tilga olinmagan narsa “yo‘q” deb belgilanmaydi.",
      },
      sections: [
        {
          title: "Bizda nima yo‘q",
          body:
            "automaktab.uz'da onlayn to‘lov (Click, Payme), SMS yuborish, mobil ilova, davlat tizimlari bilan integratsiya va video darslik yo‘q. O‘quvchi kabinetida jadval va davomat bor, lekin o‘quvchi o‘z to‘lovlarini u yerda ko‘rmaydi. Ichki YHQ testi maktabning o‘z sinovi, davlat imtihoni emas. Narx ham ochiq emas: u filial va o‘quvchilar soniga qarab yozma taklifda beriladi.",
        },
        {
          title: "Bizda nima bor",
          body:
            "automaktab.uz avtomaktabning kundalik boshqaruvi uchun qilingan. Amaliy haydash mashg‘ulotlari instruktor va mashina bilan yoziladi, o‘qish rejasiga faqat tasdiqlangan daqiqalar qo‘shiladi. Avtoparkda hujjat muddatlari, texnik xizmat va yoqilg‘i qaydlari yuritiladi. Murojaatlar, xarajatlar va filial bo‘yicha ruxsatlar bir tizimda. Rahbar har kuni 08:00 da Telegram'da kechagi tushum va yangi o‘quvchilar sonini oladi.",
        },
        {
          title: "Qachon boshqa yechim mos keladi",
          body:
            "O‘quvchilar e-test.uz va e-license.uz orqali ishlashi yoki guruhni YHXX'ga elektron ro‘yxatga qo‘yish kerak bo‘lsa, E-AVTOMAKTAB yoki Intalim mos keladi. SMS eslatmalar, o‘quvchi to‘lovini ilovada ko‘rishi yoki ochiq tarif kerak bo‘lsa, EducationCRM yoki LeaderCRM'ni ko‘ring; ular umumiy o‘quv markazlari uchun ham ishlaydi. O‘quv platformasi va boshqaruv tizimi bir-birini to‘ldirishi mumkin.",
        },
        {
          title: "Qanday taqqosladik",
          body:
            "Har bir belgi pastdagi manbalarga tayanadi. AVTODROM (avtodrom operatori tizimi) va Rossiyadagi drivli jadvalga kiritilmadi, chunki ular boshqa vazifa yoki bozor uchun. Sahifalar o‘zgarishi mumkin, shuning uchun har bir manba yonida tekshirilgan sana turibdi. Xato topsangiz, so‘rov formasi orqali yozing, tuzatamiz.",
        },
      ],
      faq: [
        {
          question: "E-AVTOMAKTAB'dan farqi nima?",
          answer:
            "E-AVTOMAKTAB o‘quv platformasi: elektron darsliklar, onlayn YHQ testlari, e-test.uz va e-license.uz bilan bog‘lanish. automaktab.uz maktabni boshqarish uchun: filiallar va ruxsatlar, lidlar, to‘lov va qarzdorlik, xarajatlar, amaliy haydashni tasdiqlash, avtopark va har kuni 08:00 da Telegram hisobot. Davlat tizimlari bilan integratsiya va o‘quv videolari bizda yo‘q.",
        },
        {
          question: "automaktab.uz va avtomaktab.com bir xilmi?",
          answer:
            "Yo‘q. avtomaktab.com YHQ imtihoniga tayyorlanish uchun alohida test sayti. automaktab.uz avtomaktablar uchun boshqaruv tizimi va u bilan aloqasi yo‘q.",
        },
        {
          question: "Excel'dan o‘tish mumkinmi?",
          answer:
            "Ha. O‘quvchilar ro‘yxatini CSV fayl bilan birga ko‘chiramiz: ism, familiya, telefon va kurs turi, bitta faylda 10 000 tagacha. Guruh, narx va qarz qoldig‘i keyin o‘quvchi kartasida kiritiladi.",
        },
      ],
      sources: [
        { label: "e-avtomaktab.uz", url: "https://e-avtomaktab.uz/", checkedAt: "2026-10-16" },
        { label: "e-avtomaktab.uz oferta v1.0 (2026-08-20)", url: "https://e-avtomaktab.uz/Vesperr/assets/docs/offerta.pdf", checkedAt: "2026-10-16" },
        { label: "leadercrm.uz/avtomaktab-crm", url: "https://leadercrm.uz/avtomaktab-crm", checkedAt: "2026-10-16" },
        { label: "leadercrm.uz", url: "https://leadercrm.uz/", checkedAt: "2026-10-16" },
        { label: "intalim.uz", url: "https://intalim.uz/", checkedAt: "2026-10-16" },
        { label: "educationcrm.uz", url: "https://educationcrm.uz/", checkedAt: "2026-10-16" },
        { label: "avtomaktab.com", url: "https://avtomaktab.com/", checkedAt: "2026-10-16" },
      ],
      related: ["driving", "leads", "pricing"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "O‘zingiz solishtiring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["compare"],
      title: "automaktab.uz и другие программы для автошкол: сравнение | automaktab.uz",
      description:
        "Сравнение automaktab.uz с E-AVTOMAKTAB, LeaderCRM, Intalim и EducationCRM по их открытым страницам: что есть и чего нет.",
      keywords: ["альтернатива e-avtomaktab", "программа для автошколы", "CRM для автошколы"],
      eyebrow: "Сравнение",
      heading: "automaktab.uz и другие программы для автошкол: открытое сравнение",
      definition:
        "automaktab.uz это система управления (CRM) для автошкол. Таблица ниже сравнивает её с четырьмя решениями в Узбекистане по их открытым страницам; дата проверки: 2026-10-16.",
      intro:
        "Столбцы других продуктов опираются только на то, что написано на их собственных сайтах. Столбец automaktab.uz опирается на код продукта. То, чего у нас нет, мы тоже пишем открыто.",
      comparison: {
        caption: "Возможности (на 2026-10-16)",
        columns: ["Возможность", "automaktab.uz", "E-AVTOMAKTAB", "LeaderCRM", "Intalim", "EducationCRM"],
        rows: [
          { label: "Минуты практического вождения с подтверждением инструктора", cells: ["✓", "?", "—", "◐", "?"] },
          { label: "Автопарк: документы, ТО, топливо", cells: ["✓", "?", "—", "◐", "?"] },
          { label: "Заявки (лиды)", cells: ["✓", "?", "✓", "◐", "✓"] },
          { label: "Учёт расходов", cells: ["✓", "?", "?", "?", "✓"] },
          { label: "Telegram-бот или отчёт", cells: ["✓", "✓", "✓", "?", "✓"] },
          { label: "Филиалы и доступ по филиалу", cells: ["✓", "◐", "✓", "?", "✓"] },
          { label: "Тесты по ПДД", cells: ["◐", "✓", "◐", "✓", "◐"] },
          { label: "Кабинет курсанта", cells: ["✓", "✓", "◐", "✓", "✓"] },
          { label: "Курсант видит свои оплаты", cells: ["—", "✓", "?", "?", "✓"] },
          { label: "Онлайн-оплата (Click, Payme)", cells: ["—", "✓", "?", "?", "✓"] },
          { label: "SMS", cells: ["—", "✓", "✓", "✓", "✓"] },
          { label: "Госсистемы (e-test, e-license, ГУБДД)", cells: ["—", "✓", "—", "✓", "?"] },
          { label: "Видео или анимированный учебник", cells: ["—", "✓", "?", "✓", "?"] },
          { label: "Мобильное приложение", cells: ["—", "?", "✓", "✓", "✓"] },
          { label: "Открытая цена", cells: ["—", "?", "✓", "✓", "✓"] },
        ],
        legend:
          "✓ есть в источнике. ◐ частично или с ограничениями. — нет: для automaktab.uz нет в коде, для других их источник прямо говорит, что нет. ? в источнике не найдено. То, что источник не упоминает, никогда не отмечается как «нет».",
      },
      sections: [
        {
          title: "Чего у нас нет",
          body:
            "В automaktab.uz нет онлайн-оплаты (Click, Payme), отправки SMS, мобильного приложения, интеграции с госсистемами и видеоучебника. В кабинете курсанта есть расписание и посещаемость, но свои оплаты курсант там не видит. Внутренний тест по ПДД это собственная проверка школы, а не госэкзамен.",
        },
        {
          title: "Что у нас есть",
          body:
            "automaktab.uz создан для ежедневного управления автошколой. Занятия по вождению записываются с инструктором и машиной, в план обучения идут только подтверждённые минуты. В автопарке ведутся сроки документов, ТО и заправки. Заявки, расходы и доступ по филиалам в одной системе. Руководитель каждый день в 08:00 получает в Telegram вчерашнюю выручку и число новых курсантов.",
        },
        {
          title: "Когда подойдёт другое решение",
          body:
            "Если курсантам нужна работа через e-test.uz и e-license.uz или электронная постановка группы на учёт в ГУБДД, подойдут E-AVTOMAKTAB или Intalim. Если нужны SMS-напоминания, оплаты в приложении курсанта или открытый тариф, посмотрите EducationCRM или LeaderCRM; они работают и для обычных учебных центров. Учебная платформа и система управления могут дополнять друг друга.",
        },
        {
          title: "Как мы сравнивали",
          body:
            "Каждая отметка опирается на источники ниже. AVTODROM (система оператора автодрома) и российский drivli в таблицу не включены: у них другая задача или рынок. Нашли ошибку? Напишите через форму заявки, мы исправим.",
        },
      ],
      faq: [
        {
          question: "Чем вы отличаетесь от E-AVTOMAKTAB?",
          answer:
            "E-AVTOMAKTAB это учебная платформа: электронные учебники, онлайн-тесты по ПДД, связь с e-test.uz и e-license.uz. automaktab.uz создан для управления автошколой: филиалы и права доступа, заявки, оплаты и долги, расходы, подтверждение практического вождения, автопарк и ежедневный отчёт в Telegram в 08:00. Интеграции с государственными системами и учебных видео у нас нет.",
        },
        {
          question: "automaktab.uz и avtomaktab.com это одно и то же?",
          answer:
            "Нет. avtomaktab.com это отдельный сайт для подготовки к экзамену по ПДД. automaktab.uz это система управления для автошкол, она с ним не связана.",
        },
        {
          question: "Можно ли перейти с Excel?",
          answer:
            "Да. Список курсантов переносим вместе с вами через CSV-файл: имя, фамилия, телефон и тип курса, до 10 000 строк в одном файле. Группа, цена и остаток долга вносятся потом в карточке курсанта.",
        },
      ],
      sources: [
        { label: "e-avtomaktab.uz", url: "https://e-avtomaktab.uz/", checkedAt: "2026-10-16" },
        { label: "e-avtomaktab.uz oferta v1.0 (2026-08-20)", url: "https://e-avtomaktab.uz/Vesperr/assets/docs/offerta.pdf", checkedAt: "2026-10-16" },
        { label: "leadercrm.uz/avtomaktab-crm", url: "https://leadercrm.uz/avtomaktab-crm", checkedAt: "2026-10-16" },
        { label: "leadercrm.uz", url: "https://leadercrm.uz/", checkedAt: "2026-10-16" },
        { label: "intalim.uz", url: "https://intalim.uz/", checkedAt: "2026-10-16" },
        { label: "educationcrm.uz", url: "https://educationcrm.uz/", checkedAt: "2026-10-16" },
        { label: "avtomaktab.com", url: "https://avtomaktab.com/", checkedAt: "2026-10-16" },
      ],
      related: ["driving", "leads", "pricing"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Сравните сами.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["compare"],
      title: "automaktab.uz vs other driving school software: comparison | automaktab.uz",
      description:
        "Compare automaktab.uz with E-AVTOMAKTAB, LeaderCRM, Intalim and EducationCRM based on their public pages: what each has and does not have.",
      keywords: ["e-avtomaktab alternative", "driving school software", "driving school CRM"],
      eyebrow: "Comparison",
      heading: "automaktab.uz vs other driving school software: an open comparison",
      definition:
        "automaktab.uz is a management system (CRM) for driving schools. The table below compares it with four solutions in Uzbekistan based on their public pages; checked on 2026-10-16.",
      intro:
        "The columns for other products rely only on what their own websites say. The automaktab.uz column relies on the product code. We list what we do not have, too.",
      comparison: {
        caption: "Capabilities (as of 2026-10-16)",
        columns: ["Capability", "automaktab.uz", "E-AVTOMAKTAB", "LeaderCRM", "Intalim", "EducationCRM"],
        rows: [
          { label: "Practical driving minutes with instructor approval", cells: ["✓", "?", "—", "◐", "?"] },
          { label: "Fleet: documents, maintenance, fuel", cells: ["✓", "?", "—", "◐", "?"] },
          { label: "Leads", cells: ["✓", "?", "✓", "◐", "✓"] },
          { label: "Expense tracking", cells: ["✓", "?", "?", "?", "✓"] },
          { label: "Telegram bot or report", cells: ["✓", "✓", "✓", "?", "✓"] },
          { label: "Branches and per-branch access", cells: ["✓", "◐", "✓", "?", "✓"] },
          { label: "Road rules (YHQ) tests", cells: ["◐", "✓", "◐", "✓", "◐"] },
          { label: "Student portal", cells: ["✓", "✓", "◐", "✓", "✓"] },
          { label: "Student sees own payments", cells: ["—", "✓", "?", "?", "✓"] },
          { label: "Online payment (Click, Payme)", cells: ["—", "✓", "?", "?", "✓"] },
          { label: "SMS", cells: ["—", "✓", "✓", "✓", "✓"] },
          { label: "Government systems (e-test, e-license, traffic police)", cells: ["—", "✓", "—", "✓", "?"] },
          { label: "Video or animated textbook", cells: ["—", "✓", "?", "✓", "?"] },
          { label: "Mobile app", cells: ["—", "?", "✓", "✓", "✓"] },
          { label: "Public pricing", cells: ["—", "?", "✓", "✓", "✓"] },
        ],
        legend:
          "✓ stated in the source. ◐ partial or limited. — not available: for automaktab.uz not in the code; for others their own source says so. ? not found in the source. Anything a source does not mention is never marked as not available.",
      },
      sections: [
        {
          title: "What we do not have",
          body:
            "automaktab.uz has no online payments (Click, Payme), no SMS sending, no mobile app, no integration with government systems and no video textbook. The student portal shows the schedule and attendance, but students cannot see their payments there. The internal road rules test is the school's own check, not the state exam.",
        },
        {
          title: "What we have",
          body:
            "automaktab.uz is built for running a driving school day to day. Driving lessons are recorded with the instructor and vehicle, and only approved minutes count toward the training plan. The fleet keeps document expiry dates, maintenance and fuel records. Leads, expenses and per-branch access live in one system. Every day at 08:00 the owner gets yesterday's revenue and new student count in Telegram.",
        },
        {
          title: "When another product fits better",
          body:
            "If students must work through e-test.uz and e-license.uz, or groups must be registered with the traffic police electronically, E-AVTOMAKTAB or Intalim fit. If you need SMS reminders, payments in a student app or public pricing, look at EducationCRM or LeaderCRM; they also serve general education centers. A learning platform and a management system can complement each other.",
        },
        {
          title: "How we compared",
          body:
            "Every mark relies on the sources below. AVTODROM (a driving-ground operator system) and drivli (Russia) are not in the table because they serve a different job or market. Found a mistake? Write to us through the request form and we will fix it.",
        },
      ],
      faq: [
        {
          question: "How is it different from E-AVTOMAKTAB?",
          answer:
            "E-AVTOMAKTAB is a learning platform: e-textbooks, online road rules tests, and links to e-test.uz and e-license.uz. automaktab.uz is built to run a driving school: branches and access rights, leads, payments and debt, expenses, approved driving lessons, fleet, and a daily 08:00 owner report in Telegram. We do not integrate with government systems or provide training videos.",
        },
        {
          question: "Are automaktab.uz and avtomaktab.com the same?",
          answer:
            "No. avtomaktab.com is a separate test-prep site for the road rules exam. automaktab.uz is a management system for driving schools and is not affiliated with it.",
        },
        {
          question: "Can we move from Excel?",
          answer:
            "Yes. We move your student list with you from a CSV file: first name, last name, phone and course type, up to 10,000 rows per file. Group, price and debt balance are entered later on the student record.",
        },
      ],
      sources: [
        { label: "e-avtomaktab.uz", url: "https://e-avtomaktab.uz/", checkedAt: "2026-10-16" },
        { label: "e-avtomaktab.uz oferta v1.0 (2026-08-20)", url: "https://e-avtomaktab.uz/Vesperr/assets/docs/offerta.pdf", checkedAt: "2026-10-16" },
        { label: "leadercrm.uz/avtomaktab-crm", url: "https://leadercrm.uz/avtomaktab-crm", checkedAt: "2026-10-16" },
        { label: "leadercrm.uz", url: "https://leadercrm.uz/", checkedAt: "2026-10-16" },
        { label: "intalim.uz", url: "https://intalim.uz/", checkedAt: "2026-10-16" },
        { label: "educationcrm.uz", url: "https://educationcrm.uz/", checkedAt: "2026-10-16" },
        { label: "avtomaktab.com", url: "https://avtomaktab.com/", checkedAt: "2026-10-16" },
      ],
      related: ["driving", "leads", "pricing"],
      relatedLabel: "Other features",
      cta: {
        title: "Compare it yourself.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
};


/** Old localized marketing paths → English-segment URLs (308 in proxy). */
export const SEO_LEGACY_PATH_REDIRECTS: Readonly<Record<string, string>> = {
  // uz (unprefixed)
  "/imkoniyatlar/tolovlar-va-qarzdorlik": "/features/payments-and-debt",
  "/imkoniyatlar/dars-jadvali-va-guruhlar": "/features/schedules-and-groups",
  "/imkoniyatlar/raqamli-davomat": "/features/digital-attendance",
  "/imkoniyatlar/filiallar-boshqaruvi": "/features/branch-management",
  "/tariflar": "/pricing",
  "/maxfiylik": "/privacy",
  "/oferta": "/terms",
  // /uz/* soft URLs → same English targets (avoid double hop with /uz strip)
  "/uz/imkoniyatlar/tolovlar-va-qarzdorlik": "/features/payments-and-debt",
  "/uz/imkoniyatlar/dars-jadvali-va-guruhlar": "/features/schedules-and-groups",
  "/uz/imkoniyatlar/raqamli-davomat": "/features/digital-attendance",
  "/uz/imkoniyatlar/filiallar-boshqaruvi": "/features/branch-management",
  "/uz/tariflar": "/pricing",
  "/uz/maxfiylik": "/privacy",
  "/uz/oferta": "/terms",
  // ru
  "/ru/vozmozhnosti/platezhi-i-zadolzhennost": "/ru/features/payments-and-debt",
  "/ru/vozmozhnosti/raspisanie-i-gruppy": "/ru/features/schedules-and-groups",
  "/ru/vozmozhnosti/tsifrovaya-poseshchaemost": "/ru/features/digital-attendance",
  "/ru/vozmozhnosti/upravlenie-filialami": "/ru/features/branch-management",
  "/ru/tarify": "/ru/pricing",
  "/ru/konfidencialnost": "/ru/privacy",
  "/ru/oferta": "/ru/terms",
};

export function getSeoPagePath(id: SeoPageId, locale: Locale): string {
  const segments = SEO_PAGES[id][locale].segments.join("/");
  return locale === "uz" ? `/${segments}` : `/${locale}/${segments}`;
}

export function getSeoPagePaths(id: SeoPageId): Record<Locale, string> {
  return Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, getSeoPagePath(id, locale)]),
  ) as Record<Locale, string>;
}

export function getSeoPage(locale: Locale, seoPath: readonly string[]) {
  const requestedPath = seoPath.join("/");
  const id = SEO_PAGE_IDS.find(
    (candidate) => SEO_PAGES[candidate][locale].segments.join("/") === requestedPath,
  );

  return id ? { id, copy: SEO_PAGES[id][locale] } : undefined;
}

export function getSeoPageStaticParams() {
  return SEO_PAGE_IDS.flatMap((id) =>
    SUPPORTED_LOCALES.map((locale) => ({
      locale,
      seoPath: [...SEO_PAGES[id][locale].segments],
    })),
  );
}
