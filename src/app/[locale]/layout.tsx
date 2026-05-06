import { notFound } from "next/navigation";
import LocaleHtmlAttrs from "@/components/LocaleHtmlAttrs";
import { isLocale, locales } from "@/lib/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <LocaleHtmlAttrs locale={locale} />

      {/* ── Shared ambient background ─ fixed layer behind all page content ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg,#050d1e 0%,#04090f 35%,#030710 65%,#020508 100%)" }} />
        <div className="absolute -top-[10%] -left-[5%] w-[55vw] h-[55vh] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(60,120,255,0.09),transparent 68%)", filter: "blur(90px)" }} />
        <div className="absolute top-[35%] -right-[8%] w-[50vw] h-[50vh] rounded-full" style={{ background: "radial-gradient(ellipse at right,rgba(130,60,255,0.08),transparent 68%)", filter: "blur(100px)" }} />
        <div className="absolute top-[65%] left-[20%] w-[60vw] h-[45vh] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(20,180,166,0.06),transparent 68%)", filter: "blur(110px)" }} />
        <div className="absolute top-[90%] right-[15%] w-[45vw] h-[40vh] rounded-full" style={{ background: "radial-gradient(ellipse at right,rgba(91,140,255,0.07),transparent 68%)", filter: "blur(90px)" }} />
      </div>

      {children}
    </div>
  );
}
