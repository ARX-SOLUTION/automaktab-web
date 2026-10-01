import { trackUmami } from "./umami";

/**
 * Unified analytics tracker for automaktab.uz marketing page.
 * Implements events defined in design.md §12.
 */
export type AnalyticsEvent =
  | "cta_demo_click"
  | "cta_trial_click"
  | "sign_row_click"
  | "journey_stop_view"
  | "attendance_interact"
  | "attendance_complete"
  | "role_tab_select"
  | "faq_open"
  | "form_start"
  | "form_error"
  | "form_submit_success";

export function track(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const locale = params?.locale ?? document.documentElement.lang;
  const safe = locale === "uz" || locale === "ru" || locale === "en" ? { locale } : undefined;
  const canonical = event === "cta_demo_click" ? "demo_open" : event === "form_submit_success" ? "intro_submit" : null;
  if (canonical) trackUmami(canonical, safe);
  window.dispatchEvent(new CustomEvent("automaktab_analytics", { detail: { event, params: safe, timestamp: Date.now() } }));
}

/**
 * Builds demo URL with location tracking tag as required by design.md §12.
 */
export function buildDemoUrl(location: string): string {
  const base = "https://app.automaktab.uz/login";
  return `${base}?demo=1&utm_source=site&utm_content=${encodeURIComponent(location)}`;
}
