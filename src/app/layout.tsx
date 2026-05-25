import type { Metadata } from "next";
import { Cairo, Geist, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import RevealOnScroll from "@/components/RevealOnScroll";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { ogImageUrl, seoKeywords, siteUrl } from "@/lib/seo";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agence marketing digital à Sidi Kacem · INNOVMARK",
    template: "%s",
  },
  description:
    "Agence marketing digital à Sidi Kacem pour création de site web, branding, publicité digitale et contenu Instagram au Maroc.",
  keywords: seoKeywords,
  openGraph: {
    title: "Agence marketing digital à Sidi Kacem · INNOVMARK",
    description: "Sites web, branding, contenu Instagram et publicité digitale pour marques au Maroc.",
    url: siteUrl,
    siteName: "INNOVMARK",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "INNOVMARK studio créatif à Sidi Kacem" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence marketing digital à Sidi Kacem · INNOVMARK",
    description: "Studio créatif pour sites web, branding, contenu et publicité digitale au Maroc.",
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${geist.variable} ${manrope.variable} ${jetbrains.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-transparent text-slate-950 selection:bg-blue-200/60">
        {children}
        <FloatingWhatsAppButton />
        <RevealOnScroll />
      </body>
    </html>
  );
}
