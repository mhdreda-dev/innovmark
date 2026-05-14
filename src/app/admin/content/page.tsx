import Link from "next/link";
import { CmsCard, CmsHeader } from "@/components/cms/CmsShell";

const cards = [
  ["Homepage", "/admin/content/home", "Hero copy, hero media, CTA buttons and section order."],
  ["Services", "/admin/content/services", "Editable service cards with order and visibility controls."],
  ["Testimonials", "/admin/content/testimonials", "Client quotes, ratings and marquee ordering."],
  ["SEO", "/admin/content/seo", "Page title, meta description, keywords and structured data."],
  ["Media", "/admin/content/media", "Images, videos and reusable asset library."],
];

export default function AdminContentPage() {
  return (
    <>
      <CmsHeader eyebrow="CMS dashboard" title="Content command center" description="Manage the public Innovmark homepage without editing code. Draft changes stay private until you publish." />
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map(([title, href, description]) => (
          <CmsCard key={href} title={title} description={description}>
            <Link href={href} className="inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-sm text-white/80 hover:border-cyan-100/40 hover:text-white">
              Open editor
            </Link>
          </CmsCard>
        ))}
      </div>
    </>
  );
}
