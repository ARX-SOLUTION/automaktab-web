import { ImageResponse } from "next/og";

export const alt = "Auto Maktab — CRM for driving schools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F0E7",
          color: "#132A30",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "#E2A42D",
            }}
          />
          <div style={{ fontSize: "34px", fontWeight: 700 }}>Auto Maktab</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1.05 }}>
            To&apos;lov, davomat,
          </div>
          <div style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1.05 }}>
            jadval — bitta tizimda
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "28px", color: "#49666D" }}>
          Birinchi oy bepul. Brauzerda ishlaydi.
        </div>
      </div>
    ),
    { ...size },
  );
}
