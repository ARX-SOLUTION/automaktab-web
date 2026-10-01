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
    newStudentsLabel: string;
    newStudents: string;
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
      "Avtomaktabingizda kim qarzdor, qancha tushum bor va darslar qanday o‘tayotganini bir joyda ko‘ring. Rahbar panelini demoda sinab ko‘ring.",
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
    eyebrow: "AVTOMAKTAB RAHBARLARI UCHUN",
    title: "Avtomaktabingizdagi holat: ",
    titleAccent: "bir qarashda aniq.",
    description:
      "Kim qarzdor, qancha tushum bor, darslar qanday o‘tyapti? Xodimlardan alohida hisobot kutmay, barchasini bir joyda ko‘ring.",
    lane1: {
      button: "Demoni ochish",
      helperLogin: "Namuna maktabni demo login orqali ko‘ring.",
      helperOneClick: "Namuna maktabni parolsiz ochib ko‘ring.",
    },
    lane2: {
      button: "Sinov so‘rash",
      helper: "O‘z maktabingiz uchun sinov shartlarini kelishamiz.",
    },
    signTitle: "RAHBARNING KUNDALIK SAVOLLARI",
    signRows: [
      { arrow: "↑", title: "Kimning to‘lovi kechikdi?", sub: "To‘lov va qarzdorlik", stopIndex: 1 },
      { arrow: "←", title: "Kim darsga kelmadi?", sub: "Jadval va davomat", stopIndex: 2 },
      { arrow: "→", title: "Guruhda kimlar o‘qiyapti?", sub: "Talabalar va guruhlar", stopIndex: 0 },
      { arrow: "↱", title: "Kim qancha haydadi?", sub: "Amaliy haydash", stopIndex: 3 },
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
        description: "Qarzdorlar sonini darhol ko‘ring.",
        topPct: "23.2%",
        leftPct: "41%",
      },
      {
        number: 2,
        title: "Davr tushumi",
        description: "Tushumni xarajat va majburiyat bilan solishtiring.",
        topPct: "48%",
        leftPct: "36.5%",
      },
      {
        number: 3,
        title: "Filial kesimi",
        description: "Filiallar natijasini bir joyda solishtiring.",
        topPct: "71.5%",
        leftPct: "57%",
      },
    ],
  },
  morningReport: {
    eyebrow: "RAHBAR UCHUN TELEGRAM HISOBOTI",
    title: "Kun qanday o‘tganini ",
    titleAccent: "ertalab bilib oling.",
    description: "Telegram hisobotingizni yoqing. Har kuni 08:00 da kechagi tushum va yangi talabalar soni keladi.",
    botTitle: "automaktab.uz",
    botSub: "Hisobot namunasi · haqiqiy mijoz ma’lumoti emas",
    timeLabel: "08:00",
    headerTitle: "KECHAGI KUN XULOSASI",
    dateLabel: "Namuna",
    revenueLabel: "KUN NATIJASI",
    revenueCollectedLabel: "Tushum",
    revenueCollected: "14 800 000 so‘m",
    newStudentsLabel: "Yangi talabalar",
    newStudents: "8",
    bullets: ["Tushumni Telegram’da ko‘ring", "Yangi talabalar sonini biling", "Rahbar va filial menejeri uchun"],
    ctaButton: "Sinov so‘rash",
    trialNote: "Telegram’ni ulash va hisobotni yoqish kerak",
  },
  problem: {
    title: "Har bir raqamni xodimdan so‘rab yuribsizmi?",
    chips: [
      "To‘lovlar: Excelda",
      "Davomat: daftarda",
      "Hisobot: Telegramda",
      "Vazifalar: xotirada",
    ],
    bridge:
      "Tarqoq ma’lumotni yig‘ish vaqt oladi. Automaktab to‘lov, dars va filial holatini jamlaydi: qayerga e’tibor kerakligini ko‘rasiz.",
  },
  journey: {
    eyebrow: "QABULDAN IMTIHONGACHA",
    title: "Har bir talabaning holati ko‘z oldingizda.",
    interactiveCta: "Davomatni o‘zingiz belgilab ko‘ring ↓",
    navPrevLabel: "Oldingi bekat",
    navNextLabel: "Keyingi bekat",
    trackAriaLabel: "Bekatlar yo‘li: chap va o‘ng strelkalar bilan boshqarish mumkin",
    stops: [
      {
        number: 1,
        name: "Qabul",
        sub: "Talaba kartasi",
        title: "Talaba haqida ma’lumot izlab yurmang.",
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
          "Qarzdorlarni filial va guruhdan toping",
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
          "Keldi, kechikdi, kelmadi, uzrli",
          "Davomatni guruhlar bo‘yicha kuzating",
        ],
        previewType: "attendanceScreenshot",
      },
      {
        number: 4,
        name: "Amaliy",
        sub: "Haydash daqiqalari",
        title: "Haydash mashg‘ulotlari hisobini yo‘qotmang.",
        points: [
          "O‘tilgan va qolgan daqiqalarni ko‘ring",
          "Instruktor tasdig‘i",
          "Spidometr qaydi",
        ],
        previewType: "drivingCard",
      },
      {
        number: 5,
        name: "Imtihon",
        sub: "Test banki va natija",
        title: "Imtihonga tayyorgarlikni natijadan biling.",
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
    title: "Jamoa ishlaydi. Siz umumiy holatni ko‘rasiz.",
    questionEyebrow: "HAR KUNGI SAVOL",
    badge: "DEMO MA’LUMOTLARI",
    tabs: [
      {
        label: "Avtomaktab rahbari",
        question: "“Qancha tushum bor, kim qarzdor, filiallar qanday?”",
        answer:
          "Tushum, xarajat va qarzdorlikni solishtiring. Qaysi filialga e’tibor kerakligini raqamlardan ko‘ring.",
        modules: ["Rahbar paneli", "Moliya tahlili", "Filiallar solishtiruvi"],
        image: "/images/demo/dashboard.webp",
        imageAlt: "Rahbar paneli tahlili (namuna ma’lumotlari)",
        objectPosition: "35% 30%",
      },
      {
        label: "Filial menejeri",
        question: "“Bugun qaysi guruh darsda, haydash qaydlari qayerda?”",
        answer:
          "Bugungi darslar, davomat va haydash qaydlarini tekshiring. O‘qituvchilar bandligini jadvaldan ko‘ring.",
        modules: ["Dars jadvali", "Davomat jurnali", "Haydash vaqti nazorati"],
        image: "/images/demo/davomat.webp",
        imageAlt: "Dars jadvali va davomat oynasi (namuna ma’lumotlari)",
        objectPosition: "78% 40%",
      },
      {
        label: "Qabul xodimi",
        question: "“Talabani qanday tez topib, to‘lovini tekshiraman?”",
        answer:
          "Talabani qidiruvdan toping. Hujjati, guruhi va to‘lov holatini boshqa ro‘yxatdan izlamang.",
        modules: ["Talaba profili", "083 ma’lumotnoma", "To‘lov jadvali"],
        image: "/images/demo/talabalar.webp",
        imageAlt: "Talabalar reestri va qidiruv (namuna ma’lumotlari)",
        objectPosition: "100% 70%",
      },
      {
        label: "Buxgalter",
        question: "“Barcha filiallar va xarajatlar bir joydami?”",
        answer:
          "Filiallar tushumi va xarajatlarini tekshiring. To‘langan summalar bilan qolgan majburiyatlarni birga ko‘ring.",
        modules: ["Filial filtri", "Xarajatlar hisobi", "Amallar auditi"],
        image: "/images/demo/xarajatlar.webp",
        imageAlt: "Xarajatlar va filiallar tahlili (namuna ma’lumotlari)",
        objectPosition: "62% 40%",
      },
    ],
  },
  resources: {
    expenseCard: {
      badge: "XARAJAT VA AVTOPARK",
      title: "Pul nimaga ketayotganini ko‘ring.",
      description:
        "Yoqilg‘i, ta’mir va boshqa xarajatlarni kuzating. Qisman to‘lovlar va qolgan majburiyatlarni ajratib ko‘ring.",
      imageAlt: "Xarajatlar bo‘yicha kunlik qisqa hisobot (namuna ma’lumotlari)",
    },
    teamCard: {
      badge: "FILIAL VA JAMOA",
      title: "Filial ko‘paysa ham nazorat sizda.",
      description:
        "Xodimlarga vazifasiga mos kirish huquqini bering. Filiallar va instruktorlar hisobini bir tizimda yuriting.",
      stats: [
        { count: "3 ta", label: "filial" },
        { count: "8 ta", label: "instruktor" },
      ],
      sampleNote: "* Namuna maktabning filial va instruktorlari.",
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
    title: "Avval ko‘ring. Keyin maktabingizda sinang.",
    steps: [
      {
        number: "01",
        title: "Demoni ko‘ring",
        description: "Namuna maktabda qarzdorlar, tushum va davomatni o‘zingiz tekshirib ko‘ring.",
      },
      {
        number: "02",
        title: "Mosligini tekshiring",
        description: "Filiallaringiz, xodimlaringiz va hozirgi hisob yuritish tartibingizni birga ko‘rib chiqamiz.",
      },
      {
        number: "03",
        title: "Sinov so‘rang",
        description: "Ma’lumot ko‘chirish, jamoani o‘rgatish, sinov muddati va narxni boshlashdan oldin kelishamiz.",
      },
    ],
  },
  pricing: {
    eyebrow: "TARIF VA SINOV",
    title: "Qaror qilishdan oldin maktabingizda sinang.",
    description:
      "Filial va talabalar sonini ayting. Narx, sinov va ulash shartlarini yozma taklifda oling.",
    demoCard: {
      label: "NAMUNA KABINETI",
      badgeLogin: "login kerak",
      badgeOneClick: "bir bosishda",
      price: "0 so‘m",
      description: "Rahbar paneli, to‘lovlar va darslarni namuna ma’lumotlarda tekshiring.",
    },
    trialCard: {
      label: "MAKTABINGIZ UCHUN SINOV",
      badge: "Individual taklif",
      description: "O‘z maktabingiz ma’lumotlari bilan 30 kun sinang. Shartlarni boshlashdan oldin yozma kelishamiz.",
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
          label: "Qaysi ishlarni tartibga solmoqchisiz?",
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
        message: "Maktabingizdagi jarayonlar va sinov shartlarini kelishish uchun siz bilan bog‘lanamiz.",
        demoCta: "Demoni ochish",
        resetButton: "Yangi so‘rov yuborish",
      },
      networkError: "Aloqa uzildi. Iltimos, qayta urinib ko‘ring.",
      disclaimer: "Raqamingiz faqat sinov bo‘yicha bog‘lanish uchun ishlatiladi.",
    },
  },
  faq: {
    eyebrow: "SAVOLLAR",
    title: "Tizimga o‘tishdan oldingi savollar.",
    items: [
      {
        question: "Bu tizim rahbar sifatida menga nima beradi?",
        answerLogin:
          "Tushum, xarajat, qarzdorlik va darslar holatini bir joyda ko‘rasiz. Filiallarni solishtirib, qayerda to‘lovni tekshirish yoki davomatga e’tibor berish kerakligini aniqlaysiz.",
      },
      {
        question: "Demoga qanday kiraman?",
        answerLogin:
          "“Demoni ochish” tugmasi kirish sahifasini ochadi: demo email va parol talab qilinadi.",
        answerOneClick:
          "“Demoni ochish” tugmasi namuna kabinetini bir bosishda, parolsiz ochadi. Sessiya vaqtinchalik.",
      },
      {
        question: "Demo bilan sinovning farqi nima?",
        answerLogin:
          "Demo: namuna ma’lumotlar bilan tanishish uchun. Sinovda o‘z maktabingiz ma’lumotlari bilan ishlaysiz. Muddat, narx va cheklovlar yozma taklifda kelishiladi.",
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
        question: "Hozirgi Excel va daftarlarimizdan qanday o‘tamiz?",
        answerLogin:
          "Avval mavjud ro‘yxatlaringiz va ish tartibingizni ko‘rib chiqamiz. Qaysi ma’lumotlar ko‘chirilishi, import va xodimlarni o‘rgatish shartlarini sinovdan oldin kelishamiz.",
      },
      {
        question: "Kirish huquqlari qanday boshqariladi?",
        answerLogin:
          "Har bir xodim o‘z roliga mos bo‘limlarni ko‘radi. Rollar ro‘yxatini ulashdan oldin birga tekshiramiz.",
      },
    ],
  },
  finalCta: {
    title: "Bugungi holatni bilib, ertangi ishni rejalang.",
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
