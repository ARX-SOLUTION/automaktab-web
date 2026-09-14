import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

describe("proxy", () => {
  it("returns 404 for a direct /uz request", () => {
    const response = proxy(new NextRequest("https://automaktab.uz/uz"));

    expect(response.status).toBe(404);
  });
});
