"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PortfolioFilter = "Tous" | "Branding" | "Vidéo" | "Réseaux sociaux" | "Publicité" | "Sites web";
const INITIAL_MOBILE_COUNT = 1;

type FormatItem = {
  label: string;
  category: string;
  result: string;
  tag: string;
  filter: PortfolioFilter;
};

type MobileFormat = {
  fmt: FormatItem;
  originalIndex: number;
};

type CardVisualConfig = {
  image: string;
};

function MobilePortfolioCard({
  label,
  category,
  result,
  tag,
  image,
  index,
  projectLink,
  href,
}: {
  label: string;
  category: string;
  result: string;
  tag: string;
  image: string;
  index: number;
  projectLink: string;
  href: string;
}) {
  return (
    <article
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_14px_42px_-30px_rgba(15,23,42,0.42)] transition duration-300"
      style={{ transitionDelay: `${index * 45}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={`${category} - ${label}`}
          fill
          sizes="100vw"
          className="h-full w-full object-cover"
          draggable={false}
          loading="lazy"
          decoding="async"
          quality={70}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2 gap-y-1.5">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">
            {category}
          </span>
          <span className="text-xs font-medium text-blue-700">{result}</span>
        </div>

        <h3 className="mt-3 text-lg font-light leading-snug tracking-tight text-slate-950">
          {label}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{tag}</p>

        <div className="mt-auto pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition duration-300 hover:gap-3 hover:text-blue-700"
          >
            {projectLink}
            <span aria-hidden className="rtl-arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CreativeFormatsMobile({
  formats,
  cardConfigs,
  filters,
  lang,
  moreProjectsLabel,
  projectLink,
  projectHref,
}: {
  formats: MobileFormat[];
  cardConfigs: CardVisualConfig[];
  filters: PortfolioFilter[];
  lang: string;
  moreProjectsLabel: string;
  projectLink: string;
  projectHref: string;
}) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("Tous");
  const [showMore, setShowMore] = useState(false);
  const filteredFormats = formats.filter(
    ({ fmt }) => activeFilter === "Tous" || fmt.filter === activeFilter,
  );
  const visibleFormats = activeFilter === "Tous" && !showMore
    ? filteredFormats.slice(0, INITIAL_MOBILE_COUNT)
    : filteredFormats;
  const canShowMore = activeFilter === "Tous" && visibleFormats.length < filteredFormats.length;
  const filterLabel = (filter: PortfolioFilter) => {
    if (filter === "Tous" && lang === "en") return "All";
    if (filter === "Sites web") return "Site web";
    return filter;
  };

  return (
    <>
      <div className="-mx-4 mt-6 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full items-center gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setShowMore(false);
                }}
                className={`min-h-10 shrink-0 rounded-full border px-3.5 text-[11px] font-medium tracking-[0.04em] transition duration-300 ${
                  isActive
                    ? "border-blue-300 bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.22)]"
                    : "border-slate-200 bg-white text-slate-600 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.45)]"
                }`}
                aria-pressed={isActive}
              >
                {filterLabel(filter)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 items-stretch gap-5 md:hidden">
        {visibleFormats.map(({ fmt, originalIndex }, i) => (
          <MobilePortfolioCard
            key={fmt.label}
            label={fmt.label}
            category={fmt.category}
            result={fmt.result}
            tag={fmt.tag}
            image={cardConfigs[originalIndex]!.image}
            index={i + 1}
            projectLink={projectLink}
            href={projectHref}
          />
        ))}
      </div>

      {canShowMore && (
        <div className="mt-6 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200/80 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 shadow-[0_16px_36px_rgba(15,23,42,0.08)] transition duration-300 active:scale-[0.98]"
          >
            {moreProjectsLabel}
            <span aria-hidden className="rtl-arrow">→</span>
          </button>
        </div>
      )}
    </>
  );
}
