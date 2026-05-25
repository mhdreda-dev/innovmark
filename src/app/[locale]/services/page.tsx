import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { dictionaries, isLocale } from "@/lib/i18n";
import { getPublishedHomeContent } from "@/lib/cms/content";
import { buildPageMetadata, localizedSeo } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  return buildPageMetadata(safeLocale, "/services", localizedSeo[safeLocale].services);
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
    </>
  );
}
