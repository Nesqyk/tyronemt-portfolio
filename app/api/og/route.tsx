import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "64px",
        gap: 28,
        backgroundColor: "#ffffff",
        color: "#111111",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 112,
          height: 112,
          borderRadius: 999,
          backgroundColor: "#e5e5e5",
          color: "#111111",
          fontSize: 64,
          fontWeight: 500,
        }}
      >
        T
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 52, fontWeight: 500, letterSpacing: "-2px" }}>Tyrone Tabornal</div>
        <div style={{ fontSize: 24, color: "#777777" }}>{title || "Founder, creative director, and full-stack developer"}</div>
      </div>
    </div>,
    { width: 1200, height: 600 },
  );
}
