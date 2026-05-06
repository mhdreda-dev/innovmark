import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Layers3,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";

type ProcessHero = {
  kicker: string;
  title: string;
  subtitle: string;
};

const defaultHero: ProcessHero = {
  kicker: "Clean Step System",
  title: "Notre Processus",
  subtitle:
    "Une methode lisible en quatre etapes pour passer d'une intention ambitieuse a une livraison precise, sans confusion.",
};

const steps = [
  {
    n: "01",
    title: "Analyse",
    body: "Nous comprenons votre marque, votre marche, vos contraintes et ce que le projet doit vraiment accomplir.",
    points: ["Audit rapide", "Objectifs business", "Priorites claires"],
    icon: ClipboardCheck,
  },
  {
    n: "02",
    title: "Strategie",
    body: "Nous construisons l'angle, la promesse, la structure et la direction creative avant de produire.",
    points: ["Positionnement", "Plan d'action", "Direction artistique"],
    icon: Target,
  },
  {
    n: "03",
    title: "Production",
    body: "Design, video, web ou campagnes: l'execution avance avec des points de validation nets.",
    points: ["Creation premium", "Iterations controlees", "Suivi transparent"],
    icon: Layers3,
  },
  {
    n: "04",
    title: "Livraison",
    body: "Nous livrons, mettons en ligne et vous donnons les assets ou systemes necessaires pour continuer.",
    points: ["Lancement", "Handoff propre", "Optimisation"],
    icon: Rocket,
  },
];

const arSteps = [
  {
    n: "01",
    title: "التحليل",
    body: "نفهم علامتك وسوقك وقيودك وما يجب أن يحققه المشروع فعلياً.",
    points: ["تدقيق سريع", "أهداف تجارية", "أولويات واضحة"],
    icon: ClipboardCheck,
  },
  {
    n: "02",
    title: "الاستراتيجية",
    body: "نحدد الزاوية والوعد والبنية والاتجاه الإبداعي قبل الإنتاج.",
    points: ["تموضع العلامة", "خطة عمل", "اتجاه فني"],
    icon: Target,
  },
  {
    n: "03",
    title: "الإنتاج",
    body: "تصميم، فيديو، موقع أو حملات: يتقدم التنفيذ بنقاط اعتماد واضحة.",
    points: ["إبداع راق", "مراجعات مضبوطة", "متابعة شفافة"],
    icon: Layers3,
  },
  {
    n: "04",
    title: "التسليم",
    body: "نسلم، نطلق، ونمنحك الأصول أو الأنظمة اللازمة للاستمرار بثقة.",
    points: ["إطلاق", "تسليم منظم", "تحسين"],
    icon: Rocket,
  },
];

export default function Process({
  hero = defaultHero,
  locale,
}: {
  hero?: ProcessHero;
  locale?: Locale;
}) {
  const isArabic = locale === "ar";
  const displayedSteps = isArabic ? arSteps : steps;

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-14 pt-12 md:pb-20 md:pt-20 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[820px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 42%, rgba(56,189,248,0.17), transparent 36%), radial-gradient(circle at 66% 36%, rgba(139,92,246,0.18), transparent 38%), radial-gradient(circle at 52% 78%, rgba(16,185,129,0.11), transparent 36%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="reveal-on-scroll max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-cyan-200 via-violet-300 to-emerald-300" />
              <span className="cinematic-text text-[10px] uppercase tracking-[0.46em] text-white/68">
                {hero.kicker}
              </span>
            </div>
            <h1 className="cinematic-text text-5xl font-light leading-[0.98] tracking-tight text-white md:text-7xl lg:text-8xl">
              {hero.title}
            </h1>
            <p className="cinematic-text mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-xl md:leading-8">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-10 md:py-[4.5rem] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            kicker="Workflow"
              title={isArabic ? "أربع مراحل. مستوى دقة ثابت." : "Quatre etapes. Un niveau d'exigence constant."}
              subtitle={isArabic ? "لكل مرحلة هدف واضح، مخرجات محددة ونقطة اعتماد حتى يبقى المشروع سلساً." : "Chaque phase a un objectif clair, des livrables attendus et un point de validation pour garder le projet fluide."}
            />

          <div className="relative mt-10 md:mt-14">
            <div
              aria-hidden
              className="absolute bottom-10 left-6 top-10 w-px bg-gradient-to-b from-cyan-200/30 via-violet-200/25 to-emerald-200/30 md:left-1/2 md:-translate-x-1/2"
            />

            <ol className="grid gap-5">
              {displayedSteps.map((step, index) => {
                const Icon = step.icon;
                const alignRight = index % 2 === 1;

                return (
                  <li
                    key={step.n}
                    className={`reveal-on-scroll relative grid gap-5 md:grid-cols-[1fr_72px_1fr] md:items-center`}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <div className="hidden md:block" />
                    <div className="relative z-10 ml-0 flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-black shadow-[0_0_40px_rgba(34,211,238,0.14)] md:mx-auto">
                      <span className="font-mono text-sm text-white">{step.n}</span>
                    </div>
                    <article
                      className={`premium-glass group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.08] md:p-8 ${
                        alignRight ? "md:col-start-3" : "md:col-start-1 md:row-start-1"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.055] text-cyan-200 transition group-hover:text-emerald-200">
                          <Icon className="h-5 w-5" strokeWidth={1.6} />
                        </div>
                        <h3 className="text-2xl font-light tracking-tight text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-5 text-sm leading-6 text-white/68 md:text-base md:leading-7">
                        {step.body}
                      </p>
                      <ul className="mt-6 grid gap-3">
                        {step.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-3 text-sm text-white/70"
                          >
                            <CheckCircle2
                            className="h-4 w-4 shrink-0 text-emerald-200"
                              strokeWidth={1.8}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </article>
                    {!alignRight && <div className="hidden md:block" />}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 pt-10 md:pb-24 lg:px-10">
        <div className="premium-glass reveal-on-scroll relative mx-auto flex max-w-7xl flex-col gap-7 overflow-hidden rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div
            aria-hidden
            className="absolute right-0 top-0 h-44 w-44 rounded-full bg-violet-300/10 blur-3xl"
          />
          <div className="relative">
            <Sparkles className="mb-5 h-6 w-6 text-violet-200" strokeWidth={1.6} />
            <h2 className="cinematic-text text-3xl font-light tracking-tight text-white md:text-5xl">
              {isArabic ? "ابدأ مشروعك" : "Demarrer votre projet"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68 md:text-base md:leading-7">
              {isArabic ? "يكفي موجز قصير لتحديد أفضل خطوة تالية وشكل التعاون الأنسب." : "Un brief suffit pour identifier la meilleure prochaine etape et le format de collaboration le plus efficace."}
            </p>
          </div>
          <Link
            href={localizedHref("/contact", locale)}
            className="relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-violet-100 md:min-w-72"
          >
            {isArabic ? "ابدأ الآن" : "Demarrer"} <ArrowRight className="h-4 w-4 rtl-arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
