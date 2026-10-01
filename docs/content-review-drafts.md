# Content review drafts — not published

Editorial work for #30 and learner release notes for #24. These drafts are not blog records, customer evidence or approved commercial terms. Search phrases are hypotheses, not measured search volume. Publication requires the content owner’s fact check and ready translations.

## Four article briefs

1. **Excel’dan CRM’ga o‘tish:** school owner/manager; inventory spreadsheets, check duplicates, agree import scope, verify a small sample, reconcile totals before switching. Link: /features/payments-and-debt and /pricing. Do not promise automatic imports or a fixed migration duration.
2. **Kunlik to‘lovlarni solishtirish:** manager/accountant; compare student payment history and debt with the school’s records for the same period; investigate differences. Link: /features/payments-and-debt. Do not imply bank reconciliation or automatic banking integration.
3. **Filiallar hisobotini tekshirish:** owner; compare each branch and combined school results over the same period, use role-appropriate access. Link: /features/branch-management. Distinguish the illustrative three-branch site report from current Telegram revenue/new-student notifications.
4. **Avtomaktab uchun CRM tanlash:** owner; test payment/debt, schedule, attendance and branch workflows in a sample demo; agree trial terms and data import in writing. Link: /pricing and the four feature pages. Do not claim ranking, guaranteed savings or a free trial.

## First article — Uzbek draft, awaiting owner review

### Excel’dan CRM’ga qanday o‘tish mumkin?

Avval maktabdagi jadvallarni sanab chiqing: talabalar, to‘lovlar, qarzdorlik, guruhlar va davomat. Qaysi faylning ma’lumoti eng yangi ekanini belgilang. Bir talaba bir nechta faylda bo‘lsa, yozuvlarni solishtiring.

Keyin tizimni namuna ma’lumotlari bilan tekshiring. Talaba kartasida to‘lov tarixi va qolgan qarzni ko‘ring. Guruh va dars jadvalini oching, davomatni belgilang. [To‘lov va qarzdorlik sahifasi](/features/payments-and-debt) bu jarayonni tushuntiradi.

Ma’lumot ko‘chirishdan oldin qaysi ustunlar kerakligini, kim tekshirishini va eski fayllar qayerda saqlanishini kelishing. Avtomatik ko‘chirish va’dasiga tayanmang: shartlarni yozma tasdiqlang. Kichik namuna bilan boshlang, talabalar soni va to‘lov summalarini asl yozuvlar bilan solishtiring.

Natijalar mos kelgach, jamoa yangi yozuvlarni qayerga kiritishini aniqlang. Bir xil hisobni bir nechta joyda yuritish qayta nomuvofiqlik keltirishi mumkin. [Demo va sinov shartlarini](/pricing) ko‘rib, maktabingizdagi ish jarayoniga mosligini tekshiring.

Fact-check checklist: existing PRODUCT.md/feature routes substantiate sample demo, payment history, debt, groups/schedule and attendance; migration steps above are advice, not implemented import claims. Owner must approve current terms and import scope. RU/EN drafts are pending; publish no untranslated links. No named customer or real student/payment data.

## Feature content audit

Existing four UZ/RU/EN feature pages already explain daily workflows and demo next steps. Payment/schedule pages describe actions but do not define exact role permissions or all limits. Do not invent permission claims: confirm against the current product role matrix before adding text. Attendance explicitly identifies manager/teacher access; branch page describes role-appropriate access. Demo limitations are already stated in CTA copy. JSON-LD must retain truthful organization/app facts without fabricated free price, rating or customer reviews.

## Learner release draft — #24, unpublished

Deployment evidence supplied by Learning issue #19: backend 614dc983, learning 8194f33e; deployed 2026-10-01; next lesson, weekly schedule and own attendance verified. Marketing version remains unconfirmed. Do not add this draft to released changelog until the owner agrees its version and wording.

UZ: **Darslaringizni bir joyda ko‘ring.** Faol maktabga bog‘langan talaba keyingi darsini, haftalik jadvalini va o‘z davomatini ko‘radi. Maktab ma’lumotlari faqat ko‘rish uchun. To‘lov, chat va dars band qilish bu yangilikka kirmaydi.

RU: **Ваши занятия в одном месте.** Курсант, связанный с активной школой, видит следующее занятие, недельное расписание и свою посещаемость. Данные школы доступны для просмотра. Оплаты, чат и запись на занятие не входят в это обновление.

EN: **Your lessons in one place.** A learner linked to an active school can view the next lesson, weekly timetable and their own attendance. School data is read-only. Payments, chat and lesson booking are outside this release.

## #29 validation evidence — 2026-10-02, Asia/Tashkent

Local production preview: http://127.0.0.1:39321. Chromium headless, viewport 390×844, CPU slowdown 4×, network latency 150 ms, download 200,000 B/s, upload 93,750 B/s, reduced motion enabled; Umami requests blocked. One lab sample per page:

| Page | LCP | CLS |
| --- | ---: | ---: |
| /en | 1,332 ms | 0 |
| /en/pricing | 972 ms | 0.000276 |
| /en/features/payments-and-debt | 996 ms | 0.019624 |

These are single local lab samples, not field results, p75 measurements, INP evidence, Search Console results or proof of analytics-provider acceptance. Do not use them to declare the public CWV targets passed.

Root validation: 147 unit/server tests and 28 browser tests passed. Browser checks confirmed RU pricing with `?source=synthetic#terms` switches to the equivalent EN and UZ route with its suffix retained; the mobile menu reaches `/#savollar` without page errors. Synthetic lead tests cover duplicate submission, rejected receipt, confirmed retry and actual timeout; success analytics is emitted only after acknowledgement.

Remaining external acceptance: authorized Search Console export/access; accepted-event evidence from the Umami dashboard; owner definition of a qualified lead and its aggregate measurement. Issue #29 remains open until these are verified.
