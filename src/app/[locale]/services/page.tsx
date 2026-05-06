import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Services from "@/components/Services";
import { dictionaries, isLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Services · INNOVMARK",
  description:
    "Vidéos promotionnelles, sites web, branding, réseaux sociaux, publicités et systèmes de gestion pour marques premium.",
};

export default async function LocalizedServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-24">
        <Services hero={dict.pages.services} locale={locale} />
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
      <WhatsAppFloat locale={locale} />
    </>
  );
}
