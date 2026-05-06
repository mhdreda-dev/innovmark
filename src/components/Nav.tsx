"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { type Locale, localizedHref } from "@/lib/i18n";

type NavLabels = {
  home: string;
  services: string;
  why: string;
  process: string;
  contact: string;
  cta: string;
  menu: string;
};

const defaultLabels: NavLabels = {
  home: "Accueil",
  services: "Services",
  why: "Pourquoi nous",
  process: "Processus",
  contact: "Contact",
  cta: "Démarrer un projet",
  menu: "Menu",
};

const languageLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "AR",
};

const locales: Locale[] = ["fr", "en", "ar"];

export default function Nav({
  labels = defaultLabels,
  locale,
}: {
  labels?: NavLabels;
  locale?: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const homeHref = locale ? `/${locale}` : "/";

  const links = [
    { href: homeHref, label: labels.home },
    { href: localizedHref("/services", locale), label: labels.services },
    { href: localizedHref("/pourquoi-nous", locale), label: labels.why },
    { href: localizedHref("/processus", locale), label: labels.process },
    { href: localizedHref("/contact", locale), label: labels.contact },
  ];
  const displayedLinks = locale === "ar" ? [...links].reverse() : links;

  /** Returns true when this nav item's route matches the current pathname. */
  const isActive = (href: string) => {
    if (!pathname) return false;
    // Home: exact match only (avoid matching every route starting with "/fr")
    if (href === homeHref) return pathname === homeHref || pathname === homeHref + "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocaleHref = (nextLocale: Locale) => {
    if (!pathname) return `/${nextLocale}`;
    const parts = pathname.split("/");
    if (locales.includes(parts[1] as Locale)) {
      parts[1] = nextLocale;
      return parts.join("/") || `/${nextLocale}`;
    }
    return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
  };

  return (
    <header
      className={`fixed top-3 left-3 right-3 z-50 rounded-2xl transition-all duration-500 ${
        scrolled
          ? "bg-black/52 backdrop-blur-2xl border border-white/16 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.04)_inset]"
          : "bg-white/[0.045] backdrop-blur-xl border border-white/10"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href={localizedHref("/#top", locale)} className="flex items-center gap-2.5 group cursor-pointer">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 opacity-70 animate-ping" />
            <span className="relative rounded-full bg-gradient-to-br from-cyan-200 to-violet-400 w-2 h-2 shadow-[0_0_16px_rgba(125,211,252,0.6)]" />
          </span>
          <span className="text-white text-[13px] tracking-[0.36em] uppercase font-light group-hover:text-white/90 transition-colors">
            Innovmark
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {displayedLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-white"
                    : "text-white/62 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex rounded-full border border-white/12 bg-white/[0.045] p-1">
            {locales.map((item) => (
              <Link
                key={item}
                href={switchLocaleHref(item)}
                className={`rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] transition ${
                  locale === item
                    ? "bg-white text-black"
                    : "text-white/58 hover:text-white"
                }`}
              >
                {languageLabels[item]}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href={localizedHref("/contact", locale)}
            className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/90 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black shadow-[0_8px_28px_rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-white hover:shadow-[0_12px_40px_rgba(125,211,252,0.22)] cursor-pointer"
          >
            {labels.cta}
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          aria-label={labels.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/14 bg-white/[0.06] cursor-pointer"
        >
          <span
            className={`block w-[18px] h-px bg-white transition-transform duration-300 origin-center ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[18px] h-px bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-[18px] h-px bg-white transition-transform duration-300 origin-center ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open
            ? "max-h-96 opacity-100 border-t border-white/10"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 py-5 flex flex-col gap-1">
          {displayedLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block text-sm tracking-[0.18em] uppercase py-2.5 border-b border-white/[0.06] transition-colors ${
                  isActive(l.href)
                    ? "text-white"
                    : "text-white/78 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-3">
            <Link
              href={localizedHref("/contact", locale)}
              className="block text-center text-[12px] font-semibold tracking-[0.18em] uppercase px-4 py-3.5 rounded-full bg-white text-black cursor-pointer"
            >
              {labels.cta}
            </Link>
          </li>
          <li className="mt-3 flex justify-center gap-2">
            {locales.map((item) => (
              <Link
                key={item}
                href={switchLocaleHref(item)}
                className={`rounded-full border border-white/12 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] transition ${
                  locale === item
                    ? "bg-white text-black"
                    : "bg-white/[0.04] text-white/68"
                }`}
              >
                {languageLabels[item]}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </header>
  );
}
