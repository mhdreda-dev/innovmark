import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Process from "@/components/Process";
import { dictionaries, isLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Processus · INNOVMARK",
  description:
    "Un processus clair en quatre étapes pour transformer votre idée en expérience digitale premium.",
};

export default async function LocalizedProcessusPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-24">
        <Process hero={dict.pages.process} locale={locale} />
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
      <WhatsAppFloat locale={locale} />
    </>
  );
}
