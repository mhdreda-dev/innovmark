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
  { label: "Création de contenus ads orientés conversion", icon: Megaphone },
  { label: "Vision terrain du marché africain", icon: Globe2 },
];

const description =
  "Saad Belkaadi accompagne INNOVMARK avec une solide expérience dans le travail avec des agences, la création de vidéos produits, le montage vidéo publicitaire et les campagnes ads. Il comprend particulièrement bien les enjeux du e-commerce en Afrique et aide les marques à créer du contenu performant pour vendre mieux.";

const arHighlights = [
  { label: "تجربة مع عدة وكالات", icon: Users },
  { label: "متخصص فالبيع فالإنترنت فإفريقيا", icon: ShoppingBag },
  { label: "فيديوهات منتجات ومونتاج إعلاني", icon: Clapperboard },
  { label: "تصاور وفيديوهات ومنشورات كتعاون على البيع", icon: Megaphone },
  { label: "فهم ميداني للسوق الإفريقي", icon: Globe2 },
];

const arDescription =
  "كيعاون سعد بلقاضي INNOVMARK بتجربة قوية فالتعامل مع الوكالات، إنتاج فيديوهات المنتجات، المونتاج الإعلاني، وتصاور وفيديوهات ومنشورات الحملات. عندو فهم قريب لتحديات البيع فالإنترنت فإفريقيا، وكيعاون المشاريع تصاوب مواد عملية وجذابة كتزيد فرص البيع.";

export function SaadBelkaadiSection({ locale }: { locale?: Locale }) {
  const isArabic = locale === "ar";
  const displayedHighlights = isArabic ? arHighlights : highlights;

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-20 lg:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-4 mx-auto h-[420px] max-w-5xl rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 36%, rgba(34,211,238,0.18), transparent 34%), radial-gradient(circle at 72% 46%, rgba(16,185,129,0.16), transparent 36%), radial-gradient(circle at 50% 74%, rgba(255,255,255,0.06), transparent 34%)",
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
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-emerald-300/12 blur-3xl"
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
                    <BadgeCheck className="h-4 w-4 text-emerald-200" strokeWidth={1.7} />
                    {isArabic ? "فريق INNOVMARK" : "Team INNOVMARK"}
                  </p>
                  <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-5xl">
                    Saad Belkaadi
                  </h2>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.08em] text-emerald-100/72 md:tracking-[0.22em]">
                    {isArabic ? "متخصص فالبيع فالإنترنت والإعلانات الإبداعية" : "E-commerce & Creative Ads Specialist"}
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
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-black/40 text-cyan-200 transition group-hover:text-emerald-200">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
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
            className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-300/14 blur-3xl transition-opacity duration-500 group-hover:opacity-150"
          />
          <div
            aria-hidden
            className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-emerald-300/12 blur-3xl"
          />

          <div className="relative flex min-w-0 flex-col gap-5 sm:flex-row rtl-md-row">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-cyan-200/30 bg-gradient-to-br from-cyan-200/18 to-emerald-200/14 text-lg font-light tracking-[0.08em] text-white shadow-[0_0_42px_rgba(45,212,191,0.16)]">
              SB
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-cyan-100/64 md:tracking-[0.32em]">
                {isArabic ? "عضو أساسي" : "Membre clé"}
              </p>
              <h2 className="mt-3 text-2xl font-light tracking-tight text-white md:text-3xl">
                Saad Belkaadi
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.08em] text-emerald-100/68 md:tracking-[0.18em]">
                {isArabic ? "متخصص فالبيع فالإنترنت والإعلانات الإبداعية" : "E-commerce & Creative Ads Specialist"}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/64">
                {isArabic ? "خبرة ففيديوهات المنتجات، المونتاج الإعلاني، وتصاور وفيديوهات ومنشورات الإعلانات اللي كتعون مشاريع البيع فالإنترنت فإفريقيا تجيب نتائج أحسن." : "Une expertise en vidéos produits, montage publicitaire et contenus ads orientés conversion pour les marques e-commerce en Afrique."}
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-white/64 transition group-hover:text-white md:tracking-[0.24em] rtl-row">
            {isArabic ? "تعرف على الفريق" : "Découvrir l'équipe"}
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/16 bg-white/[0.04] text-white/72 transition-all duration-300 group-hover:translate-x-1 group-hover:border-cyan-200/40 group-hover:bg-cyan-200/10 group-hover:text-white">
              <ArrowRight className="h-4 w-4 rtl-arrow" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
