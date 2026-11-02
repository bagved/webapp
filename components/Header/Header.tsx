"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

const MENU_ITEMS = [
  { href: "/", label: "Forside", description: "Få et indblik i Bagved og det, vi kan skabe sammen." },
  { href: "/services", label: "Ydelser", description: "Se use cases og forstå, hvilken værdi vi kan skabe for dig." },
  { href: "/cases", label: "Eksempler", description: "Se specifikke produktioner, vi har lavet, og hvordan vi løste udfordringerne." },
  { href: "/mission", label: "Mission", description: "Mød tankerne og ambitionerne bag Bagved." },
  { href: "/contact", label: "Kontakt", description: "Fortæl os om din idé, og lad os finde den rette løsning sammen." },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [brandHidden, setBrandHidden] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuLinks = useRef<HTMLElement>(null);
  const [highlightedHref, setHighlightedHref] = useState("/");
  const [previewHref, setPreviewHref] = useState<string | null>(null);
  const [ballY, setBallY] = useState<number | null>(null);
  const pathname = usePathname();
  const closeMenu = () => setNavOpen(false);

  useMotionValueEvent(scrollY, "change", (position) => setBrandHidden(position > 40));
  useEffect(() => {
    setBrandHidden(window.scrollY > 40);
  }, [pathname]);

  const brandAnimation = {
    opacity: brandHidden ? 0 : 1,
    y: brandHidden && !reduceMotion ? -48 : 0,
  };
  const brandTransition = { duration: reduceMotion ? 0 : 0.22 };

  useEffect(() => {
    const menu = dialog.current;
    if (!navOpen) {
      menu?.close();
      return;
    }
    menu?.showModal();
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      menu?.close();
    };
  }, [navOpen]);

  const highlightLink = useCallback((link: HTMLAnchorElement) => {
    const nav = menuLinks.current;
    const label = link.querySelector<HTMLElement>("[data-menu-label]");
    if (!nav || !label) return;
    const bounds = label.getBoundingClientRect();
    setBallY(bounds.top - nav.getBoundingClientRect().top + bounds.height / 2 - 6);
    setHighlightedHref(link.getAttribute("href") || "/");
  }, []);

  useEffect(() => {
    if (!navOpen) {
      setBallY(null);
      setPreviewHref(null);
      return;
    }
    const nav = menuLinks.current;
    if (!nav) return;
    const currentLink = nav.querySelector<HTMLAnchorElement>('a[aria-current="page"]')
      || nav.querySelector<HTMLAnchorElement>("a");
    if (currentLink) highlightLink(currentLink);
    const observer = new ResizeObserver(() => {
      const link = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"))
        .find(element => element.dataset.highlighted === "true");
      if (link) highlightLink(link);
    });
    observer.observe(nav);
    nav.querySelectorAll("a").forEach(link => observer.observe(link));
    return () => observer.disconnect();
  }, [navOpen, pathname, highlightLink]);

  const logo = (hidden = false) => (
    <Link href="/" className={styles.logo} aria-label="BAGVED – forsiden" onClick={closeMenu} tabIndex={hidden ? -1 : undefined}>
      <Image src="/Logo.png" className={styles.logoImg} alt="BAGVED" width={195} height={92} priority />
    </Link>
  );
  const navLink = ({ href, label, description }: typeof MENU_ITEMS[number]) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    const descriptionId = `menu-description-${href === "/" ? "home" : href.slice(1)}`;
    return <Link key={href} href={href} onClick={closeMenu}
      aria-label={label} aria-describedby={descriptionId}
      aria-current={active ? "page" : undefined} data-highlighted={highlightedHref === href}
      onPointerEnter={event => {
        if (event.pointerType === "touch") return;
        highlightLink(event.currentTarget);
        setPreviewHref(href);
      }}
      onPointerLeave={event => {
        if (document.activeElement !== event.currentTarget)
          setPreviewHref(current => current === href ? null : current);
      }}
      onFocus={event => { highlightLink(event.currentTarget); setPreviewHref(href); }}
      onBlur={event => {
        if (!event.currentTarget.matches(":hover"))
          setPreviewHref(current => current === href ? null : current);
      }}>
      <span className={styles.linkLabel} data-menu-label>{label}</span>
      <span className={styles.screenReaderOnly} id={descriptionId}>{description}</span>
    </Link>;
  };

  return <>
    <header className={styles.wrap}>
      <Container>
        <div className={styles.bar}>
          <motion.span className={styles.language} lang="da" aria-label="Sprog: dansk"
            initial={false} animate={brandAnimation} transition={brandTransition} aria-hidden={brandHidden}>
            DA
          </motion.span>
          <motion.div className={styles.brandLogo} initial={false} animate={brandAnimation}
            transition={brandTransition} aria-hidden={brandHidden} style={{ pointerEvents: brandHidden ? "none" : "auto" }}>
            {logo(brandHidden)}
          </motion.div>
          <button type="button" className={styles.menuButton} aria-label="Åbn menu"
            aria-haspopup="dialog" aria-controls="site-menu" aria-expanded={navOpen} onClick={() => setNavOpen(true)}>
            <span className={styles.menuIcon} aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </Container>
    </header>

    <dialog ref={dialog} id="site-menu" className={styles.overlay} aria-label="Menu" onCancel={closeMenu}>
      <Container>
        <div className={styles.bar}>
          <span className={styles.language} lang="da" aria-label="Sprog: dansk">DA</span>
          {logo()}
          <button ref={closeButton} type="button" className={styles.menuButton} onClick={closeMenu} aria-label="Luk menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="m4 4 16 16M20 4 4 20" />
            </svg>
          </button>
        </div>
      </Container>
      <div className={styles.menuContent}>
        <div className={styles.menuNavigation}>
          <nav ref={menuLinks} className={styles.links} aria-label="Hovednavigation">
            <motion.span className={styles.menuBall} aria-hidden="true"
              initial={false} animate={{ y: ballY ?? 0, opacity: ballY === null ? 0 : 1 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 22, mass: 1 }} />
            {MENU_ITEMS.map(navLink)}
          </nav>
          <div className={styles.menuPreview} aria-hidden="true">
            {MENU_ITEMS.map(({ href, label, description }) => (
              <motion.div key={href} className={styles.previewItem} data-preview={href}
                initial={false} animate={{ opacity: previewHref === href ? 1 : 0, x: reduceMotion || previewHref === href ? 0 : 16 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}>
                <span className={styles.previewLabel}>{label}</span>
                <p>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <nav className={styles.policies} aria-label="Politikker">
          <Link href="/privacy" onClick={closeMenu}>Privacy Policy</Link>
          <Link href="/cookies" onClick={closeMenu}>Cookie Policy</Link>
          <Link href="/terms" onClick={closeMenu}>Terms and Conditions</Link>
        </nav>
      </div>
    </dialog>
  </>;
}
