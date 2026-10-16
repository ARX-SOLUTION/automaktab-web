import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "practical-driving"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function PracticalDrivingPage() {
  return renderUzSeoPage(SEO_PATH);
}
