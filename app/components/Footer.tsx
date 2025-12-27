import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>

        <div className={styles.copy}>© {new Date().getFullYear()} Bagved</div>
      </div>
    </footer>
  );
}
