export const DEMO_TRIAGE_MODEL = "drex-v2.0" as const;
export const DEMO_TRIAGE_FLAG = "DEMO_DREX_ENABLED";

export type DemoStudentCount = "<50" | "50-150" | "150-300" | "300+";

export type DemoTriageMeta = {
  source: string;
  region?: string;
  student_count?: DemoStudentCount | undefined;
};

export type DemoTriageRequest = {
  model: typeof DEMO_TRIAGE_MODEL;
  state: { note: string; meta: DemoTriageMeta };
  questions: {
    is_spam: {
      type: "noul";
      instructions: string;
      criteria: { true: string; false: string };
    };
    intent: {
      type: "choice";
      instructions: string;
      criteria: { demo: string; pricing: string; callback: string };
    };
    urgency: {
      type: "score";
      instructions: string;
      criteria: [string, string, string];
    };
  };
};

export function buildDemoTriageRequest(
  note: string | undefined,
  meta: DemoTriageMeta,
): DemoTriageRequest {
  return {
    model: DEMO_TRIAGE_MODEL,
    state: { note: note ?? "", meta },
    questions: {
      is_spam: {
        type: "noul",
        instructions:
          "Is this demo request spam, an automated probe, or otherwise not a genuine school inquiry?",
        criteria: {
          true: "Spam, bot probe, gibberish, or no genuine school interest.",
          false: "Genuine inquiry from a school or training center.",
        },
      },
      intent: {
        type: "choice",
        instructions:
          "What does the requester want: an immediate self-service demo, pricing details, or a callback?",
        criteria: {
          demo: "Wants immediate self-service demo access.",
          pricing: "Asks about price, tariff, or trial terms.",
          callback: "Requests a call back or personal contact.",
        },
      },
      urgency: {
        type: "score",
        instructions:
          "How urgent is this request based on the note and metadata?",
        criteria: [
          "No urgency signals; general interest only.",
          "Some time pressure; wants a response soon.",
          "Explicit urgency; asks for contact as soon as possible.",
        ],
      },
    },
  };
}

function asFiniteProbability(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
    ? value
    : null;
}

export function parseNoulYes(answer: unknown): number | null {
  if (
    typeof answer === "object" &&
    answer !== null &&
    !Array.isArray(answer)
  ) {
    const record = answer as Record<string, unknown>;
    if ("probability" in record) return asFiniteProbability(record.probability);
    if ("p_yes" in record) return asFiniteProbability(record.p_yes);
    if ("yes" in record) return asFiniteProbability(record.yes);
    return null;
  }
  return asFiniteProbability(answer);
}

export function isSpam(probability: unknown, threshold = 0.8): boolean {
  const p = parseNoulYes(probability);
  return p !== null && p >= threshold;
}

export function isUncertain(probability: unknown): boolean {
  return parseNoulYes(probability) === null;
}

export type DemoIntent = "demo" | "pricing" | "callback";

export function parseIntent(answer: unknown): DemoIntent | null {
  if (
    typeof answer === "object" &&
    answer !== null &&
    "choice" in answer &&
    (answer as { choice: unknown }).choice !== undefined
  ) {
    const c = (answer as { choice: unknown }).choice;
    return c === "demo" || c === "pricing" || c === "callback" ? c : null;
  }
  return typeof answer === "string" &&
    (answer === "demo" || answer === "pricing" || answer === "callback")
    ? answer
    : null;
}

// Urgency score is a 0-indexed 0..2 integer scale into criteria[0..2].
export function parseUrgencyScore(answer: unknown): number | null {
  const raw =
    typeof answer === "object" && answer !== null && "score" in answer
      ? (answer as { score: unknown }).score
      : answer;
  return typeof raw === "number" &&
    Number.isInteger(raw) &&
    raw >= 0 &&
    raw <= 2
    ? raw
    : null;
}

// threshold defaults to 2 (highest urgency bucket); pass a lower value
// to treat medium urgency as urgent.
export function isUrgent(score: unknown, threshold = 2): boolean {
  const s = parseUrgencyScore(score);
  return s !== null && s >= threshold;
}

// Offline served-model check: validates the envelope model field when
// present. No network, no secrets.
export function isServedModel(envelope: unknown): boolean {
  if (typeof envelope === "string") return envelope === DEMO_TRIAGE_MODEL;
  if (typeof envelope === "object" && envelope !== null && !Array.isArray(envelope)) {
    if (!("model" in envelope)) return false;
    return (envelope as { model: unknown }).model === DEMO_TRIAGE_MODEL;
  }
  return false;
}

export function shouldTriage(): boolean {
  return process.env[DEMO_TRIAGE_FLAG] === "1";
}

export function safeDefault(reason = "drex-disabled"): {
  action: "forward_as_is";
  log: string;
} {
  return {
    action: "forward_as_is",
    log: `demo-triage: ${reason}; forwarding unchanged`,
  };
}
