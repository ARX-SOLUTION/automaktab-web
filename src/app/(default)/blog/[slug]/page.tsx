import {
  default as LocalizedBlogArticle,
  generateMetadata as generateLocalizedMetadata,
  generateStaticParams as generateLocalizedStaticParams,
} from "../../../[locale]/blog/[slug]/page";

export const revalidate = 3600;

export function generateStaticParams() {
  return generateLocalizedStaticParams();
}

type BlogArticleProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogArticleProps) {
  const { slug } = await params;
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "uz", slug }),
  });
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const { slug } = await params;
  return LocalizedBlogArticle({
    params: Promise.resolve({ locale: "uz", slug }),
  });
}
