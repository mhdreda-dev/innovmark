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
    image: "/images/hero-showcase/product-shoot.png",
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
    image: "/images/hero-showcase/social-media-showcase.png",
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
      className={`group relative min-w-0 overflow-hidden rounded-3xl border border-white/[0.10] bg-[#050912] shadow-[0_28px_84px_-42px_rgba(0,0,0,0.92)] ${spanClass}`}
      style={{
        minHeight: isCampaign ? 220 : 240,
      }}
    >
      <div
        aria-hidden
        className="absolute -inset-8 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
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

      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/8 via-black/20 to-black/78" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-cyan-300/14 via-transparent to-violet-500/18" />
      <div aria-hidden className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />

      <div className={`relative flex h-full min-w-0 flex-col justify-end p-5 ${isCampaign ? "md:p-7" : ""}`}>
        <div className="border-t border-white/[0.10] pt-4">
          <p className={`font-light leading-tight tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] ${isCampaign ? "text-xl md:text-3xl" : "text-lg md:text-xl"}`}>
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
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:px-10">
      {/* Section ambient accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[380px] max-w-5xl opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 56% 44% at 20% 0%,rgba(60,120,255,0.14),transparent 60%), radial-gradient(ellipse 40% 36% at 78% 10%,rgba(139,92,246,0.12),transparent 58%)",
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
            className="reveal-on-scroll inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-5 py-2.5 text-center text-xs font-medium uppercase tracking-[0.14em] text-white/72 transition duration-300 hover:border-blue-300/40 hover:bg-white/[0.09] hover:text-white sm:w-auto md:self-auto md:tracking-[0.22em]"
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <p className="reveal-on-scroll mt-8 text-center text-xs text-white/30 md:mt-10">
          {isArabic
            ? "كل حاجة كنصمموها على حساب المشروع ديالك — ماشي قوالب واجدة."
            : lang === "en"
              ? "Every format crafted specifically for your brand — not off-the-shelf templates."
              : "Chaque format est conçu spécifiquement pour votre marque — pas des templates génériques."}
        </p>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .creative-formats-card { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
