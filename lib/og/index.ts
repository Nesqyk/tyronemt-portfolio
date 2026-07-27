import type { Metadata } from "next/types";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://tyronemt.cc/";
const siteDescription = "Tyrone Tabornal is a founder, creative director, and full-stack developer building thoughtful digital products.";

export const OpenGraph: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tyrone Tabornal",
    template: "%s | Tyrone Tabornal",
  },
  description: siteDescription,
  keywords: ["Tyrone Tabornal", "Founder", "Creative Director", "Full-Stack Developer", "Product Builder"],
  authors: [{ name: "Tyrone Tabornal", url: siteUrl }],
  creator: "Tyrone Tabornal",
  publisher: "Tyrone Tabornal",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Tyrone Tabornal",
    description: siteDescription,
    images: [{ url: "/api/og", width: 1200, height: 600, alt: "Tyrone Tabornal" }],
    siteName: "Tyrone Tabornal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyrone Tabornal",
    description: siteDescription,
    images: ["/api/og"],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
