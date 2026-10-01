import Home from "../[locale]/page";

export default function HomePage() {
  return <Home params={Promise.resolve({ locale: "uz" })} />;
}
