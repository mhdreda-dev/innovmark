import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clapperboard,
  Globe2,
  Megaphone,
  ShoppingBag,
  Users,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import { type Locale, localizedHref } from "@/lib/i18n";

const highlights = [
  { label: "Expérience avec plusieurs agences", icon: Users },
  { label: "Spécialiste e-commerce en Afrique", icon: ShoppingBag },
  { label: "Vidéos produits & montage publicitaire", icon: Clapperboard },
  { label: "Création de contenus publicitaires orientés conversion", icon: Megaphone },
  { label: "Vision terrain du marché africain", icon: Globe2 },
];

const description =
  "Saad Belkaadi accompagne INNOVMARK avec une solide expérience dans le travail avec des agences, la création de vidéos produits, le montage vidéo publicitaire et les campagnes payantes. Il comprend particulièrement bien les enjeux du commerce en ligne en Afrique et aide les marques à créer du contenu performant pour vendre mieux.";

const arHighlights = [
  { label: "تجربة مع عدة وكالات", icon: Users },
  { label: "متخصص فالبيع فالإنترنت فإفريقيا", icon: ShoppingBag },
  { label: "فيديوهات منتجات ومونتاج إعلاني", icon: Clapperboard },
  { label: "محتوى كرييتيف كيساعد على البيع", icon: Megaphone },
  { label: "فهم ميداني للسوق الإفريقي", icon: Globe2 },
];

const arDescription =
  "كيعاون سعد بلقاضي INNOVMARK بتجربة قوية فالتعامل مع الوكالات، إنتاج فيديوهات المنتجات، المونتاج الإعلاني، ومحتوى الحملات. عندو فهم قريب لتحديات البيع فالإنترنت فإفريقيا، وكيعاون المشاريع تصاوب مواد عملية وجذابة كتزيد فرص البيع.";

export function SaadBelkaadiSection({ locale }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const displayedHighlights = isArabic ? arHighlights : highlights;

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-20 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-[170px] max-w-2xl rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 38% 40%, rgba(79,140,255,0.07), transparent 58%), radial-gradient(circle at 68% 48%, rgba(125,211,252,0.045), transparent 64%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionLabel
          kicker={isArabic ? "عضو أساسي" : "Membre clé"}
          title={isArabic ? "خبرة إبداعية خدامة على البيع." : "Une expertise créative pensée pour vendre."}
          subtitle={isArabic ? "INNOVMARK كتستند على خبرات ميدانية كتربط التصاور والفيديوهات والمنشورات بالبيع وبواقع السوق." : "INNOVMARK s'appuie aussi sur des profils terrain capables de relier contenu, performance et réalité des marchés."}
        />

        <article className="premium-glass reveal-on-scroll relative mt-10 min-w-0 overflow-hidden rounded-3xl p-4 shadow-[0_34px_140px_rgba(6,182,212,0.10)] sm:p-5 md:mt-14 md:p-8 lg:p-10">
          <div
            aria-hidden
            className="absolute right-4 top-0 h-24 w-24 rounded-full bg-blue-300/[0.055] blur-3xl"
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-10 h-24 w-24 rounded-full bg-cyan-300/[0.045] blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent"
          />

          <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-4 sm:p-5 md:p-7">
              <div className="flex flex-col items-start gap-5 sm:flex-row rtl-md-row">
                <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl border border-cyan-200/30 bg-gradient-to-br from-cyan-200/18 via-white/[0.06] to-emerald-200/14 text-2xl font-light tracking-[0.08em] text-white shadow-[0_0_48px_rgba(45,212,191,0.18)]">
                  SB
                  <span
                    aria-hidden
                    className="absolute -right-1 -top-1 h-4 w-4 rounded-full border border-black bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.70)]"
                  />
                </div>

                <div>
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-cyan-100/70 md:tracking-[0.32em] rtl-row">
                    <BadgeCheck className="h-9 w-9 rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2.5 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 hover:scale-105" strokeWidth={1.8} />
                    {isArabic ? "فريق INNOVMARK" : "Équipe INNOVMARK"}
                  </p>
                  <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-5xl">
                    Saad Belkaadi
                  </h2>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-emerald-100/72 md:tracking-[0.22em]">
                    {isArabic ? "متخصص فالبيع فالإنترنت والإعلانات الإبداعية" : "Spécialiste commerce en ligne & créations publicitaires"}
                  </p>
                </div>
              </div>

              <p className="mt-7 text-sm leading-7 text-white/70 md:text-base md:leading-8">
                {isArabic ? arDescription : description}
              </p>

              <Link
                href={localizedHref("/contact", locale)}
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-cyan-100/20 bg-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-emerald-100 sm:w-auto md:tracking-[0.18em]"
              >
                {isArabic ? "خدم معنا" : "Travailler avec nous"} <ArrowRight className="h-4 w-4 rtl-arrow" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {displayedHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.075]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2.5 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5 opacity-100" strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-5 text-base font-light leading-snug tracking-tight text-white">
                      {item.label}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function SaadBelkaadiTeaser({ locale }: { locale?: Locale }) {
  const isArabic = locale === "ar";

  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 md:py-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href={localizedHref("/pourquoi-nous", locale)}
          className="premium-glass reveal-on-scroll group relative flex min-w-0 flex-col gap-6 overflow-hidden rounded-3xl p-5 transition duration-500 hover:-translate-y-1 hover:border-cyan-200/30 md:flex-row md:items-center md:justify-between md:p-8 rtl-md-row"
        >
          <div
            aria-hidden
            className="absolute right-4 top-0 h-24 w-24 rounded-full bg-blue-300/[0.055] blur-3xl transition-opacity duration-500 group-hover:opacity-80"
          />
          <div
            aria-hidden
            className="absolute bottom-0 left-1/3 h-20 w-20 rounded-full bg-cyan-300/[0.045] blur-3xl"
          />

          <div className="relative flex min-w-0 flex-col gap-5 sm:flex-row rtl-md-row">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-cyan-200/30 bg-gradient-to-br from-cyan-200/18 to-emerald-200/14 text-lg font-light tracking-[0.08em] text-white shadow-[0_0_42px_rgba(45,212,191,0.16)]">
              SB
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-600 md:tracking-[0.32em]">
                {isArabic ? "عضو أساسي" : "Membre clé"}
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-tight text-white md:text-3xl">
                Saad Belkaadi
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-slate-600 md:tracking-[0.18em]">
                {isArabic ? "متخصص فالبيع فالإنترنت والإعلانات الإبداعية" : "Spécialiste commerce en ligne & créations publicitaires"}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/64">
                {isArabic ? "خبرة ففيديوهات المنتجات، المونتاج الإعلاني، ومحتوى الإعلانات اللي كيعاون مشاريع البيع فالإنترنت فإفريقيا تجيب نتائج أحسن." : "Une expertise en vidéos produits, montage publicitaire et contenus payants orientés conversion pour les marques de commerce en ligne en Afrique."}
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-white/64 transition group-hover:text-white md:tracking-[0.24em] rtl-row">
            {isArabic ? "تعرف على الفريق" : "Découvrir l'équipe"}
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2.5 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 group-hover:scale-105 rtl-arrow">
              <ArrowRight className="h-4 w-4 opacity-100" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
