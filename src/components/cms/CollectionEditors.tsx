"use client";

import { publishHomepage, savePartners, saveSeo, saveServices, saveTestimonials } from "@/actions/cms/home";
import { CmsCard } from "@/components/cms/CmsShell";
import { Field, ItemToolbar, JsonListEditor, SubmitBar } from "@/components/cms/FormControls";
import { ImageUpload } from "@/components/cms/ImageUpload";
import type { CmsHomeContent, CmsPartner, CmsService, CmsTestimonial } from "@/lib/cms/types";

export function ServicesEditor({ content }: { content: CmsHomeContent }) {
  return (
    <CmsCard title="Services" description="Drag-style ordering with Up/Down controls, visibility toggles and editable cards.">
      <form>
        <input type="hidden" name="locale" value={content.locale} />
        <JsonListEditor<CmsService>
          name="items"
          initial={content.services}
          emptyItem={{ slug: "new-service", title: "New service", description: "Service description", icon: "Sparkles", tone: "cyan", isActive: true, sortOrder: content.services.length }}
          renderItem={(item, _, update, remove, move) => (
            <>
              <ItemToolbar onRemove={remove} onMove={move} />
              <div className="grid gap-3 md:grid-cols-2">
                <input value={item.title} onChange={(event) => update({ title: event.target.value })} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                <input value={item.slug} onChange={(event) => update({ slug: event.target.value })} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                <input value={item.icon} onChange={(event) => update({ icon: event.target.value })} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                <select value={item.tone} onChange={(event) => update({ tone: event.target.value as CmsService["tone"] })} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none">
                  <option value="cyan">Cyan</option>
                  <option value="violet">Violet</option>
                  <option value="emerald">Emerald</option>
                </select>
                <textarea value={item.description} onChange={(event) => update({ description: event.target.value })} rows={4} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none md:col-span-2" />
                <label className="flex items-center gap-3 text-sm text-white/70">
                  <input type="checkbox" checked={item.isActive} onChange={(event) => update({ isActive: event.target.checked })} />
                  Active
                </label>
              </div>
            </>
          )}
        />
        <SubmitBar action={saveServices} publishAction={publishHomepage} />
      </form>
    </CmsCard>
  );
}

export function PartnersEditor({ content, onMessage }: { content: CmsHomeContent; onMessage?: (message: string, ok?: boolean) => void }) {
  return (
    <CmsCard title="Partners" description="Add partner logos, links, descriptions, visibility and drag-and-drop order for the homepage carousel.">
      <form>
        <input type="hidden" name="locale" value={content.locale} />
        <JsonListEditor<CmsPartner>
          name="items"
          initial={content.partners}
          emptyItem={{ name: "New partner", logoUrl: "", websiteUrl: "https://example.com", description: "", isActive: true, order: content.partners.length }}
          renderItem={(item, _, update, remove, move) => (
            <>
              <ItemToolbar onRemove={remove} onMove={move} />
              <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
                <ImageUpload
                  value={item.logoUrl}
                  alt={item.name}
                  onChange={(logoUrl) => update({ logoUrl })}
                  onMessage={onMessage}
                />
                <div className="grid content-start gap-3 md:grid-cols-2">
                  <label className="block text-sm text-white/74">
                    Partner name
                    <input value={item.name} onChange={(event) => update({ name: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                  </label>
                  <label className="block text-sm text-white/74">
                    Website URL
                    <input value={item.websiteUrl} onChange={(event) => update({ websiteUrl: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                  </label>
                  <label className="block text-sm text-white/74 md:col-span-2">
                    Short description
                    <textarea value={item.description ?? ""} onChange={(event) => update({ description: event.target.value })} rows={3} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                  </label>
                  <label className="flex items-center gap-3 text-sm text-white/70">
                    <input type="checkbox" checked={item.isActive} onChange={(event) => update({ isActive: event.target.checked })} />
                    Active on homepage
                  </label>
                </div>
              </div>
            </>
          )}
        />
        <SubmitBar action={savePartners} publishAction={publishHomepage} />
      </form>
    </CmsCard>
  );
}

export function TestimonialsEditor({ content }: { content: CmsHomeContent }) {
  return (
    <CmsCard title="Testimonials" description="Manage quotes shown in the existing marquee.">
      <form>
        <input type="hidden" name="locale" value={content.locale} />
        <JsonListEditor<CmsTestimonial>
          name="items"
          initial={content.testimonials}
          emptyItem={{ quote: "Client quote", name: "Client name", role: "Role · Company", rating: 5, isActive: true, sortOrder: content.testimonials.length }}
          renderItem={(item, _, update, remove, move) => (
            <>
              <ItemToolbar onRemove={remove} onMove={move} />
              <div className="grid gap-3 md:grid-cols-2">
                <input value={item.name} onChange={(event) => update({ name: event.target.value })} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                <input value={item.role} onChange={(event) => update({ role: event.target.value })} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                <textarea value={item.quote} onChange={(event) => update({ quote: event.target.value })} rows={4} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none md:col-span-2" />
                <input type="number" min={1} max={5} value={item.rating} onChange={(event) => update({ rating: Number(event.target.value) })} className="rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                <label className="flex items-center gap-3 text-sm text-white/70">
                  <input type="checkbox" checked={item.isActive} onChange={(event) => update({ isActive: event.target.checked })} />
                  Active
                </label>
              </div>
            </>
          )}
        />
        <SubmitBar action={saveTestimonials} publishAction={publishHomepage} />
      </form>
    </CmsCard>
  );
}

export function SeoEditor({ content }: { content: CmsHomeContent }) {
  return (
    <CmsCard title="SEO metadata" description="Homepage metadata that publishes without a redeploy.">
      <form className="grid gap-4">
        <input type="hidden" name="locale" value={content.locale} />
        <Field label="Page title" name="title" defaultValue={content.seo.title} />
        <Field label="Meta description" name="description" defaultValue={content.seo.description} as="textarea" rows={3} />
        <Field label="Keywords (comma separated)" name="keywords" defaultValue={content.seo.keywords.join(", ")} />
        <Field label="OG image URL" name="ogImage" defaultValue={content.seo.ogImage ?? ""} />
        <label className="flex items-center gap-3 text-sm text-white/70">
          <input type="checkbox" name="noIndex" value="true" defaultChecked={content.seo.noIndex} />
          No index
        </label>
        <label className="block text-sm text-white/74">
          Structured data JSON
          <textarea name="structuredData" defaultValue={content.seo.structuredData ? JSON.stringify(content.seo.structuredData, null, 2) : ""} rows={8} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 font-mono text-sm text-white outline-none" />
        </label>
        <SubmitBar action={saveSeo} publishAction={publishHomepage} />
      </form>
    </CmsCard>
  );
}
