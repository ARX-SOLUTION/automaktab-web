import { afterEach, expect, it, vi } from "vitest";
import { track } from "@/lib/analytics";
import { flushUmamiQueue } from "@/lib/umami";
afterEach(() => { vi.unstubAllGlobals(); });
it("queues one canonical conversion and never forwards contact or arbitrary parameters", () => {
  const win = { dispatchEvent: vi.fn(), umami: undefined as undefined | { track: ReturnType<typeof vi.fn> } };
  vi.stubGlobal("window", win); vi.stubGlobal("document", { documentElement: { lang: "ru" } });
  vi.stubGlobal("CustomEvent", class { constructor(public name: string, public detail: unknown) {} });
  track("cta_demo_click", { name: "Private", phone: "901234567", location: "name@email.com" });
  const provider = vi.fn(); win.umami = { track: provider }; flushUmamiQueue();
  expect(provider.mock.calls).toEqual([["demo_open", { locale: "ru" }]]);
  track("form_submit_success", { school: "Private" });
  expect(provider.mock.calls[1]).toEqual(["intro_submit", { locale: "ru" }]);
  expect(JSON.stringify(win.dispatchEvent.mock.calls)).not.toContain("Private");
});
it("isolates provider errors from user actions", () => {
  vi.stubGlobal("window", { umami: { track: () => { throw Error("provider"); } }, dispatchEvent: vi.fn() });
  vi.stubGlobal("document", { documentElement: { lang: "en" } });
  vi.stubGlobal("CustomEvent", class {});
  expect(() => track("cta_demo_click")).not.toThrow();
});
