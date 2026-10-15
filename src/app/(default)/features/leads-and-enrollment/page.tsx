import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "leads-and-enrollment"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function LeadsAndEnrollmentPage() {
  return renderUzSeoPage(SEO_PATH);
}
