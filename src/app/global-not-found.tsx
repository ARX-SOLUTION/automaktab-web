import "./globals.css";
import Link from "next/link";

const DEMO_URL = "https://app.automaktab.uz/login?demo=1";

export default function GlobalNotFound() {
  return (
    <html lang="uz">
      <body>
        <main className="flex min-h-[100svh] flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
          <span className="signal-point" aria-hidden="true" />
          <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
            Sahifa topilmadi
          </h1>
          <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            Siz izlagan sahifa mavjud emas yoki ko‘chirilgan.
          </p>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/" className="button button-primary">
              Bosh sahifaga qaytish
            </Link>
            <a href={DEMO_URL} className="button button-secondary">
              Demo bilan sinab ko‘ring
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
