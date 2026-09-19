import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

export const SEO_PAGE_IDS = [
  "payments",
  "schedule",
  "attendance",
  "branches",
  "pricing",
] as const;

export type SeoPageId = (typeof SEO_PAGE_IDS)[number];

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
      segments: ["imkoniyatlar", "tolovlar-va-qarzdorlik"],
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
      segments: ["vozmozhnosti", "platezhi-i-zadolzhennost"],
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
      segments: ["imkoniyatlar", "dars-jadvali-va-guruhlar"],
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
      segments: ["vozmozhnosti", "raspisanie-i-gruppy"],
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
      segments: ["imkoniyatlar", "raqamli-davomat"],
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
      segments: ["vozmozhnosti", "tsifrovaya-poseshchaemost"],
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
      segments: ["imkoniyatlar", "filiallar-boshqaruvi"],
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
      segments: ["vozmozhnosti", "upravlenie-filialami"],
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
      segments: ["tariflar"],
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
      segments: ["tarify"],
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
