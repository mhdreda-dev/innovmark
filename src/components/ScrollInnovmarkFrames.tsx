"use client";

import { useCallback, useEffect, useRef } from "react";
import InfiniteBentoHeroBackground from "./InfiniteBentoHeroBackground";
import { type Locale, localizedHref } from "@/lib/i18n";

const WHATSAPP_NUMBER = "212771450503";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (start: number, end: number, value: number) => {
  const x = clamp01((value - start) / (end - start));
  return x * x * (3 - 2 * x);
};

const sceneOpacity = (
  progress: number,
  start: number,
  end: number,
  transition = 0.04
) => {
  const intro = smoothstep(start, start + transition, progress);
  const outro = 1 - smoothstep(end - transition, end, progress);
  return Math.min(intro, outro);
};

const sceneLocal = (progress: number, start: number, end: number) =>
  clamp01((progress - start) / (end - start));

type StoryScene = {
  zone: string;
  kicker: string;
  title: string;
  copy: string;
  stat: string;
  metric: string;
  card: "video" | "website" | "stock" | "brandGrowth";
  range: [number, number];
};

const scenes: StoryScene[] = [
  {
    zone: "15-45%",
    kicker: "Content engine",
    title: "Promotional Videos",
    copy: "Launch films, reels and paid-social cuts built to make the first three seconds impossible to ignore.",
    stat: "4K",
    metric: "Cinematic production",
    card: "video",
    range: [0.06, 0.40],
  },
  {
    zone: "40-70%",
    kicker: "Digital flagship",
    title: "Website Creation",
    copy: "Fast, polished websites with premium interaction design and a conversion path that feels intentional.",
    stat: "<1s",
    metric: "First impression",
    card: "website",
    range: [0.36, 0.68],
  },
  {
    zone: "65-95%",
    kicker: "Operations layer",
    title: "Stock Management",
    copy: "Inventory dashboards and workflows that keep sales, stock and teams moving from one clear source of truth.",
    stat: "Live",
    metric: "Inventory control",
    card: "stock",
    range: [0.64, 0.96],
  },
];

const arScenes: StoryScene[] = [
  {
    zone: "15-45%",
    kicker: "محرك المحتوى",
    title: "فيديوهات ترويجية",
    copy: "أفلام إطلاق وريلز ومقاطع إعلانية مصممة لتجعل الثواني الأولى مستحيلة التجاهل.",
    stat: "4K",
    metric: "إنتاج سينمائي",
    card: "video",
    range: [0.06, 0.40],
  },
  {
    zone: "40-70%",
    kicker: "واجهة رقمية",
    title: "إنشاء المواقع",
    copy: "مواقع سريعة ومصقولة بتفاعل راق ومسار تحويل واضح يشعر الزائر أنه مقصود.",
    stat: "<1s",
    metric: "الانطباع الأول",
    card: "website",
    range: [0.36, 0.68],
  },
  {
    zone: "65-95%",
    kicker: "طبقة التشغيل",
    title: "إدارة المخزون",
    copy: "لوحات تحكم وسير عمل تساعد المبيعات والمخزون والفِرق على العمل من مصدر واحد واضح.",
    stat: "Live",
    metric: "تحكم بالمخزون",
    card: "stock",
    range: [0.64, 0.96],
  },
];

interface ScrollInnovmarkFramesProps {
  totalFrames: number;
  scrollHeight?: string;
  framePath?: string;
  frameExt?: string;
  framePad?: number;
  mobileBreakpoint?: number;
  locale?: Locale;
}

export default function ScrollInnovmarkFrames({
  totalFrames,
  scrollHeight,
  framePath = "/innovmark-frames",
  frameExt = "webp",
  framePad = 4,
  mobileBreakpoint = 768,
  locale,
}: ScrollInnovmarkFramesProps) {
  const isArabic = locale === "ar";
  const displayedScenes = isArabic ? arScenes : scenes;
  const quoteMessage = encodeURIComponent(
    isArabic
      ? "مرحباً INNOVMARK، أود الحصول على عرض سعر لمشروعي."
      : "Hello INNOVMARK, I would like a quote for my project."
  );
  const contactHref = localizedHref("/contact", locale);
  const servicesHref = localizedHref("/services", locale);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const heroContactPanelRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mockupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentFrameRef = useRef(-1);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const readyRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const pad = useCallback(
    (n: number) => String(n).padStart(framePad, "0"),
    [framePad]
  );

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;

      let resolved = index;
      if (!loadedRef.current[resolved]) {
        let lo = index;
        let hi = index;
        while (lo >= 0 || hi < totalFrames) {
          if (lo >= 0 && loadedRef.current[lo]) {
            resolved = lo;
            break;
          }
          if (hi < totalFrames && loadedRef.current[hi]) {
            resolved = hi;
            break;
          }
          lo--;
          hi++;
        }
      }

      const img = imagesRef.current[resolved];
      if (!img || !img.complete || !img.naturalWidth) return;

      const { naturalWidth: iw, naturalHeight: ih } = img;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = "#02030a";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
      currentFrameRef.current = resolved;
    },
    [totalFrames]
  );

  const updateScene = useCallback((progress: number) => {
    const isMobile = window.innerWidth < mobileBreakpoint;
    const heroOut = isMobile
      ? smoothstep(0.045, 0.12, progress)
      : smoothstep(0.07, 0.18, progress);
    const finalLift = smoothstep(0.64, 1, progress);

    if (heroRef.current) {
      heroRef.current.style.opacity = String(1 - heroOut);
      heroRef.current.style.transform = `translate3d(0, ${-42 * heroOut}px, ${
        80 * heroOut
      }px) scale(${1 - heroOut * 0.04})`;
      heroRef.current.style.pointerEvents = heroOut > 0.85 ? "none" : "auto";
    }

    if (heroLogoRef.current) {
      heroLogoRef.current.style.transform = `translate3d(${
        -16 * heroOut
      }px, ${-10 * progress}px, 0) rotateX(${4 * progress}deg)`;
    }

    if (heroContactPanelRef.current) {
      heroContactPanelRef.current.style.opacity = String(1 - heroOut);
      heroContactPanelRef.current.style.transform = `translate3d(${18 * heroOut}px, ${
        -20 * heroOut
      }px, 0) scale(${1 - heroOut * 0.035})`;
      heroContactPanelRef.current.style.pointerEvents =
        heroOut > 0.85 ? "none" : "auto";
    }

    if (canvasRef.current) {
      const frameDrift = smoothstep(0, 1, progress);
      const driftX = isMobile ? -8 + progress * 16 : -18 + progress * 36;
      const driftY = isMobile ? -4 + progress * 8 : -8 + progress * 18;
      const scale = isMobile
        ? 1.02 + frameDrift * 0.035
        : 1.08 + frameDrift * 0.08;
      canvasRef.current.style.transform = `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`;
      canvasRef.current.style.opacity = String(
        isMobile ? 0.36 + finalLift * 0.08 : 0.48 + finalLift * 0.1
      );
    }

    if (railRef.current) {
      railRef.current.style.transform = `translate3d(${progress * 44}px, ${
        -progress * 26
      }px, 0) rotate(${progress * 10}deg)`;
      railRef.current.style.opacity = String(
        isMobile ? 0.06 + progress * 0.08 : 0.18 + progress * 0.24
      );
    }

    if (glowLineRef.current) {
      glowLineRef.current.style.transform = `scaleX(${0.1 + progress * 0.9})`;
      glowLineRef.current.style.opacity = String(
        isMobile ? 0.04 + progress * 0.1 : 0.16 + progress * 0.5
      );
    }

    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 10));
    }

    displayedScenes.forEach((scene, index) => {
      const [start, end] = scene.range;
      const opacity = sceneOpacity(progress, start, end, isMobile ? 0.025 : 0.04);
      const local = sceneLocal(progress, start, end);
      const enterY = (isMobile ? 20 : 34) * (1 - smoothstep(0, 0.22, local));
      const exitY = (isMobile ? -16 : -28) * smoothstep(0.78, 1, local);

      const sceneEl = sceneRefs.current[index];
      if (sceneEl) {
        sceneEl.style.opacity = String(opacity);
        sceneEl.style.transform = `translate3d(0, ${enterY + exitY}px, 0)`;
        sceneEl.style.pointerEvents = opacity > 0.35 ? "auto" : "none";
      }

      const cardEl = cardRefs.current[index];
      if (cardEl) {
        cardEl.style.opacity = String(isMobile ? 0 : opacity);
        cardEl.style.transform = `translate3d(${56 - local * 96}px, ${
          48 - local * 70
        }px, ${76 * opacity}px) rotateX(${9 - local * 14}deg) rotateY(${
          -12 + local * 18
        }deg)`;
      }

      const mockupEl = mockupRefs.current[index];
      if (mockupEl) {
        const mockupOpacity = isMobile && index > 1 ? 0 : Math.max(0, opacity - 0.05);
        mockupEl.style.opacity = String(mockupOpacity);
        mockupEl.style.transform = `translate3d(${-30 + local * 58}px, ${
          -30 + local * 34
        }px, ${90 * mockupOpacity}px) rotateY(${10 - local * 18}deg) rotateX(${
          -5 + local * 8
        }deg)`;
      }

      const visualEl = visualRefs.current[index];
      if (visualEl) {
        const visualOpacity = isMobile ? 0 : Math.max(0, opacity - 0.02);
        visualEl.style.opacity = String(visualOpacity);
        visualEl.style.transform = `translate3d(${14 - local * 24}px, ${
          12 - local * 18
        }px, 0) scale(${0.975 + visualOpacity * 0.035}) rotateX(${
          2 - local * 3
        }deg) rotateY(${-3 + local * 5}deg)`;
      }
    });
  }, [displayedScenes, mobileBreakpoint]);

  const tick = useCallback(() => {
    rafRef.current = null;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    if (total <= 0) return;

    const progress = clamp01(-rect.top / total);
    const easedFrameProgress = smoothstep(0, 1, progress);
    const frameProgress = 0.04 + easedFrameProgress * 0.82;
    const target = Math.round(frameProgress * (totalFrames - 1));

    targetFrameRef.current = target;
    if (target !== currentFrameRef.current) drawFrame(target);
    updateScene(progress);
  }, [drawFrame, totalFrames, updateScene]);

  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isMobile = window.innerWidth < mobileBreakpoint;
    const dprCap = isMobile ? 1.4 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawFrame(currentFrameRef.current >= 0 ? currentFrameRef.current : 0);
    }
    onScroll();
  }, [drawFrame, mobileBreakpoint, onScroll]);

  const updateProgress = useCallback(
    (loaded: number) => {
      const pct = Math.round((loaded / totalFrames) * 100);
      if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;
      if (progressTextRef.current) progressTextRef.current.textContent = `${pct}%`;
    },
    [totalFrames]
  );

  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = "0";
      overlayRef.current.style.pointerEvents = "none";
      setTimeout(() => {
        if (overlayRef.current) overlayRef.current.style.display = "none";
      }, 600);
    }
    onScroll();
  }, [onScroll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d", { alpha: false });

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;

    const isMobile = window.innerWidth < mobileBreakpoint;
    const sizeDir = isMobile ? "sm" : "lg";
    imagesRef.current = Array(totalFrames).fill(null);
    loadedRef.current = Array(totalFrames).fill(false);

    let loaded = 0;
    let cancelled = false;
    const buildSrc = (i: number) =>
      `${framePath}/${sizeDir}/frame_${pad(i + 1)}.${frameExt}`;

    const loadOne = async (i: number, eager: boolean) => {
      if (cancelled || loadedRef.current[i]) return;
      const img = new window.Image();
      img.decoding = eager ? "sync" : "async";
      img.src = buildSrc(i);
      imagesRef.current[i] = img;
      try {
        await img.decode();
      } catch {
        // Keep loading the sequence even if one frame fails to decode.
      }
      if (cancelled) return;
      loadedRef.current[i] = true;
      loaded++;
      updateProgress(loaded);

      if (i === 0) {
        drawFrame(0);
        markReady();
      } else if (readyRef.current && i === targetFrameRef.current) {
        drawFrame(i);
      }
    };

    const queue: number[] = [0];
    const stride = 6;
    for (let i = stride; i < totalFrames; i += stride) queue.push(i);
    for (let i = 1; i < totalFrames; i++) {
      if (i % stride !== 0) queue.push(i);
    }

    const concurrency = isMobile ? 4 : 8;
    let cursor = 0;
    Array.from({ length: concurrency }, async () => {
      while (!cancelled && cursor < queue.length) {
        const idx = queue[cursor++];
        await loadOne(idx, idx === 0);
      }
    });

    const mqlListener = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    mql.addEventListener("change", mqlListener);

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);
    resizeCanvas();

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
      mql.removeEventListener("change", mqlListener);
      ro.disconnect();
    };
  }, [
    drawFrame,
    frameExt,
    framePath,
    markReady,
    mobileBreakpoint,
    onScroll,
    pad,
    resizeCanvas,
    totalFrames,
    updateProgress,
  ]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative h-[300vh] w-full bg-black lg:h-[380vh]"
      style={scrollHeight ? { height: scrollHeight } : undefined}
      dir="ltr"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#02030a]">
        <InfiniteBentoHeroBackground className="opacity-70 md:opacity-85" />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full will-change-transform"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.48)_42%,rgba(0,0,0,0.72)),linear-gradient(180deg,rgba(0,0,0,0.7),rgba(0,0,0,0.1)_42%,rgba(0,0,0,0.86))]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25 mix-blend-screen md:opacity-55"
          style={{
            background:
              "radial-gradient(circle at 76% 18%, rgba(45, 212, 191, 0.22), transparent 28%), radial-gradient(circle at 22% 74%, rgba(244, 114, 182, 0.14), transparent 28%)",
          }}
        />

        <div
          ref={railRef}
          aria-hidden="true"
          className="absolute right-[-10vw] top-[16vh] hidden h-[66vh] w-[42vw] rounded-[48%] border border-cyan-200/20 opacity-25 blur-[0.2px] will-change-transform md:block"
        />
        <div
          ref={glowLineRef}
          aria-hidden="true"
          className="absolute left-[8vw] top-[62vh] hidden h-px w-[54vw] origin-left bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent will-change-transform md:block"
        />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center px-6 pb-14 pt-24 [perspective:1200px] lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div
            ref={heroRef}
            className={`max-w-3xl will-change-transform max-md:self-start max-md:pt-5 ${isArabic ? "text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div
              ref={heroLogoRef}
              className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 backdrop-blur-md will-change-transform md:mb-6"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[11px] font-semibold tracking-tight text-black">
                IM
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.32em] text-white/78">
                INNOVMARK
              </span>
            </div>
            <h1 className="max-w-4xl text-[2.65rem] font-light leading-[1] tracking-normal text-white sm:text-6xl md:text-7xl lg:max-w-[760px] lg:text-[5.7rem] lg:leading-[0.92]">
              {isArabic ? "نموّ راق." : "Premium growth."}
              <br className="md:hidden" />
              <span className="md:hidden"> {isArabic ? "بتنفيذ أخف." : "Built lighter."}</span>
              <span className="hidden md:inline"> {isArabic ? "أنظمة تسويق تتحرك مع نمو علامتك." : "Marketing systems that move as you grow."}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 md:mt-7 md:text-lg md:leading-8 lg:mt-5">
              <span className="md:hidden">
                {isArabic ? "فيديوهات ومواقع وأنظمة علامة مصممة لتبدو راقية وتحوّل بوضوح." : "Video, websites and brand systems built to feel premium and convert clearly."}
              </span>
              <span className="hidden md:inline">
                {isArabic
                  ? "تجربة وكالة إبداعية فاخرة للفيديو والمواقع والهوية وأدوات المخزون وعمليات النمو."
                  : "A luxury creative agency experience for video, websites, identity, stock tools and growth operations."}
              </span>
            </p>

            <div className={`mt-6 flex w-full flex-col gap-3 sm:mt-10 sm:max-w-2xl sm:flex-row sm:flex-wrap lg:mt-6 ${isArabic ? "sm:flex-row-reverse" : ""}`}>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${quoteMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex min-h-11 w-full items-center justify-center overflow-hidden rounded-full bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-black shadow-[0_10px_32px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-[0_22px_80px_rgba(165,243,252,0.22)] md:min-h-14 md:py-4 md:text-xs md:tracking-[0.18em] sm:w-auto sm:px-7"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <span className="relative">{isArabic ? "اطلب عرض سعر" : "Request a Quote"}</span>
              </a>
              <a
                href={contactHref}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cyan-100/24 bg-cyan-100/[0.08] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-50 shadow-[0_8px_28px_rgba(8,145,178,0.1)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-100/50 hover:bg-cyan-100/[0.14] hover:text-white md:min-h-14 md:py-4 md:text-xs md:tracking-[0.18em] md:backdrop-blur-xl sm:w-auto sm:px-7"
              >
                {isArabic ? "ابدأ مشروعك" : "Start Your Project"}
              </a>
            </div>

            <div className={`mt-5 hidden flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.22em] text-white/48 md:flex sm:gap-x-5 lg:mt-4 ${isArabic ? "justify-end" : ""}`}>
              <span>{isArabic ? "رد سريع" : "Fast response"}</span>
              <span className="text-cyan-100/55">•</span>
              <span>{isArabic ? "جودة راقية" : "Premium quality"}</span>
              <span className="text-cyan-100/55">•</span>
              <span>{isArabic ? "المغرب + دولياً" : "Morocco + International"}</span>
            </div>

            <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-2 rounded-[1rem] border border-white/10 bg-black/20 p-2 shadow-[0_8px_28px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:mt-5 sm:grid-cols-2 md:backdrop-blur-2xl lg:hidden">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${quoteMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.9rem] bg-[#25D366]/10 px-2.5 py-2 text-xs text-white/82 transition-all duration-300 hover:bg-white/[0.07] hover:text-white sm:justify-start lg:min-h-9 lg:rounded-full lg:px-3.5 lg:py-2 lg:text-[11px]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#25D366]/14 text-[#75f0a2] ring-1 ring-[#25D366]/20 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                  </svg>
                </span>
                <span className="font-medium leading-none">{isArabic ? "واتساب: 0771450503" : "WhatsApp: 0771450503"}</span>
              </a>
              <a
                href="tel:+212771450503"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.9rem] px-2.5 py-2 text-xs text-white/76 transition-all duration-300 hover:bg-white/[0.07] hover:text-white sm:justify-start lg:min-h-9 lg:rounded-full lg:px-3.5 lg:py-2 lg:text-[11px]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/9 text-white ring-1 ring-white/14 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-3.5 w-3.5">
                    <path d="M7 4h3l1.5 4-2 1.2a11 11 0 0 0 5.3 5.3l1.2-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 7 4Z" />
                  </svg>
                </span>
                <span className="font-medium leading-none">{isArabic ? "اتصال: 0771450503" : "Call: 0771450503"}</span>
              </a>
              <a
                href="mailto:contact@innovmark.ma"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.9rem] px-2.5 py-2 text-xs text-white/76 transition-all duration-300 hover:bg-white/[0.07] hover:text-white sm:col-span-2 sm:justify-start lg:col-span-1 lg:min-h-9 lg:rounded-full lg:px-3.5 lg:py-2 lg:text-[11px]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-100/10 text-cyan-100 ring-1 ring-cyan-100/16 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-3.5 w-3.5">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <span className="truncate font-medium leading-none">contact@innovmark.ma</span>
              </a>
              <div className="hidden min-h-9 items-center justify-center gap-2 rounded-[0.9rem] border border-emerald-200/10 bg-emerald-200/[0.045] px-2.5 py-2 text-[11px] text-emerald-50/82 sm:col-span-2 sm:inline-flex lg:col-span-1 lg:rounded-full lg:px-3.5 lg:py-2">
                <span className="relative grid h-2.5 w-2.5 shrink-0 place-items-center rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.75)]" />
                <span className="font-medium leading-none">{isArabic ? "رد سريع خلال أقل من 1 ساعة" : "Fast reply in under 1 hour"}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={heroContactPanelRef}
          className="absolute bottom-24 right-10 z-20 hidden w-[320px] will-change-transform lg:block"
        >
          <div className="rounded-3xl border border-white/10 bg-black/32 p-3 shadow-[0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                {isArabic ? "تواصل مباشر" : "Direct contact"}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
            </div>
            <div className="grid gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${quoteMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.045] px-4 py-3 text-left text-white/80 transition-all duration-300 hover:border-[#25D366]/24 hover:bg-[#25D366]/10 hover:text-white hover:shadow-[0_0_34px_rgba(37,211,102,0.12)]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25D366]/14 text-[#75f0a2] ring-1 ring-[#25D366]/20 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.4-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-white/42">
                    WhatsApp
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white">
                    0771450503
                  </span>
                </span>
              </a>
              <a
                href="tel:+212771450503"
                className="group inline-flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.045] px-4 py-3 text-left text-white/80 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.075] hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/9 text-white ring-1 ring-white/14 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                    <path d="M7 4h3l1.5 4-2 1.2a11 11 0 0 0 5.3 5.3l1.2-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 7 4Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-white/42">
                    {isArabic ? "اتصل بنا" : "Call Us"}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white">
                    0771450503
                  </span>
                </span>
              </a>
              <a
                href="mailto:contact@innovmark.ma"
                className="group inline-flex min-h-14 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.045] px-4 py-3 text-left text-white/80 transition-all duration-300 hover:border-cyan-100/22 hover:bg-cyan-100/[0.08] hover:text-white hover:shadow-[0_0_30px_rgba(165,243,252,0.1)]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cyan-100/10 text-cyan-100 ring-1 ring-cyan-100/16 transition-transform group-hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-white/42">
                    Email
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white">
                    contact@innovmark.ma
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none fixed inset-0 z-30 [perspective:1200px]">
          {displayedScenes.map((scene, index) => (
            <div key={scene.title}>
              <div
                ref={(node) => {
                  visualRefs.current[index] = node;
                }}
                data-testid={`story-visual-${index}`}
                className="absolute inset-0 opacity-0 will-change-transform"
                aria-hidden="true"
              >
                <SceneVisualIdentity type={scene.card} />
              </div>

              <div
                ref={(node) => {
                  sceneRefs.current[index] = node;
                }}
                data-testid={`story-scene-${index}`}
                className={`absolute left-4 top-24 max-w-[min(760px,calc(100vw-2rem))] opacity-0 will-change-transform sm:left-8 sm:top-32 lg:left-[7vw] lg:top-1/4 ${isArabic ? "text-right" : ""}`}
                dir={isArabic ? "rtl" : "ltr"}
              >
                <div className={`mb-3 flex items-center gap-3 md:mb-4 ${isArabic ? "flex-row-reverse" : ""}`}>
                  <span className="h-px w-10 bg-cyan-200/80" />
                  <span className="text-[10px] uppercase tracking-[0.38em] text-cyan-100/70">
                    {String(index + 1).padStart(2, "0")} / {scene.title}
                  </span>
                </div>
                <div className={`mb-4 hidden items-center gap-3 md:flex ${isArabic ? "flex-row-reverse" : ""}`}>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/34">
                    {scene.kicker}
                  </span>
                  <span className="h-px w-8 bg-white/14" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/28">
                    {scene.zone}
                  </span>
                </div>
                <h2 className="text-[2.35rem] font-light leading-[1] tracking-normal text-white sm:text-6xl lg:text-[6.4rem]">
                  {scene.title}
                </h2>
                <p className="mt-4 max-w-[22rem] text-sm leading-6 text-white/68 sm:text-base md:mt-6 md:text-lg md:leading-8">
                  {scene.copy}
                </p>
              </div>

              <div
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                data-testid={`story-card-${index}`}
                className="absolute right-4 top-[17vh] hidden w-[260px] rounded-lg border border-white/14 bg-white/[0.075] p-4 opacity-0 shadow-[0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl will-change-transform sm:block lg:right-[12vw] lg:top-[20vh] lg:w-[310px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.26em] text-white/48">
                    {scene.metric}
                  </span>
                  <span className="rounded-full bg-cyan-200/14 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100">
                    Live
                  </span>
                </div>
                <div className="mt-6 text-5xl font-light tracking-normal text-white">
                  {scene.stat}
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200"
                    style={{ width: `${58 + index * 8}%` }}
                  />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((item) => (
                    <span
                      key={item}
                      className="h-14 rounded-md border border-white/10 bg-white/[0.055]"
                    />
                  ))}
                </div>
              </div>

              <div
                ref={(node) => {
                  mockupRefs.current[index] = node;
                }}
                data-testid={`story-mockup-${index}`}
                className={`absolute bottom-[9vh] right-4 w-[min(78vw,340px)] opacity-0 will-change-transform sm:w-[min(86vw,430px)] lg:bottom-[13vh] lg:right-[8vw] ${index > 1 ? "max-md:hidden" : ""}`}
              >
                <SceneMockup type={scene.card} />
              </div>
            </div>
          ))}
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-300"
        >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">
            {isArabic ? "مرّر" : "Scroll"}
          </span>
          <span className="block h-8 w-px origin-top bg-white/20 scroll-hint-line" />
        </div>

        <a
          href={servicesHref}
          className="absolute bottom-7 left-4 z-40 rounded-full border border-white/14 bg-black/34 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white/64 backdrop-blur-xl transition-colors hover:border-cyan-100/40 hover:text-white sm:left-auto sm:right-6"
        >
          {isArabic ? "انتقل إلى الخدمات" : "Skip to Services"}
        </a>

        <div
          ref={overlayRef}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black transition-opacity duration-500"
          style={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center gap-5">
            <span className="text-lg font-light uppercase tracking-[0.34em] text-white sm:text-xl">
              Innovmark
            </span>
            <div className="relative h-px w-36 overflow-hidden bg-white/20 sm:w-40">
              <div
                ref={progressBarRef}
                className="absolute inset-y-0 left-0 bg-white"
                style={{ width: "0%" }}
              />
            </div>
            <span
              ref={progressTextRef}
              className="text-xs tracking-widest text-white/40"
            >
              0%
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollHintPulse {
          0%,
          100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .scroll-hint-line {
          animation: scrollHintPulse 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-hint-line {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function SceneMockup({ type }: { type: StoryScene["card"] }) {
  if (type === "video") {
    return (
      <div className="rounded-lg border border-white/14 bg-[#090b12]/82 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="aspect-video overflow-hidden rounded-md bg-gradient-to-br from-zinc-900 via-zinc-800 to-black">
          <div className="flex h-full items-center justify-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/10 text-white">
              ▶
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[48, 72, 42, 66].map((height) => (
            <span
              key={height}
              className="rounded-sm bg-cyan-200/60"
              style={{ height }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "website") {
    return (
      <div className="rounded-lg border border-white/14 bg-white/[0.08] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-200/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
        </div>
        <div className="grid gap-3 rounded-md bg-white p-4 text-black">
          <span className="h-4 w-28 rounded-full bg-black" />
          <span className="h-12 rounded-md bg-zinc-200" />
          <div className="grid grid-cols-3 gap-2">
            <span className="h-16 rounded-md bg-cyan-100" />
            <span className="h-16 rounded-md bg-zinc-100" />
            <span className="h-16 rounded-md bg-fuchsia-100" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "stock") {
    return (
      <div className="rounded-lg border border-white/14 bg-[#071015]/86 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.22em] text-white/54">
            Stock OS
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["Orders", "Stock", "POS"].map((label, index) => (
            <div key={label} className="rounded-md bg-white/[0.07] p-3">
              <span className="text-[10px] text-white/42">{label}</span>
              <div className="mt-3 h-16 rounded bg-gradient-to-t from-cyan-200/70 to-white/10" />
              <span className="mt-3 block text-xl font-light text-white">
                {index === 0 ? "124" : index === 1 ? "98%" : "32"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "brandGrowth") {
    return (
      <div className="rounded-lg border border-white/14 bg-white/[0.08] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-4">
          <div className="grid aspect-square place-items-center rounded-md bg-white text-3xl font-semibold text-black">
            IM
          </div>
          <div className="space-y-3">
            <span className="block h-5 w-28 rounded-full bg-white/80" />
            <span className="block h-3 w-full rounded-full bg-white/24" />
            <span className="block h-3 w-3/4 rounded-full bg-white/18" />
            <div className="flex gap-2 pt-2">
              <span className="h-8 w-8 rounded-full bg-cyan-200" />
              <span className="h-8 w-8 rounded-full bg-fuchsia-200" />
              <span className="h-8 w-8 rounded-full bg-zinc-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function SceneVisualIdentity({ type }: { type: StoryScene["card"] }) {
  if (type === "video") return <VideoProductionScene />;
  if (type === "website") return <WebsiteStudioScene />;
  if (type === "stock") return <StockDashboardScene />;
  return <BrandGrowthScene />;
}

function VideoProductionScene() {
  return (
    <>
      <div className="absolute -left-24 top-24 h-[360px] w-[360px] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0_12%,rgba(255,255,255,0.03)_13%_34%,transparent_35%)] opacity-70 blur-[0.2px] sm:left-[8vw] sm:top-[18vh] sm:h-[460px] sm:w-[460px]" />
      <div className="absolute left-0 top-20 h-[62vh] w-[34vw] min-w-44 bg-[radial-gradient(circle_at_0%_38%,rgba(248,113,113,0.34),transparent_58%)] opacity-70" />
      <div className="absolute right-0 top-12 h-[58vh] w-[36vw] min-w-44 bg-[radial-gradient(circle_at_100%_42%,rgba(56,189,248,0.32),transparent_58%)] opacity-70" />
      <div className="absolute bottom-[12vh] left-4 hidden w-[410px] rounded-lg border border-white/12 bg-black/38 p-3 shadow-[0_26px_90px_rgba(0,0,0,0.32)] backdrop-blur-md sm:block lg:left-[9vw]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/38">
            Edit timeline
          </span>
          <span className="h-2 w-2 rounded-full bg-red-300 shadow-[0_0_18px_rgba(252,165,165,0.85)]" />
        </div>
        <div className="grid grid-cols-[0.6fr_1fr_0.8fr_1.1fr] gap-2">
          {["bg-cyan-200/35", "bg-red-200/30", "bg-white/18", "bg-blue-200/32"].map(
            (color) => (
              <span key={color} className={`h-10 rounded ${color}`} />
            )
          )}
        </div>
        <div className="mt-2 grid grid-cols-[1fr_0.7fr_1.2fr] gap-2">
          {["bg-white/12", "bg-cyan-100/22", "bg-red-100/20"].map((color) => (
            <span key={color} className={`h-4 rounded ${color}`} />
          ))}
        </div>
      </div>
      <div className="absolute right-5 top-[20vh] hidden gap-3 sm:right-[9vw] sm:grid">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-16 w-24 rounded-md border border-white/12 bg-gradient-to-br from-white/16 to-white/[0.025] shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:h-20 sm:w-32"
            style={{ transform: `translateX(${item * 18}px)` }}
          >
            <span className="grid h-full place-items-center text-xs text-white/46">
              ▶
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function WebsiteStudioScene() {
  return (
    <>
      <div className="absolute right-3 top-[14vh] w-[min(70vw,560px)] rounded-lg border border-white/12 bg-white/[0.07] p-3 shadow-[0_34px_130px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:right-[7vw] sm:top-[12vh]">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-200/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
        </div>
        <div className="grid gap-3 rounded-md bg-zinc-950/84 p-4">
          <span className="h-5 w-36 rounded-full bg-white/84" />
          <span className="h-20 rounded-md bg-gradient-to-r from-cyan-200/22 via-white/14 to-fuchsia-200/20" />
          <div className="grid grid-cols-3 gap-3">
            <span className="h-20 rounded-md bg-white/10" />
            <span className="h-20 rounded-md bg-cyan-200/18" />
            <span className="h-20 rounded-md bg-white/10" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[13vh] right-[9vw] hidden h-64 w-32 rounded-[1.6rem] border border-white/14 bg-black/62 p-2 shadow-[0_26px_100px_rgba(0,0,0,0.42)] backdrop-blur-md sm:block">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/24" />
        <div className="space-y-2 rounded-[1rem] bg-white p-3">
          <span className="block h-3 w-16 rounded-full bg-black" />
          <span className="block h-14 rounded-md bg-cyan-100" />
          <span className="block h-8 rounded-md bg-zinc-200" />
          <span className="block h-8 rounded-md bg-fuchsia-100" />
        </div>
      </div>
      <div className="absolute bottom-[16vh] left-[6vw] hidden w-72 rounded-lg border border-cyan-100/16 bg-cyan-950/24 p-4 backdrop-blur-md lg:block">
        <span className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/48">
          Dashboard preview
        </span>
        <div className="mt-5 flex h-24 items-end gap-2">
          {[48, 68, 42, 82, 64, 92].map((height) => (
            <span
              key={height}
              className="flex-1 rounded-t bg-gradient-to-t from-cyan-300/70 to-white/30"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function BrandGrowthScene() {
  return (
    <>
      <div className="absolute right-5 top-[16vh] grid w-[min(66vw,560px)] grid-cols-1 gap-3 sm:right-[8vw] sm:w-[min(74vw,560px)] sm:grid-cols-2 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-white/12 bg-white/[0.08] p-4 backdrop-blur-xl">
          <span className="text-[10px] uppercase tracking-[0.24em] text-white/42">
            Logo grid
          </span>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["IM", "IN", "M"].map((mark) => (
              <span
                key={mark}
                className="grid aspect-square place-items-center rounded-md border border-white/10 bg-white text-sm font-semibold text-black"
              >
                {mark}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden rounded-lg border border-white/12 bg-[#07070d]/86 p-4 text-white shadow-[0_28px_100px_rgba(0,0,0,0.32)] sm:block">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/42">
              Growth analytics
            </span>
            <span className="text-sm text-cyan-100">+42%</span>
          </div>
          <div className="relative mt-5 h-28 overflow-hidden rounded-md bg-white/[0.045]">
            <div className="absolute inset-x-5 bottom-6 h-px bg-white/12" />
            <div className="absolute bottom-6 left-5 h-16 w-[72%] rounded-tl-[80px] border-l border-t border-cyan-200/80" />
            <div className="absolute bottom-16 left-[54%] h-3 w-3 rounded-full bg-cyan-100 shadow-[0_0_30px_rgba(165,243,252,0.8)]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[14vh] left-4 grid w-[min(62vw,360px)] grid-cols-1 gap-2 sm:left-[8vw] sm:w-[min(80vw,360px)] sm:grid-cols-2 sm:gap-3">
        {[
          ["ROI", "3.8x"],
          ["Leads", "+64%"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-white/12 bg-white/[0.07] p-4 backdrop-blur-xl"
          >
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/38">
              {label}
            </span>
            <span className="mt-3 block text-2xl font-light text-white">
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[22vh] right-[20vw] hidden rounded-lg border border-white/12 bg-white/[0.07] p-5 backdrop-blur-xl lg:block">
        <span className="block text-5xl font-light text-white">Aa</span>
        <span className="mt-3 block h-2 w-40 rounded-full bg-white/18" />
        <span className="mt-2 block h-2 w-28 rounded-full bg-white/12" />
      </div>
    </>
  );
}

function StockDashboardScene() {
  return (
    <>
      <div className="absolute right-4 top-[15vh] w-[min(72vw,620px)] rounded-lg border border-emerald-200/14 bg-[#06100d]/82 p-4 shadow-[0_34px_130px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:right-[7vw] sm:top-[14vh] sm:w-[min(82vw,620px)]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.24em] text-emerald-100/50">
            Inventory table
          </span>
          <span className="rounded-full bg-emerald-300/12 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-100">
            Synced
          </span>
        </div>
        <div className="grid gap-2">
          {["Atlas Hoodie", "Nour Espresso", "Oryx Kit", "Studio Pack"].map(
            (item, index) => (
              <div
                key={item}
                className="grid grid-cols-[1fr_0.35fr_0.35fr] items-center gap-3 rounded-md bg-white/[0.055] px-3 py-2 text-xs text-white/64"
              >
                <span>{item}</span>
                <span>{index === 2 ? "Low" : "OK"}</span>
                <span className={index === 2 ? "text-amber-200" : "text-emerald-200"}>
                  {index === 2 ? "12" : `${86 - index * 13}`}
                </span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="absolute bottom-[13vh] left-4 hidden w-80 rounded-lg border border-white/12 bg-white/[0.07] p-4 backdrop-blur-xl sm:block lg:left-[9vw]">
        <span className="text-[10px] uppercase tracking-[0.24em] text-white/42">
          Sales graph
        </span>
        <div className="mt-5 flex h-28 items-end gap-2">
          {[34, 58, 46, 72, 64, 88, 76].map((height) => (
            <span
              key={height}
              className="flex-1 rounded-t bg-gradient-to-t from-emerald-300/72 to-cyan-100/34"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-[17vh] right-[10vw] hidden gap-2 sm:grid">
        {["Low stock", "Reorder", "POS live"].map((label, index) => (
          <div
            key={label}
            className="rounded-md border border-white/12 bg-black/48 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/58 backdrop-blur-md"
            style={{ transform: `translateX(${index * 18}px)` }}
          >
            {label}
          </div>
        ))}
      </div>
    </>
  );
}
