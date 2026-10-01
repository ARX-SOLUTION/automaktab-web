import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

export const SEO_PAGE_IDS = [
  "payments",
  "schedule",
  "attendance",
  "branches",
  "pricing",
  "privacy",
  "terms",
] as const;

export type SeoPageId = (typeof SEO_PAGE_IDS)[number];

/** Cross-links for product SEO surfaces (legal stubs excluded). */
export const SEO_RELATED_PAGE_IDS = [
  "payments",
  "schedule",
  "attendance",
  "branches",
  "pricing",
] as const satisfies readonly SeoPageId[];

export const SEO_LEGAL_PAGE_IDS = [
  "privacy",
  "terms",
] as const satisfies readonly SeoPageId[];

type SeoSection = {
  title: string;
  body: string;
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
      title: "Avtomaktab to‘lovlari va qarzdorlik | automaktab.uz",
      description:
        "Talabalar to‘lovlari va qolgan qarzni bir joyda ko‘ring. Qarzdorlarni filial va guruh bo‘yicha toping.",
      keywords: [
        "avtomaktab to‘lovlari",
        "qarzdorlik nazorati",
        "avtomaktab CRM",
      ],
      eyebrow: "To‘lovlar nazorati",
      heading: "Avtomaktab to‘lovlari va qarzdorligini boshqaring.",
      intro:
        "Kim qancha to‘laganini va qancha qarzi qolganini ko‘ring. Talaba kartasi va qarzdorlar ro‘yxati bir tizimda.",
      sections: [
        {
          title: "To‘lovlar talaba kartasida",
          body:
            "Talabaning to‘lov tarixi va qolgan qarzini kartasidan tekshiring. Kerakli ma’lumot boshqa faylda qolib ketmaydi.",
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
      ],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "To‘lovlar hisobini demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["features", "payments-and-debt"],
      title: "Оплаты и задолженность автошколы | automaktab.uz",
      description:
        "Смотрите оплаты и остаток долга в карточке курсанта. Находите должников по филиалу и группе.",
      keywords: ["оплаты автошколы", "задолженность автошколы", "CRM автошколы"],
      eyebrow: "Контроль оплат",
      heading: "Управляйте оплатами и задолженностью автошколы.",
      intro:
        "Проверяйте, сколько курсант оплатил и сколько осталось. Карточка курсанта и список задолженности находятся в одной системе.",
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
      ],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите учёт оплат в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["features", "payments-and-debt"],
      title: "Driving-school payments and debt | automaktab.uz",
      description:
        "See payments and outstanding debt on each student record. Find students with debt by branch and group.",
      keywords: ["driving school payments", "driving school debt", "driving school CRM"],
      eyebrow: "Payment control",
      heading: "Keep track of payments and student debt.",
      intro:
        "See how much each student has paid and what remains. Student records and the debt list are in one system.",
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
      ],
      relatedLabel: "Other features",
      cta: {
        title: "See payment records in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-09-19",
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
        "Guruh ro‘yxatidan har bir talabaning davomatini belgilang. Qaysi darslarni qoldirganini shu tizimda tekshiring.",
      sections: [
        {
          title: "To‘rtta tushunarli holat",
          body:
            "Keldi, kechikdi, kelmadi yoki uzrli. Har bir talabaning holatini dars ro‘yxatida belgilang.",
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
            "Filiallar, talabalar soni va kerakli bo‘limlarni ayting. Sizga mos shartlarni yozma taklifda oling.",
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
            "CRM maktabning kundalik ishi uchun kerakli ma’lumotlarni saqlaydi: talabalar, guruhlar, to‘lov va qarzdorlik yozuvlari, dars jadvali, davomat va xodim akkauntlari. Saytdagi so‘rov formasidan yuborilgan ism, telefon va maktab haqidagi qisqa ma’lumot faqat bog‘lanish uchun ishlatiladi. Demoda haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
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
            "automaktab.uz avtomaktablarga talabalar, to‘lovlar, jadval va davomatni bitta tizimda boshqarishga yordam beradi. Saytdagi materiallar axborot xarakterida; mahsulot imkoniyatlari sinov va shartnomada tasdiqlangan doirada beriladi.",
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
