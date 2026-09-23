import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const validPayload = {
  full_name: "  Alisher Karimov  ",
  phone: "998901234567",
  region: "Toshkent",
  source: "landing:uz",
  note: "  Please call after 18:00.  ",
};

describe("POST /api/demo-request", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
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

    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(201);
    expect(fetchMock).toHaveBeenCalledOnce();
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(JSON.parse(String(init.body))).toEqual({
      ...validPayload,
      full_name: "Alisher Karimov",
      phone: "+998901234567",
      note: "Please call after 18:00.",
    });
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it.each([undefined, "landing:fr", "x".repeat(40)])(
    "rejects an invalid source (%s)",
    async (source) => {
      const fetchMock = vi.fn();
      vi.stubGlobal("fetch", fetchMock);
      const { POST } = await import("./route");

      const response = await POST(makeRequest({ ...validPayload, source }));

      expect(response.status).toBe(400);
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("rejects unexpected fields before calling the upstream API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");

    const response = await POST(
      makeRequest({ ...validPayload, is_admin: true }),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects unsupported media types", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");

    const response = await POST(
      new NextRequest("http://localhost/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(validPayload),
      }),
    );

    expect(response.status).toBe(415);
    await expect(response.json()).resolves.toMatchObject({
      error: "unsupported_media_type",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");

    const response = await POST(makeRawRequest('{"full_name":'));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "invalid_json",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a streamed multibyte body above 10,000 bytes despite an understated length", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { POST } = await import("./route");
    const body = new TextEncoder().encode(
      JSON.stringify({ ...validPayload, note: "😀".repeat(2_600) }),
    );

    const response = await POST(
      makeStreamRequest([body.slice(0, 6_000), body.slice(6_000)], "100"),
    );

    expect(body.byteLength).toBeGreaterThan(10_000);
    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toMatchObject({
      error: "payload_too_large",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 504 when the upstream timeout aborts", async () => {
    const timeout = AbortSignal.abort(
      new DOMException("The operation timed out", "TimeoutError"),
    );
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout").mockReturnValue(timeout);
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
        init?.signal?.throwIfAborted();
        return new Response();
      }),
    );
    const { POST } = await import("./route");

    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(504);
    await expect(response.json()).resolves.toMatchObject({
      error: "upstream_timeout",
    });
    expect(timeoutSpy).toHaveBeenCalledOnce();
    expect(timeoutSpy.mock.calls[0][0]).toBeLessThanOrEqual(10_000);
  });

  it("returns 502 for other upstream reachability errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    const { POST } = await import("./route");

    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toMatchObject({
      error: "upstream_unreachable",
    });
  });

  it("propagates upstream 429 and Retry-After", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response('{"error":"rate_limit_exceeded"}', {
          status: 429,
          headers: { "Retry-After": "17" },
        }),
      ),
    );
    const { POST } = await import("./route");

    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("17");
    await expect(response.json()).resolves.toMatchObject({
      error: "rate_limit_exceeded",
    });
  });
});

function makeRequest(payload: unknown) {
  return makeRawRequest(JSON.stringify(payload));
}

function makeRawRequest(body: string) {
  return new NextRequest("http://localhost/api/demo-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

function makeStreamRequest(chunks: Uint8Array[], declaredLength?: string) {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (declaredLength) headers.set("Content-Length", declaredLength);

  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
  const init: RequestInit & { duplex: "half" } = {
    method: "POST",
    headers,
    body,
    duplex: "half",
  };
  return new NextRequest(
    "http://localhost/api/demo-request",
    init as ConstructorParameters<typeof NextRequest>[1],
  );
}
