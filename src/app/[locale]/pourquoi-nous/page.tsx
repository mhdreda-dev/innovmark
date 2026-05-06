import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import WhyInnovmark from "@/components/WhyInnovmark";
import { dictionaries, isLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Pourquoi Nous · INNOVMARK",
  description:
    "Strategy first, premium execution, fast communication, results focused — découvrez pourquoi les marques exigeantes choisissent INNOVMARK.",
};

export default async function LocalizedPourquoiNousPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-24">
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
      <WhatsAppFloat locale={locale} />
    </>
  );
}
