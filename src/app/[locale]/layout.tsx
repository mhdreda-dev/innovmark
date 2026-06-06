import { notFound } from "next/navigation";
import LocaleHtmlAttrs from "@/components/LocaleHtmlAttrs";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg,#ffffff 0%,#fbfdff 30%,#f6f8fc 62%,#ffffff 100%)",
          }}
        />
        {/* Soft depth wash, like a premium product page canvas */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 58% 34% at 50% -6%,rgba(79,140,255,0.075),transparent 68%), radial-gradient(ellipse 26% 22% at 10% 16%,rgba(125,211,252,0.035),transparent 72%), radial-gradient(ellipse 26% 24% at 92% 14%,rgba(79,140,255,0.032),transparent 74%)",
          }}
        />
        {/* Almost invisible grid to keep the light theme from feeling flat */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(79,140,255,0.035) 1px,transparent 1px), linear-gradient(90deg,rgba(79,140,255,0.032) 1px,transparent 1px)",
            backgroundSize: "104px 104px",
            WebkitMaskImage:
              "radial-gradient(ellipse 78% 58% at 50% 18%,black,transparent 78%)",
            maskImage:
              "radial-gradient(ellipse 78% 58% at 50% 18%,black,transparent 78%)",
          }}
        />
        {/* Fine paper grain */}
        <div
          className="absolute inset-0 opacity-[0.075] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.33 0 0 0 0 0.42 0 0 0 0 0.55 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        {/* Top-center hero glow — small and restrained */}
        <div className="absolute -top-[4%] left-1/2 h-[24vh] w-[34vw] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(79,140,255,0.075),transparent 70%)", filter: "blur(72px)" }} />
        {/* Small corner accents, reduced to avoid random blob noise */}
        <div className="absolute top-[14%] -left-[4%] h-[18vh] w-[18vw] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(79,140,255,0.045),transparent 72%)", filter: "blur(70px)" }} />
        <div className="absolute top-[42%] -right-[4%] h-[18vh] w-[17vw] rounded-full" style={{ background: "radial-gradient(ellipse at right,rgba(79,140,255,0.038),transparent 74%)", filter: "blur(76px)" }} />
        <div className="absolute top-[78%] left-[16%] h-[16vh] w-[22vw] rounded-full" style={{ background: "radial-gradient(ellipse,rgba(125,211,252,0.035),transparent 74%)", filter: "blur(80px)" }} />
        {/* Subtle aurora shimmer across upper area */}
        <div className="absolute top-[7%] left-[20%] h-[22vh] w-[42vw] rounded-full" style={{ background: "radial-gradient(ellipse at 40% 0%,rgba(79,140,255,0.032),transparent 64%)", filter: "blur(108px)", animation: "ambientAurora 28s ease-in-out infinite alternate" }} />
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
      <FloatingWhatsAppButton locale={locale} />
    </div>
  );
}
