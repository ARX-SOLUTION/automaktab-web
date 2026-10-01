import { describe, it, expect, vi, afterEach } from "vitest";
import { POST } from "./route";
import { normalizePhone } from "@/lib/utils";
import { NextRequest } from "next/server";

describe("POST /api/lead", () => {
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
  it("does not accept a lead without a delivery channel or log contact data", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", ""); vi.stubEnv("TELEGRAM_CHAT_ID", "");
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const res = await POST(new NextRequest("http://localhost/api/lead", { method: "POST", headers: { "x-forwarded-for": "missing-config", "Content-Type": "application/json" }, body: JSON.stringify({ name: "Private Name", phone: "901234567", school: "Private School", consent: true }) }));
    expect(res.status).toBe(503);
    expect(JSON.stringify(log.mock.calls)).not.toContain("Private");
  });
  it.each([400, 401, 429, 500, 503, 200])("rejects an unacknowledged Telegram response (%s)", async (status) => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "synthetic-token"); vi.stubEnv("TELEGRAM_CHAT_ID", "synthetic-chat");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: false }), { status })));
    const res = await POST(new NextRequest("http://localhost/api/lead", { method: "POST", headers: { "x-forwarded-for": `provider-${status}`, "Content-Type": "application/json" }, body: JSON.stringify({ name: "Synthetic", phone: "901234567", school: "Synthetic", consent: true }) }));
    expect(res.status).toBe(502); expect((await res.json()).ok).toBe(false);
  });
  it.each(["network", "timeout", "malformed"])("does not expose transport failures (%s)", async (kind) => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "synthetic-token"); vi.stubEnv("TELEGRAM_CHAT_ID", "synthetic-chat");
    const fetchMock = vi.fn();
    if (kind === "malformed") fetchMock.mockResolvedValue(new Response("not JSON"));
    else fetchMock.mockRejectedValue(new Error("private token/contact"));
    vi.stubGlobal("fetch", fetchMock);
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await POST(new NextRequest("http://localhost/api/lead", { method: "POST", headers: { "x-forwarded-for": kind, "Content-Type": "application/json" }, body: JSON.stringify({ name: "Synthetic", phone: "901234567", school: "Synthetic", consent: true }) }));
    expect(res.status).toBe(502); expect(await res.json()).toMatchObject({ code: "delivery_unknown" });
    expect(JSON.stringify(log.mock.calls)).not.toContain("private");
    expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).parse_mode).toBeUndefined();
  });
  it("aborts a genuinely stalled transport within the delivery deadline", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "synthetic-token"); vi.stubEnv("TELEGRAM_CHAT_ID", "synthetic-chat");
    vi.stubGlobal("fetch", vi.fn((_url, options) => new Promise((_resolve, reject) => options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true }))));
    const started = Date.now();
    const res = await POST(new NextRequest("http://localhost/api/lead", { method: "POST", headers: { "x-forwarded-for": "stalled", "Content-Type": "application/json" }, body: JSON.stringify({ name: "Synthetic", phone: "901234567", school: "Synthetic", consent: true }) }));
    expect(res.status).toBe(502); expect(Date.now() - started).toBeLessThan(10000);
  }, 11000);
  it("normalizes 9-digit and 12-digit phones correctly", () => {
    expect(normalizePhone("901234567")).toBe("+998901234567");
    expect(normalizePhone("+998 90 123 45 67")).toBe("+998901234567");
    expect(normalizePhone("998901234567")).toBe("+998901234567");
  });

  it("fails when required fields are missing", async () => {
    const req = new NextRequest("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        phone: "",
        school: "",
        consent: false,
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.errors).toBeDefined();
    expect(data.errors.name).toBe("Ismingizni yozing.");
    expect(data.errors.phone).toBe("Telefon raqamini to‘liq kiriting, masalan +998 90 123 45 67.");
    expect(data.errors.school).toBe("Maktab nomini yozing.");
    expect(data.errors.consent).toBe("Bog‘lanish uchun roziligingiz kerak.");
  });

  it("fails when honeypot is populated", async () => {
    const req = new NextRequest("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        phone: "+998 90 123 45 67",
        school: "Test School",
        consent: true,
        company_website: "http://spam-bot.com",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("succeeds with valid payload", async () => {
    vi.stubEnv("TELEGRAM_BOT_TOKEN", "synthetic-token"); vi.stubEnv("TELEGRAM_CHAT_ID", "synthetic-chat");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), { status: 200 })));
    const req = new NextRequest("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Azizbek Karimov",
        phone: "+998 90 123 45 67",
        school: "Chilonzor Avtomaktab",
        city: "Toshkent shahri",
        branches: "2–3",
        students: "100–500",
        flows: ["Talabalar", "To‘lov va qarz"],
        consent: true,
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });
});
