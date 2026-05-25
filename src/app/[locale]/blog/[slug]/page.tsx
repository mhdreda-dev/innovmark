import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  blogArticles,
  blogFaqSchema,
  blogPath,
  getBlogArticle,
  getRelatedArticles,
  localizedBlogSlugs,
} from "@/lib/blog";
import { dictionaries, isLocale, localizedHref, locales, type Locale } from "@/lib/i18n";
import {
  absoluteUrl,
  canonicalUrl,
  localBusinessSchema,
  seoKeywords,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const labels = {
  fr: {
    back: "Retour au blog",
    minutes: "min de lecture",
    related: "Articles lies",
    ctaEyebrow: "Besoin d'un avis clair ?",
    ctaTitle: "Parlez-nous de votre marque sur WhatsApp.",
    ctaBody:
      "Envoyez quelques lignes sur votre projet. INNOVMARK vous aide a clarifier la prochaine action utile.",
    ctaButton: "WhatsApp - Reponse rapide",
    whatsapp:
      "Bonjour INNOVMARK, j'ai lu votre article et je souhaite parler de mon projet.",
  },
  en: {
    back: "Back to blog",
    minutes: "min read",
    related: "Related articles",
    ctaEyebrow: "Need a clear opinion?",
    ctaTitle: "Tell us about your brand on WhatsApp.",
    ctaBody:
      "Send a few lines about your project. INNOVMARK will help you clarify the next useful action.",
    ctaButton: "WhatsApp - Fast reply",
    whatsapp:
      "Hello INNOVMARK, I read your article and would like to discuss my project.",
  },
  ar: {
    back: "رجوع للمدونة",
    minutes: "دقائق قراءة",
    related: "مقالات قريبة",
    ctaEyebrow: "محتاج رأي واضح؟",
    ctaTitle: "هضر معانا على المشروع ديالك فواتساب.",
    ctaBody:
      "صيفط لينا شوية تفاصيل على المشروع. INNOVMARK تعاونك تعرف الخطوة اللي خاصك دير دابا.",
    ctaButton: "واتساب - جواب سريع",
    whatsapp:
      "السلام عليكم INNOVMARK، قريت المقال وبغيت نهضر على المشروع ديالي.",
  },
};

export function generateStaticParams() {
  return blogArticles.flatMap((article) =>
    locales.map((locale) => ({ locale, slug: article.slugs[locale] })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale = isLocale(locale) ? locale : "fr";
  const article = getBlogArticle(slug, safeLocale);

  if (!article) {
    return {
      title: "Article not found · INNOVMARK",
    };
  }

  const path = `/blog/${article.slug}`;
  const url = canonicalUrl(safeLocale, path);
  const imageUrl = absoluteUrl(article.coverImage);

  return {
    title: `${article.title} · INNOVMARK`,
    description: article.description,
    keywords: [...seoKeywords, article.category, article.title],
    alternates: {
      canonical: url,
      languages: blogLanguageAlternates(localizedBlogSlugs(article)),
    },
    openGraph: {
      title: `${article.title} · INNOVMARK`,
      description: article.description,
      url,
      siteName: "INNOVMARK",
      type: "article",
      publishedTime: article.date,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} · INNOVMARK`,
      description: article.description,
      images: [imageUrl],
    },
  };
}

export default async function LocalizedBlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const article = getBlogArticle(slug, locale);
  if (!article) notFound();

  const dict = dictionaries[locale];
  const copy = labels[locale];
  const relatedArticles = getRelatedArticles(article.id, locale);
  const whatsappHref = `https://wa.me/212771450503?text=${encodeURIComponent(copy.whatsapp)}`;
  const articleUrl = canonicalUrl(locale, `/blog/${article.slug}`);
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.coverImage),
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "INNOVMARK",
    },
    publisher: {
      "@type": "Organization",
      name: "INNOVMARK",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/hero-showcase/branding-showcase.jpg"),
      },
    },
    mainEntityOfPage: articleUrl,
  };

  return (
    <>
      <Nav labels={dict.nav} locale={locale} />
      <main className="relative z-10 overflow-hidden pt-20 sm:pt-24">
        <article className="px-4 pb-16 pt-8 sm:px-6 md:pb-24 md:pt-14 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <Link
              href={localizedHref("/blog", locale)}
              className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 transition hover:text-blue-500"
            >
              {copy.back}
            </Link>

            <header className="mt-7">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                <span>{article.category}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>
                  {article.readingMinutes} {copy.minutes}
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-light leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-7xl md:leading-[1.03]">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                {article.excerpt}
              </p>
            </header>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-blue-100/70 bg-slate-100 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
              <Image
                src={article.coverImage}
                alt={article.coverAlt}
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-9 md:mt-14">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-medium leading-snug tracking-tight text-slate-950 md:text-3xl">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>

            <section className="mx-auto mt-12 max-w-3xl rounded-2xl border border-blue-100/80 bg-white/78 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-7 md:mt-16">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                {copy.ctaEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight text-slate-950 md:text-3xl">
                {copy.ctaTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                {copy.ctaBody}
              </p>
              <a
                href={whatsappHref}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-950 shadow-[0_18px_42px_rgba(37,211,102,0.24)] transition hover:bg-[#1ebe5a] sm:w-auto"
              >
                {copy.ctaButton}
              </a>
            </section>

            <section className="mt-14 md:mt-20">
              <h2 className="text-2xl font-light tracking-tight text-slate-950 md:text-4xl">
                {copy.related}
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={localizedHref(`/blog/${related.slug}`, locale)}
                    className="rounded-2xl border border-blue-100/70 bg-white/72 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)]"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-700">
                      {related.category}
                    </p>
                    <h3 className="mt-3 text-base font-medium leading-snug text-slate-950">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogFaqSchema(article)) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(locale)) }}
        />
      </main>
      <div className="relative z-10">
        <Footer locale={locale} />
      </div>
    </>
  );
}

function blogLanguageAlternates(slugs: Record<Locale, string>) {
  return {
    fr: canonicalUrl("fr", blogPath("fr", { slugs })),
    en: canonicalUrl("en", blogPath("en", { slugs })),
    ar: canonicalUrl("ar", blogPath("ar", { slugs })),
    "x-default": canonicalUrl("fr", blogPath("fr", { slugs })),
  };
}
