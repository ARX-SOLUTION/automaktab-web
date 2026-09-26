import { describe, expect, it } from "vitest";
import { shouldRunLiquid } from "./liquid-policy";

describe("shouldRunLiquid", () => {
  it("runs only when motion is allowed and save-data is off", () => {
    expect(
      shouldRunLiquid({ reducedMotion: false, saveData: false }),
    ).toBe(true);
  });

  it("stays on the static field for reduced motion", () => {
    expect(
      shouldRunLiquid({ reducedMotion: true, saveData: false }),
    ).toBe(false);
  });

  it("stays on the static field when the connection asks to save data", () => {
    expect(
      shouldRunLiquid({ reducedMotion: false, saveData: true }),
    ).toBe(false);
  });
});
