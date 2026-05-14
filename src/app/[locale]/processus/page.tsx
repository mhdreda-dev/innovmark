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

const metadataByLocale: Record<string, Metadata> = {
  fr: {
    title: "Processus · INNOVMARK",
    description:
      "Un processus clair en quatre étapes pour transformer votre idée en expérience digitale premium.",
  },
  en: {
    title: "Process · INNOVMARK",
    description:
      "A clear four-step process to turn your idea into a premium digital experience.",
  },
  ar: {
    title: "طريقة الخدمة · INNOVMARK",
    description:
      "طريقة خدمة واضحة فـ أربع مراحل باش نحولو الفكرة ديالك لحضور احترافي فالإنترنت وجاهز للانطلاق.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return metadataByLocale[locale] ?? metadataByLocale.fr;
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
      <WhatsAppFloat locale={locale} />
    </>
  );
}
