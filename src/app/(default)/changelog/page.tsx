import {
  default as LocalizedChangelogPage,
  generateMetadata as generateLocalizedMetadata,
} from "../../[locale]/changelog/page";

export const revalidate = 3600;

export function generateMetadata() {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "uz" }),
  });
}

export default function ChangelogPage() {
  return LocalizedChangelogPage({
    params: Promise.resolve({ locale: "uz" }),
  });
}
