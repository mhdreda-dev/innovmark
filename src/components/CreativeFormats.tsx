"use client";

import { motion } from "framer-motion";
import { Play, Palette, Globe2, Smartphone, Camera, TrendingUp } from "lucide-react";
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
  gradient: string;
  glowColor: string;
  accentLight: string;
  visual: "video" | "branding" | "reels" | "web" | "photo" | "campaign";
}

const cardConfigs: CardVisualConfig[] = [
  {
    gradient: "linear-gradient(145deg,#080f26 0%,#111640 45%,#0b0f2a 100%)",
    glowColor: "rgba(60,120,255,0.55)",
    accentLight: "rgba(91,140,255,0.25)",
    visual: "video",
  },
  {
    gradient: "linear-gradient(145deg,#130830 0%,#1e0f48 50%,#0f0824 100%)",
    glowColor: "rgba(139,92,246,0.55)",
    accentLight: "rgba(167,139,250,0.22)",
    visual: "branding",
  },
  {
    gradient: "linear-gradient(145deg,#200830 0%,#2d0e44 50%,#180628 100%)",
    glowColor: "rgba(216,80,255,0.50)",
    accentLight: "rgba(232,121,249,0.20)",
    visual: "reels",
  },
  {
    gradient: "linear-gradient(145deg,#031828 0%,#052434 50%,#031520 100%)",
    glowColor: "rgba(34,211,238,0.45)",
    accentLight: "rgba(103,232,249,0.20)",
    visual: "web",
  },
  {
    gradient: "linear-gradient(145deg,#031a12 0%,#062418 50%,#021410 100%)",
    glowColor: "rgba(16,185,129,0.45)",
    accentLight: "rgba(52,211,153,0.20)",
    visual: "photo",
  },
  {
    gradient: "linear-gradient(90deg,#060d20 0%,#0c1535 45%,#091030 100%)",
    glowColor: "rgba(91,140,255,0.50)",
    accentLight: "rgba(122,162,255,0.18)",
    visual: "campaign",
  },
];

/* ─── Individual visual mockups ────────────────────── */
function VideoVisual() {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      {/* Film frame corners */}
      {(["top-3 left-3 border-t-2 border-l-2","top-3 right-3 border-t-2 border-r-2","bottom-8 left-3 border-b-2 border-l-2","bottom-8 right-3 border-b-2 border-r-2"] as const).map((cls) => (
        <span key={cls} aria-hidden className={`absolute h-4 w-4 border-white/25 ${cls}`} />
      ))}
      {/* Scan lines */}
      <div aria-hidden className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.7) 3px,rgba(255,255,255,0.7) 4px)" }} />
      {/* Play button */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Play className="ml-1 h-6 w-6 fill-white/70 text-white/70" />
        <div aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 36px rgba(60,120,255,0.50), 0 0 72px rgba(60,120,255,0.22)" }} />
      </div>
      {/* Bottom label */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center gap-2 px-4">
        <span aria-hidden className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">HD · 4K</span>
        <span aria-hidden className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
}

function BrandingVisual() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden">
      {/* Large monogram watermark */}
      <span aria-hidden className="select-none text-[80px] font-light tracking-[0.18em] text-white/[0.06]">IMK</span>
      {/* Geometric logo sketch */}
      <svg aria-hidden viewBox="0 0 80 80" className="absolute h-20 w-20 opacity-30" fill="none">
        <polygon points="40,8 72,28 72,52 40,72 8,52 8,28" stroke="rgba(167,139,250,0.7)" strokeWidth="1.2" />
        <polygon points="40,18 62,31 62,49 40,62 18,49 18,31" stroke="rgba(167,139,250,0.4)" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>
      {/* Colour palette */}
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
        {["bg-violet-400","bg-fuchsia-400","bg-blue-400","bg-white/50"].map((c) => (
          <span key={c} aria-hidden className={`h-2.5 w-2.5 rounded-full ${c}`} />
        ))}
      </div>
      {/* Top label */}
      <span aria-hidden className="absolute left-4 top-3 font-mono text-[8px] uppercase tracking-[0.32em] text-white/25">Brand Identity</span>
    </div>
  );
}

function ReelsVisual() {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      {/* Phone silhouette */}
      <div className="relative h-32 w-16 overflow-hidden rounded-[14px] border border-white/20 bg-white/[0.04]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-2 pt-2">
          <span className="font-mono text-[5px] text-white/25">9:41</span>
          <div className="flex gap-0.5">
            {[2,3,4].map((h) => <span key={h} aria-hidden className={`w-0.5 bg-white/30 rounded-sm`} style={{height: h}} />)}
          </div>
        </div>
        {/* Content area */}
        <div className="mx-2 mt-1 h-16 overflow-hidden rounded-md bg-gradient-to-b from-fuchsia-500/20 to-violet-800/20">
          <div className="flex h-full items-center justify-center">
            <Play className="h-4 w-4 fill-white/50 text-white/50" />
          </div>
        </div>
        {/* Bottom nav dots */}
        <div className="mt-2 flex justify-center gap-1">
          {[true,false,false].map((a,i) => (
            <span key={i} aria-hidden className={`h-1 rounded-full transition-all ${a ? "w-4 bg-white/60" : "w-1 bg-white/20"}`} />
          ))}
        </div>
      </div>
      {/* Vertical bar indicator */}
      <div aria-hidden className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-white/50" />
        <span className="h-6 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
      {/* Label */}
      <span aria-hidden className="absolute bottom-3 left-0 right-0 text-center font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">Vertical · 9:16</span>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="relative flex flex-1 items-end justify-center pb-2">
      {/* Browser chrome */}
      <div className="w-full max-w-[200px] overflow-hidden rounded-lg border border-white/15 bg-white/[0.03]">
        {/* Tab bar */}
        <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5">
          {["bg-red-400/60","bg-yellow-400/60","bg-emerald-400/60"].map((c) => (
            <span key={c} aria-hidden className={`h-1.5 w-1.5 rounded-full ${c}`} />
          ))}
          {/* URL bar */}
          <div className="mx-2 flex flex-1 items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-2 py-0.5">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            <span className="truncate font-mono text-[7px] text-white/25">innovmark.ma</span>
          </div>
        </div>
        {/* Content mock */}
        <div className="space-y-1.5 p-2.5">
          <div className="h-4 w-3/4 rounded bg-white/[0.06]" />
          <div className="h-2 w-full rounded bg-white/[0.04]" />
          <div className="h-2 w-5/6 rounded bg-white/[0.04]" />
          <div className="mt-2 grid grid-cols-3 gap-1">
            {[1,2,3].map((i) => (
              <div key={i} className="h-8 rounded bg-gradient-to-b from-cyan-400/10 to-transparent" />
            ))}
          </div>
          <div className="mt-1 h-5 w-24 rounded-full bg-cyan-400/20" />
        </div>
      </div>
    </div>
  );
}

function PhotoVisual() {
  return (
    <div className="relative flex flex-1 items-center justify-center">
      {/* Light cone */}
      <div aria-hidden className="absolute -top-4 left-1/2 h-36 w-20 -translate-x-1/2" style={{ background: "conic-gradient(from -8deg at 50% 0%,transparent 0deg,rgba(52,211,153,0.14) 10deg,rgba(52,211,153,0.22) 20deg,rgba(52,211,153,0.14) 30deg,transparent 40deg)", filter: "blur(6px)" }} />
      {/* Product shape */}
      <div className="relative flex h-24 w-16 flex-col overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-emerald-400/10 to-transparent">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/60 to-transparent" />
        <div className="flex flex-1 items-center justify-center">
          <Camera className="h-7 w-7 text-emerald-300/40" strokeWidth={1.2} />
        </div>
      </div>
      {/* Focus reticle */}
      <div aria-hidden className="absolute h-20 w-20 rounded-sm border border-white/15" style={{ boxShadow: "inset 0 0 20px rgba(52,211,153,0.08)" }}>
        {(["top-0 left-0 border-t border-l","top-0 right-0 border-t border-r","bottom-0 left-0 border-b border-l","bottom-0 right-0 border-b border-r"] as const).map((cls) => (
          <span key={cls} aria-hidden className={`absolute h-3 w-3 border-emerald-300/50 ${cls}`} />
        ))}
      </div>
      {/* Label */}
      <span aria-hidden className="absolute bottom-2 left-0 right-0 text-center font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">Studio · E-com</span>
    </div>
  );
}

function CampaignVisual() {
  const bars = [55,72,44,88,65,92,38,78,60,95,48,82];
  return (
    <div className="relative flex w-full items-center gap-3 px-1 sm:gap-6 sm:px-2">
      {/* Bar chart */}
      <div className="flex flex-1 items-end gap-0.5" style={{ height: 52 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            aria-hidden
            className="flex-1 rounded-t"
            style={{
              height: `${h}%`,
              background: i === bars.length - 1
                ? "linear-gradient(to top,rgba(91,140,255,0.90),rgba(122,162,255,0.80))"
                : i % 3 === 0
                  ? "linear-gradient(to top,rgba(91,140,255,0.40),rgba(91,140,255,0.20))"
                  : "rgba(255,255,255,0.08)",
              transition: "height 0.4s ease",
            }}
          />
        ))}
      </div>
      {/* KPI pill */}
      <div className="flex shrink-0 flex-col items-center gap-1">
        <div className="rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-center">
          <div className="text-xl font-light text-blue-300/90">+{">"}3×</div>
          <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.25em] text-white/30">ROAS</div>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-emerald-400/70" strokeWidth={2} />
          <span className="font-mono text-[8px] text-emerald-300/60">+128%</span>
        </div>
      </div>
      {/* Node dots */}
      <div aria-hidden className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-2 opacity-30">
        {[1,2,3].map((i) => <span key={i} className="h-1 w-1 rounded-full bg-blue-300" />)}
      </div>
    </div>
  );
}

/* ─── Card component ────────────────────────────────── */
interface CardProps {
  label: string;
  tag: string;
  config: CardVisualConfig;
  spanClass: string;
  index: number;
}

function FormatCard({ label, tag, config, spanClass, index }: CardProps) {
  const isCampaign = config.visual === "campaign";
  const isVideo    = config.visual === "video";
  const isReels    = config.visual === "reels";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: EASE }}
      className={`group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] ${spanClass}`}
      style={{
        background: config.gradient,
        minHeight: isCampaign ? 116 : isReels ? 200 : 220,
      }}
    >
      {/* Hover glow overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%,${config.accentLight},transparent 68%)` }}
      />
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg,transparent,${config.glowColor},transparent)` }}
      />
      {/* Hover border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${config.glowColor.replace("0.55","0.30").replace("0.50","0.26").replace("0.45","0.24")}` }}
      />
      {/* Noise texture */}
      <div aria-hidden className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

      <div className={`relative flex h-full min-w-0 flex-col p-5 ${isCampaign ? "md:flex-row md:items-center md:gap-6" : ""}`}>
        {/* Visual area */}
        {!isCampaign && (
          <div className={`relative flex ${isReels ? "justify-center" : ""}`} style={{ flex: 1, minHeight: isVideo ? 140 : 110 }}>
            {config.visual === "video"    && <VideoVisual />}
            {config.visual === "branding" && <BrandingVisual />}
            {config.visual === "reels"    && <ReelsVisual />}
            {config.visual === "web"      && <WebVisual />}
            {config.visual === "photo"    && <PhotoVisual />}
          </div>
        )}
        {isCampaign && <CampaignVisual />}

        {/* Footer label */}
        <div className={`${isCampaign ? "shrink-0 md:min-w-[180px]" : "mt-4 border-t border-white/[0.07] pt-4"}`}>
          <p className={`font-light leading-tight tracking-tight text-white ${isCampaign ? "text-lg md:text-2xl" : "text-lg md:text-xl"}`}>
            {label}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/38 md:tracking-[0.22em]">{tag}</p>
        </div>
      </div>

      {/* Play badge for video / reels */}
      {(isVideo || isReels) && (
        <div
          aria-hidden
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/[0.07]"
        >
          <Play className="ml-0.5 h-3 w-3 fill-white/60 text-white/60" />
        </div>
      )}
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
