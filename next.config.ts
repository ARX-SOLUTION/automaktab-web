import type { NextConfig } from "next";

function collectorCspOrigin(): string {
  try {
    const raw = process.env.NEXT_PUBLIC_ANALYTICS_ORIGIN;
    const environment = process.env.NEXT_PUBLIC_ANALYTICS_ENVIRONMENT;
    if (!raw || !["synthetic", "development", "production"].includes(environment ?? "")) return "";
    const url = new URL(raw);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.username || url.password || url.search || url.hash || url.pathname !== "/" || local && environment !== "synthetic" ||
      !(url.protocol === "https:" || environment === "synthetic" && url.protocol === "http:" && local)) return "";
    return " " + url.origin;
  } catch { return ""; }
}
const collectorOrigin = collectorCspOrigin();

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cloud.umami.is" + collectorOrigin,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self' data:",
  // cloud.umami.is/script.js sends pageviews to gateway.umami.is/api/send.
  "connect-src 'self' https://cloud.umami.is https://gateway.umami.is" + collectorOrigin,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  // This project sits inside the autodrive/ workspace but is not a member of
  // it (own lockfile). Pin the root, or Turbopack walks up, finds the
  // parent's pnpm-workspace.yaml and treats that as the project root.
  // Must be config-relative: process.cwd() is invocation-relative, and a
  // mismatched cwd makes Turbopack panic and gut .next. This also feeds
  // outputFileTracingRoot, which governs Vercel's server bundling.
  turbopack: {
    root: __dirname,
  },
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: "/uz",
        destination: "/",
        permanent: true,
      },
      {
        source: "/uz/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
