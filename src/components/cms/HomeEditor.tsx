"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { publishHomepage, saveHero, saveHomeSectionItems } from "@/actions/cms/home";
import { CmsCard } from "@/components/cms/CmsShell";
import { PartnersEditor } from "@/components/cms/CollectionEditors";
import { Field, ItemToolbar, JsonListEditor, SubmitBar } from "@/components/cms/FormControls";
import { ImageUpload } from "@/components/cms/ImageUpload";
import { VideoUpload } from "@/components/cms/VideoUpload";
import { defaultHomeSections } from "@/lib/cms/fallbacks";
import type { CmsCarouselImage, CmsFeature, CmsHomeContent } from "@/lib/cms/types";

const sectionOptions = [
  { id: "creative-formats", label: "Creative formats", help: "Shows examples of the work Innovmark creates." },
  { id: "brand-marquee", label: "Brand marquee", help: "The moving brand-style strip." },
  { id: "stats", label: "Stats band", help: "Numbers and quick trust signals." },
  { id: "saad-belkaadi", label: "Saad Belkaadi", help: "Founder or personality teaser section." },
  { id: "capabilities", label: "Services preview", help: "Cards that guide visitors to deeper pages." },
  { id: "partners", label: "Partners", help: "Premium partner logo carousel shown between Services and Testimonials." },
  { id: "testimonials", label: "Testimonials preview", help: "Client quotes and trust proof." },
  { id: "pricing", label: "Packages preview", help: "Premium engagement/package cards." },
  { id: "cta", label: "CTA section", help: "Final call-to-action before the footer." },
];

function clampTilt(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(20, Math.max(-20, value));
}

function TiltInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const [text, setText] = useState(String(clampTilt(value)));

  useEffect(() => {
    setText(String(clampTilt(value)));
  }, [value]);

  function commit(raw: string) {
    const next = clampTilt(Number(raw));
    setText(String(next));
    onChange(next);
  }

  return (
    <input
      type="number"
      min={-20}
      max={20}
      step={1}
      value={text}
      onChange={(event) => {
        const raw = event.target.value;
        setText(raw);
        const numericValue = Number(raw);
        if (raw !== "" && raw !== "-" && Number.isFinite(numericValue)) {
          onChange(clampTilt(numericValue));
        }
      }}
      onBlur={(event) => commit(event.target.value)}
      className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none"
    />
  );
}

function StepHeader({ number, title, help, children }: { number: string; title: string; help: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div className="flex gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan-100/20 bg-cyan-100/10 text-sm text-cyan-100">{number}</span>
        <div>
          <h3 className="text-xl font-light tracking-tight text-white">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/58">{help}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "cyan" | "amber" | "emerald" }) {
  const classes = {
    neutral: "border-white/12 bg-white/[0.06] text-white/64",
    cyan: "border-cyan-100/20 bg-cyan-100/10 text-cyan-100",
    amber: "border-amber-100/20 bg-amber-200/10 text-amber-100",
    emerald: "border-emerald-100/20 bg-emerald-300/10 text-emerald-100",
  };
  return <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${classes[tone]}`}>{children}</span>;
}

export function HomeEditor({ content }: { content: CmsHomeContent }) {
  const [toast, setToast] = useState<{ message: string; ok: boolean } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [heroVideoUrl, setHeroVideoUrl] = useState(content.hero.heroVideoUrl ?? content.hero.backgroundVideoUrl ?? "");
  const sectionItems = useMemo(
    () => (content.sections.length ? content.sections : defaultHomeSections).map((id) => ({ id })),
    [content.sections],
  );

  function showToast(message: string, ok = true) {
    setToast({ message, ok });
    window.setTimeout(() => setToast(null), 3600);
  }

  return (
    <div className="grid gap-6">
      {toast && (
        <div className={`fixed right-5 top-5 z-[60] rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl ${
          toast.ok ? "border-emerald-200/20 bg-emerald-400/10 text-emerald-100" : "border-red-200/20 bg-red-500/10 text-red-100"
        }`}>
          {toast.message}
        </div>
      )}

      <div className="sticky top-4 z-30 flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-black/54 p-2 shadow-2xl backdrop-blur-xl">
        {[
          ["#hero-panel", "Hero"],
          ["#partners-panel", "Partners"],
          ["#sections-panel", "Homepage parts"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/62 transition hover:border-cyan-100/40 hover:text-white">
            {label}
          </a>
        ))}
      </div>

      <form className="grid gap-6" noValidate onChange={() => setDirty(true)}>
        <input type="hidden" name="locale" value={content.locale} />
        <input type="hidden" name="heroVideoUrl" value={heroVideoUrl} />

        <CmsCard title="Hero Section" description="This is the first text visitors see on the homepage. Keep it clear, emotional, and direct.">
          <div id="hero-panel" className="scroll-mt-24" />
          <StepHeader number="01" title="Hero Section" help="Edit the main headline, subtitle, short description, and the small feature promises under the buttons.">
            <div className="flex flex-wrap gap-2">
              <Badge tone="cyan">Draft</Badge>
              {dirty && <Badge tone="amber">Unsaved changes</Badge>}
            </div>
          </StepHeader>
          <div className="grid gap-4">
            <Field label="Main hero title" name="title" defaultValue={content.hero.title} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Hero subtitle" name="eyebrow" defaultValue={content.hero.eyebrow} />
              <Field label="WhatsApp message" name="whatsappMessage" defaultValue={content.hero.whatsappMessage} />
            </div>
            <Field label="Short hero description" name="description" defaultValue={content.hero.description} as="textarea" />
            <div>
              <div className="mb-3 text-sm text-white/74">Feature notes under the hero</div>
              <JsonListEditor<CmsFeature>
                name="features"
                initial={content.hero.features}
                emptyItem={{ title: "New feature", description: "Short description" }}
                renderItem={(item, _, update, remove, move) => (
                  <>
                    <ItemToolbar onRemove={remove} onMove={move} />
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-sm text-white/70">
                        Feature title
                        <input value={item.title} onChange={(event) => update({ title: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                      </label>
                      <label className="text-sm text-white/70">
                        Feature description
                        <input value={item.description} onChange={(event) => update({ description: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                      </label>
                    </div>
                  </>
                )}
              />
            </div>
          </div>
        </CmsCard>

        <CmsCard title="Hero Media: Image / Video" description="Upload the main video shown behind the hero. If no video is selected, the homepage safely uses the gallery images.">
          <StepHeader number="02" title="Hero Media" help="Add a hero video when you want movement. Leave it empty if you prefer the current cinematic image gallery." />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <VideoUpload value={heroVideoUrl} onChange={(url) => { setHeroVideoUrl(url); setDirty(true); }} onMessage={showToast} />
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="text-sm font-medium text-white/82">Preview rule</div>
              <p className="mt-2 text-sm leading-6 text-white/54">
                If a hero video exists, it appears as a subtle cinematic background. If not, the homepage uses the gallery images. If the gallery is empty, fallback images are used automatically.
              </p>
            </div>
          </div>
        </CmsCard>

        <CmsCard title="Carousel Images" description="These are the gallery images that rotate in the hero. You can upload from your computer, choose from the media library, or paste a remote URL.">
          <StepHeader number="03" title="Gallery images" help="Use 3 to 8 strong images when possible. Empty galleries are safe: the homepage falls back to default images instead of crashing." />
          <JsonListEditor<CmsCarouselImage>
            name="carouselImages"
            initial={content.hero.carouselImages}
            emptyItem={{ id: "new-image", src: "", alt: "New image", rotation: 0 }}
            renderItem={(item, _, update, remove, move) => (
              <>
                <ItemToolbar onRemove={remove} onMove={move} />
                <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
                  <ImageUpload
                    value={item.src}
                    alt={item.alt}
                    onMessage={showToast}
                    onChange={(src) => {
                      update({ src, id: item.id === "new-image" ? `hero-${Date.now()}` : item.id });
                      setDirty(true);
                    }}
                  />
                  <div className="grid content-start gap-3">
                    <label className="block text-sm text-white/74">
                      Image description
                      <input value={item.alt} onChange={(event) => update({ alt: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none" />
                    </label>
                    <label className="block text-sm text-white/74">
                      Card tilt
                      <TiltInput value={item.rotation} onChange={(rotation) => update({ rotation })} />
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-5 text-white/46">
                      Uploads are saved immediately to the media library. Click Save Draft to attach them to this homepage draft.
                    </div>
                  </div>
                </div>
              </>
            )}
          />
        </CmsCard>

        <CmsCard title="CTA Section" description="These buttons tell visitors what to do next. The first button usually goes to WhatsApp; the second can go to Contact.">
          <StepHeader number="04" title="Buttons" help="Use simple button text like “Request a quote” or “Contact us”. Links can be WhatsApp, contact page, email, or phone." />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Main button text" name="ctaLabel" defaultValue={content.hero.ctaLabel} />
            <Field label="Main button link" name="ctaHref" defaultValue={content.hero.ctaHref} />
            <Field label="Second button text" name="secondaryCtaLabel" defaultValue={content.hero.secondaryCtaLabel} />
            <Field label="Second button link" name="secondaryCtaHref" defaultValue={content.hero.secondaryCtaHref} />
          </div>
        </CmsCard>

        <CmsCard title="Services Preview" description="A quick preview of the service cards currently used on the homepage and services page.">
          <StepHeader number="05" title="Services Preview" help="To edit service names, descriptions, order, or visibility, open the Services editor." />
          <div className="grid gap-3 md:grid-cols-3">
            {content.services.slice(0, 3).map((service) => (
              <div key={service.slug} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm text-white">{service.title}</div>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/52">{service.description}</p>
              </div>
            ))}
          </div>
          <Link href="/admin/content/services" className="mt-4 inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-sm text-white/78 hover:border-cyan-100/40 hover:text-white">
            Edit services
          </Link>
        </CmsCard>

        <CmsCard title="Testimonials Preview" description="A quick look at the client quotes that appear on the homepage.">
          <StepHeader number="06" title="Testimonials Preview" help="To edit quotes, names, ratings, order, or visibility, open the Testimonials editor." />
          <div className="grid gap-3 md:grid-cols-2">
            {content.testimonials.slice(0, 2).map((item) => (
              <div key={`${item.name}-${item.role}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="line-clamp-3 text-sm leading-6 text-white/70">“{item.quote}”</p>
                <div className="mt-3 text-xs uppercase tracking-[0.18em] text-white/42">{item.name}</div>
              </div>
            ))}
          </div>
          <Link href="/admin/content/testimonials" className="mt-4 inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-sm text-white/78 hover:border-cyan-100/40 hover:text-white">
            Edit testimonials
          </Link>
        </CmsCard>

        <CmsCard title="SEO Basics" description="This controls how the homepage looks in Google and social previews.">
          <StepHeader number="07" title="SEO Basics" help="The homepage editor shows the current SEO values. Open the SEO editor to change them safely." />
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm text-white">{content.seo.title}</div>
            <p className="mt-2 text-sm leading-6 text-white/58">{content.seo.description}</p>
            {content.seo.keywords.length > 0 && <div className="mt-3 text-xs text-white/42">{content.seo.keywords.join(", ")}</div>}
          </div>
          <Link href="/admin/content/seo" className="mt-4 inline-flex min-h-10 items-center rounded-full border border-white/15 px-4 text-sm text-white/78 hover:border-cyan-100/40 hover:text-white">
            Edit SEO
          </Link>
        </CmsCard>

        <CmsCard title="Publish Settings" description="Save keeps changes private. Publish makes the latest draft live instantly. Optional empty media fields use safe fallbacks.">
          <StepHeader number="08" title="Publish Settings" help="Use Save Draft while editing. Use Publish when the page is ready for visitors." >
            <div className="flex flex-wrap gap-2">
              <Badge tone="cyan">Draft</Badge>
              <Badge tone="emerald">Published fallback safe</Badge>
              {dirty && <Badge tone="amber">Unsaved changes</Badge>}
            </div>
          </StepHeader>
          <SubmitBar action={saveHero} publishAction={publishHomepage} />
        </CmsCard>
      </form>

      <div id="partners-panel" className="scroll-mt-24">
        <PartnersEditor content={content} onMessage={showToast} />
      </div>

      <CmsCard title="Homepage Parts" description="Choose which homepage sections are shown and in what order. This is separate from the hero draft above.">
        <div id="sections-panel" className="scroll-mt-24" />
        <form>
          <input type="hidden" name="locale" value={content.locale} />
          <JsonListEditor<Record<string, string>>
            name="sectionItems"
            initial={sectionItems}
            emptyItem={{ id: "cta" }}
            renderItem={(item, _, update, remove, move) => {
              const selected = sectionOptions.find((option) => option.id === item.id);
              return (
                <>
                  <ItemToolbar onRemove={remove} onMove={move} />
                  <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_2fr]">
                    <label className="text-sm text-white/70">
                      Homepage part
                      <select value={item.id} onChange={(event) => update({ id: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-white outline-none">
                        {sectionOptions.map((option) => (
                          <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/54">
                      {selected?.help ?? "Choose a homepage part from the list."}
                    </div>
                  </div>
                </>
              );
            }}
          />
          <SubmitBar action={saveHomeSectionItems} publishAction={publishHomepage} label="Save section order" />
        </form>
      </CmsCard>
    </div>
  );
}
