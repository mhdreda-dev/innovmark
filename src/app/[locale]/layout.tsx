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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg,#ffffff 0%,#fbfdff 30%,#f6f8fc 62%,#ffffff 100%)",
          }}
        />
        {/* Soft depth wash, like a premium product page canvas */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 52% at 50% -8%,rgba(79,140,255,0.105),transparent 64%), radial-gradient(ellipse 52% 42% at 8% 18%,rgba(125,211,252,0.07),transparent 68%), radial-gradient(ellipse 46% 48% at 92% 12%,rgba(79,140,255,0.06),transparent 70%)",
          }}
        />
        {/* Almost invisible grid to keep the light theme from feeling flat */}
        <div
          className="absolute inset-0 opacity-[0.26]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(79,140,255,0.045) 1px,transparent 1px), linear-gradient(90deg,rgba(79,140,255,0.04) 1px,transparent 1px)",
            backgroundSize: "88px 88px",
            WebkitMaskImage:
              "radial-gradient(ellipse 78% 58% at 50% 18%,black,transparent 78%)",
            maskImage:
              "radial-gradient(ellipse 78% 58% at 50% 18%,black,transparent 78%)",
          }}
        />
        {/* Fine paper grain */}
        <div
          className="absolute inset-0 opacity-[0.11] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.33 0 0 0 0 0.42 0 0 0 0 0.55 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
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
