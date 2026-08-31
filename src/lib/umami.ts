export type UmamiEventName =
  | "demo_open"
  | "demo_enter"
  | "intro_submit";

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
    window.umami.track(name, data);
    return;
  }

  pendingEvents.push({ name, data });
  if (pendingEvents.length > MAX_PENDING_EVENTS) pendingEvents.shift();
}

export function flushUmamiQueue() {
  if (typeof window === "undefined" || !window.umami?.track) return;

  for (const event of pendingEvents.splice(0)) {
    window.umami.track(event.name, event.data);
  }
}
