import { seedDraft } from "@/actions/cms/home";
import { CmsHeader } from "@/components/cms/CmsShell";
import { ServicesEditor } from "@/components/cms/CollectionEditors";
import { getDraftHomeContent } from "@/lib/cms/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function ServicesContentPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
  const { locale: localeParam } = await searchParams;
  const requestedLocale = localeParam ?? "";
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "fr";
  await seedDraft(locale);
  const content = await getDraftHomeContent(locale);

  return (
    <>
      <CmsHeader eyebrow="Content" title="Services CMS" description="Update service cards while preserving the existing Innovmark presentation system." />
      <ServicesEditor content={content} />
    </>
  );
}
