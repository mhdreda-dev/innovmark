import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    quote:
      "Innovmark made our brand look like it belonged in a higher category. The work was sharp, fast, and commercially clear.",
    name: "Yassine B.",
    role: "Founder · Retail Brand",
  },
  {
    quote:
      "The website, videos and campaign assets finally felt connected. We stopped explaining our value and started showing it.",
    name: "Salma A.",
    role: "Managing Partner · Service Co.",
  },
  {
    quote:
      "Communication was direct, premium and structured. They understood the business side, not only the visuals.",
    name: "Omar L.",
    role: "Owner · Real Estate Group",
  },
  {
    quote:
      "Le rendu final dépasse ce qu'on imaginait. Et surtout, les délais ont été tenus à la lettre.",
    name: "Reda M.",
    role: "CEO · Hospitality",
  },
  {
    quote:
      "A studio that thinks first, designs second. The strategy work alone changed how we sell.",
    name: "Karim T.",
    role: "Director · Industrial",
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
    <section className="relative overflow-hidden py-16 md:py-24" dir={isArabic ? "rtl" : undefined}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-3xl opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(79,140,255,0.055), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionLabel
          kicker={isArabic ? "ثقة الزبناء" : "Client signal"}
          title={isArabic ? "كيخدمو معنا أصحاب المشاريع اللي كيهتمو بالصورة والنتائج." : "Trusted by owners who care about perception."}
          subtitle={isArabic ? "الخدمة الاحترافية ماشي غير الشكل، هي كيفاش المشروع ديالك كيبان بثقة من بعد الانطلاق." : "Premium work is not only how it looks — it is how confidently the business presents itself after launch."}
        />
      </div>

      {/* Edge fades */}
      {!isArabic && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/92 to-transparent md:w-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/92 to-transparent md:w-40"
          />
        </>
      )}

      <div className="mt-10 md:mt-14">
        <div className={isArabic ? "mx-auto grid max-w-7xl items-stretch gap-5 px-4 sm:px-6 md:grid-cols-2 md:gap-6 lg:px-10 xl:grid-cols-3" : "flex w-max animate-marquee-slow items-stretch gap-4 px-4 sm:px-6 md:gap-6 lg:px-10"}>
          {(isArabic ? items : loop).map((item, index) => (
            <figure
              key={`${item.name}-${index}`}
              className={`group flex min-h-[320px] min-w-0 flex-col rounded-3xl border border-blue-100/70 bg-white/88 p-5 shadow-[0_16px_42px_rgba(15,23,42,0.075)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300/45 hover:shadow-[0_22px_54px_rgba(15,23,42,0.10)] md:min-h-[340px] md:p-8 ${
                isArabic ? "h-full w-full text-right" : "h-auto w-[82vw] max-w-[340px] shrink-0 sm:w-[320px] md:w-[420px] md:max-w-none"
              }`}
            >
              <div className={`mb-4 flex items-center justify-between md:mb-6 ${isArabic ? "flex-row-reverse" : ""}`}>
                <div className="flex gap-1 text-[#4F8CFF] opacity-100">
                  {Array.from({ length: item.rating ?? 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[42px] w-[42px] rounded-full border border-[#4F8CFF]/15 bg-[#4F8CFF]/[0.08] p-2.5 text-[#4F8CFF] opacity-100 shadow-[0_8px_24px_rgba(79,140,255,0.08)] transition duration-300 group-hover:scale-105"
                  aria-hidden
                >
                  <path d="M9 7H4v6c0 3.3 2.7 6 6 6v-3a3 3 0 0 1-3-3v-1h2V7zm11 0h-5v6c0 3.3 2.7 6 6 6v-3a3 3 0 0 1-3-3v-1h2V7z" />
                </svg>
              </div>
              <blockquote className={`min-w-0 flex-1 overflow-visible break-words text-base font-light text-slate-800 md:text-lg ${isArabic ? "leading-8 md:leading-10" : "leading-7 md:leading-8"}`}>
                “{item.quote}”
              </blockquote>
              <figcaption className={`mt-6 flex items-center gap-3 border-t border-blue-100/70 pt-5 md:mt-8 md:pt-6 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-[11px] font-semibold text-blue-900 shadow-[0_8px_20px_rgba(79,140,255,0.14)]">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="min-w-0">
                  <div className="text-sm text-slate-950">{item.name}</div>
                  <div className={`mt-1 text-[10px] uppercase text-slate-500 ${isArabic ? "tracking-normal" : "tracking-[0.12em] md:tracking-[0.24em]"}`}>
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
