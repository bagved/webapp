"use client";

import { Children, isValidElement, useState, type ReactNode, type SelectHTMLAttributes } from "react";
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

type Props = SelectHTMLAttributes<HTMLSelectElement> & { fitContent?: boolean };
export default function ThemedSelect({ className, onFocus, onPointerDown, onChange, children, value, defaultValue, fitContent = false, ...props }: Props) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = value ?? uncontrolledValue;
  const options = Children.toArray(children).filter(child => isValidElement<{ value?: string | number; label?: string; children?: ReactNode }>(child));
  const selected = options.find(option => isValidElement<{ value?: string | number }>(option) && String(option.props.value ?? "") === String(selectedValue ?? "")) || options[0];
  const text = isValidElement<{ label?: string; children?: ReactNode }>(selected) ? selected.props.label || selected.props.children : "";
  return <span className={styles.wrapper} data-fit-content={fitContent}>
    {fitContent && <span className={styles.measure} aria-hidden="true">{text}</span>}
    <select {...props} value={value} defaultValue={defaultValue} className={`${styles.select} ${className || ""}`}
      onChange={event => { setUncontrolledValue(event.currentTarget.value); onChange?.(event); }}
      onFocus={event => { matchMenuBackground(event.currentTarget); onFocus?.(event); }}
      onPointerDown={event => { matchMenuBackground(event.currentTarget); onPointerDown?.(event); }}>{children}</select>
    <svg className={styles.chevron} aria-hidden="true" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m1 1 4 4 4-4" /></svg>
  </span>;
}
