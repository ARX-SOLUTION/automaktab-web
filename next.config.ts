import type { NextConfig } from "next";

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
};

export default nextConfig;
