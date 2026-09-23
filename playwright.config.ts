import { defineConfig } from "@playwright/test";

const APP_PORT = 38931;
const CRM_STUB_PORT = 38932;

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${APP_PORT}`,
    browserName: "chromium",
    screenshot: "off",
    trace: "off",
    video: "off",
  },
  webServer: {
    command: `pnpm exec next start --hostname 127.0.0.1 --port ${APP_PORT}`,
    url: `http://127.0.0.1:${APP_PORT}/en`,
    env: {
      CRM_API_BASE_URL: `http://127.0.0.1:${CRM_STUB_PORT}`,
    },
    reuseExistingServer: false,
    timeout: 30_000,
    gracefulShutdown: {
      signal: "SIGTERM",
      timeout: 5_000,
    },
  },
});
