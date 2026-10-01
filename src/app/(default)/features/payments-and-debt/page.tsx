import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "payments-and-debt"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function PaymentsAndDebtPage() {
  return renderUzSeoPage(SEO_PATH);
}
