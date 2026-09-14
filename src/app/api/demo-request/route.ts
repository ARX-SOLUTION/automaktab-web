import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CRM_API_BASE_URL = (
  process.env.CRM_API_BASE_URL || "https://api.automaktab.uz"
).replace(/\/$/, "");

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const MAX_BODY_LENGTH = 10_000;
const MAX_BUCKETS = 10_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

const singleLine = (max: number) =>
  z
    .string()
    .transform((value) => value.normalize("NFC").trim())
    .pipe(
      z
        .string()
        .min(1)
        .max(max)
        .regex(/^[^\u0000-\u001F\u007F]*$/u),
    );

const optionalText = (max: number, allowNewLines = false) =>
  z.preprocess(
    (value) =>
      value === null || (typeof value === "string" && value.trim() === "")
        ? undefined
        : value,
    z
      .string()
      .transform((value) => value.normalize("NFC").trim())
      .pipe(
        z
          .string()
          .max(max)
          .regex(
            allowNewLines
              ? /^[^\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]*$/u
              : /^[^\u0000-\u001F\u007F]*$/u,
          ),
      )
      .optional(),
  );

// Keep the proxy contract strict too: unknown fields never reach the CRM API.
const demoRequestSchema = z.strictObject({
  full_name: singleLine(100),
  phone: z
    .string()
    .transform((value) => value.trim())
    .pipe(z.string().regex(/^\+?998\d{9}$/)),
  region: singleLine(100),
  center_name: optionalText(150),
  student_count: z.enum(["<50", "50-150", "150-300", "300+"]).optional(),
  note: optionalText(500, true),
});

export async function POST(req: NextRequest) {
  const limit = consumeRateLimit(req);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limit_exceeded",
        message: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: rateLimitHeaders(limit.remaining, limit.resetAt),
      },
    );
  }

  if (
    !req.headers.get("content-type")?.toLowerCase().includes("application/json")
  ) {
    return NextResponse.json(
      { ok: false, error: "unsupported_media_type" },
      { status: 415 },
    );
  }

  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 413 },
    );
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_request_body" },
      { status: 400 },
    );
  }
  if (rawBody.length > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = demoRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${CRM_API_BASE_URL}/demo-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!upstream.ok) {
      const headers =
        upstream.status === 429
          ? { "Retry-After": upstream.headers.get("Retry-After") ?? "60" }
          : undefined;
      return NextResponse.json(
        {
          ok: false,
          error:
            upstream.status === 429
              ? "rate_limit_exceeded"
              : "upstream_rejected",
        },
        { status: upstream.status, headers },
      );
    }
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "upstream_unreachable" },
      { status: 502 },
    );
  }
}

function consumeRateLimit(req: NextRequest): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  if (buckets.size >= MAX_BUCKETS) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  const forwarded =
    req.headers.get("x-vercel-forwarded-for") ??
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const ip = forwarded.split(",", 1)[0]?.trim() || "unknown";
  // Hash the address so the limiter does not retain raw client PII.
  let key = createHash("sha256").update(ip).digest("hex");
  // Bound memory during a distributed spray; new identities share a fail-safe
  // bucket until expired entries can be reclaimed.
  if (!buckets.has(key) && buckets.size >= MAX_BUCKETS) key = "overflow";
  const current = buckets.get(key);
  const bucket =
    !current || current.resetAt <= now
      ? { count: 0, resetAt: now + RATE_WINDOW_MS }
      : current;
  bucket.count += 1;
  buckets.set(key, bucket);

  return {
    allowed: bucket.count <= RATE_LIMIT,
    remaining: Math.max(0, RATE_LIMIT - bucket.count),
    resetAt: bucket.resetAt,
  };
}

function rateLimitHeaders(remaining: number, resetAt: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return {
    "Retry-After": String(retryAfter),
    "X-RateLimit-Limit": String(RATE_LIMIT),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  };
}
