"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Lightweight scroll-reveal: adds .is-visible to any element with .reveal-on-scroll
 * when it enters the viewport. One IntersectionObserver, zero per-element listeners.
 * No-op for users with prefers-reduced-motion.
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const revealVisibleNow = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportHeight - 24 && rect.bottom > 0) {
        el.classList.add("is-visible");
        return true;
      }
      return false;
    };

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document
        .querySelectorAll(".reveal-on-scroll")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");

    elements.forEach((el) => {
      if (!revealVisibleNow(el)) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
