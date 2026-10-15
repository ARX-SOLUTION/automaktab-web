import Home, { generateMetadata as generateLocalizedMetadata } from "../[locale]/page";

export function generateMetadata() {
  return generateLocalizedMetadata({ params: Promise.resolve({ locale: "uz" }) });
}

export default function HomePage() {
  return <Home params={Promise.resolve({ locale: "uz" })} />;
}
