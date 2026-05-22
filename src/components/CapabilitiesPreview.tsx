import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";

const cards = [
  {
    href: "/services",
    eyebrow: "01 / Capacités",
    title: "Six expertises connectées",
    body: "Vidéo, web, branding, social, ads et stock — un studio unique pour tous vos points de contact digitaux.",
    cta: "Voir les services",
    accent: "from-cyan-400/20 via-blue-500/10 to-transparent",
    dot: "bg-cyan-300",
  },
  {
    href: "/pourquoi-nous",
    eyebrow: "02 / Posture",
    title: "Pourquoi les marques exigeantes choisissent INNOVMARK",
    body: "Stratégie d'abord, exécution premium, communication directe, focus résultats — la méthode qui change la perception.",
    cta: "Découvrir notre posture",
    accent: "from-violet-400/22 via-fuchsia-500/10 to-transparent",
    dot: "bg-violet-300",
  },
  {
    href: "/processus",
    eyebrow: "03 / Méthode",
    title: "Quatre étapes. Zéro mauvaise surprise.",
    body: "De l'écoute au lancement, une cadence claire qui transforme l'idée en livrable de marque en 4 à 12 semaines.",
    cta: "Explorer le processus",
    accent: "from-amber-300/20 via-orange-400/10 to-transparent",
    dot: "bg-amber-200",
  },
];

const arCards = [
  {
    href: "/services",
    eyebrow: "01 / القدرات",
    title: "خبرات مترابطة باش الحضور ديالك يقوى",
    body: "فيديو، مواقع، براندينغ، صفحات التواصل، إعلانات وأنظمة تسيير فخدمة وحدة متناسقة.",
    cta: "شوف الخدمات",
    accent: "from-cyan-400/20 via-blue-500/10 to-transparent",
    dot: "bg-cyan-300",
  },
  {
    href: "/pourquoi-nous",
    eyebrow: "02 / الرؤية",
    title: "علاش المشاريع الطموحة كتختار INNOVMARK",
    body: "خطة واضحة قبل التنفيذ، خدمة احترافية، تواصل واضح، وتركيز دائم على النتائج.",
    cta: "عرف أكثر على طريقتنا",
    accent: "from-violet-400/22 via-fuchsia-500/10 to-transparent",
    dot: "bg-violet-300",
  },
  {
    href: "/processus",
    eyebrow: "03 / الطريقة",
    title: "أربع مراحل واضحة. بلا مفاجآت.",
    body: "من أول بريف حتى الانطلاق، كنخدمو بإيقاع واضح كيحول الفكرة لتجربة جاهزة للنمو.",
    cta: "شوف طريقة الخدمة",
    accent: "from-amber-300/20 via-orange-400/10 to-transparent",
    dot: "bg-amber-200",
  },
];

export default function CapabilitiesPreview({ locale }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const displayedCards = isArabic ? arCards : cards;

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionLabel
          kicker={isArabic ? "منظومة INNOVMARK" : "L'écosystème INNOVMARK"}
          title={isArabic ? "ثلاثة مداخل لنفس جودة الخدمة." : "Trois portes d'entrée vers la même qualité."}
          subtitle={isArabic ? "كل صفحة كتشرح جانب مختلف، ولكن المعيار واحد: فكرة واضحة وتنفيذ مضبوط." : "Chaque page approfondit un pilier. Mais le standard reste identique : direction artistique premium et exécution rigoureuse."}
        />

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {displayedCards.map((c, i) => (
            <a
              key={c.href}
              href={localizedHref(c.href, locale)}
              className="premium-glass group relative flex min-h-[240px] min-w-0 flex-col justify-between overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-200/30 md:min-h-[340px] md:p-8"
            >
              <div
                aria-hidden
                className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${c.accent} opacity-55 blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-200/45 to-transparent"
              />

              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/52 rtl-row md:tracking-[0.32em]">
                  <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                  {c.eyebrow}
                </div>
                <h3 className="mt-5 text-xl font-light leading-tight tracking-tight text-white md:mt-7 md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/68 md:mt-5 md:text-[15px] md:leading-7">
                  {c.body}
                </p>
              </div>

              <div className="relative mt-7 flex items-center justify-between border-t border-blue-100/70 pt-5 md:mt-9 md:pt-6 rtl-row">
                <span className="text-[10px] uppercase tracking-[0.12em] text-white/64 transition-colors group-hover:text-white md:tracking-[0.26em]">
                  {c.cta}
                </span>
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full border border-blue-100/80 bg-white/72 text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.055)] transition-all duration-300 group-hover:translate-x-1 group-hover:border-blue-300/50 group-hover:bg-white group-hover:text-blue-700 rtl-arrow"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute end-6 top-6 font-mono text-[10px] tracking-widest text-white/22"
              >
                0{i + 1}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
