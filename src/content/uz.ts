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
      pricing: string;
      faq: string;
    };
    login: string;
    demo: string;
    /** Visible label for the header CTA on very narrow screens; the full label stays its accessible name. */
    demoShort: string;
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
      "O‘quvchilar, to‘lovlar, qarzdorlik, dars jadvali va davomatni bir joyda boshqaring. Filiallar holatini ko‘ring va demoni ochib sinang.",
  },
  header: {
    logoText: "automaktab",
    logoDomain: ".uz",
    nav: {
      capabilities: "Imkoniyatlar",
      pricing: "Narx va sinov",
      faq: "Savollar",
    },
    login: "Kirish",
    demo: "Demoni ochish",
    demoShort: "Demo",
  },
  hero: {
    eyebrow: "Avtomaktab rahbarlari uchun",
    title: "Avtomaktabingiz holati. ",
    titleAccent: "Bir qarashda.",
    description:
      "Tushum, qarzdorlik va filiallar bir joyda.",
    lane1: {
      button: "Demoni ochish",
      helperLogin: "Demo: namuna maktab.",
      helperOneClick: "Demo: namuna maktab, parolsiz.",
    },
    lane2: {
      button: "Sinov so‘rash",
      helper: "Sinov: 14 kun.",
    },
  },
  proof: {
    title: "Tushum, qarzdorlik va filiallar bir ko‘rinishda.",
    caption: "Namuna ma’lumotlari. Haqiqiy mijozlarga tegishli emas.",
    callouts: [
      {
        number: 1,
        title: "O‘quvchilar qarzdorligi",
        description: "O‘quvchilarning jami qarzini ko‘ring.",
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
      debt: "O‘quvchilar qarzdorligi",
      branches: ["Filial A", "Filial B", "Filial C"],
      branchCaption: "Uch filialning bir davrdagi tushumi.",
    },
    registrar: {
      title: "O‘quvchilar va darslar",
      students: "O‘quvchilar ro‘yxati",
      group: "Guruh",
      schedule: "Dars vaqti",
      lesson: "Nazariya · Yo‘l harakati qoidalari",
    },
    teacher: {
      title: "Guruh davomati",
      lesson: "Nazariya darsi",
      marked: "o‘quvchi belgilangan",
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
      conversionLabel: "O‘quvchi kartasini ochish"
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
    botTitle: "automaktab.uz",
    botSub: "Hisobot namunasi · ma’lumotlar to‘qima",
    timeLabel: "08:00",
    headerTitle: "Kechagi kun hisoboti",
    dateLabel: "Namuna",
    revenueLabel: "Kun natijasi",
    revenueCollectedLabel: "Tushum",
    newStudentsLabel: "Yangi o‘quvchilar",
    branchLabel: "Filial",
    totalLabel: "Jami · 3 filial",
    currency: "so‘m",
    numberLocale: "uz-UZ",
    branches: [
      { name: "Chilonzor", revenue: 7200000, students: 4 },
      { name: "Yunusobod", revenue: 4600000, students: 3 },
      { name: "Sergeli", revenue: 3000000, students: 1 },
    ],
    sampleCaption: "Namuna. Hozir faqat jami tushum va yangi o‘quvchilar soni yuboriladi.",
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
    title: "Har bir o‘quvchining holati ko‘z oldingizda.",
    navPrevLabel: "Oldingi bosqich",
    navNextLabel: "Keyingi bosqich",
    trackAriaLabel: "O‘quvchi bosqichlari. Chap va o‘ng strelka tugmalari bilan tanlang.",
    previews: {
      student: {
        title: "O‘quvchi kartasi",
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
        columns: ["O‘quvchi", "Jami", "Qoldiq"],
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
        sub: "O‘quvchi kartasi",
        title: "O‘quvchi ma’lumotlari bir kartada.",
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
          "Guruhlar bo‘yicha haftalik jadvalni ko‘ring",
          "Har bir o‘quvchining davomatini belgilang",
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
          "Har bir o‘quvchining sinov natijalari",
        ],
        previewType: "examScreenshot",
      },
    ],
  },
  resources: {
    title: "Qabul, avtopark va ta’lim bir tizimda.",
    modules: [
      {
        kind: "leads",
        title: "Murojaatlar va qabul",
        description: "Manba, bosqich, mas’ul va keyingi aloqa.",
        points: [
          "Bosqich, manba va mas’ul",
          "Keyingi aloqa vaqti",
          "O‘quvchi kartasini yaratish"
        ]
      },
      {
        kind: "fleet",
        title: "Avtopark",
        description: "Mashina, instruktor, texnik xizmat va sug‘urta.",
        points: [
          "Mashina holati va instruktori",
          "Texnik xizmat va sug‘urta",
          "Yoqilg‘i qaydlari"
        ]
      },
      {
        kind: "education",
        title: "Ta’lim",
        description: "Darslar, davomat va ichki testlar.",
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
        "Yoqilg‘i, ta’mir va to‘lanmagan xarajatlar.",
    },
    teamCard: {
      badge: "Filiallar va jamoa",
      title: "Filial ko‘paysa ham nazorat sizda.",
      description:
        "Har bir xodimga ishiga mos kirish huquqi.",
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
  pricing: {
    eyebrow: "Narx va sinov",
    title: "Qaror qilishdan oldin maktabingizda sinang.",
    description:
      "Narx filial va o‘quvchilar soniga qarab hisoblanadi.",
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
      description: "14 kun, o‘z ma’lumotlaringiz bilan. Shartlar yozma; davom etishni o‘zingiz hal qilasiz.",
    },
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
          label: "O‘quvchilar soni",
          options: ["100 gacha", "100–500", "500–1500", "1500+"],
        },
        flows: {
          label: "Qaysi ishlarni yaxshilamoqchisiz?",
          options: [
            "O‘quvchilar",
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
          "Demo namuna ma’lumotlari bilan tanishish uchun. Sinovda maktabingiz ma’lumotlari bilan 14 kun ishlaysiz. Narx va cheklovlarni oldindan yozma kelishamiz.",
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
        question: "Excel’dan import qilsa bo‘ladimi?",
        answerLogin:
          "Tugma orqali emas. O‘quvchilar ro‘yxatini CSV fayl bilan birga ko‘chiramiz: ism, familiya, telefon va kurs turi, bitta faylda 10 000 tagacha. Guruh, narx va qarz qoldig‘i keyin o‘quvchi kartasida kiritiladi. To‘lovlar tarixi va xodimlar fayl orqali ko‘chirilmaydi.",
      },
      {
        question: "Kirish huquqlari qanday boshqariladi?",
        answerLogin:
          "Har bir xodim ishiga mos bo‘limlarni ko‘radi. O‘zgarishni kim va qachon qilgani audit tarixida qoladi. Kirish huquqlarini ulashdan oldin birga tekshiramiz.",
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
