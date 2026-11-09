import { ImageResponse } from "next/og";
import { siteConfig } from "./site";

import { ogSize } from "./og-config";
export { ogAlt, ogSize } from "./og-config";

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="g" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <path
        d="M24 8H12.5A4.5 4.5 0 0 0 8 12.5v0A3.5 3.5 0 0 0 11.5 16h9a3.5 3.5 0 0 1 3.5 3.5v0a4.5 4.5 0 0 1-4.5 4.5H8"
        stroke="#F5F7FA"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="8" r="2.6" fill="#F5F7FA" />
      <circle cx="8" cy="24" r="2.6" fill="#F5F7FA" />
      <circle cx="16" cy="16" r="3.4" fill="url(#g)" stroke="#080B12" strokeWidth="1.6" />
    </svg>
  );
}

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#080B12",
          backgroundImage:
            "radial-gradient(circle at 80% 0%, rgba(139,92,246,0.28), transparent 50%), radial-gradient(circle at 100% 100%, rgba(56,189,248,0.14), transparent 45%)",
          color: "#F5F7FA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark size={64} />
          <div style={{ display: "flex", fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>
            SoftForge<span style={{ color: "#9CA8B8", marginLeft: 10 }}>AI</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            Engineering Intelligence.
          </div>
          <div
            style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05, color: "#C4B5FD" }}
          >
            Building What&apos;s Next.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "#9CA8B8" }}>
            AI engineering · Custom software · SaaS · Cloud
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#7D8899" }}>{siteConfig.domain}</div>
      </div>
    ),
    ogSize,
  );
}

export function renderAppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080B12",
        }}
      >
        <Mark size={132} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
