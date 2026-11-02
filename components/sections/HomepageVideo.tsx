"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/LanguageProvider";

type Props = { src?: string; poster: string; className?: string };

export default function HomepageVideo({ src, poster, className }: Props) {
  const { t } = useI18n();
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const visible = useRef(false);

  useEffect(() => {
    const element = video.current;
    if (!element || !src) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      const automatic = !reducedMotion.matches;
      setAutoplay(automatic);
      if (!visible.current || document.hidden || !automatic) {
        element.pause();
        return;
      }
      // Both homepage placements share this component. A hidden placement gets
      // no source until first visible; autoplay restrictions leave controls usable.
      element.muted = true;
      void element.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0;
      if (visible.current) setLoaded(true);
      syncPlayback();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      element.pause();
    };
  }, [src]);

  useEffect(() => {
    if (loaded && autoplay && visible.current && !document.hidden) {
      const element = video.current;
      if (element) { element.muted = true; void element.play().catch(() => {}); }
    }
  }, [loaded, autoplay]);

  if (!src) return <Image src={poster} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />;
  return <video ref={video} className={className} src={loaded ? src : undefined} poster={poster}
    autoPlay={autoplay} muted loop playsInline controls preload="none" aria-label={t("Video")}
    onPlay={event => { event.currentTarget.muted = true; }} />;
}
