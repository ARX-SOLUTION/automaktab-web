import type { Locale } from "@/i18n/config";

export type FaqItem = { question: string; answer: string };

export type ProductProof = {
  id: "dashboard" | "schedule" | "attendance";
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  metric: string;
  metricLabel: string;
  image: string;
  imageAlt: string;
};

export type LandingCopy = {
  skipLink: string;
  nav: {
    proof: string;
    capabilities: string;
    faq: string;
    blog: string;
    login: string;
    menu: string;
    mainNavigation: string;
    language: string;
    mobileNavigation: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    trust: string[];
    screenshotCaption: string;
    liveStatus: string;
  };
  disorder: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ index: string; title: string; body: string }>;
  };
  proof: {
    eyebrow: string;
    title: string;
    body: string;
    liveLabel: string;
    items: ProductProof[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string }>;
  };
  trial: {
    eyebrow: string;
    title: string;
    body: string;
    steps: Array<{ index: string; title: string; body: string }>;
  };
  blog: {
    eyebrow: string;
    title: string;
    body: string;
    link: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
  footer: {
    descriptor: string;
    rights: string;
  };
};

export const LANDING_COPY: Record<Locale, LandingCopy> = {
  uz: {
    skipLink: "Asosiy kontentga o‘tish",
    nav: {
      proof: "Tizim ichida",
      capabilities: "Imkoniyatlar",
      faq: "Savollar",
      blog: "Blog",
      login: "Kirish",
      menu: "Menyuni ochish",
      mainNavigation: "Asosiy navigatsiya",
      language: "Til",
      mobileNavigation: "Mobil navigatsiya",
    },
    hero: {
      eyebrow: "Avtomaktablar uchun boshqaruv tizimi",
      title: "Siz yo‘qligingizda ham avtomaktab nazoratda.",
      body: "Tushum, qarzdorlik, dars jadvali va davomatni bitta boshqaruv maydonida ko‘ring — Excel, daftar va xotira orasida sakramasdan.",
      primary: "Demo’ni hozir oching",
      secondary: "15 daqiqalik tanishuv",
      trust: ["30 kun bepul", "Brauzerda ishlaydi", "Sintetik demo ma’lumotlari"],
      screenshotCaption: "Rahbar paneli · sintetik demo",
      liveStatus: "JONLI",
    },
    disorder: {
      eyebrow: "Nazorat uzilgan joy",
      title: "Uch xil manba. Bitta ko‘rinmas muammo.",
      body: "Ma’lumot bor, lekin umumiy holat yo‘q. Qaror qabul qilishdan oldin avval raqamlarni yig‘ishga vaqt ketadi.",
      items: [
        {
          index: "01",
          title: "To‘lovlar Excelda",
          body: "Kim to‘ladi, kim qarzdor — fayl ochilmaguncha umumiy holat ko‘rinmaydi.",
        },
        {
          index: "02",
          title: "Davomat daftarda",
          body: "Dars statusi kech belgilanganda menejer bugungi vaziyatni darhol ko‘ra olmaydi.",
        },
        {
          index: "03",
          title: "Jadval xotirada",
          body: "Guruh, o‘qituvchi va dars turi turli yozuvlarda qolib ketadi.",
        },
      ],
    },
    proof: {
      eyebrow: "Nazorat markazi",
      title: "Gapga emas, ishlayotgan tizimga qarang.",
      body: "Quyidagi kadrlar real sintetik demo akkauntidan olingan. Yasama dashboard yoki mijoz ma’lumoti ishlatilmagan.",
      liveLabel: "Jonli mahsulot kadri",
      items: [
        {
          id: "dashboard",
          index: "01",
          eyebrow: "Owner dashboard",
          title: "Tushum va qarzdorlik bir qarashda",
          body: "Davr tushumi, faol talabalar, jami qarzdorlik va filiallar holati bitta boshqaruv maydonida.",
          metric: "91,45 mln",
          metricLabel: "demo davri tushumi",
          image: "/images/product/dashboard.webp",
          imageAlt: "Sintetik demo owner dashboardida tushum, qarzdorlik va trend grafigi",
        },
        {
          id: "schedule",
          index: "02",
          eyebrow: "Dars jadvali",
          title: "Nazariya va amaliy darslar bir haftada",
          body: "Guruh, o‘qituvchi, vaqt va dars turi haftalik kalendarda bir xil tartibda ko‘rinadi.",
          metric: "7 kun",
          metricLabel: "haftalik ko‘rinish",
          image: "/images/product/schedule.webp",
          imageAlt: "Sintetik demo haftalik dars jadvalida nazariya va amaliy mashg‘ulotlar",
        },
        {
          id: "attendance",
          index: "03",
          eyebrow: "Davomat",
          title: "Har bir dars bo‘yicha aniq status",
          body: "Keldi, kechikdi, kelmadi va uzrli statuslari dars ro‘yxati bilan bir joyda saqlanadi.",
          metric: "10/10",
          metricLabel: "demo darsida belgilangan",
          image: "/images/product/attendance.webp",
          imageAlt: "Sintetik demo davomat panelida keldi, kechikdi, kelmadi va uzrli statuslari",
        },
      ],
    },
    capabilities: {
      eyebrow: "Kundalik operatsiya",
      title: "Rahbar ko‘radi. Jamoa bir xil tizimda ishlaydi.",
      body: "Marketing va’dasi emas — hozirgi mahsulotda ishlayotgan asosiy oqimlar.",
      items: [
        { title: "To‘lov va qarzdorlik", body: "Har bir to‘lov talaba kartasiga bog‘lanadi; qarzdorlar alohida ko‘rinadi." },
        { title: "Talaba va guruhlar", body: "Talabalar kurs, guruh va filial kesimida boshqariladi." },
        { title: "Haftalik jadval", body: "Nazariya va amaliy darslar guruh hamda o‘qituvchi bilan rejalashtiriladi." },
        { title: "Raqamli davomat", body: "Har bir dars uchun to‘rtta tushunarli attendance statusi mavjud." },
        { title: "Filiallar kesimi", body: "Owner dashboard filiallar natijasini bir ko‘rinishda taqqoslaydi." },
        { title: "Rolga mos kirish", body: "Owner, menejer, operator, buxgalter va o‘qituvchi o‘z ish maydonini ko‘radi." },
      ],
    },
    trial: {
      eyebrow: "Kutmasdan tekshiring",
      title: "Demo — prezentatsiya emas. Tizimning o‘zi.",
      body: "Callback kutmaysiz. Sintetik ma’lumotlar bilan mahsulot ichiga kirib, ish oqimini o‘zingiz tekshirasiz.",
      steps: [
        { index: "01", title: "Demo’ni oching", body: "Bitta bosishda sintetik demo sessiyasi ochiladi." },
        { index: "02", title: "Oqimlarni tekshiring", body: "Dashboard, jadval, davomat va to‘lovlar ichida yuring." },
        { index: "03", title: "30 kun sinang", body: "Mos kelsa, maktabingiz uchun tanishuvni boshlang." },
      ],
    },
    blog: {
      eyebrow: "Amaliy qo‘llanma",
      title: "Excel va daftardan boshqaruv tizimiga o‘tish",
      body: "Avtomaktab CRM nimani o‘zgartiradi, qaysi jarayonni avval raqamlashtirish kerak — sodda tilda.",
      link: "Maqolalarni o‘qing",
    },
    faq: {
      eyebrow: "Aniq javoblar",
      title: "Savol qolmasin.",
      items: [
        { question: "automaktab.uz nima qiladi?", answer: "Talabalar, guruhlar, to‘lovlar, qarzdorlik, dars jadvali va davomatni bitta brauzer tizimida boshqarishga yordam beradi." },
        { question: "Demo uchun ma’lumot qoldirish kerakmi?", answer: "Yo‘q. “Demo’ni hozir oching” tugmasi sintetik ma’lumotli demo akkauntini darhol ochadi." },
        { question: "Demo ichidagi ismlar haqiqiy mijozlarnikimi?", answer: "Yo‘q. Demo uchun alohida yaratilgan sintetik talabalar, guruhlar, filiallar va to‘lovlar ishlatiladi." },
        { question: "O‘rnatish kerakmi?", answer: "Yo‘q. Tizim zamonaviy brauzer orqali ishlaydi; alohida lokal dastur o‘rnatilmaydi." },
        { question: "Birinchi oy bepulmi?", answer: "Ha. Tasdiqlangan sinov muddati 30 kun. Keyingi shartlar maktab ehtiyojiga qarab tanishuvda kelishiladi." },
        { question: "Xodimlarning ko‘rish huquqi farqlanadimi?", answer: "Ha. Hozirgi mahsulot owner, menejer, operator, buxgalter va o‘qituvchi rollariga mos ish maydonlarini ajratadi." },
      ],
    },
    closing: {
      eyebrow: "Nazoratni ko‘ring",
      title: "Avtomaktabingizni xotira bilan emas, tizim bilan boshqaring.",
      body: "Demo hozir ochiladi. Savollar bo‘lsa, 15 daqiqalik tanishuvni tanlang.",
      primary: "Demo’ni hozir oching",
      secondary: "15 daqiqalik tanishuv",
    },
    footer: {
      descriptor: "Avtomaktablar uchun boshqaruv tizimi",
      rights: "Barcha huquqlar himoyalangan.",
    },
  },
  ru: {
    skipLink: "Перейти к основному содержимому",
    nav: {
      proof: "Внутри системы",
      capabilities: "Возможности",
      faq: "Вопросы",
      blog: "Блог",
      login: "Войти",
      menu: "Открыть меню",
      mainNavigation: "Основная навигация",
      language: "Язык",
      mobileNavigation: "Мобильная навигация",
    },
    hero: {
      eyebrow: "Система управления для автошкол",
      title: "Автошкола под контролем, даже когда вас нет на месте.",
      body: "Выручка, задолженность, расписание и посещаемость в едином рабочем поле — без постоянного переключения между Excel, журналом и памятью.",
      primary: "Открыть демо сейчас",
      secondary: "15-минутное знакомство",
      trust: ["30 дней бесплатно", "Работает в браузере", "Синтетические демо-данные"],
      screenshotCaption: "Панель владельца · синтетическое демо",
      liveStatus: "В СИСТЕМЕ",
    },
    disorder: {
      eyebrow: "Где теряется контроль",
      title: "Три источника. Одна невидимая проблема.",
      body: "Данные есть, но общей картины нет. Перед решением приходится сначала собирать цифры вручную.",
      items: [
        { index: "01", title: "Оплаты в Excel", body: "Кто оплатил и кто должен, не видно до открытия и сверки файла." },
        { index: "02", title: "Посещаемость в журнале", body: "Если статус урока отмечен позже, менеджер не видит ситуацию сегодня." },
        { index: "03", title: "Расписание в памяти", body: "Группа, преподаватель и тип занятия остаются в разных записях." },
      ],
    },
    proof: {
      eyebrow: "Центр контроля",
      title: "Смотрите на работающий продукт, а не на обещания.",
      body: "Эти кадры сняты в реальном синтетическом демо-аккаунте. Здесь нет нарисованных интерфейсов и клиентских данных.",
      liveLabel: "Кадр живого продукта",
      items: [
        { id: "dashboard", index: "01", eyebrow: "Панель владельца", title: "Выручка и задолженность одним взглядом", body: "Выручка за период, активные ученики, общий долг и состояние филиалов в одном рабочем поле.", metric: "91,45 млн", metricLabel: "выручка демо-периода", image: "/images/product/dashboard.webp", imageAlt: "Синтетическая панель владельца с выручкой, задолженностью и графиком" },
        { id: "schedule", index: "02", eyebrow: "Расписание", title: "Теория и практика на одной неделе", body: "Группа, преподаватель, время и тип занятия показаны в едином недельном календаре.", metric: "7 дней", metricLabel: "недельный обзор", image: "/images/product/schedule.webp", imageAlt: "Недельное расписание теоретических и практических занятий в синтетическом демо" },
        { id: "attendance", index: "03", eyebrow: "Посещаемость", title: "Точный статус по каждому занятию", body: "Присутствовал, опоздал, отсутствовал и уважительная причина хранятся рядом со списком урока.", metric: "10/10", metricLabel: "отмечено в демо-уроке", image: "/images/product/attendance.webp", imageAlt: "Панель посещаемости со статусами учеников в синтетическом демо" },
      ],
    },
    capabilities: {
      eyebrow: "Ежедневная работа",
      title: "Руководитель видит. Команда работает в одной системе.",
      body: "Не маркетинговые обещания, а основные процессы, которые уже работают в продукте.",
      items: [
        { title: "Оплаты и долги", body: "Каждый платёж связан с карточкой ученика, должники видны отдельно." },
        { title: "Ученики и группы", body: "Ученики управляются по курсам, группам и филиалам." },
        { title: "Недельное расписание", body: "Теория и практика планируются с группой и преподавателем." },
        { title: "Цифровая посещаемость", body: "Для каждого урока доступны четыре понятных статуса." },
        { title: "Разрез по филиалам", body: "Панель владельца сравнивает результаты филиалов в одном виде." },
        { title: "Доступ по ролям", body: "Владелец, менеджер, оператор, бухгалтер и преподаватель видят своё рабочее поле." },
      ],
    },
    trial: {
      eyebrow: "Проверьте без ожидания",
      title: "Демо — не презентация. Это сама система.",
      body: "Не нужно ждать звонка. Войдите в продукт с синтетическими данными и проверьте рабочие процессы сами.",
      steps: [
        { index: "01", title: "Откройте демо", body: "Синтетическая демо-сессия запускается одним нажатием." },
        { index: "02", title: "Проверьте процессы", body: "Пройдите по панели, расписанию, посещаемости и оплатам." },
        { index: "03", title: "Попробуйте 30 дней", body: "Если подходит, начните знакомство для своей школы." },
      ],
    },
    blog: {
      eyebrow: "Практическое руководство",
      title: "От Excel и журнала к системе управления",
      body: "Что меняет CRM для автошколы и какой процесс стоит оцифровать первым — простым языком.",
      link: "Читать статьи",
    },
    faq: {
      eyebrow: "Прямые ответы",
      title: "Без скрытых условий.",
      items: [
        { question: "Что делает automaktab.uz?", answer: "Помогает управлять учениками, группами, оплатами, задолженностью, расписанием и посещаемостью в одной браузерной системе." },
        { question: "Нужно оставлять контакты для демо?", answer: "Нет. Кнопка «Открыть демо сейчас» сразу запускает аккаунт с синтетическими данными." },
        { question: "Имена в демо принадлежат реальным клиентам?", answer: "Нет. Для демо отдельно созданы синтетические ученики, группы, филиалы и платежи." },
        { question: "Нужно что-то устанавливать?", answer: "Нет. Система работает в современном браузере без отдельной локальной программы." },
        { question: "Первый месяц бесплатный?", answer: "Да. Подтверждённый пробный период составляет 30 дней. Дальнейшие условия обсуждаются с учётом потребностей школы." },
        { question: "Права сотрудников различаются?", answer: "Да. Текущий продукт разделяет рабочие области владельца, менеджера, оператора, бухгалтера и преподавателя." },
      ],
    },
    closing: {
      eyebrow: "Увидьте контроль",
      title: "Управляйте автошколой системой, а не памятью.",
      body: "Демо откроется сразу. Если останутся вопросы, выберите 15-минутное знакомство.",
      primary: "Открыть демо сейчас",
      secondary: "15-минутное знакомство",
    },
    footer: { descriptor: "Система управления для автошкол", rights: "Все права защищены." },
  },
  en: {
    skipLink: "Skip to main content",
    nav: {
      proof: "Inside the product",
      capabilities: "Capabilities",
      faq: "Questions",
      blog: "Blog",
      login: "Sign in",
      menu: "Open menu",
      mainNavigation: "Main navigation",
      language: "Language",
      mobileNavigation: "Mobile navigation",
    },
    hero: {
      eyebrow: "Management system for driving schools",
      title: "Your driving school stays under control, even when you are away.",
      body: "Revenue, debt, schedules, and attendance in one operating view — without jumping between Excel, paper logs, and memory.",
      primary: "Open the demo now",
      secondary: "15-minute introduction",
      trust: ["30 days free", "Works in a browser", "Synthetic demo data"],
      screenshotCaption: "Owner dashboard · synthetic demo",
      liveStatus: "LIVE",
    },
    disorder: {
      eyebrow: "Where control breaks",
      title: "Three sources. One invisible problem.",
      body: "The data exists, but the whole picture does not. Before making a decision, someone has to assemble the numbers first.",
      items: [
        { index: "01", title: "Payments in Excel", body: "Who paid and who owes remains unclear until the file is opened and reconciled." },
        { index: "02", title: "Attendance on paper", body: "When lesson status is marked later, a manager cannot see today’s situation now." },
        { index: "03", title: "Schedules in memory", body: "Groups, teachers, and lesson types end up scattered across separate notes." },
      ],
    },
    proof: {
      eyebrow: "Control center",
      title: "Look at the working product, not a promise.",
      body: "These frames come from the live synthetic demo account. No fabricated dashboard and no customer data.",
      liveLabel: "Live product frame",
      items: [
        { id: "dashboard", index: "01", eyebrow: "Owner dashboard", title: "Revenue and debt at a glance", body: "Period revenue, active students, total debt, and branch performance in one operating view.", metric: "UZS 91.45m", metricLabel: "demo-period revenue", image: "/images/product/dashboard.webp", imageAlt: "Synthetic owner dashboard showing revenue, debt, and a trend chart" },
        { id: "schedule", index: "02", eyebrow: "Lesson schedule", title: "Theory and practice across one week", body: "Group, teacher, time, and lesson type follow one consistent weekly calendar.", metric: "7 days", metricLabel: "weekly view", image: "/images/product/schedule.webp", imageAlt: "Synthetic weekly schedule with theory and practical lessons" },
        { id: "attendance", index: "03", eyebrow: "Attendance", title: "A clear status for every lesson", body: "Present, late, absent, and excused statuses live alongside the lesson roster.", metric: "10/10", metricLabel: "marked in the demo lesson", image: "/images/product/attendance.webp", imageAlt: "Synthetic attendance panel with student status controls" },
      ],
    },
    capabilities: {
      eyebrow: "Daily operations",
      title: "The owner sees. The team works in one system.",
      body: "Not future-facing marketing claims — the core workflows already present in the product.",
      items: [
        { title: "Payments and debt", body: "Every payment is linked to a student record and debtors are visible separately." },
        { title: "Students and groups", body: "Students are managed by course, group, and branch." },
        { title: "Weekly schedule", body: "Theory and practice are planned with their group and teacher." },
        { title: "Digital attendance", body: "Each lesson has four clear attendance statuses." },
        { title: "Branch overview", body: "The owner dashboard compares branch outcomes in one view." },
        { title: "Role-based workspace", body: "Owners, managers, operators, accountants, and teachers see their working area." },
      ],
    },
    trial: {
      eyebrow: "Verify without waiting",
      title: "The demo is not a presentation. It is the system.",
      body: "There is no callback gate. Enter the product with synthetic data and inspect the workflow yourself.",
      steps: [
        { index: "01", title: "Open the demo", body: "A synthetic demo session starts with one click." },
        { index: "02", title: "Inspect the workflows", body: "Move through the dashboard, schedule, attendance, and payments." },
        { index: "03", title: "Try it for 30 days", body: "If it fits, start the introduction for your school." },
      ],
    },
    blog: {
      eyebrow: "Practical guide",
      title: "Moving from Excel and paper logs to one system",
      body: "What a driving-school CRM changes and which workflow to digitize first, explained plainly.",
      link: "Read the articles",
    },
    faq: {
      eyebrow: "Straight answers",
      title: "No hidden claims.",
      items: [
        { question: "What does automaktab.uz do?", answer: "It helps manage students, groups, payments, debt, schedules, and attendance in one browser-based system." },
        { question: "Do I have to leave contact details for the demo?", answer: "No. “Open the demo now” launches the account with synthetic data immediately." },
        { question: "Do the names in the demo belong to customers?", answer: "No. The demo uses separately generated synthetic students, groups, branches, and payments." },
        { question: "Does it require installation?", answer: "No. The system runs in a modern browser without a separate local application." },
        { question: "Is the first month free?", answer: "Yes. The confirmed trial period is 30 days. Terms after the trial are discussed around the school’s needs." },
        { question: "Do staff permissions differ?", answer: "Yes. The current product separates workspaces for owners, managers, operators, accountants, and teachers." },
      ],
    },
    closing: {
      eyebrow: "See the control",
      title: "Run your driving school with a system, not memory.",
      body: "The demo opens now. If questions remain, choose a 15-minute introduction.",
      primary: "Open the demo now",
      secondary: "15-minute introduction",
    },
    footer: { descriptor: "Management system for driving schools", rights: "All rights reserved." },
  },
};
