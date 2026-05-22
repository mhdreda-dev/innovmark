"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Localised copy ─────────────────────────────── */
const copy = {
  fr: {
    kicker: "Formats créatifs",
    title: "Ce que nous pouvons créer",
    subtitle:
      "Des formats conçus pour capter l'attention, construire la confiance et convertir — adaptés à chaque canal et chaque ambition de marque.",
    cta: "Démarrer un projet",
    formats: [
      { label: "Vidéo Publicitaire",      tag: "Spot · Reel · Teaser" },
      { label: "Branding Premium",        tag: "Logo · Identité · Charte" },
      { label: "Reels Réseaux Sociaux",   tag: "Instagram · TikTok · Meta" },
      { label: "Site Web Moderne",        tag: "Landing · Vitrine · UX" },
      { label: "Shooting Produit",        tag: "Photo · Studio · E-commerce" },
      { label: "Campagne Marketing",      tag: "Stratégie · Ads · Croissance" },
    ],
  },
  en: {
    kicker: "Creative formats",
    title: "What we can create",
    subtitle:
      "Formats designed to capture attention, build trust and convert — tailored to every channel and every brand ambition.",
    cta: "Start a project",
    formats: [
      { label: "Advertising Video",       tag: "Spot · Reel · Teaser" },
      { label: "Premium Branding",        tag: "Logo · Identity · Guidelines" },
      { label: "Social Media Reels",      tag: "Instagram · TikTok · Meta" },
      { label: "Modern Website",          tag: "Landing · Showcase · UX" },
      { label: "Product Shoot",           tag: "Photo · Studio · E-commerce" },
      { label: "Marketing Campaign",      tag: "Strategy · Ads · Growth" },
    ],
  },
  ar: {
    kicker: "فورمات إبداعية",
    title: "شنو نقدروا نصاوبو للمشروع ديالك",
    subtitle:
      "تصاميم وفيديوهات ومنشورات مصممة باش تشد الانتباه، تبني الثقة، وتجيب نتائج فالإنترنت.",
    cta: "بدا المشروع ديالك",
    formats: [
      { label: "فيديو إعلاني",             tag: "سبوت · ريل · تيزر" },
      { label: "لوغو وشكل احترافي",        tag: "لوغو · ألوان · دليل بسيط" },
      { label: "ريلز لصفحات التواصل",      tag: "إنستغرام · تيك توك · ميتا" },
      { label: "موقع عصري",                tag: "صفحة بيع · موقع تعريفي · سهل الاستعمال" },
      { label: "تصوير المنتجات",           tag: "صور · ستوديو · بيع فالإنترنت" },
      { label: "حملة إعلانية",             tag: "خطة واضحة · إعلانات · نمو" },
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
  tag: string;
  config: CardVisualConfig;
  spanClass: string;
  index: number;
}

function FormatCard({ label, tag, config, spanClass, index }: CardProps) {
  const isCampaign = index === 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: EASE }}
      className={`creative-formats-card light-on-media group relative min-w-0 overflow-hidden rounded-3xl border border-white/[0.58] bg-white shadow-[0_18px_48px_-30px_rgba(15,23,42,0.28),0_0_44px_-36px_rgba(79,140,255,0.46)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_58px_-30px_rgba(15,23,42,0.34),0_0_48px_-34px_rgba(79,140,255,0.50)] ${spanClass}`}
      style={{
        minHeight: isCampaign ? 260 : 260,
      }}
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
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
        draggable={false}
        loading={index < 3 ? "eager" : "lazy"}
        decoding="async"
      />

      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/8 via-slate-950/6 to-slate-950/48" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-blue-300/10 via-transparent to-cyan-300/10" />
      <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_42px_rgba(15,23,42,0.24),inset_0_0_34px_rgba(79,140,255,0.06)]" />
      <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />

      <div className={`relative flex h-full min-w-0 flex-col justify-end p-5 ${isCampaign ? "md:p-7" : ""}`}>
        <div className="border-t border-white/[0.10] pt-4">
          <p className={`font-light leading-tight tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.54)] ${isCampaign ? "text-xl md:text-3xl" : "text-lg md:text-xl"}`}>
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

  // Column-span classes: video featured, campaign panoramic, rest default
  const spanClasses = [
    "lg:col-span-2", // video — featured wide
    "lg:col-span-1", // branding
    "lg:col-span-1", // reels
    "lg:col-span-1", // web
    "lg:col-span-1", // photo
    "lg:col-span-3", // campaign — panoramic full-width
  ];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:px-10">
      {/* Section ambient accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-[180px] max-w-3xl opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 48% 42% at 28% 0%,rgba(79,140,255,0.08),transparent 64%), radial-gradient(ellipse 34% 32% at 78% 10%,rgba(125,211,252,0.05),transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex min-w-0 flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between rtl-md-row">
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

        {/* Grid */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.formats.map((fmt, i) => (
            <FormatCard
              key={fmt.label}
              label={fmt.label}
              tag={fmt.tag}
              config={cardConfigs[i]!}
              spanClass={spanClasses[i] ?? "lg:col-span-1"}
              index={i}
            />
          ))}
        </div>

        {/* Bottom note */}
        <p className="reveal-on-scroll mt-8 text-center text-xs text-slate-500 md:mt-10">
          {isArabic
            ? "كل حاجة كنصمموها على حساب المشروع ديالك — ماشي قوالب واجدة."
            : lang === "en"
              ? "Every format crafted specifically for your brand — not off-the-shelf templates."
              : "Chaque format est conçu spécifiquement pour votre marque — pas des templates génériques."}
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
