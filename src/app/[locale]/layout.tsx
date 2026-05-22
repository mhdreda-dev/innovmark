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
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="innovmark-light-theme min-w-0 overflow-x-clip">
      <LocaleHtmlAttrs locale={locale} />

      {/* ── Shared ambient background ─ fixed layer behind all page content ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Base canvas */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(165deg,#ffffff 0%,#f8fbff 34%,#f3f6fb 68%,#ffffff 100%)" }} />
        {/* Top-center hero glow — gives every page a lit feel from the top */}
        <div className="absolute -top-[8%] left-1/2 -translate-x-1/2 w-[80vw] h-[55vh] rounded-full" style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(79,140,255,0.13),transparent 64%)", filter: "blur(82px)" }} />
        {/* Upper-left blue orb */}
        <div className="absolute -top-[5%] -left-[8%] w-[52vw] h-[52vh] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(79,140,255,0.10),transparent 68%)", filter: "blur(92px)" }} />
        {/* Mid-right violet orb */}
        <div className="absolute top-[30%] -right-[6%] w-[48vw] h-[50vh] rounded-full" style={{ background: "radial-gradient(ellipse at right,rgba(79,140,255,0.08),transparent 68%)", filter: "blur(104px)" }} />
        {/* Lower-center teal orb */}
        <div className="absolute top-[62%] left-[18%] w-[58vw] h-[48vh] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(125,211,252,0.08),transparent 68%)", filter: "blur(108px)" }} />
        {/* Bottom-right accent */}
        <div className="absolute top-[85%] right-[12%] w-[44vw] h-[42vh] rounded-full" style={{ background: "radial-gradient(ellipse at right,rgba(79,140,255,0.09),transparent 68%)", filter: "blur(92px)" }} />
        {/* Subtle aurora shimmer across upper area */}
        <div className="absolute top-[5%] left-[10%] w-[80vw] h-[40vh] rounded-full" style={{ background: "radial-gradient(ellipse at 40% 0%,rgba(79,140,255,0.06),transparent 58%)", filter: "blur(128px)", animation: "ambientAurora 28s ease-in-out infinite alternate" }} />
      </div>
      <style>{`
        @keyframes ambientAurora {
          from { transform: translate3d(-4%,0,0) scale(1); opacity: 0.7; }
          to   { transform: translate3d(4%,0,0) scale(1.06); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pointer-events-none.fixed div[style*="ambientAurora"] { animation: none !important; }
        }
      `}</style>

      {children}
    </div>
  );
}
