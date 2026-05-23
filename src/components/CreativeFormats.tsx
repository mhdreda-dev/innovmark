"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FILTERS = ["Tous", "Branding", "Vidéo", "Réseaux sociaux", "Publicité", "Sites web"] as const;
type PortfolioFilter = (typeof FILTERS)[number];

/* ─── Localised copy ─────────────────────────────── */
const copy = {
  fr: {
    kicker: "Réalisations",
    title: "Des réalisations pensées pour attirer, convaincre et convertir",
    subtitle:
      "Chaque projet est conçu pour renforcer l’image de marque et générer des résultats mesurables.",
    cta: "Démarrer un projet",
    filters: {
      Tous: "Tous",
      Branding: "Branding",
      Vidéo: "Vidéo",
      "Réseaux sociaux": "Réseaux sociaux",
      Publicité: "Publicité",
      "Sites web": "Sites web",
    },
    formats: [
      { label: "Film de lancement pour marque locale", category: "Vidéo publicitaire", result: "+180% engagement", tag: "Spot · Reel · Teaser", filter: "Vidéo" },
      { label: "Territoire visuel et identité premium", category: "Branding premium", result: "+65% visibilité", tag: "Logo · Univers · Charte", filter: "Branding" },
      { label: "Série de contenus pour réseaux sociaux", category: "Réseaux sociaux", result: "+3200 interactions", tag: "Instagram · TikTok · Meta", filter: "Réseaux sociaux" },
      { label: "Campagne de génération de demandes", category: "Campagne marketing", result: "+87 leads générés", tag: "Stratégie · Publicités · Croissance", filter: "Publicité" },
      { label: "Site vitrine orienté conversion", category: "Site web", result: "+38% conversion", tag: "Landing · Vitrine · UX", filter: "Sites web" },
      { label: "Direction créative pour contenus produit", category: "Contenu créatif", result: "+210% portée", tag: "Photo · Studio · Commerce en ligne", filter: "Tous" },
    ],
  },
  en: {
    kicker: "Creative formats",
    title: "What we can create",
    subtitle:
      "Formats designed to capture attention, build trust and convert — tailored to every channel and every brand ambition.",
    cta: "Start a project",
    filters: {
      Tous: "All",
      Branding: "Branding",
      Vidéo: "Video",
      "Réseaux sociaux": "Social media",
      Publicité: "Advertising",
      "Sites web": "Websites",
    },
    formats: [
      { label: "Launch film for a local brand", category: "Advertising video", result: "+180% engagement", tag: "Spot · Reel · Teaser", filter: "Vidéo" },
      { label: "Premium visual territory and identity", category: "Premium branding", result: "+65% visibility", tag: "Logo · Identity · Guidelines", filter: "Branding" },
      { label: "Social content series", category: "Social media", result: "+3200 interactions", tag: "Instagram · TikTok · Meta", filter: "Réseaux sociaux" },
      { label: "Demand generation campaign", category: "Marketing campaign", result: "+87 leads generated", tag: "Strategy · Ads · Growth", filter: "Publicité" },
      { label: "Conversion-focused website", category: "Website", result: "+38% conversion", tag: "Landing · Showcase · UX", filter: "Sites web" },
      { label: "Creative direction for product content", category: "Creative content", result: "+210% reach", tag: "Photo · Studio · E-commerce", filter: "Tous" },
    ],
  },
  ar: {
    kicker: "فورمات إبداعية",
    title: "شنو نقدروا نصاوبو للمشروع ديالك",
    subtitle:
      "تصاميم وفيديوهات ومنشورات مصممة باش تشد الانتباه، تبني الثقة، وتجيب نتائج فالإنترنت.",
    cta: "بدا المشروع ديالك",
    filters: {
      Tous: "الكل",
      Branding: "براندينغ",
      Vidéo: "فيديو",
      "Réseaux sociaux": "الشبكات",
      Publicité: "إعلانات",
      "Sites web": "مواقع",
    },
    formats: [
      { label: "فيلم إطلاق لماركة محلية", category: "فيديو إعلاني", result: "+180% تفاعل", tag: "سبوت · ريل · تيزر", filter: "Vidéo" },
      { label: "هوية بصرية بريميوم", category: "براندينغ بريميوم", result: "+65% وضوح", tag: "لوغو · ألوان · دليل بسيط", filter: "Branding" },
      { label: "سلسلة محتوى للشبكات", category: "صفحات التواصل", result: "+3200 تفاعل", tag: "إنستغرام · تيك توك · ميتا", filter: "Réseaux sociaux" },
      { label: "حملة باش تجيب الطلبات", category: "حملة تسويقية", result: "+87 عميل مهتم", tag: "خطة واضحة · إعلانات · نمو", filter: "Publicité" },
      { label: "موقع مركز على التحويل", category: "موقع إلكتروني", result: "+38% تحويل", tag: "صفحة بيع · موقع تعريفي · سهل الاستعمال", filter: "Sites web" },
      { label: "اتجاه إبداعي لمحتوى المنتجات", category: "محتوى إبداعي", result: "+210% وصول", tag: "صور · ستوديو · بيع فالإنترنت", filter: "Tous" },
    ],
  },
} as const;

/* ─── Card visual configurations ──────────────────── */
interface CardVisualConfig {
  image: string;
  glowColor: string;
}

const cardConfigs: CardVisualConfig[] = [
  {
    image: "/images/hero-showcase/vid.webp",
    glowColor: "rgba(60,120,255,0.55)",
  },
  {
    image: "/images/hero-showcase/branding-showcase.jpg",
    glowColor: "rgba(139,92,246,0.55)",
  },
  {
    image: "/images/hero-showcase/social-media-showcase.png",
    glowColor: "rgba(216,80,255,0.50)",
  },
  {
    image: "/images/hero-showcase/website-showcase.jpg",
    glowColor: "rgba(34,211,238,0.45)",
  },
  {
    image: "/images/hero-showcase/product-shoot.png",
    glowColor: "rgba(16,185,129,0.45)",
  },
  {
    image: "/images/hero-showcase/ads.png",
    glowColor: "rgba(91,140,255,0.50)",
  },
];

/* ─── Card component ────────────────────────────────── */
interface CardProps {
  label: string;
  category: string;
  result: string;
  tag: string;
  config: CardVisualConfig;
  index: number;
}

function FormatCard({ label, category, result, tag, config, index }: CardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: EASE }}
      className="creative-formats-card light-on-media group relative min-h-[250px] min-w-0 overflow-hidden rounded-[1.35rem] border border-white/[0.13] bg-slate-950 shadow-[0_20px_54px_-34px_rgba(15,23,42,0.70),0_0_42px_-34px_rgba(79,140,255,0.60)] transition duration-500 hover:-translate-y-1 hover:border-cyan-200/28 hover:shadow-[0_28px_70px_-34px_rgba(15,23,42,0.88),0_0_56px_-30px_rgba(79,140,255,0.68)] sm:min-h-[270px]"
    >
      <div
        aria-hidden
        className="absolute -inset-8 opacity-35 blur-3xl transition-opacity duration-500 group-hover:opacity-55"
        style={{ background: `radial-gradient(ellipse 64% 48% at 50% 12%,${config.glowColor},transparent 68%)` }}
      />

      <img
        src={config.image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        draggable={false}
        loading={index < 3 ? "eager" : "lazy"}
        decoding="async"
      />

      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-slate-950/8 via-slate-950/18 to-slate-950/82 transition duration-500 group-hover:from-slate-950/18 group-hover:to-slate-950/90" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-blue-300/12 via-transparent to-cyan-300/10" />
      <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_42px_rgba(15,23,42,0.24),inset_0_0_34px_rgba(79,140,255,0.06)]" />
      <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />

      <div className="relative flex h-full min-w-0 flex-col justify-between p-5">
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-2 sm:gap-3">
          <p className="max-w-full rounded-full border border-white/[0.16] bg-slate-950/46 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-50/82 shadow-[0_10px_26px_rgba(15,23,42,0.28)] backdrop-blur-md sm:max-w-[70%] md:tracking-[0.18em]">
            {category}
          </p>
          <p className="max-w-full rounded-full border border-cyan-100/26 bg-cyan-200/14 px-3 py-1.5 text-[10px] font-semibold tracking-[0.02em] text-cyan-50 opacity-100 shadow-[0_12px_30px_rgba(34,211,238,0.18)] backdrop-blur-md transition duration-500 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 sm:max-w-[68%] sm:text-right">
            {result}
          </p>
        </div>

        <div className="border-t border-white/[0.10] pt-4">
          <p className="text-lg font-light leading-tight tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.54)] md:text-xl">
            {label}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/62 md:tracking-[0.22em]">{tag}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ──────────────────────────────────── */
export default function CreativeFormats({ locale }: { locale?: Locale }) {
  const isArabic  = locale === "ar";
  const lang      = (locale ?? "fr") as keyof typeof copy;
  const t         = copy[lang] ?? copy.fr;
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("Tous");
  const visibleFormats = t.formats
    .map((fmt, originalIndex) => ({ fmt, originalIndex }))
    .filter(({ fmt }) => activeFilter === "Tous" || fmt.filter === activeFilter);

  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-8 sm:px-6 md:pb-16 md:pt-10 lg:px-10">
      {/* Section ambient accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[180px] max-w-3xl opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 48% 42% at 28% 0%,rgba(79,140,255,0.08),transparent 64%), radial-gradient(ellipse 34% 32% at 78% 10%,rgba(125,211,252,0.05),transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex min-w-0 flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between rtl-md-row">
          <SectionLabel
            kicker={t.kicker}
            title={t.title}
            subtitle={t.subtitle}
          />
          <Link
            href={localizedHref("/contact", locale)}
            className="reveal-on-scroll inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-blue-200/70 bg-white/78 px-5 py-2.5 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-700 shadow-[0_10px_26px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/60 hover:bg-white hover:text-blue-700 sm:w-auto md:self-auto md:tracking-[0.22em]"
          >
            {t.cta}
            {/* Arrow flips via CSS RTL */}
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 rtl-arrow"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="-mx-4 mb-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:mb-8 md:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full items-center gap-2 md:w-auto md:flex-wrap">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-medium tracking-[0.12em] transition duration-300 md:tracking-[0.16em] ${
                    isActive
                      ? "border-blue-300/60 bg-[#4F8CFF]/18 text-blue-50 shadow-[0_12px_34px_rgba(79,140,255,0.18)]"
                      : "border-white/12 bg-white/[0.055] text-slate-300/82 backdrop-blur-md hover:-translate-y-0.5 hover:border-blue-200/35 hover:bg-white/[0.085] hover:text-white"
                  }`}
                  aria-pressed={isActive}
                >
                  {t.filters[filter]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleFormats.map(({ fmt, originalIndex }, i) => (
            <FormatCard
              key={fmt.label}
              label={fmt.label}
              category={fmt.category}
              result={fmt.result}
              tag={fmt.tag}
              config={cardConfigs[originalIndex]!}
              index={i}
            />
          ))}
        </motion.div>

        {/* Bottom note */}
        <p className="reveal-on-scroll mt-7 text-center text-xs text-slate-500 md:mt-8">
          {isArabic
            ? "كل حاجة كنصمموها على حساب المشروع ديالك — ماشي قوالب واجدة."
            : lang === "en"
              ? "Every format crafted specifically for your brand — not off-the-shelf templates."
              : "Chaque format est conçu spécifiquement pour votre marque — pas de modèles génériques."}
        </p>
      </div>

      <style>{`
        .creative-formats-card {}
        @media (prefers-reduced-motion: reduce) {
          .creative-formats-card { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
