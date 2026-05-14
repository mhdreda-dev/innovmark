import { seedDraft } from "@/actions/cms/home";
import { CmsHeader } from "@/components/cms/CmsShell";
import { HomeEditor } from "@/components/cms/HomeEditor";
import { getDraftHomeContent } from "@/lib/cms/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function HomeContentPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
  const { locale: localeParam } = await searchParams;
  const requestedLocale = localeParam ?? "";
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : "fr";
  await seedDraft(locale);
  const content = await getDraftHomeContent(locale);

  return (
    <>
      <CmsHeader eyebrow="Homepage" title="Hero and section flow" description="Edit the first impression, carousel media, feature pills and the order of homepage sections." />
      <HomeEditor content={content} />
    </>
  );
}
