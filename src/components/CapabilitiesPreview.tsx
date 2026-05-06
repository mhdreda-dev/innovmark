import SectionLabel from "./SectionLabel";

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
    title: "خبرات مترابطة لبناء حضور أقوى",
    body: "فيديو، مواقع، هوية، شبكات اجتماعية، إعلانات وأنظمة تشغيل في تجربة واحدة متماسكة.",
    cta: "استكشف الخدمات",
    accent: "from-cyan-400/20 via-blue-500/10 to-transparent",
    dot: "bg-cyan-300",
  },
  {
    href: "/pourquoi-nous",
    eyebrow: "02 / الرؤية",
    title: "لماذا تختار العلامات الطموحة INNOVMARK",
    body: "استراتيجية أولاً، تنفيذ راق، تواصل واضح، وتركيز دائم على النتائج.",
    cta: "تعرّف على طريقتنا",
    accent: "from-violet-400/22 via-fuchsia-500/10 to-transparent",
    dot: "bg-violet-300",
  },
  {
    href: "/processus",
    eyebrow: "03 / المنهجية",
    title: "أربع مراحل واضحة. بدون مفاجآت.",
    body: "من الاستماع إلى الإطلاق، نعمل بإيقاع واضح يحول الفكرة إلى تجربة جاهزة للنمو.",
    cta: "اكتشف المنهجية",
    accent: "from-amber-300/20 via-orange-400/10 to-transparent",
    dot: "bg-amber-200",
  },
];

export default function CapabilitiesPreview({ locale }: { locale?: string }) {
  const isArabic = locale === "ar";
  const displayedCards = isArabic ? arCards : cards;

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel
          kicker={isArabic ? "منظومة INNOVMARK" : "L'écosystème INNOVMARK"}
          title={isArabic ? "ثلاثة مداخل لنفس مستوى الجودة." : "Trois portes d'entrée vers la même qualité."}
          subtitle={isArabic ? "كل صفحة تشرح محوراً مختلفاً، لكن المعيار واحد: رؤية إبداعية راقية وتنفيذ دقيق." : "Chaque page approfondit un pilier. Mais le standard reste identique : direction artistique premium et exécution rigoureuse."}
        />

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {displayedCards.map((c, i) => (
            <a
              key={c.href}
              href={c.href}
              className="premium-glass group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-200/30 md:min-h-[360px] md:p-8"
            >
              <div
                aria-hidden
                className={`absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${c.accent} blur-2xl transition-opacity duration-500 group-hover:opacity-150`}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent"
              />

              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-white/52 rtl-row">
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

              <div className="relative mt-7 flex items-center justify-between border-t border-white/[0.08] pt-5 md:mt-9 md:pt-6 rtl-row">
                <span className="text-[10px] uppercase tracking-[0.26em] text-white/64 transition-colors group-hover:text-white">
                  {c.cta}
                </span>
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/16 bg-white/[0.04] text-white/72 transition-all duration-300 group-hover:translate-x-1 group-hover:border-cyan-200/40 group-hover:bg-cyan-200/10 group-hover:text-white rtl-arrow"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] tracking-widest text-white/22"
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
