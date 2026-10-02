export const dynamic = "force-static";
import { ImageResponse } from "next/og";

export const alt = "Estética Danielle Bocchi — Estética e Saúde em Curitiba";
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
          padding: "72px 80px",
          background: "linear-gradient(135deg, #FAF8F5 0%, #E9DDD2 60%, #D6C2B2 100%)",
          color: "#292724",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#6b5749" }}>
          ESTÉTICA E SAÚDE · CURITIBA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -2 }}>Danielle Bocchi</div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#6b5749" }}>
            Realce sua beleza. Valorize sua essência.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#57504a" }}>
          <span>Centro Cívico · Curitiba – PR</span>
          <span>Agende pelo WhatsApp</span>
        </div>
      </div>
    ),
    size,
  );
}
