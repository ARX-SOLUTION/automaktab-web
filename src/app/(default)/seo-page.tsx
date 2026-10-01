import {
  default as LocalizedSeoPage,
  generateMetadata as generateLocalizedMetadata,
} from "../[locale]/[...seoPath]/page";

export function generateUzSeoMetadata(seoPath: string[]) {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "uz", seoPath }),
  });
}

export function renderUzSeoPage(seoPath: string[]) {
  return LocalizedSeoPage({
    params: Promise.resolve({ locale: "uz", seoPath }),
  });
}
