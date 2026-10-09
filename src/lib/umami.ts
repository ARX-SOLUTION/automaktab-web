import type { AnalyticsEvent } from "./analytics";

export type UmamiEventName = AnalyticsEvent
  | "demo_open"
  | "demo_enter"
  | "intro_submit"
  | "preview_interact";

type UmamiData = Record<string, string | number | boolean>;
type PendingEvent = { name: UmamiEventName; data?: UmamiData };

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: UmamiData) => void;
    };
  }
}

const MAX_PENDING_EVENTS = 20;
const pendingEvents: PendingEvent[] = [];

export function trackUmami(name: UmamiEventName, data?: UmamiData) {
  if (typeof window === "undefined") return;

  if (window.umami?.track) {
    try { window.umami.track(name, data); } catch { /* Tracking must never block a user action. */ }
    return;
  }

  pendingEvents.push({ name, data });
  if (pendingEvents.length > MAX_PENDING_EVENTS) pendingEvents.shift();
}

export function flushUmamiQueue() {
  if (typeof window === "undefined" || !window.umami?.track) return;

  for (const event of pendingEvents.splice(0)) {
    try { window.umami.track(event.name, event.data); } catch { /* Best-effort delivery. */ }
  }
}
