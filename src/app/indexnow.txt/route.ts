// IndexNow (Bing, Yandex) ownership key, served at
// https://automaktab.uz/indexnow.txt and passed as keyLocation when pinging.
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
