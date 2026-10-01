import { normalizePhone } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// In-memory rate limiting map: IP -> timestamp array
const ipRequests = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequests.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (valid.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  valid.push(now);
  ipRequests.set(ip, valid);
  return true;
}


const leadSchema = z.object({
  name: z.string().trim().min(1, "Ismingizni yozing."),
  phone: z.string().refine(
    (val) => val.replace(/\D/g, "").length >= 9,
    { message: "Telefon raqamini to‘liq kiriting, masalan +998 90 123 45 67." }
  ),
  school: z.string().trim().min(1, "Maktab nomini yozing."),
  city: z.string().optional().default(""),
  branches: z.string().optional().default(""),
  students: z.string().optional().default(""),
  flows: z.array(z.string()).optional().default([]),
  consent: z.literal(true, {
    message: "Bog‘lanish uchun roziligingiz kerak.",
  }),
  company_website: z.string().max(0, "Bot detected").optional(), // Honeypot field
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  page_url: z.string().optional(),
  submitted_at: z.string().optional(),
});

async function sendTelegramNotification(payload: {
  name: string;
  phone: string;
  school: string;
  city: string;
  branches: string;
  students: string;
  flows: string[];
  page_url?: string;
  submitted_at?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return "delivery_unavailable" as const;
  }

  const message = [
    "🚗 *Yangi so‘rov — automaktab.uz*",
    `👤 *Ism:* ${payload.name}`,
    `📞 *Telefon:* ${payload.phone}`,
    `🏫 *Maktab:* ${payload.school}`,
    `📍 *Shahar/viloyat:* ${payload.city || "Ko‘rsatilmadi"}`,
    `🏢 *Filiallar:* ${payload.branches || "—"}`,
    `👥 *Talabalar:* ${payload.students || "—"}`,
    `⚡ *Qiziqqan jarayonlar:* ${payload.flows.length ? payload.flows.join(", ") : "—"}`,
    `🔗 *Sahifa:* ${payload.page_url || "—"}`,
    `🕒 *Vaqt:* ${payload.submitted_at || new Date().toISOString()}`,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      signal: AbortSignal.timeout(8000),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
    if (!response.ok) return "delivery_rejected" as const;
    const receipt = await response.json();
    return receipt?.ok === true && Number.isInteger(receipt.result?.message_id) ? null : "delivery_unknown" as const;
  } catch {
    return "delivery_unknown" as const;
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "So‘rovlar soni cheklandi. Iltimos, bir ozdan keyin qayta urinib ko‘ring." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && !fieldErrors[String(key)]) {
          fieldErrors[String(key)] = issue.message;
        }
      }
      return NextResponse.json({ errors: fieldErrors }, { status: 400 });
    }

    const data = result.data;
    const normalizedPhone = normalizePhone(data.phone);

    const leadData = {
      ...data,
      phone: normalizedPhone,
      submitted_at: data.submitted_at || new Date().toISOString(),
    };

    const failure = await sendTelegramNotification(leadData);
    if (failure) {
      console.warn("[Lead Form]", failure);
      return NextResponse.json({ ok: false, code: failure }, { status: failure === "delivery_unavailable" ? 503 : 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("[Lead Form]", "request_failed");
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring." },
      { status: 500 }
    );
  }
}
