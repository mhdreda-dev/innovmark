import type { CmsPartner } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

const labels: Record<Locale, { eyebrow: string; title: string; description: string }> = {
  fr: {
    eyebrow: "Partenaires",
    title: "Marques et équipes qui avancent avec Innovmark",
    description: "Une sélection de marques et projets qui nous font confiance.",
  },
  en: {
    eyebrow: "Partners",
    title: "Brands and teams moving with Innovmark",
    description: "A selection of brands and projects that trust our work.",
  },
  ar: {
    eyebrow: "الشركاء",
    title: "مشاريع وفرق خدامين مع Innovmark",
    description: "اختيار من الماركات والمشاريع اللي وثقو فخدمتنا.",
  },
};

export default function Partners({ locale, items }: { locale: Locale; items: CmsPartner[] }) {
  const partners = items.filter((item) => item.isActive && item.logoUrl && item.websiteUrl);
  if (!partners.length) return null;

  const copy = labels[locale];
  const marqueePartners = partners.length >= 4 ? partners : Array.from({ length: Math.ceil(4 / partners.length) }).flatMap(() => partners);

  return (
    <section
      className="relative overflow-hidden border-y border-blue-100/70 bg-white/82 py-12 shadow-[0_18px_54px_rgba(15,23,42,0.055)] backdrop-blur-xl sm:py-18"
      dir="ltr"
      style={{ direction: "ltr", unicodeBidi: "isolate" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 h-44 opacity-[0.12] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 48%, rgba(79,140,255,0.68), transparent 34%), radial-gradient(circle at 72% 58%, rgba(125,211,252,0.50), transparent 36%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center" dir={locale === "ar" ? "rtl" : "ltr"}>
          <div className="text-[11px] uppercase tracking-[0.34em] text-blue-700/60">{copy.eyebrow}</div>
          <h2 className="mt-4 text-2xl font-light tracking-tight text-slate-950 sm:text-4xl">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{copy.description}</p>
        </div>
      </div>

      <div
        className="relative mt-8 w-full overflow-hidden sm:mt-10"
        dir="ltr"
        style={{ direction: "ltr", unicodeBidi: "isolate" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-36" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-36" />

        <div className="partners-marquee flex w-max min-w-max px-5 py-3 hover:[animation-play-state:paused]">
          {[0, 1].map((groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 gap-3 pr-3 sm:gap-5 sm:pr-5">
              {marqueePartners.map((partner) => (
                <a
                  key={`${partner.id}-${groupIndex}`}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={partner.description ? `${partner.name}: ${partner.description}` : partner.name}
                  aria-hidden={groupIndex === 1}
                  tabIndex={groupIndex === 1 ? -1 : undefined}
                  className="group grid h-20 w-36 shrink-0 place-items-center rounded-[1.1rem] border border-white/70 bg-white/78 px-4 py-4 shadow-[0_14px_38px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-blue-200/80 hover:bg-white/92 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12),0_0_34px_rgba(79,140,255,0.12)] sm:h-32 sm:w-60 sm:rounded-[1.35rem] sm:px-7"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.description ? `${partner.name} partenaire Innovmark - ${partner.description}` : `${partner.name} partenaire Innovmark`}
                    className="max-h-12 w-auto max-w-[92%] object-contain opacity-95 contrast-125 saturate-125 drop-shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition duration-300 group-hover:scale-[1.06] group-hover:opacity-100 sm:max-h-16"
                    loading="lazy"
                  />
                  <span className="sr-only">{partner.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .partners-marquee {
          animation: partners-marquee 36s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        @media (max-width: 640px) {
          .partners-marquee {
            animation-duration: 46s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .partners-marquee {
            animation: none;
            transform: none;
          }
        }

        @keyframes partners-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
