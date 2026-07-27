import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const inter = fetch(new URL("../../../public/assets/inter/regular.ttf", import.meta.url)).then((res) => res.arrayBuffer());
  const avatarBuffer = await fetch(new URL("../../../public/avatar.png", import.meta.url)).then((res) => res.arrayBuffer());
  const avatarBytes = new Uint8Array(avatarBuffer as ArrayBuffer);
  const avatar = `data:image/png;base64,${btoa(String.fromCharCode(...avatarBytes))}`;

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
      <img
        src={avatar}
        alt=""
        style={{
          width: 112,
          height: 112,
          borderRadius: 999,
          objectFit: "cover",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 52, fontWeight: 500, letterSpacing: "-2px" }}>Tyrone Tabornal</div>
        <div style={{ fontSize: 24, color: "#777777" }}>{title ? title : "Founder, creative director, and full-stack developer"}</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 600,
      fonts: [{ name: "Inter", data: await inter, weight: 400 }],
    },
  );
}
