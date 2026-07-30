import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nail Coach AI by Irina Klapsha",
    short_name: "Nail Coach AI",
    description:
      "Professional nail education and AI mentoring by Irina Klapsha.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#e9e1dc",
    theme_color: "#2d2522",
    icons: [
      {
        src: `${basePath}/nc-monogram-v4.svg?v=20260730`,
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: `${basePath}/nc-icon-192-v4.png?v=20260730`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/nc-icon-512-v4.png?v=20260730`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
