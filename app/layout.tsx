import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
  title: "Nail Coach by Irina",
  description:
    "Your personal AI nail mentor — learn from Irina's 25 years of experience, anytime and in any language.",
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`
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
  return (
    <html lang="en">
      <body
        className={`${allura.variable} ${inter.variable} ${playfair.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
