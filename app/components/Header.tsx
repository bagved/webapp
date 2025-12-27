"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

const locales = [
  { code: "da", label: "Dansk" },
  { code: "en", label: "English" },
];

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() || "/";

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) setOpen(false);
      if (navRef.current && !navRef.current.contains(target)) setNavOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.navDropdown} ref={navRef}>
          <button
            className={styles.navToggle}
            onClick={() => setNavOpen((s) => !s)}
            aria-haspopup="menu"
            aria-expanded={navOpen}
          >
            Menu ▾
          </button>

          {navOpen && (
            <div className={styles.navMenu} role="menu">
              {navItems.map((it) => (
                <Link key={it.href} href={it.href} className={styles.menuItem} onClick={() => setNavOpen(false)}>
                  {it.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.center}>
        <Link href="/" aria-label="Home">
          <div className={styles.logo}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="24" height="24" rx="6" fill="#111827" />
              <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="Inter, sans-serif">BV</text>
            </svg>
          </div>
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.dropdown} ref={menuRef}>
          <button
            className={styles.toggle}
            onClick={() => setOpen((s) => !s)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            Sprog ▾
          </button>

          {open && (
            <div className={styles.menu} role="menu">
              {locales.map((l) => (
                <Link
                  key={l.code}
                  href={pathname}
                  locale={l.code}
                  className={styles.menuItem}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
