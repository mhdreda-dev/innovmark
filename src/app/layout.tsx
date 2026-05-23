import type { Metadata } from "next";
import { Cairo, Geist, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import RevealOnScroll from "@/components/RevealOnScroll";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

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
  title: "Innovmark — Studio Créatif Premium · Casablanca",
  description:
    "Vidéos promotionnelles, sites web, branding, réseaux sociaux, publicités et systèmes de gestion. Une agence pour les marques exigeantes.",
  openGraph: {
    title: "Innovmark — Studio Créatif Premium",
    description: "Vidéos, branding, web et performance pour les marques exigeantes.",
    type: "website",
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
