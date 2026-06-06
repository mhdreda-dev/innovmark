import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    quote:
      "Innovmark a donné à notre marque une présence plus haut de gamme. Le travail était précis, rapide et très clair commercialement.",
    name: "Yassine B.",
    role: "Fondateur · Marque retail",
  },
  {
    quote:
      "Le site, les vidéos et les supports de campagne sont enfin devenus cohérents. Nous n'avions plus besoin d'expliquer notre valeur, elle se voyait.",
    name: "Salma A.",
    role: "Associée gérante · Société de services",
  },
  {
    quote:
      "La communication était directe, premium et structurée. Ils ont compris les enjeux business, pas seulement l'esthétique.",
    name: "Omar L.",
    role: "Dirigeant · Groupe immobilier",
  },
  {
    quote:
      "Le rendu final dépasse ce qu'on imaginait. Et surtout, les délais ont été tenus à la lettre.",
    name: "Reda M.",
    role: "CEO · Hôtellerie",
  },
  {
    quote:
      "Un studio qui pense avant de créer. Le travail stratégique a transformé notre manière de vendre.",
    name: "Karim T.",
    role: "Directeur · Industrie",
  },
];

const arTestimonials = [
  {
    quote:
      "المشروع ديالنا ولى كيبان فمستوى أحسن. الخدمة كانت نقية، سريعة، وواضحة تجارياً.",
    name: "ياسين ب.",
    role: "مؤسس · محل تجاري",
  },
  {
    quote:
      "الموقع، الفيديوهات ومواد الحملات ولاو خدامين كمنظومة وحدة. بقينا كنوريو القيمة ديالنا بلا ما نشرحو بزاف.",
    name: "سلمى أ.",
    role: "مسيرة · شركة خدمات",
  },
  {
    quote:
      "التواصل كان واضح ومنظم واحترافي. فهمو الخدمة ديالنا ماشي غير الشكل.",
    name: "عمر ل.",
    role: "مالك · مجموعة عقارية",
  },
];

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  rating?: number;
};

export default function Testimonials({ locale, items: cmsItems }: { locale?: string; items?: TestimonialItem[] }) {
  const isArabic = locale === "ar";
  const items: TestimonialItem[] = cmsItems?.length ? cmsItems : isArabic ? arTestimonials : testimonials;
  const loop = [...items, ...items];

  return (
    <section className="relative overflow-hidden px-4 py-12 md:px-0 md:py-24" dir={isArabic ? "rtl" : undefined}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-3xl opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(79,140,255,0.055), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center md:hidden">
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-6 shrink-0 bg-gradient-to-r from-transparent via-blue-300 to-cyan-200" />
          <span className="cinematic-text text-[10px] uppercase tracking-[0.12em] text-blue-700/72">
            {isArabic ? "ثقة الزبناء" : "Témoignages clients"}
          </span>
          <span className="h-px w-6 shrink-0 bg-gradient-to-l from-transparent via-blue-300 to-cyan-200" />
        </div>
        <h2 className="cinematic-text mx-auto mt-3 max-w-[21rem] text-[1.72rem] font-light leading-[1.12] tracking-tight text-slate-950">
          {isArabic ? "كيخدمو معنا أصحاب المشاريع اللي كيهتمو بالصورة والنتائج." : "Ils nous font confiance."}
        </h2>
        <p className="cinematic-text mx-auto mt-3 max-w-[21rem] text-sm leading-6 text-slate-700">
          {isArabic ? "الخدمة الاحترافية ماشي غير الشكل، هي كيفاش المشروع ديالك كيبان بثقة من بعد الانطلاق." : "Une réalisation premium ne se limite pas à l'esthétique : elle renforce la confiance avec laquelle votre marque se présente."}
        </p>
      </div>

      <div className="relative mx-auto hidden max-w-7xl px-4 sm:px-6 md:block lg:px-10">
        <SectionLabel
          kicker={isArabic ? "ثقة الزبناء" : "Témoignages clients"}
          title={isArabic ? "كيخدمو معنا أصحاب المشاريع اللي كيهتمو بالصورة والنتائج." : "Ils nous font confiance."}
          subtitle={isArabic ? "الخدمة الاحترافية ماشي غير الشكل، هي كيفاش المشروع ديالك كيبان بثقة من بعد الانطلاق." : "Une réalisation premium ne se limite pas à l'esthétique : elle renforce la confiance avec laquelle votre marque se présente."}
        />
      </div>

      {/* Edge fades */}
      {!isArabic && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-white via-white/88 to-transparent md:block lg:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-white via-white/88 to-transparent md:block lg:w-28"
          />
        </>
      )}

      <div className="mx-auto mt-8 grid max-w-md gap-4 md:hidden">
        {items.map((item) => (
          <figure
            key={item.name}
            className={`group flex min-w-0 flex-col rounded-[1.25rem] border border-blue-100/80 bg-white/94 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-xl ${isArabic ? "text-right" : ""}`}
          >
            <div className={`mb-4 flex items-center justify-between gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
              <div className="flex shrink-0 items-center gap-1.5 text-[14px] leading-none text-[#2563EB] drop-shadow-[0_6px_14px_rgba(79,140,255,0.16)]">
                {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-9 w-9 shrink-0 rounded-full border border-[#4F8CFF]/20 bg-gradient-to-br from-[#4F8CFF]/14 to-cyan-200/22 p-2 text-[#2563EB] shadow-[0_10px_22px_rgba(79,140,255,0.12)]"
                aria-hidden
              >
                <path d="M9 7H4v6c0 3.3 2.7 6 6 6v-3a3 3 0 0 1-3-3v-1h2V7zm11 0h-5v6c0 3.3 2.7 6 6 6v-3a3 3 0 0 1-3-3v-1h2V7z" />
              </svg>
            </div>
            <blockquote className={`min-w-0 break-words text-[15px] font-normal text-slate-900 ${isArabic ? "leading-8" : "leading-7"}`}>
              “{item.quote}”
            </blockquote>
            <figcaption className={`mt-5 flex items-center gap-3 border-t border-blue-100/80 pt-4 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-blue-200/70 bg-gradient-to-br from-blue-100 via-white to-cyan-100 text-[11px] font-semibold text-blue-900 shadow-[0_8px_20px_rgba(79,140,255,0.16)]">
                {item.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <span className="min-w-0">
                <div className="text-sm font-medium text-slate-950">{item.name}</div>
                <div className={`mt-1 text-[10px] uppercase text-slate-600 ${isArabic ? "tracking-normal" : "tracking-[0.08em]"}`}>
                  {item.role}
                </div>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-10 hidden max-w-7xl overflow-hidden px-4 sm:px-6 md:block lg:px-10">
        <div className={isArabic ? "grid items-stretch gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3" : "flex w-max animate-marquee-slow items-stretch gap-4 md:gap-5"}>
          {(isArabic ? items : loop).map((item, index) => (
            <figure
              key={`${item.name}-${index}`}
              className={`group flex min-h-[270px] min-w-0 flex-col rounded-[1.45rem] border border-blue-100/80 bg-white/92 p-4 shadow-[0_16px_42px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.90)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-blue-300/55 hover:bg-white/96 hover:shadow-[0_24px_58px_rgba(15,23,42,0.12),0_0_34px_rgba(79,140,255,0.08)] md:min-h-[292px] md:p-6 ${
                isArabic ? "h-full w-full text-right" : "h-auto w-[82vw] max-w-[330px] shrink-0 sm:w-[310px] md:w-[350px] md:max-w-none lg:w-[365px]"
              }`}
            >
              <div className={`mb-4 flex items-center justify-between ${isArabic ? "flex-row-reverse" : ""}`}>
                <div className="flex gap-1.5 text-[15px] leading-none text-[#4F8CFF] opacity-100 drop-shadow-[0_6px_14px_rgba(79,140,255,0.18)] md:text-base">
                  {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-11 w-11 rounded-full border border-[#4F8CFF]/20 bg-gradient-to-br from-[#4F8CFF]/14 to-cyan-200/22 p-2.5 text-[#2563EB] opacity-100 shadow-[0_10px_26px_rgba(79,140,255,0.13)] transition duration-300 group-hover:scale-105 group-hover:border-[#4F8CFF]/35 group-hover:shadow-[0_14px_34px_rgba(79,140,255,0.20)]"
                  aria-hidden
                >
                  <path d="M9 7H4v6c0 3.3 2.7 6 6 6v-3a3 3 0 0 1-3-3v-1h2V7zm11 0h-5v6c0 3.3 2.7 6 6 6v-3a3 3 0 0 1-3-3v-1h2V7z" />
                </svg>
              </div>
              <blockquote className={`min-w-0 flex-1 overflow-visible break-words text-[15px] font-normal text-slate-800 md:text-base ${isArabic ? "leading-8" : "leading-7"}`}>
                “{item.quote}”
              </blockquote>
              <figcaption className={`mt-5 flex items-center gap-3 border-t border-blue-100/80 pt-4 md:mt-6 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-blue-200/70 bg-gradient-to-br from-blue-100 via-white to-cyan-100 text-xs font-semibold text-blue-900 shadow-[0_10px_24px_rgba(79,140,255,0.18)] transition duration-300 group-hover:scale-105">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="min-w-0">
                  <div className="text-sm font-medium text-slate-950">{item.name}</div>
                  <div className={`mt-1 text-[10px] uppercase text-slate-600 ${isArabic ? "tracking-normal" : "tracking-[0.12em] md:tracking-[0.20em]"}`}>
                    {item.role}
                  </div>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
