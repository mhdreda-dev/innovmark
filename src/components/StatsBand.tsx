const stats = [
  { value: "120+", label: "Projets livrés" },
  { value: "48 h", label: "Première réponse" },
  { value: "4.9 / 5", label: "Satisfaction client" },
  { value: "Maroc + Int.", label: "Périmètre" },
];

const arStats = [
  { value: "120+", label: "مشروع منجز" },
  { value: "48h", label: "جواب أول" },
  { value: "4.9/5", label: "رضا الزبناء" },
  { value: "المغرب + الخارج", label: "نطاق الخدمة" },
];

export default function StatsBand({ locale }: { locale?: string }) {
  const items = locale === "ar" ? arStats : stats;

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 32% at 22% 20%, rgba(56,189,248,0.10), transparent 64%), radial-gradient(ellipse 50% 32% at 78% 80%, rgba(167,139,250,0.10), transparent 64%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-md md:grid-cols-4">
          {items.map((s) => (
            <div
              key={s.label}
              className="relative min-w-0 bg-black/45 px-4 py-7 text-center md:px-8 md:py-12 md:text-left rtl-text-right"
            >
              <div
                aria-hidden
                className="absolute start-5 top-5 h-6 w-px bg-gradient-to-b from-cyan-200/60 to-transparent md:start-8 md:top-8 md:h-7"
              />
              <div className="cinematic-text text-3xl font-light tracking-tight text-white md:text-5xl">
                {s.value}
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.12em] text-white/52 md:mt-4 md:text-[11px] md:tracking-[0.28em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
