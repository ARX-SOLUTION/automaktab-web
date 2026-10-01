import { generateUzSeoMetadata, renderUzSeoPage } from "../seo-page";

const SEO_PATH = ["terms"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function TermsPage() {
  return renderUzSeoPage(SEO_PATH);
}
