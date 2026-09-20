import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cloud.umami.is",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloud.umami.is",
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
