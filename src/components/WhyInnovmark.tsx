import Link from "next/link";
import {
  ArrowRight,
  Gauge,
  LineChart,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { SaadBelkaadiSection } from "./SaadBelkaadi";
import StatsBand from "./StatsBand";
import Testimonials from "./Testimonials";
import { type Locale, localizedHref } from "@/lib/i18n";

type WhyHero = {
  kicker: string;
  title: string;
  subtitle: string;
};

const defaultHero: WhyHero = {
  kicker: "Trust & Authority",
  title: "Pourquoi choisir INNOVMARK",
  subtitle:
    "Une agence pour les marques qui veulent paraitre plus etablies, vendre avec plus de clarte et avancer sans friction.",
};

const advantages = [
  {
    title: "Expertise strategique",
    body: "Nous cadrons l'offre, l'audience et la promesse avant de produire. Le beau sert une intention precise.",
    icon: ShieldCheck,
  },
  {
    title: "Livraison rapide",
    body: "Une cadence claire, des validations courtes et une communication directe du brief au lancement.",
    icon: Gauge,
  },
  {
    title: "Design premium",
    body: "Typographie, motion, couleur, rythme et detail: chaque touchpoint renforce la valeur percue.",
    icon: Palette,
  },
  {
    title: "ROI visible",
    body: "Les livrables sont concus pour augmenter la confiance, qualifier les prospects et faciliter la vente.",
    icon: LineChart,
  },
];

const arAdvantages = [
  {
    title: "خبرة استراتيجية",
    body: "نحدد العرض والجمهور والوعد قبل الإنتاج، حتى يخدم الجمال هدفاً واضحاً.",
    icon: ShieldCheck,
  },
  {
    title: "تنفيذ سريع ومنظم",
    body: "إيقاع واضح، اعتماد سريع وتواصل مباشر من الموجز حتى الإطلاق.",
    icon: Gauge,
  },
  {
    title: "تصميم راق",
    body: "الخط، الحركة، اللون والإيقاع تعمل معاً لتعزيز القيمة المتصورة.",
    icon: Palette,
  },
  {
    title: "عائد واضح",
    body: "نصمم المخرجات لزيادة الثقة، تأهيل العملاء المحتملين وتسهيل البيع.",
    icon: LineChart,
  },
];

const approach = [
  "Diagnostic de marque",
  "Positionnement & offre",
  "Direction creative",
  "Lancement mesure",
];

const arApproach = [
  "تشخيص العلامة",
  "التموضع والعرض",
  "الإخراج الإبداعي",
  "إطلاق قابل للقياس",
];

export default function WhyInnovmark({
  hero = defaultHero,
  locale,
}: {
  hero?: WhyHero;
  locale?: Locale;
}) {
  const isArabic = locale === "ar";
  const displayedAdvantages = isArabic ? arAdvantages : advantages;
  const displayedApproach = isArabic ? arApproach : approach;

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-14 pt-12 md:pb-20 md:pt-20 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-[460px] w-[760px] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(139,92,246,0.20), transparent 36%), radial-gradient(circle at 64% 46%, rgba(56,189,248,0.14), transparent 38%), radial-gradient(circle at 50% 78%, rgba(16,185,129,0.12), transparent 36%)",
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

      <section className="px-6 py-10 md:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {displayedAdvantages.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="premium-glass reveal-on-scroll group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.08] md:p-7"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-cyan-200 transition group-hover:text-emerald-200">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <h2 className="mt-7 text-xl font-light tracking-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/66">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SaadBelkaadiSection locale={locale} />

      <section className="relative px-6 py-12 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            kicker={isArabic ? "المنهج" : "Approche"}
            title={isArabic ? "مسار واضح نحو علامة أقوى." : "Une trajectoire simple vers une marque plus forte."}
            subtitle={isArabic ? "نقلل الدوران غير الضروري بمنهجية مفهومة، من الاستراتيجية إلى إثبات الأداء." : "Nous evitons les allers-retours inutiles avec une methode lisible, de la strategie a la preuve de performance."}
          />

          <ol className="relative mt-10 grid gap-4 md:grid-cols-4">
            <div
              aria-hidden
              className="absolute left-8 right-8 top-6 hidden h-px bg-gradient-to-r from-cyan-200/20 via-violet-200/30 to-emerald-200/20 md:block"
            />
            {displayedApproach.map((step, index) => (
              <li key={step} className="reveal-on-scroll relative">
                <div className="premium-glass rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-200/25">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black text-sm font-light text-white">
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-light tracking-tight text-white">
                    {step}
                  </h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials locale={locale} />
      <StatsBand locale={locale} />

      <section className="px-6 pb-16 pt-2 md:pb-24 lg:px-10">
        <div className="reveal-on-scroll mx-auto flex max-w-7xl flex-col items-start gap-6 border-y border-white/10 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Sparkles className="mb-5 h-6 w-6 text-violet-200" strokeWidth={1.6} />
            <h2 className="cinematic-text text-3xl font-light tracking-tight text-white md:text-5xl">
              {isArabic ? "جاهز لبناء حضور أكثر رقياً؟" : "Pret a construire une presence plus premium?"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/66">
              {isArabic ? "لنتحدث عن هدفك وتوقيتك وأفضل زاوية تجعل علامتك أكثر وضوحاً وجاذبية." : "Parlons de votre objectif, de votre timing et du meilleur angle pour rendre votre marque impossible a ignorer."}
            </p>
          </div>
          <Link
            href={localizedHref("/contact", locale)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-emerald-100"
          >
            {isArabic ? "تواصل معنا" : "Nous contacter"} <ArrowRight className="h-4 w-4 rtl-arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
