import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { availableBlogLocales, blogAlternates, type BlogPost, getBlogPosts } from "@/lib/blog";
import { switchLocalePath, preserveLocaleSuffix } from "@/lib/locale-metadata";
import sitemap from "@/app/sitemap";
import { generateMetadata as blogIndexMetadata } from "@/app/[locale]/blog/page";

const post = { slug: "road & school", status: "published", title_uz: "Title", body_uz: "Body", title_ru: "Title", body_ru: "  ", title_en: "", body_en: "Body" } as BlogPost;
describe("public blog availability", () => {
  it("requires published status and trimmed title/body, using only real fallback URLs", () => {
    expect(availableBlogLocales(post)).toEqual(["uz"]);
    expect(availableBlogLocales({ ...post, status: "draft" })).toEqual([]);
    const translated = { ...post, body_ru: "Body", body_uz: "" };
    expect(availableBlogLocales(translated)).toEqual(["ru"]);
    expect(blogAlternates(translated, "ru").languages).toEqual({ ru: "https://automaktab.uz/ru/blog/road%20%26%20school", "x-default": "https://automaktab.uz/ru/blog/road%20%26%20school" });
  });
  it("checks detail bodies rather than advertising title-only list translations", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(Response.json({ success: true, data: { items: [post] } })).mockResolvedValueOnce(Response.json({ success: true, data: post }));
    vi.stubGlobal("fetch", fetchMock);
    try { expect(await getBlogPosts()).toEqual([post]); expect(fetchMock).toHaveBeenCalledTimes(2); } finally { vi.unstubAllGlobals(); }
  });
  it("preserves page routes and sends missing article translations to the locale index", () => {
    expect(switchLocalePath("/ru/pricing", "en")).toBe("/en/pricing");
    expect(switchLocalePath("/en/features/digital-attendance", "uz")).toBe("/features/digital-attendance");
    expect(switchLocalePath("/ru/blog/example", "en", ["uz", "ru"])).toBe("/en/blog");
  });
});

it("preserves current query and fragment for a locale click", () => {
  vi.stubGlobal("window", { location: { search: "?preview=platform", hash: "#example" } });
  const anchor = { href: "https://automaktab.uz/en/pricing" } as HTMLAnchorElement;
  try { preserveLocaleSuffix({ currentTarget: anchor }); expect(anchor.href).toBe("https://automaktab.uz/en/pricing?preview=platform#example"); } finally { vi.unstubAllGlobals(); }
});

describe("empty blog index", () => {
  const published = { ...post, published_at: "2026-10-01T00:00:00Z" } as BlogPost;
  function stubBlogApi(items: BlogPost[]) {
    vi.stubGlobal("fetch", vi.fn(async (input: string) => input.includes("/blog-posts?")
      ? Response.json({ success: true, data: { items } })
      : Response.json({ success: true, data: items.find((item) => input.endsWith(`/${encodeURIComponent(item.slug)}`)) })));
  }
  const blogUrls = (entries: { url: string }[]) => entries.map((entry) => entry.url).filter((url) => /\/blog$/.test(url));

  it("is noindex and left out of the sitemap while there are no articles", async () => {
    stubBlogApi([]);
    try {
      expect((await blogIndexMetadata({ params: Promise.resolve({ locale: "uz" }) })).robots).toEqual({ index: false, follow: true });
      const entries = await sitemap();
      expect(blogUrls(entries)).toEqual([]);
      expect(entries.find((entry) => entry.url === "https://automaktab.uz/changelog")?.lastModified).toBeInstanceOf(Date);
    } finally { vi.unstubAllGlobals(); }
  });
  it("is indexed and listed again for languages that have a published article", async () => {
    stubBlogApi([published]);
    try {
      expect((await blogIndexMetadata({ params: Promise.resolve({ locale: "uz" }) })).robots).toBeUndefined();
      expect((await blogIndexMetadata({ params: Promise.resolve({ locale: "en" }) })).robots).toEqual({ index: false, follow: true });
      const entries = await sitemap();
      expect(blogUrls(entries)).toEqual(["https://automaktab.uz/blog"]);
      expect(entries.find((entry) => entry.url === "https://automaktab.uz/blog")?.lastModified).toEqual(new Date("2026-10-01T00:00:00Z"));
    } finally { vi.unstubAllGlobals(); }
  });
});
