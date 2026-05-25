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
    title: "الفهم",
    body: "كنفهمو المشروع ديالك، السوق، القيود، والنتائج اللي خاص الخدمة تجيبها.",
    points: ["تدقيق سريع", "أهداف واضحة", "أولويات مفهومة"],
    icon: ClipboardCheck,
  },
  {
    n: "02",
    title: "الخطة",
    body: "كنحددو الرسالة، العرض، الترتيب وطريقة التصميم قبل ما نبداو الإنتاج.",
    points: ["قيمة البراند", "خطة خدمة", "شكل بصري"],
    icon: Target,
  },
  {
    n: "03",
    title: "التنفيذ",
    body: "تصميم، فيديو، موقع أو حملات: الخدمة كتقدم بنقاط اعتماد واضحة.",
    points: ["تنفيذ بريميوم", "مراجعات مضبوطة", "متابعة واضحة"],
    icon: Layers3,
  },
  {
    n: "04",
    title: "التسليم",
    body: "كنسلمو، نطلقو، ونعطيوك الملفات أو النظام اللي تحتاجو تكمل بثقة.",
    points: ["انطلاق", "تسليم منظم", "تحسين"],
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
      <section className="relative overflow-hidden px-4 pb-12 pt-8 sm:px-6 md:pb-20 md:pt-20 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-4 h-[180px] w-[340px] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 40% 36%, rgba(79,140,255,0.07), transparent 58%), radial-gradient(circle at 66% 48%, rgba(125,211,252,0.045), transparent 64%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="reveal-on-scroll max-w-4xl rtl-text-right">
            <div className="mb-5 flex items-center gap-3 rtl-row">
              <span className="h-px w-10 shrink-0 bg-gradient-to-r from-cyan-200 via-violet-300 to-emerald-300" />
              <span className="cinematic-text text-[10px] uppercase tracking-[0.12em] text-white/68 md:tracking-[0.46em]">
                {hero.kicker}
              </span>
            </div>
            <h1 className="cinematic-text text-[2.25rem] font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-7xl md:leading-[1.04] lg:text-8xl">
              {hero.title}
            </h1>
            <p className="cinematic-text mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-base md:mt-6 md:text-xl md:leading-8">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-10 sm:px-6 md:py-[4.5rem] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            kicker={isArabic ? "طريقة الخدمة" : "Workflow"}
              title={isArabic ? "أربع مراحل. نفس المستوى ديال الدقة." : "Quatre etapes. Un niveau d'exigence constant."}
              subtitle={isArabic ? "كل مرحلة عندها هدف واضح، مخرجات محددة، ونقطة اعتماد باش المشروع يبقى سلس." : "Chaque phase a un objectif clair, des livrables attendus et un point de validation pour garder le projet fluide."}
            />

          <div className="relative mt-10 md:mt-14">
            <div
              aria-hidden
              className="absolute bottom-10 start-6 top-10 w-px bg-gradient-to-b from-blue-300/35 via-blue-200/22 to-cyan-200/28 md:start-1/2 md:-translate-x-1/2"
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
                    <div className="relative z-10 ml-0 flex h-14 w-14 items-center justify-center rounded-full border border-blue-100/80 bg-white shadow-[0_12px_28px_rgba(79,140,255,0.12)] md:mx-auto">
                      <span className="font-mono text-sm text-blue-700">{step.n}</span>
                    </div>
                    <article
                      className={`premium-glass group min-w-0 rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300/35 hover:bg-white/95 md:p-8 ${
                        alignRight ? "md:col-start-3" : "md:col-start-1 md:row-start-1"
                      }`}
                    >
                      <div className="flex items-center gap-4 rtl-row">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2.5 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 group-hover:scale-105">
                          <Icon className="h-5 w-5 opacity-100" strokeWidth={1.8} />
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
                            className="flex items-center gap-3 text-sm text-white/70 rtl-row"
                          >
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 group-hover:scale-105">
                              <CheckCircle2
                                className="h-4 w-4 opacity-100"
                                strokeWidth={1.9}
                              />
                            </span>
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

      <section className="px-4 pb-16 pt-10 sm:px-6 md:pb-24 lg:px-10">
        <div className="premium-glass reveal-on-scroll relative mx-auto flex max-w-7xl flex-col gap-7 overflow-hidden rounded-2xl p-5 md:flex-row md:items-center md:justify-between md:p-10 rtl-md-row">
          <div
            aria-hidden
            className="absolute right-6 top-0 h-24 w-24 rounded-full bg-blue-300/[0.055] blur-3xl"
          />
          <div className="relative">
            <Sparkles className="mb-5 h-[42px] w-[42px] rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2.5 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105" strokeWidth={1.8} />
            <h2 className="cinematic-text text-3xl font-light tracking-tight text-white md:text-5xl">
              {isArabic ? "بدا المشروع ديالك" : "Demarrer votre projet"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68 md:text-base md:leading-7">
              {isArabic ? "بريف قصير كافي باش نحددو أحسن خطوة جاية وشكل التعاون المناسب." : "Un brief suffit pour identifier la meilleure prochaine etape et le format de collaboration le plus efficace."}
            </p>
          </div>
          <Link
            href={localizedHref("/contact", locale)}
            className="relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-[#fff] shadow-[0_12px_28px_rgba(79,140,255,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-500 md:w-auto md:min-w-72 md:tracking-[0.18em]"
          >
            {isArabic ? "بدا دابا" : "Demarrer"} <ArrowRight className="h-4 w-4 rtl-arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
