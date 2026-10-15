import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "expenses"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function ExpensesPage() {
  return renderUzSeoPage(SEO_PATH);
}
