import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/i18n/config";

export const alt = "automaktab.uz — driving school management system";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY: Record<Locale, { label: string; title: string; footer: string }> = {
  uz: {
    label: "AVTOMAKTAB BOSHQARUV TIZIMI",
    title: "Siz yo‘qligingizda ham avtomaktab nazoratda.",
    footer: "To‘lov · Jadval · Davomat",
  },
  ru: {
    label: "СИСТЕМА УПРАВЛЕНИЯ АВТОШКОЛОЙ",
    title: "Автошкола под контролем, даже когда вас нет.",
    footer: "Оплаты · Расписание · Посещаемость",
  },
  en: {
    label: "DRIVING SCHOOL MANAGEMENT SYSTEM",
    title: "Your driving school stays under control when you are away.",
    footer: "Payments · Schedule · Attendance",
  },
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  const locale: Locale = isLocale(candidate) ? candidate : "uz";
  const copy = COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background: "#0B1720",
          color: "#FFFFFF",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-70px",
            bottom: "-190px",
            width: "470px",
            height: "470px",
            border: "72px solid #C6FF3D",
            borderRadius: "50%",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: "34px", fontWeight: 800 }}>
            automaktab<span style={{ color: "#2F6BFF" }}>.uz</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#C6FF3D",
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "2px",
            }}
          >
            <span
              style={{
                display: "flex",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#C6FF3D",
              }}
            />
            {copy.label}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "920px",
            fontSize: "64px",
            fontWeight: 800,
            letterSpacing: "-3px",
            lineHeight: 1.02,
          }}
        >
          {copy.title}
        </div>
        <div
          style={{
            display: "flex",
            color: "#AAB6BE",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          {copy.footer}
        </div>
      </div>
    ),
    size,
  );
}
