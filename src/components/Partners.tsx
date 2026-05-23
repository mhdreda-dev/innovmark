import type { CmsPartner } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

const labels: Record<Locale, { eyebrow: string; title: string; description: string }> = {
  fr: {
    eyebrow: "Partenaires",
    title: "Marques et équipes qui avancent avec Innovmark",
    description: "Un défilé discret de logos, pensé comme une preuve sociale premium sans interrompre le rythme de la page.",
  },
  en: {
    eyebrow: "Partners",
    title: "Brands and teams moving with Innovmark",
    description: "A quiet logo flow designed as premium proof without interrupting the page rhythm.",
  },
  ar: {
    eyebrow: "الشركاء",
    title: "مشاريع وفرق خدامين مع Innovmark",
    description: "لوغوهات ديال شركاء وثقو فينا، بلا ما نقطعو عليك تصفح الصفحة.",
  },
};

export default function Partners({ locale, items }: { locale: Locale; items: CmsPartner[] }) {
  const partners = items.filter((item) => item.isActive && item.logoUrl && item.websiteUrl);
  if (!partners.length) return null;

  const copy = labels[locale];
  const basePartners = partners.length ? partners : [];
  const minCards = 24;
  const repeatedPartners = Array.from({
    length: Math.max(6, Math.ceil(minCards / basePartners.length)),
  }).flatMap(() => basePartners);
  const marqueeItems = [...repeatedPartners, ...repeatedPartners];

  return (
    <section
      className="relative overflow-hidden border-y border-blue-100/70 bg-white/76 py-16 shadow-[0_18px_54px_rgba(15,23,42,0.055)] backdrop-blur-xl sm:py-20"
      dir="ltr"
      style={{ direction: "ltr", unicodeBidi: "isolate" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-28 h-32 opacity-[0.06] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 55%, rgba(79,140,255,0.8), transparent 32%), radial-gradient(circle at 72% 62%, rgba(125,211,252,0.55), transparent 34%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center" dir={locale === "ar" ? "rtl" : "ltr"}>
          <div className="text-[11px] uppercase tracking-[0.34em] text-blue-700/60">{copy.eyebrow}</div>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 sm:text-4xl">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{copy.description}</p>
        </div>
      </div>

      <div
        className="relative left-1/2 right-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden"
        dir="ltr"
        style={{ direction: "ltr", unicodeBidi: "isolate" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />
        <div className="partners-marquee flex w-max min-w-max gap-4 px-5 hover:[animation-play-state:paused] sm:gap-5">
          {marqueeItems.map((partner, index) => (
            <a
              key={`${partner.name}-${index}`}
              href={partner.websiteUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={partner.description ? `${partner.name}: ${partner.description}` : partner.name}
              aria-hidden={index >= repeatedPartners.length}
              className="group grid h-28 w-48 shrink-0 place-items-center rounded-2xl border border-blue-100/80 bg-white/90 px-6 shadow-[0_12px_34px_rgba(15,23,42,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/55 hover:bg-white hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] sm:h-32 sm:w-60"
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="max-h-14 w-auto max-w-full object-contain opacity-100 transition duration-300 group-hover:scale-105 sm:max-h-16"
                loading="lazy"
              />
              <span className="sr-only">{partner.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
