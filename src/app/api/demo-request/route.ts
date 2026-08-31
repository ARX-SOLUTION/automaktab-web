import { NextRequest, NextResponse } from "next/server";

const CRM_API_BASE_URL = (
  process.env.CRM_API_BASE_URL || "https://api.automaktab.uz"
).replace(/\/$/, "");

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${CRM_API_BASE_URL}/demo-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "upstream_rejected" },
        { status: upstream.status },
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
