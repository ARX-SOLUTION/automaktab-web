"use client";
import { Suspense, useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createHostedAnalytics, hostedAnalyticsConfig, marketingTelemetrySettings, saveTelemetryConsent, subscribeTelemetry, telemetryAttribution, telemetrySnapshot, type TelemetryConsent } from "@/lib/platformAnalytics";

const features = ["cta_demo_click","cta_trial_click","sign_row_click","journey_stop_view","attendance_interact","attendance_complete","role_tab_select","finance_preview_interact","faq_open","form_start","form_error","form_submit_success"];
const configured = Boolean(hostedAnalyticsConfig(marketingTelemetrySettings));
const copy = {
  uz: { title: "Foydalanish statistikasi", pending: "Ixtiyoriy", granted: "Rozilik berilgan", declined: "O‘chirilgan", description: "Sahifalar va funksiyalardan foydalanish haqida shaxsiy ma’lumotsiz statistikaga rozimisiz? Tanlov ushbu brauzer sessiyasi uchun saqlanadi.", yes: "Roziman", no: "Rozilik bermayman", revoke: "Statistikani o‘chirish" },
  ru: { title: "Статистика использования", pending: "Необязательно", granted: "Согласие дано", declined: "Выключено", description: "Разрешить статистику страниц и функций без персональных данных? Выбор сохраняется на текущий сеанс браузера.", yes: "Разрешить", no: "Не разрешать", revoke: "Отключить статистику" },
  en: { title: "Usage statistics", pending: "Optional", granted: "Consent granted", declined: "Off", description: "Allow page and feature statistics without personal information? Your choice applies to this browser session.", yes: "Allow", no: "Decline", revoke: "Turn statistics off" },
};

export default function PlatformAnalyticsConsent({ locale }: { locale: "uz" | "ru" | "en" }) {
  return configured ? <Suspense fallback={null}><ConsentControl locale={locale} /></Suspense> : null;
}
function ConsentControl({ locale }: { locale: "uz" | "ru" | "en" }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const bridge = useRef<ReturnType<typeof createHostedAnalytics> | null>(null);
  const snapshot = useSyncExternalStore(subscribeTelemetry, telemetrySnapshot, () => "pending|allowed");
  const choice = snapshot.split("|")[0] as TelemetryConsent;
  const privacy = snapshot.endsWith("|allowed");
  useEffect(() => {
    if (!configured) return;
    const client = createHostedAnalytics(marketingTelemetrySettings, features); bridge.current = client;
    const feature = (event: Event) => {
      const detail: unknown = (event as CustomEvent<unknown>).detail;
      if (typeof detail === "object" && detail !== null && "event" in detail && typeof detail.event === "string") client.feature(detail.event);
    };
    window.addEventListener("automaktab_analytics", feature);
    return () => { window.removeEventListener("automaktab_analytics", feature); client.dispose(); bridge.current = null; };
  }, []);
  useEffect(() => {
    const client = bridge.current; if (!client) return;
    const granted = choice === "granted" && privacy;
    void client.setConsent(granted);
    if (granted) client.page(window.location.pathname, telemetryAttribution(window.location.search, document.referrer));
  }, [pathname,search,choice,privacy]);
  const choose = (value: Exclude<TelemetryConsent,"pending">) => saveTelemetryConsent(value);
  if (!privacy) return null;
  const text = copy[locale];
  return <aside aria-label={text.title} className="mx-auto my-4 max-w-3xl rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-900">
    <details open={choice === "pending"}><summary className="cursor-pointer font-semibold">{text.title} · {text[choice]}</summary><p className="mt-2 text-slate-600">{text.description}</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" className="rounded-lg bg-slate-900 px-4 py-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50" disabled={choice === "granted"} onClick={() => choose("granted")}>{text.yes}</button><button type="button" className="rounded-lg border border-slate-300 px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => choose("declined")}>{choice === "granted" ? text.revoke : text.no}</button></div></details>
  </aside>;
}
