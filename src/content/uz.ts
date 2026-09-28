export interface LandingContent {
  meta: {
    title: string;
    description: string;
  };
  header: {
    logoText: string;
    logoDomain: string;
    nav: {
      capabilities: string;
      roles: string;
      howItWorks: string;
      pricing: string;
      faq: string;
    };
    login: string;
    demo: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    lane1: {
      button: string;
      helperLogin: string;
      helperOneClick: string;
    };
    lane2: {
      button: string;
      helper: string;
    };
    signTitle: string;
    signRows: Array<{
      arrow: string;
      title: string;
      sub: string;
      stopIndex: number;
    }>;
  };
  proof: {
    urlText: string;
    badge: string;
    imageAlt: string;
    caption: string;
    callouts: Array<{
      number: number;
      title: string;
      description: string;
      topPct: string;
      leftPct: string;
    }>;
  };
  morningReport: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    botTitle: string;
    botSub: string;
    timeLabel: string;
    headerTitle: string;
    dateLabel: string;
    revenueLabel: string;
    revenueCollectedLabel: string;
    revenueCollected: string;
    revenueExpectedLabel: string;
    revenueExpected: string;
    debtLabel: string;
    debtStudents: Array<{
      name: string;
      group: string;
      car: string;
      amount: string;
      time: string;
    }>;
    debtNote: string;
    scheduleLabel: string;
    scheduleSessionsLabel: string;
    scheduleSessions: string;
    scheduleInstructors: string;
    scheduleOpenSlotsLabel: string;
    scheduleOpenSlots: string;
    scheduleFuelLabel: string;
    scheduleFuel: string;
    btnDebts: string;
    btnConfirm: string;
    feedbackDebts: string;
    feedbackConfirm: string;
    bullets: string[];
    ctaButton: string;
    trialNote: string;
  };
  problem: {
    title: string;
    chips: string[];
    bridge: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    interactiveCta: string;
    navPrevLabel: string;
    navNextLabel: string;
    trackAriaLabel: string;
    stops: Array<{
      number: number;
      name: string;
      sub: string;
      title: string;
      points: string[];
      previewType: "studentCard" | "paymentsTable" | "attendanceScreenshot" | "drivingCard" | "examScreenshot";
    }>;
  };
  attendanceDemo: {
    eyebrow: string;
    title: string;
    description: string;
    banner: string;
    lessonTitle: string;
    lessonSubject: string;
    markAllButton: string;
    ctaButton: string;
    unmarkedLabel: string;
    attendanceStatusTemplate: string;
    statuses: Array<{
      key: "keldi" | "kechikdi" | "kelmadi" | "uzrli";
      label: string;
      icon: string;
      color: string;
      bg: string;
      text: string;
    }>;
    students: string[];
    unmarkedTemplate: string;
    allMarkedMsg: string;
  };
  roles: {
    eyebrow: string;
    title: string;
    questionEyebrow: string;
    badge: string;
    tabs: Array<{
      label: string;
      question: string;
      answer: string;
      modules: string[];
      image: string;
      imageAlt: string;
      objectPosition: string;
    }>;
  };
  resources: {
    expenseCard: {
      badge: string;
      title: string;
      description: string;
      imageAlt: string;
    };
    teamCard: {
      badge: string;
      title: string;
      description: string;
      stats: Array<{ count: string; label: string }>;
      sampleNote: string;
    };
    roadmapCard: {
      title: string;
      notice: string;
      items: Array<{
        title: string;
        badge: string;
        description: string;
      }>;
    };
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    demoCard: {
      label: string;
      badgeLogin: string;
      badgeOneClick: string;
      price: string;
      description: string;
    };
    trialCard: {
      label: string;
      badge: string;
      description: string;
    };
    comparisonRows: Array<{
      field: string;
      value: string;
    }>;
    form: {
      title: string;
      fields: {
        name: { label: string; placeholder: string; error: string };
        phone: { label: string; placeholder: string; error: string };
        school: { label: string; placeholder: string; error: string };
        city: { label: string; placeholder: string; options: string[] };
        branches: { label: string; options: string[] };
        students: { label: string; options: string[] };
        flows: { label: string; options: string[] };
        consent: { label: string; error: string };
      };
      submit: string;
      submitting: string;
      success: {
        title: string;
        message: string;
        demoCta: string;
        resetButton: string;
      };
      networkError: string;
      disclaimer: string;
    };
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{
      question: string;
      answerLogin: string;
      answerOneClick?: string;
    }>;
  };
  finalCta: {
    title: string;
    demoButton: string;
    trialButton: string;
  };
  footer: {
    tagline: string;
    links: Array<{ label: string; href: string }>;
    languages: Array<{ code: string; label: string; active: boolean }>;
    copyright: string;
  };
}

export const contentUz: LandingContent = {
  meta: {
    title: "Automaktab: avtomaktab boshqaruv tizimi: talabalar, to‘lovlar, darslar",
    description:
      "Avtomaktabdagi talabalar, guruhlar, to‘lov va qarzdorlik, dars jadvali, davomat hamda filial holatini bir platformada ko‘ring. Namuna demoni oching.",
  },
  header: {
    logoText: "automaktab",
    logoDomain: ".uz",
    nav: {
      capabilities: "Imkoniyatlar",
      roles: "Kimlar uchun",
      howItWorks: "Qanday ishlaydi",
      pricing: "Tariflar",
      faq: "Savollar",
    },
    login: "Kirish",
    demo: "Demoni ochish",
  },
  hero: {
    eyebrow: "1–3 filialli avtomaktablar uchun",
    title: "Qarz, dars va mashinalar: ",
    titleAccent: "har kuni 08:00 da Telegram’da.",
    description:
      "To‘lov, qarzdorlik, davomat, amaliy haydash va xarajatlar bitta tizimda. Namuna demoni hoziroq ochib ko‘ring.",
    lane1: {
      button: "Demoni ochish",
      helperLogin: "Demo namuna ma’lumotlar bilan, demo login orqali ochiladi.",
      helperOneClick: "Demo namuna ma’lumotlar bilan, parolsiz ochiladi.",
    },
    lane2: {
      button: "Sinov so‘rash",
      helper: "Sinov shartlari individual kelishiladi.",
    },
    signTitle: "BUGUNGI YO‘NALISHLAR",
    signRows: [
      { arrow: "↑", title: "Qarzdorlarni topish", sub: "To‘lov va qarzdorlik", stopIndex: 1 },
      { arrow: "←", title: "Davomatni belgilash", sub: "Jadval va davomat", stopIndex: 2 },
      { arrow: "→", title: "Talaba kartasini ochish", sub: "Talabalar va guruhlar", stopIndex: 0 },
      { arrow: "↱", title: "Haydash daqiqalarini kuzatish", sub: "Amaliy haydash", stopIndex: 3 },
    ],
  },
  proof: {
    urlText: "app.automaktab.uz · Rahbar paneli",
    badge: "DEMO MA’LUMOTLARI",
    imageAlt: "Automaktab rahbar paneli: moliya ko‘rsatkichlari va filiallar bo‘yicha xarajatlar (namuna ma’lumotlari)",
    caption: "Namuna akkaunt kadri. Ismlar va summalar real mijozniki emas.",
    callouts: [
      {
        number: 1,
        title: "Qarzdor talabalar",
        description: "Qarzdorlar soni birinchi ekranda.",
        topPct: "23.2%",
        leftPct: "41%",
      },
      {
        number: 2,
        title: "Davr tushumi",
        description: "Tushum, xarajat va majburiyat yonma-yon.",
        topPct: "48%",
        leftPct: "36.5%",
      },
      {
        number: 3,
        title: "Filial kesimi",
        description: "Har bir filial alohida qatorda.",
        topPct: "71.5%",
        leftPct: "57%",
      },
    ],
  },
  morningReport: {
    eyebrow: "08:00 TELEGRAM HISOBOTI",
    title: "Tizimga kirmasangiz ham: ",
    titleAccent: "hisobot 08:00 da keladi.",
    description:
      "Kechagi tushum, bugungi kutilayotgan to‘lovlar, qarzdorlar va amaliy darslar har kuni ertalab Telegram’ga yuboriladi.",
    botTitle: "automaktab.uz Nazorat Boti",
    botSub: "bot • har kuni 08:00 da",
    timeLabel: "Bugun, 08:00",
    headerTitle: "KUNLIK NAZORAT HISOBOTI",
    dateLabel: "29-sentabr, 2026",
    revenueLabel: "KASSA VA TUSHUM",
    revenueCollectedLabel: "Kecha yig‘ilgan",
    revenueCollected: "14 800 000 so‘m",
    revenueExpectedLabel: "Bugun kutilayotgan",
    revenueExpected: "6 200 000 so‘m",
    debtLabel: "BUGUNGI DARSGA QARZ BILAN KELADIGANLAR",
    debtStudents: [
      {
        name: "Sobirova N.",
        group: "G-14",
        car: "Cobalt #412",
        amount: "2 300 000 so‘m",
        time: "10:00",
      },
      {
        name: "Ismoilov R.",
        group: "G-12",
        car: "Nexia #808",
        amount: "2 000 000 so‘m",
        time: "14:00",
      },
    ],
    debtNote: "* Menejerga to‘lov eslatmasi yuborildi.",
    scheduleLabel: "BUGUNGI AMALIYOT",
    scheduleSessionsLabel: "Jami darslar",
    scheduleSessions: "28 ta dars",
    scheduleInstructors: "8 ta instruktor",
    scheduleOpenSlotsLabel: "Bo‘sh vaqt",
    scheduleOpenSlots: "2 ta oyna (16:00, 17:30)",
    scheduleFuelLabel: "Yoqilg‘i holati",
    scheduleFuel: "12 ta avto me’yorda",
    btnDebts: "Qarzdorlar ro‘yxati (21)",
    btnConfirm: "Kassani tasdiqlash",
    feedbackDebts: "Qarzdorlar tafsiloti",
    feedbackConfirm: "kassa tasdiqlandi",
    bullets: [
      "Tizimga kirmasdan holatni ko‘ring",
      "Qarzdorlarni darsdan oldin aniqlang",
      "Amaliy darslar grafigini kuzating",
    ],
    ctaButton: "Sinov so‘rash",
    trialNote: "30 kunlik sinov",
  },
  problem: {
    title: "Kundalik ish bir nechta joyga tarqalib ketmasin.",
    chips: [
      "Excel jadval",
      "Qog‘oz daftar",
      "Telegram guruh",
      "Xotira",
    ],
    bridge:
      "Hammasi bitta ish jarayonida: rahbar umumiy holatni, operator keyingi vazifani ko‘radi.",
  },
  journey: {
    eyebrow: "TALABA YO‘LI",
    title: "Qabuldan imtihongacha: bitta tizimda.",
    interactiveCta: "Davomatni o‘zingiz belgilab ko‘ring ↓",
    navPrevLabel: "Oldingi bekat",
    navNextLabel: "Keyingi bekat",
    trackAriaLabel: "Bekatlar yo‘li: chap va o‘ng strelkalar bilan boshqarish mumkin",
    stops: [
      {
        number: 1,
        name: "Qabul",
        sub: "Talaba kartasi",
        title: "Talaba bitta kartada.",
        points: [
          "083 ma’lumotnoma va shartnoma raqami",
          "Reklama kanali va tavsiyalar",
          "1–3 bosqichli to‘lov grafigi",
        ],
        previewType: "studentCard",
      },
      {
        number: 2,
        name: "To‘lov",
        sub: "Qarzdorlik",
        title: "To‘lovlar va qarz nazorati.",
        points: [
          "Filial va guruh bo‘yicha qarz",
          "Qisman to‘lov va kutilayotgan tushum",
          "Cheklar va kvitansiyalar arxivi",
        ],
        previewType: "paymentsTable",
      },
      {
        number: 3,
        name: "Nazariya",
        sub: "Jadval va davomat",
        title: "Jadval va 4 xil davomat.",
        points: [
          "Haftalik xona va guruh jadvali",
          "Keldi, kechikdi, kelmadi, uzrli",
          "Guruhlar bo‘yicha qatnashish",
        ],
        previewType: "attendanceScreenshot",
      },
      {
        number: 4,
        name: "Amaliy",
        sub: "Haydash daqiqalari",
        title: "1200 daqiqalik haydash me’yori.",
        points: [
          "O‘tilgan va qolgan daqiqalar",
          "Instruktor tasdig‘i",
          "Spidometr qaydi",
        ],
        previewType: "drivingCard",
      },
      {
        number: 5,
        name: "Imtihon",
        sub: "Test banki va natija",
        title: "YHQ test banki va ichki sinov.",
        points: [
          "11 ta mavzu bo‘yicha savollar",
          "Taymerli sinov, 90% mezon",
          "Ichki imtihon natijalari",
        ],
        previewType: "examScreenshot",
      },
    ],
  },
  attendanceDemo: {
    eyebrow: "SINAB KO‘RING",
    title: "Dars davomatini belgilab ko‘ring.",
    description: "Holatni bosing, qayta bossangiz bekor bo‘ladi.",
    banner: "Namuna dars. Ma’lumotlar saqlanmaydi.",
    lessonTitle: "Nazariya · 14:00",
    lessonSubject: "T-25 · Yo‘l harakati qoidalari",
    markAllButton: "Hammasi keldi",
    ctaButton: "Demoni ochish",
    unmarkedLabel: "Belgilanmagan",
    attendanceStatusTemplate: "{name} davomat holati",
    statuses: [
      { key: "keldi", label: "Keldi", icon: "✓", color: "#1F7A4A", bg: "#E3F1E8", text: "#1B5E3A" },
      { key: "kechikdi", label: "Kechikdi", icon: "◷", color: "#9A6400", bg: "#FBEFD5", text: "#7A4E00" },
      { key: "kelmadi", label: "Kelmadi", icon: "✕", color: "#C23B22", bg: "#FFF6F3", text: "#B3301A" },
      { key: "uzrli", label: "Uzrli", icon: "U", color: "#3B5998", bg: "#E8EEF8", text: "#2B4070" },
    ],
    students: [
      "Saidova Feruza",
      "Ismoilov Rustam",
      "Sobirov Rustam",
      "Istomov Aziz",
      "Ergashev Javohir",
      "Abdullayeva Sevara",
    ],
    unmarkedTemplate: "{count} ta talaba belgilanmagan.",
    allMarkedMsg: "Hammasi belgilandi. Demoda “Saqlash” bilan yakunlanadi.",
  },
  roles: {
    eyebrow: "KIMLAR UCHUN",
    title: "Har bir xodim o‘z ishini ko‘radi.",
    questionEyebrow: "HAR KUNGI SAVOL",
    badge: "DEMO MA’LUMOTLARI",
    tabs: [
      {
        label: "Egasi / direktor",
        question: "“Qancha tushum bor, kim qarzdor, filiallar qanday?”",
        answer:
          "Tushum, xarajat, majburiyat va qarzdorlik bitta ekranda. Filiallarni darhol solishtirasiz.",
        modules: ["Rahbar paneli", "Moliya tahlili", "Filiallar solishtiruvi"],
        image: "/images/demo/dashboard.webp",
        imageAlt: "Rahbar paneli tahlili (namuna ma’lumotlari)",
        objectPosition: "35% 30%",
      },
      {
        label: "Filial menejeri",
        question: "“Bugun qaysi guruh darsda, haydash qaydlari qayerda?”",
        answer:
          "Filial jadvali, amaliy seanslar, 1200 daqiqa me’yori va o‘qituvchilar bandligi bir joyda.",
        modules: ["Dars jadvali", "Davomat jurnali", "1200 daqiqa nazorati"],
        image: "/images/demo/davomat.webp",
        imageAlt: "Dars jadvali va davomat oynasi (namuna ma’lumotlari)",
        objectPosition: "78% 40%",
      },
      {
        label: "Operator / Qabul",
        question: "“Talabani qanday tez topib, to‘lovini tekshiraman?”",
        answer:
          "Talaba profili, 083 ma’lumotnoma, reklama manbasi va to‘lov jadvali bitta qidiruvda.",
        modules: ["Talaba profili", "083 ma’lumotnoma", "To‘lov jadvali"],
        image: "/images/demo/talabalar.webp",
        imageAlt: "Talabalar reestri va qidiruv (namuna ma’lumotlari)",
        objectPosition: "100% 70%",
      },
      {
        label: "Buxgalter va tarmoq",
        question: "“Barcha filiallar va xarajatlar bir joydami?”",
        answer:
          "Barcha filiallar tushumi va 8 toifali xarajatlar bitta joyda. Har bir o‘zgarish audit jurnalida.",
        modules: ["Filial filtri", "8 toifali xarajatlar", "Amallar auditi"],
        image: "/images/demo/xarajatlar.webp",
        imageAlt: "Xarajatlar va filiallar tahlili (namuna ma’lumotlari)",
        objectPosition: "62% 40%",
      },
    ],
  },
  resources: {
    expenseCard: {
      badge: "XARAJAT VA AVTOPARK",
      title: "Xarajatlar va avtopark.",
      description:
        "8 toifali xarajatlar, qisman to‘lovlar, avtopark xaritasi, yoqilg‘i cheklari va texnik ko‘rik muddatlari.",
      imageAlt: "Xarajatlar bo‘yicha kunlik qisqa hisobot (namuna ma’lumotlari)",
    },
    teamCard: {
      badge: "FILIAL VA JAMOA",
      title: "Filiallar va instruktorlar hisobi.",
      description:
        "Har bir xodim faqat o‘z ruxsatidagi ma’lumotni ko‘radi. Instruktorlar soatbay hisoblanadi, har bir amal audit jurnalida.",
      stats: [
        { count: "3 ta", label: "filial" },
        { count: "8 ta", label: "instruktor" },
      ],
      sampleNote: "* Dars soati instruktor balansiga avtomatik yoziladi.",
    },
    roadmapCard: {
      title: "REJADA",
      notice: "Bular hali tayyor emas, ustida ishlayapmiz:",
      items: [
        {
          title: "YHXX bazasi bilan sinxronizatsiya",
          badge: "Rejada",
          description: "Guruhlar va imtihon protokollarini davlat tizimiga avtomatik yuborish.",
        },
        {
          title: "Bank orqali to‘lov qabul qilish",
          badge: "Ishlab chiqilmoqda",
          description: "To‘lovlarni bank ilovalari orqali qabul qilib, hisobni avtomatik yopish.",
        },
      ],
    },
  },
  howItWorks: {
    eyebrow: "QANDAY ISHLAYDI",
    title: "3 qadamda tanishing.",
    steps: [
      {
        number: "01",
        title: "Demoni ko‘ring",
        description: "Namuna maktab kabinetida talabalar, to‘lovlar va darslarni ko‘ring.",
      },
      {
        number: "02",
        title: "Mosligini tekshiring",
        description: "Filiallar, rollar va ish tartibingizni jamoamiz bilan ko‘rib chiqing.",
      },
      {
        number: "03",
        title: "Sinov so‘rang",
        description: "Sinov muddati, import, o‘qitish va narx bo‘yicha yozma taklif oling.",
      },
    ],
  },
  pricing: {
    eyebrow: "TARIF VA SINOV",
    title: "Maktabingizga mos shartlar.",
    description:
      "Filiallar soni va kerakli jarayonlarni ayting, taklif va sinov shartlarini yuboramiz. Narx tasdiqlangach e’lon qilinadi.",
    demoCard: {
      label: "NAMUNA KABINETI",
      badgeLogin: "login kerak",
      badgeOneClick: "bir bosishda",
      price: "0 so‘m",
      description: "Namuna ma’lumotlar bilan to‘liq tanishuv.",
    },
    trialCard: {
      label: "MAKTABINGIZ UCHUN SINOV",
      badge: "Individual taklif",
      description: "O‘z ma’lumotlaringiz bilan 30 kun. Shartlar yozma tasdiqlanadi.",
    },
    comparisonRows: [
      {
        field: "Narx",
        value: "Filiallar va talabalar soniga qarab individual hisoblanadi.",
      },
      {
        field: "Sinov",
        value: "30 kun, o‘z maktabingiz ma’lumotlari bilan.",
      },
      {
        field: "Sinovdan keyin",
        value: "Davom etish yoki to‘xtatish sizning qaroringiz.",
      },
    ],
    form: {
      title: "Maktabingiz uchun sinov so‘rash",
      fields: {
        name: {
          label: "Ismingiz",
          placeholder: "Masalan, Azizbek Karimov",
          error: "Ismingizni yozing.",
        },
        phone: {
          label: "Telefon",
          placeholder: "+998 90 123 45 67",
          error: "Telefon raqamini to‘liq kiriting, masalan +998 90 123 45 67.",
        },
        school: {
          label: "Maktab nomi",
          placeholder: "Avtomaktab nomi",
          error: "Maktab nomini yozing.",
        },
        city: {
          label: "Shahar / viloyat",
          placeholder: "Tanlang",
          options: [
            "Toshkent shahri",
            "Toshkent viloyati",
            "Andijon",
            "Buxoro",
            "Farg‘ona",
            "Jizzax",
            "Xorazm",
            "Namangan",
            "Navoiy",
            "Qashqadaryo",
            "Qoraqalpog‘iston",
            "Samarqand",
            "Sirdaryo",
            "Surxondaryo",
          ],
        },
        branches: {
          label: "Filiallar soni",
          options: ["1", "2–3", "4+"],
        },
        students: {
          label: "Talabalar soni oralig‘i",
          options: ["100 gacha", "100–500", "500–1500", "1500+"],
        },
        flows: {
          label: "Qiziqqan jarayonlar",
          options: [
            "Talabalar",
            "To‘lov va qarz",
            "Jadval va davomat",
            "Amaliy haydash",
            "Xarajat va avtopark",
            "Filiallar",
          ],
        },
        consent: {
          label: "Bog‘lanish va ma’lumotlarni qayta ishlashga roziman.",
          error: "Bog‘lanish uchun roziligingiz kerak.",
        },
      },
      submit: "So‘rov yuborish",
      submitting: "Yuborilmoqda…",
      success: {
        title: "So‘rovingiz qabul qilindi.",
        message: "Tez orada siz bilan bog‘lanamiz.",
        demoCta: "Demoni ochish",
        resetButton: "Yangi so‘rov yuborish",
      },
      networkError: "Aloqa uzildi. Iltimos, qayta urinib ko‘ring.",
      disclaimer: "Raqamingiz faqat sinov bo‘yicha bog‘lanish uchun ishlatiladi.",
    },
  },
  faq: {
    eyebrow: "SAVOLLAR",
    title: "Ochiq savol, ochiq javob.",
    items: [
      {
        question: "Demo nima?",
        answerLogin:
          "Namuna ma’lumotlar joylangan kabinet. Undagi talabalar, filiallar va summalar real mijozniki emas.",
      },
      {
        question: "Demoga qanday kiraman?",
        answerLogin:
          "“Demoni ochish” tugmasi kirish sahifasini ochadi: demo email va parol talab qilinadi.",
        answerOneClick:
          "“Demoni ochish” tugmasi namuna kabinetini bir bosishda, parolsiz ochadi. Sessiya vaqtinchalik.",
      },
      {
        question: "30 kunlik sinov demo bilan bir xilmi?",
        answerLogin:
          "Yo‘q. Demo namuna kabinet, sinovda esa o‘z maktabingiz ulanadi. Muddat va limitlar taklifda yoziladi.",
      },
      {
        question: "Nechta filial bilan ishlash mumkin?",
        answerLogin:
          "Demo bir necha filialni ko‘rsatadi. Sizdagi filiallar soni individual taklifda tasdiqlanadi.",
      },
      {
        question: "GPS avtomobillarni hozir ko‘rsatadimi?",
        answerLogin:
          "Hozircha yo‘q: demo xaritasiga GPS qurilmalar ulanmagan. Integratsiya bo‘yicha jamoa bilan gaplashing.",
      },
      {
        question: "Ma’lumotlarni Excelga olish mumkinmi?",
        answerLogin:
          "Talabalar va to‘lovlar ro‘yxatini Excelga yuklab olish mumkin. Import bo‘yicha alohida kelishamiz.",
      },
      {
        question: "Kirish huquqlari qanday boshqariladi?",
        answerLogin:
          "Har bir xodim o‘z roliga mos bo‘limlarni ko‘radi. Rollar ro‘yxatini ulashdan oldin birga tekshiramiz.",
      },
    ],
  },
  finalCta: {
    title: "Maktabingizni bitta tizimda ko‘ring.",
    demoButton: "Demoni ochish",
    trialButton: "Sinov so‘rash",
  },
  footer: {
    tagline: "avtomaktab boshqaruv tizimi",
    links: [
      { label: "Imkoniyatlar", href: "#yol" },
      { label: "Tariflar", href: "#tariflar" },
      { label: "Savollar", href: "#savollar" },
      { label: "Yangiliklar", href: "/changelog" },
      { label: "Kirish", href: "https://app.automaktab.uz/login" },
    ],
    languages: [
      { code: "uz", label: "UZ", active: true },
      { code: "ru", label: "RU", active: false },
      { code: "en", label: "EN", active: false },
    ],
    copyright: "© 2026 automaktab.uz. Barcha huquqlar himoyalangan.",
  },
};
