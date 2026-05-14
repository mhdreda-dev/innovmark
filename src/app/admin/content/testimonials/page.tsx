import { seedDraft } from "@/actions/cms/home";
import { CmsHeader } from "@/components/cms/CmsShell";
import { TestimonialsEditor } from "@/components/cms/CollectionEditors";
import { getDraftHomeContent } from "@/lib/cms/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function TestimonialsContentPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
  const { locale: localeParam } = await searchParams;
  const requestedLocale = localeParam ?? "";
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "fr";
  await seedDraft(locale);
  const content = await getDraftHomeContent(locale);

  return (
    <>
      <CmsHeader eyebrow="Content" title="Testimonials CMS" description="Edit client proof, ratings and active state for the homepage marquee." />
      <TestimonialsEditor content={content} />
    </>
  );
}
