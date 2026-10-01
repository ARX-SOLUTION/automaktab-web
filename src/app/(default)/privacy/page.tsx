import { generateUzSeoMetadata, renderUzSeoPage } from "../seo-page";

const SEO_PATH = ["privacy"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function PrivacyPage() {
  return renderUzSeoPage(SEO_PATH);
}
