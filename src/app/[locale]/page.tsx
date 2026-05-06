import Nav from "@/components/Nav";
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
      {/* Page-wide ambient background — continuous luminous depth across all sections */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Deep base */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg,#050d1e 0%,#04090f 35%,#030710 65%,#020508 100%)" }} />
        {/* Upper left — blue glow */}
        <div className="absolute -top-[10%] -left-[5%] w-[55vw] h-[55vh] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(60,120,255,0.09),transparent 68%)", filter: "blur(90px)" }} />
        {/* Mid right — violet glow */}
        <div className="absolute top-[35%] -right-[8%] w-[50vw] h-[50vh] rounded-full" style={{ background: "radial-gradient(ellipse at right,rgba(130,60,255,0.08),transparent 68%)", filter: "blur(100px)" }} />
        {/* Lower center — teal glow */}
        <div className="absolute top-[65%] left-[20%] w-[60vw] h-[45vh] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(20,180,166,0.06),transparent 68%)", filter: "blur(110px)" }} />
        {/* Far bottom — blue accent */}
        <div className="absolute top-[90%] right-[15%] w-[45vw] h-[40vh] rounded-full" style={{ background: "radial-gradient(ellipse at right,rgba(91,140,255,0.07),transparent 68%)", filter: "blur(90px)" }} />
      </div>

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
