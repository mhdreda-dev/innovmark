import { seedDraft } from "@/actions/cms/home";
import { CmsHeader } from "@/components/cms/CmsShell";
import { SeoEditor } from "@/components/cms/CollectionEditors";
import { getDraftHomeContent } from "@/lib/cms/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function SeoContentPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
  const { locale: localeParam } = await searchParams;
  const requestedLocale = localeParam ?? "";
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "fr";
  await seedDraft(locale);
  const content = await getDraftHomeContent(locale);

  return (
    <>
      <CmsHeader eyebrow="Search" title="SEO CMS" description="Control homepage title tags, descriptions, OG imagery and structured data." />
      <SeoEditor content={content} />
    </>
  );
}
