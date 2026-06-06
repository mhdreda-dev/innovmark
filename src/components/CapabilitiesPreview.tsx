import SectionLabel from "./SectionLabel";
import { type Locale } from "@/lib/i18n";

const steps = [
  {
    number: "01",
    title: "Audit & stratégie",
    body: "Nous analysons votre image actuelle, vos objectifs et votre positionnement pour définir une direction claire.",
    points: ["Analyse des besoins", "Objectifs business", "Positionnement de marque"],
    accent: "from-cyan-400/20 via-blue-500/10 to-transparent",
    dot: "bg-cyan-300",
  },
  {
    number: "02",
    title: "Création & production",
    body: "Nous produisons des contenus, visuels et supports digitaux alignés avec votre identité et votre audience.",
    points: ["Branding", "Vidéo", "Contenu social media"],
    accent: "from-violet-400/22 via-fuchsia-500/10 to-transparent",
    dot: "bg-violet-300",
  },
  {
    number: "03",
    title: "Lancement & croissance",
    body: "Nous lançons, optimisons et suivons les performances pour améliorer vos résultats dans le temps.",
    points: ["Publicité digitale", "Optimisation", "Suivi des performances"],
    accent: "from-amber-300/20 via-orange-400/10 to-transparent",
    dot: "bg-amber-200",
  },
];

const arSteps = [
  {
    number: "01",
    title: "تدقيق وخطة واضحة",
    body: "كنحللو الصورة الحالية، الأهداف والموقع ديال المشروع باش نحددو اتجاه واضح.",
    points: ["تحليل الاحتياج", "أهداف تجارية", "تموقع المشروع"],
    accent: "from-cyan-400/20 via-blue-500/10 to-transparent",
    dot: "bg-cyan-300",
  },
  {
    number: "02",
    title: "إبداع وإنتاج",
    body: "كنصايبو محتوى، تصاميم ومواد فالإنترنت منسجمة مع الهوية والجمهور ديالك.",
    points: ["هوية بصرية", "فيديو", "محتوى السوشيال ميديا"],
    accent: "from-violet-400/22 via-fuchsia-500/10 to-transparent",
    dot: "bg-violet-300",
  },
  {
    number: "03",
    title: "إطلاق ونمو",
    body: "كنطلقو الخدمة، كنحسنوها وكنتابعو الأداء باش النتائج تتحسن مع الوقت.",
    points: ["إعلانات فالإنترنت", "تحسين مستمر", "تتبع الأداء"],
    accent: "from-amber-300/20 via-orange-400/10 to-transparent",
    dot: "bg-amber-200",
  },
];

export default function CapabilitiesPreview({ locale }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const displayedSteps = isArabic ? arSteps : steps;

  return (
    <section className="relative overflow-hidden py-16 md:py-24" dir={isArabic ? "rtl" : undefined}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-48 max-w-4xl opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 44% 38% at 28% 0%,rgba(79,140,255,0.14),transparent 68%), radial-gradient(ellipse 36% 34% at 78% 14%,rgba(16,185,129,0.10),transparent 66%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionLabel
          kicker={isArabic ? "طريقة الخدمة" : "Méthode Innovmark"}
          title={isArabic ? "كيفاش كنخدمو" : "Comment nous travaillons"}
          subtitle={isArabic ? "طريقة بسيطة، استراتيجية ومركزة على النتائج باش نحولو الحضور ديالك فالإنترنت." : "Une méthode simple, stratégique et orientée résultats pour transformer votre présence digitale."}
        />

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {displayedSteps.map((step, i) => (
            <article
              key={step.number}
              className="premium-glass group relative flex min-h-[300px] min-w-0 flex-col overflow-hidden rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.065] md:min-h-[380px] md:p-8"
            >
              <div
                aria-hidden
                className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${step.accent} opacity-55 blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-200/45 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-white/[0.035] via-transparent to-black/20 opacity-80"
              />

              <div className="relative flex h-full flex-1 flex-col">
                <div className="flex items-start justify-between gap-4 rtl-row">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/64 md:tracking-[0.28em]">
                    <span className={`h-2.5 w-2.5 rounded-full ${step.dot} shadow-[0_0_18px_rgba(125,211,252,0.45)]`} />
                    {isArabic ? "مرحلة" : "Étape"}
                  </div>
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-blue-200/25 bg-blue-500/15 font-mono text-base font-semibold tracking-[0.08em] text-white shadow-[0_16px_38px_rgba(79,140,255,0.18)] backdrop-blur-xl transition duration-300 group-hover:scale-105 group-hover:border-cyan-100/35 md:h-16 md:w-16 md:text-lg">
                    {step.number}
                  </div>
                </div>

                <h3 className="mt-7 text-xl font-light leading-tight tracking-tight text-white md:mt-10 md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/68 md:mt-5 md:text-[15px] md:leading-7">
                  {step.body}
                </p>

                <ul className="mt-auto space-y-3 border-t border-blue-100/70 pt-6 md:pt-7">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm leading-6 text-white/76 rtl-row">
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[11px] text-white ring-1 ring-white/12 shadow-[0_8px_20px_rgba(15,23,42,0.14)]`}>
                        ✓
                      </span>
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute end-6 top-[5.25rem] font-mono text-[2.85rem] font-semibold leading-none tracking-tight text-white/[0.055]"
              >
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
