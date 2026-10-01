import { generateUzSeoMetadata, renderUzSeoPage } from "../seo-page";

const SEO_PATH = ["pricing"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function PricingPage() {
  return renderUzSeoPage(SEO_PATH);
}
