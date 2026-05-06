"use client";

import { useCallback, useEffect, useRef } from "react";

type GlobalScrollFrameBackgroundProps = {
  src?: string;
};

export default function GlobalScrollFrameBackground({
  src = "/innovmark.mp4",
}: GlobalScrollFrameBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const durationRef = useRef(0);
  const lastTimeRef = useRef(-1);
  const fallbackRef = useRef(false);

  const getScrollProgress = useCallback(() => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollMax <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / scrollMax));
  }, []);

  const enableFallbackPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video || fallbackRef.current) return;

    fallbackRef.current = true;
    video.loop = true;
    video.playbackRate = 0.35;

    try {
      await video.play();
    } catch {
      // If autoplay is also blocked, the first decoded frame remains visible.
    }
  }, []);

  const syncVideoToScroll = useCallback(() => {
    rafRef.current = null;
    if (fallbackRef.current) return;

    const video = videoRef.current;
    const duration = durationRef.current || video?.duration || 0;
    if (!video || !Number.isFinite(duration) || duration <= 0) return;

    const targetTime = getScrollProgress() * duration;

    // Avoid tiny seeks on mobile; frequent currentTime writes are expensive.
    if (Math.abs(targetTime - lastTimeRef.current) < 0.035) return;

    lastTimeRef.current = targetTime;
    try {
      video.currentTime = targetTime;
    } catch {
      enableFallbackPlayback();
    }
  }, [enableFallbackPlayback, getScrollProgress]);

  const requestSync = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(syncVideoToScroll);
  }, [syncVideoToScroll]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const onMetadata = () => {
      durationRef.current = video.duration || 0;
      requestSync();
    };

    const onSeeked = () => {
      // Some browsers expose metadata but resist repeated precise seeks.
      if (!fallbackRef.current && video.readyState < 2) {
        enableFallbackPlayback();
      }
    };

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    requestSync();

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [enableFallbackPlayback, requestSync]);

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        playsInline
        preload="metadata"
        className="fixed inset-0 z-0 h-full w-full object-cover bg-[#02030a] brightness-[1.08] contrast-[1.04] saturate-[1.03]"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] bg-black/40 pointer-events-none md:bg-black/28"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_84%_10%,rgba(56,189,248,0.34),transparent_30%),radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_12%_86%,rgba(139,92,246,0.24),transparent_34%),linear-gradient(180deg,rgba(4,8,20,0.08),rgba(0,0,0,0.36))]"
      />
    </>
  );
}
