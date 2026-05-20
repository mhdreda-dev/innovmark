import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Clapperboard,
  Gem,
  Globe2,
  Megaphone,
  Palette,
  Share2,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";
import type { CmsService } from "@/lib/cms/types";

type ServicesHero = {
  kicker: string;
  title: string;
  subtitle: string;
};

const defaultHero: ServicesHero = {
  kicker: "Premium Services",
  title: "Nos Services",
  subtitle:
    "Une offre integree pour transformer votre marque en experience premium: claire, memorable et orientee conversion.",
};

const services = [
  {
    slug: "promotional-videos",
    title: "Videos Promotionnelles",
    desc: "Films, reels et publicites premium concus pour arreter le scroll et elever la perception.",
    icon: Clapperboard,
    tone: "cyan",
  },
  {
    slug: "website-creation",
    title: "Creation de Sites Web",
    desc: "Sites vitrines, landing pages et experiences rapides qui inspirent confiance sur chaque ecran.",
    icon: Globe2,
    tone: "violet",
  },
  {
    slug: "branding",
    title: "Branding & Identite",
    desc: "Logo, direction artistique et systeme visuel pour installer une marque plus desirable.",
    icon: Palette,
    tone: "emerald",
  },
  {
    slug: "social-media",
    title: "Gestion Reseaux Sociaux",
    desc: "Calendriers, contenus et presence editoriale coherente pour devenir memorable dans le feed.",
    icon: Share2,
    tone: "cyan",
  },
  {
    slug: "paid-ads",
    title: "Publicites Payantes",
    desc: "Meta, Google et TikTok Ads avec creation, tracking et optimisation orientes ROI.",
    icon: Megaphone,
    tone: "violet",
  },
  {
    slug: "stock-management",
    title: "Gestion de Stock",
    desc: "Dashboards et workflows sur mesure pour piloter inventaire, ventes et operations.",
    icon: Boxes,
    tone: "emerald",
  },
];

const reasons = [
  {
    title: "Une vision complete",
    body: "Strategie, design, contenu et performance avances ensemble, sans ruptures entre les livrables.",
    icon: Sparkles,
  },
  {
    title: "Execution haut de gamme",
    body: "Chaque detail visuel, typographique et interactif est traite comme un signal de confiance.",
    icon: Gem,
  },
  {
    title: "Livraison rapide",
    body: "Des cycles courts, des validations claires et une cadence adaptee aux marques qui avancent.",
    icon: Zap,
  },
  {
    title: "Resultats mesurables",
    body: "Les assets sont penses pour convertir, apprendre et soutenir la croissance apres lancement.",
    icon: Target,
  },
];

const arServices = [
  { slug: "promotional-videos", title: "فيديوهات وإعلانات", desc: "فيديوهات قصيرة وإعلانات كتشد الانتباه وكتبيّن قيمة البراند ديالك عند الزبناء.", icon: Clapperboard, tone: "cyan" },
  { slug: "website-creation", title: "تصميم المواقع", desc: "مواقع وصفحات هبوط سريعة وواضحة كتخلي الزائر يثق فالبراند من أول لحظة.", icon: Globe2, tone: "violet" },
  { slug: "branding", title: "براندينغ وهوية", desc: "لوغو، ألوان وطريقة عرض كتخلي المشروع ديالك واضح ومميز.", icon: Palette, tone: "emerald" },
  { slug: "social-media", title: "صفحات التواصل", desc: "خطة منشورات وحضور منظم باش المشروع ديالك يبقى حاضر ومفهوم عند الناس.", icon: Share2, tone: "cyan" },
  { slug: "paid-ads", title: "الإعلانات المدفوعة", desc: "إعلانات فيسبوك، إنستغرام، گوگل وتيك توك مع تصميم، تتبع وتحسين مركز على النتائج.", icon: Megaphone, tone: "violet" },
  { slug: "stock-management", title: "تسيير المخزون", desc: "لوحات متابعة وطرق خدمة على القياس باش تتحكم فالمخزون، المبيعات والخدمة اليومية.", icon: Boxes, tone: "emerald" },
];

const arReasons = [
  { title: "رؤية كاملة", body: "الخطة، التصميم، المحتوى والنتائج كنربطوهم فخدمة وحدة بلا تشتت.", icon: Sparkles },
  { title: "تنفيذ احترافي", body: "كل تفصيل فالتصميم والتجربة كيبني الثقة وكيقوي صورة المشروع ديالك.", icon: Gem },
  { title: "سرعة منظمة", body: "خدمة بإيقاع واضح، قرارات سريعة، ومراحل مفهومة للمشاريع اللي باغية تتحرك.", icon: Zap },
  { title: "نتائج قابلة للقياس", body: "كنصممو التصاور والفيديوهات والمنشورات والإعلانات باش يعاونوك تجيب زبناء وتفهم شنو خدام.", icon: Target },
];

const toneClass = {
  cyan: "from-cyan-300/30 via-cyan-400/10 text-cyan-200 group-hover:border-cyan-200/40",
  violet:
    "from-violet-300/30 via-violet-400/10 text-violet-200 group-hover:border-violet-200/40",
  emerald:
    "from-emerald-300/30 via-emerald-400/10 text-emerald-200 group-hover:border-emerald-200/40",
};

export default function Services({
  hero = defaultHero,
  locale,
  items,
}: {
  hero?: ServicesHero;
  locale?: Locale;
  items?: CmsService[];
}) {
  const isArabic = locale === "ar";
  const displayedServices = items?.length ? items : isArabic ? arServices : services;
  const displayedReasons = isArabic ? arReasons : reasons;

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-20 lg:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.16), transparent 32%), radial-gradient(circle at 70% 40%, rgba(139,92,246,0.18), transparent 38%), radial-gradient(circle at 30% 70%, rgba(16,185,129,0.12), transparent 40%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="reveal-on-scroll max-w-4xl rtl-text-right">
            <div className="mb-5 flex items-center gap-3 rtl-row">
              <span className="h-px w-10 shrink-0 bg-gradient-to-r from-cyan-200 via-violet-300 to-emerald-300" />
              <span className="cinematic-text text-[10px] uppercase tracking-[0.18em] text-white/68 md:tracking-[0.46em]">
                {hero.kicker}
              </span>
            </div>
            <h1 className="cinematic-text text-4xl font-light leading-[1.04] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
              {hero.title}
            </h1>
            <p className="cinematic-text mt-6 max-w-2xl text-base leading-7 text-white/72 md:text-xl md:leading-8">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-10 sm:px-6 md:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedServices.map((service, index) => {
              const iconName = typeof service.icon === "string" ? service.icon : "Sparkles";
              const Icon = {
                Clapperboard,
                Globe2,
                Palette,
                Share2,
                Megaphone,
                Boxes,
                Sparkles,
              }[iconName] ?? Sparkles;

              return (
                <Link
                  key={service.slug}
                  href={localizedHref("href" in service && service.href ? service.href : `/services/${service.slug}`, locale)}
                  className="premium-glass group reveal-on-scroll relative flex min-h-[240px] min-w-0 flex-col overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.085] md:min-h-[250px] md:p-8"
                  style={{ transitionDelay: `${Math.min(index, 5) * 70}ms` }}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${toneClass[service.tone as keyof typeof toneClass]} to-transparent`}
                  />
                  <div
                    className={`mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-gradient-to-br ${toneClass[service.tone as keyof typeof toneClass]} to-transparent transition duration-300 group-hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-xl font-light leading-tight tracking-tight text-white md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/68">
                    {"description" in service ? service.description : service.desc}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[10px] font-medium uppercase tracking-[0.12em] text-white/58 transition group-hover:text-cyan-100 md:tracking-[0.24em]">
                    {isArabic ? "شوف الخدمة" : "Explorer"} <ArrowRight className="h-3.5 w-3.5 rtl-arrow" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 md:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionLabel
            kicker={isArabic ? "اختيار احترافي" : "Choix premium"}
            title={isArabic ? "علاش تختار الخدمات ديالنا" : "Pourquoi choisir nos services"}
            subtitle={isArabic ? "كنربطو الجودة فالخدمة بهدف تجاري واضح: نجيبو الانتباه، نبنيو الثقة، ونحولو الاهتمام لطلبات." : "INNOVMARK relie la qualite creative a une logique business nette: seduire, rassurer, convertir."}
          />

          <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {displayedReasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <article
                  key={reason.title}
                  className="reveal-on-scroll rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200/25 hover:bg-white/[0.07] md:p-6"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <Icon className="h-5 w-5 text-emerald-200" strokeWidth={1.7} />
                  <h3 className="mt-5 text-lg font-light tracking-tight text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/66">{reason.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-4 sm:px-6 md:pb-24 lg:px-10">
        <div className="premium-glass reveal-on-scroll relative mx-auto flex max-w-7xl flex-col gap-7 overflow-hidden rounded-2xl p-5 md:flex-row md:items-center md:justify-between md:p-10 rtl-md-row">
          <div
            aria-hidden
            className="absolute right-0 top-0 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl"
          />
          <div className="relative">
            <BadgeCheck className="mb-5 h-6 w-6 text-cyan-200" strokeWidth={1.6} />
            <h2 className="cinematic-text text-3xl font-light tracking-tight text-white md:text-5xl">
              {isArabic ? "نهضرو على المشروع ديالك" : "Parlons de votre projet"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68 md:text-base md:leading-7">
              {isArabic ? "قول لينا شنو باغي تطلق أو تحسن، ونقترحو عليك الخطوة الجاية بوضوح." : "Dites-nous ce que vous voulez lancer, ameliorer ou rendre irresistible. Nous vous repondons avec une prochaine etape claire."}
            </p>
          </div>
          <Link
            href={localizedHref("/contact", locale)}
            className="relative inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-cyan-100 md:w-auto md:min-w-64 md:tracking-[0.18em]"
          >
            {isArabic ? "بدا دابا" : "Demarrer"} <ArrowRight className="h-4 w-4 rtl-arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
