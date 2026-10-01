import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "digital-attendance"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function DigitalAttendancePage() {
  return renderUzSeoPage(SEO_PATH);
}
