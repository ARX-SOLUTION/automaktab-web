import { afterEach, expect, it, vi } from 'vitest';
import { createHostedAnalytics, hostedAnalyticsConfig, telemetryAttribution } from './platformAnalytics';
afterEach(() => vi.unstubAllGlobals());

it('loads no telemetry module without explicit session consent, or under DNT', async () => {
  const load = vi.fn();
  const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, ['cta_demo_click'], load);
  analytics.page('/students/123?phone=private');
  analytics.feature('cta_demo_click');
  await analytics.setConsent(false);
  expect(load).not.toHaveBeenCalled();
  vi.stubGlobal('navigator', { doNotTrack: '1' });
  await analytics.setConsent(true);
  expect(load).not.toHaveBeenCalled();
  analytics.dispose();
});

it('sends only redacted pages and allowlisted static feature tags to one configured module', async () => {
  const page = vi.fn(); const track = vi.fn(); const dispose = vi.fn();
  const createTracker = vi.fn(() => ({ page, track, dispose }));
  const load = vi.fn(async () => ({ createTracker }));
  const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, ['cta_demo_click'], load);
  await analytics.setConsent(true);
  analytics.page('/students/private-phone?email=private@example.test#jwt');
  await analytics.setConsent(true);
  analytics.feature('cta_demo_click'); analytics.feature('private@example.test');
  expect(load).toHaveBeenCalledOnce();
  expect(load).toHaveBeenCalledWith('https://analytics.example.test/tracker/v1.js');
  expect(createTracker).toHaveBeenCalledOnce();
  expect(page).not.toHaveBeenCalled();
  expect(track.mock.calls).toEqual([['page.view', { path: '/students/:id', surface: 'marketing' }], ['feature.used', { feature: 'cta_demo_click', surface: 'marketing' }]]);
  await analytics.setConsent(false); expect(dispose).toHaveBeenCalledOnce();
  analytics.feature('cta_demo_click'); expect(track).toHaveBeenCalledTimes(2);
});

it('filters attribution keys, contact data and numeric or opaque campaign identifiers', () => {
  expect(telemetryAttribution('?utm_source=telegram&utm_medium=social&utm_campaign=autumn_2026&email=private%40example.test&session_id=opaque', 'https://search.example.test/private?token=secret')).toEqual({ utm_source: 'telegram', utm_medium: 'social', utm_campaign: 'autumn_2026', referrer: 'search.example.test' });
  expect(telemetryAttribution('?utm_source=private%40example.test&utm_medium=998901234567&utm_campaign=session_998901234567', 'https://private:secret@search.example.test/path')).toEqual({});
  expect(telemetryAttribution('?utm_campaign=abc123abc123abc123abc123abc123', 'javascript:private')).toEqual({});
  expect(telemetryAttribution('?utm_campaign=phone_998-90-123-45-67', '')).toEqual({});
  expect(telemetryAttribution('?utm_campaign=phone_998_90_123_45_67', '')).toEqual({});
});

it('filters separator-formatted phone labels before emitting page metadata while retaining campaign labels', async () => {
  const track = vi.fn(); const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, [], async () => ({ createTracker: () => ({ page: vi.fn(), track, dispose: vi.fn() }) }));
  await analytics.setConsent(true);
  analytics.page('/dashboard', { utm_source: 'phone_998 90 123 45 67', utm_medium: 'phone_998.90.123.45.67', utm_campaign: 'phone_998-90-123-45-67' });
  analytics.page('/profile', { utm_campaign: 'autumn_2026' });
  expect(track.mock.calls).toEqual([
    ['page.view', { path: '/dashboard', surface: 'marketing' }],
    ['page.view', { path: '/profile', surface: 'marketing', utm_campaign: 'autumn_2026' }],
  ]);
  analytics.dispose();
});

it('counts distinct article navigation before redaction with observed per-page attribution only', async () => {
  const track = vi.fn(); const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, [], async () => ({ createTracker: () => ({ page: vi.fn(), track, dispose: vi.fn() }) }));
  await analytics.setConsent(true);
  analytics.page('/blog/article-a', telemetryAttribution('?utm_source=telegram&utm_medium=social&utm_campaign=autumn_2026', 'https://search.example.test/private?email=private'));
  analytics.page('/blog/article-a?email=private');
  analytics.page('/blog/article-b', telemetryAttribution('', 'https://search.example.test/private?email=private'));
  expect(track.mock.calls).toEqual([
    ['page.view', { path: '/blog/:id', surface: 'marketing', utm_source: 'telegram', utm_medium: 'social', utm_campaign: 'autumn_2026', referrer: 'search.example.test' }],
    ['page.view', { path: '/blog/:id', surface: 'marketing', referrer: 'search.example.test' }],
  ]);
  analytics.dispose();
});

it('discards pre-consent context and a revoked pending module page, including under GPC', async () => {
  const track = vi.fn(); const createTracker = vi.fn(() => ({ page: vi.fn(), track, dispose: vi.fn() }));
  let resolveLoad!: (module: { createTracker: typeof createTracker }) => void;
  const load = vi.fn(() => new Promise<{ createTracker: typeof createTracker }>(resolve => { resolveLoad = resolve; }));
  const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, [], load);
  analytics.page('/blog/pre-consent', { utm_source: 'preconsent' });
  const pending = analytics.setConsent(true);
  analytics.page('/blog/revoked', { utm_source: 'revoked' });
  await analytics.setConsent(false);
  resolveLoad({ createTracker }); await pending;
  expect(createTracker).not.toHaveBeenCalled();
  await analytics.setConsent(true); analytics.page('/blog/current', { utm_source: 'current' });
  expect(track.mock.calls).toEqual([['page.view', { path: '/blog/:id', surface: 'marketing', utm_source: 'current' }]]);
  vi.stubGlobal('navigator', { globalPrivacyControl: true });
  analytics.page('/blog/blocked', { utm_source: 'blocked' });
  analytics.feature('unlisted');
  expect(track).toHaveBeenCalledOnce();
  analytics.dispose();
});

it('preserves two consented navigations during module loading without duplicate or raw pages', async () => {
  const track = vi.fn(); const createTracker = vi.fn(() => ({ page: vi.fn(), track, dispose: vi.fn() }));
  let resolveLoad!: (module: { createTracker: typeof createTracker }) => void;
  const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, [], () => new Promise(resolve => { resolveLoad = resolve; }));
  const pending = analytics.setConsent(true);
  analytics.page('/blog/article-a?email=private'); analytics.page('/blog/article-a?email=changed'); analytics.page('/blog/article-b');
  resolveLoad({ createTracker }); await pending;
  expect(track.mock.calls).toEqual(Array.from({ length: 2 }, () => ['page.view', { path: '/blog/:id', surface: 'marketing' }]));
  analytics.dispose();
});

it('clears pending context when GPC changes before the module resolves', async () => {
  const privacy = { globalPrivacyControl: false }; vi.stubGlobal('navigator', privacy);
  const track = vi.fn(); const createTracker = vi.fn(() => ({ page: vi.fn(), track, dispose: vi.fn() }));
  let resolveLoad!: (module: { createTracker: typeof createTracker }) => void;
  const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, [], () => new Promise(resolve => { resolveLoad = resolve; }));
  const pending = analytics.setConsent(true); analytics.page('/blog/current', { utm_source: 'blocked' });
  privacy.globalPrivacyControl = true; resolveLoad({ createTracker }); await pending;
  expect(createTracker).not.toHaveBeenCalled();
  privacy.globalPrivacyControl = false; await analytics.setConsent(true); analytics.page('/blog/current', { utm_source: 'fresh' });
  expect(track.mock.calls).toEqual([['page.view', { path: '/blog/:id', surface: 'marketing', utm_source: 'fresh' }]]);
  analytics.dispose();
});

it('isolates module load failure and rejects insecure or unconfigured targets', async () => {
  const analytics = createHostedAnalytics({ origin: 'https://analytics.example.test', environment: 'production', source: 'marketing' }, [], async () => { throw new Error('module unavailable'); });
  await expect(analytics.setConsent(true)).resolves.toBeUndefined();
  expect(() => analytics.page('/dashboard')).not.toThrow();
  expect(hostedAnalyticsConfig({ origin: 'http://other.example.test', environment: 'production', source: 'marketing' })).toBeNull();
  expect(hostedAnalyticsConfig({ origin: 'https://localhost', environment: 'production', source: 'marketing' })).toBeNull();
  expect(hostedAnalyticsConfig({ origin: 'https://analytics.example.test', source: 'marketing' })).toBeNull();
  analytics.dispose();
});
