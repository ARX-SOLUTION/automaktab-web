import { describe, it, expect, afterEach, vi } from "vitest";
import {
  buildDemoTriageRequest,
  DEMO_TRIAGE_FLAG,
  DEMO_TRIAGE_MODEL,
  isServedModel,
  isSpam,
  isUncertain,
  isUrgent,
  parseIntent,
  parseNoulYes,
  parseUrgencyScore,
  safeDefault,
  shouldTriage,
} from "./demo-triage";

const meta = { source: "landing:uz", region: "Tashkent" };

describe("buildDemoTriageRequest", () => {
  it("pins drex-v2.0 with string instructions and typed criteria", () => {
    const req = buildDemoTriageRequest("hello", meta);
    expect(req.model).toBe("drex-v2.0");
    expect(req.state).toEqual({ note: "hello", meta });
    expect(req.questions.is_spam.type).toBe("noul");
    expect(typeof req.questions.is_spam.instructions).toBe("string");
    expect(typeof req.questions.intent.instructions).toBe("string");
    expect(typeof req.questions.urgency.instructions).toBe("string");
    expect(Object.keys(req.questions.intent.criteria)).toEqual([
      "demo",
      "pricing",
      "callback",
    ]);
    expect(req.questions.urgency.criteria).toHaveLength(3);
  });

  it("has non-empty instructions/criteria on every question", () => {
    const req = buildDemoTriageRequest("hello", meta);
    for (const q of [
      req.questions.is_spam,
      req.questions.intent,
      req.questions.urgency,
    ]) {
      expect(q.instructions.trim().length).toBeGreaterThan(0);
    }
    expect(req.questions.is_spam.criteria.true.trim().length).toBeGreaterThan(0);
    expect(req.questions.is_spam.criteria.false.trim().length).toBeGreaterThan(0);
    expect(req.questions.intent.criteria.demo.trim().length).toBeGreaterThan(0);
    expect(req.questions.intent.criteria.pricing.trim().length).toBeGreaterThan(0);
    expect(req.questions.intent.criteria.callback.trim().length).toBeGreaterThan(0);
    for (const label of req.questions.urgency.criteria) {
      expect(label.trim().length).toBeGreaterThan(0);
    }
  });

  it("passes student_count meta through and defaults empty note", () => {
    const withCount = buildDemoTriageRequest("hi", {
      ...meta,
      student_count: "50-150",
    });
    expect(withCount.state.meta.student_count).toBe("50-150");
    const emptyNote = buildDemoTriageRequest(undefined, meta);
    expect(emptyNote.state.note).toBe("");
    expect(emptyNote.state.meta).toEqual(meta);
  });
});

describe("thresholds", () => {
  it("parses noul probability and applies spam threshold", () => {
    expect(parseNoulYes(0.9)).toBe(0.9);
    expect(parseNoulYes(2)).toBeNull();
    expect(parseNoulYes("x")).toBeNull();
    expect(isSpam(0.9)).toBe(true);
    expect(isSpam(0.5)).toBe(false);
  });

  it("unwraps Drex noul object shapes", () => {
    expect(parseNoulYes({ probability: 0.9 })).toBe(0.9);
    expect(parseNoulYes({ p_yes: 0.9 })).toBe(0.9);
    expect(parseNoulYes({ yes: 0.9 })).toBe(0.9);
    expect(parseNoulYes(0.9)).toBe(0.9);
    expect(parseNoulYes({ probability: 2 })).toBeNull();
    expect(parseNoulYes({})).toBeNull();
    expect(isSpam({ probability: 0.9 })).toBe(true);
    expect(isSpam({ p_yes: 0.5 })).toBe(false);
    expect(isSpam({ yes: 0.95 })).toBe(true);
  });

  it("treats spam boundary and non-numeric noul as not-spam", () => {
    expect(isSpam(0.8)).toBe(true);
    expect(isSpam(0.7999)).toBe(false);
    expect(isSpam(NaN)).toBe(false);
    expect(isSpam(Infinity)).toBe(false);
    expect(isSpam(null)).toBe(false);
    expect(isSpam(undefined)).toBe(false);
    expect(isSpam({})).toBe(false);
    expect(parseNoulYes(NaN)).toBeNull();
    expect(parseNoulYes(Infinity)).toBeNull();
    expect(parseNoulYes(null)).toBeNull();
    expect(parseNoulYes(undefined)).toBeNull();
  });

  it("flags uncertain parses without conflating them with not-spam", () => {
    expect(isUncertain(null)).toBe(true);
    expect(isUncertain(undefined)).toBe(true);
    expect(isUncertain({})).toBe(true);
    expect(isUncertain(NaN)).toBe(true);
    expect(isUncertain(0.5)).toBe(false);
    expect(isUncertain({ probability: 0.5 })).toBe(false);
    expect(isSpam(null)).toBe(false);
  });

  it("supports custom spam thresholds", () => {
    expect(isSpam(0.5, 0.5)).toBe(true);
    expect(isSpam(0.5, 0.9)).toBe(false);
  });

  it("parses intent choice and urgency score", () => {
    expect(parseIntent({ choice: "pricing" })).toBe("pricing");
    expect(parseIntent({ choice: "other" })).toBeNull();
    expect(parseIntent("callback")).toBe("callback");
    expect(parseUrgencyScore({ score: 2 })).toBe(2);
    expect(parseUrgencyScore(5)).toBeNull();
    expect(isUrgent({ score: 2 })).toBe(true);
    expect(isUrgent({ score: 0 })).toBe(false);
  });

  it("rejects intent variants", () => {
    expect(parseIntent(null)).toBeNull();
    expect(parseIntent({})).toBeNull();
    expect(parseIntent("")).toBeNull();
    expect(parseIntent("Demo")).toBeNull();
    expect(parseIntent(" demo")).toBeNull();
    expect(parseIntent("demo ")).toBeNull();
    expect(parseIntent("demo")).toBe("demo");
  });

  it("guards urgency score edges on the 0..2 integer scale", () => {
    expect(parseUrgencyScore(0)).toBe(0);
    expect(parseUrgencyScore(1)).toBe(1);
    expect(parseUrgencyScore(2)).toBe(2);
    expect(parseUrgencyScore({ score: 1 })).toBe(1);
    expect(parseUrgencyScore(NaN)).toBeNull();
    expect(parseUrgencyScore(Infinity)).toBeNull();
    expect(parseUrgencyScore(-1)).toBeNull();
    expect(parseUrgencyScore(2.5)).toBeNull();
    expect(parseUrgencyScore(1.5)).toBeNull();
    expect(parseUrgencyScore("2")).toBeNull();
    expect(parseUrgencyScore(null)).toBeNull();
    expect(parseUrgencyScore({ score: null })).toBeNull();
    expect(isUrgent(1.5)).toBe(false);
  });

  it("supports custom urgency thresholds", () => {
    expect(isUrgent({ score: 1 }, 1)).toBe(true);
    expect(isUrgent({ score: 0 }, 1)).toBe(false);
    expect(isUrgent(2)).toBe(true);
  });
});

describe("isServedModel", () => {
  it("validates the envelope model field without network", () => {
    expect(isServedModel(DEMO_TRIAGE_MODEL)).toBe(true);
    expect(isServedModel({ model: "drex-v2.0" })).toBe(true);
    expect(isServedModel({ model: "other" })).toBe(false);
    expect(isServedModel({})).toBe(false);
    expect(isServedModel(null)).toBe(false);
    expect(isServedModel("drex-v1.0")).toBe(false);
  });
});

describe("safeDefault", () => {
  it("forwards as-is with a log string", () => {
    const d = safeDefault();
    expect(d.action).toBe("forward_as_is");
    expect(typeof d.log).toBe("string");
  });

  it("keeps shape and embeds the reason", () => {
    const d = safeDefault("triage-enabled-forward-as-is");
    expect(d).toEqual({
      action: "forward_as_is",
      log: "demo-triage: triage-enabled-forward-as-is; forwarding unchanged",
    });
  });
});

describe("shouldTriage", () => {
  afterEach(() => {
    delete process.env[DEMO_TRIAGE_FLAG];
    vi.unstubAllEnvs();
  });

  it("is false by default and true only when flag is '1'", () => {
    delete process.env[DEMO_TRIAGE_FLAG];
    expect(shouldTriage()).toBe(false);
    process.env[DEMO_TRIAGE_FLAG] = "0";
    expect(shouldTriage()).toBe(false);
    process.env[DEMO_TRIAGE_FLAG] = "1";
    expect(shouldTriage()).toBe(true);
  });

  it("is false when flag is unset", () => {
    vi.stubEnv(DEMO_TRIAGE_FLAG, undefined as unknown as string);
    delete process.env[DEMO_TRIAGE_FLAG];
    expect(shouldTriage()).toBe(false);
  });
});
