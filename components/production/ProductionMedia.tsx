"use client";
import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/components/i18n/LanguageProvider";
import type { Production } from "@/lib/productions";
import styles from "./ProductionPages.module.css";

export default function ProductionMedia({ production, priority = false }: { production: Pick<Production, "image" | "video">; priority?: boolean }) {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);
  if (production.video?.kind === "file") return <div className={styles.media} data-production-media>
    <video controls playsInline preload="none" poster={production.image} src={production.video.src} aria-label={t(production.video.title)} />
  </div>;
  return <div className={styles.media} data-production-media>
    {playing && production.video ? <iframe src={production.video.src} title={t(production.video.title)} allow="fullscreen" allowFullScreen /> : <>
      <Image src={production.image} alt="" fill sizes="(max-width: 780px) 100vw, 60vw" priority={priority} />
      {production.video && <button className={styles.play} type="button" onClick={() => setPlaying(true)}>{t("Afspil {title}", { title: t(production.video.title) })}</button>}
    </>}
  </div>;
}
