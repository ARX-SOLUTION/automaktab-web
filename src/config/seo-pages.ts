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
      title: "Avtomaktab: To‘lovlar va qarzdorlik | automaktab.uz",
      description:
        "Avtomaktab to‘lovlari talaba kartasiga bog‘lanadi, qarzdorlar esa alohida ko‘rinishda nazorat qilinadi.",
      keywords: [
        "avtomaktab to‘lovlari",
        "qarzdorlik nazorati",
        "avtomaktab CRM",
      ],
      eyebrow: "To‘lovlar nazorati",
      heading: "Avtomaktab to‘lovlari va qarzdorligini boshqaring.",
      intro:
        "To‘lovlar tarqoq fayllarda emas, talabaning o‘z kartasida ko‘rinadi. Qarzdorlar alohida ko‘rinishda qoladi — rahbar bugungi holatni tez tekshiradi.",
      sections: [
        {
          title: "Har bir to‘lov talaba kartasiga bog‘lanadi",
          body:
            "To‘lovni talaba bilan bir joyda kuzatish jamoaga kimning holati yangilangani va qaysi yozuvlar tekshirilishi kerakligini tushunishga yordam beradi.",
        },
        {
          title: "Qarzdorlar alohida ko‘rinishda",
          body:
            "Qarzdorlik umumiy ro‘yxatda yo‘qolib ketmaydi. Menejer va rahbar alohida ko‘rinishdan keyingi suhbat yoki tekshiruv uchun kerakli ma’lumotni oladi.",
        },
        {
          title: "Demo ichida ish oqimini ko‘ring",
          body:
            "Sintetik demo ma’lumotlari bilan to‘lovlar va rahbar paneli qanday ishlashini hech qanday kontakt qoldirmasdan sinab ko‘rishingiz mumkin.",
        },
      ],
      relatedLabel: "Boshqa boshqaruv imkoniyatlari",
      cta: {
        title: "To‘lovlar oqimini demo ichida ko‘ring.",
        body: "Sintetik akkaunt darhol ochiladi va haqiqiy mijoz ma’lumotlaridan foydalanmaydi.",
        label: "Demo’ni oching",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["features", "payments-and-debt"],
      title: "Оплаты и задолженность автошколы | automaktab.uz",
      description:
        "Оплаты автошколы привязаны к карточке ученика, а задолженность контролируется в отдельном представлении.",
      keywords: ["оплаты автошколы", "задолженность автошколы", "CRM автошколы"],
      eyebrow: "Контроль оплат",
      heading: "Управляйте оплатами и задолженностью автошколы.",
      intro:
        "Оплаты видны в карточке ученика, а не в разрозненных файлах. Отдельный список задолженности помогает руководителю быстрее проверять текущую ситуацию.",
      sections: [
        {
          title: "Оплата связана с карточкой ученика",
          body:
            "Когда оплата находится рядом с данными ученика, команде проще понимать, какой статус изменился и какие записи требуют проверки.",
        },
        {
          title: "Задолженность видна отдельно",
          body:
            "Долги не теряются в общем списке. Менеджер и руководитель видят отдельное представление для следующего контакта или проверки.",
        },
        {
          title: "Проверьте процесс в демо",
          body:
            "Откройте синтетическое демо без передачи контактов и посмотрите, как связаны оплаты и панель руководителя.",
        },
      ],
      relatedLabel: "Другие возможности управления",
      cta: {
        title: "Посмотрите процесс оплат в демо.",
        body: "Синтетическая учётная запись открывается сразу и не использует данные реальных клиентов.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["features", "payments-and-debt"],
      title: "Driving-school payments and debt | automaktab.uz",
      description:
        "Keep driving-school payments on each student record and review outstanding debt in a separate, clear view.",
      keywords: ["driving school payments", "driving school debt", "driving school CRM"],
      eyebrow: "Payment control",
      heading: "Manage driving-school payments and debt.",
      intro:
        "Payments sit on the student record instead of scattered files. A separate debt view helps an owner check today’s situation quickly.",
      sections: [
        {
          title: "Keep each payment with the student",
          body:
            "Putting the payment beside the student record helps the team see which status changed and which entries need attention.",
        },
        {
          title: "Review outstanding debt separately",
          body:
            "Debt does not disappear into a general list. Managers and owners have a separate view for a follow-up or review.",
        },
        {
          title: "See the workflow in the demo",
          body:
            "Open a synthetic demo without sharing contact details to see how payments and the owner dashboard work together.",
        },
      ],
      relatedLabel: "Other management capabilities",
      cta: {
        title: "See the payment workflow in the demo.",
        body: "The synthetic account opens immediately and does not use real customer data.",
        label: "Open the demo",
      },
      updatedAt: "2026-09-19",
    },
  },
  schedule: {
    uz: {
      segments: ["features", "schedules-and-groups"],
      title: "Avtomaktab: Dars jadvali va guruhlar | automaktab.uz",
      description:
        "Nazariya va amaliy darslarni guruh hamda o‘qituvchi bilan haftalik jadvalda rejalashtiring.",
      keywords: ["avtomaktab dars jadvali", "avtomaktab guruhlari", "nazariya va amaliy darslar"],
      eyebrow: "Jadval va guruhlar",
      heading: "Dars jadvali va guruhlar bir tizimda.",
      intro:
        "Nazariya va amaliy mashg‘ulotlar guruh, o‘qituvchi, vaqt va dars turi bilan bir haftalik ko‘rinishda rejalashtiriladi.",
      sections: [
        {
          title: "Haftalik ko‘rinish bir xil tartib beradi",
          body:
            "Jadvalda darslar haftalik ko‘rinishda turadi. Bu jamoaga kunlik ishni turli daftar va xabarlardan yig‘masdan ko‘rishga yordam beradi.",
        },
        {
          title: "Guruh va o‘qituvchi dars bilan bog‘langan",
          body:
            "Har bir mashg‘ulotni kerakli guruh va o‘qituvchi bilan rejalashtirish jadvaldagi o‘zgarishlarni bir joydan kuzatishga yordam beradi.",
        },
        {
          title: "Nazariya va amaliyot bir jarayonda",
          body:
            "Dars turi kalendarda ko‘rinadi, shuning uchun jamoa haftalik oqimda nazariya va amaliyotni ajratib ko‘ra oladi.",
        },
      ],
      relatedLabel: "Boshqa boshqaruv imkoniyatlari",
      cta: {
        title: "Jadvalni mahsulot ichida tekshiring.",
        body: "Sintetik demo ichida haftalik kalendar va asosiy ish oqimlarini ko‘ring.",
        label: "Demo’ni oching",
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
      heading: "Расписание занятий и группы — в одной системе.",
      intro:
        "Теоретические и практические занятия планируются в недельном представлении вместе с группой, преподавателем, временем и типом урока.",
      sections: [
        {
          title: "Недельное представление задаёт единый порядок",
          body:
            "Занятия видны по неделям. Команда видит ежедневную работу без необходимости собирать её из разных журналов и сообщений.",
        },
        {
          title: "Группа и преподаватель связаны с занятием",
          body:
            "Планирование занятия вместе с группой и преподавателем помогает отслеживать изменения расписания в одном месте.",
        },
        {
          title: "Теория и практика в одном процессе",
          body:
            "Тип занятия виден в календаре, поэтому команда различает теорию и практику в недельном потоке.",
        },
      ],
      relatedLabel: "Другие возможности управления",
      cta: {
        title: "Проверьте расписание внутри продукта.",
        body: "В синтетическом демо доступны недельный календарь и ключевые рабочие процессы.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["features", "schedules-and-groups"],
      title: "Driving-school schedules and groups | automaktab.uz",
      description:
        "Plan theory and practical driving-school lessons in a weekly schedule with the right group and teacher.",
      keywords: ["driving school schedule", "driving school groups", "theory and practical lessons"],
      eyebrow: "Schedules and groups",
      heading: "Schedule groups and lessons in one place.",
      intro:
        "Theory and practical lessons are planned in one weekly view with the group, teacher, time, and lesson type.",
      sections: [
        {
          title: "A weekly view creates shared order",
          body:
            "Lessons appear in a weekly view, helping the team see daily work without gathering it from separate notebooks and messages.",
        },
        {
          title: "Connect each lesson to a group and teacher",
          body:
            "Planning a lesson with its group and teacher makes schedule changes easier to review from one place.",
        },
        {
          title: "Keep theory and practice in one flow",
          body:
            "The lesson type is visible in the calendar, so the team can distinguish theory and practice throughout the week.",
        },
      ],
      relatedLabel: "Other management capabilities",
      cta: {
        title: "Review the schedule inside the product.",
        body: "The synthetic demo includes the weekly calendar and key workflows.",
        label: "Open the demo",
      },
      updatedAt: "2026-09-19",
    },
  },
  attendance: {
    uz: {
      segments: ["features", "digital-attendance"],
      title: "Avtomaktab: Raqamli davomat | automaktab.uz",
      description:
        "Har bir avtomaktab darsi uchun kelgan, kechikkan, kelmagan va uzrli davomat statuslarini belgilang.",
      keywords: ["avtomaktab davomat", "raqamli davomat", "davomat jurnali"],
      eyebrow: "Raqamli davomat",
      heading: "Raqamli davomat bilan dars holatini ko‘ring.",
      intro:
        "Har bir dars uchun tushunarli statuslar bir joyda saqlanadi. Jamoa bugungi holatni tez ko‘radi va keyingi ishini aniqroq rejalashtiradi.",
      sections: [
        {
          title: "Har bir dars uchun aniq status",
          body:
            "Keldi, kechikdi, kelmadi va uzrli statuslari dars ro‘yxati bilan bir joyda turadi. Bu belgilashni sodda va izchil qiladi.",
        },
        {
          title: "Davomat dars oqimining ichida",
          body:
            "Davomat alohida qog‘ozda qolmaydi. Jadval va guruhlar bilan bir tizimda turishi kundalik tekshiruvni osonlashtiradi.",
        },
        {
          title: "Bugungi holatni tez tekshiring",
          body:
            "Menejer yoki o‘qituvchi demo ichida dars ro‘yxati va statuslar qanday ko‘rinishini bevosita sinab ko‘rishi mumkin.",
        },
      ],
      relatedLabel: "Boshqa boshqaruv imkoniyatlari",
      cta: {
        title: "Davomat oqimini demo ichida ko‘ring.",
        body: "Sintetik ma’lumotlar bilan statuslarni belgilash jarayonini xavfsiz tekshiring.",
        label: "Demo’ni oching",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["features", "digital-attendance"],
      title: "Цифровая посещаемость автошколы | automaktab.uz",
      description:
        "Отмечайте для каждого урока автошколы понятные статусы: был, опоздал, отсутствовал или отсутствовал по уважительной причине.",
      keywords: ["посещаемость автошколы", "цифровая посещаемость", "журнал посещаемости"],
      eyebrow: "Цифровая посещаемость",
      heading: "Ведите цифровую посещаемость по каждому уроку.",
      intro:
        "Понятные статусы для каждого занятия хранятся в одном месте. Команда быстрее видит текущую ситуацию и точнее планирует следующие действия.",
      sections: [
        {
          title: "Понятный статус для каждого урока",
          body:
            "Статусы «был», «опоздал», «отсутствовал» и «уважительная причина» находятся рядом со списком занятия. Это делает отметку простой и последовательной.",
        },
        {
          title: "Посещаемость внутри учебного процесса",
          body:
            "Посещаемость не остаётся в отдельной бумажной форме. Она находится в одной системе с расписанием и группами, что упрощает ежедневную проверку.",
        },
        {
          title: "Быстро проверяйте сегодняшнюю ситуацию",
          body:
            "Менеджер или преподаватель может в демо увидеть, как выглядят список урока и статусы.",
        },
      ],
      relatedLabel: "Другие возможности управления",
      cta: {
        title: "Посмотрите поток посещаемости в демо.",
        body: "Безопасно проверьте отметку статусов на синтетических данных.",
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
      heading: "Track attendance for every lesson digitally.",
      intro:
        "Clear statuses for each lesson stay in one place. The team can check today’s situation faster and plan the next step more reliably.",
      sections: [
        {
          title: "Use a clear status for every lesson",
          body:
            "Present, late, absent, and excused statuses sit beside the lesson roster, keeping the marking process simple and consistent.",
        },
        {
          title: "Keep attendance in the learning workflow",
          body:
            "Attendance does not remain on a separate sheet. It lives with schedules and groups, making daily review easier.",
        },
        {
          title: "Check today’s situation quickly",
          body:
            "A manager or teacher can open the demo to see how lesson rosters and attendance statuses appear.",
        },
      ],
      relatedLabel: "Other management capabilities",
      cta: {
        title: "See attendance in the demo.",
        body: "Safely test status marking with synthetic data.",
        label: "Open the demo",
      },
      updatedAt: "2026-09-19",
    },
  },
  branches: {
    uz: {
      segments: ["features", "branch-management"],
      title: "Avtomaktab: Filiallar boshqaruvi | automaktab.uz",
      description:
        "Avtomaktab filiallari natijalarini owner dashboardda bir ko‘rinishda taqqoslang va nazorat qiling.",
      keywords: ["avtomaktab filiallari", "filiallar boshqaruvi", "owner dashboard"],
      eyebrow: "Filiallar boshqaruvi",
      heading: "Avtomaktab filiallarini bir ko‘rinishda boshqaring.",
      intro:
        "Bir nechta filiali bor maktab uchun umumiy holat bo‘linib ketmasligi kerak. Owner dashboard filiallar natijasini bir ko‘rinishda taqqoslashga yordam beradi.",
      sections: [
        {
          title: "Filiallar kesimida umumiy ko‘rinish",
          body:
            "Rahbar bitta boshqaruv maydonida filiallar bo‘yicha holatni ko‘radi. Bu umumiy natijani bo‘lak-bo‘lak fayllardan yig‘ish ehtiyojini kamaytiradi.",
        },
        {
          title: "Taqqoslash uchun bir xil asos",
          body:
            "Filiallar bir tizimda ishlaganda rahbar ularning natijalarini bir xil kontekstda ko‘rib, qaysi jarayonni tekshirish kerakligini aniqlaydi.",
        },
        {
          title: "Jamoaning ish maydoni rolga mos",
          body:
            "Owner, menejer, operator, buxgalter va o‘qituvchi o‘ziga kerakli ish maydonini ko‘radi. Bu kundalik nazoratni aniqroq qiladi.",
        },
      ],
      relatedLabel: "Boshqa boshqaruv imkoniyatlari",
      cta: {
        title: "Filiallar ko‘rinishini demo ichida ko‘ring.",
        body: "Sintetik rahbar paneli asosiy jarayonlarni xavfsiz tekshirishga imkon beradi.",
        label: "Demo’ni oching",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["features", "branch-management"],
      title: "Управление филиалами автошколы | automaktab.uz",
      description:
        "Сравнивайте результаты филиалов автошколы в единой панели владельца и контролируйте общую картину.",
      keywords: ["филиалы автошколы", "управление филиалами", "панель владельца"],
      eyebrow: "Управление филиалами",
      heading: "Управляйте филиалами автошколы из одного места.",
      intro:
        "Для школы с несколькими филиалами общая картина не должна распадаться. Панель владельца помогает сравнивать результаты филиалов в одном представлении.",
      sections: [
        {
          title: "Общий вид по филиалам",
          body:
            "Руководитель видит состояние филиалов в одном рабочем пространстве, а не собирает общую картину из разрозненных файлов.",
        },
        {
          title: "Единая основа для сравнения",
          body:
            "Когда филиалы работают в одной системе, владелец сравнивает результаты в одном контексте и понимает, какой процесс стоит проверить.",
        },
        {
          title: "Рабочее пространство соответствует роли",
          body:
            "Владелец, менеджер, оператор, бухгалтер и преподаватель видят своё рабочее поле. Это делает ежедневный контроль точнее.",
        },
      ],
      relatedLabel: "Другие возможности управления",
      cta: {
        title: "Посмотрите представление филиалов в демо.",
        body: "Синтетическая панель владельца помогает безопасно проверить ключевые процессы.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["features", "branch-management"],
      title: "Driving-school branch management | automaktab.uz",
      description:
        "Compare driving-school branch results in one owner dashboard and keep a clear view of the wider operation.",
      keywords: ["driving school branches", "branch management", "owner dashboard"],
      eyebrow: "Branch management",
      heading: "Manage driving-school branches from one view.",
      intro:
        "A school with several branches needs a shared picture. The owner dashboard helps compare branch results in one view.",
      sections: [
        {
          title: "See the whole operation by branch",
          body:
            "An owner sees branch status in one workspace instead of assembling the overall picture from scattered files.",
        },
        {
          title: "Compare results on the same basis",
          body:
            "When branches work in one system, the owner compares results in the same context and can decide which process needs review.",
        },
        {
          title: "Match the workspace to the role",
          body:
            "Owners, managers, operators, accountants, and teachers see the workspace they need, making daily control more precise.",
        },
      ],
      relatedLabel: "Other management capabilities",
      cta: {
        title: "See the branch view in the demo.",
        body: "The synthetic owner dashboard lets you safely review key workflows.",
        label: "Open the demo",
      },
      updatedAt: "2026-09-19",
    },
  },
  pricing: {
    uz: {
      segments: ["pricing"],
      title: "Tariflar | automaktab.uz",
      description:
        "automaktab.uz bilan 30 kun bepul sinovni boshlang. Keyingi shartlar maktabingiz ehtiyojiga qarab tanishuvda kelishiladi.",
      keywords: ["avtomaktab CRM narxi", "avtomaktab tariflari", "boshqaruv tizimi narxi"],
      eyebrow: "Tariflar va sinov",
      heading: "Tariflar: 30 kun bepul sinov bilan boshlang.",
      intro:
        "Bepul sinov davrida sintetik demo orqali asosiy ish oqimlarini ko‘rib chiqing. Keyingi shartlar maktabingiz hajmi va ehtiyojiga qarab tanishuvda muhokama qilinadi.",
      sections: [
        {
          title: "30 kunlik tanishuv davri",
          body:
            "Tasdiqlangan sinov davri 30 kun. U mahsulotning asosiy jarayonlari maktabingiz ishiga mos kelishini tekshirish uchun mo‘ljallangan.",
        },
        {
          title: "Shartlar maktab ehtiyojiga bog‘liq",
          body:
            "Filiallar, jamoa roli va kerakli ish oqimlari turlicha bo‘lishi mumkin. Shu sabab keyingi shartlar tanishuvda aniq ehtiyojga qarab kelishiladi.",
        },
        {
          title: "Avval tizimni o‘zingiz ko‘ring",
          body:
            "Demo kontakt qoldirishni talab qilmaydi. Sintetik akkaunt bilan dashboard, jadval, davomat va to‘lovlar oqimini o‘zingiz tekshiring.",
        },
      ],
      relatedLabel: "Boshqa boshqaruv imkoniyatlari",
      cta: {
        title: "Bepul sinovni demo bilan boshlang.",
        body: "Mahsulotni avval sintetik ma’lumotlar bilan tekshiring, keyin maktabingiz uchun keyingi qadamlarni muhokama qiling.",
        label: "Demo’ni oching",
      },
      updatedAt: "2026-09-19",
    },
    ru: {
      segments: ["pricing"],
      title: "Тарифы automaktab.uz | 30 дней бесплатно",
      description:
        "Начните с 30-дневного бесплатного периода automaktab.uz. Дальнейшие условия обсуждаются с учётом потребностей автошколы.",
      keywords: ["стоимость CRM для автошколы", "тарифы автошколы", "цена системы управления"],
      eyebrow: "Тарифы и пробный период",
      heading: "Тарифы: начните с 30-дневного бесплатного периода.",
      intro:
        "Во время бесплатного периода проверьте ключевые рабочие процессы в синтетическом демо. Дальнейшие условия обсуждаются с учётом размера и задач вашей школы.",
      sections: [
        {
          title: "30 дней для знакомства",
          body:
            "Подтверждённый пробный период длится 30 дней. Он помогает проверить, подходят ли основные процессы продукта для работы школы.",
        },
        {
          title: "Условия зависят от задач школы",
          body:
            "Филиалы, роли команды и нужные рабочие процессы могут отличаться. Поэтому дальнейшие условия согласуются во время знакомства с учётом конкретной потребности.",
        },
        {
          title: "Сначала посмотрите саму систему",
          body:
            "Демо не требует контактов. Проверьте панель, расписание, посещаемость и оплаты на синтетической учётной записи.",
        },
      ],
      relatedLabel: "Другие возможности управления",
      cta: {
        title: "Начните пробный период с демо.",
        body: "Сначала проверьте продукт на синтетических данных, затем обсудите следующий шаг для вашей школы.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-19",
    },
    en: {
      segments: ["pricing"],
      title: "Pricing | automaktab.uz — 30-day free trial",
      description:
        "Start automaktab.uz with a 30-day free trial. Further terms are discussed around your driving school’s needs.",
      keywords: ["driving school CRM pricing", "driving school management pricing", "30-day free trial"],
      eyebrow: "Pricing and trial",
      heading: "Pricing: start with a 30-day free trial.",
      intro:
        "Use the free trial to explore core workflows in a synthetic demo. Further terms are discussed around the size and needs of your school.",
      sections: [
        {
          title: "30 days to explore",
          body:
            "The confirmed trial period is 30 days. It is designed to help you check whether the core workflows fit your school’s operation.",
        },
        {
          title: "Terms reflect your school’s needs",
          body:
            "Branches, team roles, and required workflows can differ. Further terms are therefore discussed during an introduction around the specific need.",
        },
        {
          title: "See the system before you decide",
          body:
            "The demo does not require contact details. Review the dashboard, schedules, attendance, and payments with a synthetic account.",
        },
      ],
      relatedLabel: "Other management capabilities",
      cta: {
        title: "Start your trial with the demo.",
        body: "Review the product with synthetic data first, then discuss the next step for your school.",
        label: "Open the demo",
      },
      updatedAt: "2026-09-19",
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
            "Ushbu sahifalar va xizmatning operatori — automaktab.uz brendi ostida faoliyat yurituvchi jamoa. Aniq yuridik rekvizitlar (nom, manzil, STIR) shartnoma yoki hisob-faktura hujjatlarida ko‘rsatiladi; bu stubda ular ixtiro qilinmagan.",
        },
        {
          title: "Qanday ma’lumotlar ishlatiladi",
          body:
            "CRM maktabning kundalik ishi uchun kerakli ma’lumotlarni saqlaydi: talabalar, guruhlar, to‘lov va qarzdorlik yozuvlari, dars jadvali, davomat va xodim akkauntlari. Marketing saytidagi tanishuv formasi orqali yuborilgan ism, telefon va maktab haqidagi qisqa ma’lumot faqat bog‘lanish uchun ishlatiladi. Sintetik demo akkaunti haqiqiy mijoz ma’lumotlaridan foydalanmaydi.",
        },
        {
          title: "Saqlash, kirish va huquqlar",
          body:
            "Ma’lumotlar xizmatni ko‘rsatish, xavfsizlik va qo‘llab-quvvatlash uchun ishlatiladi. Maktab jamoasi rolga mos kirish orqali o‘z ma’lumotlarini boshqaradi. So‘rov, tuzatish yoki o‘chirish bo‘yicha murojaatni mahsulot kanallari orqali yuboring — saytdagi tanishuv formasi yoki shartnomada ko‘rsatilgan aloqa.",
        },
        {
          title: "Yangilanishlar",
          body:
            "Siyosat yangilansa, ushbu sahifa yangilanadi. Muhim o‘zgarishlar faol mijozlarga mavjud aloqa kanallari orqali yetkazilishi mumkin.",
        },
      ],
      relatedLabel: "Huquqiy sahifalar",
      cta: {
        title: "Savol qoldimi?",
        body: "Tanishuv formasi orqali bog‘laning yoki sintetik demoda mahsulotni ko‘ring — haqiqiy mijoz ma’lumotlari talab qilinmaydi.",
        label: "Demo’ni oching",
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
            "Оператор этих страниц и сервиса — команда под брендом automaktab.uz. Точные юридические реквизиты (наименование, адрес, ИНН) указываются в договоре или счёт-фактуре; в этой заглушке они не выдуманы.",
        },
        {
          title: "Какие данные используются",
          body:
            "CRM хранит данные, нужные для повседневной работы школы: ученики, группы, оплаты и задолженность, расписание, посещаемость и учётные записи сотрудников. Данные из формы знакомства на сайте (имя, телефон, краткие сведения о школе) используются для связи. Синтетическое демо не использует данные реальных клиентов.",
        },
        {
          title: "Хранение, доступ и права",
          body:
            "Данные используются для оказания услуги, безопасности и поддержки. Команда школы управляет своими данными через ролевой доступ. Запросы на доступ, исправление или удаление направляйте через продуктовые каналы — форму знакомства на сайте или контакт из договора.",
        },
        {
          title: "Обновления",
          body:
            "При изменении политики обновляется эта страница. О существенных изменениях активным клиентам могут сообщить по доступным каналам связи.",
        },
      ],
      relatedLabel: "Правовые страницы",
      cta: {
        title: "Остались вопросы?",
        body: "Свяжитесь через форму знакомства или откройте синтетическое демо — данные реальных клиентов не нужны.",
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
            "These pages and the service are operated by the team behind the automaktab.uz brand. Exact legal details (legal name, address, tax ID) appear on contracts or invoices; they are not invented in this stub.",
        },
        {
          title: "What data we use",
          body:
            "The CRM stores data needed for day-to-day school operations: students, groups, payments and debt, schedules, attendance, and staff accounts. Introduction-form details on the marketing site (name, phone, brief school info) are used to get in touch. The synthetic demo does not use real customer data.",
        },
        {
          title: "Storage, access, and requests",
          body:
            "Data is used to provide the service, protect security, and offer support. School teams manage their own data through role-based access. For access, correction, or deletion requests, use product channels — the on-site introduction form or the contact listed in your agreement.",
        },
        {
          title: "Updates",
          body:
            "When this policy changes, this page is updated. Material changes may be communicated to active customers through available contact channels.",
        },
      ],
      relatedLabel: "Legal pages",
      cta: {
        title: "Still have questions?",
        body: "Reach out via the introduction form or open the synthetic demo — no real customer data is required.",
        label: "Open the demo",
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
        "Ushbu qisqa shartlar automaktab.uz marketing sayti va avtomaktablar uchun boshqaruv tizimidan (CRM) foydalanishning asosiy qoidalarini bayon etadi. Bu stub to‘liq yuridik oferta o‘rnini bosmaydi; tijorat shartlari alohida kelishiladi.",
      sections: [
        {
          title: "Xizmat nima",
          body:
            "automaktab.uz avtomaktablarga talabalar, to‘lovlar, jadval va davomatni bitta tizimda boshqarishga yordam beradi. Saytdagi materiallar axborot xarakterida; mahsulot imkoniyatlari sinov va shartnomada tasdiqlangan doirada beriladi.",
        },
        {
          title: "Demo va sinov",
          body:
            "“Demo’ni oching” sintetik ma’lumotli sessiyani ochadi va haqiqiy mijoz ma’lumotlarini talab qilmaydi. Tasdiqlangan bepul sinov muddati 30 kun; keyingi shartlar maktab ehtiyojiga qarab tanishuvda muhokama qilinadi.",
        },
        {
          title: "Maktabning majburiyatlari",
          body:
            "Mijoz o‘z xodimlarining kirish huquqini boshqaradi, faqat qonuniy asosda ma’lumot kiritadi va akkaunt xavfsizligini saqlaydi. Xizmatni suiiste’mol qilish, buzishga urinish yoki uchinchi shaxslarga ruxsatsiz ulashish taqiqlanadi.",
        },
        {
          title: "Javobgarlik va aloqa",
          body:
            "Xizmat “boricha” taqdim etiladi; kafolatlar shartnomada yoziladi. Nizolarni avval muzokara orqali hal etishga harakat qilinadi. Bog‘lanish: saytdagi tanishuv formasi yoki shartnomadagi aloqa kanallari. Operator — automaktab.uz brendi ostidagi jamoa; rekvizitlar hujjatlarda ko‘rsatiladi.",
        },
      ],
      relatedLabel: "Huquqiy sahifalar",
      cta: {
        title: "Avval mahsulotni ko‘ring.",
        body: "Sintetik demo darhol ochiladi. Keyingi tijorat shartlari tanishuvda kelishiladi.",
        label: "Demo’ni oching",
      },
      updatedAt: "2026-09-24",
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
        "Эти краткие условия описывают основные правила маркетингового сайта automaktab.uz и системы управления для автошкол (CRM). Заглушка не заменяет полную юридическую оферту; коммерческие условия согласуются отдельно.",
      sections: [
        {
          title: "Что это за сервис",
          body:
            "automaktab.uz помогает автошколам вести учеников, оплаты, расписание и посещаемость в одной системе. Материалы сайта носят информационный характер; возможности продукта предоставляются в рамках пробного периода и договора.",
        },
        {
          title: "Демо и пробный период",
          body:
            "Кнопка «Открыть демо» запускает сессию с синтетическими данными и не требует данных реальных клиентов. Подтверждённый бесплатный период — 30 дней; дальнейшие условия обсуждаются с учётом задач школы.",
        },
        {
          title: "Обязанности школы",
          body:
            "Клиент управляет доступом сотрудников, вносит данные на законном основании и обеспечивает безопасность учётных записей. Запрещены злоупотребление сервисом, попытки взлома и передача доступа третьим лицам без разрешения.",
        },
        {
          title: "Ответственность и связь",
          body:
            "Сервис предоставляется «как есть»; гарантии фиксируются в договоре. Споры сначала стараются решить переговорами. Связь: форма знакомства на сайте или контакты из договора. Оператор — команда под брендом automaktab.uz; реквизиты указываются в документах.",
        },
      ],
      relatedLabel: "Правовые страницы",
      cta: {
        title: "Сначала посмотрите продукт.",
        body: "Синтетическое демо открывается сразу. Коммерческие условия обсуждаются при знакомстве.",
        label: "Открыть демо",
      },
      updatedAt: "2026-09-24",
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
        "These short terms outline the main rules for the automaktab.uz marketing site and the driving-school management system (CRM). This stub is not a full legal offer; commercial terms are agreed separately.",
      sections: [
        {
          title: "What the service is",
          body:
            "automaktab.uz helps driving schools manage students, payments, schedules, and attendance in one system. Site materials are informational; product capabilities are provided within the trial and any signed agreement.",
        },
        {
          title: "Demo and trial",
          body:
            "“Open the demo” starts a synthetic-data session and does not require real customer data. The confirmed free trial is 30 days; further terms are discussed around the school’s needs.",
        },
        {
          title: "School responsibilities",
          body:
            "Customers manage staff access, enter data on a lawful basis, and keep accounts secure. Abuse of the service, attempts to compromise it, or sharing access with third parties without permission is not allowed.",
        },
        {
          title: "Liability and contact",
          body:
            "The service is provided as available; warranties are stated in the agreement. Disputes are first addressed through discussion. Contact: the on-site introduction form or channels listed in your agreement. The operator is the team behind automaktab.uz; formal details appear in documents.",
        },
      ],
      relatedLabel: "Legal pages",
      cta: {
        title: "See the product first.",
        body: "The synthetic demo opens immediately. Commercial terms are discussed during an introduction.",
        label: "Open the demo",
      },
      updatedAt: "2026-09-24",
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
