import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://www.nailcoachai.com";
const siteDescription =
  "Learn professional nail techniques with Irina, an international nail judge and educator with 25+ years of experience and 10,000+ students worldwide.";

const allura = localFont({
  src: "./fonts/allura-latin-400-normal.woff2",
  variable: "--font-allura",
  display: "block",
  weight: "400"
});

const inter = localFont({
  src: [
    {
      path: "./fonts/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "./fonts/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "./fonts/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal"
    },
    {
      path: "./fonts/inter-latin-700-normal.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-inter",
  display: "block"
});

const playfair = localFont({
  src: [
    {
      path: "./fonts/playfair-display-latin-400-normal.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "./fonts/playfair-display-latin-500-normal.woff2",
      weight: "500",
      style: "normal"
    }
  ],
  variable: "--font-playfair",
  display: "block"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nail Coach by Irina | AI Nail Education & Mentoring",
    template: "%s | Nail Coach by Irina",
  },
  description: siteDescription,
  applicationName: "Nail Coach by Irina",
  authors: [{ name: "Irina", url: siteUrl }],
  creator: "Irina",
  publisher: "Nail Coach by Irina",
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Nail Coach by Irina",
    title: "Nail Coach by Irina | AI Nail Education & Mentoring",
    description: siteDescription,
    images: [
      {
        url: `${basePath}/hero-background-v2.png`,
        alt: "Nail Coach by Irina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nail Coach by Irina | AI Nail Education & Mentoring",
    description: siteDescription,
    images: [`${basePath}/hero-background-v2.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2d2522",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nail Coach by Irina",
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en",
    creator: {
      "@type": "Person",
      name: "Irina",
      jobTitle: "Nail Educator and International Nail Judge",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${allura.variable} ${inter.variable} ${playfair.variable}`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
