import { getBlogPosts, localizeBlogPost } from "@/lib/blog";

const SITE_URL = "https://automaktab.uz";

export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getBlogPosts();
  const items = posts
    .filter((post) => post.status === "published")
    .map((post) => {
      const localized = localizeBlogPost(post, "uz");
      const articleUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
      const publishedAt = post.published_at
        ? `\n      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>`
        : "";

      return `    <item>
      <title>${escapeXml(localized.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description>${escapeXml(localized.excerpt)}</description>${publishedAt}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>automaktab.uz blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Avtomaktab boshqaruvi bo‘yicha amaliy maqolalar.</description>
    <language>uz</language>
${items ? `${items}\n` : ""}  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
