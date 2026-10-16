import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "telegram-report"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function TelegramReportPage() {
  return renderUzSeoPage(SEO_PATH);
}
