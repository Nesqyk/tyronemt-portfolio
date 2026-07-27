import fs from "node:fs";
import path from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const avatar = fs.readFileSync(path.join(process.cwd(), "public", "avatar.png")).toString("base64");
  return new ImageResponse(
    <img
      src={`data:image/png;base64,${avatar}`}
      alt="Tyrone Tabornal"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 999,
      }}
    />,
    { ...size },
  );
}
