"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ProductionPages.module.css";

const SHOWREEL = "https://mootagency.twentythree.com/v.ihtml/player.html?token=de39eac8c2202dff9f3519e2ddd8b52e&source=embed&photo%5fid=131882502";

export default function ShowreelPlayer({ poster, title = "Se Bagveds showreel" }: { poster: string; title?: string }) {
  const [playing, setPlaying] = useState(false);
  return <div className={styles.media} data-production-media>
    {playing ? <iframe src={SHOWREEL} title="Bagveds showreel" allow="fullscreen" allowFullScreen /> : <>
      <Image src={poster} alt="" fill sizes="(max-width: 780px) 100vw, 60vw" />
      <button className={styles.play} type="button" onClick={() => setPlaying(true)}><span aria-hidden="true">▷</span>{title}</button>
    </>}
  </div>;
}
