import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhyInnovmark from "@/components/WhyInnovmark";
import { dictionaries, isLocale } from "@/lib/i18n";
import { buildPageMetadata, localizedSeo } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  return buildPageMetadata(safeLocale, "/pourquoi-nous", localizedSeo[safeLocale].why);
}

export default async function LocalizedPourquoiNousPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-20 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 58% 48% at 80% 12%, rgba(37,99,235,0.18), transparent 64%), radial-gradient(ellipse 50% 46% at 16% 80%, rgba(139,92,246,0.14), transparent 66%)",
          }}
        />
        <WhyInnovmark hero={dict.pages.why} locale={locale} />
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
    </>
  );
}
