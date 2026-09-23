import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CRM_API_BASE_URL = (
  process.env.CRM_API_BASE_URL || "https://api.automaktab.uz"
).replace(/\/$/, "");

const MAX_BODY_LENGTH = 10_000;
const UPSTREAM_TIMEOUT_MS = 5_000;

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
    .pipe(z.string().regex(/^\+?998\d{9}$/))
    .transform((value) => (value.startsWith("+") ? value : `+${value}`)),
  region: singleLine(100),
  center_name: optionalText(150),
  student_count: z.enum(["<50", "50-150", "150-300", "300+"]).optional(),
  note: optionalText(500, true),
  source: z.enum(["landing:uz", "landing:ru", "landing:en"]),
});

export async function POST(req: NextRequest) {
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

  let rawBody = "";
  try {
    const reader = req.body?.getReader();
    if (reader) {
      const chunks: Uint8Array[] = [];
      let byteLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        byteLength += value.byteLength;
        if (byteLength > MAX_BODY_LENGTH) {
          await reader.cancel().catch(() => undefined);
          return NextResponse.json(
            { ok: false, error: "payload_too_large" },
            { status: 413 },
          );
        }
        chunks.push(value);
      }

      const bytes = new Uint8Array(byteLength);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
      }
      rawBody = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_request_body" },
      { status: 400 },
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
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
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
  } catch (reason) {
    const timedOut =
      reason !== null &&
      typeof reason === "object" &&
      "name" in reason &&
      reason.name === "TimeoutError";
    return NextResponse.json(
      {
        ok: false,
        error: timedOut ? "upstream_timeout" : "upstream_unreachable",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}
