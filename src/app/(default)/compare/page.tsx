import { generateUzSeoMetadata, renderUzSeoPage } from "../seo-page";

const SEO_PATH = ["compare"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function ComparePage() {
  return renderUzSeoPage(SEO_PATH);
}
