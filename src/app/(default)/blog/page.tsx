import {
  default as LocalizedBlogIndex,
  generateMetadata as generateLocalizedMetadata,
} from "../../[locale]/blog/page";

export const revalidate = 3600;

export function generateMetadata() {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "uz" }),
  });
}

export default function BlogIndex() {
  return LocalizedBlogIndex({
    params: Promise.resolve({ locale: "uz" }),
  });
}
