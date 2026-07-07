import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage: "linear-gradient(135deg, #171123, #0a0a0c)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            borderRadius: 24,
            backgroundImage: "linear-gradient(135deg, #7c3aed, #4338ca)",
            marginBottom: 48,
          }}
        />
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#c4c4cc", maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 24,
            color: "#e879f9",
            fontWeight: 600,
          }}
        >
          Self-hosted &bull; Open Source &bull; MIT Licensed
        </div>
      </div>
    ),
    { ...size }
  );
}
