import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "fleet"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function FleetPage() {
  return renderUzSeoPage(SEO_PATH);
}
