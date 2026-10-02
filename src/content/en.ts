import type { LandingContent } from "./uz";

export const contentEn: LandingContent = {
  meta: {
    title: "Driving school management | automaktab.uz",
    description:
      "Manage students, payments, debt, schedules and attendance in one system. Compare branch results and try the demo.",
  },
  header: {
    logoText: "automaktab",
    logoDomain: ".uz",
    nav: {
      capabilities: "Features",
      roles: "Roles",
      howItWorks: "How it works",
      pricing: "Pricing",
      faq: "FAQ",
    },
    login: "Log in",
    demo: "Open demo",
    demoShort: "Demo",
  },
  hero: {
    eyebrow: "For driving school owners",
    title: "Your driving school. ",
    titleAccent: "Everything in one place.",
    description:
      "Manage students, payments, schedules and attendance in one system. See how each branch is doing.",
    lane1: {
      button: "Open demo",
      helperLogin: "Explore a sample school with a demo email and password.",
      helperOneClick: "Explore a sample school without a password.",
    },
    lane2: {
      button: "Request trial",
      helper: "We’ll agree on 30-day trial terms for your school.",
    },
    signTitle: "Daily questions for school owners",
    signRows: [
      { arrow: "↑", title: "Who has overdue payments?", sub: "Payments and debt", stopIndex: 1 },
      { arrow: "←", title: "Who missed a lesson?", sub: "Schedule and attendance", stopIndex: 2 },
      { arrow: "→", title: "Who is in each group?", sub: "Students and groups", stopIndex: 0 },
      { arrow: "↱", title: "How much driving practice is completed?", sub: "Driving practice", stopIndex: 3 },
    ],
  },
  proof: {
    title: "Revenue, debt and branches in one view.",
    caption: "Sample data. Names and amounts are fictional.",
    callouts: [
      {
        number: 1,
        title: "Student debt",
        description: "See total outstanding student debt.",
      },
      {
        number: 2,
        title: "Revenue",
        description: "See revenue for the selected period.",
      },
      {
        number: 3,
        title: "Branch results",
        description: "Compare branch results in one place.",
      },
    ],
  },
  scenes: {
    sampleLabel: "Sample data",
    currency: "UZS",
    director: {
      title: "School finances",
      period: "Sample · 1–30 September",
      revenue: "Revenue",
      debt: "Student debt",
      branches: ["Branch A", "Branch B", "Branch C"],
      branchCaption: "Three branches compared over the same period.",
    },
    registrar: {
      title: "Students and lessons",
      students: "Student list",
      group: "Group",
      schedule: "Lesson time",
      lesson: "Theory · Road rules",
    },
    teacher: {
      title: "Group attendance",
      lesson: "Theory lesson",
      marked: "students marked",
      statuses: ["Present", "Present", "Late", "Absent"],
    },
    leads: {
      title: "From inquiry to enrollment",
      stages: [
        "New inquiry",
        "Contacted",
        "Meeting",
        "Enrolled"
      ],
      ownerLabel: "Team member",
      sourceLabel: "Source",
      sourceValue: "Instagram",
      followupLabel: "Next follow-up",
      followupValue: "Today · 15:30",
      conversionLabel: "Create student record"
    },
    fleet: {
      title: "Vehicle status",
      statuses: [
        "Ready for lessons",
        "Under maintenance"
      ],
      instructorLabel: "Instructor",
      maintenanceLabel: "Next maintenance",
      maintenanceValue: "12.10 · Oil change",
      insuranceLabel: "Insurance · until 01.12",
      fuelLabel: "Fuel · 42 litres"
    },
    education: {
      title: "Lessons and internal tests",
      theory: "Theory",
      practice: "Driving practice",
      days: [
        "Monday",
        "Wednesday"
      ],
      testTitle: "Road rules · Internal test",
      questionLabel: "Questions",
      timeLabel: "Minutes",
      thresholdLabel: "Pass mark",
      groupLabel: "Group",
      internalNote: "Internal school test. Not a state exam."
    },
    accountant: {
      title: "Expenses and payments",
      expenses: "Total expenses",
      categories: ["Fuel", "Repairs"],
      paid: "Paid",
      remaining: "Still to pay",
    },
  },
  morningReport: {
    eyebrow: "Daily report in Telegram",
    title: "Yesterday’s results. ",
    titleAccent: "In Telegram each morning.",
    description: "Enable daily reports. Yesterday’s revenue and new student count arrive in Telegram at 08:00 Tashkent time.",
    botTitle: "automaktab.uz",
    botSub: "Sample report · fictional data",
    timeLabel: "08:00",
    headerTitle: "Yesterday’s report",
    dateLabel: "Sample",
    revenueLabel: "Daily results",
    revenueCollectedLabel: "Revenue",
    newStudentsLabel: "New students",
    branchLabel: "Branch",
    totalLabel: "Total · 3 branches",
    currency: "UZS",
    numberLocale: "en-US",
    branches: [
      { name: "Chilonzor", revenue: 7200000, students: 4 },
      { name: "Yunusabad", revenue: 4600000, students: 3 },
      { name: "Sergeli", revenue: 3000000, students: 1 },
    ],
    sampleCaption: "Sample branch breakdown. Current Telegram reports contain only total revenue and the number of new students.",
    bullets: ["School totals for the owner", "Branch totals for each manager", "Daily at 08:00, Tashkent time"],
    ctaButton: "Request trial",
    trialNote: "Connect Telegram and enable daily reports",
  },
  problem: {
    title: "Three sources. One system.",
    sourceLabel: "Kept separately",
    resultLabel: "Managed together",
    platformLabel: "One platform",
    sources: [
      { title: "Telegram groups", detail: "Tasks in messages" },
      { title: "Excel sheets", detail: "Separate calculations" },
      { title: "Paper logbooks", detail: "Handwritten records" },
    ],
    outcomes: [
      { title: "Payments and debt", detail: "Who paid, how much" },
      { title: "Attendance", detail: "Who came to class" },
      { title: "Lesson schedule", detail: "Group and lesson time" },
    ],
  },
  journey: {
    eyebrow: "Enrollment to internal tests",
    title: "Follow every student’s progress.",
    interactiveCta: "Try taking attendance ↓",
    navPrevLabel: "Previous step",
    navNextLabel: "Next step",
    trackAriaLabel: "Student stages. Select with the left and right arrow keys.",
    previews: {
      student: {
        title: "Student record",
        category: "Category B",
        group: "Group T-25",
        certificate: "Medical certificate 083: on file",
        tabs: ["Payments", "Exam", "Attendance", "Group history"],
        sourceLabel: "Advertising and referrals",
        sourceValue: "Instagram · 2 referrals",
        debtLabel: "Current debt",
      },
      payments: {
        title: "Payments",
        period: "This month",
        branches: "All branches",
        debtors: "Students with debt",
        columns: ["Student", "Total", "Balance"],
        paidInFull: "Paid in full",
      },
      driving: {
        title: "Driving lessons · Saidova F.",
        quota: "/ 1200 minutes",
        completed: "Completed: 600 min",
        remaining: "Remaining: 600 min",
        sessions: ["Lesson · 90 min", "Lesson · 60 min"],
        instructorNote: "Instructor log",
        confirmed: "Confirmed",
        pending: "Awaiting confirmation",
      },
      exam: {
        title: "Internal road rules test · 11 topics",
        topic: "Topic 11: Intersections",
        remaining: "18:40 remaining",
        threshold: "Pass mark: 90%",
        question: "At an intersection of roads of equal priority, which vehicle must a driver yield to?",
        correctAnswer: "A) Traffic approaching from the right",
        correctLabel: "Correct",
        alternativeAnswer: "B) Traffic approaching from the left",
        topicCount: "11",
        topicLabel: "Topics",
        languageCount: "3 languages",
        resultLabel: "Group result",
      },
    },
    stops: [
      {
        number: 1,
        name: "Enrollment",
        sub: "Student record",
        title: "Keep student details together.",
        points: [
          "Documents and contract in one record",
          "Advertising source and referrals",
          "Set payment deadlines",
        ],
        previewType: "studentCard",
      },
      {
        number: 2,
        name: "Payments",
        sub: "Debt",
        title: "Spot overdue payments in time.",
        points: [
          "Debt by branch and group",
          "Paid amounts and remaining balances",
          "Payment history in one place",
        ],
        previewType: "paymentsTable",
      },
      {
        number: 3,
        name: "Theory",
        sub: "Schedule and attendance",
        title: "See who is missing lessons.",
        points: [
          "Weekly room and group schedule",
          "Mark each student’s attendance",
          "Attendance by group",
        ],
        previewType: "attendanceScreenshot",
      },
      {
        number: 4,
        name: "Driving",
        sub: "Driving minutes",
        title: "Keep track of driving practice.",
        points: [
          "Completed and remaining minutes",
          "Instructor sign-off",
          "Odometer readings",
        ],
        previewType: "drivingCard",
      },
      {
        number: 5,
        name: "Internal test",
        sub: "Questions and results",
        title: "Check readiness for the exam.",
        points: [
          "Road rules questions by topic",
          "Timed internal school tests",
          "Each student’s test results",
        ],
        previewType: "examScreenshot",
      },
    ],
  },
  attendanceDemo: {
    eyebrow: "TRY IT",
    title: "Who missed the lesson?",
    description: "Mark it yourself.",
    banner: "Sample · not saved",
    lessonTitle: "Theory · 14:00",
    lessonSubject: "T-25 · Road rules",
    ctaButton: "Open demo",
    unmarkedLabel: "Unmarked",
    markedLabel: "Marked",
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
    unmarkedTemplate: "Unmarked: {count}",
    allMarkedMsg: "Everyone is marked.",
    card: {
      title: "Student card",
      attendance: "Attendance",
      today: "Today",
      debt: "Balance due",
      currency: "UZS",
    },
  },
  roles: {
    eyebrow: "For your school team",
    title: "Your team works. You see the full picture.",
    questionEyebrow: "Daily question",
    tabs: [
      {
        label: "Owner or director",
        question: "How much came in? Who still owes?",
        answer:
          "Compare revenue, expenses and student debt. See which branch needs attention.",
        modules: ["Owner dashboard", "Financial overview", "Branch comparison"],
        scene: "director",
      },
      {
        label: "Teacher",
        question: "Who attended? Who missed the lesson?",
        answer:
          "The group, lesson and attendance in one place. Mark each student’s status.",
        modules: ["Lesson schedule", "Attendance register", "Group list"],
        scene: "teacher",
      },
      {
        label: "Admissions staff",
        question: "How do I find a student and check payments?",
        answer:
          "Find a student through search. Their documents, group and payments are in one record.",
        modules: ["Student record", "Medical certificate 083", "Payment plan"],
        scene: "registrar",
      },
      {
        label: "Accountant",
        question: "How much was spent? What still needs paying?",
        answer:
          "Review revenue and expenses by branch. See paid and unpaid amounts separately.",
        modules: ["Branch filter", "Expense records", "Change history"],
        scene: "accountant",
      },
    ],
  },
  resources: {
    title: "Manage admissions, vehicles and teaching together.",
    modules: [
      {
        kind: "leads",
        title: "Inquiries and enrollment",
        description: "See where each inquiry came from and its current stage. Assign a team member and plan the next follow-up.",
        points: [
          "Stage, source and team member",
          "Follow-up deadlines",
          "Create a student record"
        ]
      },
      {
        kind: "fleet",
        title: "Fleet",
        description: "Track vehicle status, instructors and maintenance together. Keep fuel records and insurance documents in one place.",
        points: [
          "Vehicle status and assignment",
          "Maintenance and insurance",
          "Fuel records"
        ]
      },
      {
        kind: "education",
        title: "Teaching",
        description: "Plan lessons with groups and teachers. Track attendance, internal test settings and results in one place.",
        points: [
          "Group, lesson and teacher",
          "Schedule and attendance",
          "Internal tests and results"
        ]
      }
    ],
    expenseCard: {
      badge: "Expenses",
      title: "See where your money goes.",
      description:
        "Track fuel, repairs and other expenses. See what has been paid and what still needs paying.",
    },
    teamCard: {
      badge: "Branches and team",
      title: "Keep every branch in view.",
      description:
        "Give staff access for their work. Manage branches and instructors in one system.",
      stats: [
        { count: "3", label: "branches" },
        { count: "8", label: "instructors" },
      ],
      sampleNote: "* Branches and instructors from a sample school.",
    },
    roadmapCard: {
      title: "Planned",
      notice: "These features are planned and not yet available:",
      items: [
        {
          title: "Connection to the state traffic system",
          badge: "Planned",
          description: "Sending group and exam records to the state system is planned.",
        },
        {
          title: "Bank payments",
          badge: "Planned",
          description: "Bank app payments and automatic payment record updates are planned.",
        },
      ],
    },
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Explore the demo. Try it at your school.",
    steps: [
      {
        number: "01",
        title: "Open demo",
        description: "Check payments, debt and attendance in a sample school.",
      },
      {
        number: "02",
        title: "Check the fit",
        description: "Review your branches, team and current way of working with us.",
      },
      {
        number: "03",
        title: "Request trial",
        description: "Agree on the 30-day trial, data migration, team training and price in writing.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing and trial",
    title: "Try it at your school before deciding.",
    description:
      "Tell us your branch and student counts. Get a written offer with pricing and 30-day trial terms.",
    demoCard: {
      label: "Sample school",
      badgeLogin: "demo email and password required",
      badgeOneClick: "one click",
      price: "0 UZS",
      description: "Explore the owner dashboard, payments and lessons with sample data.",
    },
    trialCard: {
      label: "Trial for your school",
      badge: "Written offer",
      description: "30 days with your school’s data. We agree on pricing and terms in writing before you start.",
    },
    comparisonRows: [
      {
        field: "Price",
        value: "Based on your branch and student counts.",
      },
      {
        field: "Trial",
        value: "30 days with your own school data.",
      },
      {
        field: "After the trial",
        value: "You decide whether to continue.",
      },
    ],
    form: {
      title: "Request a trial for your school",
      requiredNote: "Required",
      fields: {
        name: {
          label: "Full name",
          placeholder: "e.g., Azizbek Karimov",
          error: "Enter your name.",
        },
        phone: {
          label: "Phone number",
          placeholder: "+998 90 123 45 67",
          error: "Enter your full phone number, for example +998 90 123 45 67.",
        },
        school: {
          label: "Driving school name",
          placeholder: "School name",
          error: "Enter your driving school’s name.",
        },
        city: {
          label: "City or region",
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
          label: "Number of branches",
          options: ["1", "2–3", "4+"],
        },
        students: {
          label: "Number of students",
          options: ["Under 100", "100–500", "500–1500", "1500+"],
        },
        flows: {
          label: "What would you like to improve?",
          options: [
            "Students",
            "Payments and debt",
            "Schedule and attendance",
            "Driving practice",
            "Fleet and expenses",
            "Branches",
          ],
        },
        consent: {
          label: "I agree to be contacted about my trial request and to the processing of my contact details.",
          error: "Agree to be contacted before sending your request.",
        },
      },
      submit: "Request trial",
      submitting: "Sending…",
      success: {
        title: "Request received.",
        message: "We’ll contact you to agree on trial terms.",
        demoCta: "Open demo",
        resetButton: "Send another request",
      },
      networkError: "We could not confirm receipt. Your details remain in the form. Sending again may create a duplicate request.",
      disclaimer: "Your number is used only to contact you about the trial.",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions.",
    items: [
      {
        question: "What can I see as a school owner?",
        answerLogin:
          "Revenue, expenses, student debt and attendance in one place. Compare branches and see which payments or lessons need attention.",
      },
      {
        question: "How do I open the demo?",
        answerLogin:
          "“Open demo” takes you to the login page. Use a demo email and password.",
        answerOneClick:
          "“Open demo” opens a sample school without a password. Demo access is temporary.",
      },
      {
        question: "How is the trial different from the demo?",
        answerLogin:
          "The demo uses sample data. The trial runs for 30 days with your school’s data. We agree on pricing and limits in writing.",
      },
      {
        question: "How many branches can we connect?",
        answerLogin:
          "The demo shows several branches. We confirm your school’s branch count in the written offer.",
      },
      {
        question: "Can we track vehicles with GPS?",
        answerLogin:
          "GPS devices are not currently connected to the demo map. Discuss connection options and terms with our team.",
      },
      {
        question: "How do we move from Excel and paper records?",
        answerLogin:
          "We review your lists together. Data migration and staff training are agreed before the trial.",
      },
      {
        question: "How are access rights managed?",
        answerLogin:
          "Staff see the sections they need for their work. We review access permissions together before setup.",
      },
    ],
  },
  finalCta: {
    title: "See how your school is doing.",
    demoButton: "Open demo",
    trialButton: "Request trial",
  },
  footer: {
    tagline: "driving school management system",
    links: [
      { label: "Features", href: "#yol" },
      { label: "Pricing", href: "#tariflar" },
      { label: "FAQ", href: "#savollar" },
      { label: "Updates", href: "/en/changelog" },
      { label: "Log in", href: "https://app.automaktab.uz/login" },
    ],
    languages: [
      { code: "uz", label: "UZ", active: false },
      { code: "ru", label: "RU", active: false },
      { code: "en", label: "EN", active: true },
    ],
    copyright: "© 2026 automaktab.uz. All rights reserved.",
  },
};
