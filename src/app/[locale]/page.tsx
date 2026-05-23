import Nav from "@/components/Nav";
import CreativeFormats from "@/components/CreativeFormats";
import BrandMarquee from "@/components/BrandMarquee";
import StatsBand from "@/components/StatsBand";
import { SaadBelkaadiTeaser } from "@/components/SaadBelkaadi";
import CapabilitiesPreview from "@/components/CapabilitiesPreview";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { ImageCarouselHero } from "@/components/ui/ai-image-generator-hero";
import { dictionaries, isLocale, localizedHref } from "@/lib/i18n";
import { getPublishedHomeContent } from "@/lib/cms/content";
import { getFallbackHomeContent } from "@/lib/cms/fallbacks";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = await getPublishedHomeContent(locale);

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    robots: content.seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      images: content.seo.ogImage ? [{ url: content.seo.ogImage }] : undefined,
      type: "website",
    },
  };
}

export default async function LocalizedHome({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];
  const content = await getPublishedHomeContent(locale);
  const fallback = getFallbackHomeContent(locale);
  const safeCarouselImages = content.hero.carouselImages?.length
    ? content.hero.carouselImages
    : fallback.hero.carouselImages;
  const sectionNodes: Record<string, ReactNode> = {
    "creative-formats": <CreativeFormats locale={locale} />,
    "brand-marquee": <BrandMarquee locale={locale} />,
    stats: <StatsBand locale={locale} />,
    "saad-belkaadi": <SaadBelkaadiTeaser locale={locale} />,
    capabilities: <CapabilitiesPreview locale={locale} />,
    partners: <Partners locale={locale} items={content.partners} />,
    testimonials: <Testimonials locale={locale} items={content.testimonials} />,
    pricing: <Pricing locale={locale} />,
    cta: <CTA locale={locale} />,
  };
  const orderedSections = [
    "creative-formats",
    ...content.sections.filter((section) => section !== "creative-formats"),
  ];
  const sectionSpacingClass = (section: string) =>
    section === "capabilities" ? "-mt-10 md:-mt-16" : undefined;

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-x-clip">
        <div id="top">
          <ImageCarouselHero
            title={content.hero.title}
            subtitle={content.hero.eyebrow}
            description={content.hero.description}
            ctaText={content.hero.ctaLabel}
            ctaHref={content.hero.ctaHref || `https://wa.me/212771450503?text=${encodeURIComponent(dict.home.heroWhatsappMessage)}`}
            secondaryCtaText={content.hero.secondaryCtaLabel}
            secondaryCtaHref={content.hero.secondaryCtaHref || localizedHref("/contact", locale)}
            images={safeCarouselImages}
            features={content.hero.features}
            trustSignals={dict.home.heroTrustSignals}
            heroVideoUrl={content.hero.heroVideoUrl || undefined}
          />
        </div>

        {orderedSections.map((section) => (
          <div key={section} id={section === "creative-formats" ? "work" : undefined} className={sectionSpacingClass(section)}>
            {sectionNodes[section]}
          </div>
        ))}
        {content.seo.structuredData && (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(content.seo.structuredData) }}
          />
        )}
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
    </>
  );
}
