import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "schedules-and-groups"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function SchedulesAndGroupsPage() {
  return renderUzSeoPage(SEO_PATH);
}
