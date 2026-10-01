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
    title: string;
    caption: string;
    callouts: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
  scenes: {
    sampleLabel: string;
    currency: string;
    director: {
      title: string;
      period: string;
      revenue: string;
      debt: string;
      branches: string[];
      branchCaption: string;
    };
    registrar: {
      title: string;
      students: string;
      group: string;
      schedule: string;
      lesson: string;
    };
    teacher: {
      title: string;
      lesson: string;
      marked: string;
      statuses: string[];
    };
    leads: {
      title: string;
      stages: string[];
      ownerLabel: string;
      sourceLabel: string;
      sourceValue: string;
      followupLabel: string;
      followupValue: string;
      conversionLabel: string;
    };
    fleet: {
      title: string;
      statuses: string[];
      instructorLabel: string;
      maintenanceLabel: string;
      maintenanceValue: string;
      insuranceLabel: string;
      fuelLabel: string;
    };
    education: {
      title: string;
      theory: string;
      practice: string;
      days: string[];
      testTitle: string;
      questionLabel: string;
      timeLabel: string;
      thresholdLabel: string;
      groupLabel: string;
      internalNote: string;
    };
    accountant: {
      title: string;
      expenses: string;
      categories: string[];
      paid: string;
      remaining: string;
    };
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
    newStudentsLabel: string;
    branchLabel: string;
    totalLabel: string;
    currency: string;
    numberLocale: string;
    branches: [{ name: string; revenue: number; students: number }, { name: string; revenue: number; students: number }, { name: string; revenue: number; students: number }];
    sampleCaption: string;
    bullets: string[];
    ctaButton: string;
    trialNote: string;
  };
  problem: {
    title: string;
    sourceLabel: string;
    resultLabel: string;
    platformLabel: string;
    sources: Array<{ title: string; detail: string }>;
    outcomes: Array<{ title: string; detail: string }>;
  };
  journey: {
    eyebrow: string;
    title: string;
    interactiveCta: string;
    navPrevLabel: string;
    navNextLabel: string;
    trackAriaLabel: string;
    previews: {
      student: {
        title: string;
        category: string;
        group: string;
        certificate: string;
        tabs: string[];
        sourceLabel: string;
        sourceValue: string;
        debtLabel: string;
      };
      payments: {
        title: string;
        period: string;
        branches: string;
        debtors: string;
        columns: string[];
        paidInFull: string;
      };
      driving: {
        title: string;
        quota: string;
        completed: string;
        remaining: string;
        sessions: string[];
        instructorNote: string;
        confirmed: string;
        pending: string;
      };
      exam: {
        title: string;
        topic: string;
        remaining: string;
        threshold: string;
        question: string;
        correctAnswer: string;
        correctLabel: string;
        alternativeAnswer: string;
        topicCount: string;
        topicLabel: string;
        languageCount: string;
        resultLabel: string;
      };
    };
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
    ctaButton: string;
    unmarkedLabel: string;
    markedLabel: string;
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
    card: {
      title: string;
      attendance: string;
      today: string;
      debt: string;
      currency: string;
    };
  };
  roles: {
    eyebrow: string;
    title: string;
    questionEyebrow: string;
    tabs: Array<{
      label: string;
      question: string;
      answer: string;
      modules: string[];
      scene: "director" | "registrar" | "teacher" | "accountant";
    }>;
  };
  resources: {
    title: string;
    modules: Array<{ kind: "leads" | "fleet" | "education"; title: string; description: string; points: string[] }>;
    expenseCard: {
      badge: string;
      title: string;
      description: string;
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
      requiredNote: string;
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
    title: "Avtomaktab boshqaruv tizimi | automaktab.uz",
    description:
      "Talabalar, to‘lovlar, qarzdorlik, dars jadvali va davomatni bir joyda boshqaring. Filiallar holatini ko‘ring va demoni ochib sinang.",
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
    eyebrow: "Avtomaktab rahbarlari uchun",
    title: "To‘lov, dars va davomat. ",
    titleAccent: "Barchasi bir joyda.",
    description:
      "Talabalar, to‘lovlar, dars jadvali va davomatni bitta tizimda yuriting. Filiallaringiz holatini ham shu yerda ko‘ring.",
    lane1: {
      button: "Demoni ochish",
      helperLogin: "Namuna maktabni demo email va parol bilan oching.",
      helperOneClick: "Namuna maktabni parolsiz oching.",
    },
    lane2: {
      button: "Sinov so‘rash",
      helper: "Maktabingiz uchun 30 kunlik sinov shartlarini kelishamiz.",
    },
    signTitle: "Rahbarning kundalik savollari",
    signRows: [
      { arrow: "↑", title: "Kimning to‘lovi kechikdi?", sub: "To‘lov va qarzdorlik", stopIndex: 1 },
      { arrow: "←", title: "Kim darsga kelmadi?", sub: "Jadval va davomat", stopIndex: 2 },
      { arrow: "→", title: "Guruhda kimlar o‘qiyapti?", sub: "Talabalar va guruhlar", stopIndex: 0 },
      { arrow: "↱", title: "Kim qancha haydash mashg‘uloti o‘tdi?", sub: "Amaliy haydash", stopIndex: 3 },
    ],
  },
  proof: {
    title: "Tushum, qarzdorlik va filiallar bir ko‘rinishda.",
    caption: "Namuna ma’lumotlari. Haqiqiy mijozlarga tegishli emas.",
    callouts: [
      {
        number: 1,
        title: "Talabalar qarzdorligi",
        description: "Talabalarning jami qarzini ko‘ring.",
      },
      {
        number: 2,
        title: "Tushum",
        description: "Tanlangan davr tushumini ko‘ring.",
      },
      {
        number: 3,
        title: "Filiallar natijasi",
        description: "Filiallar natijasini bir joyda solishtiring.",
      },
    ],
  },
  scenes: {
    sampleLabel: "Namuna",
    currency: "so‘m",
    director: {
      title: "Maktab moliyasi",
      period: "Namuna · 1–30 sentabr",
      revenue: "Tushum",
      debt: "Talabalar qarzdorligi",
      branches: ["Filial A", "Filial B", "Filial C"],
      branchCaption: "Uch filialning bir davrdagi tushumi.",
    },
    registrar: {
      title: "Talabalar va darslar",
      students: "Talabalar ro‘yxati",
      group: "Guruh",
      schedule: "Dars vaqti",
      lesson: "Nazariya · Yo‘l harakati qoidalari",
    },
    teacher: {
      title: "Guruh davomati",
      lesson: "Nazariya darsi",
      marked: "talaba belgilangan",
      statuses: ["Keldi", "Keldi", "Kechikdi", "Kelmadi"],
    },
    leads: {
      title: "Murojaatdan qabulgacha",
      stages: [
        "Yangi murojaat",
        "Bog‘lanildi",
        "Uchrashuv",
        "Qabul qilindi"
      ],
      ownerLabel: "Mas’ul",
      sourceLabel: "Manba",
      sourceValue: "Instagram",
      followupLabel: "Keyingi aloqa",
      followupValue: "Bugun · 15:30",
      conversionLabel: "Talaba kartasini ochish"
    },
    fleet: {
      title: "Mashinalar holati",
      statuses: [
        "Mashg‘ulotga tayyor",
        "Texnik xizmatda"
      ],
      instructorLabel: "Instruktor",
      maintenanceLabel: "Keyingi texnik xizmat",
      maintenanceValue: "12.10 · Moy almashtirish",
      insuranceLabel: "Sug‘urta · 01.12 gacha",
      fuelLabel: "Yoqilg‘i · 42 litr"
    },
    education: {
      title: "Darslar va ichki testlar",
      theory: "Nazariya",
      practice: "Amaliy haydash",
      days: [
        "Dushanba",
        "Chorshanba"
      ],
      testTitle: "YHQ · Ichki test",
      questionLabel: "Savollar",
      timeLabel: "Daqiqa",
      thresholdLabel: "O‘tish bali",
      groupLabel: "Guruh",
      internalNote: "Maktab ichki testi. Davlat imtihoni emas."
    },
    accountant: {
      title: "Xarajat va to‘lov",
      expenses: "Jami xarajat",
      categories: ["Yoqilg‘i", "Ta’mir"],
      paid: "To‘langan",
      remaining: "To‘lanmagan",
    },
  },
  morningReport: {
    eyebrow: "Telegram’da kunlik hisobot",
    title: "Kecha qancha tushum bo‘ldi? ",
    titleAccent: "Ertalab Telegram’da ko‘ring.",
    description: "Hisobotni yoqing. Har kuni 08:00 da kechagi tushum va yangi talabalar soni Telegram’da keladi.",
    botTitle: "automaktab.uz",
    botSub: "Hisobot namunasi · ma’lumotlar to‘qima",
    timeLabel: "08:00",
    headerTitle: "Kechagi kun hisoboti",
    dateLabel: "Namuna",
    revenueLabel: "Kun natijasi",
    revenueCollectedLabel: "Tushum",
    newStudentsLabel: "Yangi talabalar",
    branchLabel: "Filial",
    totalLabel: "Jami · 3 filial",
    currency: "so‘m",
    numberLocale: "uz-UZ",
    branches: [
      { name: "Chilonzor", revenue: 7200000, students: 4 },
      { name: "Yunusobod", revenue: 4600000, students: 3 },
      { name: "Sergeli", revenue: 3000000, students: 1 },
    ],
    sampleCaption: "Filiallar bo‘yicha namuna. Hozir Telegram’da faqat umumiy tushum va yangi talabalar soni yuboriladi.",
    bullets: ["Rahbarga maktab bo‘yicha jami", "Menejerga o‘z filiali bo‘yicha", "Har kuni 08:00, Toshkent vaqti"],
    ctaButton: "Sinov so‘rash",
    trialNote: "Telegram’ni ulang va hisobotni yoqing",
  },
  problem: {
    title: "Uch joydagi ishlar. Bitta platforma.",
    sourceLabel: "Alohida yuritiladi",
    resultLabel: "Bir joyda boshqariladi",
    platformLabel: "Bitta platforma",
    sources: [
      { title: "Telegram guruhlari", detail: "Xabarlardagi vazifalar" },
      { title: "Excel jadvallari", detail: "Alohida hisob-kitoblar" },
      { title: "Qog‘oz va daftarlar", detail: "Qo‘lda yuritilgan qaydlar" },
    ],
    outcomes: [
      { title: "To‘lov va qarz", detail: "Kim qancha to‘lagan" },
      { title: "Davomat", detail: "Kim darsga kelgan" },
      { title: "Dars jadvali", detail: "Guruh va dars vaqti" },
    ],
  },
  journey: {
    eyebrow: "Qabuldan ichki testgacha",
    title: "Har bir talabaning holati ko‘z oldingizda.",
    interactiveCta: "Davomatni belgilab ko‘ring ↓",
    navPrevLabel: "Oldingi bosqich",
    navNextLabel: "Keyingi bosqich",
    trackAriaLabel: "Talaba bosqichlari. Chap va o‘ng strelka tugmalari bilan tanlang.",
    previews: {
      student: {
        title: "Talaba kartasi",
        category: "B toifa",
        group: "T-25 guruhi",
        certificate: "083 tibbiy ma’lumotnoma: bor",
        tabs: ["To‘lov", "Imtihon", "Davomat", "Guruh tarixi"],
        sourceLabel: "Reklama va tavsiyalar",
        sourceValue: "Instagram · 2 ta tavsiya",
        debtLabel: "Qolgan to‘lov",
      },
      payments: {
        title: "To‘lovlar ro‘yxati",
        period: "Bu oy",
        branches: "Barcha filiallar",
        debtors: "Qarzdorlar",
        columns: ["Talaba", "Jami", "Qoldiq"],
        paidInFull: "To‘langan",
      },
      driving: {
        title: "Haydash mashg‘ulotlari · Saidova F.",
        quota: "/ 1200 daqiqa",
        completed: "O‘tilgan: 600 daq",
        remaining: "Qolgan: 600 daq",
        sessions: ["Mashg‘ulot · 90 daq", "Mashg‘ulot · 60 daq"],
        instructorNote: "Instruktor qaydi",
        confirmed: "Tasdiqlandi",
        pending: "Tasdiq kutilmoqda",
      },
      exam: {
        title: "Ichki YHQ testi · 11 mavzu",
        topic: "11-mavzu: Chorrahalar",
        remaining: "18:40 qoldi",
        threshold: "O‘tish bali: 90%",
        question: "Teng ahamiyatli yo‘llar kesishgan chorrahada qaysi haydovchi yo‘l berishi shart?",
        correctAnswer: "A) O‘ng tomondan kelayotgan transportga",
        correctLabel: "To‘g‘ri",
        alternativeAnswer: "B) Chap tomondan kelayotgan mashinaga",
        topicCount: "11 ta",
        topicLabel: "Mavzu",
        languageCount: "3 ta til",
        resultLabel: "Guruh natijasi",
      },
    },
    stops: [
      {
        number: 1,
        name: "Qabul",
        sub: "Talaba kartasi",
        title: "Talaba ma’lumotlari bir kartada.",
        points: [
          "Hujjatlar va shartnoma bir kartada",
          "Qaysi reklamadan kelganini ko‘ring",
          "To‘lov muddatlarini oldindan belgilang",
        ],
        previewType: "studentCard",
      },
      {
        number: 2,
        name: "To‘lov",
        sub: "Qarzdorlik",
        title: "Qarzdorlikni vaqtida ko‘ring.",
        points: [
          "Qarzdorlarni filial va guruh bo‘yicha toping",
          "To‘langan summa va qoldiqni tekshiring",
          "To‘lov tarixini bir joyda saqlang",
        ],
        previewType: "paymentsTable",
      },
      {
        number: 3,
        name: "Nazariya",
        sub: "Jadval va davomat",
        title: "Darsga kim kelmayotganini biling.",
        points: [
          "Xona va guruh jadvalini ko‘ring",
          "Har bir talabaning davomatini belgilang",
          "Davomatni guruhlar bo‘yicha kuzating",
        ],
        previewType: "attendanceScreenshot",
      },
      {
        number: 4,
        name: "Haydash",
        sub: "Haydash daqiqalari",
        title: "Haydash mashg‘ulotlarini hisobga oling.",
        points: [
          "O‘tilgan va qolgan daqiqalarni ko‘ring",
          "Instruktor tasdig‘ini tekshiring",
          "Yurgan masofani qayd eting",
        ],
        previewType: "drivingCard",
      },
      {
        number: 5,
        name: "Ichki test",
        sub: "Savollar va natijalar",
        title: "Imtihonga tayyorgarlikni tekshiring.",
        points: [
          "Mavzular bo‘yicha YHQ savollari",
          "Vaqt chegaralangan ichki sinov",
          "Har bir talabaning sinov natijalari",
        ],
        previewType: "examScreenshot",
      },
    ],
  },
  attendanceDemo: {
    eyebrow: "SINAB KO‘RING",
    title: "Kim darsga kelmadi?",
    description: "Belgilab ko‘ring.",
    banner: "Namuna · saqlanmaydi",
    lessonTitle: "Nazariya · 14:00",
    lessonSubject: "T-25 · Yo‘l qoidalari",
    ctaButton: "Demoni ochish",
    unmarkedLabel: "Belgilanmagan",
    markedLabel: "Belgilandi",
    attendanceStatusTemplate: "{name}: davomat holati",
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
    unmarkedTemplate: "Belgilanmagan: {count}",
    allMarkedMsg: "Hammasi belgilandi.",
    card: {
      title: "Talaba kartasi",
      attendance: "Davomat",
      today: "Bugun",
      debt: "Qolgan to‘lov",
      currency: "so‘m",
    },
  },
  roles: {
    eyebrow: "KIMLAR UCHUN",
    title: "Jamoa ishlaydi. Siz umumiy holatni ko‘rasiz.",
    questionEyebrow: "Kundalik savol",
    tabs: [
      {
        label: "Avtomaktab rahbari",
        question: "Qancha tushum bor? Kim qarzdor?",
        answer:
          "Tushum, xarajat va qarzdorlikni solishtiring. Qaysi filialga e’tibor kerakligini raqamlardan ko‘ring.",
        modules: ["Rahbar paneli", "Moliya tahlili", "Filiallar natijasi"],
        scene: "director",
      },
      {
        label: "O‘qituvchi",
        question: "Kim keldi? Kim dars qoldirdi?",
        answer:
          "Guruh ro‘yxati, dars va davomat bir joyda. Har bir talabaning holatini belgilang.",
        modules: ["Dars jadvali", "Davomat jurnali", "Guruh ro‘yxati"],
        scene: "teacher",
      },
      {
        label: "Qabul xodimi",
        question: "Talabani topib, to‘lovini qanday tekshiraman?",
        answer:
          "Talabani qidiruvdan toping. Hujjatlari, guruhi va to‘lov holati bir kartada.",
        modules: ["Talaba kartasi", "083 ma’lumotnoma", "To‘lov jadvali"],
        scene: "registrar",
      },
      {
        label: "Buxgalter",
        question: "Qancha xarajat qilindi? Qancha to‘lanmagan?",
        answer:
          "Filiallar tushumi va xarajatlarini tekshiring. To‘langan va hali to‘lanmagan summalarni alohida ko‘ring.",
        modules: ["Filial bo‘yicha saralash", "Xarajatlar hisobi", "O‘zgarishlar tarixi"],
        scene: "accountant",
      },
    ],
  },
  resources: {
    title: "Qabul, avtopark va ta’lim bir tizimda.",
    modules: [
      {
        kind: "leads",
        title: "Murojaatlar va qabul",
        description: "Murojaat qayerdan kelganini va qaysi bosqichdaligini ko‘ring. Mas’ul xodimni tayinlang va keyingi aloqa vaqtini belgilang.",
        points: [
          "Bosqich, manba va mas’ul",
          "Keyingi aloqa vaqti",
          "Talaba kartasini yaratish"
        ]
      },
      {
        kind: "fleet",
        title: "Avtopark",
        description: "Mashina holati, instruktor va texnik xizmatni bir joyda kuzating. Yoqilg‘i qaydlari va sug‘urta hujjatlarini saqlang.",
        points: [
          "Mashina holati va instruktori",
          "Texnik xizmat va sug‘urta",
          "Yoqilg‘i qaydlari"
        ]
      },
      {
        kind: "education",
        title: "Ta’lim",
        description: "Darslarni guruh va o‘qituvchi bilan rejalashtiring. Davomat, ichki test shartlari va natijalarini bir joyda kuzating.",
        points: [
          "Guruh, dars va o‘qituvchi",
          "Jadval va davomat",
          "Ichki testlar va natijalar"
        ]
      }
    ],
    expenseCard: {
      badge: "Xarajatlar",
      title: "Pul nimaga ketayotganini ko‘ring.",
      description:
        "Yoqilg‘i, ta’mir va boshqa xarajatlarni kuzating. Qancha to‘langanini va qancha to‘lash qolganini ko‘ring.",
    },
    teamCard: {
      badge: "Filiallar va jamoa",
      title: "Filial ko‘paysa ham nazorat sizda.",
      description:
        "Har bir xodimga ishiga mos kirish huquqini bering. Filiallar va instruktorlar hisobini bir tizimda yuriting.",
      stats: [
        { count: "3 ta", label: "filial" },
        { count: "8 ta", label: "instruktor" },
      ],
      sampleNote: "* Namuna maktabdagi filiallar va instruktorlar.",
    },
    roadmapCard: {
      title: "Rejada",
      notice: "Bu imkoniyatlar rejada. Hozir ishlamaydi:",
      items: [
        {
          title: "YHXX tizimi bilan bog‘lanish",
          badge: "Rejada",
          description: "Guruh va imtihon ma’lumotlarini davlat tizimiga yuborish rejalashtirilgan.",
        },
        {
          title: "Bank orqali to‘lov qabul qilish",
          badge: "Rejada",
          description: "Bank ilovalaridan to‘lov qabul qilish va to‘lov hisobini avtomatik yangilash rejalashtirilgan.",
        },
      ],
    },
  },
  howItWorks: {
    eyebrow: "Qanday ishlaydi",
    title: "Avval ko‘ring. Keyin maktabingizda sinang.",
    steps: [
      {
        number: "01",
        title: "Demoni ochish",
        description: "Namuna maktabda qarzdorlar, tushum va davomatni o‘zingiz tekshirib ko‘ring.",
      },
      {
        number: "02",
        title: "Mosligini tekshiring",
        description: "Filiallaringiz, jamoangiz va ish tartibingizni birga ko‘rib chiqamiz.",
      },
      {
        number: "03",
        title: "Sinov so‘rash",
        description: "30 kunlik sinov, ma’lumot ko‘chirish, jamoani o‘rgatish va narx shartlarini yozma kelishamiz.",
      },
    ],
  },
  pricing: {
    eyebrow: "Narx va sinov",
    title: "Qaror qilishdan oldin maktabingizda sinang.",
    description:
      "Filial va talabalar sonini ayting. Narx va 30 kunlik sinov shartlarini yozma taklifda oling.",
    demoCard: {
      label: "Namuna maktab",
      badgeLogin: "demo email va parol bilan",
      badgeOneClick: "bir bosishda",
      price: "0 so‘m",
      description: "Rahbar paneli, to‘lovlar va darslarni namuna ma’lumotlarda tekshiring.",
    },
    trialCard: {
      label: "Maktabingiz uchun sinov",
      badge: "Yozma taklif",
      description: "Maktabingiz ma’lumotlari bilan 30 kun sinang. Narx va shartlarni boshlashdan oldin yozma kelishamiz.",
    },
    comparisonRows: [
      {
        field: "Narx",
        value: "Filial va talabalar soniga qarab hisoblanadi.",
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
      requiredNote: "Majburiy",
      fields: {
        name: {
          label: "Ismingiz",
          placeholder: "Masalan, Azizbek Karimov",
          error: "Ismingizni yozing.",
        },
        phone: {
          label: "Telefon raqamingiz",
          placeholder: "+998 90 123 45 67",
          error: "Telefon raqamini to‘liq kiriting, masalan +998 90 123 45 67.",
        },
        school: {
          label: "Avtomaktab nomi",
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
          label: "Talabalar soni",
          options: ["100 gacha", "100–500", "500–1500", "1500+"],
        },
        flows: {
          label: "Qaysi ishlarni yaxshilamoqchisiz?",
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
      submit: "Sinov so‘rash",
      submitting: "Yuborilmoqda…",
      success: {
        title: "So‘rovingiz qabul qilindi.",
        message: "Sinov shartlarini kelishish uchun siz bilan bog‘lanamiz.",
        demoCta: "Demoni ochish",
        resetButton: "Yana so‘rov yuborish",
      },
      networkError: "So‘rov qabul qilinganini tasdiqlay olmadik. Ma’lumotlaringiz shu yerda qoladi. Qayta yuborsangiz, takroriy so‘rov kelishi mumkin.",
      disclaimer: "Raqamingiz faqat sinov bo‘yicha bog‘lanish uchun ishlatiladi.",
    },
  },
  faq: {
    eyebrow: "Savollar",
    title: "Ko‘p beriladigan savollar.",
    items: [
      {
        question: "Rahbar sifatida nimalarni ko‘ra olaman?",
        answerLogin:
          "Tushum, xarajat, qarzdorlik va davomatni bir joyda ko‘rasiz. Filiallarni solishtirib, qaysi to‘lov yoki darsga e’tibor kerakligini bilasiz.",
      },
      {
        question: "Demoga qanday kiraman?",
        answerLogin:
          "“Demoni ochish” kirish sahifasiga olib boradi. Demo email va parol bilan kirasiz.",
        answerOneClick:
          "“Demoni ochish” namuna maktabni bir bosishda, parolsiz ochadi. Demo vaqtinchalik ishlash uchun.",
      },
      {
        question: "Demo bilan sinovning farqi nima?",
        answerLogin:
          "Demo namuna ma’lumotlari bilan tanishish uchun. Sinovda maktabingiz ma’lumotlari bilan 30 kun ishlaysiz. Narx va cheklovlarni oldindan yozma kelishamiz.",
      },
      {
        question: "Nechta filial bilan ishlash mumkin?",
        answerLogin:
          "Demo bir necha filialni ko‘rsatadi. Maktabingizdagi filiallar sonini yozma taklifda kelishamiz.",
      },
      {
        question: "Mashinalarni GPS orqali kuzatish mumkinmi?",
        answerLogin:
          "Hozir demo xaritasiga GPS qurilmalari ulanmagan. Ulash imkoniyati va shartlarini jamoamiz bilan kelishish kerak.",
      },
      {
        question: "Hozirgi Excel va daftarlarimizdan qanday o‘tamiz?",
        answerLogin:
          "Ro‘yxatlaringizni birga ko‘rib chiqamiz. Qaysi ma’lumotlarni ko‘chirish va xodimlarni qanday o‘rgatishni sinovdan oldin kelishamiz.",
      },
      {
        question: "Kirish huquqlari qanday boshqariladi?",
        answerLogin:
          "Har bir xodim ishiga mos bo‘limlarni ko‘radi. Kimga qaysi kirish huquqi kerakligini ulashdan oldin birga tekshiramiz.",
      },
    ],
  },
  finalCta: {
    title: "Avtomaktabingiz holatini bir joyda ko‘ring.",
    demoButton: "Demoni ochish",
    trialButton: "Sinov so‘rash",
  },
  footer: {
    tagline: "avtomaktab boshqaruv tizimi",
    links: [
      { label: "Imkoniyatlar", href: "#yol" },
      { label: "Tariflar", href: "#tariflar" },
      { label: "Savollar", href: "#savollar" },
      { label: "Yangilanishlar", href: "/changelog" },
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
