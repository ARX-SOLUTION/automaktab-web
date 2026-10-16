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
  "telegram",
  "fleet",
  "expenses",
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
  "telegram",
  "fleet",
  "expenses",
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
  | "pricing-cards"
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
        "automaktab.uz har bir o‘quvchining to‘lovlari va qolgan qarzini kartasida saqlaydi; qarzdorlarni filial bo‘yicha saralaysiz.",
      visual: "scene:director",
      sections: [
        {
          title: "To‘lovlar o‘quvchi kartasida",
          body:
            "Kartada kurs narxi, to‘langan summa, qolgan qarz va to‘lovlar tarixi turadi. Shartnoma, 083 ma’lumotnoma va hujjatlar holati ham shu yerda.",
        },
        {
          title: "Qarzdorlarni tez toping",
          body:
            "Qarzdorlar ro‘yxatidan kim bilan bog‘lanish kerakligini ko‘ring. Guruh sahifasida har bir o‘quvchining qarzi ko‘rinadi.",
        },
        {
          title: "Kim nimani ko‘radi",
          body:
            "To‘lovni faqat ruxsati bor xodim o‘z filiallari bo‘yicha ko‘radi va kiritadi. Kim va qachon o‘zgartirgani audit tarixida qoladi.",
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
          question: "Qarzdorlar haqida Telegram’da xabar keladimi?",
          answer:
            "Yo‘q. 08:00 dagi Telegram hisobotida kechagi tushum va yangi o‘quvchilar soni bor. Qarzdorlarni tizimdagi ro‘yxatdan ko‘rasiz.",
        },
        {
          question: "Qarzdorlarni qanday saralayman?",
          answer:
            "O‘quvchilar ro‘yxatida qarzi borlarni alohida filtrlang va qarz miqdori bo‘yicha saralang. Rahbar panelida davr tushumi va o‘quvchilar qarzdorligi jami va har bir filial bo‘yicha ko‘rinadi.",
        },
      ],
      related: ["branches", "attendance", "telegram"],
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
        "automaktab.uz хранит оплаты и остаток долга каждого курсанта в его карточке; должников можно отфильтровать по филиалу.",
      visual: "scene:director",
      sections: [
        {
          title: "Оплаты в карточке курсанта",
          body:
            "В карточке цена курса, оплаченная сумма, остаток долга и история оплат. Договор, медсправка 083 и статус документов тоже здесь.",
        },
        {
          title: "Быстро находите должников",
          body:
            "Список задолженности показывает, с кем связаться. На странице группы виден долг каждого курсанта.",
        },
        {
          title: "Кто что видит",
          body:
            "Оплаты видят и вносят только сотрудники с правами, по своим филиалам. Кто и когда что изменил, остаётся в журнале аудита.",
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
        {
          question: "Как отсортировать должников?",
          answer:
            "В списке курсантов отфильтруйте тех, у кого есть долг, и отсортируйте по сумме долга. На панели руководителя выручка за период и задолженность курсантов видны в целом и по каждому филиалу.",
        },
      ],
      related: ["branches", "attendance", "telegram"],
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
        "automaktab.uz keeps every student's payments and outstanding debt on their record; you filter students with debt by branch.",
      visual: "scene:director",
      sections: [
        {
          title: "Payments stay with the student record",
          body:
            "The record holds the course price, amount paid, outstanding debt and payment history, plus the contract, 083 medical certificate and document status.",
        },
        {
          title: "Find students with outstanding payments",
          body:
            "The debt list shows who needs a follow-up. The group page shows each student's debt.",
        },
        {
          title: "Who sees what",
          body:
            "Only staff with permission see and record payments, for their own branches. Who changed what, and when, stays in the audit log.",
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
        {
          question: "How do I sort students with debt?",
          answer:
            "Filter the student list to those with debt and sort by the amount owed. The owner dashboard shows revenue for the period and student debt in total and for each branch.",
        },
      ],
      related: ["branches", "attendance", "telegram"],
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
      title: "Avtomaktab CRM: dars jadvali va guruhlar | automaktab.uz",
      description:
        "Nazariya va amaliy darslarni guruh hamda o‘qituvchi bilan haftalik jadvalda rejalashtiring.",
      keywords: ["avtomaktab dars jadvali", "avtomaktab guruhlari", "nazariya va amaliy darslar"],
      eyebrow: "Jadval va guruhlar",
      heading: "Dars jadvali va guruhlar bir tizimda.",
      intro:
        "Nazariya va haydash mashg‘ulotlarini bir jadvalda rejalashtiring. Guruh, o‘qituvchi va dars vaqtini belgilang.",
      definition:
        "automaktab.uz jadvali guruhning haftalik shablonidan tuziladi: hafta kuni, vaqt va dars turi. Shablondan 1–12 hafta darslari yaratiladi.",
      visual: "scene:registrar",
      sections: [
        {
          title: "Bir haftalik darslar ko‘z oldingizda",
          body:
            "Haftalik jadvaldan qaysi kuni qanday dars borligini ko‘ring. Dars vaqti o‘zgarsa, o‘quvchi kabinetida bildirishnoma chiqadi.",
        },
        {
          title: "Kim qaysi jadvalni ko‘radi",
          body:
            "O‘qituvchi faqat o‘z guruhlarini, filial xodimlari o‘z filialini ko‘radi. Rahbar barcha filiallar darslarini bitta kalendarda ko‘radi.",
        },
        {
          title: "Davomat shu darsdan boshlanadi",
          body:
            "Yaratilgan dars davomat jurnalida ochiladi. Kalendarda qaysi darsda davomat belgilanganini ko‘rasiz.",
        },
      ],
      faq: [
        {
          question: "Darslarni har hafta qo‘lda kiritish kerakmi?",
          answer:
            "Yo‘q. Guruhga haftalik shablon qo‘shing va 1–12 hafta uchun darslarni yarating. Bir guruhga bir nechta shablon qo‘shish mumkin, masalan, dushanba nazariya va payshanba amaliy dars. Shablonni rahbar, menejer yoki qabul xodimi kiritadi. Avval yaratilgan darslar takrorlanmaydi.",
        },
        {
          question: "Jadvalda xona yoki auditoriya bormi?",
          answer:
            "Hozircha yo‘q. Dars guruh, sana, vaqt va dars turi bilan saqlanadi.",
        },
        {
          question: "Amaliy haydash shu jadvalda rejalashtiriladimi?",
          answer:
            "Guruhning amaliy darslari jadvalda alohida turda ko‘rinadi. Har bir o‘quvchining haydash mashg‘uloti esa alohida yoziladi va menejer tasdiqlaydi.",
        },
        {
          question: "O‘qituvchi boshqa guruhlar jadvalini ko‘radimi?",
          answer:
            "Yo‘q. O‘qituvchi faqat o‘ziga biriktirilgan guruhlar darslarini ko‘radi.",
        },
        {
          question: "Kalendarda nima ko‘rinadi?",
          answer:
            "Har bir dars sanasi, guruhi, o‘qituvchisi va belgilangan davomati bilan ko‘rinadi. Kalendarni kerakli sana oralig‘ida oching.",
        },
        {
          question: "Shablonni kim boshqaradi?",
          answer:
            "Shablonni rahbar, menejer yoki qabul xodimi qo‘shadi va tahrirlaydi. O‘chirish faqat rahbar va menejerga ruxsat etilgan. Kerak bo‘lmagan shablonni nofaol qilib qo‘yish mumkin.",
        },
      ],
      related: ["attendance", "driving", "branches"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Dars jadvalini demoda ko‘ring.",
        body: "Namuna maktabning haftalik jadvali, guruhlari va darslarini tekshiring.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "schedules-and-groups"],
      title: "Расписание и группы в CRM автошколы | automaktab.uz",
      description:
        "Планируйте теорию и практику в недельном расписании с группой и преподавателем.",
      keywords: ["расписание автошколы", "группы автошколы", "теория и практика"],
      eyebrow: "Расписание и группы",
      heading: "Расписание и группы в одной системе.",
      intro:
        "Планируйте теорию и вождение в одном расписании. Для каждого занятия укажите группу, преподавателя и время.",
      definition:
        "Расписание automaktab.uz строится из недельного шаблона группы: день, время и тип занятия. Из шаблона создаются занятия на 1–12 недель.",
      visual: "scene:registrar",
      sections: [
        {
          title: "Вся неделя перед глазами",
          body:
            "Смотрите, какие занятия запланированы на каждый день. Если время занятия меняется, курсант видит уведомление в кабинете.",
        },
        {
          title: "Кто какое расписание видит",
          body:
            "Преподаватель видит только свои группы, сотрудники филиала видят свой филиал. Руководитель видит занятия всех филиалов в одном календаре.",
        },
        {
          title: "Посещаемость начинается с занятия",
          body:
            "Созданное занятие открывается в журнале посещаемости. В календаре видно, где посещаемость уже отмечена.",
        },
      ],
      faq: [
        {
          question: "Нужно ли вносить занятия вручную каждую неделю?",
          answer:
            "Нет. Добавьте группе недельный шаблон и создайте занятия на 1–12 недель. У группы может быть несколько шаблонов, например теория в понедельник и практика в четверг. Шаблон вносит руководитель, менеджер или сотрудник приёмной. Уже созданные занятия не дублируются.",
        },
        {
          question: "Есть ли в расписании аудитории?",
          answer:
            "Пока нет. Занятие хранится с группой, датой, временем и типом.",
        },
        {
          question: "Планируется ли вождение в этом расписании?",
          answer:
            "Практические занятия группы видны в расписании отдельным типом. Каждое занятие вождения курсанта записывается отдельно и подтверждается менеджером.",
        },
        {
          question: "Видит ли преподаватель расписание других групп?",
          answer:
            "Нет. Преподаватель видит только занятия своих групп.",
        },
        {
          question: "Что видно в календаре?",
          answer:
            "Каждое занятие показано с датой, группой, преподавателем и отмеченной посещаемостью. Календарь открывается за нужный период.",
        },
        {
          question: "Кто управляет шаблонами?",
          answer:
            "Шаблон добавляет и редактирует руководитель, менеджер или сотрудник приёмной. Удалять его могут только руководитель и менеджер. Ненужный шаблон можно сделать неактивным.",
        },
      ],
      related: ["attendance", "driving", "branches"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите расписание в демо.",
        body: "Проверьте недельное расписание, группы и занятия на примере автошколы.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "schedules-and-groups"],
      title: "Driving-school CRM for schedules and groups | automaktab.uz",
      description:
        "Plan theory and driving lessons in a weekly schedule. Assign each lesson to a group and teacher.",
      keywords: ["driving school schedule", "driving school groups", "theory and practical lessons"],
      eyebrow: "Schedules and groups",
      heading: "Schedule groups and lessons in one place.",
      intro:
        "Plan theory and driving lessons in one schedule. Set the group, teacher and time for each lesson.",
      definition:
        "automaktab.uz builds the schedule from a group's weekly template: weekday, time and lesson type, generating lessons for 1–12 weeks.",
      visual: "scene:registrar",
      sections: [
        {
          title: "See the whole week at a glance",
          body:
            "See which lessons are planned each day. If a lesson time changes, the student sees a notification in their account.",
        },
        {
          title: "Who sees which schedule",
          body:
            "Teachers see only their own groups; branch staff see their branch. The owner sees every branch's lessons in one calendar.",
        },
        {
          title: "Attendance starts from the lesson",
          body:
            "A generated lesson opens in the attendance register. The calendar shows which lessons already have attendance.",
        },
      ],
      faq: [
        {
          question: "Do I have to enter lessons by hand every week?",
          answer:
            "No. Add a weekly template to the group and generate lessons for 1–12 weeks. A group can have several templates, for example theory on Monday and practice on Thursday. The owner, a manager or admissions staff can set templates. Lessons that already exist are not duplicated.",
        },
        {
          question: "Does the schedule track rooms?",
          answer:
            "Not yet. A lesson is stored with its group, date, time and type.",
        },
        {
          question: "Is practical driving planned in this schedule?",
          answer:
            "A group’s practical lessons appear in the schedule as their own type. Each student’s driving session is recorded separately and approved by a manager.",
        },
        {
          question: "Can a teacher see other groups’ schedules?",
          answer:
            "No. Teachers see only the lessons of groups assigned to them.",
        },
        {
          question: "What does the calendar show?",
          answer:
            "Each lesson shows its date, group, teacher and recorded attendance. Open the calendar for any date range.",
        },
        {
          question: "Who manages templates?",
          answer:
            "The owner, a manager or admissions staff can add and edit templates. Only the owner and managers can delete them. A template that is no longer needed can be set to inactive.",
        },
      ],
      related: ["attendance", "driving", "branches"],
      relatedLabel: "Other features",
      cta: {
        title: "See the schedule in the demo.",
        body: "Explore the weekly schedule, groups and lessons in a sample school.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  attendance: {
    uz: {
      segments: ["features", "digital-attendance"],
      title: "Avtomaktab CRM: davomat jurnali | automaktab.uz",
      description:
        "Har bir darsda kim kelganini, kechikkanini yoki kelmaganini belgilang. Davomatni guruh va dars bilan bir joyda yuriting.",
      keywords: ["avtomaktab davomat", "raqamli davomat", "davomat jurnali"],
      eyebrow: "Raqamli davomat",
      heading: "Har bir dars davomatini bir joyda yuriting.",
      intro:
        "Guruh ro‘yxatidan har bir o‘quvchining davomatini belgilang. Qaysi darslarni qoldirganini shu tizimda tekshiring.",
      definition:
        "automaktab.uz har bir dars uchun o‘quvchini keldi, kechikdi, kelmadi yoki uzrli deb belgilaydi. Davomat dars, guruh va o‘quvchi kartasiga bog‘lanadi.",
      visual: "scene:teacher",
      sections: [
        {
          title: "Butun guruh bir martada",
          body:
            "Guruh holatini bir martada saqlang. Har bir yozuvga izoh qo‘shiladi, kim belgilagani saqlanadi.",
        },
        {
          title: "O‘quvchi kartasida tarix",
          body:
            "Qatnashgan, kechikkan va qoldirgan darslar tarixi to‘lov va guruh ma’lumotlari yonida turadi.",
        },
        {
          title: "Uzrli sabab va izoh",
          body:
            "Uzrli deb belgilang va sababini izohga yozing. Uzrsiz va uzrli qoldirilgan darslar alohida ko‘rinadi.",
        },
        {
          title: "Kalendarda davomat holati",
          body:
            "Har bir dars yonida belgilangan davomat ko‘rinadi; belgilanmagan darsni shu yerdan topasiz.",
        },
      ],
      faq: [
        {
          question: "Face ID yoki QR kod bilan davomat bormi?",
          answer:
            "Yo‘q. Davomatni o‘qituvchi yoki xodim dars ro‘yxatida belgilaydi.",
        },
        {
          question: "O‘quvchi o‘z davomatini ko‘radimi?",
          answer:
            "Ha. O‘quvchi kabinetida (student.automaktab.uz) o‘z darslari va davomatini ko‘radi.",
        },
        {
          question: "Davomatni kim belgilaydi?",
          answer:
            "Rahbar, menejer, qabul xodimi yoki guruh o‘qituvchisi. O‘qituvchi faqat o‘ziga biriktirilgan guruhlar darslarini belgilaydi. Filial xodimlari o‘z filiali, rahbar esa barcha filiallar davomatini ko‘radi.",
        },
        {
          question: "Davomatni keyin tuzatish mumkinmi?",
          answer:
            "Ha. Dars ro‘yxatini qayta saqlash mumkin. Har bir saqlash audit jurnaliga yoziladi.",
        },
        {
          question: "Kelmagan o‘quvchi haqida SMS boradimi?",
          answer:
            "Yo‘q. automaktab.uz SMS yubormaydi.",
        },
        {
          question: "Davomat tarixini Telegram’da ko‘rsa bo‘ladimi?",
          answer:
            "Ha. O‘qituvchi Telegram botida o‘z o‘quvchisining davomat tarixini ochadi. Boshqa o‘qituvchi o‘quvchilarining tarixi unga ko‘rinmaydi.",
        },
      ],
      related: ["schedule", "payments", "branches"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Davomatni demoda belgilab ko‘ring.",
        body: "Namuna ma’lumotlari bilan davomat belgilashni sinang.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "digital-attendance"],
      title: "Электронный журнал: посещаемость в CRM автошколы | automaktab.uz",
      description:
        "Отмечайте посещаемость каждого занятия: пришёл, опоздал, не пришёл или пропустил по уважительной причине.",
      keywords: ["посещаемость автошколы", "цифровая посещаемость", "журнал посещаемости"],
      eyebrow: "Цифровая посещаемость",
      heading: "Ведите посещаемость каждого занятия в одной системе.",
      intro:
        "Отмечайте посещаемость в списке группы. Здесь же проверяйте, какие занятия пропустил курсант.",
      definition:
        "automaktab.uz отмечает курсанта на каждом занятии: пришёл, опоздал, не пришёл или уважительная причина, с привязкой к группе и карточке.",
      visual: "scene:teacher",
      sections: [
        {
          title: "Вся группа за один раз",
          body:
            "Сохраните статусы всей группы одним действием. К записи можно добавить комментарий, и сохраняется, кто отметил.",
        },
        {
          title: "История в карточке курсанта",
          body:
            "История посещённых, пропущенных занятий и опозданий видна рядом с оплатами и группой.",
        },
        {
          title: "Уважительная причина и комментарий",
          body:
            "Отметьте «уважительная» и укажите причину в комментарии. Пропуски без причины и по уважительной причине видны отдельно.",
        },
        {
          title: "Посещаемость в календаре",
          body:
            "Рядом с каждым занятием видна отмеченная посещаемость; неотмеченное занятие легко найти.",
        },
      ],
      faq: [
        {
          question: "Есть ли отметка по Face ID или QR-коду?",
          answer:
            "Нет. Посещаемость отмечает преподаватель или сотрудник в списке занятия.",
        },
        {
          question: "Видит ли курсант свою посещаемость?",
          answer:
            "Да. В личном кабинете (student.automaktab.uz) курсант видит свои занятия и посещаемость.",
        },
        {
          question: "Кто отмечает посещаемость?",
          answer:
            "Руководитель, менеджер, сотрудник приёмной или преподаватель группы. Преподаватель отмечает только свои группы. Сотрудники филиала видят посещаемость своего филиала, а руководитель всех филиалов.",
        },
        {
          question: "Можно ли исправить посещаемость позже?",
          answer:
            "Да. Список занятия можно сохранить повторно. Каждое сохранение записывается в журнал аудита.",
        },
        {
          question: "Уходит ли SMS о пропуске?",
          answer:
            "Нет. automaktab.uz не отправляет SMS.",
        },
        {
          question: "Можно ли посмотреть посещаемость в Telegram?",
          answer:
            "Да. Преподаватель открывает в Telegram-боте историю посещаемости своего курсанта. Курсанты других преподавателей ему недоступны.",
        },
      ],
      related: ["schedule", "payments", "branches"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Попробуйте отметить посещаемость в демо.",
        body: "Попробуйте журнал посещаемости на вымышленных данных.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "digital-attendance"],
      title: "Driving-school CRM attendance register | automaktab.uz",
      description:
        "Record clear attendance statuses for every driving-school lesson: present, late, absent, or excused.",
      keywords: ["driving school attendance", "digital attendance", "attendance record"],
      eyebrow: "Digital attendance",
      heading: "Keep attendance for every lesson together.",
      intro:
        "Mark attendance on the group list. Check which lessons each student has missed in the same system.",
      definition:
        "automaktab.uz marks each student present, late, absent or excused per lesson, linked to the group and the student’s record.",
      visual: "scene:teacher",
      sections: [
        {
          title: "The whole group at once",
          body:
            "Save the whole group in one step. Each record can carry a note, and who marked it is kept.",
        },
        {
          title: "History on the student record",
          body:
            "Attended, late and missed lessons are listed next to payments and group details.",
        },
        {
          title: "Excused absences and notes",
          body:
            "Mark the student excused and add the reason as a note. Excused and unexcused absences show separately.",
        },
        {
          title: "Attendance in the calendar",
          body:
            "Recorded attendance shows next to each lesson, so lessons without it are easy to find.",
        },
      ],
      faq: [
        {
          question: "Is there Face ID or QR-code check-in?",
          answer:
            "No. A teacher or staff member marks attendance on the lesson roster.",
        },
        {
          question: "Can students see their own attendance?",
          answer:
            "Yes. In their student account (student.automaktab.uz) they see their lessons and attendance.",
        },
        {
          question: "Who marks attendance?",
          answer:
            "The owner, a manager, admissions staff or the group’s teacher. Teachers can mark only their own groups. Branch staff see attendance for their branch; the owner sees every branch.",
        },
        {
          question: "Can attendance be corrected later?",
          answer:
            "Yes. The lesson roster can be saved again, and every save is written to the audit log.",
        },
        {
          question: "Is an SMS sent when a student misses a lesson?",
          answer:
            "No. automaktab.uz does not send SMS.",
        },
        {
          question: "Can attendance history be opened in Telegram?",
          answer:
            "Yes. Teachers can open their own student’s attendance history in the Telegram bot. Other teachers’ students are not available to them.",
        },
      ],
      related: ["schedule", "payments", "branches"],
      relatedLabel: "Other features",
      cta: {
        title: "Try taking attendance in the demo.",
        body: "Try the attendance register with sample data.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  branches: {
    uz: {
      segments: ["features", "branch-management"],
      title: "Avtomaktab filiallari va kirish huquqlari CRM'da | automaktab.uz",
      description:
        "Filiallar tushumi va qarzdorligini rahbar panelida solishtiring. Maktabning umumiy holatini bir joyda ko‘ring.",
      keywords: ["avtomaktab filiallari", "filiallar boshqaruvi", "rahbar paneli"],
      eyebrow: "Filiallar boshqaruvi",
      heading: "Barcha filiallar holati bir joyda.",
      intro:
        "Filiallar tushumi va qarzdorligini rahbar panelida solishtiring. Qaysi filialga e’tibor kerakligini ko‘ring.",
      definition:
        "automaktab.uz bir nechta filialni bitta tizimda yuritadi: rahbar barcha filiallarni ko‘radi, menejer va boshqa xodimlar esa faqat o‘zlariga biriktirilgan filialni.",
      visual: "scene:director",
      sections: [
        {
          title: "Rahbar panelida filiallar",
          body:
            "Bir nechta filial bo‘lsa, panelda taqqoslash grafigi va tushum bo‘yicha eng yaxshi filiallar chiqadi. Jami tushum va qarz ham shu yerda.",
        },
        {
          title: "Kirish huquqlari",
          body:
            "Har bir ruxsat uchta doiradan biriga ega: butun maktab, bitta filial yoki faqat o‘z ma’lumotlari.",
        },
        {
          title: "Kim nimani o‘zgartirgani",
          body:
            "Muhim o‘zgarishlar audit jurnaliga yoziladi: kim, qachon va qaysi yozuvni o‘zgartirgani. Jurnal rahbarga ochiq.",
        },
      ],
      faq: [
        {
          question: "Menejer boshqa filial ma’lumotlarini ko‘radimi?",
          answer:
            "Yo‘q, faqat o‘ziga biriktirilgan filialni. Rahbar kerak bo‘lsa ruxsatni boshqa filial yoki butun maktab doirasida berishi mumkin.",
        },
        {
          question: "Xodimlarga ruxsatni kim beradi?",
          answer:
            "Rahbar. Ruxsatlarni boshqarish menejerga sukut bo‘yicha berilmaydi. Menejer sukut bo‘yicha deyarli barcha bo‘limlarni ko‘radi; audit jurnali va sozlamalar unga yopiq.",
        },
        {
          question: "Filiallar tushumini qanday solishtiraman?",
          answer:
            "Rahbar panelidagi taqqoslash grafigida har bir filial bo‘yicha o‘quvchilar, tushum va qarzdorlik ko‘rinadi. Filiallar tushum bo‘yicha saralanadi.",
        },
        {
          question: "Bitta xodim ikki filialda ishlay oladimi?",
          answer:
            "Ha. Xodimni bir nechta filialga biriktirib, har bir filial uchun alohida ruxsat berish mumkin.",
        },
        {
          question: "Qanday rollar bor?",
          answer:
            "Rollar: rahbar, menejer, buxgalter, qabul xodimi va o‘qituvchi. Takrorlanadigan ruxsatlar to‘plamini nomli shablon sifatida saqlab, yangi xodimga qo‘llang.",
        },
        {
          question: "Filial bo‘yicha kunlik hisobot keladimi?",
          answer:
            "Ha. Hisobotni yoqqan rahbar har kuni 08:00 da Telegram’da maktab bo‘yicha, menejer esa o‘z filiali bo‘yicha kechagi tushum va yangi o‘quvchilar sonini oladi.",
        },
      ],
      related: ["telegram", "expenses", "payments"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Filiallar natijasini demoda ko‘ring.",
        body: "Rahbar panelini namuna ma’lumotlari bilan tekshiring.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "branch-management"],
      title: "Управление филиалами автошколы и доступы в CRM | automaktab.uz",
      description:
        "Сравнивайте поступления и задолженность филиалов на панели руководителя. Смотрите результаты всей автошколы в одном месте.",
      keywords: ["филиалы автошколы", "управление филиалами", "панель владельца"],
      eyebrow: "Управление филиалами",
      heading: "Все филиалы на одном экране.",
      intro:
        "Сравнивайте поступления и задолженность филиалов на панели руководителя. Видно, какому филиалу нужно внимание.",
      definition:
        "automaktab.uz ведёт несколько филиалов в одной системе: руководитель видит все, а остальные сотрудники только свои филиалы.",
      visual: "scene:director",
      sections: [
        {
          title: "Филиалы на панели руководителя",
          body:
            "Если филиалов несколько, на панели есть график сравнения и лучшие филиалы по поступлениям. Итоги по автошколе тоже здесь.",
        },
        {
          title: "Права доступа",
          body:
            "Каждое право имеет одну из трёх областей: вся автошкола, один филиал или только свои данные.",
        },
        {
          title: "Кто что изменил",
          body:
            "Важные изменения пишутся в журнал аудита: кто, когда и какую запись изменил. Журнал доступен руководителю.",
        },
      ],
      faq: [
        {
          question: "Видит ли менеджер данные другого филиала?",
          answer:
            "Нет, только закреплённого за ним. При необходимости руководитель может выдать право на другой филиал или на всю автошколу.",
        },
        {
          question: "Кто выдаёт права сотрудникам?",
          answer:
            "Руководитель. Управление правами по умолчанию менеджеру не выдаётся. По умолчанию менеджер видит почти все разделы; журнал аудита и настройки ему закрыты.",
        },
        {
          question: "Как сравнить поступления филиалов?",
          answer:
            "На графике сравнения на панели руководителя видны курсанты, поступления и задолженность каждого филиала. Филиалы сортируются по поступлениям.",
        },
        {
          question: "Может ли сотрудник работать в двух филиалах?",
          answer:
            "Да. Сотрудника можно закрепить за несколькими филиалами и выдать права отдельно для каждого.",
        },
        {
          question: "Какие есть роли?",
          answer:
            "Роли: руководитель, менеджер, бухгалтер, сотрудник приёмной и преподаватель. Повторяющийся набор прав можно сохранить как именованный шаблон и применить к новому сотруднику.",
        },
        {
          question: "Приходит ли ежедневный отчёт по филиалу?",
          answer:
            "Да. Руководитель, включивший отчёт, каждый день в 08:00 получает в Telegram вчерашние поступления и число новых курсантов по всей автошколе, а менеджер по своему филиалу.",
        },
      ],
      related: ["telegram", "expenses", "payments"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Сравните филиалы в демо.",
        body: "Проверьте панель руководителя на вымышленных данных.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "branch-management"],
      title: "Driving-school CRM: branch management and access | automaktab.uz",
      description:
        "Compare branch revenue and student debt on the owner dashboard. See how the whole school is doing in one place.",
      keywords: ["driving school branches", "branch management", "owner dashboard"],
      eyebrow: "Branch management",
      heading: "Keep every branch in view.",
      intro:
        "Compare branch revenue and student debt on the owner dashboard. See which branch needs attention.",
      definition:
        "automaktab.uz runs several branches in one system: the owner sees every branch; other staff see only their assigned branches.",
      visual: "scene:director",
      sections: [
        {
          title: "Branches on the owner dashboard",
          body:
            "With more than one branch, the dashboard shows a comparison chart and top branches by revenue, plus school-wide totals.",
        },
        {
          title: "Access rights",
          body:
            "Each permission has one of three scopes: the whole school, one branch, or the employee's own records.",
        },
        {
          title: "Who changed what",
          body:
            "Important changes go to the audit log: who changed which record and when. The log is available to the owner.",
        },
      ],
      faq: [
        {
          question: "Can a manager see another branch’s data?",
          answer:
            "No, only the branch assigned to them. If needed, the owner can grant access to another branch or the whole school.",
        },
        {
          question: "Who grants permissions to staff?",
          answer:
            "The owner. Permission management is not part of a manager’s default access. By default a manager sees almost every section; the audit log and settings stay closed.",
        },
        {
          question: "How do I compare branch revenue?",
          answer:
            "The comparison chart on the owner dashboard shows students, revenue and debt for each branch, and branches are ranked by revenue.",
        },
        {
          question: "Can one employee work in two branches?",
          answer:
            "Yes. Assign the employee to several branches and grant permissions separately for each one.",
        },
        {
          question: "Which roles are there?",
          answer:
            "Roles: owner, manager, accountant, admissions staff and teacher. Save a recurring set of permissions as a named template and apply it to new staff.",
        },
        {
          question: "Is there a daily report per branch?",
          answer:
            "Yes. An owner who turns the report on gets yesterday’s revenue and new-student count for the whole school in Telegram at 08:00 every day; a manager gets the same for their branch.",
        },
      ],
      related: ["telegram", "expenses", "payments"],
      relatedLabel: "Other features",
      cta: {
        title: "Compare branches in the demo.",
        body: "Explore the owner dashboard with sample data.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  pricing: {
    uz: {
      segments: ["pricing"],
      title: "Tariflar | automaktab.uz",
      description:
        "Namuna demoni oching. Maktabingiz uchun 14 kunlik sinov, narx va cheklovlarni boshlashdan oldin yozma kelishing.",
      keywords: ["avtomaktab CRM narxi", "avtomaktab tariflari", "boshqaruv tizimi narxi"],
      eyebrow: "Tariflar va sinov",
      heading: "Maktabingiz uchun narx va sinov shartlari.",
      intro:
        "Demo namuna ma’lumotlari bilan ishlaydi. Maktabingiz ma’lumotlari bilan 14 kunlik sinov, narx va cheklovlarni oldindan yozma kelishamiz.",
      visual: "pricing-cards",
      sections: [],
      faq: [
        {
          question: "Narx qanday hisoblanadi?",
          answer:
            "Filiallar, o‘quvchilar soni va kerakli bo‘limlarga qarab. Narx, sinov muddati, ma’lumot ko‘chirish va cheklovlarni boshlashdan oldin yozma kelishamiz.",
        },
        {
          question: "Demo bilan sinovning farqi nima?",
          answer:
            "Demo namuna ma’lumotlari bilan ishlaydi va telefon raqamisiz ochiladi. Sinovda maktabingiz ma’lumotlari bilan 14 kun ishlaysiz.",
        },
        {
          question: "Sinovdan keyin nima bo‘ladi?",
          answer:
            "Davom etish yoki to‘xtatish sizning qaroringiz.",
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
        "Откройте демо. Цену и ограничения 14-дневного пробного периода для вашей автошколы согласуем письменно до начала.",
      keywords: ["стоимость CRM для автошколы", "тарифы автошколы", "цена системы управления"],
      eyebrow: "Тарифы и пробный период",
      heading: "Цена и пробный период для вашей автошколы.",
      intro:
        "Демо использует вымышленные данные. 14-дневный пробный период работает на данных вашей школы. Цену и ограничения согласуем письменно до начала.",
      visual: "pricing-cards",
      sections: [],
      faq: [
        {
          question: "Как считается цена?",
          answer:
            "По числу филиалов, курсантов и нужным разделам. Цену, срок пробного периода, перенос данных и ограничения согласуем письменно до начала.",
        },
        {
          question: "Чем демо отличается от пробного периода?",
          answer:
            "Демо работает на вымышленных данных и открывается без номера телефона. В пробный период вы 14 дней работаете на данных своей школы.",
        },
        {
          question: "Что после пробного периода?",
          answer:
            "Продолжить или остановиться решаете вы.",
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
        "Explore the demo. Agree on pricing and limits for a 14-day trial with your school’s data in writing before starting.",
      keywords: ["driving school CRM pricing", "driving school management pricing", "14-day school trial"],
      eyebrow: "Pricing and trial",
      heading: "Pricing and trial terms for your school.",
      intro:
        "The demo uses sample data. The 14-day trial uses your school’s data. We agree on pricing and limits in writing beforehand.",
      visual: "pricing-cards",
      sections: [],
      faq: [
        {
          question: "How is pricing calculated?",
          answer:
            "By your branch and student counts and the sections you need. We agree on price, trial length, data migration and limits in writing before you start.",
        },
        {
          question: "How is the demo different from the trial?",
          answer:
            "The demo uses sample data and opens without your phone number. The trial runs for 14 days with your school’s data.",
        },
        {
          question: "What happens after the trial?",
          answer:
            "You decide whether to continue.",
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
      title: "Avtomaktab CRM: murojaatlar va o‘quvchilarni qabul qilish | automaktab.uz",
      description:
        "Yangi murojaatlarni yo‘qotmang. Har bir nomzodni guruhga biriktirib, qabul holatini bir joyda ko‘ring.",
      keywords: [
        "avtomaktab murojaatlari",
        "o‘quvchi qabul qilish",
        "avtomaktab CRM",
      ],
      eyebrow: "Murojaatlar va qabul",
      heading: "Avtomaktab murojaatlari: birinchi qo‘ng‘iroqdan qabulgacha.",
      intro:
        "Telefon, Telegram va tashrifdan kelgan murojaatlarni bir ro‘yxatda to‘plang. Qaysi nomzod qaysi guruhga yozilganini shu yerda ko‘ring.",
      definition:
        "automaktab.uz har bir murojaatni manbasi, bosqichi va mas’ul xodimi bilan yozadi va uni o‘quvchi kartasiga aylantiradi.",
      visual: "scene:leads",
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
          title: "Mas’ul xodim va keyingi qadam",
          body:
            "Har bir murojaatga mas’ul xodim biriktiriladi va keyingi aloqa vaqti belgilanadi. Murojaatlarni ro‘yxat yoki bosqichlar doskasi ko‘rinishida kuzating.",
        },
      ],
      faq: [
        {
          question: "Qaysi manbalarni belgilash mumkin?",
          answer:
            "Tavsiya, Instagram, xarita katalogi, Telegram, o‘zi kelgan, OLX va boshqa. Maktab qo‘shimcha manbalar ham qo‘sha oladi.",
        },
        {
          question: "Murojaat o‘quvchiga qanday aylanadi?",
          answer:
            "Rahbar, menejer yoki qabul xodimi murojaatni o‘quvchiga aylantiradi. Shundan keyin o‘quvchi kartasida guruh, to‘lov va davomat yuritiladi.",
        },
        {
          question: "SMS yuboriladimi?",
          answer:
            "Yo‘q, SMS yuborilmaydi. Har bir murojaatga keyingi aloqa vaqti belgilanadi va muddati o‘tganlari ko‘rsatkichlarda ko‘rinadi. Telegram’ni ulagan rahbar barcha yangi murojaatlar, menejer esa o‘z filiali murojaatlari haqida xabar oladi.",
        },
        {
          question: "Bosqichlarni o‘zgartirsa bo‘ladimi?",
          answer:
            "Ha. Rahbar yoki menejer bosqichlar nomi, rangi va tartibini sozlaydi. Har bir bosqich «ishda», «qabul qilindi» yoki «yo‘qotildi» turida bo‘ladi. Yo‘qotilganda sababi yoziladi: qimmat, boshqa maktab, vaqt to‘g‘ri kelmadi, fikridan qaytdi, javob bermadi yoki boshqa.",
        },
        {
          question: "Takroriy murojaat aniqlanadimi?",
          answer:
            "Har bir murojaatda qo‘ng‘iroq, xabar, uchrashuv, vazifa va izohlar tarixi saqlanadi. Yangi murojaat qo‘shilganda telefon raqami bo‘yicha dublikat tekshiriladi.",
        },
        {
          question: "Qanday ko‘rsatkichlar bor?",
          answer:
            "Ko‘rsatkichlar bo‘limida har bir bosqichdagi murojaatlar, muddati o‘tgan keyingi qadamlar, 3 kundan beri tegilmaganlar, qabulga aylanish va yo‘qotish sabablari ko‘rinadi. Ro‘yxatni Excel’ga eksport qilish mumkin.",
        },
      ],
      related: ["payments", "telegram", "branches"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Qabul jarayonini demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "leads-and-enrollment"],
      title: "Заявки и приём курсантов в CRM автошколы | automaktab.uz",
      description:
        "Не теряйте заявки. Ведите каждого кандидата до группы и смотрите статус приёма в одном месте.",
      keywords: ["заявки автошколы", "приём курсантов", "CRM автошколы"],
      eyebrow: "Заявки и приём",
      heading: "Заявки автошколы: от первого звонка до зачисления.",
      intro:
        "Собирайте заявки из звонков, Telegram и визитов в одном списке. Видно, какой кандидат в какую группу зачислен.",
      definition:
        "automaktab.uz записывает каждую заявку с источником, этапом и ответственным сотрудником и превращает её в карточку курсанта.",
      visual: "scene:leads",
      sections: [
        {
          title: "Заявки в одном списке",
          body:
            "Неважно, откуда пришла заявка: каждая попадает в общий список. Видно, на какие заявки ещё не ответили.",
        },
        {
          title: "От кандидата к группе",
          body:
            "Зачислите принятого курсанта в группу. Оплаты и посещаемость продолжаются с его карточки.",
        },
        {
          title: "Ответственный и следующий шаг",
          body:
            "За каждой заявкой закрепляется ответственный сотрудник и время следующего контакта. Заявки можно вести списком или на доске этапов.",
        },
      ],
      faq: [
        {
          question: "Какие источники можно указать?",
          answer:
            "Рекомендация, Instagram, каталог на карте, Telegram, пришёл сам, OLX и другое. Автошкола может добавить свои источники.",
        },
        {
          question: "Как заявка становится курсантом?",
          answer:
            "Руководитель, менеджер или сотрудник приёмной превращает заявку в курсанта. Дальше группа, оплаты и посещаемость ведутся в карточке курсанта.",
        },
        {
          question: "Отправляются ли SMS?",
          answer:
            "Нет, SMS не отправляются. Для каждой заявки задаётся время следующего контакта, а просроченные видны в показателях. Руководитель, подключивший Telegram, получает уведомления обо всех новых заявках, а менеджер о заявках своего филиала.",
        },
        {
          question: "Можно ли настроить этапы?",
          answer:
            "Да. Руководитель или менеджер настраивает названия, цвета и порядок этапов. Каждый этап относится к типу «в работе», «зачислен» или «потерян». При потере указывается причина: дорого, выбрал другую школу, неудобное время, передумал, не отвечает или другое.",
        },
        {
          question: "Находятся ли дубликаты заявок?",
          answer:
            "В каждой заявке хранится история звонков, сообщений, встреч, задач и заметок. При добавлении новой заявки дубликат проверяется по номеру телефона.",
        },
        {
          question: "Какие есть показатели?",
          answer:
            "В разделе показателей видно число заявок на каждом этапе, просроченные следующие шаги, заявки без касания более 3 дней, конверсию в зачисление и причины потерь. Список можно выгрузить в Excel.",
        },
      ],
      related: ["payments", "telegram", "branches"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите процесс приёма в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "leads-and-enrollment"],
      title: "Driving-school CRM for inquiries and student enrollment | automaktab.uz",
      description:
        "Stop losing inquiries. Track every candidate through to group placement in one place.",
      keywords: ["driving school inquiries", "student enrollment", "driving school CRM"],
      eyebrow: "Inquiries and enrollment",
      heading: "Driving-school inquiries: from first call to enrollment.",
      intro:
        "Collect inquiries from calls, Telegram and walk-ins in one list. See which candidate joined which group.",
      definition:
        "automaktab.uz records every inquiry with its source, stage and responsible employee, and turns it into a student record.",
      visual: "scene:leads",
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
          title: "Owner and next step",
          body:
            "Each inquiry gets a responsible employee and a next-contact time. Work with inquiries as a list or on a stage board.",
        },
      ],
      faq: [
        {
          question: "Which sources can I record?",
          answer:
            "Referral, Instagram, map directory, Telegram, walk-in, OLX and other. Schools can add their own sources.",
        },
        {
          question: "How does an inquiry become a student?",
          answer:
            "The owner, a manager or admissions staff converts the inquiry into a student. Group, payments and attendance then continue on the student record.",
        },
        {
          question: "Are SMS messages sent?",
          answer:
            "No, SMS is not sent. Each inquiry gets a next-contact time, and overdue ones show up in the metrics. An owner who has linked Telegram is notified of every new inquiry; a manager is notified of inquiries for their branch.",
        },
        {
          question: "Can we name our own stages?",
          answer:
            "Yes. The owner or a manager sets stage names, colours and order. Each stage is of type in progress, enrolled or lost. When an inquiry is lost, a reason is recorded: too expensive, chose another school, inconvenient time, changed their mind, no answer or other.",
        },
        {
          question: "Are duplicate inquiries caught?",
          answer:
            "Each inquiry keeps a history of calls, messages, meetings, tasks and notes. When a new inquiry is added, duplicates are checked by phone number.",
        },
        {
          question: "Which metrics are there?",
          answer:
            "The metrics view shows inquiries per stage, overdue next steps, inquiries untouched for 3 days, conversion to enrollment and lost reasons. The list can be exported to Excel.",
        },
      ],
      related: ["payments", "telegram", "branches"],
      relatedLabel: "Other features",
      cta: {
        title: "See enrollment in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
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
            "“Demoni ochish” namuna ma’lumotlari bilan ishlaydigan demoni ochadi. Haqiqiy mijoz ma’lumotlari talab qilinmaydi. Demo va maktabingiz ma’lumotlari bilan sinov alohida. 14 kunlik sinov muddati, narxi va cheklovlari boshlashdan oldin yozma kelishiladi.",
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
            "Кнопка «Открыть демо» открывает систему с вымышленными данными и не требует данных реальных клиентов. Демо и пробный период с данными вашей школы различаются. Срок 14-дневного пробного периода, стоимость и ограничения согласуются письменно до начала.",
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
            "“Open demo” starts a session with sample data and does not require real customer data. The sample demo and a trial with your school’s data are separate. Agree on the 14-day trial duration, pricing and limits in writing before starting.",
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
            "Mashg‘ulot rejalashtiriladi, instruktor uni haqiqiy daqiqalar bilan yuboradi, menejer tasdiqlaydi yoki rad etadi.",
        },
        {
          title: "O‘tilgan va qolgan daqiqalar",
          body:
            "O‘qish rejasida kerakli daqiqalar belgilanadi, masalan 1200. Tasdiqlangan daqiqalar qo‘shiladi, qolgani hisoblanadi.",
        },
        {
          title: "Instruktor va mashina",
          body:
            "Mashg‘ulotga instruktor va mashina biriktiriladi. Mashina kartasida undagi mashg‘ulotlar ro‘yxati ko‘rinadi.",
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
          answer:
            "Instruktor mashg‘ulotni yuboradi, menejer uni tasdiqlaydi yoki rad etadi.",
        },
        {
          question: "Masofa (km) yoziladimi?",
          answer:
            "Yo‘q. Mashg‘ulot bo‘yicha masofa yozilmaydi. Mashinaning odometri avtopark bo‘limida yuritiladi.",
        },
        {
          question: "Mashg‘ulotni bekor qilsa yoki tuzatsa bo‘ladimi?",
          answer:
            "Ha. Kerak bo‘lsa, mashg‘ulot bekor qilinadi yoki menejer daqiqalarni tuzatadi. Har bir o‘zgarish mashg‘ulot tarixida qoladi.",
        },
      ],
      related: ["schedule", "fleet", "attendance"],
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
            "Занятие планируется, инструктор отправляет его с фактическими минутами, менеджер подтверждает или отклоняет.",
        },
        {
          title: "Пройденные и оставшиеся минуты",
          body:
            "В плане обучения задаётся нужное число минут, например 1200. Подтверждённые минуты добавляются, остаток считается.",
        },
        {
          title: "Инструктор и машина",
          body:
            "К занятию привязываются инструктор и машина. В карточке машины виден список занятий на ней.",
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
          answer:
            "Инструктор отправляет занятие, менеджер подтверждает или отклоняет его.",
        },
        {
          question: "Записывается ли пробег (км)?",
          answer:
            "Нет. Пробег по занятию не записывается. Одометр машины ведётся в разделе автопарка.",
        },
        {
          question: "Можно ли отменить или исправить занятие?",
          answer:
            "Да. При необходимости занятие отменяют или менеджер исправляет минуты. Каждое изменение остаётся в истории занятия.",
        },
      ],
      related: ["schedule", "fleet", "attendance"],
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
        "automaktab.uz records each driving lesson with student, vehicle, instructor and time; only approved minutes count toward the training plan.",
      intro:
        "See who drove when, in which vehicle and with which instructor, without a paper log. Completed and remaining minutes sit on the student's training plan.",
      visual: "driving-card",
      sections: [
        {
          title: "Lesson statuses",
          body:
            "A lesson is planned, the instructor submits it with the actual minutes, and a manager approves or rejects it.",
        },
        {
          title: "Completed and remaining minutes",
          body:
            "The training plan sets the required minutes, for example 1200. Approved minutes are added and the remainder is calculated.",
        },
        {
          title: "Instructor and vehicle",
          body:
            "Each lesson gets an instructor and a vehicle. The vehicle record lists the lessons driven in it.",
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
          answer:
            "The instructor submits the lesson; a manager approves or rejects it.",
        },
        {
          question: "Is distance (km) recorded?",
          answer:
            "No. Distance is not recorded per lesson. The vehicle odometer is kept in the fleet section.",
        },
        {
          question: "Can a lesson be cancelled or corrected?",
          answer:
            "Yes. If needed, the lesson is cancelled or a manager corrects the minutes. Every change stays in the lesson history.",
        },
      ],
      related: ["schedule", "fleet", "attendance"],
      relatedLabel: "Other features",
      cta: {
        title: "See driving lesson tracking in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  telegram: {
    uz: {
      segments: ["features", "telegram-report"],
      title: "Avtomaktab hisoboti Telegram’da har kuni 08:00 da | automaktab.uz",
      description:
        "Har kuni 08:00 da kechagi tushum va yangi o‘quvchilar soni Telegram’ga keladi: rahbarga maktab bo‘yicha, menejerga o‘z filiali bo‘yicha.",
      keywords: ["avtomaktab hisobot", "avtomaktab telegram bot", "avtomaktab CRM"],
      eyebrow: "Telegram hisoboti",
      heading: "Har kuni 08:00 da Telegram’da avtomaktab hisoboti",
      definition:
        "Hisobot yoqilgan bo‘lsa, automaktab.uz har kuni 08:00 da (Toshkent) kechagi tushum va yangi o‘quvchilar sonini Telegram’ga yuboradi.",
      intro:
        "Kecha qancha tushum bo‘lgani va nechta yangi o‘quvchi qo‘shilganini ertalab Telegram’da ko‘ring. Buning uchun tizimga kirish shart emas.",
      visual: "morning-report",
      sections: [
        {
          title: "Kim oladi",
          body:
            "Hisobotni yoqqan rahbar maktab bo‘yicha, menejer o‘z filiali bo‘yicha raqamlarni oladi. Qabul xodimi va o‘qituvchiga yuborilmaydi.",
        },
        {
          title: "Qanday yoqiladi",
          body:
            "Profil sahifasida Telegram’ni ulang, bot ulanishni tasdiqlaydi. Shu sahifada kunlik hisobotni yoqing yoki o‘chiring.",
        },
        {
          title: "Yangi murojaatlar",
          body:
            "Yangi murojaat qo‘shilganda rahbar va shu filial menejeri Telegram’da xabar oladi.",
        },
      ],
      faq: [
        {
          question: "Hisobotda nima bo‘ladi?",
          answer:
            "Kechagi tushum va kecha qo‘shilgan yangi o‘quvchilar soni.",
        },
        {
          question: "Filiallar bo‘yicha alohida keladimi?",
          answer:
            "Hozir rahbarga maktab bo‘yicha jami, menejerga o‘z filiali keladi. Filiallarni taqqoslash rahbar panelida.",
        },
        {
          question: "Qanday yoqiladi?",
          answer:
            "Profil sahifasida Telegram’ni ulang va kunlik hisobotni yoqing. Bu sozlama rahbar va menejerga ochiq.",
        },
        {
          question: "Xodim o‘chirilsa ham hisobot boradimi?",
          answer:
            "Yo‘q. Yuborishdan oldin xodimning holati va ruxsatlari qayta tekshiriladi. O‘chirilgan yoki faol bo‘lmagan xodimga, faoliyati to‘xtatilgan maktabga hisobot bormaydi.",
        },
        {
          question: "Xarajatlar haqida ham xabar keladimi?",
          answer:
            "Ha. Yangi xarajat yaratilganda va xarajat birinchi marta qisman to‘langanda xabar keladi. Ish kunlari 09:00 da kutilayotgan, yaqin kunlarda muddati keladigan va kechikkan xarajatlar soni, dushanba 10:00 da esa haftalik kechikkan xarajatlar xulosasi keladi.",
        },
        {
          question: "Botda yana nima bor?",
          answer:
            "Botda har bir xodim o‘z ruxsatiga mos menyuni ko‘radi: hisobot, filiallar, o‘quvchilar, to‘lovlar, guruhlar, jadval va davomat, xodimlar, audit jurnali. O‘qituvchi o‘z hisobotini va o‘quvchilarining davomat tarixini ochadi.",
        },
      ],
      related: ["branches", "expenses", "leads"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Telegram hisobotini demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "telegram-report"],
      title: "Отчёт автошколы в Telegram каждый день в 08:00 | automaktab.uz",
      description:
        "Каждый день в 08:00 вчерашние поступления и число новых курсантов приходят в Telegram: руководителю по всей автошколе, менеджеру по его филиалу.",
      keywords: ["отчёты автошколы", "телеграм бот автошколы", "CRM автошколы"],
      eyebrow: "Отчёт в Telegram",
      heading: "Отчёт автошколы в Telegram каждый день в 08:00",
      definition:
        "Если отчёт включён, automaktab.uz каждый день в 08:00 (Ташкент) отправляет в Telegram вчерашние поступления и число новых курсантов.",
      intro:
        "Смотрите утром в Telegram, сколько поступило вчера и сколько новых курсантов добавилось. Входить в систему для этого не нужно.",
      visual: "morning-report",
      sections: [
        {
          title: "Кто получает",
          body:
            "Включивший отчёт руководитель получает итоги по автошколе, а менеджер по своему филиалу. Приёмной и преподавателям не отправляется.",
        },
        {
          title: "Как включить",
          body:
            "Подключите Telegram в профиле, бот подтвердит подключение. Там же включите или выключите ежедневный отчёт.",
        },
        {
          title: "Новые заявки",
          body:
            "При новой заявке руководитель и менеджер этого филиала получают уведомление в Telegram.",
        },
      ],
      faq: [
        {
          question: "Что будет в отчёте?",
          answer:
            "Вчерашние поступления и число курсантов, добавленных вчера.",
        },
        {
          question: "Приходит ли отчёт по каждому филиалу отдельно?",
          answer:
            "Сейчас руководитель получает итог по автошколе, менеджер по своему филиалу. Сравнение филиалов есть на панели руководителя.",
        },
        {
          question: "Как включить отчёт?",
          answer:
            "Подключите Telegram в профиле и включите ежедневный отчёт. Настройка доступна руководителю и менеджеру.",
        },
        {
          question: "Получит ли отчёт удалённый сотрудник?",
          answer:
            "Нет. Перед отправкой статус и права сотрудника проверяются заново. Удалённым и неактивным сотрудникам, а также приостановленным автошколам отчёт не уходит.",
        },
        {
          question: "Приходят ли уведомления о расходах?",
          answer:
            "Да. Уведомление приходит при создании расхода и при первой частичной оплате. По будним дням в 09:00 приходит число ожидающих, скоро наступающих и просроченных расходов, а по понедельникам в 10:00 недельная сводка просроченных расходов.",
        },
        {
          question: "Что ещё есть в боте?",
          answer:
            "В боте каждый сотрудник видит меню по своим правам: отчёт, филиалы, курсанты, оплаты, группы, расписание и посещаемость, сотрудники, журнал аудита. Преподаватель открывает свой отчёт и историю посещаемости своих курсантов.",
        },
      ],
      related: ["branches", "expenses", "leads"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите отчёт в Telegram в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "telegram-report"],
      title: "Driving-school report in Telegram every day at 08:00 | automaktab.uz",
      description:
        "Every day at 08:00, yesterday’s revenue and new-student count arrive in Telegram: school-wide for the owner, branch-level for a manager.",
      keywords: ["driving school reports", "driving school telegram bot", "driving school CRM"],
      eyebrow: "Telegram report",
      heading: "A driving-school report in Telegram every day at 08:00",
      definition:
        "When the report is on, automaktab.uz sends yesterday’s revenue and new-student count to Telegram every day at 08:00 (Tashkent).",
      intro:
        "See yesterday’s revenue and how many new students joined in Telegram each morning, without signing in.",
      visual: "morning-report",
      sections: [
        {
          title: "Who gets it",
          body:
            "An owner who turns it on gets school-wide totals; a manager gets their branch. Admissions staff and teachers do not receive it.",
        },
        {
          title: "How to turn it on",
          body:
            "Link Telegram on your profile page and the bot confirms it. Turn the daily report on or off on the same page.",
        },
        {
          title: "New inquiries",
          body:
            "When a new inquiry is added, the owner and that branch’s manager are notified in Telegram.",
        },
      ],
      faq: [
        {
          question: "What is in the report?",
          answer:
            "Yesterday’s revenue and the number of students added yesterday.",
        },
        {
          question: "Does each branch get a separate report?",
          answer:
            "Today the owner gets school-wide totals and a manager gets their own branch. Branch comparison is on the owner dashboard.",
        },
        {
          question: "How do I turn it on?",
          answer:
            "Link Telegram on your profile and turn on the daily report. The setting is available to owners and managers.",
        },
        {
          question: "Does a removed employee still get the report?",
          answer:
            "No. Before sending, the employee’s status and permissions are checked again. Deleted or inactive staff and suspended schools do not receive the report.",
        },
        {
          question: "Are there expense alerts too?",
          answer:
            "Yes. An alert arrives when an expense is created and when it is first partly paid. On weekdays at 09:00 you get counts of pending, soon-due and overdue expenses; on Mondays at 10:00, a weekly overdue-expense digest.",
        },
        {
          question: "What else is in the bot?",
          answer:
            "In the bot, each employee sees a menu that matches their permissions: report, branches, students, payments, groups, schedule and attendance, staff, audit log. Teachers open their own report and their students’ attendance history.",
        },
      ],
      related: ["branches", "expenses", "leads"],
      relatedLabel: "Other features",
      cta: {
        title: "See the Telegram report in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  fleet: {
    uz: {
      segments: ["features", "fleet"],
      title: "Avtomaktab avtoparki hisobi: hujjatlar va yoqilg‘i | automaktab.uz",
      description:
        "Har bir o‘quv mashinasining hujjat muddatlari, texnik xizmati, qabul-topshirish dalolatnomalari va yoqilg‘i cheklari bir kartada.",
      keywords: ["avtomaktab mashinalar hisobi", "avtomaktab yoqilg‘i hisobi", "avtomaktab CRM"],
      eyebrow: "Avtopark",
      heading: "Avtomaktab avtoparki: hujjatlar, texnik xizmat va yoqilg‘i",
      definition:
        "automaktab.uz har bir o‘quv mashinasining holati, hujjat muddatlari, texnik xizmati va yoqilg‘i qaydlarini bir kartada saqlaydi.",
      intro:
        "Mashina raqami, toifasi, odometri va holati kartada turadi. Hujjati muddati o‘tgan yoki texnik xizmati kechikkan mashina haydash mashg‘ulotiga biriktirilmaydi.",
      visual: "scene:fleet",
      sections: [
        {
          title: "Hujjatlar",
          body:
            "Ro‘yxatdan o‘tkazish guvohnomasi, sug‘urta va texnik ko‘rik hujjatlari amal qilish muddati bilan mashina kartasida saqlanadi.",
        },
        {
          title: "Qaysi mashina darsga chiqadi",
          body:
            "Hujjati muddati o‘tgan, ochiq ta’miri yoki kechikkan texnik xizmati bor mashina mashg‘ulotga biriktirilmaydi.",
        },
        {
          title: "Texnik xizmat va nuqsonlar",
          body:
            "Ta’mir sanalari bilan yoziladi, keyingi xizmat sana yoki odometr bo‘yicha belgilanadi. Nuqson rasm bilan yoziladi va bartaraf etilguncha ochiq turadi.",
        },
      ],
      faq: [
        {
          question: "Sug‘urta va texko‘rik muddati qayerda ko‘rinadi?",
          answer:
            "Mashina kartasidagi hujjatlar bo‘limida. Muddati o‘tgan mashina haydash mashg‘ulotiga biriktirilmaydi.",
        },
        {
          question: "Yoqilg‘i qanday tekshiriladi?",
          answer:
            "Chek va odometr rasmi majburiy. Chekdagi QR kod orqali fiskal chek ma’lumoti olinadi va zapravka STIR hamda summa bilan solishtiriladi. Summa tasdiqlangan chekdan oshmaydi; QR bo‘lmasa, qayd qo‘lda tekshiriladi.",
        },
        {
          question: "Mashinani boshqa filialga o‘tkazsa bo‘ladimi?",
          answer:
            "Ha, rahbar o‘tkazadi. Sabab yoziladi, tarixda kim va qachon o‘tkazgani saqlanadi. Har bir mashinaga mas’ul xodim biriktiriladi.",
        },
        {
          question: "Mashina yoshi va toifasi tekshiriladimi?",
          answer:
            "Ha. Mashina faol bo‘lishi va toifasi mos kelishi kerak. B toifa uchun 10 yildan, boshqa toifalar uchun 20 yildan eski mashina biriktirilmaydi.",
        },
        {
          question: "Mashina topshirilganda nima yoziladi?",
          answer:
            "Mashina topshirilganda odometr ko‘rsatkichi va beshta rasm bilan dalolatnoma tuziladi: old, orqa, ikki yon va odometr. Qabul qiluvchi xodim tasdiqlaydi, rahbar yoki menejer sababini yozib rad etishi mumkin.",
        },
      ],
      related: ["driving", "expenses", "branches"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Avtoparkni demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "fleet"],
      title: "Учёт автомобилей автошколы: документы и топливо | automaktab.uz",
      description:
        "Сроки документов, техобслуживание, акты приёма-передачи и топливные чеки каждой учебной машины в одной карточке.",
      keywords: ["учет автомобилей автошколы", "учет топлива автошколы", "CRM автошколы"],
      eyebrow: "Автопарк",
      heading: "Автопарк автошколы: документы, техобслуживание и топливо",
      definition:
        "automaktab.uz хранит в одной карточке состояние каждой учебной машины, сроки документов, техобслуживание и записи о топливе.",
      intro:
        "Номер, категория, пробег и статус машины видны в карточке. Машину с просроченным документом или техобслуживанием нельзя назначить на занятие вождения.",
      visual: "scene:fleet",
      sections: [
        {
          title: "Документы",
          body:
            "Свидетельство о регистрации, страховка и техосмотр хранятся в карточке машины вместе со сроком действия.",
        },
        {
          title: "Какая машина может выйти на занятие",
          body:
            "Машину с истёкшим документом, открытым ремонтом или просроченным техобслуживанием нельзя назначить на занятие.",
        },
        {
          title: "Техобслуживание и неисправности",
          body:
            "Ремонт записывается с датами, следующее обслуживание назначается по дате или пробегу. Неисправность с фото остаётся открытой до устранения.",
        },
      ],
      faq: [
        {
          question: "Где видны сроки страховки и техосмотра?",
          answer:
            "В разделе документов в карточке машины. Машину с истёкшим сроком нельзя назначить на занятие вождения.",
        },
        {
          question: "Как проверяется топливо?",
          answer:
            "Фото чека и одометра обязательны. По QR-коду загружаются данные фискального чека и сверяются с ИНН АЗС и суммой. Сумма не может превышать подтверждённый чек; без QR-кода запись проверяется вручную.",
        },
        {
          question: "Можно ли перевести машину в другой филиал?",
          answer:
            "Да, это делает руководитель. Указывается причина, в истории сохраняется, кто и когда перевёл. За каждой машиной закрепляется ответственный сотрудник.",
        },
        {
          question: "Проверяются ли возраст и категория машины?",
          answer:
            "Да. Машина должна быть активной, а категория подходящей. Для категории B не назначается машина старше 10 лет, для других категорий старше 20 лет.",
        },
        {
          question: "Что фиксируется при передаче машины?",
          answer:
            "При передаче машины составляется акт с пробегом и пятью фото: спереди, сзади, с двух сторон и одометр. Принимающий сотрудник подтверждает акт, руководитель или менеджер может отклонить его с указанием причины.",
        },
      ],
      related: ["driving", "expenses", "branches"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите автопарк в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "fleet"],
      title: "Driving-school fleet tracking: documents and fuel | automaktab.uz",
      description:
        "Document expiry dates, maintenance, handover records and fuel receipts for every training car, kept on one vehicle record.",
      keywords: ["driving school fleet management", "driving school fuel tracking", "driving school CRM"],
      eyebrow: "Fleet",
      heading: "Driving-school fleet: documents, maintenance and fuel",
      definition:
        "automaktab.uz keeps each training car’s status, document expiry dates, maintenance and fuel records on one vehicle record.",
      intro:
        "Plate, category, odometer and status sit on the vehicle record. A car with an expired document or overdue service cannot be assigned to a driving lesson.",
      visual: "scene:fleet",
      sections: [
        {
          title: "Documents",
          body:
            "Registration certificate, insurance and technical inspection are stored on the vehicle record with their expiry dates.",
        },
        {
          title: "Which car can go out",
          body:
            "A car with an expired document, an open repair or overdue service cannot be assigned to a lesson.",
        },
        {
          title: "Maintenance and defects",
          body:
            "Repairs are logged with dates; the next service is set by date or odometer. A defect with a photo stays open until resolved.",
        },
      ],
      faq: [
        {
          question: "Where can I see insurance and inspection expiry dates?",
          answer:
            "In the documents section of the vehicle record. A car with an expired document cannot be assigned to a driving lesson.",
        },
        {
          question: "How is fuel checked?",
          answer:
            "Receipt and odometer photos are required. The receipt’s QR code is used to fetch the fiscal receipt, which is matched against the station’s TIN and the amount. The amount cannot exceed the verified receipt; without a QR code, the entry is reviewed manually.",
        },
        {
          question: "Can a car be moved to another branch?",
          answer:
            "Yes, by the owner. A reason is recorded, and the history keeps who moved it and when. Each car has a responsible employee.",
        },
        {
          question: "Are vehicle age and category checked?",
          answer:
            "Yes. The car must be active and match the category. Category B cars older than 10 years, and other categories older than 20 years, are not assigned.",
        },
        {
          question: "What is recorded at handover?",
          answer:
            "When a car changes hands, a handover record is made with the odometer reading and five photos: front, back, both sides and odometer. The receiving employee confirms it; the owner or a manager can reject it with a reason.",
        },
      ],
      related: ["driving", "expenses", "branches"],
      relatedLabel: "Other features",
      cta: {
        title: "See the fleet in the demo.",
        body: "The demo uses sample data, not real customer records.",
        label: "Open demo",
      },
      updatedAt: "2026-10-16",
    },
  },
  expenses: {
    uz: {
      segments: ["features", "expenses"],
      title: "Avtomaktab xarajatlari hisobi CRM’da | automaktab.uz",
      description:
        "Xarajatlarni toifa bo‘yicha yozing: har birida to‘langan va to‘lanmagan qism, muddat va o‘zgarishlar tarixi alohida ko‘rinadi.",
      keywords: ["avtomaktab xarajatlari", "xarajatlar hisobi", "avtomaktab CRM"],
      eyebrow: "Xarajatlar",
      heading: "Avtomaktab xarajatlari hisobi",
      definition:
        "automaktab.uz xarajatlarni toifa bo‘yicha yozadi va har birida to‘langan hamda to‘lanmagan qismni alohida ko‘rsatadi.",
      intro:
        "Ijara, kommunal to‘lov, mashina yoki o‘qituvchi bilan hisob-kitob: har bir xarajat summa, sana, muddat va oluvchi bilan yoziladi.",
      visual: "scene:accountant",
      sections: [
        {
          title: "To‘langan va to‘lanmagan qism",
          body:
            "Xarajat bir necha to‘lov bilan yopiladi: rejalashtirilgan, qisman to‘langan, to‘langan yoki bekor qilingan. To‘lovni rahbar yoki buxgalter kiritadi.",
        },
        {
          title: "Muddat nazorati",
          body:
            "Har bir xarajatga muddat qo‘yiladi. Sahifada 3 kun ichida muddati keladigan va 1–7, 8–30, 31+ kun kechikkan xarajatlar soni ko‘rinadi.",
        },
        {
          title: "Yoqilg‘i avtomatik xarajat bo‘ladi",
          body:
            "Avtoparkda tasdiqlangan yoqilg‘i qaydi shu mashinaga bog‘langan xarajat sifatida yoziladi, shuning uchun yoqilg‘ini qayta kiritish shart emas.",
        },
      ],
      faq: [
        {
          question: "Qanday toifalar bor?",
          answer:
            "Ijara, kommunal, mashina, marketing, sarf materiallari, ma’muriy, o‘qituvchi bilan hisob-kitob va boshqa. Xarajat filialga yoki avtoparkdagi mashinaga bog‘lanishi mumkin.",
        },
        {
          question: "Qisman to‘langan xarajat qanday ko‘rinadi?",
          answer:
            "Holati qisman to‘langan bo‘ladi, to‘langan summa va qolgan qism alohida ko‘rinadi.",
        },
        {
          question: "Xarajat haqida xabar keladimi?",
          answer:
            "Ha, Telegram’ni ulagan va xarajatlarni ko‘rish ruxsati bor xodimlarga. Kunlik xulosa rahbar, buxgalter va filial menejeriga keladi. Ish kunlari 09:00 da kunlik, dushanba 10:00 da haftalik xulosa keladi.",
        },
        {
          question: "Xarajat o‘zgarishlari saqlanadimi?",
          answer:
            "Ha. Yaratish, tahrirlash, to‘lov, to‘lovni bekor qilish, bekor qilish va o‘chirish tarixda qoladi. Bekor qilish va o‘chirishda sabab yoziladi. Rahbar xarajatlarni ko‘rib chiqilgan deb belgilaydi.",
        },
        {
          question: "Oy yakunida xarajatlarni yuklab olsa bo‘ladimi?",
          answer:
            "Ha. Rahbar va buxgalter oy bo‘yicha xarajatlarni CSV faylga yuklab oladi. O‘qituvchi bilan hisob-kitobni o‘qituvchining o‘zi ham ko‘radi.",
        },
        {
          question: "Xarajatni kim qo‘shadi?",
          answer:
            "Xarajatni rahbar, buxgalter yoki menejer qo‘shadi va ko‘radi. To‘lovni faqat rahbar yoki buxgalter kiritadi.",
        },
      ],
      related: ["telegram", "branches", "fleet"],
      relatedLabel: "Boshqa imkoniyatlar",
      cta: {
        title: "Xarajatlar hisobini demoda ko‘ring.",
        body: "Demo namuna ma’lumotlari bilan ishlaydi. Haqiqiy mijoz ma’lumotlari ishlatilmaydi.",
        label: "Demoni ochish",
      },
      updatedAt: "2026-10-16",
    },
    ru: {
      segments: ["features", "expenses"],
      title: "Учёт расходов автошколы в CRM | automaktab.uz",
      description:
        "Записывайте расходы по категориям: оплаченная и неоплаченная часть, срок и история изменений видны отдельно по каждому расходу.",
      keywords: ["учет расходов автошколы", "расходы автошколы", "CRM автошколы"],
      eyebrow: "Расходы",
      heading: "Учёт расходов автошколы",
      definition:
        "automaktab.uz записывает расходы по категориям и по каждому отдельно показывает оплаченную и неоплаченную часть.",
      intro:
        "Аренда, коммунальные платежи, машина или расчёт с преподавателем: каждый расход записывается с суммой, датой, сроком и получателем.",
      visual: "scene:accountant",
      sections: [
        {
          title: "Оплаченная и неоплаченная часть",
          body:
            "Расход закрывается несколькими платежами: запланирован, частично оплачен, оплачен или отменён. Платёж вносит руководитель или бухгалтер.",
        },
        {
          title: "Контроль сроков",
          body:
            "У каждого расхода есть срок. На странице видно, сколько расходов к оплате в ближайшие 3 дня и сколько просрочено на 1–7, 8–30 и 31+ дней.",
        },
        {
          title: "Топливо сразу становится расходом",
          body:
            "Подтверждённая заправка в автопарке записывается как расход, привязанный к этой машине, поэтому вносить топливо повторно не нужно.",
        },
      ],
      faq: [
        {
          question: "Какие есть категории?",
          answer:
            "Аренда, коммунальные, машина, маркетинг, расходные материалы, административные, расчёт с преподавателем и другое. Расход можно привязать к филиалу или к машине из автопарка.",
        },
        {
          question: "Как выглядит частично оплаченный расход?",
          answer:
            "Статус частично оплачен, оплаченная сумма и остаток видны отдельно.",
        },
        {
          question: "Приходят ли уведомления о расходах?",
          answer:
            "Да, сотрудникам с подключённым Telegram и правом видеть расходы. Ежедневная сводка приходит руководителю, бухгалтеру и менеджеру филиала. По будням в 09:00 приходит ежедневная сводка, по понедельникам в 10:00 недельная.",
        },
        {
          question: "Сохраняется ли история изменений?",
          answer:
            "Да. Создание, правка, платёж, аннулирование платежа, отмена и удаление сохраняются в истории. При отмене и удалении указывается причина. Руководитель отмечает расходы как проверенные.",
        },
        {
          question: "Можно ли выгрузить расходы за месяц?",
          answer:
            "Да. Руководитель и бухгалтер выгружают расходы за месяц в CSV. Расчёт с преподавателем видит и сам преподаватель.",
        },
        {
          question: "Кто добавляет расходы?",
          answer:
            "Расходы добавляют и видят руководитель, бухгалтер и менеджер. Платежи вносят только руководитель или бухгалтер.",
        },
      ],
      related: ["telegram", "branches", "fleet"],
      relatedLabel: "Другие возможности",
      cta: {
        title: "Посмотрите учёт расходов в демо.",
        body: "Демо использует вымышленные данные. Данные реальных клиентов не используются.",
        label: "Открыть демо",
      },
      updatedAt: "2026-10-16",
    },
    en: {
      segments: ["features", "expenses"],
      title: "Driving-school expense tracking CRM | automaktab.uz",
      description:
        "Record expenses by category: the paid and unpaid parts, due date and change history of each expense are shown separately.",
      keywords: ["driving school expenses", "expense tracking", "driving school CRM"],
      eyebrow: "Expenses",
      heading: "Driving-school expense tracking",
      definition:
        "automaktab.uz records expenses by category and shows the paid and unpaid parts of each one separately.",
      intro:
        "Rent, utilities, a car or a teacher settlement: every expense is recorded with its amount, date, due date and payee.",
      visual: "scene:accountant",
      sections: [
        {
          title: "Paid and unpaid parts",
          body:
            "An expense can be settled in several payments: planned, partially paid, paid or cancelled. The owner or an accountant records payments.",
        },
        {
          title: "Due-date control",
          body:
            "Each expense gets a due date. The page counts those due within 3 days and those overdue by 1–7, 8–30 or 31+ days.",
        },
        {
          title: "Fuel becomes an expense automatically",
          body:
            "An approved fuel entry in the fleet is recorded as an expense linked to that car, so fuel never has to be entered twice.",
        },
      ],
      faq: [
        {
          question: "Which categories are there?",
          answer:
            "Rent, utilities, vehicle, marketing, supplies, administrative, teacher settlement and other. An expense can be linked to a branch or to a car in the fleet.",
        },
        {
          question: "How does a partly paid expense look?",
          answer:
            "Its status is partially paid, and the paid amount and remaining balance are shown separately.",
        },
        {
          question: "Do I get expense notifications?",
          answer:
            "Yes, if you have linked Telegram and can view expenses. The daily digest goes to the owner, accountants and branch managers. A daily digest arrives on weekdays at 09:00 and a weekly one on Mondays at 10:00.",
        },
        {
          question: "Is the change history kept?",
          answer:
            "Yes. Creation, edits, payments, voided payments, cancellation and deletion stay in the history. Cancelling or deleting requires a reason. The owner marks expenses as reviewed.",
        },
        {
          question: "Can I export a month’s expenses?",
          answer:
            "Yes. The owner and accountants download a month’s expenses as CSV. Teachers can see their own settlements.",
        },
        {
          question: "Who adds expenses?",
          answer:
            "The owner, accountants and managers add and view expenses. Only the owner or an accountant records payments.",
        },
      ],
      related: ["telegram", "branches", "fleet"],
      relatedLabel: "Other features",
      cta: {
        title: "See expense tracking in the demo.",
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
