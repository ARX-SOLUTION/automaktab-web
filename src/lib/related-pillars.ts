import { SEO_RELATED_PAGE_IDS } from "@/config/seo-pages";
import type { Locale } from "@/i18n/config";

/** Single source of truth is SEO_RELATED_PAGE_IDS; drift is impossible by construction. */
export const PILLAR_IDS = SEO_RELATED_PAGE_IDS;

export type PillarId = (typeof PILLAR_IDS)[number];

export const PILLAR_CHOICE_MODEL = "drex-v2.0" as const;

export type PillarChoiceRequest = {
  model: string;
  state: {
    title: string;
    excerpt: string;
    tags: string[];
  };
  questions: {
    related_pillars: {
      type: "choice";
      instructions: string;
      criteria: Record<PillarId, string>;
    };
  };
};

const PILLAR_CRITERIA: Record<PillarId, string> = {
  payments: "Student payments and outstanding debt: who paid and who still owes.",
  schedule: "Lesson schedules, groups and teachers: theory and driving practice planning.",
  attendance: "Lesson attendance records: present, late, absent or excused.",
  branches: "Branch performance and the owner dashboard: revenue compared across branches.",
  pricing: "Pricing, tariffs and trial terms for the school.",
  leads: "Inquiries and enrollment: collecting candidate requests and placing students into groups.",
};

const KEYWORDS: Record<PillarId, readonly string[]> = {
  payments: [
    "payment",
    "debt",
    "debtor",
    "tolov",
    "qarz",
    "qarzdor",
    "oplata",
    "оплата",
    "оплаты",
    "задолженность",
    "долг",
  ],
  schedule: [
    "schedule",
    "timetable",
    "calendar",
    "lesson",
    "group",
    "teacher",
    "theory",
    "practice",
    "driving lesson",
    "jadval",
    "guruh",
    "dars",
    "oqituvchi",
    "nazariya",
    "amaliy",
    "расписание",
    "группа",
    "группы",
    "занятие",
    "преподаватель",
    "теория",
    "практика",
    "вождение",
  ],
  attendance: [
    "attendance",
    "present",
    "absent",
    "late",
    "excused",
    "register",
    "davomat",
    "keldi",
    "kelmadi",
    "kechikdi",
    "jurnal",
    "посещаемость",
    "пришел",
    "опоздал",
    "журнал",
  ],
  branches: [
    "branch",
    "filial",
    "revenue",
    "dashboard",
    "owner",
    "rahbar",
    "tushum",
    "филиал",
    "выручка",
    "руководитель",
    "владелец",
    "панель",
  ],
  pricing: [
    "pricing",
    "price",
    "tariff",
    "tarif",
    "trial",
    "cost",
    "narx",
    "sinov",
    "стоимость",
    "цена",
    "пробный",
    "тариф",
  ],
  leads: [
    "lead",
    "inquiry",
    "inquiries",
    "enrollment",
    "candidate",
    "murojaat",
    "qabul",
    "nomzod",
    "abiturient",
    "заявка",
    "заявки",
    "прием",
    "приём",
    "кандидат",
    "зачисление",
  ],
};

const MIN_TOKEN_LENGTH = 3;

const EN_STOPWORDS = [
  "the",
  "and",
  "for",
  "with",
  "how",
  "who",
  "what",
  "see",
  "are",
  "you",
  "your",
  "from",
  "that",
  "this",
  "have",
  "will",
  "would",
  "can",
  "not",
  "but",
  "about",
  "into",
  "over",
  "after",
  "before",
  "each",
  "other",
  "than",
  "then",
  "when",
  "where",
  "which",
  "while",
  "also",
  "just",
  "like",
  "more",
  "most",
  "some",
  "they",
  "them",
  "their",
  "there",
  "here",
  "was",
  "were",
  "been",
  "does",
  "did",
  "using",
  "used",
  "many",
  "much",
  "course",
];

const UZ_STOPWORDS = [
  "va",
  "bir",
  "bu",
  "shu",
  "uchun",
  "bilan",
  "qanday",
  "kim",
  "nima",
  "ham",
  "emas",
  "yoki",
  "har",
  "eng",
  "hamda",
  "orqali",
  "edi",
  "bor",
  "agar",
  "lekin",
];

const RU_STOPWORDS = [
  "для",
  "как",
  "что",
  "кто",
  "или",
  "это",
  "все",
  "так",
  "уже",
  "если",
  "когда",
  "где",
  "какой",
  "какие",
  "можно",
  "нужно",
  "есть",
  "было",
  "будет",
  "его",
  "ее",
  "они",
  "мы",
  "вы",
];

const STOPWORDS: ReadonlySet<string> = new Set([
  ...EN_STOPWORDS,
  ...UZ_STOPWORDS,
  ...RU_STOPWORDS,
]);

const MAX_RESULTS = 3;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/['‘’`ʻʼ]/g, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function splitTokens(normalized: string): string[] {
  return normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

function tokenize(value: string): string[] {
  return splitTokens(normalize(value)).filter(
    (token) => token.length >= MIN_TOKEN_LENGTH && !STOPWORDS.has(token),
  );
}

function bigrams(tokens: readonly string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i + 1 < tokens.length; i++) {
    out.push(`${tokens[i]} ${tokens[i + 1]}`);
  }
  return out;
}

type PillarSignals = {
  tokens: ReadonlySet<string>;
  bigrams: ReadonlySet<string>;
};

function buildSignals(): Record<PillarId, PillarSignals> {
  const out = {} as Record<PillarId, PillarSignals>;
  for (const pillar of PILLAR_IDS) {
    const tokens: string[] = [];
    const bigramList: string[] = [];
    for (const phrase of KEYWORDS[pillar]) {
      const parts = splitTokens(normalize(phrase)).filter(
        (token) => token.length >= MIN_TOKEN_LENGTH && !STOPWORDS.has(token),
      );
      tokens.push(...parts);
      bigramList.push(...bigrams(parts));
    }
    out[pillar] = { tokens: new Set(tokens), bigrams: new Set(bigramList) };
  }
  return out;
}

const SIGNALS = buildSignals();

function tokenHits(token: string, signals: PillarSignals): boolean {
  if (signals.tokens.has(token)) return true;
  for (const key of signals.tokens) {
    if (token.includes(key) || key.includes(token)) return true;
  }
  return false;
}

type TagSignals = {
  raw: string;
  tokens: string[];
  bigrams: string[];
};

function tagHits(pillar: PillarId, tag: TagSignals): boolean {
  if (tag.raw === pillar) return true;
  const signals = SIGNALS[pillar];
  if (tag.tokens.some((token) => tokenHits(token, signals))) return true;
  return tag.bigrams.some((bigram) => signals.bigrams.has(bigram));
}

// Weights: title token x3 (+2 title bigram bonus) / excerpt token x1
// (+1 excerpt bigram bonus) / tag x5 capped once per tag. Ties keep PILLAR_IDS order.
function scorePillar(
  pillar: PillarId,
  titleTokens: readonly string[],
  excerptTokens: readonly string[],
  titleBigrams: readonly string[],
  excerptBigrams: readonly string[],
  tags: readonly TagSignals[],
): number {
  const signals = SIGNALS[pillar];
  let score = 0;
  for (const token of titleTokens) if (tokenHits(token, signals)) score += 3;
  for (const token of excerptTokens) if (tokenHits(token, signals)) score += 1;
  for (const bigram of titleBigrams) if (signals.bigrams.has(bigram)) score += 2;
  for (const bigram of excerptBigrams) if (signals.bigrams.has(bigram)) score += 1;
  for (const tag of tags) {
    if (!tag.raw) continue;
    if (tagHits(pillar, tag)) score += 5;
  }
  return score;
}

function coerceText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  return "";
}

function coerceTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return tags.filter((tag): tag is string => typeof tag === "string");
}

function toTagSignals(tag: string): TagSignals {
  const raw = normalize(tag.trim());
  const tokens = tokenize(tag);
  return { raw, tokens, bigrams: bigrams(tokens) };
}

export function recommendPillarsBaseline(
  title: unknown,
  excerpt: unknown,
  tags: unknown = [],
  currentPillarId?: unknown,
  minScore = 1,
): PillarId[] {
  const titleText = coerceText(title);
  const excerptText = coerceText(excerpt);
  const titleTokens = tokenize(titleText);
  const excerptTokens = tokenize(excerptText);
  const tagSignals = coerceTags(tags).map(toTagSignals);
  const threshold =
    typeof minScore === "number" && Number.isFinite(minScore) ? minScore : 1;
  const self = normalizePillarId(currentPillarId);
  return PILLAR_IDS.filter((pillar) => pillar !== self)
    .map((pillar) => ({
      pillar,
      score: scorePillar(
        pillar,
        titleTokens,
        excerptTokens,
        bigrams(titleTokens),
        bigrams(excerptTokens),
        tagSignals,
      ),
    }))
    .filter((entry) => entry.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map((entry) => entry.pillar);
}

export function buildPillarChoiceRequest(
  title: unknown,
  excerpt: unknown,
  tags: unknown = [],
  locale: Locale = "uz",
  model: string = PILLAR_CHOICE_MODEL,
): PillarChoiceRequest {
  const safeTitle = coerceText(title);
  const safeLocale: Locale = locale === "ru" || locale === "en" ? locale : "uz";
  const safeModel = typeof model === "string" && model ? model : PILLAR_CHOICE_MODEL;
  return {
    model: safeModel,
    state: {
      title: safeTitle,
      excerpt: coerceText(excerpt),
      tags: coerceTags(tags),
    },
    questions: {
      related_pillars: {
        type: "choice",
        instructions:
          `Pick up to 3 related pillars for the page titled "${safeTitle}" (locale "${safeLocale}"). Reply with pillar ids only.`,
        criteria: { ...PILLAR_CRITERIA },
      },
    },
  };
}

function isPillarId(value: unknown): value is PillarId {
  return (
    typeof value === "string" &&
    (PILLAR_IDS as readonly string[]).includes(value)
  );
}

function normalizePillarId(value: unknown): PillarId | null {
  if (typeof value !== "string") return null;
  const clean = value.trim().toLowerCase();
  return isPillarId(clean) ? clean : null;
}

function sanitizeBaseline(baseline: unknown): PillarId[] {
  if (!Array.isArray(baseline)) return [];
  const out: PillarId[] = [];
  for (const item of baseline) {
    const id = normalizePillarId(item);
    if (id && !out.includes(id)) out.push(id);
    if (out.length === MAX_RESULTS) break;
  }
  return out;
}

function parsePillarAnswer(answer: unknown): PillarId[] {
  let items: unknown[];
  if (typeof answer === "string") {
    items = [answer];
  } else if (Array.isArray(answer)) {
    items = answer.flatMap((item) => {
      if (typeof item === "string") return [item];
      if (typeof item === "object" && item !== null && "choice" in item) {
        const nested = (item as { choice: unknown }).choice;
        if (typeof nested === "string") return [nested];
        if (Array.isArray(nested)) return nested;
      }
      return [];
    });
  } else if (typeof answer === "object" && answer !== null) {
    const record = answer as Record<string, unknown>;
    if ("choice" in record) {
      const choice = record.choice;
      items = typeof choice === "string" ? [choice] : Array.isArray(choice) ? choice : [];
    } else if ("answers" in record) {
      const answers = record.answers;
      items =
        typeof answers === "string" ? [answers] : Array.isArray(answers) ? answers : [];
    } else {
      return [];
    }
  } else {
    return [];
  }
  const out: PillarId[] = [];
  for (const item of items) {
    const id = normalizePillarId(item);
    if (id && !out.includes(id)) out.push(id);
    if (out.length === MAX_RESULTS) break;
  }
  return out;
}

export function applyPillarAnswer(baseline: unknown, answer?: unknown): PillarId[] {
  const cleanBaseline = sanitizeBaseline(baseline);
  const merged: PillarId[] = [...parsePillarAnswer(answer)];
  for (const id of cleanBaseline) {
    if (merged.length >= MAX_RESULTS) break;
    if (!merged.includes(id)) merged.push(id);
  }
  return merged.slice(0, MAX_RESULTS);
}
