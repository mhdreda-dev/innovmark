import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { blogIndexSeo, getBlogArticles } from "@/lib/blog";
import { dictionaries, isLocale, localizedHref } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

const labels = {
  fr: {
    eyebrow: "Blog SEO",
    title: "Conseils marketing digital pour marques locales",
    subtitle:
      "Guides courts pour mieux comprendre le branding, les sites web, Instagram et la croissance locale au Maroc.",
    read: "Lire l'article",
    minutes: "min de lecture",
  },
  en: {
    eyebrow: "SEO Blog",
    title: "Digital marketing advice for local brands",
    subtitle:
      "Short guides about branding, websites, Instagram and local growth in Morocco.",
    read: "Read article",
    minutes: "min read",
  },
  ar: {
    eyebrow: "مدونة SEO",
    title: "نصائح ماركتينغ للمشاريع المحلية",
    subtitle:
      "دلائل قصيرة على البراندينغ، المواقع، إنستغرام والنمو المحلي فالمغرب.",
    read: "قرا المقال",
    minutes: "دقائق قراءة",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  return buildPageMetadata(safeLocale, "/blog", blogIndexSeo[safeLocale]);
}

export default async function LocalizedBlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale];
  const copy = labels[locale];
  const articles = getBlogArticles(locale);

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-20 sm:pt-24">
        <section className="px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-3 rtl-row">
                <span className="h-px w-9 shrink-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700 md:tracking-[0.32em]">
                  {copy.eyebrow}
                </p>
              </div>
              <h1 className="text-4xl font-light leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-7xl md:leading-[1.02]">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {copy.subtitle}
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article, index) => (
                <article
                  key={article.slug}
                  className={index === 0 ? "group md:col-span-2 xl:col-span-1" : "group"}
                >
                  <Link
                    href={localizedHref(`/blog/${article.slug}`, locale)}
                    className="block h-full overflow-hidden rounded-2xl border border-blue-100/70 bg-white/76 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(37,99,235,0.14)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={article.coverImage}
                        alt={article.coverAlt}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                        <span>{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>
                          {article.readingMinutes} {copy.minutes}
                        </span>
                      </div>
                      <h2 className="mt-4 text-xl font-medium leading-snug tracking-tight text-slate-950 md:text-2xl">
                        {article.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {article.excerpt}
                      </p>
                      <span className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-slate-950">
                        {copy.read}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
    </>
  );
}
