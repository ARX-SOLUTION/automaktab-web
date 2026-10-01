import { generateUzSeoMetadata, renderUzSeoPage } from "../../seo-page";

const SEO_PATH = ["features", "branch-management"];

export function generateMetadata() {
  return generateUzSeoMetadata(SEO_PATH);
}

export default function BranchManagementPage() {
  return renderUzSeoPage(SEO_PATH);
}
