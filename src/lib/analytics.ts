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

  try {
    // Umami support
    const win = window as unknown as {
      umami?: { track: (e: string, p?: Record<string, unknown>) => void };
      gtag?: (...args: unknown[]) => void;
      ym?: (...args: unknown[]) => void;
    };

    if (typeof win.umami?.track === "function") {
      win.umami.track(event, params);
    }

    if (typeof win.gtag === "function") {
      win.gtag("event", event, params);
    }

    // Standard DOM CustomEvent for integrations or testing
    window.dispatchEvent(
      new CustomEvent("automaktab_analytics", {
        detail: { event, params, timestamp: Date.now() },
      })
    );
  } catch (err) {
    console.debug("[Analytics Error]", event, params, err);
  }
}

/**
 * Builds demo URL with location tracking tag as required by design.md §12.
 */
export function buildDemoUrl(location: string): string {
  const base = "https://app.automaktab.uz/login";
  return `${base}?demo=1&utm_source=site&utm_content=${encodeURIComponent(location)}`;
}
