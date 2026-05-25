import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import { dictionaries, isLocale } from "@/lib/i18n";
import { buildPageMetadata, localizedSeo } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  return buildPageMetadata(safeLocale, "/processus", localizedSeo[safeLocale].process);
}

export default async function LocalizedProcessusPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-20 sm:pt-24">
        <Process hero={dict.pages.process} locale={locale} />
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
    </>
  );
}
