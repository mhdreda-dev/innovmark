import SectionLabel from "./SectionLabel";

type Case = {
  client: string;
  category: string;
  title: string;
  metric: { value: string; label: string };
  before: string;
  after: string;
  gradient: string;
  year: string;
};

const cases: Case[] = [
  {
    client: "Maison Atlas",
    category: "Branding · Vidéo",
    title: "Lancement d'une maison de couture casablancaise",
    metric: { value: "+340%", label: "Engagement Instagram" },
    before: "No premium launch language",
    after: "Editorial campaign system",
    gradient: "from-violet-500/30 via-fuchsia-500/20 to-amber-300/30",
    year: "2025",
  },
  {
    client: "Souk Digital",
    category: "Site · Stock",
    title: "Plateforme e-commerce et système de stock unifié",
    metric: { value: "12 jours", label: "De prototype à production" },
    before: "Manual operations",
    after: "Unified selling dashboard",
    gradient: "from-blue-500/30 via-cyan-400/20 to-violet-500/30",
    year: "2025",
  },
  {
    client: "Nour Café",
    category: "Vidéo · Ads",
    title: "Campagne d'ouverture multi-villes",
    metric: { value: "1,2M", label: "Vues organiques" },
    before: "Local opening noise",
    after: "Multi-city demand signal",
    gradient: "from-amber-300/30 via-orange-400/20 to-rose-400/30",
    year: "2024",
  },
  {
    client: "Oryx Properties",
    category: "Branding · Site",
    title: "Refonte complète d'identité immobilière premium",
    metric: { value: "+58%", label: "Leads qualifiés" },
    before: "Generic property image",
    after: "Trust-driven premium funnel",
    gradient: "from-blue-600/30 via-violet-500/20 to-amber-200/30",
    year: "2024",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="relative py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <SectionLabel
            kicker="Réalisations"
            title="Prestige work with business weight."
            subtitle="Selected transformations built to make brands feel more expensive, clearer and easier to trust."
          />
          <a
            href="#contact"
            className="self-start border-b border-white/25 pb-1 text-[11px] uppercase tracking-[0.28em] text-white/78 transition-colors hover:border-cyan-200/70 hover:text-white md:self-auto"
          >
            Discuter d'un projet →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {cases.map((c, i) => (
            <article
              key={c.client}
              className={`premium-glass group relative flex min-h-[430px] flex-col overflow-hidden rounded-2xl p-5 transition-all duration-300 md:min-h-[460px] md:p-7 md:hover:-translate-y-1 md:hover:border-cyan-200/24 ${
                i > 1 ? "max-md:hidden" : ""
              }`}
            >
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-55 transition-opacity duration-300 md:group-hover:opacity-75`}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-25 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.42), transparent 42%), radial-gradient(circle at 88% 82%, rgba(0,0,0,0.72), transparent 48%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-black/22 to-black/52" />

              <div className="relative z-10 flex h-full flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-50/72">
                      {c.category}
                    </div>
                    <div className="mt-2 font-mono text-[11px] tracking-[0.26em] text-white/42">
                      {c.year}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full border border-white/14 bg-black/18 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/62 backdrop-blur-sm">
                    Case study
                  </div>
                </div>

                <div className="mt-8 md:mt-10">
                  <h3 className="max-w-xl text-2xl font-light leading-[1.12] tracking-tight text-white md:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-white/78">
                    {c.client}
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border border-white/12 bg-black/22 p-4 backdrop-blur-sm md:mt-8 md:p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div className="text-3xl font-light tracking-tight text-white md:text-4xl">
                      {c.metric.value}
                    </div>
                    <div className="max-w-[12rem] text-left text-[10px] uppercase tracking-[0.22em] text-white/58 sm:text-right">
                      {c.metric.label}
                    </div>
                  </div>
                </div>

                <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2 md:pt-8">
                  <div className="rounded-2xl border border-white/12 bg-black/24 p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-white/44">
                      Before
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                      {c.before}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-cyan-100/20 bg-white/[0.075] p-4 backdrop-blur-sm">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-cyan-100/72">
                      After
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white">
                      {c.after}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
