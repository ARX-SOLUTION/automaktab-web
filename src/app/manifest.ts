import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "automaktab.uz",
    short_name: "automaktab",
    description:
      "Avtomaktablar uchun boshqaruv tizimi — to‘lov, jadval va davomat bir joyda.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F7F2",
    theme_color: "#10120e",
    lang: "uz",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
