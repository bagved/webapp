"use client";

import type { SelectHTMLAttributes } from "react";
import styles from "./ThemedSelect.module.css";

function matchMenuBackground(select: HTMLSelectElement) {
  let parent = select.parentElement;
  while (parent) {
    const color = getComputedStyle(parent).backgroundColor;
    const transparent = color === "transparent" || color === "rgba(0, 0, 0, 0)" || /\/\s*0(?:\.0+)?\s*\)$/.test(color);
    if (!transparent) { select.style.setProperty("--select-menu-background", color); return; }
    parent = parent.parentElement;
  }
}

export default function ThemedSelect({ className, onFocus, onPointerDown, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <span className={styles.wrapper}>
    <select {...props} className={`${styles.select} ${className || ""}`}
      onFocus={event => { matchMenuBackground(event.currentTarget); onFocus?.(event); }}
      onPointerDown={event => { matchMenuBackground(event.currentTarget); onPointerDown?.(event); }} />
    <svg className={styles.chevron} aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m1 1 4 4 4-4" /></svg>
  </span>;
}
