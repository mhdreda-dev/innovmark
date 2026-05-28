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
    title: "Nos réalisations récentes",
    subtitle: "Des projets pensés pour attirer, convaincre et convertir.",
    cta: "Démarrer un projet",
    projectLink: "Voir le projet",
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
    projectLink: "View project",
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
    projectLink: "شوف المشروع",
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
}

const cardConfigs: CardVisualConfig[] = [
  {
    image: "/images/hero-showcase/u.png",
  },
  {
    image: "/images/hero-showcase/c.png",
  },
  {
    image: "/images/hero-showcase/social-media-showcase.png",
  },
  {
    image: "/images/hero-showcase/Ads-analytics.png",
  },
  {
    image: "/images/hero-showcase/Website.png",
  },
  {
    image: "/images/hero-showcase/studio.png",
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
  projectLink: string;
  href: string;
}

function PortfolioCard({ label, category, result, tag, config, index, projectLink, href }: CardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: EASE }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_42px_-30px_rgba(15,23,42,0.42)] transition duration-300 md:shadow-[0_18px_54px_-36px_rgba(15,23,42,0.55)] md:hover:-translate-y-1 md:hover:border-slate-300 md:hover:shadow-[0_24px_70px_-38px_rgba(15,23,42,0.68)]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-slate-100 md:aspect-[4/3]">
        <img
          src={config.image}
          alt={`${category} - ${label}`}
          className="h-full w-full object-cover transition duration-700 md:group-hover:scale-[1.06]"
          draggable={false}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2 max-md:gap-y-1.5">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600 md:tracking-[0.12em]">
            {category}
          </span>
          <span className="text-xs font-medium text-blue-700">{result}</span>
        </div>

        <h3 className="mt-3 text-lg font-light leading-snug tracking-tight text-slate-950 md:mt-4 md:text-xl md:leading-tight">
          {label}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 md:mt-3">{tag}</p>

        <div className="mt-auto pt-4 md:pt-5">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition duration-300 hover:gap-3 hover:text-blue-700"
          >
            {projectLink}
            <span aria-hidden className="rtl-arrow">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main section ──────────────────────────────────── */
export default function CreativeFormats({ locale }: { locale?: Locale }) {
  const isArabic  = locale === "ar";
  const lang      = (locale ?? "fr") as keyof typeof copy;
  const t         = copy[lang] ?? copy.fr;
  const [featuredFormat, ...remainingFormats] = t.formats.map((fmt, originalIndex) => ({ fmt, originalIndex }));
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("Tous");
  const visibleMobileFormats = remainingFormats.filter(
    ({ fmt }) => activeFilter === "Tous" || fmt.filter === activeFilter,
  );
  const projectHref = localizedHref("/contact", locale);

  return (
    <section className="creative-formats-section relative overflow-hidden bg-white px-4 pb-12 pt-8 sm:px-6 md:pb-20 md:pt-16 lg:px-10">
      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex min-w-0 flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-5 rtl-md-row">
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

        {featuredFormat && (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.78, ease: EASE }}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_18px_56px_-38px_rgba(15,23,42,0.55)] transition duration-300 md:shadow-[0_28px_90px_-52px_rgba(15,23,42,0.72)] md:hover:-translate-y-1 md:hover:border-slate-300 md:hover:shadow-[0_34px_110px_-54px_rgba(15,23,42,0.82)] lg:grid lg:grid-cols-[1.35fr_0.85fr]"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-100 md:aspect-auto md:min-h-[420px] lg:min-h-[520px]">
              <img
                src={cardConfigs[featuredFormat.originalIndex]!.image}
                alt={`${featuredFormat.fmt.category} - ${featuredFormat.fmt.label}`}
                className="h-full w-full object-cover transition duration-700 md:group-hover:scale-[1.05]"
                draggable={false}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-start p-5 md:p-8 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600 md:tracking-[0.14em]">
                    {featuredFormat.fmt.category}
                  </span>
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-blue-700">
                    {featuredFormat.fmt.result}
                  </span>
                </div>
                <h3 className="mt-4 max-w-xl text-2xl font-light leading-[1.08] tracking-tight text-slate-950 md:mt-6 md:text-4xl lg:text-5xl">
                  {featuredFormat.fmt.label}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 md:mt-5 md:text-base md:leading-7">
                  {featuredFormat.fmt.tag}
                </p>
              </div>
              <Link
                href={projectHref}
                className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-medium text-[#f8fafc] transition duration-300 md:mt-10 md:hover:-translate-y-0.5 md:hover:gap-3 md:hover:bg-blue-700"
              >
                {t.projectLink}
                <span aria-hidden className="rtl-arrow">→</span>
              </Link>
            </div>
          </motion.article>
        )}

        <div className="-mx-4 mt-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full items-center gap-2">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-10 shrink-0 rounded-full border px-3.5 text-[11px] font-medium tracking-[0.04em] transition duration-300 ${
                    isActive
                      ? "border-blue-300 bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)]"
                      : "border-slate-200 bg-white text-slate-600 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.45)]"
                  }`}
                  aria-pressed={isActive}
                >
                  {filter === "Tous" && lang === "en" ? "All" : filter}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="mt-5 grid grid-cols-1 items-stretch gap-5 md:hidden">
          {visibleMobileFormats.map(({ fmt, originalIndex }, i) => (
            <PortfolioCard
              key={fmt.label}
              label={fmt.label}
              category={fmt.category}
              result={fmt.result}
              tag={fmt.tag}
              config={cardConfigs[originalIndex]!}
              index={i + 1}
              projectLink={t.projectLink}
              href={projectHref}
            />
          ))}
        </motion.div>

        <motion.div layout className="mt-6 hidden grid-cols-1 items-stretch gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {remainingFormats.map(({ fmt, originalIndex }, i) => (
            <PortfolioCard
              key={fmt.label}
              label={fmt.label}
              category={fmt.category}
              result={fmt.result}
              tag={fmt.tag}
              config={cardConfigs[originalIndex]!}
              index={i + 1}
              projectLink={t.projectLink}
              href={projectHref}
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
        @media (max-width: 767px) {
          .creative-formats-section .reveal-on-scroll {
            max-width: 100%;
          }
          .creative-formats-section .reveal-on-scroll > div:first-child {
            gap: 0.5rem;
          }
          .creative-formats-section .reveal-on-scroll h2 {
            max-width: 22rem;
            font-size: clamp(2rem, 10.4vw, 2.65rem);
            line-height: 1.04;
          }
          .creative-formats-section .reveal-on-scroll p {
            max-width: 21rem;
            font-size: 0.95rem;
            line-height: 1.65;
          }
          .creative-formats-section .reveal-on-scroll span {
            letter-spacing: 0.16em;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .creative-formats-card { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
