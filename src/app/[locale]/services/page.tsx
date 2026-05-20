import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Services from "@/components/Services";
import { dictionaries, isLocale } from "@/lib/i18n";
import { getPublishedHomeContent } from "@/lib/cms/content";

type Props = {
  params: Promise<{ locale: string }>;
};

const metadataByLocale: Record<string, Metadata> = {
  fr: {
    title: "Services · INNOVMARK",
    description:
      "Vidéos promotionnelles, sites web, branding, réseaux sociaux, publicités et systèmes de gestion pour marques premium.",
  },
  en: {
    title: "Services · INNOVMARK",
    description:
      "Promotional videos, websites, branding, social media, ads and management systems for premium brands.",
  },
  ar: {
    title: "الخدمات · INNOVMARK",
    description:
      "مواقع، براندينغ، محتوى وإعلانات باش المشاريع المغربية تبان باحترافية فالإنترنت وتجيب طلبات أكثر.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return metadataByLocale[locale] ?? metadataByLocale.fr;
}

export default async function LocalizedServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];
  const content = await getPublishedHomeContent(locale);

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-20 sm:pt-24">
        <Services hero={dict.pages.services} locale={locale} items={content.services} />
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
      <WhatsAppFloat locale={locale} />
    </>
  );
}
