import type { Locale } from '@/i18n/config';

export type ProductPillar =
  | 'fleet'
  | 'finance'
  | 'attendance'
  | 'schedule'
  | 'compliance'
  | 'crm';

export type ChangelogCategory = 'all' | 'feature' | 'improvement' | 'fix';

export interface ChangelogItem {
  id: string;
  version: string;
  releaseDate: string; // ISO format: YYYY-MM-DD
  pillar: ProductPillar;
  routeHint: string;
  isPlanned?: boolean;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  highlights: {
    features: Record<Locale, string[]>;
    improvements: Record<Locale, string[]>;
    fixes: Record<Locale, string[]>;
  };
  author: {
    name: string;
    role: Record<Locale, string>;
  };
}

export interface ChangelogCopy {
  skipLink: string;
  eyebrow: string;
  title: string;
  description: string;
  cadence: string;
  latestBadge: string;
  filterAll: string;
  filterFeatures: string;
  filterImprovements: string;
  filterFixes: string;
  searchPlaceholder: string;
  allPillars: string;
  pillarFleet: string;
  pillarFinance: string;
  pillarAttendance: string;
  pillarSchedule: string;
  pillarCompliance: string;
  pillarCrm: string;
  plannedBadge: string;
  labelFeatures: string;
  labelImprovements: string;
  labelFixes: string;
  emptyTitle: string;
  emptyBody: string;
  backHome: string;
  previewLabel: string;
  testedBadge: string;
  copyLink: string;
  linkCopied: string;
  demoNotice: string;
  tableOfContents: string;
}

export const CHANGELOG_COPY: Record<Locale, ChangelogCopy> = {
  uz: {
    skipLink: 'Asosiy kontentga o‘tish',
    eyebrow: 'Mahsulot Tarixi · Relizlar xronologiyasi',
    title: 'AutoDrive Relizlar Jurnali',
    description:
      'Platformamizning dastlabki arxitekturasidan boshlab barcha 12 ta rasmiy relizi va takomillashtirish tarixi.',
    cadence: 'Relizlar arxivi',
    latestBadge: 'Eng so‘nggi reliz',
    plannedBadge: 'Rejalashtirilmoqda (Kelajakda)',
    filterAll: 'Barchasi',
    filterFeatures: 'Yangi imkoniyatlar',
    filterImprovements: 'Yaxshilanishlar',
    filterFixes: 'Tuzatishlar',
    searchPlaceholder: 'Qidiruv...',
    allPillars: 'Barcha yo‘nalishlar',
    pillarFleet: 'Avtopark va Yoqilg‘i',
    pillarFinance: 'To‘lov va Xarajatlar',
    pillarAttendance: 'Davomat va Guruhlar',
    pillarSchedule: 'Dars Jadvali',
    pillarCompliance: 'Filial va Xavfsizlik',
    pillarCrm: 'CRM va Lidlar',
    labelFeatures: 'Yangi imkoniyatlar',
    labelImprovements: 'Yaxshilanishlar',
    labelFixes: 'Tuzatishlar',
    emptyTitle: 'Yangiliklar topilmadi',
    emptyBody: 'Kiritilgan qidiruv yoki filtr bo‘yicha mos keluvchi yangilanish topilmadi.',
    backHome: 'Bosh sahifaga qaytish',
    previewLabel: 'Interfeys ko‘rinishi',
    testedBadge: 'AutoDrive Engine · Tekshirilgan',
    copyLink: 'Havolani nusxalash',
    linkCopied: 'Nusxalandi',
    demoNotice: 'Eslatma: Namoyishdagi barcha summalar va talabalar soni demo ma’lumotidir.',
    tableOfContents: 'Relizlar',
  },
  ru: {
    skipLink: 'Перейти к основному содержимому',
    eyebrow: 'История продукта · Хронология релизов',
    title: 'Журнал релизов AutoDrive',
    description:
      'Хронология всех 12 официальных релизов платформы от базовой архитектуры до текущих модулей.',
    cadence: 'Архив релизов',
    latestBadge: 'Свежий релиз',
    plannedBadge: 'Запланировано (В разработке)',
    filterAll: 'Все',
    filterFeatures: 'Новые возможности',
    filterImprovements: 'Улучшения',
    filterFixes: 'Исправления',
    searchPlaceholder: 'Поиск...',
    allPillars: 'Все разделы',
    pillarFleet: 'Автопарк и топливо',
    pillarFinance: 'Платежи и расходы',
    pillarAttendance: 'Посещаемость и группы',
    pillarSchedule: 'Расписание занятий',
    pillarCompliance: 'Филиалы и аудит',
    pillarCrm: 'CRM и Лиды',
    labelFeatures: 'Новые возможности',
    labelImprovements: 'Улучшения',
    labelFixes: 'Исправления',
    emptyTitle: 'Обновлений не найдено',
    emptyBody: 'По вашему запросу или выбранному фильтру обновлений не найдено.',
    backHome: 'Вернуться на главную',
    previewLabel: 'Интерфейс',
    testedBadge: 'AutoDrive Engine · Проверено',
    copyLink: 'Копировать ссылку',
    linkCopied: 'Скопировано',
    demoNotice: 'Примечание: Все цифры и списки в демонстрационном кабинете являются тестовыми данными.',
    tableOfContents: 'Релизы',
  },
  en: {
    skipLink: 'Skip to main content',
    eyebrow: 'Product History · Release Chronology',
    title: 'AutoDrive Release Changelog',
    description:
      'Chronology of all 12 official releases from foundational architecture to active production modules.',
    cadence: 'Release archive',
    latestBadge: 'Latest release',
    plannedBadge: 'Planned (Future Roadmap)',
    filterAll: 'All',
    filterFeatures: 'New Features',
    filterImprovements: 'Improvements',
    filterFixes: 'Fixes',
    searchPlaceholder: 'Search...',
    allPillars: 'All pillars',
    pillarFleet: 'Fleet & Fuel',
    pillarFinance: 'Payments & Expenses',
    pillarAttendance: 'Attendance & Groups',
    pillarSchedule: 'Lesson Schedule',
    pillarCompliance: 'Branches & Audit',
    pillarCrm: 'CRM & Leads',
    labelFeatures: 'New Features',
    labelImprovements: 'Improvements',
    labelFixes: 'Fixes',
    emptyTitle: 'No updates found',
    emptyBody: 'No release notes match your current search query or filter criteria.',
    backHome: 'Back to homepage',
    previewLabel: 'Interface view',
    testedBadge: 'AutoDrive Engine · Verified',
    copyLink: 'Copy link',
    linkCopied: 'Copied',
    demoNotice: 'Notice: Figures and counts shown in demo environments represent synthetic sample data.',
    tableOfContents: 'Releases',
  },
};

export const CHANGELOG_ITEMS: ChangelogItem[] = [
  {
    id: 'release-3-0-0-planned',
    version: 'v3.0.0',
    releaseDate: '2026-10-15',
    pillar: 'crm',
    routeHint: 'app.automaktab.uz/crm',
    isPlanned: true,
    title: {
      uz: 'AutoDrive v3.0: CRM, To‘liq Talaba Kabineti va Moliyaviy Avtomatlashtirish Rejasi',
      ru: 'План AutoDrive v3.0: CRM, полный кабинет курсанта и финансовая автоматизация',
      en: 'AutoDrive v3.0 Roadmap: CRM, Student Cabinet & Financial Automation',
    },
    excerpt: {
      uz: 'Kelajakda tizimga qo‘shilishi rejalashtirilgan 52 ta strategik imkoniyat: Kanban lidlar voronkasi, avto-voronka, DOCX shartnomalar, instruktorlar dars jadvali setkasi, to‘qnashuv nazorati va Payme/Click to‘lovlari.',
      ru: '52 стратегические возможности следующего поколения: воронка лидов CRM, авто-воронка, конструктор договоров DOCX, сетка занятий с защитой от накладок и платежи Payme/Click.',
      en: '52 next-generation roadmap capabilities: Kanban lead pipeline, auto-messaging, DOCX contract generator, conflict-free instructor schedule, and Payme/Click payments.',
    },
    highlights: {
      features: {
        uz: [
          'Kanban lidlar voronkasi: Yangi, Ishga olindi, Sinov darsi va Shartnoma bosqichlari bo‘yicha konversiya analitikasi va muddat nazorati.',
          'Avto-voronka va trigger xabarlar: ma’lum muddat tegilmagan lidlarga avtomatik Telegram va SMS eslatmalar yuborish.',
          'Online yozilish vidjeti va UTM teglari: maktab veb-sayti va Telegram orqali lidlarni to‘g‘ridan-to‘g‘ri CRM ga integratsiya qilish.',
          'Shartnomalar moduli va bo‘lib to‘lash: DOCX shablonlar asosida generatsiya, 1 dan 3 gacha bosqichli to‘lov jadvali va SMS kodli online imzo.',
          'Talaba kartasida Custom Fields: talaba, instruktor va avtopark uchun moslashuvchan maydonlar va Excel/CSV formatida ommaviy import.',
          'Instruktor va soatlar interaktiv setkasi: vaqt va avtomobil ziddiyatlarini saqlashdan oldin ogohlantiruvchi to‘qnashuv nazorati.',
          'Talaba PWA kabineti va adaptiv YHQ trenajyori: YHXBB standartidagi testlar, darslar balansi va maktab bilan bevosita chat.',
          'Moliya va to‘lov tizimlari: naqd, karta va hisobraqam qoldiqlari, instruktorlar uchun avtomatlashtirilgan maosh sxemalari hamda Payme/Click integratsiyasi.',
          'Rol huquqlari matritsasi va xavfsizlik: direktor, o‘qituvchi, instruktor va operator uchun alohida ruxsatlar hamda 2FA himoyasi.',
        ],
        ru: [
          'Канбан-воронка лидов: этапы Новый, В работе, Пробный урок и Договор с аналитикой конверсии и контролем просрочек.',
          'Автоворонка и триггеры: автоматические уведомления в Telegram и SMS по лидам без касания.',
          'Виджет онлайн-записи и UTM-метки: приём заявок с сайта автошколы и Telegram напрямую в CRM.',
          'Модуль договоров и рассрочки: генерация по шаблонам DOCX, график платежей в 1–3 этапа и онлайн-подписание кодом.',
          'Кастомные поля и массовый импорт: настраиваемые параметры для курсантов, автопарка и импорт из Excel/CSV.',
          'Интерактивная сетка инструкторов: проверка конфликтов времени и автомобилей до сохранения занятий.',
          'PWA-кабинет курсанта и тренажёр ПДД: адаптивное тестирование по стандартам СБДД и чат с автошколой.',
          'Финансы и приём платежей: остатки по кассам, автоматический расчёт зарплат инструкторов и интеграция Payme/Click.',
          'Матрица прав доступа и безопасность: гранулярные роли для директора, преподавателя, инструктора и 2FA.',
        ],
        en: [
          'Kanban lead pipeline: New, In Progress, Trial Lesson, and Contract stages with conversion analytics and delay tracking.',
          'Automated drip triggers: automated Telegram and SMS follow-ups for leads without recent contact.',
          'Online booking widget and UTM tracking: capture inquiries from driving school websites and Telegram directly into CRM.',
          'Contracts module and installment schedules: DOCX template generation, 1 to 3 step payment plans, and SMS verification signing.',
          'Custom fields and batch import: configurable schema for students, instructors, vehicles, and bulk Excel/CSV ingestion.',
          'Instructor schedule matrix: visual calendar with proactive double-booking and vehicle conflict prevention.',
          'Student PWA cabinet and adaptive theory drills: official exam-standard mock tests and direct in-app messaging.',
          'Cash registers and payment gateways: cash, card, and bank balances, automated salary calculation, and Payme/Click checkout.',
          'Role permission matrix and security: fine-grained access control for director, teacher, instructor, and 2FA protection.',
        ],
      },
      improvements: {
        uz: [
          'Hujjat to‘liqlik indikatori: PINFL, pasport va 083 tibbiy ma’lumotnoma muddatlarini 30 kun oldin ogohlantirish.',
          'Avtopark texnik ko‘rigi va sug‘urta monitoringi: muddati tugayotgan transport vositalari bo‘yicha avtomatik eslatmalar.',
          'Maktabning tekshiruvga tayyorlik chek-listi va haydash jurnali PDF formatidagi hisoboti.',
        ],
        ru: [
          'Индикатор комплектности документов: контроль сроков ПИНФЛ, паспорта и медсправки 083 за 30 дней.',
          'Мониторинг техосмотра и страховок автопарка: предупреждения по истекающим срокам действия документов.',
          'Чек-лист готовности к проверкам и экспорт журнала вождения в формате PDF.',
        ],
        en: [
          'Document completeness indicator: 30-day proactive alerts for expiring medical certificates and identity records.',
          'Fleet technical inspection and insurance tracking: automated notifications for vehicles nearing inspection renewal.',
          'Regulatory compliance audit checklist and exportable driving lesson log in PDF format.',
        ],
      },
      fixes: {
        uz: [
          'Takroriy telefon raqamlarni aniqlash va yangi lidni mavjud kartaga faollik sifatida birlashtirish.',
          'Bitta avtomobilga ayni bir vaqtda ikkita amaliy dars belgilanishini backend darajasida qat’iy cheklash.',
        ],
        ru: [
          'Контроль дубликатов телефонов с автоматическим объединением в единую историю активности.',
          'Блокировка двойного бронирования одного учебного автомобиля на уровне сервера.',
        ],
        en: [
          'Duplicate phone number detection with automatic merging into existing customer activity logs.',
          'Strict server-level constraint preventing simultaneous overlapping sessions on the same vehicle.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Mahsulot Arxitekturasi va Rejalar',
        ru: 'Архитектура продукта и планы',
        en: 'Product Architecture & Roadmap',
      },
    },
  },
  {
    id: 'release-2-4-0',
    version: 'v2.4.0',
    releaseDate: '2026-09-28',
    pillar: 'fleet',
    routeHint: 'app.automaktab.uz/vehicle-fuel',
    title: {
      uz: 'Avtopark Yoqilg‘i Sarfi Nazorati va Amaliy Haydash Seanslari Qaydi',
      ru: 'Учёт расхода топлива автопарка и фиксация сеансов практического вождения',
      en: 'Fleet Fuel Consumption Tracking & Practical Driving Session Records',
    },
    excerpt: {
      uz: 'Avtoparkdagi 36 ta mashina uchun yoqilg‘i sarfi jurnali, texnik ko‘rik hujjatlari va amaliy haydash seanslarida 600/1200 daqiqalik me’yor balansi joriy etildi.',
      ru: 'Внедрён журнал расхода топлива для 36 автомобилей автопарка, контроль техосмотра и фиксация баланса 600/1200 минут практического вождения.',
      en: 'Introduced fuel consumption records for 36 fleet vehicles, technical inspection tracking, and 600/1200 minute practical driving balances.',
    },
    highlights: {
      features: {
        uz: [
          'Yoqilg‘i sarfi jurnali: Har bir avtomobil bo‘yicha yoqilg‘i turi (benzin, gaz), xarajat summasi va sanasini alohida qayd etish.',
          'Amaliy haydash balansi: O‘quv dasturidagi 600 va 1200 daqiqalik mashg‘ulot me’yori bo‘yicha talabaning qolgan daqiqa balansini ko‘rsatish.',
          'Texnik ko‘rik holati: Sug‘urta va texnik ko‘rik muddati yaqinlashgan avtomobillarni status filtri orqali ajratish.',
        ],
        ru: [
          'Журнал учёта топлива: раздельная фиксация типа топлива (бензин, газ), суммы заправки и даты по каждому автомобилю.',
          'Баланс практических занятий: отслеживание остатка нормативных 600 и 1200 минут вождения в карточке курсанта.',
          'Контроль техосмотра: фильтрация автомобилей с истекающими сроками техосмотра и страховки.',
        ],
        en: [
          'Fuel Tracking Log: Distinct records for fuel type (petrol, gas), fill-up cost, and date per vehicle.',
          'Practical Driving Balance: Track remaining minutes against the 600 and 1200-minute curriculum requirements.',
          'Vehicle Inspection Tracking: Identify vehicles with upcoming insurance and inspection deadlines via status filters.',
        ],
      },
      improvements: {
        uz: [
          'Kuzatuv xaritasi sahifasida GPS qurilmalari ulanmaganligi va integratsiya rejasi haqida aniq ogohlantirish ko‘rsatildi.',
          'Avtomobil toifasi (B, BC, C) va filial bo‘yicha saralash tezligi oshirildi.',
        ],
        ru: [
          'На странице карты автопарка добавлено понятное уведомление о статусе подключения GPS-трекеров (в разработке).',
          'Оптимизирована фильтрация автопарка по филиалам и категориям транспортных средств.',
        ],
        en: [
          'Added an explicit status notice on the fleet map page clarifying that live GPS tracking is in development.',
          'Accelerated vehicle filtering by branch and license category.',
        ],
      },
      fixes: {
        uz: [
          'Yoqilg‘i kiritish oynasida odometr ko‘rsatkichi manfiy kiritilishi cheklandi.',
          'Haydash seansi saqlanganda instruktor ismi bo‘sh qolishi holati tuzatildi.',
        ],
        ru: [
          'Заблокирован ввод отрицательных значений одометра в форме заправки.',
          'Исправлена ошибка сохранения сеанса вождения без указания назначенного инструктора.',
        ],
        en: [
          'Prevented accidental negative odometer submissions in the fuel entry form.',
          'Fixed an edge case where driving sessions could be submitted without an assigned instructor.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Avtopark va amaliyot bo‘limi',
        ru: 'Отдел автопарка и практики',
        en: 'Fleet & Practical Operations',
      },
    },
  },
  {
    id: 'release-2-3-1',
    version: 'v2.3.1',
    releaseDate: '2026-09-14',
    pillar: 'finance',
    routeHint: 'app.automaktab.uz/expenses',
    title: {
      uz: 'Xarajatlar Reestri va Oylik To‘lov Majburiyatlari Tahlili',
      ru: 'Реестр расходов и учёт ежемесячных финансовых обязательств',
      en: 'Expense Register & Monthly Financial Obligations Analysis',
    },
    excerpt: {
      uz: 'Avtomaktab xarajatlari (ijara, kommunal, o‘qituvchi hisob-kitobi) reestri, to‘langan va qolgan summalar hamda kunlik qisqa hisobot paneli ishga tushirildi.',
      ru: 'Запущен реестр расходов автошколы (аренда, коммунальные услуги, расчёты с преподавателями), учёт остатка задолженности и сводка.',
      en: 'Launched school expense tracking (rent, utilities, teacher settlements), unpaid balance indicators, and daily executive summaries.',
    },
    highlights: {
      features: {
        uz: [
          'Kategoriyalar bo‘yicha xarajatlar: Ijara, kommunal xizmatlar, ma’muriy va transport xarajatlarini alohida bandlarda yuritish.',
          'Kunlik qisqa hisobot: Yaqinda to‘lanadigan, muddati o‘tgan va kutilayotgan majburiyatlarni 4 ta blokda ko‘rsatish.',
          'Mening hisob-kitoblarim sahifasi: Xodimlar va o‘qituvchilar bilan o‘zaro hisob-kitob qoldiqlarini kuzatish.',
        ],
        ru: [
          'Категоризация расходов: раздельный учёт аренды, коммунальных платежей, административных и транспортных затрат.',
          'Ежедневная сводка обязательств: 4 наглядных блока для срочных, просроченных и ожидаемых платежей.',
          'Раздел взаиморасчётов: контроль начислений и выплат преподавательскому составу.',
        ],
        en: [
          'Categorized Expenses: Independent ledger rows for rent, utilities, administrative overhead, and transport.',
          'Daily Obligations Summary: 4 key KPI blocks detailing due, overdue, and pending payment liabilities.',
          'Staff Settlements View: Dedicated ledger tracking payouts and balances with instructors and teachers.',
        ],
      },
      improvements: {
        uz: [
          'Xarajatlar jadvalida filiallar kesimi bo‘yicha saralash filtri qo‘shildi.',
        ],
        ru: [
          'Добавлен быстрый фильтр реестра расходов в разрезе действующих филиалов.',
        ],
        en: [
          'Added a branch-level filter to the central expense ledger.',
        ],
      },
      fixes: {
        uz: [
          'Xarajat qo‘shish oynasida sana formati noto‘g‘ri kiritilganda yuzaga keladigan xatolik bartaraf etildi.',
        ],
        ru: [
          'Устранена ошибка при вводе даты расхода в нестандартном формате.',
        ],
        en: [
          'Resolved an input validation error occurring with non-standard date formats in the expense dialog.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Moliya va buxgalteriya bo‘limi',
        ru: 'Отдел финансов и бухгалтерии',
        en: 'Finance & Accounting Team',
      },
    },
  },
  {
    id: 'release-2-3-0',
    version: 'v2.3.0',
    releaseDate: '2026-09-01',
    pillar: 'attendance',
    routeHint: 'app.automaktab.uz/attendance',
    title: {
      uz: 'Davomat Oynasi va 4 Ta Holat Bo‘yicha Qatnashuv Nazorati',
      ru: 'Журнал посещаемости и контроль присутствия по 4 статусам',
      en: 'Attendance Modal & 4-State Lesson Participation Tracking',
    },
    excerpt: {
      uz: 'Darslar ro‘yxatidan bevosita 23 talabalik davomat oynasini ochish, har bir o‘quvchiga Keldi, Kech, Kelmadi yoki Uzrli statusini biriktirish imkoniyati yaratildi.',
      ru: 'Появилась возможность открывать окно отметки посещаемости из списка занятий с фиксацией 4 статусов: Присутствовал, Опоздал, Отсутствовал, Уважительная причина.',
      en: 'Enables launching the 23-student attendance sheet directly from lesson cards with 4 clear statuses: Present, Late, Absent, and Excused.',
    },
    highlights: {
      features: {
        uz: [
          'Davomat oynasi: Har bir dars uchun guruh talabalari ro‘yxatini bitta qulay oynada ochib, bir necha soniyada davomatni belgilash.',
          'To‘rtta aniq status: Keldi, Kech, Kelmadi va Uzrli holatlarini semantik ranglar bilan qayd etish.',
          'Talaba kartasida davomat tarixi: O‘quvchi profilida qaysi darslarga qatnashgani va sababli qoldirgan soatlarini to‘liq ko‘rish.',
        ],
        ru: [
          'Окно быстрой отметки: список курсантов группы открывается в модальном окне для быстрой фиксации явки.',
          'Четыре статуса явки: цветовая индикация для статусов Присутствовал, Опоздал, Отсутствовал и Уважительная причина.',
          'История посещений в профиле: полный лог посещённых и пропущенных занятий внутри карточки учащегося.',
        ],
        en: [
          'Quick Attendance Modal: Opens the cohort roster in a modal sheet for fast attendance marking.',
          'Four Distinct States: Clear semantic badges for Present, Late, Absent, and Excused attendance statuses.',
          'Historical Attendance Log: Full log of attended and missed class hours accessible within the student profile.',
        ],
      },
      improvements: {
        uz: [
          'Kelgusi darslar bo‘yicha saralash va qidiruv animatsiyasi yaxshilandi.',
        ],
        ru: [
          'Улучшена фильтрация и анимация переключения предстоящих уроков.',
        ],
        en: [
          'Improved filtering transitions across upcoming scheduled classes.',
        ],
      },
      fixes: {
        uz: [
          'Davomat saqlangandan so‘ng jadvaldagi dars kartochkasi rangi darhol yangilanmaslik xatosi tuzatildi.',
        ],
        ru: [
          'Исправлена задержка обновления цвета карточки урока в расписании после сохранения явки.',
        ],
        en: [
          'Fixed a delay in calendar card status updates following attendance confirmation.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Ta’lim texnologiyalari bo‘limi',
        ru: 'Отдел образовательных технологий',
        en: 'Education Tech Team',
      },
    },
  },
  {
    id: 'release-2-2-0',
    version: 'v2.2.0',
    releaseDate: '2026-08-15',
    pillar: 'schedule',
    routeHint: 'app.automaktab.uz/schedule',
    title: {
      uz: 'Haftalik Dars Jadvali, Nazariya va Amaliyot Taqsimoti',
      ru: 'Еженедельное расписание занятий, распределение теории и вождения',
      en: 'Weekly Class Schedule, Theory & Practical Session Distribution',
    },
    excerpt: {
      uz: 'Haftalik kalendar ko‘rinishi, nazariy va amaliy mashg‘ulotlarni ajratish, standart shablonlar asosida yangi darslarni rejalashtirish vositasi ishga tushirildi.',
      ru: 'Запущен еженедельный календарь занятий с разделением на теорию и практику, а также конструктор уроков по типовым шаблонам.',
      en: 'Launched the weekly class calendar distinguishing theoretical and practical sessions, complete with template-based scheduling.',
    },
    highlights: {
      features: {
        uz: [
          'Haftalik kalendar: Dushanbadan yakshanbagacha bo‘lgan barcha guruhlar dars grafigini yagona jadvalda ko‘rish.',
          'Nazariya va Amaliyot ajratilishi: Turli rangdagi dars kartochkalari orqali xonalar va avtomobillar bandligini tushunish.',
          'Shablonlar bo‘yicha dars yaratish: Takrorlanuvchi haftalik o‘quv soatlarini bir marta sozlab, barcha haftalarga nusxalash.',
        ],
        ru: [
          'Еженедельная сетка: единый обзор занятий всех групп автошколы с понедельника по воскресенье.',
          'Разделение теории и практики: визуальное различие аудиторных пар и занятий на автодроме.',
          'Создание по шаблонам: быстрое тиражирование повторяющихся учебных часов на будущие недели.',
        ],
        en: [
          'Weekly Schedule Grid: Consolidated view of all active cohort sessions from Monday to Sunday.',
          'Theory vs Practical Distinction: Visual badge differentiation for classroom lectures and driving practice.',
          'Template-Driven Creation: Fast replication of recurring weekly lesson hours into subsequent weeks.',
        ],
      },
      improvements: {
        uz: [
          'Jadval bo‘sh bo‘lgan haftada foydalanuvchiga yaqin kelgusi dars sanasiga o‘tish tugmasi qo‘shildi.',
        ],
        ru: [
          'При отсутствии занятий на выбранной неделе добавлена кнопка быстрого перехода к ближайшему активному уроку.',
        ],
        en: [
          'Added a shortcut button to jump to the nearest active class when viewing an empty calendar week.',
        ],
      },
      fixes: {
        uz: [
          'Mobil qurilmalarda hafta kunlari qatorining chetga chiqib ketishi moslashtirildi.',
        ],
        ru: [
          'Исправлено отображение дней недели на узких экранах мобильных устройств.',
        ],
        en: [
          'Fixed day header overflow on compact mobile screen viewports.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Ta’lim texnologiyalari bo‘limi',
        ru: 'Отдел образовательных технологий',
        en: 'Education Tech Team',
      },
    },
  },
  {
    id: 'release-2-1-2',
    version: 'v2.1.2',
    releaseDate: '2026-07-28',
    pillar: 'attendance',
    routeHint: 'app.automaktab.uz/students',
    title: {
      uz: 'Talaba Kartasi, Guruhlar Tarixi va Excel Eksport Imkoniyati',
      ru: 'Карточка курсанта, история обучения в группах и экспорт в Excel',
      en: 'Student Profile Cards, Cohort History & Excel Registry Export',
    },
    excerpt: {
      uz: 'O‘quvchi shaxsiy kartasida to‘lovlar, imtihonlar, davomat va guruh tarixi tablari birlashtirildi hamda ro‘yxatlarni Excel formatida yuklab olish qo‘shildi.',
      ru: 'В единой карточке учащегося объединены вкладки оплат, экзаменов, посещаемости и истории групп с выгрузкой в Excel.',
      en: 'Consolidated student profile tabs for payments, exams, attendance, and cohort transfers with Excel registry export.',
    },
    highlights: {
      features: {
        uz: [
          'Talaba kartasidagi tablar: To‘lovlar tarixi, qoldiq qarz, imtihon ballari va darslarga qatnashuv foizi bitta sahifada.',
          'Guruhlar reestri: 200 tagacha o‘quv guruhlarini toifalar (B, BC, C) va filiallar bo‘yicha boshqarish.',
          'Excelga eksport: Talabalar va guruhlar ro‘yxatini hisobot topshirish uchun 1 ta bosishda Excel faylga yuklab olish.',
        ],
        ru: [
          'Вкладки профиля курсанта: история платежей, остаток долга, оценки за экзамены и посещаемость на одной странице.',
          'Реестр групп: организация учебных потоков по категориям (B, BC, C) и филиалам автошколы.',
          'Экспорт в Excel: скачивание списков курсантов и ведомостей для отчётности в один клик.',
        ],
        en: [
          'Student Profile Tabs: Payment records, debt status, exam grades, and attendance metrics within a unified profile.',
          'Cohort Registry: Manage driving school groups filtered by vehicle category (B, BC, C) and branch.',
          'Excel Export: One-click export of student rosters and groups for administrative and regulatory filings.',
        ],
      },
      improvements: {
        uz: [
          'Talabalar ro‘yxatida familiya, ism yoki telefon raqami bo‘yicha bir zumda qidirish joriy etildi.',
        ],
        ru: [
          'Внедрён быстрый поиск курсантов по фамилии, имени или номеру телефона.',
        ],
        en: [
          'Implemented instant student lookups by full name or contact phone number.',
        ],
      },
      fixes: {
        uz: [
          'Telefon raqami kiritishda xalqaro format prefiksi yo‘qolib qolishi bartaraf etildi.',
        ],
        ru: [
          'Исправлен сброс международного телефонного кода при быстром вводе номера.',
        ],
        en: [
          'Corrected phone input mask behavior preserving the international country code.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Mijozlar bilan ishlash bo‘limi',
        ru: 'Отдел работы с клиентами',
        en: 'Customer Success Team',
      },
    },
  },
  {
    id: 'release-2-1-0',
    version: 'v2.1.0',
    releaseDate: '2026-07-10',
    pillar: 'finance',
    routeHint: 'app.automaktab.uz/payments',
    title: {
      uz: 'To‘lovlar Reestri, Qarzdorlik KPI va Filiallararo Tushumlar',
      ru: 'Реестр платежей, KPI задолженности и выручка филиалов',
      en: 'Payments Ledger, Receivables KPI & Multi-Branch Revenue',
    },
    excerpt: {
      uz: 'Har bir to‘lovni kassa yoki bank orqali qayd etish, qarzdor talabalarni birinchi navbatda ajratish va umumiy tushum monitoringi taqdim etildi.',
      ru: 'Учёт оплат через кассу и банк, оперативное выявление курсантов с задолженностью и сводный мониторинг выручки.',
      en: 'Track tuition payments across cash and bank channels, flag indebted students, and monitor consolidated revenue.',
    },
    highlights: {
      features: {
        uz: [
          'To‘lovlar reestri: Har bir kiritilgan to‘lov sanasi, talaba ismi, kursi, to‘langan summa va qoldiq qarzni ko‘rsatuvchi reestr.',
          'Qarzdorlik filtri: To‘lov muddatini o‘tkazib yuborgan talabalarni qizil indikator bilan alohida saralash.',
          'Filiallar bo‘yicha tushum: Har bir filial qancha mablag‘ qabul qilganini taqqoslovchi moliyaviy blok.',
        ],
        ru: [
          'Реестр платежей: прозрачная таблица с датой, именем курсанта, курсом, внесённой суммой и остатком задолженности.',
          'Фильтр задолженности: быстрый отбор курсантов с неоплаченными периодами обучения.',
          'Выручка по филиалам: наглядное сравнение поступлений между филиалами автошколы.',
        ],
        en: [
          'Payments Ledger: Transparent table showing payment date, student name, course, paid amount, and outstanding debt.',
          'Receivables Filter: Instantly isolate students with overdue tuition balances via dedicated filter tags.',
          'Branch Revenue Comparison: Financial summary comparing revenue intake across all driving school locations.',
        ],
      },
      improvements: {
        uz: [
          'Katta hajmdagi to‘lovlar ro‘yxatini yuklash va sahifalash tezligi oshirildi.',
        ],
        ru: [
          'Оптимизирована постраничная навигация по объёмным реестрам платежей.',
        ],
        en: [
          'Optimized pagination and rendering performance for large payment logs.',
        ],
      },
      fixes: {
        uz: [
          'To‘lov qoldig‘i nolga teng bo‘lganda qarz statusi avtomatik To‘liq deb belgilanishi ta’minlandi.',
        ],
        ru: [
          'Обеспечена автоматическая смена статуса на Оплачено при нулевом остатке задолженности.',
        ],
        en: [
          'Ensured payment status automatically reflects Paid in Full when the outstanding balance reaches zero.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Moliya va integratsiyalar bo‘limi',
        ru: 'Отдел финансов и интеграций',
        en: 'Finance & Integrations Team',
      },
    },
  },
  {
    id: 'release-2-0-0',
    version: 'v2.0.0',
    releaseDate: '2026-06-01',
    pillar: 'compliance',
    routeHint: 'app.automaktab.uz/branches',
    title: {
      uz: 'AutoDrive 2.0: Ko‘p Filialli Boshqaruv va Audit Jurnali',
      ru: 'AutoDrive 2.0: Мультифилиальное управление и журнал аудита',
      en: 'AutoDrive 2.0: Multi-Branch Management & Audit Trail Engine',
    },
    excerpt: {
      uz: 'Bir nechta filiallarni yagona tizimda boshqarish, xodimlar rollari (operator, o‘qituvchi, menejer) va tizimdagi barcha amallarni qayd etuvchi audit jurnali ishga tushirildi.',
      ru: 'Централизованное управление несколькими филиалами автошколы, распределение ролей сотрудников и журнал фиксации всех действий.',
      en: 'Centralized management across multiple driving school branches, role-based staff assignments, and a tamper-proof audit trail.',
    },
    highlights: {
      features: {
        uz: [
          'Filiallar boshqaruvi: Bosh rahbar uchun barcha filiallar tushumi, o‘quvchilar soni va xodimlar tarkibini yagona oynada ko‘rish.',
          'Xodimlar va rollar: Operatorlar, o‘qituvchilar va tizim foydalanuvchilariga tegishli vazifalarni biriktirish.',
          'Audit jurnali: Tizimda kim, qachon va qaysi yozuvni (talaba, to‘lov, dars) o‘zgartirganini aniq ko‘rsatuvchi xavfsizlik jurnali.',
        ],
        ru: [
          'Управление филиалами: единый обзор ключевых показателей всех филиалов для руководителя автошколы.',
          'Сотрудники и роли: разделение рабочих зон для операторов, преподавателей и управляющих.',
          'Журнал аудита: фиксация автора, времени и сущности каждого изменения в системе.',
        ],
        en: [
          'Multi-Branch Workspace: Consolidated view for the school owner tracking all locations, cohorts, and staff.',
          'Staff Roles: Clearly segregated operational scopes for operators, teachers, and system administrators.',
          'Audit Log: Complete transparency recording who modified which record (student, payment, lesson) and when.',
        ],
      },
      improvements: {
        uz: [
          'Barcha modullar uchun yagona qorong‘i va yorug‘ dizayn mavzulari uyg‘unlashtirildi.',
        ],
        ru: [
          'Синхронизированы светлая и тёмная темы оформления во всех разделах интерфейса.',
        ],
        en: [
          'Synchronized light and dark themes across every functional view of the workspace.',
        ],
      },
      fixes: {
        uz: [
          'Filiallar o‘rtasida o‘tganda aktiv menyu bandi saqlanmay qolishi to‘g‘rilandi.',
        ],
        ru: [
          'Исправлено сохранение активного пункта меню при переключении между филиалами.',
        ],
        en: [
          'Resolved an issue where active sidebar state was disrupted during branch switching.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Mahsulot va arxitektura bo‘limi',
        ru: 'Отдел продукта и архитектуры',
        en: 'Product & Architecture Team',
      },
    },
  },
  {
    id: 'release-1-9-0',
    version: 'v1.9.0',
    releaseDate: '2026-05-12',
    pillar: 'fleet',
    routeHint: 'app.automaktab.uz/vehicle-inspections',
    title: {
      uz: 'Avtomobillar Texnik Ko‘rigi va Hujjatlar Muddati Monitoringi',
      ru: 'Техосмотр автомобилей и мониторинг сроков действия документов',
      en: 'Vehicle Inspection Logs & Document Expiration Monitoring',
    },
    excerpt: {
      uz: 'Avtomobillarning majburiy texnik ko‘rik jurnali, sug‘urta polislari hamda gaz ballonlarini sinovdan o‘tkazish muddatlari nazorati yo‘lga qo‘yildi.',
      ru: 'Запущен журнал регулярного техосмотра, учёт полисов ОСГО и сроков поверки автомобильных газовых баллонов.',
      en: 'Launched mandatory vehicle inspection records, insurance policy tracking, and compressed gas cylinder re-test reminders.',
    },
    highlights: {
      features: {
        uz: [
          'Texnik ko‘rik jurnali: Har bir transport vositasi uchun o‘tkazilgan tekshiruv sanasi, natijasi va mas’ul mexanik qaydi.',
          'Muddati tugayotgan hujjatlar filtri: Sug‘urta yoki texnik ko‘rik muddati tugashiga 15 kun qolgan mashinalarni saralash.',
        ],
        ru: [
          'Журнал техосмотра: дата прохождения, результат проверки и подпись ответственного механика по каждой машине.',
          'Фильтр сроков действия: отбор автомобилей с полисами или техосмотрами, истекающими в ближайшие 15 дней.',
        ],
        en: [
          'Inspection Registry: Date, outcome, and responsible mechanic notes documented per vehicle.',
          'Expiring Document Filters: Filter vehicles with insurance or inspection deadlines occurring within 15 days.',
        ],
      },
      improvements: {
        uz: [
          'Avtomobil pasporti ma’lumotlarini ko‘rish oynasi soddalashtirildi.',
        ],
        ru: [
          'Упрощено окно детального просмотра паспорта транспортного средства.',
        ],
        en: [
          'Streamlined vehicle specification overview dialog.',
        ],
      },
      fixes: {
        uz: [
          'Gaz balloni muddati kiritilmaganda yuzaga keladigan forma xatosi tuzatildi.',
        ],
        ru: [
          'Исправлен сбой формы при пустом поле даты поверки газового баллона.',
        ],
        en: [
          'Fixed a form submission bug when cylinder certification dates were omitted.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Avtopark bo‘limi',
        ru: 'Отдел автопарка',
        en: 'Fleet Operations Team',
      },
    },
  },
  {
    id: 'release-1-8-0',
    version: 'v1.8.0',
    releaseDate: '2026-04-20',
    pillar: 'fleet',
    routeHint: 'app.automaktab.uz/fuel-stations',
    title: {
      uz: 'Yoqilg‘i Shoxobchalari Boshqaruvi va Narxlar Qaydi',
      ru: 'Управление АЗС/АГНКС и реестр тарифов на топливо',
      en: 'Fuel Station Directory & Refueling Cost Registry',
    },
    excerpt: {
      uz: 'Avtomaktab bilan shartnoma tuzgan yoqilg‘i shoxobchalari ro‘yxati, benzin va gaz narxlari monitoringi hamda talonlar hisobi joriy etildi.',
      ru: 'Добавлен справочник партнёрских заправочных станций (АЗС/АГНКС), мониторинг стоимости литра/кубометра и учёт талонов.',
      en: 'Introduced partner filling station directories, unit fuel pricing logs, and prepaid fuel coupon administration.',
    },
    highlights: {
      features: {
        uz: [
          'Shoxobchalar ro‘yxati: Avtomaktab doimiy yonilg‘i oladigan punktlar manzili va to‘lov shartlari reestri.',
          'O‘rtacha narx hisobi: Filiallar bo‘yicha yoqilg‘i sarfining o‘rtacha birlik narxini avtomatik chiqarish.',
        ],
        ru: [
          'Справочник станций: перечень партнёрских заправок с контактными данными и условиями оплаты.',
          'Средняя цена топлива: автоматический расчёт средневзвешенной стоимости литра бензина и кубометра газа.',
        ],
        en: [
          'Station Directory: Partner refueling outlets with addresses and corporate billing contracts.',
          'Average Fuel Cost Computation: Automatically derive weighted average fuel prices per branch.',
        ],
      },
      improvements: {
        uz: [
          'Yoqilg‘i stansiyalari bo‘yicha tezkor qidiruv qo‘shildi.',
        ],
        ru: [
          'Добавлен быстрый поиск по списку заправочных станций.',
        ],
        en: [
          'Added instant search for the fuel station registry.',
        ],
      },
      fixes: {
        uz: [
          'Yoqilg‘i turi almashtirilganda o‘lchov birligi (litr va m³) chalkashishi to‘g‘rilandi.',
        ],
        ru: [
          'Исправлена смена единиц измерения (литры и м³) при переключении типа горючего.',
        ],
        en: [
          'Corrected unit metric toggling between liters and cubic meters.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Avtopark bo‘limi',
        ru: 'Отдел автопарка',
        en: 'Fleet Operations Team',
      },
    },
  },
  {
    id: 'release-1-7-0',
    version: 'v1.7.0',
    releaseDate: '2026-03-25',
    pillar: 'attendance',
    routeHint: 'app.automaktab.uz/school-tests',
    title: {
      uz: 'Maktab Testlari va Nazariy Imtihon Savollari Banki',
      ru: 'Внутришкольные тесты и банк экзаменационных вопросов ПДД',
      en: 'In-House Testing Engine & Traffic Law Question Bank',
    },
    excerpt: {
      uz: 'Talabalar bilimini tekshirish uchun yo‘l harakati qoidalari savollar banki, oraliq va yakuniy ichki imtihonlarni tashkil qilish moduli yaratildi.',
      ru: 'Создан модуль промежуточных и итоговых экзаменов по ПДД с банком вопросов для проверки готовности курсантов.',
      en: 'Built an internal examination module featuring traffic law question banks for midterm and final student assessments.',
    },
    highlights: {
      features: {
        uz: [
          'Savollar banki: Yo‘l belgilari, chorrahalar va xavfsizlik qoidalari bo‘yicha tizimli savollar reestri.',
          'Ichki test natijalari: Har bir talabaning imtihon bali va to‘g‘ri javoblar foizini talaba profiliga bog‘lash.',
        ],
        ru: [
          'Банк вопросов: структурированный каталог билетов по дорожным знакам, перекрёсткам и правилам безопасности.',
          'Ведомость тестирования: фиксация набранных баллов и процента правильных ответов в личном деле курсанта.',
        ],
        en: [
          'Question Repository: Structured question catalog covering traffic signals, intersections, and road safety.',
          'Test Scorecard: Direct linkage of student test scores and accuracy ratios to their central profile.',
        ],
      },
      improvements: {
        uz: [
          'Test savollarini rasmlar bilan ko‘rsatish tezligi optimallashtirildi.',
        ],
        ru: [
          'Оптимизирована скорость загрузки иллюстраций к экзаменационным билетам.',
        ],
        en: [
          'Optimized image rendering for visual road sign question cards.',
        ],
      },
      fixes: {
        uz: [
          'Bir nechta javobli savollarda ball hisoblashdagi noaniqlik tuzatildi.',
        ],
        ru: [
          'Исправлен подсчёт баллов в вопросах с несколькими правильными вариантами.',
        ],
        en: [
          'Resolved a scoring calculation bug in multi-choice test questions.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Ta’lim texnologiyalari bo‘limi',
        ru: 'Отдел образовательных технологий',
        en: 'Education Tech Team',
      },
    },
  },
  {
    id: 'release-1-6-0',
    version: 'v1.6.0',
    releaseDate: '2026-03-02',
    pillar: 'schedule',
    routeHint: 'app.automaktab.uz/training-programs',
    title: {
      uz: 'O‘quv Dasturlari Standartlari va Talabalarni Ro‘yxatga Olish',
      ru: 'Стандарты учебных программ и зачисление курсантов',
      en: 'Curriculum Standards & Student Cohort Enrollment',
    },
    excerpt: {
      uz: 'Davlat ta’lim talablari bo‘yicha nazariya va amaliyot soatlari me’yorlarini belgilash hamda talabalarni o‘quv dasturiga rasmiylashtirish moduli kiritildi.',
      ru: 'Внедрён модуль нормирования часов теории и практики согласно госстандартам и зачисления курсантов на программы обучения.',
      en: 'Introduced curriculum hour standards for classroom and road training, along with official student program enrollment.',
    },
    highlights: {
      features: {
        uz: [
          'O‘quv dasturlari reestri: B, BC va C toifalari uchun nazariy soatlar va amaliy daqiqalar standartini sozlash.',
          'Ro‘yxatga olish oqimi: Talabani tanlangan o‘quv dasturiga biriktirish va o‘qish boshlanish muddatini qayd qilish.',
        ],
        ru: [
          'Реестр программ: настройка нормативных часов теории и минут вождения для категорий B, BC и C.',
          'Поток зачисления: закрепление учащегося за выбранным учебным планом с фиксацией даты старта потока.',
        ],
        en: [
          'Curriculum Catalog: Configure required theoretical hours and driving minutes for license categories B, BC, and C.',
          'Enrollment Flow: Seamlessly assign candidates to curricula with recorded induction dates.',
        ],
      },
      improvements: {
        uz: [
          'Dastur tanlash jarayonida to‘lov rejasini oldindan ko‘rish imkoniyati qo‘shildi.',
        ],
        ru: [
          'Добавлен предварительный расчёт стоимости курса при выборе образовательной программы.',
        ],
        en: [
          'Added estimated cost preview during curriculum selection.',
        ],
      },
      fixes: {
        uz: [
          'O‘quv dasturi almashtirilganda mashg‘ulot daqiqa balansi noto‘g‘ri hisoblanishi tuzatildi.',
        ],
        ru: [
          'Исправлен пересчёт минут вождения при смене учебной программы курсанта.',
        ],
        en: [
          'Corrected driving minute balance recalculations when transferring between curricula.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Ta’lim texnologiyalari bo‘limi',
        ru: 'Отдел образовательных технологий',
        en: 'Education Tech Team',
      },
    },
  },
  {
    id: 'release-1-5-0',
    version: 'v1.5.0',
    releaseDate: '2026-02-10',
    pillar: 'compliance',
    routeHint: 'app.automaktab.uz/teachers',
    title: {
      uz: 'O‘qituvchilar va Operatorlar Shaxsiy Ish Maydoni',
      ru: 'Рабочие места преподавателей и операторов филиалов',
      en: 'Dedicated Workspaces for Instructors & Front-Desk Operators',
    },
    excerpt: {
      uz: 'O‘qituvchi va instruktorlar ro‘yxati, biriktirilgan avtomobillar, operatorlarning kundalik talaba qabul qilish jurnali alohida bo‘limlarga ajratildi.',
      ru: 'Сформированы специализированные реестры преподавателей, инструкторов с привязанными машинами и операторов приёма.',
      en: 'Introduced dedicated workspaces for instructors with assigned training cars, and intake logs for front-desk operators.',
    },
    highlights: {
      features: {
        uz: [
          'O‘qituvchilar kabineti: O‘qituvchining malaka toifasi, unga biriktirilgan guruhlar va amaliyot mashinalari reestri.',
          'Operatorlar boshqaruvi: Yangi talabalarni ro‘yxatdan o‘tkazuvchi xodimlar faoliyati monitoringi.',
        ],
        ru: [
          'Реестр преподавателей: квалификационные категории, закреплённые группы и автомобили инструкторов.',
          'Рабочее место оператора: учёт действий сотрудников приёмной комиссии по оформлению новых курсантов.',
        ],
        en: [
          'Instructor Directory: Qualification credentials, assigned student cohorts, and dedicated training vehicles.',
          'Operator Administration: Monitor front-desk administrative activities during new student onboarding.',
        ],
      },
      improvements: {
        uz: [
          'Xodimlar ro‘yxatida telefon va filial filtri qo‘shildi.',
        ],
        ru: [
          'Добавлены фильтры сотрудников по контактному номеру и филиалу.',
        ],
        en: [
          'Added staff filters by phone number and assigned branch location.',
        ],
      },
      fixes: {
        uz: [
          'Instruktor biriktirilganda avtomobil dublikat paydo bo‘lishi muammosi bartaraf etildi.',
        ],
        ru: [
          'Устранено появление дубликатов автомобилей при закреплении за несколькими инструкторами.',
        ],
        en: [
          'Prevented duplicate vehicle listings when assigning cars to multiple driving instructors.',
        ],
      },
    },
    author: {
      name: 'AutoDrive Core Team',
      role: {
        uz: 'Xodimlar va xavfsizlik bo‘limi',
        ru: 'Отдел кадров и безопасности',
        en: 'Staff & Security Team',
      },
    },
  },
];
