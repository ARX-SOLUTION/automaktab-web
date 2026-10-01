import type { LandingContent } from "./uz";

export const contentEn: LandingContent = {
  meta: {
    title: "Automaktab: Driving School Management: Students, Tuition, Lessons",
    description:
      "Manage driving school students, groups, debt, lesson schedules, behind-the-wheel training, and branch operations in one unified platform. Open the interactive demo.",
  },
  header: {
    logoText: "automaktab",
    logoDomain: ".uz",
    nav: {
      capabilities: "Features",
      roles: "Roles",
      howItWorks: "How It Works",
      pricing: "Pricing",
      faq: "FAQ",
    },
    login: "Log In",
    demo: "Open demo",
  },
  hero: {
    eyebrow: "For driving schools with 1–3 branches",
    title: "Your driving school, ",
    titleAccent: "clear at a glance.",
    description:
      "Tuition, debt, attendance, driving practice and expenses in one system. Open the sample demo right now.",
    lane1: {
      button: "Open demo",
      helperLogin: "Sample data, opens with a demo login.",
      helperOneClick: "Sample data, opens without a password.",
    },
    lane2: {
      button: "Request trial",
      helper: "Trial terms are agreed individually.",
    },
    signTitle: "TODAY'S ROUTES",
    signRows: [
      { arrow: "↑", title: "Find student debt", sub: "Payments & Debt", stopIndex: 1 },
      { arrow: "←", title: "Mark attendance", sub: "Schedule & Groups", stopIndex: 2 },
      { arrow: "→", title: "Open student card", sub: "Students & Registry", stopIndex: 0 },
      { arrow: "↱", title: "Track driving minutes", sub: "Behind-the-Wheel", stopIndex: 3 },
    ],
  },
  proof: {
    urlText: "app.automaktab.uz · Director Dashboard",
    badge: "SAMPLE DATA",
    imageAlt: "Automaktab director dashboard: financial metrics and branch breakdown (sample data)",
    caption: "Captured from the sample account. Names and amounts are not real clients.",
    callouts: [
      {
        number: 1,
        title: "Students with debt",
        description: "Debtor count on the first screen.",
        topPct: "23.2%",
        leftPct: "41%",
      },
      {
        number: 2,
        title: "Period revenue",
        description: "Revenue, expenses and liabilities side by side.",
        topPct: "48%",
        leftPct: "36.5%",
      },
      {
        number: 3,
        title: "Branch breakdown",
        description: "Every branch on its own row.",
        topPct: "71.5%",
        leftPct: "57%",
      },
    ],
  },
  morningReport: {
    eyebrow: "TELEGRAM REPORT FOR MANAGERS",
    title: "Yesterday’s results, ",
    titleAccent: "ready each morning.",
    description: "Connect Telegram and enable daily reports. Yesterday’s revenue and new student count arrive at 08:00 Tashkent time.",
    botTitle: "automaktab.uz",
    botSub: "Sample report · illustrative data",
    timeLabel: "08:00",
    headerTitle: "YESTERDAY’S SUMMARY",
    dateLabel: "Sample",
    revenueLabel: "DAILY RESULTS",
    revenueCollectedLabel: "Revenue",
    revenueCollected: "14,800,000 UZS",
    newStudentsLabel: "New students",
    newStudents: "8",
    bullets: ["See revenue in Telegram", "Check new student numbers", "For owners and branch managers"],
    ctaButton: "Request trial",
    trialNote: "Connect Telegram and enable daily reports first",
  },
  problem: {
    title: "Daily work should not scatter across tools.",
    chips: [
      "Excel sheets",
      "Paper logbooks",
      "Telegram chats",
      "Staff memory",
    ],
    bridge:
      "One workflow: the director sees the big picture, the operator sees the next task.",
  },
  journey: {
    eyebrow: "STUDENT JOURNEY",
    title: "From enrollment to exam: one system.",
    interactiveCta: "Try marking attendance yourself ↓",
    navPrevLabel: "Previous step",
    navNextLabel: "Next step",
    trackAriaLabel: "Student journey: navigate with left and right arrow keys",
    stops: [
      {
        number: 1,
        name: "Intake",
        sub: "Student card",
        title: "The student in one card.",
        points: [
          "Form 083 and contract number",
          "Marketing source and referrals",
          "1–3 installment payment plan",
        ],
        previewType: "studentCard",
      },
      {
        number: 2,
        name: "Billing",
        sub: "Debt",
        title: "Tuition and debt control.",
        points: [
          "Debt by branch and group",
          "Partial payments and expected revenue",
          "Receipt archive",
        ],
        previewType: "paymentsTable",
      },
      {
        number: 3,
        name: "Theory",
        sub: "Schedule & attendance",
        title: "Schedule and 4 attendance states.",
        points: [
          "Weekly room and group schedule",
          "Present, late, absent, excused",
          "Attendance by group",
        ],
        previewType: "attendanceScreenshot",
      },
      {
        number: 4,
        name: "Driving",
        sub: "Driving minutes",
        title: "The 1,200-minute driving quota.",
        points: [
          "Completed and remaining minutes",
          "Instructor sign-off",
          "Odometer record",
        ],
        previewType: "drivingCard",
      },
      {
        number: 5,
        name: "Exam",
        sub: "Question bank",
        title: "Road theory bank and mock exams.",
        points: [
          "Questions across 11 topics",
          "Timed test, 90% pass mark",
          "Internal exam results",
        ],
        previewType: "examScreenshot",
      },
    ],
  },
  attendanceDemo: {
    eyebrow: "TRY IT",
    title: "Take attendance on a sample class.",
    description: "Click a status, click again to reset it.",
    banner: "Sample lesson. Changes are not saved.",
    lessonTitle: "Theory · 02:00 PM",
    lessonSubject: "T-25 · Road Safety & Traffic Regulations",
    markAllButton: "Mark All Present",
    ctaButton: "Open demo",
    unmarkedLabel: "Unmarked",
    attendanceStatusTemplate: "{name} attendance status",
    statuses: [
      { key: "keldi", label: "Present", icon: "✓", color: "#1F7A4A", bg: "#E3F1E8", text: "#1B5E3A" },
      { key: "kechikdi", label: "Late", icon: "◷", color: "#9A6400", bg: "#FBEFD5", text: "#7A4E00" },
      { key: "kelmadi", label: "Absent", icon: "✕", color: "#C23B22", bg: "#FFF6F3", text: "#B3301A" },
      { key: "uzrli", label: "Excused", icon: "U", color: "#3B5998", bg: "#E8EEF8", text: "#2B4070" },
    ],
    students: [
      "Saidova Feruza",
      "Ismoilov Rustam",
      "Sobirov Rustam",
      "Istomov Aziz",
      "Ergashev Javohir",
      "Abdullayeva Sevara",
    ],
    unmarkedTemplate: "{count} students not yet marked.",
    allMarkedMsg: "All students marked. In the live system, click Save to commit.",
  },
  roles: {
    eyebrow: "USER ROLES",
    title: "Everyone sees their own work.",
    questionEyebrow: "DAILY QUESTION",
    badge: "DEMO DATA",
    tabs: [
      {
        label: "Owner / Director",
        question: "“How much revenue, who owes, how are branches doing?”",
        answer:
          "Revenue, expenses, liabilities and debt on one screen. Compare branches instantly.",
        modules: ["Executive Dashboard", "Financial Analytics", "Branch Benchmarking"],
        image: "/images/demo/dashboard.webp",
        imageAlt: "Executive dashboard analytics (sample data)",
        objectPosition: "35% 30%",
      },
      {
        label: "Branch Manager",
        question: "“Which group is in class today, where are driving logs?”",
        answer:
          "Branch schedule, driving sessions, the 1,200-minute quota and instructor load in one place.",
        modules: ["Master Schedule", "Attendance Register", "1200-Minute Tracker"],
        image: "/images/demo/davomat.webp",
        imageAlt: "Lesson schedule and attendance register (sample data)",
        objectPosition: "78% 40%",
      },
      {
        label: "Admissions / Registrar",
        question: "“How do I find a student and check payment fast?”",
        answer:
          "Student profile, Form 083, marketing source and payment plan in one search.",
        modules: ["Student Profile", "Form 083 Health Check", "Payment Schedules"],
        image: "/images/demo/talabalar.webp",
        imageAlt: "Student registry and search (sample data)",
        objectPosition: "100% 70%",
      },
      {
        label: "Accountant & Multi-Branch",
        question: "“Are all branches and expenses in one place?”",
        answer:
          "Revenue for all branches and 8 expense categories in one place. Every change is in the audit log.",
        modules: ["Branch Filter", "8 Expense Categories", "Activity Audit Log"],
        image: "/images/demo/xarajatlar.webp",
        imageAlt: "Expense and multi-branch analytics (sample data)",
        objectPosition: "62% 40%",
      },
    ],
  },
  resources: {
    expenseCard: {
      badge: "EXPENSES & FLEET",
      title: "Expenses and fleet.",
      description:
        "8 expense categories, partial payments, fleet map, fuel receipts and inspection deadlines.",
      imageAlt: "Expense and vehicle fleet ledger (sample data)",
    },
    teamCard: {
      badge: "BRANCHES & TEAM",
      title: "Branches and instructor pay.",
      description:
        "Each employee sees only what their role allows. Instructors are paid by the hour, every action is in the audit log.",
      stats: [
        { count: "3", label: "branches" },
        { count: "8", label: "instructors" },
      ],
      sampleNote: "* Each lesson hour goes to the instructor balance automatically.",
    },
    roadmapCard: {
      title: "PLANNED",
      notice: "Not ready yet, we are working on it:",
      items: [
        {
          title: "State traffic database sync",
          badge: "Planned",
          description: "Send groups and exam protocols to the state system automatically.",
        },
        {
          title: "Bank payments",
          badge: "In development",
          description: "Accept tuition through banking apps and close invoices automatically.",
        },
      ],
    },
  },
  howItWorks: {
    eyebrow: "HOW IT WORKS",
    title: "Get started in 3 steps.",
    steps: [
      {
        number: "01",
        title: "Explore the demo",
        description: "See students, payments and lessons in a sample school account.",
      },
      {
        number: "02",
        title: "Check the fit",
        description: "Review branches, roles and your workflow with our team.",
      },
      {
        number: "03",
        title: "Request a trial",
        description: "Get a written offer on trial period, import, training and price.",
      },
    ],
  },
  pricing: {
    eyebrow: "PRICING & TRIAL",
    title: "Terms that fit your school.",
    description:
      "Tell us your branch count and workflows, we send an offer and trial terms. Prices are published once confirmed.",
    demoCard: {
      label: "SAMPLE ACCOUNT",
      badgeLogin: "login required",
      badgeOneClick: "one click",
      price: "0 UZS",
      description: "Explore every feature with sample data.",
    },
    trialCard: {
      label: "TRIAL FOR YOUR SCHOOL",
      badge: "Custom offer",
      description: "30 days with your own data. Terms confirmed in writing.",
    },
    comparisonRows: [
      {
        field: "Price",
        value: "Calculated individually by branches and student volume.",
      },
      {
        field: "Trial",
        value: "30 days with your own school data.",
      },
      {
        field: "After the trial",
        value: "Continue or stop, it is your decision.",
      },
    ],
    form: {
      title: "Request a trial for your school",
      fields: {
        name: {
          label: "Full Name",
          placeholder: "e.g., Azizbek Karimov",
          error: "Please enter your name.",
        },
        phone: {
          label: "Phone Number",
          placeholder: "+998 90 123 45 67",
          error: "Please enter a valid phone number, e.g., +998 90 123 45 67.",
        },
        school: {
          label: "Driving School Name",
          placeholder: "School name",
          error: "Please provide your driving school name.",
        },
        city: {
          label: "City / Region",
          placeholder: "Select",
          options: [
            "Tashkent City",
            "Tashkent Region",
            "Andijan",
            "Bukhara",
            "Fergana",
            "Jizzakh",
            "Khorezm",
            "Namangan",
            "Navoi",
            "Kashkadarya",
            "Karakalpakstan",
            "Samarkand",
            "Sirdaryo",
            "Surkhandarya",
          ],
        },
        branches: {
          label: "Number of Branches",
          options: ["1", "2–3", "4+"],
        },
        students: {
          label: "Active Student Volume",
          options: ["Under 100", "100–500", "500–1500", "1500+"],
        },
        flows: {
          label: "Priority Workflows",
          options: [
            "Students",
            "Tuition & Debt",
            "Schedule & Attendance",
            "In-Car Training",
            "Fleet & Expenses",
            "Multi-Branch",
          ],
        },
        consent: {
          label: "I consent to be contacted regarding my trial request.",
          error: "Consent is required to submit.",
        },
      },
      submit: "Send request",
      submitting: "Submitting…",
      success: {
        title: "Your request has been received.",
        message: "We will contact you soon.",
        demoCta: "Open demo",
        resetButton: "Submit another request",
      },
      networkError: "Connection lost. Please try again.",
      disclaimer: "Your number is used only to contact you about the trial.",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Direct questions, straight answers.",
    items: [
      {
        question: "What is the demo?",
        answerLogin:
          "An account filled with sample data. Its students, branches and amounts are not real clients.",
      },
      {
        question: "How do I log into the demo?",
        answerLogin:
          "The “Open demo” button opens the login page: a demo email and password are required.",
        answerOneClick:
          "The “Open demo” button opens the sample account in one click, without a password. Sessions are temporary.",
      },
      {
        question: "Is the 30-day trial the same as the demo?",
        answerLogin:
          "No. The demo is a sample account, the trial connects your own school. Period and limits are written in the offer.",
      },
      {
        question: "How many branches can we connect?",
        answerLogin:
          "The demo shows several branches. Your branch count is confirmed in the individual offer.",
      },
      {
        question: "Does the demo show cars on GPS now?",
        answerLogin:
          "Not yet: no GPS devices are connected to the demo map. Talk to the team about the integration.",
      },
      {
        question: "Can data be exported to Excel?",
        answerLogin:
          "Student and payment lists can be downloaded to Excel. Import is agreed separately.",
      },
      {
        question: "How are access rights managed?",
        answerLogin:
          "Each employee sees the sections for their role. We review the role list together before connecting.",
      },
    ],
  },
  finalCta: {
    title: "See your school in one system.",
    demoButton: "Open demo",
    trialButton: "Request trial",
  },
  footer: {
    tagline: "driving school management system",
    links: [
      { label: "Features", href: "#yol" },
      { label: "Pricing", href: "#tariflar" },
      { label: "FAQ", href: "#savollar" },
      { label: "Changelog", href: "/en/changelog" },
      { label: "Log In", href: "https://app.automaktab.uz/login" },
    ],
    languages: [
      { code: "uz", label: "UZ", active: false },
      { code: "ru", label: "RU", active: false },
      { code: "en", label: "EN", active: true },
    ],
    copyright: "© 2026 automaktab.uz. All rights reserved.",
  },
};
