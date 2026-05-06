import Nav from "@/components/Nav";
import CreativeFormats from "@/components/CreativeFormats";
import BrandMarquee from "@/components/BrandMarquee";
import StatsBand from "@/components/StatsBand";
import { SaadBelkaadiTeaser } from "@/components/SaadBelkaadi";
import CapabilitiesPreview from "@/components/CapabilitiesPreview";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { ImageCarouselHero } from "@/components/ui/ai-image-generator-hero";
import { heroImages } from "@/data/hero-images";
import { dictionaries, isLocale, localizedHref } from "@/lib/i18n";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10">
        <div id="top">
          <ImageCarouselHero
            title={dict.home.heroTitle}
            subtitle={dict.home.heroSubtitle}
            description={dict.home.heroDescription}
            ctaText={dict.home.heroCta}
            ctaHref={`https://wa.me/212771450503?text=${encodeURIComponent(dict.home.heroWhatsappMessage)}`}
            secondaryCtaText={dict.home.heroSecondaryCta}
            secondaryCtaHref={localizedHref("/contact", locale)}
            images={heroImages}
            features={[...dict.home.features]}
          />
        </div>

        <CreativeFormats locale={locale} />
        <BrandMarquee locale={locale} />
        <StatsBand locale={locale} />
        <SaadBelkaadiTeaser locale={locale} />
        <CapabilitiesPreview locale={locale} />
        <Testimonials locale={locale} />
        <Pricing locale={locale} />
        <CTA locale={locale} />
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
      <WhatsAppFloat locale={locale} />
    </>
  );
}
