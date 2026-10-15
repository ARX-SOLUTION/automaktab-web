import { describe, it, expect } from "vitest";
import {
  KEYWORD_GROUPS_FLAG,
  KEYWORD_GROUPING_MODEL,
  KeywordGroupsError,
  TOPIC_IDS,
  assertKeywordGroupsEnabled,
  assertRealTopics,
  buildBatchRequest,
  buildCriteria,
  buildKeywordChoiceRequest,
  groupByAnswers,
  groupFromEnvelope,
  isKeywordGroupsEnabled,
  isServedModel,
  normalizeAnswer,
  questionIdFor,
  safeDefault,
} from "./keyword-groups";

describe("buildKeywordChoiceRequest", () => {
  it("emits a choice question with instructions and 10-topic criteria", () => {
    const request = buildKeywordChoiceRequest("yozgi shinalar");
    expect(request.type).toBe("choice");
    expect(request.instructions).toContain('"yozgi shinalar"');
    expect(TOPIC_IDS).toHaveLength(10);
    expect(Object.keys(request.criteria)).toHaveLength(10);
    for (const id of TOPIC_IDS) {
      expect(request.criteria[id]).toBeTypeOf("string");
    }
  });

  it("escapes quotes, backslashes, and newlines in interpolation", () => {
    const request = buildKeywordChoiceRequest('say "hi"\nnew\\line');
    expect(request.instructions).toContain('say \\"hi\\"\\nnew\\\\line');
    const line = request.instructions;
    expect(line.includes("\n") || line.includes("\r")).toBe(false);
  });

  it("rejects empty keywords explicitly", () => {
    expect(() => buildKeywordChoiceRequest("")).toThrow(KeywordGroupsError);
    expect(() => buildKeywordChoiceRequest("   ")).toThrow(KeywordGroupsError);
  });
});

describe("buildBatchRequest", () => {
  it("emits the Drex wire shape with a keyed questions map", () => {
    const keywords = ["yozgi shinalar", "qishki shinalar", "disklar"];
    const batch = buildBatchRequest(keywords);
    expect(batch.model).toBe(KEYWORD_GROUPING_MODEL);
    expect(batch.model).toBe("drex-v2.0");
    expect(batch.state).toEqual({ keywords });
    expect(Object.keys(batch.questions)).toEqual(["k0", "k1", "k2"]);
    expect(Array.isArray(batch.questions)).toBe(false);
    keywords.forEach((keyword, index) => {
      const q = batch.questions[`k${index}`];
      expect(q.type).toBe("choice");
      expect(q.instructions).toContain(`"${keyword}"`);
      expect(Object.keys(q.criteria)).toHaveLength(10);
    });
  });

  it("keeps stable unique ids for duplicate keywords", () => {
    const batch = buildBatchRequest(["disklar", "disklar"]);
    expect(Object.keys(batch.questions)).toEqual(["k0", "k1"]);
    expect(batch.questions.k0.instructions).toContain('"disklar"');
    expect(batch.questions.k1.instructions).toContain('"disklar"');
  });

  it("handles an empty batch", () => {
    const batch = buildBatchRequest([]);
    expect(batch.model).toBe("drex-v2.0");
    expect(batch.state).toEqual({ keywords: [] });
    expect(batch.questions).toEqual({});
  });

  it("rejects an empty keyword with its index", () => {
    expect(() => buildBatchRequest(["ok", ""])).toThrow(
      /index 1/,
    );
  });

  it("does not pass map index/array into the builder", () => {
    const batch = buildBatchRequest(["a", "b"]);
    expect(batch.questions.k1.instructions).toContain('"b"');
  });
});

describe("questionIdFor", () => {
  it("is stable and positional", () => {
    expect(questionIdFor(0)).toBe("k0");
    expect(questionIdFor(9)).toBe("k9");
  });
});

describe("criteria", () => {
  it("has unique topic ids and distinct descriptions", () => {
    expect(new Set(TOPIC_IDS).size).toBe(TOPIC_IDS.length);
    const values = Object.values(buildCriteria());
    expect(new Set(values).size).toBe(values.length);
  });

  it("blocks live use while any description is a placeholder", () => {
    expect(() => assertRealTopics()).not.toThrow();
    expect(() => assertRealTopics(buildCriteria())).not.toThrow();
    expect(() =>
      assertRealTopics({
        "payments-debt": "Placeholder description for payments-debt.",
      }),
    ).toThrow(/payments-debt/);
    expect(() =>
      assertRealTopics({
        "payments-debt": "O'quvchilar to'lovlari va qarzdorlik.",
        "attendance": "Davomat hisobi.",
      }),
    ).not.toThrow();
  });
});

describe("normalizeAnswer", () => {
  it("trims and lowercases before comparing against ids", () => {
    expect(normalizeAnswer(`  ${TOPIC_IDS[0].toUpperCase()}  `)).toBe(TOPIC_IDS[0]);
    expect(normalizeAnswer("nope")).toBeNull();
    expect(normalizeAnswer(null)).toBeNull();
    expect(normalizeAnswer(undefined)).toBeNull();
    expect(normalizeAnswer(3)).toBeNull();
  });
});

describe("groupByAnswers", () => {
  it("pairs keywords with normalized answers and nulls unknown topics", () => {
    const grouped = groupByAnswers(["a", "b", "c"], [TOPIC_IDS[0], "nope", null]);
    expect(grouped).toEqual([
      { keyword: "a", topic: TOPIC_IDS[0] },
      { keyword: "b", topic: null },
      { keyword: "c", topic: null },
    ]);
  });

  it("accepts whitespace/case answers without loss", () => {
    const grouped = groupByAnswers(["a"], [` ${TOPIC_IDS[1].toUpperCase()} `]);
    expect(grouped).toEqual([{ keyword: "a", topic: TOPIC_IDS[1] }]);
  });

  it("throws on short answers instead of null-padding", () => {
    expect(() => groupByAnswers(["a", "b"], [TOPIC_IDS[0]])).toThrow(
      /does not match/,
    );
  });

  it("throws on long answers instead of truncating", () => {
    expect(() => groupByAnswers(["a"], [TOPIC_IDS[0], TOPIC_IDS[1]])).toThrow(
      KeywordGroupsError,
    );
  });

  it("is pure: does not mutate inputs", () => {
    const keywords = ["a"];
    const answers: Array<string | null> = [TOPIC_IDS[1]];
    groupByAnswers(keywords, answers);
    expect(keywords).toEqual(["a"]);
    expect(answers).toEqual([TOPIC_IDS[1]]);
  });
});

describe("groupFromEnvelope", () => {
  it("accepts an answers map keyed by question id", () => {
    const grouped = groupFromEnvelope(["a", "b"], {
      answers: { k0: TOPIC_IDS[0], k1: "nope" },
    });
    expect(grouped).toEqual([
      { keyword: "a", topic: TOPIC_IDS[0] },
      { keyword: "b", topic: null },
    ]);
  });

  it("accepts { answers: [...] } and bare-array fallbacks", () => {
    const expected = [{ keyword: "a", topic: TOPIC_IDS[2] }];
    expect(groupFromEnvelope(["a"], { answers: [TOPIC_IDS[2]] })).toEqual(expected);
    expect(groupFromEnvelope(["a"], [TOPIC_IDS[2]])).toEqual(expected);
  });

  it("normalizes map answers for whitespace/case", () => {
    const grouped = groupFromEnvelope(["a"], {
      answers: { k0: ` ${TOPIC_IDS[3].toUpperCase()} ` },
    });
    expect(grouped).toEqual([{ keyword: "a", topic: TOPIC_IDS[3] }]);
  });

  it("throws on missing question ids and invalid envelopes", () => {
    expect(() => groupFromEnvelope(["a", "b"], { answers: { k0: TOPIC_IDS[0] } })).toThrow(
      /missing question ids: k1/,
    );
    expect(() => groupFromEnvelope(["a"], {})).toThrow(KeywordGroupsError);
    expect(() => groupFromEnvelope(["a"], null)).toThrow(KeywordGroupsError);
    expect(() => groupFromEnvelope(["a"], "topic-01")).toThrow(KeywordGroupsError);
  });
});

describe("isServedModel", () => {
  it("validates the envelope model offline", () => {
    expect(isServedModel("drex-v2.0")).toBe(true);
    expect(isServedModel({ model: "drex-v2.0" })).toBe(true);
    expect(isServedModel({ model: "other" })).toBe(false);
    expect(isServedModel({})).toBe(false);
    expect(isServedModel(["drex-v2.0"])).toBe(false);
    expect(isServedModel(null)).toBe(false);
  });
});

describe("flag gate", () => {
  it("is disabled unless the flag is strictly true", () => {
    expect(isKeywordGroupsEnabled()).toBe(false);
    expect(isKeywordGroupsEnabled({})).toBe(false);
    expect(isKeywordGroupsEnabled({ [KEYWORD_GROUPS_FLAG]: true })).toBe(true);
    for (const truthy of [1, "true", "1"] as const) {
      expect(
        isKeywordGroupsEnabled({ [KEYWORD_GROUPS_FLAG]: truthy as unknown as boolean }),
      ).toBe(false);
    }
  });

  it("assertKeywordGroupsEnabled throws unless strictly on", () => {
    expect(() => assertKeywordGroupsEnabled({ [KEYWORD_GROUPS_FLAG]: true })).not.toThrow();
    expect(() => assertKeywordGroupsEnabled()).toThrow(KeywordGroupsError);
    expect(() =>
      assertKeywordGroupsEnabled({ [KEYWORD_GROUPS_FLAG]: 1 as unknown as boolean }),
    ).toThrow(KeywordGroupsError);
  });
});

describe("safeDefault", () => {
  it("returns the keyword ungrouped", () => {
    expect(safeDefault("disklar")).toEqual([{ keyword: "disklar", topic: null }]);
  });
});
