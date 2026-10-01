import { describe, it, expect } from 'vitest';
import {
  CHANGELOG_ITEMS,
  CHANGELOG_COPY,
  type ProductPillar,
} from '@/config/changelog';
import { SUPPORTED_LOCALES } from '@/i18n/config';

describe('Changelog Configuration and Content Safety', () => {
  it('has valid translation strings across all supported locales', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const copy = CHANGELOG_COPY[locale];
      expect(copy).toBeDefined();
      expect(copy.title).toBeTruthy();
      expect(copy.eyebrow).toBeTruthy();
      expect(copy.description).toBeTruthy();
      expect(copy.latestBadge).toBeTruthy();
      expect(copy.filterAll).toBeTruthy();
      expect(copy.filterFeatures).toBeTruthy();
      expect(copy.filterImprovements).toBeTruthy();
      expect(copy.filterFixes).toBeTruthy();
      expect(copy.demoNotice).toBeTruthy();
      expect(copy.tableOfContents).toBeTruthy();
    }
  });

  it('contains zero em-dashes across all copy and release notes (Rule R-02)', () => {
    // Check global copy
    for (const [locale, copy] of Object.entries(CHANGELOG_COPY)) {
      for (const [key, val] of Object.entries(copy)) {
        if (typeof val === 'string') {
          expect(val.includes('—'), `Em-dash found in copy ${locale}.${key}: "${val}"`).toBe(false);
        }
      }
    }

    // Check release items
    for (const item of CHANGELOG_ITEMS) {
      for (const locale of SUPPORTED_LOCALES) {
        expect(
          item.title[locale].includes('—'),
          `Em-dash found in title of ${item.version} (${locale})`,
        ).toBe(false);

        expect(
          item.excerpt[locale].includes('—'),
          `Em-dash found in excerpt of ${item.version} (${locale})`,
        ).toBe(false);

        for (const feat of item.highlights.features[locale] || []) {
          expect(
            feat.includes('—'),
            `Em-dash found in feature of ${item.version} (${locale}): "${feat}"`,
          ).toBe(false);
        }

        for (const imp of item.highlights.improvements[locale] || []) {
          expect(
            imp.includes('—'),
            `Em-dash found in improvement of ${item.version} (${locale}): "${imp}"`,
          ).toBe(false);
        }

        for (const fix of item.highlights.fixes[locale] || []) {
          expect(
            fix.includes('—'),
            `Em-dash found in fix of ${item.version} (${locale}): "${fix}"`,
          ).toBe(false);
        }
      }
    }
  });

  it('adheres to strict SemVer and ISO date formats across all releases including roadmap', () => {
    expect(CHANGELOG_ITEMS.length).toBeGreaterThan(0);
    expect(new Set(CHANGELOG_ITEMS.map((item) => item.version)).size).toBe(CHANGELOG_ITEMS.length);

    const semverRegex = /^v\d+\.\d+\.\d+$/;
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const validPillars: ProductPillar[] = [
      'fleet',
      'finance',
      'attendance',
      'schedule',
      'compliance',
      'crm',
    ];

    for (const item of CHANGELOG_ITEMS) {
      expect(item.version).toMatch(semverRegex);
      expect(item.releaseDate).toMatch(isoDateRegex);
      expect(validPillars).toContain(item.pillar);
      expect(item.author.name).toBeTruthy();
      expect(item.routeHint).toBeTruthy();
    }
  });
});
