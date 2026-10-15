/**
 * Drex helper for keyword grouping. Pure builders only: no network, no secrets.
 *
 * Wire contract (Drex choice batch):
 *   { model, state: { keywords }, questions: { k0: { type, instructions, criteria }, ... } }
 * Question ids are stable positional ids (`k0`, `k1`, ...) in keyword order,
 * so duplicate keywords still map 1:1 to answers.
 *
 * Live-call preconditions (enforce before any network call):
 * - `isKeywordGroupsEnabled(flags)` must be strictly `=== true`;
 *   `assertKeywordGroupsEnabled` throws otherwise.
 * - `assertRealTopics(criteria)` must pass: TOPIC_IDS ship with generic
 *   "Placeholder ..." descriptions until the real 10-topic taxonomy lands;
 *   keep the length at 10 so criteria stay in sync.
 *
 * Parsing:
 * - `groupByAnswers` is strict positional: answers.length must equal
 *   keywords.length or it throws `KeywordGroupsError` (no silent pad/truncate).
 * - `groupFromEnvelope` accepts a Drex envelope `{ answers: {...} }` keyed by
 *   question id, `{ answers: [...] }`, or a bare `[...]` array fallback.
 *   Missing question ids in map form throw; extra keys are ignored.
 * - Per-answer matching is case/whitespace-insensitive (`normalizeAnswer`);
 *   present-but-unrecognized answers become `{ topic: null }` (safe default).
 */

export const KEYWORD_GROUPS_FLAG = "keyword-groups";

export const KEYWORD_GROUPING_MODEL = "drex-v2.0" as const;

export const TOPIC_IDS = [
  "topic-01",
  "topic-02",
  "topic-03",
  "topic-04",
  "topic-05",
  "topic-06",
  "topic-07",
  "topic-08",
  "topic-09",
  "topic-10",
] as const;

export type TopicId = (typeof TOPIC_IDS)[number];

export class KeywordGroupsError extends Error {
  constructor(message: string) {
    super(`keyword-groups: ${message}`);
    this.name = "KeywordGroupsError";
  }
}

export interface KeywordChoiceQuestion {
  type: "choice";
  instructions: string;
  criteria: Record<TopicId, string>;
}

export interface KeywordBatchRequest {
  model: typeof KEYWORD_GROUPING_MODEL;
  state: { keywords: string[] };
  questions: Record<string, KeywordChoiceQuestion>;
}

export type KeywordAnswersMap = Record<string, unknown>;

export type KeywordEnvelope =
  | { answers: KeywordAnswersMap; model?: unknown }
  | { answers: readonly unknown[]; model?: unknown }
  | readonly unknown[];

export interface GroupedKeyword {
  keyword: string;
  topic: TopicId | null;
}

const TOPIC_SET = new Set<string>(TOPIC_IDS);

export function isKeywordGroupsEnabled(
  flags?: Record<string, unknown>,
): boolean {
  return flags?.[KEYWORD_GROUPS_FLAG] === true;
}

export function assertKeywordGroupsEnabled(
  flags?: Record<string, unknown>,
): void {
  if (!isKeywordGroupsEnabled(flags)) {
    throw new KeywordGroupsError(
      `flag "${KEYWORD_GROUPS_FLAG}" is not strictly true; live calls are blocked`,
    );
  }
}

export function questionIdFor(index: number): string {
  return `k${index}`;
}

function sanitizeKeyword(keyword: string): string {
  return keyword
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r\n|\r|\n/g, "\\n");
}

function assertValidKeyword(keyword: unknown, index: number): asserts keyword is string {
  if (typeof keyword !== "string" || keyword.trim() === "") {
    throw new KeywordGroupsError(`invalid empty keyword at index ${index}`);
  }
}

export function buildCriteria(): Record<TopicId, string> {
  const criteria = {} as Record<TopicId, string>;
  for (const id of TOPIC_IDS) {
    criteria[id] = `Placeholder description for ${id}.`;
  }
  return criteria;
}

export function assertRealTopics(
  criteria: Record<string, string> = buildCriteria(),
): void {
  const blocked = Object.entries(criteria ?? {})
    .filter(
      ([, description]) =>
        typeof description === "string" && description.includes("Placeholder"),
    )
    .map(([id]) => id);
  if (blocked.length > 0) {
    throw new KeywordGroupsError(
      `placeholder topics block live use: ${blocked.join(", ")}`,
    );
  }
}

function buildQuestion(keyword: string, index: number): KeywordChoiceQuestion {
  assertValidKeyword(keyword, index);
  return {
    type: "choice",
    instructions: `Classify the keyword "${sanitizeKeyword(keyword)}" into exactly one of the listed topics. Reply with only the topic id.`,
    criteria: buildCriteria(),
  };
}

export function buildKeywordChoiceRequest(
  keyword: string,
): KeywordChoiceQuestion {
  return buildQuestion(keyword, 0);
}

export function buildBatchRequest(
  keywords: readonly string[],
): KeywordBatchRequest {
  const list = [...keywords];
  const questions: Record<string, KeywordChoiceQuestion> = {};
  list.forEach((keyword, index) => {
    questions[questionIdFor(index)] = buildQuestion(keyword, index);
  });
  return {
    model: KEYWORD_GROUPING_MODEL,
    state: { keywords: list },
    questions,
  };
}

export function normalizeAnswer(answer: unknown): TopicId | null {
  if (typeof answer !== "string") return null;
  const clean = answer.trim().toLowerCase();
  return TOPIC_SET.has(clean) ? (clean as TopicId) : null;
}

export function groupByAnswers(
  keywords: readonly string[],
  answers: readonly unknown[],
): GroupedKeyword[] {
  if (answers.length !== keywords.length) {
    throw new KeywordGroupsError(
      `answers length ${answers.length} does not match keywords length ${keywords.length}`,
    );
  }
  return keywords.map((keyword, index) => ({
    keyword,
    topic: normalizeAnswer(answers[index]),
  }));
}

function resolveEnvelopeAnswers(count: number, envelope: unknown): unknown[] {
  const raw = Array.isArray(envelope)
    ? envelope
    : typeof envelope === "object" && envelope !== null && "answers" in envelope
      ? (envelope as { answers: unknown }).answers
      : undefined;
  if (Array.isArray(raw)) return [...raw];
  if (typeof raw === "object" && raw !== null) {
    const map = raw as Record<string, unknown>;
    const missing: string[] = [];
    const ordered = Array.from({ length: count }, (_, index) => {
      const id = questionIdFor(index);
      if (!(id in map)) missing.push(id);
      return map[id] ?? null;
    });
    if (missing.length > 0) {
      throw new KeywordGroupsError(
        `answers map is missing question ids: ${missing.join(", ")}`,
      );
    }
    return ordered;
  }
  throw new KeywordGroupsError(
    "envelope must be { answers: {...} }, { answers: [...] }, or a bare answers array",
  );
}

export function groupFromEnvelope(
  keywords: readonly string[],
  envelope: unknown,
): GroupedKeyword[] {
  return groupByAnswers(keywords, resolveEnvelopeAnswers(keywords.length, envelope));
}

// Offline served-model check: validates the envelope model field when
// present. No network, no secrets.
export function isServedModel(envelope: unknown): boolean {
  if (typeof envelope === "string") return envelope === KEYWORD_GROUPING_MODEL;
  if (
    typeof envelope === "object" &&
    envelope !== null &&
    !Array.isArray(envelope) &&
    "model" in envelope
  ) {
    return (envelope as { model: unknown }).model === KEYWORD_GROUPING_MODEL;
  }
  return false;
}

export function safeDefault(keyword: string): GroupedKeyword[] {
  return [{ keyword, topic: null }];
}
