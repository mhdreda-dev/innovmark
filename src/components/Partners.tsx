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

  return (
    <section
      className="relative overflow-hidden border-y border-blue-100/70 bg-white/82 py-14 shadow-[0_18px_54px_rgba(15,23,42,0.055)] backdrop-blur-xl sm:py-18"
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
          <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 sm:text-4xl">{copy.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{copy.description}</p>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl px-5" dir="ltr" style={{ direction: "ltr", unicodeBidi: "isolate" }}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.websiteUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={partner.description ? `${partner.name}: ${partner.description}` : partner.name}
              className="group grid min-h-24 min-w-0 place-items-center rounded-[1.35rem] border border-white/70 bg-white/78 px-4 py-5 shadow-[0_14px_38px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:scale-[1.025] hover:border-blue-200/80 hover:bg-white/92 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12),0_0_34px_rgba(79,140,255,0.10)] sm:min-h-30 sm:px-6"
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="max-h-12 w-auto max-w-[92%] object-contain opacity-95 contrast-125 saturate-125 drop-shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition duration-300 group-hover:scale-[1.06] group-hover:opacity-100 sm:max-h-16"
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
