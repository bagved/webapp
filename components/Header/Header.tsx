"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import styles from "./Header.module.css";
import Container from "../ui/Container";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [brandHidden, setBrandHidden] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
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

  const logo = (hidden = false) => (
    <Link href="/" className={styles.logo} aria-label="BAGVED – forsiden" onClick={closeMenu} tabIndex={hidden ? -1 : undefined}>
      <Image src="/Logo.png" className={styles.logoImg} alt="BAGVED" width={195} height={92} priority />
    </Link>
  );
  const navLink = (href: string, label: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return <Link href={href} onClick={closeMenu} aria-current={active ? "page" : undefined}>{label}</Link>;
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
        <nav className={styles.links} aria-label="Hovednavigation">
          {navLink("/", "Forside")}
          {navLink("/services", "Ydelser")}
          {navLink("/cases", "Eksempler")}
          {navLink("/mission", "Mission")}
          {navLink("/contact", "Kontakt")}
        </nav>
        <nav className={styles.policies} aria-label="Politikker">
          <Link href="/privacy" onClick={closeMenu}>Privacy Policy</Link>
          <Link href="/cookies" onClick={closeMenu}>Cookie Policy</Link>
          <Link href="/terms" onClick={closeMenu}>Terms and Conditions</Link>
        </nav>
      </div>
    </dialog>
  </>;
}
