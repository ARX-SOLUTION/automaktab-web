import type { JSX } from "react";
import type { Locale } from "@/i18n/config";

// ── Copy ──────────────────────────────────────────────────────────────────
// Ported verbatim from autodrive-frontend/src/i18n/locales/{uz,ru,en}.json,
// `landing` namespace. Do not hand-edit the wording here without updating
// the source of truth first.

type CardCopy = { title: string; body: string };

type Copy = {
  pain: {
    eyebrow: string;
    lead: string;
    cards: CardCopy[];
    bridge: string;
  };
  stats: {
    items: { value: string; label: string }[];
    sub: string;
  };
  howItWorks: {
    title: string;
    sub: string;
    steps: CardCopy[];
    badge: string;
  };
  benefits: {
    title: string;
    sub: string;
    cards: CardCopy[];
  };
  roles: {
    title: string;
    sub: string;
    cards: CardCopy[];
  };
  features: {
    title: string;
    sub: string;
    debtorsLabel: string;
    debt: { eyebrow: string; title: string; body: string };
    attendance: { eyebrow: string; title: string; body: string };
    schedule: { eyebrow: string; title: string; body: string };
  };
};

const COPY: Record<Locale, Copy> = {
  uz: {
    pain: {
      eyebrow: "Tanish holatmi?",
      lead: "Oy oxirida kim to’ladi, kim to’lamadi — daftar, Excel, Telegram. Filiallar bo’yicha raqamlarni yig’ish kun ketadi.",
      cards: [
        { title: "Qarzdorlarni qo’lda sanash", body: "Kim to’lamadi, qancha qoldi — bir qarashda bilib bo’lmaydi" },
        { title: "Davomat daftarda", body: "Yo’qoladi, har o’qituvchi har xil yuritadi" },
        { title: "Filiallar hisoboti — kun ketadi", body: "Raqamlar bir joyda emas, har safar yig’ish kerak" },
      ],
      bridge: "Avtomaktab CRM shularning barchasini bitta panelga yig’adi.",
    },
    stats: {
      items: [
        { value: "∞", label: "Cheksiz filial" },
        { value: "2 daqiqa", label: "Talaba qo'shish" },
        { value: "0", label: "O'rnatish kerak emas" },
      ],
      sub: "24/7 brauzerda ishlaydi · kunlik zaxira nusxa",
    },
    howItWorks: {
      title: "Qanday boshlaymiz?",
      sub: "To’rtta oddiy qadam — birinchi kuni ishga tushasiz",
      steps: [
        { title: "Bog’lanasiz", body: "Telegram yoki telefon orqali murojaat qiling — 15 daqiqada javob" },
        { title: "Biz sozlab beramiz", body: "Kompaniya, filial va xodim akkauntlari — 1 kun ichida" },
        { title: "Jamoani o’rgatamiz", body: "1 soatlik jonli sessiya + demo mashq bilan o’rgatamiz" },
        { title: "Ishga tushasiz", body: "Birinchi kunlar yonida bo’lamiz va savollaringizga javob beramiz" },
      ],
      badge: "Birinchi oy — bepul",
    },
    benefits: {
      title: "Asosiy imkoniyatlar",
      sub: "Avtomaktabni boshqarish uchun zarur hamma narsa",
      cards: [
        { title: "Qarz nazorati", body: "Kim qancha qarz — bir qarashda. Filiallar kesimida qarzdorlar ro’yxati, qolgan summa va to’lov sanasi." },
        { title: "Davomat", body: "O‘qituvchi 2 bosishda belgilaydi. Guruh bo‘yicha davomat, kechikkan va uzrli sabablar." },
        { title: "Jadval", body: "Guruhlar va darslar avtomatik. Haftalik jadval shablonlari, dars yaratish va hisobot." },
      ],
    },
    roles: {
      title: "Har bir rol uchun",
      sub: "O’z lavozimingizni toping — har biri uchun alohida ko’rinish",
      cards: [
        { title: "Ega", body: "Barcha filiallar hisoboti, daromad va qarz nazorati bir panelda." },
        { title: "Menejer", body: "Filial boshqaruvi: guruhlar, xodimlar va kunlik hisobot." },
        { title: "Operator", body: "Tez talaba va to’lov kiritish. «Saqlash va yana qo’shish» tugmasi bor." },
        { title: "O’qituvchi", body: "O’z guruhlari va davomat — 2 bosishda belgilash." },
      ],
    },
    features: {
      title: "Batafsil imkoniyatlar",
      sub: "Har bir funksiya real ehtiyojdan tug'ilgan",
      debtorsLabel: "Qarzdorlar",
      debt: { eyebrow: "Qarzdorlik nazorati", title: "Har bir to’lovni nazorat ostida saqlang", body: "Qarzdor talabalar ro’yxati, qolgan summa, qarz muddati — bir qarashda. Filiallar kesimida to’liq hisobot, muddati o’tgan qarzlar alohida ajratilgan." },
      attendance: { eyebrow: "Davomat tizimi", title: "O’qituvchi 2 bosishda belgilaydi", body: "Guruh ro’yxatini oching, talabani bosing — Keldi / Kelmadi / Kechikdi. Davomat jurnali avtomatik saqlanadi, qayta urinib ko’rish shart emas." },
      schedule: { eyebrow: "Jadval va guruhlar", title: "Haftalik jadval — bir marta sozlang, doim ishlaydi", body: "Jadval shablonlari asosida kelgusi haftalar uchun darslar avtomatik yaratiladi. Guruhlar, o’qituvchilar va dars turlari — hammasi bir joyda." },
    },
  },
  ru: {
    pain: {
      eyebrow: "Знакомая ситуация?",
      lead: "Конец месяца: кто заплатил, кто нет — в тетради, Excel и Telegram. Собрать данные по всем филиалам — целый день.",
      cards: [
        { title: "Должников считаем вручную", body: "Кто не заплатил, сколько осталось — не видно с первого взгляда" },
        { title: "Журнал посещаемости на бумаге", body: "Теряется, каждый преподаватель ведёт по-своему" },
        { title: "Сводка по филиалам — целый день", body: "Данные разбросаны, каждый раз собираем заново" },
      ],
      bridge: "Avtomaktab CRM собирает всё это в одну панель.",
    },
    stats: {
      items: [
        { value: "∞", label: "Неограниченных филиалов" },
        { value: "2 мин", label: "На добавление студента" },
        { value: "0", label: "Установка не нужна" },
      ],
      sub: "24/7 в браузере · ежедневные резервные копии",
    },
    howItWorks: {
      title: "С чего начнём?",
      sub: "Четыре простых шага — с первого дня работаете",
      steps: [
        { title: "Связываетесь", body: "Telegram или телефон — ответим за 15 минут" },
        { title: "Настраиваем", body: "Компания, филиал, аккаунты сотрудников — за 1 день" },
        { title: "Обучаем команду", body: "1 час живой сессии + демо-практика" },
        { title: "Запускаетесь", body: "Первые дни мы рядом и отвечаем на вопросы" },
      ],
      badge: "Первый месяц — бесплатно",
    },
    benefits: {
      title: "Ключевые возможности",
      sub: "Всё необходимое для управления автошколой",
      cards: [
        { title: "Контроль долгов", body: "Кто и сколько должен — с первого взгляда. Список должников по филиалам, остаток и дата платежа." },
        { title: "Посещаемость", body: "Преподаватель отмечает за 2 нажатия. Посещаемость по группам, опоздания и уважительные причины." },
        { title: "Расписание", body: "Группы и занятия — автоматически. Шаблоны расписания, создание уроков и отчёты." },
      ],
    },
    roles: {
      title: "Для каждой роли",
      sub: "Найдите свою должность — отдельный вид для каждого",
      cards: [
        { title: "Владелец", body: "Отчёты по всем филиалам, доходы и контроль долгов в одной панели." },
        { title: "Менеджер", body: "Управление филиалом: группы, сотрудники и ежедневные отчёты." },
        { title: "Оператор", body: "Быстрый ввод студентов и платежей. Есть кнопка «Сохранить и добавить ещё»." },
        { title: "Преподаватель", body: "Свои группы и посещаемость — отметить за 2 нажатия." },
      ],
    },
    features: {
      title: "Подробные возможности",
      sub: "Каждая функция рождена из реальной потребности",
      debtorsLabel: "Должники",
      debt: { eyebrow: "Контроль долгов", title: "Держите каждый платёж под контролем", body: "Список должников, остаток, срок долга — с первого взгляда. Полный отчёт по филиалам, просроченные долги выделены отдельно." },
      attendance: { eyebrow: "Система посещаемости", title: "Преподаватель отмечает за 2 нажатия", body: "Откройте список группы, нажмите на студента — Пришёл / Не пришёл / Опоздал. Журнал сохраняется автоматически, повторных попыток не нужно." },
      schedule: { eyebrow: "Расписание и группы", title: "Расписание — настройте один раз, работает всегда", body: "По шаблонам расписания уроки на следующие недели создаются автоматически. Группы, преподаватели и типы занятий — всё в одном месте." },
    },
  },
  en: {
    pain: {
      eyebrow: "Sound familiar?",
      lead: "End of month: who paid, who didn't — scattered across notebooks, Excel, and Telegram. Pulling branch totals together takes a whole day.",
      cards: [
        { title: "Counting debtors by hand", body: "Who hasn't paid, how much is left — impossible to see at a glance" },
        { title: "Attendance in a paper journal", body: "Gets lost. Every teacher tracks it differently." },
        { title: "Branch summary takes a full day", body: "Numbers are scattered — you have to pull them together every time" },
      ],
      bridge: "Avtomaktab CRM brings all of this into one panel.",
    },
    stats: {
      items: [
        { value: "∞", label: "Unlimited branches" },
        { value: "2 min", label: "To add a student" },
        { value: "0", label: "Nothing to install" },
      ],
      sub: "24/7 in the browser · daily backups",
    },
    howItWorks: {
      title: "How do we get started?",
      sub: "Four simple steps — up and running from day one",
      steps: [
        { title: "You reach out", body: "Contact us via Telegram or phone — we reply within 15 minutes" },
        { title: "We set it up", body: "Company, branch, and staff accounts — ready in 1 day" },
        { title: "We train your team", body: "1-hour live session + hands-on demo practice" },
        { title: "You go live", body: "We stay close for the first days and answer every question" },
      ],
      badge: "First month — free",
    },
    benefits: {
      title: "Key features",
      sub: "Everything you need to run a driving school",
      cards: [
        { title: "Debt tracking", body: "Who owes what — at a glance. Debtors by branch, remaining balance, and payment date." },
        { title: "Attendance", body: "Teachers mark attendance in 2 taps. Per-group attendance, late arrivals, and excused absences." },
        { title: "Schedule", body: "Groups and lessons, automated. Weekly schedule templates, lesson generation, and reports." },
      ],
    },
    roles: {
      title: "For every role",
      sub: "Find your position — a dedicated view for each",
      cards: [
        { title: "Owner", body: "All-branch reports, revenue and debt control in one panel." },
        { title: "Manager", body: "Branch management: groups, staff and daily reports." },
        { title: "Operator", body: "Fast student and payment entry. \"Save and add another\" button included." },
        { title: "Teacher", body: "Your groups and attendance — marked in 2 taps." },
      ],
    },
    features: {
      title: "Feature details",
      sub: "Every feature built from a real need",
      debtorsLabel: "Debtors",
      debt: { eyebrow: "Debt tracking", title: "Keep every payment under control", body: "Debtor list, remaining balance, overdue days — at a glance. Full report by branch, overdue debts highlighted separately." },
      attendance: { eyebrow: "Attendance system", title: "Teachers mark attendance in 2 taps", body: "Open the group list, tap a student — Present / Absent / Late. The attendance log saves automatically, no retry needed." },
      schedule: { eyebrow: "Schedule & groups", title: "Set the schedule once, it runs itself", body: "Based on schedule templates, lessons for future weeks are created automatically. Groups, teachers and lesson types — all in one place." },
    },
  },
};

// ── Icons ─────────────────────────────────────────────────────────────────
// ponytail: hand-drawn minimal stroke icons instead of an icon-library dep —
// this repo has none installed and six sections don't justify adding one.

function Icon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}

const ICON_PATH = {
  warning: "M12 3.5 2.5 20h19L12 3.5Z M12 9.5v4.25 M12 16.75h.01",
  clipboard: "M7 4.5h10v16H7Z M9 4.5V3h6v1.5 M9 9h6 M9 12.5h6 M9 16h4",
  building:
    "M5 21V5h7v16 M12 21v-9h6v9 M8 8h1.5 M8 11.5h1.5 M8 15h1.5 M15 13.5h1.5 M15 17h1.5",
  currency: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M8.5 12h7 M12 8.5v7",
  calendar: "M5 5h14v15H5Z M5 9.5h14 M8 3v3.5 M16 3v3.5 M9 13.5l2 2 4-4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5.25l3.5 2",
  trendUp: "M4 16 9 11 13 14 20 6 M14.5 6H20v5.5",
  users:
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3.5 20a5.5 5.5 0 0 1 11 0 M16.5 5.5a3 3 0 0 1 0 5.7 M18 14.5c1.8.5 3 1.7 3 3.5",
} as const;

const PAIN_ICONS = [ICON_PATH.warning, ICON_PATH.clipboard, ICON_PATH.building];
const BENEFIT_ICONS = [ICON_PATH.currency, ICON_PATH.calendar, ICON_PATH.clock];
const ROLE_ICONS = [
  ICON_PATH.trendUp,
  ICON_PATH.users,
  ICON_PATH.currency,
  ICON_PATH.calendar,
];

// ── Feature-row vignette data ────────────────────────────────────────────
// ponytail: illustrative example content, hardcoded Uzbek in every locale —
// mirrors the source dashboard mock, which never localized these. Not a
// missing-translation gap.

const DEBT_ROWS = [
  { name: "S. Toshmatov", course: "Avto maktab", amount: "450 000", days: 12, paid: false },
  { name: "A. Karimov", course: "Tezkor", amount: "280 000", days: 7, paid: false },
  { name: "N. Yusupova", course: "Avto maktab", amount: "520 000", days: 21, paid: false },
  { name: "M. Umarov", course: "Tezkor", amount: "—", days: 0, paid: true },
];

type AttendanceStatus = "present" | "absent" | "late";

const ATTENDANCE_ROWS: { name: string; status: AttendanceStatus }[] = [
  { name: "Hasan Karimov", status: "present" },
  { name: "Aziz Toshmatov", status: "absent" },
  { name: "Malika Umarova", status: "present" },
  { name: "Bobur Nazarov", status: "late" },
  { name: "Zulfiya Hasanova", status: "present" },
];

const ATTENDANCE_LABEL: Record<AttendanceStatus, string> = {
  present: "Keldi",
  absent: "Kelmadi",
  late: "Kechikdi",
};

const ATTENDANCE_TONE: Record<AttendanceStatus, string> = {
  present: "bg-success/10 text-success",
  absent: "bg-destructive/10 text-destructive",
  late: "bg-warning/10 text-warning",
};

type LessonType = "T" | "A";

const SCHEDULE_COLUMNS: {
  day: string;
  lessons: { type: LessonType; group: string; time: string }[];
}[] = [
  {
    day: "Du",
    lessons: [
      { type: "T", group: "1-guruh", time: "09:00" },
      { type: "A", group: "3-guruh", time: "14:00" },
    ],
  },
  { day: "Se", lessons: [{ type: "A", group: "2-guruh", time: "10:30" }] },
  {
    day: "Ch",
    lessons: [
      { type: "T", group: "1-guruh", time: "09:00" },
      { type: "A", group: "2-guruh", time: "14:00" },
    ],
  },
  {
    day: "Pa",
    lessons: [
      { type: "T", group: "3-guruh", time: "09:00" },
      { type: "A", group: "1-guruh", time: "14:00" },
    ],
  },
  { day: "Ju", lessons: [{ type: "T", group: "2-guruh", time: "09:00" }] },
];

const SECTION_CLASS = "mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8";

export default function MidPageSections({
  locale,
}: {
  locale: Locale;
}): JSX.Element {
  const copy = COPY[locale];
  // Not hardcoded to "3 items": dominantStat carries the section, any count
  // of secondaryStats renders as an equal-width flex row (or the section
  // doesn't render at all with zero items).
  const [dominantStat, ...secondaryStats] = copy.stats.items;

  return (
    <div className="bg-background text-foreground">
      {/* ── Problem / pain ──────────────────────────────────────────── */}
      <section className={SECTION_CLASS}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* Border wraps just the heading content (not the stretched grid
                item) so it doesn't run past the text on the taller row. */}
            <div className="border-l-2 border-border pl-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {copy.pain.eyebrow}
              </p>
              <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {copy.pain.lead}
              </h2>
            </div>
          </div>
          <div className="space-y-3 border-l-2 border-transparent pl-5 sm:max-w-md lg:max-w-none lg:border-l-0 lg:pl-0 lg:col-span-5">
            {copy.pain.cards.map((card, i) => (
              <div
                key={card.title}
                className="flex gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/10">
                  <Icon path={PAIN_ICONS[i]} className="size-4 text-destructive" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-10 text-center text-base font-semibold text-foreground sm:text-lg">
          {copy.pain.bridge}
        </p>
      </section>

      {/* ── Capability stats ────────────────────────────────────────── */}
      {dominantStat && (
        <section className={SECTION_CLASS}>
          <div className="overflow-hidden rounded-2xl border border-border bg-card sm:mx-auto sm:flex sm:w-fit sm:max-w-full">
            <div className="flex min-w-0 flex-col justify-center border-b border-border px-8 py-8 text-center sm:min-w-fit sm:border-b-0 sm:border-r sm:text-left">
              <p className="tabular-nums text-5xl font-bold text-cyan-600 dark:text-cyan-300 sm:text-6xl">
                {dominantStat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {dominantStat.label}
              </p>
            </div>
            {secondaryStats.length > 0 && (
              <div className="flex min-w-0 divide-x divide-border">
                {secondaryStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex min-w-0 flex-1 flex-col justify-center px-6 py-8 text-center sm:min-w-[7rem] sm:flex-initial"
                  >
                    <p className="tabular-nums text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {copy.stats.sub}
          </p>
        </section>
      )}

      {/* ── How it works ────────────────────────────────────────────── */}
      <section className={SECTION_CLASS}>
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold sm:text-3xl">
            {copy.howItWorks.title}
          </h2>
          <p className="text-sm text-muted-foreground">{copy.howItWorks.sub}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.howItWorks.steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-sm font-bold text-foreground">
                {i + 1}
              </div>
              <h3 className="font-heading mb-2 text-sm font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-5 py-2 text-sm font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            {copy.howItWorks.badge}
          </span>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section className={SECTION_CLASS}>
        <div className="mb-10 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold sm:text-3xl">
            {copy.benefits.title}
          </h2>
          <p className="text-sm text-muted-foreground">{copy.benefits.sub}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.benefits.cards.map((card, i) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted">
                <Icon path={BENEFIT_ICONS[i]} className="size-5 text-foreground" />
              </div>
              <h3 className="font-heading mb-2 text-base font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Role cards ───────────────────────────────────────────────── */}
      <section className={SECTION_CLASS}>
        <div className="mb-10 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold sm:text-3xl">
            {copy.roles.title}
          </h2>
          <p className="text-sm text-muted-foreground">{copy.roles.sub}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.roles.cards.map((card, i) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted">
                <Icon path={ROLE_ICONS[i]} className="size-5 text-foreground" />
              </div>
              <h3 className="font-heading mb-1.5 text-sm font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature alternating rows ────────────────────────────────── */}
      <section className={SECTION_CLASS}>
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-3 text-2xl font-bold sm:text-3xl">
            {copy.features.title}
          </h2>
          <p className="text-sm text-muted-foreground">{copy.features.sub}</p>
        </div>

        <div className="space-y-20 sm:space-y-28">
          {/* Debt tracking */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {copy.features.debt.eyebrow}
              </p>
              <h3 className="font-heading mb-4 text-xl font-bold leading-tight sm:text-2xl">
                {copy.features.debt.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {copy.features.debt.body}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  {copy.features.debtorsLabel}
                </span>
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                  4 ta qarzdor
                </span>
              </div>
              <div className="space-y-1.5">
                {DEBT_ROWS.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                      {row.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {row.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {row.course}
                      </p>
                    </div>
                    <div className="text-right">
                      {row.paid ? (
                        <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                          To&apos;liq
                        </span>
                      ) : (
                        <div>
                          <p className="tabular-nums text-xs font-semibold text-destructive">
                            {row.amount}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {row.days}k
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-last rounded-2xl border border-border bg-card p-4 sm:p-5 lg:order-first">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    1-guruh · Teoriya
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    15.06.2026 — 09:00
                  </p>
                </div>
                <button
                  type="button"
                  className="min-h-[44px] rounded-lg bg-muted px-3 py-1.5 text-[11px] font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-700"
                >
                  Saqlash
                </button>
              </div>
              <div className="space-y-1.5">
                {ATTENDANCE_ROWS.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                        {s.name[0]}
                      </div>
                      <span className="text-xs text-foreground">{s.name}</span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${ATTENDANCE_TONE[s.status]}`}
                    >
                      {ATTENDANCE_LABEL[s.status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {copy.features.attendance.eyebrow}
              </p>
              <h3 className="font-heading mb-4 text-xl font-bold leading-tight sm:text-2xl">
                {copy.features.attendance.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {copy.features.attendance.body}
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {copy.features.schedule.eyebrow}
              </p>
              <h3 className="font-heading mb-4 text-xl font-bold leading-tight sm:text-2xl">
                {copy.features.schedule.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {copy.features.schedule.body}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">
                  Haftalik jadval
                </span>
                <div className="flex gap-1.5">
                  <span className="flex items-center gap-1 rounded-md bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold text-cyan-600 dark:text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-sm bg-cyan-400" />
                    Teoriya
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-amber-400/10 px-2 py-1 text-[10px] font-semibold text-amber-600 dark:text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-sm bg-amber-400" />
                    Amaliy
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {SCHEDULE_COLUMNS.map((col) => (
                  <div key={col.day}>
                    <p className="mb-1.5 text-center text-[10px] font-semibold text-muted-foreground">
                      {col.day}
                    </p>
                    <div className="space-y-1.5">
                      {col.lessons.map((lesson) => (
                        <div
                          key={`${col.day}-${lesson.time}`}
                          className={`rounded-md border p-1.5 ${
                            lesson.type === "T"
                              ? "border-cyan-400/15 bg-cyan-400/10"
                              : "border-amber-400/15 bg-amber-400/10"
                          }`}
                        >
                          <p
                            className={`text-[9px] font-semibold ${
                              lesson.type === "T"
                                ? "text-cyan-600 dark:text-cyan-300"
                                : "text-amber-600 dark:text-amber-300"
                            }`}
                          >
                            {lesson.group}
                          </p>
                          <p className="text-[9px] text-muted-foreground">
                            {lesson.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
