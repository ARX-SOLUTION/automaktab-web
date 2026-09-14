import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const validPayload = {
  full_name: "  Alisher Karimov  ",
  phone: "+998901234567",
  region: "Toshkent",
};

describe("POST /api/demo-request", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("validates, normalizes, and forwards only the schema payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('{"ok":true}', {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");

    const response = await POST(makeRequest(validPayload, "203.0.113.1"));

    expect(response.status).toBe(201);
    expect(fetchMock).toHaveBeenCalledOnce();
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(init.body))).toEqual({
      ...validPayload,
      full_name: "Alisher Karimov",
    });
  });

  it("rejects unexpected fields before calling the upstream API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");

    const response = await POST(
      makeRequest({ ...validPayload, is_admin: true }, "203.0.113.2"),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns a graceful 429 after five requests from one IP", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(async () =>
        new Response('{"ok":true}', { status: 201 }),
      ),
    );
    const { POST } = await import("./route");

    for (let i = 0; i < 5; i += 1) {
      expect(
        (await POST(makeRequest(validPayload, "203.0.113.3"))).status,
      ).toBe(201);
    }
    const response = await POST(makeRequest(validPayload, "203.0.113.3"));

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBeTruthy();
    await expect(response.json()).resolves.toMatchObject({
      error: "rate_limit_exceeded",
    });
  });
});

function makeRequest(payload: unknown, ip: string) {
  return new NextRequest("http://localhost/api/demo-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(payload),
  });
}
