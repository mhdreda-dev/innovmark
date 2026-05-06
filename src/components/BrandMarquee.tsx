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
  "فيديوهات سينمائية",
  "مواقع عالية التحويل",
  "هوية بصرية",
  "إدارة الشبكات الاجتماعية",
  "إعلانات مدفوعة",
  "إدارة المخزون",
  "استراتيجية رقمية",
  "إخراج إبداعي",
];

export default function BrandMarquee({ locale }: { locale?: string }) {
  const displayedItems = locale === "ar" ? arItems : items;

  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-white/[0.06] bg-black/40 py-6 md:py-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent"
      />
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-sm font-light uppercase tracking-[0.32em] text-white/42 md:gap-16 md:text-base md:tracking-[0.42em]">
        {[...displayedItems, ...displayedItems, ...displayedItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 md:gap-16">
            {item}
            <span className="h-1 w-1 rounded-full bg-cyan-200/40" />
          </span>
        ))}
      </div>
    </section>
  );
}
