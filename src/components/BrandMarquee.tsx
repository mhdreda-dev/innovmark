const items = [
  "Vidéos cinématiques",
  "Sites haute conversion",
  "Identité de marque",
  "Réseaux sociaux",
  "Publicités payantes",
  "Gestion de stock",
  "Stratégie digitale",
  "Direction créative",
];

const arItems = [
  "فيديوهات احترافية",
  "مواقع كتجيب زبناء",
  "لوغو وشكل قوي",
  "صفحات التواصل",
  "إعلانات مدفوعة",
  "تسيير المخزون",
  "خطة واضحة فالإنترنت",
  "تصميم منظم",
];

export default function BrandMarquee({ locale }: { locale?: string }) {
  const displayedItems = locale === "ar" ? arItems : items;

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-blue-100/70 bg-white/72 py-5 shadow-[0_12px_34px_rgba(15,23,42,0.045)] backdrop-blur-xl md:py-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-24"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-24"
      />
      <div dir="ltr" className="flex w-max animate-marquee gap-6 whitespace-nowrap text-[11px] font-light uppercase tracking-[0.12em] text-slate-500 sm:gap-8 sm:text-sm sm:tracking-[0.18em] md:gap-12 md:text-base md:tracking-[0.36em]">
        {[...displayedItems, ...displayedItems, ...displayedItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 sm:gap-8 md:gap-12">
            {item}
            <span className="h-1 w-1 rounded-full bg-blue-400/45" />
          </span>
        ))}
      </div>
    </section>
  );
}
