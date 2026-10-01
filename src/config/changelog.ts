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
    skipLink: 'Asosiy qismga o‘tish',
    eyebrow: 'Tizim yangilanishlari',
    title: 'automaktab.uz yangilanishlari',
    description:
      'Yangi imkoniyatlar, yaxshilanishlar va tuzatilgan xatolar. Rejadagi imkoniyatlar alohida belgilangan.',
    cadence: 'Yangilanishlar tarixi',
    latestBadge: 'So‘nggi yangilanish',
    plannedBadge: 'Rejada',
    filterAll: 'Barchasi',
    filterFeatures: 'Yangi imkoniyatlar',
    filterImprovements: 'Yaxshilanishlar',
    filterFixes: 'Tuzatishlar',
    searchPlaceholder: 'Yangilanishlarni qidirish',
    allPillars: 'Barcha yo‘nalishlar',
    pillarFleet: 'Avtopark va yoqilg‘i',
    pillarFinance: 'To‘lov va xarajatlar',
    pillarAttendance: 'Davomat va guruhlar',
    pillarSchedule: 'Dars jadvali',
    pillarCompliance: 'Filiallar va kirish huquqlari',
    pillarCrm: 'Murojaatlar va qabul',
    labelFeatures: 'Yangi imkoniyatlar',
    labelImprovements: 'Yaxshilanishlar',
    labelFixes: 'Tuzatishlar',
    emptyTitle: 'Mos yangilanish topilmadi',
    emptyBody: 'Boshqa so‘z bilan qidiring yoki filtrni o‘zgartiring.',
    backHome: 'Bosh sahifaga qaytish',
    previewLabel: 'Namuna ko‘rinish',
    testedBadge: 'Namuna ma’lumotlari',
    copyLink: 'Havolani nusxalash',
    linkCopied: 'Nusxalandi',
    demoNotice: 'Ko‘rinishlardagi summalar va talabalar soni namuna uchun berilgan.',
    tableOfContents: 'Yangilanishlar',
  },
  ru: {
    skipLink: 'Перейти к основному содержимому',
    eyebrow: 'Обновления системы',
    title: 'Обновления automaktab.uz',
    description:
      'Новые возможности, улучшения и исправления. Запланированные возможности отмечены отдельно.',
    cadence: 'История обновлений',
    latestBadge: 'Последнее обновление',
    plannedBadge: 'В планах',
    filterAll: 'Все',
    filterFeatures: 'Новые возможности',
    filterImprovements: 'Улучшения',
    filterFixes: 'Исправления',
    searchPlaceholder: 'Найти обновление',
    allPillars: 'Все разделы',
    pillarFleet: 'Автопарк и топливо',
    pillarFinance: 'Оплаты и расходы',
    pillarAttendance: 'Посещаемость и группы',
    pillarSchedule: 'Расписание занятий',
    pillarCompliance: 'Филиалы и права доступа',
    pillarCrm: 'Заявки и приём',
    labelFeatures: 'Новые возможности',
    labelImprovements: 'Улучшения',
    labelFixes: 'Исправления',
    emptyTitle: 'Подходящих обновлений нет',
    emptyBody: 'Попробуйте другое слово или измените фильтр.',
    backHome: 'Вернуться на главную',
    previewLabel: 'Пример',
    testedBadge: 'Вымышленные данные',
    copyLink: 'Копировать ссылку',
    linkCopied: 'Скопировано',
    demoNotice: 'Суммы и количество курсантов в примерах вымышлены.',
    tableOfContents: 'Обновления',
  },
  en: {
    skipLink: 'Skip to main content',
    eyebrow: 'Product updates',
    title: 'automaktab.uz updates',
    description:
      'New features, improvements and fixes. Planned features are marked separately.',
    cadence: 'Update history',
    latestBadge: 'Latest update',
    plannedBadge: 'Planned',
    filterAll: 'All',
    filterFeatures: 'New features',
    filterImprovements: 'Improvements',
    filterFixes: 'Fixes',
    searchPlaceholder: 'Search updates',
    allPillars: 'All sections',
    pillarFleet: 'Fleet and fuel',
    pillarFinance: 'Payments and expenses',
    pillarAttendance: 'Attendance and groups',
    pillarSchedule: 'Lesson schedule',
    pillarCompliance: 'Branches and access',
    pillarCrm: 'Inquiries and enrollment',
    labelFeatures: 'New features',
    labelImprovements: 'Improvements',
    labelFixes: 'Fixes',
    emptyTitle: 'No matching updates',
    emptyBody: 'Try a different search term or change the filter.',
    backHome: 'Back to homepage',
    previewLabel: 'Sample view',
    testedBadge: 'Sample data',
    copyLink: 'Copy link',
    linkCopied: 'Copied',
    demoNotice: 'Amounts and student counts in these examples are sample data.',
    tableOfContents: 'Updates',
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
      uz: 'Rejada: qabul va moliya imkoniyatlari',
      ru: 'В планах: приём и финансовый учёт',
      en: 'Planned: admissions and financial tools',
    },
    excerpt: {
      uz: 'Rejada 52 ta imkoniyat: murojaatlar bilan ishlash, xabarlar, DOCX shartnomalar, haydash jadvali va Payme/Click to‘lovlari.',
      ru: 'В планах 52 возможности: работа с заявками, сообщения, договоры DOCX, расписание вождения и оплаты Payme/Click.',
      en: '52 planned features: inquiry tracking, messages, DOCX contracts, driving schedules and Payme/Click payments.',
    },
    highlights: {
      features: {
        uz: [
          'Qabul bosqichlari: Yangi, Ish jarayonida, Sinov darsi va Shartnoma. Natijalar va aloqa muddatlarini kuzatish.',
          'Avtomatik eslatmalar: uzoq vaqt bog‘lanilmagan murojaatlarga Telegram va SMS xabarlari.',
          'Sayt va Telegram’dan arizalar qabul qilish, reklama manbasini UTM belgilari orqali kuzatish.',
          'DOCX shablonlardan shartnoma yaratish, 1–3 bosqichli to‘lov jadvali va SMS kod bilan imzolash.',
          'Talaba, instruktor va mashina kartalarida qo‘shimcha maydonlar. Excel/CSV’dan ma’lumot ko‘chirish.',
          'Instruktor jadvali: bir vaqtga ikki dars yoki bir mashinani ikki darsga belgilashdan oldin ogohlantirish.',
          'Talaba kabineti: ichki YHQ testlari, qolgan darslar va maktab bilan yozishmalar. Davlat imtihoni emas.',
          'Naqd, karta va bank hisobidagi mablag‘lar, instruktor maoshi hisobi va Payme/Click orqali to‘lov.',
          'Xodimlar uchun alohida kirish huquqlari va ikki bosqichli himoya (2FA).',
        ],
        ru: [
          'Этапы приёма: новая заявка, в работе, пробное занятие и договор. Учёт результатов и сроков связи.',
          'Автоматические напоминания в Telegram и SMS по заявкам, с которыми давно не связывались.',
          'Приём заявок с сайта и Telegram. Учёт источника рекламы по UTM-меткам.',
          'Договоры по шаблонам DOCX, график оплат в 1–3 этапа и подпись через SMS-код.',
          'Дополнительные поля в карточках курсантов, инструкторов и машин. Перенос данных из Excel/CSV.',
          'Расписание инструкторов: предупреждение о совпадении времени занятий или занятости машины до сохранения.',
          'Кабинет курсанта: внутренние тесты ПДД, остаток занятий и переписка со школой. Это не государственный экзамен.',
          'Учёт наличных, карты и банковского счёта, расчёт зарплаты инструкторов и оплаты Payme/Click.',
          'Права доступа по задачам сотрудников и двухэтапная защита (2FA).',
        ],
        en: [
          'Admissions stages: new inquiry, in progress, trial lesson and contract. Track results and follow-up deadlines.',
          'Automatic Telegram and SMS reminders for inquiries without recent contact.',
          'Receive inquiries from the school website and Telegram. Track advertising sources with UTM tags.',
          'Create contracts from DOCX templates, schedule 1–3 payment stages and sign using an SMS code.',
          'Additional fields for students, instructors and vehicles. Transfer data from Excel/CSV.',
          'Instructor schedules: warn about overlapping lessons or vehicle bookings before saving.',
          'Student account: internal road rules tests, remaining lessons and school messages. These are not state exams.',
          'Cash, card and bank balances, instructor pay calculations and Payme/Click payments.',
          'Staff access permissions and two-step security (2FA).',
        ],
      },
      improvements: {
        uz: [
          'Hujjatlar to‘liqligi va muddatlari: JShShIR, pasport va 083 ma’lumotnoma uchun 30 kun oldin ogohlantirish.',
          'Texnik ko‘rik va sug‘urta muddati yaqinlashgan mashinalar bo‘yicha eslatmalar.',
          'Tekshiruvga tayyorgarlik ro‘yxati va haydash jurnalini PDF shaklida yuklab olish.',
        ],
        ru: [
          'Проверка документов: ПИНФЛ, паспорт и медсправка 083 с предупреждением за 30 дней.',
          'Напоминания о сроках техосмотра и страховки автомобилей.',
          'Список подготовки к проверкам и журнал вождения в PDF.',
        ],
        en: [
          'Document checks with 30-day alerts for medical certificates and identity records.',
          'Reminders for vehicle inspection and insurance deadlines.',
          'Inspection preparation checklist and driving lesson log in PDF.',
        ],
      },
      fixes: {
        uz: [
          'Takroriy telefon raqamlarini aniqlash va murojaatni mavjud talaba tarixiga qo‘shish.',
          'Bir mashinaga bir vaqtda ikkita haydash darsi belgilashni cheklash.',
        ],
        ru: [
          'Поиск повторных телефонных номеров и объединение обращений в существующую историю.',
          'Запрет двух одновременных занятий на одном автомобиле.',
        ],
        en: [
          'Find duplicate phone numbers and merge inquiries into the existing contact history.',
          'Prevent two simultaneous driving lessons on the same vehicle.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Yoqilg‘i va haydash mashg‘ulotlari hisobi',
      ru: 'Учёт топлива и занятий по вождению',
      en: 'Fuel records and driving lessons',
    },
    excerpt: {
      uz: 'Namuna avtopark: 36 ta mashina. Yoqilg‘i va texnik ko‘rik hisobi, haydash mashg‘ulotlarida 600/1200 daqiqa balansi qo‘shildi.',
      ru: 'Добавлены учёт топлива и техосмотра для вымышленного автопарка из 36 машин, а также баланс 600/1200 минут вождения.',
      en: 'Fuel and inspection records added for a sample fleet of 36 vehicles, plus 600/1200-minute driving practice balances.',
    },
    highlights: {
      features: {
        uz: [
          'Har bir mashina uchun yoqilg‘i turi, sarflangan summa va sanani qayd etish.',
          'O‘quv dasturidagi 600 va 1200 daqiqaga nisbatan qancha haydash vaqti qolganini ko‘rish.',
          'Sug‘urta va texnik ko‘rik muddati yaqinlashgan mashinalarni saralash.',
        ],
        ru: [
          'Журнал учёта топлива: раздельная фиксация типа топлива (бензин, газ), суммы заправки и даты по каждому автомобилю.',
          'Баланс практических занятий: отслеживание остатка нормативных 600 и 1200 минут вождения в карточке курсанта.',
          'Контроль техосмотра: фильтрация автомобилей с истекающими сроками техосмотра и страховки.',
        ],
        en: [
          'Record fuel type, fill-up cost and date for each vehicle.',
          'See remaining driving time against the programme’s 600 and 1200-minute requirements.',
          'Filter vehicles with upcoming insurance and inspection deadlines.',
        ],
      },
      improvements: {
        uz: [
          'Xaritada GPS qurilmalari ulanmagani va ulash rejada ekanini ko‘rsatuvchi eslatma qo‘shildi.',
          'Mashinalarni B, BC, C toifasi va filial bo‘yicha saralash tezlashtirildi.',
        ],
        ru: [
          'На карте добавлено уведомление: GPS-устройства не подключены, подключение запланировано.',
          'Ускорена фильтрация машин по филиалам и категориям.',
        ],
        en: [
          'The map now states that GPS devices are not connected and connection is planned.',
          'Vehicle filtering by branch and licence category was made faster.',
        ],
      },
      fixes: {
        uz: [
          'Yoqilg‘i kiritishda manfiy odometr ko‘rsatkichini yozish cheklandi.',
          'Haydash mashg‘uloti instruktorsiz saqlanib qolishi tuzatildi.',
        ],
        ru: [
          'Заблокирован ввод отрицательных показаний одометра при заправке.',
          'Исправлено сохранение занятия по вождению без назначенного инструктора.',
        ],
        en: [
          'Blocked negative odometer readings in fuel entries.',
          'Fixed driving lessons being saved without an assigned instructor.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Xarajatlar va to‘lanmagan summalar',
      ru: 'Расходы и суммы к оплате',
      en: 'Expenses and unpaid balances',
    },
    excerpt: {
      uz: 'Ijara, kommunal xizmatlar va o‘qituvchilar hisob-kitobi qo‘shildi. To‘langan va qolgan summalar, kunlik qisqa xulosa bir joyda.',
      ru: 'Добавлен учёт аренды, коммунальных расходов и расчётов с преподавателями. Оплаченные суммы, остатки и краткая сводка видны вместе.',
      en: 'Added rent, utility and teacher payment records. Paid amounts, unpaid balances and a daily summary are shown together.',
    },
    highlights: {
      features: {
        uz: [
          'Ijara, kommunal, ma’muriy va transport xarajatlarini alohida toifalarda yuritish.',
          'Yaqinda to‘lanadigan, muddati o‘tgan va kutilayotgan summalarni 4 ta blokda ko‘rish.',
          'Xodim va o‘qituvchilar bilan hisob-kitobda qancha to‘langanini va qancha qolganini ko‘rish.',
        ],
        ru: [
          'Категоризация расходов: раздельный учёт аренды, коммунальных платежей, административных и транспортных затрат.',
          'Ежедневная сводка обязательств: 4 наглядных блока для срочных, просроченных и ожидаемых платежей.',
          'Раздел взаиморасчётов: контроль начислений и выплат преподавательскому составу.',
        ],
        en: [
          'Record rent, utilities, administration and transport expenses by category.',
          'See due, overdue and upcoming payments in 4 summary blocks.',
          'Track paid amounts and remaining balances for instructors and teachers.',
        ],
      },
      improvements: {
        uz: [
          'Xarajatlarni filial bo‘yicha saralash filtri qo‘shildi.',
        ],
        ru: [
          'Добавлен фильтр расходов по филиалам.',
        ],
        en: [
          'Added a branch filter to expense records.',
        ],
      },
      fixes: {
        uz: [
          'Xarajat sanasi noto‘g‘ri formatda kiritilganda yuzaga keladigan xato tuzatildi.',
        ],
        ru: [
          'Устранена ошибка при вводе даты расхода в нестандартном формате.',
        ],
        en: [
          'Fixed errors caused by an incorrect expense date format.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Davomat jurnali va 4 ta holat',
      ru: 'Журнал посещаемости и 4 статуса',
      en: 'Attendance register with 4 status choices',
    },
    excerpt: {
      uz: 'Dars ro‘yxatidan davomat oynasini ochish qo‘shildi. Namuna guruhda 23 talaba: keldi, kechikdi, kelmadi yoki uzrli.',
      ru: 'Добавлена отметка посещаемости из списка занятий: пришёл, опоздал, не пришёл или пропустил по уважительной причине.',
      en: 'Added attendance marking from lesson cards. The sample group has 23 students, with present, late, absent and excused choices.',
    },
    highlights: {
      features: {
        uz: [
          'Guruh ro‘yxatini darsdan ochib, har bir talabaning davomatini belgilash.',
          'Keldi, kechikdi, kelmadi va uzrli holatlarini alohida ranglar bilan ko‘rsatish.',
          'Talaba kartasida qatnashgan va qoldirgan darslar tarixini ko‘rish.',
        ],
        ru: [
          'Открывайте список группы из занятия и отмечайте каждого курсанта.',
          'Четыре статуса с разными цветами: пришёл, опоздал, не пришёл и уважительная причина.',
          'Смотрите посещённые и пропущенные занятия в карточке курсанта.',
        ],
        en: [
          'Open the group list from a lesson and mark each student.',
          'Four colour-coded choices: present, late, absent and excused.',
          'See attended and missed lessons on the student record.',
        ],
      },
      improvements: {
        uz: [
          'Kelgusi darslarni saralash va ular orasida o‘tish yaxshilandi.',
        ],
        ru: [
          'Улучшена фильтрация и анимация переключения предстоящих уроков.',
        ],
        en: [
          'Improved filtering and switching between upcoming lessons.',
        ],
      },
      fixes: {
        uz: [
          'Davomat saqlanganda jadvaldagi dars rangi kech yangilanishi tuzatildi.',
        ],
        ru: [
          'Исправлена задержка обновления цвета карточки урока в расписании после сохранения посещаемости.',
        ],
        en: [
          'Fixed delayed lesson status updates after saving attendance.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Haftalik jadval: nazariya va haydash',
      ru: 'Недельное расписание: теория и вождение',
      en: 'Weekly schedules for theory and driving',
    },
    excerpt: {
      uz: 'Haftalik kalendar qo‘shildi. Nazariya va haydash mashg‘ulotlarini ajrating, shablonlardan yangi darslar yarating.',
      ru: 'Добавлен недельный календарь. Различайте теорию и вождение, создавайте новые занятия по шаблонам.',
      en: 'Added a weekly calendar. Separate theory and driving lessons and create new lessons from templates.',
    },
    highlights: {
      features: {
        uz: [
          'Dushanbadan yakshanbagacha barcha guruhlarning darslarini bir jadvalda ko‘rish.',
          'Dars ranglari orqali nazariya, haydash, xona va mashina bandligini ajratish.',
          'Haftalik darslarni shablondan yaratish va keyingi haftalarga nusxalash.',
        ],
        ru: [
          'Смотрите занятия всех групп с понедельника по воскресенье в одном расписании.',
          'Различайте теорию и вождение по цветам занятий.',
          'Создавайте занятия по шаблону и копируйте их на следующие недели.',
        ],
        en: [
          'See all groups’ lessons from Monday to Sunday in one schedule.',
          'Distinguish theory and driving practice by lesson colours.',
          'Create lessons from templates and copy them to future weeks.',
        ],
      },
      improvements: {
        uz: [
          'Bo‘sh haftadan eng yaqin darsga o‘tish tugmasi qo‘shildi.',
        ],
        ru: [
          'Добавлена кнопка перехода к ближайшему занятию из пустой недели.',
        ],
        en: [
          'Added a button to reach the nearest lesson from an empty week.',
        ],
      },
      fixes: {
        uz: [
          'Telefonda hafta kunlari ekran chetiga chiqib ketishi tuzatildi.',
        ],
        ru: [
          'Исправлено отображение дней недели на узких экранах мобильных устройств.',
        ],
        en: [
          'Fixed weekday headings extending beyond narrow phone screens.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Talaba kartasi va Excelga yuklab olish',
      ru: 'Карточка курсанта и выгрузка в Excel',
      en: 'Student records and Excel downloads',
    },
    excerpt: {
      uz: 'To‘lov, imtihon, davomat va guruh tarixi talaba kartasida birlashtirildi. Ro‘yxatlarni Excelga yuklab olish qo‘shildi.',
      ru: 'Оплаты, экзамены, посещаемость и история групп собраны в карточке курсанта. Добавлена выгрузка списков в Excel.',
      en: 'Payments, exams, attendance and group history brought together on the student record. Added Excel downloads for lists.',
    },
    highlights: {
      features: {
        uz: [
          'To‘lov tarixi, qolgan qarz, imtihon ballari va davomat bir kartada.',
          'B, BC, C toifasi va filial bo‘yicha guruhlarni boshqarish.',
          'Talabalar va guruhlar ro‘yxatini 1 bosishda Excelga yuklab olish.',
        ],
        ru: [
          'История оплат, остаток долга, результаты экзаменов и посещаемость в одной карточке.',
          'Группы по категориям B, BC, C и филиалам.',
          'Скачивайте списки курсантов и групп в Excel одним нажатием.',
        ],
        en: [
          'Payment history, outstanding debt, exam results and attendance on one record.',
          'Manage groups by licence category (B, BC, C) and branch.',
          'Download student and group lists to Excel in one click.',
        ],
      },
      improvements: {
        uz: [
          'Talabalarni ism, familiya yoki telefon orqali tez qidirish qo‘shildi.',
        ],
        ru: [
          'Внедрён быстрый поиск курсантов по фамилии, имени или номеру телефона.',
        ],
        en: [
          'Added quick student search by name or phone number.',
        ],
      },
      fixes: {
        uz: [
          'Telefon kiritishda xalqaro kod yo‘qolib qolishi tuzatildi.',
        ],
        ru: [
          'Исправлен сброс международного телефонного кода при быстром вводе номера.',
        ],
        en: [
          'Fixed the phone input losing its international country code.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'To‘lovlar, qarzdorlik va filiallar tushumi',
      ru: 'Оплаты, задолженность и поступления филиалов',
      en: 'Payments, student debt and branch revenue',
    },
    excerpt: {
      uz: 'Naqd yoki bank orqali to‘lovlarni qayd etish qo‘shildi. Qarzdorlar va barcha filiallar tushumini bir joyda ko‘ring.',
      ru: 'Добавлен учёт наличных и банковских оплат. Задолженность курсантов и поступления всех филиалов видны в одном месте.',
      en: 'Added records for cash and bank payments. See student debt and revenue across branches in one place.',
    },
    highlights: {
      features: {
        uz: [
          'To‘lov sanasi, talaba, kurs, to‘langan summa va qolgan qarz bir ro‘yxatda.',
          'To‘lov muddati o‘tgan talabalarni alohida saralash.',
          'Har bir filial tushumini alohida ko‘rish va solishtirish.',
        ],
        ru: [
          'Дата оплаты, курсант, курс, внесённая сумма и остаток долга в одной таблице.',
          'Отдельный список курсантов с просроченной оплатой.',
          'Сравнивайте поступления разных филиалов.',
        ],
        en: [
          'Payment date, student, course, paid amount and outstanding debt in one list.',
          'Filter students with overdue payments.',
          'Compare revenue across branches.',
        ],
      },
      improvements: {
        uz: [
          'Katta to‘lov ro‘yxatlarini yuklash va sahifalar orasida o‘tish tezlashtirildi.',
        ],
        ru: [
          'Оптимизирована постраничная навигация по объёмным реестрам платежей.',
        ],
        en: [
          'Made large payment lists load and paginate faster.',
        ],
      },
      fixes: {
        uz: [
          'Qarz nol bo‘lganda to‘lov holati To‘langan deb yangilanadi.',
        ],
        ru: [
          'Обеспечена автоматическая смена статуса на Оплачено при нулевом остатке задолженности.',
        ],
        en: [
          'Payment status now changes to Paid in full when the debt reaches zero.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Filiallar, xodimlar va o‘zgarishlar tarixi',
      ru: 'Филиалы, сотрудники и история изменений',
      en: 'Branches, staff and change history',
    },
    excerpt: {
      uz: 'Filiallarni bir tizimda boshqarish qo‘shildi. Xodimlar rollari va talaba, to‘lov, dars yozuvlaridagi o‘zgarishlar tarixi ko‘rinadi.',
      ru: 'Добавлено управление филиалами в одной системе, роли сотрудников и история изменений в записях курсантов, оплат и занятий.',
      en: 'Added shared branch management, staff roles and change history for student, payment and lesson records.',
    },
    highlights: {
      features: {
        uz: [
          'Rahbar barcha filiallar tushumi, talabalar soni va xodimlarini bir joyda ko‘radi.',
          'Qabul xodimi, o‘qituvchi va menejerga ishiga mos bo‘limlar.',
          'Talaba, to‘lov yoki darsni kim va qachon o‘zgartirganini ko‘rish.',
        ],
        ru: [
          'Руководитель видит результаты всех филиалов на одной панели.',
          'Разделы для сотрудников приёмной, преподавателей и менеджеров по их задачам.',
          'Смотрите, кто и когда изменил запись о курсанте, оплате или занятии.',
        ],
        en: [
          'Owners see branch results, student groups and staff in one place.',
          'Staff see the sections needed for their work.',
          'See who changed a student, payment or lesson record and when.',
        ],
      },
      improvements: {
        uz: [
          'Bo‘limlarda yorug‘ va qorong‘i mavzular bir xil tartibga keltirildi.',
        ],
        ru: [
          'Синхронизированы светлая и тёмная темы оформления во всех разделах интерфейса.',
        ],
        en: [
          'Aligned light and dark themes across the system.',
        ],
      },
      fixes: {
        uz: [
          'Filial almashtirganda tanlangan menyu bandi saqlanmay qolishi tuzatildi.',
        ],
        ru: [
          'Исправлено сохранение активного пункта меню при переключении между филиалами.',
        ],
        en: [
          'Fixed the selected menu item changing when switching branches.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Texnik ko‘rik va hujjatlar muddati',
      ru: 'Техосмотр и сроки документов',
      en: 'Vehicle inspections and document deadlines',
    },
    excerpt: {
      uz: 'Texnik ko‘rik, sug‘urta va gaz balloni sinov muddatlarini qayd etish hamda kuzatish qo‘shildi.',
      ru: 'Добавлен учёт техосмотра, страховок и сроков проверки газовых баллонов автомобилей.',
      en: 'Added vehicle inspection records and tracking for insurance and gas cylinder test deadlines.',
    },
    highlights: {
      features: {
        uz: [
          'Har bir mashina uchun tekshiruv sanasi, natijasi va mas’ul mexanik qaydi.',
          'Sug‘urta yoki texnik ko‘rik muddati 15 kunda tugaydigan mashinalarni saralash.',
        ],
        ru: [
          'Дата техосмотра, результат и запись ответственного механика по каждой машине.',
          'Фильтр машин со страховкой или техосмотром, срок которых истекает в ближайшие 15 дней.',
        ],
        en: [
          'Record the inspection date, result and mechanic’s notes for each vehicle.',
          'Filter vehicles with insurance or inspection deadlines within 15 days.',
        ],
      },
      improvements: {
        uz: [
          'Mashina pasporti ma’lumotlarini ko‘rish oynasi soddalashtirildi.',
        ],
        ru: [
          'Упрощено окно детального просмотра паспорта транспортного средства.',
        ],
        en: [
          'Simplified the vehicle details window.',
        ],
      },
      fixes: {
        uz: [
          'Gaz balloni sinov sanasi bo‘sh bo‘lganda forma xatosi tuzatildi.',
        ],
        ru: [
          'Исправлен сбой формы при пустом поле даты поверки газового баллона.',
        ],
        en: [
          'Fixed form errors when the gas cylinder test date was left empty.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Yoqilg‘i shoxobchalari va narxlar',
      ru: 'Заправочные станции и цены',
      en: 'Fuel stations and prices',
    },
    excerpt: {
      uz: 'Maktab ishlaydigan yoqilg‘i shoxobchalari, benzin va gaz narxlari hamda talonlar hisobi qo‘shildi.',
      ru: 'Добавлен список заправок, с которыми работает автошкола, учёт цен на бензин и газ, а также топливных талонов.',
      en: 'Added a list of the school’s fuel stations, petrol and gas price records, and fuel coupon tracking.',
    },
    highlights: {
      features: {
        uz: [
          'Yoqilg‘i shoxobchalari manzili va to‘lov shartlarini bir ro‘yxatda saqlash.',
          'Filiallar bo‘yicha yoqilg‘ining o‘rtacha birlik narxini hisoblash.',
        ],
        ru: [
          'Храните адреса заправок и условия оплаты в одном списке.',
          'Рассчитывайте среднюю цену литра бензина и кубометра газа.',
        ],
        en: [
          'Keep fuel station addresses and payment terms in one list.',
          'Calculate average fuel prices by branch.',
        ],
      },
      improvements: {
        uz: [
          'Yoqilg‘i shoxobchalari bo‘yicha tez qidiruv qo‘shildi.',
        ],
        ru: [
          'Добавлен быстрый поиск по списку заправочных станций.',
        ],
        en: [
          'Added quick fuel station search.',
        ],
      },
      fixes: {
        uz: [
          'Yoqilg‘i turini almashtirganda litr va m³ aralashib ketishi tuzatildi.',
        ],
        ru: [
          'Исправлена смена единиц измерения (литры и м³) при переключении типа горючего.',
        ],
        en: [
          'Fixed litre and cubic metre units changing incorrectly between fuel types.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'Maktab ichki testlari va savollar',
      ru: 'Внутренние тесты автошколы и вопросы',
      en: 'Internal school tests and questions',
    },
    excerpt: {
      uz: 'YHQ savollari, oraliq va yakuniy ichki testlar qo‘shildi. Bu maktab ichki sinovlari, davlat imtihoni emas.',
      ru: 'Добавлены вопросы ПДД, промежуточные и итоговые тесты автошколы. Это внутренние тесты, а не государственный экзамен.',
      en: 'Added road rules questions, midterm and final school tests. These are internal tests, not state exams.',
    },
    highlights: {
      features: {
        uz: [
          'Yo‘l belgilari, chorrahalar va xavfsizlik bo‘yicha savollar ro‘yxati.',
          'Talaba kartasida test bali va to‘g‘ri javoblar foizini ko‘rish.',
        ],
        ru: [
          'Вопросы по дорожным знакам, перекрёсткам и безопасности.',
          'Баллы теста и процент правильных ответов в карточке курсанта.',
        ],
        en: [
          'Questions on road signs, intersections and safety.',
          'Test scores and percentage of correct answers on the student record.',
        ],
      },
      improvements: {
        uz: [
          'Test savollaridagi rasmlarni yuklash tezlashtirildi.',
        ],
        ru: [
          'Оптимизирована скорость загрузки иллюстраций к экзаменационным билетам.',
        ],
        en: [
          'Made question images load faster.',
        ],
      },
      fixes: {
        uz: [
          'Bir nechta to‘g‘ri javobli savollarda ball hisoblash tuzatildi.',
        ],
        ru: [
          'Исправлен подсчёт баллов в вопросах с несколькими правильными вариантами.',
        ],
        en: [
          'Fixed scoring for questions with multiple correct answers.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'O‘quv dasturlari va talaba qabuli',
      ru: 'Учебные программы и приём курсантов',
      en: 'Training programmes and student enrollment',
    },
    excerpt: {
      uz: 'Nazariya soatlari va haydash daqiqalarini dasturda belgilash, talabani shu dasturga biriktirish imkoniyati qo‘shildi.',
      ru: 'Добавлена настройка часов теории и минут вождения в учебной программе, а также зачисление курсантов на неё.',
      en: 'Added theory hours and driving minute settings for training programmes, plus student enrollment in each programme.',
    },
    highlights: {
      features: {
        uz: [
          'B, BC va C toifalari uchun nazariya soatlari va haydash daqiqalarini sozlash.',
          'Talabaga o‘quv dasturini biriktirish va boshlanish sanasini belgilash.',
        ],
        ru: [
          'Настраивайте часы теории и минуты вождения для категорий B, BC и C.',
          'Назначьте курсанту учебную программу и укажите дату начала.',
        ],
        en: [
          'Set theory hours and driving minutes for licence categories B, BC and C.',
          'Assign a training programme to each student and record the start date.',
        ],
      },
      improvements: {
        uz: [
          'Dastur tanlaganda to‘lov rejasini oldindan ko‘rish qo‘shildi.',
        ],
        ru: [
          'Добавлен предварительный расчёт стоимости курса при выборе образовательной программы.',
        ],
        en: [
          'Added a cost preview when choosing a training programme.',
        ],
      },
      fixes: {
        uz: [
          'O‘quv dasturi almashtirilganda haydash daqiqalari noto‘g‘ri hisoblanishi tuzatildi.',
        ],
        ru: [
          'Исправлен пересчёт минут вождения при смене учебной программы курсанта.',
        ],
        en: [
          'Fixed driving minute balances after changing a student’s programme.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
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
      uz: 'O‘qituvchilar va qabul xodimlari',
      ru: 'Преподаватели и сотрудники приёмной',
      en: 'Teachers and admissions staff',
    },
    excerpt: {
      uz: 'O‘qituvchilar, instruktorlar, ularga biriktirilgan mashinalar va qabul xodimlarining talaba ro‘yxatlari alohida bo‘limlarda yuritiladi.',
      ru: 'Добавлены списки преподавателей, инструкторов и закреплённых машин, а также записи о приёме новых курсантов.',
      en: 'Added teacher and instructor lists, assigned vehicles and admissions records for new students.',
    },
    highlights: {
      features: {
        uz: [
          'O‘qituvchi malakasi, biriktirilgan guruhlar va instruktor mashinalarini ko‘rish.',
          'Qabul xodimlarining yangi talabalarni ro‘yxatga olish ishlarini kuzatish.',
        ],
        ru: [
          'Смотрите квалификацию преподавателей, закреплённые группы и машины инструкторов.',
          'Следите за оформлением новых курсантов сотрудниками приёмной.',
        ],
        en: [
          'See teacher qualifications, assigned groups and instructor vehicles.',
          'Track admissions staff work when registering new students.',
        ],
      },
      improvements: {
        uz: [
          'Xodimlarni telefon va filial bo‘yicha saralash qo‘shildi.',
        ],
        ru: [
          'Добавлены фильтры сотрудников по контактному номеру и филиалу.',
        ],
        en: [
          'Added staff filters by phone and branch.',
        ],
      },
      fixes: {
        uz: [
          'Instruktor biriktirganda mashina takroran ko‘rinishi tuzatildi.',
        ],
        ru: [
          'Устранено появление дубликатов автомобилей при закреплении за несколькими инструкторами.',
        ],
        en: [
          'Fixed duplicate vehicle listings when assigning instructors.',
        ],
      },
    },
    author: {
      name: 'automaktab.uz',
      role: {
        uz: 'Mahsulot jamoasi',
        ru: 'Команда продукта',
        en: 'Product team',
      },
    },
  },
];
