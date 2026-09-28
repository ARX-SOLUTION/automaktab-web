import { describe, it, expect } from "vitest";
import { POST, normalizePhone } from "./route";
import { NextRequest } from "next/server";

describe("POST /api/lead", () => {
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
