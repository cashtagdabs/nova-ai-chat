import { ImageResponse } from "next/og";

// Render on the Edge so the OG card isn't statically generated at build time
// (keeps the build lean).
export const runtime = "edge";
export const alt = "Nova — A streaming AI assistant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamically generated OpenGraph card so link previews look polished. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(1000px 600px at 20% 10%, #2a1a5e 0%, transparent 60%), radial-gradient(900px 600px at 85% 90%, #0b3b5e 0%, transparent 60%), #070b16",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 108,
              height: 108,
              borderRadius: 28,
              background: "linear-gradient(135deg, #8b5cf6, #0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
            }}
          >
            ✦
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2 }}>
            Nova
          </div>
        </div>
        <div style={{ fontSize: 38, color: "#cbd5e1", fontWeight: 500 }}>
          A streaming AI assistant
        </div>
        <div style={{ marginTop: 44, fontSize: 24, color: "#94a3b8" }}>
          Next.js · Vercel AI SDK · Streamdown
        </div>
      </div>
    ),
    { ...size },
  );
}
